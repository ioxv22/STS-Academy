import React, { createContext, useContext, useState, useEffect } from 'react'

const SiteContext = createContext()

export const useSite = () => {
  const context = useContext(SiteContext)
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider')
  }
  return context
}

const defaultSiteData = {
  branding: {
    siteName: 'Steps to Success (STS)',
    slogan: 'Your Gateway to Excellence in All Subjects & Grades',
    logo: '/logo.svg',
    colors: {
      primary: '#1E3A8A',
      secondary: '#FBBF24',
      accent: '#FFFFFF'
    }
  },
  hero: {
    title: 'Steps to Success (STS)',
    subtitle: 'Your Gateway to Excellence in All Subjects & Grades',
    description: 'Join our academy and unlock your potential with expert teaching across all subjects and grades.',
    ctaText: 'Join Now',
    backgroundImage: '/hero-bg.jpg'
  },
  about: {
    title: 'About Our Academy',
    description: 'At Steps to Success (STS), we pride ourselves on having expert teachers who cover all subjects across all grades. Our comprehensive approach ensures that every student receives personalized attention and quality education tailored to their learning needs.',
    features: [
      'Expert teachers for all subjects',
      'Comprehensive coverage from Grade 1 to Grade 12',
      'Personalized learning approach',
      'Modern teaching methodologies',
      'Flexible learning schedules'
    ]
  },
  subjects: [
    { name: 'Mathematics', icon: 'fa-calculator', description: 'From basic arithmetic to advanced calculus', nameKey: 'mathematics', descriptionKey: 'mathematicsDesc' },
    { name: 'Physics', icon: 'fa-atom', description: 'Understanding the laws of nature', nameKey: 'physics', descriptionKey: 'physicsDesc' },
    { name: 'Chemistry', icon: 'fa-flask', description: 'Exploring molecular interactions', nameKey: 'chemistry', descriptionKey: 'chemistryDesc' },
    { name: 'Biology', icon: 'fa-dna', description: 'Life sciences and biological processes', nameKey: 'biology', descriptionKey: 'biologyDesc' },
    { name: 'Science', icon: 'fa-microscope', description: 'General science and scientific methods', nameKey: 'science', descriptionKey: 'scienceDesc' },
    { name: 'English', icon: 'fa-book', description: 'Language arts and literature', nameKey: 'english', descriptionKey: 'englishDesc' },
    { name: 'Arabic', icon: 'fa-language', description: 'Arabic language and literature', nameKey: 'arabic', descriptionKey: 'arabicDesc' },
    { name: 'French', icon: 'fa-flag', description: 'French language and culture', nameKey: 'french', descriptionKey: 'frenchDesc' },
    { name: 'History', icon: 'fa-landmark', description: 'Understanding our past', nameKey: 'history', descriptionKey: 'historyDesc' },
    { name: 'Geography', icon: 'fa-globe', description: 'Exploring our world', nameKey: 'geography', descriptionKey: 'geographyDesc' },
    { name: 'Computer Science', icon: 'fa-computer', description: 'Programming and technology', nameKey: 'computerScience', descriptionKey: 'computerScienceDesc' },
    { name: 'Art', icon: 'fa-palette', description: 'Creative expression and design', nameKey: 'art', descriptionKey: 'artDesc' }
  ],
  grades: [
    { grade: 1, description: 'Foundation building with fun learning' },
    { grade: 2, description: 'Developing core academic skills' },
    { grade: 3, description: 'Expanding knowledge and curiosity' },
    { grade: 4, description: 'Building confidence in learning' },
    { grade: 5, description: 'Preparing for middle school' },
    { grade: 6, description: 'Transitioning to advanced concepts' },
    { grade: 7, description: 'Developing critical thinking' },
    { grade: 8, description: 'Preparing for high school' },
    { grade: 9, description: 'High school foundation' },
    { grade: 10, description: 'Advanced academic preparation' },
    { grade: 11, description: 'Pre-university excellence' },
    { grade: 12, description: 'University preparation and success' }
  ],
  contact: {
    phone: '+20 10 62641866',
    telegram: 'https://t.me/iivoz',
    email: 'info@sts-academy.com',
    address: 'Cairo, Egypt',
    socialMedia: {
      facebook: '#',
      twitter: '#',
      instagram: '#',
      linkedin: '#'
    }
  },
  footer: {
    copyright: '© 2025 STS. All rights reserved.',
    description: 'Steps to Success Academy - Empowering students to achieve excellence in education.'
  }
}

export const SiteProvider = ({ children }) => {
  const [siteData, setSiteData] = useState(defaultSiteData)
  const [isLoading, setIsLoading] = useState(false)

  // Load site data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('stsAcademySiteData')
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setSiteData({ ...defaultSiteData, ...parsedData })
      } catch (error) {
        console.error('Error parsing saved site data:', error)
      }
    }
  }, [])

  // Save site data to localStorage whenever it changes
  const updateSiteData = (newData) => {
    const updatedData = { ...siteData, ...newData }
    setSiteData(updatedData)
    localStorage.setItem('stsAcademySiteData', JSON.stringify(updatedData))
  }

  // Update specific section
  const updateSection = (section, data) => {
    updateSiteData({ [section]: { ...siteData[section], ...data } })
  }

  // Reset to default data
  const resetToDefault = () => {
    setSiteData(defaultSiteData)
    localStorage.removeItem('stsAcademySiteData')
  }

  const value = {
    siteData,
    updateSiteData,
    updateSection,
    resetToDefault,
    isLoading,
    setIsLoading
  }

  return (
    <SiteContext.Provider value={value}>
      {children}
    </SiteContext.Provider>
  )
}