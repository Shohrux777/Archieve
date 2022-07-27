<template>
  <div class="bg-white">
    <loader v-if="loading"/>
    <div class="p-3 pb-0">
      <div class=" mb-3 pt-2 " style="border-radius:5px; position:relative;">
        <form @submit.prevent="submit" class="">
          <div style="height: 60px;" class="d-flex justify-content-between border-bottom align-items-center  ">
            <div class="title w-75 row align-items-center">
              <div class="col-3">
                <div style="position: relative; margin-top: 40px;"> 
                  <small class="bg-white" style="position: absolute; z-index:1; left:10px; top: -9px; color: #757575;">
                    {{$t('start_time')}}
                  </small>
                  <mdb-input type="date" size="sm"  v-model="Start_time" outline/>
                </div>
              </div>
              <div class="col-3">
                <div style="position: relative; margin-top: 40px;"> 
                  <small class="bg-white" style="position: absolute; z-index:1; left:10px; top: -9px; color: #757575;">
                    {{$t('end_time')}}
                  </small>
                  <mdb-input type="date" size="sm" v-model="End_time" outline/>
                </div>
              </div>
              <div class="col-3">
                <div style="position: relative; margin-top: 23px;"> 
                  <small class="bg-white" style="position: absolute; z-index:1; left:10px; top: -9px; color: #757575;">
                    {{$t('room')}}
                  </small>
                  <erpSelect
                  class=""
                    :options="allBrend.rows"  
                    @select="selectOption"
                    :selected="room_name"
                    :label="$t('department')"
                    size="sm"
                  />
                </div>
                
              </div>
              <div class="col-3">
                <div style="position: relative; margin-top: 23px;"> 
                  <small class="bg-white" style="position: absolute; z-index:1; left:10px; top: -9px; color: #757575;">
                    {{$t('datchik')}}
                  </small>
                  <erpSelect
                  class=""
                    :options="allDatchik"  
                    @select="selectOptionDatchik"
                    :selected="datchik_name"
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
            </div>
          </div>
        </form>

      </div>
    </div>

    <div class="mainChartReport pt-0">
      <div class="mr-4">
        <apexchart  type="area" ref="chart" height="500"  :options="chartOptions" :series="series"></apexchart>
      </div>    
    </div>
    <div class="d-flex justify-content-center align-items-center" v-if="datchik_name != 'Все'"  style="color:#28A0DC;">
      <span class=" mr-2 bg-primary" style="height:15px; width:15px; border-radius: 50%;"></span>
      <small>{{datchik_name}}</small>
    </div>




     <!-- <vue-html2pdf ref='listlar'
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
          <table class="myTable">
            <thead>
              <tr class="header ">
                <th >{{$t('contragentName')}}</th>
                <th >{{$t('contragentPhoneNumber')}}</th>
                <th >{{$t('serviceGroupName')}}</th>
                <th>{{$t('serviceTypeName')}}</th>
                <th width="120">{{$t('cont_sum')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row,rowIndex) in bonus_contragent_list_by_group" :key="rowIndex">
                <td> <span >{{row.contragentName}}</span> </td>
                <td> <span >{{row.contragentPhoneNumber}}</span> </td>
                <td> <span >{{row.serviceGroupName}}</span> </td>
                <td> <span >{{row.serviceTypeName}}</span> </td>
                <td> <span >{{row.summa}}</span> </td>
              </tr>
              <tr >
                <td> <span class="text-primary">Общий</span> </td>
                <td> <span ></span> </td>
                <td> <span ></span> </td>
                <td> <span ></span> </td>
                <td> <span >{{summa}}</span> </td>
                
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </vue-html2pdf> -->

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
  // import VueHtml2pdf from 'vue-html2pdf'
  // import DatePicker from 'vue2-datepicker';
  // import 'vue2-datepicker/index.css';

  import erpSelect from "../../components/erpSelect.vue";
  import { mdbBtn, mdbIcon, mdbInput, } from 'mdbvue';
  import {mapActions, mapGetters, mapMutations} from 'vuex'
  export default {
    components: {
      mdbBtn, mdbInput,
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


        room_name: '',
        room_id: 0,
        Start_time: null,
        End_time: null,
        changeseries: [],
        changecategorys: [],
        admin: false,
        index: null,
        allDatchik: [],
        datchik_name: '',
        datchik_id: null,


         series: [],
        chartOptions: {
                chart: {
            height: 350,
            type: 'area'
          },
          dataLabels: {
            enabled: false
          },
          title: {
            text: '',
            align: 'left'
          },
          colors: ['#1000A5', '#545454', '#77B000', '#FC4136', '#FFCE46', '#862FA5', '#28A0DC',],
          fill: {
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              inverseColors: true,
              opacityFrom: 0.8,
              opacityTo: 0.3,
              stops: [0, 90, 100]
            },
          },
          stroke: {
            curve: 'smooth'
          },  
          yaxis: {
            title: {
              text: 'Значения',
            },
            min: 0,
            max: 100
          },
          xaxis: {
            categories: []
            
          },
          tooltip: {
            
            x: {
              format: 'dd/MM/yy HH:mm'
            },
          },
        },
      }
    },
    async mounted(){
        await this.fetchBrend()
        await this.fetchClient()
        
        let a = {
          name: 'Все',
          id: 0,
        }
        this.allDatchik.push(a);
        this.datchik_name = 'Все'

        let time1 = new Date();
        this.Start_time = time1.toISOString().slice(0,10); 
        this.End_time = time1.toISOString().slice(0,10);
    },
    computed: mapGetters(['allBrend', 'allClient']),
    methods: {
      ...mapActions(['fetchBrend','fetchClient']),
      ...mapMutations(['dibet_delite_cont']),
      // print(){
      //   this.$refs.listlar.generatePdf()
      // },
      selectOption(option){
        this.room_name = option.name;
        this.room_id = option.id;

        for(let i=0; i<option.roomDetails.length; i++){
          this.allDatchik.push(option.roomDetails[i].datchik);
        }
      },
      selectOptionDatchik(option){
        console.log(option.code)
        console.log('option')
        this.datchik_name = option.name
        this.datchik_id = option.id
        if(option.id == 0){
          this.submit();
        }
        else{
          let anonsData = [];
          for(let i=0; i<this.changeseries.length; i++){
            if(this.datchik_name == this.changeseries[i].name){
              anonsData.push(this.changeseries[i])
            }
          }
          console.log(anonsData)
          this.$refs.chart.chart.updateOptions({
            series: anonsData,
            xaxis: {
              categories: this.changecategorys
            },
            colors: ['#28A0DC']   
          })
        }
      },

      async submit(){
          let a = {}
          this.datchik_name = 'Все'
          a.time1 = this.Start_time + 'T00:00:35.000Z';
          a.time2 = this.End_time + 'T23:59:59.000Z';
          console.log(a.time1)
          console.log(a.time2)
          var itter = 0;
          this.changeseries = [];
          this.changecategorys = [];
          try{
              this.loading = true;  
              const response = await fetch(this.$store.state.hostname + "/ArchiveRoomDatchikDetail/getRoomDatchikDataListByRoomIdForReport?room_id=" + this.room_id + '&b_date=' + a.time1 + '&e_date=' + a.time2);
              const data = await response.json();
              console.log('data')
              console.log(data)
              this.loading = false;
              if(data[0].id)
              {
                let p = {
                  name: data[0].datchik_name,
                  data: []
                }
                p.data.push(data[0].value.toFixed(1))
                this.changeseries[0] = p;
                this.changecategorys.push()


                for(let t=1;t<data.length;t++){
                  if(data[t].datchik_number != data[0].datchik_number){
                    let p = {
                      name: data[t].datchik_name,
                      data: []
                    }
                    this.changeseries.push(p);
                  }
                  else{
                    break;
                  }
                }



                for(let i=1;i<data.length; i++){
                  if(data[i].datchik_number == data[0].datchik_number){
                    itter = 0;
                    this.changeseries[itter].data.push(data[i].value.toFixed(1));
                    this.changecategorys.push(data[i].date.slice(11,16))
                  }
                  else{
                    itter++;
                    this.changeseries[itter].data.push(data[i].value.toFixed(1));
                  }
                }
                console.log(this.changecategorys)
                this.$refs.chart.chart.updateOptions({
                series: this.changeseries,
                xaxis: {
                  categories: this.changecategorys
                },
                colors: ['#1000A5', '#545454', '#77B000', '#FC4136', '#FFCE46', '#862FA5', '#28A0DC',]
                
              })
              // console.log('data')
              // console.log(this.changecategorys)

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
.mainChartReport{
  // background: rgba(1, 17, 105, 0.861);
}
</style>