import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { createJiti } from 'jiti'

const jiti = createJiti(import.meta.url)

export function loadSystemEnvs() {
    const baseDir = path.dirname(fileURLToPath(import.meta.url))
    jiti.import(path.resolve(baseDir, '../env/client.ts'))
    jiti.import(path.resolve(baseDir, '../env/server.ts'))
}
