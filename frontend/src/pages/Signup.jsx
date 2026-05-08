import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2, ArrowLeft } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [agree, setAgree] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.warning("All fields are required");
      return;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (!agree) {
      toast.warning("Please accept Terms & Conditions");
      return;
    }

    try {
      setLoading(true);

      await API.post("/auth/signup", form);

      toast.success("Account created successfully");

      setTimeout(() => {
        navigate("/");
      }, 1200);

    } catch (err) {
      toast.error(
        err.response?.data?.error || "Signup failed"
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
            Create Account
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Join now and start managing your workspace
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSignup}>

          {/* Username */}
          <div className="relative">
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder=" "
              className="peer w-full rounded-xl border border-gray-300 bg-white px-4 pt-5 pb-2 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />

            <label
              className={`absolute left-4 bg-white px-1 transition-all duration-200
              ${
                form.name
                  ? "-top-2 text-xs text-indigo-600"
                  : "top-3.5 text-sm text-gray-400"
              }
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-indigo-600`}
            >
              Username
            </label>
          </div>

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

          {/* Terms */}
          <div className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
              className="mt-1 accent-indigo-600 cursor-pointer"
            />

            <p className="text-gray-600 leading-relaxed">
              I agree to the{" "}
              <span className="text-indigo-600 hover:underline cursor-pointer font-medium">
                Terms & Conditions
              </span>
            </p>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100 transition-all duration-200 py-3 font-semibold disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-600 font-medium hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}