<template>
  <div class="home">
    <a-button class="setting-btn" @click="onDrawerShow"><a-icon type="setting" /></a-button>
    <a-drawer
      title="设备选择"
      placement="left"
      :visible="drawerVisible"
      @close="onDrawerClose"
    >
      <a-button type="primary" @click="onDeviceSelect">设备1</a-button>
      <a-drawer
        title="历史记录"
        placement="left"
        :visible="deepDrawerVisible"
        @close="onDeepDrawerClose"
      >
        <div class="history-list">
          <a-button
            class="history-btn" type="primary"
            v-for="(history, index) in historyList"
            :key="index"
            @click="onHistorySelect"
          >
            {{ history }}
          </a-button>
        </div>
        
      </a-drawer>
    </a-drawer>

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
      map: null,
      historyList: [
        '2020.10.13',
        '2020.10.12',
      ]
    };
  },
  mounted() {
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
  methods: {
    onDrawerShow() {
      this.drawerVisible = true;
    },
    onDrawerClose() {
      this.drawerVisible = false;
    },
    onDeviceSelect() {
      this.deepDrawerVisible = true;
    },
    onDeepDrawerClose() {
      this.deepDrawerVisible = false;
    },
    onHistorySelect() {
      this.deepDrawerVisible = false;
      this.drawerVisible = false;
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
  
  .map {
    width: 80vw;
    height: 80vh;
  }
}
.history-list {
  display: flex;
  flex-direction: column;
  .history-btn {
    margin-bottom: 8px;
  }
}
</style>
