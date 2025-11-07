<template>
  <div class="page-wrapper" :style="{ backgroundColor: backgroundColor }">
    <el-form
      ref="ruleFormRef"
      :model="formModel"
      label-width="auto"
      :validate-event="isValidate"
      :rules="rules"
    >
      <el-form-item
        v-for="col in columns"
        :label="col.label"
        :rules="col.rules"
        :prop="col.name"
        v-model="formModel[col.name]"
        :style="{ width: `${col.width}px` || '280px' }"
      >
        <template v-if="col.type == 'input'">
          <el-input
            v-model="formModel[col.name]"
            :placeholder="col.placeholder || t('pu.puform.placeholder.input')"
          />
        </template>
        <template v-if="col.type == 'inputTrim'">
          <el-input v-model="formModel[col.name]" />
        </template>
        <template v-if="col.type == 'select'">
          <el-select
            v-model="formModel[col.name]"
            :placeholder="col.placeholder || t('pu.puform.placeholder.area')"
          >
            <el-option
              v-for="item in col.options"
              :label="item.label"
              :key="item.value"
              :value="item.value"
            />
          </el-select>
        </template>
        <template v-if="col.type == 'area'">
          <OptionArea
            :width="`${col.width - 74}px `"
            :placeholder="col.placeholder"
            @update:area-value="handleSelectArea($event, col)"
          />
        </template>
        <template v-if="col.type == 'datetime'">
          <el-date-picker
            v-model="formModel[col.name]"
            type="datetime"
            :placeholder="
              col.placeholder || t('pu.puform.placeholder.datetime')
            "
            :style="{ width: `${col.width}px` || '280px' }"
          />
        </template>
        <template v-if="col.type == 'date'">
          <el-date-picker
            v-model="formModel[col.name]"
            type="date"
            :placeholder="col.placeholder || t('pu.puform.placeholder.date')"
            :style="{ width: `${col.width}px` || '280px' }"
          />
        </template>
        <template v-if="col.type == 'datetimerange'">
          <el-date-picker
            v-model="formModel[col.name]"
            type="datetimerange"
            :start-placeholder="
              col.placeholder || t('pu.puform.placeholder.datetimerangestart')
            "
            :end-placeholder="
              col.placeholder || t('pu.puform.placeholder.datetimerangeend')
            "
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            :style="{ width: `${col.width}px` || '280px' }"
          />
        </template>
        <template v-if="col.type == 'daterange'">
          <el-date-picker
            v-model="formModel[col.name]"
            type="daterange"
            :start-placeholder="
              col.placeholder || t('pu.puform.placeholder.datetimestart')
            "
            :end-placeholder="
              col.placeholder || t('pu.puform.placeholder.datetimeend')
            "
            :default-value="[new Date(2010, 9, 1), new Date(2010, 10, 1)]"
            :style="{ width: `${col.width}px` || '280px' }"
          />
        </template>
        <template v-if="col.type == 'switch'">
          <el-switch
            v-model="formModel[col.name]"
            class="ml-2"
            :style="{ width: `${col.width}px` || '280px' }"
          />
        </template>
        <template
          v-if="col.type == 'checkbox'"
          :style="{ width: `${col.width}px` || '280px' }"
        >
          <el-checkbox
            v-if="col.isNeedCheckAll"
            v-model="formModel[col.checkAllName]"
            @change="onAllcheck(col)"
          >
            {{ t("pu.puform.allselect") }}
          </el-checkbox>
          <el-checkbox-group v-model="formModel[col.name]">
            <el-checkbox
              v-for="item in col.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              {{ item.label }}
            </el-checkbox>
          </el-checkbox-group>
        </template>
        <template v-if="col.type == 'radio'">
          <el-radio-group
            v-model="formModel[col.name]"
            :style="{ width: `${col.width}px` || '280px' }"
          >
            <el-radio
              v-for="item in col.options"
              :value="item.value"
              :size="item.size"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </template>
        <template v-if="col.type == 'textarea'">
          <el-input
            v-model="formModel[col.name]"
            :placeholder="
              col.placeholder || t('pu.puform.placeholder.textarea')
            "
            type="textarea"
            :style="{ width: `${col.width}px` || '280px' }"
          />
        </template>
      </el-form-item>
    </el-form>
    <div v-if="showSubmitBtn" class="footer-wrapper">
      <el-button @click="onCancel">取消</el-button>
      <el-button @click="onSubmit(ruleFormRef)" type="primary">保存</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import OptionArea from "./component/OptionArea.vue";
import type { FormInstance } from "element-plus";
import { useI18n } from "vue-i18n";
import { ElMessage } from "element-plus";
import { isEmpty } from "@/untils/commom";
const { t } = useI18n();
defineOptions({
  name: "PuForm",
});

const props = defineProps({
  formModel: {
    type: Object,
    default: () => {},
  },
  columns: {
    type: Array as any,
    default: () => [],
  },
  datasource: {
    type: Object,
    default: () => {},
  },
  backgroundColor: {
    type: String,
    default: "#fff",
  },
  showSubmitBtn: {
    type: Boolean,
    default: false,
  },
  isValidate: {
    type: Boolean,
    default: true,
  },
  rules: {
    type: Object,
    default: () => {},
  },
});
// checkbox 全选择
const onAllcheck = (item: any) => {
  if (props.formModel[item.checkAllName]) {
    props.formModel[item.name] = item.options.map((item: any) => item.value);
  } else {
    props.formModel[item.name] = [];
  }
};

const emit = defineEmits(["submit", "cancel"]);
const onCancel = () => {
  Object.keys(props.formModel).forEach((key) => {
    delete props.formModel[key];
  });
  emit("cancel", {});
};

const ruleFormRef = ref<FormInstance>();
const onSubmit = (ruleFormRef: FormInstance | undefined) => {
  if (!ruleFormRef) return;
  ruleFormRef.validate((valid) => {
    if (valid) {
      Object.keys(props.formModel).forEach((key) => {
        if (isEmpty(props.formModel[key])) {
          delete props.formModel[key];
        }
      });
      emit("submit");
    } else {
      ElMessage.error(t("pu.puform.message.error"));
    }
  });
};

// 选择地区加入表单
const handleSelectArea = (e: any, item: any) => {
  props.formModel[item.regionProvinceCode] = e[0];
  props.formModel[item.regionCityCode] = e[1];
  props.formModel[item.regionCountyCode] = e[2];
};
</script>
<style scoped>
.page-wrapper {
  padding: 20px;
  width: 400px;
  border-radius: 5px;
}

.footer-wrapper {
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>
