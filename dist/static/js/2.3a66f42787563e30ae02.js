webpackJsonp([2],{"5eyz":function(t,a,i){"use strict";i.d(a,"b",function(){return e}),i.d(a,"a",function(){return n});var s=i("xXZE"),e=function(t){var a={name:t.name,avatar:t.avatar,createTime:t.createTime,updateTime:t.updateTime};return s.a.request({url:"addBlogCla",data:a,method:"post"})},n=function(){return s.a.request({url:"getCls",method:"get"})}},pnRW:function(t,a,i){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=i("5eyz"),e={name:"Blog",data:function(){return{classes:[{imgUrl:"/static/img/classification.png",name:"分类测试"}],blogs:[{title:"",time:"",keywords:[],tags:[],description:""}]}},mounted:function(){var t=this;Object(s.a)().then(function(a){console.log(a),t.classes=[];var i=a.data.data;for(var s in a.data.data){var e={name:i[s].name,imgUrl:i[s].avatar,id:i[s]._id};t.classes.push(e)}})},created:function(){}},n={render:function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"blog"},[i("div",{staticClass:"classification"},[t._m(0),t._v(" "),t._l(t.classes,function(a){return i("div",{key:a.id,staticClass:"classification_el"},[i("div",{staticClass:"cla_img"},[i("img",{attrs:{src:a.imgUrl,alt:""}})]),t._v(" "),i("div",{staticClass:"cla_name"},[i("p",[t._v(t._s(a.name))])])])})],2),t._v(" "),i("div",{staticClass:"content"},[i("Scroll",[i("h1",[t._v("数据api开发中～")]),t._v(" "),i("h3",[t._v("前台导航")]),t._v(" "),i("h3",[t._v("前台路由")]),t._v(" "),i("h3",[t._v("摄影图轮播")]),t._v(" "),i("h3",[t._v("后台导航及路由")]),t._v(" "),i("h3",[t._v("登录模块")]),t._v(" "),i("h3",[t._v("登录模块api及token验证")]),t._v(" "),i("h3",[t._v("图片上传api")]),t._v(" "),i("h3",[t._v("文章分类上传api")]),t._v(" "),i("div",{staticClass:"content_el"})])],1),t._v(" "),i("div",{staticClass:"info"})])},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"classification_el"},[a("div",{staticClass:"cla_img"},[a("img",{attrs:{src:"/static/img/classification.png",alt:""}})]),this._v(" "),a("div",{staticClass:"cla_name"},[a("p",[this._v("全部分类")])])])}]};var c=i("VU/8")(e,n,!1,function(t){i("qPAk")},null,null);a.default=c.exports},qPAk:function(t,a){}});
//# sourceMappingURL=2.3a66f42787563e30ae02.js.map