import React, { useEffect, useState } from 'react';
import shaka from 'shaka-player';
import Modal from 'react-modal';
Modal.setAppElement('#root'); // Set the root element for the modal (usually the root div in your HTML)

const ChannelPlayer = ({ isOpen, onClose,  name }) => {
  const [error, setError] = useState(null);
const mpdKey=sessionStorage.getItem('mpdKey')
const clearKey=sessionStorage.getItem('clearKey')
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const videoElement = document.getElementById('video-element');
    shaka.polyfill.installAll();
    const player = new shaka.Player(videoElement);

    // Configure Shaka Player with the Clear Key
    const parts = clearKey.split(':');
    const keyId = parts[0]; // The part before the colon
    const key = parts[1];
    let clearKeys = {};

    clearKeys[keyId] = key;

    player.configure({
      drm: {
        clearKeys: clearKeys,
      },
    });

    player.load(mpdKey)
      .then(() => {
        console.log('Video loaded and playing.');
        setError(null); // Clear any previous errors
      })
      .catch((error) => {
        console.error('Error loading video:', error);
        setError(error.message); // Set the error message
      });

    return () => {
      // Clean up Shaka Player instance when the component unmounts
      player.destroy();
    };
  }, [isOpen, mpdKey, clearKey]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Player Modal"
    >
      <div>
        <button onClick={onClose}>Close</button>
        <h2 className="text-3xl font-bold">{name}</h2>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <video
            id="video-element"
            controls
            autoPlay
            style={{ width: '100%', maxWidth: '800px' }}
          ></video>
        )}
      </div>
    </Modal>
  );
};

export default ChannelPlayer;
