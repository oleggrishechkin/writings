import config from '../config.json';
import getSearch from '../utils/getSearch';
import getIdToken from './getIdToken';

const deleteData = async (path) =>
    window
        .fetch(
            `${config.firebase.databaseURL}${path}.json${getSearch({
                auth: await getIdToken()
            })}`,
            { method: 'DELETE', headers: { 'Content-Type': 'application/json' } }
        )
        .then((response) => response.json())
        .then((response) => {
            if (response?.error) {
                throw response.error;
            }

            return response;
        });

export default deleteData;
