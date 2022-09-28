<template>
  <section>
    <div class="conteiner">
        <div class="cardContainer" v-for="(g, i) in game" :key="i" 
          @mouseenter="showCardMedio = i" @mouseleave="showCardMedio = id">
          <div class="imgConteiner">
            <img :src="g.background_image" :alt="g.name">
          </div>
          <div class="gameInfo" >
            <h5>{{ g.name }}</h5>
            <div class="gameInfoFirst">
              <div class="metaContent">
                <span :style="{'color':colorMeta, 'border':colorMeta + ' 1px solid'}">
                  {{getMetaCritic(g.metacritic)}} {{g.metacritic}}
                </span>
                <span>{{g.esrb_rating.name}}</span>
              </div>
              <div class="ratingContent">
                <star-rating :rating="g.rating"></star-rating>
              </div>
            </div>
          </div>
          <div class="gameInfoMedio" v-if="showCardMedio === i">
            <div class="dateContent">
              <p>Release date:</p><p>{{formatedReleaseDate(g.released)}}</p>
            </div>
            <div class="genresContent">
              <div class="moreGenres" v-if="showMoreGenres">
                <div v-for="(gen, i) in g.genres" :key="i">
                    <div class="textGen">
                      <p>{{gen.name}}</p>
                    </div>
                </div>
              </div>

              <p>Genres:</p>
              <div class="plusGenres" @mouseenter="funcShowMoreGenres" @mouseleave="closeMoreGenres">
                <p>{{g.genres[0].name}}</p>
                <i class="fa-solid fa-plus"></i>
              </div>
            </div>
            
            <div class="plataformContent">
              <p>Plataforms:</p>
              <div class="plataformIcons">
                <span v-for="(gen, i) in g.parent_platforms" :key="i">
                  <icons-plataform :icons="gen.platform.name"></icons-plataform>
                </span>
              </div>
            </div>
            <div class="moreDetailsContent">
              <div class="detailLink">
                <router-link :to="{name:'details', params: {slug: g.slug}}">
                  <p>Check All Details</p>
                </router-link>
                  <i class="fa-solid fa-circle-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
    </div>
  </section>
</template>

<script>
import starRating from './star-rating.vue';
import iconsPlataform from './icon-plataform.vue';
import moment from "moment";

export default {
  components: { starRating, iconsPlataform },
  name: 'CardGame',
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
    }
  },
  created(){},
  mounted() {},
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
    }
  }
}
</script>

<style lang="scss" scoped>
.conteiner{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: 80px;
  justify-content: center;
  align-items: center;

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
    
      h5{
        font-size: 18px;
        color: #FFF;
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
            /* border: 1px solid red; */
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
      height: 170px;
      width: 300px;
      position: fixed;
      padding: 10px;

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
</style>