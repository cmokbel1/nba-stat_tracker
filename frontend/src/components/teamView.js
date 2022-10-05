import { useState, useEffect } from 'react';
import { getTeamById, getTeamsPlayers } from '../http/teams';
import { useParams } from "react-router-dom";


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
        }  if (!res[0].nbaFranchise) {
            setTeamError("error: invalid team id");
            return;
        } else {
            return res;
        }
    }

    useEffect(() => {
        const getFullTeam = (id) => {
            return Promise.all([ 
                handleGetTeamById(id).then((result) => (result)),
                handleGetTeamPlayers(id).then((result) => (result))
            ])
        };
        getFullTeam(teamId).then((data) => {
            console.log(data);
            setTeamToRender(data);
        }).finally(() => console.log(teamToRender));
    }, []);

;   let body;
    if (teamToRender.length) {
        body = 
        <>
        <h1>{teamToRender[0].name}</h1>
        <img src={teamToRender[0].logo} alt="team logo"/>
        </>
    } else {
        body = <h1>{teamError}</h1>;
    }
    return body; 
}