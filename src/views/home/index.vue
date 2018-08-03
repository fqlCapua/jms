<template>
    <div>
      <div id="wapper">
        <!---->
        <my-header :headerParam="headerParam" class="bgctran"></my-header>
        <!---->
        <div id="index">
          <div class="index-top">
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
          </div>
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
        <div>
         
          <!-- 2018/7/30修改样式 -->
          <div id="listBox">
            <div class="intent_title">{{intent_title}}</div>
              <ul class="intent levelBox">
                  <li @click="goyxjmslist('2')">一级代理商</li>
                  <li @click="goyxjmslist('1')">二级代理商</li>
                  <li @click="goeditJmsInfo()">新增代理商</li>
              </ul>
              <div class="offical_title">{{offical_title}}</div>
              <ul class="offical levelBox">
                  <li  @click="gojmslist('2')">一级代理商</li>
                  <li  @click="gojmslist('1')">二级代理商</li>
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
import Vue from 'vue';
import { fetchGetData, fetchPostData, host } from "@/api";
export default {
  data(){
    return{
      footerIndex: 1,
      headerParam: {
        title:"首页",
        setting: 0,
        back: 0
      },
      intent_title:"意向代理商",
      offical_title:"正式代理商",
      myJms: {
         
      },
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
  components: { MyFooter, MyHeader },
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
    goyxjmslist(){
      if(arguments.length){
          this.addSession("listStatus",arguments[0]);
          this.$router.push({path:"/yxjmslist"})
      }
    },
    gojmslist(){
      if(arguments.length){
         this.addSession("listStatus",arguments[0]);
      this.$router.push({path:"/jmslist"})
      }
    },
    goeditJmsInfo(){
      this.$router.push({path:"/editJmsInfo"});
    },
    loadFutureCusByWish() {
      let that = this;
      fetch(host + "/agent/proxy/storeCountGraph", { method: "GET" })
        .then(res => res.text())
        .then(res => {
          var res = JSON.parse(res);
          console.table(res.data);
          if (res.status == 1) {
            that.yxjmsArr.push(
              res.data.agentStatus1,
              res.data.agentStatus2,
              res.data.agentStatus4,
              res.data.agentStatus4
            );
            that.jmsArr.push(res.data.openStatus1, res.data.openStatus1);

            let myChart = echarts.init(document.getElementById("future-cus"));
            let xData = that.willList.map(item => item.name);
            let option = {
              title: {
                text: "意向代理商统计",
                left: "center",
                textStyle: {
                  fontWeight: "normal"
                }
              },
              xAxis: {
                data: that.yxfield,
                type: "category",
                axisTick: {
                  show: false
                }
              },
              yAxis: {
                name: "单位：个",
                type: "value",
                splitLine: {
                  show: false
                },
                minInterval: 1
              },
              grid: {
                top: "25%",
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
              },
              series: [
                {
                  name: "正式代理商",
                  type: "bar",
                  barWidth: "40%",
                  label: {
                    normal: {
                      position: "inner",
                      formatter: e => {
                        if (e.data.value === 0) return "";
                        return e.data.name + "\n" + e.data.value;
                      }
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                          {
                            offset: 0,
                            color: "#00b0ff"
                          },
                          {
                            offset: 0.8,
                            color: "#7052f4"
                          }
                        ],
                        false
                      )
                    }
                  },
                  data: that.yxjmsArr
                }
              ]
            };
            myChart.setOption(option);

            let myChart1 = echarts.init(document.getElementById("now-cus"));

            let option1 = {
              title: {
                text: "正式代理商统计",
                left: "center",
                textStyle: {
                  fontWeight: "normal"
                }
              },
              xAxis: {
                data: that.field,
                type: "category",
                axisTick: {
                  show: false
                },
                axisLabel: {
                  rotate: 30
                }
              },
              yAxis: {
                name: "单位：个",
                type: "value",
                splitLine: {
                  show: false
                },
                minInterval: 1
              },
              grid: {
                top: "25%",
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
              },
              series: [
                {
                  name: "体验店",
                  type: "bar",
                  barWidth: "40%",
                  label: {
                    normal: {
                      position: "inner",
                      formatter: e => {
                        if (e.data.value === 0) return "";
                        return e.data.name + "\n" + e.data.value;
                      }
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                          {
                            offset: 0,
                            color: "#00b0ff"
                          },
                          {
                            offset: 0.8,
                            color: "#7052f4"
                          }
                        ],
                        false
                      )
                    }
                  },
                  data: that.jmsArr
                }
              ]
            };
            myChart1.setOption(option1);
          }
        });
    },
    loadMerByStatus() {
      let that = this;
      //            fetchPostData(host+'/api/formalsMerByMerStatus',{}).then((data) => {
      //              if(data.code == 0){
      //                for(let key in that.status) {
      //                  data.list.forEach(item => {
      //                    if(item['正式加盟商状态'] === key) {
      //                      that.status[key] = item["人数"]
      //                    }
      //                  });
      //                }
      //                let myChart = echarts.init(document.getElementById('now-cus'));
      //                let xData = that.statusList.map(item => item.name);
      //                let option = {
      //                  title: {
      //                    text: '正式加盟商统计',
      //                    left: 'center',
      //                    textStyle: {
      //                      fontWeight: 'normal'
      //                    }
      //                  },
      //                  xAxis: {
      //                      data: xData,
      //                      type: 'category',
      //                      axisTick: {
      //                        show: false
      //                      },
      //                      axisLabel: {
      //                        rotate: 30
      //                      }
      //                  },
      //                  yAxis: {
      //                    name: "单位：个",
      //                    type: 'value',
      //                    splitLine: {
      //                      show: false
      //                    },
      //                    minInterval: 1
      //                  },
      //                  grid: {
      //                    top: '25%',
      //                    left: '3%',
      //                    right: '4%',
      //                    bottom: '3%',
      //                    containLabel: true
      //                  },
      //                  series: [{
      //                    name: '正式加盟商',
      //                    type: 'bar',
      //                    barWidth: '40%',
      //                    label: {
      //                      normal: {
      //                        position: 'inner',
      //                        formatter: e => {
      //                          if(e.data.value === 0) return '';
      //                          return e.data.name + '\n' + e.data.value;
      //                        }
      //                      }
      //                    },
      //                    itemStyle:{
      //                        normal:{
      //                            color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
      //                                offset: 0,
      //                                color: '#00b0ff'
      //                            }, {
      //                                offset: 0.8,
      //                                color: '#7052f4'
      //                            }], false)
      //                        }
      //                    },
      //                    data: that.statusList
      //                  }]
      //                }
      //                myChart.setOption(option);
      //              }
      //            })
    }
  },
  mounted: function() {
    let vm = this;

    var data = this.getStatus(10034);
    data.then(
      function(value) {
       value.map(e=>vm.yxfield.push(e.name));
  
        
      },
      function(err) {
        console.log(err);
      }
    );
     var data = this.getStatus(10035);
    data.then(
      function(value) {
       value.map(e=>vm.field.push(e.name));
  
        
      },
      function(err) {
        console.log(err);
      }
    );
    this.getMyJms();
 
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
#listBox{ 
 padding: 0 20px;
  &>div{
    line-height:0.7rem;
    font-size:5vw;
    font-weight: bold;
    color: #333333;
  }
  ul{
   
    height:3rem;
  }
}
.yxstores{
  display: inline-block;
  width:45%;
  text-align:center;
  padding-top:10px;
    & div:nth-child(1){
        font-size:0.3rem;
        font-weight:500;
        line-height:0.6rem;
    }
    & div:nth-child(2){
        font-size:0.28rem;
        font-weight:400;
        line-height:0.6rem;
    }
}
.t1{
   font-size:0.35rem;
.bigNum{
      display: inline-block;
      font-size:0.48rem;
    }
}
 
.levelBox{
  font-size:0.32rem;
  li{
    text-align: center;
    border: 1px solid #000;
    display: inline-block;
    width: 49%;
    line-height: 1.2rem;
  }
}
</style>