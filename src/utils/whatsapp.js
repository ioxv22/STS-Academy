/**
 * WhatsApp utility functions
 */

/**
 * Format phone number for WhatsApp
 * @param {string} phone - Phone number with country code
 * @returns {string} - Formatted phone number for WhatsApp
 */
export const formatPhoneForWhatsApp = (phone) => {
  // Remove all non-digit characters except +
  let cleaned = phone.replace(/[^\d+]/g, '')
  
  // Remove + if present
  if (cleaned.startsWith('+')) {
    cleaned = cleaned.substring(1)
  }
  
  // Ensure it starts with country code
  if (!cleaned.startsWith('20') && cleaned.length === 11) {
    cleaned = '20' + cleaned
  }
  
  return cleaned
}

/**
 * Create WhatsApp URL
 * @param {string} phone - Phone number
 * @param {string} message - Message to send
 * @returns {string} - WhatsApp URL
 */
export const createWhatsAppURL = (phone, message) => {
  const formattedPhone = formatPhoneForWhatsApp(phone)
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${formattedPhone}?text=${encodedMessage}`
}

/**
 * Open WhatsApp with message
 * @param {string} phone - Phone number
 * @param {string} message - Message to send
 */
export const openWhatsApp = (phone, message) => {
  const url = createWhatsAppURL(phone, message)
  console.log('Opening WhatsApp URL:', url)
  window.open(url, '_blank')
}

/**
 * WhatsApp message templates
 */
export const whatsAppMessages = {
  general: {
    en: 'Hello! I would like to know more about STS Academy.',
    ar: 'مرحباً! أود معرفة المزيد عن أكاديمية STS.'
  },
  joinAcademy: {
    en: 'Hello! I would like to join Steps to Success Academy. Please provide me with more information.',
    ar: 'مرحباً! أود الانضمام إلى أكاديمية خطوات النجاح. يرجى تزويدي بمزيد من المعلومات.'
  },
  subjectInquiry: {
    en: (subject) => `Hello! I'm interested in learning more about ${subject} classes at STS Academy.`,
    ar: (subject) => `مرحباً! أنا مهتم بمعرفة المزيد عن دروس ${subject} في أكاديمية STS.`
  },
  gradeInquiry: {
    en: (grade) => `Hello! I'm interested in Grade ${grade} programs at STS Academy.`,
    ar: (grade) => `مرحباً! أنا مهتم ببرامج الصف ${grade} في أكاديمية STS.`
  },
  contactForm: {
    en: (formData) => `Hello! I'm interested in joining STS Academy.

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Grade: ${formData.grade}
Subject of Interest: ${formData.subject}
Message: ${formData.message}`,
    ar: (formData) => `مرحباً! أنا مهتم بالانضمام إلى أكاديمية STS.

الاسم: ${formData.name}
البريد الإلكتروني: ${formData.email}
الهاتف: ${formData.phone}
الصف: ${formData.grade}
المادة المهتم بها: ${formData.subject}
الرسالة: ${formData.message}`
  },
  otherSubjects: {
    en: 'Hello! I would like to inquire about subjects not listed on your website.',
    ar: 'مرحباً! أود الاستفسار عن مواد غير مدرجة في موقعكم.'
  }
}