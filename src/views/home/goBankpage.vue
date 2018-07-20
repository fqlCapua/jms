<template>
  <div v-on:scroll.passive="onScroll">
    <div id="wapper" class="goBankpage" style="padding-bottom: 0;">
      <!---->

      <my-header :headerParam="headerParam"></my-header>
      <div   class="mainbg">
        <div class="tips">{{tips1}}</div>
        <ul class="inputItem">
             <li v-for="(item,index) in payInfo" :key="index">
               <label class="label">{{item.label}}:</label>
               <input :type="item.type" :placeholder="item.pholder"   :value="item.value" />
               <span >{{item.unit}}</span>
             </li>
        </ul>
         <div class="tips">{{tips2}}</div>
        <ul class="item2">
             <li v-for="(item,index) in payManInfo" :key="index">
               <label class="label">{{item.label}}:</label>
               <input type="text" :placeholder="item.pholder"   :value="item.value" />
                
             </li>
        </ul>
           <button class="submitAccount" @click="submitAccount">{{btnValue}}</button>
      </div>
                    

   
    </div>
  </div>
</template>
<script>
import { fetchPostData, host } from "@/api";
import MyHeader from "@/components/header";

import qs from "qs";
import { Toast } from "mint-ui";
export default {
  name: "goBankpage",
  data() {
    return {
      headerParam: {
        title: "银行转账",
        setting: 0,
        back: 1
      },
      tips1: "请填写您的付款信息",
      tips2: "请填写付款人信息",
      btnValue: "提交",
      payInfo: [
        {
          type: "text",
          name: "moneyTimes",
          label: "打款笔数",
          unit: "笔",
          pholder: "请输入打款笔数"
        },
        {
          type: "date",
          name: "moneyDate",
          label: "打款日期",
          unit: ">",
          pholder: "",
          value: "2018-07-21"
        },
        {
          type: "text",
          name: "moneyCount",
          label: "打款金额",
          unit: "元",
          pholder: "请输入打款金额",
          value: "5000.00"
        }
      ],
      payManInfo: [
        {
          name: "moneyTimes",
          label: "银行账户",
          unit: "",
          value: "",
          pholder: "请输入账户户名"
        },
        {
          name: "moneyDate",
          label: "账户户名",
          unit: "",
          pholder: "请输入账户户名",
          value: ""
        }
      ]
    };
  },
  components: { MyHeader, Toast },
  methods: {
    submitAccount() {
      Toast("提交成功");
      // this.$router.push("/goBankpage");
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
<style  lang="less" scoped >
.goBankpage {
  border: 1px solid #000;
  height: 100vh;
  .mainbg {
    height: 100vh;
    background-color: #eee;
  }
  .main_tips {
    padding: 13px 8px;
    font-size: 12px;
    text-indent: 20px;
    line-height: 24px;
    letter-spacing: 2px;
  }
  .tips {
    font-size: 13px;
    font-family: "微软雅黑";
    text-indent: 5px;
    line-height: 18px;
    width: 100%;
    padding: 10px 5px;
  }
  .submitAccount {
    background-color: #4990e2;
    outline: none;
    border: none;
    color: #fff;
    font-size: 13px;
    display: inline-block;
    line-height: 35px;
    width: 80%;
    margin-left: 10%;
    margin-top: 80px;
  }
  .inputItem {
    background-color: #fff;
    li {
      width: 95%;
      margin: 0 auto;
      border-bottom: 1px solid #eee;
      font-size: 0;
      & > span,
      & > label,
      & > input {
        display: inline-block;
        vertical-align: top;
        font-size: 13px;
        height: 40px;
        line-height: 40px;
      }
      & > label {
        width: 30%;
      }
      & > span {
        width: 9%;
        text-align: right;
      }
      & > input {
        outline: none;
        text-align: right;
        border: none;
        width: 60%;
        font-size: 13px;
         background-color: #fff;
      }
      & > input:active {
        border: none;
      }
    }
 
}
  .item2 {
    background-color: #fff;
    li {
      width: 95%;
      margin: 0 auto;
      border-bottom: 1px solid #eee;
      font-size: 0;
      & > span,
      & > label,
      & > input {
        display: inline-block;
        vertical-align: top;
        font-size: 13px;
        height: 40px;
        line-height: 40px;
      }
      & > label {
        width: 30%;
      }
      & > span {
        width: 9%;
        text-align: right;
      }
      & > input {
        outline: none;
        text-align: right;
        border: none;
        width: 69%;
        font-size: 13px;
       
      }
      & > input:active {
        border: none;
      }
    }
  }
}
</style>


