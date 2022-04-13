<template>
  <VueLoading :active="isLoading"></VueLoading>
  <div class="wrap">
    <section class="container py-5">
      <h2 class="text-center text-primary pb-4">甜點基本組成介紹</h2>
      <!-- 第1種 -->
      <div class="row g-4 mb-3">
        <div class="col-12 col-md-7">
          <div class="pic">
            <img
              src="https://storage.googleapis.com/vue-course-api.appspot.com/steven1220/1649559726500.jpeg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Eqb%2FKy%2Bvq02YfZiN%2BE43gcsFuHMoMRyev4%2Fowev%2FoQ1gBgWeKYMhqSASv9n9NP5g%2FpJ3n7T6YcYRrgXkP1SEWyjuGMVHn6EpaAhn0NHaP43RuObFS0hzajc09TmtleHDrA9SPyCi6c7jyWW9P9AnE2n1kCS%2Fbb38UGwpRVBID4mi8M3NASdOrItH4aK5sxoa42w9VW7QKzEz3YLWsOF%2F%2B3RDG76fAwstzEGhLEaMdmulbvSDt1rUsR4VySgddAi3gHDN9sL0jEPLe%2BsJuUS6Qlv1ViviO%2FA9yGk7hyWTWUG6hMFakcs0t54kkijkxF4MF9s5xeEY6OBSObWBYzpuYQ%3D%3D"
              style="object-fit: cover; height: 300px; width: 100%"
              alt="派皮"
            />
          </div>
        </div>
        <div
          class="col-12 col-md-7 offset-md-5 d-flex align-items-center txt-block"
        >
          <div class="text-center special-bg p-3">
            <h2>派皮</h2>
            <p>
              使用麵粉、奶油為主，質地酥脆，要講求烘烤時間的控制，我們的產品巴黎蛋塔也有使用到派皮作為基底。
            </p>
          </div>
        </div>
      </div>
      <!-- 第2種 -->
      <div class="row g-4 mb-3">
        <div class="col-12 col-md-7 offset-md-5">
          <div class="pic">
            <img
              src="https://storage.googleapis.com/vue-course-api.appspot.com/steven1220/1649559816482.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=pf%2BNSGn21VCWOteTlMMvUN5aMcYNvxqggRTmE7ccwSlR5bHFABC8YAcKJeLSiiDT54x2WVxAbxYoH3GWGC26xFYMQ0Jd4hCCeqzkk18WQygwBO5jCbp6BOU%2FP%2Ff6PvGZeFyowdpJ096cMTxdm1le3LfTckReq%2BiBNc1wB1YKW4YPxsTl9U3L%2F4p6p42fFeG7zXpQgSxPqjS0ynks1IvX7KCsOrc9GhqyoxkuMBVouUP8JWsMWOsBRJ0H4xK%2FekTtPlOkSs%2BX1%2BiUu3TFx65NnUR9GrvdOIKDSFQvvQNP8AwIuBv%2BP0%2FBH8rcuWEHT6PAhGpxg2tk6IHBCdkW%2FZeezg%3D%3D"
              style="object-fit: cover; height: 300px; width: 100%"
              alt="夾心餅乾蛋糕"
            />
          </div>
        </div>
        <div class="col-12 col-md-7 d-flex align-items-center txt-block">
          <div class="text-center special-bg p-3">
            <h2>夾心餅乾蛋糕</h2>
            <p>
              在法式甜點中使用頻率很高，常作為蛋糕類的基底或是中間的夾層，知名的歐貝拉蛋糕就有使用，是法式甜點中不可或缺的組合。
            </p>
          </div>
        </div>
      </div>
      <!-- 第3種 -->
      <div class="row g-4 mb-3">
        <div class="col-12 col-md-7">
          <div class="pic">
            <img
              src="https://storage.googleapis.com/vue-course-api.appspot.com/steven1220/1649559875646.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=XLGyvdH921HQ6hroQWFfDIBCD7nLO0uvUzJ6Qygj9ugPexL%2Fmm3LvvlhJcugWTVRnP0AZdNVMmNcgT5ZTbUQLhGWTXo1gyTxqw%2BzMLpwwsN4Hs4Qb97LgBI6kTZNs1DojDndM%2FwzMFCO%2FZ0%2FMM%2BueeXBQQrfAI6yo0CtdP%2FjWB9FMM9sGBZ13aHTqqd9gquEFqWYbZAT0kVW8yeJ9aYPmGcxmyApjfnt3GSPGWNnhullByV4LZG5ojNPkI4QpFGk4ITuK79rholbADwkS7fixl093JcFQzuPrgWhJliOPUP8Vsvezez0G0ifyP2U691i7qKoBE5rD3rZIoyk1oV0ww%3D%3D"
              style="object-fit: cover; height: 300px; width: 100%"
              alt="法式戚風蛋糕"
            />
          </div>
        </div>
        <div
          class="col-12 col-md-7 offset-md-5 d-flex align-items-center txt-block"
        >
          <div class="text-center special-bg p-3">
            <h2>法式戚風蛋糕</h2>
            <p>
              蛋打發後加入麵粉、砂糖、發粉混和，常作為蛋糕的主體。亦可當做底層或夾層蛋糕使用，蓬鬆的口感是最大特色。
            </p>
          </div>
        </div>
      </div>
      <!-- 第4種 -->
      <div class="row g-4 mb-3">
        <div class="col-12 col-md-7 offset-md-5">
          <div class="pic">
            <img
              src="https://storage.googleapis.com/vue-course-api.appspot.com/steven1220/1649559951990.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=VIUonloPqTo266e5hLYIIl4iCkg5B%2B01W%2FYcoZS4jLFJOxGrRhX5RlBrLZByq7%2Bl%2FtOTUD7pUZz%2BGcRLI47JGcwiyPXpGyakng7cMk3AtsL7TUPoTlm4N7jv%2BYRmXnBn3RjTexIABkTWk1iO2upCQ3h276gOU%2BIOb6Ar6lj%2FWTATmWjk5712o5zxJl3LTFICbCcL2V3%2BlALs0D1KpOwtDO%2FpWoRS9gmDTJWgzu1pcgWn%2FNYR8ELYfiaHYb2GhZQcwdMkcLPpHJ1jmo75z8N%2F2qTxB4N9lb7aWJVZVozPpy51N0tErAyxkIkWycmgJwWrf1YoDZgVrXl5Eoxf0qwVfA%3D%3D"
              style="object-fit: cover; height: 300px; width: 100%"
              alt="奶黃餡"
            />
          </div>
        </div>
        <div class="col-12 col-md-7 d-flex align-items-center txt-block">
          <div class="text-center special-bg p-3">
            <h2>奶黃餡</h2>
            <p>
              最廣為人知的名稱為卡士達醬，組成原料是牛奶、糖、玉米、蛋黃，經典味道的是香草風味，千層派、
              泡芙都有使用。
            </p>
          </div>
        </div>
      </div>
      <!-- 第5種 -->
      <div class="row g-4">
        <div class="col-12 col-md-7">
          <div class="pic">
            <img
              src="https://storage.googleapis.com/vue-course-api.appspot.com/steven1220/1649560008598.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=WmdAZDlnpvDcy4q4SXrRcm2qYyqRBICkBHkmxe6GJkZZO6wpIl88bDePbp2KWbDrKQk4xuV3bhP1ryZ54DFefhtcHqA1XgRo6%2F%2Bd33EoWAGwd%2BKYRIv%2BaAVzhhhthQ9vmWv1URlZBfIPNPenrFrnxXdPVM5vng6oUptdRA9fyIHUzd9uwj9Iy4zuSSLu%2B1%2F7sZ0PAoMzJTkwfeyz%2BYYIrBhqjfESgm%2BVOc6OO2bRhDNPt8H5oD34E0nACE%2B4KagVSaQfWXhSf6kXF1wT1sFBRLxT7gVzczQVc2F5eSvzzzNZEtlFpgEL80nHo7Dq0SMQe02KnIwEmx3MakNwUJm6DA%3D%3D"
              style="object-fit: cover; height: 300px; width: 100%"
              alt="巧克力餡"
            />
          </div>
        </div>
        <div
          class="col-12 col-md-7 offset-md-5 d-flex align-items-center txt-block"
        >
          <div class="text-center special-bg p-3">
            <h2>巧克力餡</h2>
            <p>
              使用黑巧克力或牛奶巧克力融合液態鮮奶油混和，當作松露巧克力的主體、蛋糕類夾心，可以在
              甜點製作上使用不同的搭配。
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import emitter from "@/libraries/emitter";

export default {
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
    emitter.emit("toggle-menu");
  },
};
</script>

<style lang="scss" scoped>
.special-bg {
  background-color: rgba(248, 184, 8, 0.575);
}
@media (min-width: 768px) {
  .txt-block {
    margin-top: -300px;
  }
}
@media (max-width: 767px) {
  .txt-block {
    margin-top: 0px;
  }
}
</style>
