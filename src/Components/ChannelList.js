import {React,useState} from 'react';
import ChannelPlayer from './ChannelPlayer';
const ChannelList = ({ channels }) => {
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log(channels)

    const handleChannelButtonClick = (channel) => {
      // Set the selected channel when a button is clicked
      setSelectedChannel(channel);
sessionStorage.setItem('mpdKey',channel.mpdKey)

sessionStorage.setItem('clearKey',channel.clearKey)
      setIsModalOpen(true)
    };
    const closeModal = () => {
        setIsModalOpen(false);
      };
  return (
    <div className="flex flex-wrap justify-center">
      {channels.map((channel, index) => (
        <div className="w-1/4 p-4" key={index}>
          <div  className="group cursor-pointer relative">
            <img
              src="https://staticg.sportskeeda.com/editor/2021/07/e4ae5-16274798110941-800.jpg"
              alt={channel.channelName}
              onClick={() => handleChannelButtonClick(channel)}
              className="w-full h-auto rounded-lg transform group-hover:scale-105 transition-transform duration-300"
            />
            <h1 className="text-2xl font-semibold text-center mt-2">
              {channel.channelName}
            </h1>
          </div>
      
        </div>
      ))}
      
 {selectedChannel && <ChannelPlayer
        isOpen={isModalOpen}
        onClose={closeModal}
        mpdKey={selectedChannel.mpdKey}
        clearKey={selectedChannel.clearKey}
        name={selectedChannel.channelName}
      />}    </div>
  );
};

export default ChannelList;
