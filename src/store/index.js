import { createStore } from 'vuex';

export default createStore({
    strict: true,
    state: {
        modal: {
            requirement: false,
        },
        error: false,
        loading: false
    },
    mutations: {
        toggleModalRequeriment(state, value){
            state.modal.requirement = value;
        },
        setError(state, value){
            state.error = value;
        },
        setLoading(state, value){
            state.loading = value;
        }
    },
})