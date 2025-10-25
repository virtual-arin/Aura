import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { serverUrl } from "../main";
import axios from "axios";
import { userDataContext } from "../contexts/userContext";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { fetchCurrentUser } = useContext(userDataContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (!name || !email || !password || !gender) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }
    try {
      await axios.post(
        `${serverUrl}/api/auth/signup`,
        {
          name,
          email,
          password,
          gender,
        },
        { withCredentials: true }
      );
      await fetchCurrentUser();

      navigate("/login");
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred during signup."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#23262f] p-4">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-[#343440] p-6 shadow-md sm:p-8 md:space-y-8">
        {/* Signup Heading */}
        <div className="text-center">
          <img src="/icon.png" alt="Aura Logo" className="mx-auto h-20 w-30" />
          <h1 className="mt-4 text-2xl font-bold text-gray-100 sm:text-3xl">
            Signup to Aura
          </h1>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSignup} noValidate>
          <div className="w-full">
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-gray-300"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Enter your name"
              className="w-full rounded-md border border-gray-700 bg-[#2d3748] px-3 py-2 text-gray-200 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              className="w-full rounded-md border border-gray-700 bg-[#2d3748] px-3 py-2 text-gray-200 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="gender"
              className="mb-1 block text-sm font-medium text-gray-300"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              className="w-full rounded-md border border-gray-700 bg-[#2d3748] px-3 py-2 text-gray-200 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              onChange={(e) => setGender(e.target.value)}
              value={gender}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="w-full">
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Enter your password"
                className="w-full rounded-md border border-gray-700 bg-[#2d3748] px-3 py-2 text-gray-200 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-400 hover:text-indigo-300"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
