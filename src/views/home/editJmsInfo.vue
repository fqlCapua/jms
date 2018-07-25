<template>
	<div>
		<div id="wapper">
			<!---->
			<my-header :headerParam="headerParam" :flag="flag"></my-header>
			<!---->
			<div id="editInfo">
				<div class="editInfo-title">门店信息</div>
				<div class="item clearfix">
					<span class="item-flag">商户类型：<i class="icon"></i></span>
					<div class="item-con clearfix">
						<div class="radio">
							<input type="radio" name="shlx" id="shlx" value="个人" v-model="shlx" />
							<span class="text">个人</span>
						</div>
						<div class="radio">
							<input type="radio" name="shlx" id="" value="公司" v-model="shlx" />
							<span class="text">公司</span>
						</div>
						<div class="radio">
							<input type="radio" name="shlx" id="" value="洗车店" v-model="shlx" />
							<span class="text">洗车店</span>
						</div>
						<div class="radio">
							<input type="radio" name="shlx" id="" value="维修店" v-model="shlx" />
							<span class="text">维修店</span>
						</div>
						<div class="radio">
							<input type="radio" name="shlx" id="" value="保养店" v-model="shlx" />
							<span class="text">保养店</span>
						</div>
						<div class="radio">
							<input type="radio" name="shlx" id="" value="其它" v-model="shlx" />
							<span class="text">其它</span>
							<input type="text" :maxlength="shlxqtlen" v-on:blur="vertifylen(shlxqt,1,10)" v-model.trim="shlxqt" class="input qt-input" placeholder="请输入其它商户类型" />
						</div>
					</div>
				</div>
        <div class="item clearfix">
					<span class="item-flag">类型：</span>
					<div class="item-con">
						<div class="radio" v-for="(item,index) in types" :key="index">
							<input type="radio" v-model="type" :value="item.id"/>
							<span class="text">{{item.name}}</span>
						</div>
					</div>
				</div>
				<div class="item clearfix">
					<span class="item-flag">门店名称：</span>
					<div class="item-con">
						<input type="text" v-on:blur="vertifylen(mdName,2,20)" v-model="mdName" class="input md-name" placeholder="请输入门店名称" />
					</div>
				</div>
				<div class="item clearfix">
					<span class="item-flag">经营内容：</span>
					<div class="item-con">
						<div class="checkbox" v-for="(item,index) in businessBox" :key="index">
							<input type="checkbox" name="jynr"   :value="item.id" v-model="busiess" />
							<span class="text">{{item.name}}</span>
						</div>
				 
					</div>
				</div>
				<!-- <div class="item clearfix item1">
					<span class="item-flag">员工信息：</span>
					<div class="item-con">
						<div v-for="(item,index) in ygxx" :key="index" class="ygxx-input-con clearfix">
							<input type="text" class="input ygxx" v-model="item.job" placeholder="请输入职位" />
							<input type="text" class="input ygxx" v-model="item.num" placeholder="请输入人数" />
							<i class="close" v-show="index > 0" @click="subperson(index)"></i>
						</div>
					 
						<span class="addbtn" @click="addperson"></span>
					</div>
				</div> -->
        <div class="item clearfix">
					<span class="item-flag">员工人数：</span>
					<div class="item-con">
                 <input type="number" placeholder="" v-model="empNum" v-on:blur="vertifyValue(empNum,1,10)" name="points" class="input  md-name"   />
				 	</div>
				</div>
				<div class="editInfo-title">代理商信息</div>
				<div class="item clearfix">
					<span class="item-flag">&#x3000;&#x3000;姓名：</span>
					<div class="item-con">
						<input type="text" v-model.trim="username" v-on:blur="vertifylen(username,1,4)" class="input md-name" maxlength="4" placeholder="请输入姓名" />
					</div>
				</div>
				<!-- 	 -->
				<div class="item clearfix">
					<span class="item-flag">手机号码：</span>
					<div class="item-con">
						<input type="text" v-model.trim="usertel"  v-on:blur="vertifyPhone(usertel)" minlength="11" maxlength="11" class="input md-name" placeholder="请输入手机号码" />
					</div>
				</div>
				<!-- -->
				<div class="item clearfix">
					<span class="item-flag">代理区域：<i class="icon"></i></span>

					<div class="item-con" @click="togglePicker">
						<i class="siteicon"></i>
						<p class="sitecon">
							{{areaText}}
						</p>
					</div>

				</div>
				<div class="item clearfix">
					<span class="item-flag">详细地址：</span>
					<router-link :to="{path:'/dwsite'}">
						<div class="item-con">
							<i class="siteicon"></i>
							<p class="sitecon">
								{{xxdz}}
							</p>
						</div>
					</router-link>
				</div>

				<div class="item clearfix">
					<span class="item-flag">代理级别：</span>
					<div class="item-con item-con1">
						<div class="selectcon">
							<i class="xzqh-icon"></i>
							<select  :change="changeInfo(this)" v-model="aleval">
                                <option v-for="(item,index) in areaLeval" v-bind:value="item.id" :key="index">{{item.name}}</option>
							</select>
						</div>
					</div>
				</div>
				<div class="item clearfix">

					<span class="item-flag">意愿级别：<i class="icon"></i></span>
					<div class="item-con clearfix">
						<div class="radio"  v-for="(item,index) in agencylevalBox" :key="index">
							<input type="radio"   v-bind:value="item.id" v-model="yyjb" />
							<span class="text">{{item.name}}</span>
						</div>					 
					</div>
				</div>
				<div class="item clearfix">
					<span class="item-flag">业务经理：</span>
					<div class="item-con clearfix">
						<p class="ywjl">{{ywjl}}</p>
					</div>
				</div>

				<div class="item clearfix item1">
					<span class="item-flag">&#x3000;&#x3000;来源：</span>
					<div class="item-con clearfix">
						<div class="radio"  v-for="(item,index) in lyBox" :key="index">
							<input type="radio"  v-bind:value="item.id" v-model="ly" />
							<span class="text">{{item.name}}</span>
						</div>	
						 
					</div>
				</div>
		

				<div class="item clearfix">
					<span class="item-flag">店面照片：</span>
					<div class="item-con dm-imgs">
						<img v-for="(item,index) in dmimgs" @click="delimg(index)" :src="item" :key="index" class="dm-img" alt="" />
						<span class="addimg dm-img" v-show="addimgbtn">
                           <input type="file" value="" multiple="multiple" @change="inputImg">
                       </span>
					</div>
				</div>
		
				<div>
 
</div> 
				<mt-popup v-model="pickerStatus" position="bottom">
					<mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
				</mt-popup>

				<p class="tip">* 为必填项</p>

				<p class="submitbtn margin-center" @click="submit">提交</p>
			</div>
		</div>
	</div>
</template>
<script>
import axios from "axios";
import MyHeader from "@/components/header";
import { fetchPostData, fetchGetData, host } from "@/api";
import qs from "qs";
import { Toast, Popup, Picker, MessageBox,Field} from "mint-ui";
export default {
  data() {
    return {
      headerParam: {
        title: "编辑信息",
        setting: 0,
        back: 1
      },
      
      storeType: "",
      areaText: "点击选择",
      aleval: "1",
      areaLeval: [
        {
          id: 1,
          name: "省级"
        },
        {
          id: 2,
          name: "市级"
        },
        {
          id: 3,
          name: "县级"
        }
      ],
      storTypeBox: ["个人", "公司", "洗车店", "维修店", "保养店", "其它"],
      agencylevalBox: [
        {
          id: 1,
          name: "感兴趣"
        },
        {
          id: 2,
          name: "需再沟通"
        },
        {
          id: 3,
          name: "不感兴趣"
        },
        {
          id: 4,
          name: "很感兴趣"
        }
      ],
      types:[],
      type:1,
      yyjb: 1,
      agencyleval: 1,
      pickerStatus: false,
      flag: "0",
      shlx: "个人", //商户类型
      shlxqt: "", //商户类型其它
      mdName: "", //门店名称
      jynr: [], //经营内容
      lyBox: [
        {
          id: 1,
          name: "朋友介绍"
        },
        {
          id: 2,
          name: "线上渠道"
        },
        {
          id: 3,
          name: "销售渠道"
        },
        {
          id: 4,
          name: "其他"
        }
      ], //来源
      ly: 1,
      businessBox: [
        {
          id: 1,
          name: "维修"
        },
        {
          id: 2,
          name: "洗车"
        },
        {
          id: 3,
          name: "美容"
        },
        {
          id: 4,
          name: "装饰服务"
        },
        {
          id: 5,
          name: "配件销售"
        },
        {
          id: 6,
          name: "保险"
        },
        {
          id: 7,
          name: "汽车代销"
        },
        {
          id: 8,
          name: "汽车租赁"
        },
        {
          id: 9,
          name: "其他"
        }
      ],
      busiess: [],
      communication: "", // 沟通内容
      username: "", //用户姓名
      usertel: "", //用户手机号
      xzqjb: "", //行政区级别
      xxdz: "点击定位当前位置", //详细地址
      yyjb: 1, //意愿级别
      ywjl: "", //业务经理
      sjjl: "", //上级经理
      beizhu: "", //备注
      ygxx: [
        {
          job: " ",
          num: " "
        }
      ], //员工信息
      dmimgs: [], //店面图片
      dmimgsfiles: [], //图片文件流
      addimgbtn: true, //添加店面图片按钮
      merStatus: "", //状态
      createTime: "", //创建时间
      jmsid: "", //传递的加盟商id,
      areaIds: {},
      manager: "",
      areaId: "110101",
      proNameArr: [],
      slots: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center"
        },
        {
          flex: 1,
          values: [],
          className: "slot3",
          textAlign: "center"
        }
      ],
      fileImgArr: [],
      empNum:1
    };
  },
  components: {
    MyHeader,
    Toast,
    MessageBox,
    Popup,
    Picker
  },
  methods: {
    changeInfo() {},
     vertifyValue(value, min, max) {
      if (value < min || value> max) {
        Toast(`${min}~${max}`);
      }
    },
    vertifylen(value, min, max) {
      if (value.length < min || value.length > max) {
        Toast(`长度在${min}到${max}之间`);
      }
    },
    vertifyPhone(value) {
      if (!isNaN(value)) {
        if (value.length != 11) {
          Toast(`手机格式不正确`);
        }
      } else {
        Toast(`请输入11位数字`);
      }
    },
    addperson() {
      if (this.ygxx.length >= 10) {
        Toast("最多添加10个");
        return false;
      }
      //增加一行员工信息输入
      this.ygxx.push({
        duty: "",
        numPeople: ""
      });
    },
    subperson(i) {
      //去除一个员工信息
      this.ygxx.splice(i, 1);
    },
    inputImg(e) {
		
      //获取上传的店面图片
      let _that = this;
      let files = e.target.files;
      if (files.length > 6) {
        Toast("最多上传6张图片！");
      } else {
        for (let i = 0; i < files.length; i++) {
          let file = files[i];
        this.uploadImg(file);
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function(e) {
            _that.dmimgs.push(e.target.result);
          };
        }

        for (let i = 0; i < files.length; i++) {
          let file = files[i];
          _that.dmimgsfiles.push(file);
        }
        //
        if (_that.dmimgs.length >= 5) {
          _that.addimgbtn = false;
        } else {
          _that.addimgbtn = true;
        }
	  }
 
    },
    uploadImg(file) {
		var _that=this;
      var form = new FormData();
      form.append("module", "/app");
      form.append("appid", "osso237im");
      form.append("appsecret", "uyigq88w");
      form.append("file", file);
      fetch("http://oss.miaoyouche.cn/oss/material/agent/uploadMaterial", {
        method: "POST",
        async: false,
        body: form
      })
        .then(res => res.text())
        .then(res => {
		  var res = JSON.parse(res);
	 
          if (res.code == 8200) {
           
            let imgobj = {
              accessory:res.data[0].url,
              serviceTable:"appstoreImg"
            };
            _that.fileImgArr.push(imgobj);
           
          }
        });
    },
    delimg(i) {
      //删除对应的图片
      let _that = this;
      MessageBox({
        title: "",
        message: "确定删除该图片？",
        showCancelButton: true
      }).then(data => {
        if (data == "confirm") {
          _that.dmimgs.splice(i, 1);
          _that.dmimgsfiles.splice(i, 1);
          _that.addimgbtn = true;
        }
      });
    },
    onValuesChange(picker, values) {
      if (this.area) {
        this.areaText = values.join("");
        var cityNameArr = [],
          cityNumArr = [];

        for (let [index, item] of this.proNameArr.entries()) {
          if (item == values[0]) {
            let str = Object.prototype.toString.call(this.area[index].children);
            var status = str.split(" ")[1].split("]")[0];
            var len = this.area[index].children.length;

            if (len == 1) {
              for (let cityName of this.area[index].children[0].children) {
                if (cityName.label == values[1]) {
                  this.areaId = cityName.value;
                }
                cityNameArr.push(cityName.label);
                cityNumArr.push(cityName.value);
              }
              this.cityNameArr = cityNameArr;
              picker.setSlotValues(1, cityNameArr);
            } else {
              for (let cityName of this.area[index].children) {
                this.areaId = cityName.value;
                cityNameArr.push(cityName.label);
                cityNumArr.push(cityName.value);
                this.cityNameArr = cityNameArr;
                this.cityNumArr = cityNumArr;
              }
              picker.setSlotValues(1, cityNameArr);
            }
          }
        }
      }

      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    },
    togglePicker() {
      //行政区域areaId
      this.getareaId();
      this.pickerStatus = true;
    },
    getareaId() {
      let _that = this;
      fetch(host + "/agent/org/capital", {
        method: "GET",
        async: false
      })
        .then(res => res.text())
        .then(res => {
          var res = JSON.parse(res);
          //	console.log(res);
          _that.area = res.data;
          let proNameArr = [],
            proNumArr = [];
          for (let proName of res.data) {
            proNameArr.push(proName.label);
          }
          _that.proNameArr = proNameArr;
          _that.slots[0].values = proNameArr;
        });
    },
    submit() {
      // 提交信息
      let _that = this;
    
      if (_that.shlx == "其它") {
        //如果商户类型选择其它
        if (!_that.shlxqt) {
          Toast("请输入商户类型");
          return false;
        } else {
          _that.storeType = 6;
          // _that.shlx = 6;
        }
      } else {
        for (let p of _that.storTypeBox.entries()) {
          if (_that.shlx == p[1]) {
            _that.storeType = p[0] + 1;
          }
        }
      }
      if (_that.areaText == "点击选择") {
        Toast("请选择区域");
        return false;
      }
      if (!_that.yyjb) {
        alert("请选择意愿级别!");
        return false;
      }
     

      if (_that.xxdz == "点击定位当前位置") {
        _that.xxdz = "";
      }
     if(_that.empNum<1||_that.empNum>10){
         Toast("员工人数不正确");
        return false;
      }
      let form = {};
      form.storeType = _that.storeType; //商户类型
      form.storeName = _that.mdName; //门店名称
      form.busiess = _that.busiess.join(","); //经营内容
       form.type = _that.type; //员工信息
      form.name = _that.username; //姓名
      form.mobile = _that.usertel; //手机号
      form.areaId = _that.areaId; //区域ID
      form.address = _that.xxdz; //详细地址
      form.areaLevel = _that.aleval; //行政区级别
      form.intentLevel = _that.yyjb; // 意愿级别
      form.manager = _that.manager; //业务经理
      form.source = _that.ly; //来源
      form.listSysFileManage=_that.fileImgArr;     //图片 
    
      for (let p in form) {
        if (form[p] == "") {
          delete form[p];
        }
      }

      if (sessionStorage.getItem("store")) {
   
      } else {
      }
      fetch(host + "/agent/proxy/addStoreInfo", {
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
            Toast("添加成功");
          } else {
            Toast(res.message);
          }
        });
    },
 
    
    saveJmsinfo() {
      //销毁之前保存jms信息
      let that = this;
      let jmsinfo = {};
      jmsinfo.flag = that.flag;
      jmsinfo.shlx = that.shlx;
      jmsinfo.shlxqt = that.shlxqt;
      jmsinfo.mdName = that.mdName;
      jmsinfo.jynr = that.jynr;
      jmsinfo.ly = that.ly;
      jmsinfo.communication = that.communication;
      jmsinfo.username = that.username;
      jmsinfo.usertel = that.usertel;
      jmsinfo.xzqjb = that.xzqjb;
      jmsinfo.xxdz = that.xxdz;
      jmsinfo.xxloc = that.xxloc;
      jmsinfo.yyjb = that.yyjb;
      jmsinfo.ywjl = that.ywjl;
      jmsinfo.sjjl = that.sjjl;
      jmsinfo.beizhu = that.beizhu;
      jmsinfo.ygxx = that.ygxx;
      jmsinfo.addimgbtn = that.addimgbtn;
      jmsinfo.merStatus = that.merStatus;
      sessionStorage.setItem("jmsinfo", JSON.stringify(jmsinfo));
    },
    showJmsinfo() {
      //回显保存的jmsinfo
      if (sessionStorage.getItem("info")) {
        alert("OK");
    
      }
    }
  },
  computed: {
    shlxqtlen() {
      if (this.shlx == "其它") {
        return 10;
      } else {
        return 0;
      }
    }
  },
  mounted: function() {
        let  vm=this;
        var  data = this.getStatus(10038);
      data.then(function(res) {
          vm.types=res;
         
        },
        function(err) {
          console.log(err);
        }
      );
 
 
    //从意向加盟商跳转,flag=1，初始化页面数据
    if (this.$route.params.hasOwnProperty("storeCode")) {
      this.flag = "1";
      this.storeCode = this.$route.params.storeCode;
      sessionStorage.setItem("storeCode", this.storeCode);
      this.getYxJmsInfo();
    }else{
      this.storeCode=this.getSession("storeCode");
    }
   
  },
  destroyed: function() {
    this.saveJmsinfo();
  }
};

 
</script>
<style scoped>
.mint-popup {
  width: 100% !important;
}
</style>