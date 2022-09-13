import { useState, useEffect } from 'react';
import { getTeamById, getTeamsByDivision } from '../http/teams';

export const DivisionView = () => {
    //Northwest / Pacific / Southwest
    //Atlantic / Central / Southeast
    const [teams, setTeams] = useState([]);
    const [teamById, setTeamById] = useState("");
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
    // maybe get all teams
    // set teams with one state
    // run a conditional if team.division = ? 

    const handleGetTeamById = async (id) => {
        const res = await getTeamById(id);
        if (res.error) {
            setError(res.error);
        } else {
            setTeams([])
            setTeamById(res);
        }
    }

    const handleGetDivisionTeams = async (division) => {
        const res = await getTeamsByDivision(division);
        console.log(res);
        if (res.error) {
            setError(res.error);
            return;
        }
        setTeams(prev => [...prev, res]);
        console.log('data set');
    }

    useEffect(() => {
        const getDivisions = async () => {
            setLoading(true)
            await handleGetDivisionTeams("Northwest").then(console.log('Northwest data retrieved'));
            await handleGetDivisionTeams("Pacific").then(console.log("Pacific data retrieved"));
            await handleGetDivisionTeams("Southwest").then(console.log("Southwest data retrieved")).then(setLoading(false));
            // await handleGetDivisionTeams("Atlantic").then(console.log("Atlantic data retrieved"));
            // await handleGetDivisionTeams("Central").then(console.log("Central data retrieved"));
            // await handleGetDivisionTeams("Southeast").then(console.log("Southeast data retrieved"));
        }
        getDivisions();
    }, [])

    let body;
    if (teams && !loading) {
        body =
            <div>
                {teams.map((division) => {
                    return (
                        <>
                            <h3>Northwest</h3>
                            <ul>
                                {division[0].map((team, index) => {
                                    if (team.nbaFranchise) {
                                        return (
                                            <>
                                                <li key={index}>{team.name}</li>
                                                <img style={{ height: '150px', width: '150px' }} src={team.logo} alt="logo" />
                                            </>
                                        )
                                    } else {
                                        return null;
                                    }
                                })}
                            </ul>
                            <h3>Pacific</h3>
                            <ul>
                                {division[1].map((team, index) => {
                                    return (
                                    <>
                                        <li key={index}>{team.name}</li>
                                        <img style={{ height: '150px', width: '150px' }} src={team.logo} alt="logo" />
                                    </>
                                    )
                                })}
                            </ul>
                            <h3>Southwest</h3>
                            <ul>
                                {division[2].map((team, index) => {
                                    return (
                                    <>
                                        <li key={index}>{team.name}</li>
                                        <img style={{ height: '150px', width: '150px' }} src={team.logo} alt="logo" />
                                    </>
                                    )
                                })}
                            </ul>
                        </>)

                }
                )}
            </div>
        return body
    }
}