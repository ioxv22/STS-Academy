#!/usr/bin/env node

/**
 * STS Academy Deployment Script
 * Builds the project and prepares it for production deployment
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

console.log('🚀 Starting STS Academy deployment...\n')

try {
  // Step 1: Clean previous build
  console.log('📁 Cleaning previous build...')
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true })
  }

  // Step 2: Install dependencies
  console.log('📦 Installing dependencies...')
  execSync('npm install', { stdio: 'inherit' })

  // Step 3: Build the project
  console.log('🔨 Building project...')
  execSync('npm run build', { stdio: 'inherit' })

  // Step 4: Copy server files
  console.log('📋 Copying server files...')
  const serverFiles = ['server.js', 'package.json', '.env']
  
  serverFiles.forEach(file => {
    if (fs.existsSync(file)) {
      fs.copyFileSync(file, path.join('dist', file))
      console.log(`   ✅ Copied ${file}`)
    }
  })

  // Step 5: Create production package.json
  console.log('📝 Creating production package.json...')
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  const prodPackageJson = {
    name: packageJson.name,
    version: packageJson.version,
    description: packageJson.description,
    main: 'server.js',
    scripts: {
      start: 'node server.js'
    },
    dependencies: {
      express: packageJson.dependencies.express,
      cors: packageJson.dependencies.cors,
      bcryptjs: packageJson.dependencies.bcryptjs,
      jsonwebtoken: packageJson.dependencies.jsonwebtoken,
      multer: packageJson.dependencies.multer,
      dotenv: packageJson.dependencies.dotenv
    }
  }

  fs.writeFileSync(
    path.join('dist', 'package.json'), 
    JSON.stringify(prodPackageJson, null, 2)
  )

  // Step 6: Create deployment instructions
  const deployInstructions = `
# STS Academy Deployment Instructions

## Files to Deploy:
- All files in the 'dist' folder
- server.js (main server file)
- package.json (production dependencies)
- .env (environment variables - configure for production)

## Deployment Steps:

1. Upload all files from 'dist' folder to your server
2. Install production dependencies:
   npm install --production

3. Set environment variables:
   - PORT (default: 5000)
   - JWT_SECRET (change from default!)
   - NODE_ENV=production

4. Start the server:
   npm start
   # or
   node server.js

## Environment Variables for Production:
PORT=5000
NODE_ENV=production
JWT_SECRET=your-super-secure-secret-key-here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password-here

## Recommended Hosting Platforms:
- Heroku
- Vercel
- Netlify
- DigitalOcean
- AWS EC2

## Domain Setup:
1. Point your domain to your server
2. Update SITE_URL in .env
3. Configure SSL certificate
4. Test all functionality

## Post-Deployment Checklist:
□ Website loads correctly
□ Admin panel accessible
□ WhatsApp links work
□ All sections display properly
□ Mobile responsiveness works
□ Contact form submits correctly

Built with ❤️ for Steps to Success Academy
`

  fs.writeFileSync(path.join('dist', 'DEPLOYMENT.md'), deployInstructions)

  console.log('\n✅ Deployment preparation complete!')
  console.log('\n📁 Files ready in ./dist folder')
  console.log('📖 See ./dist/DEPLOYMENT.md for deployment instructions')
  console.log('\n🌐 To test locally:')
  console.log('   cd dist && npm install && npm start')

} catch (error) {
  console.error('❌ Deployment failed:', error.message)
  process.exit(1)
}