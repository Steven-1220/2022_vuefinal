<template>
  <VueLoading :active="isLoading"></VueLoading>
  <div class="wrap bg-warning">
    <div class="container py-5">
      <h2 class="text-center pb-4">關於我們(SweetHome)</h2>
      <div class="row justify-content-center">
        <div
          class="col-md-12 col-lg-6 d-flex justify-content-center align-items-center"
        >
          <img
            src="https://images.pexels.com/photos/3740196/pexels-photo-3740196.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            alt=""
            style="height: 70%; object-fit: cover"
            class="img-fluid w-md-50 w-sm-100"
          />
        </div>
      </div>
    </div>
    <div class="container pb-5">
      <div class="row mb-5">
        <div class="col d-flex flex-column mw-100 align-items-center">
          <div class="fs-5">
            <p>
              甜點店在法國巴黎街頭，大街小巷處處林立著甜點店，甜點幾乎就是法國的代表。類比在台灣就等於大街小巷的小吃攤販一樣。甜點是法國人生命中不可或缺的一部分，正餐吃完後必定由甜點來結束，才是完美幸福的一餐。
            </p>
          </div>
          <div class="fs-5">
            <p>
              幾個在餐飲學院畢業的年輕人，並在知名飯店餐廳由學徒做起，對於法式甜點有滿滿的興趣，常常向糕點師傅請教討論製作方法，對每一道甜點都是包覆了需多熱情，製作出除了外型討喜且吸引人的甜點，美味程度和口感更是這些甜點的靈魂。這幾位年輕人希望藉由這些甜點，帶給大家法式甜點的幸福
            </p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <h3 class="fs-3">聯絡我們</h3>
          <p>有任何疑問歡迎與我們聯繫</p>
          <ul class="list-unstyled fs-4">
            <li>
              <a href="tel:+55-888-800-123" class="text-decoration-none"
                ><i class="bi bi-telephone-fill"></i> +55 888 800 123</a
              >
            </li>
            <li>
              <a href="mailto:sweethome@gmail.com" class="text-decoration-none"
                ><i class="bi bi-envelope-fill"></i> sweethome@gmail.com</a
              >
            </li>
            <li><i class="bi bi-geo-alt-fill"></i>台中市南屯區大墩路500號</li>
          </ul>
        </div>
        <div class="col-md-8">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3640.662954530414!2d120.64794831498901!3d24.148471984394696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34693dbdf525a123%3A0xecc8ebd0f891d73d!2zNDA45Y-w5Lit5biC5Y2X5bGv5Y2A5aSn5aKp6LevNTAw6Jmf!5e0!3m2!1szh-TW!2stw!4v1648387895181!5m2!1szh-TW!2stw"
            width="100%"
            height="400"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
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
