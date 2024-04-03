<!--
 * @Author: QuestionMark001
 * @Date: 2024-03-20 17:24:57
 * @LastEditors: QuestionMark001
 * @LastEditTime: 2024-03-23 18:40:33
 * @FilePath: \smart-screen-frontend\src\components\RegionInfo.vue
 * @Description: 各大地区数据信息
 * 
 * Copyright (c) 2024 by QuestionMark001, All Rights Reserved. 
-->

<template>
    <div>
        <div class="font-semibold">| 各大地区数据信息</div>
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
        // 启用提示框
        tooltip: {
            show: true,
        },
        // x轴数据
        xAxis: {
            show: false, // 不显示x轴坐标
            type: 'value', // 坐标轴类型为 数值
            max: function (value) {
                // 防止数据超出数值条
                return parseInt((value.max) * 1.2);
            }
        },
        // y轴数据
        yAxis: {
            type: 'category', // 坐标轴类型为 类型
            axisLine: {
                show: false, // 不展示轴线
            },
            axisTick: {
                show: false, // 不展示刻度
            },
            axisLabel: {
                color: 'rgb(174, 178, 190)', // 配置文字颜色
                fontWeight: 'bold',          // 配置文字粗细
            },
            inverse: true, // 将y坐标轴反转为从上到下
            // 过滤出名字后放入新数组中
            data: props.data.regions.map((item) => item.name)
        },
        // 图表位置（包含上下左右）
        grid: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            containLabel: true, // 包含刻度
        },
        // 图表类型 核心配置
        series: [
            {
                type: 'bar', // 柱状图
                // 指定用到的数据
                data: props.data.regions.map((item) => ({
                    name: item.name,
                    value: item.value
                })),
                itemStyle: {
                    color: 'rgb(71, 154, 211)', // 柱状图条形颜色
                    borderRadius: 5, // 柱状图圆角
                    shadowColor: 'rgba(0,0,0,0.3)', // 柱状图条形阴影
                    shadowBlur: 5 // 柱状图条形阴影模糊
                },
                showBackground: true, // 显示柱状图灰色背景
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)', // 指定柱状图灰色背景颜色
                    borderRadius: 5, // 柱状图背景圆角
                },
                label: {
                    show: true, // 显示柱状图上的字
                    color: '#fff', // 白色
                    position: 'right',  // 显示在柱状图右边
                    fontWeight: 'bold', // 设置字体粗细
                },
                barWidth: 12, // 柱条宽度
            }
        ],
    };
    
    // 通过 实例.setOption(options) 显示图表
    myChart.setOption(options);
};
</script>
<style>
</style>