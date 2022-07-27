<template>

  <div class="d_table  p-2">
    <loader v-if="loading"/>

      <table  class="myTable mt-3">
                <thead>
                <tr class="header ">
                    <th width="60">№</th>
                    <th v-for="column in datasource.columns" :key="column">{{$t(column)}}</th>
                    <th width="100" class="text-center">{{$t('Action')}}</th>
                </tr>
                </thead>
                <tbody>
                  <!-- .slice().reverse() -->
                <tr v-for="(row,rowIndex) in datasource.rows" :key="rowIndex">
                    <td>{{(numPag-1)*value + (rowIndex+1)}}</td>
                    <td v-for="(column,i) in datasource.columns" :key="i">
                        <mdb-badge v-show="row[column] === true" style="padding: 2px 8px;" pill color="success">{{row[column]}}</mdb-badge>
                        <mdb-badge v-show="row[column] === false"  pill color="danger" style="padding: 2px 8px;" >{{row[column]}}</mdb-badge>
                        <div v-show="column == 'colorCode'" :style="{background: row[column]}" style="width: 65px; height:3px; border-radius:10px;" ></div>
                        <div v-if="column == 'image'" class="m-0 p-0" style="width: 65px; height:45px;"><img :src="server_ip + row[column]" alt="" style="min-width:60px; max-height:45px;" class="img-fluid"></div>
                        <span v-show="row[column] !== true && row[column] !== false && column !== 'image' && column !== 'colorCode'">{{row[column]}}</span>
                    </td>
                    <td class="text-center">
                      <i v-if="userLock" class="fas fa-lock text-warning mask waves-effect m-0 pr-3" :class="{'applied': disable}" v-on:click="LockRow" :data-row="rowIndex"></i>
                      <i class="fas fa-pen editIcon mask waves-effect  m-0 pr-2" :class="{'applied': disable}" v-on:click="editRow" :data-row="rowIndex"></i>
                      <i class="fas fa-trash delIcon mask waves-effect m-0 pl-2" :class="{'applied': disable}" v-on:click="deleteRow" :data-row="rowIndex"></i>
                    </td>
                </tr>

                </tbody>

      </table>
      

      <!-- <i class="material-icons" v-on:click="addRow">add_circle</i> -->

      <mdb-modal :show="confirm" @close="confirm = false" size="sm" class="text-center" danger>
        <mdb-modal-header center :close="false">
          <p class="heading">{{$t('Are_you_sure')}}</p>
        </mdb-modal-header>
        <mdb-modal-body>
          <mdb-icon icon="times" size="4x" class="animated rotateIn"/>
        </mdb-modal-body>
        <mdb-modal-footer center>
          <mdb-btn outline="danger" @click="promise">{{$t('Yes')}}</mdb-btn>
          <mdb-btn color="danger" @click="confirm = false">{{$t('No')}}</mdb-btn>
        </mdb-modal-footer>
      </mdb-modal>

      


    <edit_col
        v-show="showcheck_form"
        :option="datasource"
        @select="checklist"
    />
  <Toast ref="message"></Toast>

  </div>
</template>


<script>
import Multiselect from 'vue-multiselect'
import edit_col from "../components/editColumn";
import { mdbBtn,  mdbIcon, mdbModal, mdbModalHeader, mdbModalBody, mdbModalFooter,mdbBadge,mdbBtnGroup, mdbDropdown, mdbDropdownMenu, mdbDropdownItem,
mdbRow, mdbCol} from 'mdbvue';
import {mapMutations, mapActions, mapGetters} from 'vuex'
export default {

  components: {
        mdbBtn,mdbBadge,
        mdbIcon, 
        mdbModal,mdbRow,
        mdbModalHeader,
        mdbModalBody,mdbDropdownMenu, mdbDropdownItem,
        mdbModalFooter, mdbCol,mdbBtnGroup,mdbDropdown,
        Multiselect,
        edit_col,
      },
  props:{
     datasource:{
        type: Object,
        default(){
          return {}
        }
      },
      openSer:{
        type: Boolean,
        default: false,
      },
      userLock:{
        type: Boolean,
        default: false,
      }
  },
  data() {
    return{
      value: localStorage.size_value,
      realSoni: 10,
      numPag: localStorage.numPage,
      pageNum: localStorage.pageNum,

      options: ['5','10','25','50','100'],
      promp: false,
      num: null,
      confirm: false,
      showcheck_form: false,
      show: false,
      disable: true,
      loading: false,
      admin: true,
      server_ip: this.$store.state.server_ip
    }
  },
   watch:{
    'value': function(){
      localStorage.size_value = this.value;
      localStorage.numPage = 1;
      this.numPag = 1;
      this.update_pagination({size:this.value, page: this.numPag -1})
      this.pageNum = Math.ceil(this.get_current_list.items_count/(localStorage.size_value))
      localStorage.pageNum = this.pageNum
      this.emit();

    }
  },
  mounted (){
    this.update_pagination({size:localStorage.size_value, page: this.numPag -1})

    this.pageNum = Math.ceil(this.get_current_list.items_count/(localStorage.size_value))
    localStorage.pageNum = this.pageNum
    // this.disable = localStorage.Type
    localStorage.UserIdForAuth = null;
    if(localStorage.AccessType == 0){
      this.disable = false;
      this.admin = false;
    }
    else{
      this.disable = true;
    }
  },
  computed: mapGetters(['get_pagination', 'get_current_list']),
  methods: {
    ...mapMutations(['update_pagination']),
    ...mapActions(['fetch_service_medicine_list']),
    async checklist (option){
        this.showcheck_form = option;
        this.$emit('update_column');
      },
      clicked_filter()
      {
        this.$emit('clicked_filter');
      },
      emit(){
        this.$emit('size');
      },
      paginationClick(i){
        this.numPag = i+1;
        localStorage.numPage = this.numPag;

        this.update_pagination({size:this.value, page: i})
        this.$emit('page');
      },

        onChange(ev) {
            //console.dir(ev.target.dataset)
            let col = ev.target.dataset.column
            let row = ev.target.dataset.row
            this.datasource.rows[parseInt(row)][col] = ev.target.value
        },
        promise () {
          // this.del = true
          this.confirm = false
          this.$emit('for_delete',this.datasource.rows[this.num_target],this.num_target);

          //this.datasource.rows.splice( parseInt(this.num_target), 1)
        },

        editRow(ev)
        {
          this.num_target = ev.target.dataset.row;
          this.$emit('for_edit',this.datasource.rows[this.num_target]);
        },
        deleteRow(ev) {
            this.confirm = true

            this.num_target = ev.target.dataset.row
            //appData.updated()
        },
        LockRow(ev){
          this.$router.push('/authorization')
          this.num_target = ev.target.dataset.row
          localStorage.UserIdForAuth = this.datasource.rows[this.num_target].id
        }
    },
}

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped lang="scss">
.applied{
  pointer-events: none;
  background:#fcfcfc;
}
.d_table{
  position: relative;
}

.myTable {
  /* border-collapse: collapse; */
  table-layout:fixed;
  width: 100%;
  // border: 1px solid #ddd;
  font-size: 18px;
  max-height:80px; overflow-x:auto
}
.myTable th{
  font-weight: 600;
  font-size:12.5px;
}
.myTable td{
  text-overflow: ellipsis; 
  overflow: hidden; 
  white-space: nowrap;
  font-size:13.4px;
}
.myTable th, .myTable td {
  text-align: left;
  padding: 10px;

}

.myTable tr {
  border-bottom: 1px solid rgb(228, 228, 228);
  cursor: pointer;
}

.myTable tr:hover {
  background-color: #ececee;
}

.editIcon{
  color:#01b348;
  font-size: 13px;

}
.editIcon:hover{
color: #000;
}

.delIcon:hover{
color: #000;
}
.delIcon{color: rgb(251, 70, 70);
  font-size: 13px;

}
.delete{
  
  position: fixed;
  display: flex;
  justify-content: center;
  top:0;
  animation: logo 0.2s linear;
  z-index:111111;
  left:0;
  width:100%;
  height:100vh;
  background:rgba(0, 0, 0, 0.5);
  .delete_form{
    background: white;
    border-radius: 5px;
    // box-shadow: 0 0 3px rgb(121, 121, 121);
    max-height: 135px;
    width: 420px;
    transform: translate(0, 20px);
    animation: anime 0.2s linear;
    p{
      padding: 0px 35px;
    }
    .delete_btn{
      text-align: right;
      button{
        border-radius: 5px;
        padding: 3px 20px;
      }
    }
  }
}
@keyframes anime
{
  0%{
    transform: translate(0, -130px);
    opacity: 0;
  }
  100%{
    transform: translate(0, 20px);
    opacity: 1;
  }
}
@keyframes logo
{
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
// true and false background
.span_bg{
  border-radius: 3px;
  font-family: roboto, sans-serif;
  font-weight: 600;
  font-size: 12px;
  padding: 1px 5px;
  box-shadow: 1px 2px 7px rgb(191, 191, 191);
}
.multiselect__tag {
    min-height: calc(1.5em + .75rem + 2px);
    display: block;
    padding: 0 40px 0 8px;
    border-radius: 5px;
    border: 1px solid #e8e8e8;
    background: #fff;
    font-size: 12px;
}
.activeTable{
  background: #4285F4;
  border-radius: 3px;
  color:white;
}


</style>
