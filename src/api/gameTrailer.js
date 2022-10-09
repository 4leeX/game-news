import axios from "axios";

const GameTrailer = {
  // show: (search) => axios.get(`https://rawg.io/api/games?page_size=10&search=${search}&page=1&key=`+import.meta.env.VITE_API_KEY)
  show: (search) => axios.get(`https://api.rawg.io/api/games/${search}/movies?page=1&key=`+import.meta.env.VITE_API_KEY)
  // show: (search) => axios.get(`https://api.rawg.io/api/games/${search}/youtube?page=1&page_size=12&key=`+import.meta.env.VITE_API_KEY)
  // https://api.rawg.io/api/stores
};

export default GameTrailer;