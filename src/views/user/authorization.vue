<template>
  <div>
    <loader v-if="loading"/>
    <div class="border-bottom ">
      <router-link to="/user">
         <h5 class="m-0 ml-3 d-flex" style="padding: 16px 0px">
           <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2.5" stroke="#007BFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <polyline points="15 6 9 12 15 18" />
            </svg>
            {{$t('Add_auth')}}</h5>
      </router-link>
     
    </div>
    <div class="user_add p-5 ">
      <form @submit.prevent="submit">
        <mdb-row>
          <mdb-col col="3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('login')}}</p>
          </mdb-col>
          <mdb-col col="5"> 
            <mdb-input class="m-0 p-0" v-model="login" size="md"  outline  group type="text" validate error="wrong" success="right"/>
            <small class="invalid-text pt-4" style="margin-left:5px; "  v-if="$v.login.$dirty && !$v.login.required" >
              {{$t('name_invalid_text')}}
            </small>
            <small class="p-0" style="margin-left:5px; font-size: 12px; color: gray;"  v-else >
              {{$t('write_company_name_to_chek')}}
            </small>
          </mdb-col>
        </mdb-row> 
        <mdb-row class="mt-4">
          <mdb-col col="3" >
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('password')}}</p>
          </mdb-col>
          <mdb-col col="5" style="position: relative;">
              <mdb-input class="m-0 p-0" v-model="password" outline size="md"  v-show="!showPass" group type="password"  validate error="wrong" success="right"/>
              <mdb-input class="m-0 p-0" v-model="password" outline size="md"  v-show="showPass" group type="text" validate error="wrong" success="right"/>
                <small class="invalid-text mt-0 ml-2"  v-if="alert_danger" >
                {{$t('invalid_password')}}
                </small>
            <span @click="showPass = !showPass">
              <i class="fas fa-eye" v-show="!showPass" style="position: absolute; top: 12px; right: 25px; cursor: pointer;"></i>
              <i class="fas fa-eye-slash" v-show="showPass" style="position: absolute; top: 12px; right: 25px; cursor: pointer;"></i>
            </span>
          </mdb-col>
        </mdb-row>

        <mdb-row class="mt-4">
          <mdb-col col="3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('confirm_p')}}</p>
          </mdb-col>
          <mdb-col col="5" style="position: relative;">
              <mdb-input class="m-0 p-0" v-model="password_m" outline size="md"   v-show="!showPasss" group type="password" validate error="wrong" success="right"/>
              <mdb-input class="m-0 p-0" v-model="password_m" outline size="md"   v-show="showPasss" group type="text" validate error="wrong" success="right"/>
                <small class="invalid-text mt-0 ml-2"  v-if="alert_danger" >
                {{$t('invalid_password')}}
                </small>
            <span @click="showPasss = !showPasss">
              <i class="fas fa-eye" v-show="!showPasss" style="position: absolute; top: 12px; right: 25px; cursor: pointer;"></i>
              <i class="fas fa-eye-slash" v-show="showPasss" style="position: absolute; top: 12px; right: 25px; cursor: pointer;"></i>
            </span>
          </mdb-col>
        </mdb-row>
        <mdb-row class="mt-4">
          <mdb-col col="3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('access_name')}}</p>
          </mdb-col>
          <mdb-col col="5" style="position: relative;">
              <erpSelect
                :options="AcsessType"  
                @select="selectOptionAccess"
                :selected="access_name"
                :label="$t('access_name')"
              />
              <small v-if="$v.access_name.$dirty && access_id == null" class="invalid-text mt-0 ml-2" >
                  {{$t('select_item')}}
                </small>
          </mdb-col>
        </mdb-row>

        
        <div class="blue-gradient">
          <hr class="mt-5 "/>
        </div>
        <mdb-row class="mt-4">
          <mdb-col col="8">
            <div class="mt-2 text-right">
          <!-- <mdb-btn  @click="submit_continue" color="primary" m="r3" style="font-size: 10.5px"
            p="r4 l4 t2 b2">  {{$t('Add_and_continue')}}
          </mdb-btn> -->
          <mdb-btn color="success"  type="submit" style="font-size: 10.5px"
            p="r4 l4 t2 b2">
            <mdb-icon  />{{$t('save')}}</mdb-btn>
        </div>
          </mdb-col>
        </mdb-row>
        
      </form>
      <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_add')" @to_hide_modal="modal_status= false"/>

      <Toast ref="message"></Toast>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5'
import erpSelect from "../../components/erpSelect.vue";
import { mdbInput, mdbRow, mdbCol, mdbIcon, mdbBtn, } from "mdbvue"
import {mapActions,mapGetters} from 'vuex'
import { required } from 'vuelidate/lib/validators'
export default {
  naem: "companyAdd",
  
  data(){
    return{
      modal_info: '',
      modal_status: false,
      loading: false,
      id: 0,
      showPasss: false,
      showPass: false,
      alert_danger: false,

      login: '',
      password: '',
      password_m: '',
      md: '',
      md_1: '',
      fio: '',
      dept_id: null,
      emp_number: '',
      phone_number: "",
      comp_name: '',
      comp_id: null,
      access_name: '',
      access_id: null,
      AcsessType: [
        {
          id: 0,
          name: 'Aдмин'
        },
        {
          id: 1,
          name: 'Сотрудник'
        }
      ]
    }
  },
  components: {
    mdbInput, mdbRow, mdbCol, mdbIcon, mdbBtn, erpSelect
  },
  validations: {
      login: {
        required
      },
      access_name : {required}
      
    },
    async created()
    {
      if(localStorage.UserIdForAuth > 0)
      {
        const res = await fetch(this.$store.state.hostname + '/ArchiveUser/' + localStorage.UserIdForAuth);
        const data = await res.json();
        this.login = data.login
        for(let i=0; i<this.AcsessType.length; i++){
          if(this.AcsessType[i].id == data.user_type){
            this.access_name = this.AcsessType[i].name
            this.access_id = this.AcsessType[i].id
          }
        }
      }

    },
    async mounted(){
      console.log(localStorage.UserIdForAuth)
       const res = await fetch(this.$store.state.hostname + '/ArchiveUser/' + localStorage.UserIdForAuth);
      const data = await res.json();
      console.log(data);
      this.fio = data.fio;
      this.emp_number = data.emp_number;
      this.dept_id = data.archiveDepartmentid;
      this.phone_number = data.position;
    },
    computed: mapGetters(['allCompany']),
  methods:{
    ...mapActions(['fetchCompany']),
    selectOptionAccess(option){
      this.access_name = option.name
      this.access_id = option.id
    },
    cls_wnd()
      {
        this.login = ''
        this.password = ''
      },
    save_data :  async function(){
        if(this.$v.$invalid)
          {
            this.$v.$touch();
            this.$refs.message.warning('please_fill')
            return false;
          }
        if(this.password != ''){
          this.md = await md5(this.password)
          this.md_1 = await md5(this.password_m)
        }
        // console.log(this.md)
        if(this.md_1 !== this.md || this.md == ''){
          this.$refs.message.error('Error_password')
          this.alert_danger = true;
          return
        }else{
          this.alert_danger = false;
          const requestOptions = {
              method : "POST",
              headers: { "Content-Type" : "application/json" },
              body: JSON.stringify({
                "company_id": localStorage.CompId,
                "id": localStorage.UserIdForAuth,
                "login": this.login,
                "password": this.md,
                "user_type": this.access_id,
                "fio": this.fio,
                "emp_number": this.emp_number,
                "archiveDepartmentid": this.dept_id,
                "position": this.phone_number
              })
            };
            try{
              this.loading = true;
              const response = await fetch(this.$store.state.hostname + "/ArchiveUser", requestOptions);
              const data = await response.text();
              this.loading = false;
              if(response.status == 201 || response.status == 200)
              {
                this.$refs.message.success('Added_successfully')
                return true;
              }
              else{
                this.modal_info = data;
                this.modal_status = true;
                return false;
              }
            }
            catch{
              this.loading = false;
              this.modal_info = this.$i18n.t('network_ne_connect'); 
              this.modal_status = true;
            }
        }
    },
    async submit()
      {
        if(await this.save_data())
        {
          this.$store.state.alert = true;
          this.$router.push("/user");
        }

      },
    async submit_continue()
      {
        if(await this.save_data())
        {
          if(this.id != 0){
            this.$router.push('/user_add/0')
            this.cls_wnd();
          }
          else{
            this.cls_wnd();
          }
        }
      },
  }
}
</script>

<style>

</style>