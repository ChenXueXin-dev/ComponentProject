<template>
  <el-button type="primary" style="margin-left: 16px" @click="handleOpen">
    open
  </el-button>

  <el-drawer
    v-model="drawer"
    :title="title"
    :direction="direction"
    :before-close="handleClose"
  >
    <span>Hi, there!</span>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, watch, defineProps, defineEmits, withDefaults } from "vue";

// 1. 修正 props 定义（TypeScript 语法 + 默认值）
const props = withDefaults(
  defineProps<{
    title?: string; // 可选属性，类型 string
    direction?: string; // 可选属性，类型 string
    drawVisible?: boolean; // 父组件传入的显示状态
  }>(),
  {
    title: "提示", // 默认标题
    direction: "rtl", // 默认方向
    drawVisible: false, // 默认隐藏
  }
);

// 2. 子组件内部维护抽屉状态（初始值同步 props.drawVisible）
const drawer = ref(props.drawVisible);

// 3. 监听父组件 drawVisible 变化，同步到子组件内部状态
watch(
  () => props.drawVisible,
  (newVal) => {
    drawer.value = newVal; // 父组件修改时，子组件同步更新
  }
);

// 4. 定义事件：通知父组件更新状态（双向绑定）
const emit = defineEmits(["update:drawVisible"]);

// 点击按钮打开抽屉
const handleOpen = () => {
  drawer.value = true;
  emit("update:drawVisible", true); // 通知父组件：已打开
};

// 抽屉关闭前的回调（点击关闭按钮/ESC时）
const handleClose = (done: () => void) => {
  drawer.value = false;
  emit("update:drawVisible", false); // 通知父组件：已关闭
  done(); // 执行关闭动画
};
</script>
