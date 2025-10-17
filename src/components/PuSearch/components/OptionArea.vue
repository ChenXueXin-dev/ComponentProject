<template>
  <div id="app">
    <el-cascader
      size="large"
      :options="pcaTextArr"
      v-model="selectedOptions"
      @update:model-value="handleChange"
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

const props = defineProps({
  AreaValue: {
    type: Object,
    default: {},
  },
});
import {
  // provinceAndCityData,
  // pcTextArr,
  // regionData,
  pcaTextArr,
  // codeToText,
} from "element-china-area-data";
import { ref, watch } from "vue";

const emit = defineEmits(["update:selectedOptions"]);

const selectedOptions = ref();
const handleChange = () => {
  emit("update:selectedOptions", selectedOptions.value);
};

// 监听，当选中的时候更新数据要更新数据
watch(
  () => props.AreaValue,
  (newVal) => {
    selectedOptions.value = newVal;
  }
);
</script>

<style scoped></style>
