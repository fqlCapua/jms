<template>
	<div>
		<div id="wapper">
			<!---->
			<my-header :headerParam="headerParam" :flag="flag"></my-header>
			<!---->

			<div id="editInfo">
				<div class="editInfo-title">客户信息</div>
				<div class="item clearfix">
					<span class="item-flag"> <i class="icon"></i>姓名:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
					<div class="item-con">
						<input type="text" v-model.trim="username" v-on:blur="vertifylen(username,1,4)" class="input md-name" maxlength="4" placeholder="请输入姓名" />
					</div>
				</div>
				<!-- 	 -->
				<div class="item clearfix">
					<span class="item-flag">联系电话：<i class="icon"></i></span>
					<div class="item-con">
						<input type="text" v-model.trim="usertel" v-on:blur="vertifyPhone(usertel)" minlength="11" maxlength="11" class="input md-name" placeholder="请输入手机号码" />
					</div>
				</div>
				<div class="item clearfix">
					<span class="item-flag">联系地址：<i class="icon"></i></span>
					<div class="item-con">
						<input type="text" v-model="xxdz" placeholder="请输入详细地址" name="points" class="input  md-name" />
					</div>
				</div>
				<div class="item clearfix">
					<span class="item-flag">意愿级别：<i class="icon"></i></span>
					<div class="item-con clearfix">
						<div class="radio" v-for="(item,index) in agencylevalBox" :key="index">
							<input type="radio" v-bind:value="item.id" v-model="yyjb" />
							<span class="text">{{item.name}}</span>
						</div>
					</div>
				</div>
				<div class="item clearfix">
					<span class="item-flag">&#x3000;&#x3000;备注：</span>
					<div class="item-con clearfix">
						<div class="textarea-con">
							<textarea v-model.trim="beizhu" :on:keyup="jltext(this)" name="" rows="" cols="" placeholder="请输入备注..."></textarea>
							<p class="bdNum"><span :class="beizhu.length>190?'redletter':''">{{beizhu.length>200?200:beizhu.length}}</span>/200</p>
						</div>
					</div>
				</div>
				<div class="editInfo-title">代理信息</div>

				<div class="item clearfix">
					<span class="item-flag">代理商类型：<i class="icon"></i></span>
					<div class="item-con">
						<div class="radio" v-for="(item,index) in mainTypes" :key="index">
							<input type="radio" v-model="mainType" :value="item.id" />
							<span class="text">{{item.name}}</span>
						</div>
					</div>
				</div>
				<div class="item clearfix">
					<span class="item-flag">代理区域：</span>
					<div class="item-con" @click="togglePicker">
						<i class="siteicon"></i>
						<p class="sitecon">
							{{areaText}}
						</p>
					</div>

				</div>
				<div class="item clearfix">
					<span class="item-flag">代理级别：</span>
					<div class="item-con item-con1">
						<div class="selectcon">
							<i class="xzqh-icon"></i>
							<select :change="changeInfo(this)" v-model="aleval">
								<option v-for="(item,index) in areaLeval" v-bind:value="item.id" :key="index">{{item.name}}</option>
							</select>
						</div>
					</div>
				</div>
				<div class="item clearfix">
					<span class="item-flag">所属上级：</span>
					<div class="item-con">
						<input type="text" v-model="belong" class="input md-name" placeholder="妙优车旗舰店" />
					</div>
				</div>

				<div class="item clearfix">
					<span class="item-flag">商户类型：<i class="icon"></i></span>
					<div class="item-con clearfix">
						<!-- <div class="radio"  v-for="(item,index) in storeTypeBox" :key="index">
							<input type="radio" @change="radioChange" name="shlx"  v-model="shlx" :value="item.id"/>
							<span class="text">{{item.name}}</span>
							<input type="text" v-show="item.id==6"  :maxlength="shlxqtlen" v-on:blur="vertifylen(shlxqt,1,10)" v-model.trim="shlxqt" class="input qt-input" placeholder="请输入其它商户类型" />
						</div> -->
						<div class="radio">
							<input type="radio" @change="radioChange" name="shlx" v-model="shlx" value="1" />
							<span class="text">个人</span>
						</div>
						<div class="radio">
							<input type="radio" @change="radioChange" name="shlx" v-model="shlx" value="2" />
							<span class="text">公司</span>
						</div>
					</div>
				</div>
				<div class="item clearfix" v-if="thereStoreStatus">
					<span class="item-flag">{{mdNameflag}}名称：</span>
					<div class="item-con">
						<input type="text" v-on:blur="vertifylen(mdName,2,20)" v-model="mdName" class="input md-name" placeholder="请输入名称" />
					</div>
				</div>
				<div class="item clearfix">
					<span class="item-flag">门店别名：</span>
					<div class="item-con">
						<input type="text" v-model="mdOtherName" class="input md-name" placeholder="请输入名称" />
					</div>
				</div>
				<div class="item clearfix">
					<span class="item-flag">门头编号：</span>
					<div class="item-con">
						<input type="text" v-model="mdOtherNum" class="input md-name" placeholder="请输入名称" />
					</div>
				</div>
				<div class="item clearfix">
					<span class="item-flag">门店地址：</span>
					<div class="item-con">
						<input type="text" v-model="openAddress" placeholder="请输入详细地址" name="points" class="input  md-name" />
					</div>
				</div>
				<div class="item clearfix" v-show="false">
					<span class="item-flag">业务经理：</span>
					<div class="item-con clearfix">
						<!-- <input type="text" disabled="1" placeholder="请输入姓名" name="points" class="input  md-name"   /> -->
						<!-- <p class="ywjl">{{ywjl}}</p> -->
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
				<div style="">

				</div>
				<div class="item clearfix" v-show="0">
					<span class="item-flag">类型：</span>
					<div class="item-con">
						<div class="radio" v-for="(item,index) in types" :key="index">
							<input type="radio" v-model="type" :value="item.id" />
							<span class="text">{{item.name}}</span>
						</div>
					</div>
				</div>

				<div class="item clearfix" v-show="0">
					<span class="item-flag">经营内容：</span>
					<div class="item-con">
						<div class="checkbox" v-for="(item,index) in businessBox" :key="index">
							<input type="checkbox" name="jynr" :value="item.id" v-model="business" />
							<span class="text">{{item.name}}</span>
						</div>

					</div>
				</div>

				<div class="item clearfix" v-show="0">
					<span class="item-flag">员工人数：</span>
					<div class="item-con">
						<input type="number" placeholder="" v-model="empNum" v-on:blur="vertifyValue(empNum,1,10)" name="points" class="input  md-name" />
					</div>
				</div>

				<div class="item clearfix item1" v-show="false">
					<span class="item-flag">&#x3000;&#x3000;来源：</span>
					<div class="item-con clearfix">
						<div class="radio" v-for="(item,index) in lyBox" :key="index">
							<input type="radio" v-bind:value="item.id" v-model="ly" />
							<span class="text">{{item.name}}</span>
						</div>

					</div>
				</div>

				<div>

				</div>
				<mt-popup v-model="pickerStatus" position="bottom">
					<mt-picker :defaultIndex="dindex" :visibleItemCount="pickerNum" :slots="slots" @change="onValuesChange"></mt-picker>
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
	import Vue from "vue";
	import qs from "qs";
	import { Toast, Popup, Picker, MessageBox, Field } from "mint-ui";
	export default {
		data() {
			return {
				headerParam: {
					title: "编辑信息",
					setting: 0,
					back: 1
				},
				mdOtherName: "",
				mdOtherNum: "",
				openAddress: "",
				belong: "",
				textareacon: "",
				disableStatus: false, //备注
				thereStore: [{
					status: true,
					name: "是"
				}, {
					status: false,
					name: "否"
				}], //是否有门店
				thereStoreStatus: true,
				mdNameflag: "门店", //门店名称flag
				mainType: 1, //代理商类型
				mainTypes: [{
					id: 1,
					name: "形象店"
				}, {
					id: 2,
					name: "体验店"
				}],
				isNew: true,
				afterMap: false,
				dindex: 1,
				pickerNum: 5,
				storeTypeBox: [],
				storeType: 1,
				business: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				areaText: "点击选择",
				aleval: "1",
				areaLeval: [{
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
				agencylevalBox: [{
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
				types: [],
				type: 1,
				yyjb: 1,
				agencyleval: 1,
				pickerStatus: false,
				flag: "0",
				shlx: 1, //商户类型
				shlxqt: "", //商户类型其它
				mdName: "", //门店名称
				jynr: [], //经营内容
				lyBox: [{
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
				businessBox: [],

				communication: "", // 沟通内容
				username: "", //用户姓名
				usertel: "", //用户手机号
				xzqjb: "", //行政区级别
				xxdz: "", //详细地址
				yyjb: 1, //意愿级别
				ywjl: "", //业务经理
				sjjl: "", //上级经理
				beizhu: "", //备注
				ygxx: [{
					job: " ",
					num: " "
				}], //员工信息

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
				slots: [{
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
					},
					{
						flex: 1,
						values: [],
						className: "slot4",
						textAlign: "center"
					}
				],
				fileImgArr: [],
				empNum: 1,
				MapStatus: true
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
			jltext(e) {
				//监听input框变化
				let l = this.beizhu.length;

				if(l <= 200) {} else {
					this.beizhu = this.beizhu.substring(0, 199);

				}
			},

			radioChange() {
				if(this.shlx == 1) {
					this.mdNameflag = "门店";
				} else {
					this.mdNameflag = "公司";
				}
			},
			transArea(num) {
				//代理区域id翻译
				var _that = this;
				var t = this.checkArea(num);
				t.then(res => (_that.areaText = res), function() {});
			},
			goMap() {
				this.saveJmsinfo();
				this.addSession("afterMap", true);
				this.$router.push("/dwsite");
			},
			changeInfo(){},
			vertifyValue(value,min,max) {
				if(value < min || value > max) {
					Toast(`${min}~${max}`);
				}
			},
			vertifylen(value, min, max) {
				if(value.length < min || value.length > max) {
					Toast(`长度在${min}到${max}之间`);
				}
			},
			vertifyPhone(value) {
				if(!isNaN(value)) {
					if(value.length != 11) {
						Toast(`手机格式不正确`);
					}
				} else {
					Toast(`请输入11位数字`);
				}
			},
			addperson() {
				if(this.ygxx.length >= 10) {
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
				if(files.length > 6) {
					Toast("最多上传6张图片！");
				} else {
					for(let i = 0; i < files.length; i++) {
						let file = files[i];
						this.uploadImg(file);
						let reader = new FileReader();
						reader.readAsDataURL(file);
						reader.onload = function(e) {
							_that.dmimgs.push(e.target.result);
						};
					}

					for(let i = 0; i < files.length; i++) {
						let file = files[i];
						_that.dmimgsfiles.push(file);
					}
					//
					if(_that.dmimgs.length >= 5) {
						_that.addimgbtn = false;
					} else {
						_that.addimgbtn = true;
					}
				}
			},
			uploadImg(file) {
				var _that = this;
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

						if(res.code == 8200) {
							let imgobj = {
								accessory: res.data[0].url,
								serviceTable: "appstoreImg"
							};

							_that.fileImgArr.push(imgobj);
							console.log(_that.fileImgArr);
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
					if(data == "confirm") {
						_that.dmimgs.splice(i, 1);
						_that.dmimgsfiles.splice(i, 1);
						_that.addimgbtn = true;
					}
				});
			},
			onValuesChange(picker, values) {
				if(this.area) {
					this.areaText = values.join("");
					var cityNameArr = [],
						cityNumArr = [],
						townNameArr=[],
						townNumArr=[];
						picker.setSlotValues(1,[]);
				     	picker.setSlotValues(2,[]);
				 
					for(let [index, item] of this.proNameArr.entries()) {
						if(item == values[0]) {
							var len = this.area[index].children.length;
                            if(this.area[index].children.length&&len == 1) {
                                for(let cityName of this.area[index].children[0].children) {
									if(cityName.label == values[1]) {
										this.areaId = cityName.value;
									 }
									cityNameArr.push(cityName.label);
									cityNumArr.push(cityName.value);
								}
								this.cityNameArr = cityNameArr;
								picker.setSlotValues(1, cityNameArr);
							   
						    }else if(this.area[index].children.length&&len!=1){
                                for(let cityName of this.area[index].children) {
									  
									 cityNameArr.push(cityName.label);
									 cityNumArr.push(cityName.value);
								     this.cityNameArr = cityNameArr;
									 this.cityNumArr = cityNumArr;
								}
								picker.setSlotValues(1,cityNameArr);
						 
							    for(let [ind,item] of this.cityNameArr.entries()){
								  if(item==values[1]){
									for(let town of this.area[index].children[ind].children){
									    townNameArr.push(town.label);
										townNumArr.push(town.value);
										if(town.label==values[2]){
										 
											this.areaId=town.value;
									  	}
									   }
									   picker.setSlotValues(2,townNameArr);
									   
								  }

								}
							
								 
							}else{
								this.areaId=this.area[index].value;
							
							}
						}
					}
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
						for(let proName of res.data) {
							proNameArr.push(proName.label);
						}
						_that.proNameArr = proNameArr;
						_that.slots[0].values = proNameArr;
					});
			},
			submit() {
				// 提交信息

				let _that = this;

				// if (_that.areaText == "点击选择") {
				//   Toast("请选择区域");
				//   return false;
				// }
				if(!_that.yyjb) {
					alert("请选择意愿级别!");
					return false;
				}

				if(_that.xxdz == "点击定位当前位置") {
					_that.xxdz = "";
				}

				let form = {};
				if(_that.shlx == 2) {
					form.company = _that.mdName;
				} else {
					form.storeName = _that.mdName; //门店名称 
				};
				if(!_that.username) {
					Toast("请输入名字");
					return false;
				} else {
					if(_that.username.length > 16) {
						Toast("名字长度1-16");
						return false;
					}
				}
				if(!_that.usertel) {
					Toast("请输入联系方式");
					return false;
				}
				if(!_that.xxdz) {
					Toast("请输入联系地址");
					return false;
				}
				if(_that.isNew) {

					var url = "/agent/proxy/addStoreInfo";
				} else {

					_that.storeCode = _that.getSession("storeCode");
					form.storeCode = _that.storeCode;
					var url = "/agent/proxy/editStoreInfo";
				}

				form.type = _that.mainType;
				form.storeType = _that.shlx; //商户类型
				form.business = _that.business.join(","); //经营内容
				form.operator = _that.getSession("id");
				form.name = _that.username; //姓名
				form.mobile = _that.usertel; //手机号
				form.areaId = _that.areaId; //区域ID
				form.address = _that.xxdz; //详细地址
				form.areaLevel = _that.aleval; //行政区级别
				form.intentLevel = _that.yyjb; // 意愿级别
				form.openAddress = _that.openAddress //开业地址
				form.belong = _that.belong //所属代理商
				form.memo = _that.beizhu; //业务经理
				//  form.source = _that.ly; //来源
				form.listSysFileManage = _that.fileImgArr; //图片

				for(let p in form) {
					if(form[p] == "") {
						delete form[p];
					}
				}

				fetch(host + url, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(form)
					})
					.then(res => res.text())
					.then(res => {
						var res = JSON.parse(res);
						if(res.status == 1) {
							if(url.indexOf("edit") > -1) {
								Toast("编辑成功");
							} else {
								Toast("恭喜您提交成功");
							}

							_that.$router.push("/yxjmslist");
							_that.isNew = true;
						} else {
							Toast(res.message);
						}
					});
			},

			saveJmsinfo() {
				//销毁之前保存jms信息
				let _that = this;
				let jmsinfo = {};
				jmsinfo.storeType = _that.shlx; //商户类型
				jmsinfo.storeName = _that.mdName; //门店名称
				jmsinfo.business = _that.business; //经营内容
				jmsinfo.type = _that.type; //员工信息
				jmsinfo.username = _that.username; //姓名
				jmsinfo.usertel = _that.usertel; //手机号
				jmsinfo.areaId = _that.areaId; //区域ID
				jmsinfo.areaText = _that.areaText; //区域ID
				jmsinfo.xxdz = _that.xxdz; //详细地址
				jmsinfo.aleval = _that.aleval; //行政区级别
				jmsinfo.yyjb = _that.yyjb; // 意愿级别
				jmsinfo.areaText = _that.areaText;
				jmsinfo.manager = _that.manager; //业务经理
				jmsinfo.ly = _that.ly; //来源
				jmsinfo.listSysFileManage = _that.fileImgArr; //图片
				sessionStorage.setItem("jmsinfo", JSON.stringify(jmsinfo));
			},
			showJmsinfo() {
				//回显保存的jmsinfo
				var _that = this;
				if(this.isNew) {} else {
					this.getFromPath();
					this.MapStatus = false;
				}
			}
		},
		computed: {
			shlxqtlen() {
				if(this.shlx == "其它") {
					return 10;
				} else {
					return 0;
				}
			}
		},
		mounted: function() {
			let vm = this;
			var data = this.getStatus(10038);
			data.then(
				function(res) {
					vm.types = res;
				},
				function(err) {
					console.log(err);
				}
			);
			var data = this.getStatus(10030);
			data.then(
				function(res) {
					vm.storeTypeBox = res;
				},
				function(err) {
					console.log(err);
				}
			);
			var data = this.getStatus(10031);
			data.then(
				function(res) {
					vm.businessBox = res;
				},
				function(err) {
					console.log(err);
				}
			);

			if(this.$route.params.hisPage) {
				this.isNew = false;
			}
			this.showJmsinfo();
			//  getFromPath() {
			//   let _that = this;
			//   var form = this.$route.params.jmsInfo;
			//   _that.shlx = form.storeType; //商户类型
			//   _that.mdName = form.storeName; //门店名称
			//   _that.business = String(form.business).split(","); //经营内容
			//   _that.type = form.type; //员工信息
			//   _that.username = form.name; //姓名
			//   _that.usertel = form.mobile; //手机号
			//   _that.areaId = form.areaId; //区域ID
			//   _that.transArea(form.areaId);
			//   //_that.areaText=form.areaText ; //区域ID
			//   _that.xxdz = form.address; //详细地址
			//   _that.aleval = form.areaLevel; //行政区级别
			//   _that.yyjb = form.intentLevel; // 意愿级别
			//   _that.manager = form.manager; //业务经理
			//   _that.ly = form.source; //来源
			//   _that.fileImgArr = form.listSysFileManage; //图片
			// },
			//   getFromSession() {
			//   let _that = this;
			//   var form = JSON.parse(this.getSession("info"));
			//   _that.shlx = form.shlx; //商户类型
			//   _that.mdName = form.mdName; //门店名称
			//   _that.business = String(form.business).split(","); //经营内容
			//   _that.type = form.type; //员工信息
			//   _that.username = form.username; //姓名
			//   _that.usertel = form.usertel; //手机号
			//   _that.areaId = form.areaId; //区域ID
			//   _that.transArea(form.areaId);
			//   _that.xxdz = form.xxdz; //详细地址
			//   _that.aleval = form.aleval; //行政区级别
			//   _that.yyjb = form.yyjb; // 意愿级别
			//   _that.manager = form.manager; //业务经理
			//   _that.ly = form.ly; //来源
			//   _that.fileImgArr = form.fileImgArr; //图片
			// },
			// //从意向加盟商跳转,flag=1，初始化页面数据
			// if (this.getSession("zdsite")) {
			//   this.xxdz = this.getSession("zdsite");
			// }
			// if (this.$route.params.hasOwnProperty("storeCode")) {
			//   this.flag = "1";
			//   this.storeCode = this.$route.params.storeCode;
			//   sessionStorage.setItem("storeCode", this.storeCode);
			//   //   this.getYxJmsInfo();
			// } else {
			//   this.storeCode = this.getSession("storeCode");
			// }

		},
		destroyed: function() {
			//this.saveJmsinfo();
			//  this.removeItem("jmsinfo");
			// this.removeItem("afterMap");
		}
	};
</script>
<style lang="less">
	.mint-popup {
		width: 100% !important;
	}
	
	.item .item-flag {
		font-size: 12px;
	}
	
	.redletter {
		color: #FA4D50;
	}
	
	.bdNum {
		width: 100%;
		color: #BABABA;
		font-size: 0.26rem;
		text-align: right;
		padding-right: 0.1rem;
		position: absolute;
		left: 0;
		bottom: 5px;
	}
</style>