require('dotenv').config();
const teamsUrl = 'https://api-nba-v1.p.rapidapi.com/teams';
const apiKey = process.env.RAPID_API_KEY;
const axios = require('axios');

//GET REQUESTS 
const getTeamsByConference = async (conference) => {
    try {
        console.log(`fetching teams for conference: ${conference}`);
        const teams = await axios.get(`${teamsUrl}?conference=${conference}`,
            {
                method: "get",
                headers: {
                    "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
                    "x-rapidapi-key": apiKey
                }
            })
        console.log(teams);
        return teams.data.response;
    } catch (err) {
        console.log(err);
        return { "error": err.message };
    }
};

const getTeamById = async (id) => {
    try {
        console.log(`fetching team with id: ${id}`);
        const team = await axios.get(`${teamsUrl}?id=${id}`,
            {
                method: "get",
                headers: {
                    "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
                    "x-rapidapi-key": apiKey
                }
            })
            console.log(team);
            return team.data.response;
    } catch (err) {
        console.log(err);
        return { "error": err.message };
    }
}

module.exports.getTeamsByConference = getTeamsByConference;
module.exports.getTeamById = getTeamById;