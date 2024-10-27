import React, { useState, useEffect, useRef } from 'react';
import { Dialog } from '@headlessui/react';
import axios from 'axios';

const FeaturedRecipes = ({ recipes }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [audioQueue, setAudioQueue] = useState([]);
  const [audioIndex, setAudioIndex] = useState(0);
  const carouselInterval = useRef(null);

  useEffect(() => {
    startCarousel();
    return () => {
      stopCarousel();
    };
  }, [currentIndex]);

  const startCarousel = () => {
    stopCarousel();
    carouselInterval.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % recipes.length);
    }, 5000);
  };

  const stopCarousel = () => {
    clearInterval(carouselInterval.current);
  };

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
    stopCarousel();
    stopCurrentAudio();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
    startCarousel();
    stopCurrentAudio();
  };

  const stopCurrentAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
      setIsPlaying(false);
    }
  };

  const playAudioInstructions = (recipe) => {
    if (recipe.ttsUrl) {
      const ttsUrls = recipe.ttsUrl.split(', ');
      setAudioQueue(ttsUrls);
      setAudioIndex(0);
      playNextAudio(0, ttsUrls);
    } else if (recipe.instructions) {
      const instructionsChunks = splitInstructions(recipe.instructions, 300);
      const audioUrls = instructionsChunks.map(chunk => generateTtsUrl(chunk));
      setAudioQueue(audioUrls);
      setAudioIndex(0);
      playNextAudio(0, audioUrls);
    }
  };

  const playNextAudio = (index, ttsUrls) => {
    if (index < ttsUrls.length) {
      const url = ttsUrls[index];
      const proxyUrl = `http://localhost:3001/proxy-tts?url=${encodeURIComponent(url)}`;

      axios.get(proxyUrl, { responseType: 'arraybuffer' })
        .then((response) => {
          const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
          const audio = new Audio(URL.createObjectURL(audioBlob));

          audio.onended = () => {
            playNextAudio(index + 1, ttsUrls);
          };

          audio.onerror = (error) => {
            console.error('Error playing audio:', error);
            playNextAudio(index + 1, ttsUrls);
          };

          setCurrentAudio(audio);
          audio.play().catch(error => console.error('Error playing audio:', error));
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error('Error fetching TTS audio:', error);
          playNextAudio(index + 1, ttsUrls);
        });
    } else {
      setIsPlaying(false);
    }
  };

  const splitInstructions = (instructions, maxLength) => {
    const chunks = [];
    for (let i = 0; i < instructions.length; i += maxLength) {
      chunks.push(instructions.substring(i, i + maxLength));
    }
    return chunks;
  };

  const generateTtsUrl = (text) => {
    return `http://your-tts-service.com/generate?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-8">
      {/* Hero Section */}
      <div className="mb-12 grid grid-cols-2 gap-6">
        <h1 className="text-6xl font-bold tracking-wider mb-6 text-left"> {/* Heading aligned to left */}
          Live it up,<br />
          DishDash style
        </h1>
        <p className="text-s text-gray-700 max-w-3xl">
          Discover a world of recipes, crafted for you to enjoy and explore the flavors of different cuisines. Whether you're looking for quick meals or gourmet dishes, DishDash has you covered.
        </p>
      </div>

      <div className="mb-12"></div>

      {/* Flex Container for Chef, Text, and Recipe Card */}
      <div className="grid grid-cols-3 gap-6">
        {/* Restaurant Compartment */}
        <a href="https://kauai.co.za/" target="_blank" rel="noopener noreferrer"> {/* Link added here */}
          <div className="bg-green-400 shadow-md rounded-lg overflow-hidden flex flex-col"> {/* Compartment set to green-400 */}
            <img
              src="/kauai.jpg"
              alt="Chef"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">Suggested restaurant</h3>
              <p className="text-gray-700">From Recipes to Food, we have all your favourite restaurants.</p>
              <a href="https://kauai.co.za/" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block bg-green-500 text-white font-semibold hover:bg-green-600 transition duration-200 px-4 py-2 text-center">
                See More
              </a>
            </div>
          </div>
        </a>

        {/* Text Compartment */}
        <div className="bg-green-400 shadow-md rounded-lg overflow-hidden flex flex-col"> {/* Compartment set to green-400 */}
          <img
            src="/wine.jpg"
            alt="wine"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-bold">Suggested Event</h3>
            <p className="text-gray-700">The ideal venue for any event or occasion. We make it special.</p>
            <a href="https://www.viator.com/Tuscany-tourism/d206-r1114451730-s41495075?m=33953&supag=1114451730&supsc=kwd-19143561025&supai=76691132434648&supdv=c&supnt=nt:o&suplp=137821&supli=&supti=kwd-19143561025&tsem=true&supci=kwd-19143561025&supkw=wine%20tasting&msclkid=f9bd25f20b49107e7ab442ec2bafe5c5 " target="_blank" rel="noonpener noreferrer" className="mt-4 inline-block bg-green-500 text-white font-semibold hover:bg-green-600 transition duration-200 px-4 py-2 text-center">
            See More
            </a>
          </div>
        </div>
      
        {/* Recipe Card Compartment */}
        <div className="bg-green-400 shadow-md rounded-lg overflow-hidden flex flex-col"> {/* Card set to green-400 */}
          <img
            src={recipes[currentIndex]?.image || 'default-image-url.jpg'}
            alt={recipes[currentIndex]?.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-bold">{recipes[currentIndex]?.title}</h3>
            <button
              className="mt-4 inline-block bg-green-500 text-white font-semibold hover:bg-green-600 transition duration-200 px-4 py-2 text-center"
              onClick={() => openModal(recipes[currentIndex])}
            >
              See More
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Dialog
        open={isModalOpen}
        onClose={closeModal}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 relative z-10 shadow-2xl">
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-gray-700 hover:text-gray-500 font-bold text-xl"
          >
            &times;
          </button>
          {selectedRecipe && (
            <>
              <div className="overflow-hidden rounded-lg">
                <img
                  src={selectedRecipe.image || 'default-image-url.jpg'}
                  alt={selectedRecipe.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>

              <h3 className="text-3xl font-semibold mt-4 text-center text-gray-800">{selectedRecipe.title}</h3>

              <p className="mt-4 text-gray-700 leading-relaxed text-lg">
                {selectedRecipe.instructions || 'No instructions available.'}
              </p>

              {selectedRecipe.ttsUrl && (
                <div className="mt-6 flex justify-center">
                  <button
                    className="text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-500 transition"
                    onClick={() => playAudioInstructions(selectedRecipe)}
                  >
                    Play Audio
                  </button>

                  {currentAudio && (
                    <button
                      className="ml-4 text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-500 transition"
                      onClick={() => {
                        if (isPlaying) {
                          stopCurrentAudio();
                        } else {
                          currentAudio.play();
                          setIsPlaying(true);
                        }
                      }}
                    >
                      {isPlaying ? 'Pause' : 'Resume'}
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default FeaturedRecipes;
