<template>
  <div ref="divRefEl" :style="{ width: width, height: height }"></div>
</template>

<script setup lang="ts">
import { PropType, Ref, onMounted,ref,watch } from 'vue';
import useEchart from '../utils/useEchart.js';
interface EcharetsDatas{
        name:string,
        data:number[]
}
const props = defineProps({
    width:{
        type:String,
        default:'100%',
    },
    height:{
        type:String,
        default:'100%',
    },
    echartDatas:{
        type:Array as PropType<EcharetsDatas[]>,
        default:function(){
            return [];
        }
    }
})
let divRefEl = ref(null);
let YXEchart: { setOption: any; resizeEchart?: () => void; echartInstance?: Ref<any>; } | null = null;
onMounted(()=>{
    setupecharts(props.echartDatas)
})
watch(()=>props.echartDatas,
    (newV,_oldV)=>{
        setupecharts(newV)
    }
)

function setupecharts(echartsData:EcharetsDatas[]){
     if(!YXEchart){
        YXEchart = useEchart(divRefEl.value)
     }
    // let mychart = echart.init(divRefEl.value)
     let option = getOption(echartsData)
    // mychart.setOption(option)
     YXEchart.setOption(option)
    // YXEchart.echartInstance.setOption(option)
}
function getOption(echartsData:EcharetsDatas[]){
    let option = {
        grid:{
            left: "5%",
            right: "1%",
            top: "20%",
            bottom: "15%",
            containLabel: true, // grid 区域是否包含坐标轴的刻度标签
        },
        tooltip:{
            trigger: "axis",
            axisPointer: {
                type: "line",
                lineStyle: {
                color: "#20FF89",
                },
            },
        },
        legend:{
            right: "center",
            bottom: "5%",
            itemGap: 20,
            itemWidth: 13,
            itemHeigth: 12,
            icon:'rect',
            textStyle: {
            color: "#64BCFF",
        },
        },
        xAxis:[{
            type:'category',
            //横坐标轴线
            axisLine:{
                show:false,
            },
            //横坐标刻度
            axisTick:{
                show:false,
            },
            //坐标轴刻度标签相关设置
            axisLabel:{
                color:'#64ACD3'
            },
            data:['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月','9月','10月','11月','12月'],
        }],
        yAxis:{
            type:'value',
            //横坐标刻度
            splitLine:{
                show:false
            },
            axisLabel:{
                color:'#64ACD3'
            },
                    //刻度
            axisTick:{
                      show:false
            }
        },
        series:[
            {
                name:echartsData[0]?.name,
                type:'line',
                smooth:true,
                //标记大小
                SymbolSize:5,
                symbol:'none',
                itemStyle:{
                      color:'#20FF89'
                },
                areaStyle:{
                    color:{
                        type:'linear',
                        x:0,
                        y:0,
                        x2:0,
                        y2:1,
                        colorStops:[{
                            offset:0,color:'#20FF89'
                        },{
                            offset:1,color:'rgba(255, 255, 255, 0)'
                        }]
                    }
                },
                data:echartsData[0]?.data
            },
            {
                name:echartsData[1]?.name,
                type:'line',
                symbol:'none',
                smooth:true,
                //标记大小
                SymbolSize:5,
                itemStyle:{
                      color:'#EA9502'
                },
                areaStyle:{
                    color:{
                        type: "linear",
                        x:0,
                        y:0,
                        x2:0,
                        y2:1,
                        colorStops:[{
                            offset:0,color:'#EA9502'
                        },{
                            offset:1,color:'rgba(255, 255, 255, 0)'
                        }],
                        global: false
                    }
                },
                data:echartsData[1]?.data
            }
        ]
        
    }
    return option
}
</script>
<style lang="less" scoped>

</style>
