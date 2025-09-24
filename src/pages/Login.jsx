import { useState } from "react";
import { useNavigate } from "react-router-dom";
import content from "../data/content.json"; // lorem text json

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const validate = () => {
    let valid = true;
    let newErrors = { username: "", password: "" };

    if (!username.trim()) {
      newErrors.username = "Fill username";
      valid = false;
    }
    if (!password.trim()) {
      newErrors.password = "Fill password";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = () => {
    if (validate()) {
      setUser({ username, password });
      navigate("/dashboard");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  // ✅ clear error when user starts typing
  const handleChange = (field, value) => {
    if (field === "username") {
      setUsername(value);
      if (errors.username) {
        setErrors((prev) => ({ ...prev, username: "" }));
      }
    } else if (field === "password") {
      setPassword(value);
      if (errors.password) {
        setErrors((prev) => ({ ...prev, password: "" }));
      }
    }
  };

  return (
    <div className="h-screen w-full flex bg-gradient-to-r from-black via-blue-950 to-blue-900">
      {/* Left Side - 70% */}
      <div className="w-[70%] flex flex-col justify-center px-12 text-white">
        <h1 className="text-5xl font-bold mb-6">Static Dashboard</h1>
        <p className="text-lg leading-relaxed">{content.loginText}</p>
      </div>

      {/* Right Side - 30% */}
      <div className="w-[30%] flex items-center justify-center bg-white shadow-lg">
        <div className="w-3/4">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Login
          </h2>

          {/* Username */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => handleChange("username", e.target.value)}
            onKeyDown={handleKeyPress}
            className={`w-full mb-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.username
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500"
            }`}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mb-4">{errors.username}</p>
          )}

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => handleChange("password", e.target.value)}
            onKeyDown={handleKeyPress}
            className={`w-full mb-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.password
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mb-6">{errors.password}</p>
          )}

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
