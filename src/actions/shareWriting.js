const shareWriting = async (localId, writingId) => {
    if (window.navigator.share) {
        return window.navigator.share({
            title: 'Writings',
            text: 'Writings',
            url: `${window.location.origin}/wriitings/${localId}/${writingId}`
        });
    }

    if (window.navigator.clipboard.writeText) {
        return window.navigator.clipboard.writeText(window.location.href);
    }
};

export default shareWriting;
