import { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  return (
    <div>
      <Player />
    </div>
  );
}

function Player() {
  const [player, setPlayer] = useState('');
  const [img, setImg] = useState('');

  async function fetchPlayerData() {
    try {
      const response = await fetch(
        'https://my-json-server.typicode.com/semyonsurkov/my-api/players'
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomPlayer = data[randomIndex].Name;
        const randomImg = data[randomIndex].img;

        setPlayer(randomPlayer);
        setImg(randomImg);
      } else {
        console.error('No player data available.');
      }
    } catch (error) {
      console.error('Error fetching player:', error);
    }
  }

  useEffect(() => {
    fetchPlayerData();
  }, []); // Fetch data when the component mounts

  return (
    <div className="player">
      <h1>Random Player Generator</h1>
      <p>{player}</p>
      <img src={img} alt="Player" className="player-image" />
      <button onClick={fetchPlayerData}>Get the new player</button>
    </div>
  );
}
