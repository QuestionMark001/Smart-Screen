/*
 * @Author: QuestionMark001
 * @Date: 2024-03-21 14:32:32
 * @LastEditors: QuestionMark001
 * @LastEditTime: 2024-03-21 18:48:03
 * @FilePath: \smart-screen-frontend\src\utils\request.js
 * @Description: axios请求
 * 
 * Copyright (c) 2024 by QuestionMark001, All Rights Reserved. 
 */

import axios from "axios";

// 创建 axios 实例
const instance = axios.create({
    baseURL: 'https://api.imooc-web.lgdsunday.club/api',
    timeout: 5000
});

// 使用创建出的实例添加请求拦截器（即：在发送请求之前进行的操作）
instance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 使用创建出的实例添加响应拦截器（即：在响应回来之后进行的操作）
instance.interceptors.response.use(
    (response) => {
        const { success, data, message } = response.data;
        if (success) {
            return data;
        } else {
            return Promise.reject(new Error(message));
        }
    }
);

export default instance;