<!--
 * @Author: QuestionMark001
 * @Date: 2024-03-20 17:41:43
 * @LastEditors: QuestionMark001
 * @LastEditTime: 2024-04-01 15:50:23
 * @FilePath: \smart-screen-frontend\src\components\RelationChart.vue
 * @Description: 平台数据传递
 * 
 * Copyright (c) 2024 by QuestionMark001, All Rights Reserved. 
-->

<template>
    <div>
        <div class="font-semibold">| 平台数据传递</div>
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
        // 不展示x轴
        xAxis: {
            show: false,
            type: 'value'
        },
        // 不展示y轴
        yAxis: {
            show: false,
            type: 'value'
        },
        // 核心配置
        series: [
            // series-graph
            {
                // 用于展现节点以及节点之间的关系数据
                type: 'graph',
                // 不采用任何布局
                layout: 'none',
                // 使用二维直角坐标系
                coordinateSystem: 'cartesian2d',
                // 节点标记大小
                symbolSize: 26,
                // z-index
                z: 3,
                // 线条文字
                edgeLabel: {
                    show: true,
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 'bold',
                    formatter: function (params) {
                        let txt = ''
                        if (params.data.speed !== undefined) {
                            txt = params.data.speed;
                        }
                        return txt;
                    }
                },
                // 圆饼下文字
                label: {
                    show: true,
                    position: 'bottom',
                    color: 'rgb(174, 178, 190)',
                    fontWeight: 'bold'
                },
                // 边两端的类型
                edgeSymbol: ['none', 'arrow'],
                // 边两端的大小
                edgeSymbolSize: 8,
                // 圆数据
                data: props.data.relations.map((item) => {
                    // id 为 0 ，表示数据中心，数据中心单独设置
                    if (item.id !== 0) {
                        return {
                            name: item.name,
                            category: 0,
                            active: true,
                            speed: `${item.speed}kb/s`,
                            // 位置
                            value: item.value
                        }
                    } else {
                        return {
                            name: item.name,
                            // 位置
                            value: item.value,
                            // 数据中心圆的大小
                            symbolSize: 100,
                            // 圆的样式
                            itemStyle: {
                                // 渐变色
                                color: {
                                    colorStops: [
                                        { offset: 0, color: '#157eff' },
                                        { offset: 1, color: '#35c2ff' }
                                    ]
                                }
                            },
                            // 字体
                            label: {
                                fontSize: '14'
                            }
                        }
                    }
                }),
                // 线
                links: props.data.relations.map((item, index) => ({
                    // 方向
                    source: item.source,
                    target: item.target,
                    // 线上的文字
                    speed: `${item.speed}kb/s`,
                    // 线的样式
                    lineStyle: { color: 'rgb(98, 209, 250)', curveness: 0.2 },
                    // 文字位置
                    label: {
                        show: true,
                        position: 'middle',
                        offset: [10, 0]
                    }
                }))
            },
            // series-lines
            {
                // 用于带有起点和终点信息的线数据的绘制
                type: 'lines',
                // 使用二维直角坐标系
                coordinateSystem: 'cartesian2d',
                // z-index
                z: 1,
                // 线特效的配置
                effect: {
                    show: true,
                    trailLength: 0,
                    symbol: 'arrow',
                    color: 'rgba(55,155,255,0.5)',
                    symbolSize: 12
                },
                // 线的样式
                lineStyle: {
                    curveness: 0.2
                },
                // 线的数据级，前后线需要重合，数据固定
                data: [
                    { coords: [[0, 300], [50, 200]] },
                    { coords: [[0, 100], [50, 200]] },
                    { coords: [[50, 200], [100, 100]] },
                    { coords: [[50, 200], [100, 300]] }
                ]
            }
        ]
    };

    // 通过 实例.setOption(options) 显示图表
    myChart.setOption(options);
}
</script>
<style>
</style>