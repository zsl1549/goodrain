import { routerRedux } from 'dva/router'
import { query as queryUsers, queryCurrent, queryAllUser ,userRegister, userAccountLogin } from '@/services/user';
import { reloadAuthorized } from '@/utils/Authorized';
import { stringify } from 'qs';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *register({ payload, callback }, { call, put }) {
      const response = yield call(userRegister, payload);
      yield put({
        type: 'saveCurrentUser',
        payload:response,
      })
      if (callback){
         callback(response.data&&response.data.bean)
      }
    },
    *login({ payload, callback }, { call, put }) {
      const response = yield call(userAccountLogin, payload);
      yield put({
        type: 'saveCurrentUser',
        payload:response,
      })
      if (callback && response){
         callback(response)
      }
    },
    *logout(_, { put }) {
      reloadAuthorized("","");
      localStorage.clear();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    // getAllUserList get all users
    *getAllUserList({ payload, callback }, { call }) {
      const response = yield call(queryAllUser, payload);
      if (callback && response) {
        callback((response.data));
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
