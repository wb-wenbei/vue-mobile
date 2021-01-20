/*健康上报api*/
import http from "@/server/http.js";

//列表（分页）
export const pageAPI = params => {
  return http({
    url: "/api-customer/account/loginRecord/get",
    method: "GET",
    params
  });
};

//上报
export const reportAPI = data => {
  return http({
    url: "/api-customer/account/loginRecord/get",
    method: "POST",
    data
  });
};
