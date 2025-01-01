import React, { useState, useRef, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import { Code, Play, Loader2, Users } from 'lucide-react';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

// Define user and cursor types
interface User {
  id: string;
  name: string;
  color: string;
}

interface Cursor {
  user: User;
  position: {
    lineNumber: number;
    column: number;
  };
}

const Editor: React.FC = () => {
  const [language, setLanguage] = useState<string>("javascript");
  const [editorValue, setEditorValue] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [socket, setSocket] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<User>({
    id: uuidv4(),
    name: `User_${Math.floor(Math.random() * 1000)}`,
    color: `hsl(${Math.random() * 360}, 70%, 60%)`
  });
  const [collaborators, setCollaborators] = useState<User[]>([]);
  const [remoteCursors, setRemoteCursors] = useState<Cursor[]>([]);
  const editorRef = useRef<any>(null);

  // Initialize Socket Connection
  useEffect(() => {
    const newSocket = io('http://localhost:4000', {
      query: { 
        userId: currentUser.id,
        userName: currentUser.name,
        userColor: currentUser.color
      }
    });

    setSocket(newSocket);

    // Handle incoming collaborator updates
    newSocket.on('collaborators', (users: User[]) => {
      setCollaborators(users.filter(u => u.id !== currentUser.id));
    });

    // Handle remote cursor updates
    newSocket.on('cursor-change', (cursor: Cursor) => {
      if (cursor.user.id !== currentUser.id) {
        setRemoteCursors(prev => {
          const existingIndex = prev.findIndex(c => c.user.id === cursor.user.id);
          if (existingIndex !== -1) {
            const updated = [...prev];
            updated[existingIndex] = cursor;
            return updated;
          }
          return [...prev, cursor];
        });
      }
    });

    // Handle code changes from other users
    newSocket.on('code-change', (data: { code: string, language: string }) => {
      if (editorRef.current) {
        const model = editorRef.current.getModel();
        model.setValue(data.code);
        setEditorValue(data.code);
        
        if (data.language !== language) {
          setLanguage(data.language);
        }
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, [currentUser]);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    socket?.emit('language-change', { 
      language: newLanguage,
      userId: currentUser.id 
    });
  };

  const handleEditorChange = (value: string | undefined) => {
    const newValue = value || "";
    setEditorValue(newValue);
    
    // Emit changes to other collaborators
    socket?.emit('code-change', { 
      code: newValue, 
      language,
      userId: currentUser.id 
    });
  };

  const handleCursorChange = () => {
    const editor = editorRef.current;
    if (editor) {
      const position = editor.getPosition();
      socket?.emit('cursor-change', {
        user: currentUser,
        position
      });
    }
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
            <h1 className="text-xl font-bold text-white">Collaborative Code Playground</h1>
          </div>
          
          {/* Language Selector */}
          <div className="flex items-center space-x-2">
            <select 
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-500"
            >
              {['javascript', 'typescript', 'python', 'java', 'cpp', 'rust', 'go', 'ruby'].map(lang => (
                <option key={lang} value={lang}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Collaborators */}
          <div className="flex items-center space-x-2">
            <Users className="text-indigo-400" />
            <div className="flex">
              {collaborators.map(user => (
                <div 
                  key={user.id} 
                  className="w-8 h-8 rounded-full border-2 -ml-2 first:ml-0"
                  style={{ 
                    backgroundColor: user.color,
                    borderColor: user.color 
                  }}
                  title={user.name}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Run Code Button */}
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
              
              // Add event listeners for cursor tracking
              editor.onDidChangeCursorPosition(handleCursorChange);
            }}
            height="80vh"
            language={language}
            theme="vs-dark"
            value={editorValue}
            onChange={handleEditorChange}
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