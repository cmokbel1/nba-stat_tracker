import { useState } from 'react';
import { getTeamsByConference, getTeamById, getTeamsByDivision } from '../http/teams';

export const TeamRenderer = () => {
    const [teams, setTeams] = useState("");
    const [teamById, setTeamById] = useState("");
    const [westIsClicked, setWestIsClicked] = useState(false);
    const [eastIsClicked, setEastIsClicked] = useState(false);
    const [error, setError] = useState("")

    const handleGetConferenceTeams = async (conference) => {
        const res = await getTeamsByConference(conference);
        if (res.error) {
            setError(res.error);
            return;
        } 
        if (conference === 'West') {
            setWestIsClicked(true);
            setEastIsClicked(false);
        }
        if (conference === 'East') {
            setEastIsClicked(true);
            setWestIsClicked(false);
        }
            setTeamById("");
            setTeams(res);
    }

    const HandleGetDivisionTeams = async (division) => {
        const res= await getTeamsByDivision(division);
        if (res.error) {
            setError(res.error);
            return;
        }
        console.log(res);
        setTeams(res);
        setWestIsClicked(true);
    }

    const handleGetTeamById = async (id) => {
        const res = await getTeamById(id);
        if (res.error) {
            setError(res.error);
        } else {
            setTeams("")
            setTeamById(res);
        }
    }
    let button = <div>
        <button onClick={() => handleGetConferenceTeams("East")} disabled={eastIsClicked}>Eastern Conference</button>
        <button onClick={() => handleGetConferenceTeams("West")} disabled={westIsClicked}>Western Conference</button>
        <button onClick={() => HandleGetDivisionTeams("Atlantic")}>Test Division</button>
    </div>

    let body;

    if (westIsClicked || eastIsClicked) {
        if (teams) {
            body =
            <div>
                {button}
                <ul>
                    {teams.map((team, index) => { 
                            return (
                                <li key={index}>
                                    <button onClick={() => handleGetTeamById(`${team.id}`)}>{team.name}</button>
                                    <img src={team.logo} alt="logo" />
                                    {team.city}
                                </li>
                            )
                    })}
                </ul>
            </div>
        }
        if (teamById) {
            body =
                <div>
                    <h1>{teamById[0].name}</h1>
                    <img src={teamById[0].logo} alt="logo" />
                    <button onClick={() => handleGetConferenceTeams(`${teamById[0].leagues.standard.conference}`)}>Go Back</button>
                </div>
        }
    } else {
        body = button
    }
    return body
}