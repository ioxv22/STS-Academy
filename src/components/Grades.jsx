import React, { useEffect, useRef, useState } from 'react'
import { useSite } from '../context/SiteContext'
import { useLanguage } from '../context/LanguageContext'
import { openWhatsApp, whatsAppMessages } from '../utils/whatsapp'

const Grades = () => {
  const { t, isRTL } = useLanguage()
  const { siteData } = useSite()
  const [isVisible, setIsVisible] = useState(false)
  const [selectedGrade, setSelectedGrade] = useState(null)
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

  const handleGradeClick = (grade) => {
    const message = isRTL 
      ? whatsAppMessages.gradeInquiry.ar(grade.grade)
      : whatsAppMessages.gradeInquiry.en(grade.grade)
    openWhatsApp(siteData.contact.phone, message)
  }

  const getGradeColor = (grade) => {
    if (grade <= 3) return 'from-green-400 to-green-600'
    if (grade <= 6) return 'from-blue-400 to-blue-600'
    if (grade <= 9) return 'from-purple-400 to-purple-600'
    return 'from-red-400 to-red-600'
  }

  const getGradeLevel = (grade) => {
    if (grade <= 3) return t('elementary')
    if (grade <= 6) return t('primary')
    if (grade <= 9) return t('middleSchool')
    return t('highSchool')
  }

  return (
    <section 
      id="grades" 
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-dark-800 dark:to-dark-900"
    >
      <div className="container mx-auto px-4">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold text-primary-900 dark:text-white mb-6 ${isRTL ? 'font-arabic' : ''}`}>
              {t('allGradesCovered')}
            </h2>
            <div className="w-24 h-1 bg-gold-400 mx-auto mb-8"></div>
            <p className={`text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
              {t('gradesDescription')}
            </p>
          </div>

          {/* Grade Level Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              { level: 'Elementary', grades: '1-3', color: 'green', icon: 'fa-seedling' },
              { level: 'Primary', grades: '4-6', color: 'blue', icon: 'fa-book-open' },
              { level: 'Middle School', grades: '7-9', color: 'purple', icon: 'fa-graduation-cap' },
              { level: 'High School', grades: '10-12', color: 'red', icon: 'fa-university' }
            ].map((category, index) => (
              <div
                key={index}
                className={`text-center p-6 rounded-2xl shadow-lg transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-${category.color}-400 to-${category.color}-600 flex items-center justify-center`}>
                  <i className={`fas ${category.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="text-xl font-bold text-primary-900 dark:text-white mb-2">{category.level}</h3>
                <p className="text-gray-600 dark:text-gray-400">Grades {category.grades}</p>
              </div>
            ))}
          </div>

          {/* Individual Grades Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {siteData.grades.map((gradeData, index) => (
              <div
                key={index}
                className={`group relative bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
                onMouseEnter={() => setSelectedGrade(index)}
                onMouseLeave={() => setSelectedGrade(null)}
                onClick={() => handleGradeClick(gradeData)}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getGradeColor(gradeData.grade)} rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="relative z-10 text-center">
                  {/* Grade Number */}
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br ${getGradeColor(gradeData.grade)} flex items-center justify-center transition-all duration-300 ${
                    selectedGrade === index ? 'scale-110' : ''
                  }`}>
                    <span className="text-white font-bold text-lg">{gradeData.grade}</span>
                  </div>

                  {/* Grade Level */}
                  <div className="text-xs text-gray-500 mb-2 font-medium">
                    {getGradeLevel(gradeData.grade)}
                  </div>

                  {/* Grade Title */}
                  <h3 className="text-sm font-bold text-primary-900 dark:text-white mb-2">
                    Grade {gradeData.grade}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    {gradeData.description}
                  </p>

                  {/* Hover Indicator */}
                  <div className={`mt-3 transition-all duration-300 ${
                    selectedGrade === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  }`}>
                    <span className="text-gold-500 text-xs font-semibold">
                      Click to Enroll →
                    </span>
                  </div>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-2 right-2 w-3 h-3 bg-gold-400/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-primary-900 to-primary-800 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                No matter what grade you're in, we have the perfect program to help you succeed. 
                Our expert teachers are ready to guide you every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    const phoneNumber = siteData.contact.phone.replace(/\s+/g, '').replace('+', '')
                    const message = encodeURIComponent('Hello! I would like to enroll in STS Academy. Please provide me with enrollment information.')
                    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
                  }}
                  className="btn-secondary inline-flex items-center"
                >
                  <i className="fab fa-whatsapp mr-2"></i>
                  Enroll Now
                </button>
                <button
                  onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                  className="text-white border-2 border-white/50 px-6 py-3 rounded-lg font-semibold hover:bg-white dark:bg-dark-800/10 hover:border-white transition-all duration-300"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Grades