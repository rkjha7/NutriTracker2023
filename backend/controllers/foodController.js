const Food = require("../models/foodModel");
const User = require("../models/userModel");
const axios = require("axios");

const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Add a food to a user's profile
// @route   /api/foods/foodDetails/:fdcId
// @access  Private
const addFood = asyncHandler(async (req, res) => {
	//req.body already has the entire food in it with all of the fields 1:1
	try {
		const newFood = await Food.create({
			...req.body,
			user: req.user.id,
		});

		res.status(201).json({ newFood });
	} catch (error) {
		console.error("Unable to send addFood request", error);
	}
});

// @desc    Get all of the added foods in this user's profile
// @route   /api/foods/
// @access  Private
const getFoods = asyncHandler(async (req, res) => {
	try {
		const foodList = await Food.find({
			user: req.user.id,
		});

		res.status(200).json(foodList);
	} catch (error) {
		console.error("Unable to get food list", error);
	}
});

// @desc    Get all of the added foods in this user's profile
// @route   /api/foods/myFoods/:id
// @access  Private
const getFood = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id);

	if (!user) {
		return next(new ErrorResponse("User not found", 401));
	}

	const foodItem = await Food.findById(req.params.id);

	if (!foodItem) {
		return next(new ErrorResponse("Food not found", 404));
	}

	if (foodItem.user.toString() !== req.user.id) {
		return next(new ErrorResponse("Not authorized", 401));
	}
	res.status(200).json(foodItem);
});

// @desc    Update the grams value of the current food
// @route   /api/foods/myFoods/:id
// @access  Private

const updateFood = asyncHandler(async (req, res) => {
	let food = await Food.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(200).json(food);
});

// @desc    Delete a food
// @route   /api/foods/deleteFood/:id
// @access  Private

const deleteFood = asyncHandler(async (req, res) => {
	const food = await Food.findById(req.params.id);

	if (food) {
		await food.deleteOne();
	}

	res.status(200).json({});
});

// @desc    Lookup a food for its information via the fdc API
// @route   /api/foods/lookupFood/:fdcId
// @access  Private
const lookupFood = asyncHandler(async (req, res) => {
	const result = await axios.get(
		process.env.API_FOOD_URL + req.params.fdcId + process.env.API_KEY
	);

	res.status(200).json(result.data);
});

// @desc    Get the search results of a query in the fdc, returning a list of food items
// @route   /api/foods/searchFoods/:query
// @access  Private
const searchFoods = asyncHandler(async (req, res) => {
	const result = await axios.get(
		process.env.API_SEARCH_URL +
			process.env.API_KEY_AND_QUERY +
			req.params.query +
			process.env.API_SEARCH_TAIL
	);
	res.status(200).json(result.data.foods);
});

module.exports = {
	addFood,
	getFoods,
	getFood,
	updateFood,
	deleteFood,
	lookupFood,
	searchFoods,
};
