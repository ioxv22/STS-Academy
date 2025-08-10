#!/usr/bin/env node

/**
 * STS Academy Development Startup Script
 * Starts both frontend and backend servers for development
 */

const { spawn } = require('child_process')
const path = require('path')

console.log('🚀 Starting STS Academy Development Environment...\n')

// Start backend server
console.log('🔧 Starting backend server on port 5000...')
const backend = spawn('node', ['server.js'], {
  stdio: 'inherit',
  cwd: __dirname
})

// Wait a moment then start frontend
setTimeout(() => {
  console.log('⚡ Starting frontend development server on port 3000...')
  const frontend = spawn('npm', ['run', 'dev'], {
    stdio: 'inherit',
    cwd: __dirname,
    shell: true
  })

  // Handle process termination
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down development servers...')
    backend.kill('SIGINT')
    frontend.kill('SIGINT')
    process.exit(0)
  })

  frontend.on('error', (error) => {
    console.error('❌ Frontend server error:', error)
  })

}, 2000)

backend.on('error', (error) => {
  console.error('❌ Backend server error:', error)
})

console.log('\n📱 Frontend: http://localhost:3000')
console.log('🔧 Backend: http://localhost:5000')
console.log('👨‍💼 Admin Panel: http://localhost:3000/admin/login')
console.log('\n💡 Press Ctrl+C to stop both servers')