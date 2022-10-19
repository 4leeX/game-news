<template>
  <div>
    <i v-if="image=='Google Play'" class="fa-brands fa-google-play" title="Google Play"></i>
    <i v-if="image=='Steam'" class="fa-brands fa-steam" title="Steam"></i>
    <i v-if="image=='App Store'" class="fa-brands fa-app-store" title="App Store"></i> 
    <i v-if="image=='PlayStation Store'" class="fa-brands fa-playstation" title="PlayStation Store"></i> 
    <i v-if="image=='GOG'" class="fa-brands fa-goodreads-g" title="GOG"></i>
    <i v-if="image=='Xbox 360 Store'" class="fa-brands fa-xbox" title="xbox"></i>
    <i v-if="image=='Epic Games'" class="fa-solid fa-e" title="Epic Games"></i>
    <i v-if="image=='Nintendo Store'" class="fa-solid fa-gamepad" title="Nintendo Store"></i>
    <i v-if="image=='Xbox Store'" class="fa-brands fa-microsoft" title="Xbox Store"></i>
  </div>
</template>

<script>
export default {
    props: ['image']
}
</script>

<style lang="scss" scoped>
i{
    color: #FFF;
    font-size: 3rem;
}
</style>