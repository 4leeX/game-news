import axios from "axios";

const Games = {
    show: (search) => axios.get(`https://rawg.io/api/games/lists/${search}discover=true&ordering=-added&page_size=20&page=1&&key=`+import.meta.env.VITE_API_KEY)
} 

export default Games;