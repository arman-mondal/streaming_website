import axios from 'axios';
import React, { useState } from 'react';

const AdminPackageForm = ({ onSubmit }) => {
  const [packageType, setPackageType] = useState('');
  const [channelName, setChannelName] = useState('');
  const [mpdKey, setMpdKey] = useState('');
  const [clearKey, setClearKey] = useState('');

  const handleSubmit = async (e)  => {
    e.preventDefault();

    // Create a channel object from the form inputs
    const updateData ={
        "packageType": packageType, // Specify the package type (e.g., silver, gold, platinum)
        "channels": [
          {
            "channelName": channelName,
            "mpdKey": mpdKey,
            "clearKey": clearKey
          },
        ]
      }
    const response=await axios.put('https://api.dcvip.one/api/channels/update-packages',updateData)

    if (response.status === 200) {
        alert('Channel added successfully');
        console.log(response)
    } else {
        alert('Something went wrong');
    }


    // Submit the package type and channel object to the parent component

  };

  return (
   <div className='card w-96 bg-base-100 shadow-xl' >
    <div className='card-body items-center text-center' >
     <form onSubmit={handleSubmit}>
      <div>
        <label>Select Package Type:</label>
        <select className='select select-primary w-full max-w-xs' onChange={(e) => setPackageType(e.target.value)} value={packageType}>
          <option value="">Select Package</option>
          <option value="silver">Silver</option>
          <option value="gold">Gold</option>
          <option value="platinum">Platinum</option>
        </select>
      </div>
      <div>
        <label>Channel Name:</label>
        <input className='input input-bordered input-primary w-full max-w-xs' type="text" value={channelName} onChange={(e) => setChannelName(e.target.value)} />
      </div>
      <div>
        <label>MPD Key:</label>
        <input className='input input-bordered input-primary w-full max-w-xs' type="url" value={mpdKey} onChange={(e) => setMpdKey(e.target.value)} />
      </div>
      <div>
        <label>Clear Key:</label>
        <input className='input input-bordered input-primary w-full max-w-xs' type="text" value={clearKey} onChange={(e) => setClearKey(e.target.value)} />
      </div>
      <button className='btn btn-active btn-primary mt-2' type="submit">Add Channel</button>
    </form>
    </div>
   </div>
  );
};

export default AdminPackageForm;
