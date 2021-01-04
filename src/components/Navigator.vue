<template>
  <div class="nav">
    <div class="header">
      <a-icon class="header-icon" type="radar-chart" />
      <a-icon class="header-icon" type="heat-map" />
    </div>

    <a-menu mode="horizontal" :selectedKeys="current" @select="onNavSelect">
      <a-menu-item key="home">
        <a-icon type="home" />主页
        <!-- <router-link to="/">Home</router-link> -->
      </a-menu-item>
      <a-menu-item key="config">
        <a-icon type="table" />配置
        <!-- <router-link to="/ground">Ground</router-link> -->
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  data() {
    return {
      current: [this.$route.name.toLowerCase()],
    }
  },
  watch: {
    $route: {
      handler(route) {
        this.$nextTick(() => {
          this.current = [route.name.toLowerCase()];
        })
      },
      immediate: true,
      deep: true,
    }
  },
  mounted() {
    console.log('mo')
  },
  methods: {
    onNavSelect({ item, key }) {
      if (key == this.current[0]) return;
      if (key === 'home') {
        // this.current[0] = 'home';
        this.$router.push({ path: '/' });
      } else {
        // this.current[0] = key;
        this.$router.push({ path: key });
      }
    },
  },
}
</script>

<style lang="less">
.nav {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  height: 48px;
  z-index: 10000;

  .header {
    margin-left: 20px;
    margin-right: 8px;
    font-size: 24px;
    color: #e5eecc;
    height: 100%;
    display: flex;
    align-items: center;
    float: left;
    &-icon {
      margin-right: 12px;
    }
  }
}
</style>