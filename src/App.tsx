import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { Suspense } from 'react';
import Layout from './components/Layout';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import BasicTypes from './pages/BasicTypes';
import TypeQuiz from './pages/TypeQuiz';
import { NotFound } from './pages/NotFound';
import { LoadingSpinner } from './components/LoadingSpinner';

function App() {
    return (
        <ThemeProvider>
            <Router>
                <Layout>
                    <ErrorBoundary>
                        <Suspense fallback={<LoadingSpinner />}>
                            <Routes>
                                <Route path="/" element={<BasicTypes />} />
                                <Route path="/quiz" element={<TypeQuiz />} />
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
