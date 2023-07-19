import { Navbar } from "./navbar";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import { APIurl } from "../App";
import "./user-create-recipes.css";
import { BsBookmark, BsBookmarkCheckFill } from "react-icons/bs";

export const UserCreatedRecipes = () => {
	const [recipes, setRecipes] = useState([]);
	const [savedRecipes, setSavedRecipes] = useState([]);
	const [cookies, _] = useCookies(["access_token"]);

	const userID = useGetUserID();

	useEffect(() => {
		const fetchRecipe = async () => {
			try {
				const response = await axios.get(`${APIurl}/recipes`);
				setRecipes(response.data);
			} catch (err) {
				console.err(err);
				console.err("useEffect error");
			}
		};

		const fetchSavedRecipe = async () => {
			try {
				const response = await axios.get(
					`${APIurl}/recipes/savedRecipes/ids/${userID}`
				);
				setSavedRecipes(response.data.savedRecipes);
			} catch (err) {
				console.err(err);
				console.err("fetchSavedRecipe error");
			}
		};

		fetchRecipe();
		if (cookies.access_token) fetchSavedRecipe();
	}, []);

	const saveRecipe = async (recipeID) => {
		try {
			const response = await axios.put(
				`${APIurl}/recipes`,
				{
					recipeID,
					userID,
				},
				{ headers: { authorization: cookies.access_token } }
			);
			// console.log(response);
			// console.log(response.data);
			setSavedRecipes(response.data.savedRecipes);
		} catch (err) {
			console.err(err);
			console.err("!!!!!!!!!!!!!!!saveRecipe error");
		}
	};

	const isRecipeSaved = (id) => savedRecipes.includes(id);

	return (
		<div className="usersRecipes-container">
			<Navbar />
			<div className="usersRecipes">
				<h1>User Created Recipes</h1>
				<ul>
					{recipes.map((recipe) => (
						<li className="recipeItem" key={recipe._id}>
							<h2 className="underline">
								<a href="#">{recipe.name}</a>
							</h2>
							{isRecipeSaved(recipe._id) ? (
								<BsBookmarkCheckFill className="recipeItem-filledButton" />
							) : (
								<h2>
									<a href="#" className="underline">
										{recipe.name}
									</a>
									<button
										className="recipeItem-emptyButton"
										onClick={() => saveRecipe(recipe._id)}
										disabled={isRecipeSaved(recipe._id)}
									>
										<BsBookmark />
									</button>
								</h2>
							)}
							<div>
								<p>{recipe.instructions}</p>
							</div>
							<img src={recipe.imageUrl} alt={recipe.name} />
							<p>Cooking Time: {recipe.cookingTime} (minutes)</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
