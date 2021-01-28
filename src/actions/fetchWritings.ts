import writingsState, { IWriting } from '../states/writingsState';
import userState from '../states/userState';
import fetchJson from '../api/fetchJson';
import jsonPaths from '../constants/jsonPaths';
import toUrl from '../utils/toUrl';

const fetchWritings = async (): Promise<Record<string, IWriting>> => {
    const result = await fetchJson<Record<string, IWriting>>(
        toUrl(jsonPaths.writings, { userId: userState()?.localId })
    );

    if (result) {
        writingsState(result);
    }

    return result;
};

export default fetchWritings;
