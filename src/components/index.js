import {
  Button,
  Menu,
  Icon,
  Drawer
} from 'ant-design-vue';

const components = [
  Button,
  Menu,
  Icon,
  Drawer,
];

const install = function (Vue, option) {
  components.map(component => {
    Vue.use(component);
  });

};

export default {
  install,
};
