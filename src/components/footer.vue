<template>
    <div>
      <div id="footer" class="clearfix">
        <router-link to="/" class="item">
          <span class="icon" :class="[this.id == 1? 'icon2':'icon1']"></span>
          <p class="text" :class="[this.id == 1? 'c1':'']">首页</p>
        </router-link>
        <router-link class="item" to="/chooseSite">
          <span class="icon" :class="[this.id == 2? 'icon4':'icon3']"></span>
          <p class="text" :class="[this.id == 2? 'c1':'']">选址</p>
        </router-link>
        <router-link class="item" to="/myAccount">
          <span class="icon" :class="[this.id == 3? 'icon6':'icon5']"></span>
          <p class="text" :class="[this.id == 3? 'c1':'']">我的</p>
        </router-link>
      </div>
    </div>
</template>
<script>
    export default{
        props:{
            id: {
                type: Number,
                default: 1,
                required: true
            }
        },
        data(){
            return {}
        },
        components: {},
        methods: {},
        mounted: function () {},
        computed: {
            indexFlag () {
                if(this.id == 1){
                    return
                }
            }
        }
    }
</script>
