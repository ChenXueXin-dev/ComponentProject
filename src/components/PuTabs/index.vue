<template>
  <div class="page-wrapper">
    <el-tabs
      :type="type || ''"
      :model-value="activeTabsValue"
      :class="type === '' ? 'demo-tabs' : 'card-tabs'"
      @update:model-value="$emit('update:activeTabs', $event)"
      @handleClick="handleClick"
    >
      <el-tab-pane
        v-for="item in tabsList"
        :key="item.value"
        :name="item.value"
        :label="item.label"
      >
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
  activeTabsValue: {
    type: String,
  },
  type: {
    type: String,
    default: "",
  },
});

const emit = defineEmits<{
  (e: "update:activeTabs", value: string): void;
}>();

const handleClick = (tab: any) => {
  emit("update:activeTabs", tab);
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
  :deep(.el-tab-pane) {
    font-size: 18px;
  }

  // 或者更精确地针对标签标题
  :deep(.el-tabs__item) {
    font-size: 18px;
  }
}

.card-tabs {
  margin: 10px 0;
  height: 40px;
  // 使用 CSS 变量便于主题统一
  :deep(.el-tabs__nav-wrap::after) {
    background-color: #f5f5f5 !important;
    height: 1px !important;
  }
  :deep(.el-tab-pane) {
    font-size: 16px;
  }

  // 或者更精确地针对标签标题
  :deep(.el-tabs__item) {
    font-size: 16px;
  }
}
</style>
