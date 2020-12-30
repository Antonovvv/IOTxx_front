import {
  Button,
  Menu,
  Icon,
  Drawer,
  List,
  Form,
} from 'ant-design-vue';

const components = [
  Button,
  Menu,
  Icon,
  Drawer,
  List,
  Form,
];

const install = function (Vue, option) {
  components.map(component => {
    Vue.use(component);
  });

};

export default {
  install,
};
