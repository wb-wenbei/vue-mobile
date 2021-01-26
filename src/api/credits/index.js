/*积分管理api*/
import http from "@/server/http.js";

//列表（分页）
export const pageAPI = params => {
  return http({
    url: "/api-customer/staff-care/integral/getIntegralRecord",
    method: "GET",
    params
  });
};

//积分签到
export const signInAPI = data => {
  return http({
    method: "POST",
    url: "/api-customer/staff-care/integral/signIn",
    data
  });
};

//查询是否允许签到
export const allowSignInAPI = data => {
  return http({
    method: "POST",
    url: "/api-customer/staff-care/integral/allowSignIn",
    data
  });
};

//获取总积分，获取签到信息
export const getIntegralSumAPI = params => {
  return http({
    method: "GET",
    url: "/api-customer/staff-care/integral/getIntegralSum",
    params
  });
};

//积分兑换图片获取
export const getGoodsImgAPI = data => {
  return http({
    method: "POST",
    url: "/api-customer/staff-care/setting/getGoodsImg",
    data
  });
};
