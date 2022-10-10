## Online Cars Selling Website -[Live Site ](https://team-speed.herokuapp.com/)

## Char pahiya (MERN stack) - [YT Link](https://www.youtube.com/watch?v=k_6blV_VWxk&t=39s)

<div align="center">
  <img alt="Demo" src="/frontend/images/homepage.png" >
</div>

## Features

- Full featured shopping cart
- Category carousel
- Product Review and Rating
- Get products by category
- Google Authentication
- fb Authentication
- forget password(nodemailer)
- Google sign in
- Wishlist Product
- Product Modal
- Product pagination (Admin)
- Quick Product search feature
- User profile with Order Details
- Admin product management
- Admin Order details page
- Mark orders as delivered option
- Mark orders as Paid option
- Download Invoice
- cloudinary
- Checkout process (shipping, payment method, etc)
- paypal payment integration
- Almost all Device responsive

## Usage

### ES Modules in Node

We use ECMAScript Modules in the backend in this project. Be sure to have at least Node v14.6+ or you will need to add the "--experimental-modules" flag.

Also, when importing a file (not a package), be sure to add .js at the end or you will get a "module not found" error

You can also install and setup Babel if you would like

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = your paypal client id
CLOUD_NAME= cloudinary cloud name
CLOUD_API_KEY = cloudinary api key
CLOUD_API_SECRET= cloudinary api secret
GOOGLE_CLIENT_ID= your google client id
PASS=password of id for nodemailer (forget password)
```

Create a .env file in then frontend folder and add the following

```
REACT_APP_FACEBOOK_LOGIN=your fb client id
REACT_APP_GOOGLE_CLIENTID=your google client id
```


### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev
# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

There is a Heroku postbuild script, so if you push to Heroku, no need to build manually for deployment to Heroku

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import
# Destroy data
npm run data:destroy
```

