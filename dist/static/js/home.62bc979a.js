(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["home"],{"0365":function(t,i,e){},1613:function(t,i,e){"use strict";e("0365")},2389:function(t,i,e){"use strict";e("8647")},37863:function(t,i,e){},"3b56":function(t,i,e){},"6a73":function(t,i,e){"use strict";e("3b56")},7716:function(t,i,e){"use strict";e.d(i,"b",(function(){return s})),e.d(i,"a",(function(){return n}));var a=e("afaa"),s=function(t){return Object(a["a"])({url:"/api-customer/staff-care/article/queryArticle",method:"GET",params:t})},n=function(t){return Object(a["a"])({method:"GET",url:"/api-customer/staff-care/article/articleIsRead",params:t})}},"77b8":function(t,i,e){"use strict";e.r(i);var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("van-pull-refresh",{on:{refresh:t.load},model:{value:t.loading,callback:function(i){t.loading=i},expression:"loading"}},[e("div",{staticClass:"home-content"},[e("van-swipe",{staticClass:"swipe-content",attrs:{autoplay:3e3}},t._l(t.images,(function(t,i){return e("van-swipe-item",{key:i},[t?e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t,expression:"image"}]}):e("div",{staticClass:"default-image"})])})),1),e("div",{staticClass:"home-body"},[e("message-item",{staticClass:"message-item",attrs:{data:t.messageItem,iconClass:"ellipsis-v"},on:{iconClick:t.messageClick}}),e("div",{staticClass:"common-card padding-0"},[e("weather-card",{attrs:{location:t.location}})],1),e("div",{staticClass:"common-card padding-0"},[e("div",{staticClass:"card-title style-title"},[e("div",[t._v("签到领积分")]),e("div",{staticClass:"style-sub-title",on:{click:t.toCredits}},[t._v("积分明细")])]),e("sign-card",{attrs:{position:t.position}})],1),e("div",{staticClass:"common-card padding-0"},[e("div",{staticClass:"card-title style-title"},[t._v("员工关爱")]),e("van-grid",{attrs:{border:!1,"column-num":4}},t._l(t.menus,(function(i){return e("van-grid-item",{key:i.id,attrs:{to:i.link}},[e("div",{staticClass:"menu-content",style:{background:i.bgColor}},[e("svg-icon",{staticClass:"menu-icon",attrs:{"icon-class":i.icon}})],1),e("div",{staticClass:"style-sub-title"},[t._v(t._s(i.title))])])})),1)],1)],1),e("van-popup",{style:{height:"100%"},attrs:{closeable:"",position:"top"},model:{value:t.weatherShow,callback:function(i){t.weatherShow=i},expression:"weatherShow"}})],1)])},s=[],n=(e("4160"),e("d3b7"),e("159b"),function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"weather-card"},[t.weatherData[0]?e("div",{staticClass:"date"},[t._v(t._s(t.weatherData[0].fxDate))]):t._e(),e("div",{staticClass:"weather-days"},t._l(t.weatherData,(function(i,a){return e("div",{key:a,staticClass:"day"},[e("div",{staticClass:"day-weather"},[e("div",[t._v(t._s(t.dayName[a]))]),e("div",[t._v(t._s(i.textDay))])]),e("div",{staticClass:"day-weather"},[e("div",{staticClass:"tem"},[t._v(t._s(i.tempMin)+"/"+t._s(i.tempMax)+"℃")])])])})),0),e("div",{staticClass:"tip-content"},[e("span",{staticClass:"tip-title"},[t._v("小贴士：")]),t._v(t._s(t.userInfo.userName)+"您好！工作忙碌，注意适时休息。 ")])])}),o=[],c=e("bc3a"),l=e.n(c),r={name:"weather",props:{location:{type:String,default:"121.478137,31.208805"}},data:function(){return{loading:!0,userInfo:this.$store.state.userInfo,dayName:["今天","明天","后天"],weatherData:[],url:"https://devapi.qweather.com/v7/weather/3d"}},watch:{location:{deep:!0,handler:function(){this.loadData()}}},created:function(){this.loadData()},methods:{loadData:function(){var t=this;console.log("location",this.location),l.a.get(this.url,{params:{key:"be422996ad364a0da16f2348bd98dadd",location:this.location||"121.478137,31.208805"}}).then((function(i){i.data&&i.data.daily&&(t.weatherData=i.data.daily)})).catch((function(i){console.log(i),setTimeout((function(){t.loadData()}),1e3)}))}}},d=r,u=(e("2389"),e("2877")),p=Object(u["a"])(d,n,o,!1,null,"5a99c1e0",null),v=p.exports,m=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"sign-card"},[t.showLine?e("div",{staticClass:"sign-point"},t._l(t.signList,(function(i){return e("div",{key:i.id,staticClass:"sign-item",class:i.active?"active":""},[e("van-popover",{attrs:{placement:"top",theme:"dark",trigger:"click"},scopedSlots:t._u([{key:"reference",fn:function(){return[e("div",{staticClass:"sign-item-point"})]},proxy:!0}],null,!0),model:{value:i.showPopover,callback:function(e){t.$set(i,"showPopover",e)},expression:"item.showPopover"}},[e("div",{staticClass:"pop-content"},[t._v(t._s(i.popContent))])]),e("div",{staticClass:"sign-item-content"},[t._v(t._s(i.time))])],1)})),0):t._e(),e("div",{staticClass:"sign-detail"},[e("div",{staticClass:"point"},[e("div",{staticClass:"point"},[t._v(t._s(t.signPoint.totalIntegral))]),e("div",{staticClass:"style-sub-text"},[t._v("我的积分")])]),e("div",{staticClass:"point"},[e("div",{staticClass:"point"},[t._v(t._s(t.signPoint.usableIntegral))]),e("div",{staticClass:"style-sub-text"},[t._v("今日可领")])]),e("div",{staticClass:"point"},[e("div",{staticClass:"point"},[t._v(t._s(t.signPoint.haveAccessToIntegral))]),e("div",{staticClass:"style-sub-text"},[t._v("今日已领")])]),e("div",{staticClass:"btn"},[e("van-popover",{attrs:{placement:"top",theme:"dark",trigger:"click"},scopedSlots:t._u([{key:"reference",fn:function(){return[e("van-button",{staticClass:"default-btn",attrs:{size:"small",loading:t.loading,disabled:t.disabled,"loading-type":"spinner"},on:{click:t.onSign}},[t._v(" 签到 ")])]},proxy:!0}]),model:{value:t.signPopover,callback:function(i){t.signPopover=i},expression:"signPopover"}},[t.disabled?e("div",{staticClass:"pop-content"},[t._v(t._s(t.tips))]):t._e()])],1)]),e("van-dialog",{attrs:{"show-confirm-button":!1,className:"sign-success"},model:{value:t.showSuccess,callback:function(i){t.showSuccess=i},expression:"showSuccess"}},[e("div",{staticClass:"common-card"},[e("div",{staticClass:"sign-title"},[t._v("恭喜您，签到成功")]),e("div",{staticClass:"sign-sub-title"},[t._v("上报健康情况即可再获得积分")]),e("div",[e("van-button",{staticClass:"sign-btn",attrs:{round:"",color:"#ee0a24",size:"small"},on:{click:function(i){t.showSuccess=!1}}},[t._v(" 返 回 ")])],1)]),e("div",{staticClass:"sign-image"},[e("div",{staticClass:"sign-score"},[t._v("+5")])])])],1)},f=[],g=(e("a4d3"),e("e01a"),e("fc23")),h=e("b99b"),C=864e5,b={name:"signCard",props:{showLine:{type:Boolean,default:!1},position:{type:Object}},data:function(){return{signPoint:{totalIntegral:0,usableIntegral:0,haveAccessToIntegral:0},disabled:!0,loading:!0,tips:"",signPopover:!1,showSuccess:!1,signList:[{id:1,active:!0,time:Object(h["a"])(Date.now()-2*C,"MM-dd"),showPopover:!1,popContent:"无排班"},{id:2,active:!1,time:Object(h["a"])(Date.now()-C,"MM-dd"),showPopover:!1,popContent:"无排班"},{id:3,active:!0,time:"今天",showPopover:!1,popContent:"无排班"},{id:4,active:!1,time:"明天",showPopover:!1,popContent:"有排班"},{id:5,active:!1,time:Object(h["a"])(Date.now()+2*C,"MM-dd"),showPopover:!1,popContent:"有排班"}]}},watch:{position:{deep:!0,handler:function(){this.allowSign()}}},methods:{allowSign:function(){var t=this;this.loading=!0,Object(g["a"])(this.position).then((function(i){switch(t.signPoint=i,i.signInStatus){case 1:t.disabled=!1;break;case 2:t.disabled=!0,t.tips=i.description;break;case 3:t.disabled=!0,t.tips=i.description;break}})).finally((function(){t.loading=!1}))},onSign:function(){var t=this;Object(g["e"])({location:this.position}).then((function(){t.showSuccess=!0,t.allowSign()})).catch((function(i){t.$toast.fail("签到失败："+i),console.log(i)}))}}},w=b,_=(e("c3e3"),Object(u["a"])(w,m,f,!1,null,"287cfc90",null)),y=_.exports,k=e("99a3"),S=e("024c"),P=e.n(S);function O(){return new Promise((function(t,i){P.a.plugin("AMap.Geolocation",(function(){var e=new P.a.Geolocation({enableHighAccuracy:!0,timeout:5e3,buttonOffset:new P.a.Pixel(10,20),zoomToAccuracy:!0,useNative:!0,buttonPosition:"RB"});e.getCurrentPosition(),P.a.event.addListener(e,"complete",(function(i){t(i.position)})),P.a.event.addListener(e,"error",(function(t){i(t)}))}))}))}var I=e("7716"),x=1e4,T=1,j={name:"Home",components:{WeatherCard:v,SignCard:y,MessageItem:k["a"]},data:function(){return{title:"中航环卫",messageItem:{},loading:!1,weatherShow:!1,positionTimeout:null,position:{},images:[""],menus:[{id:1,title:"健康上报",icon:"menu-health",link:"/healthReport",bgColor:"#F49541"},{id:2,title:"积分兑换",icon:"menu-exchange",link:"/credits/exchange",bgColor:"#F9C644"},{id:3,title:"卫情上报",icon:"menu-report",link:"/eventReport",bgColor:"#28B893"},{id:4,title:"查看排班",icon:"menu-schedule",link:"/schedule",bgColor:"#31ADD6"}]}},computed:{location:function(){return this.position.lng&&this.position.lat?this.position.lng+","+this.position.lat:""}},created:function(){this.load()},methods:{load:function(){this.getLocalPosition(),this.loadBanner(),this.loadMessage()},loadBanner:function(){var t=this;Object(I["b"])({isWeb:!1,articleLocation:T,top:!0,page:1,pageSize:5}).then((function(i){i.data&&(i.data.length?(t.images=[],i.data.forEach((function(i){t.images.push(i.imgUrl)}))):t.images=[""])})).finally((function(){t.loading=!1}))},loadMessage:function(){var t=this;Object(I["b"])({isWeb:!1,page:1,pageSize:1}).then((function(i){i.data&&(t.messageItem=i.data[0])})).finally((function(){t.loading=!1}))},getLocalPosition:function(){var t=this;O().then((function(i){t.position=i,t.$store.commit("SET_POSITION",t.position)})).catch((function(t){console.log(t)})).finally((function(){t.position.lng||t.position.lat||(t.positionTimeout&&clearTimeout(t.positionTimeout),t.positionTimeout=setTimeout((function(){t.getLocalPosition()}),x))}))},toCredits:function(){this.$router.push({path:"/credits"})},messageClick:function(){this.$router.push({path:"/message"})}}},D=j,M=(e("6a73"),Object(u["a"])(D,a,s,!1,null,"865c4936",null));i["default"]=M.exports},8647:function(t,i,e){},"99a3":function(t,i,e){"use strict";var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"common-card",on:{click:function(i){return t.rowClick(t.data)}}},[e("div",{staticClass:"item-content"},[e("div",{staticClass:"content-title"},[e("div",{staticClass:"item-image"}),e("div",{staticClass:"style-title"},[t._v(" "+t._s(t.data.articleTitle||"环卫大队门口集合")+" ")]),e("div",{staticClass:"style-sub-text"},[t._v(t._s(t._f("formatDateTime")(t.data.createTime)))])]),e("div",{staticClass:"content-detail"},[t._v(" "+t._s(t.data.description||"环卫大队门口集合，各位同事今天下午有事通知")+" ")])]),e("div",{staticClass:"item-icon",on:{click:function(i){return i.stopPropagation(),t.iconClick(t.data)}}},[e("svg-icon",{staticClass:"image-icon",attrs:{"icon-class":t.iconClass}})],1)])},s=[],n={name:"MessageItem",props:{data:{},iconClass:{type:String,default:"arrow"}},methods:{iconClick:function(t){this.$emit("iconClick",t)},rowClick:function(t){this.$router.push({path:"/message/detail",query:{id:t.id}})}}},o=n,c=(e("1613"),e("2877")),l=Object(c["a"])(o,a,s,!1,null,"f4cc1770",null);i["a"]=l.exports},c3e3:function(t,i,e){"use strict";e("37863")},fc23:function(t,i,e){"use strict";e.d(i,"d",(function(){return s})),e.d(i,"e",(function(){return n})),e.d(i,"a",(function(){return o})),e.d(i,"c",(function(){return c})),e.d(i,"b",(function(){return l}));var a=e("afaa"),s=function(t){return Object(a["a"])({url:"/api-customer/staff-care/integral/getIntegralRecord",method:"GET",params:t})},n=function(t){return Object(a["a"])({method:"POST",url:"/api-customer/staff-care/integral/signIn",data:t})},o=function(t){return Object(a["a"])({method:"POST",url:"/api-customer/staff-care/integral/allowSignIn",data:t})},c=function(t){return Object(a["a"])({method:"GET",url:"/api-customer/staff-care/integral/getIntegralSum",params:t})},l=function(t){return Object(a["a"])({method:"POST",url:"/api-customer/staff-care/setting/getGoodsImg",data:t})}}}]);
//# sourceMappingURL=home.62bc979a.js.map