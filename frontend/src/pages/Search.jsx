import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { BackButton } from "../components/BackButton";
import { searchFoods } from "../features/food/foodSlice";
import Spinner from "../components/Spinner";

function Search() {
	const [searchFormData, setSearchFormData] = useState({
		foodQuery: "",
	});
	const searchResultData = useSelector((state) => state.food.foodSearchResults);
	const dispatch = useDispatch();

	const { foodQuery } = searchFormData;

	const { isLoading } = useSelector((state) => state.food.isLoading);

	const onChange = (e) => {
		setSearchFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		dispatch(searchFoods(foodQuery));
	};

	return (
		<>
			<BackButton url="/"></BackButton>
			<section className="heading">
				<h1>Look up a food below</h1>
			</section>

			<section className="form">
				<form onSubmit={onSubmit}>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							id="foodQuery"
							name="foodQuery"
							value={foodQuery}
							onChange={onChange}
							placeholder="Enter your food search query here"
							required
						/>
					</div>
					<div className="form-group">
						<button className="btn btn-block">Search Foods</button>
					</div>
				</form>
			</section>
			{searchResultData === [] ? (
				<></>
			) : (
				searchResultData.map((item) => {
					return (
						<p key={item.fdcId}>
							<Link
								to={`/foodDetails/${item.fdcId}`}
								className="underline-link"
							>
								{item.description}
							</Link>
						</p>
					);
				})
			)}
		</>
	);
}

export default Search;
