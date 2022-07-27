export default {
    state: {
        m_brend: {
            rows: [],
            columns: ['name','info_1','info_2','info_3','info_4','info_5','info_6','info_7','info_8','info_9','info_10','info_11','info_12','info_13','info_14','info_15','info_16','info_17'],
            col: []
        },

    },
    actions: {
        async fetchBrend(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/ArchiveRoom');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('updateBrend', res_data);
        }
    },
    mutations: {
        updateBrend(state, data) {
            console.log(data)
            state.m_brend.rows = data;
        },
        brend_delete_row(state, index) {
            state.m_brend.rows.splice(parseInt(index), 1);
        },

    },
    getters: {
        allBrend(state) {
            return state.m_brend;
        }

    }
}