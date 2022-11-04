const baseUrl = 'http://localhost:8081/teams';

async function getPlayer(id) {
    try {
        const res = await fetch(`${baseUrl}/players/${id}`, { mode: 'cors' });
        if (res.status !== 200) {
            return { "error": `bad status ${res.status}`};
        }
        return await res.json();
    } catch (err) {
        console.log(err);
        return { "error": err.message };
    }
}

export { getPlayer }