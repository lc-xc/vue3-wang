<template>
  <div>
    <!-- 摄像头显示区域 -->
    <div id="scanner-container" ref="scanner"></div>
    <!-- 识别结果显示 -->
    <div v-if="result" class="result">{{ result }}</div>
  </div>
</template>
<script>
// import { BrowserMultiFormatReader } from '@zxing/library';
import Quagga from 'quagga';
export default {
  name: 'QRCodeScanner',
  data() {
    return { result: '' };
  },
  mounted() {
    this.initScanner();
  },
  beforeDestroy() {
    Quagga.stop();  // 销毁时关闭摄像头
  },
  methods: {
    initScanner() {
      Quagga.init({
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: this.$refs.scanner,  // 绑定DOM容器
          // constraints: { width: 640 }  // 限制分辨率提升性能
          constraints: {
            facingMode: "environment",  // 优先后置摄像头
            width: { ideal: 800 },      // 分辨率适配移动端
            aspectRatio: 16/9           // 常见屏幕比例
          }

        },
        decoder: {
          readers: ["code_128_reader", "ean_reader"]  // 指定条码类型
        }
      }, (err) => {
        if (err) {
          console.error("摄像头初始化失败:", err);
          return;
        }
        Quagga.start();
        this.bindDetectEvent();
      });
    },
    bindDetectEvent() {
      Quagga.onDetected((result) => {
        if (result.codeResult) {
          this.result = result.codeResult.code;
          console.warn('Quagga scan 识别成功：', this.result);
          alert('识别成功: ' +  this.result)
          Quagga.stop();  // 识别成功后停止扫描
        } else {
          console.warn('Quagga scan 识别失败：', result);
        }
      });
      Quagga.onProcessed((data) => {
        if (data && data.boxes) console.log("检测到条码区域");
      });
    },
    analyzeImage(imageUrl) {
      Quagga.decodeSingle({
        decoder: {
          readers: ['code_128_reader', 'ean_reader'] // 支持的条码类型
        },
        locate: true,
        src: imageUrl
      }, (result) => {
        if (result && result.codeResult) {
          this.result = result.codeResult.code;
          URL.revokeObjectURL(imageUrl); // 释放资源
        } else {
          this.result = '识别失败';
        }
      });
    },
    // async initScanner() {
      // try {
      //   // 获取摄像头设备列表，优先选择后置摄像头（设备名含 "back" 关键字）‌:ml-citation{ref="3,4" data="citationList"}
      //   const devices = await this.codeReader.getVideoInputDevices();
      //   this.selectedDeviceId = devices.find(device =>
      //     device.label.toLowerCase().includes('back')
      //   )?.deviceId || devices?.deviceId;
      //   console.log('devices:', devices, this.selectedDeviceId);
      //   this.selectedDeviceId = devices[1]?.deviceId;
      //   if (this.selectedDeviceId) {
      //     // 启动摄像头并开始解码 ‌:ml-citation{ref="2,3" data="citationList"}
      //     this.codeReader.decodeFromVideoDevice(
      //       this.selectedDeviceId,
      //       this.videoId,
      //       (result, error) => {
      //         if (result) this.$emit('scan-success', result.text);
      //         if (error) this.$emit('scan-error', error);
      //       }
      //     );
      //   }
      // } catch (error) {
      //   console.error('摄像头初始化失败:', error);  // 处理权限或设备异常 ‌:ml-citation{ref="3,5" data="citationList"}
      // }
    // }
  }
};
</script>
