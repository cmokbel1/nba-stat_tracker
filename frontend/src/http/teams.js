
//retrieve multiple teams
async function getTeamsByConference(conference) {
    try {
        const res = await fetch(`http://localhost:8081/teams/conference/${conference}`, { mode: 'cors' });
        if (res.status !== 200) {
            return { "error": `bad status ${res.status}`}
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
        const res = await fetch(`http://localhost:8081/teams/${id}`, { mode: 'cors'});
        if (res.status !== 200) {
            return { "error": `bad status ${res.status}`}
        }
        return await res.json();
    } catch (err) {
        console.log(err);
        return { "error": err.message };
    }
}
export { getTeamsByConference, getTeamById } 