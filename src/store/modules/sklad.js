export default {
    state: {
        m_sklad: {
            rows: [],
            columns: ['room_name', 'datchik_name'],
            col: []
        },

    },
    actions: {
        async fetchSklad(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/ArchiveRoomDetail');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('updateSklad', res_data);
        },
    },
    mutations: {
        updateSklad(state, data) {
            console.log('connect')
            console.log(data)
            state.m_sklad.rows = data;
        },
        sklad_delete_row(state, index) {
            state.m_sklad.rows.splice(parseInt(index), 1);
        },
    },
    getters: {
        allSklad(state) {
            return state.m_sklad;
        }

    }
}