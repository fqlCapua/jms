import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  base: '/',
  routes: [
    {
      path:'/login',
      name:'login',
      component: () => import('../views/login/login')
    }, {
      path: '/',
      name: 'index',
      meta:{auth:true},
      component: () => import('../views/home/index')
    },{
      path: '/myAccount',
      name: 'myAccount',
      meta:{auth:true},
      component: () => import('../views/account/myAccount')
    },{
      path: '/setting',
      name: 'setting',
      meta:{auth:true},
      component: () => import('../views/account/setting')
    },{
      path: '/myInfo',
      name: 'myInfo',
      meta:{auth:true},
      component: () => import('../views/account/myInfo')
    },{
      path: '/setpwd',
      name: 'setpwd',
      meta:{auth:true},
      component: () => import('../views/account/setpwd')
    },{
      path: '/chooseSite',
      name: 'chooseSite',
      meta:{auth:true},
      component: () => import('../views/home/chooseSite')
    },{
      path: '/jmslist',
      name: 'jmslist',
      meta:{auth:true},
      component: () => import('../views/home/jmslist')
    },{
      path: '/yxjmslist',
      name: 'yxjmslist',
      meta:{auth:true},
      component: () => import('../views/home/yxjmslist')
    },{
      path: '/editJmsInfo',
      name: 'editJmsInfo',
      meta:{auth:true},
      component: () => import('../views/home/editJmsInfo')
    },{
      path: '/jmsinfo',
      name: 'jmsinfo',
      meta:{auth:true},
      component: () => import('../views/home/jmsinfo')
    },{
      path: '/yxjmsinfo',
      name: 'yxjmsinfo',
      meta:{auth:true},
      component: () => import('../views/home/yxjmsinfo')
    },{
      path: '/dwsite',
      name: 'dwsite',
      meta:{auth:true},
      component: () => import('../views/home/dwsite')
    },{
      path: '/payment',
      name: 'payment',
      meta:{auth:true},
      component: () => import('../views/home/payment')
    },{
      path: '/goBankpage',
      name: 'goBankpage',
      meta:{auth:true},
      component: () => import('../views/home/goBankpage')
    }
  ]
})

