import {React,useState} from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import AdminPackageForm from "../Components/AdminPackageForm";
function AdminDashboard(){
  
    const[subadminmanager,setsubadminmanager]=useState(true);
    const[channelmanager,setchannelmanager]=useState(false)
const handleclicksubadminmanager=()=>{
    setsubadminmanager(true)
    setchannelmanager(false)
}
const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'subadmin', // Default role
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
 
  const handlechannelsubmit = async (s) => {

    try {
        const channel_name=document.getElementById('channel_name').value
        const mpdkey=document.getElementById('mpdkey').value
        const clearkey=document.getElementById('clearkey').value
     const channeldata={

        name:channel_name,
        mpdKey:mpdkey,
        clearKey:clearkey
     }
      // Send a POST request to your backend API for user registration
      const response = await axios.post('https://api.dcvip.one/api/channels/add', channeldata);

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
  const [packages, setPackages] = useState({
    silver: [],
    gold: [],
    platinum: [],
  });
  const handleFormSubmit = (packageType, newChannel) => {
    // Create a copy of the existing packages
    const updatedPackages = { ...packages };

    // Add the new channel to the specified package
    updatedPackages[packageType].push(newChannel);

    // Update the state with the modified packages
    setPackages(updatedPackages);
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
const channelmanagerhandle=()=>{
    setchannelmanager(true)
    setsubadminmanager(false)
}

    return(<div className="h-screen w-full">

        <Navbar channelallothandle={handleclicksubadminmanager} secondnavbtnaction={channelmanagerhandle} firstnavbtn="Add Subadmin" secondnavbtn="Add Channel" />
{
    subadminmanager && <div className="h-screen w-full justify-center flex items-center" >
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
                <div>
                    <h2 className="text-3xl font-bold">Add Subadmin</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Set SubAdmin Username</span>
                            </label>
                            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="input input-bordered w-full max-w-xs" />
                            <label className="label"></label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Set SubAdmin Password</span>
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
{channelmanager && 
    

    <div>
              <AdminPackageForm onSubmit={handleFormSubmit} />

    </div>}
    </div>)
}

export default AdminDashboard;