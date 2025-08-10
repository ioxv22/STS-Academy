#!/usr/bin/env node

/**
 * Quick update script to apply dark mode and Arabic support to remaining components
 * This script will be used to update the remaining components quickly
 */

const fs = require('fs')
const path = require('path')

console.log('🌙 تطبيق الوضع الليلي والترجمة العربية على المكونات المتبقية...\n')

// List of components to update
const componentsToUpdate = [
  'src/components/Subjects.jsx',
  'src/components/Grades.jsx',
  'src/components/Contact.jsx',
  'src/components/Footer.jsx'
]

// Common imports to add
const importsToAdd = `import { useLanguage } from '../context/LanguageContext'`

// Function to add imports if not present
function addImports(content, filePath) {
  if (!content.includes("useLanguage")) {
    // Find the last import statement
    const importLines = content.split('\n').filter(line => line.trim().startsWith('import'))
    const lastImportIndex = content.lastIndexOf(importLines[importLines.length - 1])
    const insertPosition = content.indexOf('\n', lastImportIndex) + 1
    
    content = content.slice(0, insertPosition) + importsToAdd + '\n' + content.slice(insertPosition)
    console.log(`   ✅ Added imports to ${path.basename(filePath)}`)
  }
  return content
}

// Function to add language and RTL support to component
function addLanguageSupport(content, filePath) {
  const componentName = path.basename(filePath, '.jsx')
  
  // Add language hooks
  if (!content.includes('const { t, isRTL } = useLanguage()')) {
    content = content.replace(
      /const (\w+) = \(\) => \{/,
      `const $1 = () => {
  const { t, isRTL } = useLanguage()`
    )
    console.log(`   ✅ Added language hooks to ${componentName}`)
  }
  
  return content
}

// Function to add dark mode classes
function addDarkModeClasses(content) {
  // Common dark mode class replacements
  const replacements = [
    ['bg-white', 'bg-white dark:bg-dark-800'],
    ['bg-gray-50', 'bg-gray-50 dark:bg-dark-800'],
    ['text-gray-700', 'text-gray-700 dark:text-gray-300'],
    ['text-gray-600', 'text-gray-600 dark:text-gray-400'],
    ['text-primary-900', 'text-primary-900 dark:text-white'],
    ['border-gray-200', 'border-gray-200 dark:border-dark-600'],
    ['border-gray-300', 'border-gray-300 dark:border-dark-600']
  ]
  
  replacements.forEach(([oldClass, newClass]) => {
    const regex = new RegExp(`className="([^"]*?)${oldClass}([^"]*?)"`, 'g')
    content = content.replace(regex, (match, before, after) => {
      if (!match.includes('dark:')) {
        return `className="${before}${newClass}${after}"`
      }
      return match
    })
  })
  
  return content
}

// Process each component
componentsToUpdate.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    console.log(`🔄 تحديث ${path.basename(filePath)}...`)
    
    let content = fs.readFileSync(filePath, 'utf8')
    
    // Add imports
    content = addImports(content, filePath)
    
    // Add language support
    content = addLanguageSupport(content, filePath)
    
    // Add dark mode classes
    content = addDarkModeClasses(content)
    
    // Write back to file
    fs.writeFileSync(filePath, content)
    console.log(`   ✅ تم تحديث ${path.basename(filePath)} بنجاح\n`)
  } else {
    console.log(`   ❌ الملف غير موجود: ${filePath}\n`)
  }
})

console.log('🎉 تم تطبيق الوضع الليلي والترجمة العربية بنجاح!')
console.log('\n📝 المطلوب يدوياً:')
console.log('1. تحديث النصوص لاستخدام t() function')
console.log('2. إضافة دعم RTL للتخطيط')
console.log('3. إضافة font-arabic للنصوص العربية')
console.log('4. تحديث رسائل WhatsApp للغة العربية')

console.log('\n🚀 لبدء الخادم:')
console.log('npm run dev')