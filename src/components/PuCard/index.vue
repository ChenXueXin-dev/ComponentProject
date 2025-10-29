<template>
  <div>
    <el-card class="card-wrapper" shadow="never">
      <div class="toptitle" v-if="title">
        <div class="titleLine"></div>
        <span>{{ title }}</span>
      </div>
      <div>
        <slot></slot>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "PuCard",
});

const props = defineProps({
  title: { type: String, default: "" },
});
</script>

<style scoped>
.card-wrapper {
  width: 100%;
  margin: 10px 0;
}
:deep(.el-card__header) {
  padding: 15px !important;
  border-bottom: none !important;
}

:deep(.el-card__body) {
  padding: 15px !important; /* 去除主体内边距 */
}

.toptitle {
  display: flex;
  font-size: 16px;
  font-weight: 800 !important;
  height: 28px;
  align-items: center;
  gap: 10px;
  padding: 0 0 10px 0;
}

.titleLine {
  height: 20px;
  width: 3px;
  border-radius: 10px;
  background: #439fff;
}
</style>
