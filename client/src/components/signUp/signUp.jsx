import React, { useState } from "react";
import userIcon from '../Assets/name.png';
import emailIcon from '../Assets/email.png';
import passwordIcon from '../Assets/password.png';

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            username,
            email,
            password
        };
        try {
            const response = await fetch("http://localhost:3000/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });
            const data = await response.json();
            if (response.ok) {
                console.log("Signup successful", data);
            } else {
                console.error("Error:", data.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="bg-gray-900 text-white w-96 mx-auto my-12 p-6 rounded-lg shadow-lg text-center">
            <div className="text-2xl font-bold mb-6">
                Sign Up
                <div className="h-1 bg-green-400 w-12 mx-auto mb-8"></div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="relative w-full mb-5">
                    <img src={userIcon} alt="User Icon" className="absolute top-3 left-3 w-5 h-5" />
                    <input 
                        type="text" 
                        placeholder="Username"
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full pl-10 py-2 rounded-lg border-none bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
                    />
                </div>
                <div className="relative w-full mb-5">
                    <img src={emailIcon} alt="Email Icon" className="absolute top-3 left-3 w-5 h-5" />
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 py-2 rounded-lg border-none bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
                    />
                </div>
                <div className="relative w-full mb-5">
                    <img src={passwordIcon} alt="Password Icon" className="absolute top-3 left-3 w-5 h-5" />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 py-2 rounded-lg border-none bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
                    />
                </div>
                <div className="w-full flex justify-between mt-5 space-x-3">
                    <button type="submit" className="bg-green-500 text-gray-900 py-2 rounded-lg w-1/2 hover:bg-green-600">Sign Up</button>
                    <button type="button" className="bg-green-500 text-gray-900 py-2 rounded-lg w-1/2 hover:bg-green-600">Login</button>
                </div>
            </form>
        </div>
    );
}

export default Signup;