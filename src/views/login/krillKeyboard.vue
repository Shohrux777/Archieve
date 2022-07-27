<template>
  <div style="width:100%;">
    <div class="klaviaturaKrill">
      <div class="harf rounded" @click="addHarf('й')"><span>й</span></div>
      <div class="harf rounded" @click="addHarf('ц')"><span>ц</span></div>
      <div class="harf rounded" @click="addHarf('у')"><span>у</span></div>
      <div class="harf rounded" @click="addHarf('к')"><span>к</span></div>
      <div class="harf rounded" @click="addHarf('е')"><span>е</span></div>
      <div class="harf rounded" @click="addHarf('н')"><span>н</span></div>
      <div class="harf rounded" @click="addHarf('г')"><span>г</span></div>
      <div class="harf rounded" @click="addHarf('ш')"><span>ш</span></div>
      <div class="harf rounded" @click="addHarf('щ')"><span>щ</span></div>
      <div class="harf rounded" @click="addHarf('з')"><span>з</span></div>
      <div class="presskey rounded text-danger" @click="remove()"><span>делете</span></div>
      <div class="harf rounded" @click="addHarf('ф')"><span>ф</span></div>
      <div class="harf rounded" @click="addHarf('ы')"><span>ы</span></div>
      <div class="harf rounded" @click="addHarf('в')"><span>в</span></div>
      <div class="harf rounded" @click="addHarf('а')"><span>а</span></div>
      <div class="harf rounded" @click="addHarf('п')"><span>п</span></div>
      <div class="harf rounded" @click="addHarf('р')"><span>р</span></div>
      <div class="harf rounded" @click="addHarf('о')"><span>о</span></div>
      <div class="harf rounded" @click="addHarf('л')"><span>л</span></div>
      <div class="harf rounded" @click="addHarf('д')"><span>д</span></div>
      <div class="harf rounded" @click="addHarf('ж')"><span>ж</span></div>
      <div class="harf rounded" @click="addHarf('э')"><span>э</span></div>
      <div class="harf rounded" @click="addHarf('х')"><span>х</span></div>
      <div class="harf rounded" @click="addHarf('я')"><span>я</span></div>
      <div class="harf rounded" @click="addHarf('ч')"><span>ч</span></div>
      <div class="harf rounded" @click="addHarf('с')"><span>с</span></div>
      <div class="harf rounded" @click="addHarf('м')"><span>м</span></div>
      <div class="harf rounded" @click="addHarf('и')"><span>и</span></div>
      <div class="harf rounded" @click="addHarf('т')"><span>т</span></div>
      <div class="harf rounded" @click="addHarf('ь')"><span>ь</span></div>
      <div class="harf rounded" @click="addHarf('б')"><span>б</span></div>
      <div class="harf rounded" @click="addHarf('ю')"><span>ю</span></div>
      <div class="harf rounded" @click="addHarf('ъ')"><span>ъ</span></div>
      <div class="presskey rounded"><span></span></div>
      <div class="probelKey rounded" @click="addHarf(' ')"><span></span></div>
    </div>
   
  </div>
</template>

<script>
export default {
  data(){
    return{
      matn: '',
    }
  },
  methods: {
    addHarf(harf){
      this.matn += harf;
      console.log(this.matn)
      this.$emit('text', this.matn);
    },
    remove(){
      var a = this.matn.length;
      console.log(a)
      // this.matn.splice(1, 1)
      console.log(this.matn)
    }
  }
}
</script>

<style lang="scss">
.klaviaturaKrill{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 5px 0;
  background-color: #eee;

  width: 100%;
  .harf{
    width: 8%;
    height: 40px;
    display: flex;
    justify-content:center;
    align-items:center;
    margin:2px 1px;
    background-color: #fff;
    cursor: pointer;
    &:hover{
      background-color: #ddd;
    }
  }
  .presskey{
     width: 16%;
     height: 40px;
      display: flex;
      justify-content:center;
      align-items:center;
      margin:2px 2px;
      background-color: #fff;
      cursor: pointer;
      &:hover{
      background-color: #ddd;
    }
  }
  .probelKey{
    width: 80%;
     height: 40px;
      display: flex;
      justify-content:center;
      align-items:center;
      margin:1px;
      background-color: #fff;
      cursor: pointer;
      &:hover{
      background-color: #ddd;
    }
  }
}
</style>