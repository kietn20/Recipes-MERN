import { Navbar } from "./navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";
import { APIurl } from "../App";
import "./home.css";
import { spoonRecipes } from "./featuredRecipes";
import { BiLike } from "react-icons/bi";
import popularRecipes from "../api/popular.json";
import breakfast from "../api/breakfast.json";
import mainCourse from "../api/mainCourse.json";
import desserts from "../api/dessert.json";
import { Footer } from "./footer";
import { BsBookmark, BsBookmarkCheckFill } from "react-icons/bs";
import ScaleLoader from "react-spinners/ScaleLoader";

const APIkey = import.meta.env.VITE_SPOONKEY;

const recipesInfo = popularRecipes;
const breakfastRecipes = breakfast.results;
const mainCourseRecipes = mainCourse.results;
const dessertRecipes = desserts.results;

export const Home = () => {
	const [recipes, setRecipes] = useState([]);
	const [savedRecipes, setSavedRecipes] = useState([]);
	const [cookies, _] = useCookies(["access_token"]);
	const [loading, setLoading] = useState(false);

	const userID = useGetUserID();

	useEffect(() => {
		setLoading(true);
		setInterval(() => {
			setLoading(false);
		}, 33000);

		const fetchRecipe = async () => {
			try {
				const response = await axios.get(`${APIurl}/recipes`);
				setRecipes(response.data);
			} catch (err) {
				console.err(err);
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
			setSavedRecipes(response.data.savedRecipes);
		} catch (err) {
			console.err(err);
		}
	};

	const isRecipeSaved = (id) => savedRecipes.includes(id);

	return (
		<div>
			<Navbar />
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
														{recipesInfo[
															key
														].aggregateLikes.toLocaleString(
															"en-US"
														)}
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
				<div className="six-recipes-section">
					<h1 className="title">Breakfast</h1>
					<div className="six-recipes-section-display">
						{Object.keys(breakfastRecipes.slice(0, 6)).map(
							(key, i) => (
								<a
									href={breakfastRecipes[key].sourceUrl}
									key={i}
									target="_blank"
								>
									<div className="six-recipes-section-item">
										<img
											src={breakfastRecipes[key].image}
											alt={breakfastRecipes[key].title}
										/>
										<div className="six-recipes-section-description">
											<h4>
												{breakfastRecipes[key].title}
											</h4>
											<h5>
												Ready in&nbsp;
												{
													breakfastRecipes[key]
														.readyInMinutes
												}
												&nbsp;minutes
											</h5>
										</div>
									</div>
								</a>
							)
						)}
					</div>
				</div>
				<div className="six-recipes-section">
					<h1 className="title">Meals</h1>
					<div className="six-recipes-section-display">
						{Object.keys(mainCourseRecipes.slice(0, 6)).map(
							(key, i) => (
								<a
									href={mainCourseRecipes[key].sourceUrl}
									key={i}
									target="_blank"
								>
									<div className="six-recipes-section-item">
										<img
											src={mainCourseRecipes[key].image}
											alt={mainCourseRecipes[key].title}
										/>
										<div className="six-recipes-section-description">
											<h4>
												{mainCourseRecipes[key].title}
											</h4>
											<h5>
												Ready in&nbsp;
												{
													mainCourseRecipes[key]
														.readyInMinutes
												}
												&nbsp;minutes
											</h5>
										</div>
									</div>
								</a>
							)
						)}
					</div>
				</div>
				<div className="six-recipes-section">
					<h1 className="title">Desserts</h1>
					<div className="six-recipes-section-display">
						{Object.keys(dessertRecipes.slice(0, 6)).map(
							(key, i) => (
								<a
									href={dessertRecipes[key].sourceUrl}
									key={i}
									target="_blank"
								>
									<div className="six-recipes-section-item">
										<img
											src={dessertRecipes[key].image}
											alt={dessertRecipes[key].title}
										/>
										<div className="six-recipes-section-description">
											<h4>{dessertRecipes[key].title}</h4>
											<h5>
												Ready in&nbsp;
												{
													dessertRecipes[key]
														.readyInMinutes
												}
												&nbsp;minutes
											</h5>
										</div>
									</div>
								</a>
							)
						)}
					</div>
				</div>
				<div className="usersRecipes">
					<h1>User Created Recipes</h1>
					{loading ? (
						<ScaleLoader
							className="loader"
							color={"#fc4400"}
							loading={loading}
							size={40}
						/>
					) : (
						<ul>
							{recipes.slice(0, 6).map((recipe) => (
								<li className="recipeItem" key={recipe._id}>
									{isRecipeSaved(recipe._id) ? (
										<h2 className="underline">
											<a href="#">{recipe.name}</a>
											<BsBookmarkCheckFill className="recipeItem-filledButton" />
										</h2>
									) : (
										<h2>
											<a href="#" className="underline">
												{recipe.name}
											</a>
											<button
												className="recipeItem-emptyButton"
												onClick={() =>
													saveRecipe(recipe._id)
												}
												disabled={isRecipeSaved(
													recipe._id
												)}
											>
												<BsBookmark />
											</button>
										</h2>
									)}
									<div>
										<p>{recipe.instructions}</p>
									</div>
									<img
										src={recipe.imageUrl}
										alt={recipe.name}
									/>
									<p>
										Cooking Time: {recipe.cookingTime}{" "}
										(minutes)
									</p>
								</li>
							))}
						</ul>
					)}
				</div>
				<Footer />
			</div>
		</div>
	);
};
