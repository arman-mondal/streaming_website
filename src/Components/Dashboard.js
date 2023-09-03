// client/src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Navigate, useNavigate, useNavigation } from 'react-router-dom'; // Import useHistory for redirection

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const history = useNavigate(); // Initialize history for redirection
  useEffect(() => {
    // Fetch user data or perform any other protected logic here
    const fetchUserData = async () => {
      try {
        // Send a GET request to your backend API to fetch user data
        const response = await Axios.get('https://api.dcvip.one/api/user', {
          headers: {
            Authorization: `${localStorage.getItem('token')}`, // Include the user's token for authentication
          },
        });

        if (response.status === 200) {
          // Store the user data in the state

          // Redirect based on the user's role
          switch (response.data.role) {
            case 'admin':
              history('/admin-dashboard'); // Redirect to admin dashboard
              break;
            case 'subadmin':
              history('/subadmin-dashboard'); // Redirect to subadmin dashboard
              break;
            case 'user':
              history('/user-dashboard'); // Redirect to user dashboard
              break;
            default:
              break;
          }
        } else {
          // Handle any errors or unauthorized access
          console.error('Error fetching user data');
        }
      } catch (error) {
        // Handle any network or server errors here
        console.error('Error during data fetching:', error);
      }
    };

    fetchUserData();
  }, [history]); // Include history in the dependency array to prevent useEffect warnings

  return (
    <div>
      {/* You can remove the content here since redirection will happen */}
      {/* Content here will not be displayed if the user is redirected */}
    </div>
  );
};

export default Dashboard;
