<template>
  <div style="color:#409eff;'" @click="handleClick">
    {{ text }}
  </div>
</template>
<script setup>
defineOptions({
  name: "MCopyList",
});
const props = defineProps({
  text: {
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
