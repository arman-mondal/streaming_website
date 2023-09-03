import React from 'react';
import ChannelNameResolver from '../Resolver/channelNameResolver'; // Import your ChannelNameResolver component

const VideoComp=() => ({ userChannels, handleChannelClick }) => {
  return (
    <div>
      <div className="channel-buttons">
        {userChannels.map((channel) => (
          <button key={channel._id} onClick={() => handleChannelClick(channel)}>
            <ChannelNameResolver channelId={channel._id} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default VideoComp;
