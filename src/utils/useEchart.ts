import { ref, onUnmounted } from "vue";
import * as echarts from "echarts";
export default function useEchart(divEl: HTMLElement | null | undefined) {
  let echartInstance = ref();
  let myChart = echarts.init(divEl, null, { renderer: "svg" });
      echartInstance.value = myChart
  onUnmounted(() => {
    echartInstance.value.dispose();
  });     

  function resizeEchart() {
    myChart.resize();
  }

  function setOption(option: any) {
    myChart.setOption(option);
  }

  return {
    resizeEchart,
    setOption,
    echartInstance,
  };
}
