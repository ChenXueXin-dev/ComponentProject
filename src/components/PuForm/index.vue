<template>
  <el-form :model="formModel" label-width="auto" style="max-width: 600px">
    <el-form-item
      v-for="col in columns"
      :label="col.label"
      :plcaceholder="col.placeholder"
    >
      <template v-if="col.type == 'input'">
        <el-input v-model="formModel[col.name]" />
      </template>
      <template v-if="col.type == 'inputTrim'">
        <el-input v-model="formModel[col.name]" />
      </template>
      <template v-if="col.type == 'select'">
        <el-select v-model="formModel[col.name]" placeholder="请选择活动区域">
          <el-option
            v-for="item in col.options"
            :label="item.label"
            :key="item.value"
            :value="item.value"
          />
        </el-select>
      </template>
      <template v-if="col.type == 'areaSelect'">
        <OptionArea
          :style="{ width: col.width || '220px' }"
          @update:area-value="handleSelectArea($event, col)"
        />
      </template>
      <!-- 日期时间选择 -->
      <template v-if="col.type == 'datetime'">
        <el-date-picker
          v-model="formModel[col.name]"
          type="datetime"
          placeholder="Select date and time"
        />
      </template>
      <template v-if="col.type == 'date'">
        <el-date-picker
          v-model="formModel[col.name]"
          type="date"
          placeholder="Select date and time"
        />
      </template>
      <!-- 日期时间范围选择 -->
      <template v-if="col.type == 'datetimerange'">
        <el-date-picker
          v-model="formModel[col.name]"
          type="datetimerange"
          start-placeholder="Start date"
          end-placeholder="End date"
          format="YYYY-MM-DD HH:mm:ss"
          date-format="YYYY/MM/DD ddd"
        />
      </template>
      <template v-if="col.type == 'daterange'">
        <el-date-picker
          v-model="formModel[col.name]"
          type="daterange"
          start-placeholder="Start Date"
          end-placeholder="End Date"
          :default-value="[new Date(2010, 9, 1), new Date(2010, 10, 1)]"
        />
      </template>
      <template v-if="col.type == 'switch'">
        <el-switch
          v-model="formModel[col.name]"
          class="ml-2"
          :style="col.style"
        />
      </template>
      <template v-if="col.type == 'checkbox'">
        <el-checkbox
          v-for="item in col.options"
          v-model="formModel[col.name]"
          :label="item.label"
          :size="col.size"
        />
      </template>
      <template v-if="col.type == 'radio'">
        <el-radio-group v-model="formModel[col.name]">
          <el-radio
            v-for="item in col.options"
            :value="item.value"
            :size="item.size"
            >{{ item.label }}</el-radio
          >
        </el-radio-group>
      </template>
      <template v-if="col.type == 'textarea'">
        <el-input v-model="formModel[col.name]" type="textarea" />
      </template>
    </el-form-item>

    <!-- 
    <el-form-item label="Activity time">
      <el-col :span="11">
        <el-date-picker
          v-model="form.date1"
          type="date"
          placeholder="Pick a date"
          style="width: 100%"
        />
      </el-col>
      <el-col :span="2" class="text-center">
        <span class="text-gray-500">-</span>
      </el-col>
      <el-col :span="11">
        <el-time-picker
          v-model="form.date2"
          placeholder="Pick a time"
          style="width: 100%"
        />
      </el-col>
    </el-form-item>
    <el-form-item label="Instant delivery">
      <el-switch v-model="form.delivery" />
    </el-form-item>
    <el-form-item label="Activity type">
      <el-checkbox-group v-model="form.type">
        <el-checkbox value="Online activities" name="type">
          Online activities
        </el-checkbox>
        <el-checkbox value="Promotion activities" name="type">
          Promotion activities
        </el-checkbox>
        <el-checkbox value="Offline activities" name="type">
          Offline activities
        </el-checkbox>
        <el-checkbox value="Simple brand exposure" name="type">
          Simple brand exposure
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="Resources">
      <el-radio-group v-model="form.resource">
        <el-radio value="Sponsor">Sponsor</el-radio>
        <el-radio value="Venue">Venue</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Activity form">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button>Cancel</el-button>
    </el-form-item> -->
  </el-form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import OptionArea from "./component/OptionArea.vue";
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
});

const handleSelectArea = (e: any, item: any) => {
  props.formModel.value[item.regionProvinceCode] = e[0];
  props.formModel.value[item.regionCityCode] = e[1];
  props.formModel.value[item.regionCountyCode] = e[2];
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
