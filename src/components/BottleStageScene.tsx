import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

type BottleStageSceneProps = {
  accent: string
  active: number
}

export const BottleStageScene = ({ accent, active }: BottleStageSceneProps) => {
  const mount = useRef<HTMLDivElement>(null)
  const activeRef = useRef(active)
  const accentRef = useRef(accent)
  const updateColor = useRef<(color: string) => void>(() => undefined)
  const redraw = useRef<() => void>(() => undefined)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    activeRef.current = active
    redraw.current()
  }, [active])

  useEffect(() => {
    accentRef.current = accent
    updateColor.current(accent)
  }, [accent])

  useEffect(() => {
    const host = mount.current
    if (!host) return

    let cancelled = false
    let destroy = () => undefined

    const setup = async () => {
      const THREE = await import('three')
      if (cancelled) return

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50)
      camera.position.set(0, 0.1, 8)

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
      })
      renderer.setClearColor(0x000000, 0)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      renderer.outputColorSpace = THREE.SRGBColorSpace
      host.appendChild(renderer.domElement)

      const group = new THREE.Group()
      group.position.y = -0.12
      scene.add(group)

      const geometries: InstanceType<typeof THREE.BufferGeometry>[] = []
      const materials: InstanceType<typeof THREE.Material>[] = []
      const rings: InstanceType<typeof THREE.Mesh>[] = []

      const ringSettings = [
        { radius: 2.15, z: -0.5, opacity: 0.16, tilt: -0.1 },
        { radius: 2.75, z: -0.9, opacity: 0.1, tilt: 0.12 },
        { radius: 3.35, z: -1.3, opacity: 0.055, tilt: -0.18 },
      ]

      ringSettings.forEach(({ radius, z, opacity, tilt }, index) => {
        const geometry = new THREE.TorusGeometry(radius, 0.012, 6, 128)
        const material = new THREE.MeshBasicMaterial({
          color: accentRef.current,
          transparent: true,
          opacity,
          depthWrite: false,
        })
        const ring = new THREE.Mesh(geometry, material)
        ring.position.z = z
        ring.rotation.x = tilt
        ring.rotation.y = tilt * 0.8
        ring.userData.speed = index % 2 === 0 ? 1 : -0.7
        group.add(ring)
        rings.push(ring)
        geometries.push(geometry)
        materials.push(material)
      })

      const floorGeometry = new THREE.RingGeometry(1.4, 3.5, 96)
      const floorMaterial = new THREE.MeshBasicMaterial({
        color: accentRef.current,
        transparent: true,
        opacity: 0.045,
        side: THREE.DoubleSide,
        depthWrite: false,
      })
      const floor = new THREE.Mesh(floorGeometry, floorMaterial)
      floor.position.set(0, -2.35, -0.5)
      floor.rotation.x = 1.28
      group.add(floor)
      geometries.push(floorGeometry)
      materials.push(floorMaterial)

      const particleCount = 64
      const positions = new Float32Array(particleCount * 3)
      for (let index = 0; index < particleCount; index += 1) {
        const radius = 1.8 + Math.random() * 2
        const angle = Math.random() * Math.PI * 2
        positions[index * 3] = Math.cos(angle) * radius
        positions[index * 3 + 1] = Math.sin(angle) * radius * 0.74
        positions[index * 3 + 2] = -1.6 + Math.random() * 1.1
      }
      const particleGeometry = new THREE.BufferGeometry()
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      const particleMaterial = new THREE.PointsMaterial({
        color: accentRef.current,
        size: 0.025,
        transparent: true,
        opacity: 0.28,
        depthWrite: false,
      })
      const particles = new THREE.Points(particleGeometry, particleMaterial)
      group.add(particles)
      geometries.push(particleGeometry)
      materials.push(particleMaterial)

      let frame = 0
      let visible = true
      let pointerX = 0
      let pointerY = 0
      let easedX = 0
      let easedY = 0
      const clock = new THREE.Clock()

      const resize = () => {
        const width = host.clientWidth
        const height = host.clientHeight
        if (!width || !height) return
        renderer.setSize(width, height, false)
        camera.aspect = width / height
        camera.updateProjectionMatrix()
      }

      const draw = () => renderer.render(scene, camera)
      redraw.current = draw

      updateColor.current = (color) => {
        materials.forEach((material) => {
          if ('color' in material && material.color instanceof THREE.Color) material.color.set(color)
        })
        draw()
      }

      const render = () => {
        if (!visible) return
        const elapsed = clock.getElapsedTime()
        easedX += (pointerX - easedX) * 0.035
        easedY += (pointerY - easedY) * 0.035
        group.rotation.y = easedX * 0.09
        group.rotation.x = easedY * -0.055
        group.rotation.z += ((activeRef.current * 0.018) - group.rotation.z) * 0.018
        rings.forEach((ring) => {
          ring.rotation.z = elapsed * 0.012 * Number(ring.userData.speed)
        })
        particles.rotation.z = elapsed * -0.008
        draw()
        frame = requestAnimationFrame(render)
      }

      const onPointerMove = (event: PointerEvent) => {
        const bounds = host.getBoundingClientRect()
        pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
        pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2
      }

      const onPointerLeave = () => {
        pointerX = 0
        pointerY = 0
      }

      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting
        cancelAnimationFrame(frame)
        if (visible) {
          if (reducedMotion) draw()
          else render()
        }
      }, { threshold: 0.01 })

      resize()
      draw()
      if (!reducedMotion) render()
      observer.observe(host)
      host.addEventListener('pointermove', onPointerMove)
      host.addEventListener('pointerleave', onPointerLeave)
      window.addEventListener('resize', resize)

      destroy = () => {
        cancelAnimationFrame(frame)
        observer.disconnect()
        host.removeEventListener('pointermove', onPointerMove)
        host.removeEventListener('pointerleave', onPointerLeave)
        window.removeEventListener('resize', resize)
        geometries.forEach((geometry) => geometry.dispose())
        materials.forEach((material) => material.dispose())
        renderer.dispose()
        renderer.forceContextLoss()
        renderer.domElement.remove()
        scene.clear()
        updateColor.current = () => undefined
        redraw.current = () => undefined
      }
    }

    void setup()

    return () => {
      cancelled = true
      destroy()
    }
  }, [reducedMotion])

  return <div className="bottle-stage-scene" ref={mount} aria-hidden="true" />
}
