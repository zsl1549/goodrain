import { queryAllConsoleUser, addConsoleUser, delConsoleUser,seekConsoleUser} from '@/services/consoleUsers';

export default {
  namespace: 'consoleuser',
  state: {
    
  },

  effects: {
    // getAllUserList get all users
    *getAllUserList({ payload, callback }, { call }) {
      const response = yield call(queryAllConsoleUser, payload);
      if (callback) {
        callback(response&&response.data);
      }
    },
    // add user
    *addUser({ payload, callback }, { call }){
      const response = yield call(addConsoleUser,payload);
      if(callback){
        callback(response);
      }
    },
    // delete user
    *deleteUser({ payload, callback }, { call }){
      const response = yield call(delConsoleUser,payload);
      if(callback){
        callback(response);
      }
    },
    *searchUser({ payload, callback }, { call }){
      const response = yield call(seekConsoleUser,payload);
      console.log(response)
      if(callback){
        callback(response && response.data);
      }
    },
  },
  reducers: {
  },
};
