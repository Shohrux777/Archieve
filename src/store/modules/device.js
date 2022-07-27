export default {
    state: {
        m_device: {
            rows: [],
            columns: ['name', 'ip', 'port', 'password'],
            col: []
        },

    },
    actions: {
        async fetchDevice(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/ArchiveDevices');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('updateDevice', res_data);
        },
    },
    mutations: {
        updateDevice(state, data) {
            state.m_device.rows = data;
        },
        device_delete_row(state, index) {
            state.m_device.rows.splice(parseInt(index), 1);
        },

    },
    getters: {
        allDevice(state) {
            return state.m_device;
        }

    }
}