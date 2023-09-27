import Vue from 'vue';
//该文件将element-ui进行按需引入降低文件体积
import {
  Avatar,
  Empty,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Dialog,
  Image,
  Steps,
  Step,
  Button,
  Upload,
  Input,
  Radio,
  RadioGroup,
  RadioButton,
  Form,
  FormItem,
  Message,
  Skeleton,
  SkeletonItem
} from 'element-ui';

const element = [
  Form,
  Avatar,
  Empty,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Dialog,
  Image,
  Steps,
  Step,
  Button,
  Upload,
  Input,
  Radio,
  RadioGroup,
  RadioButton,
  FormItem,
  Skeleton,
  SkeletonItem
]

Vue.prototype.$message = Message;

export default element
