import request from '@/utils/request';
import apiconfig from "../../config/api.config";

/** queryAllRegions query all region list */
export async function queryRegionNodeList(payload) {
    return request(`${apiconfig.baseUrl}/region-center/regions/${payload.regionID}/nodes`, {
      method: 'GET',
      params: payload.search_key?{search_key:payload.search_key}:{}
    });
}

export async function addRegionNode(payload) {
  return request(`${apiconfig.baseUrl}/region-center/regions/${payload.regionID}/nodes`, {
    method: 'POST',
    body: payload
  });
}

export async function queryRegionNodeInfo(payload) {
    return request(`${apiconfig.baseUrl}/region-center/regions/${payload.regionID}/nodes/${payload.nodeID}/details`, {
      method: 'GET',
    });
}

export async function setRegionNodeStatus(payload) {
  return request(`${apiconfig.baseUrl}/region-center/regions/${payload.regionID}/nodes/${payload.nodeID}/operate`, {
    method: 'POST',
    body: {
      action: payload.action
    }
  });
}