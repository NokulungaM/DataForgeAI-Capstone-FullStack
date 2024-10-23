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
    startCarousel(); // Start carousel on mount
    return () => {
      stopCarousel(); // Stop carousel on unmount
    };
  }, [currentIndex]);

  const startCarousel = () => {
    stopCarousel(); // Clear any previous interval
    carouselInterval.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % recipes.length);
    }, 5000); // Change recipe every 5 seconds
  };

  const stopCarousel = () => {
    clearInterval(carouselInterval.current);
  };

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
    stopCarousel(); // Stop carousel when modal is opened
    stopCurrentAudio(); // Stop any current audio playing
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
    startCarousel(); // Resume carousel when modal is closed
    stopCurrentAudio(); // Stop any audio playback
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
      const ttsUrls = recipe.ttsUrl.split(', '); // Assuming multiple TTS URLs
      setAudioQueue(ttsUrls); // Store the audio URLs
      setAudioIndex(0); // Start from the first URL
      playNextAudio(0, ttsUrls); // Play the first audio
    } else if (recipe.instructions) {
      const instructionsChunks = splitInstructions(recipe.instructions, 300); // Split instructions into chunks
      const audioUrls = instructionsChunks.map(chunk => generateTtsUrl(chunk)); // Generate TTS URLs for each chunk
      setAudioQueue(audioUrls); // Store the audio URLs
      setAudioIndex(0); // Start from the first URL
      playNextAudio(0, audioUrls); // Play the first audio
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
            playNextAudio(index + 1, ttsUrls); // Play the next audio URL in the queue
          };

          audio.onerror = (error) => {
            console.error('Error playing audio:', error);
            playNextAudio(index + 1, ttsUrls); // Skip to the next audio URL if there's an error
          };

          setCurrentAudio(audio); // Track the current audio element
          audio.play().catch(error => console.error('Error playing audio:', error));
          setIsPlaying(true); // Update playing state
        })
        .catch((error) => {
          console.error('Error fetching TTS audio:', error);
          playNextAudio(index + 1, ttsUrls); // Skip to the next audio URL if there's a fetch error
        });
    } else {
      setIsPlaying(false); // No more audio to play, reset playing state
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
    // This is a placeholder for your TTS URL generation logic
    return `http://your-tts-service.com/generate?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="bg-cyan text-black rounded-lg shadow-md overflow-hidden cursor-pointer">
        <img
          src={recipes[currentIndex]?.image || 'default-image-url.jpg'}
          alt={recipes[currentIndex]?.title}
          className="w-full h-full object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-bold">{recipes[currentIndex]?.title}</h3>
          <button
            className="ml-4 text-blue-500 font-semibold hover:underline"
            onClick={() => openModal(recipes[currentIndex])}
          >
            Read More
          </button>
        </div>
      </div>

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
            {/* Updated Image Styling */}
            <div className="overflow-hidden rounded-lg">
              <img
                src={selectedRecipe.image || 'default-image-url.jpg'}
                alt={selectedRecipe.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>

            {/* Title Styling */}
            <h3 className="text-3xl font-semibold mt-4 text-center text-gray-800">{selectedRecipe.title}</h3>

            {/* Instructions Styling */}
            <p className="mt-4 text-gray-700 leading-relaxed text-lg">
              {selectedRecipe.instructions || 'No instructions available.'}
            </p>

            {/* Audio Controls */}
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
