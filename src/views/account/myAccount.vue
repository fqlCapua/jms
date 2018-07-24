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
              <p class="text1">{{myJmsAll}}</p>
              <p class="text2">我的加盟商</p>
            </div>
            <router-link :to="{path:'/yxjmslist'}" class="jms-data-item">
              <p class="text1">{{myJms.TOTAL}}</p>
              <p class="text2">意向加盟商</p>
            </router-link>
            <router-link :to="{path:'/jmslist'}" class="jms-data-item">
              <p class="text1">{{myJms.TOTAL_FORMAL}}</p>
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
            <div class="jms-map-con jms-map-con2" id="echart" v-if="yesdata"></div>
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
  import {fetchPostData,host} from '@/api'
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
        myJms: {},   //我的加盟商总数
        yesdata: true,  //判断是否有数据

        alldata: {},  // 所有jms数据
        yxdata: [],   //意向数据
        zsdata: [],  //正式数据
        xDate: {},  //x轴日期
        dateIndex: '1',
        myChart: null
      }
    },
    components: {MyFooter, MyHeader},
    mounted: function () {
      //获取用户信息
      this.getUserInfo()
      //获取我的加盟商
      //this.getMyJms()
      //根据日期获取加盟商
      //let date = moment().format('YYYY-MM-DD');
    //  this.getMyJmsByDate(date, date)
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
      myJmsAll () {
        //我的加盟商
        return parseInt(this.myJms.TOTAL) + parseInt(this.myJms.TOTAL_FORMAL)
      }
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
        fetchPostData(host+'/api/queryMyMers', {}).then((data) => {
          if (data.code == 0) {
            this.myJms = data.merMap
          } else {

          }
        })
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
        let now = moment();
        let startTime;
        let endTime;
        switch (i) {
          case '1':
            startTime = now.format('YYYY-MM-DD');
            endTime = now.format('YYYY-MM-DD');
            break;
          case '2':
            endTime = now.format('YYYY-MM-DD');
            startTime = now.subtract(6, 'days').format('YYYY-MM-DD');
            break;
          case '3':
            endTime = now.format('YYYY-MM-DD');
            startTime = now.subtract(29, 'days').format('YYYY-MM-DD');
            break;
        }
        this.getMyJmsByDate(startTime, endTime, now)
        // this.getAllDate(i)
      },
      //查旬  本周 本月 本季度 的数据
      getAllDate (flag) {
        var that = this
        //意向数据
        var yx = []
        var yxArr = []
        //正式数据
        var zs = []
        var zsArr = []
        if (flag == 1) {  //本周
          let tempArr = []
          yx = this.alldata.week
          zs = this.alldata.weekFormals
          for (let i = 0; i < 7; i++) {
            yxArr.push(0)
            zsArr.push(0)
            tempArr.push(this.getWeek(i))
          }
          //x轴的日期
          this.xDate = tempArr
          for (let item of yx) {
            tempArr.forEach(function (v, i) {
              if (item.date == v) {
                yxArr[i] = item.TOTAL_FORMAL
              }
            })
          }
          for (let item of zs) {
            tempArr.forEach(function (v, i) {
              if (item.date == v) {
                zsArr[i] = item.TOTAL_FORMAL
              }
            })
          }
        }
        //本月 4周
        if (flag == 2) {
          yx = this.alldata.months
          zs = this.alldata.monthsFormals
          let min = this.getYearWeek(this.getCurrentMonthFirst())
          let max = this.getYearWeek(this.getCurrentMonthLast())
          let tempArr = []
          for (min; min <= max; min++) {
            let v = min + "周"
            tempArr.push(v)
            yxArr.push(0)
            zsArr.push(0)
          }
          this.xDate = tempArr
          for (let item of yx) {
            tempArr.forEach(function (v, i) {
              if (v.indexOf(item.week) != -1) {
                yxArr[i] = item.TOTAL_FORMAL
              }
            })
          }
          for (let item of zs) {
            tempArr.forEach(function (v, i) {
              if (v.indexOf(item.week) != -1) {
                zsArr[i] = item.TOTAL_FORMAL
              }
            })
          }
        }
        if (flag == 3) {
          yx = this.alldata.quarter
          zs = this.alldata.quarterFormals
          let tempArr = this.getBenJd()
          yxArr = [0, 0, 0]
          zsArr = [0, 0, 0]
          this.xDate = tempArr
          for (let item of yx) {
            tempArr.forEach(function (v, i) {
              if (v.indexOf(item.month) != -1) {
                yxArr[i] = item.TOTAL_FORMAL
              }
            })
          }
          for (let item of zs) {
            tempArr.forEach(function (v, i) {
              if (v.indexOf(item.month) != -1) {
                zsArr[i] = item.TOTAL_FORMAL
              }
            })
          }
        }
        that.yxdata = yxArr
        that.zsdata = zsArr
        //初始化 图标
        that.initChart()
      },
      getWeek(i) {  // 获取本周日期范围
        let now = new Date();
        let firstDay = new Date(now - (now.getDay() - 1 ) * 86400000);
        firstDay.setDate(firstDay.getDate() + i);
        let mon = Number(firstDay.getMonth()) + 1;
        return "0" + mon + "/" + firstDay.getDate();
      },
      getCurrentMonthFirst() {  //获取本月第一天date对象
        var date = new Date();
        date.setDate(1);
        return date;
      },
      getCurrentMonthLast() { //获取本月最后一天date对象
        var date = new Date();
        var currentMonth = date.getMonth();
        var nextMonth = ++currentMonth;
        var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
        var oneDay = 1000 * 60 * 60 * 24;
        return new Date(nextMonthFirstDay - oneDay);
      },
      getYearWeek(date1){  //获取当前date对象为全年第几周
        var today = date1;
        var firstDay = new Date(today.getFullYear(), 0, 1);
        var dayOfWeek = firstDay.getDay();
        var spendDay = 1;
        if (dayOfWeek != 0) {
          spendDay = 7 - dayOfWeek + 1;
        }
        firstDay = new Date(today.getFullYear(), 0, 1 + spendDay);
        var d = Math.ceil((today.valueOf() - firstDay.valueOf()) / 86400000);
        var result = Math.ceil(d / 7);
        return result + 1;
      },
      getBenJd () {  //获取本季度的月份
        let date = new Date()
        let m = date.getMonth() + 1
        if (m == 1 || m == 2 || m == 3) {
          return ['1月', '2月', '3月']
        }
        if (m == 4 || m == 5 || m == 6) {
          return ['4月', '5月', '6月']
        }
        if (m == 7 || m == 8 || m == 9) {
          return ['7月', '8月', '9月']
        }
        if (m == 10 || m == 11 || m == 12) {
          return ['10月', '11月', '12月']
        }
        return ['1月', '2月', '3月']
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
