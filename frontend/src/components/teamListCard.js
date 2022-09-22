export const TeamListCard = ({team, key}) => {
    return (
        <>
            <li key={key}>{team.name}</li>
            <img style={{ height: '150px', width: '150px' }} src={team.logo} alt="logo" />
        </>
    )
}