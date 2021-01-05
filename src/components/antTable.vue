<template>
  <a-table :data-source="deviceList" scroll>
    
    <a-table-column key="name" title="设备名" data-index="name" />
    <a-table-column key="owner" title="拥有者" data-index="owner" />
    <a-table-column key="records.length" title="数据记录(条)" data-index="records.length" />
    <!-- <a-table-column key="action" title="操作">
      <template slot-scope="text, record">
        <span>
          <a-button type="primary" ghost>查看数据</a-button>&nbsp;
          <a>{{ record.firstName }}</a>
          <a-button type="danger" ghost>清除信息</a-button>
        </span>
      </template>
    </a-table-column> -->
  </a-table>
</template>
<script>
// deviceList:{
// device_id: (...),
// name: (...),
// owner: (...),
// records: Array(2),
// 0:
// device_id: 4
// record_id: 1
// start_time: "2021}

export default {
  data() {
    return {
      
      deviceList: [],
    };
  },
  mounted() {
    
    this.getDevices();
  },  
  methods:{
    getDevices() {
      this.$axios.get('/devices').then(res => {
        console.log(res);
        if (res.data.length > 0) {
          this.deviceList = res.data;
          console.log(this.deviceList);
        }
      }).catch(e => {
        console.error(e);
      });
    },
  }
};
</script>