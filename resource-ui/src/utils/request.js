import fetch from 'dva/fetch';
import { notification, message } from 'antd';
import hash from 'hash.js';
import router from 'umi/router'
import { isAntdPro } from './utils';
import { getUserToken } from './authority';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const checkStatus = response => {
  // const body = response.json()
  // console.log(body)
  // if (body && body.code!=="0000") {
  //   notification.error({
  //     message: body.msg_show,
  //     description: body.msg,
  //   });
  // }
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const errortext = codeMessage[response.status] || response.statusText;
  notification.error({
    message: `请求错误 ${response.status}: ${response.url}`,
    description: errortext,
  });
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
};

const cachedSave = (response, hashcode) => {
  /**
   * Clone a response data and store it in sessionStorage
   * Does not support data other than json, Cache only json
   */
  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.match(/application\/json/i)) {
    // All data is saved as text
    response
      .clone()
      .text()
      .then(content => {
        sessionStorage.setItem(hashcode, content);
        sessionStorage.setItem(`${hashcode}:timestamp`, Date.now());
      });
  }
  return response;
};
const noAuthPath = ["/backend/account/login", "/backend/account/register", "/backend/account/is-init"]
function isNotNeedAuth(url) {
   noAuthPath.map(item => {
     if (url.endsWith(item)){
       return true
     }
   })
   return false
}
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(
  apiurl,
  options = {
    expirys: isAntdPro(),
  }
) {
  /**
   * Produce fingerprints based on url and parameters
   * Maybe url has the same parameters
   */
  let url = apiurl
  const token = getUserToken()
  if (!token && !isNotNeedAuth(url)) {
     router.push("/user/login")
  }
  const userToken = `Token ${token}`;
  const fingerprint = url + (options.body ? JSON.stringify(options.body) : '')+(options.params ? JSON.stringify(options.params) : '');
  const hashcode = hash
    .sha256()
    .update(fingerprint)
    .digest('hex');
  const defaultOptions = {
    credentials: 'include',
  };
  if (options.params) {  
    const paramsArray = [];
    Object.keys(options.params).forEach(key => paramsArray.push(`${key  }=${ options.params[key]}`))  
    if (url.search(/\?/) === -1) {
      url += `?${  paramsArray.join('&')}`  
    } else {  
      url += `&${  paramsArray.join('&')}`  
    }
  }  
  const newOptions = { ...defaultOptions, ...options };  
  if (!(newOptions.body instanceof FormData)) {
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...newOptions.headers,
      Authorization: userToken,
    };
    newOptions.body = JSON.stringify(newOptions.body);
  } else {
    // newOptions.body is FormData
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': '"application/x-www-form-urlencoded;charset=utf-8"',
      ...newOptions.headers,
      Authorization: userToken,
    };
  }
  // const expirys = options.expirys || 60;
  // options.expirys !== false, return the cache,
  // if (options.expirys !== false) {
  //   const cached = sessionStorage.getItem(hashcode);
  //   const whenCached = sessionStorage.getItem(`${hashcode}:timestamp`);
  //   if (cached !== null && whenCached !== null) {
  //     const age = (Date.now() - whenCached) / 1000;
  //     if (age < expirys) {
  //       const response = new Response(new Blob([cached]));
  //       return response.json();
  //     }
  //     sessionStorage.removeItem(hashcode);
  //     sessionStorage.removeItem(`${hashcode}:timestamp`);
  //   }
  // }
  return fetch(url, newOptions)
    .then(checkStatus)
    // .then(response => cachedSave(response, hashcode))
    .then(response => {
      // DELETE and 204 do not return data by default
      // using .json will report an error.
      if (newOptions.method === 'DELETE' || response.status === 204) {
        return response.text();
      }
      return response.json();
    }).then(data =>{
       if (data.code !== "0000") {
        notification.error({
          message: data.msg_show,
          description: data.msg,
        });
       }
       return data
    })
    .catch(error => {
      try {
        if (error.response && error.response.msg_show){
          message.error(error.response.msg_show);
        }else{
          console.log(error.response)
        }
      } catch (e) {
        console.log(e)
      }
    });
}
