export default {
    state: {
        m_measurment: {
            rows: [],
            columns: [],
            col: []
        },

    },
    actions: {
        async fetchMeasurment(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/PosProductUnitMeasurments');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('updateMeasurment', res_data);
        },
        async fetchMeasurment_column(ctx, id) {
            const res = await fetch(ctx.rootState.hostname + '/TexColumnConfigs/getColumnListAsJsonObj?tableName=pos_product_unitmeasurment&auth_id=' + id);
            const res_data = await res.json();
            ctx.commit('updateMeasurment_column', res_data);
        },
    },
    mutations: {
        updateMeasurment(state, data) {
            console.log(data)
            state.m_measurment.rows = data;
        },
        measurment_delete_row(state, index) {
            state.m_measurment.rows.splice(parseInt(index), 1);
        },
        updateMeasurment_column(state, data) {
            state.m_measurment.col = data;
            console.log(data)
                //status true bolgan ustun nomlarini olish uchun
            state.m_measurment.columns = data.column_default_obj.filter(obj => { return obj.status === true }).map(({ name }) => name);
        },

    },
    getters: {
        allMeasurment(state) {
            return state.m_measurment;
        }

    }
}