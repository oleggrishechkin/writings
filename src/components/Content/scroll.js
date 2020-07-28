import LocalStorage from '../../proxies/LocalStorage';

const scroll = LocalStorage.getItem('scroll') || {};

window.addEventListener(
    'beforeunload',
    () => {
        if (Object.keys(scroll).length) {
            LocalStorage.setItem('scroll', scroll);
        } else {
            LocalStorage.removeItem('scroll');
        }
    },
    { passive: true }
);

export default scroll;
