import { queryIsInit, searchMachedTenant} from '@/services/user';
 
export default {
  namespace: 'global',

  state: {
    collapsed: false,
    notices: [],
    userNumber: null,
  },

  effects: {
    *fetchIsInit(_, { call, put }) {
      const response = yield call(queryIsInit);
      yield put({
        type: 'checkIsInit',
        payload: response.data.bean.is_account_init,
      });
    },
    *searchTenant({payload,callback}, { call, put }){
      const response = yield call(searchMachedTenant, payload);
      if(callback){
        callback(response && response.data)
      }
    }
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveNotices(state, { payload }) {
      return {
        ...state,
        notices: payload,
      };
    },
    saveClearedNotices(state, { payload }) {
      return {
        ...state,
        notices: state.notices.filter(item => item.type !== payload),
      };
    },
    checkIsInit(state, { payload }) {
      return {
        ...state,
        isInit: payload,
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
  saveUserNumber(state, { payload }) {
    return {
      ...state,
      userNumber: payload,
    };
  },
};
