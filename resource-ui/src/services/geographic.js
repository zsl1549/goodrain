import request from '@/utils/request';
import apiconfig from "../../config/api.config";

export async function queryTitle() {
  return request(`${apiconfig.baseUrl}/backend/v1/config/title`);
}

export async function queryLogo() {
  return request(`${apiconfig.baseUrl}/backend/v1/config/logo`);
}

export async function queryEnterprice() {
  return request(`${apiconfig.baseUrl}/backend/v1/config/enterprise`);
}

//修改title
export async function queryEdit(params) {
  return request(`${apiconfig.baseUrl}/backend/v1/config/title`,{
    method:"PUT",
    body:{
      title:params.title,
      enterprise_alias:params.enterprice
    }
  });
}

export async function queryNotification(params) {
  return request(`${apiconfig.baseUrl}/backend/v1/announcement`,{
    method:"GET",
    params:{
      page_size:params.page_size,
      page_num:params.page_num
    }
  });
} 

export async function queryDeleteNofic(params) {
  return request(`${apiconfig.baseUrl}/backend/v1/announcement/${params.announcement_id}`,{
    method:'DELETE'
  });
}

export async function addNotice(params) {
  return request(`${apiconfig.baseUrl}/backend/v1/announcement`,{
    method:'POST',
    body:{
      content: params.content,
      title: params.title,
      level: params.level,
      a_tag_url: params.a_tag_url,
      active: params.active
    }
  });
}

export async function editNotice(params) {
  return request(`${apiconfig.baseUrl}/backend/v1/announcement/${params.announcement_id}`,{
    method:'PUT',
    body:{
      content: params.content,
      title: params.title,
      level: params.level,
      a_tag_url: params.a_tag_url,
      active: params.active
    }
  });
}