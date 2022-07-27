<template>
  <div class="bg-white">
    <loader v-if="loading"/>
    <div class="p-3 pb-0">
      <div class=" mb-3 pt-2 " style="border-radius:5px; position:relative;">
        <form @submit.prevent="submit">
          <div style="height: 60px;" class="d-flex justify-content-between border-bottom align-items-center  ">
            <div class="title w-75 row align-items-center">
              <div class="col-4">
                <div style="position: relative; margin-top: 40px;"> 
                  <small class="bg-white" style="position: absolute; z-index:1; left:10px; top: -9px; color: #757575;">
                    {{$t('start_time')}}
                  </small>
                  <mdb-input type="date" size="sm"  v-model="Start_time" outline/>
                </div>
              </div>
              <div class="col-4">
                <div style="position: relative; margin-top: 40px;"> 
                  <small class="bg-white" style="position: absolute; z-index:1; left:10px; top: -9px; color: #757575;">
                    {{$t('end_time')}}
                  </small>
                  <mdb-input type="date" size="sm" v-model="End_time" outline/>
                </div>
              </div>
              <div class="col-4">
                <div style="position: relative; margin-top: 23px;"> 
                  <small class="bg-white" style="position: absolute; z-index:1; left:10px; top: -9px; color: #757575;">
                    {{$t('device')}}
                  </small>
               <erpSelect
               class=""
                :options="allDevices"  
                @select="selectOption"
                :selected="dept_name"
                :label="$t('device')"
                size="sm"
              />
                </div>
                
              </div>
            </div>
            <div class="plus">
              <!-- <mdb-btn @click="print" color="info py-2 px-4"   >
                {{$t('print')}}
              </mdb-btn> -->
              <mdb-btn type="submit" color="primary py-1 px-4 mt-4" style="font-size:12px;"  >
                {{$t('apply')}}
              </mdb-btn>
              <mdb-btn  color="primary py-1 px-4 mt-4 " @click="print" style="font-size:12px; margin-top: 9px;"  >
                <mdb-icon icon="print" />
              </mdb-btn>
            </div>
          </div>
        </form>

      </div>
    </div>

    <div class="mainChart px-3">
        <table  class="myTable">
        <thead style="background:##ECECEE;">
          <tr  class="header ">
          <th style="width: 40px;">Ид</th>
          <th>{{$t('fio')}}</th>
          <th>{{$t('date')}}</th>
          <th>{{$t('device')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in allreports" :key="i">
            <td>{{i+1}}</td>
            <td>{{item.user_name}}</td>
            <td>{{item.date_time.slice(0,10) + ' ' + item.date_time.slice(11,19)}}</td>
            <td>{{item.device_name}}</td>
          </tr>
          
        </tbody>
      </table>
    </div>




     <vue-html2pdf ref='listlar'
        :show-layout="false"
        :float-layout="true"
        :enable-download="false"
        :preview-modal="true"
        :paginate-elements-by-height="1600"
        filename="hee hee"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="landscape"
        pdf-content-width="100%"
        @hasStartedGeneration="hasStartedGeneration()"
        @hasGenerated="hasGenerated($event)"
      >
      <div slot="pdf-content">
        <div class="TablePatientDocId p-3">
          <table  class="pdfTable">
            <thead>
              <tr  class="header ">
              <th style="width: 40px;">Ид</th>
              <th>{{$t('fio')}}</th>
              <th>{{$t('date')}}</th>
              <th>{{$t('device')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,i) in allreports" :key="i">
                <td>{{i+1}}</td>
                <td>{{item.user_name}}</td>
                <td>{{item.date_time.slice(0,10) + ' ' + item.date_time.slice(11,19)}}</td>
                <td>{{item.device_name}}</td>
              </tr>
              
            </tbody>
          </table>
        </div>
      </div>

    </vue-html2pdf>

    <!-- <div :class="{'showing':show}">
      <div class="add d-flex justify-content-center align-items-center" >  
        <districtAdd/>
      </div>
    </div> -->
      <!-- <mdb-modal  :show="show"  @close="show = false"  light>
        <mdb-modal-header>
          <mdb-modal-title style="font-weight:  500;">{{$t('Добавить Район')}}</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
          <districtAdd :options="editData"/>
        </mdb-modal-body>
      </mdb-modal> -->
    <Toast ref="message"></Toast>
     <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_delete')" @to_hide_modal = "modal_status= false"/>
  </div>

</template>

<script>
  import VueHtml2pdf from 'vue-html2pdf'
  // import DatePicker from 'vue2-datepicker';
  // import 'vue2-datepicker/index.css';

  import erpSelect from "../../components/erpSelect.vue";
  import { mdbBtn, mdbIcon, mdbInput, } from 'mdbvue';
  import {mapActions, mapGetters, mapMutations} from 'vuex'
  export default {
    components: {
      mdbBtn, mdbInput,VueHtml2pdf,
       erpSelect, mdbIcon
    },
    data(){
      return{
        show: false,
        loading: false,
        snipper: true,
        editData: {},
        modal_info : '',
        modal_status: false,


        dept_name: '',
        dept_id: 0,
        Start_time: null,
        End_time: null,
        allreports: [],
        allDevices: [],


        admin: false,
        index: null,

      }
    },
    async mounted(){
        await this.fetchDevice()
        let a = {
          name: 'Все',
          id: 0,
        }
        this.allDevices.push(a);
        for(let i=0; i<this.allDevice.rows.length; i++){
          this.allDevices.push(this.allDevice.rows[i]);
        }
        let time1 = new Date();
        this.Start_time = time1.toISOString().slice(0,10); 
        this.End_time = time1.toISOString().slice(0,10);
    },
    computed: mapGetters(['allDevice']),
    methods: {
      ...mapActions(['fetchDevice',]),
      ...mapMutations(['dibet_delite_cont']),
      print(){
        this.$refs.listlar.generatePdf()
      },
      selectOption(option){
        console.log(option)
        this.dept_name = option.name;
        this.dept_id = option.id;
      },

      async submit(){
        let a = {}
        a.time1 = this.Start_time + 'T00:00:35.000Z';
        a.time2 = this.End_time + 'T23:59:59.000Z';
        console.log(a.time1)
        console.log(a.time2)
        try{
            this.loading = true;
            const response = await fetch(this.$store.state.hostname + "/ArchiveUsersCheckInOutReports/getCheckInOutListByDeviceIdAndDates?device_id=" +this.dept_id + '&b_date=' + a.time1 + '&e_date=' + a.time2);
              const data = await response.json();
            this.loading = false;
              console.log(data)
            if(data)
            {
              this.allreports = data;
              this.$refs.message.success('Added_successfully')
              return true;
            }
            else{
              this.modal_info = 'error';
              this.modal_status = true;
              return false;
            }
          }
          catch{
            this.loading = false;
            this.modal_info = this.$i18n.t('network_ne_connect'); 
            this.modal_status = true;
          }
        // this.loading = true;
      },

    },
  };
</script>

<style lang="scss">


.add{
  position: fixed;
  background: rgba(0, 0, 0, 0.4);
  height: 100vh;
  top:0;
  width:85%;
}

.addxizmat{
  width: 470px;
  // height: 120px;
  background: #fff;
  position: relative;
  z-index: 5000;
}
.showing{
  display: none;
}
.timePicer{
  position: relative;
  margin-top: -10px;
  .timeLabel{
    position: absolute;
    font-size: 12px;
    background-color: #fff;
    padding: 1px 3px;
    z-index: 1;
    left: 6px;
    top: -1px;
  }
  .dayLabel{
    position: absolute;
    font-size: 12px;
    background-color: #fff;
    padding: 0px 3px;
    z-index: 1;
    left: 6px;
    top: -8px;
  }
}
.TablePatientDocId{
    // height: 400px;
    // overflow: hidden;
    // overflow-y: auto;
    // border: 1px solid #ddd;
  }
  .myTable {
  /* border-collapse: collapse; */
  table-layout:fixed;
  width: 100%;
  overflow: hidden;
  // border: 1px solid #ddd;
  font-size: 18px;
  max-height:80px; overflow-x:auto
}
.myTable th{
  font-weight: 600;
  font-size:12px;
}
.myTable td{
  font-size:13px;
}
.myTable th, .myTable td {
  text-align: left;
  padding: 10px;
}
.myTable tr {
  border-bottom: 1px solid rgb(240, 240, 240);
}
.pdfTable th, .pdfTable td {
  text-align: left;
  padding: 5px;
}
.pdfTable td{
  font-size:12.5px;
}
.pdfTable tr {
  border-bottom: 1px solid rgb(240, 240, 240);
}
.pdfTable {
  /* border-collapse: collapse; */
  table-layout:fixed;
  width: 100%;
  overflow: hidden;
  // border: 1px solid #ddd;
  font-size: 18px;
  max-height:80px; overflow-x:auto
}
.pdfTable th{
  font-weight: 600;
  font-size:11.5px;
}



.myTable tr.header, .myTable tr:hover {
  // background-color: #f1f1f1;
}
.delIcon{
  color: rgb(251, 70, 70);
  font-size: 13px;
}
</style>