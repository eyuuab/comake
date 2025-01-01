
const Login = () => {
    return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-text animate-gradient">
        <div className="bg-card p-8 rounded-lg shadow-lg max-w-md w-full transform transition duration-300 hover:scale-105">
          <h2 className="text-2xl font-bold text-primary mb-2 text-center">Welcome Back to CoMakE</h2>
          <p className="text-sm text-center mb-6">Log in to continue collaborating and building together!</p>
          
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-md bg-gray-800 text-text placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-md bg-gray-800 text-text placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
              required
            />
            <div className="flex justify-center">
            <button
              type="submit"
              className="w-32 p-2 rounded-md text-white border border-blue-300 hover:bg-blue-700 hover:border-blue-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                Log In
            </button>
            </div>
          </form>
  
          <p className="text-sm text-center mt-4">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-300 text-primary hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    );
  };
  
  export default Login;
  