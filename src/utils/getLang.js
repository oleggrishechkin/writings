const getLang = (lang) => lang || (window.navigator.language.slice(0, 2).toLowerCase() === 'ru' ? 'ru' : 'en');

export default getLang;
