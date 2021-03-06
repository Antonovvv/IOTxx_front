import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import components from './components';
import request from './utils/request';

Vue.config.productionTip = false;

Vue.use(components);
Vue.use(request);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
