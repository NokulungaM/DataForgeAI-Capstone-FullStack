const Signup = () => {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl mb-4">Sign Up</h1>
        <input type="email" placeholder="Email" className="mb-2 p-2 border" />
        <input type="password" placeholder="Password" className="mb-4 p-2 border" />
        <button className="bg-green-500 p-2 rounded">Sign Up</button>
      </div>
    );
  };
  
  export default Signup;
  