import request from '@/utils/request';
import apiconfig from "../../config/api.config";

export async function userAccountLogin(params) {
  return request(`${apiconfig.baseUrl}/backend/account/login`, {
    method: 'POST',
    body: params,
  });
}

export async function userRegister(params) {
  return request(`${apiconfig.baseUrl}/backend/account/register`, {
    method: 'POST',
    body: params,
  });
}

export async function queryCurrent() {
  // return request('/api/currentUser');
  const response = {};
  response.username = localStorage.getItem('username');
  response.token = localStorage.getItem('token');
  return response;
}

/** 检测用户是否初始化 */
export async function queryIsInit() {
  return request(`${apiconfig.baseUrl}/backend/account/is-init`);
}

/* 模糊搜索所匹配的团队*/
export async function searchMachedTenant(params){
  return request(`${apiconfig.baseUrl}/backend/v1/tenants/query`,{
    method:"GET",
    params:{
      tenant_alias: params.tenant
    }
  });
}