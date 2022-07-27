<template>
  <div>
    <loader v-if="loading"/>
    <div class="border-bottom shadow">
      <router-link to="/connect">
         <h5 class="m-0 ml-3 d-flex" style="padding: 16px 0px">
           <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2.5" stroke="#007BFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <polyline points="15 6 9 12 15 18" />
            </svg>
            {{$t('add_connect')}}</h5>
      </router-link>
     
    </div>
    <div class="user_add p-5">
      <form @submit.prevent="submit">
        <mdb-row >
          <mdb-col col="3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('room')}}</p>
          </mdb-col>
          <mdb-col col="5" style="position: relative;">
              <erpSelect
                :options="allBrend.rows"  
                @select="selectOption"
                :selected="room_name"
                :label="$t('department')"

              />
              <small v-if="$v.room_name.$dirty && room_id == null" class="invalid-text mt-0 ml-2" >
                  {{$t('select_item')}}
                </small>
          </mdb-col>
        </mdb-row> 
        <mdb-row class="mt-4">
          <mdb-col col="3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('datchik')}}</p>
          </mdb-col>
          <mdb-col col="5" style="position: relative;">
              <erpSelect
                :options="allClient.rows"  
                @select="selectOption1"
                :selected="datchik_name"
                :label="$t('department')"

              />
              <small v-if="$v.datchik_name.$dirty && datchik_id == null" class="invalid-text mt-0 ml-2" >
                  {{$t('select_item')}}
                </small>
          </mdb-col>
        </mdb-row> 
         <!-- <mdb-row class="mt-4">
          <mdb-col col="3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('phoneNumber')}}</p>
          </mdb-col>
          <mdb-col col="5">
            <mdb-input class="m-0 p-0" v-model="phoneNumber" size="md" outline  group type="text" validate error="wrong" success="right"/>
          </mdb-col>
        </mdb-row>  -->
         <!-- <mdb-row class="mt-4">
          <mdb-col col="3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('address')}}</p>
          </mdb-col>
          <mdb-col col="5">
            <mdb-input class="m-0 p-0" v-model="address" size="md" outline  group type="text" validate error="wrong" success="right"/>
          </mdb-col>
        </mdb-row> -->
        <div class="blue-gradient">
          <hr class="mt-5 "/>
        </div>
        <mdb-row class="mt-4">
          <mdb-col col="8">
            <div class="mt-2 text-right">
          <mdb-btn  @click="submit_continue" color="primary" m="r3" style="font-size: 10.5px"
            p="r4 l4 t2 b2">  {{$t('Add_and_continue')}}
          </mdb-btn>
          <mdb-btn color="success"  type="submit" style="font-size: 10.5px"
            p="r4 l4 t2 b2">
            <mdb-icon  />{{$t('add')}}</mdb-btn>
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
import { mdbInput, mdbRow, mdbCol, mdbIcon, mdbBtn, } from "mdbvue"
import erpSelect from "../../components/erpSelect.vue";
import { required } from 'vuelidate/lib/validators'
import {mapActions, mapGetters} from 'vuex'
export default {
  naem: "companyAdd",
  
  data(){
    return{
      modal_info: '',
      modal_status: false,
      loading: false,
      id: this.$route.params.id,

      room_name: '',
      room_id: null,
      datchik_name: '',
      datchik_id: null,
    }
  },
  components: {
    mdbInput, mdbRow, mdbCol, mdbIcon, mdbBtn, erpSelect
  },
  validations: {
      room_name: {
        required
      },
      datchik_name: {
        required
      }
    },
    async created()
    {
      if(this.id > 0)
      {
        const res = await fetch(this.$store.state.hostname + '/ArchiveRoomDetail/' + this.id);
        const data = await res.json();
        console.log('connect update');
        console.log(data);
      }

    },
    async mounted(){
      await this.fetchBrend();
      await this.fetchClient();
    },
    computed:mapGetters(['allBrend', 'allClient']),
  methods:{
    ...mapActions(['fetchBrend', 'fetchClient']),
    selectOption(option){
      this.room_name = option.name
      this.room_id = option.id
    },
    selectOption1(option){
      this.datchik_name = option.name
      this.datchik_id = option.id
    },
    cls_wnd()
      {
        this.room_id = null;
        this.room_name = '';
        this.datchik_id = null;
        this.datchik_name = '';
      },
    save_data :  async function(){
         if(this.$v.$invalid )
        {
          this.$v.$touch();
          this.$refs.message.warning('please_fill')
          return false;
        }
        const requestOptions = {
            method : "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({
              "company_id": localStorage.CompId,
              "archiveRoomid": this.room_id,
              "archiveDatchikid": this.datchik_id,
              "id": this.id
            })
          };
          try{
            this.loading = true;
            const response = await fetch(this.$store.state.hostname + "/ArchiveRoomDetail", requestOptions);
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
    },
    async submit()
      {
        if(await this.save_data())
        {
          this.$store.state.alert = true;
          this.$router.push("/connect");
        }

      },
    async submit_continue()
      {
        if(await this.save_data())
        {
          if(this.id != 0){
            this.$router.push('/connect_add/0')
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