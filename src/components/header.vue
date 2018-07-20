<template>
      <div id="header">
        {{headerParam.title}}
        <span @click="goBack" class="back" v-if="headerParam.back == 1"></span>
        <router-link to="/setting" class="set" v-if="headerParam.setting == 1"></router-link>
        <slot></slot>
      </div>
</template>
<script>
    export default{
        props: {
          headerParam: {
              type: Object,
              default () {
                  return {
                    title: '首页',
                    setting: 0,
                    back: 0
                  }
              },
              required: true
          },
          flag: {
              type: String,
              default: '0'
          }
        },
        data(){
            return {}
        },
        components: {},
        methods: {
          goBack () {
              if(this.flag == 1){
                this.$router.go(-2);
              }else{
                this.$router.back();
              }

          }
        },
        mounted: function () {
        }
    }
</script>
