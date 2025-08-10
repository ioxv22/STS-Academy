import React, { useState, useEffect } from 'react'
import { useSite } from '../context/SiteContext'
import { useLanguage } from '../context/LanguageContext'
import { openWhatsApp, whatsAppMessages } from '../utils/whatsapp'

const FloatingWhatsApp = () => {
  const { siteData } = useSite()
  const { t, isRTL } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    // Show the button after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleClick = () => {
    const message = isRTL ? whatsAppMessages.general.ar : whatsAppMessages.general.en
    openWhatsApp(siteData.contact.phone, message)
  }

  if (!isVisible) return null

  return (
    <div className={`fixed bottom-6 z-50 ${isRTL ? 'left-6' : 'right-6'}`}>
      {/* Tooltip */}
      <div 
        className={`absolute bottom-full mb-2 px-3 py-2 bg-gray-800 dark:bg-gray-700 text-white text-sm rounded-lg shadow-lg transition-all duration-300 whitespace-nowrap ${
          isHovered ? 'opacity-100 visible' : 'opacity-0 invisible'
        } ${isRTL ? 'right-0 font-arabic' : 'left-0'}`}
      >
        {isRTL ? 'تحدث معنا على واتساب' : 'Chat with us on WhatsApp'}
        <div className={`absolute top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800 dark:border-t-gray-700 ${
          isRTL ? 'right-4' : 'left-4'
        }`}></div>
      </div>

      {/* WhatsApp Button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center animate-pulse hover:animate-none transform hover:scale-110"
        aria-label={isRTL ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}
      >
        {/* Ripple Effect */}
        <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20"></div>
        
        {/* WhatsApp Icon */}
        <i className="fab fa-whatsapp text-white text-2xl relative z-10"></i>
        
        {/* Notification Badge */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">1</span>
        </div>
      </button>

      {/* Pulsing Ring Animation */}
      <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-ping opacity-30"></div>
    </div>
  )
}

export default FloatingWhatsApp