import config from '../config.json';
import getSearch from '../utils/getSearch';
import getIdToken from './getIdToken';

const putData = async (path, data) =>
    window
        .fetch(
            `${config.firebase.databaseURL}${path}.json${getSearch({
                auth: await getIdToken()
            })}`,
            { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
        )
        .then((response) => response.json())
        .then((response) => {
            if (response?.error) {
                throw response.error;
            }

            return response;
        });

export default putData;
