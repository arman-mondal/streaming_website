// SubadminDashboard.js

import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import axios from 'axios';
import VideoPlayer from '../Components/VideoPlayer';
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';
import ChannelNameResolver from '../Resolver/channelNameResolver';
const SubAdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [channels, setChannels] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('');
  const [subscriptionMonths, setSubscriptionMonths] = useState(1); // Default to 1 month
const [channelalott,setchannelallot]=useState(true);
const navigate=useNavigate();
const[userslist,setuserslistshow]=useState(false)
const[addusers,setaddusers]=useState(false)

  useEffect(() => {
    // Fetch the list of users and channels when the component mounts
  
    
    const fetchUsers = async () => {
      try {
        const response = await Axios.get('https://api.dcvip.one/api/user/users',); // Replace with your user retrieval route
       
        if (response.status === 200) {
            // Store the user data in the state


            const filteredUsers = response.data.filter((user) => user.role === 'user');
            setUsers(filteredUsers);

            console.log(filteredUsers)

        }

        } catch (error) {
            console.log(error)
    }
    }

  

    fetchUsers();
  }, []);
  const [selectedPackage, setSelectedPackage] = useState('');

  const handleSubscriptionAllotment = async () => {
    try {
      // Check if all required fields are filled
      if (!selectedUser || !selectedPackage || !subscriptionMonths) {
        // Handle validation error, show a message, or prevent submission
        return;
      }
  
      // Prepare the request data
      const requestData = {
        userId: selectedUser,
        packageType: selectedPackage,
        subscriptionMonth: subscriptionMonths,
      };
  
      // Make a POST request to the API to allot the subscription
      const response = await axios.post('https://api.dcvip.one/api/user/allot-subscription', requestData);

      if (response.status === 200) {
        // Subscription allotted successfully
        // You can show a success message or perform other actions
        console.log('Subscription allotted successfully');
      } else {
        // Handle other response statuses or errors
        console.error('Subscription allotment failed');
      }
    } catch (error) {
      // Handle request errors
      console.error('Subscription allotment error:', error);
    }
  };
  
  const allotChannel = async () => {
    try {
        console.log(selectedUser)
        console.log(selectedChannel)
        


        if (!selectedUser || !selectedChannel) {
            return alert('Please select a user and a channel');

        }
        if (subscriptionMonths < 1) {
            return alert('Please enter a valid subscription period');
        }
       

      // Send a POST request to allot the selected channel to the selected user
      const response = await Axios.post('https://api.dcvip.one/api/user/allot-channel', {
        
        userId: selectedUser,
        channelId: selectedChannel,
        subscriptionMonths: subscriptionMonths, // Include subscriptionMonths
      });

      if (response.status === 200) {
        alert('Channel allotted successfully');
        // Optionally, reset the form or update the UI as needed
      } else {
        console.error('Error allotting channel');
      }
    } catch (error) {
      console.error('Error allotting channel:', error);
    }
  };

  const handlechannelallotclick=()=>{
    setuserslistshow(false)
    setchannelallot(true)
    setaddusers(false)
  }

  const handlelogout=()=>{
    localStorage.removeItem('token') 
    navigate('/login')
  }
  const handleuserlistclick=()=>{
    setuserslistshow(true)
    setchannelallot(false)
    setaddusers(false)
  }
const handlesetadduser=()=>{
    setuserslistshow(false)
    setchannelallot(false)
    setaddusers(true)
}
const [formData, setFormData] = useState({
    username: '',
    password: '',
     // Default role
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your backend API for user registration
      const response = await axios.post('https://api.dcvip.one/api/auth/register', formData);

      if (response.status === 201) {
        // Registration successful, you can redirect the user or display a success message
        alert('User registered successfully');
      } else {
        // Handle registration failure, show an error message or take appropriate action
        alert('Registration failed');
      }
    } catch (error) {
      // Handle any network or server errors here
      console.log('Error during registration:', error);
    }
  };
  return (
    <div className='h-screen w-full'>


        <Navbar submenu1="Add Users" submenu1click={handlesetadduser} secondnavbtnaction={handleuserlistclick} secondnavbtn="User List" firstnavbtn="Channel Allot" channelallothandle={handlechannelallotclick} handlelogout={handlelogout} />
        {channelalott &&<div className='h-screen w-full justify-center flex items-center' >

            
<div className="card w-96 bg-base-100 shadow-xl">
 
 <div className="card-body items-center text-center">
 <div>
  <h2 className="text-3xl font-bold">Subscription Allotment</h2>
  <label>
    Select a User:
    <select
      className="select select-primary w-full max-w-xs"
      value={selectedUser}
      onChange={(e) => setSelectedUser(e.target.value)}
    >
      <option value="">Select User</option>
      {users.map((user) => (
        <option key={user._id} value={user._id}>
          {user.username}
        </option>
      ))}
    </select>
  </label>
  <label>
    Select a Package:
    <select
      className="select select-primary w-full max-w-xs"
      value={selectedPackage}
      onChange={(e) => setSelectedPackage(e.target.value)}
    >
      <option value="">Select Package</option>
      <option value="gold">Gold</option>
      <option value="platinum">Platinum</option>
      <option value="silver">Silver</option>
    </select>
  </label>
</div>
<div>
  <label>
    Subscription Months:
    <input
      className="input input-bordered input-primary w-full max-w-xs"
      type="number"
      placeholder="Enter Subscription Months"
      value={subscriptionMonths}
      onChange={(e) => setSubscriptionMonths(e.target.value)}
    />
  </label>
</div>
<button
  className="btn btn-primary"
  onClick={handleSubscriptionAllotment} // Implement the function to allot the subscription
>
  Allot Subscription
</button>

 </div>
</div>
        </div>
      }


      {userslist && <div>
        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>id</th>
        <th>Username</th>
            <th>Package Type</th>
            <th>Expiry Date</th>
      </tr>
    </thead>
    <tbody>
    {users.map((user) => (
            <tr key={user._id}>
                <td>{user._id}</td>
              <td>{user.username}</td>
              <td>{Array(user.subscription)}</td>
              <td>{user.subscriptionEnd}</td>
            </tr>
          ))}
    </tbody>
  </table>
</div>
       </div>}
       {addusers &&  <div className="h-screen w-full justify-center flex items-center" >
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
                <div>
                    <h2 className="text-3xl font-bold">Add Users</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Set Users Username</span>
                            </label>
                            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="input input-bordered w-full max-w-xs" />
                            <label className="label"></label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Set Users Password</span>
                            </label>
                            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="input input-bordered w-full max-w-xs" />
                            <label className="label"></label>
                        </div>
                        <div className="card-actions">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    }
    </div>
  );
};

export default SubAdminDashboard;
