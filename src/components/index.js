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
  Descriptions
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
  Descriptions,
];

const install = function (Vue, option) {
  components.map(component => {
    Vue.use(component);
  });

};

export default {
  install,
};
