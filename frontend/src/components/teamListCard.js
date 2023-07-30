import { Link } from 'react-router-dom'

export const TeamListCard = ({ team, key, setError }) => {

    return (
        <>
            <li index={key} className="team-list-card">
                <Link to={`/team/${team.id}`} >
                    <img src={team.logo} alt="logo" loading="lazy"/>
                </Link>
            </li>
        </>
    )
}


