import { Fragment, ReactElement } from 'react';
import { useSelector } from 'react-tagged-state';
import styled from 'styled-components';
import signInWithGoogle from '../actions/singInWithGoogle';
import { ReactComponent as EditIcon } from '../icons/edit-24px.svg';
import intlState from '../store/states/intlState';
import Content from './Content';
import Header from './Header';
import PrimaryButton from './PrimaryButton';
import Title from './Title';

const Greetings = styled.div`
    align-items: center;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    justify-content: center;
    > *:not(:last-child) {
        margin-bottom: 1rem;
    }
`;

const Message = styled.div`
    color: var(--gray);
    text-align: center;
`;

const StyledEditIcon = styled(EditIcon)`
    fill: var(--white);
    height: 56px;
    width: 56px;
`;

const GreetingsPage = (): ReactElement => {
    const { formatMessage } = useSelector(intlState);

    return (
        <Fragment>
            <Content>
                <Header />
                <Title>{formatMessage('greetings')}</Title>
                <Greetings>
                    <StyledEditIcon />
                    <Title>Writings</Title>
                    <Message>{formatMessage('signInPlease')}</Message>
                    <PrimaryButton onClick={() => signInWithGoogle()}>{formatMessage('signIn')}</PrimaryButton>
                </Greetings>
            </Content>
        </Fragment>
    );
};

export default GreetingsPage;
