import { requestApi } from "@/untils/requestApi";
import { baseServices } from "@/config/service";

export const getUserInfo = (params: any) => {
  return requestApi(baseServices.api + "/user", params);
};
