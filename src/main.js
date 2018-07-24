import Vue from 'vue';
import App from './App';
import router from './router';
import store from './vuex';
import Mint from 'mint-ui';
// import global from './global'
import BaiduMap from 'vue-baidu-map'
// Vue.use(global)
Vue.use(Mint)
Vue.use(BaiduMap, {ak: 'eb10ef559453fdd03e2d78d2581fa747'})


Vue.config.productionTip = false;
//rem布局适配
if ('addEventListener' in document) {
  //使用rem
  var html = document.documentElement;
  var windowWidth = html.clientWidth;
  html.style.fontSize = windowWidth / 7.5 + 'px';
}

window.addEventListener('resize',function(){
  var html = document.documentElement;
  var windowWidth = html.clientWidth;
  html.style.fontSize = windowWidth / 7.5 + 'px';
},false);
//导航钩子
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  let isLogin = Boolean(store.state.token);
  if (to.matched.some(record => record.meta.auth)) {
    if(!isLogin){
      next({path: '/login'})
    }else{
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
 
Vue.prototype.getStatus=function(num){
  let newArr=[];
  var t=fetch("http://192.168.20.149:8884/agent/dict/getByDictNo?keyNo=" + num,{method: "GET" })
  .then(res => res.text())
  .then(res => {
   var res=JSON.parse(res);
    if(res.status==1){
      for(let [index,item] of res.data.entries()){
       var newobj={
          id:item.keyValue,
          name:item.caption
        }
        newArr.push(newobj);
       
      }
      
     return newArr;
     }else{
       console.log("失败")
     }
  })
  return t;
 };
 Vue.prototype.addSession=function(key,val){
   var ss=window.sessionStorage;
   ss.setItem(key,val);
 };
 Vue.prototype.getSession=function(key){
  var ss=window.sessionStorage;
  if(ss.getItem(key)){

    return   ss.getItem(key);
  }else{
    return false;
  }
  
};
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
