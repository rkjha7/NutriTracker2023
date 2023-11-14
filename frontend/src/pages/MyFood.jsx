import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getFood, resetFood } from "../features/food/foodSlice";
import { BackButton } from "../components/BackButton";
import { toast } from "react-toastify";

import Grid from "@mui/material/Unstable_Grid2";
import Spinner from "../components/Spinner";

function MyFood() {
	const foodItem = useSelector((state) => state.food.foodItem);
	const oldGrams = useSelector((state) => state.food.foodItem.grams);
	const [foodResult, setFoodResult] = useState(null);
	const [grams, setGrams] = useState(oldGrams);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id } = useParams();

	useEffect(() => {
		dispatch(getFood(id));
		setFoodResult(foodItem);
		setGrams(foodItem.grams);

		return () => {
			dispatch(resetFood());
		};
	});

	const onChange = (e) => {
		setGrams(Number(e.target.value));
	};

	const onSubmit = (e) => {
		e.preventDefault();
	};

	if (foodResult !== null) {
		return (
			<>
				<BackButton url="/"></BackButton>
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
						<h3>Proximates</h3>
						<p>
							Calories: {(foodResult.calories * (grams / oldGrams)).toFixed(2)}{" "}
							kcal
						</p>
						<p>
							Protein: {(foodResult.protein * (grams / oldGrams)).toFixed(2)} g
						</p>
						<p>
							Carbohydrates:{" "}
							{(foodResult.carbohydrates * (grams / oldGrams)).toFixed(2)} g
						</p>
						<p>Sugar: {(foodResult.sugar * (grams / oldGrams)).toFixed(2)} g</p>
						<p>Fiber: {(foodResult.fiber * (grams / oldGrams)).toFixed(2)} g</p>
					</Grid>
					{/* <Grid xs={6}>
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
        </Grid> */}
				</Grid>
			</>
		);
	} else {
		return <Spinner />;
	}
}

export default MyFood;
