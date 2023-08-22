const [playerStats, setPlayerStats] = useState([]);

const fetchPlayerStats = async (playerName) => {
  const response = await fetch(`/api/fetch/playerStats?playerName=${playerName}`);
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Failed to fetch player stats');
  }
};
