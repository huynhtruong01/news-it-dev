import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { i18nLanguages } from '@/data'
const availableLanguages = i18nLanguages

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'vi',
        debug: true,
        interpolation: {
            escapeValue: false,
        },
    })
    .catch((error) => {
        console.log('error', error)
    })

export default i18n
