<template>
  <!--状态追踪弹窗-->
  <div class="state-zg-cover" v-show="stateflag" @click.stop="closess" @touchmove.prevent>
    <div class="state-zg margin-center">
      <div class="state-zg-top">选择状态</div>
      <div class="state-zg-con">
        <p class="text">选择状态</p>
        <div class="sta-list clearfix">
          <span class="item" v-for="(item,index) in jmsstates" @click="selectSta(index)" :key="index" :class="selectInx==(index+1)?'c1':''">
            {{item}}
          </span>
        </div>
        <p class="text">添加备注</p>
        <div class="textarea-con">
          <textarea v-model="textareacon" v-on:keydown="jltext" name="" rows="" cols="" placeholder="请添加备注..."></textarea>
          <p class="num">({{textareall}}/200)</p>
        </div>
      </div>
      <div class="state-zg-bom" @click.stop="closeshow('1')">确定</div>
    </div>
    <p class="lj-line margin-center"></p>
    <p class="closebtn" @click.stop="closeshow('0')"></p>
  </div>
</template>
<script>
    export default{
        props:{
          stateflag: {    //遮罩层
              type: Boolean,
              default: false
          },
          jmsstates: {   //状态数组
            type: Array,
            default: [],
            required: true
          },
          selectInx: {   //选中索引
              type: Number,
              default: 1,
              required: false
          } 
        },
        data(){
            return {
              textareacon: '',  //添加备注
              textareall: 0    //备注的字数
            }
        },
        components: {},
        methods: {
          selectSta (v) {
           
             
            //选择状态
            this.selectInx = v+1;
          },
          jltext (e) {
            //监听input框变化
            let l = this.textareacon.trim().length;
            if(l <= 200){
                this.textareall = l
            }else{
              this.textareall = 200;
              this.textareacon = this.textareacon.trim().substring(0,200)
            }
          },
          closeshow (flag) {
              if(flag == '1'){
                this.$emit('my-event', {status: this.selectInx, notice: this.textareacon});
              }else{
                this.$emit('my-event', '0');
              }
          },
          closess () {
              return false
          }
       
        },
        
        mounted: function () {
          
          this.textareacon = ''
          this.textareall = 0
        },
        computed: {
   
        }
    }
</script>
