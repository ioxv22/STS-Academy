#!/usr/bin/env node

/**
 * STS Academy Setup Test
 * Verifies that all required files and configurations are in place
 */

const fs = require('fs')
const path = require('path')

console.log('🧪 Testing STS Academy Setup...\n')

const requiredFiles = [
  'package.json',
  'vite.config.js',
  'tailwind.config.js',
  'index.html',
  'src/main.jsx',
  'src/App.jsx',
  'src/index.css',
  'server.js',
  '.env'
]

const requiredDirectories = [
  'src',
  'src/components',
  'src/pages',
  'src/context',
  'public'
]

let allGood = true

// Check required files
console.log('📁 Checking required files...')
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`   ✅ ${file}`)
  } else {
    console.log(`   ❌ ${file} - MISSING`)
    allGood = false
  }
})

// Check required directories
console.log('\n📂 Checking required directories...')
requiredDirectories.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`   ✅ ${dir}/`)
  } else {
    console.log(`   ❌ ${dir}/ - MISSING`)
    allGood = false
  }
})

// Check React components
console.log('\n⚛️  Checking React components...')
const components = [
  'src/components/Header.jsx',
  'src/components/Hero.jsx',
  'src/components/About.jsx',
  'src/components/Subjects.jsx',
  'src/components/Grades.jsx',
  'src/components/Contact.jsx',
  'src/components/Footer.jsx',
  'src/components/ProtectedRoute.jsx'
]

components.forEach(component => {
  if (fs.existsSync(component)) {
    console.log(`   ✅ ${path.basename(component)}`)
  } else {
    console.log(`   ❌ ${path.basename(component)} - MISSING`)
    allGood = false
  }
})

// Check pages
console.log('\n📄 Checking pages...')
const pages = [
  'src/pages/HomePage.jsx',
  'src/pages/AdminLogin.jsx',
  'src/pages/AdminDashboard.jsx'
]

pages.forEach(page => {
  if (fs.existsSync(page)) {
    console.log(`   ✅ ${path.basename(page)}`)
  } else {
    console.log(`   ❌ ${path.basename(page)} - MISSING`)
    allGood = false
  }
})

// Check package.json dependencies
console.log('\n📦 Checking package.json...')
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  const requiredDeps = [
    'react',
    'react-dom',
    'react-router-dom',
    'express',
    'cors',
    'bcryptjs',
    'jsonwebtoken',
    'multer'
  ]

  requiredDeps.forEach(dep => {
    if (packageJson.dependencies && packageJson.dependencies[dep]) {
      console.log(`   ✅ ${dep}`)
    } else {
      console.log(`   ❌ ${dep} - MISSING`)
      allGood = false
    }
  })
} catch (error) {
  console.log('   ❌ Error reading package.json')
  allGood = false
}

// Final result
console.log('\n' + '='.repeat(50))
if (allGood) {
  console.log('🎉 Setup verification PASSED!')
  console.log('\n✅ All required files and dependencies are in place')
  console.log('🚀 Ready to start development!')
  console.log('\nNext steps:')
  console.log('1. npm install (if not done already)')
  console.log('2. npm run dev (start frontend)')
  console.log('3. npm start (start backend in another terminal)')
  console.log('4. Visit http://localhost:3000')
} else {
  console.log('❌ Setup verification FAILED!')
  console.log('\n⚠️  Some required files or dependencies are missing')
  console.log('Please check the missing items above and fix them')
}
console.log('='.repeat(50))