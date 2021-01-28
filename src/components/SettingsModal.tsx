import { Fragment, ReactElement } from 'react';
import { useSelector } from 'react-tagged-state';
import styled from 'styled-components';
import signOut from '../actions/signOut';
import { ReactComponent as CancelOutlineIcon } from '../icons/cancel_outlile-24px.svg';
import themeState, { TTheme } from '../states/themeState';
import langState, { TLang } from '../states/langState';
import intlState from '../states/intlState';
import Content from './Content';
import Header from './Header';
import IconButton from './IconButton';
import SettingsButton from './SettingsButton';
import SettingsGroup from './SettingsGroup';
import SettingsSelect from './SettingsSelect';
import Title from './Title';
import Account from './Account';

interface ISettingsModalProps {
    onClose: () => void;
}

const StyledHeader = styled(Header)`
    justify-content: flex-end;
`;

const StyledIconButton = styled(IconButton)`
    flex: 0 0 56px;
`;

const SettingsModal = ({ onClose }: ISettingsModalProps): ReactElement => {
    const themeValue = useSelector(themeState);
    const lang = useSelector(langState);
    const { formatMessage } = useSelector(intlState);

    return (
        <Fragment>
            <StyledHeader>
                <StyledIconButton onClick={onClose}>
                    <CancelOutlineIcon />
                </StyledIconButton>
            </StyledHeader>
            <Content>
                <Title>{formatMessage('account')}</Title>
                <Account />
                <Title>{formatMessage('settings')}</Title>
                <SettingsGroup>
                    <SettingsSelect
                        label={formatMessage('language')}
                        value={lang}
                        options={[
                            {
                                label: formatMessage('system'),
                                value: null
                            },
                            {
                                label: formatMessage('en'),
                                value: 'en'
                            },
                            {
                                label: formatMessage('ru'),
                                value: 'ru'
                            }
                        ]}
                        onChange={(value) => langState(value as TLang)}
                    />
                    <SettingsSelect
                        label={formatMessage('theme')}
                        value={themeValue}
                        options={[
                            {
                                label: formatMessage('system'),
                                value: null
                            },
                            {
                                label: formatMessage('dark'),
                                value: 'dark'
                            },
                            {
                                label: formatMessage('light'),
                                value: 'light'
                            }
                        ]}
                        onChange={(value) => themeState(value as TTheme)}
                    />
                </SettingsGroup>
                <SettingsGroup>
                    <SettingsButton
                        onClick={() => {
                            onClose();
                            document.location.reload(true);
                        }}
                    >
                        {formatMessage('reload')}
                    </SettingsButton>
                    <SettingsButton
                        onClick={() => {
                            onClose();
                            signOut();
                        }}
                    >
                        {formatMessage('signOut')}
                    </SettingsButton>
                </SettingsGroup>
            </Content>
        </Fragment>
    );
};

export default SettingsModal;
