

import axios from 'axios';
import util from './util';
import qs from 'qs';
import { Loading,Message } from 'element-ui';

//请求超时时间
axios.defaults.timeout = 10000;
//post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//请求拦截器
axios.interceptors.request.use(config => {				
			config.data = qs.stringify(config.data);				
			return config
}, error => {
    return Promise.reject(error);
})

//响应拦截
axios.interceptors.response.use(response => { 
    return response
}, error => {
    Indicator.close();
    return Promise.reject(error)
})

/**
* 请求封装 
* params [l false 隐藏loading | q:{name:11} 参数 | m: get,post 请求方式]
* 
**/
export function request(url, _params={}) {
    let query   = {};
    var methods = 'get';
    let loading = true;
		let loadingInstance = null;
    if(typeof(_params.l)!='undefined'){ if(!_params.l){ loading = false; } }
    if(typeof(_params.q)!='undefined'){ query   = _params.q; }
    if(typeof(_params.m)!='undefined'){ methods = _params.m; }
    if(loading){ loadingInstance = Loading.service({fullscreen:false}); }   
    if(methods=="post"){
         return new Promise((resolve, reject) => {
           axios.post(url,query).then(res => {
						    if(res.data.code==0){
										Message.error(res.data.returnMsg);
										resolve(res.data);
								}else if(res.data.code == 100){                   
										if(loading){ loadingInstance.close(); }
										util.checkLogin();
								}else{    
										if(loading){loadingInstance.close();}
										resolve(res.data);
								}	
            })
            .catch(err => {
               if(loading){ loadingInstance.close(); }
               reject(err.data)
            })
       });
    }else{
       return new Promise((resolve, reject) => {
           axios.get(url,{params:query}).then(res => {
							if(res.data.code==0){
									Message.error(res.data.returnMsg);
									resolve(res.data);
							}else if(res.data.code == 100){                   
									//检测登录
									if(loading){ loadingInstance.close(); }
									util.checkLogin();
							}else{    
									if(loading){loadingInstance.close();}
									resolve(res.data);
							}
            })
            .catch(err => {   
                if(loading){ loadingInstance.close(); }
                reject(err.data)
            })
       });
   }
}

