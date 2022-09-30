import axios from "axios";

const imageGame = {
  show: (search) => axios.get(`https://rawg.io/api/games/${search}/screenshots?page=1&page_size=12&with_deleted=false&key=`+import.meta.env.VITE_API_KEY)
};

export default imageGame;