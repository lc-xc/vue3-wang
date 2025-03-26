<script setup>
import WorkArea from '@/views/workArea/WorkArea.vue'
</script>

<template>
  <div class="workbench">
    <app-drawer></app-drawer>
    <work-area></work-area>
  </div>
</template>
<style lang="scss">
$--header-height: 90px;
div {
  box-sizing: border-box;
}
.workbench {
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #007fab;
  background-image: url(@/assets/workbench/p.png);
  overflow: hidden;
}
</style>
