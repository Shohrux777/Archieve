export default {
    state: {
        m_client: {
            rows: [],
            columns: ['name', 'code', 'min_value', 'max_value'],
            col: []
        },
        auth_list: [],

    },
    actions: {
        async fetchClient(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/ArchiveDatchik');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('updateClient', res_data);
        },
        // async fetchClient_column(ctx, id) {
        //     const res = await fetch(ctx.rootState.hostname + '/TexColumnConfigs/getColumnListAsJsonObj?tableName=pos_client&auth_id=' + id);
        //     const res_data = await res.json();
        //     ctx.commit('updateClient_column', res_data);
        // },
    },
    mutations: {
        updateClient(state, data) {
            console.log(data)
            state.m_client.rows = data;
        },
        client_delete_row(state, index) {
            state.m_client.rows.splice(parseInt(index), 1);
        },
        // updateClient_column(state, data) {
        //     state.m_client.col = data;
        //     console.log(data)
        //         //status true bolgan ustun nomlarini olish uchun
        //     state.m_client.columns = data.column_default_obj.filter(obj => { return obj.status === true }).map(({ name }) => name);
        // },

    },
    getters: {
        allClient(state) {
            return state.m_client;
        },

    }
}