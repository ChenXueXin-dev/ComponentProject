<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      mode="default"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      @onChange="valueChange"
      mode="default"
      @onCreated="handleCreated"
    />
  </div>
</template>

<script setup>
defineOptions({
  name: "PuMdEditor",
});
import "@wangeditor/editor/dist/css/style.css";

import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { DomEditor } from "@wangeditor/editor";
const editorRef = shallowRef();
const props = defineProps({
  defaultvalue: {
    type: String,
    default: "",
  },
});

// 模拟 ajax 异步获取内容
onMounted(() => {});

const toolbarConfig = {
  excludeKeys: ["emotion", "group-video", "codeBlock"],
};

function valueChange(editor) {
  const html = editor.getHtml();
  const text = editor.getText();
  console.info("html", html);
  console.info("text", text);
}
const editorConfig = { placeholder: "请输入内容...", MENU_CONF: {} };
editorConfig.MENU_CONF["uploadImage"] = {
  // 自定义上传
  // async customUpload(file: File, insertFn: InsertFnType) {  // TS 语法
  async customUpload(file, insertFn) {
    // JS 语法
    // file 即选中的文件
    // 自己实现上传，并得到图片 url alt href
    // 最后插入图片
    insertFn(
      "https://image.psvmc.cn/blog/20240803130641.png",
      "",
      "https://image.psvmc.cn/blog/20240803130641.png"
    );
  },
};

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
</script>

<style scoped lang="less"></style>
