<template>
  <div class="reader-box">
    <div class="close" @click.stop="stopScan(() => {$emit('error')})">╳</div>
    <div v-if="tip" class="tip">{{ tip }}</div>
    <div id="reader" class="reader"></div>
    <div class="change">
      选择摄像头：
      <select @change="changeCamera" v-model="select">
        <option v-for="(item, index) in cameras" :key="index" :value="item.id">
          {{ item.label }}
        </option>
      </select>
      <!-- fps：
      <select @change="changeCamera" v-model="selectFps">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
        <option value="60">60</option>
        <option value="70">70</option>
        <option value="80">80</option>
        <option value="90">90</option>
        <option value="100">100</option>
        <option value="200">200</option>
        <option value="300">300</option>
        <option value="400">400</option>
        <option value="500">500</option>
      </select> -->
    </div>
  </div>
</template>
<script>
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode'
export default {
  // 当前组件名称，命名规范：大驼峰格式、至少两个单词
  props: {
    tip: String
  },
  data () {
    return {
      cameras: [],
      select: '',
      selectFps: 200
    }
  },
  methods: {
    initScan () {
      this.html5QrCode = new Html5Qrcode('reader', {
        formatsToSupport: [Html5QrcodeSupportedFormats.CODE_128, Html5QrcodeSupportedFormats.EAN_13, Html5QrcodeSupportedFormats.EAN_8]
      })
      // this.openQrcode()
      Html5Qrcode.getCameras().then(devices => {
        if (devices && devices.length) {
          devices.forEach((device, index) => {
            // && device.label.indexOf('back') !== -1
            // console.log('device.kind - ' + device.kind, device.id, device)
            if (device.label.indexOf('back') !== -1 || device.label.indexOf('后置') !== -1) {
              console.log(device, device.label + ' - ' + device.deviceId)
              this.select = device.id
            }
            this.cameras.push(device)
          })
          if (!this.select) this.select = this.cameras[0].id
          this.openQrcode(this.select)
        }
      }).catch(err => {
        console.error('获取摄像头列表失败=', err)
        this.$emit('error', '获取摄像头列表失败=', err)
        // this.$dialog.confirm({
        //   title: '提示',
        //   message: '获取摄像头列表失败！是否刷新页面重试？',
        //   confirmButtonColor: '#409EFF'
        // }).then(() => {
        //   // on confirm
        //   window.location.reload()
        // }).catch(() => {
        //   // on cancel
        //   this.$emit('error')
        // })
      })
    },
    openQrcode (cameraId) {
      // this.html5QrcodeScanner = new Html5QrcodeScanner(
      //   'reader',
      //   { fps: 10, qrbox: { width: 250, height: 250 } },
      //   /* verbose= */ false)
      // this.html5QrcodeScanner.render(this.onScanSuccess, this.onScanFailure)
      // ------------------------------------------------
      // this.html5QrCode = new Html5Qrcode('reader')
      // this.html5QrCode.start({ facingMode: 'environment' }, {
      //   fps: 10, // Optional, frame per seconds for qr code scanning
      //   qrbox: { width: 250, height: 250 } // Optional, if you want bounded box UI
      // }, (decodedText, decodedResult) => {
      //   console.log(decodedText, decodedResult)
      //   // 未获取到结果
      //   if (!decodedText) {
      //     return
      //   }
      //   // 识别到第一个结果
      //   if (!this.data1) {
      //     this.data1 = decodedText
      //     return
      //   }
      //   // 识别到第二个结果
      //   this.data2 = decodedText
      //   // 判断前后两个结果是否相等
      //   if (this.data2 !== this.data1) {
      //     this.data1 = '' // 不相等时，重置第一个值
      //     return
      //   }
      //   this.stopScan()
      // })
      // console.log('使用FPS=', this.selectFps)
      this.html5QrCode.start(
        cameraId,
        {
          fps: this.selectFps, // Optional, frame per seconds for qr code scanning
          qrbox: { width: 250, height: 250 } // Optional, if you want bounded box UI
        },
        (decodedText, decodedResult) => {
          // do something when code is read
          console.log(decodedText, decodedResult)
          // 未获取到结果
          if (!decodedText) {
            return
          }
          // 识别到第一个结果
          if (!this.data1) {
            this.data1 = decodedText
            return
          }
          // 识别到第二个结果
          this.data2 = decodedText
          // 判断前后两个结果是否相等
          if (this.data2 !== this.data1) {
            this.data1 = '' // 不相等时，重置第一个值
            return
          }
          this.stopScan(() => {
            this.$emit('success', this.data2)
          })
        },
        (errorMessage) => {
          // this.close('识别错误！')
          // console.log(errorMessage)
        })
        .catch((err) => {
          this.$emit('error', '摄像头开启失败！', err)
        })
    },
    // onScanSuccess (decodedText, decodedResult) {
    //   // handle the scanned code as you like, for example:
    //   console.log(`Code matched = ${decodedText}`, decodedResult)
    //   this.html5QrcodeScanner.clear()
    // },
    // onScanFailure (error) {
    //   // handle scan failure, usually better to ignore and keep scanning.
    //   // for example:
    //   console.warn(`Code scan error = ${error}`)
    // },
    stopScan (cb) {
      this.html5QrCode.stop().then((ignore) => {
        // QR Code scanning is stopped.
        cb && cb()
      }).catch((err) => {
        this.$emit('error', '摄像头关闭失败！', err)
      })
    },
    close (msg) {

    },
    changeCamera () {
      this.html5QrCode.stop().then((ignore) => {
        // QR Code scanning is stopped.
        this.openQrcode(this.select)
      }).catch((err) => {
        this.$notify({ type: 'warning', message: '摄像头切换-关闭失败！' })
        console.log(err)
      })
    }
    // // 判断是否小米手机（当前无法正常判断）
    // isXiaomiPhone () {
    //   const userAgent = navigator.userAgent || navigator.vendor || window.opera
    //   console.log('设备信息=', userAgent.toLowerCase())
    //   // return userAgent.toLowerCase().includes('xiaomi') || userAgent.toLowerCase().includes('mi')
    // }
  },
  mounted () {
    // this.isXiaomiPhone()
    this.cameras = []
    this.initScan()
  },
  // beforeDestroy () {
  //   this.stopScan()
  // },
  activated () {
    this.stopScan()
  },
  deactivated () {
    this.stopScan()
  }
}
</script>
<style lang="scss" scoped>
.reader-box {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0);
  width: 100vw;
  height: 100vh;
  .close {
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    position: absolute;
    right: 15px;
    top: 15px;
  }
  .change {
    position: absolute;
    width: 100%;
    text-align: center;
    color: #fff;
    font-size: 16px;
    top: calc(50% + 150px);
    z-index: 999;
  }
  .tip {
    // position: absolute;
    // text-align: center;
    // width: 100%;
    // top: 30px;
    // left: 0px;
    // color: #fff;
    position: absolute;
    width: 100%;
    text-align: center;
    color: rgb(201, 201, 201);
    font-size: 16px;
    top: calc(50% - 200px);
    z-index: 999;
  }
}
.reader {
  margin: 0 auto;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
