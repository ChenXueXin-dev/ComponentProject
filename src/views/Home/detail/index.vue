<template>
  <div>
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
    <PuDetailCard
      :title="'基础信息'"
      :columns="baseColumns"
      :data="datasource"
    ></PuDetailCard>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

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

const datasource = ref({
  name1: "张三",
  age1: 18,
  address1: "上海",
  action1: "编辑",
  name2: "张三",
  age2: 18,
  address2: "上海",
  action2: "编辑",
  name3: "张三",
  age3: 18,
  address3: "上海",
  action3: "编辑",
});
</script>

<style scoped></style>
