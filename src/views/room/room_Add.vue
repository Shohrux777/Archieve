<template>
  <div>
    <loader v-if="loading"/>
    <div class="border-bottom shadow">
      <router-link to="/room">
         <h5 class="m-0 ml-3 d-flex" style="padding: 16px 0px">
           <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2.5" stroke="#007BFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <polyline points="15 6 9 12 15 18" />
            </svg>
            {{$t('add_room')}}</h5>
      </router-link>
     
    </div>
    <div class="user_add p-5">
      <form @submit.prevent="submit">
        <mdb-row>
          <mdb-col col="3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('name')}}</p>
          </mdb-col>
          <mdb-col col="5">
            <mdb-input class="m-0 p-0" v-model="name" size="md"  outline  group type="text" validate error="wrong" success="right"/>
            <small class="invalid-text pt-4" style="margin-left:5px; "  v-if="$v.name.$dirty && !$v.name.required" >
              {{$t('name_invalid_text')}}
            </small>
          </mdb-col>
        </mdb-row> 
         <mdb-row class="mt-4">
          <mdb-col col="3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('info_1')}}</p>
          </mdb-col>
          <mdb-col col="5">
            <mdb-input class="m-0 p-0" v-model="info_1" size="md" outline  group type="text" validate error="wrong" success="right"/>
          </mdb-col>
        </mdb-row> 
         <mdb-row class="mt-4">
          <mdb-col col="3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('info_2')}}</p>
          </mdb-col>
          <mdb-col col="5">
            <mdb-input class="m-0 p-0" v-model="info_2" size="md" outline  group type="text" validate error="wrong" success="right"/>
          </mdb-col>
        </mdb-row>
        <mdb-row class="mt-4">
          <mdb-col col="3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('info_3')}}</p>
          </mdb-col>
          <mdb-col col="5">
            <mdb-input class="m-0 p-0" v-model="info_3" size="md" outline  group type="text" validate error="wrong" success="right"/>
          </mdb-col>
        </mdb-row>
        <mdb-row class="mt-4">
          <mdb-col col="3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('info_4')}}</p>
          </mdb-col>
          <mdb-col col="5">
            <mdb-input class="m-0 p-0" v-model="info_4" size="md" outline  group type="text" validate error="wrong" success="right"/>
          </mdb-col>
        </mdb-row>
        <mdb-row class="mt-4">
          <mdb-col col="3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('info_5')}}</p>
          </mdb-col>
          <mdb-col col="5">
            <mdb-input class="m-0 p-0" v-model="info_5" size="md" outline  group type="text" validate error="wrong" success="right"/>
          </mdb-col>
        </mdb-row>
        <mdb-row class="mt-4">
          <mdb-col col="3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('info_6')}}</p>
          </mdb-col>
          <mdb-col col="5">
            <mdb-input class="m-0 p-0" v-model="info_6" size="md" outline  group type="text" validate error="wrong" success="right"/>
          </mdb-col>
        </mdb-row>
        <mdb-row class="mt-4">
          <mdb-col col="3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('info_7')}}</p>
          </mdb-col>
          <mdb-col col="5">
            <mdb-input class="m-0 p-0" v-model="info_7" size="md" outline  group type="text" validate error="wrong" success="right"/>
          </mdb-col>
        </mdb-row>
        <mdb-row class="mt-4">
          <mdb-col col="3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('info_8')}}</p>
          </mdb-col>
          <mdb-col col="3">
            <mdb-input class="m-0 p-0" v-model="info_8" size="md" outline  group type="number" validate error="wrong" success="right"/>
          </mdb-col>
        </mdb-row><mdb-row class="mt-4">
          <mdb-col col="3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('info_9')}}</p>
          </mdb-col>
          <mdb-col col="3">
            <mdb-input class="m-0 p-0" v-model="info_9" size="md" outline  group type="number" validate error="wrong" success="right"/>
          </mdb-col>
        </mdb-row><mdb-row class="mt-4">
          <mdb-col col="3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('info_10')}}</p>
          </mdb-col>
          <mdb-col col="3">
            <mdb-input class="m-0 p-0" v-model="info_10" size="md" outline  group type="number" validate error="wrong" success="right"/>
          </mdb-col>
        </mdb-row><mdb-row class="mt-4">
          <mdb-col col="3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('info_11')}}</p>
          </mdb-col>
          <mdb-col col="3">
            <mdb-input class="m-0 p-0" v-model="info_11" size="md" outline  group type="number" validate error="wrong" success="right"/>
          </mdb-col>
        </mdb-row><mdb-row class="mt-4">
          <mdb-col col="3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('info_12')}}</p>
          </mdb-col>
          <mdb-col col="3">
            <mdb-input class="m-0 p-0" v-model="info_12" size="md" outline  group type="number" validate error="wrong" success="right"/>
          </mdb-col>
        </mdb-row><mdb-row class="mt-4">
          <mdb-col col="3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('info_13')}}</p>
          </mdb-col>
          <mdb-col col="3">
            <mdb-input class="m-0 p-0" v-model="info_13" size="md" outline  group type="number" validate error="wrong" success="right"/>
          </mdb-col>
        </mdb-row><mdb-row class="mt-4">
          <mdb-col col="3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('info_14')}}</p>
          </mdb-col>
          <mdb-col col="3">
            <mdb-input class="m-0 p-0" v-model="info_14" size="md" outline  group type="number" validate error="wrong" success="right"/>
          </mdb-col>
        </mdb-row><mdb-row class="mt-4">
          <mdb-col col="3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('info_15')}}</p>
          </mdb-col>
          <mdb-col col="3">
            <mdb-input class="m-0 p-0" v-model="info_15" size="md" outline  group type="number" validate error="wrong" success="right"/>
          </mdb-col>
        </mdb-row><mdb-row class="mt-4">
          <mdb-col col="3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('info_16')}}</p>
          </mdb-col>
          <mdb-col col="3">
            <mdb-input class="m-0 p-0" v-model="info_16" size="md" outline  group type="number" validate error="wrong" success="right"/>
          </mdb-col>
        </mdb-row><mdb-row class="mt-4">
          <mdb-col col="3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('info_17')}}</p>
          </mdb-col>
          <mdb-col col="3">
            <mdb-input class="m-0 p-0" v-model="info_17" size="md" outline  group type="number" validate error="wrong" success="right"/>
          </mdb-col>
        </mdb-row>
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
import { required } from 'vuelidate/lib/validators'
export default {
  naem: "companyAdd",
  
  data(){
    return{
      modal_info: '',
      modal_status: false,
      loading: false,
      id: this.$route.params.id,
      name: '',
      info_1: '',
      info_2: '',
      info_3: '',
      info_4: '',
      info_5: '',
      info_6: '',
      info_7: '',
      info_8: '',
      info_9: '',
      info_10: '',
      info_11: '',
      info_12: '',
      info_13: '',
      info_14: '',
      info_15: '',
      info_16: '',
      info_17: '',
    }
  },
  components: {
    mdbInput, mdbRow, mdbCol, mdbIcon, mdbBtn
  },
  validations: {
      name: {
        required
      }
    },
    async created()
    {
      if(this.id > 0)
      {
        const res = await fetch(this.$store.state.hostname + '/ArchiveRoom/' + this.id);
        const data = await res.json();
        this.name = data.name,
        this.info_1 = data.info_1
        this.info_2 = data.info_2
        this.info_3 = data.info_3
        this.info_4 = data.info_4
        this.info_5 = data.info_5
        this.info_6 = data.info_6
        this.info_7 = data.info_7
        this.info_8 = data.info_8
        this.info_9 = data.info_9
        this.info_10 = data.info_10
        this.info_11 = data.info_11
        this.info_12 = data.info_12
        this.info_13 = data.info_13
        this.info_14 = data.info_14
        this.info_15 = data.info_15
        this.info_16 = data.info_16
        this.info_17 = data.info_17

      }

    },
  methods:{
    cls_wnd()
      {
        this.name = ''
        this.info_1 = ''
        this.info_2 = ''
        this.info_3 = ''
        this.info_4 = ''
        this.info_5 = ''
        this.info_6 = ''
        this.info_7 = ''
        this.info_8 = ''
        this.info_9 = ''
        this.info_10 = ''
        this.info_11 = ''
        this.info_12 = ''
        this.info_13 = ''
        this.info_14 = ''
        this.info_15 = ''
        this.info_16 = ''
        this.info_17 = ''
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
              "name" : this.name,
              "info_1" : this.info_1,
              "info_2" : this.info_2,
              "info_3" : this.info_3,
              "info_4" : this.info_4,
              "info_5" : this.info_5,
              "info_6" : this.info_6,
              "info_7" : this.info_7,
              "info_8" : this.info_8,
              "info_9" : this.info_9,
              "info_10" : this.info_10,
              "info_11" : this.info_11,
              "info_12" : this.info_12,
              "info_13" : this.info_13,
              "info_14" : this.info_14,
              "info_15" : this.info_15,
              "info_16" : this.info_16,
              "info_17" : this.info_17,
              // "company_id": localStorage.CompId,
              "id": this.id,


            })
          };
          try{
            this.loading = true;
            const response = await fetch(this.$store.state.hostname + "/ArchiveRoom", requestOptions);
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
          this.$router.push("/room");
        }

      },
    async submit_continue()
      {
        if(await this.save_data())
        {
          if(this.id != 0){
            this.$router.push('/room_add/0')
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