"use strict";(self["webpackChunke_commerce_dessert"]=self["webpackChunke_commerce_dessert"]||[]).push([[952],{9952:function(t,e,s){s.r(e),s.d(e,{default:function(){return M}});var i=s(3396),a=s(7139),o=s(1896);const l=t=>((0,i.dD)("data-v-756848f0"),t=t(),(0,i.Cn)(),t),n={class:"container-md py-5"},r=(0,i.uE)('<h2 class="text-center mb-3 mb-md-4" data-v-756848f0> 我的最愛甜點<i class="bi bi-heart-fill text-danger" data-v-756848f0></i></h2><div class="row justify-content-center mb-4 mb-md-5" data-v-756848f0><div class="col-10 d-flex justify-content-center" data-v-756848f0><img src="'+o+'" class="fav-img" alt="我的最愛" data-v-756848f0></div></div>',2),d={key:0,class:"row justify-content-center"},c={class:"col-12 col-lg-10"},u={class:"list-group list-group-flush"},f=["src","alt"],m={class:"product-infos d-flex flex-md-row flex-column align-items-md-center ms-3 ms-lg-5"},p={class:"name mb-0 fw-bold"},g={class:"price d-flex flex-md-row flex-column align-items-md-center ms-md-4"},v={class:"text-muted text-decoration-line-through fs-6 me-lg-3 me-2"},h=(0,i.Uk)(" 原價 NT$ "),_={class:"fs-6"},b={class:"text-danger fw-bold fs-6"},w=(0,i.Uk)(" 特價 NT$ "),x={class:"fs-5"},y={class:"d-flex"},k=["disabled","onClick"],C=["onClick"],$=l((()=>(0,i._)("i",{class:"bi bi-x-lg"},null,-1))),L=[$],P={key:1,class:"row"},S={class:"col-12 d-flex justify-content-center align-items-center flex-column"},D=l((()=>(0,i._)("p",{class:"fs-4"},"目前沒有加入最愛的甜點",-1))),T=(0,i.Uk)("購物去");function j(t,e,s,o,l,$){const j=(0,i.up)("VueLoading"),F=(0,i.up)("RouterLink");return(0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i.Wm)(j,{active:l.isLoading},null,8,["active"]),(0,i._)("div",n,[r,0!==l.favorite.length?((0,i.wg)(),(0,i.iD)("div",d,[(0,i._)("div",c,[(0,i._)("ul",u,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(l.favProducts,(t=>((0,i.wg)(),(0,i.iD)("li",{class:"list-group-item d-flex justify-content-between align-items-center overflow-auto",key:t.id},[(0,i.Wm)(F,{class:"d-flex text-decoration-none",to:`product/${t.id}`},{default:(0,i.w5)((()=>[(0,i._)("img",{src:t.imageUrl,alt:t.category},null,8,f),(0,i._)("div",m,[(0,i._)("h2",p,(0,a.zw)(t.title),1),(0,i._)("div",g,[(0,i._)("div",v,[h,(0,i._)("span",_,(0,a.zw)(t.origin_price),1)]),(0,i._)("div",b,[w,(0,i._)("span",x,(0,a.zw)(t.price),1)])])])])),_:2},1032,["to"]),(0,i._)("div",y,[(0,i._)("button",{type:"button",class:"btn btn-primary text-nowrap",disabled:l.loadingState,onClick:e=>$.addToCart(t.id)}," 加入購物車 ",8,k),(0,i._)("button",{type:"button",class:"btn btn-danger ms-2 ms-lg-3",onClick:e=>$.delMyFavorite(t.id)},L,8,C)])])))),128))])])])):((0,i.wg)(),(0,i.iD)("div",P,[(0,i._)("div",S,[D,(0,i.Wm)(F,{to:"/user/products",class:"btn btn-lg btn-warning"},{default:(0,i.w5)((()=>[T])),_:1})])]))])],64)}var F=s(7897),I={data(){return{products:[],favProducts:[],favorite:JSON.parse(localStorage.getItem("favorite"))||[],loadingState:!1,isLoading:!1}},watch:{favorite:{handler(){localStorage.setItem("favorite",JSON.stringify(this.favorite))},deep:!0}},methods:{getAllProducts(){this.isLoading=!0;const t="https://vue3-course-api.hexschool.io/v2/api/steven1220/products/all";this.$http.get(t).then((t=>{this.products=t.data.products,this.filterMyFav(),this.isLoading=!1})).catch((t=>{console.log(t.response.data)}))},filterMyFav(){this.favProducts=this.products.filter((t=>-1!==this.favorite.indexOf(t.id)))},delMyFavorite(t){const e=this.favorite.findIndex((e=>e===t)),s=this.favProducts.filter((e=>e.id===t));this.favorite.splice(e,1),this.getAllProducts(),setTimeout((()=>{this.$swal.fire({title:`<i class="text-danger bi bi-heartbreak-fill"></i> 已刪除 ${s[0].title} `,confirmButtonColor:"#3C3F5F",showClass:{popup:"animate__animated animate__fadeInDown"},hideClass:{popup:"animate__animated animate__fadeOutUp"}})}),500)},addToCart(t){const e={product_id:t,qty:1};this.loadingState=!0,this.$http.post("https://vue3-course-api.hexschool.io/v2/api/steven1220/cart",{data:e}).then((()=>{const t=this.$swal.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:1500,timerProgressBar:!0,didOpen:t=>{t.addEventListener("mouseenter",this.$swal.stopTimer),t.addEventListener("mouseleave",this.$swal.resumeTimer)}});t.fire({icon:"success",title:"成功加入購物車"}),F.Z.emit("get-cart"),this.loadingState=!1})).catch((t=>{console.log(t.response.data)}))}},mounted(){this.getAllProducts(),F.Z.emit("toggle-menu")}},O=s(89);const U=(0,O.Z)(I,[["render",j],["__scopeId","data-v-756848f0"]]);var M=U},1896:function(t,e,s){t.exports=s.p+"img/favorite.e8c586bd.jpg"}}]);
//# sourceMappingURL=952.cf8f9689.js.map