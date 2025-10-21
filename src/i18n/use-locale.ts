//  内置组件翻译配置
import { useI18n, type Locale } from "vue-i18n";

// elementplus
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import en from "element-plus/dist/locale/en.mjs";

// ant-design-vue
import antZh_CN from 'ant-design-vue/es/locale/zh_CN'
import antEn from 'ant-design-vue/es/locale/en_US'
import { ref, watch } from "vue";
import type { EleLocale } from "ele-admin-pro";

const eleLocales = { zhCn, en } as any
const antLocales = { zhCn: antZh_CN, en: antEn } as any

//监听语言变化的=>组件的语言变化 
 
export const useLocale = () => { 
    const { locale } = useI18n()
    
  const eleLocale = ref<EleLocale>()
    const antLocale = ref<Locale>()
    // 当locale变化时，改变elementplus的语言包
    watch(
        locale,
        () => {
         //给局部对象赋值 
            eleLocale.value = eleLocales[locale.value]
            antLocale.value = antLocales[locale.value]
        },
        { immediate: true }
    )
    // 赋值 zhCn/en 这里赋值的是一整个语言包
    return { eleLocale, antLocale }
}
