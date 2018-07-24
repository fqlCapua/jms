<template>
    <!--询问弹窗-->
  <div class="alert-cover" v-show="aaflag" @click.stop="closess" @touchmove.prevent>
    <div class="alert-con margin-center">
      <div class="top">确定更改状态吗?</div>
      <div class="bom clearfix">
        <div class="lr-btn cancel" @click="closeShow(false)">取消</div>
        <div class="lr-btn sure" @click="closeShow(true)">确定</div>
      </div>
    </div>
  </div>
</template>
<script>
    export default{
        props:{
          aaflag: {
                type: Boolean,
                default: false,
            }
        },
        data(){
            return {}
        },
        components: {},
        methods: {
          closeShow (flag) {
        
            this.$emit('my-event',flag)
          },
          closess () {
              return false;
          }
        },
        mounted:function () {},
        computed: {

        }
    }
</script>
