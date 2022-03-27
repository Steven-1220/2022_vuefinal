<template>
  <div
    class="toast-container position-fixed pe-3 top-0 end-0"
    style="z-index: 1500"
  >
    <div
      v-for="(msg, key) in messages"
      :key="key"
      class="toast show"
      :class="`toast${key}`"
      role="alert"
    >
      <div class="toast-header">
        <span
          :class="`bg-${msg.style}`"
          class="p-2 rounded me-2 d-inline-block"
        ></span>
        <strong class="me-auto">{{ msg.title }}</strong>
        <button
          type="button"
          class="btn-close"
          @click="clearToast(key)"
          aria-label="Close"
        ></button>
      </div>
      <div class="toast-body" v-if="msg.content">
        {{ msg.content }}
      </div>
    </div>
  </div>
</template>

<script>
import emitter from "@/libraries/emitter";
export default {
  data() {
    return {
      // message 裡面可放許多物件，每一個物件就是 msg { style : "success" , title: "標題" , content: "內容"}

      messages: [],
    };
  },
  // inject: ['emitter'],
  methods: {
    toastShow() {
      // 移除 messages 內容
      setTimeout(() => {
        this.messages.shift();
      }, 6000);
    },
    // 刪除整個 toast 提示
    clearToast(index) {
      this.messages.splice(index, 1);
    },
  },
  mounted() {
    // 接收資料
    emitter.on("push-message", (message) => {
      // "success" 是預設值
      const { style = "success", title, content } = message;
      this.messages.push({ style, title, content });
      this.toastShow();
    });
  },
};
</script>
