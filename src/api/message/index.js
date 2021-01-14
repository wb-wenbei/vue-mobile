/*消息管理api*/
import http from "@/server/http.js";

//列表（分页）
export const pageAPI = params => {
  return http({
    url: "/api-customer/account/loginRecord/get",
    method: "GET",
    params
  });
};
