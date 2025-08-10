import React, { useEffect, useRef, useState } from 'react'
import { useSite } from '../context/SiteContext'
import { useLanguage } from '../context/LanguageContext'
import { openWhatsApp, whatsAppMessages } from '../utils/whatsapp'

const About = () => {
  const { siteData } = useSite()
  const { t, isRTL } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-dark-800 dark:to-dark-900"
    >
      <div className="container mx-auto px-4">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold text-primary-900 dark:text-white mb-6 ${isRTL ? 'font-arabic' : ''}`}>
              {t('aboutTitle')}
            </h2>
            <div className="w-24 h-1 bg-gold-400 mx-auto mb-8"></div>
          </div>

          <div className={`grid lg:grid-cols-2 gap-12 items-center ${isRTL ? 'lg:grid-flow-col-dense' : ''}`}>
            {/* Content */}
            <div className={`space-y-8 ${isRTL ? 'lg:col-start-2' : ''}`}>
              <p className={`text-lg text-gray-700 dark:text-gray-300 leading-relaxed ${isRTL ? 'font-arabic text-right' : ''}`}>
                {t('aboutDescription')}
              </p>

              {/* Features List */}
              <div className="space-y-4">
                {t('aboutFeatures').map((feature, index) => (
                  <div 
                    key={index}
                    className={`flex items-center transition-all duration-500 ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                    } ${isRTL ? 'space-x-reverse flex-row-reverse' : 'space-x-4'}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-gold-400 rounded-full flex items-center justify-center">
                      <i className="fas fa-check text-primary-900 text-sm"></i>
                    </div>
                    <span className={`text-gray-700 dark:text-gray-300 font-medium ${isRTL ? 'font-arabic' : ''}`}>{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="pt-6">
                <button
                  onClick={() => {
                    const message = isRTL ? whatsAppMessages.general.ar : whatsAppMessages.general.en
                    openWhatsApp(siteData.contact.phone, message)
                  }}
                  className={`btn-primary inline-flex items-center ${isRTL ? 'font-arabic' : ''}`}
                >
                  <i className={`fab fa-whatsapp ${isRTL ? 'ml-2' : 'mr-2'}`}></i>
                  {t('getStartedToday')}
                </button>
              </div>
            </div>

            {/* Visual Element */}
            <div className={`relative ${isRTL ? 'lg:col-start-1' : ''}`}>
              <div className="relative z-10 bg-white dark:bg-dark-800 rounded-2xl shadow-2xl p-8">
                {/* Achievement Cards */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
                    <div className="text-3xl font-bold text-primary-900 dark:text-primary-400 mb-2">12</div>
                    <div className={`text-sm text-gray-600 dark:text-gray-400 ${isRTL ? 'font-arabic' : ''}`}>{t('grades')}</div>
                    <div className={`text-sm text-gray-600 dark:text-gray-400 ${isRTL ? 'font-arabic' : ''}`}>{t('gradesCovered').split(' ')[1]}</div>
                  </div>
                  <div className="text-center p-6 bg-gold-50 dark:bg-gold-900/20 rounded-xl">
                    <div className="text-3xl font-bold text-gold-600 dark:text-gold-400 mb-2">10+</div>
                    <div className={`text-sm text-gray-600 dark:text-gray-400 ${isRTL ? 'font-arabic' : ''}`}>{t('subjects')}</div>
                    <div className={`text-sm text-gray-600 dark:text-gray-400 ${isRTL ? 'font-arabic' : ''}`}>متاحة</div>
                  </div>
                  <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">100%</div>
                    <div className={`text-sm text-gray-600 dark:text-gray-400 ${isRTL ? 'font-arabic' : ''}`}>{t('expertTeachers').split(' ')[0]}</div>
                    <div className={`text-sm text-gray-600 dark:text-gray-400 ${isRTL ? 'font-arabic' : ''}`}>{t('expertTeachers').split(' ')[1]}</div>
                  </div>
                  <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">24/7</div>
                    <div className={`text-sm text-gray-600 dark:text-gray-400 ${isRTL ? 'font-arabic' : ''}`}>{t('supportAvailable').split(' ')[0]}</div>
                    <div className={`text-sm text-gray-600 dark:text-gray-400 ${isRTL ? 'font-arabic' : ''}`}>{t('supportAvailable').split(' ')[1]}</div>
                  </div>
                </div>

                {/* Mission Statement */}
                <div className="mt-8 p-6 bg-gradient-to-r from-primary-900 to-primary-800 rounded-xl text-white text-center">
                  <i className="fas fa-graduation-cap text-3xl text-gold-400 mb-4"></i>
                  <h3 className={`text-xl font-semibold mb-2 ${isRTL ? 'font-arabic' : ''}`}>{t('ourMission')}</h3>
                  <p className={`text-sm opacity-90 ${isRTL ? 'font-arabic' : ''}`}>
                    {t('missionText')}
                  </p>
                </div>
              </div>

              {/* Background Decorations */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold-400/20 rounded-full"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-900/10 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About