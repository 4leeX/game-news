import { createStore } from 'vuex';

export default createStore({
    strict: true,
    state: {
        modal: {
            requirement: false,
            filter: false
        },
        error: false,
        loading: true
    },
    mutations: {
        toggleModalRequeriment(state, value){
            state.modal.requirement = value;
        },
        toggleModalFilter(state, value){
            state.modal.filter = value;
        },
        setError(state, value){
            state.error = value;
        },
        setLoading(state, value){
            state.loading = value;
        }
    },
})