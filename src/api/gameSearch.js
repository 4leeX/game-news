import axios from "axios";

const GameDetail = {
  show: (search) => axios.get(`https://rawg-video-games-database.p.rapidapi.com/games/${search}?key=`+import.meta.env.VITE_API_KEY, {
    headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
        'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
      }
  })
};

export default GameDetail;