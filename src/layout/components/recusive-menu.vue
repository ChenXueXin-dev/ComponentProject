<!-- 自动适配多级路由 -->
<template>
  <template v-for="route in routes" :key="route.path">
    <!-- 过滤掉隐藏的路由 -->
    <template v-if="!route.meta?.hidden">
      <!-- 有子路由且不隐藏  el-sub-menu 子路由在el-menu-item-group里面-->
      <el-sub-menu
        v-if="hasVisibleChildren(route)"
        :index="getRouteIndex(route)"
      >
        <template #title>
          <el-icon v-if="route.meta?.icon">
            <component :is="route.meta.icon"></component>
          </el-icon>
          <span>{{ route.meta.title }}</span>
        </template>
        <!-- 递归渲染子路由 -->
        <RecursiveMenu
          :routes="route.children || []"
          :base-path="getFullPath(route)"
        ></RecursiveMenu>
      </el-sub-menu>
      <!-- 无子路由 el-menu-item显示 -->
      <el-menu-item
        v-else
        :index="getRouteIndex(route)"
        @click="handleMenuClick(route)"
      >
        <el-icon v-if="route.meta?.icon">
          <component :is="route.meta.icon" />
        </el-icon>
        <span>{{ route.meta.title }}</span>
      </el-menu-item>
    </template>
  </template>
</template>

<script setup lang="ts">
import { RouteRecordRaw } from "vue-router";
import { useRouter } from "vue-router";
import RecursiveMenu from "./recusive-menu.vue";

const props = defineProps<{
  routes: RouteRecordRaw[];
  basePath?: string;
}>();
const router = useRouter();

// 工具函数：生成唯一的index（用路由路径拼接，确保全局唯一）
const getRouteIndex = (route: RouteRecordRaw) => {
  const base = props.basePath || ""; // 兜底空字符串
  return base ? `${base}-${route.path}` : route.path || ""; // 防止route.path为空
};
// 工具函数：生成完整路径（用于递归传递给子组件）
const getFullPath = (route: RouteRecordRaw) => {
  return props.basePath ? `${props.basePath}-${route.path}` : route.path;
};
// 确认该函数能正确判断是否有可见子路由
const hasVisibleChildren = (route: RouteRecordRaw) => {
  return (
    route.children?.some((child) => {
      // 子路由存在且不隐藏
      return child && !child.meta?.hidden;
    }) ?? false
  );
};
// 菜单点击事件：跳转到对应路由
const handleMenuClick = (route: RouteRecordRaw) => {
  router.push({ path: route.path });
};
</script>

<style lang="scss" scoped></style>
