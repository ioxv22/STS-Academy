# Steps to Success (STS) Academy Website

A modern, fully responsive educational academy website built with React, TailwindCSS, and Express.js. Features a complete admin panel for content management without coding.

## 🌟 Features

### Frontend
- **Modern Design**: Clean, professional design with smooth animations
- **Fully Responsive**: Optimized for all devices (mobile, tablet, desktop)
- **Interactive Sections**: Hero, About, Subjects, Grades, and Contact sections
- **Smooth Scrolling**: Navigation with smooth scroll animations
- **WhatsApp Integration**: Direct contact via WhatsApp
- **Social Media Links**: Footer with social media integration

### Admin Panel
- **Secure Authentication**: Password-protected admin access
- **Content Management**: Edit all text content without coding
- **Logo Upload**: Upload and change logo from admin panel
- **Color Customization**: Change brand colors easily
- **Real-time Updates**: Changes reflect immediately on the website

### Technical Features
- **React 18**: Modern React with hooks and context
- **TailwindCSS**: Utility-first CSS framework
- **Express.js**: Backend API server
- **JWT Authentication**: Secure admin authentication
- **File Upload**: Multer for logo uploads
- **Local Storage**: Client-side data persistence

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   # Start frontend (Vite dev server)
   npm run dev
   
   # In another terminal, start backend
   npm start
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

### Access Points
- **Website**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin/login
- **API Health**: http://localhost:5000/api/health

## 🔐 Admin Access

### Default Credentials
- **Username**: `admin`
- **Password**: `sts2025admin`

⚠️ **Important**: Change these credentials in production!

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.jsx      # Navigation header
│   ├── Hero.jsx        # Hero section
│   ├── About.jsx       # About section
│   ├── Subjects.jsx    # Subjects grid
│   ├── Grades.jsx      # Grades cards
│   ├── Contact.jsx     # Contact form
│   ├── Footer.jsx      # Footer with links
│   └── ProtectedRoute.jsx # Admin route protection
├── pages/              # Page components
│   ├── HomePage.jsx    # Main website page
│   ├── AdminLogin.jsx  # Admin login page
│   └── AdminDashboard.jsx # Admin panel
├── context/            # React context
│   └── SiteContext.jsx # Site data management
├── App.jsx            # Main app component
├── main.jsx           # React entry point
└── index.css          # Global styles

public/
├── logo.svg           # STS logo
├── favicon.svg        # Favicon
└── index.html         # HTML template

server.js              # Express backend server
```

## 🎨 Customization

### Brand Colors
The website uses a carefully chosen color palette:
- **Primary Blue**: #1E3A8A (Elegant, trustworthy)
- **Gold**: #FBBF24 (Premium, success)
- **White**: #FFFFFF (Clean, modern)

### Changing Content
All content can be modified through the admin panel:

1. **Login** to admin panel
2. **Navigate** to the section you want to edit
3. **Update** text, colors, or upload new images
4. **Save** changes - they appear immediately

### Adding New Subjects
1. Go to Admin Panel → Subjects
2. Click "Add Subject"
3. Enter subject name, icon (FontAwesome class), and description
4. Save changes

### Modifying Contact Information
1. Go to Admin Panel → Contact
2. Update phone, email, social media links
3. Changes reflect in contact section and footer

## 📱 WhatsApp Integration

The website includes multiple WhatsApp integration points:
- **Hero CTA Button**: "Join Now" button
- **Subject Cards**: Click to inquire about specific subjects
- **Grade Cards**: Click to inquire about specific grades
- **Contact Form**: Submits via WhatsApp
- **Floating Button**: Always-visible WhatsApp contact

## 🔧 Configuration

### Environment Variables
Create a `.env` file with:

```env
PORT=5000
JWT_SECRET=your-secret-key-here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
```

### Deployment
1. **Build the project**: `npm run build`
2. **Set environment variables** on your hosting platform
3. **Deploy** the `dist` folder and `server.js`
4. **Start** the server: `node server.js`

## 📞 Contact Information

- **Phone**: +20 10 62641866
- **Telegram**: https://t.me/iivoz
- **WhatsApp**: Direct integration in website

## 🛡️ Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcrypt for password security
- **File Upload Validation**: Secure image uploads
- **CORS Protection**: Cross-origin request security
- **Input Validation**: Server-side validation

## 🎯 SEO Optimized

- **Meta Tags**: Proper meta descriptions and keywords
- **Open Graph**: Social media sharing optimization
- **Semantic HTML**: Proper HTML structure
- **Fast Loading**: Optimized assets and code splitting

## 📊 Performance

- **Lazy Loading**: Components load as needed
- **Image Optimization**: Proper image formats and sizes
- **Code Splitting**: Efficient bundle sizes
- **Caching**: Browser caching for static assets

## 🔄 Updates & Maintenance

### Adding New Features
1. Create new components in `src/components/`
2. Add to admin panel if needed
3. Update context for data management
4. Test thoroughly

### Backup & Restore
- **Site Data**: Stored in `site-data.json`
- **Uploaded Files**: Stored in `dist/uploads/`
- **Admin Settings**: Environment variables

## 📝 License

© 2025 STS Academy. All rights reserved.

## 🤝 Support

For technical support or customization requests, contact the developer via Telegram: https://t.me/iivoz

---

**Built with ❤️ for Steps to Success Academy**