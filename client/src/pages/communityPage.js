import React, { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";

const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!token) {
        setError('User is not authenticated');
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("http://localhost:3001/user/community/all-recipes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Error fetching posts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [token]); // Fetch posts when token changes

  if (loading) return <div>Loading community posts...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      <Head>
        <title>Community Page</title>
      </Head>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post._id} className="bg-white rounded shadow-md p-4">
            <h2 className="text-2xl font-bold">{post.title}</h2>
            {/* Check if post.user exists */}
            {post.user && ( 
              <div className="flex items-center mb-4">
                <img
                  src={post.user.profilePicture || 'https://static.xx.fbcdn.net/rs/yog/r/HS5RyDQ5YRl.ico'} 
                  alt="Profile"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <p className="text-lg">{post.user.name}</p>
              </div>
            )}
            <p className="text-gray-600">{post.instructions}</p>
            <h3 className="text-xl font-bold mb-2">Ingredients:</h3>
            <ul>
              {post.ingredients.map((ingredient) => (
                <li key={ingredient} className="text-gray-600">
                  {ingredient}
                </li>
              ))}
            </ul>
            <div className="flex justify-between mt-4">
              {/* Placeholder for Like button */}
              <button className="text-blue-600 hover:text-blue-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 13.1h.01M12 4.318v.01M20.683 2.01h-.01M2.01 12a9 9 0 019-9 9 9 0 009 9zm9 9a9 9 0 009 9 9 9 0 009-9z"
                  />
                </svg>
              </button>

              {/* Placeholder for Comment button */}
              <button className="text-blue-600 hover:text-blue-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-9-9 9.863 9.863 0 0112-4 5 5 0 005-5 5 5 0 00-5-5 5 5 0 01-6 2 5 5 0 00-2 6"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
