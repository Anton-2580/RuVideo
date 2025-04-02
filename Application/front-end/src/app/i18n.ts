import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import { DateTime } from "luxon";

i18n
  .use(backend)
  .use(detector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  })

i18n.services.formatter?.add("DATE_AGO", (value: string, lng, options) => (
  DateTime.local().minus({milliseconds: parseFloat(value)}).setLocale(lng ?? "en").toRelative()
));

export default i18n;