<template>
  <div>
    <div class="button-list" v-if="buttonList.length <= butCount">
      <template v-for="(butItem, index) in buttonList" :key="index">
        <!-- 类型：primary\success\warning\danger\info -->
        <el-link
          v-if="butItem.display !== false"
          :underline="false"
          :type="butItem.type || 'primary'"
          :disabled="butItem.disabled"
          @click="handleClick(butItem)"
          >{{ butItem.label }}</el-link
        >
        <el-divider
          v-if="index !== buttonList.length - 1 && butItem.display !== false"
          direction="vertical"
        />
      </template>
    </div>
    <div class="button-list" v-else>
      <template
        v-for="(butItem, index) in buttonList.slice(0, butCount - 1)"
        :key="index"
      >
        <el-link
          v-if="butItem.display !== false"
          :underline="false"
          :type="butItem.type || 'primary'"
          :disabled="butItem.disabled"
          @click="handleClick(butItem)"
          >{{ butItem.label }}</el-link
        >
        <el-divider
          v-if="index !== buttonList.length - 1 && butItem.display !== false"
          direction="vertical"
        />
      </template>
      <el-dropdown>
        <el-link type="primary" underline="false">
          更多
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </el-link>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="(butItem, index) in buttonList.slice(butCount - 1)"
              :key="index + butCount - 1"
              :command="butItem"
              :disabled="butItem.disabled"
            >
              <el-link
                :underline="false"
                :type="butItem.type || 'primary'"
                :disabled="butItem.disabled"
                @click="handleClick(butItem)"
                >{{ butItem.label }}</el-link
              >
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

// 定义按钮的类型
interface ButtonItem {
  label: string;
  type?: string;
  size?: string;
  disabled?: boolean;
  display?: boolean;
  onClick?: () => void;
}

const props = defineProps({
  butlist: {
    type: Array<ButtonItem>,
    default: () => [],
  },
  butCount: {
    type: Number,
    default: 3,
  },
});

// 将display的按钮过滤
const buttonList = computed(() => {
  return props.butlist.filter((item) => item.display !== false);
});

// 定义 emits （作为父组件统一处理）
const emit = defineEmits(["buttonClick"]);

// 处理按钮点击事件
const handleClick = (buttonItem: ButtonItem) => {
  if (buttonItem.onClick) {
    buttonItem.onClick();
  }
  emit("buttonClick", buttonItem);
};
</script>

<style lang="scss" scoped>
.button-list {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
