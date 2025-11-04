<template>
  <div>
    <el-tag v-if="normal.includes(Number(value))">{{ text }}</el-tag>
    <el-tag v-if="success.includes(Number(value))" type="success">{{
      text
    }}</el-tag>
    <el-tag v-if="info.includes(Number(value))" type="info">{{ text }}</el-tag>
    <el-tag v-if="warning.includes(Number(value))" type="warning">{{
      text
    }}</el-tag>
    <el-tag v-if="danger.includes(Number(value))" type="danger">{{
      text
    }}</el-tag>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "MTags",
});
// 蓝色（设置成default）、绿色success、灰色info、橙色warning、红色danger
const props = defineProps({
  value: {
    type: String || Number,
    default: "",
  },
  text: {
    type: String || Number,
    default: "",
  },
  normal: {
    type: Array,
    default: () => [],
  },
  success: {
    type: Array,
    default: () => [],
  },
  info: {
    type: Array,
    default: () => [],
  },
  warning: {
    type: Array,
    default: () => [],
  },
  danger: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped></style>
