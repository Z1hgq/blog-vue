webpackJsonp([9],{ZYmg:function(t,n,e){"use strict";e.d(n,"a",function(){return o}),e.d(n,"b",function(){return r});var a=e("xXZE"),o=function(t){var n={classification:t.classification};return a.a.request({url:"articalGet?t="+Date.now(),data:n,method:"post"})},r=function(t){var n={_id:t._id};return a.a.request({url:"getArticalContent?t="+Date.now(),data:n,method:"post"})}},zYlB:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e("ZYmg"),o={name:"detail",data:function(){return{content:""}},mounted:function(){var t=this,n={_id:this.$route.params.id};console.log(n),Object(a.b)(n).then(function(n){console.log(n),t.content=n.data.data[0].content})}},r={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{domProps:{innerHTML:this._s(this.content)}})},staticRenderFns:[]},i=e("VU/8")(o,r,!1,null,null,null);n.default=i.exports}});
//# sourceMappingURL=9.66a8b4c1a0279b5b0e55.js.map