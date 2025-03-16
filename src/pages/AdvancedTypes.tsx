import { useState } from 'react';
import { CodeEditor } from '../components/CodeEditor';

const initialCode = `// 条件类型示例
type IsString<T> = T extends string ? true : false;

type A = IsString<'hello'>; // true
type B = IsString<42>; // false
`;

export const AdvancedTypes = () => {
    const [code, setCode] = useState(initialCode);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-ts-blue">高级类型</h2>
            <div className="ts-card">
                <h3 className="text-lg font-semibold mb-4">条件类型</h3>
                <CodeEditor
                    value={code}
                    onChange={setCode}
                    language="typescript"
                />
            </div>
        </div>
    );
};
