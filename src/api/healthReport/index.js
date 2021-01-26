/*健康上报api*/
import http from "@/server/http.js";

//上报记录
export const pageAPI = params => {
  return http({
    url: "/api-customer/staff-care/questionnaire/getHistoryTitleOption",
    method: "GET",
    params
  });
};

//获取题目
export const getQuestionnaireAPI = params => {
  return http({
    url: "/api-customer/staff-care/questionnaire/getQuestionnaire",
    method: "GET",
    params
  });
};

//健康上报
export const submitQuestionnaireAPI = data => {
  return http({
    url: "/api-customer/staff-care/questionnaire/submitQuestionnaire",
    method: "POST",
    data
  });
};
