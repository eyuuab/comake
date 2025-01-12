import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // Import Lucide icons

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/users/login", {
        email: email,
        password: password,
      });
      setEmail("");
      setPassword("");
      console.log("Login response:", response.data);
      localStorage.setItem("authToken", response.data.token);

      navigate("/");
    } catch (error: any) {
      console.error("Error response:", error.response);
      setMessage(
        error.response?.data?.detail || "Something went wrong, please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-text animate-gradient">
      <div className="bg-card p-8 rounded-lg shadow-lg max-w-md w-full transform transition duration-300 hover:scale-105">
        <h2 className="text-2xl font-bold text-primary mb-2 text-center">
          Welcome Back to CoMakE
        </h2>
        <p className="text-sm text-center mb-6">
          Log in to continue collaborating and building together!
        </p>

        {message && (
          <div className="mb-4 text-center text-sm text-red-500">{message}</div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-md bg-gray-800 text-text placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} // Toggle input type
              placeholder="Password"
              className="w-full p-3 rounded-md bg-gray-800 text-text placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-300 focus:outline-none"
              onClick={() => setShowPassword((prev) => !prev)} // Toggle visibility
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-32 p-2 rounded-md text-white border border-blue-300 hover:bg-blue-700 hover:border-blue-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
              ) : (
                "Log In"
              )}
            </button>
          </div>
        </form>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-300 text-primary hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
