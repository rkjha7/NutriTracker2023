const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const ErrorResponse = require("../utils/errorResponse");

const protect = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			// Get the token from header
			token = req.headers.authorization.split(" ")[1];
			// Verify the token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			// Get user from token
			req.user = await User.findById(decoded.id).select("-password");
			// Check if user was found
			if (!req.user) {
				return next(new ErrorResponse("Not authorized", 401));
			}

			next();
		} catch (error) {
			console.log(error);
			return next(new ErrorResponse("Not authorized", 401));
		}

		if (!token) {
			return next(new ErrorResponse("Not authorized", 401));
		}
	}
});

module.exports = { protect };
