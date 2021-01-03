import {
  Button,
  Menu,
  Icon,
  Drawer,
  List,
  Form,
  FormModel,
  Input,
  Select,
  Modal,
} from 'ant-design-vue';

const components = [
  Button,
  Menu,
  Icon,
  Drawer,
  List,
  Form,
  FormModel,
  Input,
  Select,
  Modal,
];

const install = function (Vue, option) {
  components.map(component => {
    Vue.use(component);
  });

};

export default {
  install,
};
