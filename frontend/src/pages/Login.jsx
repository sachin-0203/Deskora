import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2, ArrowLeft } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

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
      toast.warning("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login successful");

      setTimeout(() => {
        navigate("/projects");
      }, 1000);

    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 flex items-center justify-center px-4">

      <div className="relative w-full max-w-md bg-white/90 backdrop-blur-md border border-indigo-100 shadow-xl rounded-2xl p-6 sm:p-8">

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 transition-all cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {/* Heading */}
        <div className="mt-6 mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome Back
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Login to continue managing your projects
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <div className="relative">
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder=" "
              className="peer w-full rounded-xl border border-gray-300 bg-white px-4 pt-5 pb-2 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />

            <label
              className={`absolute left-4 bg-white px-1 transition-all duration-200
              ${
                form.email
                  ? "-top-2 text-xs text-indigo-600"
                  : "top-3.5 text-sm text-gray-400"
              }
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-indigo-600`}
            >
              Email Address
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder=" "
              className="peer w-full rounded-xl border border-gray-300 bg-white px-4 pt-5 pb-2 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />

            <label
              className={`absolute left-4 bg-white px-1 transition-all duration-200
              ${
                form.password
                  ? "-top-2 text-xs text-indigo-600"
                  : "top-3.5 text-sm text-gray-400"
              }
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-indigo-600`}
            >
              Password
            </label>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline transition-all cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100 transition-all duration-200 py-3 font-semibold disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don&apos;t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-indigo-600 font-medium hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>

      </div>
    </div>
  );
}