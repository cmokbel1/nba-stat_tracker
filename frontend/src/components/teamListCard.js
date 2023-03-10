import { Link } from 'react-router-dom'

export const TeamListCard = ({ team, key, setError }) => {

    return (
        <>
            <li key={key} className="team-list-card">
                <Link to={`/team/${team.id}`} >
                    <img style={{ height: '180px', width: '180px' }} src={team.logo} alt="logo" loading="lazy"/>
                </Link>
            </li>
        </>
    )
}


