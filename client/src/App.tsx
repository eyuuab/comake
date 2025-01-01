import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CodeEditor from "./pages/CodeEditor";  
import Navbar from "./components/Navbar";
import SignUp from "./pages/signup/signup";
import Login from "./pages/login/login";


const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<CodeEditor />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element= {<Login/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
