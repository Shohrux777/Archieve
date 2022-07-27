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
                    {{$t('room')}}
                  </small>
               <erpSelect
               class=""
                :options="allRooms"  
                @select="selectOption"
                :selected="room_name"
                :label="$t('department')"
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
        <table  class="pdfTable">
          <thead  style="background:##ECECEE;">
            <tr  class="header "> 
            <th style="width: 40px; font-size:11px;">Ид</th>
            <th  style="font-size:11px;">{{$t('room')}}</th>
            <th  style="font-size:11px;">{{$t('datchik')}}</th>
            <th  style="font-size:11px;">{{$t('datchik_number')}}</th>
            <th  style="font-size:11px;">{{$t('date')}}</th>
            <th  style="font-size:11px;">{{$t('time')}}</th>
            <th  style="font-size:11px;">{{$t('value')}}</th>
            <th  style="font-size:11px;">{{$t('norma')}}</th>

            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,i) in allreports" :key="i">
              <td  style="font-size:11px;">{{i+1}}</td>
              <td  style="font-size:11px;">{{room_name}}</td>
              <td  style="font-size:11px;">{{item.datchik_name}}</td>
              <td  style="font-size:11px;">{{item.datchik_number}}</td>
              <td  style="font-size:11px;">{{item.date.slice(0, 10)}}</td>
              <td  style="font-size:11px;">{{item.date.slice(11, 18)}}</td>
              <td  style="font-size:11px;">{{item.value.toFixed(4)}}</td>
              <td>
                <mdb-badge pill  color="primary">{{$t('normal')}}</mdb-badge>
                <!-- v-if="item.value.toFixed(4)>=min_value && item.value.toFixed(4)<=max_value " -->
                <!-- <mdb-badge pill v-else color="danger">{{$t('not_normal')}}</mdb-badge> -->
              </td>
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
                <th style="width: 40px; font-size:11px;">Ид</th>
                <th  style="font-size:11px;">{{$t('room')}}</th>
                <th  style="font-size:11px;">{{$t('datchik')}}</th>
                <th  style="font-size:11px;">{{$t('datchik_number')}}</th>
                <th  style="font-size:11px;">{{$t('date')}}</th>
                <th  style="font-size:11px;">{{$t('time')}}</th>
                <th  style="font-size:11px;">{{$t('value')}}</th>

                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,i) in allreports" :key="i">
                  <td  style="font-size:11px;">{{i+1}}</td>
                  <td  style="font-size:11px;">{{room_name}}</td>
                  <td  style="font-size:11px;">{{item.datchik_name}}</td>
                  <td  style="font-size:11px;">{{item.datchik_number}}</td>
                  <td  style="font-size:11px;">{{item.date.slice(0, 10)}}</td>
                  <td  style="font-size:11px;">{{item.date.slice(11, 18)}}</td>
                  <td  style="font-size:11px;">{{item.value.toFixed(4)}}</td>
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
  import { mdbBtn, mdbIcon, mdbInput,mdbBadge } from 'mdbvue';
  import {mapActions, mapGetters, mapMutations} from 'vuex'
  export default {
    components: {
      mdbBtn, mdbInput,
       erpSelect, mdbIcon,VueHtml2pdf,
       mdbBadge
    },
    data(){
      return{
        show: false,
        loading: false,
        snipper: true,
        editData: {},
        modal_info : '',
        modal_status: false,


        room_name: '',
        room_id: 0,
        Start_time: null,
        End_time: null,
        allreports: [],
        allRooms: [],

        admin: false,
        index: null,
      }
    },
    async mounted(){
        await this.fetchBrend()
        let a = {
          name: 'Все',
          id: 0,
        }
        this.allRooms.push(a);
        for(let i=0; i<this.allBrend.rows.length; i++){
          this.allRooms.push(this.allBrend.rows[i]);
        }
        let time1 = new Date();
        this.Start_time = time1.toISOString().slice(0,10); 
        this.End_time = time1.toISOString().slice(0,10);
    },
    computed: mapGetters(['allBrend']),
    methods: {
      ...mapActions(['fetchBrend',]),
      ...mapMutations(['dibet_delite_cont']),
      print(){
        this.$refs.listlar.generatePdf()
      },
      selectOption(option){
        console.log(option)
        this.room_name = option.name;
        this.room_id = option.id;
      },

      async submit(){
        let a = {}
        a.time1 = this.Start_time + 'T00:00:35.000Z';
        a.time2 = this.End_time + 'T23:59:59.000Z';
        console.log(a.time1)
        console.log(a.time2)
        try{
            this.loading = true;
            const response = await fetch(this.$store.state.hostname + "/ArchiveRoomDatchikDetail/getRoomDatchikDataListByRoomIdForReport?room_id=" + this.room_id + '&b_date=' + a.time1 + '&e_date=' + a.time2);
              const data = await response.json();
            this.loading = false;
              console.log('data')
              console.log(data)
            if(data[0].id)
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

.myTable tr.header, .myTable tr:hover {
  // background-color: #f1f1f1;
}
.delIcon{
  color: rgb(251, 70, 70);
  font-size: 13px;
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
</style>