import React, { useState, useEffect } from 'react'
import { useSite } from '../context/SiteContext'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import ThemeLanguageToggle from './ThemeLanguageToggle'

const Header = () => {
  const { siteData } = useSite()
  const { t, isRTL } = useLanguage()
  const { isDarkMode } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  const navItems = [
    { name: t('home'), id: 'hero' },
    { name: t('about'), id: 'about' },
    { name: t('subjects'), id: 'subjects' },
    { name: t('grades'), id: 'grades' },
    { name: t('contact'), id: 'contact' }
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-dark-900/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => scrollToSection('hero')}
          >
            <img 
              src={siteData.branding.logo} 
              alt="STS Logo" 
              className="h-12 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center space-x-8 ${isRTL ? 'space-x-reverse' : ''}`}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-medium transition-colors duration-300 hover:text-gold-400 ${
                  isScrolled ? 'text-primary-900 dark:text-white' : 'text-white'
                }`}
              >
                {item.name}
              </button>
            ))}
            
            {/* Theme & Language Toggle */}
            <ThemeLanguageToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span 
                className={`block w-6 h-0.5 transition-all duration-300 ${
                  isScrolled ? 'bg-primary-900 dark:bg-white' : 'bg-white'
                } ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}
              />
              <span 
                className={`block w-6 h-0.5 mt-1 transition-all duration-300 ${
                  isScrolled ? 'bg-primary-900 dark:bg-white' : 'bg-white'
                } ${isMobileMenuOpen ? 'opacity-0' : ''}`}
              />
              <span 
                className={`block w-6 h-0.5 mt-1 transition-all duration-300 ${
                  isScrolled ? 'bg-primary-900 dark:bg-white' : 'bg-white'
                } ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden absolute top-full left-0 right-0 bg-white dark:bg-dark-800 shadow-lg transition-all duration-300 ${
            isMobileMenuOpen 
              ? 'opacity-100 visible transform translate-y-0' 
              : 'opacity-0 invisible transform -translate-y-4'
          }`}
        >
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full font-medium text-primary-900 dark:text-white hover:text-gold-400 transition-colors duration-300 py-2 ${
                  isRTL ? 'text-right' : 'text-left'
                }`}
              >
                {item.name}
              </button>
            ))}
            
            {/* Mobile Theme & Language Toggle */}
            <div className="pt-4 border-t border-gray-200 dark:border-dark-600">
              <ThemeLanguageToggle />
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header