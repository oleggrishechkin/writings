import translate from '../../utils/translate';
import Content from '../Content/Content';
import Header from '../Header/Header';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import Title from '../Title/Title';
import theme from './ErrorPage.module.css';

const ErrorPage = () => (
    <>
        <Header />
        <Content>
            <Title>{translate('error')}</Title>
            <div className={theme.error}>
                <span className={theme.title}>{translate('somethingBadHappened')}</span>
                <PrimaryButton onClick={() => document.location.reload(true)}>{translate('reload')}</PrimaryButton>
            </div>
        </Content>
    </>
);

export default ErrorPage;
