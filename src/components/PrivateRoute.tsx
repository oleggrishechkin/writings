import { ReactElement } from 'react';
import { useSelector } from 'react-tagged-state';
import userState from '../store/states/userState';

interface IProps {
    fallback: any;
    children: any;
}

const PrivateRoute = ({ fallback, children }: IProps): ReactElement => {
    const user = useSelector(userState);

    return user ? children : fallback;
};

export default PrivateRoute;
