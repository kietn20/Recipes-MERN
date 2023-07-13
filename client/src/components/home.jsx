import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";
import { APIurl } from "../App";
import "./home.css";
import { spoonRecipes } from "./featuredRecipes";
import { BiLike } from "react-icons/bi";
import popularRecipes from "./data.json";

const APIkey = import.meta.env.VITE_SPOONKEY;
// const recipesInfo = await spoonRecipes();
const recipesInfo = popularRecipes;
console.log(recipesInfo)

export const Home = () => {
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
			console.log(response);
			console.log(response.data);
			setSavedRecipes(response.data.savedRecipes);
		} catch (err) {
			console.err(err);
			console.err("!!!!!!!!!!!!!!!saveRecipe error");
		}
	};

	const isRecipeSaved = (id) => savedRecipes.includes(id);

	return (
		<div className="home">
			<div className="popularDiv">
				<h1 className="popular-title">Popular Recipes</h1>
				<div className="popular-recipes">
					<div className="popular-big">
						<a
							href="https://www.vickypham.com/blog/vietnamese-beef-noodle-soup-pho-bo"
							target="_blank"
						>
							<img
								src="https://hips.hearstapps.com/hmg-prod/images/instant-pot-pho-1-1649171262.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*"
								alt="pho bo"
							/>
							<h1>Phở Bò (Vietnamese Beef Noodle Soup) </h1>
						</a>
					</div>
					<div className="popular-side">
						{Object.keys(recipesInfo).map((key, i) => (
							<a
								href={recipesInfo[key].sourceUrl}
								key={i}
								target="_blank"
							>
								<div>
									<img
										src={recipesInfo[key].image}
										alt={recipesInfo[key].title}
									/>
									<div className="popular-side-description">
										<h1>{recipesInfo[key].title}</h1>
										<div className="popular-side-facts">
											<div className="popular-side-likes">
												<BiLike />
												<h5>
													&nbsp;
													{
														recipesInfo[key]
															.aggregateLikes.toLocaleString("en-US")
													}
												</h5>
											</div>
											<h5>
												Ready in&nbsp;
												{
													recipesInfo[key]
														.readyInMinutes
												}
												&nbsp;minutes
											</h5>
										</div>
									</div>
								</div>
							</a>
						))}
					</div>
				</div>
			</div>
			<ul>
				{recipes.map((recipe) => (
					<li className="recipeItem" key={recipe._id}>
						<div>
							<h2>{recipe.name}</h2>
							<button
								onClick={() => saveRecipe(recipe._id)}
								disabled={isRecipeSaved(recipe._id)}
							>
								{isRecipeSaved(recipe._id) ? "Saved" : "Save"}
							</button>
						</div>
						<div>
							<p>{recipe.instructions}</p>
						</div>
						<img src={recipe.imageUrl} alt={recipe.name} />
						<p>Cooking Time: {recipe.cookingTime} (minutes)</p>
					</li>
				))}
			</ul>
		</div>
	);
};
