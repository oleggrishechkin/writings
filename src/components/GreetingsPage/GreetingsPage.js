import signInWithGoogle from '../../actions/singInWithGoogle';
import EditIcon from '../../icons/edit-24px.svg';
import translate from '../../utils/translate';
import Content from '../Content/Content';
import Header from '../Header/Header';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import Title from '../Title/Title';
import theme from './GreetingsPage.module.css';

const GreetingsPage = () => (
    <>
        <Header />
        <Content>
            <Title>{translate('greetings')}</Title>
            <div className={theme.greetings}>
                <EditIcon className={theme.logo} />
                <Title>Writings</Title>
                <div className={theme.title}>{translate('signInPlease')}</div>
                <PrimaryButton onClick={() => signInWithGoogle()}>{translate('signIn')}</PrimaryButton>
            </div>
        </Content>
    </>
);

export default GreetingsPage;
