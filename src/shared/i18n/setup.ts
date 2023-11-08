import i18next from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import locales from "./locales/index";

export default i18next.use(initReactI18next).use(I18nextBrowserLanguageDetector).init({
  fallbackLng: "pt-BR",
  resources: locales,
  defaultNS: "translations",
});
