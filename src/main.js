import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import Vuelidate from 'vuelidate'
import Toast from "./components/alert.vue";
import massage_box from "./components/massage_box.vue";
import loader from './components/loader.vue'
import loaderTable from './components/loaderTable.vue'
import VueApexCharts from 'vue-apexcharts'


Vue.component('apexchart', VueApexCharts)
Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.component('Toast', Toast)
Vue.component('massage_box', massage_box)
Vue.component('loader', loader)
Vue.component('loaderTable', loaderTable)

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')