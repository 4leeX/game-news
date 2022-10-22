<template>
  <section>
    <div class="filterContainer">
        <ul v-for="(g, i) in generos" :key="i">
            <li @click="selectGenGame(g,$event)">
                {{g.name}}
            </li>
        </ul>
    </div>
    <div class="gradientTop"></div>
    <div class="contentFilter" :style="{backgroundImage: `url(${imageGen=='' ? firstImage :  imageGen})`}">
        <div class="textContent">
            <div class="titleContent">
                <h2>{{genSelect!='' ? genSelect : ''}}</h2>
            </div>
            <div class="gamesContent">
                <div class="titleContent">
                    <div v-for="(j, z) in games" :key="z">
                        <p @mouseenter="getGameDetail(j.slug)">{{j.name}}</p>
                    </div>
                </div>
                <div class="filteredGame" v-if="filterGame">
                    <div class="imgGame">
                        <img :src="gameDetail.background_image" alt="">
                    </div>
                    <div class="contentGameFilter">
                        <div class="textContent">
                            <div>
                                <span v-for="(t,i) in (gameDetail.tags).slice(0,15)" :key="i">{{t.name}}</span>
                            </div>
                            <div class="imgIconPlatform">
                                <img-icon-plataform v-for="(s,z) in gameDetail.stores" :key="z" :image="s.store.name" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="gradientBottom"></div>
  </section>
</template>

<script>
import gameGenres from '../api/gameGenres';
import gameDetails from '../api/gameDetail';
import ImgIconPlataform from './img-icon-plataform.vue';

export default {
    data(){
        return{
            filterGame: false,
            firstImage: '',
            gameDetail: [],
            genSelect: '',
            generos: [],
            imageGen: '',
            games: [],
        }
    },
    components: {ImgIconPlataform},
    mounted(){
        this.getGenres();
        setTimeout(() => this.selectMountedImage(), 500);
    },
    methods: {
        getGenres(){
            gameGenres.then(({data}) => this.generos = data.results);
        },
        async getGameDetail(slug){
            await gameDetails.show(slug)
            .then(({data}) => this.gameDetail = data)
            .catch(err => {
                console.log(err);
                this.$store.commit("setError", true);
            })
            .finally(() => {
                this.$store.commit("setLoading", false);
            }); 
        },
        selectGenGame(value, e){
            let games = document.querySelectorAll("li");
            games.forEach(g => g.classList.remove("active"));
            e.target.classList.add("active");

            this.activeGen=true;
            this.filterGame=false;
            this.imageGen = value.image_background;
            this.genSelect = e.target.innerText;
            this.games = value.games;
        },
        selectMountedImage(){
            if(this.firstImage=='') this.firstImage=this.generos[0]['image_background'];
        }
    },
    watch: {
        gameDetail(nv, ov){
            if(nv!=''){
                let nImg=nv.background_image;
                this.imageGen=nImg;
                this.filterGame=true;
            }
            // console.log(nv, 'new');
            // console.log(ov, 'old');
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
    .gradientTop{
      width: calc(100% - 40px);
      height: 50%;
      position: absolute;
      background: linear-gradient(to bottom, var(--primary-bkg) , #20212400);
    }
    .gradientBottom{
      bottom: 0;
      height: 80%;
      width: calc(100% - 40px);
      margin-bottom: 20px;
      position: absolute;
      border-radius: 0 0 30px 30px;
      background: linear-gradient(to top, var(--primary-bkg) , #20212400);
    }
    .contentFilter{
        border-top: 1px solid var(--color-bkg);
        height: 500px;
        border-radius: 4px 4px 40px 40px;
        background-position: 100%;
        background-repeat: no-repeat;
        background-size: cover;

        .textContent{
            position: relative;
            z-index: 9999;
            height: 100%;
            padding: 15px;

            .titleContent{
                justify-content: space-evenly;
                text-align: center;
                h2{
                    border-bottom: 1px solid var(--bkg-transp-2);
                    padding-bottom: 10px;
                    color: #FFF;
                }
            }
        }
        .gamesContent{
            /* display: flex; */
            justify-content: space-evenly;
            margin-top: 40px;

            .titleContent{
                display: flex;
                flex-direction: row;
                div{
                    padding: 10px;
                    p{
                        padding: 2px 20px 2px 20px;
                        border-radius: 50px;
                        text-align: center;
                        font-size: 1.3rem;
                        background: var(--bkg-transp);
                        cursor: pointer;                  
                        transition: .6s;
                        color: #FFF;
                        &:hover{
                            font-size: 1.4rem;
                            padding: 3px 22px 3px 22px;
                            border: 1px solid var(--bkg-transp-2);
                        }
                    }
                }
            }
            .filteredGame{
                margin-top: 30px;
                display: flex;

                .imgGame{
                    padding-right: 20px;
                    img{
                        width: 200px;
                        height: 200px;
                        border-radius: 100%;
                        box-shadow: var(--color-bkg) 0px 5px 15px 0px;
                    }
                }
                .contentGameFilter{
                    width: 100%;
                    height: 200px;
                    background: var(--bkg-transp);
                    border-radius: 50px;
                    flex-wrap: wrap;
                    .textContent{
                        flex-wrap: wrap;
                        max-width: 100%;
                        display: flex;
                        div{
                            padding: 10px;
                            span{
                                margin: 6px 0 0 6px;
                                background: var(--color-bkg2);
                                border-radius: 5px;
                                padding: 2px 10px 2px 10px;
                                color: #FFF;
                                transition: .2s;
                                &:hover{
                                    background: var(--color-bkg);
                                }
                            }
                        }
                        .imgIconPlatform{
                            display: flex;
                            flex-direction: row;
                        }
                    }
                }
            }
        }
    }
    .active{
        border-bottom: 3px solid #FFF;
    }
}
</style>