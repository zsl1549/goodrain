import { queryTitle, queryLogo, queryEnterprice, queryEdit, queryNotification, queryDeleteNofic, addNotice, editNotice} from '@/services/geographic';

export default {
    namespace: 'platformSetting',
    state: {
        
    },
    effects:{
        *getTitle({callback}, { call }) {
            const response = yield call(queryTitle);
            if (callback) {
              callback(response&&response.data);
            }
          },
          *getLogo({callback}, {call}) {
              const response = yield call(queryLogo);
              if(callback){
                  callback(response&&response.data);
              }
          },
          *getEnterprice({callback}, { call }){
              const response = yield call(queryEnterprice);
              if(callback){
                  callback(response&&response.data)
              }
          },
          *editTitle({payload,callback},{ call }){
            const response = yield call(queryEdit,payload);
            if(callback){
                callback(response)
            }
          },
          *notification({payload,callback}, { call }){
              const response = yield call(queryNotification,payload);
              if(callback){
                  callback(response&&response.data)
              }
          },
          *delNotification({payload,callback},{call}){
              const response = yield call(queryDeleteNofic,payload);
              if(callback){
                  callback(response);
              }
          },
          *addNotice({payload,callback},{call}){
              const response = yield call(addNotice,payload);
              if(callback){
                  callback(response);
              }
          },
          *updateNotice({payload,callback}, { call }){
                const response = yield call(editNotice,payload);
                if(callback){
                    callback(response)
                }
          }
    },
    reducers: {
    },
}
