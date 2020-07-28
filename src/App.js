import { ErrorBoundary, Show, createEffect, onCleanup } from 'solid-js';
import './css/colors.css';
import './css/reset.css';
import './css/fonts.css';
import './css/body.css';
import './css/root.css';
import ErrorPage from './components/ErrorPage/ErrorPage';
import GreetingsPage from './components/GreetingsPage/GreetingsPage';
import Page from './components/Page/Page';
import WritingPage from './components/WritingPage/WritingPage';
import WritingsPage from './components/WritingsPage/WritingsPage';
import createHistorySignal from './signals/createHistorySignal';
import createLocalStorageSignal from './signals/createLocalStorageSignal';
import getLang from './utils/getLang';
import matchPath from './utils/matchPath';

const App = () => {
    const pathnameSignal = createHistorySignal(() => window.location.pathname);
    const singedInSignal = createLocalStorageSignal('user', (data) => !!data);
    const langSignal = createLocalStorageSignal('lang');
    const themeSignal = createLocalStorageSignal('theme');
    const handleTouch = () => {};
    const handleResize = () => {
        document.getElementById('root').style.maxHeight = `${window.visualViewport.height}px`;
    };

    createEffect(() => {
        document.documentElement.lang = getLang(langSignal());
    });
    createEffect(() => {
        document.documentElement.dataset.theme = themeSignal();
    });

    document.body.addEventListener('touchstart', handleTouch, { passive: true });

    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', handleResize, { passive: true });
    }

    onCleanup(() => {
        document.body.removeEventListener('touchstart', handleTouch, { passive: true });

        if (window.visualViewport) {
            window.visualViewport.removeEventListener('resize', handleResize, { passive: true });
        }
    });

    return (
        <ErrorBoundary
            fallback={
                <Page opened>
                    <ErrorPage />
                </Page>
            }
        >
            <Show when={!singedInSignal()}>
                <Page opened>
                    <GreetingsPage />
                </Page>
            </Show>
            <Show when={singedInSignal()}>
                <Page opened={matchPath('/', pathnameSignal())} base>
                    <WritingsPage />
                </Page>
                <Page opened={matchPath('/writings/:localId/:writingId', pathnameSignal())}>
                    <WritingPage />
                </Page>
            </Show>
        </ErrorBoundary>
    );
};

export default App;
