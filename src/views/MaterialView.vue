<template>
  <VueLoading :active="isLoading"></VueLoading>
  <div class="wrap">
    <section class="container py-5">
      <h2 class="text-center text-primary pb-4">甜點基本組成介紹</h2>
      <!-- 第1種 -->
      <div class="row g-4 mb-3">
        <div class="col-md-6">
          <div class="pic">
            <img
              src="https://images.pexels.com/photos/3602269/pexels-photo-3602269.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              style="object-fit: cover; height: 300px; width: 100%"
              class=""
              alt=""
            />
          </div>
        </div>
        <div class="col-md-6 d-flex justify-content-center align-items-center">
          <div class="text-center">
            <h2>派皮</h2>
            <p>
              使用麵粉、奶油為主，質地酥脆，要講求烘烤時間的控制，我們的產品巴黎蛋塔也有使用到派皮作為基底
            </p>
          </div>
        </div>
      </div>
      <!-- 第2種 -->
      <div class="row g-4 mb-3 flex-md-row-reverse">
        <div class="col-md-6">
          <div class="pic">
            <img
              src="https://images.unsplash.com/photo-1600477064200-e193c0020287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              style="object-fit: cover; height: 300px; width: 100%"
              class=""
              alt=""
            />
          </div>
        </div>
        <div class="col-md-6 d-flex justify-content-center align-items-center">
          <div class="text-center">
            <h2>夾心餅乾蛋糕</h2>
            <p>
              在法式甜點中使用頻率很高，常作為蛋糕類的基底或是中間的夾層，知名的歐貝拉蛋糕就有使用，是法式甜點中不可或缺的組合
            </p>
          </div>
        </div>
      </div>
      <!-- 第3種 -->
      <div class="row g-4 mb-3">
        <div class="col-md-6">
          <div class="pic">
            <img
              src="https://images.pexels.com/photos/1359320/pexels-photo-1359320.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              style="object-fit: cover; height: 300px; width: 100%"
              class=""
              alt=""
            />
          </div>
        </div>
        <div class="col-md-6 d-flex justify-content-center align-items-center">
          <div class="text-center">
            <h2>法式戚風蛋糕</h2>
            <p>
              蛋打發後加入麵粉、砂糖、發粉混和，常作為蛋糕的主體。亦可當做底層或夾層蛋糕使用。
            </p>
          </div>
        </div>
      </div>
      <!-- 第4種 -->
      <div class="row g-4 mb-3 flex-md-row-reverse">
        <div class="col-md-6">
          <div class="pic">
            <img
              src="https://images.unsplash.com/photo-1569461610576-2d995e62e84b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
              style="object-fit: cover; height: 300px; width: 100%"
              class=""
              alt=""
            />
          </div>
        </div>
        <div class="col-md-6 d-flex justify-content-center align-items-center">
          <div class="text-center">
            <h2>奶黃餡</h2>
            <p>
              最廣為人知的名稱為卡士達醬，組成原料是牛奶、糖、玉米、蛋黃，經典味道的是香草風味，千層派、
              泡芙都有使用
            </p>
          </div>
        </div>
      </div>
      <!-- 第5種 -->
      <div class="row g-4">
        <div class="col-md-6">
          <div class="pic">
            <img
              src="https://images.unsplash.com/photo-1590080875852-ba44f83ff2db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              style="object-fit: cover; height: 300px; width: 100%"
              class=""
              alt=""
            />
          </div>
        </div>
        <div class="col-md-6 d-flex justify-content-center align-items-center">
          <div class="text-center">
            <h2>巧克力餡</h2>
            <p>
              使用黑巧克力或牛奶巧克力融合液態鮮奶油混和，當作松露巧克力的主體、蛋糕類夾心，可以在
              甜點製作上使用不同的搭配
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
  <FooterView></FooterView>
</template>

<script>
import FooterView from "@/components/FooterView.vue";
export default {
  components: {
    FooterView,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    LoadingEffect() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    },
  },
  mounted() {
    this.LoadingEffect();
  },
};
</script>
