import React, { useEffect, useRef, useState } from 'react'
import { useSite } from '../context/SiteContext'
import { useLanguage } from '../context/LanguageContext'
import { openWhatsApp, whatsAppMessages } from '../utils/whatsapp'

const Contact = () => {
  const { t, isRTL } = useLanguage()
  const { siteData } = useSite()
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    grade: '',
    subject: '',
    message: ''
  })
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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const message = isRTL 
      ? whatsAppMessages.contactForm.ar(formData)
      : whatsAppMessages.contactForm.en(formData)
    openWhatsApp(siteData.contact.phone, message)
  }

  const contactMethods = [
    {
      icon: 'fa-phone',
      title: t('phone'),
      value: siteData.contact.phone,
      action: () => window.open(`tel:${siteData.contact.phone}`, '_self'),
      color: 'green'
    },
    {
      icon: 'fab fa-telegram',
      title: t('telegram'),
      value: t('developerContact'),
      action: () => window.open(siteData.contact.telegram, '_blank'),
      color: 'blue'
    },
    {
      icon: 'fab fa-whatsapp',
      title: t('whatsapp'),
      value: t('quickMessage'),
      action: () => {
        const message = isRTL ? whatsAppMessages.general.ar : whatsAppMessages.general.en
        openWhatsApp(siteData.contact.phone, message)
      },
      color: 'green'
    }
  ]

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900"
    >
      <div className="container mx-auto px-4">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-gold-400 mx-auto mb-8"></div>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Ready to start your educational journey? Contact us today and let's discuss how we can help you succeed.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                <div className="space-y-4">
                  {contactMethods.map((method, index) => (
                    <div
                      key={index}
                      className={`group flex items-center space-x-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 cursor-pointer ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                      onClick={method.action}
                    >
                      <div className={`w-12 h-12 bg-${method.color}-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <i className={`${method.icon} text-white text-lg`}></i>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{method.title}</h4>
                        <p className="text-white/70">{method.value}</p>
                      </div>
                      <div className="ml-auto">
                        <i className="fas fa-arrow-right text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"></i>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Follow Us</h3>
                <div className="flex space-x-4">
                  {[
                    { icon: 'fab fa-facebook', color: 'blue', url: siteData.contact.socialMedia.facebook },
                    { icon: 'fab fa-twitter', color: 'sky', url: siteData.contact.socialMedia.twitter },
                    { icon: 'fab fa-instagram', color: 'pink', url: siteData.contact.socialMedia.instagram },
                    { icon: 'fab fa-linkedin', color: 'blue', url: siteData.contact.socialMedia.linkedin }
                  ].map((social, index) => (
                    <button
                      key={index}
                      onClick={() => window.open(social.url, '_blank')}
                      className={`w-12 h-12 bg-${social.color}-500 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-lg`}
                    >
                      <i className={`${social.icon} text-white text-lg`}></i>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white dark:bg-dark-800/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Why Choose STS?</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gold-400">12</div>
                    <div className="text-white/70 text-sm">Grades</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gold-400">10+</div>
                    <div className="text-white/70 text-sm">Subjects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gold-400">100%</div>
                    <div className="text-white/70 text-sm">Expert Teachers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gold-400">24/7</div>
                    <div className="text-white/70 text-sm">Support</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white dark:bg-dark-800 rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-primary-900 dark:text-white mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Grade Level</label>
                    <select
                      name="grade"
                      value={formData.grade}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select Grade</option>
                      {siteData.grades.map((grade) => (
                        <option key={grade.grade} value={grade.grade}>
                          Grade {grade.grade}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Subject of Interest</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select Subject</option>
                    {siteData.subjects.map((subject, index) => (
                      <option key={index} value={subject.name}>
                        {subject.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    placeholder="Tell us more about your learning goals..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary text-lg py-4 flex items-center justify-center"
                >
                  <i className="fab fa-whatsapp mr-2"></i>
                  Send Message via WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact