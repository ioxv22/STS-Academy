import React, { useEffect, useRef, useState } from 'react'
import { useSite } from '../context/SiteContext'
import { useLanguage } from '../context/LanguageContext'
import { openWhatsApp, whatsAppMessages } from '../utils/whatsapp'

const Subjects = () => {
  const { t, isRTL } = useLanguage()
  const { siteData } = useSite()
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredSubject, setHoveredSubject] = useState(null)
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

  const handleSubjectClick = (subject) => {
    const subjectName = t(subject.nameKey) || subject.name
    const message = isRTL 
      ? whatsAppMessages.subjectInquiry.ar(subjectName)
      : whatsAppMessages.subjectInquiry.en(subjectName)
    openWhatsApp(siteData.contact.phone, message)
  }

  return (
    <section 
      id="subjects" 
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900"
    >
      <div className="container mx-auto px-4">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold text-white mb-6 ${isRTL ? 'font-arabic' : ''}`}>
              {t('ourSubjects')}
            </h2>
            <div className="w-24 h-1 bg-gold-400 mx-auto mb-8"></div>
            <p className={`text-xl text-white/80 max-w-3xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
              {t('subjectsDescription')}
            </p>
          </div>

          {/* Subjects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {siteData.subjects.map((subject, index) => (
              <div
                key={index}
                className={`group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredSubject(index)}
                onMouseLeave={() => setHoveredSubject(null)}
                onClick={() => handleSubjectClick(subject)}
              >
                {/* Background Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl opacity-0 group-hover:opacity-95 transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-gold-400 to-gold-500 flex items-center justify-center transition-all duration-300 ${
                    hoveredSubject === index ? 'scale-110' : ''
                  }`}>
                    <i className={`fas ${subject.icon} text-2xl text-primary-900`}></i>
                  </div>

                  {/* Subject Name */}
                  <h3 className={`text-xl font-bold text-center mb-3 transition-colors duration-300 ${
                    hoveredSubject === index ? 'text-white' : 'text-primary-900 dark:text-primary-800'
                  } ${isRTL ? 'font-arabic' : ''}`}>
                    {t(subject.nameKey) || subject.name}
                  </h3>

                  {/* Description */}
                  <p className={`text-center text-sm leading-relaxed transition-colors duration-300 ${
                    hoveredSubject === index ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'
                  } ${isRTL ? 'font-arabic' : ''}`}>
                    {t(subject.descriptionKey) || subject.description}
                  </p>

                  {/* Hover CTA */}
                  <div className={`mt-4 text-center transition-all duration-300 ${
                    hoveredSubject === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  }`}>
                    <span className={`text-gold-400 font-semibold text-sm ${isRTL ? 'font-arabic' : ''}`}>
                      {t('clickToLearnMore')}
                    </span>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-2 right-2 w-8 h-8 bg-gold-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-2 left-2 w-6 h-6 bg-white dark:bg-dark-800/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <p className={`text-white/80 mb-6 text-lg ${isRTL ? 'font-arabic' : ''}`}>
              {t('dontSeeSubject')}
            </p>
            <button
              onClick={() => {
                const message = isRTL ? whatsAppMessages.otherSubjects.ar : whatsAppMessages.otherSubjects.en
                openWhatsApp(siteData.contact.phone, message)
              }}
              className={`btn-secondary inline-flex items-center ${isRTL ? 'font-arabic' : ''}`}
            >
              <i className={`fab fa-whatsapp ${isRTL ? 'ml-2' : 'mr-2'}`}></i>
              {t('askAboutOtherSubjects')}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Subjects