import { Fragment, ReactElement } from 'react';
import { v1 as uuidv1 } from 'uuid';
import { useSelector } from 'react-tagged-state';
import styled from 'styled-components';
import { ReactComponent as AddCircleOutlineIcon } from '../icons/add_circle_outline-24px.svg';
import userState from '../store/states/userState';
import searchState from '../store/states/searchState';
import intlState from '../store/states/intlState';
import filteredWritingsSelector from '../store/selectors/filteredWritingsSelector';
import useFetch from '../hooks/useFetch';
import fetchWritings from '../actions/fetchWritings';
import useMenu from '../hooks/useMenu';
import toUrl from '../utils/toUrl';
import { ReactComponent as AddCircleIcon } from '../icons/add_circle-24px.svg';
import lastUpdatedWritingSelector from '../store/selectors/lastUpdatedWritingSelector';
import Router from '../classes/Router';
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
        margin-right: 1rem;
    }
`;

const StyledSearchInput = styled(SearchInput)`
    position: sticky;
    top: 56px;
    z-index: 1;
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
            <Content name="writings">
                <Header>
                    <StyledIconButton onClick={menu.open}>
                        <Avatar src={user?.photoUrl} size={28} />
                        <Modal opened={menu.opened} onClose={menu.close}>
                            <SettingsModal onClose={menu.close} />
                        </Modal>
                    </StyledIconButton>
                    <StyledIconButton onClick={() => Router.push(toUrl(Router.paths.writing, { writingId: uuidv1() }))}>
                        <AddCircleOutlineIcon />
                    </StyledIconButton>
                </Header>
                <Title>{formatMessage('last')}</Title>
                {!!lastUpdatedWriting && <WritingFull writing={lastUpdatedWriting} />}
                <AllBlock>
                    <Title>{formatMessage('all')}</Title>
                    <IconButton onClick={() => Router.push(toUrl(Router.paths.writing, { writingId: uuidv1() }))}>
                        <StyledAddCircleIcon />
                    </IconButton>
                </AllBlock>
                <StyledSearchInput value={search} onChange={(value) => searchState(value)} />
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
