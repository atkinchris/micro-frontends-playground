(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{318:function(n,t,r){"use strict";r(21),r(89),r(41);var a=function(n,t,r){var a=[],e=t.width,c=t.height;return n&&a.push("fmt=".concat(n)),e&&a.push("w=".concat(e*r)),c&&a.push("h=".concat(c*r)),a?"?"+a.join("&"):""},e=function(n,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},e=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[1];return e.map((function(e){return{url:"".concat(n).concat(a(t,r,e)),density:"".concat(e,"x")}}))};t.a=function(n,t){var r=t?[1,2,3]:[1];return{webp:e(n,"webp",t,r),pjpg:e(n,"pjpg",t,r),jpg:e(n,"jpg",t,r)}}},344:function(n,t,r){"use strict";r.r(t);var a=r(0),e=r.n(a),c=r(2),i=r.n(c),u=r(309),o=r.n(u),p=r(318),s=function(n){var t=n.brandName,r=n.brandUrl;return e.a.createElement(o.a,{imageUrls:Object(p.a)(r,{height:20}),altText:t})};s.propTypes={brandName:i.a.string.isRequired,brandUrl:i.a.string.isRequired};var d=s;t.default=d}}]);