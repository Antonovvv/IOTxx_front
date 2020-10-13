import {
  Button,
  Menu,
  Icon,
} from 'ant-design-vue';

const components = [
  Button,
  Menu,
  Icon,
];

const install = function (Vue, option) {
  components.map(component => {
    Vue.use(component);
  });

};

export default {
  install,
};
