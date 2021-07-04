export type IBrowserLang = 'en' | 'ru';

const getBrowserLang = (lang: null | IBrowserLang): IBrowserLang =>
    lang || (window.navigator.language.slice(0, 2).toLowerCase() === 'ru' ? 'ru' : 'en');

export default getBrowserLang;
