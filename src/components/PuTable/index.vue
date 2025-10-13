<template>
  <div class="pu-table-wrapper">
    <el-table
      :data="datasource"
      :columns="Pucolumns"
      :stripe="stripe"
      :border="border"
      style="width: 100%"
      :height="height"
      :max-width="maxWidth"
      table-layout="auto"
    >
      <el-table-column
        v-if="selection"
        type="selection"
        :selectable="selectable"
        min-width="55"
      />
      <template #headerCell="{ title, column }">
        <div>wqewq</div>
      </template>
      <template v-for="column in Pucolumns" :key="column.prop">
        <el-table-column
          :fixed="column.fixed"
          :prop="column.name"
          :label="column.label"
          :width="column.width"
        >
          <template #default="{ row, column: col, $index }">
            <div v-if="column.customRender">
              <component
                :is="column.customRender"
                :row="row"
                :column="col"
                :index="$index"
              />
            </div>
            <div v-else>
              {{ row[column.name] !== undefined ? row[column.name] : "--" }}
            </div>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script setup>
import { computed } from "vue";
defineOptions({
  name: "PuTable",
});

const props = defineProps({
  datasource: {
    type: Array,
    default: () => [],
  },
  stripe: {
    type: Boolean,
    default: false,
  },
  border: {
    type: Boolean,
    default: false,
  },
  height: {
    type: String,
    default: "100%",
  },
  maxWidth: {
    type: String,
    default: "100%",
  },
  selection: {
    type: Boolean,
    default: false,
  },
  columns: {
    type: Array,
    default: () => [],
  },
});

const Pucolumns = computed(() => {
  return props.columns.map((item) => {
    return {
      ...item,
    };
  });
});

defineExpose({});
</script>

<style lang="scss" scoped>
.pu-table-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  :deep(.el-table) {
    width: 100% !important;
    height: 100% !important;
    display: flex;
    flex-direction: column;
  }

  :deep(.el-table__header-wrapper) {
    flex-shrink: 0;
  }

  :deep(.el-table__body-wrapper) {
    flex: 1;
    overflow: auto;
  }
}
</style>
