<template>
  <div class="tabs-wrapper">
    <el-button size="large" type="text" @click="handleToHome">首页</el-button>
    <div class="spaceBlock"></div>
    <el-scrollbar>
      <div class="scrollbar-flex-content">
        <el-tag
          class="tag-item"
          v-for="tag in tags"
          :key="tag.name"
          size="default"
          :closable="tag.path !== route.fullPath"
          :effect="tag.path === route.fullPath ? 'dark' : 'plain'"
          round
          @close="handleClose(tag.path)"
          @click="handleClick(tag.path)"
        >
          {{ tag.name }}
        </el-tag>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

// 定义标签的数据解构
interface Tag {
  path: string;
  name: string;
}
const tags = ref<Tag[]>([]);

const router = useRouter();
const handleToHome = () => {
  router.push("/home");
};
const route = useRoute();
// 初始化的时候标签从本地获取
const initTags = () => {
  tags.value = localStorage.getItem("tags")
    ? JSON.parse(localStorage.getItem("tags") || "[]")
    : [];
};

// 保存标签到本地
const saveTabsToStorage = () => {
  localStorage.setItem("tags", JSON.stringify(tags.value));
};
// 添加标签
const addTags = (path: string) => {
  // 重定向路径
  if (path === "/home" || path === "/redirect") {
    return;
  }
  // 判断是否已经在tags中
  if (tags.value.some((tag) => tag.path === path)) {
    return;
  }
  tags.value.push({
    path: path,
    name: route.meta.title || "",
  });
  saveTabsToStorage();
};

const handleClick = (path: string) => {
  // 判断点击是是不是当前路径
  if (path === route.fullPath) {
    return;
  }
  router.push(path);
};

// 删除标签的时候删除标签并且保存本地
const handleClose = (path: string) => {
  tags.value = tags.value.filter((tag) => tag.path !== path);
  saveTabsToStorage();
};

watch(
  () => route.fullPath,
  () => {
    addTags(route.fullPath);
  },
  { immediate: true }
);

onMounted(() => {
  initTags();
  console.log("route", route.fullPath);
  addTags(route.fullPath);
});
</script>

<style scoped>
.tabs-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
}
.scrollbar-flex-content {
  margin-top: 5px;
  height: 40px;
  align-items: center;
  display: flex;
  width: 100%;
}
.tag-item {
  margin: 0 10px;
}

.spaceBlock {
  width: 1px;
  height: 35px;
  background-color: rgba(37, 37, 37, 0.1);
}
</style>
