<template>
  <Navbar />
  <section class="homeContainer">
    <h1>Home</h1>
    <CardGame :game="games" /> 
  </section>
</template>

<script>
import gamesSearch from '../api/games';
import Navbar from './Navbar.vue';
import CardGame from './CardGame.vue';

export default {
  data(){
    return{
      games: []
    }
  },
  components: {
    Navbar,
    CardGame
  },
  mounted() {
    this.getGames();
  },
  methods: {
    getGames(){
        gamesSearch.then(data => {
          this.games = data.data.results;
        });
    }
  }
}
</script>

<style lang="scss" scoped>
  .homeContainer{
    margin: 0 200px;
    margin-top: 20px;
  }
</style>