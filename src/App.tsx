import { Fragment, ReactElement } from 'react';
import './css/variables/fonts.css';
import './css/variables/colors.css';
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
import userState from './states/userState';
import pathnameState from './states/pathnameState';
import navRoutes from './constants/navRoutes';
import match from './utils/match';

const App = (): ReactElement => {
    const pathname = useSelector(pathnameState);
    const user = useSelector(userState);

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
                    <Page opened={!!match(navRoutes.writings, pathname)} base>
                        <WritingsPage />
                    </Page>
                    <Page opened={!!match(navRoutes.writing, pathname)}>
                        <WritingPage />
                    </Page>
                </Fragment>
            )}
        </ErrorBoundary>
    );
};

export default App;
