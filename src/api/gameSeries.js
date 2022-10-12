import axios from "axios";

const GameSeries = {
  show: (search) => axios.get(`https://rawg.io/api/games?page_size=10&${search}/parent-games&page=1&key=`+import.meta.env.VITE_API_KEY)
};

export default GameSeries;