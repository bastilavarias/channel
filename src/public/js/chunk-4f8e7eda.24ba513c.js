(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4f8e7eda"],{"2a7f":function(t,e,i){"use strict";i.d(e,"a",(function(){return a}));var n=i("71d9"),r=i("80d2"),a=Object(r["g"])("v-toolbar__title"),s=Object(r["g"])("v-toolbar__items");n["a"]},"2fa4":function(t,e,i){"use strict";i("20f6");var n=i("80d2");e["a"]=Object(n["g"])("spacer","div","v-spacer")},"3a66":function(t,e,i){"use strict";i.d(e,"a",(function(){return a}));var n=i("fe6c"),r=i("58df");function a(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return Object(r["a"])(Object(n["b"])(["absolute","fixed"])).extend({name:"applicationable",props:{app:Boolean},computed:{applicationProperty:function(){return t}},watch:{app:function(t,e){e?this.removeApplication(!0):this.callUpdate()},applicationProperty:function(t,e){this.$vuetify.application.unregister(this._uid,e)}},activated:function(){this.callUpdate()},created:function(){for(var t=0,i=e.length;t<i;t++)this.$watch(e[t],this.callUpdate);this.callUpdate()},mounted:function(){this.callUpdate()},deactivated:function(){this.removeApplication()},destroyed:function(){this.removeApplication()},methods:{callUpdate:function(){this.app&&this.$vuetify.application.register(this._uid,this.applicationProperty,this.updateApplication())},removeApplication:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];(t||this.app)&&this.$vuetify.application.unregister(this._uid,this.applicationProperty)},updateApplication:function(){return 0}}})}},"3c93":function(t,e,i){},"40dc":function(t,e,i){"use strict";i("a9e3"),i("b680"),i("c7cd");var n=i("5530"),r=(i("8b0d"),i("71d9"));function a(t,e){var i=e.value,n=e.options||{passive:!0},r=e.arg?document.querySelector(e.arg):window;r&&(r.addEventListener("scroll",i,n),t._onScroll={callback:i,options:n,target:r})}function s(t){if(t._onScroll){var e=t._onScroll,i=e.callback,n=e.options,r=e.target;r.removeEventListener("scroll",i,n),delete t._onScroll}}var o={inserted:a,unbind:s},c=o,l=i("3a66"),h=i("d9bd"),u=i("2b0e"),d=u["a"].extend({name:"scrollable",directives:{Scroll:o},props:{scrollTarget:String,scrollThreshold:[String,Number]},data:function(){return{currentScroll:0,currentThreshold:0,isActive:!1,isScrollingUp:!1,previousScroll:0,savedScroll:0,target:null}},computed:{canScroll:function(){return"undefined"!==typeof window},computedScrollThreshold:function(){return this.scrollThreshold?Number(this.scrollThreshold):300}},watch:{isScrollingUp:function(){this.savedScroll=this.savedScroll||this.currentScroll},isActive:function(){this.savedScroll=0}},mounted:function(){this.scrollTarget&&(this.target=document.querySelector(this.scrollTarget),this.target||Object(h["c"])("Unable to locate element with identifier ".concat(this.scrollTarget),this))},methods:{onScroll:function(){var t=this;this.canScroll&&(this.previousScroll=this.currentScroll,this.currentScroll=this.target?this.target.scrollTop:window.pageYOffset,this.isScrollingUp=this.currentScroll<this.previousScroll,this.currentThreshold=Math.abs(this.currentScroll-this.computedScrollThreshold),this.$nextTick((function(){Math.abs(t.currentScroll-t.savedScroll)>t.computedScrollThreshold&&t.thresholdMet()})))},thresholdMet:function(){}}}),p=i("d10f"),v=i("f2e7"),f=i("80d2"),m=i("58df"),g=Object(m["a"])(r["a"],d,p["a"],v["a"],Object(l["a"])("top",["clippedLeft","clippedRight","computedHeight","invertedScroll","isExtended","isProminent","value"]));e["a"]=g.extend({name:"v-app-bar",directives:{Scroll:c},props:{clippedLeft:Boolean,clippedRight:Boolean,collapseOnScroll:Boolean,elevateOnScroll:Boolean,fadeImgOnScroll:Boolean,hideOnScroll:Boolean,invertedScroll:Boolean,scrollOffScreen:Boolean,shrinkOnScroll:Boolean,value:{type:Boolean,default:!0}},data:function(){return{isActive:this.value}},computed:{applicationProperty:function(){return this.bottom?"bottom":"top"},canScroll:function(){return d.options.computed.canScroll.call(this)&&(this.invertedScroll||this.elevateOnScroll||this.hideOnScroll||this.collapseOnScroll||this.isBooted||!this.value)},classes:function(){return Object(n["a"])(Object(n["a"])({},r["a"].options.computed.classes.call(this)),{},{"v-toolbar--collapse":this.collapse||this.collapseOnScroll,"v-app-bar":!0,"v-app-bar--clipped":this.clippedLeft||this.clippedRight,"v-app-bar--fade-img-on-scroll":this.fadeImgOnScroll,"v-app-bar--elevate-on-scroll":this.elevateOnScroll,"v-app-bar--fixed":!this.absolute&&(this.app||this.fixed),"v-app-bar--hide-shadow":this.hideShadow,"v-app-bar--is-scrolled":this.currentScroll>0,"v-app-bar--shrink-on-scroll":this.shrinkOnScroll})},computedContentHeight:function(){if(!this.shrinkOnScroll)return r["a"].options.computed.computedContentHeight.call(this);var t=this.computedOriginalHeight,e=this.dense?48:56,i=t,n=i-e,a=n/this.computedScrollThreshold,s=this.currentScroll*a;return Math.max(e,i-s)},computedFontSize:function(){if(this.isProminent){var t=this.dense?96:128,e=t-this.computedContentHeight,i=.00347;return Number((1.5-e*i).toFixed(2))}},computedLeft:function(){return!this.app||this.clippedLeft?0:this.$vuetify.application.left},computedMarginTop:function(){return this.app?this.$vuetify.application.bar:0},computedOpacity:function(){if(this.fadeImgOnScroll){var t=Math.max((this.computedScrollThreshold-this.currentScroll)/this.computedScrollThreshold,0);return Number(parseFloat(t).toFixed(2))}},computedOriginalHeight:function(){var t=r["a"].options.computed.computedContentHeight.call(this);return this.isExtended&&(t+=parseInt(this.extensionHeight)),t},computedRight:function(){return!this.app||this.clippedRight?0:this.$vuetify.application.right},computedScrollThreshold:function(){return this.scrollThreshold?Number(this.scrollThreshold):this.computedOriginalHeight-(this.dense?48:56)},computedTransform:function(){if(!this.canScroll||this.elevateOnScroll&&0===this.currentScroll&&this.isActive)return 0;if(this.isActive)return 0;var t=this.scrollOffScreen?this.computedHeight:this.computedContentHeight;return this.bottom?t:-t},hideShadow:function(){return this.elevateOnScroll&&this.isExtended?this.currentScroll<this.computedScrollThreshold:this.elevateOnScroll?0===this.currentScroll||this.computedTransform<0:(!this.isExtended||this.scrollOffScreen)&&0!==this.computedTransform},isCollapsed:function(){return this.collapseOnScroll?this.currentScroll>0:r["a"].options.computed.isCollapsed.call(this)},isProminent:function(){return r["a"].options.computed.isProminent.call(this)||this.shrinkOnScroll},styles:function(){return Object(n["a"])(Object(n["a"])({},r["a"].options.computed.styles.call(this)),{},{fontSize:Object(f["f"])(this.computedFontSize,"rem"),marginTop:Object(f["f"])(this.computedMarginTop),transform:"translateY(".concat(Object(f["f"])(this.computedTransform),")"),left:Object(f["f"])(this.computedLeft),right:Object(f["f"])(this.computedRight)})}},watch:{canScroll:"onScroll",computedTransform:function(){this.canScroll&&(this.clippedLeft||this.clippedRight)&&this.callUpdate()},invertedScroll:function(t){this.isActive=!t||0!==this.currentScroll}},created:function(){this.invertedScroll&&(this.isActive=!1)},methods:{genBackground:function(){var t=r["a"].options.methods.genBackground.call(this);return t.data=this._b(t.data||{},t.tag,{style:{opacity:this.computedOpacity}}),t},updateApplication:function(){return this.invertedScroll?0:this.computedHeight+this.computedTransform},thresholdMet:function(){this.invertedScroll?this.isActive=this.currentScroll>this.computedScrollThreshold:(this.hideOnScroll&&(this.isActive=this.isScrollingUp||this.currentScroll<this.computedScrollThreshold),this.currentThreshold<this.computedScrollThreshold||(this.savedScroll=this.currentScroll))}},render:function(t){var e=r["a"].options.render.call(this,t);return e.data=e.data||{},this.canScroll&&(e.data.directives=e.data.directives||[],e.data.directives.push({arg:this.scrollTarget,name:"scroll",value:this.onScroll})),e}})},"5b40":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-app",[i("v-app-bar",{attrs:{app:"","clipped-left":"","clipped-right":"",flat:"",color:"primary",dark:""}},[i("v-app-bar-nav-icon",{on:{click:function(e){t.isRecentMessagesDrawerShow=!t.isRecentMessagesDrawerShow}}}),i("v-spacer"),i("v-toolbar-title",[i("div",{staticClass:"d-flex"},[i("span",{staticClass:"mr-2 text-uppercase font-weight-bold"},[t._v("Channel")]),i("v-icon",[t._v("mdi-access-point-network")])],1)]),i("v-spacer"),i("dashboard-app-bar-menu")],1),i("v-navigation-drawer",{attrs:{app:"",clipped:"",width:"400"},model:{value:t.isRecentMessagesDrawerShow,callback:function(e){t.isRecentMessagesDrawerShow=e},expression:"isRecentMessagesDrawerShow"}},[i("profile-list-item"),i("v-divider"),i("recent-chat-list")],1),i("v-content",[i("router-view")],1)],1)},r=[],a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-list-item",{attrs:{"two-line":""}},[i("v-list-item-avatar",{attrs:{size:45}},[i("v-img",{attrs:{src:t.currentAccount.avatarUrl,"lazy-src":t.currentAccount.avatarUrl}})],1),i("v-list-item-content",[i("v-list-item-title",[i("h1",{staticClass:"text-truncate text-capitalize",staticStyle:{"font-size":"1.5rem"}},[t._v(" "+t._s(t.currentAccount.name)+" ")])]),i("v-list-item-subtitle",{staticClass:"subtitle-2 grey--text"},[t._v(t._s(t.currentAccount.username))])],1)],1)},s=[],o={name:"profile-list-item",computed:{currentAccount:function(){return this.$store.state.account.current}}},c=o,l=i("2877"),h=i("6544"),u=i.n(h),d=i("adda"),p=i("da13"),v=i("8270"),f=i("5d23"),m=Object(l["a"])(c,a,s,!1,null,null,null),g=m.exports;u()(m,{VImg:d["a"],VListItem:p["a"],VListItemAvatar:v["a"],VListItemContent:f["b"],VListItemSubtitle:f["c"],VListItemTitle:f["d"]});var b=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-menu",{attrs:{"offset-y":""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on;return[i("v-btn",t._g({attrs:{color:"primary",depressed:""}},n),[i("v-avatar",{attrs:{size:35}},[i("v-img",{attrs:{src:t.currentAccount.avatarUrl,"lazy-src":t.currentAccount.avatarUrl}})],1)],1)]}}])},[i("v-list",[i("v-list-item",{on:{click:t.goToProfile}},[t._v("Profile")]),i("v-list-item",{on:{click:t.logout}},[t._v("Logout")])],1)],1)},y=[],S=(i("96cf"),i("1da1")),w=i("ef09"),O={name:"dashboard-app-bar-menu",computed:{currentAccount:function(){return this.$store.state.account.current}},methods:{logout:function(){var t=this;return Object(S["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$store.commit(w["c"]);case 2:return e.next=4,t.$router.push({name:"login"});case 4:case"end":return e.stop()}}),e)})))()},goToProfile:function(){var t=this.currentAccount.username;this.$router.push({name:"profile",params:{username:t}})}}},x=O,C=i("8212"),_=i("8336"),A=i("8860"),$=i("e449"),T=Object(l["a"])(x,b,y,!1,null,null,null),j=T.exports;u()(T,{VAvatar:C["a"],VBtn:_["a"],VImg:d["a"],VList:A["a"],VListItem:p["a"],VMenu:$["a"]});var B=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-card",{attrs:{flat:"",color:"white"}},[n("v-card-title",{staticClass:"font-weight-bold"},[n("span",[t._v("Recent Chats")]),n("div",{staticClass:"flex-grow-1"}),n("v-btn",{attrs:{color:"primary",rounded:"",to:{name:"room-list"}}},[n("v-icon",{staticClass:"mr-1"},[t._v("mdi-magnify")]),n("span",{staticClass:"text-capitalize"},[t._v("Discover Rooms")])],1)],1),n("v-list",{attrs:{rounded:"",dense:""}},[n("v-text-field",{attrs:{dense:"",rounded:"",filled:"","single-line":"",label:"Search room name","prepend-inner-icon":"mdi-magnify"},model:{value:t.query,callback:function(e){t.query=e},expression:"query"}}),t._l(t.filteredRecentChats,(function(t,e){return[n("recent-chat-list-item",{key:e,attrs:{chat:t}})]}))],2),0===t.recentChats.length?n("div",{staticClass:"text-center"},[n("v-avatar",{attrs:{size:100}},[n("v-img",{attrs:{src:i("d417"),"lazy-src":i("d417")}})],1),n("h1",{staticClass:"title mb-1"},[t._v("No recent chats")]),n("h2",{staticClass:"subtitle-2"},[t._v("Lorem ipsum dolor sit amet.")])],1):t._e()],1)},k=[],E=(i("4de4"),i("c975"),i("498a"),function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-list-item",{on:{click:t.openRecentChat}},[i("v-list-item-avatar",{attrs:{size:45}},[i("v-img",{attrs:{src:t.chat.room.avatarUrl,"lazy-src":t.chat.room.avatarUrl}})],1),i("v-list-item-content",[i("v-list-item-title",[i("div",{staticClass:"d-flex align-center"},[i("span",{staticClass:"title font-weight-bold"},[t._v(t._s(t.chat.room.name))]),i("span",[i("span",{staticClass:"mx-1"},[t._v("·")]),t._v(" "+t._s(t.formatTimestamp(t.chat.createdAt))+" ")])])]),i("v-list-item-subtitle",[i("span",{class:t.chat.isRead?"":"font-weight-bold black--text"},[t._v(" "+t._s(t.previewMessage(t.chat))+" ")])])],1),t.chat.isRead?t._e():i("v-list-item-action-text",[i("v-icon",{attrs:{color:"primary","x-small":""}},[t._v("mdi-moon-full")])],1)],1)}),M=[],I=(i("99af"),i("b0c0"),i("7c76")),V={name:"recent-chat-list-item",mixins:[I["a"]],props:{chat:{type:Object,required:!0}},computed:{currentAccount:function(){return this.$store.state.account.current},recentChats:function(){var t=this.$store.state.chat.recent;return t||[]}},methods:{openRecentChat:function(){var t=this;return Object(S["a"])(regeneratorRuntime.mark((function e(){var i,n,r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return i=t.chat,n=i.id,r=i.room,e.next=3,t.goToRoom(r.id);case 3:a={chatId:n,roomId:r.id,accountId:t.currentAccount.id},t.readRecentChat(a);case 5:case"end":return e.stop()}}),e)})))()},goToRoom:function(t){var e=this;return Object(S["a"])(regeneratorRuntime.mark((function i(){return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.next=2,e.$router.push({name:"chat-list",params:{roomId:t}});case 2:case"end":return i.stop()}}),i)})))()},readRecentChat:function(t){var e=t.chatId,i=t.accountId,n=t.roomId;this.$socket.client.emit("chat_read_recent",{chatId:e,accountId:i,roomId:n})},previewMessage:function(t){var e=t.type,i=t.message,n=t.account,r=this.getFirstName(n.name),a="";switch(e){case"regular":a="".concat(r,": ").concat(i);break;case"system":a=i;break;default:a="Something went wrong."}return a}}},L=V,R=i("132d"),H=Object(l["a"])(L,E,M,!1,null,null,null),N=H.exports;u()(H,{VIcon:R["a"],VImg:d["a"],VListItem:p["a"],VListItemActionText:f["a"],VListItemAvatar:v["a"],VListItemContent:f["b"],VListItemSubtitle:f["c"],VListItemTitle:f["d"]});var P={name:"recent-chat-list",components:{RecentChatListItem:N},data:function(){return{query:""}},computed:{recentChats:function(){var t=this.$store.state.chat.recent;return t||[]},filteredRecentChats:function(){var t=this,e=[];return this.query?this.recentChats.filter((function(e){var i=t.query.trim().toLowerCase(),n=e.room.nameSlug.trim().toLowerCase();return n.indexOf(i)>-1})):(e=this.recentChats,e)}}},z=P,X=i("b0af"),Y=i("99d9"),D=i("8654"),U=Object(l["a"])(z,B,k,!1,null,null,null),q=U.exports;u()(U,{VAvatar:C["a"],VBtn:_["a"],VCard:X["a"],VCardTitle:Y["d"],VIcon:R["a"],VImg:d["a"],VList:A["a"],VTextField:D["a"]});var W={name:"main-layout",components:{RecentChatList:q,DashboardAppBarMenu:j,ProfileListItem:g},data:function(){return{isRecentMessagesDrawerShow:!0}},computed:{currentAccount:function(){var t=this.$store.state.account.current;return t||{}}},sockets:{chat_recent_refresh:function(){this.$socket.client.emit("chat_recent",this.currentAccount.id)}}},F=W,Z=i("7496"),J=i("40dc"),G=i("5bc1"),K=i("a75b"),Q=i("ce7e"),tt=i("f774"),et=i("2fa4"),it=i("2a7f"),nt=Object(l["a"])(F,n,r,!1,null,null,null);e["default"]=nt.exports;u()(nt,{VApp:Z["a"],VAppBar:J["a"],VAppBarNavIcon:G["a"],VContent:K["a"],VDivider:Q["a"],VIcon:R["a"],VNavigationDrawer:tt["a"],VSpacer:et["a"],VToolbarTitle:it["a"]})},"5bc1":function(t,e,i){"use strict";i("498a");var n=i("5530"),r=i("9d26"),a=i("8336"),s=i("2b0e");e["a"]=s["a"].extend({name:"v-app-bar-nav-icon",functional:!0,render:function(t,e){var i=e.slots,s=e.listeners,o=e.props,c=e.data,l=Object.assign(c,{staticClass:"v-app-bar__nav-icon ".concat(c.staticClass||"").trim(),props:Object(n["a"])(Object(n["a"])({},o),{},{icon:!0}),on:s}),h=i().default;return t(a["a"],l,h||[t(r["a"],"$menu")])}})},"5e23":function(t,e,i){},"71d9":function(t,e,i){"use strict";i("0481"),i("4160"),i("4069"),i("a9e3");var n=i("3835"),r=i("5530"),a=(i("5e23"),i("8dd9")),s=i("adda"),o=i("80d2"),c=i("d9bd");e["a"]=a["a"].extend({name:"v-toolbar",props:{absolute:Boolean,bottom:Boolean,collapse:Boolean,dense:Boolean,extended:Boolean,extensionHeight:{default:48,type:[Number,String]},flat:Boolean,floating:Boolean,prominent:Boolean,short:Boolean,src:{type:[String,Object],default:""},tag:{type:String,default:"header"},tile:{type:Boolean,default:!0}},data:function(){return{isExtended:!1}},computed:{computedHeight:function(){var t=this.computedContentHeight;if(!this.isExtended)return t;var e=parseInt(this.extensionHeight);return this.isCollapsed?t:t+(isNaN(e)?0:e)},computedContentHeight:function(){return this.height?parseInt(this.height):this.isProminent&&this.dense?96:this.isProminent&&this.short?112:this.isProminent?128:this.dense?48:this.short||this.$vuetify.breakpoint.smAndDown?56:64},classes:function(){return Object(r["a"])(Object(r["a"])({},a["a"].options.computed.classes.call(this)),{},{"v-toolbar":!0,"v-toolbar--absolute":this.absolute,"v-toolbar--bottom":this.bottom,"v-toolbar--collapse":this.collapse,"v-toolbar--collapsed":this.isCollapsed,"v-toolbar--dense":this.dense,"v-toolbar--extended":this.isExtended,"v-toolbar--flat":this.flat,"v-toolbar--floating":this.floating,"v-toolbar--prominent":this.isProminent})},isCollapsed:function(){return this.collapse},isProminent:function(){return this.prominent},styles:function(){return Object(r["a"])(Object(r["a"])({},this.measurableStyles),{},{height:Object(o["f"])(this.computedHeight)})}},created:function(){var t=this,e=[["app","<v-app-bar app>"],["manual-scroll",'<v-app-bar :value="false">'],["clipped-left","<v-app-bar clipped-left>"],["clipped-right","<v-app-bar clipped-right>"],["inverted-scroll","<v-app-bar inverted-scroll>"],["scroll-off-screen","<v-app-bar scroll-off-screen>"],["scroll-target","<v-app-bar scroll-target>"],["scroll-threshold","<v-app-bar scroll-threshold>"],["card","<v-app-bar flat>"]];e.forEach((function(e){var i=Object(n["a"])(e,2),r=i[0],a=i[1];t.$attrs.hasOwnProperty(r)&&Object(c["a"])(r,a,t)}))},methods:{genBackground:function(){var t={height:Object(o["f"])(this.computedHeight),src:this.src},e=this.$scopedSlots.img?this.$scopedSlots.img({props:t}):this.$createElement(s["a"],{props:t});return this.$createElement("div",{staticClass:"v-toolbar__image"},[e])},genContent:function(){return this.$createElement("div",{staticClass:"v-toolbar__content",style:{height:Object(o["f"])(this.computedContentHeight)}},Object(o["m"])(this))},genExtension:function(){return this.$createElement("div",{staticClass:"v-toolbar__extension",style:{height:Object(o["f"])(this.extensionHeight)}},Object(o["m"])(this,"extension"))}},render:function(t){this.isExtended=this.extended||!!this.$scopedSlots.extension;var e=[this.genContent()],i=this.setBackgroundColor(this.color,{class:this.classes,style:this.styles,on:this.$listeners});return this.isExtended&&e.push(this.genExtension()),(this.src||this.$scopedSlots.img)&&e.unshift(this.genBackground()),t(this.tag,i,e)}})},7496:function(t,e,i){"use strict";var n=i("5530"),r=(i("df86"),i("7560")),a=i("58df");e["a"]=Object(a["a"])(r["a"]).extend({name:"v-app",props:{dark:{type:Boolean,default:void 0},id:{type:String,default:"app"},light:{type:Boolean,default:void 0}},computed:{isDark:function(){return this.$vuetify.theme.dark}},beforeCreate:function(){if(!this.$vuetify||this.$vuetify===this.$root)throw new Error("Vuetify is not properly initialized, see https://vuetifyjs.com/getting-started/quick-start#bootstrapping-the-vuetify-object")},render:function(t){var e=t("div",{staticClass:"v-application--wrap"},this.$slots.default);return t("div",{staticClass:"v-application",class:Object(n["a"])({"v-application--is-rtl":this.$vuetify.rtl,"v-application--is-ltr":!this.$vuetify.rtl},this.themeClasses),attrs:{"data-app":!0},domProps:{id:this.id}},[e])}})},7958:function(t,e,i){},"8b0d":function(t,e,i){},a75b:function(t,e,i){"use strict";i("daaf");var n=i("d10f");e["a"]=n["a"].extend({name:"v-content",props:{tag:{type:String,default:"main"}},computed:{styles:function(){var t=this.$vuetify.application,e=t.bar,i=t.top,n=t.right,r=t.footer,a=t.insetFooter,s=t.bottom,o=t.left;return{paddingTop:"".concat(i+e,"px"),paddingRight:"".concat(n,"px"),paddingBottom:"".concat(r+a+s,"px"),paddingLeft:"".concat(o,"px")}}},render:function(t){var e={staticClass:"v-content",style:this.styles,ref:"content"};return t(this.tag,e,[t("div",{staticClass:"v-content__wrap"},this.$slots.default)])}})},c3f0:function(t,e,i){"use strict";i("4160"),i("159b");var n=i("80d2"),r=function(t){var e=t.touchstartX,i=t.touchendX,n=t.touchstartY,r=t.touchendY,a=.5,s=16;t.offsetX=i-e,t.offsetY=r-n,Math.abs(t.offsetY)<a*Math.abs(t.offsetX)&&(t.left&&i<e-s&&t.left(t),t.right&&i>e+s&&t.right(t)),Math.abs(t.offsetX)<a*Math.abs(t.offsetY)&&(t.up&&r<n-s&&t.up(t),t.down&&r>n+s&&t.down(t))};function a(t,e){var i=t.changedTouches[0];e.touchstartX=i.clientX,e.touchstartY=i.clientY,e.start&&e.start(Object.assign(t,e))}function s(t,e){var i=t.changedTouches[0];e.touchendX=i.clientX,e.touchendY=i.clientY,e.end&&e.end(Object.assign(t,e)),r(e)}function o(t,e){var i=t.changedTouches[0];e.touchmoveX=i.clientX,e.touchmoveY=i.clientY,e.move&&e.move(Object.assign(t,e))}function c(t){var e={touchstartX:0,touchstartY:0,touchendX:0,touchendY:0,touchmoveX:0,touchmoveY:0,offsetX:0,offsetY:0,left:t.left,right:t.right,up:t.up,down:t.down,start:t.start,move:t.move,end:t.end};return{touchstart:function(t){return a(t,e)},touchend:function(t){return s(t,e)},touchmove:function(t){return o(t,e)}}}function l(t,e,i){var r=e.value,a=r.parent?t.parentElement:t,s=r.options||{passive:!0};if(a){var o=c(e.value);a._touchHandlers=Object(a._touchHandlers),a._touchHandlers[i.context._uid]=o,Object(n["r"])(o).forEach((function(t){a.addEventListener(t,o[t],s)}))}}function h(t,e,i){var r=e.value.parent?t.parentElement:t;if(r&&r._touchHandlers){var a=r._touchHandlers[i.context._uid];Object(n["r"])(a).forEach((function(t){r.removeEventListener(t,a[t])})),delete r._touchHandlers[i.context._uid]}}var u={inserted:l,unbind:h};e["a"]=u},d10f:function(t,e,i){"use strict";var n=i("2b0e");e["a"]=n["a"].extend({name:"ssr-bootable",data:function(){return{isBooted:!1}},mounted:function(){var t=this;window.requestAnimationFrame((function(){t.$el.setAttribute("data-booted","true"),t.isBooted=!0}))}})},d417:function(t,e,i){t.exports=i.p+"img/chat-messages.41012808.png"},daaf:function(t,e,i){},df86:function(t,e,i){},e707:function(t,e,i){"use strict";i("caad"),i("a9e3"),i("2532");var n=i("5530"),r=(i("3c93"),i("a9ad")),a=i("7560"),s=i("f2e7"),o=i("58df"),c=Object(o["a"])(r["a"],a["a"],s["a"]).extend({name:"v-overlay",props:{absolute:Boolean,color:{type:String,default:"#212121"},dark:{type:Boolean,default:!0},opacity:{type:[Number,String],default:.46},value:{default:!0},zIndex:{type:[Number,String],default:5}},computed:{__scrim:function(){var t=this.setBackgroundColor(this.color,{staticClass:"v-overlay__scrim",style:{opacity:this.computedOpacity}});return this.$createElement("div",t)},classes:function(){return Object(n["a"])({"v-overlay--absolute":this.absolute,"v-overlay--active":this.isActive},this.themeClasses)},computedOpacity:function(){return Number(this.isActive?this.opacity:0)},styles:function(){return{zIndex:this.zIndex}}},methods:{genContent:function(){return this.$createElement("div",{staticClass:"v-overlay__content"},this.$slots.default)}},render:function(t){var e=[this.__scrim];return this.isActive&&e.push(this.genContent()),t("div",{staticClass:"v-overlay",class:this.classes,style:this.styles},e)}}),l=c,h=i("80d2"),u=i("2b0e");e["a"]=u["a"].extend().extend({name:"overlayable",props:{hideOverlay:Boolean,overlayColor:String,overlayOpacity:[Number,String]},data:function(){return{overlay:null}},watch:{hideOverlay:function(t){this.isActive&&(t?this.removeOverlay():this.genOverlay())}},beforeDestroy:function(){this.removeOverlay()},methods:{createOverlay:function(){var t=new l({propsData:{absolute:this.absolute,value:!1,color:this.overlayColor,opacity:this.overlayOpacity}});t.$mount();var e=this.absolute?this.$el.parentNode:document.querySelector("[data-app]");e&&e.insertBefore(t.$el,e.firstChild),this.overlay=t},genOverlay:function(){var t=this;if(this.hideScroll(),!this.hideOverlay)return this.overlay||this.createOverlay(),requestAnimationFrame((function(){t.overlay&&(void 0!==t.activeZIndex?t.overlay.zIndex=String(t.activeZIndex-1):t.$el&&(t.overlay.zIndex=Object(h["o"])(t.$el)))})),this.overlay&&(this.overlay.value=!0),!0},removeOverlay:function(){var t=this,e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.overlay&&(Object(h["a"])(this.overlay.$el,"transitionend",(function(){t.overlay&&t.overlay.$el&&t.overlay.$el.parentNode&&!t.overlay.value&&(t.overlay.$el.parentNode.removeChild(t.overlay.$el),t.overlay.$destroy(),t.overlay=null)})),this.overlay.value=!1),e&&this.showScroll()},scrollListener:function(t){if("keydown"===t.type){if(["INPUT","TEXTAREA","SELECT"].includes(t.target.tagName)||t.target.isContentEditable)return;var e=[h["q"].up,h["q"].pageup],i=[h["q"].down,h["q"].pagedown];if(e.includes(t.keyCode))t.deltaY=-1;else{if(!i.includes(t.keyCode))return;t.deltaY=1}}(t.target===this.overlay||"keydown"!==t.type&&t.target===document.body||this.checkPath(t))&&t.preventDefault()},hasScrollbar:function(t){if(!t||t.nodeType!==Node.ELEMENT_NODE)return!1;var e=window.getComputedStyle(t);return["auto","scroll"].includes(e.overflowY)&&t.scrollHeight>t.clientHeight},shouldScroll:function(t,e){return 0===t.scrollTop&&e<0||t.scrollTop+t.clientHeight===t.scrollHeight&&e>0},isInside:function(t,e){return t===e||null!==t&&t!==document.body&&this.isInside(t.parentNode,e)},checkPath:function(t){var e=t.path||this.composedPath(t),i=t.deltaY;if("keydown"===t.type&&e[0]===document.body){var n=this.$refs.dialog,r=window.getSelection().anchorNode;return!(n&&this.hasScrollbar(n)&&this.isInside(r,n))||this.shouldScroll(n,i)}for(var a=0;a<e.length;a++){var s=e[a];if(s===document)return!0;if(s===document.documentElement)return!0;if(s===this.$refs.content)return!0;if(this.hasScrollbar(s))return this.shouldScroll(s,i)}return!0},composedPath:function(t){if(t.composedPath)return t.composedPath();var e=[],i=t.target;while(i){if(e.push(i),"HTML"===i.tagName)return e.push(document),e.push(window),e;i=i.parentElement}return e},hideScroll:function(){this.$vuetify.breakpoint.smAndDown?document.documentElement.classList.add("overflow-y-hidden"):(Object(h["b"])(window,"wheel",this.scrollListener,{passive:!1}),window.addEventListener("keydown",this.scrollListener))},showScroll:function(){document.documentElement.classList.remove("overflow-y-hidden"),window.removeEventListener("wheel",this.scrollListener),window.removeEventListener("keydown",this.scrollListener)}}})},f774:function(t,e,i){"use strict";i("99af"),i("a9e3"),i("c7cd");var n=i("5530"),r=(i("7958"),i("adda")),a=i("3a66"),s=i("a9ad"),o=i("b848"),c=i("e707"),l=i("d10f"),h=i("7560"),u=i("a293"),d=i("dc22"),p=i("c3f0"),v=i("80d2"),f=i("58df"),m=Object(f["a"])(Object(a["a"])("left",["isActive","isMobile","miniVariant","expandOnHover","permanent","right","temporary","width"]),s["a"],o["a"],c["a"],l["a"],h["a"]);e["a"]=m.extend({name:"v-navigation-drawer",provide:function(){return{isInNav:"nav"===this.tag}},directives:{ClickOutside:u["a"],Resize:d["a"],Touch:p["a"]},props:{bottom:Boolean,clipped:Boolean,disableResizeWatcher:Boolean,disableRouteWatcher:Boolean,expandOnHover:Boolean,floating:Boolean,height:{type:[Number,String],default:function(){return this.app?"100vh":"100%"}},miniVariant:Boolean,miniVariantWidth:{type:[Number,String],default:56},mobileBreakPoint:{type:[Number,String],default:1264},permanent:Boolean,right:Boolean,src:{type:[String,Object],default:""},stateless:Boolean,tag:{type:String,default:function(){return this.app?"nav":"aside"}},temporary:Boolean,touchless:Boolean,width:{type:[Number,String],default:256},value:null},data:function(){return{isMouseover:!1,touchArea:{left:0,right:0},stackMinZIndex:6}},computed:{applicationProperty:function(){return this.right?"right":"left"},classes:function(){return Object(n["a"])({"v-navigation-drawer":!0,"v-navigation-drawer--absolute":this.absolute,"v-navigation-drawer--bottom":this.bottom,"v-navigation-drawer--clipped":this.clipped,"v-navigation-drawer--close":!this.isActive,"v-navigation-drawer--fixed":!this.absolute&&(this.app||this.fixed),"v-navigation-drawer--floating":this.floating,"v-navigation-drawer--is-mobile":this.isMobile,"v-navigation-drawer--is-mouseover":this.isMouseover,"v-navigation-drawer--mini-variant":this.isMiniVariant,"v-navigation-drawer--custom-mini-variant":56!==Number(this.miniVariantWidth),"v-navigation-drawer--open":this.isActive,"v-navigation-drawer--open-on-hover":this.expandOnHover,"v-navigation-drawer--right":this.right,"v-navigation-drawer--temporary":this.temporary},this.themeClasses)},computedMaxHeight:function(){if(!this.hasApp)return null;var t=this.$vuetify.application.bottom+this.$vuetify.application.footer+this.$vuetify.application.bar;return this.clipped?t+this.$vuetify.application.top:t},computedTop:function(){if(!this.hasApp)return 0;var t=this.$vuetify.application.bar;return t+=this.clipped?this.$vuetify.application.top:0,t},computedTransform:function(){return this.isActive?0:this.isBottom||this.right?100:-100},computedWidth:function(){return this.isMiniVariant?this.miniVariantWidth:this.width},hasApp:function(){return this.app&&!this.isMobile&&!this.temporary},isBottom:function(){return this.bottom&&this.isMobile},isMiniVariant:function(){return!this.expandOnHover&&this.miniVariant||this.expandOnHover&&!this.isMouseover},isMobile:function(){return!this.stateless&&!this.permanent&&this.$vuetify.breakpoint.width<parseInt(this.mobileBreakPoint,10)},reactsToClick:function(){return!this.stateless&&!this.permanent&&(this.isMobile||this.temporary)},reactsToMobile:function(){return this.app&&!this.disableResizeWatcher&&!this.permanent&&!this.stateless&&!this.temporary},reactsToResize:function(){return!this.disableResizeWatcher&&!this.stateless},reactsToRoute:function(){return!this.disableRouteWatcher&&!this.stateless&&(this.temporary||this.isMobile)},showOverlay:function(){return!this.hideOverlay&&this.isActive&&(this.isMobile||this.temporary)},styles:function(){var t=this.isBottom?"translateY":"translateX",e={height:Object(v["f"])(this.height),top:this.isBottom?"auto":Object(v["f"])(this.computedTop),maxHeight:null!=this.computedMaxHeight?"calc(100% - ".concat(Object(v["f"])(this.computedMaxHeight),")"):void 0,transform:"".concat(t,"(").concat(Object(v["f"])(this.computedTransform,"%"),")"),width:Object(v["f"])(this.computedWidth)};return e}},watch:{$route:"onRouteChange",isActive:function(t){this.$emit("input",t)},isMobile:function(t,e){!t&&this.isActive&&!this.temporary&&this.removeOverlay(),null!=e&&this.reactsToResize&&this.reactsToMobile&&(this.isActive=!t)},permanent:function(t){t&&(this.isActive=!0)},showOverlay:function(t){t?this.genOverlay():this.removeOverlay()},value:function(t){this.permanent||(null!=t?t!==this.isActive&&(this.isActive=t):this.init())},expandOnHover:"updateMiniVariant",isMouseover:function(t){this.updateMiniVariant(!t)}},beforeMount:function(){this.init()},methods:{calculateTouchArea:function(){var t=this.$el.parentNode;if(t){var e=t.getBoundingClientRect();this.touchArea={left:e.left+50,right:e.right-50}}},closeConditional:function(){return this.isActive&&!this._isDestroyed&&this.reactsToClick},genAppend:function(){return this.genPosition("append")},genBackground:function(){var t={height:"100%",width:"100%",src:this.src},e=this.$scopedSlots.img?this.$scopedSlots.img(t):this.$createElement(r["a"],{props:t});return this.$createElement("div",{staticClass:"v-navigation-drawer__image"},[e])},genDirectives:function(){var t=this,e=[{name:"click-outside",value:function(){return t.isActive=!1},args:{closeConditional:this.closeConditional,include:this.getOpenDependentElements}}];return this.touchless||this.stateless||e.push({name:"touch",value:{parent:!0,left:this.swipeLeft,right:this.swipeRight}}),e},genListeners:function(){var t=this,e={transitionend:function(e){if(e.target===e.currentTarget){t.$emit("transitionend",e);var i=document.createEvent("UIEvents");i.initUIEvent("resize",!0,!1,window,0),window.dispatchEvent(i)}}};return this.miniVariant&&(e.click=function(){return t.$emit("update:mini-variant",!1)}),this.expandOnHover&&(e.mouseenter=function(){return t.isMouseover=!0},e.mouseleave=function(){return t.isMouseover=!1}),e},genPosition:function(t){var e=Object(v["m"])(this,t);return e?this.$createElement("div",{staticClass:"v-navigation-drawer__".concat(t)},e):e},genPrepend:function(){return this.genPosition("prepend")},genContent:function(){return this.$createElement("div",{staticClass:"v-navigation-drawer__content"},this.$slots.default)},genBorder:function(){return this.$createElement("div",{staticClass:"v-navigation-drawer__border"})},init:function(){this.permanent?this.isActive=!0:this.stateless||null!=this.value?this.isActive=this.value:this.temporary||(this.isActive=!this.isMobile)},onRouteChange:function(){this.reactsToRoute&&this.closeConditional()&&(this.isActive=!1)},swipeLeft:function(t){this.isActive&&this.right||(this.calculateTouchArea(),Math.abs(t.touchendX-t.touchstartX)<100||(this.right&&t.touchstartX>=this.touchArea.right?this.isActive=!0:!this.right&&this.isActive&&(this.isActive=!1)))},swipeRight:function(t){this.isActive&&!this.right||(this.calculateTouchArea(),Math.abs(t.touchendX-t.touchstartX)<100||(!this.right&&t.touchstartX<=this.touchArea.left?this.isActive=!0:this.right&&this.isActive&&(this.isActive=!1)))},updateApplication:function(){if(!this.isActive||this.isMobile||this.temporary||!this.$el)return 0;var t=Number(this.computedWidth);return isNaN(t)?this.$el.clientWidth:t},updateMiniVariant:function(t){this.miniVariant!==t&&this.$emit("update:mini-variant",t)}},render:function(t){var e=[this.genPrepend(),this.genContent(),this.genAppend(),this.genBorder()];return(this.src||Object(v["m"])(this,"img"))&&e.unshift(this.genBackground()),t(this.tag,this.setBackgroundColor(this.color,{class:this.classes,style:this.styles,directives:this.genDirectives(),on:this.genListeners()}),e)}})}}]);
//# sourceMappingURL=chunk-4f8e7eda.24ba513c.js.map