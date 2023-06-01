import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { i18nLanguages } from '@/data'
import { DEFAULT_LANGUAGES } from '@/consts'
import translationEN from '../public/locales/en/translation.json'
import translationVI from '../public/locales/vi/translation.json'

const availableLanguages = i18nLanguages
const languageDetectorOptions = {
    order: ['navigator', 'htmlTag', 'path', 'subdomail'],
    checkWhitelist: true,
}

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
        // supportedLngs: availableLanguages,
        debug: true,
        // detection: languageDetectorOptions,
        interpolation: {
            escapeValue: false,
        },
    })
    .catch((error) => {
        console.log('error', error)
    })

export default i18n
