import { useState, useEffect } from 'react';
import { getTeamById, getTeamsPlayers } from '../http/teams';
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
        } else {
            return res;
        }
    }
    const handleGetTeamById = async (id) => {
        const res = await getTeamById(id);
        if (res.error) {
            setTeamError(res.error);
            return;
        } if (!res[0].nbaFranchise) {
            setTeamError("error: invalid team id");
            return;
        } else {
            return res;
        }
    }

    useEffect(() => {
        const getFullTeam = (id) => {
            return Promise.all([
                handleGetTeamById(id).then((result) => result),
                handleGetTeamPlayers(id).then((result) => result)
            ])
        };
        getFullTeam(teamId).then((data) => {
            setTeamToRender(data)
        });
    }, [teamId]);

    ; let body;
    // teamToRender at index 0 is the team api call. at the 0th index of index 0 we find the actual data from the call.
    //  index 1 is the roster of players
    // this may change when backend is updated to reflect class
    if (teamToRender.length) {
        body =
            <>
                <h1>{teamToRender[0][0].name}</h1>
                <img src={teamToRender[0][0].logo} alt="team logo" />
                <ul>
                    {teamToRender[1].players.map((player,index) => {
                        if (player === null || player.nba.start === 0) {
                            return null
                        } else {
                            return ( 
                            <li key={index}>
                            {player.firstname}<br></br>
                            {player.lastname}<br></br>
                            {player.birth.date}
                             </li>
                            )
                        }
                    })}
                </ul>

            </>
    } else {
        body = <h1>{teamError}</h1>;
    }
    return body;
}