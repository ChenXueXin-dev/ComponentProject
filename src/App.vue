<template>
  <a-config-provider :locale="antLocale">
    <el-config-provider :locale="eleLocale">
      <router-view />
    </el-config-provider>
  </a-config-provider>
</template>
<script setup lang="ts">
import { ref, provide, nextTick } from "vue";
// 直接引入 组件内置 语言包
import { useLocale } from "@/i18n/use-locale";
const { antLocale, eleLocale } = useLocale();

// 刷新页面
const isRouterActive = ref(true);
provide("reload", () => {
  isRouterActive.value = false;
  nextTick(() => {
    isRouterActive.value = true;
  });
});
</script>

<style>
/*  这里不加scope ，全局样式会作用在 App 根容器内*/
/* App 全局样式 - 去除默认边距 + 统一盒模型 */
* {
  margin: 0;
  padding: 0;
  /* 关键：盒模型重置，width/height 包含 padding 和 border，避免边距计算错乱 */
  box-sizing: border-box;
  font-weight: normal !important;
}

/* 单独强化 body 样式（App 根容器常用） */
body {
  margin: 0;
  padding: 0;
  /* 避免 body 自带滚动条（如需滚动，在具体容器内控制） */
  overflow-x: hidden;
  /* 基础字体/背景（可根据 App 设计调整） */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background-color: #f5f5f5; /* 常见 App 背景色，可删 */
}

/* 清除列表默认样式（如 ul/ol 自带的缩进和点） */
ul,
ol,
li {
  list-style: none; /* 去掉列表前的点/数字 */
  margin: 0;
  padding: 0;
}

/* 清除表单元素默认边距（如 input/button/select） */
input,
button,
select,
textarea {
  margin: 0;
  padding: 0;
  /* 清除 input 自带边框（如需自定义边框，后续单独加） */
  border: none;
  outline: none; /* 清除点击输入框的默认高亮边框 */
  background: transparent; /* 清除默认背景，方便自定义 */
}

/* 清除图片默认边距和对齐问题 */
img {
  margin: 0;
  padding: 0;
  /* 图片自适应容器，避免溢出 */
  max-width: 100%;
  height: auto;
  /* 解决图片与文字垂直对齐偏差 */
  vertical-align: middle;
}

/* 清除块级元素默认边距（如 p/div/h 标签） */
p,
h1,
h2,
h3,
h4,
h5,
h6,
div {
  margin: 0;
  padding: 0;
}
</style>
