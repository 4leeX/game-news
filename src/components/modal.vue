<template>
    <div class="modal fade" id="modalTransferenciaPedido" ref="modalTransferenciaPedido" tabindex="-1" role="dialog" aria-labelledby="modalTransferenciaPedidoLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="d-flex justify-content-start"></div>
                </div>
                <div class="modal-body">                     
                    <div class="jumbotron jumbotron-fluid bg-transparent m-0">
                        <div class="container text-center">
                                <img class="principal-img" :src="primaryImg" alt="">
                        </div>
                        <div class="container text-center">                            
                            <i class="fa-solid fa-chevron-left" @click="nextImageLeft(image)" v-if="showLeft"></i>
                                <img class="secondary-img" v-for="(img, i) in image" :key="i" :src="img.image" alt="" @click="changeImg(img.image)">
                            <i class="fa-solid fa-chevron-right" @click="nextImageRight(image)" v-if="showRight"></i>
                        </div>
                        <div class="container text-center d-flex justify-content-start mt-3">
                        </div>
                    </div>
                </div>
                <div class="modal-footer"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            primaryImg: '',
            increment: 0,
            showLeft: true,
            showRight: true
        }
    },
    props: ['image'],
    mounted(){
        setTimeout(() => {
            if(this.primaryImg == ''){
                return this.primaryImg = this.image[0].image;
            }
        }, 5000);
    },
    methods: {
        changeImg(img){
            return this.primaryImg = img;
        },
        nextImageLeft(value){
            let click = --this.increment;
            let images = JSON.parse(JSON.stringify(value));

            if(images[click] == undefined){
                this.primaryImg = images[0].image;
                this.showLeft=false;
                this.showRight=true;
            }else{
                this.primaryImg = images[click].image;
            }
        },
        nextImageRight(value){
            let click = ++this.increment;
            let images = JSON.parse(JSON.stringify(value));

            if(images[click] == undefined){
                this.primaryImg = images[0].image;
                this.showRight=false;
                this.showLeft=true;
            }else{
                this.primaryImg = images[click].image;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.modal-content{
    background: var(--bkg-search);
}
.principal-img{
    width: 100%;
    height: 60%;
    margin-bottom: 25px;
    border-radius: 10px;
}
.secondary-img{
    width: 150px;
    height: 100px;
    border-radius: 10px;
    padding: 2px;
    cursor: pointer;
}
.modal-header, .modal-footer{
    border-color: var(--color-bkg);
}
i{
    font-size: 1.6rem;
    color: #FFF;
    cursor: pointer;
    transition: 0.6s;
    &:hover{
        transform: scale(0.8);
    }
}

@media (max-width: 992px) {
    .secondary-img{
        width: 60px;
        height: 50px;
    }
    i{
        display: none;
    }
}
</style>