import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Search from "./pages/Search";
import FoodDetails from "./pages/FoodDetails";

function App() {
	return (
		<>
			<Router>
				<div className="container">
					<Header />
					<Routes>
						<Route path="/" element={<PrivateRoute />}>
							<Route path="/" element={<Home />} />
						</Route>
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
						<Route path="/search" element={<PrivateRoute />}>
							<Route path="/search" element={<Search />}></Route>
						</Route>
						<Route path="/foodDetails/:fdcId" element={<PrivateRoute />}>
							<Route
								path="/foodDetails/:fdcId"
								element={<FoodDetails />}
							></Route>
						</Route>
					</Routes>
				</div>
			</Router>
			<ToastContainer />
		</>
	);
}

export default App;
