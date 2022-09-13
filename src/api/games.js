import axios from "axios";

const urlSearch = "https://rawg-video-games-database.p.rapidapi.com/games?key="+import.meta.env.VITE_API_KEY;

const Games = axios.get(`${urlSearch}`, {
    headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
        'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
      }
});

export default Games;