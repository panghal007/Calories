import React, { useState } from 'react';

const AddFoodItem = () => {
    const [query, setQuery] = useState('');
    const [nutritionInfo, setNutritionInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [dailyCalories, setDailyCalories] = useState(0); // Track daily calorie intake
    const [dailyCalorieGoal, setDailyCalorieGoal] = useState(2000); // Default daily calorie goal

    const userId = '1';

    const handleQueryChange = (event) => {
        setQuery(event.target.value);
    };

    const fetchNutritionInfo = async () => {
        
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-app-id': 'c43e6f63',
                    'x-app-key': 'aa8ff0a5f7bc695884d7c0c39fe5570d'
                },
                body: JSON.stringify({ query: query })
            });

            const data = await response.json();
            // setNutritionInfo(data);
            // Update daily calorie intake
            if (data && data.foods && data.foods.length > 0) {
                const totalCalories = data.foods.reduce((total, food) => total + food.nf_calories, 0);
                setDailyCalories(dailyCalories + totalCalories);
            }
            // Reset query after successful fetch
            setQuery('');
            handleSubmit(data);
            
        } catch (error) {
            setError('Error fetching data. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    // useEffect(() => {
    //     if (nutritionInfo) {
    //         handleSubmit();
    //     }
    // }, [nutritionInfo]);
    
    const handleSubmit = async (nutritionInfo) => {
        //  event.preventDefault();
         
        try {
            // await fetchNutritionInfo();
            const response = await fetch('http://localhost:3000/api/user-food-intake', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // body: JSON.stringify({
                //     // Replace with the actual user ID
                //     foodName: nutritionInfo.foods[0].food_name,
                //     quantity: nutritionInfo.foods.reduce((total, food) => total + food.serving_qty, 0), // Sum of serving quantities of all foods
                //     servingSize: 'serving', // Assuming serving size is constant for all foods
                //     calories: nutritionInfo.foods[0].nf_calories,
                //     timestamp: new Date()
                // })
                body: JSON.stringify(nutritionInfo.foods.map(food => ({
                    userId:userId,
                    foodName: food.food_name,
                    quantity: food.serving_qty,
                    servingSize: 'serving', // Assuming serving size is constant for all foods
                    calories: food.nf_calories,
                    timestamp: new Date()
                })))
            });
            // console.log(response);
            if (!response.ok) {
                throw new Error('Failed to log food intake');
            }
    
            // Clear query and nutritionInfo after successful submission
            setQuery('');
            setNutritionInfo(null);
    
            // Fetch nutrition info for the next query
            
        } catch (error) {
            setError('Error logging food intake');
        }
    };

   
    // Function to update daily calorie goal
    const handleGoalChange = (event) => {
        setDailyCalorieGoal(parseInt(event.target.value));
    };

    return (
        <div>
            <h2>Add Food Item</h2>
            {/* <form onSubmit={handleSubmit}> */}
            <form onSubmit={(event) => {
                event.preventDefault();
                fetchNutritionInfo();
            }}>
                <label>
                    Food Name:
                    <input type="text" value={query} onChange={handleQueryChange} />
                </label>
                <button type="submit" disabled={!query || loading}>Add</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {nutritionInfo && (
                <div>
                    {nutritionInfo.foods.map((food, index) => (
                        <div key={index}>
                            <h3>Food Name: {food.food_name}</h3>
                            <h3>Calories: {food.nf_calories} calories</h3>
                        </div>
                    ))}
                </div>
            )}

            {/* Display daily calorie intake and goal */}
            <div>
                <h2>Daily Calorie Intake: {dailyCalories}</h2>
                <label>
                    Set Daily Calorie Goal:
                    <input type="number" value={dailyCalorieGoal} onChange={handleGoalChange} />
                </label>
                <h3>Daily Calorie Goal: {dailyCalorieGoal}</h3>
            </div>
        </div>
    );
};

export default AddFoodItem;

