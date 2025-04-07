<script setup>
import Html5Qrcode from './Html5Qrcode.vue'
import { onMounted, ref } from 'vue';
onMounted(() => {
});
const saoyisao = () => {
  html5QrcodeFlag.value = true
  text.value = ''
}
const html5QrcodeFlag = ref(false)
const text = ref('')
const success = (t) => {
  html5QrcodeFlag.value = false
  text.value = '扫描成功：' + t
}
const error = (msg, err) => {
  html5QrcodeFlag.value = false
  if (!msg && !err) return
  console.error(err)
  text.value = '扫描失败：' + msg
}
</script>
<template>
  <div class="dw-w-full">
    <div class="saoyisao" @click="saoyisao">打开扫一扫</div>
    <html5-qrcode v-if="html5QrcodeFlag" tip="提示：请扫描药盒一侧“商品码”或“追溯码”" @success='success' @error="error" definition :readers='["code_128_reader", "ean_reader"]'></html5-qrcode>
    <div style="color: #fff;font-size: 15px;">{{ text }}</div>
  </div>
</template>
<style lang="scss" scoped>
.saoyisao {
  color: red;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
}
</style>
