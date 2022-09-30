<template>
  <section class="container">
    <div class="imageBackgroundConteiner" :style="{backgroundImage: `url(${datails.background_image})`}">
      <div class="gradientTop"></div>
      <div class="infoContentLeft">
        <h2>{{ datails.name }}</h2>
        <p>{{ newDesc }}</p>
      </div>
      <div class="infoContentRight">
        
      </div>
    </div>
  </section>
</template>

<script>
import gameDetail from '../api/gameDetail';

export default {
  data(){
    return{
      datails: [],
      newDesc: '',
    }
  },
  props: ['slug'],
  mounted() {
    this.getGameDetail();

    setTimeout(() => {
      this.cleanTags();
    }, 1600);
  },
  methods:{
    getGameDetail(){
      gameDetail.show(this.$route.params.slug)
        .then(data => {
          this.datails = data.data;
        }); 
    },
    cleanTags(){
      const htmlRegexG = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
      return this.newDesc = JSON.parse(JSON.stringify(this.datails.description)).replace(htmlRegexG, '');
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  margin: 0 200px;
  margin-top: 90px;

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
        padding-top: 20px;
        font-size: 1.3rem;
        line-height: 35px;
        color: #FFF;
      }
    }
    .infoContentRight{
      width: 50%;
      height: 100%;
      background: linear-gradient(to left, var(--primary-bkg) , #202124ab);
    }
  }
}
</style>