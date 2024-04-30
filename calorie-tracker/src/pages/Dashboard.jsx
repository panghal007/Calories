import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define the Dashboard component
const Dashboard = () => {
  // const [userId, setUserId] = useState('');
  // useEffect(() => {
  //   // Function to decode the JWT token stored in local storage
  //   const decodeToken = () => {
  //     const token = localStorage.getItem('token');
  //     if (token) {
  //       try {
  //         const decoded = JSON.parse(atob(token.split('.')[1]));
  //         console.log('Decoded token:', decoded);
  //         if (decoded && decoded.userId) {
  //           setUserId(decoded.userId);
  //         } else {
  //           console.error('Error: Decoded token does not contain user information');
  //         }
  //       } catch (error) {
  //         console.error('Error decoding token:', error);
  //       }
  //     } else {
  //       console.error('Token not found in local storage');
  //     }
  //   };

  //   // Call the function to decode token when Dashboard component mounts
  //   decodeToken();
  // }, []); // Empty dependency array ensures the effect runs only once when component mounts

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

// Export the Dashboard component
export default Dashboard;
