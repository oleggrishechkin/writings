import { createState } from 'react-tagged-state';
import localesRu from '../../locales/ru.json';
import localesEn from '../../locales/en.json';
import getBrowserLang, { IBrowserLang } from '../../utils/getBrowserLang';
import langState from './langState';

export interface IFormatDate {
    (date: Date | number, format?: string): string;
}

const getFormatDate =
    (lang: IBrowserLang): IFormatDate =>
    (date = Date.now()) =>
        new Date(date).toLocaleString(lang, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        });

export interface IFormatMessage {
    (key: keyof (typeof localesEn & typeof localesRu)): string;
}

const getFormatMessage = (lang: IBrowserLang): IFormatMessage => {
    const messages: Record<string, string> = lang === 'ru' ? localesRu : localesEn;

    return (key) => messages[key] || key;
};

export interface IIntl {
    formatMessage: IFormatMessage;
    formatDate: IFormatDate;
}

const getIntl = (lang: IBrowserLang): IIntl => ({
    formatMessage: getFormatMessage(lang),
    formatDate: getFormatDate(lang)
});

const intlState = createState<IIntl>(getIntl(getBrowserLang(langState())));

langState``((lang) => {
    intlState(getIntl(getBrowserLang(lang)));
});

export default intlState;
