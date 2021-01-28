import toUrl from '../utils/toUrl';
import navRoutes from '../constants/navRoutes';

const shareWriting = async (writingId: string): Promise<void> => {
    if (window.navigator.share) {
        await window.navigator.share({
            title: 'Writings',
            text: 'Writings',
            url: `${window.location.origin}${toUrl(navRoutes.writing, { writingId })}`
        });
    }

    if (window.navigator.clipboard.writeText) {
        await window.navigator.clipboard.writeText(
            `${window.location.origin}${toUrl(navRoutes.writing, { writingId })}`
        );
    }
};

export default shareWriting;
