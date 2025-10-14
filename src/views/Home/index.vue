<template>
  <div class="pu-table-wrapper">
    <PuTable
      :datasource="tableData"
      :stripe="true"
      :border="true"
      :columns="columns"
      :height="'600px'"
      :selection="true"
    >
      <template #bodyCell="{ column, row }">
        <template v-if="column.property === 'operate'">
          <PuOperateButton
            :butlist="fewButtons"
            :butCount="3"
            @buttonClick="handleButtonClick"
          />
        </template>
      </template>
    </PuTable>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { getHomeData } from "@/api/home";
import PuOperateButton from "@/components/PuOperateButton/index.vue";
import { ElMessage } from "element-plus";

const { t } = useI18n();

const tableData = ref([]);
const loading = ref(false);

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
    onClick: () => ElMessage.info("点击了编辑按钮"),
  },
  {
    label: "复制",
    type: "info",
    onClick: () => ElMessage.warning("点击了删除按钮"),
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

const getHomeDataApi = async () => {
  loading.value = true;
  try {
    const res = await getHomeData({});
    tableData.value = res.data.List;
  } catch (error) {
    tableData.value = [];
    console.warn("获取首页数据失败（局部处理）：", error);
  }
  loading.value = false;
};

// 处理编辑操作
const handleEdit = (row) => {
  console.log("编辑行数据:", row);
  ElMessage.info(`编辑用户: ${row.name}`);
};

// 处理删除操作
const handleDelete = (row) => {
  console.log("删除行数据:", row);
  ElMessage.warning(`删除用户: ${row.name}`);
};

const columns = computed(() => [
  {
    label: t("base.home.serialNumber"),
    ellipsis: true,
    width: 80,
    fixed: "left",
    customRender: ({ index }) => {
      return index + 1;
    },
  },
  {
    name: "date",
    label: t("base.home.date"),
    width: 150,
  },
  {
    name: "name",
    label: t("base.home.name"),
    width: 120,
  },
  {
    name: "address",
    label: t("base.home.address"),
    width: 200,
  },
  {
    name: "age",
    label: t("base.home.age"),
    width: 80,
  },
  {
    name: "sex",
    label: t("base.home.sex"),
    width: 80,
  },
  {
    name: "phone",
    label: t("base.home.phone"),
    width: 150,
  },
  {
    name: "email",
    label: t("base.home.email"),
    width: 200,
  },
  {
    name: "operate",
    label: t("base.home.operate"),
    width: 120,
    fixed: "right",
  },
]);

onMounted(() => {
  getHomeDataApi();
});
</script>

<style lang="scss" scoped>
.pu-table-wrapper {
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>
