<template>
  <section>
    <div class="containerLeft">
      <div class="gamesContainer">
        <ul>
          <li><h3>Top</h3></li>
          <li><p @click="chooseGameCategory('best')">Best of year</p></li>
          <li><p @click="chooseGameCategory('popular')">Popular in 2021</p></li>
          <li><p @click="chooseGameCategory('top')">Top 250 All time</p></li>
          <li><h3>New</h3></li>
          <li><p @click="chooseGameCategory('last')">Last 30 days</p></li>
          <li><p @click="chooseGameCategory('week')">In week</p></li>
          <li><p @click="chooseGameCategory('next')">Next week</p></li>
        </ul>
      </div>
    </div>
    <div class="conteiner">
        <div class="cardContainer" v-for="g in game" :key="g.id"
          @mouseenter="showCardMedio = g.id" @mouseleave="showCardMedio=null">
          <div class="imgConteiner">
            <img :src="g.background_image" :alt="g.name">
          </div>
          <div class="gameInfo" >
            <router-link :to="{name:'details', params: {slug: g.slug}}" @click="reloadPage">
              <h5>{{ g.name }}</h5>
            </router-link>
            <div class="gameInfoFirst">
              <div class="metaContent">
                <span :style="{'color':colorMeta, 'border':colorMeta + ' 1px solid'}">
                  {{g.metacritic || "??"}}
                  <!-- {{getMetaCritic(g.metacritic)}} -->
                </span>
                <span>{{g.esrb_rating?.name || ''}}</span>
              </div>
              <div class="ratingContent">
                <star-rating :rating="g.rating"></star-rating>
              </div>
            </div>
          </div>
          <div class="gameInfoMedio" v-if="showCardMedio === g.id && game.length!==0">
            <div class="dateContent">
              <p>Release date:</p><p>{{formatedReleaseDate(g.released)}}</p>
            </div>
            <div class="genresContent">
              <div class="moreGenres" v-if="showMoreGenres">
                <div v-for="gen in g.genres" :key="gen.id">
                    <div class="textGen">
                      <p>{{gen.name || ''}}</p>
                    </div>
                </div>
              </div>

              <p>Genres:</p>
              <div class="plusGenres" @mouseenter="funcShowMoreGenres" @mouseleave="closeMoreGenres">
                <p>{{g.genres[0].name || ''}}</p>
                <i class="fa-solid fa-plus"></i>
              </div>
            </div>
            
            <div class="plataformContent">
              <p>Plataforms:</p>
              <div class="plataformIcons">
                <span v-for="pa in g.parent_platforms" :key="pa.platform.id">
                  <icons-plataform :icons="pa.platform.name"></icons-plataform>
                </span>
              </div>
            </div>
            <div class="moreDetailsContent">
              <div class="detailLink">
                <router-link :to="{name:'details', params: {slug: g.slug}}" @click="reloadPage">
                  <p>Check All Details</p>
                </router-link>
                  <i class="fa-solid fa-circle-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
    </div>
  </section>
  <div class="loadMoreGames">
    <button>Load More</button>
  </div>
</template>

<script>
import starRating from './star-rating.vue';
import iconsPlataform from './icon-plataform.vue';
import moment from "moment";

export default {
  name: 'CardGame',
  components: { starRating, iconsPlataform },
  data(){
    return{
      showCardMedio: null,
      colorMeta: '',
      showMoreGenres: false,
    }
  },
  props: {
    game: {
        type: Object,
        required: true
    },
    getGames: {
      required: true
    }
  },
  created(){},
  mounted() {
    this.colorMeta='green';
  },
  methods: {
    getMetaCritic(value){
      if(value >= 70){
        this.colorMeta = 'green';
      }else if(value <= 60 && value < 50){
        this.colorMeta = 'yellow';
      }else{
        this.colorMeta = 'red';
      }
    },
    formatedReleaseDate(data){
      return moment(data, 'YYYY-MM-DD').format('DD/MM/YYYY')
    },
    funcShowMoreGenres(){
      return this.showMoreGenres = true;
    },
    closeMoreGenres(){
      return this.showMoreGenres = false;
    },
    reloadPage(){
      setTimeout(() =>location.reload(), 300);
    },
    chooseGameCategory(value){
      this.$store.commit("setLoading", true);
      if(value=='best') this.$store.commit("toggleGameType", 'greatest?');
      if(value=='popular') this.$store.commit("toggleGameType", 'greatest?year=2021&');
      if(value=='top') this.$store.commit("toggleGameType", 'popular?');
      if(value=='last') this.$store.commit("toggleGameType", 'recent-games-past?');
      if(value=='week') this.$store.commit("toggleGameType", 'recent-games?');
      if(value=='next') this.$store.commit("toggleGameType", 'recent-games-future?');
      this.getGames();
    },
  }
}
</script>

<style lang="scss" scoped>
section{
  display: flex;
  flex-direction: row;
  
  .containerLeft{
    margin-top: 80px;
    margin-right: 20px;
    min-width: 280px;
    min-height: 100%;
    border-radius: 20px;
    background: var(--bkg-transp-2);

    .gamesContainer{
      padding: 20px;
      ul{
        padding-left: 10px;
        
        li{
          list-style: none;
          color: #FFF;
          h3{
            font-size: 2rem;
            font-weight: bold;
            padding-bottom: 10px;
            border-bottom: 1px solid var(--color-bkg);
          }
          p{
            font-weight: 600;
            cursor: pointer;
            transition: .6s;
            &:hover{
              color: var(--primary-bkg);
              padding: 5px;
              background: var(--color-link);
              border-radius: 50px;
            }
          }
        }
      }
    }
  }

  .conteiner{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding-top: 80px;
    /* justify-content: end;
    align-items: center; */
    width: 80%;

    .cardContainer{
      box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
      border-radius: 10px 10px 10px 10px;
      background: var(--secondary-bkg);
      margin: 0 10px 10px;
      min-height: 300px;
      transition: 0.6s;
  
      .imgConteiner{
    
          img{
            border-radius: 10px 10px 0 0;
            width: 320px;
            height: 200px;
          }
      }
      .gameInfo{ 
        padding: 10px;
  
        a{
          text-decoration: none;
  
          h5{
            max-width: 300px;
            font-size: 18px;
            color: #FFF;
            transition: .6s;
            &:hover{
              font-style: italic;
              color: var(--color-link);
            }
          }
        }
  
        .gameInfoFirst{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding-top: 10px;
          align-items: center;
  
          .metaContent{
            span:first-child{
              margin-right: 5px;
            }
            span{
              padding: 2px 5px;
              border-radius: 5px;
              color: #FFF;
            }
          }
          .ratingContent{
            
          }
        }
      }
      .gameInfoMedio{
        box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 0px 0px;
        background: var(--secondary-bkg);
        border-radius: 0 0 10px 10px;
        z-index: 3;
        height: 200px;
        width: 320px;
        position: fixed;
        padding: 10px;
        p{
          margin: 0;
        }
        .genresContent, .dateContent, .plataformContent{
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-between;
          padding: 6px 0 10px 0;
          border-bottom: solid 1px var(--color-bkg);
          color: #FFF;
        }
        .genresContent{
          .plusGenres{
            display: flex;
            position: relative;
            cursor: pointer;
            p{
              padding-right: 5px;
            }
            &:hover{
              color: var(--color-link);
              transform: scale(1.1);
            }
          }
          .moreGenres{
            z-index: 10;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            position: fixed;
            background: var(--color-bkg);
            border-radius: 10px;
            padding: 10px;
            max-width: 70%;
            box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  
            .textGen{
              p{
                padding: 5px;
                text-decoration: underline;
              }
            }
          }
        }
        .plataformContent{
          .plataformIcons{
            display: flex;
            flex-direction: row;
            span{
              padding-left: 10px;
              cursor: pointer;
              section{
                background: var(--secondary-bkg);
              }
  
              &:hover{
                color: rgb(167, 167, 167);
                transform: scale(1.2);
              }
            }
          }
        }
        .moreDetailsContent{
          width: 100%;
          height: 40px;
          margin-top: 10px;
          background: var(--color-bkg2);
          border-radius: 10px;
          box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 8px 0px;
          .detailLink{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 12px;
            a{
              text-decoration: none;
            }
            p{
              color: #FFF;
              font-size: 12px;
              transition: .3s;
            }
            i{
              color: #FFF;
              transition: .3s;
            }
            &:hover{
              p,i{
                color: var(--color-link);
              }
            }
          }
        }
      }
  
      &:hover{
        transform: scale(1.2);
        z-index: 2;
      }
    }
  }
}
.loadMoreGames{
  text-align: center;
  margin-top: 40px;
  button{
    padding: 1rem 3rem 1rem 3rem;
    border-radius: 40px;
    font-weight: 600;
    border: none;
    transition: .6s;
    &:hover{
      background: var(--color-link);
    }
  }
}

@media (max-width: 992px) {
  .gameInfoMedio{
    display: none;
  }
}
</style>