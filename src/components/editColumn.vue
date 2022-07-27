<template>
  <div class="editTable">
      <div class="card_check">
        <div class="text_header text-center my-3">
          <h3>{{$t('edit_Col_viewSettings')}} </h3>
        </div>
        <div class="form_card border mt-4">
          <div class="form_left border-right">
            <div class="pl-4 header left_header">
              <p class="m-0 p-0">{{$t('editCol_generalSettings')}}</p>
            </div>
            <div class="pl-4 py-2 " @click="listCheckshow = true, listEditshow = false" :class="{'kolonka' : listCheckshow}">
              <p class="m-0 p-0">{{$t('editCol_columns')}}</p>
            </div>
            <div class="pl-4 py-2"  @click="listCheckshow = false, listEditshow = true" :class="{'kolonka' : listEditshow}">
              <p class="m-0 p-0">{{$t('editCol_edit')}} </p>
            </div>
          </div>
          <div class="form_right" v-show="listCheckshow">
            <div class="right_header pl-4 header custom-control custom-checkbox">
              <div class="check_dev">
                <input type="checkbox" v-model="allList" @click="all_func(allList)" class="custom-control-input" id="defaultUnchecked">
                <label class="custom-control-label" for="defaultUnchecked" @click="all_func(allList)">{{$t('edit_Col_chooseAll')}} </label>
              </div>
            </div>
            <div class="check_hover custom-control custom-checkbox" v-for="(see,i) in option.col.column_default_obj" :key="i">
              <div class="check_dev">
                <input type="checkbox" class="custom-control-input" :checked="see.status" @click="see.status=!see.status" :id="see.name">
                <label class="custom-control-label" :for="see.name">{{see.name}}</label>
              </div>
            </div>
          </div>
          <div class="form_right" v-show="listEditshow">
            <div class="right_header header ">
              <div class="check_dev">
                <label class="p-0 m-0" @click="all_func(allList)">{{$t('editCol_edit')}} </label>
              </div>
            </div>
            <div class="check_hover" v-for="(see,i) in option.col.column_default_obj" :key="i">
              <div class="check_dev">
                <label class="p-0 m-0" :for="see.name">{{see.name }}</label>
                 <i class="fas fa-pen editIcon float-right mask waves-effect t m-0 pr-4"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="btn_submit">
          <mdb-btn color="cyan" @click.native="cancel" size ="sm">{{$t('cancel')}}</mdb-btn>
          <mdb-btn color="primary" @click.native="submit" size ="sm">{{$t('save')}}</mdb-btn>
        </div>
      </div>
      <massage_box :hide="modal_status" :detail_info="modal_info"
      m_text="Не удалось успешно выполнить команду!" @to_hide_modal = "modal_status= false"/>
      <Toast ref="message"></Toast>

    </div>
</template>

<script>
import {
  mdbBtn,
} from "mdbvue";
export default {
  components:{
    mdbBtn
  },
  data (){
    return {
        alert_text : '',
        alert_danger : false,
        modal_info : '',
        modal_status: false,

      list_data: [],
      allList: false,
      close: false,
      op_len : 0,
      listCheckshow: true,
      listEditshow: false
    }
  },
  props:{
    option: Object,
    default(){
        return {}
      }
  },
  async mounted (){
    // console.log(this.option.length)
    // for(let i=0; i<this.option.length; i++){
    //   this.list_data.push(this.option[i].status); 
    // }
    //   this.op_len = this.option.col.column_default_obj.length

  },
  methods: {
    all_func(x){
        x = !x
        if(x === false){
          for(let i=0; i<this.op_len; i++){
            this.option.col.column_default_obj[i].status = false
          }
        }else{
          for(let i=0; i<this.op_len; i++){
            this.option.col.column_default_obj[i].status = true
          }
        }
      },
      cancel (){
        for(let i=0; i<this.op_len; i++){
          this.option.col.column_default_obj[i].status = this.list_data[i]
        }
        this.$emit('select', this.close);
      },
      async submit (){
        this.list_data = [];
       // console.log(this.option);
        for(let i=0; i<this.option.length; i++){
          this.list_data.push(this.option[i].status);
        }

        const requestOptions = {
            method : "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({
              "id": this.option.col.id,
              "columns" : JSON.stringify(this.option.col.column_default_obj)
               // "columns" : this.option.col.column_default_obj
            })
          };
      //  console.log(requestOptions)
         const response = await fetch(this.$store.state.hostname + "/TexColumnConfigs", requestOptions);
        //  await response.json();
        
        if(response.status == 201 || response.status == 200  )
            {
              this.$emit('select', this.close);
            }
            else{
              this.modal_info = response.status + "  (" + response.statusText + ")";
              this.modal_status = true;
            }

        // send this option to base
      },
  }
}
</script>

<style scoped>
 .editTable{
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
    height: 100%;
    top:0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index:55555;
  }
  .card_check{
    width: 58%;
    height: 68%;
    background: rgb(255, 255, 255);
    position: relative;
  }

  .form_card{
    width: 90%;
    display:flex;
    margin: 0 auto;
  }
  .form_left, .form_right{
    width:50%;
    height: 50vh;
    background-color: rgb(252, 252, 252);
  }
  .form_right{
    padding-left: 5px;
    overflow: hidden;
    overflow-y: scroll;
  }
  .right_header, .left_header{
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    background: rgb(247, 247,247);
    z-index: 55;
    padding: 0;
  }
  .status_dev {
    padding-left: 30px;
  }
  .status_dev label, input{
    cursor: pointer;
  }
  .status_hover{
    padding-top:7px;
    padding-bottom:7px;
    cursor: pointer;
  }
  .status_hover:hover{
    background: rgba(128, 202, 255, 0.2);
  }
  .btn_submit{
    position: absolute;
    bottom: 12.5px;
    right: 45px;
  }
  .header{
    padding: 12px 0;
  }
  .kolonka{
    background: rgba(2, 149, 255, 0.3);
  }
  .editIcon{
    color: green;
  }
  .editIcon:hover{
    color: black;
  }
  ::-webkit-scrollbar {
    width: 7px;

  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
</style>
