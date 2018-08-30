import {Config} from '../util';

import ApiService from './apiService';

const request = async req => {
    const res = await Config();
    return await res.wsurl + req;
}
const API = () => {
    return {
        bookList: async () => {
           return ApiService(await request('bookList'));
        },
    };
};
export default API();
