import { requestApi } from "@/untils/requestApi";
import { baseServices } from "@/config/service";

export const getHomeData = (params: any) => {
  return requestApi(baseServices.api + "/home", params);
};
