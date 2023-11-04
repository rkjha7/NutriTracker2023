import { Link } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";

function Home() {
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
					<p>Calories: kcal</p>
					<p>Protein: g</p>
					<p>Carbohydrates: g</p>
					<p>Sugar: g</p>
					<p>Fiber: g</p>
				</Grid>
				<Grid xs={6}>
					<h3>Lipids</h3>
					<p>Total lipids (fat): g</p>
					<p>Saturated fats: g</p>
					<p>Monounsaturated fats: g</p>
					<p>Polyunsaturated fats: g</p>
					<p>Trans fats: g</p>
					<p>Cholesterol: mg</p>
				</Grid>
				<Grid xs={4}>
					<h3>Vitamins</h3>
					<p>A (Retinol): IU</p>
					<p>B1 (Thiamin): mg</p>
					<p>B2 (Riboflavin): mg</p>
					<p>B3 (Niacin): mg</p>
					<p>B5 (Pantothenic acid): mg</p>
					<p>B6 (Pyridoxine): mg</p>
				</Grid>
				<Grid xs={4}>
					<h3>Vitamins cont'd</h3>
					<p>B9 (Folate): µg</p>
					<p>B12 (Cobalamin): µg</p>
					<p>C (Ascorbic acid): mg</p>
					<p>D (D2 + D3): IU</p>
					<p>E (alpha-tocopherol): mg</p>
					<p>K (phylloquinone): µg</p>
				</Grid>
				<Grid xs={4}>
					<h3>Minerals</h3>
					<p>Sodium: mg</p>
					<p>Potassium: mg</p>
					<p>Calcium: g</p>
					<p>Magnesium: mg</p>
					<p>Iron: mg</p>
					<p>Zinc: mg</p>
				</Grid>
			</Grid>
		</>
	);
}

export default Home;
