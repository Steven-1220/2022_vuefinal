<template>
  <VueLoading :active="isLoading" />
  <div class="wrap">
    <div class="container mt-5">
      <h2 class="text-center">購物須知</h2>
      <div class="row">
        <div class="col-12 d-flex justify-content-center align-items-center">
          <img
            src="../assets/images/notice.jpg"
            alt="購物須知"
            class="img-notice"
          />
        </div>
      </div>
    </div>

    <div class="container pb-5 pb-lg-7">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-10">
          <div class="accordion">
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingOne">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  @click="toggleAccordion(0)"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  <i class="bi bi-circle-fill me-2"></i>
                  甜點的製作過程使用哪些原料?
                  <i class="bi bi-caret-down-fill rotate-icon ms-auto"></i>
                </button>
              </h2>
              <div
                id="collapseOne"
                class="accordion-collapse collapse"
                aria-labelledby="headingOne"
              >
                <div class="accordion-body bg-warning">
                  我們堅持選用天然無添加的高品質原料，像是法國進口奶油、新鮮水果及頂級巧克力。
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingTwo">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  @click="toggleAccordion(1)"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  <i class="bi bi-circle-fill me-2"></i>
                  是否有提供宅配服務?
                  <i class="bi bi-caret-down-fill rotate-icon ms-auto"></i>
                </button>
              </h2>
              <div
                id="collapseTwo"
                class="accordion-collapse collapse"
                aria-labelledby="headingTwo"
              >
                <div class="accordion-body bg-warning">
                  是的，我們提供冷藏宅配，確保甜點送達時的完美狀態。可以在結帳時填寫希望的配送日期，我們會盡量安排
                </div>
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header" id="headingTwo">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  @click="toggleAccordion(2)"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  <i class="bi bi-circle-fill me-2"></i>
                  有提供客製化甜點嗎?
                  <i class="bi bi-caret-down-fill rotate-icon ms-auto"></i>
                </button>
              </h2>
              <div
                id="collapseTwo"
                class="accordion-collapse collapse"
                aria-labelledby="headingTwo"
              >
                <div class="accordion-body bg-warning">
                  有的，我們接受特殊場合的客製化甜點訂製，請提前至少 14
                  天與我們聯繫。
                </div>
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header" id="headingTwo">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  @click="toggleAccordion(3)"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  <i class="bi bi-circle-fill me-2"></i>
                  如果收到的甜點有問題，該怎麼辦?
                  <i class="bi bi-caret-down-fill rotate-icon ms-auto"></i>
                </button>
              </h2>
              <div
                id="collapseTwo"
                class="accordion-collapse collapse"
                aria-labelledby="headingTwo"
              >
                <div class="accordion-body bg-warning">
                  若您收到的甜點有損壞或其他問題，請在24小時內拍照聯繫客服，我們會盡快為您提供補救方案或退款服務。
                </div>
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header" id="headingThree">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  @click="toggleAccordion(4)"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  <i class="bi bi-circle-fill me-2"></i>
                  有哪些付款方式呢?
                  <i class="bi bi-caret-down-fill rotate-icon ms-auto"></i>
                </button>
              </h2>
              <div
                id="collapseThree"
                class="accordion-collapse collapse"
                aria-labelledby="headingThree"
              >
                <div class="accordion-body bg-warning">
                  我們提供信用卡付款、ATM
                  轉帳、超商取貨付款，可以依據您的付款習慣做選擇。
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from "@/libraries/emitter";
import Collapse from "bootstrap/js/dist/collapse";

export default {
  data() {
    return {
      isLoading: false,
      accordionModals: [],
    };
  },
  methods: {
    LoadingEffect() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    },
    toggleAccordion(index) {
      const targetAccordion = this.accordionModals[index];
      targetAccordion.toggle();

      const arrowIcon = document.querySelectorAll(
        ".accordion-button .rotate-icon",
      )[index];
      arrowIcon.classList.toggle("active");
    },
  },
  mounted() {
    this.LoadingEffect();
    emitter.emit("toggle-menu");

    const accordionElements = document.querySelectorAll(".accordion-collapse");
    this.accordionModals = Array.from(accordionElements).map(
      (element) => new Collapse(element, { toggle: false }),
    );
  },
};
</script>

<style lang="scss">
.img-notice {
  width: 50%;
  height: 70%;
  object-fit: contain;
}

.accordion-button {
  font-size: 14px;
  @media (min-width: 768px) {
    font-size: 16px;
  }
  &::after {
    display: none;
  }
  &:hover {
    background: #1c2049;
    color: #fff;
  }
  &:focus {
    box-shadow: none;
  }
  i {
    &:first-child {
      font-size: 10px;
      @media (min-width: 768px) {
        font-size: 14px;
      }
    }
  }
  .rotate-icon {
    transition: transform 0.2s ease-in-out;
    &.active {
      transform: rotate(180deg);
    }
  }
}
</style>
