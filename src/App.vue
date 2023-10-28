<template>
    <router-view />
</template>
<script setup lang="ts">
import  useScalePage from '../src/utils/useScalePage'

useScalePage({
  targetX: 1920,
  targetY: 1080,
  targetRation: 16/9,
})
</script>

<style lang="less" scoped>


</style>
