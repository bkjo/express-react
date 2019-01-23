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
        bookAdd: async (title, author) => {
            return ApiService(await request('bookAdd/'+ title + '/' + author));
        },
        bookSelect: async (bookId) => {
            return ApiService(await request('bookSelect/'+ bookId));
        },
        bookUpdate: async (bookId ,title, author) => {
            return ApiService(await request('bookUpdate/' + bookId + '/' + title + '/' + author));
        },
        bookDelete: async (bookId) => {
            return ApiService(await request('bookDelete/'+ bookId));
        }
    };
};
export default API();
