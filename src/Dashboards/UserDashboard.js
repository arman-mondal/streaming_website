import {React,useEffect,useState} from "react";
import Navbar from "../Components/Navbar";
import ChannelInfo from "../Components/ChannelInfo";
import axios from "axios";
import ChannelNameResolver from "../Resolver/channelNameResolver";
import VideoComp from "../Components/VideoPlayer"
import ChannelList from "../Components/ChannelList";
import { useNavigate } from "react-router-dom";
function UserDashboard(){
    const [user, setUser] = useState('');
    const [selectedChannel, setSelectedChannel] = useState(null);
    const[mypackage,setmypackage]=useState(null);
const[packageExpiry,setPackageExpiry]=useState(null)
const[pack,setpack]=useState(null);
const navigate=useNavigate();
const handlelogout=()=>{
  localStorage.removeItem('token') 
  navigate('/login')
}
const[channels,setchannels]=useState([]);
  useEffect(() => {
    // Fetch the list of channels assigned to the user (you should have an API endpoint for this)
    const fetchUserChannels = async () => {
      try {
        const response = await axios.get('https://api.dcvip.one/api/user/users'); // Replace with your user retrieval route
         
          if (response.status === 200) {
            const filteredUsers = response.data.filter((user) => user.username === localStorage.getItem('username'));


            const user = filteredUsers[0];
            setUser(user)
            setmypackage(user.subscription)
            localStorage.setItem('package',user.subscription)
            setPackageExpiry(user.subscriptionEnd)
              // Store the user data in the state
          }

  
          } catch (error) {
              console.log(error)
      }
    };


    const fetchChannels= async ()=>{

        try{
            const response=await axios.get('https://api.dcvip.one/api/user/packages')
            if(response.status===200){

                if(localStorage.getItem('package')==="platinum")
                {
                    const data=response.data[0]
                    setchannels(data.channels)
                    setpack(data)
console.log(data.channels)
                    
                }
                if(localStorage.getItem('package')==="gold")
                {
                    const data=response.data[1]
                    setchannels(data.channels)
                    console.log(data.channels)

                    setpack(data)
                }
                else{
                    console.log("Error")

                }
           
            }
        }
        catch(error){
            console.log(error)
        }

    }




    fetchUserChannels();
    fetchChannels();
  }, []);
  const handleChannelButtonClick = (channel) => {
    // Handle the click event for the selected channel
    console.log('Selected Channel:', channel);
    setSelectedChannel(channel)
    
    // Implement your logic to play the video using channel information
  };
  const handleChannelClick = (channel) => {
    setSelectedChannel(channel);
  };


    return(<div className="w-full h-screen  ">

        <Navbar handlelogout={handlelogout} firstnavbtn="Popular Videos"  secondnavbtn="Recommended for You"/>
<div className="h-full w-full flex justify-center mt-5" >   <div className="artboard artboard-horizontal w-full h-64 ">


    <div className="w-full h-14 " >
        <h1 className="text-3xl font-bold ml-5" >Popular Shows</h1>


    </div>
    <div  className="w-full">
    <ChannelList channels={channels} onChannelButtonClick={handleChannelButtonClick} />

    </div>
</div>

</div>
     
        <div>



      {/* You can render other components or content here */}
    </div>


    </div>)

}

export default UserDashboard;