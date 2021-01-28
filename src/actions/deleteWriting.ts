import writingsState from '../states/writingsState';
import removeF from '../utils/removeF';
import userState from '../states/userState';
import deleteJson from '../api/deleteJson';
import jsonPaths from '../constants/jsonPaths';
import toUrl from '../utils/toUrl';

const deleteWriting = async (writingId: string): Promise<void> => {
    writingsState(removeF(writingId));

    await deleteJson(toUrl(jsonPaths.writing, { userId: userState()?.localId, writingId }));
};

export default deleteWriting;
