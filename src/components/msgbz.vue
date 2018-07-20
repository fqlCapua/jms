<template>
    <!--兴趣备注弹窗-->
    <div class="xq-msg-cover" v-show="msgflag" @click.stop="closeshow" @touchmove.prevent>
      <div class="xq-msg" @click.stop="closeshow">
        {{msgtext}}
      </div>
    </div>
</template>
<script>
    export default{
        props:{
          msgtext: {
                type: String,
                default: "",
            },
          msgflag: {
              type: Boolean,
              default: false
          }
        },
        data(){
            return {}
        },
        components: {},
        methods: {
          closeshow () {
            this.$emit('my-event')
          }
        },
        mounted: function () {
        }
    }
</script>
