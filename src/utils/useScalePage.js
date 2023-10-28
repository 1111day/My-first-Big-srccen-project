import { onMounted, onUnmounted } from 'vue';
import _ from 'lodash';


export default function useScalePage(option){
    //定义自适应事件
    //节流事件
    let resizeChange = _.throttle(function(){
        triggerScale()
    },100);
    //挂载结束
    onMounted(function(){
        triggerScale();
        //监听窗口该变
        window.addEventListener('resize',resizeChange)
    })
    //页面卸载结束
    onUnmounted(function(){
        //卸载监听事件
        window.removeEventListener('resize',resizeChange)
    })


    //编写自适应代码
    function triggerScale(){
        //定义目标宽度(默认值1920) 目标高度(默认值为1080)
        let targetX = option.targetX || 1920;
        let targetY = option.targetY || 1080;
        //宽高的比例
        let targetRation = option.targetRation || 16 / 9;
        //拿到屏幕的宽高(body的宽高)
        let currentX = 
        document.documentElement.clientWidth || document.body.clientWidth;
        let currentY = 
        document.documentElement.clientHeight || document.body.clientHeight;
        //2.计算缩放的比例
        let scaleRatio = currentX / targetX ;
        //当前屏幕的宽高比
        let currentRatio = currentX / currentY;
        if(currentRatio > targetRation){
            scaleRatio = currentY / targetY
            document.body.setAttribute(
                'style',
                `width:${targetX}px;height:${targetY}px;transform:scale(${scaleRatio}) translateX(-50%);left:50%;`
            )
        }else{
            document.body.setAttribute(
                'style',
                `width:${targetX}px;height:${targetY}px;transform:scale(${scaleRatio});`
            )
        }
    }
}

