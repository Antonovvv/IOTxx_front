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
      historyList: [
        '2020.10.13',
        '2020.10.12',
      ]
    };
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
    }
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
}
.history-list {
  display: flex;
  flex-direction: column;
  .history-btn {
    margin-bottom: 8px;
  }
}
</style>
