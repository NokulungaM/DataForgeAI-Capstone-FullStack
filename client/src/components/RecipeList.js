import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import axios from 'axios';

const RecipeList = ({ recipes }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null); // Track current audio
  const [isPlaying, setIsPlaying] = useState(false); // Track playing state
  const [audioQueue, setAudioQueue] = useState([]); // Queue for multiple audio URLs
  const [audioIndex, setAudioIndex] = useState(0); // Current index in the audio queue

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
    if (currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
      setIsPlaying(false);
    }
  };

  const playAudioInstructions = (recipe) => {
    if (recipe.ttsUrl) {
      const ttsUrls = recipe.ttsUrl.split(', ');
      setAudioQueue(ttsUrls); // Store the audio URLs
      setAudioIndex(0); // Start from the first URL
      playNextAudio(0, ttsUrls); // Play the first audio
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
          setCurrentAudio(audio); // Track the current audio

          audio.play();
          setIsPlaying(true);
          setAudioIndex(index); // Track the current audio index

          audio.addEventListener('ended', () => {
            setIsPlaying(false);
            playNextAudio(index + 1, ttsUrls); // Play next audio when this one ends
          });
        })
        .catch((error) => {
          console.error('Error playing audio:', error);
          playNextAudio(index + 1, ttsUrls); // Skip to next if there's an error
        });
    }
  };

  const toggleAudioPlayback = () => {
    if (currentAudio) {
      if (isPlaying) {
        currentAudio.pause();
        setIsPlaying(false);
      } else {
        currentAudio.play();
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    // Clean up audio when the component unmounts
    return () => {
      if (currentAudio) {
        currentAudio.pause();
        setCurrentAudio(null);
      }
    };
  }, [currentAudio]);

  if (!recipes || recipes.length === 0) {
    return <p>No recipes available. Try searching for specific ingredients.</p>;
  }


  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.map((recipe, index) => (
          <div
            key={recipe.id || index}
            className="bg-white text-black rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
          >
            <img
              src={recipe.image || 'default-image-url.jpg'}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">{recipe.title}</h3>
              <button
                className="mt-2 text-white font-semibold hover:underline"
                onClick={() => openModal(recipe)}
              >
                Read More
              </button>
              {recipe.ttsUrl && (
                <>
                  <button
                    className="ml-2 text-blue-500 font-semibold hover:underline"
                    onClick={() => playAudioInstructions(recipe)}
                  >
                    Play Audio
                  </button>
                  {currentAudio && (
                    <button
                      className="ml-4 text-blue-500 font-semibold hover:underline"
                      onClick={toggleAudioPlayback}
                    >
                      {isPlaying ? 'Pause' : 'Resume'}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Dialog
        open={isModalOpen}
        onClose={closeModal}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative z-10 shadow-lg">
          <button onClick={closeModal} className="absolute top-2 right-2 text-black hover:text-gray-500">
            Close
          </button>
          {loading ? (
            <p>Loading...</p>
          ) : (
            selectedRecipe && (
              <>
                <img
                  src={selectedRecipe.image || 'default-image-url.jpg'}
                  alt={selectedRecipe.title}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <h3 className="text-2xl font-bold mt-4">{selectedRecipe.title}</h3>
                <p className="mt-2 text-gray-700 whitespace-pre-wrap">
                  {selectedRecipe.instructions || 'No instructions available.'}
                </p>
              </>
            )
          )}
        </div>
      </Dialog>
    </>
  );
};

export default RecipeList;
