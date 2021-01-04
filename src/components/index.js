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
  Descriptions,
  Table,
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
  Table,
];

const install = function (Vue, option) {
  components.map(component => {
    Vue.use(component);
  });

};

export default {
  install,
};
