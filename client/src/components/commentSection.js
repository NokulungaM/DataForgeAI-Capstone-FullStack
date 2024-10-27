// CommentSection.js
import React, { useState, useEffect } from "react";
import axios from "axios";


const formatTimeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
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


const CommentSection = ({ postId, token }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [postId, token]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3001/user/community/recipes/${postId}/comments`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Ensure we're setting the comments array directly from the response
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostComment = async () => {
    if (!newComment.trim()) return;

    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:3001/user/community/recipe/${postId}/comment`,
        { text: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Add the new comment to the existing comments
      setComments((prevComments) => [response.data, ...prevComments]);
      setNewComment(""); // Clear input field after posting
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="mt-4 w-full">
      {/* Comment Input Section */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Add a comment..."
          className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handlePostComment();
            }
          }}
        />
        <button
          onClick={handlePostComment}
          disabled={loading || !newComment.trim()}
          className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Post
        </button>
      </div>

      {/* Comments List */}
      <div className="space-y-4 mt-4">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="flex gap-3 border-b border-gray-100 pb-3"
          >
            <img
              src={
                comment.userId?.profilePicture ||
                "https://png.pngitem.com/pimgs/s/524-5246388_anonymous-user-hd-png-download.png"
              }
              alt={`${comment.userId?.username || "Anonymous"}'s profile`}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-sm">
                  {comment.userId?.username || "Anonymous"}
                </span>
                <span className="text-xs text-gray-500">
                  {comment.dateCreated
                    ? formatTimeAgo(new Date(comment.dateCreated))
                    : "Date not available"}
                </span>
              </div>
              <p className="text-sm text-gray-700 mt-1">{comment.text}</p>
            </div>
          </div>
        ))}

        {comments.length === 0 && !loading && (
          <p className="text-center text-gray-500 text-sm">No comments yet</p>
        )}

        {loading && (
          <p className="text-center text-gray-500 text-sm">
            Loading comments...
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;