import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { APIurl } from "../App";
import "./register.css";

export const Register = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			await axios.post(`${APIurl}/auth/register`, {
				username,
				password,
			});
			alert("Registration Complete! Now Login.");
			navigate("/");
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="register-container">
			<div className="register-leftside">
				<img src="./registerIMG.jpg" alt="" />
			</div>
			<div className="register-form">
				<Link to="/">
					<img src="./cooked-logo.png" alt="logo1" />
				</Link>
				<form onSubmit={onSubmit}>
					<h1>Register</h1>
					<div className="form-group">
						<label htmlFor="username">Username:</label>
						<input
							type="text"
							id="username"
							value={username}
							onChange={(event) =>
								setUsername(event.target.value)
							}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password:</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(event) =>
								setPassword(event.target.value)
							}
						/>
					</div>
					<button type="submit">~ enter ~</button>
				</form>
			</div>
		</div>
	);
};
