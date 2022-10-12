<template>
  <div class="cardContainer" v-for="(s,i) in series" :key="i">
    <div class="cardContent">   
        <div class="imgConteiner">
            <router-link :to="{name:'details', params: {slug: s.slug}}">
                <img :src="s.background_image" alt="" @click="reloadPage">
            </router-link>
        </div>
        <div class="textConteiner">
            <div class="cardBody">
                <div class="platIcon">
                    <span v-for="(gen, z) in s.parent_platforms" :key="z">
                        <iconPlat :icons="gen.platform.name" />
                    </span>
                </div>
                <h4>{{s.name}}</h4>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import iconPlat from './icon-plataform.vue';

export default {
    components: { iconPlat },
    props: {
        series: {
            type: Object,
            required: true
        }
    },
    data(){
        return{

        }
    },
    methods: {
        reloadPage(){
            setTimeout(() => {
                location.reload();
            }, 500);
        }
    }
}
</script>

<style lang="scss" scoped>
.cardContainer{
    padding: 20px;
    transition: .6s;

    .cardContent{
        .imgConteiner{
            img{
                border-radius: 10px 10px 0px 0px;
                width: 250px;
                height: 150px;
            }
        }
        .textConteiner{
            background: var(--color-bkg2);
            border-radius: 0 0 10px 10px;
            
            .cardBody{
                text-align: center;
                padding: 10px 20px 20px 20px;
                width: 250px;

                .platIcon{
                    justify-content: center;
                    display: flex;
                    flex-direction: row;
                    margin-bottom: 5px;
                    span{
                        margin-right: 8px;
                        font-size: 15px;
                        section{
                            background: var(--color-bkg2);
                        }
                    }
                }
            }
        }
    }

    &:hover{
      transform: scale(1.2);
      z-index: 2;
    }
}
</style>