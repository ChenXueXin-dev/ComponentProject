<template>
  <div id="app">
    <el-cascader
      clearable
      :style="{ width: width }"
      :value-on-clear="''"
      :options="regionData"
      :placeholder="placeholder || t('pu.pusearch.placeholder.area')"
      :model-value="areaValue"
      @update:model-value="handleUpdate"
    >
    </el-cascader>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "OptionArea",
});
// provinceAndCityData：省市二级联动数据,汉字+code
// regionData：省市区三级联动数据，纯区域码
// pcTextArr：省市联动数据，纯汉字
// pcaTextArr：省市区联动数据，纯汉字
// codeToText：是个大对象，属性是区域码，属性值是汉字 用法例如：codeToText['110000']输出北京市

import { useI18n } from "vue-i18n";
const { t } = useI18n();

const props = defineProps({
  areaValue: {
    type: Object,
    default: {},
  },
  placeholder: {
    type: String,
  },
  width: {
    type: String,
  },
});
import {
  // provinceAndCityData,
  // pcTextArr,
  regionData,
  // pcaTextArr,
  // codeToText,
} from "element-china-area-data";

const emit = defineEmits<{
  (e: "update:areaValue", value: any): void; //类型定义
}>();
const handleUpdate = (value: any) => {
  emit("update:areaValue", [...value]);
};
</script>

<style scoped></style>
