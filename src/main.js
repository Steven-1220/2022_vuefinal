import { createApp } from "vue";
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import VueAxios from "vue-axios";
// 讀取效果
import VueLoading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
// 表單驗證
import { Form, Field, ErrorMessage, defineRule, configure } from "vee-validate";
import AllRules from "@vee-validate/rules";
import { localize, setLocale } from "@vee-validate/i18n";
import zhTW from "@vee-validate/i18n/dist/locale/zh_TW.json";
// 自訂義方法
import $httpMessageState from "@/libraries/pushMessageState";
import App from "./App.vue";
import router from "./router";

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});
// 設定預設語系
setLocale("zh_TW");

const app = createApp(App);

// 將 $httpMessageState 加入全域
app.config.globalProperties.$httpMessageState = $httpMessageState;
app.use(router);
app.use(VueAxios, axios);
// 註冊讀取效果
app.component("VueLoading", VueLoading);
// 註冊表單驗證
app.component("VForm", Form);
app.component("VField", Field);
app.component("ErrorMessage", ErrorMessage);

app.mount("#app");
