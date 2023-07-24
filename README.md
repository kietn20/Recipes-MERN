# [Recipes-MERN](https://cookedrecipes.vercel.app/)

Welcome to "Cooked" - a culinary haven where flavors come to life! At Cooked, we believe that cooking is an experience that should be both enjoyable and rewarding. Our recipe page is a carefully curated collection of mouthwatering dishes designed to inspire food lovers of all levels. From simple weeknight dinners to decadent desserts and everything in between, our diverse range of cuisines caters to various tastes and dietary preferences. Happy cooking or get cooked!

## Description

A recipe web application built with the MERN stack: 
* M - MongoDB (Database)
* E - Express (Framework for building RESTful APIs for Node.js)
* R -  React.js (Frontend Framework)
* N - Node.js (Run-time environment for creating server-side web applications)

Frontend: An interactive and responsive web application that relies on Spoonacular's food API for fetch recipes

Backend: RESTful API that utilized CRUD operations for configuring data in MongoDB database. Can fetch data with URI HTTP requests. 

# Demo: https://cookedrecipes.vercel.app/

## Getting Started

### Dependencies

#### Frontend/Client ---

dependencies: 
* @emailjs/browser
* axios
* dotenv
* react
* react-cookie
* react-dom
* react-icons
* react-router-dom
* react-spinners
  
devDependencies
* @types/react
* @types/react-dom
* @vitejs/plugin-react
* eslint
* eslint-plugin-react
* eslint-plugin-react-hooks
* eslint-plugin-react-refresh
* vite


#### Backend/Server ---

dependencies:
* bcrypt
* cors
* dotenv
* express
* jsonwebtoken
* mongodb
* mongoose

devDependencies:
* nodemon

### Installing

* Download repository
* 

### Executing program

* Create a Mongodb connection/database
* Use [Spoonacular](https://spoonacular.com/food-api) for fetching recipes APIs (Various pricing plans + rate limit) 
* Make Models for Users and Recipes
* Use axios for HTTP requests to backend API
* Add, commit, and push to Github for deployment

### Using Vite
```
$ npm create vite@latest
$ cd my-project
$ npm install
$ npm run dev
```

## Authors

Kiet Nguyen: 
* [LinkedIn](https://www.linkedin.com/in/kiet-nguyen-232458276/) 
* GMAIL: kietnguyen3698@gmail.com

## Version History
* 0.1
    * Initial Release

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
