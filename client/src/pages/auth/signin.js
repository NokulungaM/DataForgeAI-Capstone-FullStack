import { useState } from "react";
import { useRouter } from "next/router";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!username || !password) {
      setError("Please fill in both fields");
      setLoading(false);
      return;
    }

    const userData = { username, password };

    try {
      const response = await fetch("http://localhost:3001/user/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Sign-in successful", data);

        // Store the JWT token in localStorage
        localStorage.setItem("token", data.token); // Make sure 'data.token' contains the JWT

        router.push("/landingPage"); // Navigate to a dashboard or desired page on successful sign-in
      } else {
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-wrapper">
      <div className="signin-container">
        <div className="branding">
          <h1>Welcome Back to DishDash!👋</h1>
          <p>Sign in to access your favorite recipes!</p>
        </div>

        <div className="form-container">
          <h2>Sign In</h2>
          <form className="input-container" onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}{" "}
            {/* Display error */}
            <div className="signin-input">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="signin-input">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="signin-buttons">
              <button type="submit" disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </div>
            <div className="signin-footer gap-1">
              <button type="button" onClick={() => router.push("/auth/signup")}>
                Don't have an account? Sign up
              </button>
            </div>
            <div>
              <button
              onClick={handleForgotPassword}
              className="text-sm text-blue-500 mt-2 hover:underline"
              >
               Forgot Password
            </button>
            </div>
          </form>
        </div>
      </div>

      {/* Inline Styles using JSX */}
      <style jsx>{`
        .signin-wrapper {
          background-color: #f0f4f8;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .signin-container {
          display: flex;
          justify-content: space-between;
          background-color: white;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          padding: 30px;
          max-width: 900px;
          width: 100%;
        }
        .branding {
          position: relative;
          flex: 1;
          background-image: url("https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600");
          background-size: cover;
          background-position: center;
          padding: 40px;
          border-radius: 10px 0 0 10px;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
        }
        .branding::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          border-radius: 10px 0 0 10px;
          z-index: 1;
        }
        .branding h1,
        .branding p {
          position: relative;
          z-index: 2;
        }
        .branding h1 {
          font-size: 28px;
          margin-bottom: 10px;
          color: white;
        }
        .branding p {
          font-size: 16px;
          color: white;
        }
        .form-container {
          flex: 1;
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .form-container h2 {
          font-size: 24px;
          margin-bottom: 20px;
        }
        .input-container {
          display: flex;
          flex-direction: column;
        }
        .signin-input {
          margin-bottom: 15px;
          width: 100%;
        }
        .signin-input input {
          padding: 12px;
          border: 1px solid #ccc;
          width: 100%;
          border-radius: 5px;
          font-size: 16px;
        }
        .signin-buttons {
          margin-top: 20px;
        }
        .signin-buttons button {
          padding: 12px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          width: 100%;
          font-size: 16px;
        }
        .signin-buttons button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
        .signin-footer {
          margin-top: 10px;
          text-align: center;
        }
        .signin-footer button {
          background: none;
          color: #5a67d8;
          border: none;
          cursor: pointer;
          font-size: 14px;
          text-decoration: underline;
        }
        .error-message {
          color: red;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default SignIn;
