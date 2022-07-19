import { useState } from 'react';
import { getTeamsByConference, getTeamById } from '../http/teams';

export const TeamRenderer = () => {
    const [teams, setTeams] = useState("");
    const [teamById, setTeamById] = useState("");
    const [isClicked, setIsClicked] = useState(false);
    const [error, setError] = useState("")

    const handleGetTeams = async (conference) => {
        const res = await getTeamsByConference(conference);
        if (res.error) {
            setError(res.error);
        } else {
            setTeamById("");
            setIsClicked(true);
            console.log(res);
            setTeams(res);
        }

    };

    const handleGetTeamById = async (id) => {
        const res = await getTeamById(id);
        if (res.error) {
            setError(res.error);
        } else {
            setTeams("")
            setTeamById(res);
            console.log(res);
        }
    }
    let button = <div>
        <button onClick={() => handleGetTeams("East")}>Eastern Conference</button>
        <button onClick={() => handleGetTeams("West")}>Western Conference</button>
    </div>

    let body;

    if (isClicked) {
        if (teams) {
            body =
                <ul>
                    {teams.map((team, index) => {
                        if (team.nbaFranchise) {
                            return (
                                <li key={index}>
                                    <button onClick={() => handleGetTeamById(`${team.id}`)}>{team.name}</button>
                                    <img src={team.logo} alt="logo" />
                                    {team.city}
                                </li>

                            )
                        } else {
                            return null
                        }
                    })}
                </ul>
        }
        if (teamById) {
            console.log(teamById);
            body =
                <div>
                    <h1>{teamById[0].name}</h1>
                    <img src={teamById[0].logo} alt="logo" />
                    <button onClick={() => handleGetTeams(`${teamById[0].leagues.standard.conference}`)}>Go Back</button>
                </div>
        }
    } else {
        body = button
    }
    return body
}