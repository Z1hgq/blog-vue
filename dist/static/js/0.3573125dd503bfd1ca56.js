webpackJsonp([0],{H0Ms:function(t,e){},zIeJ:function(t,e,n){"use strict";n("H0Ms");var s={name:"backBtnGroup",data:function(){return{second:5,timer:null}},methods:{backHome:function(){this.$router.replace({name:this.$config.homeName})},backPrev:function(){this.$router.go(-1)}},mounted:function(){var t=this;this.timer=setInterval(function(){0===t.second?t.backPrev():t.second--},1e3)},beforeDestroy:function(){clearInterval(this.timer)}},r={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("Button",{attrs:{size:"large",type:"text"},on:{click:this.backHome}},[this._v("返回首页")]),this._v(" "),e("Button",{attrs:{size:"large",type:"text"},on:{click:this.backPrev}},[this._v("返回上一页("+this._s(this.second)+"s)")])],1)},staticRenderFns:[]},c={name:"error_content",components:{backBtnGroup:n("VU/8")(s,r,!1,null,null,null).exports},props:{code:String,desc:String,src:String}},i={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"error-page"},[n("div",{staticClass:"content-con"},[n("img",{attrs:{src:t.src,alt:t.code}}),t._v(" "),n("div",{staticClass:"text-con"},[n("h4",[t._v(t._s(t.code))]),t._v(" "),n("h5",[t._v(t._s(t.desc))])]),t._v(" "),n("back-btn-group",{staticClass:"back-btn-group"})],1)])},staticRenderFns:[]},o=n("VU/8")(c,i,!1,null,null,null);e.a=o.exports}});
//# sourceMappingURL=0.3573125dd503bfd1ca56.js.map