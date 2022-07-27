import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'login',
        meta: { layout: 'empty' },
        component: () =>
            import ('../views/login/login.vue')
    },
    {
        path: '/company',
        name: 'company',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/company/company.vue')
    },
    {
        path: '/company_add/:id',
        name: 'company_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/company/company_Add.vue')
    },
    {
        path: '/user',
        name: 'user',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/user/user.vue')
    },
    {
        path: '/user_add/:id',
        name: 'user_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/user/user_Add.vue')
    },
    {
        path: '/datchik',
        name: 'datchik',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/user/datchik.vue')
    },
    {
        path: '/datchik_add/:id',
        name: 'datchik_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/user/datchik_Add.vue')
    },
    {
        path: '/room',
        name: 'room',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/room/room.vue')
    },
    {
        path: '/room_add/:id',
        name: 'room_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/room/room_Add.vue')
    },
    {
        path: '/department',
        name: 'department',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/department/department.vue')
    },
    {
        path: '/department_add/:id',
        name: 'department_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/department/department_Add.vue')
    },
    {
        path: '/device',
        name: 'device',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/device/device.vue')
    },
    {
        path: '/device_add/:id',
        name: 'device_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/device/device_Add.vue')
    },
    {
        path: '/connect',
        name: 'connect',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/connect/connect.vue')
    },
    {
        path: '/connect_add/:id',
        name: 'connect_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/connect/connect_Add.vue')
    },
    {
        path: '/authorization',
        name: 'authorization',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/user/authorization.vue')
    },
    {
        path: '/report',
        name: 'report',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/report/report.vue')
    },
    {
        path: '/reportDevice',
        name: 'reportDevice',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/report/reportDevice.vue')
    },
    {
        path: '/reportDevice1',
        name: 'reportDevice1',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/report/reportDevice1.vue')
    },
    {
        path: '/reportChart',
        name: 'reportChart',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/report/reportChart.vue')
    },
    {
        path: '/notificationReceive',
        name: 'notificationReceive',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/notification/notificationReceive.vue')
    },
    {
        path: '/notificationReceive_add/:id',
        name: 'notificationReceive_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/notification/notificationReceive_Add.vue')
    },
    {
        path: '/chart',
        name: 'chart',
        meta: { layout: 'empty' },
        component: () =>
            import ('../views/chart/chartline.vue')
    },


]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router