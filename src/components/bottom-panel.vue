<template>
  <div class="home">
    <template v-for="(item,index) in panelItems" :key="item">
        <div class="item">
             <div class="pan-left">
                <div class="title">{{precise(item?.title)}}</div>
                <span :id="`total_${item.id}`" class="number">{{item.totalNum}}</span>
                <span class="unit">万</span>
             </div>
             <div class="pan-right">
                  <span :class="['triangle', item.isUp ? 'up-triangle' : 'down-triangle']"></span>
                  <span :id="`percentage_${item.id}`" :class="['triangle', item.isUp ? 'up-percentage' : 'down-percentage']">{{item.percentage}}</span>
             </div>
        </div>
      </template>
        
        


  </div>
</template>

<script setup lang="ts">
import { onMounted, watch,nextTick, PropType} from 'vue';
import { CountUp } from 'countup.js' 
interface PaneItem{
    id:number,
    title:string,
    totalNum: number,
    unit: string,
    percentage: number,
    isUp: boolean
}
const props = defineProps({
      panelItems:{
        type:Array as PropType<PaneItem[]>,
        default:function(){
          return  [
                  {
                    "id": 1,
                    "title": "充电桩总数(个)",
                    "totalNum": 8579.9,
                    "unit": "万",
                    "percentage": 79.5,
                    "isUp": true
                  },
                  {
                    "id": 2,
                    "title": "年增长总数(个)",
                    "totalNum": 2856.6,
                    "unit": "万",
                    "percentage": 88.9,
                    "isUp": true
                  },
                  {
                    "id": 3,
                    "title": "月增长总数(个)",
                    "totalNum": 1189.3,
                    "unit": "万",
                    "percentage": 62,
                    "isUp": false
                  }
            ];
        }
      }
})
const precise = (item: string)=>{
        if(item ==='充电桩总数(个)'){
            return '总数(个)'
        }
        return item
}
watch(() => props.panelItems,(newV,_oldV)=>{
  //在下一次dom更新完成之后会回调
  nextTick(()=>{
    return startAnimation(newV);
  })
})
  onMounted(()=>{
        startAnimation(props.panelItems)
  })
  function startAnimation(panelItems: any[]){
        //等dom更新完成之后
        const option1 = {
            decimalPlaces:1,//保留两位小数
            duration:1.5,//动画时间
            useGrouping:false,
        }
        const option2 = {
            decimalPlaces:1,//保留两位小数
            duration:1.5,//动画时间
            useGrouping:false,
            suffix:'%',
        }
        panelItems.forEach((item: { id: any; totalNum: number; percentage: number; })=>{
            new CountUp(`total_${item.id}`,item.totalNum,option1).start()
            new CountUp(`percentage_${item.id}`,item.percentage,option2).start()
        })
  }


</script>
<style scoped>
/* 设置页面 */
.home{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
}
.home .item{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-top: 60px;

      flex: 1;
      height: 100%;
      padding: 0 32px 0 35px;

}
/* 标题设置为白色 */
.home .item .title {
  color: white;
}
.home .item .number{
  font-size: 36px;
  color: #23aeff;
  font-weight: bold;
  line-height: 60px;
}
.home .item .unit{
  font-size: 18px;
  color: #23aeff;
}
.home .item .pan-right{
      margin-top: 35px;
}
/* 上升标记 */
.home .item .pan-right .up-triangle{
      display: inline-block;
      margin-bottom: 4px;
      width: 0;
      height: 0;
      /* 倒三角 */
      border-bottom: 8px solid #c70013;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
}
.home .item .pan-right .up-percentage{
    color:#c70013 ;
}
.home .item .pan-right .down-triangle{
      display: inline-block;
      margin-bottom: 4px;
      width: 0;
      height: 0;
      /* 倒三角 */
      border-bottom: 8px solid #37a73f;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
}
.home .item .pan-right .down-percentage{
    color:#37a73f;
}
</style>
