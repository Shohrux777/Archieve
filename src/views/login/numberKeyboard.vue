<template>
  <div style="width:100%;">
    <div class="klaviaturaKrill">
      <div class="harf rounded" @click="addHarf('1')"><span>1</span></div>
      <div class="harf rounded" @click="addHarf('2')"><span>2</span></div>
      <div class="harf rounded" @click="addHarf('3')"><span>3</span></div>
      <div class="harf rounded" @click="addHarf('4')"><span>4</span></div>
      <div class="harf rounded" @click="addHarf('5')"><span>5</span></div>
      <div class="harf rounded" @click="addHarf('6')"><span>6</span></div>
      <div class="harf rounded" @click="addHarf('7')"><span>7</span></div>
      <div class="harf rounded" @click="addHarf('8')"><span>8</span></div>
      <div class="harf rounded" @click="addHarf('9')"><span>9</span></div>
      <div class="harf rounded" @click="addHarf('0')"><span>0</span></div>
      <div class="presskey rounded text-danger" @click="remove()"><span>делете</span></div>
      
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
      this.$emit('number', this.matn);
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