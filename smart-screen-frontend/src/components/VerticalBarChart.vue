<!--
 * @Author: QuestionMark001
 * @Date: 2024-03-20 18:17:10
 * @LastEditors: QuestionMark001
 * @LastEditTime: 2024-03-25 16:51:44
 * @FilePath: \smart-screen-frontend\src\components\VerticalBarChart.vue
 * @Description: 服务资源占用比
 * 
 * Copyright (c) 2024 by QuestionMark001, All Rights Reserved. 
-->

<template>
    <div>
        <div class="font-semibold">| 服务资源占用比</div>
        <div ref="target" class="w-full h-full"></div>
    </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue';
import * as echarts from 'echarts';

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
        tooltip: {
            trigger: 'item' // 设置tooltip浮框的触发类型
        },
        // 图表类型 核心配置
        series: [
            {
                name: '服务资源占用比', // 用于tooltip的名称显示
                type: 'pie',         // 饼图
                radius: '65%',       // 饼图的半径比例
                // 指定用到的数据
                data: props.data.servers.map((item) => ({
                    name: item.name,
                    value: item.value
                })).sort((a, b) => {
                    return a.value - b.value; // 升序排序
                }),
                roseType: 'radius', // 半径展现数据的大小（层次感）
                label: {
                    color: '#F3F3F3',         // 文字颜色
                    formatter: '{b}\n{c}%',   // 文字显示格式
                    fontWeight: 'bold',       // 文本粗细
                    lineHeight: 18,           // 文本行高
                },
                labelLine: {
                    lineStyle: {
                        color: 'rgb(174, 178, 190)' // 视觉引导线颜色
                    },
                    smooth: 0.2, // 设置平滑视觉引导线
                    length: 3,   // 视觉引导线第一段的长度
                    length2: 10  // 视觉引导线第二段的长度
                },
                itemStyle: {
                    shadowBlur: 100,                  // 图形阴影的模糊大小
                    shadowColor: 'rgba(0, 0, 0, 0.5)' // 图形阴影的颜色
                },
                animationType: 'scale',               // 设置初始动画效果为缩放
                animationEasing: 'elasticOut',        // 设置初始动画的缓动效果
                animationDelay: function (idx) {      // 设置初始动画的延迟
                    return idx * 100; // idx后乘的数值越大，延迟越高
                }
            }
        ]
    };
    
    // 通过 实例.setOption(options) 显示图表
    myChart.setOption(options);
};
</script>
<style>
</style>