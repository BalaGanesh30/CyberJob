import React from "react";
import { useAppContext } from "../context/AppContext";
import API from "../../uitiles/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const { setShowUserLogin, login } = useAppContext();
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const endpoint = state === "login" ? "/user/login" : "/user/register";
      const payload =
        state === "login" ? { email, password } : { name, email, password };

      const response = await API.post(endpoint, payload);
      const data = response.data;

      if (!data.success) {
        throw new Error(data.message || "Operation failed");
      }

      // Successful operation
      login(data.token);
      toast.success(
        data.message ||
          (state === "login"
            ? "Login successful!"
            : "Account created successfully!")
      );

      if (state === "register") {
        // Clear form and switch to login after registration
        setName("");
        setEmail("");
        setPassword("");
        setState("login");
      } else {
        // Close modal after successful login
        setShowUserLogin(false);
        navigate("/dashboard"); // Optional: Redirect to dashboard
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Request failed. Please try again.";
      toast.error(errorMessage);
      console.error("Auth error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center justify-center text-sm text-gray-600 bg-black/50"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter Name..."
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
              type="text"
              required
              minLength={3}
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter Email..."
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter Password..."
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="password"
            required
            minLength={6}
          />
        </div>

        {state === "register" ? (
          <p className="text-sm">
            Already have an account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-purple-500 cursor-pointer hover:underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-sm">
            Don't have an account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-purple-500 cursor-pointer hover:underline"
            >
              Register here
            </span>
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`bg-gradient-to-r from-purple-500 to-purple-700 text-white px-5 py-2 rounded-full font-semibold text-sm w-full cursor-pointer ${
            isLoading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
          }`}
        >
          {isLoading
            ? "Processing..."
            : state === "register"
            ? "Create Account"
            : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
