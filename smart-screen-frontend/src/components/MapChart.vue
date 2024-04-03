<!--
 * @Author: QuestionMark001
 * @Date: 2024-03-20 17:30:58
 * @LastEditors: QuestionMark001
 * @LastEditTime: 2024-04-02 20:47:38
 * @FilePath: \smart-screen-frontend\src\components\MapChart.vue
 * @Description: 地图可视化
 * 
 * Copyright (c) 2024 by QuestionMark001, All Rights Reserved. 
-->

<template>
    <div>
        <div ref="target" class="w-full h-full"></div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
// 导入中国地图数据
import mapJson from '@/assets/MapData/china.json';

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
});

// 初始化echarts实例
let myChart = null;
const target = ref(null);
onMounted(() => { // 在 已挂载（挂载后） 阶段初始化echarts实例
    // 注册中国地图数据
    echarts.registerMap('chinaMap', mapJson);

    myChart = echarts.init(target.value);
    renderChart(); // 渲染echarts
});

// 渲染图表函数
const renderChart = () => {
    // 指定图表的options配置
    // 标注使用VSCode插件：Echarts Enhanced Completion
    /** @type EChartsOption */
    let options = {
        // 定义options
        options: [],

        // 时间线
        timeline: {
            data: props.data.voltageLevel,
            axisType: 'category',
            autoPlay: true,
            playInterval: 3000,
            left: '10%',
            right: '10%',
            bottom: '0%',
            // 时间线标记的大小
            symbolSize: 12,
            // 默认状态下的文字效果
            label: {
                color: '#ddd',
                fontWeight: 'bold',
            },
            // 鼠标移入时的文字效果
            emphasis: {
                label: {
                    color: '#fff',
                    fontWeight: 'bold'
                },
            },
            lineStyle: {
                // 时间线颜色
                color: 'rgb(174, 178, 190)',
            },
            checkpointStyle: {
                symbolSize: 16,
            },
        },

        // 柱形图位置
        grid: {
            right: '2%',
            top: '15%',
            bottom: '10%',
            width: '20%'
        },

        // 地图配置
        geo: {
            map: 'chinaMap',
            show: true,
            roam: true, // 默认开启缩放
            zoom: 0.8,  // 设置初始缩放值
            // 当前地图视角的中心点
            center: [116, 35],
            // 默认状态的地图样式
            itemStyle: {
                // 边框色值
                borderColor: 'rgba(98, 209, 250, 0.75)',
                // 边框宽度
                borderWidth: 1,
                // 区域颜色
                areaColor: {
                    // 经向色值
                    type: 'radial',
                    x: 0.5,
                    y: 0.5,
                    r: 0.5,
                    colorStops: [
                        // 0% 处的颜色
                        {
                            offset: 0,
                            color: 'rgba(147, 235, 248, 0.1)'
                        },
                        // 100% 处的颜色
                        {
                            offset: 1,
                            color: 'rgba(147, 235, 248, 0.2)'
                        }
                    ],
                    // 默认为 false
                    globalCoord: false
                },
            },
            // 鼠标移入后的动效
            emphasis: {
                itemStyle: {
                    areaColor: 'rgb(71, 154, 211)',
                    borderWidth: 0
                },
                label: {
                    color: '#fff', // 文字颜色
                }
            },
            // 鼠标移入之前被隐藏的文字颜色
            label: {
                color: '#fff',
            }
        }
    };

    // 遍历每一年度的图表
    props.data.voltageLevel.forEach((item, index) => {
        options.options.push({
            title: [
                // 主标题
                {
                    text: '| 2019~2023年 年度数据统计',
                    left: '0%',
                    top: '0',
                    textStyle: {
                        color: 'rgb(174, 178, 190)',
                        fontSize: 26
                    }
                },
                // 副标题
                {
                    id: 'statistic',
                    text: item + '年数据统计情况',
                    right: '0%',
                    top: '4%',
                    textStyle: {
                        color: 'rgb(174, 178, 190)',
                        fontSize: 20
                    }
                }
            ],
            // x轴
            xAxis: {
                type: 'value',
                // 坐标刻度不强制包含零刻度
                scale: true,
                position: 'top',
                // 不显示分割线
                splitLine: {
                    show: false
                },
                // 不显示轴线
                axisLine: {
                    show: false
                },
                // 不显示刻度尺
                axisTick: {
                    show: false
                },
                // 刻度文字
                axisLabel: {
                    margin: 2,
                    color: '#aaa'
                }
            },
            // y轴
            yAxis: {
                type: 'category',
                // 轴线
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#ddd'
                    }
                },
                // 轴刻度
                axisTick: {
                    show: false,
                    lineStyle: {
                        color: '#ddd'
                    }
                },
                // 轴标签
                axisLabel: {
                    interval: 0,
                    color: '#ddd'
                },
                // 根据年份获取相应应数据
                data: props.data.categoryData[item].map((item) => item.name)
            },
            // 核心配置
            series: [
                // 柱形图
                {
                    zlevel: 1.5,
                    // 柱形图
                    type: 'bar',
                    // 每个柱子的色值
                    itemStyle: {
                        color: props.data.colors[index]
                    },
                    // 根据年份，获取相应数据
                    data: props.data.categoryData[item].map((item) => item.value)
                },

                // 地图散点图配置
                {
                    // 散点图
                    type: 'effectScatter',
                    // 使用地理坐标
                    coordinateSystem: 'geo',
                    data: props.data.topData[item],
                    // 散点大小
                    symbolSize: function (val) {
                        return val[2] / 4
                    },
                    // 特效
                    showEffectOn: 'render',
                    // 散点涟漪特效
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    // 散点文字
                    label: {
                        show: true,
                        formatter: '{b}',
                        position: 'right',
                        color: 'rgb(203, 213, 225)',
                        fontWeight: 'bold'
                    },
                    // 每一项配置
                    itemStyle: {
                        color: props.data.colors[index],
                        // 阴影配置
                        shadowBlur: 5,
                        shadowColor: props.data.colors[index]
                    },
                    zlevel: 1
                }
            ]
        })
    })

    // 通过 实例.setOption(options) 显示图表
    myChart.setOption(options);
};
</script>
<style>
</style>