import React from "react";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to CoMakeE</h1>
      <p className="text-lg mb-6">
        A powerful collaborative code editor designed for developers.
      </p>
      <div className="flex space-x-6">
        <button className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-gray-700 transition duration-300">
          Get Started
        </button>
        <button className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-gray-700 transition duration-300">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Home;
