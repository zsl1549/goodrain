import request from '@/utils/request';
import apiconfig from '../../config/api.config';

/** queryAllRegions query all region list */
export async function queryAllRegions() {
  return request(`${apiconfig.baseUrl}/region-center/regions`, {
    method: 'GET',
  });
}
// queryRegionInfo query region info
export async function queryRegionInfo(body) {
  return request(`${apiconfig.baseUrl}/region-center/regions/${body.regionID}`, {
    method: 'GET',
  });
}
// queryRegionResource query region resource 
export async function queryRegionResource(body) {
  return request(`${apiconfig.baseUrl}/region-center/regions/${body.regionID}/resource`, {
    method: 'GET',
  });
}
// setRegionStatus set region status
export async function setRegionStatus(body) {
  return request(`${apiconfig.baseUrl}/region-center/regions/${body.regionID}/status`, {
    method: 'PUT',
    body: {
      action: body.action,
    },
  });
}
// deleteRegion delete region
export async function deleteRegion(body) {
  return request(`${apiconfig.baseUrl}/region-center/regions/${body.regionID}`, {
    method: 'DELETE'
  });
}
// setRegionInfo change region info
export async function setRegionInfo(body) {
  return request(`${apiconfig.baseUrl}/region-center/regions/${body.regionID}`, {
    method: 'PUT',
    body: {
      region_name: body.region_name,
      region_alias: body.region_alias,
      url: body.url,
      token: body.token,
      wsurl: body.wsurl,
      httpdomain: body.httpdomain,
      tcpdomain: body.tcpdomain,
      desc: body.desc,
      scope: body.scope,
      ssl_ca_cert: body.ssl_ca_cert,
    },
  });
}
// addRegionInfo add region
export async function addRegionInfo(body) {
  return request(`${apiconfig.baseUrl}/region-center/regions`, {
    method: 'POST',
    body: {
      region_name: body.region_name,
      region_alias: body.region_alias,
      url: body.url,
      token: body.token,
      wsurl: body.wsurl,
      httpdomain: body.httpdomain,
      tcpdomain: body.tcpdomain,
      desc: body.desc,
      scope: body.scope,
      ssl_ca_cert: body.ssl_ca_cert,
    },
  });
}

// addRegionInfo add region
export async function getRegionServiceHealth(body) {
  return request(`${apiconfig.baseUrl}/region-center/regions/${body.regionID}/all_service_health`, {
    method: 'GET',
  });
}
