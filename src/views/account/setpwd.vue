<template>
  <div>
    <div id="wapper">
      <!---->
      <my-header :headerParam="headerParam"></my-header>
      <!---->
      <div id="setpwd">
        
        <div class="line">
          <div class="line-con clearfix">
            <i class="icon3"></i>
            <i :class="[inputType1=='password'?'icon5':'icon6']" @click="changeEye('inputType1')"></i>
            <i class="icon2" @click="cleardata('oldpwd')"></i>
            <input v-on:blur="vertifylen(oldpwd,6,20)" v-model="oldpwd" :type="inputType1" maxlength="20" placeholder="请输入原始密码"/>
          </div>
        </div>
        <div class="line">
          <div class="line-con clearfix">
            <i class="icon4"></i>
            <i :class="[inputType2=='password'?'icon5':'icon6']" @click="changeEye('inputType2')"></i>
            <input v-model="newpwd1" :type="inputType2" maxlength="20" placeholder="请输入新密码"/>
          </div>
        </div>
        <div class="line">
          <div class="line-con clearfix">
            <i class="icon4"></i>
            <i :class="[inputType3=='password'?'icon5':'icon6']" @click="changeEye('inputType3')"></i>
            <input v-model="newpwd2" :type="inputType3" maxlength="20" placeholder="请确认新密码"/>
          </div>
        </div>
        <p class="surebtn margin-center" @click="sure">确定</p>
      </div>
    </div>
  </div>
</template>
<script>
  import MyHeader from '@/components/header'
  import {fetchPostData,host} from '@/api'
  import {Toast} from 'mint-ui';
  import Vue from "vue";
  import qs from 'qs'
  export default{
    data(){
      return {
        headerParam: {
          title: '修改密码',
          setting: 0,
          back: 1
        },
        phone: '',
        oldpwd: '',
        newpwd1: '',
        newpwd2: '',
        inputType1: 'password',
        inputType2: 'password',
        inputType3: 'password'
      }
    },
    components: {MyHeader, Toast},
    methods: {
       vertifylen(value,min,max){
         
        if(value.length<min||value.length>max){
           Toast(`${min}到${max}个字符`);
        } 
      },
      vertifyPhone(value){
         if(!isNaN(value)){
        if(value.length!=11){
           Toast(`手机格式不正确`);
        } 
         }else{
           Toast(`请输入11位数字`);
         }
       
      },
      // 点击叉号，情况输入框
      cleardata (attr) {
        this[attr] = ''
      },
      //显示隐藏密码
      changeEye (attr) {
        if (this[attr] == 'text') {
          this[attr] = 'password'
        } else {
          this[attr] = 'text'
        }
      },
      //确定修改密码
      sure () {
        if(this.newpwd1!=this.newpwd2){
          Toast("两次输入不一致");
          return false;
        }
        if ( !this.oldpwd || !this.newpwd1 || !this.newpwd2) {
          this.toast('请完善信息')
          return false
        }
      
        if (this.newpwd1.length < 6 || this.newpwd2.length < 6) {
          this.toast('密码最少6位')
          return false
        }
        var _that=this;
        var form=new FormData();
       
        form.append("newPassword",this.newpwd2);
        form.append("oldPassword",this.oldpwd);
        fetch(host+'/agent/proxy/updatePwd',{
          method:"POST",
        headers:{
          "x-token":this.$store.state.token
        },
        body:form})
        .then((res)=>res.text())
        .then((res) => {
          var res=JSON.parse(res);
          if (res.status == 1) {
             Toast('修改成功')
            _that.$router.go(-1)
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
    mounted: function () {

    }
  }
</script>
