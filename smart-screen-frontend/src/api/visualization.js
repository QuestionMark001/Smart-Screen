/*
 * @Author: QuestionMark001
 * @Date: 2024-03-21 14:46:33
 * @LastEditors: QuestionMark001
 * @LastEditTime: 2024-03-22 15:24:39
 * @FilePath: \smart-screen-frontend\src\api\visualization.js
 * @Description: 数据大屏接口对接
 * 
 * Copyright (c) 2024 by QuestionMark001, All Rights Reserved. 
 */

import request from '@/utils/request.js';

export const getVisualization = () => {
    return request({
        url: '/visualization'
    });
};

// 注：通过Apifox（或Postman）测试接口后得知，
// 本项目后台返回来的请求体大致如下：
// {
//     "success": true,
//     "code": 200,
//     "data": {
//         "regionData": {
//             "regions": [...]
//         },
//         "serverData": {
//             "servers": [...]
//         },
//         "riskData": {
//             "risks": [...]
//         },
//         "abnormalData": {
//             "abnormals": [...]
//         },
//         "relationData": {
//             "relations": [...]
//         },
//         "wordCloudData": {
//             "datas": [...]
//         },
//         "totalData": {...},
//         "mapData": {...}
//     },
//     "message": "数据获取成功"
// }