import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue';
import Config from '../views/Config.vue';
import Record from '../views/Record.vue';

Vue.use(VueRouter);

const redirectPath = /Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent) ? '/record' : '/home';

const routes = [
  {
    path: '/',
    redirect: redirectPath,
  }, {
    path: '/home',
    name: 'Home',
    component: Home
  }, {
    path: '/config',
    name: 'Config',
    component: Config,
  }, {
    path: '/record',
    name: 'Record',
    component: Record,
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
