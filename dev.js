import { spawn } from 'node:child_process'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const mode = process.argv[2] || 'all'

function getPythonBin() {
  const venvWin = path.join(__dirname, 'backend', '.venv', 'Scripts', 'python.exe')
  const venvUnix = path.join(__dirname, 'backend', '.venv', 'bin', 'python')
  if (fs.existsSync(venvWin)) return venvWin
  if (fs.existsSync(venvUnix)) return venvUnix
  return 'python'
}

const processes = []

function cleanup() {
  for (const proc of processes) {
    if (proc && !proc.killed) {
      try {
        if (process.platform === 'win32' && proc.pid) {
          spawn('taskkill', ['/F', '/T', '/PID', proc.pid.toString()], { stdio: 'ignore' })
        } else {
          proc.kill('SIGTERM')
        }
      } catch {}
    }
  }
}

process.on('SIGINT', () => {
  console.log('\n[KerjaArah] Menghentikan semua layanan...')
  cleanup()
  process.exit(0)
})

process.on('SIGTERM', () => {
  cleanup()
  process.exit(0)
})

process.on('exit', () => {
  cleanup()
})

function startBackend() {
  const pyBin = getPythonBin()
  console.log(`[Backend] Memulai FastAPI di http://127.0.0.1:8000 (Python: ${path.relative(__dirname, pyBin)})...`)
  const proc = spawn(pyBin, ['main.py'], {
    cwd: path.join(__dirname, 'backend'),
    stdio: 'inherit',
    shell: false,
  })
  processes.push(proc)
  proc.on('close', (code) => {
    if (code !== 0 && code !== null) {
      console.log(`[Backend] Proses berhenti (exit code: ${code})`)
    }
  })
}

function startFrontend() {
  console.log(`[Frontend] Memulai Vite di http://localhost:5173...`)
  const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  const proc = spawn(npmCmd, ['run', 'dev'], {
    cwd: path.join(__dirname, 'frontend'),
    stdio: 'inherit',
    shell: true,
  })
  processes.push(proc)
  proc.on('close', (code) => {
    if (code !== 0 && code !== null) {
      console.log(`[Frontend] Proses berhenti (exit code: ${code})`)
    }
  })
}

console.log('============================================================')
console.log('           KERJAARAH - DEVELOPMENT SERVER')
console.log('============================================================')

if (mode === 'backend') {
  startBackend()
} else if (mode === 'frontend') {
  startFrontend()
} else {
  startBackend()
  startFrontend()
}

