<template>
  <div style="color:#409eff;'" @click="handleClick">
    {{ Text }}
  </div>
</template>
<script setup>
defineOptions({
  name: "MCopyList",
});
const props = defineProps({
  Text: {
    type: String,
    default: "",
  },

  color: {
    type: String,
    default: "#409eff",
  },
});

const emit = defineEmits(["handleClick"]);

const handleClick = () => {
  emit("handleClick");
};
</script>

<style lang="scss" scoped></style>
