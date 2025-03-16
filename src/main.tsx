import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LoadingSpinner } from './components/LoadingSpinner';
import 'prismjs/themes/prism-tomorrow.css';
import './styles/base.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Suspense fallback={<LoadingSpinner />}>
            <App />
        </Suspense>
    </React.StrictMode>
);
