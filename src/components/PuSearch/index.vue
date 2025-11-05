<template>
  <div class="page-wrapper">
    <div v-show="!ifFold" class="search-wrapper">
      <div
        v-for="(item, index) in searchDataList.slice(0, showNum)"
        :key="index"
      >
        <template v-if="item.type === 'input'">
          <div style="display: flex">
            <div
              class="label"
              :style="{ width: item.labelWidth || '90px' }"
              v-if="item.label"
            >
              {{ item.label }}
            </div>
            <div v-else>
              <el-select
                :style="{ width: item.selectWidth || '90px' }"
                v-model="item.selectedOptionValue"
                :placeholder="
                  item.placeholder || item.selectLabelOptions[0].label
                "
                @change="(v:any, o:any) => selectLabelChange(v, o, item, index)"
              >
                <el-option
                  v-for="opt in item.selectLabelOptions"
                  :key="opt.value"
                  :label="opt.label"
                  :value="opt.value"
                >
                </el-option>
              </el-select>
            </div>
            <el-input
              :style="{ width: item.inputWidth || '130px' }"
              v-model="formModel[item.searchKey]"
              :placeholder="
                item.placeholder || t('pu.pusearch.placeholder.input')
              "
            />
          </div>
        </template>
        <template v-if="item.type === 'inputTrim'">
          <div style="display: flex">
            <div
              class="label"
              :style="{ width: item.labelWidth || '90px' }"
              v-if="item.label"
            >
              {{ item.label }}
            </div>
            <div v-else>
              <el-select
                :style="{ width: item.selectWidth || '90px' }"
                v-model="item.selectedOptionValue"
                :placeholder="
                  item.placeholder || item.selectLabelOptions[0].label
                "
                @change="(v:any, o:any) => selectLabelChange(v, o, item, index)"
              >
                <el-option
                  v-for="opt in item.selectLabelOptions"
                  :key="opt.value"
                  :label="opt.label"
                  :value="opt.value"
                >
                </el-option>
              </el-select>
            </div>
            <el-input
              :style="{ width: item.inputWidth || '130px' }"
              v-model.trim="formModel[item.searchKey]"
              :placeholder="
                item.placeholder || t('pu.pusearch.placeholder.input')
              "
            />
          </div>
        </template>
        <template v-if="item.type === 'select'">
          <el-select
            clearable
            :style="{ width: item.width || '220px' }"
            v-model="formModel[item.searchKey]"
            :placeholder="
              item.placeholder || t('pu.pusearch.placeholder.select')
            "
          >
            <el-option
              v-for="i in item.SelectOptions"
              :key="i.value"
              :label="i.label"
              :value="i.value"
            >
            </el-option>
          </el-select>
        </template>
        <template v-if="item.type === 'time'">
          <el-time-select
            :style="{ width: item.width || '220px' }"
            v-model="formModel[item.searchKey]"
            :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30',
            }"
            :placeholder="item.placeholder || t('pu.pusearch.placeholder.time')"
          >
          </el-time-select>
        </template>
        <template v-if="item.type === 'timeFrame'">
          <el-date-picker
            :style="{ width: item.width || '220px' }"
            v-model="formModel[item.searchKey]"
            align="right"
            type="date"
            :value-format="item.format || 'YYYY-MM-DD'"
            :placeholder="item.placeholder || t('pu.pusearch.placeholder.date')"
            :picker-options="optionPickerValue"
          >
          </el-date-picker>
        </template>
        <template v-if="item.type === 'area'">
          <OptionArea
            :style="{ width: item.width || '220px' }"
            @update:area-value="handleSelectArea($event, item)"
          />
        </template>
      </div>
      <div v-if="searchDataList.length > showNum">
        <el-popover :visible="popVisible" :width="270">
          <div
            class="dshow-wrapper"
            v-for="(item, index) in searchDataList.slice(
              showNum,
              searchDataList.length
            )"
          >
            <template v-if="item.type === 'input'">
              <div style="display: flex">
                <div
                  class="label"
                  :style="{ width: item.labelWidth || '90px' }"
                  v-if="item.label"
                >
                  {{ item.label }}
                </div>
                <div v-else>
                  <el-select
                    :style="{ width: item.selectWidth || '90px' }"
                    v-model="item.selectedOptionValue"
                    :placeholder="
                      item.placeholder || item.selectLabelOptions[0].label
                    "
                    @change="(v:any, o:any) => selectLabelChange(v, o, item, index)"
                  >
                    <el-option
                      v-for="opt in item.selectLabelOptions"
                      :key="opt.value"
                      :label="opt.label"
                      :value="opt.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <el-input
                  :style="{ width: item.inputWidth || '130px' }"
                  v-model="formModel[item.searchKey]"
                  :placeholder="
                    item.placeholder || t('pu.pusearch.placeholder.input')
                  "
                />
              </div>
            </template>
            <template v-if="item.type === 'inputTrim'">
              <div style="display: flex">
                <div
                  class="label"
                  :style="{ width: item.labelWidth || '90px' }"
                  v-if="item.label"
                >
                  {{ item.label }}
                </div>
                <div v-else>
                  <el-select
                    :style="{ width: item.selectWidth || '90px' }"
                    v-model="item.selectedOptionValue"
                    :placeholder="
                      item.placeholder || item.selectLabelOptions[0].label
                    "
                    @change="(v:any, o:any) => selectLabelChange(v, o, item, index)"
                  >
                    <el-option
                      v-for="opt in item.selectLabelOptions"
                      :key="opt.value"
                      :label="opt.label"
                      :value="opt.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <el-input
                  :style="{ width: item.inputWidth || '130px' }"
                  v-model.trim="formModel[item.searchKey]"
                  :placeholder="
                    item.placeholder || t('pu.pusearch.placeholder.input')
                  "
                />
              </div>
            </template>
            <template v-if="item.type === 'select'">
              <el-select
                clearable
                :style="{ width: item.width || '220px' }"
                v-model="formModel[item.searchKey]"
                :placeholder="
                  item.placeholder || t('pu.pusearch.placeholder.select')
                "
              >
                <el-option
                  v-for="i in item.SelectOptions"
                  :key="i.value"
                  :label="i.label"
                  :value="i.value"
                >
                </el-option>
              </el-select>
            </template>

            <template v-if="item.type === 'time'">
              <el-time-select
                :style="{ width: item.width || '220px' }"
                v-model="formModel[item.searchKey]"
                :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '18:30',
                }"
                :placeholder="
                  item.placeholder || t('pu.pusearch.placeholder.time')
                "
              >
              </el-time-select>
            </template>

            <template v-if="item.type === 'timeFrame'">
              <el-date-picker
                :style="{ width: item.width || '220px' }"
                v-model="formModel[item.searchKey]"
                align="right"
                type="date"
                :value-format="item.format || 'YYYY-MM-DD'"
                :placeholder="
                  item.placeholder || t('pu.pusearch.placeholder.date')
                "
                :picker-options="optionPickerValue"
              >
              </el-date-picker>
            </template>
            <template v-if="item.type === 'area'">
              <OptionArea
                :style="{ width: item.width || '220px' }"
                @update:area-value="handleSelectArea($event, item)"
              />
            </template>
          </div>
          <div style="text-align: right; margin: 0">
            <div class="drop-btn">
              <el-button @click="handelCancel">
                {{ t("pu.pusearch.btn.cancel") }}
              </el-button>
              <el-button type="primary" @click="handleConfirm">
                {{ t("pu.pusearch.btn.search") }}
              </el-button>
            </div>
          </div>
          <template #reference>
            <el-button @click="popVisible = true"
              ><el-icon class="el-icon--right"> <Filter /> </el-icon
            ></el-button>
          </template>
        </el-popover>
      </div>
      <div>
        <el-button type="primary" @click="handleSearch">
          <el-icon><component is="Search" /></el-icon>
          {{ t("pu.pusearch.btn.search") }}
        </el-button>
        <el-button @click="reset">
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
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { isEmpty } from "@/untils/commom";
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

const popVisible = ref(false);

const handleConfirm = () => {
  handleSearch();
  popVisible.value = false;
};

const handelCancel = () => {
  popVisible.value = false;
};

const selectLabelChange = (value: any, option: any, item: any, index: any) => {
  item.searchKey = value;
  item.selectLabelOptions.map((ite: any) => {
    if (ite.value !== value) {
      delete formModel.value[ite.value];
    }
    formModel.value[value] = "";
  });
};

// 折叠
const ifFold = ref(false);

const formModel = ref<any>({});

// 初始化表单数据
const searchDataList = ref<any>([]);
const searchDataListInit = () => {
  formModel.value = {};
  const list = props.searchList.filter(
    (item: any) => item.showSearch !== false
  );

  list.forEach((item: any) => {
    if (item.selectLabelOptions?.length > 0) {
      const searchKey = item.searchKey;
      if (formModel.value[searchKey] === undefined) {
        delete formModel.value["undefined"];
      }
      item.searchKey = item.selectLabelOptions[0].value;
      formModel.value[item.selectLabelOptions[0].value] = "";
      if (item.selectedOptionValue === undefined) {
        item.selectedOptionValue = item.selectLabelOptions[0].value;
      }
    }
  });
  searchDataList.value = list;
};

// 选择地址
const handleSelectArea = (e: any, item: any) => {
  formModel.value[item.regionProvinceCode] = e[0];
  formModel.value[item.regionCityCode] = e[1];
  formModel.value[item.regionCountyCode] = e[2];
  handleSearch();
};
const emit = defineEmits(["search"]);

// 查询
const handleSearch = () => {
  Object.keys(formModel.value).forEach((key) => {
    if (isEmpty(formModel.value[key])) {
      delete formModel.value[key];
    }
  });
  emit("search", formModel.value);
};

// 重置
const reset = () => {
  searchDataListInit();
  emit("search", "isreset");
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
onMounted(() => {
  reset();
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

.dshow-wrapper {
  padding: 10px;
}

.drop-btn {
  padding: 10px 10px 0 10px;
  border-top: 1px solid #ebeef5;
  display: flex;
  justify-content: end;
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

.label {
  display: flex;
  padding: 0 12px;
  align-items: center;
  border: 1px solid #d9d9d9;
  color: #a8abb2;
  font-size: 14px;
}

// 添加以下样式来移除输入框的圆角
:deep(.el-select) {
  .el-select__wrapper {
    border-radius: 0 !important;
    &:hover {
      border-radius: 0 !important;
    }
    &:focus-within {
      border-radius: 0 !important;
    }
  }
  .el-select__input {
    border-radius: 0 !important;
  }
}

:deep(
    .el-input__inner,
    .el-time-select__input,
    .el-date-picker__input > input
  ) {
  border-radius: 0 !important;
}

::v-deep(.el-input__wrapper) {
  border-radius: 0 !important;
}

::v-deep(.el-input-group__prepend) {
  border-radius: 0 !important;
}

::v-deep(.el-input-group__append) {
  border-radius: 0 !important;
}

::v-deep(.el-select .el-input__wrapper) {
  border-radius: 0 !important;
}

::v-deep(.el-date-editor .el-input__wrapper) {
  border-radius: 0 !important;
}

::v-deep(.el-time-select .el-input__wrapper) {
  border-radius: 0 !important;
}
</style>
