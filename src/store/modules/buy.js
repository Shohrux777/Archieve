export default {
    state: {
        m_buy: {
            rows: [],
            columns: [],
            col: []
        },

    },
    actions: {
        async fetchBuy(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/PosInvoices');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('updateBuy', res_data);
        },
        async fetchBuy_column(ctx, id) {
            const res = await fetch(ctx.rootState.hostname + '/TexColumnConfigs/getColumnListAsJsonObj?tableName=pos_invoice&auth_id=' + id);
            const res_data = await res.json();
            ctx.commit('updateBuy_column', res_data);
        },
    },
    mutations: {
        updateBuy(state, data) {
            console.log(data)
            state.m_buy.rows = data;
        },
        buy_delete_row(state, index) {
            state.m_buy.rows.splice(parseInt(index), 1);
        },
        updateBuy_column(state, data) {
            state.m_buy.col = data;
            console.log(data)
                //status true bolgan ustun nomlarini olish uchun
            state.m_buy.columns = data.column_default_obj.filter(obj => { return obj.status === true }).map(({ name }) => name);
        },

    },
    getters: {
        allBuy(state) {
            return state.m_buy;
        }

    }
}