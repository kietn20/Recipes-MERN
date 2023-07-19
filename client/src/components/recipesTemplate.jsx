import { Footer } from "./footer";
import { useLocation } from "react-router-dom";
import "./recipesTemplate.css";
import { Navbar } from "./navbar";

export const RecipesTemplate = () => {
	const location = useLocation();
	const obj = location.state[0].results;
	console.log(location.state[0]);
	return (
		<div className="wrapper">
			<Navbar />
			<h1 className="title">{location.state[1]}</h1>
			<div className="wrapper-display">
				{Object.keys(obj).map((key, i) => (
					<a href={obj[key].sourceUrl} key={i} target="_blank">
						<div className="wrapper-item">
							<img src={obj[key].image} alt={obj[key].title} />
							<div className="wrapper-description">
								<h4>{obj[key].title}</h4>
								<h5>
									Ready in&nbsp;
									{obj[key].readyInMinutes}
									&nbsp;minutes
								</h5>
							</div>
						</div>
					</a>
				))}
			</div>
			<Footer />
		</div>
	);
};
