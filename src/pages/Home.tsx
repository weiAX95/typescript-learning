import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="mb-4 text-4xl font-bold text-ts-blue">
                    TypeScript 学习指南
                </h1>
                <p className="mb-8 text-xl text-gray-400">
                    交互式学习 TypeScript 的核心概念和最佳实践
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
                <Link to="/basic-types" className="transition-colors ts-card hover:bg-gray-700">
                    <h2 className="mb-3 text-2xl font-bold text-ts-blue">基础类型</h2>
                    <p className="text-gray-400">
                        学习 TypeScript 的基本类型系统，包括数字、字符串、布尔值、数组、元组等。
                    </p>
                </Link>

                <Link to="/interfaces" className="transition-colors ts-card hover:bg-gray-700">
                    <h2 className="mb-3 text-2xl font-bold text-ts-blue">接口</h2>
                    <p className="text-gray-400">
                        探索接口如何定义对象的结构，以及在面向对象编程中的应用。
                    </p>
                </Link>

                <Link to="/generics" className="transition-colors ts-card hover:bg-gray-700">
                    <h2 className="mb-3 text-2xl font-bold text-ts-blue">泛型</h2>
                    <p className="text-gray-400">
                        掌握泛型编程，创建可重用的组件和灵活的类型定义。
                    </p>
                </Link>

                <Link to="/decorators" className="transition-colors ts-card hover:bg-gray-700">
                    <h2 className="mb-3 text-2xl font-bold text-ts-blue">装饰器</h2>
                    <p className="text-gray-400">
                        学习使用装饰器来注解和修改类、方法和属性的行为。
                    </p>
                </Link>
            </div>

            <div className="p-6 mt-12 ts-card">
                <h2 className="mb-4 text-2xl font-bold text-ts-blue">快速开始</h2>
                <div className="ts-code-block">
                    <pre className="text-gray-300">
                        <code>{`npm create vite@latest my-ts-app -- --template react-ts
cd my-ts-app
npm install
npm run dev`}</code>
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default Home;
