export default {
    state: {
        m_product: {
            rows: [],
            columns: [],
            col: []
        },
        m_categoryIdProduct: {}
    },
    actions: {
        async fetchProduct(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/PosProducts');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('updateProduct', res_data);
        },
        async fetchCategoryIdProduct(ctx, id) {
            const res = await fetch(ctx.rootState.hostname + '/PosCategories/getProductListBycategoryId?category_id=' + id);
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('updateCategoryIdProduct', res_data);
        },
        async fetchCategoryAllProduct(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/PosProducts/getPagination?page=0&size=100');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('updateCategoryAllProduct', res_data);
        },

        async fetchProductSearchByName(ctx, name) {
            const res = await fetch(ctx.rootState.hostname + '/PosProducts/checkProductByName?name=' + name);
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('updateProductSearchByName', res_data);
        },

        async fetchProduct_column(ctx, id) {
            const res = await fetch(ctx.rootState.hostname + '/TexColumnConfigs/getColumnListAsJsonObj?tableName=pos_product&auth_id=' + id);
            const res_data = await res.json();
            ctx.commit('updateProduct_column', res_data);
        },
    },
    mutations: {
        updateProduct(state, data) {
            state.m_product.rows = data;
        },


        updateCategoryAllProduct(state, data) {
            state.m_categoryIdProduct = data;
        },
        updateCategoryIdProduct(state, data) {
            state.m_categoryIdProduct = {};
            state.m_categoryIdProduct.items_list = data;
        },
        updateProductSearchByName(state, data) {
            state.m_categoryIdProduct.items_list = [];
            state.m_categoryIdProduct.items_list.push(data);
        },



        product_delete_row(state, index) {
            state.m_product.rows.splice(parseInt(index), 1);
        },
        updateProduct_column(state, data) {
            state.m_product.col = data;
            //status true bolgan ustun nomlarini olish uchun
            state.m_product.columns = data.column_default_obj.filter(obj => { return obj.status === true }).map(({ name }) => name);
        },

    },
    getters: {
        allProduct(state) {
            return state.m_product;
        },
        get_m_categoryIdProduct(state) {
            return state.m_categoryIdProduct;
        }
    }
}