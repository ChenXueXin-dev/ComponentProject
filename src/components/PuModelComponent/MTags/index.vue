<template>
  <div>
    <el-tag
      :class="isNoBorder ? 'no-border' : ''"
      v-if="normal.includes(Number(value))"
      :effect="effect"
      >{{ text }}</el-tag
    >
    <el-tag
      :class="isNoBorder ? 'no-border' : ''"
      v-if="success.includes(Number(value))"
      type="success"
      :effect="effect"
      >{{ text }}</el-tag
    >
    <el-tag
      :class="isNoBorder ? 'no-border' : ''"
      v-if="info.includes(Number(value))"
      type="info"
      :effect="effect"
      >{{ text }}</el-tag
    >
    <el-tag
      :class="isNoBorder ? 'no-border' : ''"
      v-if="warning.includes(Number(value))"
      type="warning"
      :effect="effect"
      >{{ text }}</el-tag
    >
    <el-tag
      :class="isNoBorder ? 'no-border' : ''"
      v-if="danger.includes(Number(value))"
      type="danger"
      :effect="effect"
      >{{ text }}</el-tag
    >
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "MTags",
});
// 蓝色（设置成default）、绿色success、灰色info、橙色warning、红色danger
const props = defineProps({
  //  dark light plain
  isNoBorder: {
    type: Boolean,
    default: false,
  },
  effect: {
    type: String,
    default: "light",
  },
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

<style scoped>
.no-border {
  background: none;
  border: none;
}

:deep(.el-tag) {
  padding: none !important;
}
</style>
