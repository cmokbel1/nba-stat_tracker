const baseUrl = require('./config');

//retrieve multiple teams
async function getTeamsByConference(conference) {
    try {
        const res = await fetch(`${baseUrl}/teams/conference/${conference}`, { mode: 'cors' });
        if (res.status !== 200) {
            return { "error": `bad status ${res.status}` };
        }
        return await res.json();
    } catch (err) {
        console.log(err);
        return { "error": err.message };
    }
}

async function getTeamsByDivision(division) {
    try {
        const res = await fetch(`${baseUrl}/teams/division/${division}`, { mode: 'cors' });
        if (res.status !== 200) {
            return { "error": `bad status ${res.status}` };
        }
        return await res.json();
    } catch (err) {
        console.log(err);
        return { "error": err.message };
    }
}

async function getTeamsPlayers(id) {
    try {
        const res = await fetch(`${baseUrl}/teams/${id}/players`, { mode: 'cors' });
        if (res.status !== 200) {
            return { "error": `bad status ${res.status}` };
        }
        return await res.json();
    } catch (err) {
        console.log(err);
        return { "error": err.message };
    }
}

//retrieve an individual team
async function getTeamById(id) {
    try {
        const res = await fetch(`${baseUrl}/teams/${id}`, { mode: 'cors' });
        if (res.status !== 200) {
            return { "error": `bad status ${res.status}` };
        }
        return await res.json();
    } catch (err) {
        console.log(err);
        return { "error": err.message };
    }
}

async function getTeamStats(id) {
    try {
        const res = await fetch(`${baseUrl}/teams/${id}/statistics`, { mode: 'cors' });
        if (res.status !== 200) {
            return { "error": `bad status ${res.status}` };
        }
        return await res.json();
    } catch (err) {
        console.log(err);
        return { "error": err.message };
    }
}
export { getTeamsByConference, getTeamById, getTeamsByDivision, getTeamsPlayers, getTeamStats } 