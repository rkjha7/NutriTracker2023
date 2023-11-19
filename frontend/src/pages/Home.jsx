import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getFoods, resetFood } from "../features/food/foodSlice";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Spinner from "../components/Spinner";

function Home() {
	const { foodList, isLoading } = useSelector((state) => state.food);
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const DV = {
		calories: 2000,
		protein: 50,
		carbohydrates: 275,
		sugar: 50,
		fiber: 28,
		total_lipids: 78,
		saturated_fats: 20,
		cholesterol: 300,
		vitamin_A: 900,
		vitamin_B1: 1.2,
		vitamin_B2: 1.3,
		vitamin_B3: 16,
		vitamin_B5: 5,
		vitamin_B6: 1.7,
		vitamin_B9: 400,
		vitamin_B12: 2.4,
		vitamin_C: 90,
		vitamin_D: 20,
		vitamin_E: 15,
		vitamin_K: 120,
		sodium: 2300,
		potassium: 4700,
		calcium: 1300,
		magnesium: 420,
		iron: 18,
		zinc: 11,
	};

	useEffect(() => {
		dispatch(getFoods());

		return () => {
			dispatch(resetFood());
		};
	}, [dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<section className="heading">
				Welcome to NutriTracker, {user.name}
			</section>

			<Link to="/search" className="btn btn-block">
				Click here to search for a food!
			</Link>
			<h2>Here is your nutritional overview</h2>
			<Grid container spacing={2}>
				<Grid xs={6}>
					<Box sx={{ fontSize: "18px" }}>
						<h3>Proximates</h3>
						<p>
							<span>Calories: </span>
							<span
								style={{
									color:
										(foodList === null
											? 0
											: foodList.reduce((acc, item) => acc + item.calories, 0)
										).toFixed(2) > DV.calories
											? "red"
											: "yellow",
								}}
							>
								{foodList === null
									? 0
									: foodList
											.reduce((acc, item) => {
												return acc + item.calories;
											}, 0)
											.toFixed(2)}{" "}
							</span>
							/ {DV.calories} kcal
						</p>
						<p>
							<span>Protein: </span>
							<span
								style={{
									color:
										(foodList === null
											? 0
											: foodList.reduce((acc, item) => acc + item.protein, 0)
										).toFixed(2) > DV.protein
											? "green"
											: "yellow",
								}}
							>
								{foodList === null
									? 0
									: foodList
											.reduce((acc, item) => {
												return acc + item.protein;
											}, 0)
											.toFixed(2)}{" "}
							</span>
							/ {DV.protein} g
						</p>
						<p>
							<span>Carbohydrates: </span>
							<span
								style={{
									color:
										(foodList === null
											? 0
											: foodList.reduce(
													(acc, item) => acc + item.carbohydrates,
													0
											  )
										).toFixed(2) > DV.carbohydrates
											? "red"
											: "yellow",
								}}
							>
								{foodList === null
									? 0
									: foodList
											.reduce((acc, item) => {
												return acc + item.carbohydrates;
											}, 0)
											.toFixed(2)}{" "}
							</span>
							/ {DV.carbohydrates} g
						</p>
						<p>
							<span>Sugar: </span>
							<span
								style={{
									color:
										(foodList === null
											? 0
											: foodList.reduce((acc, item) => acc + item.sugar, 0)
										).toFixed(2) > DV.sugar
											? "red"
											: "yellow",
								}}
							>
								{foodList === null
									? 0
									: foodList
											.reduce((acc, item) => {
												return acc + item.sugar;
											}, 0)
											.toFixed(2)}{" "}
							</span>
							/ {DV.sugar} g
						</p>
						<p>
							<span>Fiber: </span>
							<span
								style={{
									color:
										(foodList === null
											? 0
											: foodList.reduce(
													(acc, item) => acc + item.total_lipids,
													0
											  )
										).toFixed(2) > DV.total_lipids
											? "green"
											: "yellow",
								}}
							>
								{foodList === null
									? 0
									: foodList
											.reduce((acc, item) => {
												return acc + item.fiber;
											}, 0)
											.toFixed(2)}{" "}
							</span>
							/ {DV.fiber} g
						</p>
					</Box>
				</Grid>
				<Grid xs={6}>
					<Box sx={{ fontSize: "18px" }}>
						<h3>Lipids</h3>
						<p>
							<span>Total lipids (fat): </span>
							<span
								style={{
									color:
										(foodList === null
											? 0
											: foodList.reduce(
													(acc, item) => acc + item.total_lipids,
													0
											  )
										).toFixed(2) > DV.total_lipids
											? "green"
											: "yellow",
								}}
							>
								{foodList === null
									? 0
									: foodList
											.reduce((acc, item) => {
												return acc + item.total_lipids;
											}, 0)
											.toFixed(2)}{" "}
							</span>
							/ {DV.total_lipids} g
						</p>
						<p>
							<span>Saturated fats: </span>
							<span
								style={{
									color:
										(foodList === null
											? 0
											: foodList.reduce(
													(acc, item) => acc + item.saturated_fats,
													0
											  )
										).toFixed(2) > DV.saturated_fats
											? "red"
											: "yellow",
								}}
							>
								{foodList === null
									? 0
									: foodList
											.reduce((acc, item) => {
												return acc + item.saturated_fats;
											}, 0)
											.toFixed(2)}{" "}
							</span>
							/ {DV.saturated_fats} g
						</p>
						<p>
							<span>Monounsaturated fats: </span>
							<span>
								{foodList === null
									? 0
									: foodList
											.reduce((acc, item) => {
												return acc + item.monounsaturated_fats;
											}, 0)
											.toFixed(2)}{" "}
							</span>
							g
						</p>
						<p>
							<span>Polyunsaturated fats: </span>
							<span>
								{foodList === null
									? 0
									: foodList
											.reduce((acc, item) => {
												return acc + item.polyunsaturated_fats;
											}, 0)
											.toFixed(2)}{" "}
							</span>
							g
						</p>
						<p>
							<span>Trans fats: </span>
							<span>
								{foodList === null
									? 0
									: foodList
											.reduce((acc, item) => {
												return acc + item.trans_fats;
											}, 0)
											.toFixed(2)}{" "}
							</span>
							g
						</p>
						<p>
							<span>Cholesterol: </span>
							<span
								style={{
									color:
										(foodList === null
											? 0
											: foodList.reduce(
													(acc, item) => acc + item.cholesterol,
													0
											  )
										).toFixed(2) > DV.cholesterol
											? "red"
											: "yellow",
								}}
							>
								{foodList === null
									? 0
									: foodList
											.reduce((acc, item) => {
												return acc + item.cholesterol;
											}, 0)
											.toFixed(2)}{" "}
							</span>
							/ {DV.cholesterol} mg
						</p>
					</Box>
				</Grid>
				<Grid xs={4}>
					<Box sx={{ fontSize: "16px" }}>
						<h3>Vitamins</h3>
						<p>
							<span>A (Retinol): </span>
							<span
								style={{
									color:
										(foodList === null
											? 0
											: foodList.reduce((acc, item) => acc + item.vitamin_A, 0)
										).toFixed(2) > DV.vitamin_A
											? "green"
											: "yellow",
								}}
							>
								{foodList === null
									? 0
									: foodList
											.reduce((acc, item) => {
												return acc + item.vitamin_A;
											}, 0)
											.toFixed(2)}{" "}
							</span>
							/ {DV.vitamin_A} RAE
						</p>
						<p>
							<span>B1 (Thiamin): </span>
							<span
								style={{
									color:
										(foodList === null
											? 0
											: foodList.reduce((acc, item) => acc + item.vitamin_B1, 0)
										).toFixed(2) > DV.vitamin_B1
											? "green"
											: "yellow",
								}}
							>
								{foodList === null
									? 0
									: foodList
											.reduce((acc, item) => {
												return acc + item.vitamin_B1;
											}, 0)
											.toFixed(2)}{" "}
							</span>
							/ {DV.vitamin_B1} mg
						</p>
						<p>
							<span>B2 (Riboflavin): </span>
							<span
								style={{
									color:
										(foodList === null
											? 0
											: foodList.reduce((acc, item) => acc + item.vitamin_B2, 0)
										).toFixed(2) > DV.vitamin_B2
											? "green"
											: "yellow",
								}}
							>
								{foodList === null
									? 0
									: foodList
											.reduce((acc, item) => {
												return acc + item.vitamin_B2;
											}, 0)
											.toFixed(2)}{" "}
							</span>
							/ {DV.vitamin_B2} mg
						</p>
						<p>
							<span>B3 (Niacin): </span>
							<span
								style={{
									color:
										(foodList === null
											? 0
											: foodList.reduce((acc, item) => acc + item.vitamin_B3, 0)
										).toFixed(2) > DV.vitamin_B3
											? "green"
											: "yellow",
								}}
							>
								{foodList === null
									? 0
									: foodList
											.reduce((acc, item) => {
												return acc + item.vitamin_B3;
											}, 0)
											.toFixed(2)}{" "}
							</span>
							/ {DV.vitamin_B3} mg
						</p>
						<p>
							<span>B5 (Pantothenic acid): </span>
							<span
								style={{
									color:
										(foodList === null
											? 0
											: foodList.reduce((acc, item) => acc + item.vitamin_B5, 0)
										).toFixed(2) > DV.vitamin_B5
											? "green"
											: "yellow",
								}}
							>
								{foodList === null
									? 0
									: foodList
											.reduce((acc, item) => {
												return acc + item.vitamin_B5;
											}, 0)
											.toFixed(2)}{" "}
							</span>
							/ {DV.vitamin_B5} mg
						</p>
						<p>
							<span>B6 (Pyridoxine): </span>
							<span
								style={{
									color:
										(foodList === null
											? 0
											: foodList.reduce((acc, item) => acc + item.vitamin_B6, 0)
										).toFixed(2) > DV.vitamin_B6
											? "green"
											: "yellow",
								}}
							>
								{foodList === null
									? 0
									: foodList
											.reduce((acc, item) => {
												return acc + item.vitamin_B6;
											}, 0)
											.toFixed(2)}{" "}
							</span>
							/ {DV.vitamin_B6} mg
						</p>
					</Box>
				</Grid>
				<Grid xs={4}>
					<Box sx={{ fontSize: "16px" }}>
						<h3>Vitamins cont'd</h3>
						<p>
							<span>B9 (Folate): </span>
							<span
								style={{
									color:
										(foodList === null
											? 0
											: foodList.reduce((acc, item) => acc + item.vitamin_B9, 0)
										).toFixed(2) > DV.vitamin_B9
											? "green"
											: "yellow",
								}}
							>
								{foodList === null
									? 0
									: foodList
											.reduce((acc, item) => {
												return acc + item.vitamin_B9;
											}, 0)
											.toFixed(2)}{" "}
							</span>
							/ {DV.vitamin_B9} µg
						</p>
						<p>
							<span>B12 (Cobalamin): </span>
							<span
								style={{
									color:
										(foodList === null
											? 0
											: foodList.reduce(
													(acc, item) => acc + item.vitamin_B12,
													0
											  )
										).toFixed(2) > DV.vitamin_B12
											? "green"
											: "yellow",
								}}
							>
								{foodList === null
									? 0
									: foodList
											.reduce((acc, item) => {
												return acc + item.vitamin_B12;
											}, 0)
											.toFixed(2)}{" "}
							</span>
							/ {DV.vitamin_B12} µg
						</p>
						<p>
							<span>C (Ascorbic acid): </span>
							<span
								style={{
									color:
										(foodList === null
											? 0
											: foodList.reduce((acc, item) => acc + item.vitamin_C, 0)
										).toFixed(2) > DV.vitamin_C
											? "green"
											: "yellow",
								}}
							>
								{foodList === null
									? 0
									: foodList
											.reduce((acc, item) => {
												return acc + item.vitamin_C;
											}, 0)
											.toFixed(2)}{" "}
							</span>
							/ {DV.vitamin_C} mg
						</p>
						<p>
							<span>D (D2 + D3): </span>
							<span
								style={{
									color:
										(foodList === null
											? 0
											: foodList.reduce((acc, item) => acc + item.vitamin_D, 0)
										).toFixed(2) > DV.vitamin_D
											? "green"
											: "yellow",
								}}
							>
								{foodList === null
									? 0
									: foodList
											.reduce((acc, item) => {
												return acc + item.vitamin_D;
											}, 0)
											.toFixed(2)}{" "}
							</span>
							/ {DV.vitamin_D} IU
						</p>
						<p>
							<span>E (alpha-tocopherol): </span>
							<span
								style={{
									color:
										(foodList === null
											? 0
											: foodList.reduce((acc, item) => acc + item.vitamin_E, 0)
										).toFixed(2) > DV.vitamin_E
											? "green"
											: "yellow",
								}}
							>
								{foodList === null
									? 0
									: foodList
											.reduce((acc, item) => {
												return acc + item.vitamin_E;
											}, 0)
											.toFixed(2)}{" "}
							</span>
							/ {DV.vitamin_E} mg
						</p>
						<p>
							<span>K (phylloquinone): </span>
							<span
								style={{
									color:
										(foodList === null
											? 0
											: foodList.reduce((acc, item) => acc + item.vitamin_K, 0)
										).toFixed(2) > DV.vitamin_K
											? "green"
											: "yellow",
								}}
							>
								{foodList === null
									? 0
									: foodList
											.reduce((acc, item) => {
												return acc + item.vitamin_K;
											}, 0)
											.toFixed(2)}{" "}
							</span>
							/ {DV.vitamin_K} µg
						</p>
					</Box>
				</Grid>
				<Grid xs={4}>
					<Box sx={{ fontSize: "16px" }}>
						<h3>Minerals</h3>
						<p>
							<span>Sodium: </span>
							<span
								style={{
									color:
										(foodList === null
											? 0
											: foodList.reduce((acc, item) => acc + item.sodium, 0)
										).toFixed(2) > DV.sodium
											? "red"
											: "yellow",
								}}
							>
								{foodList === null
									? 0
									: foodList
											.reduce((acc, item) => {
												return acc + item.sodium;
											}, 0)
											.toFixed(2)}{" "}
							</span>
							/ {DV.sodium} mg
						</p>
						<p>
							<span>Potassium: </span>
							<span
								style={{
									color:
										(foodList === null
											? 0
											: foodList.reduce((acc, item) => acc + item.potassium, 0)
										).toFixed(2) > DV.potassium
											? "green"
											: "yellow",
								}}
							>
								{foodList === null
									? 0
									: foodList
											.reduce((acc, item) => {
												return acc + item.potassium;
											}, 0)
											.toFixed(2)}{" "}
							</span>
							/ {DV.potassium} mg
						</p>
						<p>
							<span>Calcium: </span>
							<span
								style={{
									color:
										(foodList === null
											? 0
											: foodList.reduce((acc, item) => acc + item.calcium, 0)
										).toFixed(2) > DV.calcium
											? "green"
											: "yellow",
								}}
							>
								{foodList === null
									? 0
									: foodList
											.reduce((acc, item) => {
												return acc + item.calcium;
											}, 0)
											.toFixed(2)}{" "}
							</span>
							/ {DV.calcium} g
						</p>
						<p>
							<span>Magnesium: </span>
							<span
								style={{
									color:
										(foodList === null
											? 0
											: foodList.reduce((acc, item) => acc + item.magnesium, 0)
										).toFixed(2) > DV.magnesium
											? "green"
											: "yellow",
								}}
							>
								{foodList === null
									? 0
									: foodList
											.reduce((acc, item) => {
												return acc + item.magnesium;
											}, 0)
											.toFixed(2)}{" "}
							</span>
							/ {DV.magnesium} mg
						</p>
						<p>
							<span>Iron: </span>
							<span
								style={{
									color:
										(foodList === null
											? 0
											: foodList.reduce((acc, item) => acc + item.iron, 0)
										).toFixed(2) > DV.iron
											? "green"
											: "yellow",
								}}
							>
								{foodList === null
									? 0
									: foodList
											.reduce((acc, item) => {
												return acc + item.iron;
											}, 0)
											.toFixed(2)}{" "}
							</span>
							/ {DV.iron} mg
						</p>
						<p>
							<span>Zinc: </span>
							<span
								style={{
									color:
										(foodList === null
											? 0
											: foodList.reduce((acc, item) => acc + item.zinc, 0)
										).toFixed(2) > DV.zinc
											? "green"
											: "yellow",
								}}
							>
								{foodList === null
									? 0
									: foodList
											.reduce((acc, item) => {
												return acc + item.zinc;
											}, 0)
											.toFixed(2)}{" "}
							</span>
							/ {DV.zinc} mg
						</p>
					</Box>
				</Grid>
			</Grid>
			<div className="container">
				<h2>Here are all of your foods</h2>
			</div>
			{foodList === null ? (
				<></>
			) : (
				foodList.map((item) => {
					return (
						<p key={item._id}>
							<Link to={`/myFoods/${item._id}`} className="underline-link">
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
