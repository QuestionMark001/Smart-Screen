<!--
 * @Author: QuestionMark001
 * @Date: 2024-03-20 12:01:06
 * @LastEditors: QuestionMark001
 * @LastEditTime: 2024-04-01 14:59:36
 * @FilePath: \smart-screen-frontend\src\App.vue
 * @Description: 大屏主组件
 * 
 * Copyright (c) 2024 by QuestionMark001, All Rights Reserved. 
-->

<template>
    <div class="bg-[url('assets/imgs/bg.jpg')] overflow-hidden bg-cover bg-center h-screen p-2 flex text-white"
    v-if="data">
        <!-- 左 -->
        <div class="flex-1 mr-2 p-3 bg-slate-800/70 rounded-lg flex flex-col">
            <RegionInfo class="h-1/3 pb-4 box-border" :data="data.regionData" />
            <RadarChart class="h-1/3 pb-4 box-border" :data="data.riskData" />
            <RelationChart class="h-1/3 box-border" :data="data.relationData" />
        </div>

        <!-- 中 -->
        <div class="w-1/2 bg-slate-800/70 rounded-lg flex flex-col">
            <TotalData class="p-3" :data="data.totalData"/>
            <MapChart class="mt-2 p-3 flex-1" :data="data.mapData" />
        </div>

        <!-- 右 -->
        <div class="flex-1 ml-2 p-3 bg-slate-800/70 rounded-lg flex flex-col">
            <VerticalBarChart class="h-1/3 pb-4 box-border"  :data="data.serverData" />
            <RadialBarChart class="h-1/3 pb-4 box-border" :data="data.abnormalData" />
            <WordCloud class="h-1/3 box-border" :data="data.wordCloudData" />
        </div>
    </div>
</template>
<script setup>
import MapChart from './components/MapChart.vue';
import RadarChart from './components/RadarChart.vue';
import RadialBarChart from './components/RadialBarChart.vue';
import RegionInfo from './components/RegionInfo.vue';
import RelationChart from './components/RelationChart.vue';
import TotalData from './components/TotalData.vue';
import VerticalBarChart from './components/VerticalBarChart.vue';
import WordCloud from './components/WordCloud.vue';

import { ref } from 'vue';
import { getVisualization } from './api/visualization.js';

const data = ref();
const loadData = async () => {
    data.value = await getVisualization();
    // console.log(data.value);
};
loadData();

setInterval(() => {
    loadData();
}, 3000);
</script>
<style>
    
</style>