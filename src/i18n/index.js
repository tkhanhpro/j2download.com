import { createI18n } from 'vue-i18n';
import arMessage from './ar.json';
import csMessage from './cs.json';
import deMessage from './de.json';
import elMessage from './el.json';
import enMessage from './en.json';
import esMessage from './es.json';
import frMessage from './fr.json';
import huMessage from './hu.json';
import idMessage from './id.json';
import itMessage from './it.json';
import jaMessage from './ja.json';
import jvMessage from './jv.json';
import koMessage from './ko.json';
import msMessage from './ms.json';
import nlMessage from './nl.json';
import plMessage from './pl.json';
import ptMessage from './pt.json';
import roMessage from './ro.json';
import ruMessage from './ru.json';
import thMessage from './th.json';
import trMessage from './tr.json';
import ukMessage from './uk.json';
import viMessage from './vi.json';
import zhMessage from './zh.json';

const currentPath = window.location.pathname;

const navigatorLanguage = localStorage.getItem('lang') || navigator.language || navigator.userLanguage;
const browserLanguage = navigatorLanguage.split(/-|_/)[0];

const messages = {
    ar: arMessage,
    cs: csMessage,
    de: deMessage,
    el: elMessage,
    en: enMessage,
    es: esMessage,
    fr: frMessage,
    hu: huMessage,
    id: idMessage,
    it: itMessage,
    ja: jaMessage,
    jv: jvMessage,
    ko: koMessage,
    ms: msMessage,
    nl: nlMessage,
    pl: plMessage,
    pt: ptMessage,
    ro: roMessage,
    ru: ruMessage,
    th: thMessage,
    tr: trMessage,
    uk: ukMessage,
    vi: viMessage,
    zh: zhMessage,
}

const availableLocales = ['ar', 'cs', 'de', 'el', 'en', 'es', 'fr', 'hu', 'id', 'it', 'ja', 'jv', 'ko', 'ms', 'nl', 'pl', 'pt', 'ro', 'ru', 'th', 'tr', 'uk', 'vi', 'zh'];
const localeFromPath = currentPath.split('/')[1];
const selectedLocale = availableLocales.includes(localeFromPath) ? localeFromPath : availableLocales.includes(browserLanguage) ? browserLanguage : 'en';
localStorage.setItem('lang', selectedLocale);

const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: selectedLocale,
    messages,
    fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
});

export default i18n;