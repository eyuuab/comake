import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Body: React.FC = () => {
    const darkMode = useSelector((state: RootState) => state.theme.darkMode);
    

    return (
        <div className={`${darkMode ? 'bg-black text-white' : 'bg-gray-100 text-black'} relative flex flex-col items-center justify-center min-h-screen overflow-hidden transition-colors duration-300`}>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full opacity-20 filter blur-3xl"></div>
            <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full opacity-20 filter blur-3xl"></div>
            <main className="relative flex flex-col items-center justify-center flex-1 text-center px-4 pt-1">
                <h2 className={`text-7xl font-bold font-Oswald mb-6 ${darkMode ? 'bg-gradient-to-r from-indigo-400 to-white' : 'bg-gradient-to-r from-indigo-400 to-black'} inline-block text-transparent bg-clip-text rounded-xl`}>Welcome to CoMakeE</h2>
                <div className="relative max-w-4xl text-2xl mb-10">
                    <p className="relative z-10">
                        CoMakeE is a powerful collaborative code editor designed to bring developers together. 
                        With real-time code collaboration, shareable drawings, and much more !!
                    </p>
                </div>
                <div className="flex space-x-6">
                    {/* <Button className={`${darkMode ? 'text-black bg-white' : 'text-white bg-black'} rounded-xl hover:bg-indigo-200`} >Get Started</Button>
                    <Button className={`${darkMode ? 'text-white border border-white' : 'text-black border border-black'} rounded-xl bg-transparent hover:bg-gray-700`} >Learn More</Button> */}
                </div>
            </main>
        </div>
    );
};

export default Body;
