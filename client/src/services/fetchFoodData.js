import axios from 'axios';

// Replace 'YOUR_APP_ID' and 'YOUR_APP_KEY' with your actual Nutritionix credentials
const APP_ID = 'c43e6f63';
const APP_KEY = 'aa8ff0a5f7bc695884d7c0c39fe5570d';

const fetchFoodData = async (query) => {
    try {
        const response = await axios.get(`https://api.nutritionix.com/v1_1/search/${query}?results=0:20&fields=item_name,brand_name,item_id,nf_calories,nf_protein,nf_total_fat,nf_total_carbohydrate&appId=${APP_ID}&appKey=${APP_KEY}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching food data:', error);
        throw new Error('Failed to fetch food data');
    }
};

export default fetchFoodData;
