export default {
    state: {
        m_companny: {
            rows: [],
            columns: ['name', 'address', 'note'],
            col: []
        },

    },
    actions: {
        async fetchCompany(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/ArchiveCompany');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('updateCompany', res_data);
        },
        // async fetchCompany_column(ctx, id) {
        //     const res = await fetch(ctx.rootState.hostname + '/TexColumnConfigs/getColumnListAsJsonObj?tableName=pos_company&auth_id=' + id);
        //     const res_data = await res.json();
        //     ctx.commit('updateCompany_column', res_data);
        // },
    },
    mutations: {
        updateCompany(state, data) {
            console.log(data)
            state.m_companny.rows = data;
        },
        company_delete_row(state, index) {
            state.m_companny.rows.splice(parseInt(index), 1);
        },
        // updateCompany_column(state, data) {
        //     state.m_companny.col = data;
        //     console.log(data)
        //         //status true bolgan ustun nomlarini olish uchun
        //     state.m_companny.columns = data.column_default_obj.filter(obj => { return obj.status === true }).map(({ name }) => name);
        // },

    },
    getters: {
        allCompany(state) {
            return state.m_companny;
        }

    }
}