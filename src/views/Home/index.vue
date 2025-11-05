<template>
  <div class="pu-table-wrapper">
    <DetailDrawer
      :visible="drawVisible"
      @update:visible="drawVisible = $event"
    />

    <PuTabs
      :activeTabsValue="topactiveTabsValue"
      :tabsList="topList"
      @update:activeTabs="tophandleTabChange"
    />
    <!-- 添加搜索组件显示数据 -->
    <PuSearch
      :test="'测试数据'"
      :searchList="searchList"
      :showNum="4"
      @search="search"
    />
    <PuTabs
      :type="'card'"
      :activeTabsValue="miactiveTabsValue"
      :tabsList="miList"
      @update:activeTabs="mihandleTabChange"
    />
    <PuTable
      ref="tableRef"
      :stripe="true"
      :border="true"
      :datasource="hahahdata"
      :columns="homeColumns"
      @search="search"
      :selection="true"
      :headSearchSlot="true"
    >
      <template #bodyCell="{ column, row }">
        <template v-if="column.property === 'id'">
          <!-- <MCopyList :Text="row.id" @handle-click="handleDetail" /> -->
          <div @click="handledrawerVisible" style="color: #5d9eff">
            {{ row.id }}
          </div>
        </template>
        <template v-if="column.property === 'tabs'">
          <MTags
            :normal="[0]"
            :success="[1]"
            :info="[4]"
            :warning="[3]"
            :danger="[2]"
            :value="row.tabs.status"
            :text="row.tabs.text"
          />
        </template>
        <template v-if="column.property === 'operate'">
          <MOperateButton :butlist="fewButtons" :butCount="3" />
        </template>
      </template>
    </PuTable>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, Text, watch } from "vue";
import { useI18n } from "vue-i18n";
import { getHomeData } from "@/api/home";
import { ElMessage } from "element-plus";
import { useTableData } from "@/hooks/useTableData";
import { homeColumns } from "@/views/home/component/columns";
import DetailDrawer from "./component/DetailDrawer.vue";
import { useRouter } from "vue-router";
const tableRef = ref(null);

const router = useRouter();

const { createDatasource, reload, search, where } = useTableData(tableRef, {
  whereParams: { params: {} },
  getApi: getHomeData,
});
const { t } = useI18n();

const topactiveTabsValue = ref("");
const miactiveTabsValue = ref("");

import { keyValueSum } from "@/untils/index";

const hahahdata = () => {};

const drawVisible = ref(false);
const handledrawerVisible = () => {
  drawVisible.value = !drawVisible.value;
};

// 处理标签操作
const tophandleTabChange = (tab) => {
  topactiveTabsValue.value = tab;
  where.value.params.toptabs = tab;
  reload();
};
const mihandleTabChange = (tab) => {
  miactiveTabsValue.value = tab;
  where.value.params.mitabs = tab;
  reload();
};
// 处理编辑操作
const handleEdit = (row) => {
  ElMessage.info(`编辑用户: ${row.name}`);
};

const handleDetail = () => {
  router.push({ path: "/home/detail" });
};

// 处理删除操作
const handleDelete = (row) => {
  ElMessage.warning(`删除用户: ${row.name}`);
};

const topList = ref([
  { label: t("base.tabs.total"), value: "" },
  { label: t("base.tabs.finish"), value: "1" },
  { label: t("base.tabs.unfinish"), value: "0" },
]);

const miList = ref([
  { label: t("base.tabs.total"), value: "" },
  { label: t("base.tabs.customer"), value: "1" },
  { label: t("base.tabs.bussiness"), value: "0" },
]);

const fewButtons = ref([
  {
    label: "编辑",
    type: "primary",
    display: false,
    onClick: () => ElMessage.info("点击了编辑按钮"),
  },
  {
    label: "删除",
    type: "danger",
    onClick: () => ElMessage.warning("点击了删除按钮"),
  },
  {
    label: "查看",
    type: "warning",
    onClick: () => ElMessage.info("点击了查看按钮"),
  },
  {
    label: "复制",
    type: "info",
    onClick: () => ElMessage.warning("点击了复制按钮"),
  },
  {
    label: "导出",
    type: "success",
    onClick: () => ElMessage.info("点击了导出按钮"),
  },
  {
    label: "打印",
    type: "primary",
    onClick: () => ElMessage.info("点击了打印按钮"),
  },
]);

const searchList = ref([
  {
    type: "input",
    label: "姓名",
    searchKey: "name",
  },
  {
    type: "inputTrim",
    selectLabelOptions: [
      { label: "选项1", value: "option1" },
      { label: "选项2", value: "option2" },
      { label: "选项3", value: "option3" },
    ],
  },
  {
    type: "inputTrim",
    selectLabelOptions: [
      { label: "一", value: "num1" },
      { label: "二", value: "num2" },
      { label: "三", value: "num3" },
    ],
  },
  {
    type: "select",
    label: "选择",
    searchKey: "select",
    SelectOptions: [
      { label: "选项1", value: "选项1" },
      { label: "选项2", value: "选项2" },
      { label: "选项3", value: "选项3" },
    ],
  },
  {
    type: "time",
    label: "时间",
    searchKey: "time",
  },

  {
    type: "timeFrame",
    label: "日期",
    searchKey: "timeFrame",
  },
  {
    type: "area",
    label: "地址",
    regionProvinceCode: "regionProvinceCode",
    regionCityCode: "regionCityCode",
    regionCountyCode: "regionCountyCode",
  },
]);
</script>

<style lang="scss" scoped>
.pu-table-wrapper {
  width: 100%;
  overflow: hidden;
  display: flex;
  min-height: 300px;

  flex-direction: column;
}
</style>
