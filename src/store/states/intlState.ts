import { createState } from 'react-tagged-state';
import formatDateFns from 'date-fns/format';
import dateFnsEnUs from 'date-fns/locale/en-US';
import dateFnsRu from 'date-fns/locale/ru';
import localesRu from '../../locales/ru.json';
import localesEn from '../../locales/en.json';
import getBrowserLang from '../../utils/getBrowserLang';
import langState, { TLang } from './langState';

export interface IFormatDate {
    (date: Date | number, format?: string): string;
}

const getFormatDate = (lang: TLang): IFormatDate => {
    const locale = lang === 'ru' ? dateFnsRu : dateFnsEnUs;

    return (date = Date.now(), format = 'Pp') => formatDateFns(date, format, { locale });
};

export interface IFormatMessage {
    (key: keyof (typeof localesEn & typeof localesRu)): string;
}

const getFormatMessage = (lang: TLang): IFormatMessage => {
    const messages: Record<string, string> = lang === 'ru' ? localesRu : localesEn;

    return (key) => messages[key] || key;
};

export interface IIntl {
    formatMessage: IFormatMessage;
    formatDate: IFormatDate;
}

const getIntl = (lang: TLang): IIntl => ({
    formatMessage: getFormatMessage(lang),
    formatDate: getFormatDate(lang)
});

const intlState = createState<IIntl>(getIntl(getBrowserLang(langState())));

langState``((lang) => {
    intlState(getIntl(getBrowserLang(lang)));
});

export default intlState;
