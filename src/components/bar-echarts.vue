<template>
  <div ref="divRefEl" :style="{ height: height, width: width}"></div>
</template>

<script setup lang="ts">
import { ref,onMounted,watch, Ref } from 'vue'
import useEchart from '../utils/useEchart.js'
let props = defineProps({
    width:{
        type:String,
        default:'100%'
    },
    height:{
        type:String,
        default:'100%'
    },
    echartDatas:{
        type:Array,
        default:function(){
            return [];
        }
    }
})
let divRefEl = ref()
let YXEchart: { setOption: any; resizeEchart?: () => void; echartInstance?: Ref<any>; } | null = null
onMounted(()=>{
    setupecharts(props.echartDatas)
})

watch(()=>props.echartDatas,
    (newV,_oldV)=>{
        setupecharts(newV)
    }
)
function setupecharts(echartDatas: unknown[]){
    if(!YXEchart){
        YXEchart = useEchart(divRefEl.value)
    }
    let option = getOption(echartDatas)
    YXEchart.setOption(option)
}

function getOption(echartDatas: any[]){
    // console.log(echartDatas)
    //月份合集
    let Month = echartDatas.map((item: { name: any; })=>{
        return item.name
    })
    //数据合集
    let data = echartDatas.map((item: { value: any; })=>{
        return item.value
    })

    let option = {
        //定位
        grid:{
            left:'5%',
            rigth:'10%',
            top:'30%',
            bottom:'5%',
            containLabel: true,
        },
        xAxis:{
            name:'月份',
            type:'category',
            //x轴线样式
            axisLine:{
                show:true,
                lineStyle:{
                    color:'#42A4FF'
                }
            },
            axisTick:{
                show:false
            },
            axisLabel:{
                color:'white'
            },
            data:Month
        },
        yAxis:{
            name:'个',
            type:'value',
            nameTextStyle:{
                color:'white',
                fontSize:13,
                align:'right'
            },
            axisTick:{
                show:true,
                lineStyle:{
                    color:'#42a4ff'
                }
            },
            splitLine:{
                show:true,
                lineStyle:{
                    color:'#42a4ff'
                }
            },
            axisLabel:{
                color:'white'
            }
        },
        tooltip:{},
        series:[{
            name:'销量',
            type:'bar',
            barWidth:17,
            itemStyle:{
                color:{
                    type:'linear',
                    x:0,
                    y:0,
                    x2:0,
                    y2:1,
                    colorStops:[
                        {
                            offset:0,
                            color:"#01B1FF"
                        },{
                            offset:1,
                            color:'#033BFF'
                        }
                    ]
                  }
            },
            data:data
        }]
    }

    return option
}
</script>
<style lang="less" scoped>

</style>
