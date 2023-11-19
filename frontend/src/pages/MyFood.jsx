import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getFood, updateFood, deleteFood } from "../features/food/foodSlice";
import { BackButton } from "../components/BackButton";
import { toast } from "react-toastify";

import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Spinner from "../components/Spinner";

function MyFood() {
	const foodOnLoad = useSelector((state) => state.food.foodItem);
	const oldGrams = useSelector((state) => state.food.foodItem.grams);
	const [foodResult, setFoodResult] = useState({});
	const [grams, setGrams] = useState(100);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id } = useParams();

	useEffect(() => {
		dispatch(getFood(id));
	}, []);

	useEffect(() => {
		if (foodOnLoad) {
			setFoodResult(foodOnLoad);
			setGrams(foodOnLoad.grams);
		}
	}, [foodOnLoad]);

	const onChange = (e) => {
		setGrams(Number(e.target.value));
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const updatedFood = {
			...foodResult,
			grams,
			calories: (foodResult.calories * (grams / oldGrams)).toFixed(2),
			protein: (foodResult.protein * (grams / oldGrams)).toFixed(2),
			carbohydrates: (foodResult.carbohydrates * (grams / oldGrams)).toFixed(2),
			sugar: (foodResult.sugar * (grams / oldGrams)).toFixed(2),
			fiber: (foodResult.fiber * (grams / oldGrams)).toFixed(2),
			total_lipids: (foodResult.total_lipids * (grams / oldGrams)).toFixed(2),
			saturated_fats: (foodResult.saturated_fats * (grams / oldGrams)).toFixed(
				2
			),
			monounsaturated_fats: (
				foodResult.monounsaturated_fats *
				(grams / oldGrams)
			).toFixed(2),
			polyunsaturated_fats: (
				foodResult.polyunsaturated_fats *
				(grams / oldGrams)
			).toFixed(2),
			trans_fats: (foodResult.trans_fats * (grams / oldGrams)).toFixed(2),
			cholesterol: (foodResult.cholesterol * (grams / oldGrams)).toFixed(2),
			vitamin_A: (foodResult.vitamin_A * (grams / oldGrams)).toFixed(2),
			vitamin_B1: (foodResult.vitamin_B1 * (grams / oldGrams)).toFixed(2),
			vitamin_B2: (foodResult.vitamin_B2 * (grams / oldGrams)).toFixed(2),
			vitamin_B3: (foodResult.vitamin_B3 * (grams / oldGrams)).toFixed(2),
			vitamin_B5: (foodResult.vitamin_B5 * (grams / oldGrams)).toFixed(2),
			vitamin_B6: (foodResult.vitamin_B6 * (grams / oldGrams)).toFixed(2),
			vitamin_B9: (foodResult.vitamin_B9 * (grams / oldGrams)).toFixed(2),
			vitamin_B12: (foodResult.vitamin_B12 * (grams / oldGrams)).toFixed(2),
			vitamin_C: (foodResult.vitamin_C * (grams / oldGrams)).toFixed(2),
			vitamin_D: (foodResult.vitamin_D * (grams / oldGrams)).toFixed(2),
			vitamin_E: (foodResult.vitamin_E * (grams / oldGrams)).toFixed(2),
			vitamin_K: (foodResult.vitamin_K * (grams / oldGrams)).toFixed(2),
			sodium: (foodResult.sodium * (grams / oldGrams)).toFixed(2),
			potassium: (foodResult.potassium * (grams / oldGrams)).toFixed(2),
			calcium: (foodResult.calcium * (grams / oldGrams)).toFixed(2),
			magnesium: (foodResult.magnesium * (grams / oldGrams)).toFixed(2),
			iron: (foodResult.iron * (grams / oldGrams)).toFixed(2),
			zinc: (foodResult.zinc * (grams / oldGrams)).toFixed(2),
		};

		const updatedFoodId = updatedFood._id;

		dispatch(updateFood({ updatedFoodId, updatedFood }))
			.unwrap()
			.then(() => {
				toast.success(
					`Updated your ${updatedFood.food_name} / now ${updatedFood.grams} grams`
				);
				navigate("/");
			})
			.catch(toast.error);
	};

	const deleteItem = (e) => {
		e.preventDefault();
		const foodId = foodOnLoad._id;
		dispatch(deleteFood(foodId))
			.unwrap()
			.then(() => {
				toast.success(`Deleted ${foodOnLoad.food_name}`);
				navigate("/");
			});
	};

	if (foodResult !== null) {
		return (
			<>
				<Grid container spacing={2}>
					<Grid xs={9}>
						{" "}
						<BackButton url="/"></BackButton>
					</Grid>
					<Grid xs={3}>
						{" "}
						<button className="btn btn-block btn-danger" onClick={deleteItem}>
							Delete Item
						</button>
					</Grid>
				</Grid>
				<h3>Here is your:</h3>
				<h1>{foodResult.food_name}</h1>
				<h3>
					Enter grams:
					<form onSubmit={onSubmit}>
						<div className="form-group">
							<input
								type="number"
								className="form-control"
								id="grams"
								name="grams"
								value={grams}
								onChange={onChange}
							/>
						</div>
						<div className="form-group">
							<button className="btn btn-block">Update amount</button>
						</div>
					</form>
				</h3>
				<h5>
					For reference: {foodResult.food_suggestion_grams} grams (
					{foodResult.food_suggestion_modifier})
				</h5>
				<Grid container spacing={2}>
					<Grid xs={6}>
						<Box sx={{ fontSize: "18px" }}>
							<h3>Proximates</h3>
							<p>
								Calories:{" "}
								{(foodResult.calories * (grams / oldGrams)).toFixed(2)} kcal
							</p>
							<p>
								Protein: {(foodResult.protein * (grams / oldGrams)).toFixed(2)}{" "}
								g
							</p>
							<p>
								Carbohydrates:{" "}
								{(foodResult.carbohydrates * (grams / oldGrams)).toFixed(2)} g
							</p>
							<p>
								Sugar: {(foodResult.sugar * (grams / oldGrams)).toFixed(2)} g
							</p>
							<p>
								Fiber: {(foodResult.fiber * (grams / oldGrams)).toFixed(2)} g
							</p>
						</Box>
					</Grid>
					<Grid xs={6}>
						<Box sx={{ fontSize: "18px" }}>
							<h3>Lipids</h3>
							<p>
								Total lipids (fat):{" "}
								{(foodResult.total_lipids * (grams / oldGrams)).toFixed(2)} g
							</p>
							<p>
								Saturated fats:{" "}
								{(foodResult.saturated_fats * (grams / oldGrams)).toFixed(2)} g
							</p>
							<p>
								Monounsaturated fats:{" "}
								{(foodResult.monounsaturated_fats * (grams / oldGrams)).toFixed(
									2
								)}{" "}
								g
							</p>
							<p>
								Polyunsaturated fats:{" "}
								{(foodResult.polyunsaturated_fats * (grams / oldGrams)).toFixed(
									2
								)}{" "}
								g
							</p>
							<p>
								Trans fats:{" "}
								{(foodResult.trans_fats * (grams / oldGrams)).toFixed(2)} g
							</p>
							<p>
								Cholesterol:{" "}
								{(foodResult.cholesterol * (grams / oldGrams)).toFixed(2)} mg
							</p>
						</Box>
					</Grid>
					<Grid xs={4}>
						<Box sx={{ fontSize: "18px" }}>
							<h3>Vitamins</h3>
							<p>
								A (Retinol):{" "}
								{(foodResult.vitamin_A * (grams / oldGrams)).toFixed(2)} RAE
							</p>
							<p>
								B1 (Thiamin):{" "}
								{(foodResult.vitamin_B1 * (grams / oldGrams)).toFixed(2)} mg
							</p>
							<p>
								B2 (Riboflavin):{" "}
								{(foodResult.vitamin_B2 * (grams / oldGrams)).toFixed(2)} mg
							</p>
							<p>
								B3 (Niacin):{" "}
								{(foodResult.vitamin_B3 * (grams / oldGrams)).toFixed(2)} mg
							</p>
							<p>
								B5 (Pantothenic acid):{" "}
								{(foodResult.vitamin_B5 * (grams / oldGrams)).toFixed(2)} mg
							</p>
							<p>
								B6 (Pyridoxine):{" "}
								{(foodResult.vitamin_B6 * (grams / oldGrams)).toFixed(2)} mg
							</p>
						</Box>
					</Grid>
					<Grid xs={4}>
						<Box sx={{ fontSize: "18px" }}>
							<h3>Vitamins cont'd</h3>
							<p>
								B9 (Folate):{" "}
								{(foodResult.vitamin_B9 * (grams / oldGrams)).toFixed(2)} µg
							</p>
							<p>
								B12 (Cobalamin):{" "}
								{(foodResult.vitamin_B12 * (grams / oldGrams)).toFixed(2)} µg
							</p>
							<p>
								C (Ascorbic acid):{" "}
								{(foodResult.vitamin_C * (grams / oldGrams)).toFixed(2)} mg
							</p>
							<p>
								D (D2 + D3):{" "}
								{(foodResult.vitamin_D * (grams / oldGrams)).toFixed(2)} IU
							</p>
							<p>
								E (alpha-tocopherol):{" "}
								{(foodResult.vitamin_E * (grams / oldGrams)).toFixed(2)} mg
							</p>
							<p>
								K (phylloquinone):{" "}
								{(foodResult.vitamin_K * (grams / oldGrams)).toFixed(2)} µg
							</p>
						</Box>
					</Grid>
					<Grid xs={4}>
						<Box sx={{ fontSize: "18px" }}>
							<h3>Minerals</h3>
							<p>
								Sodium: {(foodResult.sodium * (grams / oldGrams)).toFixed(2)} mg
							</p>
							<p>
								Potassium:{" "}
								{(foodResult.potassium * (grams / oldGrams)).toFixed(2)} mg
							</p>
							<p>
								Calcium: {(foodResult.calcium * (grams / oldGrams)).toFixed(2)}{" "}
								mg
							</p>
							<p>
								Magnesium:{" "}
								{(foodResult.magnesium * (grams / oldGrams)).toFixed(2)} mg
							</p>
							<p>
								Iron: {(foodResult.iron * (grams / oldGrams)).toFixed(2)} mg
							</p>
							<p>
								Zinc: {(foodResult.zinc * (grams / oldGrams)).toFixed(2)} mg
							</p>
						</Box>
					</Grid>
				</Grid>
			</>
		);
	} else {
		return <Spinner />;
	}
}

export default MyFood;
