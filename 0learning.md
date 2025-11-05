# 如何去除原始的边距等

```css
/*  这里不加scope ，全局样式会作用在 App 根容器内*/
/* App 全局样式 - 去除默认边距 + 统一盒模型 */
* {
  margin: 0;
  padding: 0;
  /* 关键：盒模型重置，width/height 包含 padding 和 border，避免边距计算错乱 */
  box-sizing: border-box;
}

/* 单独强化 body 样式（App 根容器常用） */
body {
  margin: 0;
  padding: 0;
  /* 避免 body 自带滚动条（如需滚动，在具体容器内控制） */
  overflow-x: hidden;
  /* 基础字体/背景（可根据 App 设计调整） */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background-color: #f5f5f5; /* 常见 App 背景色，可删 */
}

/* 清除列表默认样式（如 ul/ol 自带的缩进和点） */
ul,
ol,
li {
  list-style: none; /* 去掉列表前的点/数字 */
  margin: 0;
  padding: 0;
}

/* 清除表单元素默认边距（如 input/button/select） */
input,
button,
select,
textarea {
  margin: 0;
  padding: 0;
  /* 清除 input 自带边框（如需自定义边框，后续单独加） */
  border: none;
  outline: none; /* 清除点击输入框的默认高亮边框 */
  background: transparent; /* 清除默认背景，方便自定义 */
}

/* 清除图片默认边距和对齐问题 */
img {
  margin: 0;
  padding: 0;
  /* 图片自适应容器，避免溢出 */
  max-width: 100%;
  height: auto;
  /* 解决图片与文字垂直对齐偏差 */
  vertical-align: middle;
}

/* 清除块级元素默认边距（如 p/div/h 标签） */
p,
h1,
h2,
h3,
h4,
h5,
h6,
div {
  margin: 0;
  padding: 0;
}
```

## 高度宽度合理占据整个页面

```css
/* 高度 */
.heightbox {
  height: 100vh;
  /* 如果高度上有一个模块可以使用cacl 进行计算 */
  /* 50px 为已经被使用去的高度 */
  height: calc(100vh - 50px);
}
/* 宽度 */
.widthbox {
  /* 不会超出宽度刚好占据整个页面 */
  flex: 1; /* 宽度自适应 */
  wiidth: 100%; /* 宽度100% */
}
```

## 路由内容边距的样式（右边怎么设置都没有 padding）

## 图标全局引入统一管理

1. ? 在 until 中配置图标

```ts
import { House, Grid, User, Document } from "@element-plus/icons-vue";
// 根据所需导入

export const routerIcon = {
  House,
  Grid,
  User,
  Document,
};

export const AllIcons = {
  ...routerIcon,
};
```

1. 在 main.ts 中全局引入

```ts
Object.entries(AllIcons).forEach(([iconName, IconComponent]) => {
  app.component(iconName, IconComponent);
});
```

1. 备注
   Object.entries() s 函数将一个对象转为[key, value] 数组，然后 reduce() 函数将数组缩减为单个值。

app.component() 函数接受两个参数：组件的注册名称和组件本身。
这里表示全局注册组件

# 国际化语言

```t
src/
└── i18n
| └──locales/
| └── zh-CN/ # 中文语言包
| │ └── test.json # 业务模块翻译
| │ └── index.json # 暴露全部的 json
| └── en/ # 英文语言包
| | └── test.json
| | └── index.json # 暴露全部的 json
| └──index.ts # 国际化配置
| └──use-locale.ts # 监听引入组件（按需求引入）
└──main.ts # 入口文件配置
```

use-locale ：watch 监听到改变本地的语言就要进行转换语言

# 导航顶部页签

1. 样式问题：左边的页签存放宽度
   100%-左侧导航栏宽度-右侧工具宽度

1. dom：tags ＋ scroll

1. 技术栈：pinia（存状态）+ router

步骤
1、初始化时全部删除，存储当前这个页面的标签
2、点击标签的时候判断是不是 directive 和本页面路径，如果不是再添加到本地
3、删除标签的时候，也要删除本地的存储（重新保存一遍）

# 如何封装公共组件

## 方法一

主要涉及：
1、props（父传子）、emit（子传父）、slots（插槽）
（1）props 跳转： this.$props.name
（2）emit跳转： this.$emit('click', '参数')
父组件监听：<child @click="handleClick" />

组件绑定了数据的时候，要实现组件双向绑定:
1、子组件：
接收父组件的数据 props
绑定数据 v-model
传递数据 emit 通过事件通知父组件执行函数（这里用于将子组件的数据传递给父组件，父组件进行数据改变）
watch 监听父组件传递过来的数据改变，改变子组件的数据
2、父组件：
emit:接收子组件通知和数据，进行数据的更改
绑定数据

案例
1、父组件

```html
<Parent
  @update:sonChange="Parentvalue = $event"
  :Parentvalue="parentValue
  />
```

2、子组件

```html
<Child @update:model-value="sonChange" :model-value="sonvalue" />
```

```js
// 父组件接收值
const props = defineProps({
  parentValue: { type: any, default: "" },
});

// 值改变的时候发送事件
const sonChange = () => {
  emit("update:sonChange", sonvalue.value);
};

// 监听父组件的值改变
watch(
  () => props.parentValue,
  (newValue) => {}
);
```

## 方法二（优化）使用 v-model 无需重新定义

关键：父组件定义 v-model:parent-data="parentvalue"
子组件定义：model-value="parentvalue"
子组件监听：@update:model-value="handleChange"
子组件事件义：handleChange(value)

在 template 中都是用-模式，js 中使用驼峰写法

备注：emit 类型安全的定义
const emit= defineEmits<{ (e: 'update:modelValue', value: any): void }>

1、父组件

```vue
<Parent v-model:parent-data="parentvalue" />
```

这里必须写成顶 v-model:parent-data="parentvalue" =》 parent-data 转换为 parentData

2、子组件

```vue
<Child :model-value="parentvalue" @update:model-value="handleChange" />
```

```js
const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>();

const handleChange = (value: any) => {
  emit('update:modelValue', value)
}
```

<!-- 解析代码 -->

```js
const emit = defineEmits<{
(e: "update:areaValue", value: any): void;
}>();

// 简写
// const emit = defineEmits(["update:areaValue"]); 不够安全

// defineEmits 是 Vue 3 的编译宏函数
// <T> 是 TypeScript 泛型语法，用来指定类型参数
// 这里的 T 就是 { (e: "update:areaValue", value: any): void; }

// 描述了一个函数的参数和返回值类型
// e: "update:areaValue" - 第一个参数名为 e，类型是字面量类型 "update:areaValue"
// value: any - 第二个参数名为 value，类型是 any
// : void - 函数没有返回值
```

# 地址插件

1、安装：npm install element-china-area-data -S
2、使用：
参考 src\components\PuSearch\components\OptionArea.vue

# 数据是 Promise 格式，取出要在前面加 await

# 搜索（选择[键]＋输入框[值]）组合框

设置选择为键 forModel.value['选择的 value']=空
将这个 value 绑定到输入框的 v-model.trim="forModel.value['输入框的 value']"

# 前端动态导入（import.meta.glob）

# tailwindcss 类名样式

https://tailwindcss.com/docs/installation/using-vite

当使用的时候不生效可能被其他给覆盖在元素之前加! 表示 important

# 自定义类名样式 less

> 安装 less：npm install less less-loader --save-dev

> 配置：import { defineConfig } from 'vite'

export default defineConfig({
css: {
preprocessorOptions: {
less: {
// 可选：配置 Less 全局变量或插件
javascriptEnabled: true, // 允许 Less 中使用 JS 表达式（如需）
},
},
},
})

引入

> 1、@import '../less/common.less';
> 2、// src/main.ts
> import './assets/less/common.less'; // 导入 Less 文件

# ts

1、嵌套定义两层=>
定义一个类型： // loadingHandler?:() => () => void | undefined,

```ts
// 案例：这里两层:() => 为了给return 一个方法
const goodLoadingHandler = () => {
  // 1. 显示加载动画
  const loading = ElLoading.service({ text: "加载中..." });
  // 2. 返回一个函数（不立即执行 close）
  return () => loading.close(); // ✅ 正确
};

// 如果这里是return loading.close() 就会直接返回函数，不会等待 loading.close() 执行完毕，最终结果是 undefined
```

# 属性穿透 $attrs

使用穿透 <child v-bind="$attrs" />
禁用穿透 <child v-bind="{ ...$attrs, disabled: true }" />

# 区别:visible.sync="visible" 和 :visible="visible"

双向绑定

# 抽屉公共组件实现

1、父组件：要设置初始值，返回子组件的事件时候改变值
2、子组件：监听父组件传递的参数，改变自身数据。关闭时传递事件通知父组件改变值
以此实现双向绑定

# 封装公共组件自定义插槽

子组件中添加：<slot name="title"></slot>
父组件中添加：
<template v-slot:title>自定义插槽</template>
<slot name="title"></slot>

# 锚点滚动

1、ref：Vue 内置，负责 “找到 DOM”（定位）；
2、scrollIntoView ()：浏览器内置，负责 “滚动到 DOM”（执行）。

.scrollIntoView() 浏览器原生 DOM 方法（W3C 标准 API），作用是让当前 DOM 元素滚动到视口内

<div ref="div" @click="scrollToDiv">跳转</div>

<script setup>
  import { ref } from 'vue'
  const div = ref(null)
  const scrollToDiv = () => {
    div.value.scrollIntoView()
    div.value.scrollIntoView({ behavior: 'smooth' })
    div.value.scrollIntoView({ block: 'start', behavior: 'smooth' })
    div.value.scrollIntoView({ block: 'center', behavior: 'smooth' })
}
</script>

# style

## box-shadow

box-shadow: 0 0 12px 5px rgba(129, 127, 127, 0.1);
对应表示：水平偏移 → 垂直偏移 → 模糊半径 → 扩散半径

## 固定页面实现居中

.page-wrapper {
position: fixed;
right: 10px;
z-index: 9999;
top: 50%;
transform: translateY(-50%); // 自身向上偏移，实现完美居中
}
