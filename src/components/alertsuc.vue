<template>
    <!--成功弹窗-->
  <div class="alert-cover" v-show="asflag" @click.stop="closess" @touchmove.prevent>
    <div class="alert-con margin-center">
      <p class="success"></p>
      <p class="success-text">状态更改成功</p>
    </div>
  </div>
</template>
<script>
    export default{
        props:{
          asflag: {
                type: Boolean,
                default: false,
            }
        },
        data(){
            return {
            }
        },
        components: {},
        methods: {
          closess () {
              this.$emit('my-event')
          }
        },
        mounted: function () {},
        computed: {

        }
    }
</script>
