import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { BackButton } from "../components/BackButton";
import Spinner from "../components/Spinner";

//for testing, using axios
import axios from "axios";

function Search() {
	const [searchFormData, setSearchFormData] = useState({
		foodQuery: "",
	});
	const [searchResultData, setSearchResultData] = useState([]);

	//API variables for local testing
	let api_res;
	const API_SEARCH_URL = "https://api.nal.usda.gov/fdc/v1/foods/search";
	const API_KEY_AND_QUERY =
		"?api_key=skcNCSLP0EVXvcojjRdiTO3bSMGm3r0F3LhWu7vm&query=";
	const API_TAIL =
		"&dataType=SR%20Legacy&pageSize=50&sortBy=dataType.keyword&sortOrder=asc";

	const { foodQuery } = searchFormData;

	const dispatch = useDispatch();

	const { isLoading } = useSelector((state) => state.auth);

	// Local testing search function
	const apiSearch = async (sq) => {
		api_res = await axios.get(
			API_SEARCH_URL + API_KEY_AND_QUERY + sq.toString() + API_TAIL
		);
		setSearchResultData(api_res.data.foods);
		return api_res.data.foods;
	};

	const onChange = (e) => {
		setSearchFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		const searchQuery = foodQuery;

		const res = await apiSearch(searchQuery);

		// TODO, dispatch a search action to load the search results into state
		// In the meantime, just do the API call here to see if it works

		//We unwrap the AsyncThunkAction to navigate the user after a good response from our API
		//Or we catch the AsyncThunkAction rejection to show an error message
		// dispatch(register(userData))
		// 	.unwrap()
		// 	.then((user) => {
		// 		toast.success(`Registered new user - ${user.name}`);
		// 		navigate("/");
		// 	})
		// 	.catch(toast.error);
	};

	//Testing onclick to see if it captures element field
	const onFoodClick = (e) => {
		console.log(e);
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<BackButton url="/"></BackButton>
			<section className="heading">
				<h1>Search for a food and start tracking your nutrition! </h1>
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
						<button className="btn btn-block">Submit</button>
					</div>
				</form>
			</section>
			{searchResultData === [] ? (
				<></>
			) : (
				searchResultData.map((item) => {
					return (
						<p key={item.fdcId}>
							<Link to={`/foodDetails/${item.fdcId}`}>{item.description}</Link>
						</p>
					);
				})
			)}
		</>
	);
}

export default Search;
