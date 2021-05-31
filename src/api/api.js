import { request } from '@/util/request'
const api =[
	{url:'http://127.0.0.5/api'}, //测试
	{url:''}, //正式
]
const index = 0;  //0测试 1正式
const url = api[index].url;

export default{		
	addpage:params => request(url + '/addpage',params), //添加页面
}