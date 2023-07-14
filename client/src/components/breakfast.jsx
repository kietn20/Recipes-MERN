import axios from "axios";

const APIkey = import.meta.env.VITE_SPOONKEY;

export const Breakfast = async () => {
	let ids = "";
	try {
		const response = await axios.get(
			`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIkey}&type=breakfast&sort=popularity&number=6`
		);
		const popularBreakfast = response.data.results;
		popularBreakfast.map((recipe) => {
			ids = ids + "," + recipe.id;
		});

		const recipeInfos = await axios.get(
			`https://api.spoonacular.com/recipes/informationBulk?apiKey=${APIkey}&ids=${ids}`
		);
		return recipeInfos.data;
	} catch (err) {
		console.error("Error: Breakfast");
		console.error(err);
	}
};

// console.log(await Breakfast());