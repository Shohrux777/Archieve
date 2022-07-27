export default {
    state: {
        m_department: {
            rows: [],
            columns: [],
            col: []
        },
        zakaz_product_list: [],
        product_qty: 0,
        product_summ: [],
        zakaz_product_all_list: [

        ],
        page_savat: 0,


    },
    actions: {

    },
    mutations: {
        update_zakaz_product_all_list(state) {
            var emptyArr = []
            state.zakaz_product_all_list.push(emptyArr)
            state.product_summ.push(0)
        },
        select_savat_page(state, i) {
            state.page_savat = i;
            console.log('select')
            console.log(state.page_savat)
        },
        add_savat_page(state) {
            var emptyArray = []
            state.zakaz_product_all_list.push(emptyArray)
            state.page_savat++;
            state.product_summ.push(0)
        },
        del_savat_page(state, i) {
            console.log(i)
            state.zakaz_product_all_list.splice(parseInt(i), 1);
            state.product_summ.splice(parseInt(i), 1);
            if (state.zakaz_product_all_list.length == 0) {
                let array = [];
                state.zakaz_product_all_list.push(array)
                state.product_summ.push(0)
                state.page_savat = 0;
            } else {
                if (state.product_summ.length == i) {
                    state.page_savat = parseInt(i) - 1
                    console.log('state.page_savat')
                    console.log(state.page_savat)
                } else {
                    state.page_savat = i
                    console.log('state.page_savat')
                    console.log(state.page_savat)
                }
            }
        },



        add_product_order(state, data) {
            console.log(data)
            state.product_qty++;
            console.log('state.product_summ[state.page_savat]')
            console.log(state.product_summ[state.page_savat])
            state.product_summ[state.page_savat] += (data.buyed_price);
            console.log(state.product_summ[state.page_savat])

            var a = {
                real_company_id: localStorage.CompId,
                product_id: null,
                name: '',
                unit_price: 0,
                summ: 0,
                real_sum: 0,
                qty: 1,
                inputShow: false,
                addShow: false,
                posInvoiceid: 0,
                invoice: ""
            }
            var s = 0;
            var index = -1;
            a.product_id = data.id;
            a.name = data.name;
            a.unit_price = data.buyed_price;
            a.summ = data.buyed_price;
            a.real_sum = data.price;
            if (state.zakaz_product_all_list[state.page_savat].length == 0) {
                state.zakaz_product_all_list[state.page_savat].push(a)
                state.zakaz_product_all_list[state.page_savat][0].addShow = true;
                setTimeout(function() {
                    state.zakaz_product_all_list[state.page_savat][0].addShow = false;
                }, 250);
            } else {
                for (var i = 0; i < state.zakaz_product_all_list[state.page_savat].length; i++) {
                    if (state.zakaz_product_all_list[state.page_savat][i].product_id === data.id) {
                        s++;
                        index = i;
                        break;
                    }
                }
                if (s == 0) {
                    state.zakaz_product_all_list[state.page_savat].push(a)
                    state.zakaz_product_all_list[state.page_savat][state.zakaz_product_all_list[state.page_savat].length - 1].addShow = true;
                    setTimeout(function() {
                        state.zakaz_product_all_list[state.page_savat][state.zakaz_product_all_list[state.page_savat].length - 1].addShow = false;
                    }, 250);
                } else {
                    state.zakaz_product_all_list[state.page_savat][index].qty++;
                    state.zakaz_product_all_list[state.page_savat][index].addShow = true;
                    setTimeout(function() {
                        state.zakaz_product_all_list[state.page_savat][index].addShow = false;
                    }, 250);
                }
            }
            console.log('state.zakaz_product_all_list[state.page_savat]')

        },

        minus_product(state, data) {
            console.log(data);
            state.zakaz_product_all_list[state.page_savat][data.index].qty--;
            state.product_qty--;
            state.product_summ[state.page_savat] -= (data.data.unit_price);
        },
        plus_product(state, data) {
            console.log(data);
            state.zakaz_product_all_list[state.page_savat][data.index].qty++;
            state.product_qty++;
            state.product_summ[state.page_savat] += (data.data.unit_price);

        },
        input_qty_product(state, data) {
            // var prQty = null;
            // prQty = data.qty - state.zakaz_product_all_list[state.page_savat][data.index].qty
            // console.log(state.zakaz_product_all_list[state.page_savat][data.index].qty)
            // console.log(prQty)
            //     // state.zakaz_product_all_list[state.page_savat][data.index].qty = data.qty;
            // state.product_summ[state.page_savat] += data.price;
            console.log(state.zakaz_product_all_list[state.page_savat])
            console.log(data)
        },
        del_product(state, data) {
            console.log(data);
            if (state.zakaz_product_all_list[state.page_savat][data.index].qty != '') {
                state.product_qty--;
                state.product_summ[state.page_savat] -= (data.data.unit_price);
            }
            state.zakaz_product_all_list[state.page_savat].splice(data.index, 1);


        },
        input_change(state, index) {
            state.zakaz_product_all_list[state.page_savat][index].inputShow = true;
        },
        clear_order(state) {
            state.zakaz_product_all_list[state.page_savat] = [];
            state.product_qty = 0;
            state.product_summ[state.page_savat] = 0;
        },
        changeSumma(state) {
            var summa = 0;
            for (var i = 0; i < state.zakaz_product_all_list[state.page_savat].length; i++) {
                summa += (state.zakaz_product_all_list[state.page_savat][i].qty) * (state.zakaz_product_all_list[state.page_savat][i].unit_price)
            }
            state.product_summ[state.page_savat] = summa;
        }


    },
    getters: {
        allOrderList(state) {
            return state.zakaz_product_all_list[state.page_savat];
        },
        get_all_summa(state) {
            return state.product_summ;
        },
        get_zakaz_product_all_list(state) {
            return state.zakaz_product_all_list;
        },
        get_page_savat(state) {
            return state.page_savat;
        },

    }
}