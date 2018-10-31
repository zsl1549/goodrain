import request from '@/utils/request';
import apiconfig from "../../config/api.config";

export async function requestAllTeam(params) {
    return request(`${apiconfig.baseUrl}/backend/v1/teams`,{
        method:"GET",
        params:{
            page_num:params.pageNumber,
            page_size:params.pageSize
        }
    })
}

export async function requestTeam(params){
    return request(`${apiconfig.baseUrl}/backend/v1/teams`,{
        method:"GET",
        params:{
            tenant_alias:params.tenant_alias
        }
    })
}

export async function requestEid(){
    return request(`${apiconfig.baseUrl}/backend/enterprise/`,{
        method:"GET"
    });
}
export async function toCreatRegionCenter(params){
    return request(`${apiconfig.baseUrl}/backend/v1/teams`,{
        method:"POST",
        body: {
            tenant_name:params.tenant_name,
            enterprise_id:params.enterprise_id,
            useable_regions:params.useable_regions,
          },
    });
}
export async function queryDelTeam(params){
    return request(`${apiconfig.baseUrl}/backend/v1/teams`,{
        method:"DELETE",
        body:{
            tenant_name:params.tenant_name
        }
    });
}
