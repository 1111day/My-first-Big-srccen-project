import { ref, onUnmounted } from "vue";
import * as echarts from "echarts";
export default function useEchart(divEl) {
  let echartInstance = ref(null);
  let myChart = echarts.init(divEl, null, { renderer: "svg" });
      echartInstance.value = myChart
  onUnmounted(() => {
    echartInstance.value.dispose();
  });     

  function resizeEchart() {
    myChart.resize();
  }

  function setOption(option) {
    myChart.setOption(option);
  }

  return {
    resizeEchart,
    setOption,
    echartInstance,
  };
}
