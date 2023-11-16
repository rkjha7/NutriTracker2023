const express = require("express");
const router = express.Router();

const {
	addFood,
	getFoods,
	getFood,
	updateFood,
} = require("../controllers/foodController");
const { protect } = require("../middleware/authMiddleware");

router.post("/foodDetails/:fdcId", protect, addFood);
router.get("/", protect, getFoods);
// router.get("/myFoods/:id", protect, getFood)
router.route("/myFoods/:id").get(protect, getFood).put(protect, updateFood);

module.exports = router;
