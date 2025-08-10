import React, { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

// Translation data
const translations = {
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    subjects: 'Subjects',
    grades: 'Grades',
    contact: 'Contact',
    
    // Hero Section
    heroTitle: 'Steps to Success (STS)',
    heroSubtitle: 'Your Gateway to Excellence in All Subjects & Grades',
    heroDescription: 'Join our academy and unlock your potential with expert teaching across all subjects and grades.',
    joinNow: 'Join Now',
    learnMore: 'Learn More',
    
    // Stats
    gradesCovered: 'Grades Covered',
    subjectsTaught: 'Subjects Taught',
    expertTeachers: 'Expert Teachers',
    supportAvailable: 'Support Available',
    
    // About Section
    aboutTitle: 'About Our Academy',
    aboutDescription: 'At Steps to Success (STS), we pride ourselves on having expert teachers who cover all subjects across all grades. Our comprehensive approach ensures that every student receives personalized attention and quality education tailored to their learning needs.',
    aboutFeatures: [
      'Expert teachers for all subjects',
      'Comprehensive coverage from Grade 1 to Grade 12',
      'Personalized learning approach',
      'Modern teaching methodologies',
      'Flexible learning schedules'
    ],
    getStartedToday: 'Get Started Today',
    ourMission: 'Our Mission',
    missionText: 'Empowering every student to reach their full potential through personalized, expert education across all subjects and grades.',
    
    // Subjects Section
    ourSubjects: 'Our Subjects',
    subjectsDescription: 'Comprehensive education across all subjects with expert teachers dedicated to your success',
    clickToLearnMore: 'Click to Learn More →',
    askAboutOtherSubjects: 'Ask About Other Subjects',
    dontSeeSubject: "Don't see your subject? We cover many more areas of study!",
    

    
    // Grades Section
    allGradesCovered: 'All Grades Covered',
    gradesDescription: 'From Grade 1 to Grade 12, we provide comprehensive education tailored to each grade level',
    elementary: 'Elementary',
    primary: 'Primary',
    middleSchool: 'Middle School',
    highSchool: 'High School',
    clickToEnroll: 'Click to Enroll →',
    enrollNow: 'Enroll Now',
    readyToStart: 'Ready to Start Your Journey?',
    readyToStartDescription: 'No matter what grade you\'re in, we have the perfect program to help you succeed. Our expert teachers are ready to guide you every step of the way.',
    
    // Grade Descriptions
    gradeDescriptions: [
      'Foundation building with fun learning',
      'Developing core academic skills',
      'Expanding knowledge and curiosity',
      'Building confidence in learning',
      'Preparing for middle school',
      'Transitioning to advanced concepts',
      'Developing critical thinking',
      'Preparing for high school',
      'High school foundation',
      'Advanced academic preparation',
      'Pre-university excellence',
      'University preparation and success'
    ],
    
    // Contact Section
    getInTouch: 'Get In Touch',
    contactDescription: 'Ready to start your educational journey? Contact us today and let\'s discuss how we can help you succeed.',
    contactInformation: 'Contact Information',
    followUs: 'Follow Us',
    whyChooseSTS: 'Why Choose STS?',
    sendMessage: 'Send us a Message',
    
    // Contact Form
    fullName: 'Full Name',
    email: 'Email',
    phoneNumber: 'Phone Number',
    gradeLevel: 'Grade Level',
    selectGrade: 'Select Grade',
    subjectOfInterest: 'Subject of Interest',
    selectSubject: 'Select Subject',
    message: 'Message',
    messagePlaceholder: 'Tell us more about your learning goals...',
    sendMessageWhatsApp: 'Send Message via WhatsApp',
    
    // Contact Methods
    phone: 'Phone',
    telegram: 'Telegram',
    whatsapp: 'WhatsApp',
    quickMessage: 'Quick Message',
    developerContact: 'Developer Contact',
    
    // Footer
    footerDescription: 'Steps to Success Academy - Empowering students to achieve excellence in education.',
    quickLinks: 'Quick Links',
    contactInfo: 'Contact Info',
    location: 'Location',
    subjectsWeTeach: 'Subjects We Teach',
    startLearningToday: 'Start Learning Today',
    copyright: '© 2025 STS. All rights reserved.',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    developer: 'Developer',
    
    // Admin
    adminLogin: 'Admin Login',
    adminPanel: 'STS Academy Administration Panel',
    username: 'Username',
    password: 'Password',
    login: 'Login',
    loggingIn: 'Logging in...',
    backToWebsite: 'Back to Website',
    defaultCredentials: 'Default Credentials:',
    
    // Admin Dashboard
    adminDashboard: 'STS Admin Dashboard',
    viewSite: 'View Site',
    logout: 'Logout',
    sections: 'Sections',
    quickActions: 'Quick Actions',
    resetToDefault: 'Reset to Default',
    saveChanges: 'Save Changes',
    
    // Admin Sections
    heroSection: 'Hero Section',
    aboutSection: 'About Section',
    brandingSection: 'Branding',
    title: 'Title',
    subtitle: 'Subtitle',
    description: 'Description',
    ctaButtonText: 'CTA Button Text',
    features: 'Features',
    addFeature: 'Add Feature',
    siteName: 'Site Name',
    slogan: 'Slogan',
    logoUrl: 'Logo URL',
    brandColors: 'Brand Colors',
    
    // Common
    grade: 'Grade',
    grades: 'Grades',
    subject: 'Subject',
    name: 'Name',
    icon: 'Icon',
    remove: 'Remove',
    add: 'Add',
    edit: 'Edit',
    save: 'Save',
    cancel: 'Cancel',
    loading: 'Loading...',
    success: 'Success!',
    error: 'Error',
    
    // Theme & Language
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    language: 'Language',
    english_lang: 'English',
    arabic_lang: 'العربية'
  },
  
  ar: {
    // Navigation
    home: 'الرئيسية',
    about: 'من نحن',
    subjects: 'المواد',
    grades: 'الصفوف',
    contact: 'اتصل بنا',
    
    // Hero Section
    heroTitle: 'خطوات النجاح (STS)',
    heroSubtitle: 'بوابتك للتميز في جميع المواد والصفوف',
    heroDescription: 'انضم إلى أكاديميتنا واكتشف إمكاناتك مع التدريس المتخصص في جميع المواد والصفوف.',
    joinNow: 'انضم الآن',
    learnMore: 'اعرف المزيد',
    
    // Stats
    gradesCovered: 'الصفوف المغطاة',
    subjectsTaught: 'المواد المدرسة',
    expertTeachers: 'معلمون خبراء',
    supportAvailable: 'دعم متاح',
    
    // About Section
    aboutTitle: 'عن أكاديميتنا',
    aboutDescription: 'في خطوات النجاح (STS)، نفتخر بوجود معلمين خبراء يغطون جميع المواد عبر جميع الصفوف. نهجنا الشامل يضمن حصول كل طالب على اهتمام شخصي وتعليم عالي الجودة مصمم خصيصاً لاحتياجاته التعليمية.',
    aboutFeatures: [
      'معلمون خبراء لجميع المواد',
      'تغطية شاملة من الصف الأول إلى الثاني عشر',
      'نهج تعلم شخصي',
      'منهجيات تدريس حديثة',
      'جداول تعلم مرنة'
    ],
    getStartedToday: 'ابدأ اليوم',
    ourMission: 'رسالتنا',
    missionText: 'تمكين كل طالب من الوصول إلى أقصى إمكاناته من خلال التعليم الشخصي المتخصص في جميع المواد والصفوف.',
    
    // Subjects Section
    ourSubjects: 'موادنا الدراسية',
    subjectsDescription: 'تعليم شامل في جميع المواد مع معلمين خبراء مكرسين لنجاحك',
    clickToLearnMore: 'اضغط لمعرفة المزيد ←',
    askAboutOtherSubjects: 'اسأل عن مواد أخرى',
    dontSeeSubject: 'لا ترى المادة التي تبحث عنها؟ نحن نغطي العديد من مجالات الدراسة الأخرى!',
    

    
    // Grades Section
    allGradesCovered: 'جميع الصفوف مغطاة',
    gradesDescription: 'من الصف الأول إلى الثاني عشر، نوفر تعليماً شاملاً مصمماً لكل مستوى صفي',
    elementary: 'ابتدائي',
    primary: 'أساسي',
    middleSchool: 'متوسط',
    highSchool: 'ثانوي',
    clickToEnroll: 'اضغط للتسجيل ←',
    enrollNow: 'سجل الآن',
    readyToStart: 'مستعد لبدء رحلتك؟',
    readyToStartDescription: 'مهما كان الصف الذي تدرس فيه، لدينا البرنامج المثالي لمساعدتك على النجاح. معلمونا الخبراء مستعدون لإرشادك في كل خطوة.',
    
    // Grade Descriptions
    gradeDescriptions: [
      'بناء الأساس مع التعلم الممتع',
      'تطوير المهارات الأكاديمية الأساسية',
      'توسيع المعرفة والفضول',
      'بناء الثقة في التعلم',
      'التحضير للمرحلة المتوسطة',
      'الانتقال إلى المفاهيم المتقدمة',
      'تطوير التفكير النقدي',
      'التحضير للمرحلة الثانوية',
      'أساس المرحلة الثانوية',
      'التحضير الأكاديمي المتقدم',
      'التميز ما قبل الجامعي',
      'التحضير الجامعي والنجاح'
    ],
    
    // Contact Section
    getInTouch: 'تواصل معنا',
    contactDescription: 'مستعد لبدء رحلتك التعليمية؟ تواصل معنا اليوم ولنناقش كيف يمكننا مساعدتك على النجاح.',
    contactInformation: 'معلومات الاتصال',
    followUs: 'تابعنا',
    whyChooseSTS: 'لماذا تختار STS؟',
    sendMessage: 'أرسل لنا رسالة',
    
    // Contact Form
    fullName: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    phoneNumber: 'رقم الهاتف',
    gradeLevel: 'المستوى الدراسي',
    selectGrade: 'اختر الصف',
    subjectOfInterest: 'المادة المهتم بها',
    selectSubject: 'اختر المادة',
    message: 'الرسالة',
    messagePlaceholder: 'أخبرنا المزيد عن أهدافك التعليمية...',
    sendMessageWhatsApp: 'إرسال رسالة عبر واتساب',
    
    // Contact Methods
    phone: 'الهاتف',
    telegram: 'تليجرام',
    whatsapp: 'واتساب',
    quickMessage: 'رسالة سريعة',
    developerContact: 'تواصل مع المطور',
    
    // Footer
    footerDescription: 'أكاديمية خطوات النجاح - تمكين الطلاب لتحقيق التميز في التعليم.',
    quickLinks: 'روابط سريعة',
    contactInfo: 'معلومات الاتصال',
    location: 'الموقع',
    subjectsWeTeach: 'المواد التي ندرسها',
    startLearningToday: 'ابدأ التعلم اليوم',
    copyright: '© 2025 STS. جميع الحقوق محفوظة.',
    privacyPolicy: 'سياسة الخصوصية',
    termsOfService: 'شروط الخدمة',
    developer: 'المطور',
    
    // Admin
    adminLogin: 'تسجيل دخول المدير',
    adminPanel: 'لوحة إدارة أكاديمية STS',
    username: 'اسم المستخدم',
    password: 'كلمة المرور',
    login: 'تسجيل الدخول',
    loggingIn: 'جاري تسجيل الدخول...',
    backToWebsite: 'العودة للموقع',
    defaultCredentials: 'بيانات الدخول الافتراضية:',
    
    // Admin Dashboard
    adminDashboard: 'لوحة إدارة STS',
    viewSite: 'عرض الموقع',
    logout: 'تسجيل الخروج',
    sections: 'الأقسام',
    quickActions: 'إجراءات سريعة',
    resetToDefault: 'إعادة تعيين للافتراضي',
    saveChanges: 'حفظ التغييرات',
    
    // Admin Sections
    heroSection: 'القسم الرئيسي',
    aboutSection: 'قسم من نحن',
    brandingSection: 'العلامة التجارية',
    title: 'العنوان',
    subtitle: 'العنوان الفرعي',
    description: 'الوصف',
    ctaButtonText: 'نص زر الدعوة للعمل',
    features: 'المميزات',
    addFeature: 'إضافة ميزة',
    siteName: 'اسم الموقع',
    slogan: 'الشعار',
    logoUrl: 'رابط الشعار',
    brandColors: 'ألوان العلامة التجارية',
    
    // Common
    grade: 'الصف',
    grades: 'الصفوف',
    subject: 'المادة',
    name: 'الاسم',
    icon: 'الأيقونة',
    remove: 'حذف',
    add: 'إضافة',
    edit: 'تعديل',
    save: 'حفظ',
    cancel: 'إلغاء',
    loading: 'جاري التحميل...',
    success: 'نجح!',
    error: 'خطأ',
    
    // Theme & Language
    darkMode: 'الوضع الليلي',
    lightMode: 'الوضع النهاري',
    language: 'اللغة',
    english_lang: 'English',
    arabic_lang: 'العربية'
  }
}

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const [isRTL, setIsRTL] = useState(false)

  useEffect(() => {
    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem('stsAcademyLanguage')
    if (savedLanguage && translations[savedLanguage]) {
      setCurrentLanguage(savedLanguage)
      setIsRTL(savedLanguage === 'ar')
    }
  }, [])

  useEffect(() => {
    // Apply RTL/LTR to document
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
    document.documentElement.lang = currentLanguage
    
    // Save preference
    localStorage.setItem('stsAcademyLanguage', currentLanguage)
  }, [currentLanguage, isRTL])

  const changeLanguage = (language) => {
    if (translations[language]) {
      setCurrentLanguage(language)
      setIsRTL(language === 'ar')
    }
  }

  const t = (key) => {
    return translations[currentLanguage][key] || translations.en[key] || key
  }

  const value = {
    currentLanguage,
    isRTL,
    changeLanguage,
    t,
    availableLanguages: Object.keys(translations)
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}