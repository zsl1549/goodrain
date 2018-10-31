import { 
  queryRegionNodeList,
  queryRegionNodeInfo,
  setRegionNodeStatus,
  addRegionNode
 } from '@/services/nodes';
 
export default {
  namespace: 'node',

  state: {
    regions: [],
  },

  effects: {
    *fetchNodesList({payload, callback}, { call }) {
      const response = yield call(queryRegionNodeList, payload);
      if (callback && response){
        callback(response.data)
      }
    },
    *fetchNodeInfo({payload, callback}, { call }) {
        const response = yield call(queryRegionNodeInfo, payload);
        if (callback && response) {
            callback(response)
        }
    },
    *setNodeStatus({payload, callback}, { call }) {
      const response = yield call(setRegionNodeStatus, payload);
      if (callback && response) {
          callback(response.data.bean)
      }
    },
    *addNode({payload, callback}, { call }) {
      const response = yield call(addRegionNode, payload);
      if (callback && response) {
          callback(response)
      }  
    },
  },
  reducers: {
  },
  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
}
