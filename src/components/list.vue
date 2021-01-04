<template>

  <div
    v-infinite-scroll="handleInfiniteOnLoad"
    class="demo-infinite-container"
    :infinite-scroll-disabled="busy"
    :infinite-scroll-distance="13"
  >
    <header id="header-left" class="header">设备名</header><header id="header-center" class="header">拥有者</header><header id="header-right" class="header">数据记录</header>
    <a-list :data-source="data1" >
      <a-list-item slot="renderItem" slot-scope="item" >
        <a-list-item-meta >
          <a class="a-left" slot="title" :href="item.href">{{ item.device }}</a> <a class="a-center" slot="title" :href="item.href">{{ item.users }}</a> <a class="a-right" slot="title" :href="item.href">{{ item.records }}</a>
          
        </a-list-item-meta>
        <div> <a-button type="danger" ghost>清除信息</a-button></div>
      </a-list-item>
      <div v-if="loading && !busy" class="demo-loading-container">
        
        <a-spin />
      </div>
    </a-list>
  </div>
</template>

<script>
import infiniteScroll from 'vue-infinite-scroll';
const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';
export default {
  name: 'historyList',
  props: {
    msg: String
  },
  directives: { infiniteScroll },
  data() {
    return {
      deviceList:[] ,
      data:[],
      data1: [
      {device: 10001 ,users: "Ming",records:[]},
      {device: 10002 ,users: "Zhou",records:[]},
      {device: 10003 ,users: "yu",records:[]},
      {device: 10004 ,users: "Xiangxiang",records:[]},
      {device: 10005 ,users: "Luna",records:[]},
      {device: 10006 ,users: "queenYao",records:[]},
      {device: 10007 ,users: "jijiking",records:[]},
      {device: 10011 ,users: "MARKPOLO",records:[]},
      {device: 10012 ,users: "Direnjei",records:[]},
      {device: 10010 ,users: "DaQiao",records:[]}
      ],
      loading: false,
      busy: false,
    };
  },
  beforeMount() {
    this.fetchData(res => {
      this.data = res.results;
    });
  },
  methods: {
    getDevices() {
      this.$axios.get('/devices').then(res => {
        console.log(res);
        if (res.data.length > 0) {
          this.deviceList = res.data;
        }
      }).catch(e => {
        console.error(e);
      });
    },
    
  },
};
</script>
<style>
.demo-infinite-container {
  border: 3px solid #e8e8e8;
  border-radius: 4px;
  overflow: auto;
  padding: 8px 24px;
  height: 500px;
  size: middle;
}
.demo-loading-container {
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align:left;
}


.header {
  display: inline-block;
}

#header-left {
  width: 200px;
  height: 20px;
 text-align: center;
 float: left;
}
#header-center {
  height: 20px;
  flex: 1;
  text-align: center; 
}
#header-right {
  width: 300px;
  height: 20px;
  text-align: right; 
}
.a-left{
  width: 200px;
  height: 20px;
 text-align: center;
 float: left;
 background-color: blanchedalmond;
}
.a-center{
   height: 20px;
  flex: 1;
  text-align: left; 
  background-color: aquamarine;
  display: inline-block;
}
.a-right{
  width: 330px;
  height: 20px;
  text-align: left; 

  display: inline-block;
  float: right;
}


</style>
