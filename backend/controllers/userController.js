//Imports go here later
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const generateToken = require("../utils/generateToken");

const User = require("../models/userModel");

// @desc Register a new user
// @route /api/users
// @access Public
const registerUser = asyncHandler(async (req, res, next) => {
	const { name, email, password } = req.body;

	// Validation
	if (!name || !email || !password) {
		return next(new ErrorResponse("Please include all fields", 400));
	}

	// Hash the password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Create user
	const user = await User.create({
		name,
		email,
		password: hashedPassword,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		return next(new ErrorResponse("Invalid user data", 400));
	}
});

// @desc Login a user
// @route /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	// Check if the user and password matches
	if (user && (await bcrypt.compare(password, user.password))) {
		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		return next(new ErrorResponse("Username and password do not match", 401));
	}
});

// @desc Get current user
// @route /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
	const user = {
		id: req.user._id,
		email: req.user.email,
		name: req.user.name,
	};
	res.status(200).json(user);
});

module.exports = {
	registerUser,
	loginUser,
	getMe,
};
