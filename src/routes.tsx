import { lazy } from 'react';

const BasicTypes = lazy(() => import('./pages/BasicTypes'));
const AdvancedTypes = lazy(() => import('./pages/AdvancedTypes'));
const Interfaces = lazy(() => import('./pages/Interfaces'));
const Generics = lazy(() => import('./pages/Generics'));
const Decorators = lazy(() => import('./pages/Decorators'));
const TypeQuiz = lazy(() => import('./pages/TypeQuiz'));
const TypeChallenges = lazy(() => import('./pages/TypeChallenges'));

export const routes = [
    {
        path: '/',
        element: <BasicTypes />,
        label: '基础类型'
    },
    {
        path: '/interfaces',
        element: <Interfaces />,
        label: '接口&类型别名'
    },
    {
        path: '/generics',
        element: <Generics />,
        label: '泛型'
    },
    {
        path: '/advanced-types',
        element: <AdvancedTypes />,
        label: '高级类型'
    },
    {
        path: '/type-challenges',
        element: <TypeChallenges />,
        label: '类型体操'
    },
    {
        path: '/decorators',
        element: <Decorators />,
        label: '装饰器'
    },
    {
        path: '/quiz',
        element: <TypeQuiz />,
        label: '类型测验'
    }
];
