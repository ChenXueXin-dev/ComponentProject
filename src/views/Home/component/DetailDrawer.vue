<template>
  <PuDrawer
    :visible="drawVisible"
    @update:visible="handledrawerVisible"
    :title="'标题'"
  >
    <template #content>
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
        <PuCard :title="'基础信息'">
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
    </template>
  </PuDrawer>
</template>

<script setup>
import { watch, ref, onMounted } from "vue";
import { getHomeDetailData } from "@/api/home";
import { homeColumns, baseColumns } from "./columns";
const tableRef = ref();

import { useApiRequest } from "@/hooks/useApiRequest";

const { fetchData, data: requestData } = useApiRequest();

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
const drawVisible = ref(props.visible);
watch(
  () => props.visible,
  (val) => {
    drawVisible.value = val;
  }
);
const emit = defineEmits(["update:visible"]);

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
const handledrawerVisible = () => {
  emit("update:visible", false);
  drawVisible.value = !drawVisible.value;
};

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
