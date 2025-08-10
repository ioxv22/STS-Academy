import React from 'react'
import { useSite } from '../context/SiteContext'
import { useLanguage } from '../context/LanguageContext'
import { openWhatsApp, whatsAppMessages } from '../utils/whatsapp'

const Footer = () => {
  const { t, isRTL } = useLanguage()
  const { siteData } = useSite()

  const quickLinks = [
    { name: t('home'), id: 'hero' },
    { name: t('about'), id: 'about' },
    { name: t('subjects'), id: 'subjects' },
    { name: t('grades'), id: 'grades' },
    { name: t('contact'), id: 'contact' }
  ]

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleWhatsApp = () => {
    const message = isRTL ? whatsAppMessages.general.ar : whatsAppMessages.general.en
    openWhatsApp(siteData.contact.phone, message)
  }

  return (
    <footer className="bg-primary-900 dark:bg-dark-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ${isRTL ? 'text-right' : ''}`}>
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className={`flex items-center mb-6 ${isRTL ? 'space-x-reverse flex-row-reverse' : 'space-x-3'}`}>
              <img 
                src={siteData.branding.logo} 
                alt="STS Logo" 
                className="h-12 w-auto"
              />
            </div>
            <p className={`text-white/80 mb-6 leading-relaxed max-w-md ${isRTL ? 'font-arabic' : ''}`}>
              {t('footerDescription')}
            </p>
            <div className="flex space-x-4">
              {[
                { icon: 'fab fa-facebook', color: 'hover:text-blue-400', url: siteData.contact.socialMedia.facebook },
                { icon: 'fab fa-twitter', color: 'hover:text-sky-400', url: siteData.contact.socialMedia.twitter },
                { icon: 'fab fa-instagram', color: 'hover:text-pink-400', url: siteData.contact.socialMedia.instagram },
                { icon: 'fab fa-linkedin', color: 'hover:text-blue-400', url: siteData.contact.socialMedia.linkedin }
              ].map((social, index) => (
                <button
                  key={index}
                  onClick={() => window.open(social.url, '_blank')}
                  className={`w-10 h-10 bg-white/10 rounded-full flex items-center justify-center ${social.color} transition-all duration-300 hover:bg-white/20 hover:scale-110`}
                >
                  <i className={`${social.icon} text-lg`}></i>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-white/70 hover:text-gold-400 transition-colors duration-300 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gold-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-phone text-primary-900 dark:text-white text-sm"></i>
                </div>
                <div>
                  <p className="text-white/70 text-sm">Phone</p>
                  <p className="text-white font-medium">{siteData.contact.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gold-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-envelope text-primary-900 dark:text-white text-sm"></i>
                </div>
                <div>
                  <p className="text-white/70 text-sm">Email</p>
                  <p className="text-white font-medium">{siteData.contact.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gold-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-map-marker-alt text-primary-900 dark:text-white text-sm"></i>
                </div>
                <div>
                  <p className="text-white/70 text-sm">Location</p>
                  <p className="text-white font-medium">{siteData.contact.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <h3 className="text-xl font-bold mb-6 text-center">Subjects We Teach</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {siteData.subjects.slice(0, 10).map((subject, index) => (
              <div
                key={index}
                className="text-center p-3 bg-white dark:bg-dark-800/5 rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                onClick={() => {
                  const phoneNumber = siteData.contact.phone.replace(/\s+/g, '').replace('+', '')
                  const message = encodeURIComponent(`Hello! I'm interested in ${subject.name} classes at STS Academy.`)
                  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
                }}
              >
                <i className={`fas ${subject.icon} text-gold-400 text-lg mb-2 group-hover:scale-110 transition-transform duration-300`}></i>
                <p className="text-white/80 text-sm font-medium">{subject.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Join thousands of students who have achieved excellence with STS Academy. 
            Contact us today and take the first step towards your success.
          </p>
          <button
            onClick={handleWhatsApp}
            className="btn-secondary inline-flex items-center text-lg px-8 py-4"
          >
            <i className="fab fa-whatsapp mr-2"></i>
            Start Learning Today
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/70 text-sm">
              {siteData.footer.copyright}
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <button
                onClick={() => {
                  const phoneNumber = siteData.contact.phone.replace(/\s+/g, '').replace('+', '')
                  const message = encodeURIComponent('Hello! I would like to know about your privacy policy.')
                  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
                }}
                className="text-white/70 hover:text-gold-400 transition-colors duration-300"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => {
                  const phoneNumber = siteData.contact.phone.replace(/\s+/g, '').replace('+', '')
                  const message = encodeURIComponent('Hello! I would like to know about your terms of service.')
                  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
                }}
                className="text-white/70 hover:text-gold-400 transition-colors duration-300"
              >
                Terms of Service
              </button>
              <button
                onClick={() => window.open(siteData.contact.telegram, '_blank')}
                className="text-white/70 hover:text-gold-400 transition-colors duration-300 flex items-center"
              >
                <i className="fab fa-telegram mr-1"></i>
                Developer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <button
        onClick={handleWhatsApp}
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:bg-green-600 transition-all duration-300 hover:scale-110 z-50 animate-bounce-slow"
        aria-label="Contact us on WhatsApp"
      >
        <i className="fab fa-whatsapp text-white text-2xl"></i>
      </button>
    </footer>
  )
}

export default Footer