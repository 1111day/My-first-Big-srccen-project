<template>
  <main class="screen-bg">
      <div class="utils header"></div>
      <div class="utils left-top">
        <pie :chargingPile="chargingPileData?.chargingPile.data"></pie>
      </div>
      <div class="utils left-bottom">
        <linecpn :echartDatas="chargingPileData?.processMonitoring.data"></linecpn>
      </div>
      <div class="utils right-top">
        <RightTopSvg :panelItems="chargingPileData?.chargingTop4.data"
                     :percentage="30"
        ></RightTopSvg>
      </div>
      <div class="utils right-center">
        <bar :echartDatas="chargingPileData?.chargingStatistics.data"></bar>
      </div>
      <div class="utils right-bottom">
        <RightBottom :dots="chargingPileData?.exceptionMonitoring.data"></RightBottom>
      </div>
      <div class="utils center">
          <centerSvg></centerSvg>    
      </div>
      <div class="utils bottom">
          <BottomPanel :panelItems="chargingPileData?.dataAnalysis.data"></BottomPanel>
          <!-- <BottomPanel ></BottomPanel> -->
      </div>
  </main>
</template>

<script setup lang="ts">
import pie from '../components/pie-echarts.vue'
import linecpn from '../components/line-echart.vue'
import bar from '../components/bar-echarts.vue'
import RightBottom from '../components/Right-Svg-bottom.vue'
import centerSvg from '../components/center-svg.vue'
import BottomPanel from '../components/bottom-panel.vue'
import RightTopSvg from '../components/right-top-svg.vue'
import { getData } from '../services'
import { ref } from 'vue'
const chargingPileData = ref()

getData().then((res: any)=>{
  chargingPileData.value = res
  console.log(chargingPileData.value)
})




</script>
<style lang="less" scoped>
.screen-bg{
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url(../assets/images/bg.png);
}
.utils{
  //绝对定位
  position: absolute;
  // 不平铺
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.header{
  top: 21px;
  left: 0;
  right: 0;
  height: 56px;
  background-image: url(../assets/images/bg_header.svg);
}
.left-top{
  top: 116px;
  left: 16px;
  width: 536px;
  height: 449px;
  background-image: url(../assets/images/bg_left-top.svg);
}
.left-bottom{
  bottom: 49px;
  left: 16px;
  width: 536px;
  height: 449px;
  background-image: url(../assets/images/bg_left_bottom.svg);
}
.right-top{
  top: 96px;
  right: 17px;
  width: 519px;
  height: 327px;
  background-image: url(../assets/images/bg_right_top.svg);
}
.right-center{
  top: 443px;
  right: 17px;
  width: 519px;
  height: 327px;
  background-image: url(../assets/images/bg_right_center.svg);
}
.right-bottom{
  bottom: 49px;
  right: 17px;
  width: 519px;
  height: 242px;
  background-image: url(../assets/images/bg_right_bottom.svg);
}
.center{
  position: absolute;
  right: 540px;
  bottom: 272px;
  width: 823px;
  height: 710px;
}
.bottom{
  position: absolute;
  right: 540px;
  bottom: 49px;
  width: 823px;
  height: 200px;

  background-image: url(../assets/images/bg_bottom.svg);
}
</style>
