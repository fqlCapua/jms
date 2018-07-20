export default {
    install(Vue, options) {
        Vue.prototype.getStatus = function (num) {
            var newArr=[];
            fetch("http://192.168.20.149:8884/agent/dict/getByDictNo?keyNo=" + num,{method: "GET" })
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
        }
    }

}