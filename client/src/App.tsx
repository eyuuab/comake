import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";

// import CodeEditor from "./pages/editor/codeEditor";
// import Draw from "./pages/home/body"; // Update with your Draw page when implemented.

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <Navbar />
        <Home />
        <div className="p-4">
          
        </div>
      </div>
    </Router>
  );
};

export default App;
