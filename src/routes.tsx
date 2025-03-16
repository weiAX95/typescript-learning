import { lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const BasicTypes = lazy(() => import('./pages/BasicTypes'));
const Interfaces = lazy(() => import('./pages/Interfaces'));
const Generics = lazy(() => import('./pages/Generics'));
const Decorators = lazy(() => import('./pages/Decorators'));

export const routes = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/basic-types',
        element: <BasicTypes />,
    },
    {
        path: '/interfaces',
        element: <Interfaces />,
    },
    {
        path: '/generics',
        element: <Generics />,
    },
    {
        path: '/decorators',
        element: <Decorators />,
    },
];
