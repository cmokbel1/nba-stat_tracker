import { useState, useEffect } from 'react';
import { getTeamById, getTeamsByDivision } from '../http/teams';
import { TeamListCard } from './teamListCard'

export const DivisionView = () => {
    //Northwest / Pacific / Southwest
    //Atlantic / Central / Southeast
    const [divisions, setDivisions] = useState([]);
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
            setDivisions([])
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
        console.log('data set');
        return res
    }

    useEffect(() => {
        setLoading(true);
        const getDivisions = (divisionNames) => {
            return Promise.all(divisionNames.map((name) =>
                handleGetDivisionTeams(name).then((result) => ({ name, teams: result })
            )))
        };
        getDivisions(['Northwest', 'Pacific', 'Southwest']).then((data) => {
            setDivisions(data);
        }).finally(() => {
            setLoading(false);
        });
    }, [])

    let body;
    if (divisions && !loading) {
        console.log(divisions);
        body =
            <div>
                {divisions.map((division, divIndex) => {
                    return division.teams.map((team, teamIndex) => {
                        if (team.nbaFranchise) {
                            return (
                                <>
                                <h1>{division.name}</h1>
                                <ul>
                                    <TeamListCard team={team} key={teamIndex} />
                                </ul>
                                </>
                            )} else return null
                    })
                })
                }
            </div>
        return body
    }
}