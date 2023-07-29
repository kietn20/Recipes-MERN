import "/src/components/Contact.css";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
	const [sent, SetSent] = useState(false);
	const form = useRef();

	const sendEmail = (e) => {
		e.preventDefault();
		SetSent(!sent);

		emailjs
			.sendForm(
				"service_s6mhkte",
				"template_evpoxop",
				form.current,
				"hZxrxCACq8K6qUxwh"
			)
			.then(
				(result) => {
					console.log(result.text);
					console.log("SENT");
				},
				(error) => {
					console.log(error.text);
				}
			);
	};

	return (
		<div className="Contact-div">
			<div className="Contact-card">
				<img src="./contactavatar.png" alt="" />
				<form ref={form} onSubmit={sendEmail}>
					<h1 id="contact">Contact Me</h1>
					<label className="Contact-labels">Name*</label>
					<input type="text" name="user_name" placeholder="Bob" />
					<label>Email*</label>
					<input
						type="email"
						name="user_email"
						placeholder="bob@gmail.com"
					/>
					<label>Message*</label>
					<textarea
						name="message"
						placeholder="Hi, it's Bob. How are you doing..."
					/>
					<input
						className={sent ? "form-sent" : "form-send"}
						type="submit"
						value={sent ? "✓" : "Send Message"}
					/>
				</form>
			</div>
		</div>
	);
}


* M - MongoDB (Database)
* E - Express (Framework for building RESTful APIs for Node.js)
* R -  React.js (Frontend Framework)
* N - Node.js (Run-time environment for creating server-side web applications)
