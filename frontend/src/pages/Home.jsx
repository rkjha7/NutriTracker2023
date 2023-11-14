import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getFoods } from "../features/food/foodSlice";
import Grid from "@mui/material/Unstable_Grid2";
import Spinner from "../components/Spinner";

function Home() {
	const { foodList, isLoading } = useSelector((state) => state.food);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getFoods());
	}, [dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<div>Welcome to NutriTracker</div>
			<Link to="/search" className="btn btn-block">
				Click here to search for a food!
			</Link>
			<div>Here is your nutritional overview</div>
			<Grid container spacing={2}>
				<Grid xs={6}>
					<h3>Proximates</h3>
					<p>
						Calories:{" "}
						{foodList === null
							? 0
							: foodList
									.reduce((acc, item) => {
										return acc + item.calories;
									}, 0)
									.toFixed(2)}{" "}
						kcal
					</p>
					<p>
						Protein:{" "}
						{foodList === null
							? 0
							: foodList
									.reduce((acc, item) => {
										return acc + item.protein;
									}, 0)
									.toFixed(2)}{" "}
						g
					</p>
					<p>
						Carbohydrates:{" "}
						{foodList === null
							? 0
							: foodList
									.reduce((acc, item) => {
										return acc + item.carbohydrates;
									}, 0)
									.toFixed(2)}{" "}
						g
					</p>
					<p>
						Sugar:{" "}
						{foodList === null
							? 0
							: foodList
									.reduce((acc, item) => {
										return acc + item.sugar;
									}, 0)
									.toFixed(2)}{" "}
						g
					</p>
					<p>
						Fiber:{" "}
						{foodList === null
							? 0
							: foodList
									.reduce((acc, item) => {
										return acc + item.fiber;
									}, 0)
									.toFixed(2)}{" "}
						g
					</p>
				</Grid>
				<Grid xs={6}>
					<h3>Lipids</h3>
					<p>
						Total lipids (fat):{" "}
						{foodList === null
							? 0
							: foodList
									.reduce((acc, item) => {
										return acc + item.total_lipids;
									}, 0)
									.toFixed(2)}{" "}
						g
					</p>
					<p>
						Saturated fats:{" "}
						{foodList === null
							? 0
							: foodList
									.reduce((acc, item) => {
										return acc + item.saturated_fats;
									}, 0)
									.toFixed(2)}{" "}
						g
					</p>
					<p>
						Monounsaturated fats:{" "}
						{foodList === null
							? 0
							: foodList
									.reduce((acc, item) => {
										return acc + item.monounsaturated_fats;
									}, 0)
									.toFixed(2)}{" "}
						g
					</p>
					<p>
						Polyunsaturated fats:{" "}
						{foodList === null
							? 0
							: foodList
									.reduce((acc, item) => {
										return acc + item.polyunsaturated_fats;
									}, 0)
									.toFixed(2)}{" "}
						g
					</p>
					<p>
						Trans fats:{" "}
						{foodList === null
							? 0
							: foodList
									.reduce((acc, item) => {
										return acc + item.trans_fats;
									}, 0)
									.toFixed(2)}{" "}
						g
					</p>
					<p>
						Cholesterol:{" "}
						{foodList === null
							? 0
							: foodList
									.reduce((acc, item) => {
										return acc + item.cholesterol;
									}, 0)
									.toFixed(2)}{" "}
						mg
					</p>
				</Grid>
				<Grid xs={4}>
					<h3>Vitamins</h3>
					<p>
						A (Retinol):{" "}
						{foodList === null
							? 0
							: foodList
									.reduce((acc, item) => {
										return acc + item.vitamin_A;
									}, 0)
									.toFixed(2)}{" "}
						IU
					</p>
					<p>
						B1 (Thiamin):{" "}
						{foodList === null
							? 0
							: foodList
									.reduce((acc, item) => {
										return acc + item.vitamin_B1;
									}, 0)
									.toFixed(2)}{" "}
						mg
					</p>
					<p>
						B2 (Riboflavin):{" "}
						{foodList === null
							? 0
							: foodList
									.reduce((acc, item) => {
										return acc + item.vitamin_B2;
									}, 0)
									.toFixed(2)}{" "}
						mg
					</p>
					<p>
						B3 (Niacin):{" "}
						{foodList === null
							? 0
							: foodList
									.reduce((acc, item) => {
										return acc + item.vitamin_B3;
									}, 0)
									.toFixed(2)}{" "}
						mg
					</p>
					<p>
						B5 (Pantothenic acid):{" "}
						{foodList === null
							? 0
							: foodList
									.reduce((acc, item) => {
										return acc + item.vitamin_B5;
									}, 0)
									.toFixed(2)}{" "}
						mg
					</p>
					<p>
						B6 (Pyridoxine):{" "}
						{foodList === null
							? 0
							: foodList
									.reduce((acc, item) => {
										return acc + item.vitamin_B6;
									}, 0)
									.toFixed(2)}{" "}
						mg
					</p>
				</Grid>
				<Grid xs={4}>
					<h3>Vitamins cont'd</h3>
					<p>
						B9 (Folate):{" "}
						{foodList === null
							? 0
							: foodList
									.reduce((acc, item) => {
										return acc + item.vitamin_B9;
									}, 0)
									.toFixed(2)}{" "}
						µg
					</p>
					<p>
						B12 (Cobalamin):{" "}
						{foodList === null
							? 0
							: foodList
									.reduce((acc, item) => {
										return acc + item.vitamin_B12;
									}, 0)
									.toFixed(2)}{" "}
						µg
					</p>
					<p>
						C (Ascorbic acid):{" "}
						{foodList === null
							? 0
							: foodList
									.reduce((acc, item) => {
										return acc + item.vitamin_C;
									}, 0)
									.toFixed(2)}{" "}
						mg
					</p>
					<p>
						D (D2 + D3):{" "}
						{foodList === null
							? 0
							: foodList
									.reduce((acc, item) => {
										return acc + item.vitamin_D;
									}, 0)
									.toFixed(2)}{" "}
						IU
					</p>
					<p>
						E (alpha-tocopherol):{" "}
						{foodList === null
							? 0
							: foodList
									.reduce((acc, item) => {
										return acc + item.vitamin_E;
									}, 0)
									.toFixed(2)}{" "}
						mg
					</p>
					<p>
						K (phylloquinone):{" "}
						{foodList === null
							? 0
							: foodList
									.reduce((acc, item) => {
										return acc + item.vitamin_K;
									}, 0)
									.toFixed(2)}{" "}
						µg
					</p>
				</Grid>
				<Grid xs={4}>
					<h3>Minerals</h3>
					<p>
						Sodium:{" "}
						{foodList === null
							? 0
							: foodList
									.reduce((acc, item) => {
										return acc + item.sodium;
									}, 0)
									.toFixed(2)}{" "}
						mg
					</p>
					<p>
						Potassium:{" "}
						{foodList === null
							? 0
							: foodList
									.reduce((acc, item) => {
										return acc + item.potassium;
									}, 0)
									.toFixed(2)}{" "}
						mg
					</p>
					<p>
						Calcium:{" "}
						{foodList === null
							? 0
							: foodList
									.reduce((acc, item) => {
										return acc + item.calcium;
									}, 0)
									.toFixed(2)}{" "}
						g
					</p>
					<p>
						Magnesium:{" "}
						{foodList === null
							? 0
							: foodList
									.reduce((acc, item) => {
										return acc + item.magnesium;
									}, 0)
									.toFixed(2)}{" "}
						mg
					</p>
					<p>
						Iron:{" "}
						{foodList === null
							? 0
							: foodList
									.reduce((acc, item) => {
										return acc + item.iron;
									}, 0)
									.toFixed(2)}{" "}
						mg
					</p>
					<p>
						Zinc:{" "}
						{foodList === null
							? 0
							: foodList
									.reduce((acc, item) => {
										return acc + item.zinc;
									}, 0)
									.toFixed(2)}{" "}
						mg
					</p>
				</Grid>
			</Grid>
			<h3>Here are all of your foods</h3>
			{foodList === null ? (
				<></>
			) : (
				foodList.map((item) => {
					return (
						<p key={item._id}>
							<Link to={`/myFoods/${item._id}`}>
								{item.grams} grams / {item.food_name}
							</Link>
						</p>
					);
				})
			)}
		</>
	);
}

export default Home;
