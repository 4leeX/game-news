<template>
  <header class="principalContainer" :class="scrolled ? 'rounded-nav' : ''">
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
        <div v-for="(g, i) in gameSearch" :key="i">
          <router-link :to="{name:'details', params: {slug: g.slug}}">
            <div class="cardGame" @click="reloadPage">
              <img :src="g.background_image" alt="image">
              <p>{{g.name}}</p>
            </div>
          </router-link>
        </div>
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
        scrolled: false
      }
    },
    components: {},
    created () {
      window.addEventListener('scroll', this.handleScroll);
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
      loadSearch(){
        gameSearch.show(this.search).then(data => {
          this.gameSearch = data.data.results;
          this.openSearch=true;
          
        }).finally(() => {
          if((this.search).length == 0 || (this.search).length==null){
            this.openSearch=false;
          }
        });
      },
      handleScroll () {
        this.scrolled = window.scrollY > 0;
      },
      reloadPage(){
        setTimeout(() => {
          location.reload();
        }, 500);
        this.openSearch=false;
      }
    }
}
</script>

<style lang="scss" scoped>
.principalContainer{
    background: rgba(88,88,88,.6);
    align-items: center;
    position: fixed;
    z-index: 10;
    width: 100%;
    height: 80px;
    transition: .6s;
    top: 0;

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
            padding: 8px;
            /* padding-right: 10px; */

            i{
              font-size: 18px;
            }
          }
        }
      }
    }
}
.rounded-nav{
  border-radius: 50px;
  margin-top: 3px;
  margin-left: 18px;
  width: 98%;
}

section{
  margin: 0 auto;
  width: 31%;
  
  .listSearchContainer{
    margin-top: 10px;
    padding: 10px;
    padding-bottom: 50px;
    z-index: 99;
    border-radius: 10px;
    background: var(--bkg-search);
    max-height: 100%;
    width: 30%;
    margin-top: 55px;
    position: fixed;
    color: #FFF;
    box-shadow: rgba(156, 156, 156, 0.61) 0px 5px 15px 0px;

    a{
      color: #FFF;
      text-decoration: none;
    }
    .cardGame{
      display: flex;
      flex-direction: row;
      padding: 5px;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--color-bkg);
      transition: .2s;
      img{
        height: 50px;
        width: 50px;
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