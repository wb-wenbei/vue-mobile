/*消息管理api*/
import http from "@/server/http.js";

//列表（分页）
export const pageAPI = params => {
  return http({
    url: "/api-customer/staff-care/article/queryArticle",
    method: "GET",
    params
  });
};

//公告已读
export const articleIsReadAPI = params => {
  return http({
    method: "GET",
    url: "/api-customer/staff-care/article/articleIsRead",
    params
  });
};
