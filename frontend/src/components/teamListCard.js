import { Link } from 'react-router-dom'

export const TeamListCard = ({ team, index, setError }) => {

    return (
        <>
            <li key={index} className="team-list-card">
                <Link to={`/team/${team.id}`} style={{ textDecoration: 'none'}}>
                    <h3>{team.name}</h3>
                    <img style={{ height: '150px', width: '150px' }} src={team.logo} alt="logo" />
                </Link>
            </li>
        </>
    )
}


