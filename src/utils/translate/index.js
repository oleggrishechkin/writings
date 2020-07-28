import en from './en.json';
import ru from './ru.json';

const translate = (key) => {
    switch (document.documentElement.lang) {
        case 'en': {
            return en[key] || key;
        }
        case 'ru': {
            return ru[key] || key;
        }
        default: {
            return key;
        }
    }
};

export default translate;
