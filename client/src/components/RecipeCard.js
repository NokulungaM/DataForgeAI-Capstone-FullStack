import { useState } from "react";
import Image from "next/image";

// Define the Card, Button, and Badge components within the same file
const Card = ({ children }) => (
  <div
    style={{
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
      padding: "16px",
      margin: "0 auto", // Center card contents
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add a subtle shadow
      transition: "transform 0.2s", // Add a hover effect
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "scale(1.02)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "scale(1)";
    }}
  >
    {children}
  </div>
);

const Button = ({ children, onClick }) => (
  <button
    onClick={onClick}
    style={{
      padding: "10px 20px",
      backgroundColor: "#0070f3",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      marginTop: "12px", // Add space above the button
      transition: "background-color 0.2s",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = "#005bb5"; // Darker shade on hover
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = "#0070f3"; // Original color
    }}
  >
    {children}
  </button>
);

const Badge = ({ children }) => (
  <span
    style={{
      backgroundColor: "#e0e0e0",
      borderRadius: "12px",
      padding: "4px 8px",
      fontSize: "12px",
      marginRight: "8px",
      marginTop: "4px", // Add space above the badge
    }}
  >
    {children}
  </span>
);

const RecipeCard = ({ title, description, youtubeUrl, thumbnail, duration, difficulty }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Card>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h2 style={{ margin: "0 0 8px 0" }}>{title}</h2>
          <p style={{ margin: "0 0 12px 0" }}>{description}</p>
          <div>
            <Badge>{duration}</Badge>
            <Badge>{difficulty}</Badge>
          </div>
        </div>
        <Image src={thumbnail} alt={title} width={150} height={100} style={{ borderRadius: "8px" }} />
      </div>
      <Button onClick={() => window.open(youtubeUrl, "_blank")}>Watch on YouTube</Button>
    </Card>
  );
};

const RecipeList = () => {
  const recipes = [
    {
      title: "Spaghetti Carbonara",
      description: "A classic Italian pasta.",
      youtubeUrl: "https://www.youtube.com/watch?v=3AAdKl1UYZs",
      thumbnail: "https://i.ytimg.com/vi/3AAdKl1UYZs/maxresdefault.jpg",
      duration: "15 min",
      difficulty: "Medium",
    },
    {
      title: "Spicy tomato penne pasta",
      description: "Spicy penne Arrabiata.",
      youtubeUrl: "https://www.youtube.com/watch?v=1IszT_guI08",
      thumbnail: "https://i.ytimg.com/vi/1IszT_guI08/maxresdefault.jpg",
      duration: "45 min",
      difficulty: "Hard",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "24px", // Increased gap for more space between cards
        padding: "20px", // Space around the grid
        margin: "0 auto", // Center the grid
        maxWidth: "1200px", // Limit the max width of the grid
      }}
    >
      {recipes.map((recipe, index) => (
        <RecipeCard key={index} {...recipe} />
      ))}
    </div>
  );
};

export default RecipeList;