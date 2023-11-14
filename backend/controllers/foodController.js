const Food = require("../models/foodModel");
const User = require("../models/userModel");

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

module.exports = {
	addFood,
	getFoods,
	getFood,
};
