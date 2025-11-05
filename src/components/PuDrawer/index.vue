<template>
  <el-drawer
    v-model="internalDrawer"
    :with-header="false"
    :direction="direction"
    :size="width"
  >
    <div class="draw-wrapper">
      <div class="header-wrapper">
        <slot name="header">
          <div class="header-icon">
            <el-icon
              :isIconBack="isIconBack"
              @click="cancelClick"
              color="#8c8c8c"
              size="20"
              ><Close
            /></el-icon>
          </div>
          <div class="title">{{ title }}</div>
        </slot>
      </div>
      <div class="middle-wrapper">
        <div class="content-wrapper">
          <el-scrollbar height="100%">
            <slot name="content"></slot>
          </el-scrollbar>
        </div>
      </div>
      <div class="footer-wrapper">
        <slot name="footer">
          <el-button @click="cancelClick">
            {{ t("base.drawer.back") }}
          </el-button>
        </slot>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

defineOptions({
  name: "PuDrawer",
});

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  direction: {
    type: String,
    default: "rtl",
  },
  width: {
    type: String,
    default: "85%",
  },
  title: {
    type: String,
    default: "",
  },
  isIconBack: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:visible"]);
const internalDrawer = ref(props.visible);

watch(
  () => props.visible,
  (newVal) => {
    internalDrawer.value = newVal;
  }
);

const cancelClick = () => {
  internalDrawer.value = false;
  emit("update:visible", false);
};
</script>
<style>
.el-drawer__body {
  padding: 0 !important;
}
</style>
<style scoped>
.draw-wrapper {
  height: 100vh;
}

.header-icon {
  margin-top: 5px;
}
.header-wrapper {
  display: flex;
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
  gap: 5px;
  font-size: 14px;
  color: #333;
}
.middle-wrapper {
  background-color: #f5f5f5;
  height: calc(100% - 100px);
  padding: 10px;
}

.content-wrapper {
  height: 100%;
  overflow-y: auto;
}

.footer-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  box-shadow: 0 0 30px 0 rgba(173, 172, 172, 0.1);
}
</style>
