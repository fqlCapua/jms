<template>
  <div>
    <div id="wapper" style="padding-bottom: 0">
      <div id="login">
        <div class="login-icon">
          <span class="icon"></span>
        </div>
        <p class="login-title">欢迎使用系统</p>
        <div class="line line1 clearfix">
          <p class="line-title">手机号码</p>
          <input v-model="phone" type="tel" maxlength="11" class="line-input" placeholder="请输入手机号码"></input>
          <span class="icon" @click="clearphone"></span>
        </div>
        <div class="line clearfix">
          <p class="line-title">密码</p>
          <!--密码长度6-20-->
          <input v-model="pwd" type="password" maxlength="20" class="line-input" placeholder="请输入密码"></input>
        </div>
        <p class="login-btn margin-center" @click="login">登录</p>
        <!--<Range  v-model="rangeValue"-->
        <!--:min="10"-->
        <!--:max="90"-->
        <!--:step="10"-->
        <!--:bar-height="5">-->
        <!--<div slot="start">0</div>-->
        <!--<div slot="end">100</div>-->
        <!--</Range>-->
      </div>
    </div>
  </div>
</template>
<script>
  import {Toast} from 'mint-ui';
  import {fetchPostData,host} from '@/api'
  import qs from 'qs'
  export default{
    data(){
      return {
        phone: '',
        pwd: ''
      }
    },
    components: {Toast},
    methods: {
      clearphone () {
        this.phone = ''
      },
      login(){
        let phone_reg = /^1[3456789]\d{9}$/
        if (!this.phone || !this.pwd) {
          this.toast("请输入手机号或密码")
          return false
        }
        if (!phone_reg.test(this.phone)) {
          this.toast("手机号码格式错误")
          return false
        }
        if (this.pwd.length < 5) {
          this.toast("密码错误")
          this.pwd = ''
          return false
        }
//      fetchPostData(host+'/api/login', qs.stringify({mobile: this.phone, password: this.pwd}))
//        .then((data) => {
//          if (data.code == 0) {
//            //登录成功
//            this.toast('登录成功')
//            this.$store.dispatch('userLogin', data)
//            this.$router.push({path: '/myAccount'})
//          } else {
// 
//          }
//      })
  let formdata=new FormData();
      formdata.append("mobile",this.phone);
      formdata.append("password",this.pwd);
      
    fetch("http://47.105.52.171:8080/mer-api/api/login",{
        method:'POST',
    	 	body:formdata
    	 }).then((res)=>res.text())
    	   .then((res)=>{
    	   	var res=JSON.parse(res);
      	 	    if (res.code == 0) {
              //登录成功
              this.toast('登录成功')
              this.$store.dispatch('userLogin', res)
              this.$router.push({path: '/'})
            }else {
            this.toast('登陆失败'+res.msg);
            }
    	 })
      
         
      },
      toast(text){
          //toast弹窗
        let param = {position: 'bottom'}
        param.message = text
        Toast(param);
      }
    },
    mounted: function () {}
  }
</script>

