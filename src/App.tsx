import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { Suspense } from 'react';
import Layout from './components/Layout';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { LoadingSpinner } from './components/LoadingSpinner';
import { NotFound } from './pages/NotFound';
import { routes } from './routes';

function App() {
    return (
        <ThemeProvider>
            <Router>
                <Layout>
                    <ErrorBoundary>
                        <Suspense fallback={<LoadingSpinner />}>
                            <Routes>
                                {routes.map(route => (
                                    <Route
                                        key={route.path}
                                        path={route.path}
                                        element={route.element}
                                    />
                                ))}
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </Suspense>
                    </ErrorBoundary>
                </Layout>
            </Router>
        </ThemeProvider>
    );
}

export default App;
