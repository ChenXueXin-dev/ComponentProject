<template>
  <div class="page-wrapper">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane v-for="item in tabsList" :key="item.value">
        <template #label>
          {{ item.label }}
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: "PuTabs",
});
interface TabItem {
  label: string;
  value: string;
}

const props = defineProps({
  tabsList: {
    type: Array as () => TabItem[],
    default: () => [],
  },
});
import { ref } from "vue";

import type { TabsPaneContext } from "element-plus";

const activeName = ref("first");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>

<style lang="scss" scoped>
.page-wrapper {
  background-color: #fff;
  padding: 0 10px;
}
.demo-tabs {
  height: 40px;
  // 使用 CSS 变量便于主题统一
  :deep(.el-tabs__nav-wrap::after) {
    background-color: #f5f5f5 !important;
    height: 1px !important;
  }
}
</style>
