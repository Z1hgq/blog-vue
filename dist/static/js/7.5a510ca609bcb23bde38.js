webpackJsonp([7],{pnRW:function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=s("5eyz"),n={name:"Blog",data:function(){return{classes:[{imgUrl:"/static/img/classification.png",name:"分类测试"}],blogs:[{title:"",time:"",keywords:[],tags:[],description:""}]}},mounted:function(){var t=this;Object(i.b)().then(function(a){console.log(a),t.classes=[];var s=a.data.data;for(var i in a.data.data){var n={name:s[i].name,imgUrl:s[i].avatar,id:s[i]._id};t.classes.push(n)}})},created:function(){}},c={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"blog"},[s("div",{staticClass:"classification"},[t._m(0),t._v(" "),t._l(t.classes,function(a){return s("div",{key:a.id,staticClass:"classification_el"},[s("div",{staticClass:"cla_img"},[s("img",{attrs:{src:a.imgUrl,alt:""}})]),t._v(" "),s("div",{staticClass:"cla_name"},[s("p",[t._v(t._s(a.name))])])])})],2),t._v(" "),s("div",{staticClass:"content"},[s("Scroll",[s("h1",[t._v("数据api开发中～")]),t._v(" "),s("h3",[t._v("前台导航")]),t._v(" "),s("h3",[t._v("前台路由")]),t._v(" "),s("h3",[t._v("摄影图轮播")]),t._v(" "),s("h3",[t._v("后台导航及路由")]),t._v(" "),s("h3",[t._v("登录模块")]),t._v(" "),s("h3",[t._v("登录模块api及token验证")]),t._v(" "),s("h3",[t._v("图片上传api")]),t._v(" "),s("h3",[t._v("文章分类上传api")]),t._v(" "),s("div",{staticClass:"content_el"})])],1),t._v(" "),s("div",{staticClass:"info"})])},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"classification_el"},[a("div",{staticClass:"cla_img"},[a("img",{attrs:{src:"/static/img/classification.png",alt:""}})]),this._v(" "),a("div",{staticClass:"cla_name"},[a("p",[this._v("全部分类")])])])}]};var e=s("VU/8")(n,c,!1,function(t){s("qPAk")},null,null);a.default=e.exports},qPAk:function(t,a){}});
//# sourceMappingURL=7.5a510ca609bcb23bde38.js.map