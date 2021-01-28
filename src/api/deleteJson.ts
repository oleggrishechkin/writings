import config from '../config';
import getToken from '../actions/getToken';
import toSearch from '../utils/toSearch';

const deleteJson = async (url: string): Promise<void> =>
    window
        .fetch(
            `${config.firebase.databaseURL}${url}.json${toSearch({
                auth: await getToken()
            })}`,
            { method: 'DELETE', headers: { 'Content-Type': 'application/json' } }
        )
        .then((response) => response.json())
        .then((response) => {
            if (response?.error) {
                throw response.error;
            }

            return;
        });

export default deleteJson;
