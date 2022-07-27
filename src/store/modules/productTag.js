export default {
    state: {
        m_productTag: {
            rows: [],
            columns: [],
            col: []
        },
    },
    actions: {
        async fetchProductTag(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/PosProductTags');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('updateProductTag', res_data);
        },
        async fetchProductTag_column(ctx, id) {
            const res = await fetch(ctx.rootState.hostname + '/TexColumnConfigs/getColumnListAsJsonObj?tableName=pos_product_tag&auth_id=' + id);
            const res_data = await res.json();
            ctx.commit('updateProductTag_column', res_data);
        },
    },
    mutations: {
        updateProductTag(state, data) {
            console.log(data)
            state.m_productTag.rows = data;
        },
        productTag_delete_row(state, index) {
            state.m_productTag.rows.splice(parseInt(index), 1);
        },
        updateProductTag_column(state, data) {
            state.m_productTag.col = data;
            console.log(data)
                //status true bolgan ustun nomlarini olish uchun
            state.m_productTag.columns = data.column_default_obj.filter(obj => { return obj.status === true }).map(({ name }) => name);
        },

    },
    getters: {
        allProductTag(state) {
            return state.m_productTag;
        }
    }
}