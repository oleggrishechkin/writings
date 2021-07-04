# Writings

App for writers

### App resources

-   [App](https://writings-1.web.app)
-   [Firebase Console](https://console.firebase.google.com/project/writings-1/overview)
-   [Google Console](https://console.developers.google.com/apis/dashboard?project=writings-1)

### Stack

-   [Typescript](https://www.typescriptlang.org/)
-   [React](https://reactjs.org/)
-   [Tailwind](https://tailwindcss.com/)
-   [Vite](https://vitejs.dev/)
-   [React Tagged State](https://github.com/oleggrishechkin/react-tagged-state)

---

-   Persistent storage powered by [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) and [LocalStorage](https://developer.mozilla.org/ru/docs/Web/API/Window/localStorage)
-   Routing powered by [History](https://developer.mozilla.org/en-US/docs/Web/API/History_API)
-   Rich text editing powered by [contenteditable](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable) with [execCommand](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand)
-   Date formatting powered by [toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString)
-   Assets caching powered by [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

### Development

-   `npm run dev` - build and run development server
-   `npm run deploy` - build and deploy to firebase hosting (you need [firebase-cli](https://firebase.google.com/docs/cli#mac-linux-npm))
-   `npm run icons` - transpile svg icons in `src/icons` to React components

### External dependencies

-   [firebase-cli](https://firebase.google.com/docs/cli#mac-linux-npm) for deploy to firebase hosting
    -   installation
    ```
    npm install -g firebase-tools
    ```
    -   login
    ```
    firebase login
    ```
