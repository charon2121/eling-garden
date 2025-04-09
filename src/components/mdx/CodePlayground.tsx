'use client';

import React, { useState } from 'react';

type Props = {
  code: string;
  language?: string;
  title?: string;
};

export default function CodePlayground({ code, language = 'javascript', title }: Props) {
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    try {
      // 这里只是一个示例，实际应用中可能需要使用沙盒或更安全的方式执行代码
      // 在实际应用中，我们建议使用类似 CodeSandbox 或自定义 iframe 沙盒的方式
      const result = eval(code);
      setOutput(String(result));
    } catch (error) {
      setOutput(`错误：${(error as Error).message}`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="code-playground border rounded-md overflow-hidden mb-6">
      {title && (
        <div className="bg-gray-100 px-4 py-2 font-medium border-b">
          {title}
        </div>
      )}
      <div className="p-4 bg-gray-900 text-gray-200 overflow-auto">
        <pre>
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </div>
      <div className="flex justify-between items-center p-2 bg-gray-100 border-t">
        <button
          onClick={runCode}
          disabled={isRunning}
          className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isRunning ? '运行中...' : '运行代码'}
        </button>
        <div className="text-sm font-mono">类型: {language}</div>
      </div>
      {output && (
        <div className="p-4 border-t bg-gray-50">
          <h4 className="text-sm font-medium mb-2">输出:</h4>
          <pre className="p-2 bg-gray-800 text-gray-200 rounded overflow-auto">
            <code>{output}</code>
          </pre>
        </div>
      )}
    </div>
  );
} 