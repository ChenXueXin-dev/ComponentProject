<template>
  <div class="pu-table-wrapper" :style="{ height: height }">
    <el-table
      v-bind="$attrs"
      :data="internalData"
      :stripe="stripe"
      :border="border"
      ref="eleTableRef"
      style="width: 100%"
      :max-width="maxWidth"
      :show-summary="showSummary"
      :summary-method="getSummaries"
      table-layout="auto"
      @search="handleSearch"
    >
      <template #empty>
        <div
          v-if="loading"
          class="table-empty"
          :style="{ height: `${height - '100px'}` || 'calc(100vh - 350px)' }"
        >
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
          <template #header>
            <div style="height: 20px; line-height: 20px">
              {{ column.label }}
            </div>
            <div style="height: 40px; line-height: 40px" v-if="headSearchSlot">
              <div v-if="column.searchSlot?.trim().length">
                <div v-if="column.searchSlot == 'input'">
                  <el-input
                    :style="{ width: column.inputWidth || '180px' }"
                    :placeholder="
                      column.placeholder || t('pu.pusearch.placeholder.input')
                    "
                  />
                </div>
                <div v-if="column.searchSlot == 'inputTrim'">
                  <el-input
                    :style="{ width: column.inputWidth || '180px' }"
                    :placeholder="
                      column.placeholder || t('pu.pusearch.placeholder.input')
                    "
                  />
                </div>
                <div v-if="column.searchSlot == 'select'">
                  <el-select
                    clearable
                    :style="{ width: column.width || '220px' }"
                    :placeholder="
                      column.placeholder || t('pu.pusearch.placeholder.select')
                    "
                  >
                    <el-option
                      v-for="i in column.SelectOptions"
                      :key="i.value"
                      :label="i.label"
                      :value="i.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div v-if="column.searchSlot == 'time'">
                  <el-time-select
                    :style="{ width: column.width || '220px' }"
                    :picker-options="{
                      start: '08:30',
                      step: '00:15',
                      end: '18:30',
                    }"
                    :placeholder="
                      column.placeholder || t('pu.pusearch.placeholder.time')
                    "
                  >
                  </el-time-select>
                </div>
                <div v-if="column.searchSlot == 'timeFrame'">
                  <el-date-picker
                    :style="{ width: column.width || '220px' }"
                    align="right"
                    type="date"
                    :value-format="column.format || 'YYYY-MM-DD'"
                    :placeholder="
                      column.placeholder || t('pu.pusearch.placeholder.date')
                    "
                    :picker-options="optionPickerValue"
                  >
                  </el-date-picker>
                </div>
                <div v-if="column.searchSlot == 'area'">
                  <OptionArea
                    :style="{ width: column.width || '220px' }"
                    @update:area-value="handleSelectArea($event, column)"
                  />
                </div>
              </div>
              <div v-else></div>
            </div>
          </template>

          <template #summary>
            <span style="font-weight: bold">合计</span>
          </template>
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
      :page-size="useUserStore().tablePageSize || pageSize"
      layout="total,  prev, pager, next, sizes,jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script setup>
defineOptions({
  name: "PuTable",
});
import { computed, onMounted, ref, watch } from "vue";
import { useTableData } from "@/hooks/useTableData";
import { useUserStore } from "@/store/modules/user";
import OptionArea from "./components/OptionArea.vue";

import { useI18n } from "vue-i18n";
const { t } = useI18n();

const loading = ref(true);
const props = defineProps({
  datasource: { type: [Array, Function], default: () => [] },
  stripe: { type: Boolean, default: false },
  border: { type: Boolean, default: false },
  height: { type: String, default: "calc(100vh - 248px)" },
  maxWidth: { type: String, default: "100%" },
  selection: { type: Boolean, default: false },
  columns: { type: Array, default: () => [] },
  needPage: { type: Boolean, default: true },
  pageSizes: { type: Array, default: () => [10, 20, 30, 40, 50, 100] },
  pageSize: { type: Number },
  showSummary: { type: Boolean, default: false },
  headSearchSlot: { type: Boolean, default: false },
});

// 判断接收的datasource是函数还是数组（数组直接展示、函数则请求数据）
const isFunction = typeof props.datasource === "function";

const tableData = ref([]);

const handleSelectArea = (e, item) => {
  formModel.value[item.regionProvinceCode] = e[0];
  formModel.value[item.regionCityCode] = e[1];
  formModel.value[item.regionCountyCode] = e[2];
};

const internalData = computed(() =>
  isFunction ? tableData.value : props.datasource
);
const currentPage = ref(1);
const total = ref(0);

const lastParams = ref({});
const eleTableRef = ref();

// 清除数据
const cleardata = () => {
  console.log("清空数据");
  loading.value = true;
  tableData.value = [];
};
// 获取数据
const getTableData = async (response) => {
  loading.value = true;
  try {
    const newData = response;
    const resolvedData = await newData;
    tableData.value = resolvedData.data || null;
    currentPage.value = resolvedData.page;
    total.value = resolvedData.total || 0;
  } catch (error) {
    console.warn("获取数据失败：", error);
  } finally {
    loading.value = false;
  }
};

const emit = defineEmits(["search"]);
const handleSearch = () => {
  cleardata();
  emit("search");
};

// 表格汇总(直接返回自定义的数据)
const getSummaries = (param) => {
  const { columns, data } = param;
  const sums = [];
  columns.forEach((column, index) => {
    // 找到跟字段名匹配的列
    // column 封装columns 中的列信息
    const targetColumn = props.columns.find(
      (col) => col.name === column.property
    );
    // 直接使用自定义的渲染方法
    if (targetColumn?.summaryRender) {
      sums[index] = targetColumn.summaryRender({ data, column: targetColumn });
      return;
    }
    if (index === 0) {
      sums[index] = t("pu.putable.sum");
      return;
    }
  });
  return sums;
};
const handleSizeChange = async (size) => {
  cleardata();
  if (size === useUserStore().tablePageSize) {
    return;
  }
  useUserStore().tablePageSize = size;
  useUserStore().setUserHabit("tablePageSize", "表格每页数量", size);
  emit("search");
};

const handleCurrentChange = async (newpage) => {
  currentPage.value = newpage;
  cleardata();
  emit("search", { page: newpage });
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
  padding: 10px;
  background-color: #fff;
}

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

.pagination-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.table-empty {
  display: flex;
  align-items: center;
  justify-content: center;
}

.table-empty .el-icon {
  animation: rotate 1s linear infinite;
  transform-origin: center center;
}

:deep(tfoot.el-table__body-footer) {
  background-color: #fff1d4 !important;
}

:deep(tfoot.el-table__body-footer tr) {
  background-color: #fff1d4 !important;
}

:deep(tfoot.el-table__body-footer .el-table__cell) {
  background-color: #fff1d4 !important;
  color: #333 !important;
  font-weight: bold !important;
}

:deep(tfoot.el-table__body-footer .el-table__cell.el-table-fixed-column--left),
:deep(
    tfoot.el-table__body-footer .el-table__cell.el-table-fixed-column--right
  ) {
  background-color: #fff1d4 !important;
  z-index: 1;
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
