import React, { useState } from 'react';

const RecipeAudioPlayer = ({ recipe }) => {
  const [audioError, setAudioError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // Ensure recipe is defined
  if (!recipe) {
    return <p>No recipe selected.</p>; // Optionally, handle no recipe case
  }

  const ttsUrl = recipe.ttsUrl; // Access ttsUrl only if recipe is defined

  const playAudio = () => {
    // Logic to play audio here
    console.log('Playing audio...');
  };

  const handleAudioError = () => {
    setAudioError(true);
    // Optionally, implement retry logic here
    // For example, retry playing audio after an error
    if (retryCount < 3) {
      setTimeout(() => {
        setAudioError(false);
        setRetryCount(retryCount + 1);
      }, 1000); // Retry after 1 second
    }
  };

  const handleRetry = () => {
    setAudioError(false);
    setRetryCount(0); // Reset retry count if retry button clicked
  };

  return (
    <div>
      <h2>{recipe.title}</h2>
      {!audioError && (
        <audio controls onError={handleAudioError}>
          <source src={ttsUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
      {audioError && (
        <div>
          <p>Error playing audio.</p>
          <button onClick={handleRetry}>Retry</button>
        </div>
      )}
      <button onClick={playAudio}>Play Instructions</button>
    </div>
  );
};

export default RecipeAudioPlayer;
