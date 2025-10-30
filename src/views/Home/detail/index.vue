<template>
  <div>
    <a-spin :spinning="loading">
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
import { computed, onMounted, ref } from "vue";
import { homeColumns } from "@/views/home/component/columns";
import { getHomeDetailData } from "@/api/home";
import router from "@/router";

const tableRef = ref();

import { useApiRequest } from "@/hooks/useApiRequest";

const { fetchData, data: requestData } = useApiRequest<any>();

const loading = ref(true);

const tableData = ref({});

const homedata = ref([]);
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

const baseColumns = computed(() => {
  return [
    {
      columns: [
        { label: "姓名1", value: "name1" },
        { label: "年龄1", value: "age1" },
        { label: "地址1", value: "address1" },
        {
          label: "操作1",
          value: "action1",
          customRender: (row: any, col: any) => {
            return row.name1 + "/" + col.label;
          },
        },
      ],
    },
    {
      columns: [
        { label: "姓名2", value: "name2" },
        { label: "年龄2", value: "age2" },
        { label: "地址2", value: "address2" },
        { label: "操作2", value: "action2" },
      ],
    },
    {
      columns: [
        { label: "姓名3", value: "name3" },
        { label: "年龄3", value: "age3" },
        { label: "地址3", value: "address3" },
        { label: "操作3", value: "action3" },
      ],
    },
  ];
});

onMounted(() => {
  getDetail();
});
</script>

<style scoped></style>
