import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import { getPlayer } from '../http/players';

export const PlayerView = () => {
    const playerId = useParams().playerId;
    console.log("params:" + playerId);
    const  [player, setPlayer] = useState();
    const [playerError, setPlayerError] = useState("");
    const handleGetPlayer = async (playerId) => {
        const res = await getPlayer(playerId);
        if (res.error) {
            setPlayerError(res.error);
            return;
        } else {
            console.log(res)
            return res
        }
    }

    useEffect(() => {
        const fetch = (playerId) => {
          return handleGetPlayer(playerId).then(result => result);
        }
        fetch(playerId).then(data => {
            setPlayer(data);
        })
    }, [playerId]);

    return (
        <div>
            <h1>It's working... I think</h1>
        </div>
    )
}