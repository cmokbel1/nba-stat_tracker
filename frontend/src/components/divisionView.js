import { useState, useEffect } from 'react';
import { getTeamsByDivision } from '../http/teams';
import { TeamListCard } from './teamListCard'

export const DivisionView = () => {
    //Northwest / Pacific / Southwest
    //Atlantic / Central / Southeast
    const [divisions, setDivisions] = useState([]);
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);

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
        body =
            <div>
                {divisions.map((division, divIndex) => {
                    // add inline styling to display all division teams together
                    return (
                        <>
                        <h1 key={divIndex}>{division.name}</h1>
                        <ul>
                        {division.teams.map((team, teamIndex) => {
                        if (team.nbaFranchise) {
                            return (
                                    <TeamListCard team={team} key={teamIndex} setError={setError} />
                            )} else return null
                    })}
                        </ul>
                        </>
                    )
                })
                }
            </div>
        if (!divisions && !loading) {
            body = error;
        }
        return body
    }
}