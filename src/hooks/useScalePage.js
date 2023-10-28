import _ from 'lodash'
import { onMounted, onUnmounted } from 'vue'

export default function useScalePage(option){
  
        let resizeChange = _.throttle(function (){
            triggerScale()
        },100)
        
        onMounted(()=>{
            triggerScale()
            window.addEventListener('resize',resizeChange)
        })
        onUnmounted(()=>{
            window.removeEventListener('resize',resizeChange)
        })
        function triggerScale(){
            let targetX = option.targetX || 1920
            let targetY = option.targetY || 1080
            let targetRatio = option.targetRatio || 16/9

            let screenX = document.documentElement.clientWidth || document.body.clientWidth
            let screenY = document.documentElement.clientHeight || document.body.clientHeight
            //实际宽高比例
            let screenRatio = screenX / screenY
            //目标宽比上实际宽
            //缩放比例
            let scaleRatio = screenX / targetX
            if(screenRatio > targetRatio ){
                // 如果y轴过长的话,便使用Y轴的比例,做到一个屏幕可以显示出来
                scaleRatio = screenY / targetY
                // console.log(scaleRatio)
                document.body.setAttribute(
                    'style',
                    `width:${targetX}px;height:${targetY}px;transform:scale(${scaleRatio}) translateX(-50%);left:50%;`
                    
                )
            }else{
                document.body.setAttribute(
                    'style',
                    `width:${targetX}px;height:${targetY}px;transform:scale(${scaleRatio})`
                )
            }
        }

}