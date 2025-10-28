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
    component: () => import("@/views/login/index.vue"),
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
        component: () => import("@/views/home/index.vue"),
        meta: {
          icon: "House",
          titleKey: "base.router.home",
        },
      },
      {
        path: "/home/detail",
        name: "HomeDetail",
        component: () => import("@/views/home/detail/index.vue"),
        meta: {
          hidden: true,
          titleKey: "base.router.homeDetail",
        },
      },
      {
        path: "/order",
        name: "Order",
        redirect: "/order/outbound",
        meta: {
          icon: "Grid",
          titleKey: "base.router.order",
        },
        children: [
          {
            path: "outbound",
            name: "OutboundOrder",
            component: () => import("@/views/order/outbound.vue"),
            meta: {
              titleKey: "base.router.outboundOrder",
            },
          },
          {
            path: "inbound",
            name: "InboundOrder",
            component: () => import("@/views/order/inbound.vue"),
            meta: {
              titleKey: "base.router.inboundOrder",
            },
          },
        ],
      },
      {
        path: "/warehouse",
        name: "Warehouse",
        redirect: "/warehouse/inventory",
        meta: {
          icon: "Box",
          titleKey: "base.router.warehouseManagement",
        },
        children: [
          {
            path: "inventory",
            name: "Inventory",
            component: () => import("@/views/warehouse/inventory.vue"),
            meta: {
              titleKey: "base.router.inventory",
            },
          },
          {
            path: "location",
            name: "Location",
            component: () => import("@/views/warehouse/location.vue"),
            meta: {
              titleKey: "base.router.location",
            },
          },
        ],
      },
      {
        path: "/stock",
        name: "Stock",
        component: () => import("@/views/stock/index.vue"),
        meta: {
          icon: "User",
          titleKey: "base.router.stock",
        },
      },
      {
        path: "/document",
        name: "Document",
        component: () => import("@/views/document/index.vue"),
        meta: {
          icon: "Document",
          titleKey: "base.router.system",
        },
      },
      {
        path: "/bill",
        name: "Bill",
        component: () => import("@/views/bill/index.vue"),
        meta: {
          icon: "Money",
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

router.beforeEach(async (to, from, next) => {
  const { useUserStore } = await import("@/store/modules/user");
  const userStore = useUserStore();

  const res = await userStore.fetchUserInfo();
  next();
  console.log(res);
});

export default router;
