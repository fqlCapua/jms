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
                <p class="t1">{{myJms.yxnum}}</p>
                <p class="t2">本月意向加盟商</p>
              </div>
              <div class="item">
                <p class="t1">{{myJms.zsnum}}</p>
                <p class="t2">本月正式加盟商</p>
              </div>
            </div>
          </div>
          <!--中间部分-->
          <div class="index-center clearfix">
            <router-link :to="{path:'/editJmsInfo'}" class="item">
              <i class="icon icon1"></i>
              <p class="text">新增</p>
              <span class="ll"></span>
            </router-link>
            <router-link :to="{path:'/yxjmslist'}" class="item">
              <i class="icon icon2"></i>
              <p class="text">意向加盟商</p>
              <span class="ll"></span>
            </router-link>
            <router-link class="item" :to="{path:'/jmslist'}">
              <i class="icon icon3"></i>
              <p class="text">加盟商</p>
            </router-link>
          </div>
        </div>
        <div>
          <div id="future-cus"></div>
          <div id="now-cus"></div>
        </div>
        <!---->
        <!--页面底部-->
        <my-footer :id="footerIndex"></my-footer>
      </div>
    </div>
</template>
<script>
    import MyFooter from '@/components/footer'
    import MyHeader from '@/components/header'
    import {fetchGetData,fetchPostData,host} from '@/api'
    export default{
        data(){
            return {
                footerIndex: 1,
                headerParam: {
                    title: '首页',
                    setting: 0,
                    back: 0
                },
                myJms: {
                    yxnum: 0,
                    zsnum: 0
                },
                wills: {
                  "很感兴趣": 0,
                  "感兴趣": 0,
                  "需再沟通": 0,
                  "不感兴趣": 0
                },
                yxfield:["待缴费","待签约","审核中","已取消"],
                field:["已开业","待开业"],
                yxjmsArr:[],
                jmsArr:[],
                status: {
//                "待装修": 0,
//                "装修中": 0,
//                "待验收": 0,
//                "已验收": 0,
                  "待开业": 0,
                  "已开业": 0,
//                "需再沟通": 0
                }
            }
        },
        components: {MyFooter,MyHeader},
        methods:{
            getMyJms () {
              fetch(host+'/agent/proxy/getStoreCount',{method:"GET"})
              .then((res)=>res.text())
              .then((res) => {
              	var res=JSON.parse(res);
                if(res.status == 1){
               
                  this.myJms.yxnum = res.data.intention;
                  this.myJms.zsnum = res.data.official;
                }
              })
            },
            loadFutureCusByWish() {
              let that = this
              fetch(host+'/agent/proxy/storeCountGraph',{method:"GET"})
              .then((res)=>res.text())
              .then((res) => {
              	var res=JSON.parse(res);
              	 
                if(res.status == 1){
                	 
                  that.yxjmsArr.push(res.data.agentStatus1,res.data.agentStatus2,res.data.agentStatus4,res.data.agentStatus4)
                  that.jmsArr.push(res.data.openStatus1,res.data.openStatus1);
                
                  let myChart = echarts.init(document.getElementById('future-cus'));
                  let xData = that.willList.map(item => item.name);
                  let option = {
                    title: {
                      text: '意向加盟商统计',
                      left: 'center',
                      textStyle: {
                        fontWeight: 'normal'
                      }
                    },
                    xAxis: {
                        data: that.yxfield,
                        type: 'category',
                        axisTick: {
                          show: false
                        }
                    },
                    yAxis: {
                      name: "单位：个",
                      type: 'value',
                      splitLine: {
                        show: false
                      },
                      minInterval: 1
                    },
                    grid: {
                      top: '25%',
                      left: '3%',
                      right: '4%',
                      bottom: '3%',
                      containLabel: true
                    },
                    series: [{
                      name: '意向加盟商',
                      type: 'bar',
                      barWidth: '40%',
                      label: {
                        normal: {
                          position: 'inner',
                          formatter: e => {
                            if(e.data.value === 0) return '';
                            return e.data.name + '\n' + e.data.value;
                          }
                        }
                      },
                      itemStyle:{
                          normal:{
                              color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                  offset: 0,
                                  color: '#00b0ff'
                              }, {
                                  offset: 0.8,
                                  color: '#7052f4'
                              }], false)
                          }
                      },
                      data:that.yxjmsArr
                    }]
                  }
                  myChart.setOption(option)
                  
                  
                  let myChart1 = echarts.init(document.getElementById('now-cus'));
            
                  let option1 = {
                    title: {
                      text: '正式加盟商统计',
                      left: 'center',
                      textStyle: {
                        fontWeight: 'normal'
                      }
                    },
                    xAxis: {
                        data:that.field,
                        type: 'category',
                        axisTick: {
                          show: false
                        },
                        axisLabel: {
                          rotate: 30
                        }
                    },
                    yAxis: {
                      name: "单位：个",
                      type: 'value',
                      splitLine: {
                        show: false
                      },
                      minInterval: 1
                    },
                    grid: {
                      top: '25%',
                      left: '3%',
                      right: '4%',
                      bottom: '3%',
                      containLabel: true
                    },
                    series: [{
                      name: '正式加盟商',
                      type: 'bar',
                      barWidth: '40%',
                      label: {
                        normal: {
                          position: 'inner',
                          formatter: e => {
                            if(e.data.value === 0) return '';
                            return e.data.name + '\n' + e.data.value;
                          }
                        }
                      },
                      itemStyle:{
                          normal:{
                              color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                  offset: 0,
                                  color: '#00b0ff'
                              }, {
                                  offset: 0.8,
                                  color: '#7052f4'
                              }], false)
                          }
                      },
                      data:that.jmsArr  
                    }]
                  }
                  myChart1.setOption(option1);             
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                }
                
                
              })
              
              
              
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
        mounted: function () {
          this.getMyJms()
          this.loadFutureCusByWish()
          this.loadMerByStatus()
        },
        computed: {
          willList() {
            let list = []
            for(let key in this.wills) {
              list.push({
                name: key,
                value: this.wills[key]
              })
            }
            return list
          },
          statusList() {
            let list = []
            for(let key in this.status) {
              list.push({
                name: key,
                value: this.status[key]
              })
            }
            return list
          }
        }
    }
</script>
<style scoped>
#future-cus {
  width: 100%;
  height: 3rem;
}
#now-cus {
  width: 100%;
  height: 3rem;
  margin-top: .5rem;
}
</style>