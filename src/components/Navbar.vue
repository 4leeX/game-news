<template>
  <header class="principalContainer">
    <nav class="navContainer">
        <!-- <a href="#">Loja</a>
        <a href="#">Comunidade</a>
        <a href="#">Sobre</a>
        <a href="#">Suporte</a> -->
        <div class="searchContainer">
          <div class="searchContent">
            <input type="text" v-model="search" @keyup="loadSearch()" placeholder="Search...">
            <button><i class="fa-solid fa-magnifying-glass"></i></button>
          </div>
        </div>
    </nav>
  </header>

  <section v-if="openSearch">
    <div class="listSearchContainer">
        <!-- <div v-for="(g, i) in gameSearch" :key="i">
            <div class="cardGame">
              <img :src="g.background_image" alt="image">
              <p>{{g.name}}</p>
            </div>
        </div> -->
        <!-- <div> -->
            <div class="cardGame">
              <img :src="gameSearch.background_image" alt="image">
              <p>{{gameSearch.name}}</p>
            </div>
        <!-- </div> -->
    </div>
  </section>
  
</template>

<script>
import gameSearch from '../api/gameSearch';

export default {
    data(){
      return{
        search: null,
        gameSearch: [],
        openSearch: false,
      }
    },
    methods: {
      loadSearch(){
        // console.log(this.search);
        gameSearch.show(this.search).then(data => {
          this.gameSearch = data.data;
          this.openSearch=true;
          
        }).finally(() => {
          if((this.search).length == 0){
            this.openSearch=false;
          }
        })
      }
    }
}
</script>

<style lang="scss" scoped>
.principalContainer{
    background: rgb(88, 88, 88);
    padding: 0 300px;
    max-width: 100%;
    height: 80px;

    .navContainer{
        align-items: center;
        padding: 30px 0;
        margin: 0 35%;
        widows: 100%;

        a{
            color: #FFF;
            margin-right: 25px;
            text-decoration: none;
        }

      .searchContainer{
        /* width: 100%; */
        .searchContent{
          display: flex;
          input{
            border-radius: 50px 0 0 50px;
            background: var(--color-bkg);
            color: #FFF;
            padding-left: 20px;
            font-size: 18px;
            border: none;
            width: 100%;
            height: 40px;

            &:focus{
              background: #FFF;
              color: #000;
            }
          }
          button{
            border-radius: 0 50px 50px 0;
            border: none;
            padding: 10px;
            /* padding-right: 10px; */

            i{
              font-size: 18px;
            }
          }
        }
      }
    }

}

section{
  margin: 0 auto;
  width: 20%;
  
  .listSearchContainer{
    margin-top: 10px;
    padding: 10px;
    z-index: 99;
    border-radius: 10px;
    background: var(--bkg-search);
    min-height: 50px;
    width: 20%;
    max-height: 300px;
    position: fixed;
    color: #FFF;
    box-shadow: rgba(156, 156, 156, 0.61) 0px 5px 15px 0px;

    .cardGame{
      display: flex;
      flex-direction: row;
      padding: 5px;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--color-bkg);
      transition: .2s;

      img{
        max-height: 80px;
        max-width: 70px;
        border-radius: 10px;
        margin-right: 10px;
      }
      p{
        padding-top: 12px;
      }
      &:hover{
        background: var(--color-bkg2);
      }
    }
  }
}
</style>