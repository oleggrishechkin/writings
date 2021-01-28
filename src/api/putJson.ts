import config from '../config';
import getToken from '../actions/getToken';
import toSearch from '../utils/toSearch';

const putJson = async <Type>(url: string, data: Partial<Type>): Promise<Type> =>
    window
        .fetch(
            `${config.firebase.databaseURL}${url}.json${toSearch({
                auth: await getToken()
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

export default putJson;
