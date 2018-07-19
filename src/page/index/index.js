console.log('123');
require('page/common/nav/index.js');
var navSide = require('page/common/nav-side/index.js')
require('page/common/header/index.js');
var _mm = require('util/mm.js');
navSide.init({name:'user-center'});
// _mm.request({
// 	url: '/product/list.do?keyword=1o',
// 	success: function(res){
// 		console.log(res);
// 	},
// 	error: function(err){
// 		console.log(err);
// 	},
// })
// console.log(_mm.getUrlParam('test'));
// var html = "<div>{{data}}<div>";
// var data = {
// 	data : 123
// }
// console.log(_mm.renderHtml(html,data));