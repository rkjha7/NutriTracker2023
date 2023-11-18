import axios from "axios";

const API_URL = "/api/foods/";

// Add a food to user's profile
const addFood = async (foodData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.post(API_URL + "addFood", foodData, config);

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

	const response = await axios.get(API_URL + "getAllFoods", config);

	return response.data;
};

//Get user's singular food
const getFood = async (foodId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL + "getFood/" + foodId, config);

	return response.data;
};

const updateFood = async (foodId, foodData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.put(
		API_URL + "updateFood/" + foodId,
		foodData,
		config
	);

	return response.data;
};

const deleteFood = async (foodId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.delete(API_URL + "deleteFood/" + foodId, config);

	return response.data;
};

const lookupFood = async (fdcId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL + "lookupFood/" + fdcId, config);
	return response.data;
};

const searchFoods = async (query, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL + "searchFoods/" + query, config);
	return response.data;
};

const foodService = {
	addFood,
	getFoods,
	getFood,
	updateFood,
	deleteFood,
	lookupFood,
	searchFoods,
};

export default foodService;
