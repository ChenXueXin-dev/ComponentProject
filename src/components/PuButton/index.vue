<!-- src/components/MyButton/MyButton.vue -->
<template>
  <el-button :type="type" :size="size">
    <slot></slot>
    <!-- 插槽接收按钮文本 -->
  </el-button>
</template>

<script lang="ts" setup>
defineOptions({
  name: "PuButton",
});
import { defineProps } from "vue";
// 定义组件 props
const props = defineProps({
  type: {
    type: String,
    default: "primary", // 默认按钮类型
  },
  size: {
    type: String,
    default: "medium", // 默认按钮尺寸
  },
});
</script>
