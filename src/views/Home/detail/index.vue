<template>
  <div>
    <a-spin :spinning="loading">
      <PuAnchor></PuAnchor>

      <PuDetailCard
        :title="'基础信息'"
        :columns="baseColumns"
        :data="datasource"
      ></PuDetailCard>
      <PuDetailCard
        :title="'基础信息'"
        :columns="baseColumns"
        :data="tableData"
      ></PuDetailCard>
      <PuDetailCard
        :title="'基础信息'"
        :columns="baseColumns"
        :data="datasource"
      ></PuDetailCard>
      <PuDetailCard
        :title="'基础信息'"
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
          @search="search"
          :selection="true"
          :showSummary="true"
        >
          <template #bodyCell="{ column, row }">
            <template v-if="column.property === 'id'">
              <MCopyList :Text="row.id" @handle-click="handleDetail" />
            </template>
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

const { fetchData, data: requestData } = useApiRequest<any>();

const homedata = ref([]);
const loading = ref(false);
const tableData = ref({});
const getDetail = async () => {
  loading.value = true;
  try {
    await fetchData(getHomeDetailData, {});
    tableData.value = requestData.value.data;
    homedata.value = requestData.value.data.homedata;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getDetail();
});
</script>

<style scoped></style>
