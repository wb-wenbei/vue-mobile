(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["home"],{1821:function(t,e,i){},"77b8":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"home-content"},[i("van-swipe",{staticClass:"swipe-content",attrs:{autoplay:3e3}},t._l(t.images,(function(t,e){return i("van-swipe-item",{key:e},[i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t,expression:"image"}]})])})),1),i("div",{staticClass:"home-body"},[i("message-item",{staticClass:"message-item",attrs:{data:t.messageItem,iconClass:"ellipsis-v"},on:{iconClick:t.messageClick}}),i("div",{staticClass:"common-card padding-0",staticStyle:{"min-height":"126px"}},[i("weather-card"),i("div",{staticClass:"tip-content"},[i("span",{staticClass:"tip-title"},[t._v("小贴士：")]),t._v(t._s(t.userInfo.userName)+"您好！工作忙碌，注意适时休息。 ")])],1),i("div",{staticClass:"common-card padding-0"},[i("div",{staticClass:"card-title style-title"},[i("div",[t._v("签到领积分")]),i("div",{staticClass:"style-sub-title",on:{click:t.toCredits}},[t._v("积分明细")])]),i("sign-card")],1),i("div",{staticClass:"common-card padding-0"},[i("div",{staticClass:"card-title style-title"},[t._v("员工关爱")]),i("van-grid",{attrs:{border:!1,"column-num":4}},t._l(t.menus,(function(e){return i("van-grid-item",{key:e.id,attrs:{to:e.link}},[i("div",{staticClass:"menu-content",style:{background:e.bgColor}},[i("svg-icon",{staticClass:"menu-icon",attrs:{"icon-class":e.icon}})],1),i("div",{staticClass:"style-sub-title"},[t._v(t._s(e.title))])])})),1)],1)],1),i("van-popup",{style:{height:"100%"},attrs:{closeable:"",position:"top"},model:{value:t.weatherShow,callback:function(e){t.weatherShow=e},expression:"weatherShow"}})],1)},n=[],a=(i("d3b7"),function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"he-plugin-standard"}})}),o=[],c={name:"hWeather",mounted:function(){this.load()},methods:{load:function(){window.WIDGET={CONFIG:{layout:1,width:"400",height:"134",background:1,dataColor:"FFFFFF",borderRadius:5,modules:"10",key:"42e0b4f842e0402c9ec66a1ea0726d3b"}};var t=document.createElement("script");t.type="text/javascript",t.src="https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0",document.getElementsByTagName("head")[0].appendChild(t)}}},l=c,r=i("2877"),d=Object(r["a"])(l,a,o,!1,null,null,null),u=d.exports,p=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"sign-card"},[t.showLine?i("div",{staticClass:"sign-point"},t._l(t.signList,(function(e){return i("div",{key:e.id,staticClass:"sign-item",class:e.active?"active":""},[i("van-popover",{attrs:{placement:"top",theme:"dark",trigger:"click"},scopedSlots:t._u([{key:"reference",fn:function(){return[i("div",{staticClass:"sign-item-point"})]},proxy:!0}],null,!0),model:{value:e.showPopover,callback:function(i){t.$set(e,"showPopover",i)},expression:"item.showPopover"}},[i("div",{staticClass:"pop-content"},[t._v(t._s(e.popContent))])]),i("div",{staticClass:"sign-item-content"},[t._v(t._s(e.time))])],1)})),0):t._e(),i("div",{staticClass:"sign-detail"},[i("div",{staticClass:"point"},[i("div",{staticClass:"point"},[t._v(t._s(t.signPoint.count))]),i("div",{staticClass:"style-sub-text"},[t._v("我的积分")])]),i("div",{staticClass:"point"},[i("div",{staticClass:"point"},[t._v(t._s(t.signPoint.canGet))]),i("div",{staticClass:"style-sub-text"},[t._v("今日可领")])]),i("div",{staticClass:"point"},[i("div",{staticClass:"point"},[t._v(t._s(t.signPoint.hasGet))]),i("div",{staticClass:"style-sub-text"},[t._v("今日已领")])]),i("div",{staticClass:"btn"},[i("van-popover",{attrs:{placement:"top",theme:"dark",trigger:"click"},scopedSlots:t._u([{key:"reference",fn:function(){return[i("van-button",{staticClass:"default-btn",attrs:{size:"small"},on:{click:t.onSign}},[t._v(" 签到 ")])]},proxy:!0}]),model:{value:t.signPopover,callback:function(e){t.signPopover=e},expression:"signPopover"}},[i("div",{staticClass:"pop-content"},[t._v("签到领积分+15")])])],1)])])},v=[],m=(i("96cf"),i("1da1")),g=i("b99b"),h=864e5,C={name:"signCard",props:{showLine:{type:Boolean,default:!1}},data:function(){return{signPoint:{count:4e3,canGet:15,hasGet:10},signPopover:!1,signList:[{id:1,active:!0,time:Object(g["a"])(Date.now()-2*h,"MM-dd"),showPopover:!1,popContent:"无排班"},{id:2,active:!1,time:Object(g["a"])(Date.now()-h,"MM-dd"),showPopover:!1,popContent:"无排班"},{id:3,active:!0,time:"今天",showPopover:!1,popContent:"无排班"},{id:4,active:!1,time:"明天",showPopover:!1,popContent:"有排班"},{id:5,active:!1,time:Object(g["a"])(Date.now()+2*h,"MM-dd"),showPopover:!1,popContent:"有排班"}]}},created:function(){this.loadData()},methods:{loadData:function(){return Object(m["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)})))()},onSign:function(){}}},f=C,b=(i("b059"),Object(r["a"])(f,p,v,!1,null,"876cb854",null)),w=b.exports,_=i("99a3"),y=i("024c"),k=i.n(y);function P(){return new Promise((function(t,e){k.a.plugin("AMap.Geolocation",(function(){var i=new k.a.Geolocation({enableHighAccuracy:!0,timeout:5e3,buttonOffset:new k.a.Pixel(10,20),zoomToAccuracy:!0,useNative:!0,buttonPosition:"RB"});i.getCurrentPosition(),k.a.event.addListener(i,"complete",(function(e){t(e.position)})),k.a.event.addListener(i,"error",(function(t){e(t)}))}))}))}var x=1e4,j={name:"Home",components:{WeatherCard:u,SignCard:w,MessageItem:_["a"]},data:function(){return{title:"中航环卫",userInfo:this.$store.state.userInfo,messageItem:{},weatherShow:!1,position:{},images:["https://img.yzcdn.cn/vant/apple-1.jpg","https://img.yzcdn.cn/vant/apple-2.jpg"],menus:[{id:1,title:"健康上报",icon:"jiaosequanxian",link:"/healthReport",bgColor:"#F49541"},{id:2,title:"积分兑换",icon:"jiaosequanxian",link:"/credits/exchange",bgColor:"#F9C644"},{id:3,title:"卫情上报",icon:"jiaosequanxian",link:"/eventReport",bgColor:"#28B893"}]}},created:function(){this.getLocalPosition()},methods:{getLocalPosition:function(){var t=this;P().then((function(e){t.position=e,t.$store.commit("SET_POSITION",t.position)})).catch((function(t){console.log(t)})).finally((function(){t.position.lng||t.position.lat||setTimeout((function(){t.getLocalPosition()}),x)}))},toCredits:function(){this.$router.push({path:"/credits"})},messageClick:function(){this.$router.push({path:"/message"})}}},S=j,O=(i("8ec2"),Object(r["a"])(S,s,n,!1,null,"9a1aa928",null));e["default"]=O.exports},"8b91":function(t,e,i){},"8cfb":function(t,e,i){"use strict";i("1821")},"8ec2":function(t,e,i){"use strict";i("8b91")},"99a3":function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"common-card",on:{click:function(e){return t.rowClick(t.data)}}},[i("div",{staticClass:"item-image"},[i("svg-icon",{staticClass:"image-icon",attrs:{"icon-class":"jiaosequanxian"}})],1),i("div",{staticClass:"item-content"},[i("div",{staticClass:"content-title"},[i("div",{staticClass:"style-title"},[t._v(t._s(t.data.title||"环卫大队门口集合"))]),i("div",{staticClass:"style-sub-text"},[t._v(t._s(t._f("formatDateTime")(t.data.time)))])]),i("div",{staticClass:"content-detail"},[t._v(" "+t._s(t.data.content||"环卫大队门口集合，各位同事今天下午有事通知")+" ")])]),i("div",{staticClass:"item-icon",on:{click:function(e){return e.stopPropagation(),t.iconClick(t.data)}}},[i("svg-icon",{staticClass:"image-icon",attrs:{"icon-class":t.iconClass}})],1)])},n=[],a={name:"MessageItem",props:{data:{},iconClass:{type:String,default:"arrow"}},methods:{iconClick:function(t){this.$emit("iconClick",t)},rowClick:function(t){this.$router.push({path:"/message/detail",query:{id:t.id}})}}},o=a,c=(i("8cfb"),i("2877")),l=Object(c["a"])(o,s,n,!1,null,"7111cd51",null);e["a"]=l.exports},b059:function(t,e,i){"use strict";i("b41a")},b41a:function(t,e,i){}}]);
//# sourceMappingURL=home.26126f13.js.map