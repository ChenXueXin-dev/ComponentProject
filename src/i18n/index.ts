// 国际化配置
import { createI18n } from "vue-i18n";
import zhLocale from "./locales/zh-CN";
import enLocale from "./locales/en";

// VXETable国际化
import zhCn from "vxe-table/lib/locale/lang/zh-CN";
import en from "vxe-table/lib/locale/lang/en-US";

import elementZhCn from "element-plus/dist/locale/zh-cn.mjs";
import elementEn from "element-plus/dist/locale/en.mjs";

export const elementLocales = {
  zhCn: elementZhCn,
  en: elementEn,
};

const messages = {
  zhCn: { ...zhLocale, ...zhCn },
  en: { ...enLocale, ...en },
};

export const defaultLocale = localStorage.getItem("localelanguage") || "zhCn";
// 语言配置
const localesLanguage = createI18n({
  messages,
  locale: defaultLocale,
  fallbackLocale: "zhCn",
  legacy: false,
  globalInjection: true, //全局注册$t函数
});

export default localesLanguage;
