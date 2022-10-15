import axios from "axios";

const GameGenres =  axios.get(`https://rawg.io/api/genres?page=1&page_size=20&key=`+import.meta.env.VITE_API_KEY);

export default GameGenres;