<template>
  <div class="layout-wrapper">
    <div class="layout-left" :style="{ width: isCollapse ? '64px' : '200px' }">
      <el-menu
        default-active="/home"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
        router
      >
        <div class="logo-wrapper">
          <img src="@/assets/logo.png" alt="logo" />
        </div>
        <RecursiveMenu :routes="filteredRoutes" />
      </el-menu>
      <div class="collapse-btn" @click="isCollapse = !isCollapse">
        <el-icon>
          <component :is="isCollapse ? 'Expand' : 'Fold'" />
        </el-icon>
      </div>
    </div>
    <div class="layout-right">
      <div class="layout-header">
        <!-- 菜单导航 -->
        <div class="layout-header-left">
          <HeaderTabs />
        </div>
        <!-- 顶部工具 -->
        <div class="spaceBlock"></div>
        <div class="layout-header-right">
          <HeaderTools />
        </div>
      </div>
      <div class="layout-content-wrapper">
        <div class="layout-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import type { RouteRecordRaw } from "vue-router";
import RecursiveMenu from "./components/recusive-menu.vue";
import HeaderTools from "./components/header-tools.vue";
import HeaderTabs from "./components/header-tabs.vue";

const { t } = useI18n();

const router = useRouter();
const isCollapse = ref(true);
const filteredRoutes = ref<RouteRecordRaw[]>([]);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

// 初始化：过滤掉隐藏的路由(父路由就算隐藏也要显示子路由)
onMounted(() => {
  const rootRoute = router.options.routes.find((route) => route.path === "/");
  filteredRoutes.value =
    rootRoute?.children?.filter((route) => !route.meta?.hidden) || [];
});
</script>

<style scoped>
/* 设置菜单的宽度 */
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  max-height: 100vh;
  overflow-y: auto;
}

.layout-wrapper {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.layout-left {
  height: 100%;
  transition: width 0.3s;
  position: relative;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  img {
    height: 30px;
  }
}

.layout-right {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.el-menu-vertical-demo {
  width: 100%;
  height: 100%;
  min-height: auto !important;
}
.layout-header {
  width: 100%;
  height: 48px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.layout-header-left {
  flex: 1;
  min-width: 0;
  height: 100%;
  overflow: hidden;
}
.spaceBlock {
  width: 1px;
  height: 32px;
  background-color: #e5e5e5;
  margin: 0 20px;
}
.layout-header-right {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 8px;
}
.layout-content-wrapper {
  flex: 1;
  overflow: hidden;
  padding: 10px;
  display: flex;
  flex-direction: column;
}
.layout-content {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #fff;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.collapse-btn {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a0cfff;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #d4eaff;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(185, 221, 255, 0.4);
  backdrop-filter: blur(10px);
}

.collapse-btn:hover {
  background-color: #d9eafc;
  color: #fff;
  border-color: #c9e4ff;
  box-shadow: 0 4px 12px rgba(185, 221, 255, 0.4);
  transform: translateX(-50%) scale(1.1);
}
</style>
