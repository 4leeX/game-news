import axios from "axios";

const GameSeries = {
  show: (search) => axios.get(`https://rawg.io/api/games?${search}/suggested&page=1&page_size=10&key=`+import.meta.env.VITE_API_KEY)
};

export default GameSeries;