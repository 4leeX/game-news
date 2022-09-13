<template>
  <header class="principalContainer">
    <nav class="navContainer">
        <a href="#">Loja</a>
        <a href="#">Comunidade</a>
        <a href="#">Sobre</a>
        <a href="#">Suporte</a>
    </nav>
  </header>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.principalContainer{
    background: rgb(88, 88, 88);
    padding: 0 300px;
    max-width: 100%;
    height: 80px;

    .navContainer{
        align-items: center;
        padding: 30px 0;
        margin: 0 35%;

        a{
            color: #FFF;
            margin-right: 25px;
            text-decoration: none;
        }
    }
}
</style>