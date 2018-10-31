import request from '@/utils/request';
import apiconfig from "../../config/api.config";

/** queryAllConsoleUser query all console users */
export async function queryAllConsoleUser(params) {
  return request(`${apiconfig.baseUrl}/backend/v1/users`, {
    method: 'GET',
    params: {
      page_num: params.pageNumber,
      page_size: params.pageSize,
    },
  });
}
export async function addConsoleUser(data){
  return request(`${apiconfig.baseUrl}/backend/v1/tenants/${data.tenant_name}/users`, {
    method: 'post',
    body: {
      tenant_name:data.tenant_name,
      user_name:data.user_name,
			email:data.email,
			password:data.password,
			re_password:data.password,
    },
  });
}

//单独删除用户
export async function delConsoleUser(params){
  return request(`${apiconfig.baseUrl}/backend/v1/tenants/test/users/${params.userId}`, {
    method: 'DELETE'
  });
}

//搜索用户
export async function seekConsoleUser(params){
  return request(`${apiconfig.baseUrl}/backend/v1/users`, {
    method: 'GET',
    params:{
      page_num:params.pageNumber || 1,
			page_size: params.pageSize || 25,
			user_name:params.tenant
    }
  });
}