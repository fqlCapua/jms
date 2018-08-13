<template>
  <div>
    <div id="wapper">
      <!---->
      <my-header :headerParam="headerParam">
      
      </my-header>
      <!---->

      
      <div id="jmsinfo">
        <div class="jmsinfo-title clearfix">
                   商户信息
          <!-- <span class="xq" @click="openshow('msgflag')"
                v-if="jmschangelist.length>0">{{jmsstates[jmschangelist[0].status - 1]}}</span>
          <span class="xq" v-else></span> -->
        </div>
        <div class="item clearfix">
          <span class="item-flag">加盟商编号：</span>
          <div class="item-con">
            <p class="text">{{jmsinfo.storeCode}}</p>
          </div>
        </div>
        <div class="item clearfix">
          <span class="item-flag">代理商类型：</span>
          <div class="item-con">
            <p class="text">{{store[jmsinfo.type-1]}}</p>
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
          <div class="item clearfix">
          <span class="item-flag">店面照片：</span>
          <div class="item-con dm-img-list">
            <img v-for="(item,index) in imgArr" :key="index" :src="item.accessory" class="dm-img" /> 
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
          <span class="item-flag">详细地址：</span>
          <div class="item-con">
            <p class="text">{{jmsinfo.address}}</p>
          </div>
        </div>
    
        <div class="item clearfix">
          <span class="item-flag"> 代理级别：</span>
          <div class="item-con">
            <p class="text">{{aleval[jmsinfo.areaLevel]}}</p>
          </div>
        </div>
      
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
         

        <div class="item">
        <span class="state changeInfoBtn"  v-show="!$route.params.status"   @click="openshow('stateflag')">状态追踪</span> 
        <router-link v-show="false" :to="{name:'editJmsInfo',params:{storeCode:this.jmsinfo.storeCode,jmsInfo:this.jmsinfo,hisPage:'change'}}">
          <span class="changeInfoBtn"  >修改资料</span>
        </router-link>
          <span class="payBtn changeInfoBtn" v-show="!$route.params.status"   @click="payBoxShow">发起缴费</span>
        </div>
        <div class="item"   v-show="$route.params.status==2">
          <router-link :to="{name:'extInfo', params:{storeCode:this.jmsinfo.storeCode,areaId:this.jmsinfo.areaId}}">
           <div class="item clearfix">
            <span class="changeInfoBtn"> 提交补充资料 </span>
          </div>
        </router-link>
          <!-- <div class="changeInfoBtn" @click="gochangeInfo"></div> -->
        
        </div>
        <div class="item"   v-show="false">
          <div class="changeInfoBtn" @click="gochangeInfo">提交门店地址</div>
         
        </div>
       
      </div>

     <div class="payForm" v-show="payBoxStatus" >
          <mt-header title="发起缴费">
             <mt-button @click="payBoxHide"  icon="back" slot="left">返回</mt-button>
          </mt-header>
        <div class="payBody">
          <mt-field label="代理商类型:"                 readonly type="text" >{{store[jmsinfo.type-1]}}</mt-field>
          <mt-field label="签约类型:"                   readonly type="text"  >{{["个人","公司"][jmsinfo.storeType-1]}}</mt-field>
          <mt-field label="代理区域:"                   readonly type="text">{{jmsinfo.storeAreaDescribe}}</mt-field>
          <mt-field label="姓名:"          readonly >{{payer}}</mt-field>
          <mt-field label="联系电话:"                   readonly type="text"  slot="left">{{jmsinfo.mobile}}</mt-field>
          <mt-field label="缴费类型:"                   readonly>
             <select class="selectPay"   v-model="receiveProject">
                        <option v-for="(item,index) in jiaofeiType" v-bind:value="item.id" :key="index">{{item.name}}</option>
							</select>
          </mt-field>
          <mt-field label="缴费金额:" v-model="moneySum" type="text" placeholder="请输入缴费金额(万元)">
              
          </mt-field>
          <mt-radio  v-model="pType" :options="pTypeBox"></mt-radio>
               <span  class="payBtn" @click="goPayByType">确定</span>
               <span class="payBtn"  @click="payBoxHide">取消</span>
               
        </div>
       
     </div>
      <!--兴趣备注-->
      <msg-bz v-if="jmschangelist.length>0" :msgtext="jmschangelist[0].notice" :msgflag="msgflag"
              v-on:my-event="closeshow('msgflag')"></msg-bz>
      <!---->
      <!---->
      <!--状态追踪-->
      <state-zz :selectInx="Number(jmsinfo.agentStatus)"  :jmsstates="jmsS" :stateflag="stateflag"
                v-on:my-event="closeStatus"></state-zz>
      <!---->
      <!--alert成功弹窗-->
      <alert-suc :asflag="asflag"></alert-suc>
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
import Vue from "vue";
import qs from "qs";
import { Header, Button, Field, Radio, Toast, MessageBox } from "mint-ui";
export default {
  data() {
    return {
      headerParam: {
        title: "基本资料详情",
        setting: 0,
        back: 1,
        state: 1
      },
      options:[],
      store: ["二级代理商", "一级代理商"],
      jiaofeiType: [],
      pType: "1",
      pTypeBox:[{label:'线上支付',value:'1'},{label:'线下支付',value:'2'}],
      receiveProject: "1",
      payBoxStatus: false, //发起缴费
      paymentInfo: {},
      changeHistory: [],
      agencyStatus: false,
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
      jmsstates: ["", "感兴趣", "需再沟通", "不感兴趣", "很感兴趣"], //加盟商状态
      jmsS: ["感兴趣", "需再沟通", "不感兴趣", "很感兴趣"],
      msgflag: false, //兴趣弹窗 flag
      stateflag: false, //更改状态弹窗flag
      aaflag: false, //询问弹窗flag
      asflag: false, //成功弹窗
      changeObj: {}, //更改状态参数,
      agencyBox: [],
      
      imgArr: [],
      //缴费

      payer:"",
      moneySum:"",
      pType:"1",
    };
  },
  components: {
    MyHeader,
    MsgBz,
    StateZz,
    AlertAsk,
    AlertSuc,
    Toast,
    MessageBox,
    Header,
    Field,
    Radio,
    Button
  },
  computed: {},
  mounted: function() {
    //意向加盟商id
    let that = this;
     
    if (that.$route.params.storeCode == undefined) {
      that.storeCode = sessionStorage.getItem("storeCode");
    } else {
      window.sessionStorage.setItem("storeCode", that.$route.params.storeCode);
    }
    var data = this.getStatus(10011);
    data.then(
      res => {
       
        this.payType = res;
      },
      err => {
        alert(err);
      }
    );
    var data = this.getStatus(10008);
    data.then(
      res => {
        this.jiaofeiType = res;
      },
      err => {
        alert(err);
      }
    );

    that.getYxJmsInfo();
 
  
    that.showlevelStatus();
    that.getJmschangeList();
    that.getYwjlName();
  },
  methods: {
    //缴费
    goPayByType(){
       let _that=this;
      if(this.pType==1){
        let form=new Object();
        form.moneySum=_that.moneySum;
        form.payer=_that.payer;
        form.receiveProject=_that.receiveProject;

        if(!this.moneySum){
        alert("请输入缴费金额");
          return false;
        }
         fetch(host+"/agent/store/addPayFee",{
           method:"POST",
           headers: {
             "Content-Type": "application/json"
           },
           body:JSON.stringify(form)
         }).then(res=>res.text())
         .then(res=>{
           var res=JSON.parse(res);
           if(res.status==1){
            _that.payBoxHide(); 
           }
          
            Toast(res.message);
         })

      }else if(this.pType==2){
        
        this.$router.push({path:"/payment"});
      }
    },
    payBoxShow() {
      this.payBoxStatus = true;
    },
    payBoxHide() {
      this.payBoxStatus = false;
    },
    // dmimgs() {
    //   //店面照片

    //       if (!this.allInfo.listSysFileManage){
    //       this.imgArr=[];
    //       }
    //       if (this.allInfo.listSysFileManage.indexOf(",") != -1) {
    //         this.imgArr=this.allInfo.listSysFileManage.split(",");
    //       } else {
    //         this.imgArr=[this.allInfo.listSysFileManage];
    //       }
    // },
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

      this[attr] = false;
    },
    closeStatus(param) {
      //关闭状态跟踪弹窗
      //status状态  notice备注
      this.stateflag = false;
      if (param != 0) {
        this.aaflag = true;
        this.changeObj = param;
        //   this.closeAaflag(param)
        this._params = param;
      } else {
      }
    },
    closeAaflag(param) {
      var _that = this;
      if (param) {
        let form = {};
        form.contents = this._params.notice;
        form.followStatus = this._params.status;
        form.follower = this.jmsinfo.name;
        // form.gmtModify=new Date().toLocaleString().split(" ")[0];
        form.storeCode = this.jmsinfo.storeCode;
        //点击确定按钮
        //网络请求
        console.log(form);
        fetch(host + "/agent/proxy/addStoreFollow", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        })
          .then(res => res.text())
          .then(res => {
            var res = JSON.parse(res);
            if (res.status == 1) {
              _that.asflag = true;
              window.setInterval(function() {
                _that.asflag = false;
              }, 1500);
            } else {
              Toast("修改失败");
              console.log(res);
            }
          });
      }

      this.aaflag = false;
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
    closeAsflag() {
      //关闭成功弹窗
      this.asflag = false;
      this.getYxJmsInfo();
      this.getJmschangeList();
    },
    //获取加盟商信息
    getYxJmsInfo() {
      if (this.$route.params.storeCode != undefined) {
        var storeCode = this.$route.params.storeCode;
      } else {
        var storeCode = window.sessionStorage.getItem("storeCode");
      }

      //获取加盟商信息
      let _that = this;
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
            _that.allInfo = res.data;
            _that.jmsinfo = res.data.storeInfo;
            _that.paymentInfo = res.data.listAccCollections;
            _that.imgArr = res.data.listSysFileManage;
            _that.addSession("Allinfo", JSON.stringify(res.data));
            _that.addSession("info", JSON.stringify(res.data.storeInfo));
            _that.payer=res.data.storeInfo.name;
          }
        });
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
  }
};
</script>
<style lang="less" scoped>
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
  outline: none;
}
.historyTitle {
  font-size: 0.4rem;
  font-weight: bold;
  margin-bottom: 15px;
}
.historyItem {
  color: #333333;
  font-size: 0.28rem;
  border: 1px solid #cccccc;
  width: 90%;
  margin: 15px auto;
  text-indent: 20px;
  padding: 0 10px;
  & > div > span {
    color: #333333;
    line-height: 0.6rem;
  }
  & div:nth-child(1) {
    color: #000;
  }
}
.split {
  height: 1px;
  clear: both;
  margin: 15px 0 0 0;
  border-top: 1px solid #cccccc;
}
.payForm {
  position: fixed;
  bottom: 0;
  background-color: #fff;
  text-align: center;

  height: 100vh;
  z-index: 100000;
  width: 100%;
}
.payBody {
  margin: 30px auto;
}
.selectPay {
  line-height: 0.48rem;
  font-size: 0.3rem;
  padding:2px 15px;
  border-radius:5px;
  background-color: #fff;
  }
 .mint-header{
   background-color:#4990E2;
   height: 0.96rem;
   line-height: 0.96rem !important;
   font-size: 0.33rem;
 }
 
</style>

