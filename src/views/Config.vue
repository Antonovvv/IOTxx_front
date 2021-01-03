<template>
  <div>
    <h2 >用户设备表</h2>
    <div id="button" >
      <a-button id="search" icon="search">查找信息</a-button>
      <a-button id="add" icon="plus" @click="showModal" >增加设备</a-button>

      <a-modal v-model="modalVisible" title="增加设备" @ok="handleOk">
         <form1/>
      </a-modal>
      
    </div>
    
    
    <historyList></historyList>
  </div>
</template>

<script>
import historyList from '@/components/list.vue' ;
import form1 from '@/components/form1.vue' ;


export default {
  components: {
    historyList,
    form1,
  },
    
  data(){

    return{
      modalVisible : false,
      
    }
  },

  methods:{
    showModal() {
      console.log("showModal");
      this.modalVisible = true;
    },
    handleOk(e) {
      console.log(e);
      this.modalVisible = false;
    },
  }
}
</script>

<style>
 h2{
  padding: 20px;
 
}
#button{
  height: 50px;
}
#search{
  float: left;
  margin:auto auto auto 150px;
  
}
#add{
  float:right;
  margin:auto 150px auto auto;
}
#form{
  
  height: 200px;
}
</style>