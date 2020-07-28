# WritingsPage

App for writers

### App resources

- [App](https://writings-1.web.app)
- [Firebase Console](https://console.firebase.google.com/project/writings-1/overview)
- [Google Console](https://console.developers.google.com/apis/dashboard?project=writings-1)

### Development

- `npm start` - build and run development server
- `npm deploy` - build and deploy to firebase hosting

### External dependencies

- [firebase-cli](https://firebase.google.com/docs/cli#mac-linux-npm) for deploy to firebase hosting

### Notes

App built with [Solid](https://github.com/ryansolid/solid) (with signals) as main tech stack for best rendering perfomance.
It uses [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) for app routing, [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) and [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) as data storages.
Firebase only provides Realtime DatabaseStorage and Authentication (via REST) for cloud sync.
