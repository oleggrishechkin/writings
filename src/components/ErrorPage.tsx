import { Fragment, ReactElement } from 'react';
import { useSelector } from 'react-tagged-state';
import styled from 'styled-components';
import intlState from '../store/states/intlState';
import Content from './Content';
import Header from './Header';
import PrimaryButton from './PrimaryButton';
import Title from './Title';

const Error = styled.div`
    align-items: center;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    justify-content: center;
    > *:not(:last-child) {
        margin-bottom: 1rem;
    }
`;

const Message = styled.span`
    color: var(--gray);
    text-align: center;
`;

const ErrorPage = (): ReactElement => {
    const { formatMessage } = useSelector(intlState);

    return (
        <Fragment>
            <Content>
                <Header />
                <Title>{formatMessage('error')}</Title>
                <Error>
                    <Message>{formatMessage('somethingBadHappened')}</Message>
                    <PrimaryButton onClick={() => document.location.reload(true)}>
                        {formatMessage('reload')}
                    </PrimaryButton>
                </Error>
            </Content>
        </Fragment>
    );
};

export default ErrorPage;
