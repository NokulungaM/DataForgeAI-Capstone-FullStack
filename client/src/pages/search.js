import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import axios from 'axios';

const Search = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioQueue, setAudioQueue] = useState([]);
  const [audioIndex, setAudioIndex] = useState(0);

  const fetchRandomRecipes = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('http://localhost:3001/random/recipes/random?limitLicense=true&number=9');
      if (response.status !== 200) throw new Error('Failed to fetch random recipes');
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching random recipes:', error);
      setError('Failed to fetch random recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    const token = localStorage.getItem('token');

    if (!token) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3001/api/recipes?ingredients=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) throw new Error('Failed to fetch recipes');
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setError('Failed to fetch recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomRecipes();
  }, []);

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

  const playAudioInstructions = async (recipe) => {
    if (recipe.ttsUrl) {
      const ttsUrls = recipe.ttsUrl.split(', ');
      setAudioQueue(ttsUrls);
      setAudioIndex(0);
      playNextAudio(0, ttsUrls);
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
          setCurrentAudio(audio);

          audio.play();
          setIsPlaying(true);

          audio.addEventListener('ended', () => {
            setIsPlaying(false);
            playNextAudio(index + 1, ttsUrls);
          });
        })
        .catch((error) => {
          console.error('Error playing audio:', error);
          playNextAudio(index + 1, ttsUrls);
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
    return () => {
      if (currentAudio) {
        currentAudio.pause();
        setCurrentAudio(null);
      }
    };
  }, [currentAudio]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white-800 to-gray-300 text-black p-6 flex">
      {/* Side Section */}
      <div className="w-1/4 bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="text-lg text-green-700 font-bold mb-4">DishDash</h2>
        <p className="text-sm text-gray-700">
          Looking for the perfect recipe? You're in the right place! Discover a world of flavors, whether you're a beginner or a seasoned chef.
          Even Gordon Ramsay would approve! 😄🍽️
        </p>
        <img src="/gordon.png" alt="Cooking" className="mt-4 rounded-lg" />
        <p className="text-sm text-green-700 italic">These recipes are the first to meet my standards!</p>

        {/* Horizontal line */}
        <div className="w-full border-t-2 border-green-600 my-4"></div>

        {/* New Section */}
        <h3 className="text-lg font-bold text-green-700">Cows We Saved</h3>
        <p className="mt-2 text-sm text-gray-700">
          In our quest for sustainable cooking, we proudly save cows from being processed. Each recipe you try contributes to the well-being of these gentle giants, ensuring they live happily on green pastures!
        </p>
        <img src="/cow.jpg" alt="Saved Cows" className="mt-4 rounded-lg" />
        <p className="text-sm text-green-700 italic mt-2">Join us in making a difference, one meal at a time!</p>
      </div>

      {/* Main Content Section */}
      <div className="w-3/4 pl-6">
        {/* Header Section */}
        <div className="flex flex-col items-center">
          <h1 className="text-4xl text-green-700 font-bold mb-2">What's cooking?</h1>
          
          {/* Horizontal line that fills the screen */}
          <div className="w-full border-t-2 border-green-600 mb-6"></div>

          <div className="w-full flex items-center justify-center mb-6">
            <input
              type="text"
              placeholder="Enter ingredients"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full md:w-1/2 p-3 rounded-l bg-gray-800 text-white border-none outline-none"
            />
            <button
              onClick={handleSearch}
              className="p-3 bg-green-500 hover:bg-teal-600 rounded-r text-black font-semibold transition-transform transform hover:scale-105"
            >
              Find
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </div>

        {/* Results Section */}
        <div className="mt-8">
          {loading && <p>Loading recipes...</p>}
          {recipes.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
              {recipes.map((recipe, index) => (
                <div
                  key={recipe.id || index}
                  className="bg-green-500 text-black rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
                  style={{ width: '200px', height: 'auto' }}
                  onClick={() => openModal(recipe)}
                >
                  <img
                    src={recipe.image || 'default-image-url.jpg'}
                    alt={recipe.title}
                    className="w-full h-36 object-cover"
                  />
                  <div className="p-2">
                    <h3 className="text-sm font-bold">{recipe.title}</h3>
                    <p className="mt-1 text-xs text-gray-700">
                      {recipe.instructions ? `${recipe.instructions.slice(0, 80)}...` : 'No instructions available.'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recipe Modal */}
        <Dialog
          open={isModalOpen}
          onClose={closeModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
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
                <p className="mt-2">{selectedRecipe.instructions}</p>

                {/* Audio Instructions */}
                {selectedRecipe.ttsUrl && (
                  <>
                    <button
                      className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                      onClick={() => playAudioInstructions(selectedRecipe)}
                    >
                      Play Instructions
                    </button>
                    {currentAudio && (
                      <button
                        className="mt-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                        onClick={toggleAudioPlayback}
                      >
                        {isPlaying ? 'Pause' : 'Play'}
                      </button>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default Search;
