# SpotFinder
Share your favorite skate spots with friends!

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Todos](#todo)


## General info
A web app where users can create an account to share their favorite skate spots on a map. Use map to zoom into a location, double-click to drop pin.  Add details to posted spots, such as rating, bust-factor, and comments.
	
## Technologies

### Server:
* MongoDB
* Apollo-Server
* GraphQL
* JWT
* Argon2 Encryption

### Client:
* React / React-Router
* Apollo-Client
* Semantic UI
* Mapbox

	
## Setup
To run this project, install it locally using npm:

```
$ cd SpotFinderApp
$ npm install
$ npm start
```

Add your MongoDB credentials in config.js:

```
module.exports = {
  MONGODB: { YOUR_DB_HERE },
  SECRET_KEY: { YOUR_SECRET_KEY },
};

```

## TODO
* Profile Pages
* Address Searches
* Public / Private Groups
* Friend requests
* Image / video Uploads
* Delete Spots
