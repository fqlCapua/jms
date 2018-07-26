<template>
  <div>
    <div id="wapper">
      <my-header :headerParam="headerParam"></my-header>
      <!---->
      <baidu-map class="map" center="郑州" :zoom="zoom" @ready="handler">
        <bm-geolocation @locationSuccess="locationSuccess" anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true"
                        :autoLocation="false"></bm-geolocation>
        <!---->
        <!---->
        <bm-view class="map"></bm-view>
        <!-- <bm-local-search :keyword="keyword" :nearby="nearby" :forceLocal="true" :auto-viewport="true" @infohtmlset="getSite"></bm-local-search> -->
      </baidu-map>
      <div class="result">
        <div v-for="(item,index) in pois" :key="index" class="poi-item" :data-loc="item.location" @click="getSite(item)">
          <div class="poi-name">{{item.name}}</div>
          <div class="poi-address">{{item.address}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import MyFooter from '@/components/footer'
  import MyHeader from '@/components/header'
  import {Toast, MessageBox, Indicator} from 'mint-ui'
  import {fetchGetData, fetchPostData} from '@/api'
  import axios from 'axios'
  export default{
    data(){
      return {
        footerIndex: 2,
        headerParam: {
          title: '定位',
          setting: 0,
          back: 1
        },
        center: {lng: 113.64964385, lat: 34.75661006},
        zoom: 11,
        nearby: {},  //附近区域搜索
        keyword: '',
        pois: []
      }
    },
    components: {MyHeader, Toast, MessageBox},
    methods: {
      handler ({BMap, map}) {
        var that = this;
        Indicator.open('正在获取位置');
        // 进入页面自动定位
        // navigator.geolocation.getCurrentPosition(position => {
        //     let lng = position.coords.longitude;
        //     let lat = position.coords.latitude;
        //     let pt = new BMap.Point(lng, lat);
        //     BMap.Convertor.translate(pt, 0, point => {
        //       let mk = new BMap.Marker(point);
        //       map.addOverlay(mk)
        //       map.panTo(pt)
        //       Indicator.close();
        //       Indicator.open('正在获取附近地点');
        //       let coord = this.wgsToGd(lng, lat);
        //       axios.get(`http://restapi.amap.com/v3/geocode/regeo?location=${coord}&extensions=all&radius=2000&key=ee420794c4113817c43da88d7dc18130`)
        //       .then(data => {
        //         console.log(data);
        //         that.pois = data.data.regeocode.pois;
        //         let address = data.data.regeocode.formatted_address
        //         MessageBox({title: '', message: address, showCancelButton: true}).then((data) => {
        //           if (data == 'confirm') {
        //             sessionStorage.setItem('zdsite', site)
        //             sessionStorage.setItem('zdloc', pt.lng+','+pt.lat)
        //             that.$router.back()
        //           }
        //         });
        //         Indicator.close();
        //       })
        //       .catch(err => {
        //         console.log(err);
        //         Indicator.close();
        //       });
        //     });
        // });
        var gm = new BMap.Geolocation();
        var geoc = new BMap.Geocoder();
        gm.getCurrentPosition(function (r) {
          let mk = new BMap.Marker(r.point)
          map.addOverlay(mk)
          map.panTo(r.point)
          //检索附近
          // that.nearby.center = r.point
          // that.nearby.radius = 1000
          // that.keyword = ['生活服务','公园景点','商场超市','酒店']
          Indicator.close();
          Indicator.open('正在获取附近地点');
          $.ajax({
            type: 'GET',
            url: `http://restapi.amap.com/v3/assistant/coordinate/convert?locations=${r.point.lng},${r.point.lat}&coordsys=baidu&key=ee420794c4113817c43da88d7dc18130`,
            success: function(data) {
              let coord = data.locations;
              $.ajax({
                type: 'GET',
                url: `http://restapi.amap.com/v3/geocode/regeo?location=${coord}&extensions=all&radius=2000&key=ee420794c4113817c43da88d7dc18130`,
                success: function(data) {
                  that.pois = data.regeocode.pois;
                  let address = data.regeocode.formatted_address
                  MessageBox({title: '', message: address, showCancelButton: true}).then((data) => {
                    if (data == 'confirm') {
                      sessionStorage.setItem('zdsite', address);
                      sessionStorage.setItem('zdloc', r.point.lng+','+r.point.lat)
                      that.$router.back()
                    }
                  });
                  Indicator.close();
                },
                fail: function(e) {
                  console.log(err);
                  Indicator.close();
                }
              });
              // axios.get(`http://restapi.amap.com/v3/geocode/regeo?location=${coord}&extensions=all&radius=2000&key=ee420794c4113817c43da88d7dc18130`)
              // .then(data => {
              //   that.pois = data.data.regeocode.pois;
              //   let address = data.data.regeocode.formatted_address
              //   MessageBox({title: '', message: address, showCancelButton: true}).then((data) => {
              //     if (data == 'confirm') {
              //       sessionStorage.setItem('zdsite', address);
              //       sessionStorage.setItem('zdloc', r.point.lng+','+r.point.lat)
              //       that.$router.back()
              //     }
              //   });
              //   Indicator.close();
              // })
              // .catch(err => {
              //   console.log(err);
              //   Indicator.close();
              // });
            },
            fail: function(e) {
              console.log(e);
              Indicator.close();
            }
          });
          // axios.get(`http://restapi.amap.com/v3/assistant/coordinate/convert?locations=${r.point.lng},${r.point.lat}&coordsys=baidu&key=ee420794c4113817c43da88d7dc18130`)
          // .then(data => {
            
          // })
          // .catch(err => {
            
          // });
        })
        map.addEventListener('click', function (e) {  //地图单击事件
          let pt = e.point;
          geoc.getLocation(pt, function(rs){
    
            let addComp = rs.addressComponents;
            let site = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber
            MessageBox({title: '', message: site, showCancelButton: true}).then((data) => {
              if (data == 'confirm') {
                sessionStorage.setItem('zdsite', site)
                sessionStorage.setItem('zdloc', pt.lng+','+pt.lat)
                that.$router.back();
              }
            });
          });
        })
      },
      locationSuccess (r) {
        //手动定位
        let that = this
//        that.center.lng = r.point.lng
//        that.center.lat = r.point.lat
      },
      getSite (item) {  //选择的地址
        MessageBox({
          title: '',
          message: item.address + ' ' + item.name,
          showCancelButton: true,
        }).then((data) => {
          if (data == 'confirm') {
            let coords = item.location.split(',');
            let bdCoords = this.gdToBd(coords[0], coords[1]);
            sessionStorage.setItem('zdsite', item.address + ' ' + item.name);
            sessionStorage.setItem('zdloc', bdCoords.bd_lng + ',' + bdCoords.bd_lat);
            this.$router.back();
          }
        });
      },
      //百度坐标转高德（传入经度、纬度）
      bdToGd(bd_lng, bd_lat) {
        var X_PI = Math.PI * 3000.0 / 180.0;
        var x = bd_lng - 0.0065;
        var y = bd_lat - 0.006;
        var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
        var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
        var gg_lng = z * Math.cos(theta);
        var gg_lat = z * Math.sin(theta);
        return {lng: gg_lng, lat: gg_lat}
      },
      //高德坐标转百度（传入经度、纬度）
      gdToBd(gg_lng, gg_lat) {
        var X_PI = Math.PI * 3000.0 / 180.0;
        var x = gg_lng, y = gg_lat;
        var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
        var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
        var bd_lng = z * Math.cos(theta) + 0.0065;
        var bd_lat = z * Math.sin(theta) + 0.006;
        return {
            bd_lat: bd_lat,
            bd_lng: bd_lng
        };
      },
      wgsToGd(lng, lat) {
        this.gcj_encrypt(lat, lng);
      },
      gcj_encrypt : function ( wgsLat , wgsLon ) {
        if (this.outOfChina(wgsLat, wgsLon)) {
          return {'lat': wgsLat, 'lon': wgsLon};
        }

        var d = this.delta(wgsLat, wgsLon);
        return {'lat' : wgsLat + d.lat,'lon' : wgsLon + d.lon};
      },
      outOfChina : function (lat, lon) {
        if (lon < 72.004 || lon > 137.8347)
            return true;
        if (lat < 0.8293 || lat > 55.8271)
            return true;
        return false;
      },
      delta : function (lat, lon) {
        // Krasovsky 1940
        //
        // a = 6378245.0, 1/f = 298.3
        // b = a * (1 - f)
        // ee = (a^2 - b^2) / a^2;
        let PI = 3.14159265358979324;
        var a = 6378245.0; //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
        var ee = 0.00669342162296594323; //  ee: 椭球的偏心率。
        var dLat = this.transformLat(lon - 105.0, lat - 35.0);
        var dLon = this.transformLon(lon - 105.0, lat - 35.0);
        var radLat = lat / 180.0 * PI;
        var magic = Math.sin(radLat);
        magic = 1 - ee * magic * magic;
        var sqrtMagic = Math.sqrt(magic);
        dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * PI);
        dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * PI);
        return {'lat': dLat, 'lon': dLon};
      },
      transformLat : function (x, y) {
        let PI = 3.14159265358979324;
        var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(y * PI) + 40.0 * Math.sin(y / 3.0 * PI)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(y / 12.0 * PI) + 320 * Math.sin(y * PI / 30.0)) * 2.0 / 3.0;
        return ret;
      },
      transformLon : function (x, y) {
        let PI = 3.14159265358979324;
        var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(x * PI) + 40.0 * Math.sin(x / 3.0 * PI)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(x / 12.0 * PI) + 300.0 * Math.sin(x / 30.0 * PI)) * 2.0 / 3.0;
        return ret;
      },
    },
    mounted: function () {
      sessionStorage.setItem('zdsite', '')
    }
  }
</script>
<style scoped>
  .map {
    width: 100%;
    height: 7rem;
  }
  .result {
    width: 100%;
    height: 7rem;
    overflow: auto;
  }
  .result>div {
    padding: .2rem .2rem;
    border-bottom: .01rem solid #ccc;
  }
  .poi-name {
    font-size: .2rem;
  }
  .poi-address {
    margin-top: .1rem;
    font-size: .15rem;
    color: #999;
  }
  .BMap_cpyCtrl .BMap_noprint .anchorBL {
    display: none;
  }
</style>
