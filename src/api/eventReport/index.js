/*健康上报api*/
import http from "@/server/http.js";

// 上报问题
export const reportIssueAPI = data => {
  return http({
    url: "/api-customer/location/issue/report",
    method: "POST",
    data
  });
};

// 查询问题类型
export const getIssuesTypesAPI = params => {
  return http({
    url: "/api-customer/location/issueClassifys",
    method: "GET",
    params
  });
};

//  查询待处理的问题
export const getIssuesToHandleAPI = params => {
  return http({
    url: "/api-customer/location/issues/search",
    method: "GET",
    params
  });
};
