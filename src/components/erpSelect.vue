<template>
  <div class="erp-select">
    <div class=" mb-2 " @click="select_input" :class="[{'vaeble': change,  'varible': change_color},{'input_div': size=='md', 'input_div_sm': size == 'sm'}]" >
        <input  group  type="text" class="px-2" :value="selected" @keyup="hideInput1" />
        <label for="text" v-if="selected == ''" :class="{'selectLabel': size == 'sm'}">
         {{$t('select_item')}}
        </label>

        <div class="icon_caret">
          <i class="fa fa-caret-down mx-2 mt-2" ></i> 
        </div>

      </div>
    <div class="card options" v-if="areOptionsVisible">
      <div class="container search_div pb-1">
        <input size="sm" :placeholder="$t('search_here')"  @keydown.tab="hideInput2" style="width:100%;"
        v-model="search" :ref="selected" class="down_list mt-1" 
        />
      </div>
        <mdb-btn class="top-btn " v-if="btnshow==true " color="primary"
        @click="btn_add" size="sm">{{$t('add')}}</mdb-btn>
        

      <p v-for="option in filteredList" :key="option.id"
          @click="selectOption(option)"
      >
        {{option.name}}
      </p>

    </div>
    <div>
      <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_add')" @to_hide_modal = "modal_status= false"/>
    </div>
  </div>
</template>


<script>
import { mdbInput,mdbBtn, mdbIcon} from 'mdbvue';

export default {
  name: 'erp-select',
  components:{mdbInput,mdbBtn, mdbIcon},
  props: {
      options:
      {
        type: Array,
        default(){
          return []
        }
      },
      btnshow:{
        type:Boolean,
        default:false
      },
      selected:{
        type: String,
        default: ''
      },

      label:{
        type : String,
        default : 'Dropdown'
      },
      url:{
        type : String,
        default : ''
      },
      btnadd:{
        type:Boolean,
        default:false
      },
      size:{
        type:String,
        default: 'md'
      },

    },
  data(){
    return{
      alert_text : '',
      alert_success : false,
      alert_danger : false,
      modal_info : '',
      modal_status: false,

      search:'',
      areOptionsVisible: false,
      num: 0,
      change: false,
      change_color: false
    }
  },
  // bu function tekshiradi inputga malumot tanlangan yoki tanlanmaganligini
  mounted (){
    if(this.selected !== ''){
      this.change = false
      this.change_color = true
    }
  },
  methods: {
    selectOption(option)
    {
      this.$emit('select', option);
      this.areOptionsVisible = false;
    },
    btn_add()
    {
      this.$emit('btn_add');
      this.areOptionsVisible = false;
    },
    hideInput1(){
      this.select_input();
    },
    hideInput2(){
      this.select_input();
      // this.change_color = false
      this.change = false
    },
    select_input(){
      this.num = 0
      this.change = true
      this.change_color = false
      this.$nextTick(function () {
        this.$refs[this.selected].focus();
        this.search = '';
      })
      this.areOptionsVisible = !this.areOptionsVisible;
      document.addEventListener("click", this.add_fun);
    },
    add_fun (e){
        if(this.num!=0){
          if(e.target.closest(".down_list")) return
          this.areOptionsVisible = false;
          if(this.selected === ''){
            this.change = false
          }
          if(this.selected !== ''){  // this condition inputdan chiqib ketganimizda u bo'sh bo'lmasa yopilmay turaveradi
            this.change_color = true;
          }
          document.removeEventListener("click", this.add_fun)
        }
        this.num++
    }

  },

   computed:{
            filteredList: function(){
                if(this.search)
                {
                  return this.options.filter((item)=>{
                    return this.search.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v))
                  })
                }else
                {
                  return this.options;
                }
              }
    }
}
</script>


<style lang="scss" scoped>

/* for scroll */
  /* width */
::-webkit-scrollbar {
  width: 5px;

}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 2px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;

}
/* ! for scroll */


.erp-select{
  position: relative;
  width: 100%;
  cursor: pointer;
}


  .options{
    position: absolute;
    z-index: 1000;
    width:100%;
    max-height: 300px;
    overflow-y: scroll;
    margin-top: -50px;
  }

  .options p{
    padding: 10px 5px 0 30px;
    margin: 0;
  }

  .options p:hover{
    background: #e7e7e7;
  }

  .top-btn{
    position: absolute;
    top: 10px;
    right: 10px;

  }
  .not-pointer
  {
      pointer-events: none;
  }
  .form-control{
    cursor: pointer;
  }
  .input_div{
  position: relative;
  width: 100%;
  height: 36px;
  transition: transform 0.2s ease-in-out;
  border-radius: 4px;
  border: 1px solid #DEE2E6;
}
.input_div_sm{
  position: relative;
  width: 100%;
  height: 32px;
  transition: transform 0.2s ease-in-out;
  border-radius: 4px;
  border: 1px solid #DEE2E6;
}
.input_div_sm input{
  background:rgba(255, 255, 255, 0);
  width:97%;
  transition: transform 0.2s ease-in-out;
  z-index: 1;
  position:absolute;
  left:0;
  bottom:5px;
  font-size: 13px;
  color:#495057;
  border:none;
  outline: none;
  cursor:pointer;
  pointer-events: none;
}
.input_div_sm label{
  position: absolute;
  top: 10px;
  left: 10px;
  cursor:auto;
  z-index: 1;
  // transition: transform 0.2s ease-in-out;
  background:transparent;
  font-size: 13px;
  color:#757575;
  cursor:pointer;
}

.input_div input{
  background:rgba(255, 255, 255, 0);
  width:97%;
  transition: transform 0.2s ease-in-out;
  z-index: 1;
  position:absolute;
  left:0;
  bottom:5px;
  font-size: 13px;
  color:#495057;
  border:none;
  outline: none;
  cursor:pointer;
  pointer-events: none;
}

.search_div input{
  border:none;
  outline: none;
  border-bottom: 0.5px solid #4285F4;
  font-size: 13px;
  height:38px;

}

.input_div label{
  position: absolute;
  top: 10px;
  left: 10px;
  cursor:auto;
  z-index: 1;
  // transition: transform 0.2s ease-in-out;
  background:transparent;
  font-size: 13px;
  color:#757575;
  cursor:pointer;
}

.vaeble{
  border: 2px solid #4285F4;
  label{
    // transform: translate(-5px,-23px);
    transition: transform 0.2s ease-in-out;
    z-index:5;
    font-size:12px;
    color: #4285F4;
  }

}

.icon_caret{
  position: absolute;
  top: 0;
  right: 0;
  padding: 0 5px;

  i{
    margin-top: 0.5em;
    cursor:pointer;
  }
}
.varible{
  // border: 0.5px solid #CED4DA;
  border: 0.5px solid #4285F4;
  label{
    // transform: translate(-5px,-22px);
    transition: transform 0.2s ease-in-out;
    z-index:5;
    font-size:12px;
    color: #757575;
  }
}
.selectLabel{
  margin-top: -5px;
}

</style>
