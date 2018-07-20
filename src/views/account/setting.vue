<template>
  <div>
    <div id="wapper">
      <my-header :headerParam="headerParam"></my-header>
      <!---->
      <!---->
      <div id="set">
        <router-link to="/setpwd" class="line">
          <div class="line-con clearfix">
            <span class="t1">修改密码</span>
            <span class="icon"></span>
          </div>
        </router-link>
        <div class="line">
          <div class="line-con clearfix">
            <span class="t1">关于</span>
            <span class="icon"></span>
          </div>
        </div>
        <p class="quitlogin margin-center" @click="quit">退出登录</p>
      </div>
    </div>
  </div>
</template>
<script>
  import MyHeader from '@/components/header'
  import {MessageBox} from 'mint-ui';
  export default{
    data(){
      return {
        headerParam: {
          title: '设置',
          setting: 0,
          back: 1
        }
      }
    },
    components: {MyHeader, MessageBox},
    methods: {
      quit () {
        //点击退出
        MessageBox({
          title: '',
          message: '确定退出？',
          showCancelButton: true,
        }).then((data)=>{
          if(data == 'confirm'){
            this.$store.dispatch('userLogout');
            this.$router.push({path: '/login'})
          }
        });
      }
    },
    mounted: function () {

    }
  }
</script>
