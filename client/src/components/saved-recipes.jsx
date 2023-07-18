import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { APIurl } from "../App";
import { Navbar } from "./navbar";

export const SavedRecipes = () => {
	const [savedRecipes, setSavedRecipes] = useState([]);
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

		fetchSavedRecipe();
	}, []);

	return (
		<div>
			<Navbar />
			<h1>Saved Recipes</h1>
			{savedRecipes ? (
				<ul>
					{savedRecipes.map((recipe) => (
						<li key={recipe._id}>
							<div>
								<h2>{recipe.name}</h2>
							</div>
							<div>
								<p>{recipe.instructions}</p>
							</div>
							<img src={recipe.imageUrl} alt={recipe.name} />
							<p>Cooking Time: {recipe.cookingTime} (minutes)</p>
						</li>
					))}
				</ul>
			) : (
				<h1>No current saved recipes</h1>
			)}
		</div>
	);
};
