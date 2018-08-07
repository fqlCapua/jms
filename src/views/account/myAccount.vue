<template>
  <div>
    <div id="wapper">
      <!---->
      <my-header :headerParam="headerParam" class="bgctran"></my-header>

      <!---->
      <div id="myaccount">
        <!--个人信息-->
        <div class="userinfo">
          <div class="con margin-center">
            <router-link to="/myInfo" class="userphoto margin-center">{{myFirstName}}</router-link>
            <p class="name">{{userInfo.realName}}</p>
            <p class="uid">工号：{{userInfo.jobNumber}}</p>
          </div>
        </div>
        <!--加盟商数据-->
        <div class="jms">
          <div class="jms-data clearfix">
            <div class="jms-data-item">
              <p class="text1">{{myJms.XXD.allCount}}</p>
              <p class="text2">我的一级代理商</p>
            </div>
            <router-link :to="{path:'/yxjmslist'}" class="jms-data-item">
              <p class="text1">{{myJms.XXD.intention}}</p>
              <p class="text2">意向加盟商</p>
            </router-link>
            <router-link :to="{path:'/jmslist'}" class="jms-data-item">
              <p class="text1">{{myJms.XXD.official}}</p>
              <p class="text2">正式加盟商</p>
            </router-link>
          </div>
          <div class="jms-data clearfix">
            <div class="jms-data-item">
              <p class="text1">{{myJms.TYD.allCount}}</p>
              <p class="text2">我的二级代理商</p>
            </div>
            <router-link :to="{path:'/yxjmslist'}" class="jms-data-item">
              <p class="text1">{{myJms.TYD.intention}}</p>
              <p class="text2">意向加盟商</p>
            </router-link>
            <router-link :to="{path:'/jmslist'}" class="jms-data-item">
              <p class="text1">{{myJms.TYD.official}}</p>
              <p class="text2">正式加盟商</p>
            </router-link>
          </div>
          <div class="jms-rq clearfix">
            <div class="jms-rq-item">
              <span :class="[dateIndex=='1'?'c1':'']" @click="selectDate('1')">本日</span>
            </div>
            <div class="jms-rq-item">
              <span :class="[dateIndex=='2'?'c1':'']" @click="selectDate('2')">本周</span>
            </div>
            <div class="jms-rq-item">
              <span :class="[dateIndex=='3'?'c1':'']" @click="selectDate('3')">本月</span>
            </div>
            <div class="jms-rq-item">
              <span :class="[dateIndex=='4'?'c1':'']" @click="selectDate('4')">本季</span>
            </div>
          </div>
          <div class="jms-map clearfix">
            <!--没有数据-->
            <div class="jms-map-con jms-map-con1" v-if="!yesdata">
              <div class="jssm clearfix">
                <i class="icon1"></i>
                <span class="text">加盟商数量</span>
              </div>
              <span class="nodataimg"></span>
              <p class="t1">您目前还没有加盟商，加油哦~</p>
            </div>
            <!--有数据-->
            <div class="jms-map-con jms-map-con2" id="chart1" v-if="yesdata"></div>
            <div class="jms-map-con jms-map-con2" id="chart2" v-if="yesdata"></div>
          </div>
        </div>
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
  import {fetchPostData,fetchGetData,host} from '@/api'
  import qs from 'qs'
  import moment from 'moment'
  export default{
    data(){
      return {
        footerIndex: 3,
        headerParam: {
          title: '我的',
          setting: 1,
          back: 0
        },
        userInfo: {},  //用户信息
        myJms: {
          XXD: {
            "allCount": 0,
            "intention": 0,
            "official": 0
          },
          TYD: {
            "allCount": 0,
            "intention": 0,
            "official": 0
          }
        },   //我的加盟商总数
        yesdata: true,  //判断是否有数据

        alldata: {},  // 所有jms数据
        yxdata: [],   //意向数据
        zsdata: [],  //正式数据
        xDate: {},  //x轴日期
        dateIndex: '1',
        myChart1: null,
        myChart2: null
      }
    },
    components: {MyFooter, MyHeader},
    mounted: function () {
      //获取用户信息
      this.getUserInfo()
      //获取我的加盟商
      this.getMyJms()
      //根据日期获取加盟商
      // let date = moment().format('YYYY-MM-DD');
      this.getJmsByDate(1)
      //
    },
    computed:{
      myFirstName () {
        //获取名字 第一个字
        let v = this.userInfo.name
        if (!v) {
          return ''
        }
        v = v.toString()
        return v.charAt(0)
      },
      // myJmsAll () {
      //   //我的加盟商
      //   return parseInt(this.myJms.TOTAL) + parseInt(this.myJms.TOTAL_FORMAL)
      // }
    },
    methods: {
      initChart () {
        // 初始化表图
        var chart = echarts.init(document.getElementById('echart'))
        //绘制图表
        var option = {
          // 标题
          title: {
            text: '',
            subtext: ''
          },
          tooltip: {
            trigger: ''
          },
          //图例名
          legend: {
            data: []
          },
          grid: {
            top: '20%',
            left: '10%',   //图表距边框的距离
            right: '10%',
            bottom: '10%',
            containLabel: true
          },
          //工具框，可以选择
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          //x轴信息样式
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.xDate,
            //坐标轴颜色
            axisLine: {
              lineStyle: {
                color: 'gray'
              }
            },
            //x轴文字旋转
            axisLabel: {
              rotate: 30,
              interval: 0
            },
          },
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series: [
            //虚线
            {
              name: '',
              type: 'line',
              symbolSize: 4,   //拐点圆的大小
              color: ['#38ACF5'],  //折线条的颜色
              data: this.yxdata,
              smooth: false,   //关键点，为true是不支持虚线的，实线就用true
              itemStyle: {
                normal: {
                  color: '#38ACF5',
                  borderColor: '#38ACF5',  //拐点边框颜色
                  lineStyle: {
                    width: 1,
                    type: 'solid'  //'dotted'虚线 'solid'实线
                  }
                }
              }
            },
            //实线
            {
              name: '',
              type: 'line',
              symbol: 'circle',
              color: ['#FD597F'],
              symbolSize: 4,
              itemStyle: {
                normal: {
                  lineStyle: {
                    width: 1,
                    type: 'solid'  //'dotted'虚线 'solid'实线
                  },
                  color: '#FD597F',
                  borderColor: '#FD597F'  //拐点边框颜色
                }
              },
              data: this.zsdata
            }
          ]
        };
        chart.setOption(option);
      },
      getUserInfo () {  //用户信息
        var info=JSON.parse(this.getSession("us"));
        this.userInfo=info;
        
      },
      getMyJms () {  //我的加盟商
        fetchGetData(host+'/agent/proxy/myAllStoreCount?userId=' + this.userInfo.id + '&x-token=' + this.userInfo.token).then((data) => {
          if(data.status === 1) {
            this.myJms = data.data;
          }
        })
      },
      getJmsByDate(status, startTime, endTime) {
        fetchGetData(host + '/agent/proxy/getMyStoreCount?userId=' + this.userInfo.id + '&status=' + status + '&x-token=' + this.userInfo.token).then(data => {
          if(data.status === 1) {
            if(this.myChart1) this.myChart1.dispose();
            if(this.myChart2) this.myChart2.dispose();
            this.myChart1 = echarts.init(document.getElementById('chart1'));
            this.myChart2 = echarts.init(document.getElementById('chart2'));
            let option1;
            let option2;
            if(status === 1) {
              let chartData1;
              let chartData2;
              if(data.data.length) {
                chartData1 = [{name:'意向加盟商', value: data.data[0].intention}, {name:'正式加盟商 ', value: data.data[0].official}];
                chartData2 = [{name:'已开业', value: data.data[0].open}, {name:'未开业 ', value: data.data[0].noOpen}];
              } else {
                chartData1 = [{name:'意向加盟商', value: 0}, {name:'正式加盟商', value: 0}];
                chartData2 = [{name:'已开业', value: 0}, {name:'未开业', value: 0}];
              }
              option1 = {
                series: [{
                  name: '意向&正式',
                  type: 'pie',
                  radius: '50%',
                  label: {
                    normal: {
                      position: 'inner',
                      formatter: e => {
                        // if(e.data.value === 0) return '';
                        return e.data.name + '\n' + e.data.value;
                      }
                    }
                  },
                  data: chartData1
                }]
              };
              option2 = {
                series: [{
                  name: '开业&未开业',
                  type: 'pie',
                  radius: '50%',
                  label: {
                    normal: {
                      position: 'inner',
                      formatter: e => {
                        // if(e.data.value === 0) return '';
                        return e.data.name + '\n' + e.data.value;
                      }
                    }
                  },
                  data: chartData2
                }]
              };
            } else {
              let xData = [];
              let intentionData = [];
              let officialData = [];
              let openData = [];
              let noOpenData = [];
              let i = startTime;
              while(i !== endTime) {
                xData.push(i);
                i = moment(i, 'YYYY-MM-DD').add(1, 'days').format('YYYY-MM-DD');
              }
              xData.push(i);
              xData.forEach(item => {
                let contain = false;
                for(let j = 0; j < data.data.length; j++) {
                  if(item === moment(data.data[j].day).format('YYYY-MM-DD')) {
                    contain = true;
                    intentionData.push(data.data[j].intention);
                    officialData.push(data.data[j].official);
                    openData.push(data.data[j].open);
                    noOpenData.push(data.data[j].noOpen);
                    break;
                  }
                }
                if(!contain) {
                  intentionData.push(0);
                  officialData.push(0);
                  openData.push(0);
                  noOpenData.push(0);
                }
              })
              console.log(intentionData)
              console.log(officialData)
              console.log(openData)
              console.log(noOpenData)
              option1 = {
                grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
                },
                legend: {
                    icon: 'rect',
                    itemWidth: 14,
                    itemHeight: 5,
                    itemGap: 13,
                    data: ['意向加盟商', '正式加盟商'],
                    right: '4%',
                    textStyle: {
                        fontSize: 12,
                        color: '#000'
                    }
                },
                xAxis: {
                  type: 'category',
                  data: xData,
                  axisLabel: {
                    formatter: e => {
                      let arr = e.split('-')
                      return arr[1] + '-' + arr[2]
                    }
                  }
                },
                yAxis: {
                  type: 'value',
                  name: '单位：个',
                  axisTick: {
                    show: false
                  },
                  axisLabel: {
                    margin: 10,
                    textStyle: {
                      fontSize: 14
                    }
                  },
                  minInterval: 1
                },
                series: [
                  {
                    name: '意向加盟商',
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                      normal: {
                        width: 1
                      }
                    },
                    areaStyle: {
                      normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                          offset: 0,
                          color: 'rgba(137, 189, 27, 0.3)'
                        }, {
                          offset: 0.8,
                          color: 'rgba(137, 189, 27, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                      }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgb(137,189,27)',
                            borderColor: 'rgba(137,189,2,0.27)',
                            borderWidth: 12

                        }
                    },
                    data: intentionData
                  },
                  {
                    name: '正式加盟商',
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                      normal: {
                        width: 1
                      }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(0, 136, 212, 0.3)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(0, 136, 212, 0)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgb(0,136,212)',
                            borderColor: 'rgba(0,136,212,0.2)',
                            borderWidth: 12
                        }
                    },
                    data: officialData
                  }
                ]
              };
              option2 = {
                grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
                },
                legend: {
                    icon: 'rect',
                    itemWidth: 14,
                    itemHeight: 5,
                    itemGap: 13,
                    data: ['已开业加盟商', '未开业加盟商'],
                    right: '4%',
                    textStyle: {
                        fontSize: 12,
                        color: '#000'
                    }
                },
                xAxis: {
                  type: 'category',
                  data: xData,
                  axisLabel: {
                    formatter: e => {
                      let arr = e.split('-')
                      return arr[1] + '-' + arr[2]
                    }
                  }
                },
                yAxis: {
                  type: 'value',
                  name: '单位：个',
                  axisTick: {
                    show: false
                  },
                  axisLabel: {
                    margin: 10,
                    textStyle: {
                      fontSize: 14
                    }
                  },
                  minInterval: 1
                },
                series: [
                  {
                    name: '已开业加盟商',
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                      normal: {
                        width: 1
                      }
                    },
                    areaStyle: {
                      normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                          offset: 0,
                          color: 'rgba(137, 189, 27, 0.3)'
                        }, {
                          offset: 0.8,
                          color: 'rgba(137, 189, 27, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                      }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgb(137,189,27)',
                            borderColor: 'rgba(137,189,2,0.27)',
                            borderWidth: 12

                        }
                    },
                    data: openData
                  },
                  {
                    name: '未开业加盟商',
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                      normal: {
                        width: 1
                      }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(0, 136, 212, 0.3)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(0, 136, 212, 0)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgb(0,136,212)',
                            borderColor: 'rgba(0,136,212,0.2)',
                            borderWidth: 12
                        }
                    },
                    data: noOpenData
                  }
                ]
              };
            }
            this.myChart1.setOption(option1);
            this.myChart2.setOption(option2);
          }
        });
      },
      getMyJmsByDate (startTime, endTime, date) {  //根据日期查询我的加盟商
        let par = `startTime=${startTime}&endTime=${endTime}`;
        let that = this;
        fetchPostData(host+'/api/queryMerByDate', par, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((data) => {
          if (data.code == 0) {
            let info = data.params;
            if(that.myChart) that.myChart.dispose();
            that.myChart = echarts.init(document.getElementById('echart'));
            let option;
            if(startTime === endTime) {
              let chartData;
              if(info.data.length === 0) {
                chartData = [{name:'其他', value: 0}, {name:'我的', value: 0}]
              } else if(info.mydata.length === 0) {
                chartData = [{name:'全部', value: info.data[0].total}, {name:'我的', value: 0}]
              } else {
                chartData = [{name:'其他', value: info.data[0].total - info.mydata[0].mytotal}, {name:'我的', value: info.mydata[0].mytotal}]
              }
              option = {
                series: [{
                  name: '今日加盟',
                  type: 'pie',
                  radius: '50%',
                  label: {
                    normal: {
                      position: 'inner',
                      formatter: e => {
                        if(e.data.value === 0) return '';
                        return e.data.name + '\n' + e.data.value;
                      }
                    }
                  },
                  data: chartData
                }]
              }
            } else {
              let xData = [];
              let yDataTotal = [];
              let yDataAvg = [];
              let yDataMy = [];
              let i = startTime;
              while(i !== endTime) {
                xData.push(i);
                i = moment(i, 'YYYY-MM-DD').add(1, 'days').format('YYYY-MM-DD')
              }
              xData.push(i);
              xData.forEach(item => {
                let contain1 = false;
                for(let j = 0; j < info.data.length; j++) {
                  if(item === info.data[j].date) {
                    contain1 = true;
                    yDataTotal.push(info.data[j].total);
                    yDataAvg.push(info.data[j].avg);
                    break;
                  }
                }
                if(!contain1) {
                  yDataTotal.push(0);
                  yDataAvg.push(0);
                }
                let contain2 = false;
                for(let j = 0; j < info.mydata.length; j++) {
                  if(item === info.mydata[j].date) {
                    contain2 = true;
                    yDataMy.push(info.mydata[j].mytotal);
                    break;
                  }
                }
                if(!contain2) {
                  yDataMy.push(0);
                }
              })
              console.log(yDataTotal)
              option = {
                grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
                },
                legend: {
                    icon: 'rect',
                    itemWidth: 14,
                    itemHeight: 5,
                    itemGap: 13,
                    data: ['全部', '平均', '我的'],
                    right: '4%',
                    textStyle: {
                        fontSize: 12,
                        color: '#000'
                    }
                },
                xAxis: {
                  type: 'category',
                  data: xData,
                  axisLabel: {
                    formatter: e => {
                      let arr = e.split('-')
                      return arr[1] + '-' + arr[2]
                    }
                  }
                },
                yAxis: {
                  type: 'value',
                  name: '单位：个',
                  axisTick: {
                    show: false
                  },
                  axisLabel: {
                    margin: 10,
                    textStyle: {
                      fontSize: 14
                    }
                  },
                  minInterval: 1
                },
                series: [
                  {
                    name: '全部',
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                      normal: {
                        width: 1
                      }
                    },
                    areaStyle: {
                      normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                          offset: 0,
                          color: 'rgba(137, 189, 27, 0.3)'
                        }, {
                          offset: 0.8,
                          color: 'rgba(137, 189, 27, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                      }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgb(137,189,27)',
                            borderColor: 'rgba(137,189,2,0.27)',
                            borderWidth: 12

                        }
                    },
                    data: yDataTotal
                  },
                  {
                    name: '平均',
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                      normal: {
                        width: 1
                      }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(0, 136, 212, 0.3)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(0, 136, 212, 0)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgb(0,136,212)',
                            borderColor: 'rgba(0,136,212,0.2)',
                            borderWidth: 12

                        }
                    },
                    data: yDataAvg
                  },
                  {
                    name: '我的',
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                      normal: {
                        width: 1
                      }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(219, 50, 51, 0.3)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(219, 50, 51, 0)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        }
                    },
                    itemStyle: {
                        normal: {

                            color: 'rgb(219,50,51)',
                            borderColor: 'rgba(219,50,51,0.2)',
                            borderWidth: 12
                        }
                    },
                    data: yDataMy
                  }
                ]
              }
            }
            that.myChart.setOption(option);
          } else {

          }
        })
      },
      //选择 ，本周 本月 本季度
      selectDate (i) {
        this.dateIndex = i
        let startTime;
        let endTime;
        switch (i) {
          case '1':
            startTime = moment().format('YYYY-MM-DD');
            endTime = moment().format('YYYY-MM-DD');
            break;
          case '2':
            let weekOfday = moment().format('E');//计算今天是这周第几天
            startTime = moment().subtract(weekOfday-1, 'days').format('YYYY-MM-DD');//周一日期
            endTime = moment().add(7-weekOfday, 'days').format('YYYY-MM-DD');//周日日期
            break;
          case '3':
            endTime = moment().format('YYYY-MM-DD');
            startTime = moment().date(1).format('YYYY-MM-DD');
            break;
          case '4':
            let currentQuarter = moment().quarter() // 当前是第几季度
            let endMonth = 3 * parseInt(currentQuarter);
            let startMonth = 3 * parseInt(currentQuarter) - 3;
            startTime = moment().month(startMonth).date(1).format('YYYY-MM-DD');
            endTime = moment().date(1).month(endMonth).subtract(1, 'days').format('YYYY-MM-DD');
            break;
        }

        this.getJmsByDate(parseInt(i), startTime, endTime);
        // this.getAllDate(i)
      }
    },
   
  }
</script>
<style scoped>
  #echart {
    width: 100%;
    height: 3rem;
  }
</style>
