<template>
  <el-drawer
    v-model="internalDrawer"
    title="I am the title"
    :with-header="false"
    @close="emit('update:visible', false)"
  >
    <span>Hi there!</span>
    <el-button @click="handleClose">Close</el-button>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

defineOptions({
  name: "PuDrawer",
});

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:visible"]);
const internalDrawer = ref(props.visible);

watch(
  () => props.visible,
  (newVal) => {
    internalDrawer.value = newVal;
    console.log("newVal", newVal);
  }
);

const handleClose = () => {
  internalDrawer.value = false;
  emit("update:visible", false);
};
</script>
