import createLocalStorageSignal from '../../signals/createLocalStorageSignal';
import Avatar from '../Avatar/Avatar';
import theme from './Account.module.css';

const Account = () => {
    const photoUrlSignal = createLocalStorageSignal('user', (data) => data?.photoUrl);
    const displayNameSignal = createLocalStorageSignal('user', (data) => data?.displayName);
    const emailSignal = createLocalStorageSignal('user', (data) => data?.email);

    return (
        <div className={theme.account}>
            <Avatar src={photoUrlSignal()} size={112} />
            <div className={theme.displayName}>{displayNameSignal() || ' '}</div>
            <div className={theme.email}>{emailSignal() || ' '}</div>
        </div>
    );
};

export default Account;
