import { createStore } from 'vuex';

export default createStore({
    strict: true,
    state: {
        modal: {
            requirement: false,
        },
    },
    mutations: {
        toggleModalRequeriment(state, value){
            state.modal.requirement = value;
        },
    },
})