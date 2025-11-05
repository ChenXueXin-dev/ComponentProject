<template>
  <div class="page-wrapper">
    <div class="open-wrapper" v-if="expandShow">
      <div class="anchor-wrapper">
        <div class="anchor-title">导航</div>
        <el-scrollbar max-height="250px">
          <div
            class="anchor-item"
            v-for="(item, index) in anchorList"
            :key="index"
            :class="{ anchorActive: index === selectIndex }"
            @click="scrollView(index, item)"
          >
            {{ item.name }}
          </div>
        </el-scrollbar>

        <div class="anchor-bottom">
          <div @click="closeexpand">
            <span> 收起 </span>
            <el-icon color="#fff" size="12"><DArrowRight /></el-icon>
          </div>
        </div>
      </div>
    </div>
    <div class="close-wrapper" v-else @click="openexpand">
      <el-icon color="#fff" size="15"><DArrowLeft /></el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineOptions({
  name: "PuAnchor",
});

const selectIndex = ref(0);
interface AnchorItem {
  title: string;
  name: string;
}

const props = defineProps({
  expand: {
    type: Boolean,
    default: true,
  },
  anchorList: {
    type: Array as () => AnchorItem[],
    default: () => [],
  },
});

const expandShow = ref(true);
const closeexpand = () => {
  expandShow.value = false;
};
const openexpand = () => {
  expandShow.value = true;
};

const scrollView = (index: number, item: any) => {
  selectIndex.value = index;
  item.ref?.value?.$el?.scrollIntoView({ behavior: "smooth", block: "start" });
};
</script>

<style scoped>
.open-wrapper {
  position: fixed;
  right: 20px;
  z-index: 9999;
  top: 50%;
  transform: translateY(-50%);
}
.anchor-wrapper {
  background-color: #fff;
  box-shadow: 0 0 12px 5px rgba(180, 221, 248, 0.336);
  border-radius: 40px;
}

.anchor-item {
  display: flex;
  align-items: center;
  color: #a1d0ff;
  height: 50px;
  margin: 0 10px;
  justify-content: center;
  border-bottom: 1px solid rgb(226, 238, 253);
}

.anchor-title {
  height: 40px;
  width: 80px;
  line-height: 40px;
  text-align: center;
  background: linear-gradient(to bottom, #a1d0ff, #d4eaff);
  color: #fff;
  border-radius: 80px 80px 0 0;
}
.anchor-bottom {
  height: 40px;
  width: 80px;
  line-height: 40px;
  padding: 0 0 0 27px;
  background: linear-gradient(to top, #a1d0ff, #d4eaff);
  color: #fff;
  border-radius: 0 0 100px 100px;
}
.close-wrapper {
  background-color: #a3d1ff;
  height: 30px;
  line-height: 34px;
  width: 20px;
  position: fixed;
  right: 0;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 15px 0 0 15px;
  z-index: 9999;
}

.anchorActive {
  color: #3398fd;
}
</style>
