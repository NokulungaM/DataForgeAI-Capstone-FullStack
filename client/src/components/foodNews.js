import React, { useState, useEffect } from "react";

const foodNewsData = [
  {
    title: "10 Superfoods for a Balanced Diet",
    description:
      "Discover the top 10 superfoods you should include in your diet for better health and vitality.",
    url: "#",
    image:
      "https://dropinblog.net/34248844/files/featured/Top_10_Superfoods_for_a_Healthy_Diet.png", // URL to image
  },
  {
    title: "The Rise of Plant-Based Diets",
    description:
      "Plant-based diets are on the rise globally. Here's why you should consider switching to a plant-based lifestyle.",
    url: "#",
    image:
      "https://stablemassage.com.au/wp-content/uploads/2019/10/plant-based-diet-1024x683.jpg", // URL to image
  },
  {
    title: "How to Start Intermittent Fasting Safely",
    description:
      "Learn the do's and don'ts of intermittent fasting, and how to get started safely for weight loss.",
    url: "#",
    image:
      "https://intermountainhealthcare.org/_next/image?url=%2Fsc10media%2Fimages%2Fintermountain-health%2Fblogs%2Fblog%2Fposts%2F2020%2F01%2Fwhat-is-intermittent-fasting.ashx%3Fh%3D4473%26iar%3D0%26w%3D7952%26hash%3DF8A4CFF2EFCD1EFD70F6FB517B770D17&w=1920&q=75", // URL to image
  },
  {
    title: "The Keto Diet: Benefits and Risks",
    description:
      "Is the keto diet right for you? We explore the benefits and potential risks of this low-carb, high-fat diet.",
    url: "#",
    image:
      "https://www.scripps.org/sparkle-assets/images/keto_diet_foods_1200x750-f6c51e27ead69de7f55e50ed61c8e02f.jpg",
  },
  {
    title: "Top 5 Smoothie Recipes for Energy",
    description:
      "Need a boost? These top 5 smoothie recipes will give you the energy you need to power through your day.",
    url: "#",
    image: "https://miro.medium.com/v2/resize:fit:1024/0*0MrzFWGMSp_yMsso.png",
  },
  {
    title: "Mediterranean Diet: A Path to Longevity",
    description:
      "Studies show that the Mediterranean diet can improve heart health and increase lifespan. Learn more here.",
    url: "#",
    image:
      "https://irp.cdn-website.com/6317033a/dms3rep/multi/how-to-adapt-the-mediterranean-diet-for-an-asian-table-1200x640.jpg",
  },
  {
    title: "Vegan Protein Sources You Need to Know",
    description:
      "Switching to a vegan diet? Here are the top protein sources you should include to stay healthy and strong.",
    url: "#",
    image: "https://blog.nasm.org/hubfs/vegan-protein.jpg",
  },
  {
    title: "The Role of Hydration in Weight Loss",
    description:
      "Proper hydration is key to weight loss. Here's how drinking enough water can help you shed pounds.",
    url: "#",
    image:
      "https://sdfatloss.com/wp-content/uploads/2023/04/fit-woman-drinking-infused-water.jpg",
  },
];

const FoodNewsSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === foodNewsData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval); // Clear interval when component unmounts
  }, []);

  return (
    <div className="w-full md:w-1/2 bg-white border border-gray-400 rounded-lg shadow-lg p-4 ml-4">
      <h2 className="text-lg font-bold text-gray-400 mb-4">Food News For You</h2>

      <div className="bg-gray-50 p-4 rounded-lg transition-all">
        {/* Display Image */}
        {foodNewsData[currentIndex].image && (
          <img
            src={foodNewsData[currentIndex].image}
            alt={foodNewsData[currentIndex].title}
            className="w-full h-40 object-cover rounded-lg mb-2"
          />
        )}

        {/* Display News Title and Description */}
        <h3 className="text-gray-800 font-semibold text-md mb-2">
          {foodNewsData[currentIndex].title}
        </h3>
        <p className="text-gray-600 text-sm mb-2">
          {foodNewsData[currentIndex].description}
        </p>
        {foodNewsData[currentIndex].url && (
          <a
            href={foodNewsData[currentIndex].url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm"
          >
            Read More
          </a>
        )}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {foodNewsData.map((_, index) => (
          <span
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default FoodNewsSlideshow;
