import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { APIurl } from "../App";
import "./login.css";

export const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [_, setCookies] = useCookies(["access_token"]);

	const navigate = useNavigate();

	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post(`${APIurl}/auth/login`, {
				username,
				password,
			});

			setCookies("access_token", response.data.token);
			window.localStorage.setItem("userID", response.data.userID);
			navigate("/");
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="login-container">
			<div className="login-leftside">
				<img src="./loginIMG.jpg" alt="" />
			</div>
			<div className="login-form">
				<Link to="/">
					<img src="./cooked-logo.png" alt="logo1" />
				</Link>
				<form onSubmit={onSubmit}>
					<h1>Log in</h1>
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
