<template>
  <section>
    <div class="filterContainer">
        <ul v-for="(g, i) in generos" :key="i">
            <li @click="selectGenGame(g,$event)">
                {{g.name}}
            </li>
        </ul>
    </div>
    <div class="contentFilter" :style="{backgroundImage: `url(${imageGen})`}">
        <div class="textContent">
            <div>
                <h2>das</h2>
            </div>
            <div v-for="(j, z) in games" :key="z">
                <p>{{j.name}}</p>
            </div>
        </div>
    </div>
  </section>
</template>

<script>
import gameGenres from '../api/gameGenres';

export default {
    data(){
        return{
            activeGen: false,
            generos: [],
            imageGen: '',
            games: [],
        }
    },
    mounted(){
        this.getGenres();
    },
    methods: {
        getGenres(){
            gameGenres.then(data => {
                this.generos = data.data.results;
            });
        },
        selectGenGame(value, e){
            let games = document.querySelectorAll("li");
            games.forEach(g => g.classList.remove("active"));
            e.target.classList.add("active");

            this.activeGen=true;
            this.imageGen = value.image_background;
            this.games = value.games;
        }
    }
}
</script>

<style lang="scss" scoped>
section{
    z-index: 99;
    position: fixed;
    margin-top: 9vh !important;
    margin-right: 4vh !important;
    width: 70% !important;
    background: var(--bkg-transp-2);
    padding: 20px;
    right: 0;
    border-radius: 40px;
    box-shadow: rgba(156, 156, 156, 0.61) 0px 5px 15px 0px;

    .filterContainer{
        color: #FFF;
        display: flex;
        flex-wrap: wrap;
        ul{
            list-style: none;
            li{
                cursor: pointer;
                &:hover{
                    border-bottom: 3px solid #FFF;
                }
            }
        }
    }
    .contentFilter{
        border-top: 1px solid var(--color-bkg);
        height: 500px;
        background-position: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        opacity: 0.5;

        .textContent{
                
            h2{
                color: #FFF;
                opacity: 1 !important;
            }
            p{
                color: #FFF;
            }
        }
    }
    .active{
        border-bottom: 3px solid #FFF;
    }
}
</style>