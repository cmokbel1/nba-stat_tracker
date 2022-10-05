import { Link } from 'react-router-dom'

export const TeamListCard = ({team, key, setError}) => {

    return (
        <>
            <li key={key} class="card">
                <Link to={`team/${team.id}`}>
                {team.name}
                <img style={{ height: '150px', width: '150px' }} src={team.logo} alt="logo" />
                </Link>
            </li>
        </>
    )
}


