<template>
  <div>
    <PuForm :columns="formColumns" :formModel="formModel"></PuForm>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { reactive } from "vue";

import { formColumns } from "./component/columns";
const formModel = reactive({});
</script>

<style lang="scss" scoped></style>
