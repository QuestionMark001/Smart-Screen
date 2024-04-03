<!--
 * @Author: QuestionMark001
 * @Date: 2024-03-20 17:33:12
 * @LastEditors: QuestionMark001
 * @LastEditTime: 2024-03-23 18:28:36
 * @FilePath: \smart-screen-frontend\src\components\RadarChart.vue
 * @Description: 雷达信息
 * 
 * Copyright (c) 2024 by QuestionMark001, All Rights Reserved. 
-->

<template>
    <div>
        <div class="font-semibold">| 风险雷达</div>
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
            show: true, // 启用提示框
        },
        // 雷达图配置
        radar: {
            // 雷达指示器每个名称的配置项
            axisName: {
                color: 'rgb(91, 176, 255)', // 字体颜色
                fontSize: 14,               // 字体大小
                fontWeight: 'bold',         // 字体粗细
            },
            shape: 'polygon',         // 雷达图类型
            center: ['50%', '50%'],   // 雷达图位置
            radius: '80%',            // 雷达图半径
            startAngle: 120,          // 坐标系起始角度
            // 坐标轴轴线设置
            axisLine: {
                lineStyle: {
                    color: 'rgb(78, 169, 232)',    // 线条颜色
                    width: 0.5,
                },
            },
            // 坐标轴在 grid 区域中的分隔线
            splitLine: {
                show: true,
                lineStyle: {
                    width: 0.5,                      // 分隔线宽度
                    color: 'rgb(78, 169, 232)',    // 分隔线颜色
                }
            },
            // 坐标轴在 grid 区域中的分隔区域
            splitArea: {
                areaStyle: {
                    opacity: 0, // 设置透明度
                },
            },
            // 雷达指示器的维度（变量）
            indicator: props.data.risks.map((item) => ({
                name: item.name, 
                max: 100 // 指定每个维度的最大值
            })),
        },
        // 极坐标系配置
        polar: {
            center: ['50%', '50%'], // 极坐标系位置
            radius: '0%',           // 极坐标系半径
        },
        // 极坐标系的角度轴
        angleAxis: {
            min: 0,           // 角度轴刻度最小值
            interval: 5,      // 强制设置角度轴分割间隔
            clockwise: false, // 逆时针显示
        },
        // 极坐标系的径向轴
        radiusAxis: {
            min: 0,           // 径向轴轴刻度最小值
            interval: 20,     // 强制设置径向轴分割间隔
            splitLine: {
                show: true,   // 显示坐标轴在 grid 区域中的分隔线
            },
        },
        // 图表类型 核心配置
        series: [
            {
                name: '风险雷达信息',// 用于tooltip的名称显示
                type: 'radar',    // 雷达图
                symbol: 'circle', // 雷达图折线拐点图形
                symbolSize: 10,   // 拐角大小
                // 折线拐点样式
                itemStyle: {
                    color: 'rgb(98, 209, 250)',
                },
                // 填充区域样式
                areaStyle: {
                    color: "rgb(98, 209, 250)",
                    opacity: 0.3, // 设置填充区域透明度
                },
                // 指定用到的数据
                data: [
                    {
                        value: props.data.risks.map((item) => item.value)
                    }
                ],
                // 雷达图显示具体数值
                label: {
                    show: true,
                    color: '#fff',      // 数值字体颜色
                    fontWeight: 'bold', // 数值字体粗细
                },
            }
        ],
    };
    
    // 通过 实例.setOption(options) 显示图表
    myChart.setOption(options);
};
</script>
<style>
    
</style>