<template>
  <section>
    <i v-if="icons=='PC'" class="fa-brands fa-windows" title="PC"></i>
    <i v-if="icons=='Linux'" class="fa-brands fa-linux" title="Linux"></i>
    <i v-if="icons=='Nintendo'" class="fa-solid fa-game-console-handheld" title="Nintendo"></i>
    <i v-if="icons=='Apple Macintosh'" class="fa-brands fa-apple" title="Apple"></i>
    <i v-if="icons=='Android'" class="fa-brands fa-android" title="Android"></i>
    <i v-if="icons=='iOS'" class="fa-brands fa-app-store-ios" title="iOS"></i>
    <i v-if="icons=='Xbox'" class="fa-brands fa-xbox" title="Xbox"></i>
    <i v-if="icons=='PlayStation'" class="fa-brands fa-playstation" title="PlayStation"></i>
  </section>
</template>

<script>
export default {
    props: ['icons']
}
</script>