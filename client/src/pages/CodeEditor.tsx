import React, { useState, useRef } from "react";
import MonacoEditor from "@monaco-editor/react";
import { Code, Play, Loader2 } from 'lucide-react';

// Mock LanguageSelector since it's not provided (you'll replace with your actual component)
const LanguageSelector = ({ 
  language, 
  onLanguageChange 
}: { 
  language: string, 
  onLanguageChange: (lang: string) => void 
}) => {
  const languages = [
    'javascript', 'typescript', 'python', 'java', 
    'cpp', 'rust', 'go', 'ruby'
  ];

  return (
    <div className="flex items-center space-x-2">
      <Code className="text-indigo-400" />
      <select 
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-500 transition-all duration-300 hover:border-indigo-500"
      >
        {languages.map(lang => (
          <option key={lang} value={lang}>
            {lang.charAt(0).toUpperCase() + lang.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

const Editor: React.FC = () => {
  const [language, setLanguage] = useState<string>("javascript");
  const [editorValue, setEditorValue] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const editorRef = useRef<any>(null);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    setEditorValue("");
    setOutput("");
  };

  const handleRunCode = async () => {
    const code = editorRef.current?.getValue();
    
    if (!code) {
      setOutput("No code to run");
      return;
    }

    setIsLoading(true);
    setOutput("Executing code...");

    try {
      // Simulated code execution
      const result = await new Promise<string>((resolve) => 
        setTimeout(() => resolve("Code executed successfully!"), 1500)
      );
      setOutput(result);
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen flex flex-col">
      {/* Top Navigation */}
      <div className="bg-gray-800/70 backdrop-blur-sm p-4 flex items-center justify-between shadow-xl border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Code className="text-indigo-400 w-6 h-6" />
            <h1 className="text-xl font-bold text-white">Code Playground</h1>
          </div>
          
          <LanguageSelector 
            language={language} 
            onLanguageChange={handleLanguageChange} 
          />
        </div>

        <button 
          onClick={handleRunCode}
          disabled={isLoading}
          className={`
            flex items-center space-x-2 px-6 py-2 rounded-lg 
            transition-all duration-300 transform 
            ${isLoading 
              ? "bg-gray-600 cursor-not-allowed" 
              : "bg-indigo-600 hover:bg-indigo-700 hover:scale-105 active:scale-95"
            }
            text-white font-semibold shadow-lg
          `}
        >
          {isLoading ? (
            <><Loader2 className="mr-2 animate-spin" /> Running...</>
          ) : (
            <><Play className="mr-2" /> Run Code</>
          )}
        </button>
      </div>

      {/* Main Editor Area */}
      <div className="flex flex-1 p-4 space-x-4 overflow-hidden">
        {/* Code Editor */}
        <div className="w-2/3 bg-gray-800/50 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
          <MonacoEditor
            onMount={(editor) => {
              editorRef.current = editor;
            }}
            height="80vh"
            language={language}
            theme="vs-dark"
            value={editorValue}
            onChange={(value) => setEditorValue(value || "")}
            options={{
              selectOnLineNumbers: true,
              minimap: { enabled: false },
              fontSize: 14,
              automaticLayout: true,
            }}
          />
        </div>

        {/* Output Section */}
        <div className="w-1/3 bg-gray-800/50 rounded-xl shadow-2xl border border-gray-700 p-4">
          <div className="flex items-center mb-4 space-x-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-green-500" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" 
              />
            </svg>
            <h3 className="text-xl font-bold text-gray-300">Output Console</h3>
          </div>
          
          <div className="bg-black/60 text-green-400 p-4 rounded-lg shadow-inner h-[75vh] overflow-auto">
            <pre className="font-mono text-sm">
              {output || "Run your code to see the output"}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;