require('dotenv').config();
const apiKey = process.env.RAPID_API_KEY;

const requestConfig = {
    headers: {
        "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
        "x-rapidapi-key": apiKey
    }
}

const baseUrl = 'https://api-nba-v1.p.rapidapi.com';

module.exports = { requestConfig, baseUrl }