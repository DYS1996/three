import Axios from 'axios';

// DetailFetcher: 数据获取类
// @method fetch async: 异步函数获取data
//   @param url string: 需要访问的url
//   @return resp.data: axios 获取的返回数据
export default class DataFetcher {
    constructor() {}
    async fetch(url) {
        const resp = await Axios({
            method: 'GET',
            url: url,
        });
        return resp.data;
    }
}
