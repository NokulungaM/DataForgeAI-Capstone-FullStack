import { useState } from "react";
import { useRouter } from "next/router";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setMessage("");
      setError("");
  
      try {
        const response = await axios.post("http://localhost:3001/auth/forgotPassword", { email });
        setMessage("Check your email for the reset link.");
      } catch (err) {
        setError(err.response?.data?.error || "Something went wrong.");
      }
    };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-4">Forgot Password</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2 p-2 border w-80"
          required
        />
        <button type="submit" className="bg-green-500 p-2 rounded w-80">
          Send Reset Link
        </button>
      </form>
      {message && <p className="text-green-500 mt-4">{message}</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <button
        onClick={() => router.push("/auth/signin")}
        className="text-sm text-blue-500 mt-2 hover:underline"
      >
        Go back to Sign In
      </button>
    </div>
  );
};

export default ForgotPassword;
