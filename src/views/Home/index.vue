<template>
  <div class="pu-table-wrapper">
    <!-- 添加搜索组件显示数据 -->
    <PuSearch :test="'测试数据'" :searchList="searchList" :showNum="12" />
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
          <PuOperateButton :butlist="fewButtons" :butCount="3" />
        </template>
      </template>
    </PuTable>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { getHomeData } from "@/api/home";
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
    type: "input",
    selectLabelOptions: [
      { label: "选项1", value: "option1" },
      { label: "选项2", value: "option2" },
      { label: "选项3", value: "option3" },
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
    searchKey: "area",
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
