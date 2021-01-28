export type TBrowserLang = 'en' | 'ru';

const getBrowserLang = (lang: null | TBrowserLang): TBrowserLang =>
    lang || (window.navigator.language.slice(0, 2).toLowerCase() === 'ru' ? 'ru' : 'en');

export default getBrowserLang;
