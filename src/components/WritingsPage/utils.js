export const filterWritings = (writings, { localId, search, starred, sortBy }) =>
    writings
        .filter(
            (item) =>
                (item.content || '').toLowerCase().includes((search || '').toLowerCase()) &&
                item._createdBy === localId &&
                (!starred || !!item.starred)
        )
        .sort((prev, next) => {
            if (sortBy === 'title') {
                return (prev.title || '').localeCompare(next.title || '') || next._updatedOn - prev._updatedOn;
            }

            if (sortBy === 'created') {
                return next._createdOn - prev._createdOn;
            }

            return next._updatedOn - prev._updatedOn;
        });
