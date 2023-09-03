// client/src/components/ChannelInfo.js

import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import shaka from 'shaka-player';

const ChannelInfo = ({ channelId }) => {
  const [channelData, setChannelData] = useState(null);

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        // Fetch channel information by ID
        const response = await Axios.get(`https://api.dcvip.one/api/channels/`,{
            headers:{
                "channelId":channelId
            }
        }); // Replace with your API endpoint

        if (response.status === 200) {
          setChannelData(response.data);

        } else {
          console.error('Error fetching channel data');
        }
      } catch (error) {
        console.error('Error fetching channel data:', error);
      }
    };

    fetchChannelData();
  }, [channelId]);
  useEffect(() => {
    if (channelData) {
      // Initialize Shaka Player
      shaka.polyfill.installAll();
      const videoElement = document.getElementById('video-element');
      console.log(channelData.clearKey)
      const keyValueString = channelData.clearKey;
const keyValueArray = keyValueString.split("': '");

// keyValueArray will now contain two elements, the key and the value
const key = keyValueArray[0].replace("'", ""); // Remove the single quotes
const value = keyValueArray[1].replace("'", ""); // Remove the single quotes

console.log("Key:", key);
console.log("Value:", value);

      let clearKeys = {};
      
      clearKeys[key] = value;
      const player = new shaka.Player(videoElement);
      player.configure({
        drm: {
            clearKeys: clearKeys,
        }
      });

      player.load(channelData.mpdLink)
        .then(() => {
          console.log('Video loaded and playing.');
        })
        .catch((error) => {
          console.error('Error loading video:', error);
        });
    }
  }, [channelData]);


  return (
    <div>
      {channelData ? (
        <div>
          <h2>Channel Information</h2>
          <p>Channel Name: {channelData.name}</p>
          <p>MPD Key: {channelData.mpdLink}</p>
          <p>Clear Key: {channelData.clearKey}</p>
          <div>
            <video
              id="video-element"
              controls
              autoPlay
              style={{ width: '100%', maxWidth: '800px' }}
            ></video>
          </div>
        </div>
      ) : (
        <p>Loading channel information...</p>
      )}
    </div>
  );
};

export default ChannelInfo;
