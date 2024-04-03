<!--
 * @Author: QuestionMark001
 * @Date: 2024-03-20 17:38:02
 * @LastEditors: QuestionMark001
 * @LastEditTime: 2024-03-31 15:41:31
 * @FilePath: \smart-screen-frontend\src\components\RadialBarChart.vue
 * @Description: 各大地区数据处理
 * 
 * Copyright (c) 2024 by QuestionMark001, All Rights Reserved. 
-->

<template>
    <div>
        <div class="font-semibold">| 各大地区数据处理</div>
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

// 双环形图核心配置
// （将较复杂的series配置分离出来，方便后续维护）
const getSeriesData = () => {
    const series = [];

    // 遍历传过来的数据
    props.data.abnormals.forEach((item, index) => {
        // 双环形图上层
        series.push({
            name: item.name,
            type: 'pie',
            // 逆时针排布
            clockwise: false,
            // 计算半径，使其每条环形错开显示
            radius: [73 - index * 15 + '%', 68 - index * 15 + '%'],
            // 不展示扇区的放大效果
            emphasis: {
                scale: false
            },
            // 中心位置
            center: ['50%', '50%'],
            // 不展示label文本
            label: {
                show: false
            },
            // 配置数据（多个配置）
            data: [
                // 设置名称和数值
                {
                    value: item.value,
                    name: item.name
                },
                // 配置最大数据及其最大值样式
                {
                    // 配置最大值
                    value: 1000,
                    // 不展示扇区的放大效果
                    emphasis: {
                        scale: false
                    },
                    // 不显示最大值提示框
                    tooltip: {
                        show: false
                    },
                    // 配置样式
                    itemStyle: {
                        // 配置颜色透明
                        color: 'rgba(0, 0, 0, 0)',
                        // 取消描边
                        borderWidth: 0
                    }
                }
            ]
        });

        // 双环形图下层（背景层）
        series.push({
            name: item.name,
            type: 'pie',
            // 逆时针排布
            clockwise: false,
            // 计算半径，使其每条环形错开显示
            radius: [73 - index * 15 + '%', 68 - index * 15 + '%'],
            // 不响应/触发鼠标事件
            silent: false,
            // 中心位置
            center: ['50%', '50%'],
            // 不展示label文本
            label: {
                show: false
            },
            // 将 z-index 设为 1，置于底层
            z: 1,
            data: [
                // 显示 75% 背景层
                {
                    value: 7.5,
                    itemStyle: {
                        color: 'rgb(24, 54, 90)',
                        borderWidth: 0
                    },
                    tooltip: {
                        show: false
                    },
                    emphasis: {
                        scale: false
                    }
                },
                // 剩下 25% 的背景层不显示，用于展示各环形的名称
                {
                    value: 2.5,
                    itemStyle: {
                        color: 'rgba(0, 0, 0, 0)',
                        borderWidth: 0
                    },
                    tooltip: {
                        show: false
                    },
                    emphasis: {
                        scale: false
                    }
                }
            ]
        });
    });

    return series;
};

// 渲染图表函数
const renderChart = () => {
    // 指定图表的options配置
    // 标注使用VSCode插件：Echarts Enhanced Completion
    /** @type EChartsOption */
    const options = {
        // 配置提示框
        tooltip: {
            show: true,
            trigger: 'item', // 设置tooltip浮框的触发类型
            // 设置提示框显示格式
            // formatter: '{b}<br />{c}（{d}%）' // 无法显示小圆点
            formatter: (params) => {
                // console.log(params);
                // 实现使用 formatter 的同时，显示小圆点
                let str = `${params.marker} ${params.name}<br />${params.value}（${params.percent}%）`;
                return str;
            }
        },
        // 图例配置
        legend: {
            show: true,     // 显示
            top: '8%',     // 图例的top位置
            left: '55%',    // 图例的left位置
            width: '0%',    // 图例的宽度设为0，使之竖向排列
            icon: 'circle', // 图例图标设置为圆形
            // 图例文字使用name数据
            data: props.data.abnormals.map((item) => item.name),
            // 图例所使用的文字样式设置
            textStyle: {
                color: '#fff',
                fontSize: 12,
                lineHeight: 12, // 字体行高
            },
            itemWidth: 10,   // 图例图标宽度
            itemHeight: 10,  // 图例图标高度
            itemGap: 7,      // 图例之间的间距
        },
        // y轴
        yAxis: [
            {
                type: 'category',
                // 反转显示
                inverse: true,
                // 不展示轴线
                axisLine:{
                    show: false
                },
                // 不展示刻度
                axisTick: {
                    show: false
                }
            }
        ],
        // x轴
        xAxis: [
            {
                show: false
            }
        ],
        // 图表类型 核心配置
        series: getSeriesData()
    };
    
    // 通过 实例.setOption(options) 显示图表
    myChart.setOption(options);
};
</script>
<style>
</style>