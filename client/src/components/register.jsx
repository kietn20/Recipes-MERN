import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { APIurl } from "../App";
import "./register.css"

export const Register = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			await axios.post(`${APIurl}/auth/register`, {
				username,
				password,
			});
			alert("Registration Complete! Now Login.");
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="register-container">
			<form onSubmit={onSubmit}>
				<h1>Register</h1>
				<div className="form-group">
					<label htmlFor="username">Username:</label>
					<input
						type="text"
						id="username"
						value={username}
						onChange={(event) => setUsername(event.target.value)}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
				</div>
				<button type="submit">Register</button>
			</form>
		</div>
	);
};