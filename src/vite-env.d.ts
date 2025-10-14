/// <reference types="vite/client" />

// 声明模块：模块的全局变量
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
