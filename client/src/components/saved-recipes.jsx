import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { APIurl } from "../App";
import { Navbar } from "./navbar";
import "./saved-recipes.css";
import { BsFillBookmarkDashFill } from "react-icons/bs";

export const SavedRecipes = () => {
	const [savedRecipes, setSavedRecipes] = useState([]);
	const [cookies, _] = useCookies(["access_token"]);

	const userID = useGetUserID();

	useEffect(() => {
		const fetchSavedRecipe = async () => {
			try {
				const response = await axios.get(
					`${APIurl}/recipes/savedRecipes/${userID}`
				);
				setSavedRecipes(response.data.savedRecipes);
			} catch (err) {
				console.err(err);
			}
		};
		if (cookies.access_token) fetchSavedRecipe();
		else console.log("cookies bad");
	}, []);

	const isRecipeSaved = (id) => savedRecipes.includes(id);

	const removeSavedRecipe = async (recipeID) => {
		console.log(savedRecipes);
		try {
			const response = await axios.delete(
				`${APIurl}/recipes/savedRecipes/delete`,
				{
					recipeID: recipeID,
					userID: userID,
				}
			);
			console.log("response.data: " + response);
			setSavedRecipes(response.data.savedRecipes);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="savedRecipes-container">
			<Navbar />
			<h1>Saved Recipes</h1>
			{savedRecipes ? (
				<div>
					{savedRecipes.map((recipe) => (
						<div key={recipe._id} className="savedRecipeItem">
							<img src={recipe.imageUrl} alt={recipe.name} />
							<div className="savedRecipeItem-description">
								<div>
									<h2>{recipe.name}</h2>
									<button
										onClick={() =>
											removeSavedRecipe(recipe._id)
										}
										disabled={isRecipeSaved(recipe._id)}
									>
										<BsFillBookmarkDashFill />
									</button>
								</div>
								<p>
									Cooking Time: {recipe.cookingTime} (minutes)
								</p>
								<h3>Instructions</h3>
								<p>{recipe.instructions}</p>
								<h3>Ingredients</h3>
								<ul>
									{recipe.ingredients.map((ingredient) => (
										<li key={ingredient}>{ingredient}</li>
									))}
								</ul>
							</div>
						</div>
					))}
				</div>
			) : (
				<h2>No Recipes Saved</h2>
			)}
		</div>
	);
};
