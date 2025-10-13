import { defineStore } from "pinia";

export const useMenuStore = defineStore("menu", {
  state: () => {
    return {
      menuList: [],
    };
  },
  actions: {
    setMenuList(menuList: any) {
      this.menuList = menuList;
    },
  },
});