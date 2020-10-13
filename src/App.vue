<template>
  <div id="app">
    <Nav />
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/ground">Ground</router-link>
    </div> -->
    <router-view id="container"/>
  </div>
</template>

<script>
import Nav from './components/Navigator';

export default {
  components: {
    Nav,
  }  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#container {

}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
