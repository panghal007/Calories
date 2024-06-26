import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useUserContext } from '../UserContext.jsx';

// Define the Dashboard component
const Dashboard = () => {
  const [userId, setUserId] = useState('');
  const [userData, setuserData] = useState('');
  
  const { user } = useUserContext();


  useEffect(() => {
    // Function to decode the JWT token stored in local storage
    const decodeToken = () => {
      
      const dataString=localStorage.getItem('Data');
      const data=JSON.parse(dataString);
      const token =data.token;
      setuserData(data.userData.username);
      
      if (token) {
        try {
          const decoded = JSON.parse(atob(token.split('.')[1]));
          // console.log('Decoded token:', decoded);
          if (decoded && decoded.userId) {
            setUserId(decoded.userId);
          } else {
            console.error('Error: Decoded token does not contain user information');
          }
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      } else {
        console.error('Token not found in local storage');
      }
    };

    // Call the function to decode token when Dashboard component mounts
    decodeToken();
  }, []); // Empty dependency array ensures the effect runs only once when component mounts

  // Function to send POST request to the backend using axios
  const sendDataToBackend = async () => {
    try {
      const backendUrl = `http://localhost:3000/api/${userId}`; // Replace with actual backend URL

      const response = await axios.post(backendUrl, { userId });

      console.log('Calculation result saved successfully:', response.data);
    } catch (error) {
      console.error('Error while sending POST request:', error);
      // Handle errors here
    }
  };

  // Call the function to send data to backend when component mounts
  useEffect(() => {
    if (userId) {
      sendDataToBackend();
    }
  }, [userId]); // Dependency on userId ensures the effect runs whenever userId changes

  // Render whatever you want on the Dashboard page
  return (
    <div>
      <h1>Dashboard</h1>
      <h1>Welcome, {userData}!</h1>
      <Link to="/add"><button >Add Food</button></Link>
    </div>
  );
};

// Export the Dashboard component
export default Dashboard;