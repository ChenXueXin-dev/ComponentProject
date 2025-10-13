// 国际化配置
import { createI18n } from "vue-i18n";
import zhLocale from "./locales/zh-CN";
import enLocale from "./locales/en";

// VXETable国际化
import zhCN from "vxe-table/lib/locale/lang/zh-CN";
import en from "vxe-table/lib/locale/lang/en-US";

const messages = {
  zh_CN: { ...zhLocale, ...zhCN },
  en: { ...enLocale, ...en },
};

console.log("messages", messages);

const defaultLocale = localStorage.getItem("localelanguage") || "zh_CN";

// 语言配置
const localesLanguage = createI18n({
  messages,
  locale: defaultLocale,
  fallbackLocale: "zh_CN",
  legacy: false,
  globalInjection: true, //全局注册$t函数
});

export default localesLanguage;
