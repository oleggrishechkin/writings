import cx from 'clsx';
import { For, Show } from 'solid-js';
import { v1 as uuidv1 } from 'uuid';
import AddCircleOutlineIcon from '../../icons/add_circle_outline-24px.svg';
import History from '../../proxies/History';
import LocalStorage from '../../proxies/LocalStorage';
import createHistorySignal from '../../signals/createHistorySignal';
import createLocalStorageSignal from '../../signals/createLocalStorageSignal';
import createWritingsSignal from '../../signals/createWritingsSignal';
import translate from '../../utils/translate';
import AddWriting from '../AddWriting/AddWriting';
import Avatar from '../Avatar/Avatar';
import Content from '../Content/Content';
import Header from '../Header/Header';
import IconButton from '../IconButton/IconButton';
import Modal from '../Modal/Modal';
import Search from '../Search/Search';
import SettingsModal from '../SettingsModal/SettingsModal';
import Title from '../Title/Title';
import Writing from '../Writing/Writing';
import { filterWritings } from './utils';
import theme from './WritingsPage.module.css';

const WritingsPage = () => {
    const modalSignal = createHistorySignal(() => window.history.state?.modal);
    const localIdSignal = createLocalStorageSignal('user', (data) => data?.localId);
    const photoUrlSignal = createLocalStorageSignal('user', (data) => data?.photoUrl);
    const searchSignal = createLocalStorageSignal('search');
    const writingsSignal = createWritingsSignal(localIdSignal());

    return (
        <>
            <Header>
                <IconButton className={theme.headerButton} onClick={() => History.pushState({ modal: 'settings' })}>
                    <Avatar className={theme.headerAvatar} src={photoUrlSignal()} size={28} />
                    <Modal opened={modalSignal() === 'settings'} onClose={() => History.back()}>
                        <SettingsModal onClose={() => History.back()} />
                    </Modal>
                </IconButton>
                <IconButton
                    className={cx(theme.headerButton, theme.headerIcon)}
                    onClick={() =>
                        History.pushState({}, `/writings/${LocalStorage.getItem('user')?.localId}/${uuidv1()}`)
                    }
                >
                    <AddCircleOutlineIcon />
                </IconButton>
            </Header>
            <Content name="writings">
                <Title>{translate('writings')}</Title>
                <Search value={searchSignal()} onChange={(value) => LocalStorage.setItem('search', value)} />
                <div className={theme.writings}>
                    <For
                        each={filterWritings(writingsSignal(), {
                            localId: localIdSignal(),
                            search: searchSignal()
                        })}
                    >
                        {(writing) => <Writing writing={writing} />}
                    </For>
                    <Show when={!searchSignal() && searchSignal() !== ''}>
                        <AddWriting />
                    </Show>
                </div>
            </Content>
        </>
    );
};

export default WritingsPage;
