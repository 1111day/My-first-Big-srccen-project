import { onMounted,onUnmounted } from 'vue'
import _ from 'lodash'

export default function useScalePage(option: { targetX: number; targetY: number; targetRation: number; }){
    
        let resizeChange = _.throttle(function(){
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
            let targetX = option.targetX || 1920;
            let targetY = option.targetY || 1080;
            let targetRation = option.targetRation || 16/9;
            let screenX = document.documentElement.clientWidth;
            let screenY = document.documentElement.clientHeight;
            let screenRation = screenX / screenY
            let scaleRation = screenX / targetX
            if(screenRation > targetRation){
                scaleRation = screenY / targetY
                document.body.setAttribute(
                    `style`,
                    `width:${targetX}px;height:${targetY}px;transform:scale(${scaleRation}) translateX(-50%);left:50%;`
                )

            }else{
                document.body.setAttribute(
                    `style`,
                    `width:${targetX}px;height:${targetY}px;transform:scale(${scaleRation})`
                )

            }




        }


}