export default {
  state: {
      m_notificationReceive: {
          rows: [],
          columns: ['fio', 'phone_number'],
          col: []
      },

  },
  actions: {
      async fetchNotification(ctx) {
          const res = await fetch(ctx.rootState.hostname + '/ArchiveNotificationReciver');
          const res_data = await res.json();
          // console.log(ctx.rootState.hostname);
          ctx.commit('updateNotification', res_data);
      }
  },
  mutations: {
      updateNotification(state, data) {
          console.log(data)
          state.m_notificationReceive.rows = data;
      },
      notification_delete_row(state, index) {
          state.m_notificationReceive.rows.splice(parseInt(index), 1);
      },

  },
  getters: {
      allNotification(state) {
          return state.m_notificationReceive;
      }

  }
}