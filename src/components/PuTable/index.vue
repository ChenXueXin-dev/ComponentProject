<template>
  <div class="pu-table-wrapper">
    <el-table
      :data="internalData"
      v-loading="loading"
      :columns="Pucolumns"
      :stripe="stripe"
      :border="border"
      ref="eleTableRef"
      style="width: 100%"
      :height="height"
      :max-width="maxWidth"
      table-layout="auto"
      @search="handleSearch"
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
    <el-pagination
      v-if="needPage"
      class="pagination-wrapper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes || [10, 20, 30, 40, 50, 100]"
      :page-size="pageSize || 20"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
defineOptions({
  name: "PuTable",
});

const loading = ref(false);

import { useTableData } from "../../hooks/useTableData";
import { ca } from "element-plus/es/locales.mjs";
const { handlePageChange } = useTableData();

const props = defineProps({
  datasource: { type: [Array, Object, Function], default: () => [] },
  stripe: { type: Boolean, default: false },
  border: { type: Boolean, default: false },
  height: { type: String, default: "100%" },
  maxWidth: { type: String, default: "100%" },
  selection: { type: Boolean, default: false },
  columns: { type: Array, default: () => [] },
  needPage: { type: Boolean, default: true },
});

const internalData = ref([]);
const currentPage = ref(0);
const pageSize = ref(0);
const total = ref(0);

const lastParams = ref({});
const eleTableRef = ref();

watch(
  () => props.datasource,

  async (newData) => {
    loading.value = true;
    try {
      const resolvedData = await newData;
      const tableData = resolvedData?.data;
      internalData.value = resolvedData.data || [];
      currentPage.value = resolvedData.page || 1;
      pageSize.value = resolvedData.size || 10;
      total.value = resolvedData.total || 0;
    } catch {
      internalData.value = [];
    } finally {
      loading.value = false;
    }
  },
  { immediate: true }
);

const emit = defineEmits(["search"]);
// 搜索
const handleSearch = () => {
  console.log("执行搜索操作");
};

const handleSizeChange = (size) => {
  // handlePageChange(currentPage.value, size);
  // 用户更改size
};

const handleCurrentChange = (page) => {
  // handlePageChange(page, pageSize.value);
};

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

// 暴露方法给父组件使用
defineExpose({
  eleTableRef,
});
</script>

<style lang="scss" scoped>
.pu-table-wrapper {
  width: 100%;
  height: 100%;
  min-height: 77vh;
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

.pagination-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
