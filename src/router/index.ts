import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

// 扩展路由元信息类型
declare module "vue-router" {
  interface RouteMeta {
    title?: string; //菜单标题
    icon?: string; //菜单图标
    hidden?: boolean; // 是否在菜单中隐藏
  }
}
export const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    component: () => import("@/views/Login/index.vue"),
    meta: { hidden: true, title: "" },
  },
  {
    path: "/",
    component: () => import("@/layout/index.vue"),
    redirect: "/home",
    meta: { hidden: true, title: "layout" },
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("@/views/Home/index.vue"),
        meta: {
          icon: "House",
          titleKey: "base.router.home",
        },
      },
      {
        path: "/home1",
        name: "Home1",
        redirect: "/home1/test1",
        meta: {
          icon: "Grid",
          titleKey: "base.router.order",
        },
        children: [
          {
            path: "/test1",
            name: "Hometest1",
            component: () => import("@/views/Home/test1/index.vue"),
            meta: {
              titleKey: "base.router.outboundOrder",
            },
          },
          {
            path: "/test2",
            name: "Hometest2",
            component: () => import("@/views/Home/test2/index.vue"),
            meta: {
              titleKey: "base.router.preOrder",
            },
          },
        ],
      },
      {
        path: "/home2",
        name: "Home2",
        component: () => import("@/views/Home2/index.vue"),
        meta: {
          icon: "User",
          titleKey: "base.router.stock",
        },
      },
      {
        path: "/home3",
        name: "Home3",
        component: () => import("@/views/Home3/index.vue"),
        meta: {
          icon: "Document",
          titleKey: "base.router.system",
        },
      },
      {
        path: "/home4",
        name: "Home4",
        component: () => import("@/views/Home4/index.vue"),
        meta: {
          icon: "Document",
          titleKey: "base.router.bill",
        },
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
