import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("All fields required");
      return;
    }

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/projects");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">

        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          Welcome back 👋
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Please login to continue
        </p>

        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <div className="relative">
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder=" "
              className="peer w-full p-3 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500"
            />
            <label
              className={`absolute left-3 bg-white px-1 transition-all
              ${form.email ? "-top-2 text-xs text-blue-500" : "top-3 text-sm text-gray-400"}
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500`}
            >
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              placeholder=" "
              className="peer w-full p-3 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500"
            />
            <label
              className={`absolute left-3 bg-white px-1 transition-all
              ${form.password ? "-top-2 text-xs text-blue-500" : "top-3 text-sm text-gray-400"}
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500`}
            >
              Password
            </label>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <span className="text-xs text-blue-500 cursor-pointer hover:underline">
              Forgot Password?
            </span>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-2.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm font-semibold"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
}