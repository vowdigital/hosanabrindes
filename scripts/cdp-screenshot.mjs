import { writeFile } from 'node:fs/promises'

const [port, width, height, output, url = 'http://127.0.0.1:4173/', clickSelector] = process.argv.slice(2)
if (!port || !width || !height || !output) throw new Error('Usage: port width height output [url]')

const targets = await fetch(`http://127.0.0.1:${port}/json/list`).then((response) => response.json())
const target = targets.find((item) => item.type === 'page')
if (!target) throw new Error('No browser page target found')

const socket = new WebSocket(target.webSocketDebuggerUrl)
await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, { once: true })
  socket.addEventListener('error', reject, { once: true })
})

let nextId = 0
const pending = new Map()
socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data)
  if (!message.id) return
  const waiter = pending.get(message.id)
  if (!waiter) return
  pending.delete(message.id)
  if (message.error) waiter.reject(new Error(message.error.message))
  else waiter.resolve(message.result)
})

const command = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++nextId
  pending.set(id, { resolve, reject })
  socket.send(JSON.stringify({ id, method, params }))
})

await command('Page.enable')
await command('Emulation.setDeviceMetricsOverride', {
  width: Number(width),
  height: Number(height),
  deviceScaleFactor: 1,
  mobile: true,
  screenWidth: Number(width),
  screenHeight: Number(height),
})
await command('Emulation.setEmulatedMedia', {
  features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
})
await command('Page.navigate', { url })
await new Promise((resolve) => setTimeout(resolve, 1800))
if (clickSelector) {
  await command('Runtime.evaluate', {
    expression: `document.querySelector(${JSON.stringify(clickSelector)})?.click()`,
  })
  await new Promise((resolve) => setTimeout(resolve, 350))
}

const metrics = await command('Runtime.evaluate', {
  expression: 'JSON.stringify({width: window.innerWidth, height: window.innerHeight, scrollWidth: document.documentElement.scrollWidth, tracking: window.dataLayer?.slice(-3) || []})',
  returnByValue: true,
})
const screenshot = await command('Page.captureScreenshot', {
  format: 'png',
  fromSurface: true,
  captureBeyondViewport: false,
})

await writeFile(output, Buffer.from(screenshot.data, 'base64'))
process.stdout.write(`${metrics.result.value}\n`)
socket.close()
