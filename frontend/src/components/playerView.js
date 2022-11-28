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
                handleGetPlayer(playerId).then((result) => result),
                handleGetPlayerStats(playerId).then((result) => result)
            ])
        }
        fetch(playerId).then((data) => {
            setPlayer(data);
        });
    }, [playerId]);

    console.log(player);
    let body;

    player.length ? body =
        <div>
            <div className="player-card">
            <h1>{player[0].fullName}</h1>
            <h1>{player[0].jerseyNumber}</h1>
            </div>
            <div className="player-card">
                <h2>Season Stats</h2>
                <p>Points: {player[1].points}</p>
                <p>Field Goals: {player[1].fieldGoalsMade}</p>
                <p>Attempted: {player[1].fieldGoalsAttempted} </p>
                <p>Percentage: {player[1].fieldGoalPercentage}</p>
                <p>Assists: {player[1].assists}</p>
                <p>Steals: {player[1].steals}</p>
                <p>Blocks: {player[1].blocks}</p>
                <p>Turnovers: {player[1].turnovers}</p>
            </div>
        </div> : body = <p>loading</p>;

        return body

}