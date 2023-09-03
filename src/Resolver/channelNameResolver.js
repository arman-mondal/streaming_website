import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const ChannelNameResolver = ({ channelIds }) => {
  const [channelNames, setChannelNames] = useState({});

  useEffect(() => {
    // Fetch the channel names for each channel ID
    const fetchChannelNames = async () => {
      try {
        const channelNamePromises = channelIds.map(async (channelId) => {
          // Make a GET request to resolve the channel name using the channel ID
          const response = await Axios.get(`https://api.dcvip.one/api/channels/resolve/`,{
            headers: {
                "channelId":channelId
            }
          });

          if (response.status === 200) {
            return { channelId, channelName: response.data.channelName };
          } else {
            console.error(`Error resolving channel name for ID: ${channelId}`);
            return null;
          }
        });

        // Wait for all promises to resolve
        const resolvedChannelNames = await Promise.all(channelNamePromises);

        // Create an object with channel IDs as keys and channel names as values
        const channelNameMap = {};
        resolvedChannelNames.forEach((result) => {
          if (result) {
            channelNameMap[result.channelId] = result.channelName;
          }
        });

        setChannelNames(channelNameMap);
      } catch (error) {
        console.error('Error resolving channel names:', error);
      }
    };

    fetchChannelNames();
  }, [channelIds]);

  return (
    <div>
      {Object.keys(channelNames).map((channelId) => (
        <p key={channelId}>
        {channelNames[channelId]},
        </p>
      ))}
    </div>
  );
};

export default ChannelNameResolver;
