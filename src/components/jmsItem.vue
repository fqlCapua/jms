<template>
   <div>
     <router-link :to="{name:pathname,params:{storeCode:jsminfo.storeCode,status:selectIndex}}" class="jms-item">
       <p class="name" :class="[jmsStateClass]">{{jsminfo.storeName}}</p>
       <p class="site">{{jsminfo.address}}</p>
       <p class="dz-name">{{jsminfo.name}}</p>
       <p class="tel">{{jsminfo.managerMobile}}</p>
       <p class="qy-time">提交时间：{{jsminfo.gmtCreate | splitTime}}</p>
     </router-link>
   
   </div>
</template>
<script>
    export default{
        props:{
          jsminfo:{
                type: Object,
                default: {},
                required: true
            },
          jmsflag: {
              type: String,
              default: 'jms',
              required: true
          },
          selectIndex: {
              type: String,
              default:1,
              required: true
          }
        },
        data(){
            return {}
        },
        components: {},
        methods: {
           
        },
        mounted:{
          
        },
        computed: {
          jmsStateClass () {
             // 加盟商 开店 状态
            if(this.jmsflag == 'jms'){
             
              return 'zs-state' + this.jsminfo.merStatus
            }else{
       
              let i = 0;
              let wish=this.jsminfo.intentLevel;
              
              return 'yx-state' + wish
            }
          },
          pathname () {
              // 要跳转的页面
            if(this.jmsflag == 'jms'){
              return 'jmsinfo'
            }else{
              return 'yxjmsinfo'
            }
          }
        },
        filters: {
            splitTime (v) {
              if(!v) return ''
              v = v.toString()
              return v.split(' ')[0]
            }
        }

    }
</script>
