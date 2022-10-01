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
        </div>
      </div>
    </div>
  </section>

  <modal :image="screenShots" />
</template>

<script>
import gameDetail from '../api/gameDetail';
import gameImages from '../api/imageGame';
import modal from '../components/modal.vue';

export default {
  data(){
    return{
      screenShots: [],
      datails: [],
      newDesc: '',
    }
  },
  components: {
    modal
  },
  props: ['slug'],
  mounted() {
    this.getGameDetail();
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
        }); 
    },
    getScreenShots(){
      gameImages.show(this.$route.params.slug)
        .then(data => {
          this.screenShots = data.data.results;
      });
    },
    cleanTags(){
      const htmlRegexG = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
      return this.newDesc = JSON.parse(JSON.stringify(this.datails.description)).replace(htmlRegexG, '');
    },
  }
}
</script>

<style lang="scss" scoped>
.container{
  /* margin: 0 200px; */
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
    }
  }
}
</style>