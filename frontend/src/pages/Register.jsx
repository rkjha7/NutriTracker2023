import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";

import Spinner from "../components/Spinner";

function Register() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		passwordCheck: "",
	});

	const { name, email, password, passwordCheck } = formData;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { isLoading } = useSelector((state) => state.auth);

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();

		if (password !== passwordCheck) {
			toast.error("Passwords do not match");
		} else {
			const userData = {
				name,
				email,
				password,
			};

			//We unwrap the AsyncThunkAction to navigate the user after a good response from our API
			//Or we catch the AsyncThunkAction rejection to show an error message
			dispatch(register(userData))
				.unwrap()
				.then((user) => {
					toast.success(`Registered new user - ${user.name}`);
					navigate("/");
				})
				.catch(toast.error);
		}
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<section className="heading">
				<h1>
					<FaUser /> User Registration
				</h1>
				<p>Create an account and start tracking your nutrition!</p>
			</section>

			<section className="form">
				<form onSubmit={onSubmit}>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							id="name"
							name="name"
							value={name}
							onChange={onChange}
							placeholder="Enter your name"
							required
						/>
					</div>
					<div className="form-group">
						<input
							type="email"
							className="form-control"
							id="email"
							name="email"
							value={email}
							onChange={onChange}
							placeholder="Enter your email"
							required
						/>
					</div>
					<div className="form-group">
						<input
							type="password"
							className="form-control"
							id="password"
							name="password"
							value={password}
							onChange={onChange}
							placeholder="Enter your password"
							required
						/>
					</div>
					<div className="form-group">
						<input
							type="password"
							className="form-control"
							id="passwordCheck"
							name="passwordCheck"
							value={passwordCheck}
							onChange={onChange}
							placeholder="Confirm password"
							required
						/>
					</div>
					<div className="form-group">
						<button className="btn btn-block">Submit</button>
					</div>
				</form>
			</section>
		</>
	);
}

export default Register;
