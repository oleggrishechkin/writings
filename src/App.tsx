import { Fragment, ReactElement } from 'react';
import './css/variables/colors.css';
import './css/variables/fonts.css';
import './css/variables/shadows.css';
import './css/reset.css';
import './css/body.css';
import './css/root.css';
import { useSelector } from 'react-tagged-state';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorPage from './components/ErrorPage';
import GreetingsPage from './components/GreetingsPage';
import Page from './components/Page';
import WritingPage from './components/WritingPage';
import WritingsPage from './components/WritingsPage';
import userState from './store/states/userState';
import pathnameState from './store/states/pathnameState';
import useTouchEvents from './hooks/useTouchEvents';
import useVisualViewport from './hooks/useVisualViewport';
import Router from './classes/Router';

const App = (): ReactElement => {
    const pathname = useSelector(pathnameState);
    const user = useSelector(userState);

    useTouchEvents();
    useVisualViewport();

    return (
        <ErrorBoundary
            fallback={
                <Page opened>
                    <ErrorPage />
                </Page>
            }
        >
            {!user && (
                <Page opened>
                    <GreetingsPage />
                </Page>
            )}
            {!!user && (
                <Fragment>
                    <Page opened={!!Router.match(Router.paths.writings, pathname)} base>
                        <WritingsPage />
                    </Page>
                    <Page opened={!!Router.match(Router.paths.writing, pathname)}>
                        <WritingPage />
                    </Page>
                </Fragment>
            )}
        </ErrorBoundary>
    );
};

export default App;
