import React, {useEffect, useState } from 'react';

const UserCalories = () => {
    const [userId, setUserId] = useState('');
    const [date, setDate] = useState('');
    const [totalCalories, setTotalCalories] = useState(null);
    const [totalFats, setTotalFats] = useState(null);
    const [totalProteins, setTotalProteins] = useState(null);
    const [username, setUsername] = useState('');

   
    useEffect(() => {
        // Function to decode the JWT token stored in local storage
        const decodeToken = () => {
          
            const dataString=localStorage.getItem('Data');
            const data=JSON.parse(dataString);
            const token =data.token;
            setUsername(data.userData.username);
            console.log('Token from localStorage:', token);
          
          if (token) {
            try {
              const decoded = JSON.parse(atob(token.split('.')[1]));
              console.log('Decoded token:', decoded);
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

    // const handleUserIdChange = (event) => {
    //     setUserId(event.target.value);
    // };

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await fetch(`http://localhost:3000/api/user-calories/${userId}/${date}`);
            const data = await response.json();
            setTotalCalories(data.totalCalories);
            setTotalFats(data.totalFats);
            setTotalProteins(data.totalProteins);
        } catch (error) {
            console.error('Error fetching user calories:', error);
        }
    };

    return (
        <div>
            <h2>View User Calories</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    User ID:
                     {username}
                    {/* <input type="text" value={userId} onChange={handleUserIdChange} /> */}
                </label>
                <label>
                    Date:
                    <input type="date" value={date} onChange={handleDateChange} />
                </label>
                <button type="submit">Get Calories</button>
            </form>

            {totalCalories !== null && (
                <p>Total calories consumed on {date}: {totalCalories}</p>
            )}
            {totalFats !== null && (
                <p>Total Fats consumed on {date}: {totalFats}</p>
            )}
            {totalProteins !== null && (
                <p>Total Proteins consumed on {date}: {totalProteins}</p>
            )}
        </div>
    );
};

export default UserCalories;
