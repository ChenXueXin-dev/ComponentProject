<template>
  <div>
    {{ formModel }}
    <PuForm
      :columns="formColumns"
      :formModel="formModel"
      :width="'400px'"
      :showSubmitBtn="true"
      @cancel="onCancel"
      @submit="onSubmit"
    ></PuForm>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { reactive } from "vue";

import { formColumns } from "./component/columns";
const formModel = reactive({});

const onSubmit = () => {
  console.log("onSubmit", formModel);
};

const onCancel = () => {
  console.log("onCancel", formModel);
};
</script>

<style lang="scss" scoped></style>
