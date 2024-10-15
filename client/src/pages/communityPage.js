import React, { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import ActiveUsers from "../components/activeUsers";
import CreateRecipe from "../components/createRecipe";
import { Heart, MessageCircleMore } from "lucide-react";


const formatTimeAgo = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);
  const intervals = [
    { unit: "year", seconds: 31536000 },
    { unit: "month", seconds: 2592000 },
    { unit: "day", seconds: 86400 },
    { unit: "hour", seconds: 3600 },
    { unit: "minute", seconds: 60 },
    { unit: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    if (seconds >= interval.seconds) {
      const value = Math.floor(seconds / interval.seconds);
      return `${value} ${interval.unit}${value > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
};

const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [isCreatingRecipe, setIsCreatingRecipe] = useState(false); // State for creating recipe

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!token) {
        setError("User is not authenticated");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          "http://localhost:3001/user/community/all-recipes",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Assuming the response includes user details
        setPosts(response.data);

        // Fetch active users
        const userResponse = await axios.get(
          "http://localhost:3001/user/community/active-users",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setActiveUsers(userResponse.data);

      } catch (error) {
        console.error("Error fetching posts:", error.response?.data || error);
        setError("Error fetching posts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [token]);

  const handleRecipeCreated = (newRecipe) => {
    setPosts([newRecipe, ...posts]);
    setIsCreatingRecipe(false); // Hide form after recipe creation
  };

  const toggleExpandPost = (postId) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
  };

  const handleLike = async (postId) => {
    // Find the post by its id
    const updatedPosts = posts.map((post) => {
      if (post._id === postId) {
        // Toggle the liked state
        return {
          ...post,
          liked: !post.liked, // Toggle the liked state
          likes: post.liked ? post.likes - 1 : post.likes + 1, // Increment or decrement the likes count
        };
      }
      return post;
    });
    setPosts(updatedPosts);

    //  an API here to persist the like status
    try {
      await axios.patch(
        `http://localhost:3001/user/community/recipes/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  return (
    <div className="relative max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      <Head>
        <title>Community Page</title>
      </Head>

      {/* Greeting with Gradient */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500">
          Hello, Hungry! What are we cooking today?
        </h1>
      </div>

      {/* Blurred background when form is open */}
      <div className={`${isCreatingRecipe ? "blur-sm" : ""}`}>
        {/* Create Recipe Button */}
        <div className="flex justify-center mb-8">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition"
            onClick={() => setIsCreatingRecipe(true)}
          >
            New Recipe Here!
          </button>
        </div>

        {/* Create Recipe Form (Pinned at the top and same size as the posts) */}
        <div className="flex flex-row md:flex-row">
        <div className="flex flex-col items-center gap-1">
          {/* Community Posts */}
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post._id}
                className="bg-white border border-gray-400 rounded-lg shadow-lg p-6 transition-all duration-300 flex flex-col"
                style={{ width: "38rem", height: "auto" }} // Fixed width and dynamic height
              >
                <div className="flex items-center mb-2">
                  <img
                    src={
                      post.userId?.profilePicture ||
                      "https://png.pngitem.com/pimgs/s/524-5246388_anonymous-user-hd-png-download.png"
                    }
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <div>
                    <p className="text-gray-800 font-semibold text-xs">
                      {post.userId?.username || "Anonymous"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {post.dateCreated
                        ? formatTimeAgo(new Date(post.dateCreated))
                        : "Date not available"}
                    </p>
                  </div>
                </div>

                <h2 className="text-md font-bold text-gray-800 mb-1">
                  {post.title || "Untitled"}
                </h2>

                {post.recipeImage && (
                  <img
                    src={post.recipeImage}
                    alt={post.title}
                    className="mb-2 rounded-lg object-cover h-28 w-full"
                  />
                )}

                <div className="transition-all duration-300 ease-in-out overflow-hidden">
                  <p className="text-gray-600 mb-2 text-sm font-size-50">
                    {expandedPostId === post._id
                      ? post.instructions || "Instructions not available"
                      : post.instructions && post.instructions.length > 100
                      ? `${post.instructions.substring(0, 100)}...`
                      : post.instructions || "Instructions not available"}
                  </p>
                </div>

                {post.instructions && post.instructions.length > 100 && (
                  <button
                    className="text-blue-600 hover:underline text-xs"
                    onClick={() => toggleExpandPost(post._id)}
                  >
                    {expandedPostId === post._id ? "Read Less" : "Read More"}
                  </button>
                )}

                {/* Like and Comment Buttons */}
                <div className="flex items-center mt-2 space-x-4 text-gray-600 ">
                  <button
                    className="flex items-center space-x-1"
                    onClick={() => handleLike(post._id)}
                  >
                    <Heart
                      className={`${
                        post.liked
                          ? "text-red-500 fill-current"
                          : "text-gray-400"
                      }`}
                    />
                    {post.likes ? post.likes.length : 0}
                  </button>
                  <button className="flex items-center space-x-1">
                    <MessageCircleMore />
                    <span>{post.comments ? post.comments.length : 0}</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </div>
        {/* Pass active users to ActiveUsers component */}
          <div className="flex-grow">{/* Existing post rendering */}</div>
          <ActiveUsers users={activeUsers} />
        </div>
      </div>

      {/* Modal for Recipe Form */}
      {isCreatingRecipe && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-100 h-200">
            <h2 className="text-lg font-bold mb-4">Create New Recipe</h2>
            <CreateRecipe token={token} onRecipeCreated={handleRecipeCreated} />
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              onClick={() => setIsCreatingRecipe(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityPage;
