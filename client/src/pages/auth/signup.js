import { useState } from "react";
import { useRouter } from "next/router";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const userData = { username, email, password };

        try {
            const response = await fetch("http://localhost:3001/user/signup", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Signup successful", data);
                router.push("/auth/signin"); // Navigate to login after successful signup
            } else {
                setError(data.message || "Something went wrong. Please try again.");
            }
        } catch (error) {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-wrapper">
            <div className="signup-container">
                <div className="branding">
                    <h1>Hello SaleSkip!👋</h1>
                    <p>Skip repetitive tasks and get productive through automation. Save tons of time!</p>
                </div>

                <div className="form-container">
                    <h2>Sign Up</h2>
                    <form className="input-container" onSubmit={handleSubmit}>
                        {error && <div className="error-message">{error}</div>} {/* Display error */}

                        <div className="signup-input">
                            <input 
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="signup-input">
                            <input 
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="signup-input">
                            <input 
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="signup-buttons">
                            <button type="submit" disabled={loading}>
                                {loading ? "Signing Up..." : "Sign Up"}
                            </button>
                        </div>

                        <div className="signup-footer">
                            <button type="button" onClick={() => router.push("/auth/signin")}>
                                Already have an account? Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Inline Styles using JSX */}
            <style jsx>{`
                .signup-wrapper {
                    background-color: #f0f4f8;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .signup-container {
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
                    position: relative; /* Make the container relative for positioning the overlay */
                    flex: 1;
                    background-image: url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600');
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
                    background-color: rgba(0, 0, 0, 0.5); /* Dark overlay (50% opacity) */
                    border-radius: 10px 0 0 10px;
                    z-index: 1; /* Place the overlay behind the text */
                }
                .branding h1,
                .branding p {
                    position: relative;
                    z-index: 2; /* Ensure text is above the overlay */
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
                .signup-input {
                    margin-bottom: 15px;
                    width: 100%;
                }
                .signup-input input {
                    padding: 12px;
                    border: 1px solid #ccc;
                    width: 100%;
                    border-radius: 5px;
                    font-size: 16px;
                }
                .signup-buttons {
                    margin-top: 20px;
                }
                .signup-buttons button {
                    padding: 12px;
                    background-color: #28a745;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    width: 100%;
                    font-size: 16px;
                }
                .signup-buttons button:disabled {
                    background-color: #ccc;
                    cursor: not-allowed;
                }
                .signup-footer {
                    margin-top: 10px;
                    text-align: center;
                }
                .signup-footer button {
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

export default Signup;