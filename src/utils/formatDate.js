const formatDate = (timestamp, withTime) => {
    const dateWithTime = (timestamp ? new Date(timestamp) : new Date()).toJSON().slice(0, 16);

    return withTime ? dateWithTime.replace('T', ', ') : dateWithTime.split('T')[0];
};

export default formatDate;
