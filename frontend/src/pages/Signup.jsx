import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("All fields required");
      return;
    }

    try {
      await API.post("/auth/signup", form);
      alert("Signup successful");
      Navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="relative w-full max-w-md bg-white p-6 rounded-xl shadow-md">

        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          Create your account 🚀
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Let’s get you started!
        </p>

        <div className="absolute top-3 right-3 hover:bg-gray-200 px-2 rounded-md duration-300  cursor-pointer" onClick={()=>navigate("/")} >
          ← Back
        </div>

        <form className="space-y-5" onSubmit={handleSignup}>

          {/* Username */}
          <div className="relative">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              placeholder=" "
              className="peer w-full p-3 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500"
            />
            <label
              className={`absolute left-3 bg-white px-1 transition-all
              ${form.name ? "-top-2 text-xs text-blue-500" : "top-3 text-sm text-gray-400"}
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500`}
            >
              Username
            </label>
          </div>

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

          {/* Terms */}
          <div className="flex items-center text-sm">
            <input type="checkbox" required className="mr-2" />
            <span className="text-gray-600">
              I agree to the{" "}
              <span className="text-blue-500 cursor-pointer hover:underline">
                Terms & Conditions
              </span>
            </span>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-2.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm font-semibold"
          >
            Signup
          </button>

        </form>
      </div>
    </div>
  );
}