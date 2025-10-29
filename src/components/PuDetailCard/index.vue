<template>
  <div>
    <el-card class="card-wrapper" shadow="never">
      <!-- <template #header>
        <div>header</div>
      </template>
      <template #extra>
        <div>extra</div>
      </template>
      <template #footer>
        <div>footer</div>
      </template> -->
      <div class="toptitle" v-if="title">
        <div class="titleLine"></div>
        <span>
          {{ title }}
        </span>
      </div>
      <div class="columnContent">
        <el-row
          class="columnrowitem"
          v-for="(column, rowIndex) in detailColumns"
          :key="rowIndex"
        >
          <el-col
            v-for="(item, colindex) in column.columns"
            :span="item.span || 6"
            :key="colindex"
          >
            <slot
              name="bodyCell"
              :row="datasource"
              :column="item"
              :index="colindex"
            >
              {{ item.label }}：
              <span v-if="item.customRender">
                {{ item.customRender(data, item) }}
              </span>
              <span v-else>{{ data[item.value] }}</span>
            </slot>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

defineOptions({
  name: "PuDetailCard",
});

const props = defineProps({
  title: { type: String, default: "" },
  columns: { type: Array, default: () => [] },
  data: { type: Object, default: () => ({}) },
});

const jsonStringify = (col, row) => {};

const detailColumns = computed(() => {
  return props.columns;
});

const datasource = computed(() => {
  return props.data;
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

.columnContent {
  font-size: 12px;
}

.columnrowitem {
  padding: 8px 0;
}
</style>
