export default {
    state: {
        m_productType: {
            rows: [],
            columns: [],
            col: []
        },
    },
    actions: {
        async fetchProductType(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/PosProductTypes');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('updateProductType', res_data);
        },
        async fetchProductType_column(ctx, id) {
            const res = await fetch(ctx.rootState.hostname + '/TexColumnConfigs/getColumnListAsJsonObj?tableName=pos_product_type&auth_id=' + id);
            const res_data = await res.json();
            ctx.commit('updateProductType_column', res_data);
        },
    },
    mutations: {
        updateProductType(state, data) {
            console.log(data)
            state.m_productType.rows = data;
        },
        productType_delete_row(state, index) {
            state.m_productType.rows.splice(parseInt(index), 1);
        },
        updateProductType_column(state, data) {
            state.m_productType.col = data;
            console.log(data)
                //status true bolgan ustun nomlarini olish uchun
            state.m_productType.columns = data.column_default_obj.filter(obj => { return obj.status === true }).map(({ name }) => name);
        },

    },
    getters: {
        allProductType(state) {
            return state.m_productType;
        }
    }
}