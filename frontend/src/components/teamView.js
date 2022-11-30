import { useState, useEffect } from 'react';
import { getTeamById, getTeamsPlayers, getTeamStats } from '../http/teams';
import { useParams, Link } from "react-router-dom";


export const TeamView = () => {
    const [teamError, setTeamError] = useState("");
    const [teamToRender, setTeamToRender] = useState([])
    let teamId = useParams().teamId;

    const handleGetTeamPlayers = async (id) => {
        const res = await getTeamsPlayers(id);
        if (res.error) {
            setTeamError(res.error);
            return;
        }
        return res;
    }
    const handleGetTeamById = async (id) => {
        const res = await getTeamById(id);
        if (res.error) {
            setTeamError(res.error);
            return;
        } if (!res[0].nbaFranchise) {
            setTeamError("error: invalid team id");
            return;
        }
        return res;
    }

    const handleGetTeamStats = async (id) => {
        const res = await getTeamStats(id);
        if (res.error) {
            setTeamError(res.error);
            return;
        }
        return res
    }
    useEffect(() => {
        const getFullTeam = (id) => {
            return Promise.all([
                handleGetTeamById(id),
                handleGetTeamPlayers(id),
                handleGetTeamStats(id)
            ]);
        };
        getFullTeam(teamId).then((data) => {
            setTeamToRender(data)
        });
    }, [teamId]);

    // teamToRender at index 0 is the team api call. at the 0th index of index 0 we find the actual data from the call.
    //  index 1 is the roster of players
    // this may change when backend is updated to reflect class models
    if (teamToRender.length !== 3) {
        return <h1>loading....</h1>
    }
    if (teamError) {
        return <h1>{teamError}</h1>
    }

    return (
        <>
            <div className="team-title">
                <h1>{teamToRender[0][0].name}</h1>
                <img src={teamToRender[0][0].logo} alt="team logo" />
            </div>
            <div className="team-stats">
                <h1>Stats</h1>
                <p>Games Played: {teamToRender[2].games}</p>
                <p>Total Points: {teamToRender[2].points}</p>
                <p>Total FG: {teamToRender[2].fieldGoalsMade}</p>
                <p>Total Attempts: {teamToRender[2].fieldGoalsAttempted}</p>
                <p>FG Percentage: {teamToRender[2].fieldGoalPercentage}</p>
                <p>Total Free Throws: {teamToRender[2].freeThrowsMade}</p>
                <p>Free Throw Percenrage: {teamToRender[2].freeThrowPercentage}</p>
                <p>Total Assists: {teamToRender[2].assists}</p>
                <p>Total Steals: {teamToRender[2].steals}</p>
                <p>Total Turnovers: {teamToRender[2].turnovers}</p>
            </div>
            <ul className="team-players">
                {teamToRender[1].players.map((player, index) => {
                    if (player === null) {
                        return null
                    } else {
                        return (
                            <>
                                <div className="team-player-card">
                                    <Link to={`/player/${player.id}`} key={index}>
                                        {player.fullName}
                                    </Link>
                                </div>
                                <br></br>
                            </>
                        )
                    }
                })}
            </ul>

        </>
    )
}