import React from 'react';
import AddFoodItem from './components/AddFoodItem';
import UserCalories from './components/UserCalories';

const App = () => {
    return (
        <div>
            <h1>My Fitness Tracker</h1>
            {/* <AddFoodItem /> */}
            <UserCalories />
        </div>
    );
};

export default App;
