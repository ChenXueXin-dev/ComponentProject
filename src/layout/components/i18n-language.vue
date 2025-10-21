<template>
  <div>
    <el-dropdown :hide-on-click="false">
      <span class="el-dropdown-link">
        {{ locale === "zhCn" ? "简体中文" : "English" }}
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            @click="changeLanguege('zhCn')"
            :class="{ languageactive: locale === 'zhCn' }"
            >简体中文</el-dropdown-item
          >
          <el-dropdown-item
            @click="changeLanguege('en')"
            :class="{ languageactive: locale === 'en' }"
            >English</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { locale } = useI18n();

const changeLanguege = (lang: string) => {
  locale.value = lang;
  localStorage.setItem("localelanguage", lang);
  console.log("locale", locale.value);
};
</script>

<style scoped>
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

:deep(.languageactive) {
  background-color: #fff9fb;
  color: var(--el-color-primary) !important;
}
</style>
