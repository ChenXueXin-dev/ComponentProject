import { requestApi } from "@/untils/requestApi";

export const getHomeData = (params: any) => {
  return requestApi("/api/home", params);
};
