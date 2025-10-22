<template>
  <div class="pu-table-wrapper">
    <el-table
      :data="internalData"
      :columns="Pucolumns"
      :stripe="stripe"
      :border="border"
      ref="eleTableRef"
      style="width: 100%"
      :min-height="height"
      :max-width="maxWidth"
      table-layout="auto"
      @search="handleSearch"
    >
      <template #empty>
        <div v-if="loading" class="table-empty">
          <el-icon size="30" color="#a0cfff"><Loading /></el-icon>
        </div>
        <div v-else class="table-empty">暂无数据</div>
      </template>
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
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script setup>
defineOptions({
  name: "PuTable",
});

import { computed, ref, watch } from "vue";
import { useTableData } from "@/hooks/useTableData";
import { useUserStore } from "@/store/modules/user";
import { use } from "vxe-table";

const userStore = useUserStore();
const loading = ref(true);
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

// 清除数据
const cleardata = () => {
  loading.value = true;
  internalData.value = null;
  currentPage.value = 1;
  pageSize.value = userStore.tablePageSize;
  total.value = 0;
};

// 获取数据
const getTableData = async (response) => {
  cleardata();
  loading.value = true;
  try {
    console.log("getTableData");
    const newData = response;
    const resolvedData = await newData;
    console.log("resolvedData", resolvedData);
    const tableData = resolvedData?.data;
    internalData.value = resolvedData.data || null;
    currentPage.value = resolvedData.page || 1;
    pageSize.value = resolvedData.size || 10;
    total.value = resolvedData.total || 0;
  } catch (error) {
    console.warn("获取数据失败：", error);
  } finally {
    loading.value = false;
  }
};

const emit = defineEmits(["search"]);
const handleSearch = () => {
  emit("search");
};

const handleSizeChange = async (size) => {
  if (size === userStore.tablePageSize) {
    return;
  }
  userStore.tablePageSize = size || 20;
  userStore.setUserHabit("tablePageSize", "表格每页数量", size);
  console.log("切换每页数量", size);
  emit("search");
};

const handleCurrentChange = async (page) => {
  emit("search");
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

// 暴露方法
defineExpose({
  cleardata,
  getTableData,
});
</script>

<style lang="scss" scoped>
.pu-table-wrapper {
  width: 100%;
  height: calc(100vh - 120px);
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

.table-empty {
  display: flex;
  height: calc(100vh - 350px);
  align-items: center;
  justify-content: center;
}

.table-empty .el-icon {
  animation: rotate 1s linear infinite;
  transform-origin: center center;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
