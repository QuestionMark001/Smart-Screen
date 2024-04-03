<!--
 * @Author: QuestionMark001
 * @Date: 2024-03-20 18:13:39
 * @LastEditors: QuestionMark001
 * @LastEditTime: 2024-04-02 12:44:06
 * @FilePath: \smart-screen-frontend\src\components\TotalData.vue
 * @Description: 数据总量
 * 
 * Copyright (c) 2024 by QuestionMark001, All Rights Reserved. 
-->

<template>
    <div class="p-6">
        <div class="text-slate-300 text-center">
            <span class="font-bold">数据总量：</span>
            <span ref="totalCountTarget" class="text-7xl ml-2 mr-2 font-bold font-[Electronic] total-data-gradient">

            </span>
            条记录
        </div>
        <div class="mt-3 flex flex-wrap">
            <div class="w-1/3 text-center text-slate-400 text-sm">
                华北：
                <span ref="city1" class="text-[#5DC5EF] text-3xl font-[Electronic]">

                </span>
            </div>
            <div class="w-1/3 text-center text-slate-400 text-sm">
                东北：
                <span ref="city2" class="text-[#5DC5EF] text-3xl font-[Electronic]">

                </span>
            </div>
            <div class="w-1/3 text-center text-slate-400 text-sm">
                华东：
                <span ref="city3" class="text-[#5DC5EF] text-3xl font-[Electronic]">

                </span>
            </div>
            <div class="w-1/3 text-center text-slate-400 text-sm">
                中南：
                <span ref="city4" class="text-[#5DC5EF] text-3xl font-[Electronic]">

                </span>
            </div>
            <div class="w-1/3 text-center text-slate-400 text-sm">
                西南：
                <span ref="city5" class="text-[#5DC5EF] text-3xl font-[Electronic]">

                </span>
            </div>
            <div class="w-1/3 text-center text-slate-400 text-sm">
                西北：
                <span ref="city6" class="text-[#5DC5EF] text-3xl font-[Electronic]">

                </span>
            </div>
        </div>
    </div>
</template>
<script setup>
import { CountUp } from 'countup.js';
import { ref, onMounted } from 'vue';

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
});

const totalCountTarget = ref(null);
const city1 = ref(null);
const city2 = ref(null);
const city3 = ref(null);
const city4 = ref(null);
const city5 = ref(null);
const city6 = ref(null);

onMounted(() => {
    new CountUp(totalCountTarget.value, props.data.total).start();
    new CountUp(city1.value, props.data.hb).start();
    new CountUp(city2.value, props.data.db).start();
    new CountUp(city3.value, props.data.hd).start();
    new CountUp(city4.value, props.data.zn).start();
    new CountUp(city5.value, props.data.xn).start();
    new CountUp(city6.value, props.data.xb).start();
});
</script>
<style>
</style>