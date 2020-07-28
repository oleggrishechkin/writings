import signOut from '../../actions/signOut';
import CancelOutlineIcon from '../../icons/cancel_outlile-24px.svg';
import LocalStorage from '../../proxies/LocalStorage';
import createLocalStorageSignal from '../../signals/createLocalStorageSignal';
import translate from '../../utils/translate';
import Account from '../Account/Account';
import Content from '../Content/Content';
import Header from '../Header/Header';
import IconButton from '../IconButton/IconButton';
import SettingsButton from '../SettingsButton/SettingsButton';
import SettingsGroup from '../SettingsGroup/SettingsGroup';
import SettingsSelect from '../SettingsSelect/SettingsSelect';
import Title from '../Title/Title';
import theme from './SettingsModal.module.css';

const SettingsModal = (props) => {
    const themeSignal = createLocalStorageSignal('theme');
    const langSignal = createLocalStorageSignal('lang');

    return (
        <>
            <Header className={theme.header}>
                <IconButton className={theme.headerButton} onClick={props.onClose}>
                    <CancelOutlineIcon />
                </IconButton>
            </Header>
            <Content>
                <Title>{translate('settings')}</Title>
                <Account />
                <SettingsGroup>
                    <SettingsSelect
                        label={translate('language')}
                        value={langSignal()}
                        options={[
                            {
                                label: translate('system'),
                                value: null
                            },
                            {
                                label: translate('en'),
                                value: 'en'
                            },
                            {
                                label: translate('ru'),
                                value: 'ru'
                            }
                        ]}
                        onChange={(value) => LocalStorage.setItem('lang', value)}
                    />
                    <SettingsSelect
                        label={translate('theme')}
                        value={themeSignal()}
                        options={[
                            {
                                label: translate('system'),
                                value: null
                            },
                            {
                                label: translate('dark'),
                                value: 'dark'
                            },
                            {
                                label: translate('light'),
                                value: 'light'
                            }
                        ]}
                        onChange={(value) => LocalStorage.setItem('theme', value)}
                    />
                </SettingsGroup>
                <SettingsGroup>
                    <SettingsButton
                        onClick={() => {
                            props.onClose();
                            document.location.reload(true);
                        }}
                    >
                        {translate('reload')}
                    </SettingsButton>
                    <SettingsButton
                        onClick={() => {
                            props.onClose();
                            signOut();
                        }}
                    >
                        {translate('signOut')}
                    </SettingsButton>
                </SettingsGroup>
            </Content>
        </>
    );
};

export default SettingsModal;
