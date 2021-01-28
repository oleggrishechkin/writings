import userState, { IUser } from '../states/userState';
import toParams from '../utils/toParams';
import createAuthUri from '../api/createAuthUri';
import signInWithIdp from '../api/signInWithIdp';
import getExpires from '../utils/getExpires';

const signInWithGoogle = async (): Promise<IUser> => {
    const width = 500;
    const height = 600;
    const left = Math.max((window.screen.availWidth - width) / 2, 0);
    const top = Math.max((window.screen.availHeight - height) / 2, 0);
    const oauthWindow = window.open(
        'about:blank',
        'OAuth',
        `width=${width},height=${height},top=${top},left=${left},location=yes,resizable=yes,statusbar=yes,toolbar=no`
    );
    const { authUri, sessionId } = await createAuthUri();
    const requestUri: string = await new Promise((resolve, reject) => {
        if (!oauthWindow) {
            reject();

            return;
        }

        oauthWindow.location.assign(authUri);
        window.addEventListener(
            'message',
            (event) => {
                const { href, search, hash } = JSON.parse(event.data);
                const error = toParams(search).error || toParams(hash).error;

                oauthWindow.close();

                if (error) {
                    reject(error);

                    return;
                }

                resolve(href);
            },
            { once: true }
        );
    });
    const loggedInUser = await signInWithIdp(requestUri, sessionId);
    const user = {
        ...loggedInUser,
        expires: getExpires(loggedInUser.expiresIn)
    };

    userState(user);

    return user;
};

export default signInWithGoogle;
