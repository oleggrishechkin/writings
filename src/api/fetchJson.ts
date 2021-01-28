import config from '../config';
import getToken from '../actions/getToken';
import toSearch from '../utils/toSearch';

const fetchJson = async <Type>(url: string): Promise<Type> =>
    window
        .fetch(
            `${config.firebase.databaseURL}${url}.json${toSearch({
                auth: await getToken(),
                print: 'pretty'
            })}`,
            { headers: { 'Content-Type': 'application/json' } }
        )
        .then((response) => response.json())
        .then((response) => {
            if (response?.error) {
                throw response.error;
            }

            return response;
        });

export default fetchJson;
