<template>
  <section class="homeContainer">
    <h1>Home</h1>
    <CardGame :game="games" /> 
  </section>
</template>

<script>
import gamesSearch from '../api/games';
import CardGame from './CardGame.vue';
// import gameDetail from '../api/gameDetail';

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
    // this.gameDetail();
  },
  methods: {
    getGames(){
        gamesSearch.then(data => {
          this.games = data.data.results;
        });
    },
    // gameDetail(){
    //   gameDetail.then(data => {
    //     this.gameDatail = data.data;
    //   })
    // }
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
</style>