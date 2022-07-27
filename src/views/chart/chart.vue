<template>
  <div>
      <div class="d-flex mt-4">
        <div style="width: 20%; border-right padding: 5px 15px; height: 100vh; overflow: hidden; overflow-y: auto">
          <div @click="changefunc()">
            <apexchart type="area" height="240" :options="chartOptions1" :series="series"></apexchart>
          </div>
          <div  @click="changefunc1()">
            <apexchart type="area" height="240"  :options="chartOptions2" :series="series1"></apexchart>
          </div>
          <div @click="changefunc2()">
            <apexchart type="area" height="240"  :options="chartOptions3" :series="series2"></apexchart>
          </div>
        </div>
        <div id="chart" style="width: 80%">
          <h1 style="color:blue; margin-left:10px; text-align:center; margin-bottom:10px;">Диаграмма</h1>
          <apexchart v-show="fun" type="area"  height="350" :options="chartOptions" :series="series"></apexchart>

          <div v-show="fun1">
            <apexchart type="area" height="350" :options="chartOptions" :series="series1"></apexchart>
          </div>
          <div v-show="fun2">
            <apexchart type="area" height="350" :options="chartOptions" :series="series2"></apexchart>
          </div>
          <div v-for="(item, i) in series[2].data" :key="i">
            <p>{{item}}</p>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
// import {mapMutations, mapGetters} from 'vuex'
  export default {
    data() {
      return{
        fun:true,
        fun1: false,
        fun2: false,
        fun3: false,
        series: [{
          name: 'Влажнисть',
          data: []
        },
        {
          name: 'Освещения',
          data: []
        },
        {
          name: "Температура",
          data: []
        }
        ],
        series1: [
        {
          name: 'Влажнисть',
          data: []
        },
        {
          name: 'Освещения',
          data: []
        },
        ],
        series2: [
        {
          name: 'Влажнисть',
          data: []
        },
        {
          name: 'Освещения',
          data: []
        },
        ],

          chartOptions: {
            chart: {
              type: 'area',
              stacked: false,
              height: 380,
              zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
              },
              toolbar: {
                autoSelected: 'zoom'
              }
            },
            dataLabels: {
              enabled: false
            },
            // colors: ['#77B6EA', '#545454', '#77B122',],
            
            stroke: {
              curve: 'smooth'
            },
            title: {
              text: '',
              align: 'left'
            },
            fill: {
              type: 'gradient',
              gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0,
                stops: [0, 90, 100]
              },
            },
            yaxis: {
             
              title: {
                text: 'Температура',
              },
              min: 0,
              max: 100
            },
            
            xaxis: {
              categories: [],
            },
            tooltip: {
              shared: false,
              
            }
          },
          chartOptions1: {
            chart: {
              type: 'area',
              stacked: false,
              height: 380,
              zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
              },
              toolbar: {
                autoSelected: 'zoom'
              }
            },
            dataLabels: {
              enabled: false
            },
            markers: {
              size: 0,
            },
            title: {
              text: '1-комната',
              align: 'left'
            },
            fill: {
              type: 'gradient',
              gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0,
                stops: [0, 90, 100]
              },
            },
            yaxis: {
             
              title: {
                text: 'Температура'
              },
              min: 0,
              max: 100
            },
            xaxis: {
              categories: [''],
            },
            tooltip: {
              shared: false,
              
            }
          },
          chartOptions2: {
            chart: {
              type: 'area',
              stacked: false,
              height: 380,
              zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
              },
              toolbar: {
                autoSelected: 'zoom'
              }
            },
            dataLabels: {
              enabled: false
            },
            colors: ['#545454', '#77B122',],
            markers: {
              size: 0,
            },
            title: {
              text: '2-комната',
              align: 'left'
            },
            fill: {
              type: 'gradient',
              gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0,
                stops: [0, 90, 100]
              },
            },
            yaxis: {
              min: 0,
              max: 100,
              title: {
                text: 'Temprature'
              },
            },
            xaxis: {
              categories: [''],
            },
            tooltip: {
              shared: false,
              
            }
          },
          chartOptions3: {
            chart: {
              type: 'area',
              stacked: false,
              height: 380,
              zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
              },
              toolbar: {
                autoSelected: 'zoom'
              }
            },
            dataLabels: {
              enabled: false
            },
            markers: {
              size: 0,
            },
            title: {
              text: '3-комната',
              align: 'left'
            },
            fill: {
              type: 'gradient',
              gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0,
                stops: [0, 90, 100]
              },
            },
            yaxis: {
              title: {
                text: 'Temprature'
              },
              min: 0,
              max: 100
            },
            xaxis: {
              categories: [''],
            },
            tooltip: {
              shared: false,
            }
          },
      }
          
    },
    async created(){
      setInterval(()=>{  
        const d = new Date();
        console.log(d.toLocaleTimeString())
        this.series[0].data.push(90);
        this.series[1].data.push(75);
        this.series[2].data.push(Math.floor(Math.random() * 10));
        this.chartOptions.xaxis.categories.push(d.toLocaleTimeString())
        console.log(this.series[2].data)
        if(this.chartOptions.xaxis.categories.length > 20){
          this.chartOptions.xaxis.categories.splice(0,1);
          this.series[0].data.splice(0,1);
          this.series[1].data.splice(0,1);
          this.series[2].data.splice(0,1);
        }

        this.series1[0].data.push(97);
        this.series1[1].data.push(Math.floor(Math.random() * 10));
        this.chartOptions.xaxis.categories.push(d.toLocaleTimeString())
        if(this.chartOptions.xaxis.categories.length > 20){
          this.chartOptions.xaxis.categories.splice(0,1);
          this.series1[0].data.splice(0,1);
          this.series1[1].data.splice(0,1);
        }

        {
          this.series2[0].data.push(93);
          this.series2[1].data.push(Math.floor(Math.random() * 15));
          this.chartOptions.xaxis.categories.push(d.toLocaleTimeString())
          if(this.chartOptions.xaxis.categories.length > 20){
            this.chartOptions.xaxis.categories.splice(0,1);
            this.series2[0].data.splice(0,1);
            this.series2[1].data.splice(0,1);
          }
        }
      },3000)
    },
    // computed:mapGetters(['get_items']),
    mounted(){
      // setInterval(()=>{  
      //   const d = new Date();
      //   console.log(d.toLocaleTimeString())
      //   this.series[0].data.push(90);
      //   this.series[1].data.push(75);
      //   this.series[2].data.push(Math.floor(Math.random() * 10));
      //   this.chartOptions.xaxis.categories.push(d.toLocaleTimeString())
      //   console.log(this.series[2].data)
      //   if(this.chartOptions.xaxis.categories.length > 20){
      //     this.chartOptions.xaxis.categories.splice(0,1);
      //     this.series[0].data.splice(0,1);
      //     this.series[1].data.splice(0,1);
      //     this.series[2].data.splice(0,1);
      //   }

      //   this.series1[0].data.push(97);
      //   this.series1[1].data.push(Math.floor(Math.random() * 10));
      //   this.chartOptions.xaxis.categories.push(d.toLocaleTimeString())
      //   if(this.chartOptions.xaxis.categories.length > 20){
      //     this.chartOptions.xaxis.categories.splice(0,1);
      //     this.series1[0].data.splice(0,1);
      //     this.series1[1].data.splice(0,1);
      //   }

      //   {
      //     this.series2[0].data.push(93);
      //     this.series2[1].data.push(Math.floor(Math.random() * 15));
      //     this.chartOptions.xaxis.categories.push(d.toLocaleTimeString())
      //     if(this.chartOptions.xaxis.categories.length > 20){
      //       this.chartOptions.xaxis.categories.splice(0,1);
      //       this.series2[0].data.splice(0,1);
      //       this.series2[1].data.splice(0,1);
      //     }
      //   }
      // },3000)
    },
    methods: {
      // ...mapMutations(['UpdateItems']),
      changefunc(){
        this.fun = true
        this.fun1 = false,
        this.fun2 = false
        this.fun3 = false

      },
      changefunc1(){
        this.fun = false;
        this.fun1 = true;
        this.fun2 = false;
        this.fun3 = false

      },
      changefunc2(){
        this.fun = false;
        this.fun1 = false;
        this.fun2 = true;
        this.fun3 = false
      },
      changefunc3(){
        this.fun = false;
        this.fun1 = false;
        this.fun2 = false;
        this.fun3 = true
      }

    }
            
  }
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  height: 9px;              /* height of horizontal scrollbar ← You're missing this */
  width: 4.5px;   
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(152, 152, 152);
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(71, 71, 71);
}
</style>