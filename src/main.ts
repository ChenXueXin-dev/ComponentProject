import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import registerGlobalComponents from "./components/index";
import { AllIcons } from "./static/icons";
import { pinia } from "./store";
import i18n from "./i18n";
import VXETable from "vxe-table";
import "vxe-table/lib/style.css";
import Antd from 'ant-design-vue';

const app = createApp(App);

// 配置VXETable的国际化，绑定项目的vue-i18n实例
app.config.globalProperties.$t = i18n.global.t;
VXETable.setup({
  i18n: (key: string, args?: any) => i18n.global.t(key, args),
});

// 全局注册所有图标
Object.entries(AllIcons).forEach(([iconName, IconComponent]) => {
  app.component(iconName, IconComponent);
});

app
  .use(pinia)
  .use(i18n)
  .use(router)
  .use(VXETable)
  .use(Antd)
  .use(registerGlobalComponents)
  .use(pinia)
  .use(ElementPlus)
  .mount("#app");
