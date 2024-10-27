import React, { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import ActiveUsers from "../components/activeUsers";
import CreateRecipe from "../components/createRecipe";
import { Heart, MessageCircleMore } from "lucide-react";
import TrendingRecipes from "../components/trendingRecipes";
import FoodNewsSlideshow from "../components/foodNews";
import UserProfile from "../components/userProfile";
import SearchBar from "../components/searchBar";
import CommentSection from "../components/commentSection"

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
  const [profile, setProfile] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);
  const [trendingRecipes, setTrendingRecipes] = useState([]);
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
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/profile/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (token) fetchProfile();
  }, [token]);

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
        // setPosts(response.data);

        const transformedPosts = response.data.map((post) => ({
          ...post,
          isLiked: post.likes.includes(profile?._id),
        }));

        const sortedPosts = transformedPosts.sort(
          (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
        );

        setPosts(sortedPosts);
        setFilteredPosts(sortedPosts);

        // Fetch trending recipes (with most likes)
        const fetchTrendingRecipes = async () => {
          try {
            const response = await axios.get(
              "http://localhost:3001/user/community/trending-recipes",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setTrendingRecipes(response.data);
          } catch (error) {
            console.error("Error fetching trending recipes:", error);
          }
        };

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

    if (token && profile) {
      fetchPosts();
    }

    fetchPosts();
  }, [token, profile]);

  const handleSearch = (query) => {
    setQuery(query);
    const searchTerms = query
      .split(",")
      .map((term) => term.trim().toLowerCase())
      .filter((term) => term); // Remove empty terms

    if (searchTerms.length > 0) {
      const results = posts
        .map((post) => {
          const matchCount = post.ingredients.reduce((count, ingredient) => {
            if (searchTerms.includes(ingredient.toLowerCase())) {
              return count + 1;
            }
            return count;
          }, 0);
          return { ...post, matchCount };
        })
        .filter((post) => post.matchCount > 0) 
        .sort((a, b) => b.matchCount - a.matchCount); // Sort by match count, descending

      setFilteredPosts(results);
    } else {
      setFilteredPosts(posts); // Show all posts if no query
    }
  };

  const toggleCommentSection = (postId) => {
    setActiveCommentPostId(activeCommentPostId === postId ? null : postId);
  };

  const handleRecipeCreated = (newRecipe) => {
    setPosts([newRecipe, ...posts]);
    setIsCreatingRecipe(false); // Hide form after recipe creation
  };

  const toggleExpandPost = (postId) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
  };

  const handleLike = async (postId) => {
    if (!profile) return;

    try {
      const response = await axios.patch(
        `http://localhost:3001/user/community/recipes/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the posts state with the new like status
      const updatedPosts = posts.map((post) => {
        if (post._id === postId) {
          const isLiked = post.likes.includes(profile._id);
          return {
            ...post,
            isLiked: !isLiked,
            likes: isLiked
              ? post.likes.filter((id) => id !== profile._id)
              : [...post.likes, profile._id],
          };
        }
        return post;
      });

      setPosts(updatedPosts);
      setFilteredPosts(
        updatedPosts.filter((post) =>
          filteredPosts.some((fp) => fp._id === post._id)
        )
      );
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };
  return (
    <div
      className="relative max-w-8xl mx-auto px-2 sm:px-6 lg:px-8"
      style={{ padding: "10px" }}
    >
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
        <div className="flex justify-center gap-2 items-center mb-8">
          <SearchBar onSearch={handleSearch} />
          <button
            className="bg-green-700 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-green-600 transition"
            onClick={() => setIsCreatingRecipe(true)}
          >
            Create Recipe
          </button>
        </div>

        {/* Main Layout: Flex Container */}
        <div className="flex justify-between gap-x-0.5 md:gap-x-2 lg:gap-x-4">
          <div className="w-full md:w-1/4 pr-5">
            <UserProfile user={profile} />
            <TrendingRecipes recipes={trendingRecipes} />
          </div>

          {/* Center: Community Posts */}
          {/* <div className="w-full md:w-1/2 justify-between px-2 "> */}
          <div className=" w-full md:w-1 justify-between pl-10 pr-6 flex flex-col items-center gap-3">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white border border-gray-400 rounded-lg shadow-lg p-6 transition-all duration-300 flex flex-col"
                  style={{ width: "38rem", height: "auto" }}
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
                      className="mb-2 rounded-lg object-cover h-80 w-100"
                      style={{ objectFit: "cover" }}
                      onError={(e) => {
                        e.target.onerror = null; // Prevent infinite loop if image fails to load
                        e.target.src =
                          "https://www.maggi.co.uk/sites/default/files/styles/home_stage_944_531/public/srh_recipes/ecf00e5c370f20e168f182e68c597e58.jpg?h=67eabc4d&itok=hj14wZaS"; // Set placeholder image
                      }}
                    />
                  )}

                  <div className="transition-all duration-300 ease-in-out overflow-hidden">
                    <p className="text-gray-600 mb-2 text-sm">
                      {expandedPostId === post._id
                        ? post.instructions || "Instructions not available"
                        : post.instructions && post.instructions.length > 100
                        ? `${post.instructions.substring(0, 100)}...`
                        : post.instructions || "Instructions not available"}
                    </p>
                  </div>

                  {post.instructions && post.instructions.length > 100 && (
                    <button
                      className="text-grey-700 hover:underline text-xs"
                      onClick={() => toggleExpandPost(post._id)}
                    >
                      {expandedPostId === post._id ? "Read Less" : "Read More"}
                    </button>
                  )}
                  <h5 className="text-l font-bold mb-2">Ingredients:</h5>
                  <ul className="flex flex-wrap gap-2">
                    {post.ingredients.map((ingredient) => (
                      <li
                        key={ingredient}
                        className="text-gray-600 text-sm px-1 py-1 rounded-lg"
                      >
                        {ingredient.trim()}
                      </li>
                    ))}
                  </ul>

                  {/* Like and Comment Buttons */}
                  <div className="flex flex-col place-items-start mt-4">
                    <div className="flex items-center mt-2 space-x-4 text-gray-600 ">
                      <button
                        className="flex items-center space-x-1"
                        onClick={() => handleLike(post._id)}
                      >
                        <Heart
                          className={`${
                            post.isLiked
                              ? "text-red-500 fill-current"
                              : "text-gray-400"
                          }`}
                        />
                        {post.likes ? post.likes.length : 0}
                      </button>
                      <button
                        className="flex items-center space-x-1"
                        onClick={() => toggleCommentSection(post._id)}
                      >
                        <MessageCircleMore />
                        <span>{post.comments ? post.comments.length : 0}</span>
                      </button>
                    </div>
                    <div className="w-full mt-0.5 bg-gray-50 p-4 rounded-lg overflow-hidden">
                      {activeCommentPostId === post._id && (
                        <CommentSection postId={post._id} token={token} />
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No posts available.</p>
            )}
          </div>
          {/* </div> */}
          <div className="w-full md:w-1/4 pl-0.5 pr-5">
            <ActiveUsers users={activeUsers} />
            <FoodNewsSlideshow />
          </div>
        </div>
      </div>

      {/* Modal for Recipe Form */}
      {isCreatingRecipe && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-100 h-200">
            <h2 className="text-lg font-bold mb-4">Feeling Generous?</h2>
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
