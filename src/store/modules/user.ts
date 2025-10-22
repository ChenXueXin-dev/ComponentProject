import { defineStore } from "pinia";

import { saveOrUpdate } from "@/api/config";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      userHabit: [],
    };
  },
  getters: {
    getUserHabit: (state) => state.userHabit,
  },
  actions: {
    // 页数
    setUserHabit(key: any, desc: any, value: any) {
      saveOrUpdate({
        configKey: key,
        configDesc: desc,
        configValue: JSON.stringify(value),
      });
    },
  },
});
