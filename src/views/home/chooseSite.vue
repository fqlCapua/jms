<template>
  <div>
    <div id="wapper">
      <my-header :headerParam="headerParam"></my-header>
      <!---->
      <div id="choosesite">
        <!--地图-->
        <div>
          <baidu-map class="map" center="郑州" :zoom="zoom" @ready="handler" :map-click="false" dragging pinch-to-zoom @touchstart="mapClick" @click="mapClick">
            <bm-geolocation @locationSuccess="locationSuccess" anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true"
                            :autoLocation="true"></bm-geolocation>
            <!---->
            <!--marker点-->
            <bm-marker v-for="(item,index) in mapPoints" :key="index" :position="{lng: item.lng, lat: item.lat}" animation="BMAP_ANIMATION_BOUNCE" @click="clickHandler"></bm-marker>
            <bm-marker v-for="(item,index) in yxjmsPoints" :key="index" :position="{lng: item.lng, lat: item.lat}" :icon="{url: './static/imgs/yxjms.png', size: {width: 20, height: 20}}"  @click="clickHandler" v-if="showYxjms"></bm-marker>
            <bm-marker v-for="(item,index) in jmsPoints" :key="index" :position="{lng: item.lng, lat: item.lat}" :icon="{url: './static/imgs/jms.png', size: {width: 20, height: 20}}" @click="clickHandler" v-if="showJms"></bm-marker>
            <!---->
            <!--信息窗体-->
            <bm-info-window :position="selectPoint" :title="selectPointTitle" :show="infoshow" @close="infoWindowClose"
                            @open="infoWindowOpen">
            </bm-info-window>
          </baidu-map>
          <div class="jms-switch">
            <mt-switch v-model="showYxjms">意向加盟商</mt-switch>
            <mt-switch v-model="showJms">正式加盟商</mt-switch>
          </div>
        </div>
        <!---->
        <!---->
        <!---->
        <!--搜索按钮-->
        <div class="search">
          <div class="lr" @click="showDialog">
            <i class="icon1"></i>
            <p class="text">条件选址</p>
          </div>
          <div class="lr" @click="locateByPrice">
            <i class="icon2"></i>
            <p class="text">价格优先</p>
          </div>
          <div class="lr" @click="locateByPop">
            <i class="icon3"></i>
            <p class="text">人口优先</p>
          </div>
        </div>
      </div>
      <!---->
      <!--页面底部-->
      <my-footer :id="footerIndex"></my-footer>
      <!---->
      <!--选择地址弹窗-->
      <div id="cswindow" v-show="dddialog" @touchmove.prevent>
        <div class="con">
          <p class="title1" @click="closeDialog">选址条件</p>
          <p class="title2">商圈区域</p>
          <div class="csqy">
            <i class="icon"></i>
            <select name="" class="select bgctran" v-model="selectSqfw">
              <option v-for="(item,index) in sqfw" :key="index" :value="item.trading_area">{{item.trading_area}}
              </option>
            </select>
          </div>
          <div class="line">
            <p class="text1">租金 {{zj}}元</p>
            <p class="text2">1000-{{maxparams.max_rental}}</p>
            <Range v-model="zj"
                   :min="1"
                   :max="maxparams.max_rental"
                   :step="500"
                   :bar-height="6">
            </Range>
          </div>
          <div class="line">
            <p class="text1">小区成熟度 {{xqcsd}}</p>
            <p class="text2">0-{{maxparams.max_community_maturity}}</p>
            <Range v-model="xqcsd"
                   :min="0"
                   :max="maxparams.max_community_maturity"
                   :step="1"
                   :bar-height="6">
            </Range>
          </div>
          <div class="line">
            <p class="text1">小区租售比 {{getBili}}</p>
            <p class="text2">0-{{'%' + maxparams.max_rent_sell_ratio / 100}}</p>
            <Range v-model="xqzsb"
                   :min="0"
                   :max="maxparams.max_rent_sell_ratio"
                   :step="1"
                   :bar-height="6">
            </Range>
          </div>
          <div class="line">
            <p class="text1">人流量 {{rll}}</p>
            <p class="text2">0-{{Math.ceil(maxparams.max_visitor_flowrate / 10000)}}万</p>
            <Range v-model="rll"
                   :min="0"
                   :max="maxparams.max_visitor_flowrate"
                   :step="1"
                   :bar-height="6">
            </Range>
          </div>
          <div class="line">
            <p class="text1">周围小区数量 {{xqsl}}</p>
            <p class="text2">0-{{maxparams.max_surrounding_com}}</p>
            <Range v-model="xqsl"
                   :min="0"
                   :max="maxparams.max_surrounding_com"
                   :step="1"
                   :bar-height="6">
            </Range>
          </div>
          <p class="surebtn" @click="lookCommunity">确定</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import MyFooter from '@/components/footer'
  import MyHeader from '@/components/header'
  import {fetchGetData, fetchPostData, host, bushost} from '@/api'
  import {Range, Toast, Indicator, Switch} from 'mint-ui'
  export default{
    data(){
      return {
        footerIndex: 2,
        headerParam: {
          title: '智能选址',
          setting: 0,
          back: 0
        },
        center: {lng: 116.404, lat: 39.915},
        zoom: 12,
        dddialog: false,  //显示弹窗
        maxparams: {  //最大值
          max_rental: 10000,     //租金
          max_community_maturity: 100,  // 小区成熟度
          max_rent_sell_ratio: 1,   //小区租售比 * 10000，  再除以10000
          max_visitor_flowrate: 10000,   //人流量
          max_surrounding_com: 100,   //周围小区数量
        },
        sqfw: [],   //商圈范围
        selectSqfw: '',  //选中的商圈服务
        zj: 0,
        xqcsd: 0,   //小区成熟度
        xqzsb: 0,   //小区租售比
        rll: 0,   //人流量
        xqsl: 0,   //周围小区数量
        mapPoints: [],   //选中的商圈
        selectPoint: {},  //点击的点的坐标
        selectPointTitle: '',  //点击的点的title
        infoshow: false,
        locateType: 0, // 0代表无操作，1代表价格优先，2代表人口优先
        yxjmsPoints: [], // 意向加盟商点
        jmsPoints: [], // 正式加盟商点
        showYxjms: true, // 是否展示意向加盟商
        showJms: true // 是否展示正式加盟商
      }
    },
    components: {MyFooter, MyHeader, Range},
    methods: {
      handler ({BMap, map}) {
        //进入页面自动定位
        let that = this
        var gm = new BMap.Geolocation()
        gm.getCurrentPosition(function (r) {
          let mk = new BMap.Marker(r.point)
          map.addOverlay(mk)
          map.panTo(r.point)
          that.center.lng = r.point.lng
          that.center.lat = r.point.lat
        })
      },
      locationSuccess (r) {
        //手动定位
        let that = this
        that.center.lng = r.point.lng
        that.center.lat = r.point.lat
      },
      showDialog () {
        //显示弹窗
        this.dddialog = true;
      },
      closeDialog () {
        //关闭弹窗
        this.dddialog = false;
      },
      getSqNum () {
        //获取商圈范围
        let that = this
        fetchGetData(bushost + '/businessCircles', {}).then(function (data) {
          if (data.code == 0 && data.data.length) {
            that.sqfw = data.data
            that.selectSqfw = data.data[0].trading_area
          }
        })
      },
      getMinMax () {
        //获取各种最大，最小范围
        let that = this
        fetchGetData(bushost + '/maximum', {}).then(function (data) {
          if (data.code == 0) {
            that.maxparams = data.data
            that.maxparams.max_rent_sell_ratio = data.data.max_rent_sell_ratio * 10000
          }
        })
      },
      getJms() {
        let that = this;
        fetchGetData(host + '/api/addressList', {}).then(function (data) {
          console.log(data)
          if (data.code == 0 && data.list.length) {
            data.list.forEach(item => {
              if(item.longitudeLatitude) {

                let coord = item.longitudeLatitude.split(',')
                if(item.merNumber) {
                  that.jmsPoints.push({lng: coord[0], lat: coord[1]});
                } else {
                  that.yxjmsPoints.push({lng: coord[0], lat: coord[1]});
                }
              }
            })
          }
        })
      },
      lookCommunity () {
        //查询对应条件的小区
        Indicator.open('正在加载...')
        let that = this
        let param = {}
        param.trading_area = that.selectSqfw
        param.rental = '0,' + that.zj
        param.community_maturity = '0,' + that.xqcsd
        param.rent_sell_ratio = '0,' + that.xqzsb / 10000
        param.visitor_flowrate = '0,' + that.rll
        param.surrounding_com = '0,' + that.xqsl
        fetchPostData(bushost + '/selectCommunity', param).then(function (data) {
          if (data.code == 0) {
            that.mapPoints = [];
            let list = data.data
            for (let v of list) {
              that.mapPoints.push({lng: v.longitude, lat: v.latitude, title: (v.community_name)})
            }
            Indicator.close()
          }
        })
        //
        that.closeDialog()
      },
      clickHandler (e) {
        //点击
        let that = this
        that.locateType = 0
        let point = e.target.point
        that.selectPoint = point  //设置选中的点
        that.mapPoints.forEach(function (v, i) {
          if (v.lng == point.lng && v.lat == point.lat) {
            that.selectPointTitle = v.title
            that.infoshow = true
          }
        })
      },
      infoWindowClose () {

      },
      infoWindowOpen () {

      },
      locateByPrice() {
        Toast({
          message: '请点击地图选择中心点',
          position: 'bottom',
          duration: 3000
        });
        this.locateType = 1;
      },
      locateByPop() {
        Toast({
          message: '请点击地图选择中心点',
          position: 'bottom',
          duration: 3000
        });
        this.locateType = 2;
      },
      mapClick(e) {
        let that = this;
        if(this.locateType === 1) {
          Indicator.open('正在加载...');
          fetchPostData(bushost + '/selectCommunity', {develop_type: 1}).then(function (data) {
            if (data.code == 0) {
              that.mapPoints = [];
              let list = data.data
              for (let v of list) {
                if(that.getDistance(v.longitude, v.latitude, e.point.lng, e.point.lat) > 2000) continue;
                that.mapPoints.push({lng: v.longitude, lat: v.latitude, title: (v.community_name)})
              }
              that.locateType = 0;
              Indicator.close();
            }
          })
        }
        if(this.locateType === 2) {
          Indicator.open('正在加载...')
          fetchPostData(bushost + '/selectCommunity', {develop_type: 2}).then(function (data) {
            if (data.code == 0) {
              that.mapPoints = [];
              let list = data.data
              for (let v of list) {
                if(that.getDistance(v.longitude, v.latitude, e.point.lng, e.point.lat) > 2000) continue;
                that.mapPoints.push({lng: v.longitude, lat: v.latitude, title: (v.community_name)})
              }
              that.locateType = 0;
              Indicator.close();
            }
          })
        }
      },
      OD(a, b, c) {
        while (a > c) a -= c - b;
        while (a < b) a += c - b;
        return a;
      },
      SD(a, b, c) {
        b != null && (a = Math.max(a, b));
        c != null && (a = Math.min(a, c));
        return a;
      },
      getDistance(a_lng, a_lat, b_lng, b_lat) {
        let a = Math.PI * this.OD(a_lng, -180, 180) / 180;
        let b = Math.PI * this.OD(b_lng, -180, 180) / 180;
        let c = Math.PI * this.SD(a_lat, -74, 74) / 180;
        let d = Math.PI * this.SD(b_lat, -74, 74) / 180;
        return 6370996.81 * Math.acos(Math.sin(c) * Math.sin(d) + Math.cos(c) * Math.cos(d) * Math.cos(b - a));
      }
    },
    mounted: function () {
      this.getSqNum()
      this.getMinMax()
      this.getJms()
    },
    computed: {
      getBili () {
        let that = this
        return '%' + parseInt(that.xqzsb) / 100
      }
    }
  }
</script>
<style   >
  .map {
    width: 100%;
    height: 12rem;
  }
  .jms-switch {
    position: absolute;
    top: 1rem;
    left: .1rem;
    font-size: .3rem;
    background-color: rgba(255,255,255,0.8);
    border-radius: 5px;
  }
  .mint-switch {
    margin: .1rem .2rem;
  }
 
</style>
