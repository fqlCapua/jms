<template>
	<div>
		<div id="wapper" style="padding-bottom: 0;">
			<!---->
			<my-header :headerParam="headerParam"></my-header>
			<!---->
			<!--意向加盟商列表-->
			<div id="yxjmslist" class="jmslist">
				<!--导航-->
				<div class="tab clearfix">
					<div>

					
					<div class="item" @click="getYxJms()">
						<span class="text" :class="[selectIndex==0?'c1':'']">全部</span>
					</div>
				    <!-- <div class="item" v-for="(item,index) in statusBox" :key="index" @click="getYxJms(item.id,item.name)"   >
                        <span class="text" :class="[selectIndex==item.id?'c1':'']">{{item.name}}</span>
					</div>  -->
				   <div class="item" @click="getYxJms('1','待缴费')">
						<span class="text" :class="[selectIndex==1?'c1':'']">待缴费</span>
					</div>
					<div class="item" @click="getYxJms('2','审核')">
						<span class="text" :class="[selectIndex==2?'c1':'']">审核中</span>
					</div>
					<div class="item" @click="getYxJms('3','签约')">
						<span class="text" :class="[selectIndex==3?'c1':'']">签约</span>
					</div>
					<!-- <div class="item" @click="getYxJms('4','签约审核中')">
						<span class="text" :class="[selectIndex==4?'c1':'']">签约审核中</span>
					</div>
					<div class="item" @click="getYxJms('5','已取消')">
						<span class="text" :class="[selectIndex==5?'c1':'']">已取消</span>
					</div> -->

					</div>
				</div>
				<!--加盟商list-->
				<div class="list">
					<div v-for="(item,index) in yxjmslist" :key="index">
						<JmsItem :jsminfo="item" :selectIndex="selectIndex" :jmsflag="jmsflag"></JmsItem>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { fetchPostData, fetchGetData, host } from '@/api'
	import MyHeader from '@/components/header'
	import JmsItem from '@/components/jmsItem'
	import Vue from 'vue'
	import qs from 'qs'
	import { Toast } from 'mint-ui';
	export default {
		data() {
			return {
				headerParam: {
					title: '意向加盟商列表',
					setting: 0,
					back: 1,
				},
				statusid:[],
				statusBox:[],
				testList: {
					"id": 50,
					"merNumber": null,
					"merType": "个人",
					"merName": null,
					"name": null,
					"userId": "1",
					"customerManager": null,
					"merContent": null,
					"merInformation": "null",
					"merSource": null,
					"phone": null,
					"idCard": null,
					"cityGrade": null,
					"address": null,
					"longitudeLatitude": "undefined",
					"image": null,
					"merStatus": 1,
					"cusWish": "很感兴趣",
					"communication": null,
					"remarks": "1231231",
					"createTime": "2018-07-11 10:19:07",
					"joinTime": null
				},
				jmsflag: 'yxjms',
				page: 1,
				yxjmslist: [],
				selectIndex: 0, //选中索引
				selectCon: '' //选中项
			}
		},
		components: {
			MyHeader,
			JmsItem,
			Toast
		},
		mounted: function() {
			let vm=this;
			this.getYxJms()
		 let data=this.getStatus(10034);
			data.then(function(value){
				vm.statusBox=value;
 
			 
			},function(err){
				console.log(err);
			})
           
		},
		methods: {
		 
			getYxJms(){
			  
				this.page = 1
				if(arguments.length) {
					this.selectIndex = arguments[0]
				 
					this.getYxJmsList();
				} else {
					this.selectIndex='',
					 
					this.getYxJmsList();
				}
			},
			getYxJmsList() {
				 
				// if(this.selectCon) {
				// 	param.cusWish = this.selectCon
				// }
                let param=`?length=1000&pageNum=1&type=${this.getSession("listStatus")}&userId=${this.getSession("id")}&status=${this.selectIndex}`;
 			 
				fetch(host+"/agent/proxy/getMyIntentionCount"+param,{
						method:"GET",
					  header:{
							"x-token":this.getSession("token")
							}
					}).then((res) => res.text())
					.then((res) => {
					 	var res = JSON.parse(res);
						if(res.status == 1) {
							this.yxjmslist = res.data.rows;
						}
					})

			},
			menu() {
				let isLoading = true
				window.onscroll = () => {
					let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight <= 60
					if(bottomOfWindow && isLoading) {
						isLoading = false;
						this.page += 1
						let param = {
							merNumber: '意向',
							page: this.page
						}
						// if(this.selectCon) {
						// 	param.cusWish = this.selectCon
						// }
			          console.log(param.page)
						fetch(host+"/agent/proxy/getStoreInfo?pageNum=" + this.page + "&length=1000&agentStatus=" + this.selectIndex, {
							method: "GET"
						}).then((res)=>res.text())
						.then((res) => {
							var res=JSON.parse(res);
							if(res.status == 0) {
								 if(res.data.rows.length) {
									this.yxjmslist = this.yxjmslist.concat(data.page.list)
									isLoading = true;
								} else {
									isLoading = false;
								}
							}
						})
						isLoading = true
					}
				}
			}
		},
	
	}
</script>