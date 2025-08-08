import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import CustomTextInput from "../components/CustomTextInput";
import Loader from "../components/Loader";
import ErrorBanner from "../components/ErrorBanner";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { login, authLoading } = useAuth();

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      setTimeout(() => setError(null), 2000);
      return;
    }

    try {
      const res = await login(formData.email, formData.password);
      if (res) {
        navigate("/dashboard");
      } else {
        setError("Invalid Credentials");
        setTimeout(() => setError(null), 2000);
      }
    } catch {
      setError("Something went wrong.");
      setTimeout(() => setError(null), 2000);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#152238] overflow-hidden justify-center items-center md:px-0 px-5 relative">
      <Loader show={authLoading} />
      <ErrorBanner message={error} />

      <Card className="max-w-md w-full items-center p-6">
        <h1 className="text-xl md:text-2xl text-white font-semibold py-5">
          Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-5 py-5"
        >
          <CustomTextInput
            title="Email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <CustomTextInput
            title="Password"
            type="password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />

          <button
            type="submit"
            disabled={authLoading}
            className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md active:scale-95 transition-all duration-300 disabled:opacity-50"
          >
            Login
          </button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
