const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
	food_name: {
		type: String,
		required: true,
	},
	grams: {
		type: Number,
		required: true,
	},
	calories: {
		type: Number,
		required: true,
	},
	protein: {
		type: Number,
		required: true,
	},
	carbohydrates: {
		type: Number,
		required: true,
	},
	sugar: {
		type: Number,
		required: true,
	},
	fiber: {
		type: Number,
		required: true,
	},
	total_lipids: {
		type: Number,
		required: true,
	},
	saturated_fats: {
		type: Number,
		required: true,
	},
	monounsaturated_fats: {
		type: Number,
		required: true,
	},
	polyunsaturated_fats: {
		type: Number,
		required: true,
	},
	trans_fats: {
		type: Number,
		required: true,
	},
	cholesterol: {
		type: Number,
		required: true,
	},
	vitamin_A: {
		type: Number,
		required: true,
	},
	vitamin_B1: {
		type: Number,
		required: true,
	},
	vitamin_B2: {
		type: Number,
		required: true,
	},
	vitamin_B3: {
		type: Number,
		required: true,
	},
	vitamin_B5: {
		type: Number,
		required: true,
	},
	vitamin_B6: {
		type: Number,
		required: true,
	},
	vitamin_B9: {
		type: Number,
		required: true,
	},
	vitamin_B12: {
		type: Number,
		required: true,
	},
	vitamin_C: {
		type: Number,
		required: true,
	},
	vitamin_D: {
		type: Number,
		required: true,
	},
	vitamin_E: {
		type: Number,
		required: true,
	},
	vitamin_K: {
		type: Number,
		required: true,
	},
	sodium: {
		type: Number,
		required: true,
	},
	potassium: {
		type: Number,
		required: true,
	},
	calcium: {
		type: Number,
		required: true,
	},
	magnesium: {
		type: Number,
		required: true,
	},
	iron: {
		type: Number,
		required: true,
	},
	zinc: {
		type: Number,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
		required: true,
	},
});

module.exports = mongoose.model("Food", foodSchema);
