<template>
  <section class="container">
    <div class="imageBackgroundConteiner" :style="{backgroundImage: `url(${datails.background_image})`}">
      <div class="gradientTop"></div>
      <div class="infoContentLeft">
        <h2>{{ datails.name }}</h2>
        <p>{{ newDesc }}</p>
      </div>
      <div class="infoContentRight">
        <div class="imagesContainer">
          <div class="imgContent" @click="handleOpenModal('#modalTransferenciaPedido')">
            <img v-for="(img, i) in screenShots.slice(0, 4)" :key="i"
              :src="img.image" :alt="`${datails.name} image`">
          </div>
          <div class="infoContent">
            <div class="infoText">
              <div class="infoLeft">
                <div>
                  <p>Genre</p>
                  <span v-for="(g,i) in info.genres" :key="i">
                    {{g.name+" "}}, 
                  </span>
                </div>
                <div>
                  <p>Tags</p>
                  <span v-for="(t,i) in info.tags.slice(0, 7)" :key="i">
                    {{t.name+" "}}, 
                  </span>
                </div>
              </div>
              <div class="infoRight">
                <div>
                  <p>Plataforms</p>
                  <span v-for="(p,i) in info.platforms" :key="i">
                    {{p.platform.name+" "}}, 
                  </span>
                </div>
                <div>
                  <p>Release date</p>
                  <small>
                    {{formatedReleaseDate(datails.released)}} 
                  </small>
                </div>
                <div>
                  <p>Age rating</p>
                  <small>
                    {{info.age['name']}}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <modal :image="screenShots" />
</template>

<script>
import gameDetail from '../api/gameDetail';
import gameImages from '../api/imageGame';
import gameTrailer from '../api/gameTrailer';
import modal from '../components/modal.vue';
import moment from "moment";

export default {
  data(){
    return{
      screenShots: [],
      gameTrailer: [],
      datails: [],
      newDesc: '',
      info: {
        platforms: [],
        genres: [],
        tags: [],
        age: {}
      }

    }
  },
  components: {
    modal
  },
  props: ['slug'],
  mounted() {
    this.getGameDetail();
    // this.getGameTrailer();
    setTimeout(() => {

      this.getScreenShots();
    }, 2000)

    setTimeout(() => {
      this.cleanTags();
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
        })
        .finally(() => {
          console.log(':)');
        }); 
    },
    getScreenShots(){
      gameImages.show(this.$route.params.slug)
        .then(data => {
          this.screenShots = data.data.results;
      });
    },
    getInfoData(){

    },
    formatedReleaseDate(data){
      return moment(data, 'YYYY-MM-DD').format('DD/MM/YYYY')
    },
    // getGameTrailer(){
    //   gameTrailer.show(this.$route.params.slug)
    //     .then(data => {
    //       this.gameTrailer = data.data.results;
    //   });
    // },
    cleanTags(){
      const htmlRegexG = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
      return this.newDesc = JSON.parse(JSON.stringify(this.datails.description)).replace(htmlRegexG, '');
    },
  }
}
</script>

<style lang="scss" scoped>
.container{
  padding-top: 90px;

  .imageBackgroundConteiner{
    height: 100vh;
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
    }
  }
}
</style>