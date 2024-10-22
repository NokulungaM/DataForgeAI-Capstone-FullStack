import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import axios from 'axios';

const RecipeList = ({ recipes }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioQueue, setAudioQueue] = useState([]);
  const [audioIndex, setAudioIndex] = useState(0);

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
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

          // Set up event listeners to handle when the current audio ends
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

  if (!recipes || recipes.length === 0) {
    return <p>No recipes available. Try searching for specific ingredients.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.map((recipe, index) => (
          <div
            key={recipe.id || index}
            className="bg-cyan text-black rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
          >
            <img
              src={recipe.image || 'default-image-url.jpg'}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">{recipe.title}</h3>
              <button
                className="ml-4 text-blue-500 font-semibold hover:underline"
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
        className="fixed inset-0 z-50 flex items-center justify-center bg-cyan bg-opacity-50"
      >
        <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative z-10 shadow-lg">
          <button onClick={closeModal} className="absolute top-2 right-2 text-black hover:text-gray-500">
            Close
          </button>
          {selectedRecipe && (
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
          )}
        </div>
      </Dialog>
    </>
  );
};

export default RecipeList;
