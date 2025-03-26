<template>
  <dw-response
    :visible="true"
    title="智能报告"
    width="40%"
    :on-close="closeRes">
    <div class="ai-dialog">
      <div class="dialog-container">
        <el-scrollbar class="message-area">
          <div 
            v-for="(msg, index) in messages"
            :key="index"
            class="message-bubble"
            :class="{ 'user-message': msg.isUser }">
            <div class="message-time">{{ msg.time }}</div>
            <div class="message-content">{{ msg.content }}</div>
          </div>
        </el-scrollbar>
        
        <div class="input-area">
          <el-input
            v-model="userMessage"
            placeholder="请输入内容"
            @keyup.enter="sendMessage"
            class="animated-input">
            <template #append>
              <el-button 
                type="primary" 
                @click="sendMessage"
                icon="el-icon-position">发送</el-button>
            </template>
          </el-input>
        </div>
      </div>
    </div>
  </dw-response>
</template>

<script>
export default {
  props: {
    closeRes: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      loading: false,
      userMessage: '' // 新增用户消息数据
    }
  },
  methods: {
    init () {
    },
    sendMessage () {
      if (this.userMessage.trim() === '') return // 防止发送空消息
      // 这里可以添加发送消息的逻辑，例如调用API发送消息到服务器
      console.log('发送消息:', this.userMessage)
      // 清空输入框
      this.userMessage = ''
      // 这里可以添加接收AI回复的逻辑，并更新上面的消息显示区域
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
.ai-dialog {
  height: 80vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  
  .dialog-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 20px;

    .message-area {
      flex: 1;
      margin-bottom: 20px;
      background: rgba(255,255,255,0.9);
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);

      .message-bubble {
        max-width: 70%;
        margin: 15px;
        padding: 15px;
        border-radius: 12px;
        background: #ffffff;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        animation: fadeIn 0.3s ease;

        &.user-message {
          margin-left: auto;
          background: #409eff;
          color: white;

          .message-time {
            color: rgba(255,255,255,0.8);
          }
        }

        .message-time {
          font-size: 12px;
          color: #909399;
          margin-bottom: 5px;
        }
      }
    }

    .input-area {
      .animated-input {
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(64,158,255,0.2);
        }
      }
    }
  }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
