import { requestAllTeam, requestTeam, requestEid,toCreatRegionCenter,queryDelTeam} from '@/services/teamManage';
import { request } from 'http';

export default {
  namespace: 'teamManage',
  state: {

  },
  effects:{
    *searchAllTeam({ payload, callback }, { call }){
        const response = yield call(requestAllTeam, payload);
        if (callback) {
            callback(response&&response.data);
          }
    },
    *searchTeam({payload,callback},{call}){
      const response = yield call(requestTeam, payload);
      if(callback){
        callback(response&&response.data);
      }
    },
    *queryEid({callback},{call}){
      const response = yield call(requestEid);
      if(callback){
        callback(response&&response.data)
      }
    },
    *createTeam({payload,callback},{call}){
      const response = yield call(toCreatRegionCenter,payload);
      if(callback){
        callback(response)
      }
    },
    *deleteTeam({payload,callback},{call}){
      const response = yield call(queryDelTeam,payload);
      if(callback){
        callback(response);
      }
    }
  },
  reducers: {

  },
}