import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Unstable_Grid2";
import { BackButton } from "../components/BackButton";
import { toast } from "react-toastify";
import { addFood, lookupFood } from "../features/food/foodSlice";

function FoodDetails() {
	const foodOnLoad = useSelector((state) => state.food.foodItem);

	const [foodResult, setFoodResult] = useState(null);
	const [grams, setGrams] = useState(100);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	//fdcId to use for the API call
	const { fdcId } = useParams();

	useEffect(() => {
		dispatch(lookupFood(fdcId));
	}, []);

	useEffect(() => {
		if (foodOnLoad) {
			setFoodResult(foodOnLoad);
		}
	}, [foodOnLoad]);

	const onChange = (e) => {
		setGrams(Number(e.target.value));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const foodData = {
			food_name: foodResult.description,
			food_suggestion_grams: foodResult.foodPortions[0].gramWeight,
			food_suggestion_modifier: foodResult.foodPortions[0].modifier,
			grams,
			calories: (findNutrient("208", foodResult) * (grams / 100)).toFixed(2),
			protein: (findNutrient("203", foodResult) * (grams / 100)).toFixed(2),
			carbohydrates: (findNutrient("205", foodResult) * (grams / 100)).toFixed(
				2
			),
			sugar: (findNutrient("269", foodResult) * (grams / 100)).toFixed(2),
			fiber: (findNutrient("291", foodResult) * (grams / 100)).toFixed(2),
			total_lipids: (findNutrient("204", foodResult) * (grams / 100)).toFixed(
				2
			),
			saturated_fats: (findNutrient("606", foodResult) * (grams / 100)).toFixed(
				2
			),
			monounsaturated_fats: (
				findNutrient("645", foodResult) *
				(grams / 100)
			).toFixed(2),
			polyunsaturated_fats: (
				findNutrient("646", foodResult) *
				(grams / 100)
			).toFixed(2),
			trans_fats: (findNutrient("605", foodResult) * (grams / 100)).toFixed(2),
			cholesterol: (findNutrient("601", foodResult) * (grams / 100)).toFixed(2),
			vitamin_A: (findNutrient("318", foodResult) * (grams / 100)).toFixed(2),
			vitamin_B1: (findNutrient("404", foodResult) * (grams / 100)).toFixed(2),
			vitamin_B2: (findNutrient("405", foodResult) * (grams / 100)).toFixed(2),
			vitamin_B3: (findNutrient("306", foodResult) * (grams / 100)).toFixed(2),
			vitamin_B5: (findNutrient("410", foodResult) * (grams / 100)).toFixed(2),
			vitamin_B6: (findNutrient("415", foodResult) * (grams / 100)).toFixed(2),
			vitamin_B9: (findNutrient("417", foodResult) * (grams / 100)).toFixed(2),
			vitamin_B12: (findNutrient("418", foodResult) * (grams / 100)).toFixed(2),
			vitamin_C: (findNutrient("401", foodResult) * (grams / 100)).toFixed(2),
			vitamin_D: (findNutrient("324", foodResult) * (grams / 100)).toFixed(2),
			vitamin_E: (findNutrient("323", foodResult) * (grams / 100)).toFixed(2),
			vitamin_K: (findNutrient("430", foodResult) * (grams / 100)).toFixed(2),
			sodium: (findNutrient("307", foodResult) * (grams / 100)).toFixed(2),
			potassium: (findNutrient("306", foodResult) * (grams / 100)).toFixed(2),
			calcium: (findNutrient("301", foodResult) * (grams / 100)).toFixed(2),
			magnesium: (findNutrient("304", foodResult) * (grams / 100)).toFixed(2),
			iron: (findNutrient("303", foodResult) * (grams / 100)).toFixed(2),
			zinc: (findNutrient("309", foodResult) * (grams / 100)).toFixed(2),
		};

		dispatch(addFood(foodData))
			.unwrap()
			.then(() => {
				toast.success(`Added food - ${foodData.food_name}`);
				navigate("/");
			})
			.catch(toast.error);
	};

	const findNutrient = (num, foodRes) => {
		let value = 0;

		if (foodRes !== "null") {
			const target = foodRes.foodNutrients.find(
				(nutrient) => nutrient.nutrient.number === num
			);
			if (target) {
				value = target.amount;
			}
		}

		return value;
	};

	if (foodResult !== null) {
		return (
			<>
				<BackButton url="/search"></BackButton>
				<h1>{foodResult.description}</h1>
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
							<button className="btn btn-block">
								Add this food to your profile!
							</button>
						</div>
					</form>
				</h3>
				<h5>
					For reference: {foodResult.foodPortions[0].gramWeight} grams (
					{foodResult.foodPortions[0].modifier})
				</h5>
				<Grid container spacing={2}>
					<Grid xs={6}>
						<h3>Proximates</h3>
						<p>
							Calories:{" "}
							{(findNutrient("208", foodResult) * (grams / 100)).toFixed(2)}{" "}
							kcal
						</p>
						<p>
							Protein:{" "}
							{(findNutrient("203", foodResult) * (grams / 100)).toFixed(2)} g
						</p>
						<p>
							Carbohydrates:{" "}
							{(findNutrient("205", foodResult) * (grams / 100)).toFixed(2)} g
						</p>
						<p>
							Sugar:{" "}
							{(findNutrient("269", foodResult) * (grams / 100)).toFixed(2)} g
						</p>
						<p>
							Fiber:{" "}
							{(findNutrient("291", foodResult) * (grams / 100)).toFixed(2)} g
						</p>
					</Grid>
					<Grid xs={6}>
						<h3>Lipids</h3>
						<p>
							Total lipids (fat):{" "}
							{(findNutrient("204", foodResult) * (grams / 100)).toFixed(2)} g
						</p>
						<p>
							Saturated fats:{" "}
							{(findNutrient("606", foodResult) * (grams / 100)).toFixed(2)} g
						</p>
						<p>
							Monounsaturated fats:{" "}
							{(findNutrient("645", foodResult) * (grams / 100)).toFixed(2)} g
						</p>
						<p>
							Polyunsaturated fats:{" "}
							{(findNutrient("646", foodResult) * (grams / 100)).toFixed(2)} g
						</p>
						<p>
							Trans fats:{" "}
							{(findNutrient("605", foodResult) * (grams / 100)).toFixed(2)} g
						</p>
						<p>
							Cholesterol:{" "}
							{(findNutrient("601", foodResult) * (grams / 100)).toFixed(2)} mg
						</p>
					</Grid>
					<Grid xs={4}>
						<h3>Vitamins</h3>
						<p>
							A (Retinol):{" "}
							{(findNutrient("318", foodResult) * (grams / 100)).toFixed(2)} IU
						</p>
						<p>
							B1 (Thiamin):{" "}
							{(findNutrient("404", foodResult) * (grams / 100)).toFixed(2)} mg
						</p>
						<p>
							B2 (Riboflavin):{" "}
							{(findNutrient("405", foodResult) * (grams / 100)).toFixed(2)} mg
						</p>
						<p>
							B3 (Niacin):{" "}
							{(findNutrient("306", foodResult) * (grams / 100)).toFixed(2)} mg
						</p>
						<p>
							B5 (Pantothenic acid):{" "}
							{(findNutrient("410", foodResult) * (grams / 100)).toFixed(2)} mg
						</p>
						<p>
							B6 (Pyridoxine):{" "}
							{(findNutrient("415", foodResult) * (grams / 100)).toFixed(2)} mg
						</p>
					</Grid>
					<Grid xs={4}>
						<h3>Vitamins cont'd</h3>
						<p>
							B9 (Folate):{" "}
							{(findNutrient("417", foodResult) * (grams / 100)).toFixed(2)} µg
						</p>
						<p>
							B12 (Cobalamin):{" "}
							{(findNutrient("418", foodResult) * (grams / 100)).toFixed(2)} µg
						</p>
						<p>
							C (Ascorbic acid):{" "}
							{(findNutrient("401", foodResult) * (grams / 100)).toFixed(2)} mg
						</p>
						<p>
							D (D2 + D3):{" "}
							{(findNutrient("324", foodResult) * (grams / 100)).toFixed(2)} IU
						</p>
						<p>
							E (alpha-tocopherol):{" "}
							{(findNutrient("323", foodResult) * (grams / 100)).toFixed(2)} mg
						</p>
						<p>
							K (phylloquinone):{" "}
							{(findNutrient("430", foodResult) * (grams / 100)).toFixed(2)} µg
						</p>
					</Grid>
					<Grid xs={4}>
						<h3>Minerals</h3>
						<p>
							Sodium:{" "}
							{(findNutrient("307", foodResult) * (grams / 100)).toFixed(2)} mg
						</p>
						<p>
							Potassium:{" "}
							{(findNutrient("306", foodResult) * (grams / 100)).toFixed(2)} mg
						</p>
						<p>
							Calcium:{" "}
							{(findNutrient("301", foodResult) * (grams / 100)).toFixed(2)} mg
						</p>
						<p>
							Magnesium:{" "}
							{(findNutrient("304", foodResult) * (grams / 100)).toFixed(2)} mg
						</p>
						<p>
							Iron:{" "}
							{(findNutrient("303", foodResult) * (grams / 100)).toFixed(2)} mg
						</p>
						<p>
							Zinc:{" "}
							{(findNutrient("309", foodResult) * (grams / 100)).toFixed(2)} mg
						</p>
					</Grid>
				</Grid>
			</>
		);
	} else {
		return <></>;
	}
}

export default FoodDetails;
