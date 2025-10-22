<template>
  <div class="page-wrapper">
    <div v-show="!ifFold" class="search-wrapper">
      <div
        v-for="(item, index) in searchDataList.slice(0, showNum)"
        :key="index"
      >
        <el-input
          :style="{ width: item.selectLabelWidth || '220px' }"
          v-if="item.type === 'input'"
          v-model="formModel[item.searchKey || 'input_' + index]"
          :placeholder="item.placeholder || t('pu.pusearch.placeholder.input')"
        >
          <template #prepend>
            <div style="display: flex; align-items: center; height: 100%">
              <el-select
                v-if="item.selectLabelOptions?.length > 0"
                v-model="formModel[item.searchKey]"
                :placeholder="
                  item.placeholder || t('pu.pusearch.placeholder.select')
                "
                :style="{ width: item.selectLabelWidth || '115px' }"
              >
                <el-option
                  v-for="option in item.selectLabelOptions"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </el-select>
              <div v-if="!item.selectLabelOptions">
                {{ item.label }}
              </div>
            </div>
          </template>
        </el-input>
        <el-select
          :style="{ width: item.selectLabelWidth || '220px' }"
          v-if="item.type === 'select'"
          v-model="formModel[item.searchKey]"
          :placeholder="item.placeholder || t('pu.pusearch.placeholder.select')"
        >
          <el-option
            v-for="i in item.SelectOptions"
            :key="i.value"
            :label="i.label"
            :value="i.value"
          >
          </el-option>
        </el-select>
        <el-time-select
          v-model="formModel[item.searchKey]"
          v-if="item.type === 'time'"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30',
          }"
          :placeholder="item.placeholder || t('pu.pusearch.placeholder.time')"
        >
        </el-time-select>
        <el-date-picker
          v-if="item.type === 'timeFrame'"
          v-model="formModel[item.searchKey]"
          align="right"
          type="date"
          :placeholder="item.placeholder || t('pu.pusearch.placeholder.date')"
          :picker-options="optionPickerValue"
        >
        </el-date-picker>
        <OptionArea
          v-if="item.type === 'area'"
          v-model:area-value="formModel[item.searchKey]"
        />
      </div>
      <div>
        <el-button type="primary" @click="handleSearch">
          <el-icon><component is="Search" /></el-icon>
          {{ t("pu.pusearch.btn.search") }}
        </el-button>
        <el-button @click="handelReset">
          <el-icon><component is="Refresh" /></el-icon>
          {{ t("pu.pusearch.btn.reset") }}
        </el-button>
      </div>
    </div>
    <div class="fold-wrapper">
      <div class="fold-item">
        <el-icon @click="ifFold = !ifFold" color="#999" size="18">
          <span v-if="ifFold"> <CaretBottom /></span>
          <span v-else><CaretTop /></span>
        </el-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import OptionArea from "./components/OptionArea.vue";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
defineOptions({
  name: "PuSearch",
});

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

// 折叠
const ifFold = ref(false);

const formModel = ref<any>({});

// 初始化表单数据
const searchDataList = computed(() => {
  const list = props.searchList.filter(
    (item: any) => item.showSearch !== false
  );
  list.forEach((item: any) => {
    if (item.selectLabelOptions?.length > 0) {
      const searchKey = item.searchKey;
      if (formModel.value[searchKey] === undefined) {
        formModel.value[searchKey] = item.selectLabelOptions[0].value;
      }
    }
  });
  return list;
});

const emit = defineEmits<{
  (e: "search", value: any): void;
  (e: "reset"): void;
}>();

// 查询
const handleSearch = () => {
  emit("search", formModel.value);
};

// 重置
const handelReset = () => {
  formModel.value = {};
};

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
</script>

<style lang="scss" scoped>
.page-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 0 2px 0;
}
.search-wrapper {
  background-color: #fff;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.fold-wrapper {
  display: flex;
  justify-content: center;
}
.fold-item {
  width: 50px;
  height: 15px;
  border-radius: 0 0 8px 8px;
  background-color: #fff !important;
  margin-top: -1px;
  z-index: 999;
  text-align: center;
}
/* 多选输入样式 */
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.selectItem {
  background-color: #fff;
}
</style>
