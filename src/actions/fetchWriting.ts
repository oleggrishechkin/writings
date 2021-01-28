import writingsState, { IWriting } from '../states/writingsState';
import addF from '../utils/addF';
import userState from '../states/userState';
import fetchJson from '../api/fetchJson';
import jsonPaths from '../constants/jsonPaths';
import toUrl from '../utils/toUrl';

const fetchWriting = async (writingId: string): Promise<IWriting> => {
    const result = await fetchJson<IWriting>(toUrl(jsonPaths.writing, { userId: userState()?.localId, writingId }));

    if (result) {
        writingsState(addF(writingId, result));
    }

    return result;
};

export default fetchWriting;
