import {
  Button,
} from 'ant-design-vue';

const components = [
  Button,
];

const install = function (Vue, option) {
  components.map(component => {
    Vue.use(component);
  });

};

export default {
  install,
};
