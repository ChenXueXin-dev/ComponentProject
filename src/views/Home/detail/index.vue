<template>
  <div>
    <a-spin :spinning="loading">
      <PuAnchor :anchorList="anchorList"></PuAnchor>

      <PuDetailCard
        ref="base1"
        :title="'基础信息1'"
        :columns="baseColumns"
        :data="datasource"
      ></PuDetailCard>
      <PuDetailCard
        ref="base2"
        :title="'基础信息2'"
        :columns="baseColumns"
        :data="tableData"
      ></PuDetailCard>
      <PuDetailCard
        ref="base3"
        :title="'基础信息3'"
        :columns="baseColumns"
        :data="datasource"
      ></PuDetailCard>
      <PuDetailCard
        ref="base4"
        :title="'基础信息4'"
        :columns="baseColumns"
        :data="datasource"
      ></PuDetailCard>
      <PuDetailCard
        ref="base5"
        :title="'基础信息5'"
        :columns="baseColumns"
        :data="datasource"
      ></PuDetailCard>
      <PuDetailCard
        ref="base6"
        :title="'基础信息6'"
        :columns="baseColumns"
        :data="datasource"
      ></PuDetailCard>
      <PuDetailCard
        ref="base7"
        :title="'基础信息7'"
        :columns="baseColumns"
        :data="datasource"
      ></PuDetailCard>
      <PuDetailCard
        ref="base8"
        :title="'基础信息8'"
        :columns="baseColumns"
        :data="datasource"
      ></PuDetailCard>
      <PuDetailCard
        ref="base9"
        :title="'基础信息9'"
        :columns="baseColumns"
        :data="datasource"
      ></PuDetailCard>

      <PuCard class="m-b-84" :title="'基础信息'">
        <PuTable
          :height="'300px'"
          ref="tableRef"
          :datasource="homedata"
          :needPage="false"
          :stripe="true"
          :border="true"
          :columns="homeColumns"
          :selection="true"
          :showSummary="true"
        >
          <template #bodyCell="{ column, row }">
            <!-- <template v-if="column.property === 'id'">
              <MCopyList :Text="row.id" @handle-click="handleDetail" />
            </template> -->
            <template v-if="column.property === 'operate'">
              <MOperateButton :butlist="fewButtons" :butCount="3" />
            </template>
          </template>
        </PuTable>
      </PuCard>
    </a-spin>

    <div class="com-footer">
      <el-button @click="router.back()">返回</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getHomeDetailData } from "@/api/home";
import router from "@/router";
import { baseColumns, homeColumns } from "../component/columns";

const tableRef = ref();

import { useApiRequest } from "@/hooks/useApiRequest";
import { ElMessage } from "element-plus";

const { fetchData, data: requestData } = useApiRequest<any>();

const homedata = ref([]);
const loading = ref(false);
const tableData = ref({});
const datasource = ref({});
const base1 = ref();
const base2 = ref();
const base3 = ref();
const base4 = ref();
const base5 = ref();
const base6 = ref();
const base7 = ref();
const base8 = ref();
const base9 = ref();

const anchorList = [
  { name: "基础1", ref: base1 },
  { name: "基础2", ref: base2 },
  { name: "基础3", ref: base3 },
  { name: "基础4", ref: base4 },
  { name: "基础5", ref: base5 },
  { name: "基础6", ref: base6 },
  { name: "基础7", ref: base7 },
  { name: "基础8", ref: base8 },
  { name: "基础9", ref: base9 },
];
const getDetail = async () => {
  loading.value = true;
  try {
    await fetchData(getHomeDetailData, {});
    tableData.value = requestData.value.data;
    homedata.value = requestData.value.data.homedata;
    datasource.value = requestData.value.data;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

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

onMounted(() => {
  getDetail();
});
</script>

<style scoped></style>
