<template>
  <section>
    <div class="coteiner">
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
              <p>Genres:</p><p>{{g.genres[0].name}}</p>
            </div>
            <div class="plataformContent">
              <p>Plataforms:</p><p v-for="(gen, i) in g.parent_platforms" :key="i">{{gen.platform.name}}</p>
            </div>
          </div>
        </div>
    </div>
  </section>
</template>

<script>
import starRating from './star-rating.vue';
import moment from "moment";

export default {
  components: { starRating },
  name: 'CardGame',
  data(){
    return{
      showCardMedio: null,
      colorMeta: '',
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
    }
  }
}
</script>

<style lang="scss" scoped>
.coteiner{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
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
      height: 200px;
      width: 300px;
      position: fixed;
      padding: 10px;

      .genresContent, .dateContent, .plataformContent{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 6px 0 10px 0;
        border-bottom: solid 1px var(--color-bkg);
        color: #FFF;
      }
    }

    &:hover{
      transform: scale(1.2);
      z-index: 2;
    }
  }
}
</style>