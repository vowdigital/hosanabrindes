import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

export const HeroScene = () => {
  const mount = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const host = mount.current
    if (!host) return
    let cancelled = false
    let destroy = () => undefined

    const setup = async () => {
      const THREE = await import('three')
      if (cancelled) return

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
      camera.position.set(0, 0, 8)

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      renderer.setClearColor(0x000000, 0)
      host.appendChild(renderer.domElement)

      const group = new THREE.Group()
      scene.add(group)

      const material = new THREE.MeshStandardMaterial({
        color: 0xcf1f26,
        metalness: 0.15,
        roughness: 0.42,
        transparent: true,
        opacity: 0.22,
        side: THREE.DoubleSide,
      })
      const accentMaterial = new THREE.MeshBasicMaterial({
        color: 0xe5262e,
        transparent: true,
        opacity: 0.12,
        wireframe: true,
      })

      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-3.4, -2.7, 0),
        new THREE.Vector3(-2, -0.5, 0.5),
        new THREE.Vector3(0, 1.2, -0.5),
        new THREE.Vector3(2.2, 0.3, 0.7),
        new THREE.Vector3(3.5, 2.6, 0),
      ])
      const ribbonGeometry = new THREE.TubeGeometry(curve, 72, 0.34, 10, false)
      const ribbon = new THREE.Mesh(ribbonGeometry, material)
      ribbon.rotation.z = -0.22
      group.add(ribbon)

      const cylinderGeometry = new THREE.CylinderGeometry(1.25, 1.05, 3.8, 32, 9, true)
      const cylinder = new THREE.Mesh(cylinderGeometry, accentMaterial)
      cylinder.position.set(1.5, -0.25, -1.2)
      cylinder.rotation.z = -0.32
      group.add(cylinder)

      const light = new THREE.DirectionalLight(0xffffff, 1.8)
      light.position.set(-3, 4, 5)
      scene.add(light)
      scene.add(new THREE.AmbientLight(0xffffff, 1.1))

      let frame = 0
      let visible = true
      const clock = new THREE.Clock()

      const resize = () => {
        const width = host.clientWidth
        const height = host.clientHeight
        if (!width || !height) return
        renderer.setSize(width, height, false)
        camera.aspect = width / height
        camera.updateProjectionMatrix()
      }

      const render = () => {
        if (!visible) return
        const elapsed = clock.getElapsedTime()
        if (!reducedMotion) {
          group.rotation.y = Math.sin(elapsed * 0.28) * 0.18
          ribbon.rotation.x = Math.sin(elapsed * 0.34) * 0.09
          cylinder.rotation.y = elapsed * 0.06
        }
        renderer.render(scene, camera)
        if (!reducedMotion) frame = requestAnimationFrame(render)
      }

      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting
        if (visible) {
          cancelAnimationFrame(frame)
          render()
        } else {
          cancelAnimationFrame(frame)
        }
      }, { threshold: 0.01 })

      resize()
      render()
      observer.observe(host)
      window.addEventListener('resize', resize)

      destroy = () => {
        cancelAnimationFrame(frame)
        observer.disconnect()
        window.removeEventListener('resize', resize)
        ribbonGeometry.dispose()
        cylinderGeometry.dispose()
        material.dispose()
        accentMaterial.dispose()
        renderer.dispose()
        renderer.forceContextLoss()
        renderer.domElement.remove()
        scene.clear()
      }
    }

    void setup()

    return () => {
      cancelled = true
      destroy()
    }
  }, [reducedMotion])

  return <div className="hero-scene" ref={mount} aria-hidden="true" />
}
