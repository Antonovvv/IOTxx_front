<template>
  <div class="nav">
    <a-menu mode="horizontal" @select="onNavSelect">
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

    }
  },
  methods: {
    onNavSelect({ item, key, selectedKeys }) {
      if (key === 'home') {
        this.$router.push({ path: '/' });
      } else {
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
}
</style>