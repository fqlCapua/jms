<template>
  <div>
    <div id="wapper">
      <!---->
      <my-header :headerParam="headerParam">
        <!-- <span class="state" @click="openshow('stateflag')">状态追踪</span> -->
      </my-header>
      <!---->
      <!---->
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
        <div class="item clearfix">
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
          <span class="item-flag">经营内容：</span>
          <div class="item-con jyfw">
            {{business}} 
                <span class="jyfw-item" v-for="(item,index) in jmsinfo.business" :key="index">
                {{ businessBox[item-1].name}}
              </span>  
          </div>
        </div>
        <div class="item clearfix">
          <span class="item-flag">员工人数：</span>{{empNum}}
          <!-- <div class="item-con ygxx">
               <span class="jyfw-item" v-for="(item,index) in ygxx" :key="index">
                 <span class="ygxx-item">{{item.job}} {{item.num}}人</span>
              </span>
          </div> -->
        </div>
        <div class="item clearfix">
          <span class="item-flag">&#x3000;&#x3000;来源：</span>
          <div class="item-con">
            <p class="text">{{lyBox[jmsinfo.source-1].name}}</p>
          </div>
        </div>
       
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
          <span class="item-flag">&#x3000;所在区域：</span>
          <div class="item-con">
            <p class="text">{{jmsinfo.area}}</p>
          </div>
        </div>
        <div class="item clearfix">
          <span class="item-flag">&#x3000;行政级别</span>
          <div class="item-con">
            <p class="text">{{arealevalbox[jmsinfo.areaLevel-1]}}</p>
          </div>
        </div>
        <div class="item clearfix">
          <span class="item-flag">详细地址：</span>
          <div class="item-con">
            <p class="text">{{jmsinfo.address}}</p>
          </div>
        </div>
        
        <div class="item clearfix">
          <span class="item-flag">店面照片：</span>
          <div class="item-con dm-img-list">
            <img v-for="(item,index) in dmimgs" :key="index" :src="item" class="dm-img"></img>
          </div>
        </div>
      
  
        <div class="item clearfix">
          <span class="item-flag">提交时间：</span>
          <div class="item-con">
            <p class="text">{{jmsinfo.gmtCreate}}</p>
          </div>
        </div>
        <div class="item clearfix">
          <span class="item-flag">缴费时间：</span>
          <div class="item-con">
            <p class="text">{{jmsinfo.joinTime}}</p>
          </div>
        </div>
        
        <div class="item clearfix">
          <span class="item-flag">签约时间：</span>
          <div class="item-con" v-if="jmschangelist.length > 0">
            <p v-for="(item,index) in jmschangelist" :key="index" class="text" :class="[index>0?'text1':'']">
              {{item.updateTime}} &#x3000;&#x3000;{{jmsstates[item.status - 1]}}
            </p>
          </div>
        </div>
        <div class="item clearfix">
          <span class="item-flag">开业时间：</span>
          <div class="item-con" v-if="jmschangelist.length > 0">
            <p v-for="(item,index) in jmschangelist" :key="index" class="text" :class="[index>0?'text1':'']">
              {{item.updateTime}} &#x3000;&#x3000;{{jmsstates[item.status - 1]}}
            </p>
          </div>
        </div>
         <div class="item clearfix" >
          <span class="item-flag">开业流程</span>
          <div class="item-con" style="border:1px solid #BABABA;height:50px;" v-if="jmschangelist.length > 0">
            <p v-for="(item,index) in jmschangelist" :key="index" class="text" :class="[index>0?'text1':'']">
              {{item.updateTime}} &#x3000;&#x3000;{{jmsstates[item.status - 1]}}
            </p>
          </div>
        </div>
        <div class="sureBtn">确认开业</div>
       
      </div>
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

import MsgBz from "@/components/msgbz";
import StateZz from "@/components/statezz";
import AlertAsk from "@/components/alertask";
import AlertSuc from "@/components/alertsuc";
import qs from "qs";
import { Toast, Button } from "mint-ui";
export default {
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
      arealevalbox:["省级","市级","县级"],
      msgflag: false, //兴趣弹窗 flag
      stateflag: false, //更改状态弹窗flag
      aaflag: false, //询问弹窗flag
      asflag: false, //成功弹窗
      changeObj: {} //更改状态的参数
    };
  },
  components: { MyHeader, MsgBz, StateZz, AlertAsk, AlertSuc, Toast },
  mounted: function() {
    this.getStatusBox() 
    this.getJmsInfo();
    this.getYwjlName();
    this.getJmschangeList();
  },
  methods: {
    getStatusBox() {
      //加载来源
      let vm=this;
      var data = this.getStatus(10032);
      data.then(function(res) {
          vm.lyBox=res;
        },
        function(err) {
          console.log(err);
        }
      );
      //加载门店类型
    
      var  data = this.getStatus(10030);
      data.then(function(res) {
          vm.shlxBox=res;
        },
        function(err) {
          console.log(err);
        }
      );
      //经营内容
       var  data = this.getStatus(10031);
       data.then(function(res) {
          vm.businessBox=res;
        },
        function(err) {
          console.log(err);
        });
        console.log(this);
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
      let id = this.$route.params.storeCode;

      fetch(host + "/agent/proxy/findByStoreCode?storeCode=" + id, {
        method: "GET"
      })
        .then(res => res.text())
        .then(res => {
          var res = JSON.parse(res);
          if (res.status == 1) {
            this.jmsinfo = res.data.storeInfo;
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
    }
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
  },
  
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
</style>

