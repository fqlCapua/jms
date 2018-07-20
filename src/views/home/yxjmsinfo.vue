<template>
  <div>
    <div id="wapper">
      <!---->
      <my-header :headerParam="headerParam">
        <span class="state" v-show="$route.params.status==1"  @click="openshow('stateflag')">状态追踪</span>
      </my-header>
      <!---->

      
      <div id="jmsinfo">
        <div class="jmsinfo-title clearfix">
                   商户信息
          <span class="xq" @click="openshow('msgflag')"
                v-if="jmschangelist.length>0">{{jmsstates[jmschangelist[0].status - 1]}}</span>
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
            <p class="text">{{storeType[jmsinfo.storeType]}}</p>
          </div>
        </div>
        <div class="item clearfix">
          <span class="item-flag">门店名称：</span>
          <div class="item-con">
            <p class="text">{{jmsinfo.storeName}}</p>
          </div>
        </div>
        <!-- <div class="item clearfix">
          <span class="item-flag">经营范围：</span>
          <div class="item-con jyfw">
              <span class="jyfw-item" v-for="(item,index) in jmfw" :key="index">
                {{jyfw_Asc[index]}}
              </span>
          </div>
        </div> -->
       
        <div class="item clearfix">
          <span class="item-flag">&#x3000;&#x3000;来源：</span>
          <div class="item-con">
            <p class="text">{{source[jmsinfo.source]}}</p>
          </div>
        </div>
        <!-- <div class="item clearfix">
          <span class="item-flag">沟通内容：</span>
          <div class="item-con clearfix">
            <p class="text">{{jmsinfo.communication}}</p>
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
          <span class="item-flag">详细地址：</span>
          <div class="item-con">
            <p class="text">{{jmsinfo.address}}</p>
          </div>
        </div>
        <div class="item clearfix">
          <span class="item-flag">&#x3000;行政级别：</span>
          <div class="item-con">
            <p class="text">{{aleval[jmsinfo.areaLevel]}}</p>
          </div>
        </div>
        <!-- <div class="item clearfix">
          <span class="item-flag">店面照片：</span>
          <div class="item-con dm-img-list">
            <img v-for="(item,index) in imgArr" :key="index" :src="item.accessory" class="dm-img"></img>
          </div>
        </div> -->
        <div class="item clearfix">
          <span class="item-flag">客户意愿：</span>
          <div class="item-con">
            <p class="text">{{jmsstates[jmsinfo.intentLevel]}}</p>
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
        <div class="item clearfix">
          <span class="item-flag">签约时间：</span>
          <div class="item-con">
            <p class="text">{{jmsinfo.gmtModify}}</p>
          </div>
        </div>
        <!--<div class="item clearfix">
          <span class="item-flag">更改记录：</span>
          <div class="item-con" v-if="jmschangelist.length > 0">
            <p v-for="(item,index) in jmschangelist" :key="index" class="text" :class="[index>0?'text1':'']">
              {{item.updateTime}} &#x3000;&#x3000;{{jmsstates[item.status - 1]}}
            </p>
          </div>
        </div>-->
        <!-- <router-link :to="{name:'editJmsInfo', params: { jmsid: this.jmsid }}">
          <div class="item clearfix">
            <span class="xg-icon">修改</span>
          </div>
        </router-link>
        <router-link :to="{name:'payment', params: { jmsid: this.jmsid }}">
          <div class="item clearfix">
            <span class="xg-icon">缴费</span>
          </div>
        </router-link> -->
        <div class="item"  v-show="$route.params.status==1">
          <div class="changeInfoBtn" @click="gochangeInfo">修改资料</div>
          <div class="payBtn"   @click="gopayment">缴费</div>
        </div>
        <div class="item"   v-show="$route.params.status==2">
          <div class="changeInfoBtn" @click="gochangeInfo">提交补充资料</div>
          <!-- <div class="payBtn" @click="dateOnline">在线签约</div> -->
        </div>
        <div class="item"   v-show="$route.params.status==3">
          <div class="changeInfoBtn" @click="gochangeInfo">提交门店地址</div>
         
        </div>
       
      </div>

   
      <!--兴趣备注-->
      <msg-bz v-if="jmschangelist.length>0" :msgtext="jmschangelist[0].notice" :msgflag="msgflag"
              v-on:my-event="closeshow('msgflag')"></msg-bz>
      <!---->
      <!---->
      <!--状态追踪-->
      <state-zz :selectInx="Number(jmsinfo.agentStatus)" :storeid="jmsinfo.storeCode" :jmsstates="jmsS" :stateflag="stateflag"
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
import { fetchGetData, fetchPostData,host } from "@/api";
import MyHeader from "@/components/header";
import MsgBz from "@/components/msgbz";
import StateZz from "@/components/statezz";
import AlertAsk from "@/components/alertask";
import AlertSuc from "@/components/alertsuc";
import Vue from 'vue'
import qs from "qs";
import { Toast, MessageBox } from "mint-ui";
export default {
  data() {
    return {
      headerParam: {
        title: "基本资料详情",
        setting:0,
        back: 1,
        state: 1
      },
      agencyStatus: false,
      storeCode: "",
      jmsid: "",
      storeCode: "", //路由传参加盟商id
      jmsinfo: {}, //加盟商信息
      ywjl: "", // 业务经理
      sjjl: "", // 上级经理
      jmschangelist: [], //更改记录
      aleval: ["", "省级", "市级", "县级"],
      source: ["", "朋友介绍", "销售渠道", "线上渠道", "其他"],
      storeType: ["", "个人", "公司", "洗车店", "维修店", "保养店", "其他"],
      jyfw_Asc: [
        "",
        "装修",
        "洗车",
        "美容",
        "装饰服务",
        "配件销售",
        "保险",
        "汽车代销",
        "汽车租赁",
        "其他"
      ],
      jmsstates: ["","感兴趣", "需再沟通", "不感兴趣", "很感兴趣"], //加盟商状态
      jmsS: [ "感兴趣", "需再沟通", "不感兴趣", "很感兴趣"],
      msgflag: false, //兴趣弹窗 flag
      stateflag: false, //更改状态弹窗flag
      aaflag: false, //询问弹窗flag
      asflag: false, //成功弹窗
      changeObj: {}, //更改状态参数,
      agencyBox:[],
    };
  },
  components: {
    MyHeader,
    MsgBz,
    StateZz,
    AlertAsk,
    AlertSuc,
    Toast,
    MessageBox
  },
   computed: {
    jmfw() {

      //经营范围
      if (!this.jmsinfo.business) {
        return [];
      }
      if (this.jmsinfo.business.indexOf(",") != -1) {
        let ASIIArr = new Array();

        return this.jmsinfo.business.split(",");
      } else {
        return [this.jmsinfo.business];
      }
    },
    
  
  },
  mounted:function() {
 
   //意向加盟商id
    let that = this;
    if (that.$route.params.jmsid) {
      sessionStorage.setItem("jmsid", that.$route.params.jmsid);
    }
    that.jmsid = sessionStorage.getItem("jmsid");
    that.getYxJmsInfo();
    that.getJmschangeList();
    that.getYwjlName();

   },
  methods: {
 
  
    dmimgs() {
      //店面照片
      
       this.imgArr=[];
  //  console.log(this.allInfo);
  //     if (!this.allInfo.listSysFileManage){
  //     this.imgArr=[];
  //     }
  //     if (this.allInfo.listSysFileManage.indexOf(",") != -1) {
  //       this.imgArr=this.allInfo.listSysFileManage.split(",");
  //     } else {
  //       this.imgArr=[this.allInfo.listSysFileManage];
  //     }
    },
    dateOnline() {
      let that = this;
      var form = new FormData();
      form.append("mobile", this.jmsinfo.mobile);
      fetch(host + "/agent/proxy/signMsg", { method: "POST", body: form })
        .then(res => res.text())
        .then(res => {
          var res = JSON.parse(res);
          if (res.status == 1) {
            Toast("发送成功  ");
          } else {
            Toast("发送失败");
          }

          //            this.$store.dispatch('userLogin', data)
          //            this.$router.push({path: '/myAccount'})
        });
    },
    gochangeInfo() {
      this.$router.push({ name: "editJmsInfo", params: { jmsid: this.jmsid } });
    },
    gopayment() {
      this.$router.push({ name: "payment", params: { jmsid: this.jmsid } });
    },
    openshow(attr) {
      // 打开弹窗
    
      this[attr] = true;
    },
    closeshow(attr) {
      //关闭弹窗
      alert("关闭1")
      this[attr] = false;
    },
    closeStatus(param) {
      //关闭状态跟踪弹窗
      //status状态  notice备注
      this.stateflag = false;
      if (param != "0") {
        this.aaflag = true;
 
        this.changeObj = param;
        
      }  
     
      this.closeAaflag(param)
    },
    closeAaflag(param) {
          
          this.aaflag = false;
            let form={};
              
            form.contents=param.notice;
            form.followStatus=param.status;
            form.follower=this.jmsinfo.name;
            form.gmtModify=new Date().toLocaleString().split(" ");
            form.storeCode= this.jmsinfo.storeCode;
  
      //点击确定按钮
      if (param == 1) {
        //网络请求
        fetch(host + "/agent/proxy/addStoreFollow",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(form)
        }).then((res)=>res.text())
        .then(res => {
          if (res.status == 1) {
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
      this.getYxJmsInfo();
      this.getJmschangeList();
    },
    //获取加盟商信息
    getYxJmsInfo() {
      this.storeCode = this.$route.params.storeCode;
     
      //获取加盟商信息
      let _that = this;
      fetch(host + "/agent/proxy/findByStoreCode?storeCode=" + this.storeCode, {
        method: "GET",
        async:false
      })
        .then(res => res.text())
        .then(res => {
          var res = JSON.parse(res);
          if (res.status == 1) {
           // console.log(res);
           _that.allInfo=res.data;
            _that.jmsinfo = res.data.storeInfo;
           

          }
        });
        this.dmimgs(); 
    },
    getJmschangeList() {
      // 获取加盟商更改记录
      //      fetchGetData(host+'/api/selectByMerId/' + this.jmsid, {}).then((data) => {
      //        if (data.code == 0) {
      //          if (data.list.length) {
      //            this.jmschangelist = data.list
      //          } else {
      //            this.jmschangelist = []
      //          }
      //        }
      //      })
    },
    zzjms() {
      //点击转为正式加盟商
      //      MessageBox({
      //        title: '',
      //        message: '确定转为正式加盟商？',
      //        showCancelButton: true,
      //      }).then((data)=>{
      //        if(data == 'confirm'){
      //          fetchPostData(host+'/api/addMerNumber', qs.stringify({id: this.jmsid})).then((data) => {
      //            if (data.code == 0) {
      //              Toast({message: '操作成功', position: 'bottom'});
      //              this.$router.back()
      //            }
      //          })
      //        }
      //      });
    },
    getYwjlName() {
      //获取 业务经理的name
      //      fetchPostData(host+'/api/queryUser', {}).then((data) => {
      //        if (data.code == 0) {
      //          this.ywjl = data.user.name
      //          this.sjjl = data.user.leaderName
      //        }
      //      })
    }
  },
 
};
</script>
<style lang="less" scoped>
.changeInfoBtn,
.payBtn {
  font-size: 14px;
  background-color: #4990e2;
  line-height: 35px;
  width: 33%;
  display: inline-block;
  text-align: center;
  color: #fff;
  border-radius: 5px;
}
</style>

