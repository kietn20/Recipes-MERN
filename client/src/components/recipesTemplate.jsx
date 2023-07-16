import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { useLocation } from "react-router-dom";

export const RecipesTemplate = () => {
    const location = useLocation()
    const obj = location.state.dessertRecipes
    console.log(obj);
	return (
		<div>
			{Object.keys(obj).map((key, i) => (
				<a href={dessertRecipes[key].sourceUrl} key={i} target="_blank">
					<div className="breakfast-item">
						<img
							src={dessertRecipes[key].image}
							alt={dessertRecipes[key].title}
						/>
						<div className="breakfast-description">
							<h4>{dessertRecipes[key].title}</h4>
							<h5>
								Ready in&nbsp;
								{dessertRecipes[key].readyInMinutes}
								&nbsp;minutes
							</h5>
						</div>
					</div>
				</a>
			))}
			<Footer />
		</div>
	);
};
