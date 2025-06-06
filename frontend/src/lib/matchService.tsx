import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const record_match = async (matchData: {
  player1_username: string;
  player2_username: string;
  winner: string;
}) => {
  try {
    const response = await axios.post(`${backendUrl}/elo`, matchData);
    return response.data;
  } catch (error) {
    console.error('Error recording match:', error);
    throw error;
  }
};

export const get_players = async () => {
  try {
    const response = await axios.get(`${backendUrl}/users`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching players:', error);
    throw error;
  }
};
