const express = require("express");
const router = express.Router();

const {
	addFood,
	getFoods,
	getFood,
	updateFood,
	deleteFood,
	lookupFood,
	searchFoods,
} = require("../controllers/foodController");
const { protect } = require("../middleware/authMiddleware");

router.post("/addFood", protect, addFood);
router.get("/getAllFoods", protect, getFoods);
router.get("/getFood/:id", protect, getFood);
router.put("/updateFood/:id", protect, updateFood);
router.delete("/deleteFood/:id", protect, deleteFood);
router.get("/lookupFood/:fdcId", protect, lookupFood);
router.get("/searchFoods/:query", protect, searchFoods);

module.exports = router;
