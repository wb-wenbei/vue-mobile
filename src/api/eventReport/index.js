/*健康上报api*/
import http from "@/server/http.js";

//列表（分页）
export const pageAPI = params => {
  return http({
    url: "/api-customer/location/issues/search",
    method: "GET",
    params
  });
};
