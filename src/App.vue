<template>
  <section>
    <Navbar />
    <!-- <Home /> -->
    <router-view />
  </section>
</template>

<script setup>
  import Home from './components/Home.vue';
  import Navbar from './components/Navbar.vue';
</script>

<style scoped>
/* .logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
} */
</style>
