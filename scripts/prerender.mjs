import { readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve } from 'node:path'

const scriptDirectory = dirname(fileURLToPath(import.meta.url))
const projectDirectory = resolve(scriptDirectory, '..')
const outputDirectory = resolve(projectDirectory, 'dist')
const serverDirectory = resolve(outputDirectory, 'server')
const htmlPath = resolve(outputDirectory, 'index.html')
const serverEntryPath = resolve(serverDirectory, 'entry-server.js')

const [{ render }, template] = await Promise.all([
  import(pathToFileURL(serverEntryPath).href),
  readFile(htmlPath, 'utf8'),
])

const marker = '<div id="root"></div>'
if (!template.includes(marker)) {
  throw new Error(`Marcador de pré-renderização não encontrado em ${htmlPath}`)
}

const renderedHtml = template.replace(marker, `<div id="root">${render()}</div>`)
await writeFile(htmlPath, renderedHtml, 'utf8')
await rm(serverDirectory, { recursive: true, force: true })

process.stdout.write('Home pré-renderizada em dist/index.html\n')
