<template>
  <div ref="divRefEl" :style="{ width: width, height: height }"></div>
</template>
<script setup lang="ts">
import useEchart from '../utils/useEchart.ts'
import { ref,onMounted,watch, Ref, PropType} from 'vue'
interface Charging{
         value: number,
          name: string,
          percentage: string,
          color: string
}
const divRefEl = ref()
const props = defineProps({
    width:{
        type:String,
        default:'100%'
    },
    height:{
        type:String,
        default:'100%'
    },
    chargingPile:{
        type:Array as PropType<Charging[]>,
        default:()=>{
            return []
        }
    }
})
let hyEchart: { setOption: any; resizeEchart?: () => void; echartInstance?: Ref<any>; } | null = null
onMounted(()=>{
    // console.log(props.chargingPile)
    //dom节点
    // const option = getOption(props.chargingPile.data)
    // myChart.setOption(option)
    setupEchart(props.chargingPile)
});
watch(
  () => props.chargingPile,
  (newV, _oldV) => {
    setupEchart(newV); // 显示网络请求的数据
  }
);
function setupEchart(echartDatas:Charging[]){
    if(!hyEchart){
        hyEchart = useEchart(divRefEl.value);
    }
    let option = getOption(echartDatas)
    
    hyEchart.setOption(option)
}

function getOption(OPtion:Charging[]){
    //准备数据 颜色colors
    let colors = OPtion.map((item)=>{
        return item.color
    })
    //准备数据 data
    let data = OPtion.map((item)=>{
        return{
            name:item.name,
            value:item.value
        }
    })
    // console.log(data)
    //计算出总和
    let total = OPtion.reduce((a,b)=>{
        return a + b.value * 1;
    },0)
    //来画echarts图
    let option = {
        //图表个体颜色
        color: colors,
        //标题
        title:{
            //文本
            text:`{nameSty| 总数}\n{number|${total}}`,
            top:'50%',
            left:'30%',
            //文本样式
            textStyle:{
                rich:{
                    nameSty:{
                        fontSize:19,
                        color:'white',
                        padding:[5,0,0,23],
                    },
                    number:{
                        fontSize:19,
                        color:'white',
                        width:90,
                        align:'center',
                        padding:[10,0,0,4],
                    }
                }
            },
            //副标题文本
            // subtext:`{totalSty|${total}}`,
            // subtextStyle:{
            //     //富文本语法
            //     rich:{
            //         totalSty:{
            //             fontSize:19,
            //             color:'white',
            //             width:90,
            //             align:'center'
            //         }
            //     }
            // }
        },
        //图表例子
        legend:{
            orient:'vertical',
            //左边位置
            right:'10%',
            //顶部位置
            top:'18%',
            //itemGap组内距离
            itemGap:10,
            //itemWidth:图例宽
            itemWidth:16,
            //itemHeight:图例高
            itemHeight:16,
            //图例状态(rect矩形)
            icon:'rect',
            formatter:function(name: any){
                let currentItem:Charging | undefined = OPtion.find((item)=>{
                    return item.name === name
                })
                return (
                    '{nameSty|'+currentItem?.name+'}\n'+
                    '{numberSty|'+currentItem?.value+ '个}'+
                    '{preSty|'+currentItem?.percentage +'}')
            },
            //文本样式
            textStyle:{
                rich:{
                    nameSty:{
                        fontSize:12,
                        color:"#FFFFFF",
                        padding:[10,14]
                    },
                    numberSty:{
                        fontSize:12,
                        color:'#40E6ff',
                        padding:[0,0,0,14],
                    },
                    preSty:{
                        fontSize:12,
                        color:'#40E6ff'
                    }
                }
            }
        },
        series:{
            type:'pie',
            data:data,
            //饼图的中心(圆心)坐标,数组的第一项是横坐标
            center:["40%", "57%"],
            //饼图的半径。数组的第一项是内半径(默认为0),第二项是外半径
            radius:['30%','72%'],
            //label标签(也就是指定的小标签)
            label:{
                show:false
            },
            roseType:"area",
        }
    }

 return option
}


</script>
<style lang="less" scoped>

</style>
