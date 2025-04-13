# Web Service Assignment 1

This is a full-stack web application developed for the COM4381 Web Services Technologies course (2nd Semester 2024/2025). The system allows users to fetch quotes, advice, and jokes from public APIs, and manage their personal favorites in a user-friendly interface.

## Features

- **User Authentication**: Users can register and log in.
- **Quotes**: 
  - Fetch paginated quotes from the FavQs API.
  - Add or remove quotes to/from favorites.
- **Advice**:
  - Get random advice.
  - Search advice using keywords.
  - Add or remove advice to/from favorites.
- **Jokes**:
  - Fetch a random dad joke.
  - Add or remove jokes to/from favorites.
- **Favorites Page**:
  - View and manage all favorite quotes, advice, and jokes.

## Public APIs Used

| API Name        | Description                          | Endpoint                                |
|-----------------|--------------------------------------|------------------------------------------|
| FavQs           | Provides a collection of quotes      | `https://favqs.com/api/quotes`           |
| Advice Slip     | Offers random or searchable advice   | `https://api.adviceslip.com/advice`      |
| icanhazdadjoke  | Returns a random dad joke            | `https://icanhazdadjoke.com/`            |

## 🔑 Key API Routes

| Feature            | Method   | Endpoint                                               | Description                             |
|--------------------|----------|--------------------------------------------------------|-----------------------------------------|
| **User**           |          |                                                        |                                         |
| Login              | POST     | `/api/login`                                           | Log in a user                           |
| Signup             | POST     | `/api/signup`                                          | Register a new user                     |
| Check Username     | GET      | `/api/check-username/:username`                        | Check if username exists                |
| Check Email        | GET      | `/api/check-email/:email`                              | Check if email exists                   |
| **Quotes**         |          |                                                        |                                         |
| Get Favorites      | GET      | `/api/users/:userId/favorites`                         | Get user's favorite quotes              |
| Add Quote          | POST     | `/api/users/:userId/favorites`                         | Add a quote to favorites                |
| Remove Quote       | DELETE   | `/api/users/:userId/favorites/:quoteId`                | Remove a quote from favorites           |
| Get Quote Details  | GET      | `/api/quotes/:quoteId`                                 | Get full quote details                  |
| Public Quotes API  | GET      | `https://favqs.com/api/quotes/?page=1` (via proxy)     | Fetch quotes from FavQs (public)        |
| **Advice**         |          |                                                        |                                         |
| Get Favorites      | GET      | `/api/users/:userId/favorite-advice`                   | Get user's favorite advice              |
| Add Advice         | POST     | `/api/users/:userId/favorite-advice`                   | Add advice to favorites                 |
| Remove Advice      | DELETE   | `/api/users/:userId/favorite-advice/:advice_id`        | Remove advice from favorites            |
| Get Advice Details | GET      | `/api/advice/:adviceId`                                | Get specific advice                     |
| Random Advice      | GET      | `https://api.adviceslip.com/advice`                    | Get a random advice (public)            |
| Search Advice      | GET      | `https://api.adviceslip.com/advice/search/:term`       | Search advice by keyword (public)       |
| **Jokes**          |          |                                                        |                                         |
| Random Joke        | GET      | `https://icanhazdadjoke.com/`                          | Fetch a random joke (public)            |
| Add Joke           | POST     | `/api/jokes/favorite`                                  | Add joke to user's favorites            |
| Get Favorites      | GET      | `/api/users/:userId/favorite-jokes`                    | Get user's favorite jokes               |
| Remove Joke        | DELETE   | `/api/users/:userId/favorite-jokes/:jokeId`            | Remove joke from favorites              |


API Functions (`api.js`)

| Function Name           | Description                                                    |
|-------------------------|----------------------------------------------------------------|
| `loginUser`             | Logs in a user using username and password                     |
| `signupUser`            | Registers a new user                                           |
| `checkUsernameExists`   | Checks if a username already exists in the database            |
| `checkEmailExists`      | Checks if an email is already registered                       |
| `getUserFavorites`      | Gets all favorite quotes of a user                             |
| `addFavoriteQuote`      | Adds a quote to the user's favorites                           |
| `removeFavoriteQuote`   | Removes a quote from the user's favorites                      |
| `getQuoteDetails`       | Retrieves details of a specific quote by ID                    |
| `fetchQuotesFromFavQs`  | Gets a list of quotes from the public FavQs API (paginated)    |
| `getFavoriteAdvice`     | Gets all favorite advice items for a user                      |
| `addFavoriteAdvice`     | Adds an advice item to the user's favorites                    |
| `removeFavoriteAdvice`  | Removes an advice item from the user's favorites               |
| `getAdviceDetails`      | Gets full text of a specific advice by ID                      |
| `fetchRandomAdvice`     | Fetches a random advice from the public AdviceSlip API         |
| `searchAdviceByTerm`    | Searches advice by a keyword from the public API               |
| `fetchRandomJoke`       | Fetches a random dad joke from icanhazdadjoke.com              |
| `addFavoriteJoke`       | Adds a joke to the user's favorites                            |
| `getFavoriteJokes`      | Gets all favorite jokes of a user                              |
| `removeFavoriteJoke`    | Removes a joke from the user's favorites                       |


## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js + Express
- **Database**: MySQL
- **HTTP Client**: Axios


## How to Run

### 1. Clone the Repository

``bash
git clone https://github.com/hamzaahmadjaradat/webservice_Assignment1.git
cd webservice_Assignment1

Backend Setup
    cd backend
    npm install
    node server.js
Frontend Setup
    cd ..
    npm install
    npm start
Then open your browser and navigate to:
http://localhost:3000

API documentation :
## API Response Samples

### Random Advice
```json
{
  "slip": {
    "id": 101,
    "advice": "Always do anything for love, but don’t do that."
  }
}
### Random Joke
example :
{
  "id": "R7UfaahVfFd",
  "joke": "Why don't skeletons fight each other? They don't have the guts."
}


Quote from FavQs.com
json
{
  "id": 2163,
  "body": "The best way out is always through.",
  "author": "Robert Frost"
}

Entity Relationship Diagram (ERD) :
<img width="666" alt="image" src="https://github.com/user-attachments/assets/b60cdb8c-01a5-4f98-84bd-9ade26e795e2" />

the database schema is in the issue section


Hamza Ahmad Jaradat 
Issam abelkareem
COM4381 – Web Services Technologies
Second Semester 2024/2025
