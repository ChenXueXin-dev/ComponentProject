<template>
  <div class="pu-table-wrapper">
    <PuTable
      :datasource="tableData"
      :stripe="true"
      :border="true"
      :columns="columns"
      :height="'600px'"
      :selection="true"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { getHomeData } from "@/api/home";

const { t } = useI18n();

const tableData = ref([]);
const loading = ref(false);

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
  },
  {
    name: "operate2",
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
