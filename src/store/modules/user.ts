import { defineStore } from "pinia";

import { saveOrUpdate } from "@/api/config";
import { getUserInfo } from "@/api/user";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      userHabit: [],
      tablePageSize: 20 as number,
    };
  },
  getters: {
    getUserHabit: (state: any) => state.userHabit,
  },
  actions: {
    // 用户习惯的页数
    setUserHabit(key: any, desc: any, value: any) {
      saveOrUpdate({
        configKey: key,
        configDesc: desc,
        configValue: JSON.stringify(value),
      });
    },
    async fetchUserInfo() {
      console.log("fetchUserInfo");
      try {
        const userInfo = await getUserInfo({});
        if (userInfo?.data) {
          this.tablePageSize = Number(userInfo.data?.tablePageSize);
        }
        console.log("userInfo", userInfo);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
