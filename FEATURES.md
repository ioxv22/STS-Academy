# 🌙 الوضع الليلي والترجمة العربية - Steps to Success Academy

## ✨ الميزات الجديدة المضافة

### 🌙 الوضع الليلي (Dark Mode)
- **تبديل تلقائي**: زر تبديل سهل الاستخدام في الهيدر
- **حفظ التفضيلات**: يحفظ اختيار المستخدم في localStorage
- **تصميم متسق**: جميع المكونات تدعم الوضع الليلي
- **انتقالات سلسة**: تأثيرات انتقال ناعمة بين الأوضاع

### 🌍 الترجمة العربية (Arabic Translation)
- **دعم كامل للعربية**: ترجمة شاملة لجميع النصوص
- **خطوط عربية**: استخدام خطوط Cairo و Tajawal
- **اتجاه RTL**: دعم كامل للكتابة من اليمين لليسار
- **تبديل سريع**: إمكانية التبديل بين العربية والإنجليزية

### 🎨 تحسينات التصميم
- **ألوان محسنة**: نظام ألوان متطور للوضع الليلي
- **تباين أفضل**: تحسين قابلية القراءة في جميع الأوضاع
- **أيقونات محدثة**: أيقونات واضحة للغة والوضع الليلي
- **انيميشن محسن**: تأثيرات بصرية جذابة

### 📱 مكونات جديدة
- **ThemeLanguageToggle**: مكون التحكم في اللغة والوضع الليلي
- **FloatingWhatsApp**: زر واتساب عائم مع دعم الترجمة
- **Context Providers**: إدارة حالة متقدمة للثيم واللغة

## 🚀 كيفية الاستخدام

### تبديل الوضع الليلي
1. اضغط على أيقونة القمر/الشمس في الهيدر
2. سيتم حفظ اختيارك تلقائياً
3. الموقع سيتذكر تفضيلك في الزيارات القادمة

### تغيير اللغة
1. اضغط على قائمة اللغة في الهيدر
2. اختر بين العربية والإنجليزية
3. سيتم تطبيق التغيير فوراً على كامل الموقع

### الزر العائم
- زر واتساب عائم يظهر بعد 3 ثوان
- رسائل مترجمة حسب اللغة المختارة
- موضع متكيف مع اتجاه الكتابة

## 🛠️ التقنيات المستخدمة

### Context API
```javascript
// ThemeContext - إدارة الوضع الليلي
const { isDarkMode, toggleTheme } = useTheme()

// LanguageContext - إدارة اللغة والترجمة
const { currentLanguage, changeLanguage, t, isRTL } = useLanguage()
```

### TailwindCSS Classes
```css
/* الوضع الليلي */
.dark:bg-dark-900
.dark:text-white

/* دعم RTL */
.space-x-reverse
.flex-row-reverse
```

### الترجمة
```javascript
// استخدام الترجمة
{t('heroTitle')} // يعرض النص المترجم
{isRTL ? 'font-arabic' : ''} // تطبيق الخط العربي
```

## 📁 الملفات المضافة/المحدثة

### ملفات جديدة
- `src/context/ThemeContext.jsx` - إدارة الوضع الليلي
- `src/context/LanguageContext.jsx` - إدارة اللغة والترجمة
- `src/components/ThemeLanguageToggle.jsx` - مكون التحكم
- `src/components/FloatingWhatsApp.jsx` - زر واتساب عائم
- `src/locales/translations.js` - ملف الترجمات
- `src/styles/rtl-dark.css` - أنماط RTL والوضع الليلي

### ملفات محدثة
- `src/App.jsx` - إضافة Providers
- `src/components/Header.jsx` - دعم اللغة والوضع الليلي
- `src/components/Hero.jsx` - ترجمة وتحسينات
- `src/components/About.jsx` - دعم كامل للميزات الجديدة
- `src/components/Subjects.jsx` - ترجمة ووضع ليلي
- `src/components/Grades.jsx` - تحسينات شاملة
- `src/components/Contact.jsx` - دعم RTL والترجمة
- `src/components/Footer.jsx` - تحديثات التصميم
- `src/pages/HomePage.jsx` - إدارة الحالة العامة
- `tailwind.config.js` - إعدادات الوضع الليلي
- `src/index.css` - خطوط وأنماط جديدة

## 🎯 الميزات المتقدمة

### حفظ التفضيلات
- اللغة المختارة تُحفظ في localStorage
- الوضع الليلي يُحفظ تلقائياً
- استرجاع التفضيلات عند إعادة تحميل الصفحة

### تكيف ذكي
- اكتشاف لغة المتصفح تلقائياً
- تطبيق اتجاه الكتابة على المستند
- تحديث عنوان الصفحة حسب اللغة

### رسائل واتساب ذكية
- رسائل مختلفة حسب السياق
- ترجمة تلقائية للرسائل
- معلومات النموذج مترجمة

## 🔧 للمطورين

### إضافة ترجمة جديدة
```javascript
// في src/locales/translations.js
export const translations = {
  en: {
    newKey: 'English Text'
  },
  ar: {
    newKey: 'النص العربي'
  }
}
```

### استخدام الترجمة في المكونات
```javascript
import { useLanguage } from '../context/LanguageContext'

const MyComponent = () => {
  const { t, isRTL } = useLanguage()
  
  return (
    <div className={isRTL ? 'font-arabic text-right' : ''}>
      <h1>{t('newKey')}</h1>
    </div>
  )
}
```

### إضافة دعم الوضع الليلي
```javascript
// استخدام classes TailwindCSS
className="bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
```

## 🎨 نصائح التصميم

### الألوان
- استخدم `dark:` prefix لألوان الوضع الليلي
- تأكد من التباين الكافي
- اختبر في كلا الوضعين

### الخطوط
- `font-arabic` للنصوص العربية
- `Cairo` و `Tajawal` كخطوط احتياطية
- تأكد من دعم الأحرف العربية

### التخطيط
- `flex-row-reverse` للعناصر في RTL
- `space-x-reverse` للمسافات
- `text-right` للنصوص العربية

## 🚀 تشغيل المشروع

```bash
# تثبيت المتطلبات
npm install

# تشغيل الخادم
npm run dev

# بناء المشروع
npm run build
```


تم تطوير هذه الميزات بعناية لتوفير تجربة مستخدم متميزة تدعم اللغة العربية والوضع الليلي بشكل كامل. 🌟
