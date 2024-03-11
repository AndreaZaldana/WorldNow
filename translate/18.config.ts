import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import {en, es} from "./translations"

const resources = {
    en: {
        translation: en,
    },

    es : {
        translation: es
    }
}

i18next.use(initReactI18next).init({
    debug: true,
    fallbackLng: 'en',
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: resources
})