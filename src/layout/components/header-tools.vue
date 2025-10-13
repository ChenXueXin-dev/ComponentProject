<template>
  <div class="tools-wrapper">
    <I18nLanguage></I18nLanguage>
    <div class="separator"></div>
    <div class="user-wrapper">
      <el-avatar :src="avatarSrc" />
      <div>
        <el-dropdown :hide-on-click="false">
          <span class="el-dropdown-link">
            <el-icon color="#999" size="18"><ArrowDown /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <el-icon color="#999" size="18"><User /></el-icon>
                {{ t("base.user.personalCenter") }}</el-dropdown-item
              >
              <el-dropdown-item>
                <el-icon color="#999" size="18"><Lock /></el-icon>
                {{ t("base.user.changePassword") }}</el-dropdown-item
              >
              <el-dropdown-item>
                <el-icon color="#999" size="18"><DArrowLeft /></el-icon>
                {{ t("base.user.logout") }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import avatarImage from "@/assets/avatar.png";
import I18nLanguage from "./i18n-language.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const avatarSrc = ref(avatarImage);
</script>

<style scoped>
.tools-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
.separator {
  width: 1px;
  height: 16px;
  background-color: grey;
  margin: 0 20px;
}
.user-wrapper {
  display: flex;
  align-items: center;
  padding: 0 10px 0 0;
  gap: 10px;
}
/* 下拉框的边框样式 */
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary) !important;
  display: flex;
  align-items: center;
}
.el-dropdown-link:focus-visible {
  outline: none !important;
}

.el-dropdown-link:focus {
  outline: none !important;
}

:deep(.el-dropdown:focus-visible) {
  outline: none !important;
}
</style>
