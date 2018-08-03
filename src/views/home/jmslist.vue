<template>
  <div v-on:scroll.passive="onScroll">
    <div id="wapper" style="padding-bottom: 0;">
      <!---->
      <my-header :headerParam="headerParam"></my-header>
      <!---->
      <!--意向加盟商列表-->
      <div id="yxjmslist" class="jmslist">
        <!--导航-->
        <div class="tab clearfix">
          <div class="con">
            <div class="item" @click="getJms()">
              <span class="text" :class="[selectIndex==0?'c1':'']">全部</span>
            </div>
          <div class="item" v-for="(item,index) in statusBox" :key="index" @click="getJms(item.id,item.name)"   >
                        <span class="text" :class="[selectIndex==item.id?'c1':'']">{{item.name}}</span>
					</div> 
             
          </div>
        </div>
        <!--加盟商list-->
        <div class="list">
          <div v-for="(item,index) in jmslist" :key="index">
              <JmsItem :jsminfo="item"  :selectIndex="selectIndex" :jmsflag="jmsflag"></JmsItem>
          
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { fetchPostData, fetchGetData, host } from "@/api";
import MyHeader from "@/components/header";
import JmsItem from "@/components/jmsItem";
import qs from "qs";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      headerParam: {
        title: "加盟商列表",
        setting: 0,
        back: 1
      },
      jmsflag: "jms",
      page: 1,
      jmslist: [],
      selectIndex:"",
      statusBox:[]
    };
  },
  components: { MyHeader, JmsItem, Toast },
  mounted: function() {
    this.getJms();
    let vm = this;

    var data = this.getStatus(10035);
    data.then(
      function(value) {
        vm.statusBox = value;
      },
      function(err) {
        console.log(err);
      }
    );
  },
  methods: {
    getJms() {
      this.page = 1;
      if (arguments.length) {
        this.selectIndex =  arguments[0];
      
        this.getJmsList();
      } else {
        this.selectIndex = "";
        this.getJmsList();
      }
    },
    getJmsList() {
 
      var _that=this;
      let param = { merNumber: "正式", page: this.page };
      if (this.selectIndex) {
        param.merStatus = this.selectIndex;
      }
      // if (this.selectCon) {
      //   param.cusWish = this.selectCon;
      // }
      if (this.selectIndex == 0) {
        this.selectIndex = "";
      }
     let params=`?length=1000&pageNum=1&type=${this.getSession("listStatus")}&userId=${this.getSession("id")}&openStatus=${this.selectIndex}`;
 	  	fetch(host+"/agent/proxy/getOpenStore"+params,{
						method:"GET",
					  header:{
							"x-token":this.getSession("token")
							}
					})
        .then(res => res.text())
        .then(res => {
          var res = JSON.parse(res);
          if (res.status == 1) {
            
            _that.jmslist = res.data.rows;
           
          }
        });
    },
    menu() {
      let isLoading = true;
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.offsetHeight -
            document.documentElement.scrollTop -
            window.innerHeight <=
          60;
        if (bottomOfWindow && isLoading) {
          isLoading = false;
          this.page += 1;
          let param = { merNumber: "正式", page: this.page };
          if (this.selectIndex) {
            param.merStatus = this.selectIndex;
          }
          fetchPostData(host + "/api/merList", qs.stringify(param)).then(
            data => {
              if (data.code == 0) {
                if (data.page.list.length) {
                  this.jmslist = this.jmslist.concat(data.page.list);
                  isLoading = true;
                } else {
                  isLoading = false;
                }
              }
            }
          );
          isLoading = true;
        }
      };
    }
  }
};
</script>
