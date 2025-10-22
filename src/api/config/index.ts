import { requestApi } from "@/untils/requestApi";
import { baseServices } from "@/config/service";

// 保存用户界面偏好设置
export function saveOrUpdate(params: any) {
  return requestApi(
    baseServices.api + "/userUiPreference/saveOrUpdate",
    params
  );
}
