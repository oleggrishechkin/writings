const config = {
    firebase: {
        apiKey: 'AIzaSyCaOVxj8VKTBQhtNFGMz8zKWisMC9CJ788',
        continueUri: 'https://writings-1.firebaseapp.com/oauth',
        databaseUrl: 'https://writings-1.firebaseio.com'
    },
    indexedDB: {
        name: 'writingsIndexedDB',
        version: 1,
        stores: {
            writings: { keyPath: 'id' }
        }
    }
};

export default config;