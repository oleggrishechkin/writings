import writingsState, { IWriting } from '../states/writingsState';
import addF from '../utils/addF';
import userState from '../states/userState';
import putJson from '../api/putJson';
import jsonPaths from '../constants/jsonPaths';
import toUrl from '../utils/toUrl';

const putWriting = (writingId: string, data: Partial<IWriting>): Promise<IWriting> => {
    const localId = userState()?.localId;
    const writing = writingsState()[writingId];
    const extendedWriting: IWriting = {
        id: writingId,
        _createdBy: localId as string,
        _createdOn: Date.now(),
        title: '',
        content: '',
        ...(writing as IWriting | undefined),
        ...data,
        _updatedOn: Date.now()
    };

    writingsState(addF(writingId, extendedWriting));

    return putJson<IWriting>(toUrl(jsonPaths.writing, { userId: localId, writingId }), extendedWriting);
};

export default putWriting;
