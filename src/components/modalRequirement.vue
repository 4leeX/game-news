<template>
    <div class="modal fade" id="modalRequirement" ref="modalRequirement" tabindex="-1" role="dialog" aria-labelledby="modalRequirement" aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="d-flex justify-content-start"></div>
                </div>
                <div class="modal-body">                     
                    <div class="jumbotron jumbotron-fluid bg-transparent m-0">
                        <nav>
                            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                <button v-for="(p, i) in requirement" :key="i" class="nav-link" :id="`nav-${p.platform.slug}-tab`" data-bs-toggle="tab" :data-bs-target="`#nav-${p.platform.slug}`" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">
                                    {{p.platform.name}}
                                </button>
                            </div>
                        </nav>
                        <div class="tab-content" id="nav-tabContent">
                                <div v-for="(r, i) in requirement" :key="i" class="tab-pane fade text-white" :id="`nav-${r.platform.slug}`" role="tabpanel" :aria-labelledby="`nav-${r.platform.slug}-tab`">
                                    {{ r.requirements.minimum }}
                                </div>
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
            requirement: [],
        }
    },
    props: ['req'],
    // emits: ['showModalReq'],
    mounted(){
        setTimeout(() => {
            this.showPlatRequeriments();
        }, 1600);
        setTimeout(() => {
            this.selectActive();
        }, 4000);
    },
    computed:{},
    methods: {
        showPlatRequeriments(){
            let result = JSON.parse(JSON.stringify(this.req));
            result.map(data => {
                if(data.requirements.minimum !== undefined){
                    this.requirement.push(data);
                }
            });
        },
         selectActive(){
            if(this.requirement!=''){
                let link = document.querySelector(`#nav-${this.requirement[0].platform.slug}-tab`);
                let minimum = document.querySelector(`#nav-${this.requirement[0].platform.slug}`);
                link.classList.add("active");
                minimum.className += " show active";
                this.$store.commit("toggleModalRequeriment", true);
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
</style>