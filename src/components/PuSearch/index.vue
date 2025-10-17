<template>
  <div class="search-wrapper">
    <div v-for="(item, index) in searchDataList.slice(0, showNum)" :key="index">
      <el-input
        v-if="item.type === 'input'"
        v-model="item.value"
        :placeholder="item.placeholder || t('pu.pusearch.placeholder.input')"
      />
      <el-select
        v-model="item.value"
        v-if="item.type === 'select'"
        :options="item.Selectoptions"
        :placeholder="item.placeholder || t('pu.pusearch.placeholder.select')"
      />
      <el-time-select
        v-model="optionTimeValue"
        v-if="item.type === 'time'"
        :picker-options="{
          start: '08:30',
          step: '00:15',
          end: '18:30',
        }"
        placeholder="选择时间"
      >
      </el-time-select>
      <el-date-picker
        v-if="item.type === 'timeFrame'"
        v-model="selecttimeFrame"
        align="right"
        type="date"
        placeholder="选择日期"
        :picker-options="optionPickerValue"
      >
      </el-date-picker>
      <OptionArea
        v-if="item.type === 'area'"
        :AreaValue="optionAreaValue"
        @update:selectedOptions="optionAreaValue = $event"
      />
    </div>
    <div>
      <el-button type="primary">
        <el-icon><component is="Search" /></el-icon>搜索
      </el-button>
      <el-button>
        <el-icon><component is="Refresh" /></el-icon>重置
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import OptionArea from "./components/OptionArea.vue";
defineOptions({
  name: "PuSearch",
});

import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const props = withDefaults(
  defineProps<{
    test: String;
    searchList: any[]; //搜索数组
    showNum: number; //展示的搜索框数
  }>(),
  {
    searchList: [] as any,
    showNum: 4,
  }
);

const optionTimeValue = ref();
const selecttimeFrame = ref();
const optionPickerValue = ref({
  disabledDate(time: any) {
    return time.getTime() > Date.now();
  },
  shortcuts: [
    {
      text: "今天",
      onClick(picker: any) {
        picker.$emit("pick", new Date());
      },
    },
    {
      text: "昨天",
      onClick(picker: any) {
        const date = new Date();
        date.setTime(date.getTime() - 3600 * 1000 * 24);
        picker.$emit("pick", date);
      },
    },
    {
      text: "一周前",
      onClick(picker: any) {
        const date = new Date();
        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
        picker.$emit("pick", date);
      },
    },
  ],
});

const optionAreaValue = ref();

const searchDataList = computed(() => {
  return props.searchList.filter((item: any) => item.showSearch !== false);
});
</script>

<style>
.search-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
