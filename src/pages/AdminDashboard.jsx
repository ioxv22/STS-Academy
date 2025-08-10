import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSite } from '../context/SiteContext'

const AdminDashboard = () => {
  const { siteData, updateSection, resetToDefault } = useSite()
  const [activeTab, setActiveTab] = useState('hero')
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('stsAdminToken')
    navigate('/admin/login')
  }

  const showSuccess = (message) => {
    setSuccessMessage(message)
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const tabs = [
    { id: 'hero', name: 'Hero Section', icon: 'fa-home' },
    { id: 'about', name: 'About Section', icon: 'fa-info-circle' },
    { id: 'subjects', name: 'Subjects', icon: 'fa-book' },
    { id: 'grades', name: 'Grades', icon: 'fa-graduation-cap' },
    { id: 'contact', name: 'Contact', icon: 'fa-phone' },
    { id: 'branding', name: 'Branding', icon: 'fa-palette' }
  ]

  const HeroEditor = () => {
    const [heroData, setHeroData] = useState(siteData.hero)

    const handleSave = () => {
      updateSection('hero', heroData)
      showSuccess('Hero section updated successfully!')
    }

    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-800">Hero Section</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Title</label>
            <input
              type="text"
              value={heroData.title}
              onChange={(e) => setHeroData({...heroData, title: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Subtitle</label>
            <input
              type="text"
              value={heroData.subtitle}
              onChange={(e) => setHeroData({...heroData, subtitle: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            value={heroData.description}
            onChange={(e) => setHeroData({...heroData, description: e.target.value})}
            rows="3"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">CTA Button Text</label>
          <input
            type="text"
            value={heroData.ctaText}
            onChange={(e) => setHeroData({...heroData, ctaText: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <button
          onClick={handleSave}
          className="btn-primary"
        >
          <i className="fas fa-save mr-2"></i>
          Save Changes
        </button>
      </div>
    )
  }

  const AboutEditor = () => {
    const [aboutData, setAboutData] = useState(siteData.about)

    const handleSave = () => {
      updateSection('about', aboutData)
      showSuccess('About section updated successfully!')
    }

    const updateFeature = (index, value) => {
      const newFeatures = [...aboutData.features]
      newFeatures[index] = value
      setAboutData({...aboutData, features: newFeatures})
    }

    const addFeature = () => {
      setAboutData({...aboutData, features: [...aboutData.features, 'New feature']})
    }

    const removeFeature = (index) => {
      const newFeatures = aboutData.features.filter((_, i) => i !== index)
      setAboutData({...aboutData, features: newFeatures})
    }

    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-800">About Section</h3>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            value={aboutData.title}
            onChange={(e) => setAboutData({...aboutData, title: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            value={aboutData.description}
            onChange={(e) => setAboutData({...aboutData, description: e.target.value})}
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Features</label>
          {aboutData.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => updateFeature(index, e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
              <button
                onClick={() => removeFeature(index)}
                className="text-red-500 hover:text-red-700 p-2"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ))}
          <button
            onClick={addFeature}
            className="text-primary-600 hover:text-primary-800 font-medium"
          >
            <i className="fas fa-plus mr-2"></i>
            Add Feature
          </button>
        </div>

        <button
          onClick={handleSave}
          className="btn-primary"
        >
          <i className="fas fa-save mr-2"></i>
          Save Changes
        </button>
      </div>
    )
  }

  const SubjectsEditor = () => {
    const [subjectsData, setSubjectsData] = useState(siteData.subjects)

    const handleSave = () => {
      updateSection('subjects', subjectsData)
      showSuccess('Subjects updated successfully!')
    }

    const updateSubject = (index, field, value) => {
      const newSubjects = [...subjectsData]
      newSubjects[index] = {...newSubjects[index], [field]: value}
      setSubjectsData(newSubjects)
    }

    const addSubject = () => {
      setSubjectsData([...subjectsData, { name: 'New Subject', icon: 'fa-book', description: 'Subject description' }])
    }

    const removeSubject = (index) => {
      const newSubjects = subjectsData.filter((_, i) => i !== index)
      setSubjectsData(newSubjects)
    }

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-800">Subjects</h3>
          <button
            onClick={addSubject}
            className="btn-secondary"
          >
            <i className="fas fa-plus mr-2"></i>
            Add Subject
          </button>
        </div>

        <div className="grid gap-4">
          {subjectsData.map((subject, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Subject Name</label>
                  <input
                    type="text"
                    value={subject.name}
                    onChange={(e) => updateSubject(index, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Icon (FontAwesome class)</label>
                  <input
                    type="text"
                    value={subject.icon}
                    onChange={(e) => updateSubject(index, 'icon', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="fa-calculator"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => removeSubject(index)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 font-medium mb-2">Description</label>
                <input
                  type="text"
                  value={subject.description}
                  onChange={(e) => updateSubject(index, 'description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSave}
          className="btn-primary"
        >
          <i className="fas fa-save mr-2"></i>
          Save Changes
        </button>
      </div>
    )
  }

  const GradesEditor = () => {
    const [gradesData, setGradesData] = useState(siteData.grades)

    const handleSave = () => {
      updateSection('grades', gradesData)
      showSuccess('Grades updated successfully!')
    }

    const updateGrade = (index, field, value) => {
      const newGrades = [...gradesData]
      newGrades[index] = {...newGrades[index], [field]: value}
      setGradesData(newGrades)
    }

    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-800">Grades</h3>

        <div className="grid gap-4">
          {gradesData.map((grade, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <div className="grid md:grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Grade {grade.grade}</label>
                  <input
                    type="number"
                    value={grade.grade}
                    onChange={(e) => updateGrade(index, 'grade', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    min="1"
                    max="12"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Description</label>
                  <input
                    type="text"
                    value={grade.description}
                    onChange={(e) => updateGrade(index, 'description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSave}
          className="btn-primary"
        >
          <i className="fas fa-save mr-2"></i>
          Save Changes
        </button>
      </div>
    )
  }

  const ContactEditor = () => {
    const [contactData, setContactData] = useState(siteData.contact)

    const handleSave = () => {
      updateSection('contact', contactData)
      showSuccess('Contact information updated successfully!')
    }

    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-800">Contact Information</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Phone</label>
            <input
              type="text"
              value={contactData.phone}
              onChange={(e) => setContactData({...contactData, phone: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              value={contactData.email}
              onChange={(e) => setContactData({...contactData, email: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Telegram URL</label>
            <input
              type="url"
              value={contactData.telegram}
              onChange={(e) => setContactData({...contactData, telegram: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Address</label>
            <input
              type="text"
              value={contactData.address}
              onChange={(e) => setContactData({...contactData, address: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-4">Social Media Links</h4>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(contactData.socialMedia).map(([platform, url]) => (
              <div key={platform}>
                <label className="block text-gray-700 font-medium mb-2 capitalize">{platform}</label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setContactData({
                    ...contactData, 
                    socialMedia: {...contactData.socialMedia, [platform]: e.target.value}
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleSave}
          className="btn-primary"
        >
          <i className="fas fa-save mr-2"></i>
          Save Changes
        </button>
      </div>
    )
  }

  const BrandingEditor = () => {
    const [brandingData, setBrandingData] = useState(siteData.branding)

    const handleSave = () => {
      updateSection('branding', brandingData)
      showSuccess('Branding updated successfully!')
    }

    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-800">Branding</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Site Name</label>
            <input
              type="text"
              value={brandingData.siteName}
              onChange={(e) => setBrandingData({...brandingData, siteName: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Slogan</label>
            <input
              type="text"
              value={brandingData.slogan}
              onChange={(e) => setBrandingData({...brandingData, slogan: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Logo URL</label>
          <input
            type="text"
            value={brandingData.logo}
            onChange={(e) => setBrandingData({...brandingData, logo: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            placeholder="/logo.svg"
          />
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-4">Brand Colors</h4>
          <div className="grid md:grid-cols-3 gap-4">
            {Object.entries(brandingData.colors).map(([colorName, colorValue]) => (
              <div key={colorName}>
                <label className="block text-gray-700 font-medium mb-2 capitalize">{colorName}</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={colorValue}
                    onChange={(e) => setBrandingData({
                      ...brandingData, 
                      colors: {...brandingData.colors, [colorName]: e.target.value}
                    })}
                    className="w-12 h-12 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="text"
                    value={colorValue}
                    onChange={(e) => setBrandingData({
                      ...brandingData, 
                      colors: {...brandingData.colors, [colorName]: e.target.value}
                    })}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleSave}
          className="btn-primary"
        >
          <i className="fas fa-save mr-2"></i>
          Save Changes
        </button>
      </div>
    )
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'hero': return <HeroEditor />
      case 'about': return <AboutEditor />
      case 'subjects': return <SubjectsEditor />
      case 'grades': return <GradesEditor />
      case 'contact': return <ContactEditor />
      case 'branding': return <BrandingEditor />
      default: return <HeroEditor />
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img src="/logo.svg" alt="STS Logo" className="h-10 w-auto" />
              <h1 className="text-2xl font-bold text-primary-900">STS Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.open('/', '_blank')}
                className="text-gray-600 hover:text-primary-600 transition-colors duration-300"
              >
                <i className="fas fa-external-link-alt mr-2"></i>
                View Site
              </button>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 transition-colors duration-300"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 mx-4 mt-4 rounded-lg">
          <i className="fas fa-check-circle mr-2"></i>
          {successMessage}
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Sections</h2>
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-300 flex items-center space-x-3 ${
                      activeTab === tab.id
                        ? 'bg-primary-100 text-primary-800 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <i className={`fas ${tab.icon}`}></i>
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>

              {/* Quick Actions */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-800 mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to reset all content to default? This cannot be undone.')) {
                        resetToDefault()
                        showSuccess('All content reset to default!')
                      }
                    }}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-300"
                  >
                    <i className="fas fa-undo mr-2"></i>
                    Reset to Default
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-8">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard