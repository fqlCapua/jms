<template>
	<div>
		<div id="wapper">
			<!---->
			<my-header :headerParam="headerParam" ></my-header>
			<!---->
			<div id="editInfo">
				<div class="editInfo-title">补充法人资料:</div>
				<mt-field label="姓名" placeholder="姓名" v-model="legalPerson"></mt-field>
                <mt-field label="手机号" placeholder="请输入手机号" type="email" v-model="legalMobile"></mt-field>
			    <mt-field label="身份证" placeholder="请输入身份证" type="email" v-model="legalIdentity"></mt-field>
			    <mt-field label="银行卡号" placeholder="请输入银行卡号" type="email" v-model="legalBankCard"></mt-field>
			    <mt-field label="预留手机号" placeholder="请输入预留手机号" type="email" v-model="legalBankPhone"></mt-field>
			    <mt-field label="联系地址" placeholder="请输入联系地址" type="email" v-model="legalAddress"></mt-field>
				 
			     <div class="item clearfix">
					<span class="item-flag">身份证正:</span>
					<span class="item-con dm-imgs">
						<img v-for="(item,index) in legalFaceImg"  :src="item" :key="index"     class="dm-img" alt="" />
						<span class="addimg dm-img" v-show="addfimgbtn">
                           <input id="legalFaceImg" type="file"    @change="inputFaceImg" />
                       </span>
					</span>
				</div>
				<div class="item clearfix">
					<span class="item-flag">身份证反:</span>
					<span class="item-con dm-imgs">
						<img v-for="(item,index) in legalBackImg"  :src="item" :key="index"     class="dm-img" alt="" />
						<span class="addimg dm-img" v-show="addbimgbtn">
                           <input id="legalFaceImg" type="file"    @change="inputFaceImg" />
                       </span>
					</span>
				</div>
			 
				
			    <p class="tip">* 为必填项</p>
                <p class="submitbtn margin-center" @click="submit">提交</p>
			</div>
		</div>
	</div>
</template>
<script>
import axios from "axios";
import MyHeader from "@/components/header";
import { host } from "@/api";
import qs from "qs";
import { Toast, Popup, Picker, MessageBox, Field } from "mint-ui";
export default {
  data() {
    return {
      headerParam: {
        title: "提交补充信息",
        setting: 0,
        back: 1
	  },
	  addbimgbtn:true,
	  addfimgbtn:true,
      legalPerson: "",
      legalMobile: "",
      legalIdentity: "",
	  legalFaceImg:[],
	  legalFaceImgStr:"",
	  legalBackImgStr:'',
      legalBackImg:[],
      legalBankCard: "",
      legalBankPhone: "",
      legalAddress: "",
      dmimgs: [], //店面图片
      dmimgsfiles: [], //图片文件流
      addimgbtn: true //添加店面图片按钮
    };
  },
  components: {
    MyHeader,
    Toast,
    MessageBox,
    Popup,
    Picker,
    Field
  },
   mounted: function() {
	   this.getInfo();
	   this.areaId=this.$route.params.areaId;
	   this.storeCode=this.$route.params.storeCode;
	   
    if (this.$route.params.hasOwnProperty("jmsid")) {
      sessionStorage.setItem("jmsid", this.jmsid);
    }
  },

  methods: {
 
    changeInfo() {},
    vertifyValue(value, min, max) {
      if (value < min || value > max) {
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
 
    inputFaceImg(e) {
  
      let _that = this;
      let files = e.target.files;
      if (files.length > 6) {
        Toast("最多上传6张图片！");
      } else {
        for (let i = 0; i < files.length; i++) {
          let file = files[i];
         this.uploadImg(file,1);
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function(e) {
            _that.legalFaceImg.push(e.target.result);
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
	  inputBackImg(e) {
     
      let _that = this;
      let files = e.target.files;
      if (files.length > 6) {
        Toast("最多上传6张图片！");
      } else {
        for (let i = 0; i < files.length; i++) {
          let file = files[i];
         this.uploadImg(file,0);
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function(e) {
            _that.legalBackImg.push(e.target.result);
          };
        }

        for (let i = 0; i < files.length; i++) {
          let file = files[i];
          _that.dmimgsfiles.push(file);
        }
		//
		
 
        if (_that.inputBackImg.length >= 0) {
          _that.addimgbtn = false;
        } else {
          _that.addimgbtn = true;
        }
      }
    },
    uploadImg(file,state) {
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

          if (res.code == 8200) {
		 
            if(state==1){
             _that.legalFaceImgStr=res.data[0].url;
			}else if(state==0){
			 _that.legalBackImgStr=res.data[0].url;
			}
           
          }
        });
    },
    // delimg(i) {
    //   //删除对应的图片
    //   let _that = this;
    //   MessageBox({
    //     title: "",
    //     message: "确定删除该图片？",
    //     showCancelButton: true
    //   }).then(data => {
    //     if (data == "confirm") {
    //       _that.dmimgs.splice(i, 1);
    //       _that.dmimgsfiles.splice(i, 1);
    //       _that.addimgbtn = true;
    //     }
    //   });
    // },
  getInfo(){
	 var form1=this.getSession('info');
	 
	 var form=JSON.parse(form1);
	 let _that=this;  
	 _that.legalPerson=form.legalPerson;
	 _that.legalMobile=form.legalMobile;
	 _that.legalIdentity=form.legalIdentity;
	 _that.legalFaceImg.push(form.legalFaceImg);
     _that.legalBackImg.push(form.legalBackImg);
	 _that.legalBankCard=form.legalBankCard;
	 _that.legalBankPhone=form.legalBankPhone;
	 _that.legalAddress =form.legalAddress;
	 _that.legalPerson=form.legalPerson;
 
    if (_that.inputBackImg.length >= 1) {
          _that.addbimgbtn = false;
        } else {
          _that.addbimgbtn = true;
	}
	 if (_that.inputFaceImg.length >= 1) {
          _that.addfimgbtn = false;
        } else {
          _that.addfimgbtn = true;
    }
  },
    submit() {
      // 提交信息
      let _that = this;

      let form = {};
	  form.storeCode=_that.getSession("info").storeCode;
	  form.areaId=_that.getSession("info").personAreaId;
	  form.type=_that.getSession("info").type;
 
	  form.legalPerson=_that.legalPerson;
	  form.legalMobile=_that.legalMobile;
	  form.legalIdentity=_that.legalIdentity;
	  form.legalFaceImg=_that.legalFaceImgStr;
	  form.legalBackImg=_that.legalBackImgStr;
	   form.legalBankCard=_that.legalBankCard;
	  form.legalBankPhone=_that.legalBankPhone;
	  form.legalAddress=_that.legalAddress;
	  form.legalPerson=_that.legalPerson;
    

      for (let p in form) {
        if (form[p] == "") {
          delete form[p];
        }
      }

      
      fetch(host + "/agent/proxy/editStoreInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify(form)
      })
        .then(res => res.text())
        .then(res => {
		  var res = JSON.parse(res);
		  console.log(res);
          if (res.status == 1) {
			Toast("补充成功");
		_that.$router.push({path:"/yxjmslist"});
          } else {
            Toast(res.message);
          }
        });
    }
  },
  computed: {},

  destroyed: function() {}
};
</script>
 <style lang="less" scoped>
 
</style>
 
  
 