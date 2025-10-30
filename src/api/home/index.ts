import { requestApi } from "@/untils/requestApi";
import { baseServices } from "@/config/service";

// 获取列表
export const getHomeData = (params: any) => {
  return requestApi(baseServices.api + "/home", params);
};

// 获取详情
export const getHomeDetailData = (params: any) => {
  return requestApi(baseServices.api + "/home/detail", params);
};
