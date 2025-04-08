<script setup>
import Html5Qrcode from './Html5Qrcode.vue'
import QRCodeScanner from '@/views/areaTool/QRCodeScanner.vue';
import { onMounted, ref } from 'vue';
onMounted(() => {
});
const saoyisao = () => {
  html5QrcodeFlag.value = true
  text.value = ''
}
const saoyisao2 = () => {
  QRCodeScannerFlag.value = true
  text.value = ''
}
const html5QrcodeFlag = ref(false)
const QRCodeScannerFlag = ref(false)
const text = ref('')
const success = (t) => {
  html5QrcodeFlag.value = false
  text.value = '扫描成功1：' + t
}
const error = (msg, err) => {
  html5QrcodeFlag.value = false
  if (!msg && !err) return
  console.error(err)
  text.value = '扫描失败1：' + msg
}
const scanResult = ref('');
const handleScanSuccess = (result) => {
  text.value = '扫描成功2：' + result
  QRCodeScannerFlag.value = false
}
const handleScanError = (error) => {
  text.value = '扫描失败2：' + error
  QRCodeScannerFlag.value = false
}
</script>
<template>
  <div class="dw-w-full">
    <div class="saoyisao" @click="saoyisao">打开扫一扫【1】</div>
    <div class="saoyisao" @click="saoyisao2">打开扫一扫【2】</div>
    <html5-qrcode v-if="html5QrcodeFlag" tip="提示：请扫描药盒一侧“商品码”或“追溯码”" @success='success' @error="error" definition :readers='["code_128_reader", "ean_reader"]'></html5-qrcode>
    <QRCodeScanner v-if="QRCodeScannerFlag" @scan-success="handleScanSuccess" @scan-error="handleScanError" />
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
