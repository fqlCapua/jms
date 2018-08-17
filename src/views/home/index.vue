<template>
    <div>
      <div id="wapper">
        <!---->
        <my-header :headerParam="headerParam" class="bgctran"></my-header>
        <!---->
        <div id="index">
          <div class="banner">
          <mt-swipe :show-indicators="false" :auto="4000">
            <mt-swipe-item v-for="(item,index) in SwipeArr" :key="index" class="imgitem">
              <img :src="item.bannerPath"  alt="">
             
             
            </mt-swipe-item>
        
           </mt-swipe>
            
          </div>
         
          <!-- <div class="index-top">
            <div class="index-top-data clearfix">
              <div class="item">
                <p class="t1">本月意向<span class="bigNum">&nbsp;&nbsp;{{myJms.intention}}</span></p>
                <p class="t2">
                  <span class="yxstores">
                    <div>{{myJms.intention_XXD}}</div>
                    <div>形象店</div>
                  </span>
                  <span class="yxstores">
                    <div>{{myJms.intention_TYD}}</div>
                    <div>体验店</div>
                  </span>
                </p>
              </div>
              <div class="item">
                <p class="t1">本月正式<span class="bigNum">&nbsp;&nbsp;{{myJms.official}}</span></p>
                <p class="t2">
                   <span class="yxstores">
                    <div>{{myJms.official_XXD}}</div>
                    <div>形象店</div>
                  </span>
                  <span class="yxstores">
                    <div>{{myJms.official_TYD}}</div>
                    <div>体验店</div>
                  </span>
                </p>
              </div>
            </div>
          </div> -->
          <!--中间部分-->
          <!-- <div class="index-center clearfix">
            <router-link :to="{path:'/editJmsInfo'}" class="item">
              <i class="icon icon1"></i>
              <p class="text">新增</p>
              <span class="ll"></span>
            </router-link>
            <router-link :to="{path:'/yxjmslist'}" class="item">
              <i class="icon icon2"></i>
              <p class="text">形象店</p>
              <span class="ll"></span>
            </router-link>
            <router-link class="item" :to="{path:'/jmslist'}">
              <i class="icon icon3"></i>
              <p class="text">体验店</p>
            </router-link>
          </div> -->
        </div>
           <div id="iconfont">
                     <a class="iconfont icon-tongzhi"></a>
                     <a class="content_des">通知内容这是一个通知内容</a> 
              </div>
        <div>
         
          <!-- 2018/7/30修改样式 -->
          <div id="listBox">
            <div class="intent_title">{{intent_title}}</div>
              <ul class="intent levelBox">
                  <li @click="goyxjmslist('2')">形象店</li>
                  <li @click="goyxjmslist('1')">体验店</li>
                  <li @click="goeditJmsInfo()">新增代理商</li>
              </ul>
              <div class="offical_title">{{offical_title}}</div>
              <ul class="offical levelBox">
                  <li  @click="gojmslist('2')">形象店</li>
                  <li  @click="gojmslist('1')">体验店</li>
              </ul>
          </div>
           

        </div>
        <!---->
        <!--页面底部-->
        <my-footer :id="footerIndex"></my-footer>
      </div>
    </div>
</template>
<script>
import MyFooter from "@/components/footer";
import MyHeader from "@/components/header";
import Vue from "vue";
import { fetchGetData, fetchPostData, host } from "@/api";
import { Swipe, SwipeItem, Toast } from "mint-ui";
export default {
  data() {
    return {
      footerIndex: 1,
      imgPre: "http://oss.miaoyouche.cn/view",
      headerParam: {
        title: "首页",
        setting: 0,
        back: 0
      },
      SwipeArr: [
        {
          id: 1,
          bannerPath:  "http://demo.htmleaf.com/1805/201805151442/img/end_of_days_by_tacosauceninja-dar6in5.jpg",
          des: "111"
        },
        {
          id: 2,
          bannerPath:  "http://demo.htmleaf.com/1805/201805151442/img/scorched_earth_by_arcipello-d5118nz.jpg",
          des: "222"
        },
        {
          id: 3,
          bannerPath:  "http://demo.htmleaf.com/1805/201805151442/img/scorched_earth_by_arcipello-d5118nz.jpg",
          des: "3333"
        }
      ],

      intent_title: "意向代理商",
      offical_title: "正式代理商",
      myJms: {},
      wills: {
        很感兴趣: 0,
        感兴趣: 0,
        需再沟通: 0,
        不感兴趣: 0
      },
      yxfield: [],
      field: [],
      yxjmsArr: [],
      jmsArr: [],
      status: {
        //                "待装修": 0,
        //                "装修中": 0,
        //                "待验收": 0,
        //                "已验收": 0,
        待开业: 0,
        已开业: 0
        //                "需再沟通": 0
      }
    };
  },
  components: { MyFooter, MyHeader, Swipe, SwipeItem },
  methods: {
    //顶部统计形象店体验店总数统计
    getMyJms() {
      fetch(host + "/agent/proxy/getStoreCount", { method: "GET" })
        .then(res => res.text())
        .then(res => {
          var res = JSON.parse(res);
          if (res.status == 1) {
            this.myJms = res.data;
          }
        });
    },
    goyxjmslist() {
      if (arguments.length) {
        this.addSession("listStatus", arguments[0]);
        this.$router.push({ path: "/yxjmslist" });
      }
    },
    gojmslist() {
      if (arguments.length) {
        this.addSession("listStatus", arguments[0]);
        this.$router.push({ path: "/jmslist" });
      }
    },
    goeditJmsInfo() {
      this.$router.push({ path: "/editJmsInfo" });
    },
    getBanner() {
      let source = 1; //1,销售端 2,商家端
      let _that = this;
      fetch(host + "/agent/ntc/appBanner?source=1", {
        method: "GET",
        headers: {
          "x-token": this.$store.state.token
        }
      })
        .then(res => res.text())
        .then(res => {
          var res = JSON.parse(res);
    
          if (res.status == 1) {
            _that.SwipeArr = res.data;
          }
        });
    }
  },
  mounted: function() {
    let vm = this;

    var data = this.getStatus(10034);
    data.then(
      function(value) {
        value.map(e => vm.yxfield.push(e.name));
      },
      function(err) {
        console.log(err);
      }
    );
    var data = this.getStatus(10035);
    data.then(
      function(value) {
        value.map(e => vm.field.push(e.name));
      },
      function(err) {
        console.log(err);
      }
    );
    this.getMyJms();
    //this.getBanner();
  },
  computed: {
    willList() {
      let list = [];
      for (let key in this.wills) {
        list.push({
          name: key,
          value: this.wills[key]
        });
      }
      return list;
    },
    statusList() {
      let list = [];
      for (let key in this.status) {
        list.push({
          name: key,
          value: this.status[key]
        });
      }
      return list;
    }
  }
};
</script>
<style lang="less" scoped>
#future-cus {
  width: 100%;
  height: 3rem;
}
#now-cus {
  width: 100%;
  height: 3rem;
  margin-top: 0.5rem;
}
#listBox {
  padding: 0 20px;
  & > div {
    line-height: 0.7rem;
    font-size: 5vw;
    font-weight: bold;
    color: #333333;
  }
  ul {
    height: 3rem;
  }
}
.yxstores {
  display: inline-block;
  width: 45%;
  text-align: center;
  padding-top: 10px;
  & div:nth-child(1) {
    font-size: 0.3rem;
    font-weight: 500;
    line-height: 0.6rem;
  }
  & div:nth-child(2) {
    font-size: 0.28rem;
    font-weight: 400;
    line-height: 0.6rem;
  }
}
.t1 {
  font-size: 0.35rem;
  .bigNum {
    display: inline-block;
    font-size: 0.48rem;
  }
}

.levelBox {
  font-size: 0.32rem;
  li {
    text-align: center;
    border: 1px solid #000;
    display: inline-block;
    width: 49%;
    line-height: 1.2rem;
  }
}
.banner {
  height: 28vh;
}
.mint-swipe-item img {
  width: 100%;
  height: 100%;
}

 
  .iconfont {
     vertical-align: top;
      display: inline-block;
    margin-left:20px;
    color:#DD5246;
    font-size: 0.45rem;
    line-height:0.8rem;
  }
  .content_des {
    vertical-align: top;
    display: inline-block;    
    color: #333333;
    font-size: 0.28rem;
    line-height:0.8rem;
  }
 
</style>