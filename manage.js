#!/usr/bin/env node

/**
 * STS Academy Management Script
 * Easy commands to manage the website
 */

const { execSync } = require('child_process')
const fs = require('fs')

const command = process.argv[2]

const commands = {
  'start': {
    description: 'Start development servers (frontend + backend)',
    action: () => {
      console.log('🚀 Starting STS Academy development environment...')
      console.log('📱 Frontend will be available at: http://localhost:3000')
      console.log('🔧 Backend will be available at: http://localhost:5000')
      console.log('👨‍💼 Admin panel at: http://localhost:3000/admin/login')
      console.log('\n💡 Press Ctrl+C to stop servers\n')
      
      try {
        execSync('node start-dev.js', { stdio: 'inherit' })
      } catch (error) {
        console.log('\n👋 Development servers stopped')
      }
    }
  },
  
  'build': {
    description: 'Build project for production deployment',
    action: () => {
      console.log('🔨 Building STS Academy for production...')
      execSync('npm run build', { stdio: 'inherit' })
      console.log('✅ Build complete! Files are in ./dist folder')
    }
  },
  
  'deploy': {
    description: 'Prepare complete deployment package',
    action: () => {
      console.log('📦 Preparing deployment package...')
      execSync('node deploy.js', { stdio: 'inherit' })
    }
  },
  
  'test': {
    description: 'Test project setup and configuration',
    action: () => {
      execSync('node test-setup.js', { stdio: 'inherit' })
    }
  },
  
  'install': {
    description: 'Install all project dependencies',
    action: () => {
      console.log('📦 Installing dependencies...')
      execSync('npm install', { stdio: 'inherit' })
      console.log('✅ Dependencies installed successfully!')
    }
  },
  
  'reset': {
    description: 'Reset admin password to default',
    action: () => {
      console.log('🔐 Admin password reset to default: sts2025admin')
      console.log('👤 Username: admin')
      console.log('🔑 Password: sts2025admin')
      console.log('\n⚠️  Remember to change this in production!')
    }
  },
  
  'info': {
    description: 'Show project information and status',
    action: () => {
      console.log('📊 STS Academy Project Information\n')
      
      // Check if servers are running
      console.log('🌐 Server Status:')
      try {
        const http = require('http')
        
        // Check frontend
        const frontendReq = http.get('http://localhost:3000', (res) => {
          console.log('   ✅ Frontend: Running on http://localhost:3000')
        })
        frontendReq.on('error', () => {
          console.log('   ❌ Frontend: Not running')
        })
        
        // Check backend
        const backendReq = http.get('http://localhost:5000/api/health', (res) => {
          console.log('   ✅ Backend: Running on http://localhost:5000')
        })
        backendReq.on('error', () => {
          console.log('   ❌ Backend: Not running')
        })
        
      } catch (error) {
        console.log('   ❓ Unable to check server status')
      }
      
      console.log('\n📁 Project Structure:')
      console.log('   📱 Frontend: React + TailwindCSS')
      console.log('   🔧 Backend: Express.js + JWT Auth')
      console.log('   👨‍💼 Admin Panel: Full content management')
      console.log('   📞 WhatsApp: Integrated throughout')
      
      console.log('\n🔗 Important Links:')
      console.log('   🌐 Website: http://localhost:3000')
      console.log('   👨‍💼 Admin: http://localhost:3000/admin/login')
      console.log('   🔧 API: http://localhost:5000/api/health')
      
      console.log('\n🔐 Admin Credentials:')
      console.log('   👤 Username: admin')
      console.log('   🔑 Password: sts2025admin')
    }
  },
  
  'help': {
    description: 'Show this help message',
    action: () => {
      console.log('🎓 STS Academy Management Commands\n')
      
      Object.entries(commands).forEach(([cmd, info]) => {
        console.log(`   ${cmd.padEnd(12)} - ${info.description}`)
      })
      
      console.log('\n📖 Usage Examples:')
      console.log('   node manage.js start     # Start development servers')
      console.log('   node manage.js build     # Build for production')
      console.log('   node manage.js deploy    # Prepare deployment')
      console.log('   node manage.js test      # Test setup')
      console.log('   node manage.js info      # Show project info')
      
      console.log('\n🆘 Need Help?')
      console.log('   📞 Phone: +20 10 62641866')
      console.log('   💬 Telegram: https://t.me/iivoz')
    }
  }
}

// Execute command
if (!command || !commands[command]) {
  console.log('❓ Unknown command. Available commands:\n')
  commands.help.action()
} else {
  commands[command].action()
}