import React, { ReactElement } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import OopsPage from './components/pages/OopsPage';
import HelloPage from './components/pages/HelloPage';
import WritingPage from './components/pages/WritingPage';
import WritingsPage from './components/pages/WritingsPage';
import useTouchEvents from './hooks/useTouchEvents';
import Route from './components/Route';
import PrivateRoute from './components/PrivateRoute';
import Page from './components/Page';
import useVisualViewportHeight from './hooks/useVisualViewportHeight';

const App = (): ReactElement => {
    useTouchEvents();
    useVisualViewportHeight();

    return (
        <ErrorBoundary
            fallback={
                <Page opened root>
                    <OopsPage />
                </Page>
            }
        >
            <PrivateRoute
                fallback={
                    <Page opened root>
                        <HelloPage />
                    </Page>
                }
            >
                <Route path="/">
                    <Page root>
                        <WritingsPage />
                    </Page>
                </Route>
                <Route path="/writings/:writingId">
                    <Page>
                        <WritingPage />
                    </Page>
                </Route>
            </PrivateRoute>
        </ErrorBoundary>
    );
};

export default App;
