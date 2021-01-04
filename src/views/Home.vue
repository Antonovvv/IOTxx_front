<template>
  <div class="home">
    <a-button-group class="setting-btn">
      <a-button @click="onDrawerShow('trail')"><a-icon type="radar-chart" /></a-button>
      <a-button @click="onDrawerShow('heat')"><a-icon type="heat-map" /></a-button>
    </a-button-group>
    
    <a-drawer
      title="设备选择"
      placement="left"
      :visible="drawerVisible"
      @close="onDrawerClose"
    >
      <div class="device-list">
        <a-button 
          type="primary" class="device-btn"
          v-for="(device, index) in deviceList" :key="index"
          @click="onDeviceSelect(device)"
        >
          {{ device.name }}
        </a-button>
      </div>
      <a-drawer
        :title="`记录选择（${mode === 'trail' ? '轨迹图' : '热力图'}）`"
        placement="left"
        :visible="deepDrawerVisible"
        @close="onDeepDrawerClose"
      >
        <div class="record-list">
          <template v-if="mode === 'trail'">
            <a-button
              class="record-btn" type="primary"
              v-for="(record, index) in selectedDevice.records" :key="index"
              @click="onRecordSelect(record)"
            >
              {{ record.start_time }}
            </a-button>
          </template>
          <template v-if="mode === 'heat'">
            <a-button class="record-check-btn" type="primary" @click="onRecordCheckConfirm">确认</a-button>
            <a-checkbox-group
              v-model="checkedRecord"
              :options="recordList"
            />
          </template>
        </div>
        
      </a-drawer>
    </a-drawer>

    <div class="device-info">
      <a-descriptions title="设备信息">
        <a-descriptions-item label="设备名">
          {{ selectedDevice.name || '无' }}
        </a-descriptions-item>
        <a-descriptions-item label="设备用户">
          {{ selectedDevice.owner || '无' }}
        </a-descriptions-item>
        <a-descriptions-item label="当前记录">
          {{ mode === 'trail' ? (selectedRecord.start_time || '无') : '多条记录热力图' }}
        </a-descriptions-item>
      </a-descriptions>
    </div>
    <div id="map" class="map"></div>
    <!-- <a-button @click="getCenter">get</a-button> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  data() {
    return {
      drawerVisible: false,
      deepDrawerVisible: false,
      mode: 'trail',
      map: null,
      trail: null,
      heat: null,
      deviceList: [],
      selectedDevice: {},
      selectedRecord: {},
      checkedRecord: [],
    };
  },
  computed: {
    recordList() {
      return (this.selectedDevice.records ?? []).map(record => {
        return {
          label: record.start_time,
          value: record.record_id,
        };
      });
    }
  },
  mounted() {
    this.getDevices();
    this.initMap();
  },
  methods: {
    initMap() {
      if (window.TMap) {
        const TMap = window.TMap;
        const center = new TMap.LatLng(30.51283206177366, 114.43127457409332);
        const map = new TMap.Map(document.getElementById('map'), {
          center: center,
          zoom: 19,
          minZoom: 18,
          maxZoom: 20,
        });
        this.map = map;
      }
    },
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
    initTrail(endTime) {
      if (this.trail) this.trail.destroy();
      const TMap = window.TMap;
      const trail = new TMap.visualization.Trail({
        pickStyle: (trailLine) => {
          return { color: '#0000ff' };
        },
        showDuration: 10000,
        startTime: 0,
        endTime: endTime + 500,
        playRate: 500,
      }).addTo(this.map);
      this.trail = trail;
    },
    initHeat() {
      if (this.heat) this.heat.destroy();
      const TMap = window.TMap;
      const heat = new TMap.visualization.Heat({
        max: 40, // 热力最强阈值
        min: 0, // 热力最弱阈值
        height: 100, // 峰值高度
        gradientColor: { // 渐变颜色
            0.25: "rgb(0,0,255)",
            0.35: "rgb(0,255,0)",
            0.65: "rgb(255,255,0)",
            0.9: "rgb(255,0,0)",
            1.0: "rgb(255,0,0)"
        },
        radius: 30 // 最大辐射半径
      }).addTo(this.map);
      this.heat = heat;
    },
    showTrail() {
      if (!this.selectedRecord.record_id) return;
      this.$axios.get(`/records/${this.selectedRecord.record_id}`).then(res => {
        console.log(res);
        if (res.data.length > 0) {
          const startTime = JSON.parse(res.data[0].data).time;
          const endTime = JSON.parse(res.data[res.data.length - 1].data).time - startTime;
          const pathData = res.data.map(point => {
            let data = JSON.parse(point.data);
            return [data.lat, data.lng, data.time - startTime];
          });
          console.log(pathData)
          this.initTrail(endTime);
          this.trail.setData([
            {
              style: 'blue',
              path: pathData
            },
          ]);
        }
      }).catch(e => {
        console.error(e);
      });
    },
    showHeat() {
      if (this.checkedRecord.length < 1) return;
      Promise.all(this.checkedRecord.map(recordId => {
        return this.$axios.get(`/records/${recordId}`);
      })).then(results => {
        console.log(results)
        this.initHeat();
        let points = [];
        results.forEach(res => {
          if (res.data.length > 0) {
            points = [...points, ...res.data];
          }
        })
        this.heat.setData(points.map(point => {
          let data = JSON.parse(point.data);
          return { lat: data.lat, lng: data.lng, count: 1 };
        }));
      }).catch(e => {
        console.error(e);
      });
    },
    onDrawerShow(mode) {
      this.mode = mode;
      this.getDevices();
      this.drawerVisible = true;
    },
    onDrawerClose() {
      this.drawerVisible = false;
    },
    onDeviceSelect(device) {
      this.selectedDevice = device;
      this.deepDrawerVisible = true;
    },
    onDeepDrawerClose() {
      this.deepDrawerVisible = false;
    },
    onRecordSelect(record) {
      this.selectedRecord = record;
      this.deepDrawerVisible = false;
      this.drawerVisible = false;
      this.showTrail();
    },
    onRecordCheckConfirm() {
      console.log(this.checkedRecord)
      this.deepDrawerVisible = false;
      this.drawerVisible = false;
      this.showHeat();
    },
    getCenter() {
      var pos = this.map.getCenter();
      console.log(pos);
    },
  }
}
</script>

<style lang="less">
.home {
  display: flex;
  flex-direction: column;
  align-items: center;

  .setting-btn {
    position: fixed;
    left: 4px;
    top: 100px;
  }
  
  .device-info {
    display: block;
    margin-left: 32px;
    width: 80vw;
    margin-top: 20px;
  }
  .map {
    width: 80vw;
    height: calc( 80vh - 20px );
  }
}

.record-list, .device-list {
  display: flex;
  flex-direction: column;
  .record-btn, .device-btn, .ant-checkbox-group-item {
    margin-bottom: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .record-check-btn {
    margin-bottom: 20px;
  }
}
</style>
