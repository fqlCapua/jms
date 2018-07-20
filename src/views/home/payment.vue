<template>
  <div v-on:scroll.passive="onScroll">
    <div id="wapper" class="wapper" style="padding-bottom: 0;">
      <!---->
      <my-header :headerParam="headerParam"></my-header>
     
      <div class="main_tips">{{mainTips}}</div>
      <div class="main_account">
          <div class="brand">{{brand}}</div>
          <div class="accountValue">{{bankValue}}</div>
      </div>

      <button class="goBankpage" @click="goBankpage">{{btnValue}}</button>
    </div>
  </div>
</template>
<script>
import { fetchPostData, host } from "@/api";
import MyHeader from "@/components/header";

import qs from "qs";
import { Toast } from "mint-ui";
export default {
  name: "payment",
  data() {
    return {
      headerParam: {
        title: "银行转账",
        setting: 0,
        back: 1
      },
      mainTips:
        "请通过网银，汇款等方式打款至以下指定账户。在确认付款成功后截图并上传照片",
      bankValue: "409099981989092890",
      brand: "妙优车企业账户",
      btnValue:"上传支付凭证",
    };
  },
  components: { MyHeader, Toast },
  methods: {
      goBankpage(){
       // console.log(this.$route.params);
          this.$router.push({name:"goBankpage",params:{jmsid:this.$route.params.jmsid}});
      },
    getJms() {},
    getJmsList() {},
    menu() {
      let isLoading = true;
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.offsetHeight -
            document.documentElement.scrollTop -
            window.innerHeight <=
          60;
        if (bottomOfWindow && isLoading) {
          if (1) {
          }
        }
      };
    }
  },
  mounted: function() {}
};
</script>
<style  lang="less" scoped>
.wapper{
  .main_tips {
    padding: 13px 8px;
    font-size: 12px;
    text-indent: 20px;
    line-height: 24px;
    letter-spacing: 2px;
  }
  .main_account {
      padding:0 20px;
      font-size:19px;
    
      letter-spacing:1px;
    .brand{
      padding-bottom: 10px;
    }
    .accountValue{
      font-weight:500;
    }
  }
  .goBankpage{
      background-color: #4990E2;
      outline: none;
      border:none;
      color:#fff;
      font-size: 13px;
      display: inline-block;
      line-height:35px;
      width:80%;
      margin-left:10%;
      margin-top:80px;
  }
}
</style>


