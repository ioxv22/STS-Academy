import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'

const ThemeLanguageToggle = ({ className = '' }) => {
  const { isDarkMode, toggleTheme } = useTheme()
  const { currentLanguage, changeLanguage, t, isRTL } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const handleLanguageChange = (lang) => {
    changeLanguage(lang)
    setIsOpen(false)
  }

  return (
    <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''} ${className}`}>
      {/* Language Selector */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 text-white"
        >
          <i className="fas fa-globe text-sm"></i>
          <span className="text-sm font-medium">
            {currentLanguage === 'ar' ? 'عربي' : 'EN'}
          </span>
          <i className={`fas fa-chevron-down text-xs transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
        </button>

        {/* Language Dropdown */}
        {isOpen && (
          <div className="absolute top-full mt-2 right-0 bg-white dark:bg-dark-800 rounded-lg shadow-lg border border-gray-200 dark:border-dark-600 min-w-[120px] z-50">
            <button
              onClick={() => handleLanguageChange('en')}
              className={`w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors duration-300 flex items-center space-x-2 ${
                currentLanguage === 'en' ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'
              } ${isRTL ? 'text-right' : ''}`}
            >
              <span className="text-lg">🇺🇸</span>
              <span>English</span>
              {currentLanguage === 'en' && <i className="fas fa-check text-xs ml-auto"></i>}
            </button>
            <button
              onClick={() => handleLanguageChange('ar')}
              className={`w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors duration-300 flex items-center space-x-2 rounded-b-lg ${
                currentLanguage === 'ar' ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'
              } ${isRTL ? 'text-right' : ''}`}
            >
              <span className="text-lg">🇪🇬</span>
              <span>العربية</span>
              {currentLanguage === 'ar' && <i className="fas fa-check text-xs ml-auto"></i>}
            </button>
          </div>
        )}
      </div>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 text-white hover:scale-105"
        title={isDarkMode ? t('lightMode') : t('darkMode')}
      >
        <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'} text-lg transition-transform duration-300 ${isDarkMode ? 'rotate-180' : ''}`}></i>
      </button>

      {/* Close dropdown when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

export default ThemeLanguageToggle