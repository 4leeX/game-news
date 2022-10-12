<template>
  <section class="container">
    <div class="imageBackgroundConteiner" :style="{backgroundImage: `url(${datails.background_image})`}">
      <div class="gradientTop"></div>
      <div class="infoContentLeft">
        <h2>{{ datails.name }}</h2>
        <p>{{ newDesc }}</p>

        <div class="ratingContainer">
          <span>Rating Graphic</span>
          <!-- <div class="ratingContent" v-for="(r, i) in datails.ratings" :key="i"> -->
            <!-- <p>{{setRatingCount(r)}}</p> -->
            <!-- <span>{{rating[i]}}</span>
            <span>{{r.count}} votes</span> -->
          <!-- </div> -->
        </div>
      </div>
      <div class="infoContentRight">
        <div class="imagesContainer">
          <div class="imgContent" @click="handleOpenModal('#modalTransferenciaPedido')" v-if="screenShots!=0">
            <img v-for="(img, i) in screenShots.slice(0, 4)" :key="i"
              :src="img.image" :alt="`${datails.name} image`">
          </div>
          <div class="infoContent">
            <div class="infoText">
              <div class="infoLeft">
                <div>
                  <p>Genre</p>
                  <span v-for="(g,i) in info.genres" :key="i">
                    {{g.name+" " || ""}}, 
                  </span>
                </div>
                <div>
                  <p>Tags</p>
                  <span v-for="(t,i) in info.tags.slice(0, 7)" :key="i">
                    {{t.name+" " || ""}}, 
                  </span>
                </div>
              </div>
              <div class="infoRight">
                <div>
                  <p>Plataforms</p>
                  <span v-for="(p,i) in info.platforms" :key="i">
                    {{p.platform.name+" " || ""}}, 
                  </span>
                </div>
                <div>
                  <p>Release date</p>
                  <small>
                    {{formatedReleaseDate(datails.released) || ""}} 
                  </small>
                </div>
                <div v-if="info.age">
                  <p>Age rating</p>
                  <small>
                    {{info.age['name']}}
                  </small>
                </div>
              </div>
            </div>
          </div>

          <div class="requirementsContent" v-if="$store.state.modal.requirement">
            <div class="requirement" @click="handleOpenModal('#modalRequirement')">
              <h5>System requirements</h5>
              <i class="fa-solid fa-gears"></i>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="gradientBottom"></div> -->
    </div>

    <div class="bottomConteiner">
      <div class="bottomContent">
        <small-card :series="gameSeries"/>
      </div>
    </div>
  </section>

  <modal :image="screenShots" />
  <modal-requirement :req="info.platforms" />
</template>

<script>
import gameDetail from '../api/gameDetail';
import gameImages from '../api/imageGame';
import gameSeries from '../api/gameSeries';
// import gameTrailer from '../api/gameTrailer';
import modal from '../components/modal.vue';
import smallCard from '../components/SmallCard.vue';
import modalRequirement from '../components/modalRequirement.vue';
// import rating from "../components/chart/rating";

import moment from "moment";

export default {
  data(){
    return{
      screenShots: [],
      gameTrailer: [],
      gameSeries: [],
      datails: [],
      newDesc: '',
      info: {
        platforms: [],
        genres: [],
        tags: [],
        age: {}
      },
      rating: ['Excelente', 'Muito Bom','Bom','Ruim'],
    }
  },
  components: {
    modal,
    // rating,
    modalRequirement,
    smallCard
  },
  props: ['slug'],
  mounted() {
    this.getGameDetail();
    setTimeout(() => {
      this.getScreenShots();
    }, 2000)

    setTimeout(() => {
      this.cleanTags();
      this.getGamesSeries();
    }, 1600);
  },
  methods:{
    handleOpenModal(modal){
      $(modal).modal("show")
    },
    getGameDetail(){
      gameDetail.show(this.$route.params.slug)
        .then(data => {
          this.datails = data.data;
          this.info.platforms = data.data.platforms;
          this.info.genres = data.data.genres;
          this.info.tags = data.data.tags;
          this.info.age = data.data.esrb_rating;
        })
        .catch(err => {
          console.log(err);
          this.$store.commit("setError", true);
        })
        .finally(() => {
          console.log(':)');
        }); 
    },
    getGamesSeries(){
      gameSeries.show(this.$route.params.slug)
        .then(data => {
          this.gameSeries = data.data.results;
        })
    },
    getScreenShots(){
      gameImages.show(this.$route.params.slug)
        .then(data => {
          this.screenShots = data.data.results;
      });
    },
    formatedReleaseDate(data){
      return moment(data, 'YYYY-MM-DD').format('DD/MM/YYYY')
    },
    cleanTags(){
      const htmlRegexG = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
      return this.newDesc = JSON.parse(JSON.stringify(this.datails.description)).replace(htmlRegexG, '');
    },
    setRatingCount(value){
      
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  padding-top: 90px;

  .imageBackgroundConteiner{
    height: 80vh;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    display: flex;
    

    .gradientTop{
      width: 80%;
      height: 20%;
      position: absolute;
      background: linear-gradient(to bottom, var(--primary-bkg) , #20212400);
    }
    .infoContentLeft{
      position: relative;
      width: 50%;
      height: 100%;
      background: linear-gradient(to right, var(--primary-bkg) , #202124ab);

      h2{
        padding-top: 20px;
        color: #FFF;
        font-size: 3rem;
      }
      p{
        padding-right: 20px;
        padding-top: 20px;
        font-size: 1.3rem;
        line-height: 35px;
        color: #FFF;
        max-height: 500px;
        overflow:auto;
        overflow-x: hidden;
      }

      .ratingContainer{
        padding: 20px;
        color: #FFF;
        width: 100%;
        text-align: left;
        border-radius: 10px;
        margin-top: 60px;
        background: var(--bkg-transp);
        
        .ratingContent{
          display: flex;
          justify-content: space-between;
        }
      }
    }
    .infoContentRight{
      position: relative;
      color: #FFF;
      width: 50%;
      height: 100%;
      text-align: center;
      margin:0 auto;
      background: linear-gradient(to left, var(--primary-bkg) , #202124ab);
      
      .imagesContainer{
        float: right;
        max-width: 70%;

        .imgContent{
          padding: 20px;
          border-radius: 10px;
          background: var(--bkg-transp);
          margin-top: 14%;
          cursor: pointer;
          
          img{
            padding: 5px;
            border-radius: 10px;
            width: 200px;
            height: 100px;
          }
        }
      }

      .infoContent{
        float: right;
        width: 100%;

        .infoText{
          color: #FFF;
          padding: 20px;
          border-radius: 10px;
          background: var(--bkg-transp);
          margin-top: 14%;
          display: flex;
          flex-direction: row;
          .infoLeft{
            min-width: 50%;
          }
          .infoRight{
            min-width: 50%;
          }

          .infoLeft, .infoRight{
            div{
              margin-bottom: 10px;
              p{
                color: var(--color-bkg);
                font-size: 0.9rem;
                font-weight: bold;
                margin: 0;
              }
              span{ 
                text-decoration: underline;
              }
            }
          }
        }
      }

      .requirementsContent{
        float: right;
        width: 100%;
                
        .requirement{
          color: #FFF;
          padding: 20px;
          border-radius: 10px;
          background: var(--bkg-transp);
          margin-top: 14%;
          display: flex;
          flex-direction: row;
          align-items: center;
          cursor: pointer;

          h5{
            margin-right: 10px;
            transition: .6s;
          }
          i{
            font-size: 1.2rem;
            transition: .6s;
          }
          &:hover{
            h5,i{
              color: var(--color-link);
            }
          }
        }
      }
    }

    .gradientBottom{
      width: 80%;
      height: 20%;
      position: absolute;
      bottom: 80vh;
      background: linear-gradient(to top, var(--primary-bkg) , #20212400);
    }
  }

  .bottomConteiner{
    width: 100%;
    color: #FFF;
    /* background: red; */
    .bottomContent{
      flex-wrap: wrap;
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
  }
}
</style>