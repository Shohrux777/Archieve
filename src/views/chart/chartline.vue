<template>
  <div class="mx-1">
    <div class="d-flex " style="height: 100vh;">
        <div style="width: 20%; border-right padding: 5px 15px; height: 100vh; overflow: hidden; overflow-y: auto">
          <div class="d-flex border-bottom mb-1" style="cursor: pointer;" @click="backpage">
            <svg xmlns="http://www.w3.org/2000/svg"  class="icon icon-tabler icon-tabler-chevron-left my-2" width="23" height="23" viewBox="0 0 24 24" stroke-width="1.5" stroke="#6f32be" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <polyline points="15 6 9 12 15 18" />
          </svg>
          <span class="my-2 ml-2" >{{$t('back')}}</span>

          </div>
           <div  v-for="(item,i) in allchartOption" :key="i" >
            <apexchart class="bg_chartLine" :class="{'danger_chart': item.danger}" @click="activeChart(i)" type="area" :ref="item.name" height="250" :options="item" :series="item.series"></apexchart>
          </div>

        </div>
        <div  style="width: 80%" class="bg_width">
          <div class="border-bottom mb-3 mt-4" >
            <h1 style="color:blue; margin-left:10px; text-align:center; margin-bottom:10px;" class=" mb-3">Диаграмма</h1>
          </div>
          <div class="mr-3 bg_chart" >
            <apexchart   type="area" ref="chart" height="500"  :options="chartOptions" :series="series"></apexchart>
          </div>
          
        </div>
      </div>
    
  </div>
    
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
  data (){
    return{
      fun1: true,
      fun2: false,
      fun3: false,

      allchartOption: [],
      activeRoomId: 0,
      activeRoomName: '',
      lastDataRoomId: [],
      lastDataRoom: [],
      inter: null,
      interAll: null,
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
          colors: ['#1000A5', '#545454', '#77B000', '#FC4136', '#FFCE46', '#862FA5', '#28A0DC'],
          fill: {
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              inverseColors: false,
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
            min: 1,
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
    await this.fetchBrend();
    
    this.chartOptions.title.text = this.allBrend.rows[0].name;
    for(let i = 0; i < this.allBrend.rows.length; i++){
      
      var a = {
            name: this.allBrend.rows[i].name,
            danger: false,
            series: [],
            chart: {
              height: 350,
              type: 'area'
            },
            dataLabels: {
              enabled: false
            },
            markers: {
              size: 0,
            },
            colors: ['#1000A5', '#545454', '#77B000', '#FC4136', '#FFCE46', '#862FA5', '#28A0DC'],
            legend: {
              position: 'bottom',
              horizontalAlign: 'center'
            },
            title: {
              text: this.allBrend.rows[i].name,
              align: 'left'
            },
            fill: {
              type: 'gradient',
              gradient: {
                shadeIntensity: 1,
                inverseColors: false,
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
             
            },
            xaxis: {
              categories: [],
              category: [],
            },
            tooltip: {
              x: {
                format: 'dd/MM/yy HH:mm'
              },
            },
          }
       
          for(let j=0; j< this.allBrend.rows[i].roomDetails.length; j++){
            let itemSeries = {
              name: this.allBrend.rows[i].roomDetails[j].datchik_name,
              data: []
            }
            a.series.push(itemSeries)
          }
          this.allchartOption.push(a);
    }
    this.updateServerAll();
    this.inter = setInterval(this.updateServerAll, 600000);

  },

  computed: mapGetters(['allBrend']),
  methods:{
    ...mapActions(['fetchBrend']),
    // async updateServer(){
    //   clearInterval(this.inter)
    //   const response = await fetch(this.$store.state.hostname + "/ArchiveRoomDatchikDetail/getRoomDatchikDataListByRoomId?room_id=" + this.activeRoomId);
    //   const data = await response.json();
    //   this.lastDataRoomId = data;
      
    //   this.inter = setInterval(this.test, 20000);
    //   console.log(this.lastDataRoomId)
    // },
    // test(){
    //   const d = new Date();
    //     console.log(d.toLocaleTimeString())
    //     {
    //       for(let i = 0; i <this.lastDataRoomId.length; i++){
    //         this.series[i].data.push(this.lastDataRoomId[i].value.toFixed(1));
    //       }
    //       // this.series[0].data.push(Math.floor(Math.random() * 100));
    //       // this.series[1].data.push(Math.floor(Math.random() * 50));
    //       // this.series[2].data.push(Math.floor(Math.random() * 10));
    //       this.chartOptions.xaxis.categories.push(d.toLocaleTimeString())
    //       if(this.chartOptions.xaxis.categories.length > 12){
    //         this.chartOptions.xaxis.categories.splice(0,1);
    //         this.series[0].data.splice(0,1);
    //         this.series[1].data.splice(0,1);
    //         this.series[2].data.splice(0,1);
    //       }

    //       this.$refs.chart.chart.updateOptions({
    //         series: this.series,
    //         xaxis: {
    //           categories: this.chartOptions.xaxis.categories
    //         }
    //       })
    //     }

    // },

    activeChart(i){
      this.series = [],
      this.chartOptions.xaxis.categories = []
      this.activeRoomId = i;
   
      // this.testAll()
      this.updateServerAll();

    },
    mainchart(){
      // console.log(this.allchartOption[this.activeRoomId].series)
      // console.log('this.allchartOption[this.activeRoomId].series')
      
      this.$refs.chart.chart.updateOptions({
          series: this.allchartOption[this.activeRoomId].series,
          xaxis: {
            categories: this.allchartOption[this.activeRoomId].xaxis.category
          },
          title:{
            text: this.allchartOption[this.activeRoomId].name
          }
        })




    },

    async updateServerAll(){
      clearInterval(this.interAll)
      const response = await fetch(this.$store.state.hostname + "/ArchiveRoomDatchikDetail/getRoomDatchikDataListForAllRooms");
      const data = await response.json();
      this.lastDataRoom = data;
      console.log('this need data')
      console.log(data)
      this.testAll()
      this.interAll = setInterval(this.testAll, 60000);
    },
    testAll(){
      const d = new Date();
        // console.log(d.toLocaleTimeString())
        {
          for(let i = 0; i <this.lastDataRoom.length; i++){
            for(let j=0; j <this.lastDataRoom[i].datchikDataList.length; j++){
              if(this.lastDataRoom[i].datchikDataList[j].max_value<this.lastDataRoom[i].datchikDataList[j].value || this.lastDataRoom[i].datchikDataList[j].min_value > this.lastDataRoom[i].datchikDataList[j].value ){
                this.allchartOption[i].danger = false;
              }
              else{
                this.allchartOption[i].danger = false;
              }
              this.allchartOption[i].series[j].data.push(this.lastDataRoom[i].datchikDataList[j].value.toFixed(1))
              this.allchartOption[i].series[j].name = this.lastDataRoom[i].datchikDataList[j].datchik_name

            }
            // this.series[i].data.push(this.lastDataRoom[i].value.toFixed(1));
             this.allchartOption[i].xaxis.category.push(d.toLocaleTimeString())
              if(this.allchartOption[i].xaxis.category.length > 12){
                this.allchartOption[i].xaxis.category.splice(0,1);
                this.allchartOption[i].series[0].data.splice(0,1);
                this.allchartOption[i].series[1].data.splice(0,1);
                this.allchartOption[i].series[2].data.splice(0,1);
                this.allchartOption[i].series[3].data.splice(0,1);
                this.allchartOption[i].series[4].data.splice(0,1);
                this.allchartOption[i].series[5].data.splice(0,1);
                this.allchartOption[i].series[6].data.splice(0,1);
              }
              
              this.$refs[this.allchartOption[i].name][0].chart.updateOptions({
                series: this.allchartOption[i].series,
                xaxis: {
                  category: this.allchartOption[i].xaxis.category
                }
              })
              this.mainchart();
          }

          // // this.chartOptions.xaxis.categories.push(d.toLocaleTimeString())
          // // if(this.chartOptions.xaxis.categories.length > 12){
          // //   this.chartOptions.xaxis.categories.splice(0,1);
          // //   this.series[0].data.splice(0,1);
          // //   this.series[1].data.splice(0,1);
          // //   this.series[2].data.splice(0,1);
          // // }
        }

    },
    backpage(){
      clearInterval(this.interAll)
      clearInterval(this.inter);
      this.$router.push('/company')
    }
  }
  
}
</script>

<style>
.danger_chart{
  border: 1px dashed red;
  /* background-color: rgb(255, 117, 117); */
  animation-name: example;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
}
@keyframes example {
  from {background-color: rgb(255, 184, 184);}
  to {background-color: rgb(255, 80, 80);}
}
.bg_chart{
  background: rgb(95, 132, 143);
  border-radius: 7px;
}
.bg_width{
  background: rgb(230, 252, 255);
}
.bg_chartLine{
  background: rgb(207, 211, 246);
  border-radius: 10px;
  margin-top:5px;
}
</style>