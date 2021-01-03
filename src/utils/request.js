import axios from 'axios';
import { baseAPIUrl } from './config';

const ax = axios.create({
  baseURL: baseAPIUrl,
});

export default {
  install(Vue, options) {
    Vue.prototype.$axios = ax;
  }
}