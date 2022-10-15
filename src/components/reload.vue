<template>
  <div class="buttonContainer">
    <button @click="reloadPage">
        Reload <i class="fa-solid fa-rotate-right">
    </i></button>
  </div>
</template>

<script>
export default {
    methods: {
        reloadPage(){
            location.reload();
        }
    }
}
</script>

<style lang="scss" scoped>
.buttonContainer{
    text-align: center;
    
    button{
        text-transform: uppercase;
        font-weight: bold;
        background: var(--color-bkg);
        color: #FFF;
        border: none;
        padding: .5rem 1.5rem .5rem 1.5rem;
        border-radius: 10px;
        transition: .6s;
        &:hover{
            color: var(--color-bkg);
            background: var(--color-link);
        }
    }
}
</style>