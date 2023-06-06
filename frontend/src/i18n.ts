import { DEFAULT_LANGUAGES } from '@/consts'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import translationEN from '@/locales/en/translation.json'
import translationVI from '@/locales/vi/translation.json'

const resources = {
    en: {
        translation: translationEN,
    },
    vi: {
        translation: translationVI,
    },
}

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: DEFAULT_LANGUAGES,
        debug: true,
        interpolation: {
            escapeValue: false,
        },
    })

export default i18n
