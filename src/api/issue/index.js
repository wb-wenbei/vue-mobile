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

// 根据Id删除市政设施
export const issueDetailAPI = params => {
  return http({
    url: `/api-customer/location/issues/among/${params.id}`,
    method: "GET"
  });
};

// 获取设施配置
export const getFacilityTypeAPI = params => {
  return http({
    url: "/api-customer/location/facility/types",
    method: "GET",
    params
  });
};

// 根据每种设施的数量
export const getFacilitiesCountAPI = params => {
  return http({
    url: "/api-customer/location/facilitiesCount",
    method: "GET",
    params
  });
};

// 获取组织结构
export const getAllOrgAPI = params => {
  return http({
    url: "/api-customer/organization/queryOwnOrganization",
    method: "GET",
    params
  });
};

// 图片上传
export const uploadImgAPI = data => {
  return http({
    url: "/api-customer/zuul/dig-construction/uploadFile",
    method: "POST",
    data
  });
};

// 根据类型查询设施的地理区域
export const getGpsAreasByTypeAPI = params => {
  return http({
    url: `/api-customer/location/facilities/type/${options.data.type}/gpsAreas`,
    method: "GET",
    params
  });
};

// 根据类型查询设施的地理区域
export const queryNearbyLabelsAPI = data => {
  return http({
    url: `/api-customer/location/queryNearbyLabels`,
    method: "POST",
    data
  });
};

export const queryEmployeesByOrgIdAPI = params => {
  return http({
    url: `/api-customer/entity/queryEmployeesByOrgId`,
    method: "GET",
    params
  });
};

export const querySanitationReportByEmployeeIdAPI = params => {
  return http({
    url: `/api-customer/querySanitationReportByEmployeeId`,
    method: "GET",
    params
  });
};

// 监督检查去处理

export const issueToHandleAPI = data => {
  return http({
    url: `api-customer/location/issue/handle`,
    method: "POST",
    data
  });
};

// 不能处理
export const notToHandleAPI = (options = {}) => {
  return http({
    url: `/api-customer/location/issue/unableHandle`,
    method: "POST",
    data: options.data
  });
};

// /issuePostpone/create创建延时申请
export const createIssuePostponeAPI = data => {
  return http({
    url: `/api-customer/location/issuePostpone/create`,
    method: "POST",
    data
  });
};

// /issuePostpone/list/page获取分页的延时申请信息
export const getIssuePostponePageAPI = params => {
  return http({
    url: `/api-customer/location/issuePostpone/list/page`,
    method: "GET",
    params
  });
};
