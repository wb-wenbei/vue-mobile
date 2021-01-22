/*排班管理api*/
import http from "@/server/http.js";

// 获取当前职员下排班详情 (从当天开始)(v3版本）
export const workScheduleV3API = params => {
  return http({
    method: "GET",
    url: `/api-customer/sanitation-backend/work_schedule/v3/page`,
    params
  });
};
