<template>
  <div class="area-qrcode">
    <!-- 摄像头显示区域 -->
    <div id="scanner-container" ref="scanner"></div>
    <!-- 识别结果显示 -->
    <!-- <div v-if="result" class="result">{{ result }}</div> -->
    <!-- 操作按钮、提示相关展示 -->
    <div class="controls">
      <div class="scanning-box"><div class="line"></div></div>
      <div class="tip" @click="toggleTorch">请将条形码放入扫描框内<br/>耐心等待对焦识别</div>
      <div class="btns">
        <!-- <div @click="toggleTorch"><i class="icon el-icon-s-opportunity"></i></div> -->
         <div @click="toggleTorch">
          <img src="@/assets/d.svg" :style="!flag && 'opacity: 0.6;'">
         </div>
        <!-- <div><i class="icon el-icon-picture"></i></div> -->
        <div>
          <van-uploader v-model="fileList" reupload max-count="1" :after-read="afterRead" :preview-image="false">
            <van-icon class="icon" name="photo" />
          </van-uploader>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { showNotify } from 'vant';
import Quagga from 'quagga';
export default {
  name: 'QRCodeScanner',
  data() {
    return {
      flag: false
    };
  },
  mounted() {
    this.initScanner();
  },
  beforeDestroy() {
    Quagga.stop();  // 销毁时关闭摄像头
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      console.log('开始识别图片', file, file.file, file.objectUrl);
      this.analyzeImage(file.objectUrl)
    },
    /**
     * 切换闪光灯
     */
    toggleTorch () {
      const track = Quagga.CameraAccess.getActiveTrack();
      if (track && track.getCapabilities().torch) {
        this.flag = !this.flag
        track.applyConstraints({ advanced: [{ torch: !track.getSettings().torch }] })
          .catch(console.error);
      } else {
        console.log('设备不支持闪光灯控制');
      }
    },
    /**
     * 初始化摄像头
     */
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
          // this.$emit('error', "摄像头初始化失败！", err)
          return;
        }
        Quagga.start();
        this.bindDetectEvent();
      });
    },
    /**
     * 绑定识别事件
     */
    bindDetectEvent() {
      Quagga.onDetected((result) => {
        if (result.codeResult) {
          this.result = result.codeResult.code;
          console.warn('Quagga scan 识别成功：', this.result);
          this.$emit('success', this.result)
          Quagga.stop();  // 识别成功后停止扫描
        } else {
          console.warn('Quagga scan 识别失败：', result);
          this.$emit('error', "识别失败！", result)
        }
      });
      Quagga.onProcessed((data) => {
        if (data && data.boxes) {
          console.log("检测到条码区域：", data.boxes);
        }
      });
    },
    /**
     * 分析图片中的条码
     * @param {string} imageUrl 图片URL
     */
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
          this.$emit('success', this.result)
          URL.revokeObjectURL(imageUrl); // 释放资源
        } else {
          console.error('识别图片中的条码失败:', result);
          this.result = '识别图片中的条码失败';
          showNotify({ type: 'warning', duration: 5000, message: '解析图片失败，请选择近距离拍摄、条码清晰的图片。' });
        }
      });
    },
    test () {
      location.refresh()
    }
  }
};
</script>
<style lang="scss" scoped>
.area-qrcode {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0);
  width: 100vw;
  height: 100vh;
  .controls {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: calc(100% - 50px);
    // border: 2px solid red;
    display: flex;
    justify-content: center;
    align-items: center;
    .scanning-box {
      width: 260px;
      height: 300px;
      overflow: hidden;
      .line {
        width: 100%;
        height: 3px;
        border-radius: 20px 20px 0px 0px;
        background: linear-gradient(
          to bottom, 
          transparent, 
          #3dbaeb 50%, 
          transparent
        ); /* 渐变实现两端淡出效果 */
        animation: scan 2s infinite linear;
        box-shadow: 0px -4px 6px 1px #3dbaeb; /* 添加发光效果 */  
      }
    }
    .tip {
      position: absolute;
      bottom: 50px;
      left: 0px;
      width: 100%;
      color: #fff;
      font-size: 16px;
      text-align: center;
    }
    .btns {
      position: absolute;
      bottom: -10px;
      left: 0px;
      width: 100%;
      color: #fff;
      font-size: 16px;
      text-align: center;
      height: 30px;
      display: flex;
      justify-content: space-between;
      padding: 0px 30px;
      div {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #c2c2c271;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon {
          color: #ffffff;
          font-size: 25px;
        }
        img {
          height: 30px;
        }
      }
    }
  }
}
@keyframes scan {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(300px); /* 移动距离等于容器高度 */
  }
}
</style>