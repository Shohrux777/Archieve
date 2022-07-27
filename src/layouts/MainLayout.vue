<template>
  <div>
    <div class="d-flex allContent" style="position:sticky; top:0;"> 
      <div class=" border-right" :class="{'leftmenu': show_title, 'backleftmenu': !show_title }" >
        <div class="d-flex  pb-1 pt-1 mb-2 border-bottom shadow" >
          <svg v-if="show_title" xmlns="http://www.w3.org/2000/svg" @click="backMenu(!show_title)" class="icon icon-tabler icon-tabler-chevron-left leftdown" style="cursor:pointer;" width="26" height="26" viewBox="0 0 24 24" stroke-width="2" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <polyline points="15 6 9 12 15 18" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" @click="backMenu(!show_title)" class="icon icon-tabler icon-tabler-menu-2 backleftdown" width="26" height="26" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
          <div  class="d-flex align-items-center" v-if="show_title">
            <img src="../assets/arxiv1.png" width="35px" alt="">
            <h5 class="m-0 p-0 ml-2  text-white">Уз Архив</h5>
          </div>
        </div>
        <div class="" v-for="(link,index) in links" :key="index" >
          <div @click="update_down(index)">
            <router-link
            tag="li" custom v-slot="{ navigate }"
            :to="link.url"
            :class="{'active_link': link.view}"
            class="text-dark d-flex py-2 menuitem"
            >
            <!-- <MDBIcon style="color: red; margin-right: 10px; padding-left: 15px;" icon="camera-retro" />
            Xodimlar -->
            <li @click="navigate" role="link">
              <div  class="icon_div" style="width:15%;">
                <mdb-icon  :class="{'ico': show_title, 'backico': !show_title }" :icon="link.icon" />
              </div>
              <div v-if="show_title" class="d-flex justify-content-between" style="width:85%; text-align:left">
                <p  style="padding-left: 15px;" class="m-0">{{$t(link.title)}}</p>
                <svg v-if="link.down_list.length!=0" :class="{round:link.view}" xmlns="http://www.w3.org/2000/svg" class="icon mr-3 icon-tabler icon-tabler-chevron-right" style="margin-top: 3.5px;" width="13" height="13" viewBox="0 0 24 24" stroke-width="2" stroke="#999" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <polyline points="9 6 15 12 9 18" />
              </svg>
              </div>
            </li>
            </router-link>
          </div>
          <!-- dropdown -->
          <div v-if="show_title">
            <div v-show="link.view">
              <div v-for="(list,i) in link.down_list" :key="i" @click="update_down_click(i)">
                <router-link
                  tag="li" custom v-slot="{ navigate }"
                  :to="list.url"
                  :class="{'active_drop_linkArchive': list.dview}"
                  class="drop_downArchive justify-content-flex-start d-flex align-items-center  w-100"
                  > 
                  <li @click="navigate" role="link">
                    <a class="m-0 p-0 pl-2 d-flex" style="font-size:11.5px;">
                      <div class="icon_div ml-4">
                      <mdb-icon :icon="list.icon" :style="{color: link.color}"  class="mr-3 icon_color"/>
                    </div>
                      {{$t(list.title)}}</a>
                  </li>
                </router-link>
              </div>
            </div>
          </div>
        <!-- /dropdown -->
        </div>
      </div>
      <div class="main  bg-white" >
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import { mdbIcon } from 'mdbvue';
  // import { ref } from 'vue';


  export default {
    components: {
      mdbIcon,
    },
    mounted() {
      this.show_title = localStorage.sidebar;
      console.log(this.show_title)
      console.log(localStorage.sidebar)
      this.name = localStorage.Name;
      for (let j = 0; j < this.links.length; j++) {
        if(this.links[j].url == this.$route.fullPath){
          this.links[j].view = true;
          return
        }else{
          if(this.links[j].down_list.length > 0){
            for (let k = 0; k < this.links[j].down_list.length; k++){
              if(this.links[j].down_list[k].url == this.$route.fullPath){
                this.links[j].down_list[k].dview = true;
                this.links[j].view = true;
                this.indexMain = j;
                return
              }
            }
          }
        }
      }
    },
    data() {
      return {
        inter: null,
        name: 'sidebar',
        show_title: localStorage.sidebar,
        indexMain: -1,
        links: [

            { title: "company", icon: 'landmark', url: '/company', view: false, color: '#000', down_list:[] },
            { title: "department", icon: 'box', url: '/department', view: false, color: '#000', down_list:[] },
            { title: "datchik", icon: 'crutch', url: '/datchik', view: false, color: '#000', down_list:[] },
            { title: "room", icon: 'archway', url: '/room', view: false, color: '#000', down_list:[] },
            { title: 'connect', icon: 'sitemap', url: '/connect', view: false, color: '#000', down_list:[] },
            { title: "user", icon: 'user', url: '/user', view: false, color: '#000', down_list:[] },
            { title: "device", icon: 'bezier-curve', url: '/device', view: false, color: '#000', down_list:[] },
            // { title: "notifReceive", icon: 'bell', url: '/notificationReceive', view: false, color: '#000', down_list:[] },
            { title: "report", icon: 'calendar-plus', url: '', view: false, color: '#000', down_list:[
               { title: "reportGraph", url: '/report', dview: false, color: '#000', down_list:[] },
               { title: "reportChart", url: '/reportChart', dview: false, color: '#000', down_list:[] },

               { title: "reportDevice", url: '/reportDevice', dview: false, color: '#000', down_list:[] },
               { title: "reportDevice1", url: '/reportDevice1', dview: false, color: '#000', down_list:[] },
              
            ] },
            // { title: "chart", icon: 'chart-line', url: '/chart', view: false, color: '#000', down_list:[] },

            




            // // ............... for Market ....................

            // { title: 'm_product', icon: 'clipboard', url: '/product', view: false, color: 'rgb(99, 99, 99)', 
            //   down_list:[]
            // },
            // { title: "category", icon: 'box', url: '/category', view: false, color: 'rgb(99, 99, 99)', down_list:[] },
            // { title: 'sklad', icon: 'landmark', url: '/sklad', view: false, color: 'rgb(99, 99, 99)', down_list:[] },
            
            // { title: 'report', icon: 'user', url: '', view: false, color: 'rgb(99, 99, 99)', down_list:[] },

            // { title: 'statistics', icon: 'chart-pie', url: '', view: false, color: 'rgb(99, 99, 99)', down_list:[
            // ] },
            // { title: "buy", icon: 'box', url: '/buy', view: false, color: 'rgb(99, 99, 99)', down_list:[] },
            // { title: "sale", icon: 'shopping-basket', url: '/sale', view: false, color: 'rgb(99, 99, 99)', down_list:[] },

            // { title: 'menu_setting', icon: 'tools', url: '', view: false, color: 'rgb(99, 99, 99)', down_list:[
            //     { title: "company", url: '/company', dview: false, color: '#000', down_list:[] },
            //     { title: "department", url: '/department', dview: false, color: '#000', down_list:[] },
            //     { title: "user", url: '/user', dview: false, color: '#000', down_list:[] },
            //     { title: "client", url: '/client', dview: false, color: '#000', down_list:[] },
            //     { title: "productTag", url: '/productTag', dview: false, color: '#000', down_list:[] },
            //     { title: "productType", url: '/productType', dview: false, color: '#000', down_list:[] },
            //     { title: "measurment", url: '/measurment', dview: false, color: '#000', down_list:[] },
            //     { title: "brend", url: '/brend', dview: false, color: '#000', down_list:[] },
            // ] },

            // // ...............End for MArket..................

        ],
      }
    },
    created() {
        this.$root.$refs.sidebar = this;
    },
    mounted(){
      console.log('hiy')
      clearInterval(this.inter)
      this.inter = setInterval(this.updateServerAll, 600000);
    },
    methods: {
      update_down: function (i) {
        this.indexMain = i;
        for (let j = 0; j < this.links.length; j++) {
          if (j !== i) {
            this.links[j].view = false
            if(this.links[j].down_list.length > 0) {
              for (let k = 0; k < this.links[j].down_list.length; k++) {
                  this.links[j].down_list[k].dview = false
              }
            }
          }
        }
        this.links[i].view = true
      },
      update_down_click: function (i) {
        for (let j = 0; j < this.links[this.indexMain].down_list.length; j++) {
          if (j !== i) {
            this.links[this.indexMain].down_list[j].dview = false
          }
        }
        this.links[this.indexMain].down_list[i].dview = true
       // console.log(this.links[this.indexMain].down_list[i].dview)
      },
      backMenu(a){
        this.show_title = a
        localStorage.sidebar = this.show_title
        console.log(localStorage.sidebar)

      },



      async updateServerAll(){
        const response = await fetch(this.$store.state.hostname + "/ArchiveRoomDatchikDetail/getRoomDatchikDataListForAllRooms");
        const data = await response.json();
        this.lastDataRoom = data;
        console.log('this need data')
        console.log(data)
      },
    }
  };
</script>

<style lang="scss">
*{
  font-family: 'Montserrat', sans-serif;
}
.main{
  background: #eee;

}
.leftmenu{
  width: 290px;
  position: sticky;
  top: 0px;
  height: 100vh;
  overflow: hidden;
  overflow-y: auto;
  padding: 2px 0px;
  background: #0D2E4E;
  font-size: 13.5px;
}
.backleftmenu{
  background: #0D2E4E;
  height: 100vh;
  position: sticky;
  top: 0px;

}
.smallleftmenu{
  width: 50px;
  position: sticky;
  top: 0px;
  height: 100vh;
  overflow: hidden;
  overflow-y: auto;
  padding: 2px 0px;
  background: #0D2E4E;
  font-size: 14px;
}
.main{
  width: 100%;
}
.allContent{
  min-height: 100vh;
}
.active_link{
  box-sizing: border-box;
  border-left: 2px solid orange;
  background: rgba(113, 184, 255, 0.3);
  p{
    color: #1266F1;
  }
  .ico{
    color: #1266F1;
  }
  .backico{
    color: white;
  }
}
.active_drop_linkArchive{
  background: rgba(131, 190, 250, 0.25);
  p{
    color: #1266F1;
  }
  .ico{
    color: #1266F1;
  }
}
.menuitem{
  p{
    color: rgb(228, 228, 228);
  }
  .ico{
    font-size: 15px;
    color: rgb(228, 228, 228);
  }
}
.menuitem:hover{
  background: rgba(113, 184, 255, 0.2);
  p{
    color: white;
  }
  .ico{
    font-size: 15px;
    color: white;
  }
  
}
.ico{
    font-size: 13.5px;
    color:rgb(255, 255, 255);
  }
.snipper{
  display: flex;
  justify-content: center;
  background-color: rgb(255, 255, 255);
}
.activetext{
  cursor: pointer;
  a{
    color: #1266F1;
  }
  i{
    color: #1266F1;
  }
}
.drop_downArchive{
  color: rgb(255, 255, 255);
  padding: 5px 0;
  position: relative;
  justify-content: space-between;
  a{
    flex: 1;
    color: rgb(243, 243, 243);
    font-size: 12px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 100;
  }
  &:hover{
    background: rgba(131, 190, 250, 0.25);
  }
  
  
}
.round{
  transform: rotate(90deg);
  transition: all 0.5s;
}
.back_round{
  transition: all 0.5s;
}
.ico{
  padding-left: 15px;
}
.backico{
  padding-left: 17px;
  color:#eee

}
.leftdown{
  margin: 10px 8px;
  padding: 2px;
}
.backleftdown{
  margin: 10px 12px;
  padding: 1px;
  
}

</style>