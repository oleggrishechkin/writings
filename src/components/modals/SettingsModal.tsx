import React, { ReactElement } from 'react';
import { useSelector } from 'react-tagged-state';
import signOut from '../../actions/signOut';
import themeState from '../../store/states/themeState';
import langState from '../../store/states/langState';
import intlState from '../../store/states/intlState';
import AutorenewIcon from '../../icons/AutorenewIcon';
import LogoutIcon from '../../icons/LogoutIcon';
import ActionButton from '../ActionButton';
import ActionsGroup from '../ActionsGroup';
import ActionSelect from '../ActionSelect';
import combine from '../../utils/combine';
import Avatar from '../Avatar';
import userState from '../../store/states/userState';

interface IProps {
    onClose: () => void;
}

const SettingsModal = ({ onClose }: IProps): ReactElement => {
    const user = useSelector(userState);
    const themeValue = useSelector(themeState);
    const lang = useSelector(langState);
    const { formatMessage } = useSelector(intlState);

    return (
        <>
            <div className="flex flex-col items-center mb-8">
                <Avatar className="h-16 mb-4 shadow-xl w-16" src={user?.photoUrl} />
                <span className="truncate">{user?.displayName || ' '}</span>
                <span className="dark:text-light-gray-2 text-dark-gray-2 text-sm truncate">{user?.email || ' '}</span>
            </div>
            <ActionsGroup className="flex-shrink-0 mb-4">
                <ActionSelect
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
                    onChange={(value) => langState(value)}
                />
                <ActionSelect
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
                    onChange={(value) => themeState(value)}
                />
            </ActionsGroup>
            <ActionsGroup className="flex-shrink-0">
                <ActionButton onClick={combine(onClose, () => document.location.reload(true))}>
                    <span className="flex-auto">{formatMessage('reload')}</span>
                    <AutorenewIcon />
                </ActionButton>
                <ActionButton onClick={combine(onClose, () => signOut())}>
                    <span className="flex-auto">{formatMessage('signOut')}</span>
                    <LogoutIcon />
                </ActionButton>
            </ActionsGroup>
        </>
    );
};

export default SettingsModal;
