import { useSelector } from 'react-tagged-state';
import { ReactElement } from 'react';
import styled from 'styled-components';
import userState from '../store/states/userState';
import Avatar from './Avatar';

const StyledAccount = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    > * {
        flex: 0 0 auto;
    }
    > *:not(:last-child) {
        margin-bottom: 0.5rem;
    }
`;

const DisplayName = styled.div`
    font-size: var(--fontNormal);
    text-shadow: var(--shadowDefault);
`;

const Email = styled.div`
    color: var(--gray);
`;

const Account = (): ReactElement => {
    const user = useSelector(userState);

    return (
        <StyledAccount>
            <Avatar src={user?.photoUrl} size={112} />
            <DisplayName>{user?.displayName || ' '}</DisplayName>
            <Email>{user?.email || ' '}</Email>
        </StyledAccount>
    );
};

export default Account;
