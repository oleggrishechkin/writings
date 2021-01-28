import { Fragment, ReactElement } from 'react';
import { v1 as uuidv1 } from 'uuid';
import { useSelector } from 'react-tagged-state';
import styled from 'styled-components';
import { ReactComponent as AddCircleOutlineIcon } from '../icons/add_circle_outline-24px.svg';
import userState from '../states/userState';
import searchState from '../states/searchState';
import intlState from '../states/intlState';
import filteredWritingsSelector from '../selectors/filteredWritingsSelector';
import useFetch from '../hooks/useFetch';
import fetchWritings from '../actions/fetchWritings';
import navPush from '../actions/navPush';
import useMenu from '../hooks/useMenu';
import toUrl from '../utils/toUrl';
import navRoutes from '../constants/navRoutes';
import { ReactComponent as AddCircleIcon } from '../icons/add_circle-24px.svg';
import lastUpdatedWritingSelector from '../selectors/lastUpdatedWritingSelector';
import Title from './Title';
import SettingsModal from './SettingsModal';
import SearchInput from './SearchInput';
import Modal from './Modal';
import IconButton from './IconButton';
import Header from './Header';
import Content from './Content';
import Avatar from './Avatar';
import Writing from './Writing';
import WritingFull from './WritingFull';

const StyledIconButton = styled(IconButton)`
    flex: 0 0 56px;
`;

const Writings = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    > * {
        flex: 0 0 auto;
    }
    > *:not(:last-child) {
        margin-bottom: 0.5rem;
    }
`;

const AllBlock = styled.div`
    display: flex;
    > *:not(:last-child) {
        margin-right: 0.5rem;
    }
`;

const StyledAddCircleIcon = styled(AddCircleIcon)`
    height: 32px;
    width: 32px;
`;

const WritingsPage = (): ReactElement => {
    const menu = useMenu();
    const user = useSelector(userState);
    const search = useSelector(searchState);
    const lastUpdatedWriting = useSelector(lastUpdatedWritingSelector);
    const filteredWritings = useSelector(filteredWritingsSelector);
    const { formatMessage } = useSelector(intlState);

    useFetch(fetchWritings);

    return (
        <Fragment>
            <Header>
                <StyledIconButton onClick={menu.open}>
                    <Avatar src={user?.photoUrl} size={28} />
                    <Modal opened={menu.opened} onClose={menu.close}>
                        <SettingsModal onClose={menu.close} />
                    </Modal>
                </StyledIconButton>
                <StyledIconButton onClick={() => navPush(toUrl(navRoutes.writing, { writingId: uuidv1() }))}>
                    <AddCircleOutlineIcon />
                </StyledIconButton>
            </Header>
            <Content name="writings">
                <Title>{formatMessage('last')}</Title>
                {!!lastUpdatedWriting && <WritingFull writing={lastUpdatedWriting} />}
                <AllBlock>
                    <Title>{formatMessage('all')}</Title>
                    <IconButton onClick={() => navPush(toUrl(navRoutes.writing, { writingId: uuidv1() }))}>
                        <StyledAddCircleIcon />
                    </IconButton>
                </AllBlock>
                <SearchInput value={search} onChange={(value) => searchState(value)} />
                <Writings>
                    {filteredWritings.map((writing) => (
                        <Writing key={writing.id} writing={writing} />
                    ))}
                </Writings>
            </Content>
        </Fragment>
    );
};

export default WritingsPage;
