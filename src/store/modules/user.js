export default {
    state: {
        m_user: {
            rows: [],
            columns: ['fio', 'position', 'department_name', 'login'],
            col: []
        },
        auth_list: [],

    },
    actions: {
        async fetchUser(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/ArchiveUser');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('updateUser', res_data);
        },

        async fetch_auth_list(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/PosAuthorizations');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('updateAuth_list', res_data);
        },
    },
    mutations: {
        updateUser(state, data) {
            console.log('user')
            console.log(data)
            state.m_user.rows = data;
        },
        user_delete_row(state, index) {
            state.m_user.rows.splice(parseInt(index), 1);
        },

        updateAuth_list(state, data) {
            console.log(data)
            state.auth_list = data;
        },

    },
    getters: {
        allUser(state) {
            return state.m_user;
        },
        auth_user_list(state) {
            return state.auth_list;
        }

    }
}