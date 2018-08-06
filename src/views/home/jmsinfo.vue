<template>
  <div>
    <div id="wapper">
 
      <my-header :headerParam="headerParam">
    
      </my-header>
     
      <div id="jmsinfo">
 
        <div class="jmsinfo-title clearfix">
          商户信息
          <span class="xq" @click="openshow('msgflag')" v-if="jmschangelist.length>0">{{jmsstates[jmschangelist[0].status - 1]}}</span>
          <span class="xq" v-else></span>
        </div>
        
       
         
        <div class="item clearfix">
          <span class="item-flag">加盟商编号：</span>
          <div class="item-con">
            <p class="text">{{jmsinfo.storeCode}}</p>
          </div>
        </div>
      <div class="item clearfix" v-if="jmsinfo.storeType!=null">
          <span class="item-flag">商户类型：</span>
          <div class="item-con"> 
            <p class="text">{{shlxBox[jmsinfo.storeType-1].name}}</p>
          </div>
        </div> 
      <div class="item clearfix">
          <span class="item-flag">门店名称：</span>
          <div class="item-con">
            <p class="text">{{jmsinfo.storeName}}</p>
          </div>
        </div>
         <div class="item clearfix">
          <span class="item-flag">联系地址：</span>
          <div class="item-con">
            <p class="text">{{jmsinfo.address}}</p>
          </div>
        </div>
        
        <div class="item clearfix">
          <span class="item-flag">店面照片：</span>
          <div class="item-con dm-img-list">
            <img v-for="(item,index) in imgArr" :key="index" :src="item" class="dm-img"></img>
          </div>
        </div>
      
       <!-- <div class="item clearfix" v-if="jmsinfo.business!=null">
          <span class="item-flag">经营内容：</span>
          <div class="item-con jyfw">
              <span class="jyfw-item" v-for="(item,index) in jmsinfo.business" :key="index">
                {{ businessBox[item-1].name}}
              </span>  
          </div>
        </div> 
        <div class="item clearfix">
          <span class="item-flag">员工人数：</span>
         
          <div class="item-con">
            <p class="text">  {{jmsinfo.empNum}}</p>
          </div>
        </div>  
    <div class="item clearfix" v-if="jmsinfo.source!=null">
          <span class="item-flag">&#x3000;&#x3000;来源：</span>
          <div class="item-con">
            <p class="text">{{lyBox[jmsinfo.source-1].name}}</p>
          </div>
        </div> -->
    
      <div class="line"></div>
        <div class="item clearfix item2">
          <span class="item-flag">&#x3000;&#x3000;姓名：</span>
          <div class="item-con">
            <p class="text">{{jmsinfo.name}}</p>
          </div>
        </div>
        <div class="item clearfix">
          <span class="item-flag">手机号码：</span>
          <div class="item-con">
            <p class="text">{{jmsinfo.mobile}}</p>
          </div>
        </div>
        <div class="item clearfix">
          <span class="item-flag">&#x3000;代理区域：</span>
          <div class="item-con">
            <p class="text">{{jmsinfo.storeAreaDescribe}}</p>
          </div>
        </div>
        <div class="item clearfix">
          <span class="item-flag">&#x3000;代理级别</span>
          <div class="item-con">
            <p class="text">{{arealevalbox[jmsinfo.areaLevel-1]}}</p>
          </div>
        </div>
        <div class="item clearfix">
          <span class="item-flag">门店地址：</span>
          <div class="item-con">
            <p class="text">{{jmsinfo.gmtCreate}}</p>
          </div>
        </div>
         <div class="item clearfix">
          <span class="item-flag">客户意愿：</span>
          <div class="item-con">
            <p class="text">{{jmsinfo.gmtCreate}}</p>
          </div>
        </div>
        <div class="item clearfix">
          <span class="item-flag">业务经理：</span>
          <div class="item-con">
            <p class="text">{{jmsinfo.manager}}</p>
          </div>
        </div>
        <!--<div class="item clearfix">
          <span class="item-flag">上级经理：</span>
          <div class="item-con">
            <p class="text">{{jmsinfo.sjjl}}</p>
          </div>
        </div>-->
        <div class="item clearfix">
          <span class="item-flag">&#x3000;&#x3000;备注：</span>
          <div class="item-con">
            <p class="text">{{jmsinfo.memo}} </p>
          </div>
        </div>
        <div class="item clearfix">
          <span class="item-flag">创建时间：</span>
          <div class="item-con">
            <p class="text">{{jmsinfo.gmtCreate	}}</p>
          </div>
        </div>
        <!-- <div class="item clearfix" v-show="agencyStatus==1">
          <span class="item-flag">状态修改时间：</span>
          <div class="item-con">
            <p class="text">{{jmsinfo.gmtModify}}</p>
          </div>
        </div>
        <div class="item clearfix" v-show="openStatus==2">
          <span class="item-flag">开业时间：</span>
          <div class="item-con">
            <p class="text">{{jmsinfo.gmtOpen}}</p>
          </div>
        </div> -->
        <div class="item clearfix" >
          <span class="item-flag">签约时间：</span>
          <div class="item-con">
            <p class="text">{{jmsinfo.gmtModify}}</p>
          </div>
        </div>
        <div v-show="changeHistory.length">
            <div class="split"></div>
        <div class="item historyTitle   clearfix"  >
            <span class="item-flag"  >沟通记录</span>     
           
        </div>
        <div class="clearfix historyItem" v-for="(item,index) in changeHistory" :key="index">
             <div>
                <span></span>
                <span>{{item.gmtCreate}}</span>
            </div>
             <div>
                <span>意向状态:</span>
                <span>{{jmsS[item.followStatus-1]}}</span>
            </div>
             <div>
                <span>沟通内容:</span>
                <span>{{item.contents}}</span>
            </div>
        
        </div>
        </div>
      
         
        <div v-show="paymentInfo.length" >
          <div class="split"></div>
          <div class="item historyTitle  clearfix"   >
            <span class="item-flag"  >缴费信息</span>     
         </div>
        
         <div class="clearfix historyItem" v-for="(item,index) in paymentInfo" :key="index"  >
             <div>
                <span>缴费金额</span>
                <span>{{item.moneySum}}</span>
            </div>
             <div  v-show="item.payType!=null">
                <span>缴费方式:</span>
                <span>{{payType[item.payType-1].name}}</span>
            </div>
             <div  v-show="item.gmtPay!=null">
                <span>缴费时间:</span>
                <span> {{item.gmtPay}}</span>
            </div>
             <div v-show="item.payType!=null">
                <span>审核时间:</span>
                <span> {{item.payType}}</span>
            </div>
            <div v-show="jmsinfo.gmtSign!=null">
                <span>签约时间:</span>
                <span>{{jmsinfo.gmtSign}}</span>
            </div>
        </div>

        </div>
     
       
      </div>
      <br>
 
     <div class="sureBtn"  v-show="$route.params.status==7" >开业申请</div>
      <!---->
      <!---->
      <!--兴趣备注-->
      <msg-bz v-if="jmschangelist.length>0" :msgtext="jmschangelist[0].notice" :msgflag="msgflag" v-on:my-event="closeshow('msgflag')"></msg-bz>
      <!---->
      <!---->
      <!--状态追踪-->
      <state-zz :selectInx="parseInt(jmsinfo.merStatus)" :jmsstates="jmsstates" :stateflag="stateflag"
                v-on:my-event="closeStatus"></state-zz>
      <!---->
      <!--alert成功弹窗-->
      <alert-suc :asflag="asflag" v-on:my-event="closeAsflag"></alert-suc>
      <!---->
      <!---->
      <!--alert弹窗-->
      <alert-ask :aaflag="aaflag" v-on:my-event="closeAaflag"></alert-ask>
    </div>
  </div>
</template>
<script>
import { fetchGetData, fetchPostData, host } from "@/api";
import MyHeader from "@/components/header";
import Vue from "vue";
import MsgBz from "@/components/msgbz";
import StateZz from "@/components/statezz";
import AlertAsk from "@/components/alertask";
import AlertSuc from "@/components/alertsuc";
import qs from "qs";
import { Toast, Button } from "mint-ui";
export default {
  name: "jmsinfo",
  data() {
    return {
      headerParam: {
        title: "加盟商详情",
        setting: 0,
        back: 1
      },
      jmsinfo: {}, //加盟商信息
      ywjl: "", // 业务经理
      sjjl: "", // 上级经理
      jmschangelist: [], //更改记录
      jmsstates: [
        "待装修",
        "装修中",
        "待验收",
        "已验收",
        "待开业",
        "已开业",
        "需再沟通"
      ], //加盟商状态
      shlxBox: [],
      imgArr:[],
      lyBox: [],
           jmsS: ["感兴趣", "需再沟通", "不感兴趣", "很感兴趣"],
      arealevalbox: ["省级", "市级", "县级"],
      msgflag: false, //兴趣弹窗 flag
      stateflag: false, //更改状态弹窗flag
      aaflag: false, //询问弹窗flag
      asflag: false, //成功弹窗
      changeObj: {} ,//更改状态的参数
      paymentInfo:[],
      changeHistory:[],
    };
  },
  components: { MyHeader, MsgBz, StateZz, AlertAsk, AlertSuc, Toast },
  mounted: function() {
    
    var storeCode = this.$route.params.storeCode;
    if (storeCode == undefined) {
      this.storeCode == this.getSession("storeCode");
    } else {
      this.storeCode = this.$route.params.storeCode;
      this.addSession("storeCode", storeCode);
    }
      var data=this.getStatus(10011);
    data.then(res=>{
      this.payType=res;
    },err=>{
      alert(err)
    })
    this.getStatusBox();
    this.getJmsInfo();
    this.showlevelStatus();
    this.getYwjlName();
    this.getJmschangeList();
  },
  methods: {
    getStatusBox() {
      //加载来源
      let vm = this;
      var data = this.getStatus(10032);
      data.then(
        function(res) {
          vm.lyBox = res;
        },
        function(err) {
          console.log(err);
        }
      );
      //加载门店类型

      var data = this.getStatus(10030);
      data.then(
        function(res) {
          vm.shlxBox = res;
        },
        function(err) {
          console.log(err);
        }
      );
      //经营内容
      var data = this.getStatus(10031);
      data.then(
        function(res) {
          vm.businessBox = res;
        },
        function(err) {
          console.log(err);
        }
      );
    },
    openshow(attr) {
      // 打开弹窗
      this[attr] = true;
    },
    closeshow(attr) {
      //关闭弹窗
      this[attr] = false;
    },
    closeStatus(param) {
      //关闭状态跟踪弹窗
      //status状态  notice备注
      this.stateflag = false;
      if (param != "0") {
        this.aaflag = true; //显示询问弹窗
        this.changeObj = param; //更改状态的参数
      }
    },
    closeAaflag(param) {
      this.aaflag = false;
      //点击确定按钮
      if (param == 1) {
        //网络请求
        this.changeObj.merId = this.jmsinfo.id;
        fetchPostData(
          host + "/api/updateStatus",
          qs.stringify(this.changeObj)
        ).then(data => {
          if (data.code == 0) {
            //修改成功 打开成功弹窗
            this.asflag = true;
          } else {
            Toast("状态修改失败");
          }
        });
      }
    },
    closeAsflag() {
      //关闭成功弹窗
      this.asflag = false;
      //重新获取数据
      this.getJmsInfo();
      this.getJmschangeList();
    },
    getJmsInfo() {
      //获取加盟商信息
      let _that = this;
      if(_that.$router.params){
       var storeCode=_that.$router.params.storeCode;
      }else{
      var storeCode=_that.getSession("storeCode");
      }
      fetch(host + "/agent/proxy/getStoreDetail?storeCode=" + storeCode, {
        method: "GET",
        headers: {
          "x-token": this.getSession("token")
        },
        async: false
      })
        .then(res => res.text())
        .then(res => {
          var res = JSON.parse(res);
          
          if (res.status == 1) {
            _that.allInfo= res.data;
            _that.jmsinfo = res.data.storeInfo;
            _that.paymentInfo = res.data.listAccCollections;
            _that.imgArr=res.data.listSysFileManage;
            _that.addSession("info",JSON.stringify(res.data.storeInfo));
             _that.addSession("Allinfo",JSON.stringify(res.data));
            if (res.data.storeInfo == null) {
              //  Toast("数据为空");
              // _that.$router.push({path:'/jmslist'});
            }
          }
        });
    },
    getJmschangeList() {
      // 获取加盟商更改记录
      // let id = this.$route.params.jmsid;
      // fetchGetData(host+'/api/selectByMerId/' + id, {}).then((data) => {
      //   if (data.code == 0) {
      //     if (data.list.length) {
      //       this.jmschangelist = data.list;
      //       console.log(this.jmsstates[this.jmschangelist[0].status - 1]);
      //     } else {
      //       this.jmschangelist = []
      //     }
      //   }
      // })
    },
    getYwjlName() {
      //获取 业务经理的name
      // fetchPostData(host+'/api/queryUser', {}).then((data) => {
      //   if (data.code == 0) {
      //     this.ywjl = data.user.name
      //     this.sjjl = data.user.leaderName
      //   }
      // })
    },
     showlevelStatus() {
      let _that = this;
      if (this.$route.params.storeCode != undefined) {
        var storeCode = this.$route.params.storeCode;
      } else {
        var storeCode = window.sessionStorage.getItem("storeCode");
      }

      fetch(host + "/agent/proxy/getStoreFollow?storeCode=" + storeCode, {
        method: "GET"
      })
        .then(res => res.text())
        .then(res => {
          var res = JSON.parse(res);
          if (res.status == 1) {
            _that.changeHistory = res.data.rows;
          }
        });
    },
  },
  computed: {
    jmfw() {
      //经营范围
      if (!this.jmsinfo.merContent) {
        return [];
      }
      if (this.jmsinfo.merContent.indexOf(",") != -1) {
        return this.jmsinfo.merContent.split(",");
      } else {
        return [this.jmsinfo.merContent];
      }
    },
    ygxx() {
      //员工信息
      if (!this.jmsinfo.merInformation) {
        return [];
      }
      return JSON.parse(this.jmsinfo.merInformation);
    },
    dmimgs() {
      //店面照片
      if (!this.jmsinfo.listSysFileManage) {
        return [];
      }
      if (this.jmsinfo.image.indexOf(",") != -1) {
        return this.jmsinfo.image.split(",");
      } else {
        return [this.jmsinfo.image];
      }
    }
  }
};
</script>
<style lang="less" scoped>
.sureBtn {
  font-size: 14px;
  width: 50%;
  margin: 10px auto;
  border: 1px solid #bababa;
  border-radius: 5px;
  text-align: center;
  line-height: 35px;
}
.changeInfoBtn,
.payBtn {
  font-size: 0;
  padding: 0 20px;
  display: inline-block;
  font-size: 14px;
  background-color: #4990e2;
  line-height: 35px;
  width: 45%;
  text-align: center;
  color: #fff;
  border-radius: 5px;
}
.historyTitle {
  font-size: 0.4rem;
  font-weight: bold;
  margin-bottom:15px;
}
.historyItem {
  color: #333333;
  font-size: 0.28rem;
  border: 1px solid #cccccc;
  width: 90%;
  margin:15px auto;
  text-indent: 20px;
  padding:0 10px;
  &>div>span{
     color: #333333;
    line-height:0.6rem;
  }
  & div:nth-child(1){
     color: #000;

  }
}
.split{
  height:1px;
  clear: both;
  margin: 15px 0 0 0;
  border-top: 1px solid #cccccc;
}
</style>

