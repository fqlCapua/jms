<template>
    <div>
      <div id="wapper" >
        <my-header :headerParam="headerParam"></my-header>
        <!---->
        <div id="lookinfo" style="background-color: #F2F2F2;">
          <div class="line line1">
            <div class="line-con clearfix">
              <span class="t1">头像</span>
              <span class="t3">{{myFirstName}}</span>
            </div>
          </div>
          <div class="line">
            <div class="line-con clearfix">
              <span class="t1">姓名</span>
              <span class="t2">{{userInfo.realName}}</span>
            </div>
          </div>
          <div class="line">
            <div class="line-con clearfix">
              <span class="t1">工号</span>
              <span class="t2">{{userInfo.jobNumber}}</span>
            </div>
          </div>
          <div class="line">
            <div class="line-con clearfix">
              <span class="t1">部门</span>
              <span class="t2">{{userInfo.deptName}}</span>
            </div>
          </div>
          <div class="line">
            <div class="line-con clearfix">
              <span class="t1">职位</span>
              <span class="t2">{{userInfo.job}}</span>
            </div>
          </div>
          <div class="line">
            <div class="line-con clearfix">
              <span class="t1">联系电话</span>
              <span class="t2">{{userInfo.jobNumber}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import MyHeader from '@/components/header'
  import {fetchPostData,host} from '@/api'
    export default{
        data(){
            return {
              headerParam: {
                title: '查看资料',
                setting: 0,
                back: 1
              },
              userInfo: {}
            }
        },
        components: {MyHeader},
        methods: {
          getUserInfo () {  //用户信息
            // fetchPostData(host+'/api/queryUser',{}).then((data) => {
            //   if(data.code == 0){
            //     this.userInfo = data.user;
            //   }else{

            //   }
            // })
            this.userInfo=JSON.parse(this.getSession("us"));
          },
        },
        mounted: function () {
          this.getUserInfo()
        },
        computed: {
          myFirstName () {
            //获取名字 第一个字
            let v = this.userInfo.name
            if(!v){
              return false
            }
            v = v.toString()
            return v.charAt(0)
          }
        }
    }
</script>
