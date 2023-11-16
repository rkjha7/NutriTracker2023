import axios from "axios";

const API_URL = "/api/foods/";

// Add a food to user's profile
const addFood = async (foodData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.post(
		API_URL + "foodDetails/:fdcId",
		foodData,
		config
	);

	if (response.data) {
		localStorage.setItem("foodItem", JSON.stringify(response.data));
	}

	return response.data;
};

//Get all foods to list on the dashboard page
const getFoods = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL, config);

	return response.data;
};

//Get user's singular food
const getFood = async (foodId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL + "myFoods/" + foodId, config);

	return response.data;
};

const updateFood = async (foodId, foodData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.put(
		API_URL + "myFoods/" + foodId,
		foodData,
		config
	);

	return response.data;
};

const foodService = {
	addFood,
	getFoods,
	getFood,
	updateFood,
};

export default foodService;
