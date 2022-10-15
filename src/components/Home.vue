<template>
  <section class="homeContainer">
    <h1>Home</h1>
    <div class="loadingConteiner" v-if="$store.state.loading">
      <img src="img/load/pac.svg" alt="pacman">
    </div>
    <CardGame :game="games" v-else/> 
  </section>
</template>

<script>
import gamesSearch from '../api/games';
import CardGame from './CardGame.vue';

export default {
  data(){
    return{
      games: [],
      gameDatail: []
    }
  },
  components: {
    CardGame
  },
  mounted() {
    this.getGames();
  },
  methods: {
    getGames(){
        gamesSearch.then(data => {
          this.games = data.data.results;
        }).catch(err => {
          console.log(err);
        }).finally(() => {
          this.$store.commit("setLoading", false);
        });
    },
  }
}
</script>

<style lang="scss">
  section{
    background: var(--primary-bkg);
  }
  .homeContainer{
    margin: 0 200px;
    /* margin-top: 20px; */
  }
  .loadingConteiner{
    img{
      height: 70vh;
      width: 100px;
      margin-left: auto;
      margin-right: auto;
      display: block;
    }
  }
</style>