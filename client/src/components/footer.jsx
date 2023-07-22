import Contact from "./Contact";

export const Footer = () => {
	return (
		<footer>
			<div className="footer-description">
				<h1>About</h1>
				<p>
					Welcome to "Cooked" - a culinary haven where flavors come to
					life! At Cooked, we believe that cooking is an experience
					that should be both enjoyable and rewarding. Our recipe page
					is a carefully curated collection of mouthwatering dishes
					designed to inspire food lovers of all levels. From simple
					weeknight dinners to decadent desserts and everything in
					between, our diverse range of cuisines caters to various
					tastes and dietary preferences. Happy cooking or get cooked!
				</p>
			</div>
			<div>
				<Contact />
			</div>
		</footer>
	);
};
