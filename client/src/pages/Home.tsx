import React, { useState, useEffect } from 'react';
import { Code, Paintbrush, Users, Zap } from 'lucide-react';

const Home = () => {
  const [activeTab, setActiveTab] = useState('code');
  const [displayedCode, setDisplayedCode] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  const codeLines = [
    'function example() {',
    '  console.log("Hello CoMakeE!");',
    '  const data = fetchData();',
    '  processInformation(data);',
    '  return data;',
    '}'
  ];

  useEffect(() => {
    if (activeTab === 'code') {
      const interval = setInterval(() => {
        if (currentLine < codeLines.length) {
          if (currentChar < codeLines[currentLine].length) {
            setDisplayedCode(prev => prev + codeLines[currentLine][currentChar]);
            setCurrentChar(prev => prev + 1);
          } else {
            setDisplayedCode(prev => prev + '\n');
            setCurrentLine(prev => prev + 1);
            setCurrentChar(0);
          }
        } else {
          // Reset animation
          setCurrentLine(0);
          setCurrentChar(0);
          setDisplayedCode('');
        }
      }, 50); // Adjust typing speed here

      return () => clearInterval(interval);
    }
  }, [currentLine, currentChar, activeTab]);

  const features = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Real-time Code Collaboration",
      description: "Code together seamlessly with your team members in real-time"
    },
    {
      icon: <Paintbrush className="w-6 h-6" />,
      title: "Interactive Drawing Board",
      description: "Visualize your ideas with our integrated drawing tools"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Workspace",
      description: "Organize your projects and team members efficiently"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Updates",
      description: "See changes instantly across all connected devices"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between mt-20">
          <div className="lg:w-1/2 space-y-8">
            <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-cyan-200">
              Welcome to CoMakE
            </h1>
            <p className="text-xl text-gray-300">
              Experience the future of collaborative coding with our powerful real-time editor and drawing board.
            </p>
            <div className="flex space-x-4">
              <button className="px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 opacity-90 rounded-lg font-bold hover:opacity-60 transition">
                Get Started
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-gray-500 rounded-lg font-bold hover:bg-purple-500/10 transition">
                Learn More
              </button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex space-x-2 mb-4">
                <button 
                  onClick={() => setActiveTab('code')}
                  className={`px-4 py-2 rounded ${activeTab === 'code' ? 'bg-gray-900' : 'bg-gray-700'}`}
                >
                  Code Editor
                </button>
                <button 
                  onClick={() => setActiveTab('draw')}
                  className={`px-4 py-2 rounded ${activeTab === 'draw' ? 'bg-gray-900' : 'bg-gray-700'}`}
                >
                  Draw Board
                </button>
              </div>
              <div className="h-64 bg-gray-900 rounded">
                {activeTab === 'code' ? (
                  <div className="p-4 font-mono text-sm text-gray-300">
                    <pre className="whitespace-pre-wrap">
                      <span className="text-blue-400">{displayedCode}</span>
                      <span className="animate-pulse">|</span>
                    </pre>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    <Paintbrush className="w-12 h-12" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition">
              <div className="text-purple-500 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;