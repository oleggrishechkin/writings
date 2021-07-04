import writingsState from '../store/states/writingsState';
import htmlToText from '../utils/htmlToText';

const shareWriting = async (writingId: string): Promise<void> => {
    const writing = writingsState()[writingId];

    if (!writing) {
        return;
    }

    if (window.navigator.share) {
        await window.navigator.share({
            title: writing.title,
            text: htmlToText(writing.content)
        });
    }

    if (window.navigator.clipboard.writeText) {
        await window.navigator.clipboard.writeText(`${writing.title}\n${htmlToText(writing.content)}`);
    }
};

export default shareWriting;
