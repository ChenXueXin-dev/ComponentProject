<!-- 自动适配多级路由 -->
<template>
  <template v-for="routeItem in routes" :key="routeItem.path">
    <!-- 过滤掉隐藏的路由 -->
    <template v-if="!routeItem.meta?.hidden">
      <!-- 有子路由且不隐藏  el-sub-menu 子路由在el-menu-item-group里面-->
      <el-sub-menu
        v-if="hasVisibleChildren(routeItem)"
        :index="getRouteIndex(routeItem)"
      >
        <template #title>
          <el-icon v-if="routeItem.meta?.icon">
            <component :is="routeItem.meta.icon"></component>
          </el-icon>
          <span>{{ t((routeItem?.meta?.titleKey as string) || "") }}</span>
        </template>
        <!-- 递归渲染子路由 -->
        <RecursiveMenu
          :routes="routeItem.children || []"
          :base-path="getFullPath(routeItem)"
        ></RecursiveMenu>
      </el-sub-menu>
      <!-- 无子路由 el-menu-item显示 -->
      <el-menu-item
        v-else
        :index="getRouteIndex(routeItem)"
        @click="handleMenuClick(routeItem)"
      >
        <el-icon v-if="routeItem.meta?.icon">
          <component :is="routeItem.meta.icon" />
        </el-icon>
        <span>{{ t((routeItem?.meta?.titleKey as string) || "") }}</span>
      </el-menu-item>
    </template>
  </template>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from "vue-router";
import { useRouter } from "vue-router";
import RecursiveMenu from "./recusive-menu.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const props = defineProps<{
  routes: RouteRecordRaw[];
  basePath?: string;
}>();
const router = useRouter();
const emit = defineEmits(["menuClick"]);

// 工具函数：生成唯一的index（用路由路径拼接，确保全局唯一）
const getRouteIndex = (routeItem: RouteRecordRaw) => {
  const base = props.basePath || ""; // 兜底空字符串
  return base ? `${base}-${routeItem.path}` : routeItem.path || ""; // 防止route.path为空
};
// 工具函数：生成完整路径（用于递归传递给子组件）
const getFullPath = (routeItem: RouteRecordRaw) => {
  return props.basePath
    ? `${props.basePath}-${routeItem.path}`
    : routeItem.path;
};
// 确认该函数能正确判断是否有可见子路由
const hasVisibleChildren = (routeItem: RouteRecordRaw) => {
  return (
    routeItem.children?.some((child) => {
      // 子路由存在且不隐藏
      return child && !child.meta?.hidden;
    }) ?? false
  );
};
// 菜单点击事件：跳转到对应路由
const handleMenuClick = (routeItem: RouteRecordRaw) => {
  router.push({ path: routeItem.path });
  emit("menuClick", routeItem.path);
};
</script>

<style lang="scss" scoped></style>
