<template>
   <div>
     <router-link :to="{name:pathname,params:{storeCode:jsminfo.storeCode,status:selectIndex}}" class="jms-item">
       <p class="name" :class="[jmsStateClass]">{{jsminfo.storeName}} </p>
       <p class="site">{{jsminfo.address}}</p>
       <p class="dz-name">{{jsminfo.name}}</p>
       <p class="tel">{{jsminfo.managerMobile}}</p>
       <p class="qy-time">提交时间：{{jsminfo.gmtCreate | splitTime}}</p>
       <div v-show="jmsflag=='yxjms'">
         <div class="feeStatus" v-show="selectIndex==''">{{formateAllStatus(jsminfo.gatherStatus)}}</div>
         <div class="feeStatus" v-show="selectIndex==1">{{"待缴费 "+agentStatusArr[jsminfo.agentStatus-1].name}}</div>
         <div class="feeStatus" v-show="selectIndex==2"  >{{formateFeeStatus(jsminfo.gatherStatus)}}</div>
         <div class="feeStatus" v-show="selectIndex==3">{{qyStatusArr[jsminfo.signStatus-1].name}}</div>
         <div class="feeStatus" v-show="selectIndex==3">{{qyStatusArr[jsminfo.signStatus-1].name}}</div>
       </div>
       <div  v-show="jmsflag=='jms'">
          <div class="feeStatus"  v-show="selectIndex==1">已开业</div>
          <div class="feeStatus" v-show="selectIndex==2">待开业</div>
       </div> 
     </router-link>
   
   </div>
</template>

<script>
import Vue from "vue";
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
            return {
              agentStatusArr:[],
              jfStatusArr:[],
              qyStatusArr:[],
              yyStatusArr:[]
            }
        },
        components: {},
        methods: {
          getDic(){
            let vm=this;  
            var data=this.getStatus(10033);
		          	data.then(function(value){
                vm.agentStatusArr=value;
                	},function(err){
				         console.log(err);
                })
            var readyNum=10013;
            var data=this.getStatus(10013);
		      	data.then(function(value){
              vm.jfStatusArr=value;
             	})
             var data=this.getStatus(10042);
		      	data.then(function(value){
              vm.yyStatusArr=value;
            	})
             var data=this.getStatus(10039);
		      	data.then(function(value){
              vm.qyStatusArr=value;
           	})
          }, 
          formateAllStatus(fee){
            if(fee==3){
               
              return this.yyStatusArr[this.jsminfo.checkStatus-1].name;
            }else{
              return this.jfStatusArr[fee-1].name+"   "+this.agentStatusArr[this.jsminfo.agentStatus-1].name;
            }
            
          },
          formateFeeStatus(fee){
            if(fee==3){
               return this.yyStatusArr[this.jsminfo.checkStatus-1].name;
            }else{
              return this.jfStatusArr[fee-1].name;
            }
            
          },
        },
        mounted(){
         
         this.getDic();
        },
        computed: {
         
          jmsStateClass () {
             // 加盟商 开店 状态
            if(this.jmsflag == 'jms'){
             
              return 'zs-state' + this.jsminfo.merStatus
            }else{
       
              // let i = 0;
              // let wish=this.jsminfo.intentLevel;
              
              // return 'yx-state' + wish
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
<style lang="less" scoped>
.feeStatus{
  position: absolute;
   top:15px;
   right:10px;
   font-size:0.3rem;
   color:#3390FF;
}

</style>

