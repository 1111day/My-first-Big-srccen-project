<template>
  <div class="waterball">
                    <svg
                      version="1.1"
                      xmlns="https://www.w3.org/2000/svg"
                      xmlns:xlink="https://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      style="display: none"
                    >
                      <symbol id="wave">
                        <path
                          d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z"
                        ></path>
                        <path
                          d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z"
                        ></path>
                        <path
                          d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z"
                        ></path>
                        <path
                          d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z"
                        ></path>
                      </symbol>
                    </svg>


        <div class="box">
              <div class="percent">
                      <div class="percentNum" id="count">{{num}}</div>
                      <div class="percentB">%</div>
              </div>
              <div id="water" class="water" ref="waterRef" :style="{backgroundColor:waterData.waterColor}">
                      <svg viewBox="0 0 560 20" class="water_wave water_wave_back" :fill="waterData.BackColor">
                        <use xlink:href="#wave"></use>
                      </svg>
                      <svg viewBox="0 0 560 20" class="water_wave water_wave_front" :fill="waterData.waterColor">
                        <use xlink:href="#wave"></use>
                      </svg>
                </div>
        </div>
  </div>
</template>

<script setup lang="ts">
  import { isNumber } from 'lodash';
import { ref,onMounted,watch} from 'vue'
  const props = defineProps({
        waterData:{
          type:Object,
          default:function (){
              return {
                "waterColor":'#00c6ff',
                "BackColor":'#c7eeff',
                "targetnum":80
              }
          }
        }
  })
  watch(()=> props.waterData.targetnum,(newV,_oldV)=>{
        waterBallMove(newV)
  })
  

  let num = ref(0)
  const waterRef = ref()
  onMounted(() => {
        waterBallMove(props.waterData.targetnum)
  });
  function waterBallMove (targetnum = 50){
          console.log(isNumber(targetnum))
          //初始化num的值
          num.value = 0 
          console.log(num.value)
          let time = setInterval(()=>{
            num.value ++
            if(num.value >= targetnum){
                clearInterval(time)
              }
              waterRef.value.style.transform = `translateY(${100 - num.value}%)`
          },100)
          
  }
</script>
<style lang="less" scoped>
.waterball{
      position: relative;
}
.box{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      width: 190px;
      height: 190px;
      border-radius: 100%;
      overflow: hidden;
}
.percent{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    width: 100%;
    height: 100%;
    font-size: 40px;      
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}
.water{
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;
        width: 100%;
        height: 100%;
        transform: translate(0, 100%);
}
.water_wave{
        width: 200%;
        position: absolute;
        bottom: 100%;
}
.water_wave_back{
    right: 0;
    animation: blackmove 1.4s infinite linear;
}
.water_wave_front{ 
    left: 0;
    margin-bottom: -1px;
    animation: frontmove 0.7s infinite linear;
}

@keyframes blackmove{
    100%{
      transform: translateX(50%);
    }
}

@keyframes frontmove{
  100% {
    transform: translateX(-50%);
  }
}
</style>
