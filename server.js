const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000
const JWT_SECRET = process.env.JWT_SECRET || 'sts-academy-secret-key-2025'

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'dist')))

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'dist', 'uploads')
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|svg/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)
    
    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error('Only image files are allowed'))
    }
  }
})

// Default admin credentials (in production, store in database with hashed password)
const defaultAdmin = {
  username: 'admin',
  password: bcrypt.hashSync('sts2025admin', 10)
}

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Access token required' })
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' })
    }
    req.user = user
    next()
  })
}

// Routes

// Admin login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' })
    }

    // Check credentials
    if (username === defaultAdmin.username && bcrypt.compareSync(password, defaultAdmin.password)) {
      const token = jwt.sign(
        { username: username, role: 'admin' },
        JWT_SECRET,
        { expiresIn: '24h' }
      )

      res.json({
        success: true,
        token: token,
        user: { username: username, role: 'admin' }
      })
    } else {
      res.status(401).json({ error: 'Invalid credentials' })
    }
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Verify token
app.get('/api/admin/verify', authenticateToken, (req, res) => {
  res.json({ success: true, user: req.user })
})

// Upload logo
app.post('/api/admin/upload-logo', authenticateToken, upload.single('logo'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const logoUrl = `/uploads/${req.file.filename}`
    res.json({
      success: true,
      logoUrl: logoUrl,
      message: 'Logo uploaded successfully'
    })
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ error: 'Upload failed' })
  }
})

// Get site data
app.get('/api/site-data', (req, res) => {
  try {
    const dataFile = path.join(__dirname, 'site-data.json')
    
    if (fs.existsSync(dataFile)) {
      const data = fs.readFileSync(dataFile, 'utf8')
      res.json(JSON.parse(data))
    } else {
      // Return default data if file doesn't exist
      res.json({ message: 'Using default data' })
    }
  } catch (error) {
    console.error('Error reading site data:', error)
    res.status(500).json({ error: 'Failed to load site data' })
  }
})

// Update site data
app.post('/api/admin/site-data', authenticateToken, (req, res) => {
  try {
    const dataFile = path.join(__dirname, 'site-data.json')
    fs.writeFileSync(dataFile, JSON.stringify(req.body, null, 2))
    
    res.json({
      success: true,
      message: 'Site data updated successfully'
    })
  } catch (error) {
    console.error('Error saving site data:', error)
    res.status(500).json({ error: 'Failed to save site data' })
  }
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  })
})

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 5MB.' })
    }
  }
  
  console.error('Server error:', error)
  res.status(500).json({ error: 'Internal server error' })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 STS Academy server running on port ${PORT}`)
  console.log(`📱 Frontend: http://localhost:${PORT}`)
  console.log(`🔧 Admin: http://localhost:${PORT}/admin/login`)
  console.log(`📊 API Health: http://localhost:${PORT}/api/health`)
})

module.exports = app