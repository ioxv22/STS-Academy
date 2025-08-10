import React, { useEffect, useState } from 'react'
import { useSite } from '../context/SiteContext'
import { useLanguage } from '../context/LanguageContext'
import { openWhatsApp, whatsAppMessages } from '../utils/whatsapp'

const Hero = () => {
  const { siteData } = useSite()
  const { t, isRTL } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleJoinNow = () => {
    const message = isRTL ? whatsAppMessages.joinAcademy.ar : whatsAppMessages.joinAcademy.en
    openWhatsApp(siteData.contact.phone, message)
  }

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${siteData.branding.colors.primary} 0%, #1e40af 50%, ${siteData.branding.colors.secondary} 100%)`
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gold-400/20 rounded-full animate-bounce-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-gold-400/30 rounded-full animate-ping"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Logo */}
          <div className="mb-8">
            <img 
              src={siteData.branding.logo} 
              alt="STS Logo" 
              className="h-24 w-auto mx-auto mb-6 animate-fade-in"
            />
          </div>

          {/* Main Title */}
          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight ${isRTL ? 'font-arabic' : ''}`}>
            <span className="block">{t('heroTitle')}</span>
          </h1>

          {/* Subtitle */}
          <h2 className={`text-xl md:text-2xl lg:text-3xl text-gold-400 font-semibold mb-8 max-w-4xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
            {t('heroSubtitle')}
          </h2>

          {/* Description */}
          <p className={`text-lg md:text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
            {t('heroDescription')}
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            <button
              onClick={handleJoinNow}
              className={`btn-secondary text-lg px-8 py-4 rounded-full font-bold shadow-2xl hover:shadow-gold-400/25 transition-all duration-300 transform hover:scale-105 ${isRTL ? 'font-arabic' : ''}`}
            >
              <i className={`fab fa-whatsapp ${isRTL ? 'ml-2' : 'mr-2'}`}></i>
              {t('joinNow')}
            </button>
            
            <button
              onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
              className={`text-white border-2 border-white/50 px-8 py-4 rounded-full font-semibold hover:bg-white/10 hover:border-white transition-all duration-300 transform hover:scale-105 ${isRTL ? 'font-arabic' : ''}`}
            >
              {t('learnMore')}
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gold-400 mb-2">12</div>
              <div className={`text-white/80 ${isRTL ? 'font-arabic' : ''}`}>{t('gradesCovered')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gold-400 mb-2">10+</div>
              <div className={`text-white/80 ${isRTL ? 'font-arabic' : ''}`}>{t('subjectsTaught')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gold-400 mb-2">100%</div>
              <div className={`text-white/80 ${isRTL ? 'font-arabic' : ''}`}>{t('expertTeachers')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero