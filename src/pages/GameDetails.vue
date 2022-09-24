<template>
  <section>
    <h1>ALOOOOOOOOO</h1>
  </section>
</template>

<script>
import gameDetail from '../api/gameDetail';

export default {
  data(){
    return{
      datails: [],
    }
  },
  props: ['slug'],
  mounted() {
    this.gameDetail();
  },
  methods:{
    gameDetail(){
      gameDetail.show(this.$route.params.slug)
        .then(data => {
          this.datails = data.data;
        }); 
    }
  }
}
</script>

<style lang="scss" scoped>

</style>