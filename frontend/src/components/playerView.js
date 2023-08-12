import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getPlayer, getPlayerStats } from '../http/players';

export const PlayerView = () => {

    const playerId = useParams().playerId;
    const [player, setPlayer] = useState([]);
    const [playerError, setPlayerError] = useState("");

    const handleGetPlayer = async (playerId) => {
        const res = await getPlayer(playerId);
        if (res.error) {
            setPlayerError(res.error);
            return;
        } else {
            return res;
        }
    }
    const handleGetPlayerStats = async (playerId) => {
        const res = await getPlayerStats(playerId);
        if (res.error) {
            console.log("error: " + res.error);
            return;
        } else {
            return res;
        }
    }
    useEffect(() => {
        const fetch = (playerId) => {
            return Promise.all([
                handleGetPlayer(playerId),
                handleGetPlayerStats(playerId)
            ])
        }
        fetch(playerId).then((data) => {
            setPlayer(data);
        });
    }, [playerId]);

    console.log(player);
    if (!player.length) {
        return <p>loading...</p>
    }
    if (playerError) {
        return <h1>Something is not right...</h1>
    }
    return (
        <div className="player-container">
            <div className="player-card">
                <h1 className="team-player-name">{player[0].fullName}</h1>
                <h1 className="team-player-number">{player[0].jerseyNumber}</h1>
            </div>
            <div className="player-card">
                <h2>Season Stats</h2>
                <div className="player-statistics">
                    <p>Points: {player[1].points}</p>
                    <p>FG: {player[1].fieldGoalsMade}</p>
                    <p>Attempts: {player[1].fieldGoalsAttempted} </p>
                    <p>FG %: {player[1].fieldGoalPercentage * 100}%</p>
                    <p>Assists: {player[1].assists}</p>
                    <p>Steals: {player[1].steals}</p>
                    <p>Blocks: {player[1].blocks}</p>
                    <p>Turnovers: {player[1].turnovers}</p>
                    <p>Rebounds: {player[1].rebounds}</p>
                </div>
            </div>
            <button className="return-button" onClick={() => { window.history.back() }}>Go Back</button>
            <Link to="/"><button className="return-button">Divisions</button></Link>
        </div>
    )
}