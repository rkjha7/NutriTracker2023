import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

	//Todo, add dispatch + navigate

	//Todo, add isLoading

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		//Todo, add the rest
	};

	//Todo, add isLoading check

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
