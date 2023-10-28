<template>
  <div class="home">

    <waterBall  class="right-water-ball" :waterData="waterData"></waterBall>
    <!-- 图例 -->
      <div class="legend">
          <template v-for="item in panelItems" :key="item">
              <div class="item" @click="ClickItem(item)">
                <span :class="`icon color_${item.id}`"></span>
                <span class="name">{{item.name}}</span>
                <span class="percentage">{{item.percentage}}</span>
             </div>
          </template>
      </div>
  </div>
</template>

<script setup lang="ts">
import { isNumber } from 'lodash';
import waterBall from './water-ball.vue'
import { onMounted ,watch,ref, PropType} from 'vue'
    interface PanelItems{
      id:string,
      name:string,
      percentage:string
    }
    const props  = defineProps({
          panelItems:{
                  type:Array as PropType<PanelItems[]>,
                  default:function(){
                    return []
                  }
          },
          paneltotal:{
                type:Number,
                default:30
          }
    })
    let waterData = ref({"waterColor":'#00c6ff',
                          "BackColor":'#c7eeff',
                          "targetnum":30})
    function ClickItem(params:PanelItems) {
          waterData.value.targetnum = Number(params.percentage.slice(0,2))
    } 
    watch(()=>props.panelItems,
      (newV,_oldV)=>{
        console.log(newV)
      }
    )
    onMounted(()=>{
    })
</script>
<style lang="less" scoped>
.home{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
}
.right-water-ball{
       width: 269px;
       height: 199px;
       margin-top: 50px;
       margin-left: 40px;
}
.item{
  margin-top: 23px;
  margin-left: 40px;
  color: #fff;
}
.item > span{
  display: inline-block;
  font-size: 20px;
  margin-right: 11px;
}
.icon{
  width: 17px;
  height: 17px;
  border-radius: 50%;
}
.percentage{
  color:#0cd2ea;
}
.color_1{
  background-color: rgb(241, 55, 17);
}
.color_2{
  background-color: rgb(42, 151, 229);
}
.color_3{
  background-color: rgb(52, 210, 92);
}
.color_4{
  background-color: rgb(0, 255, 255);
}
.color_5{
  background-color: rgb(122, 16, 235);
}
</style>
