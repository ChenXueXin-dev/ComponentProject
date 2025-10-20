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
        width="55"
      />
      <template v-for="column in Pucolumns" :key="column.prop">
        <el-table-column
          :fixed="column.fixed"
          :prop="column.name"
          :label="column.label"
          :min-width="column.width"
        >
          <template v-for="(_value, key) in $slots" :key="key" #[key]="scope">
            <slot :name="key" v-bind="scope"></slot>
          </template>
          <!-- Element Plus 内部：el-table-column 会将 prop 值存储为 property -->
          <template #default="{ row, column: col, $index }">
            <slot name="bodyCell" :column="col" :row="row" :index="$index">
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
            </slot>
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

const showColColumns = computed(() => {
  return props.columns
    .filter((item) => item.showCol !== false)
    .map((item) => {
      return {
        ...item,
      };
    });
});

const Pucolumns = computed(() => {
  return showColColumns.value;
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
  padding: 10px;
  background-color: #fff;

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
