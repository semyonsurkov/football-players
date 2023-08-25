import { useState } from 'react';
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

  async function fetchRandomPlayer() {
    try {
      const response = await fetch('http://31.129.102.114:5000/players');
      const data = await response.json();

      const randomIndex = Math.floor(Math.random() * data.length);
      const randomPlayer = data[randomIndex].Name;
      const randomImg = data[randomIndex].img;

      setPlayer(randomPlayer);
      setImg(randomImg);
    } catch (error) {
      console.error('Error fetching player:', error);
    }
  }

  return (
    <div className="player">
      <h1>Random Player Generator</h1>
      <p>{player}</p>
      <img src={img} alt="Player" className="player-image" />
      <button onClick={fetchRandomPlayer}>Get the new player</button>
    </div>
  );
}
