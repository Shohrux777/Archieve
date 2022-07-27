export default {
    state: {
        m_category: {
            rows: [],
            columns: [],
            col: []
        },

    },
    actions: {
        async fetchCategory(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/PosCategories');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('updateCategory', res_data);
        },
        async fetchCategory_column(ctx, id) {
            const res = await fetch(ctx.rootState.hostname + '/TexColumnConfigs/getColumnListAsJsonObj?tableName=pos_category&auth_id=' + id);
            const res_data = await res.json();
            ctx.commit('updateCategory_column', res_data);
        },
    },
    mutations: {
        updateCategory(state, data) {
            console.log(data)
            state.m_category.rows = data;
        },
        category_delete_row(state, index) {
            state.m_category.rows.splice(parseInt(index), 1);
        },
        updateCategory_column(state, data) {
            state.m_category.col = data;
            console.log(data)
                //status true bolgan ustun nomlarini olish uchun
            state.m_category.columns = data.column_default_obj.filter(obj => { return obj.status === true }).map(({ name }) => name);
        },

    },
    getters: {
        allCategory(state) {
            return state.m_category;
        }

    }
}