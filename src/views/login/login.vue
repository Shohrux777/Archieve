<template>
  <div class="login">
    <loader v-if="loading"/>
    <div class="backLogin">
      <div  style="position:fixed; top:0; right:0">
        <mdb-btn color="elegant" @click="rus_btn">{{$t('ru')}}</mdb-btn>
        <mdb-btn color="elegant"  @click="en_btn">{{$t('en')}}</mdb-btn>
      </div>
      <div  style="position:fixed; top:0; left:0">
        
      </div>

      
      
      <krillKeyboard @text="matn" v-show="klavish && ruskiy" style="position: absolute; bottom: 0; right: 0;"/>
      <numberKeyboard @number="num_func" v-show="raqam" style="position: absolute; bottom: 10px; right: 0;"/>
      <div v-if="admin_btn" style="height:100vh; width:100%;" class="d-flex justify-content-center align-items-center ">
      <div >
        <div class="text-center">
          <h2 class="">{{$t('authorization')}}</h2>
        </div>
        <div class="mt-4 d-flex justify-content-center"> 
            <span class="m-0 p-0 text-danger">{{this.error}}</span>
        </div>
        <form v-on:submit.prevent="submit">
          <div class="form  mt-1 mb-5">
            <div class="username border-bottom d-flex justify-content-center align-items-center px-2">
              <div class="d-flex ">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="27" height="27" viewBox="0 0 24 24" stroke-width="1.0" stroke="#9e9e9e" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <circle cx="12" cy="7" r="4" />
                  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                </svg>
              </div>
              <input type="text" v-model="login" :placeholder="$t('username')">
              <small class="invalid-text" style="margin-top: 115px; margin-left: -125px;"  v-if="$v.login.$dirty && !$v.login.required" >
              {{$t('name_invalid_text')}}
            </small>
            </div>
            <div class="password border-bottom d-flex justify-content-center align-items-center px-2">
              <div class="d-flex ">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-lock" width="27" height="27" viewBox="0 0 24 24" stroke-width="1.0" stroke="#9e9e9e" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <rect x="5" y="11" width="14" height="10" rx="2" />
                  <circle cx="12" cy="16" r="1" />
                  <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
                </svg>
              </div>
              <input type="password" v-model="pass"  @input="handleHashing($event.target.value)" :placeholder="$t('password')">
              <small class="invalid-text" style="margin-top: 115px; margin-left: -125px;"   v-if="$v.pass.$dirty && !$v.pass.required" >
                {{$t('name_invalid_text')}}
              </small>
            </div>
            <div class="sub_login d-flex justify-content-center  align-items-center">
               <mdb-btn  color="primary" type="submit" p="r5 l5 t2 b2">{{$t('enter')}}</mdb-btn>  
            </div>
          </div>
        </form>
      </div>
    </div>
    </div>
    
  <Toast ref="message"></Toast>
  </div>  
</template>

<script>
import krillKeyboard from './krillKeyboard'
import numberKeyboard from './numberKeyboard'
import { required } from 'vuelidate/lib/validators'
import {mdbBtn,mdbInput } from "mdbvue";
import {mapActions, mapGetters} from "vuex"
 import md5 from 'js-md5'
export default {
  components: {
    mdbBtn,mdbInput, krillKeyboard, numberKeyboard
  },
  validations: {
    login: {required},
    pass: {required},
  },
  data (){
      return{ 
        list: [],
        pass: '',
        login: '',
        admin_btn : true,
        user_btn : false,
        search_data : '',
        md: '',
        error: '',
        mahbus: [],
        show_search: false,
        loading: false,
        input: '',
        izlash: false,
        klavish: false,
        inglish: false,
        ruskiy: true,
        raqam: false,
        keshRus: '',
      }
    },
  async mounted(){  
    await this.fetchUser();
    localStorage.AuthId = 1;
    localStorage.CompId = 1;
    localStorage.CompName = "Company"
    localStorage.sidebar = true;
    localStorage.Login = ""
    localStorage.AccessType = 0;

    localStorage.size_value = 10
    localStorage.numPage = 1
    localStorage.pageNum = 1
    localStorage.Items_count = 10
    console.log(this.allUser)
    if(this.allUser.rows.length == 0){
      localStorage.Login = '';
      localStorage.AuthId = 1;
      localStorage.CompId = 1;
      localStorage.AccessType = 0;
      localStorage.CompName = "Company"
      localStorage.sidebar = true;
      this.$router.push('/user')
    }
    // console.log(localStorage.AuthId)
  },
  computed: mapGetters(['allUser']),
  watch: {
    search_data: function(){
      this.search_click();
    }
  },
  methods: {
    ...mapActions(['fetchUser']),
    handleHashing (data) {
        this.pass = data
        this.md = md5(data)
        // console.log(this.md)
      },
      rus_btn(){
        this.$i18n.locale = 'ru'
        this.search_data = this.keshRus;
        this.input = '';
        this.ruskiy = true;
        this.inglish = false;
      },
      en_btn(){
        this.$i18n.locale = 'en'
        this.search_data = '';
        this.input = '';
        this.ruskiy = false;
        this.inglish = true;
      },
      matn(option){
        this.search_data = option;
        this.keshRus = option;
      },
      num_func(option){
        this.md = option;
      },
      parol_Mahbus(){
        this.raqam = true;
        this.klavish = false;
      },
      
       onChange(input) {
        this.input = input;
        this.search_data = this.input
      },

    async submit(){
        // this.$router.push('/company')
         if(this.$v.$invalid )
          {
            this.$v.$touch();
            this.$refs.message.warning('please_fill')
            return false;
          }
        try{
          this.loading = true;
          console.log(this.login)
          console.log(this.md)
            const response = await fetch(this.$store.state.hostname + '/ArchiveUser/checkUserAuth?login=' + this.login + '&password=' + this.md)
            const data = await response.text()  
            this.loading = false;
            console.log(data)
          if(response.status == '200' || response.status == '201'){
            localStorage.AuthId = data.id;
            localStorage.CompId = 1;
            this.$router.push('/company')
          }
          else{
              this.$refs.message.error("error_login")
              this.error = "error_login"
          }
        }
        catch{
            this.loading = false;
            this.$refs.message.error("network_ne_connect")
        }
        
      
         
    },
    async search_btn(item) {
     // console.log(item)
      this.login = item.fio;
    //  console.log(this.login)
      this.show_search = false;
      // this.pass = item.authorization.password
      this.search_data = item.fio


    },
    async search_click()
    {
      if(this.search_data != ''){
        this.show_search = true;
        const res = await fetch(this.$store.state.hostname + '/Users/searchUserByFIO?FIO=' + this.search_data + '&countResult=10');
        const data = await res.json();
        console.log(data);
        this.mahbus = data;
      }
      else{
        this.mahbus = []
      }
    } 
  }
}
</script>

<style lang="scss">
.login {
  background-image: url('../../assets/bg-01.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  .backLogin{
    background-color: rgba(0, 0, 0,0.7);
    h2{
      color:#fff;
      font-family: 'Ubuntu', sans-serif;
      font-weight: 500;
      font-size: 28px;
    }
    .form {
      height: 300px;
      width:390px;
      background-color: #fff;
      border-radius: 4px;
      .username, .password{
        height: 100px;

        input{
          height: 35px;
          font-family: 'Roboto', sans-serif;
          margin-left:15px;
          width: 300px;
          font-size: 18px;
          color: rgb(0, 0, 0);
          outline:none;
          border:none;
        }
      }
      .sub_login{
        height: 100px;
       
      }
    }
  }
}
.itemPrison{
  &:hover{
    background-color: #eee;
  }
}
</style>