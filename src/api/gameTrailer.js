import axios from "axios";

const GameTrailer = {
  show: (search) => axios.get(`https://api.rawg.io/api/games/${search}/movies?page=1&key=`+import.meta.env.VITE_API_KEY)
};

export default GameTrailer;