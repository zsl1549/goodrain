import { 
  queryAllRegions, 
  queryRegionInfo, 
  queryRegionResource,
  setRegionStatus,
  deleteRegion,
  setRegionInfo,
  addRegionInfo,
  getRegionServiceHealth
} from '@/services/regioncluster';
 
export default {
  namespace: 'region',

  state: {
    regions: [],
  },

  effects: {
    *fetchRegionList({callback}, { call, put }) {
      const response = yield call(queryAllRegions);
      if (response) {
        yield put({
          type: 'saveRegions',
          payload: response.data.list,
        });
      }
      if (callback && response){
        callback(response.data.list)
      }
    },
    *fetchRegionInfo({payload, callback}, { call }) {
        const response = yield call(queryRegionInfo, payload);
        if (callback && response) {
            callback(response.data.bean)
        }
    },
    *fetchRegionResource({payload, callback}, { call }) {
      const response = yield call(queryRegionResource, payload);
      if (callback && response) {
          callback(response)
      }
    },
    *setRegionStatus({payload, callback}, { call }) {
      const response = yield call(setRegionStatus, payload);
      if (callback && response) {
          callback(response)
      }
    },
    *deleteRegion({payload, callback}, { call }) {
      const response = yield call(deleteRegion, payload);
      if (callback && response) {
          callback(response)
      }
    },
    *setRegionInfo({payload, callback}, { call }) {
      const response = yield call(setRegionInfo, payload);
      if (callback && response) {
          callback(response)
      }
    },
    *addRegionInfo({payload, callback}, { call }) {
      const response = yield call(addRegionInfo, payload);
      if (callback && response) {
          callback(response)
      }
    },
    *getRegionServiceHealth({payload, callback}, { call }) {
      const response = yield call(getRegionServiceHealth, payload);
      if (callback && response) {
          callback(response)
      }
    },
  },

  reducers: {
    saveRegions(state, { payload }) {
      return {
        ...state,
        regions: payload,
      };
    },
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
};
