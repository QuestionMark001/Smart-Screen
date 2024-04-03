<!--
 * @Author: QuestionMark001
 * @Date: 2024-03-21 10:02:26
 * @LastEditors: QuestionMark001
 * @LastEditTime: 2024-04-01 15:48:28
 * @FilePath: \smart-screen-frontend\src\components\WordCloud.vue
 * @Description: 关键词云
 * 
 * Copyright (c) 2024 by QuestionMark001, All Rights Reserved. 
-->

<template>
    <div>
        <div class="font-semibold">| 关键词云</div>
        <div ref="target" class="w-full h-full"></div>
    </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue';
import * as echarts from 'echarts';
import 'echarts-wordcloud'; // 引入 echarts-wordcloud

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
});

// 使用 watch 监视数据变化
watch(() => props.data, () => renderChart());

// 初始化echarts实例
let myChart = null;
const target = ref(null);
onMounted(() => { // 在 已挂载（挂载后） 阶段初始化echarts实例
    myChart = echarts.init(target.value);
    renderChart(); // 渲染echarts
});

// 渲染图表函数
const renderChart = () => {
    // 指定图表的options配置
    // 标注使用VSCode插件：Echarts Enhanced Completion
    /** @type EChartsOption */
    const options = {
        series: [
            {
                type: 'wordCloud',           // 指定图表类型为 wordCloud
                // 指定用到的数据
                data: props.data.datas.map((item) => ({
                    name: item.name,
                    value: item.value
                })),
                sizeRange: [16, 39],         // 词云字体大小范围配置
                rotationRange: [0, 0],       // 词云字体旋转角度配置，默认不旋转
                layoutAnimation: true,       // 设置过渡动画
                textStyle: {
                    color: randomColor       // 设置文字随机颜色
                },
                // 鼠标移入某项词云后的小动画
                emphasis: {
                    textStyle: {
                        color: '#fff',
                        fontWeight: 'bold'
                    }
                }
            }
        ],
    };

    // 通过 实例.setOption(options) 显示图表
    myChart.setOption(options);
}

// 随机颜色生成
const randomColor = () => {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;
};
</script>
<style>
</style>