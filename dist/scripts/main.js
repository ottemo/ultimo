
require.iniConfig = {
    "general.app.foundation_url": "http://dev.ottemo.io:3000",
    "general.app.media_path": "media/",
    "themes.list.active": "blitz",
    // social networks
    "general.app.login.facebook.appId" : "728744980537129",
    "general.app.login.facebook.secretKey" : "58f763bd74fab043aa3b3c0221291c94",
    "general.app.login.google.clientId" : "1074763412644-qq25glj3tb87bq7bk5m8793da11ddheh.apps.googleusercontent.com",

    // general
    "general.app.category.itemsPerPage" : 10,
    "general.checkout.guest_checkout" : true
};

define("config", (function (global) {
    return function () {
        var ret, fn;
        return ret || global.config;
    };
}(this)));

/*! jQuery v1.11.2 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l="1.11.2",m=function(a,b){return new m.fn.init(a,b)},n=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,o=/^-ms-/,p=/-([\da-z])/gi,q=function(a,b){return b.toUpperCase()};m.fn=m.prototype={jquery:l,constructor:m,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=m.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return m.each(this,a,b)},map:function(a){return this.pushStack(m.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},m.extend=m.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||m.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(e=arguments[h]))for(d in e)a=g[d],c=e[d],g!==c&&(j&&c&&(m.isPlainObject(c)||(b=m.isArray(c)))?(b?(b=!1,f=a&&m.isArray(a)?a:[]):f=a&&m.isPlainObject(a)?a:{},g[d]=m.extend(j,f,c)):void 0!==c&&(g[d]=c));return g},m.extend({expando:"jQuery"+(l+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===m.type(a)},isArray:Array.isArray||function(a){return"array"===m.type(a)},isWindow:function(a){return null!=a&&a==a.window},isNumeric:function(a){return!m.isArray(a)&&a-parseFloat(a)+1>=0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},isPlainObject:function(a){var b;if(!a||"object"!==m.type(a)||a.nodeType||m.isWindow(a))return!1;try{if(a.constructor&&!j.call(a,"constructor")&&!j.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}if(k.ownLast)for(b in a)return j.call(a,b);for(b in a);return void 0===b||j.call(a,b)},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(b){b&&m.trim(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(o,"ms-").replace(p,q)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=r(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(n,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(r(Object(a))?m.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){var d;if(b){if(g)return g.call(b,a,c);for(d=b.length,c=c?0>c?Math.max(0,d+c):c:0;d>c;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,b){var c=+b.length,d=0,e=a.length;while(c>d)a[e++]=b[d++];if(c!==c)while(void 0!==b[d])a[e++]=b[d++];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=r(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(f=a[b],b=a,a=f),m.isFunction(a)?(c=d.call(arguments,2),e=function(){return a.apply(b||this,c.concat(d.call(arguments)))},e.guid=a.guid=a.guid||m.guid++,e):void 0},now:function(){return+new Date},support:k}),m.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function r(a){var b=a.length,c=m.type(a);return"function"===c||m.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var s=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=hb(),z=hb(),A=hb(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N=M.replace("w","w#"),O="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+N+"))|)"+L+"*\\]",P=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+O+")*)|.*)\\)|)",Q=new RegExp(L+"+","g"),R=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),S=new RegExp("^"+L+"*,"+L+"*"),T=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),U=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),V=new RegExp(P),W=new RegExp("^"+N+"$"),X={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+O),PSEUDO:new RegExp("^"+P),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ab=/[+~]/,bb=/'|\\/g,cb=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),db=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},eb=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(fb){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function gb(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],k=b.nodeType,"string"!=typeof a||!a||1!==k&&9!==k&&11!==k)return d;if(!e&&p){if(11!==k&&(f=_.exec(a)))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return H.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName)return H.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=1!==k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(bb,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+rb(o[l]);w=ab.test(a)&&pb(b.parentNode)||b,x=o.join(",")}if(x)try{return H.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function hb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ib(a){return a[u]=!0,a}function jb(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function kb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function lb(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function mb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function nb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function ob(a){return ib(function(b){return b=+b,ib(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function pb(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=gb.support={},f=gb.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=gb.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=g.documentElement,e=g.defaultView,e&&e!==e.top&&(e.addEventListener?e.addEventListener("unload",eb,!1):e.attachEvent&&e.attachEvent("onunload",eb)),p=!f(g),c.attributes=jb(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=jb(function(a){return a.appendChild(g.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(g.getElementsByClassName),c.getById=jb(function(a){return o.appendChild(a).id=u,!g.getElementsByName||!g.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(g.querySelectorAll))&&(jb(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\f]' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),jb(function(a){var b=g.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&jb(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",P)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===g||a.ownerDocument===v&&t(v,a)?-1:b===g||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,h=[a],i=[b];if(!e||!f)return a===g?-1:b===g?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return lb(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?lb(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},g):n},gb.matches=function(a,b){return gb(a,null,null,b)},gb.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return gb(b,n,null,[a]).length>0},gb.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},gb.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},gb.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},gb.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=gb.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=gb.selectors={cacheLength:50,createPseudo:ib,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(cb,db),a[3]=(a[3]||a[4]||a[5]||"").replace(cb,db),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||gb.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&gb.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(cb,db).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=gb.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(Q," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||gb.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ib(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ib(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?ib(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ib(function(a){return function(b){return gb(a,b).length>0}}),contains:ib(function(a){return a=a.replace(cb,db),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ib(function(a){return W.test(a||"")||gb.error("unsupported lang: "+a),a=a.replace(cb,db).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:ob(function(){return[0]}),last:ob(function(a,b){return[b-1]}),eq:ob(function(a,b,c){return[0>c?c+b:c]}),even:ob(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:ob(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:ob(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:ob(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=mb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=nb(b);function qb(){}qb.prototype=d.filters=d.pseudos,d.setFilters=new qb,g=gb.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?gb.error(a):z(a,i).slice(0)};function rb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function sb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function tb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ub(a,b,c){for(var d=0,e=b.length;e>d;d++)gb(a,b[d],c);return c}function vb(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function wb(a,b,c,d,e,f){return d&&!d[u]&&(d=wb(d)),e&&!e[u]&&(e=wb(e,f)),ib(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ub(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:vb(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=vb(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=vb(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function xb(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=sb(function(a){return a===b},h,!0),l=sb(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[sb(tb(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return wb(i>1&&tb(m),i>1&&rb(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&xb(a.slice(i,e)),f>e&&xb(a=a.slice(e)),f>e&&rb(a))}m.push(c)}return tb(m)}function yb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=F.call(i));s=vb(s)}H.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&gb.uniqueSort(i)}return k&&(w=v,j=t),r};return c?ib(f):f}return h=gb.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=xb(b[c]),f[u]?d.push(f):e.push(f);f=A(a,yb(e,d)),f.selector=a}return f},i=gb.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(cb,db),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(cb,db),ab.test(j[0].type)&&pb(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&rb(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,ab.test(a)&&pb(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=jb(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),jb(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||kb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&jb(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||kb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),jb(function(a){return null==a.getAttribute("disabled")})||kb(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),gb}(a);m.find=s,m.expr=s.selectors,m.expr[":"]=m.expr.pseudos,m.unique=s.uniqueSort,m.text=s.getText,m.isXMLDoc=s.isXML,m.contains=s.contains;var t=m.expr.match.needsContext,u=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,v=/^.[^:#\[\.,]*$/;function w(a,b,c){if(m.isFunction(b))return m.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return m.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(v.test(b))return m.filter(b,a,c);b=m.filter(b,a)}return m.grep(a,function(a){return m.inArray(a,b)>=0!==c})}m.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?m.find.matchesSelector(d,a)?[d]:[]:m.find.matches(a,m.grep(b,function(a){return 1===a.nodeType}))},m.fn.extend({find:function(a){var b,c=[],d=this,e=d.length;if("string"!=typeof a)return this.pushStack(m(a).filter(function(){for(b=0;e>b;b++)if(m.contains(d[b],this))return!0}));for(b=0;e>b;b++)m.find(a,d[b],c);return c=this.pushStack(e>1?m.unique(c):c),c.selector=this.selector?this.selector+" "+a:a,c},filter:function(a){return this.pushStack(w(this,a||[],!1))},not:function(a){return this.pushStack(w(this,a||[],!0))},is:function(a){return!!w(this,"string"==typeof a&&t.test(a)?m(a):a||[],!1).length}});var x,y=a.document,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=m.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||x).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof m?b[0]:b,m.merge(this,m.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:y,!0)),u.test(c[1])&&m.isPlainObject(b))for(c in b)m.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}if(d=y.getElementById(c[2]),d&&d.parentNode){if(d.id!==c[2])return x.find(a);this.length=1,this[0]=d}return this.context=y,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):m.isFunction(a)?"undefined"!=typeof x.ready?x.ready(a):a(m):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),m.makeArray(a,this))};A.prototype=m.fn,x=m(y);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};m.extend({dir:function(a,b,c){var d=[],e=a[b];while(e&&9!==e.nodeType&&(void 0===c||1!==e.nodeType||!m(e).is(c)))1===e.nodeType&&d.push(e),e=e[b];return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),m.fn.extend({has:function(a){var b,c=m(a,this),d=c.length;return this.filter(function(){for(b=0;d>b;b++)if(m.contains(this,c[b]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=t.test(a)||"string"!=typeof a?m(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&m.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?m.unique(f):f)},index:function(a){return a?"string"==typeof a?m.inArray(this[0],m(a)):m.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(m.unique(m.merge(this.get(),m(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){do a=a[b];while(a&&1!==a.nodeType);return a}m.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return m.dir(a,"parentNode")},parentsUntil:function(a,b,c){return m.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return m.dir(a,"nextSibling")},prevAll:function(a){return m.dir(a,"previousSibling")},nextUntil:function(a,b,c){return m.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return m.dir(a,"previousSibling",c)},siblings:function(a){return m.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return m.sibling(a.firstChild)},contents:function(a){return m.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:m.merge([],a.childNodes)}},function(a,b){m.fn[a]=function(c,d){var e=m.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=m.filter(d,e)),this.length>1&&(C[a]||(e=m.unique(e)),B.test(a)&&(e=e.reverse())),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return m.each(a.match(E)||[],function(a,c){b[c]=!0}),b}m.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):m.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(c=a.memory&&l,d=!0,f=g||0,g=0,e=h.length,b=!0;h&&e>f;f++)if(h[f].apply(l[0],l[1])===!1&&a.stopOnFalse){c=!1;break}b=!1,h&&(i?i.length&&j(i.shift()):c?h=[]:k.disable())},k={add:function(){if(h){var d=h.length;!function f(b){m.each(b,function(b,c){var d=m.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&f(c)})}(arguments),b?e=h.length:c&&(g=d,j(c))}return this},remove:function(){return h&&m.each(arguments,function(a,c){var d;while((d=m.inArray(c,h,d))>-1)h.splice(d,1),b&&(e>=d&&e--,f>=d&&f--)}),this},has:function(a){return a?m.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],e=0,this},disable:function(){return h=i=c=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,c||k.disable(),this},locked:function(){return!i},fireWith:function(a,c){return!h||d&&!i||(c=c||[],c=[a,c.slice?c.slice():c],b?i.push(c):j(c)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!d}};return k},m.extend({Deferred:function(a){var b=[["resolve","done",m.Callbacks("once memory"),"resolved"],["reject","fail",m.Callbacks("once memory"),"rejected"],["notify","progress",m.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return m.Deferred(function(c){m.each(b,function(b,f){var g=m.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&m.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?m.extend(a,d):d}},e={};return d.pipe=d.then,m.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&m.isFunction(a.promise)?e:0,g=1===f?a:m.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&m.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;m.fn.ready=function(a){return m.ready.promise().done(a),this},m.extend({isReady:!1,readyWait:1,holdReady:function(a){a?m.readyWait++:m.ready(!0)},ready:function(a){if(a===!0?!--m.readyWait:!m.isReady){if(!y.body)return setTimeout(m.ready);m.isReady=!0,a!==!0&&--m.readyWait>0||(H.resolveWith(y,[m]),m.fn.triggerHandler&&(m(y).triggerHandler("ready"),m(y).off("ready")))}}});function I(){y.addEventListener?(y.removeEventListener("DOMContentLoaded",J,!1),a.removeEventListener("load",J,!1)):(y.detachEvent("onreadystatechange",J),a.detachEvent("onload",J))}function J(){(y.addEventListener||"load"===event.type||"complete"===y.readyState)&&(I(),m.ready())}m.ready.promise=function(b){if(!H)if(H=m.Deferred(),"complete"===y.readyState)setTimeout(m.ready);else if(y.addEventListener)y.addEventListener("DOMContentLoaded",J,!1),a.addEventListener("load",J,!1);else{y.attachEvent("onreadystatechange",J),a.attachEvent("onload",J);var c=!1;try{c=null==a.frameElement&&y.documentElement}catch(d){}c&&c.doScroll&&!function e(){if(!m.isReady){try{c.doScroll("left")}catch(a){return setTimeout(e,50)}I(),m.ready()}}()}return H.promise(b)};var K="undefined",L;for(L in m(k))break;k.ownLast="0"!==L,k.inlineBlockNeedsLayout=!1,m(function(){var a,b,c,d;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",k.inlineBlockNeedsLayout=a=3===b.offsetWidth,a&&(c.style.zoom=1)),c.removeChild(d))}),function(){var a=y.createElement("div");if(null==k.deleteExpando){k.deleteExpando=!0;try{delete a.test}catch(b){k.deleteExpando=!1}}a=null}(),m.acceptData=function(a){var b=m.noData[(a.nodeName+" ").toLowerCase()],c=+a.nodeType||1;return 1!==c&&9!==c?!1:!b||b!==!0&&a.getAttribute("classid")===b};var M=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,N=/([A-Z])/g;function O(a,b,c){if(void 0===c&&1===a.nodeType){var d="data-"+b.replace(N,"-$1").toLowerCase();if(c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:M.test(c)?m.parseJSON(c):c}catch(e){}m.data(a,b,c)}else c=void 0}return c}function P(a){var b;for(b in a)if(("data"!==b||!m.isEmptyObject(a[b]))&&"toJSON"!==b)return!1;
return!0}function Q(a,b,d,e){if(m.acceptData(a)){var f,g,h=m.expando,i=a.nodeType,j=i?m.cache:a,k=i?a[h]:a[h]&&h;if(k&&j[k]&&(e||j[k].data)||void 0!==d||"string"!=typeof b)return k||(k=i?a[h]=c.pop()||m.guid++:h),j[k]||(j[k]=i?{}:{toJSON:m.noop}),("object"==typeof b||"function"==typeof b)&&(e?j[k]=m.extend(j[k],b):j[k].data=m.extend(j[k].data,b)),g=j[k],e||(g.data||(g.data={}),g=g.data),void 0!==d&&(g[m.camelCase(b)]=d),"string"==typeof b?(f=g[b],null==f&&(f=g[m.camelCase(b)])):f=g,f}}function R(a,b,c){if(m.acceptData(a)){var d,e,f=a.nodeType,g=f?m.cache:a,h=f?a[m.expando]:m.expando;if(g[h]){if(b&&(d=c?g[h]:g[h].data)){m.isArray(b)?b=b.concat(m.map(b,m.camelCase)):b in d?b=[b]:(b=m.camelCase(b),b=b in d?[b]:b.split(" ")),e=b.length;while(e--)delete d[b[e]];if(c?!P(d):!m.isEmptyObject(d))return}(c||(delete g[h].data,P(g[h])))&&(f?m.cleanData([a],!0):k.deleteExpando||g!=g.window?delete g[h]:g[h]=null)}}}m.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(a){return a=a.nodeType?m.cache[a[m.expando]]:a[m.expando],!!a&&!P(a)},data:function(a,b,c){return Q(a,b,c)},removeData:function(a,b){return R(a,b)},_data:function(a,b,c){return Q(a,b,c,!0)},_removeData:function(a,b){return R(a,b,!0)}}),m.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=m.data(f),1===f.nodeType&&!m._data(f,"parsedAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=m.camelCase(d.slice(5)),O(f,d,e[d])));m._data(f,"parsedAttrs",!0)}return e}return"object"==typeof a?this.each(function(){m.data(this,a)}):arguments.length>1?this.each(function(){m.data(this,a,b)}):f?O(f,a,m.data(f,a)):void 0},removeData:function(a){return this.each(function(){m.removeData(this,a)})}}),m.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=m._data(a,b),c&&(!d||m.isArray(c)?d=m._data(a,b,m.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=m.queue(a,b),d=c.length,e=c.shift(),f=m._queueHooks(a,b),g=function(){m.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return m._data(a,c)||m._data(a,c,{empty:m.Callbacks("once memory").add(function(){m._removeData(a,b+"queue"),m._removeData(a,c)})})}}),m.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?m.queue(this[0],a):void 0===b?this:this.each(function(){var c=m.queue(this,a,b);m._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&m.dequeue(this,a)})},dequeue:function(a){return this.each(function(){m.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=m.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=m._data(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var S=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=["Top","Right","Bottom","Left"],U=function(a,b){return a=b||a,"none"===m.css(a,"display")||!m.contains(a.ownerDocument,a)},V=m.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===m.type(c)){e=!0;for(h in c)m.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,m.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(m(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},W=/^(?:checkbox|radio)$/i;!function(){var a=y.createElement("input"),b=y.createElement("div"),c=y.createDocumentFragment();if(b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",k.leadingWhitespace=3===b.firstChild.nodeType,k.tbody=!b.getElementsByTagName("tbody").length,k.htmlSerialize=!!b.getElementsByTagName("link").length,k.html5Clone="<:nav></:nav>"!==y.createElement("nav").cloneNode(!0).outerHTML,a.type="checkbox",a.checked=!0,c.appendChild(a),k.appendChecked=a.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue,c.appendChild(b),b.innerHTML="<input type='radio' checked='checked' name='t'/>",k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,k.noCloneEvent=!0,b.attachEvent&&(b.attachEvent("onclick",function(){k.noCloneEvent=!1}),b.cloneNode(!0).click()),null==k.deleteExpando){k.deleteExpando=!0;try{delete b.test}catch(d){k.deleteExpando=!1}}}(),function(){var b,c,d=y.createElement("div");for(b in{submit:!0,change:!0,focusin:!0})c="on"+b,(k[b+"Bubbles"]=c in a)||(d.setAttribute(c,"t"),k[b+"Bubbles"]=d.attributes[c].expando===!1);d=null}();var X=/^(?:input|select|textarea)$/i,Y=/^key/,Z=/^(?:mouse|pointer|contextmenu)|click/,$=/^(?:focusinfocus|focusoutblur)$/,_=/^([^.]*)(?:\.(.+)|)$/;function ab(){return!0}function bb(){return!1}function cb(){try{return y.activeElement}catch(a){}}m.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m._data(a);if(r){c.handler&&(i=c,c=i.handler,e=i.selector),c.guid||(c.guid=m.guid++),(g=r.events)||(g=r.events={}),(k=r.handle)||(k=r.handle=function(a){return typeof m===K||a&&m.event.triggered===a.type?void 0:m.event.dispatch.apply(k.elem,arguments)},k.elem=a),b=(b||"").match(E)||[""],h=b.length;while(h--)f=_.exec(b[h])||[],o=q=f[1],p=(f[2]||"").split(".").sort(),o&&(j=m.event.special[o]||{},o=(e?j.delegateType:j.bindType)||o,j=m.event.special[o]||{},l=m.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&m.expr.match.needsContext.test(e),namespace:p.join(".")},i),(n=g[o])||(n=g[o]=[],n.delegateCount=0,j.setup&&j.setup.call(a,d,p,k)!==!1||(a.addEventListener?a.addEventListener(o,k,!1):a.attachEvent&&a.attachEvent("on"+o,k))),j.add&&(j.add.call(a,l),l.handler.guid||(l.handler.guid=c.guid)),e?n.splice(n.delegateCount++,0,l):n.push(l),m.event.global[o]=!0);a=null}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m.hasData(a)&&m._data(a);if(r&&(k=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=_.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=m.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,n=k[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),i=f=n.length;while(f--)g=n[f],!e&&q!==g.origType||c&&c.guid!==g.guid||h&&!h.test(g.namespace)||d&&d!==g.selector&&("**"!==d||!g.selector)||(n.splice(f,1),g.selector&&n.delegateCount--,l.remove&&l.remove.call(a,g));i&&!n.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||m.removeEvent(a,o,r.handle),delete k[o])}else for(o in k)m.event.remove(a,o+b[j],c,d,!0);m.isEmptyObject(k)&&(delete r.handle,m._removeData(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,n,o=[d||y],p=j.call(b,"type")?b.type:b,q=j.call(b,"namespace")?b.namespace.split("."):[];if(h=l=d=d||y,3!==d.nodeType&&8!==d.nodeType&&!$.test(p+m.event.triggered)&&(p.indexOf(".")>=0&&(q=p.split("."),p=q.shift(),q.sort()),g=p.indexOf(":")<0&&"on"+p,b=b[m.expando]?b:new m.Event(p,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=q.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:m.makeArray(c,[b]),k=m.event.special[p]||{},e||!k.trigger||k.trigger.apply(d,c)!==!1)){if(!e&&!k.noBubble&&!m.isWindow(d)){for(i=k.delegateType||p,$.test(i+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),l=h;l===(d.ownerDocument||y)&&o.push(l.defaultView||l.parentWindow||a)}n=0;while((h=o[n++])&&!b.isPropagationStopped())b.type=n>1?i:k.bindType||p,f=(m._data(h,"events")||{})[b.type]&&m._data(h,"handle"),f&&f.apply(h,c),f=g&&h[g],f&&f.apply&&m.acceptData(h)&&(b.result=f.apply(h,c),b.result===!1&&b.preventDefault());if(b.type=p,!e&&!b.isDefaultPrevented()&&(!k._default||k._default.apply(o.pop(),c)===!1)&&m.acceptData(d)&&g&&d[p]&&!m.isWindow(d)){l=d[g],l&&(d[g]=null),m.event.triggered=p;try{d[p]()}catch(r){}m.event.triggered=void 0,l&&(d[g]=l)}return b.result}},dispatch:function(a){a=m.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(m._data(this,"events")||{})[a.type]||[],k=m.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=m.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,g=0;while((e=f.handlers[g++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(e.namespace))&&(a.handleObj=e,a.data=e.data,c=((m.event.special[e.origType]||{}).handle||e.handler).apply(f.elem,i),void 0!==c&&(a.result=c)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!=this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(e=[],f=0;h>f;f++)d=b[f],c=d.selector+" ",void 0===e[c]&&(e[c]=d.needsContext?m(c,this).index(i)>=0:m.find(c,this,null,[i]).length),e[c]&&e.push(d);e.length&&g.push({elem:i,handlers:e})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},fix:function(a){if(a[m.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=Z.test(e)?this.mouseHooks:Y.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new m.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=f.srcElement||y),3===a.target.nodeType&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,g.filter?g.filter(a,f):a},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button,g=b.fromElement;return null==a.pageX&&null!=b.clientX&&(d=a.target.ownerDocument||y,e=d.documentElement,c=d.body,a.pageX=b.clientX+(e&&e.scrollLeft||c&&c.scrollLeft||0)-(e&&e.clientLeft||c&&c.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||c&&c.scrollTop||0)-(e&&e.clientTop||c&&c.clientTop||0)),!a.relatedTarget&&g&&(a.relatedTarget=g===a.target?b.toElement:g),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==cb()&&this.focus)try{return this.focus(),!1}catch(a){}},delegateType:"focusin"},blur:{trigger:function(){return this===cb()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return m.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(a){return m.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=m.extend(new m.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?m.event.trigger(e,null,b):m.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},m.removeEvent=y.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]===K&&(a[d]=null),a.detachEvent(d,c))},m.Event=function(a,b){return this instanceof m.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?ab:bb):this.type=a,b&&m.extend(this,b),this.timeStamp=a&&a.timeStamp||m.now(),void(this[m.expando]=!0)):new m.Event(a,b)},m.Event.prototype={isDefaultPrevented:bb,isPropagationStopped:bb,isImmediatePropagationStopped:bb,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=ab,a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=ab,a&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=ab,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},m.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){m.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!m.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.submitBubbles||(m.event.special.submit={setup:function(){return m.nodeName(this,"form")?!1:void m.event.add(this,"click._submit keypress._submit",function(a){var b=a.target,c=m.nodeName(b,"input")||m.nodeName(b,"button")?b.form:void 0;c&&!m._data(c,"submitBubbles")&&(m.event.add(c,"submit._submit",function(a){a._submit_bubble=!0}),m._data(c,"submitBubbles",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&m.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){return m.nodeName(this,"form")?!1:void m.event.remove(this,"._submit")}}),k.changeBubbles||(m.event.special.change={setup:function(){return X.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(m.event.add(this,"propertychange._change",function(a){"checked"===a.originalEvent.propertyName&&(this._just_changed=!0)}),m.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),m.event.simulate("change",this,a,!0)})),!1):void m.event.add(this,"beforeactivate._change",function(a){var b=a.target;X.test(b.nodeName)&&!m._data(b,"changeBubbles")&&(m.event.add(b,"change._change",function(a){!this.parentNode||a.isSimulated||a.isTrigger||m.event.simulate("change",this.parentNode,a,!0)}),m._data(b,"changeBubbles",!0))})},handle:function(a){var b=a.target;return this!==b||a.isSimulated||a.isTrigger||"radio"!==b.type&&"checkbox"!==b.type?a.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return m.event.remove(this,"._change"),!X.test(this.nodeName)}}),k.focusinBubbles||m.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){m.event.simulate(b,a.target,m.event.fix(a),!0)};m.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=m._data(d,b);e||d.addEventListener(a,c,!0),m._data(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=m._data(d,b)-1;e?m._data(d,b,e):(d.removeEventListener(a,c,!0),m._removeData(d,b))}}}),m.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(f in a)this.on(f,b,c,a[f],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=bb;else if(!d)return this;return 1===e&&(g=d,d=function(a){return m().off(a),g.apply(this,arguments)},d.guid=g.guid||(g.guid=m.guid++)),this.each(function(){m.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,m(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=bb),this.each(function(){m.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){m.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?m.event.trigger(a,b,c,!0):void 0}});function db(a){var b=eb.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}var eb="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",fb=/ jQuery\d+="(?:null|\d+)"/g,gb=new RegExp("<(?:"+eb+")[\\s/>]","i"),hb=/^\s+/,ib=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,jb=/<([\w:]+)/,kb=/<tbody/i,lb=/<|&#?\w+;/,mb=/<(?:script|style|link)/i,nb=/checked\s*(?:[^=]|=\s*.checked.)/i,ob=/^$|\/(?:java|ecma)script/i,pb=/^true\/(.*)/,qb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,rb={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:k.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},sb=db(y),tb=sb.appendChild(y.createElement("div"));rb.optgroup=rb.option,rb.tbody=rb.tfoot=rb.colgroup=rb.caption=rb.thead,rb.th=rb.td;function ub(a,b){var c,d,e=0,f=typeof a.getElementsByTagName!==K?a.getElementsByTagName(b||"*"):typeof a.querySelectorAll!==K?a.querySelectorAll(b||"*"):void 0;if(!f)for(f=[],c=a.childNodes||a;null!=(d=c[e]);e++)!b||m.nodeName(d,b)?f.push(d):m.merge(f,ub(d,b));return void 0===b||b&&m.nodeName(a,b)?m.merge([a],f):f}function vb(a){W.test(a.type)&&(a.defaultChecked=a.checked)}function wb(a,b){return m.nodeName(a,"table")&&m.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function xb(a){return a.type=(null!==m.find.attr(a,"type"))+"/"+a.type,a}function yb(a){var b=pb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function zb(a,b){for(var c,d=0;null!=(c=a[d]);d++)m._data(c,"globalEval",!b||m._data(b[d],"globalEval"))}function Ab(a,b){if(1===b.nodeType&&m.hasData(a)){var c,d,e,f=m._data(a),g=m._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;e>d;d++)m.event.add(b,c,h[c][d])}g.data&&(g.data=m.extend({},g.data))}}function Bb(a,b){var c,d,e;if(1===b.nodeType){if(c=b.nodeName.toLowerCase(),!k.noCloneEvent&&b[m.expando]){e=m._data(b);for(d in e.events)m.removeEvent(b,d,e.handle);b.removeAttribute(m.expando)}"script"===c&&b.text!==a.text?(xb(b).text=a.text,yb(b)):"object"===c?(b.parentNode&&(b.outerHTML=a.outerHTML),k.html5Clone&&a.innerHTML&&!m.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):"input"===c&&W.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):"option"===c?b.defaultSelected=b.selected=a.defaultSelected:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}}m.extend({clone:function(a,b,c){var d,e,f,g,h,i=m.contains(a.ownerDocument,a);if(k.html5Clone||m.isXMLDoc(a)||!gb.test("<"+a.nodeName+">")?f=a.cloneNode(!0):(tb.innerHTML=a.outerHTML,tb.removeChild(f=tb.firstChild)),!(k.noCloneEvent&&k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||m.isXMLDoc(a)))for(d=ub(f),h=ub(a),g=0;null!=(e=h[g]);++g)d[g]&&Bb(e,d[g]);if(b)if(c)for(h=h||ub(a),d=d||ub(f),g=0;null!=(e=h[g]);g++)Ab(e,d[g]);else Ab(a,f);return d=ub(f,"script"),d.length>0&&zb(d,!i&&ub(a,"script")),d=h=e=null,f},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,l,n=a.length,o=db(b),p=[],q=0;n>q;q++)if(f=a[q],f||0===f)if("object"===m.type(f))m.merge(p,f.nodeType?[f]:f);else if(lb.test(f)){h=h||o.appendChild(b.createElement("div")),i=(jb.exec(f)||["",""])[1].toLowerCase(),l=rb[i]||rb._default,h.innerHTML=l[1]+f.replace(ib,"<$1></$2>")+l[2],e=l[0];while(e--)h=h.lastChild;if(!k.leadingWhitespace&&hb.test(f)&&p.push(b.createTextNode(hb.exec(f)[0])),!k.tbody){f="table"!==i||kb.test(f)?"<table>"!==l[1]||kb.test(f)?0:h:h.firstChild,e=f&&f.childNodes.length;while(e--)m.nodeName(j=f.childNodes[e],"tbody")&&!j.childNodes.length&&f.removeChild(j)}m.merge(p,h.childNodes),h.textContent="";while(h.firstChild)h.removeChild(h.firstChild);h=o.lastChild}else p.push(b.createTextNode(f));h&&o.removeChild(h),k.appendChecked||m.grep(ub(p,"input"),vb),q=0;while(f=p[q++])if((!d||-1===m.inArray(f,d))&&(g=m.contains(f.ownerDocument,f),h=ub(o.appendChild(f),"script"),g&&zb(h),c)){e=0;while(f=h[e++])ob.test(f.type||"")&&c.push(f)}return h=null,o},cleanData:function(a,b){for(var d,e,f,g,h=0,i=m.expando,j=m.cache,l=k.deleteExpando,n=m.event.special;null!=(d=a[h]);h++)if((b||m.acceptData(d))&&(f=d[i],g=f&&j[f])){if(g.events)for(e in g.events)n[e]?m.event.remove(d,e):m.removeEvent(d,e,g.handle);j[f]&&(delete j[f],l?delete d[i]:typeof d.removeAttribute!==K?d.removeAttribute(i):d[i]=null,c.push(f))}}}),m.fn.extend({text:function(a){return V(this,function(a){return void 0===a?m.text(this):this.empty().append((this[0]&&this[0].ownerDocument||y).createTextNode(a))},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?m.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||m.cleanData(ub(c)),c.parentNode&&(b&&m.contains(c.ownerDocument,c)&&zb(ub(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++){1===a.nodeType&&m.cleanData(ub(a,!1));while(a.firstChild)a.removeChild(a.firstChild);a.options&&m.nodeName(a,"select")&&(a.options.length=0)}return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return m.clone(this,a,b)})},html:function(a){return V(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a)return 1===b.nodeType?b.innerHTML.replace(fb,""):void 0;if(!("string"!=typeof a||mb.test(a)||!k.htmlSerialize&&gb.test(a)||!k.leadingWhitespace&&hb.test(a)||rb[(jb.exec(a)||["",""])[1].toLowerCase()])){a=a.replace(ib,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(m.cleanData(ub(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,m.cleanData(ub(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,n=this,o=l-1,p=a[0],q=m.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&nb.test(p))return this.each(function(c){var d=n.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(i=m.buildFragment(a,this[0].ownerDocument,!1,this),c=i.firstChild,1===i.childNodes.length&&(i=c),c)){for(g=m.map(ub(i,"script"),xb),f=g.length;l>j;j++)d=i,j!==o&&(d=m.clone(d,!0,!0),f&&m.merge(g,ub(d,"script"))),b.call(this[j],d,j);if(f)for(h=g[g.length-1].ownerDocument,m.map(g,yb),j=0;f>j;j++)d=g[j],ob.test(d.type||"")&&!m._data(d,"globalEval")&&m.contains(h,d)&&(d.src?m._evalUrl&&m._evalUrl(d.src):m.globalEval((d.text||d.textContent||d.innerHTML||"").replace(qb,"")));i=c=null}return this}}),m.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){m.fn[a]=function(a){for(var c,d=0,e=[],g=m(a),h=g.length-1;h>=d;d++)c=d===h?this:this.clone(!0),m(g[d])[b](c),f.apply(e,c.get());return this.pushStack(e)}});var Cb,Db={};function Eb(b,c){var d,e=m(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:m.css(e[0],"display");return e.detach(),f}function Fb(a){var b=y,c=Db[a];return c||(c=Eb(a,b),"none"!==c&&c||(Cb=(Cb||m("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=(Cb[0].contentWindow||Cb[0].contentDocument).document,b.write(),b.close(),c=Eb(a,b),Cb.detach()),Db[a]=c),c}!function(){var a;k.shrinkWrapBlocks=function(){if(null!=a)return a;a=!1;var b,c,d;return c=y.getElementsByTagName("body")[0],c&&c.style?(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",b.appendChild(y.createElement("div")).style.width="5px",a=3!==b.offsetWidth),c.removeChild(d),a):void 0}}();var Gb=/^margin/,Hb=new RegExp("^("+S+")(?!px)[a-z%]+$","i"),Ib,Jb,Kb=/^(top|right|bottom|left)$/;a.getComputedStyle?(Ib=function(b){return b.ownerDocument.defaultView.opener?b.ownerDocument.defaultView.getComputedStyle(b,null):a.getComputedStyle(b,null)},Jb=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ib(a),g=c?c.getPropertyValue(b)||c[b]:void 0,c&&(""!==g||m.contains(a.ownerDocument,a)||(g=m.style(a,b)),Hb.test(g)&&Gb.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0===g?g:g+""}):y.documentElement.currentStyle&&(Ib=function(a){return a.currentStyle},Jb=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ib(a),g=c?c[b]:void 0,null==g&&h&&h[b]&&(g=h[b]),Hb.test(g)&&!Kb.test(b)&&(d=h.left,e=a.runtimeStyle,f=e&&e.left,f&&(e.left=a.currentStyle.left),h.left="fontSize"===b?"1em":g,g=h.pixelLeft+"px",h.left=d,f&&(e.left=f)),void 0===g?g:g+""||"auto"});function Lb(a,b){return{get:function(){var c=a();if(null!=c)return c?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d,e,f,g,h;if(b=y.createElement("div"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=d&&d.style){c.cssText="float:left;opacity:.5",k.opacity="0.5"===c.opacity,k.cssFloat=!!c.cssFloat,b.style.backgroundClip="content-box",b.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===b.style.backgroundClip,k.boxSizing=""===c.boxSizing||""===c.MozBoxSizing||""===c.WebkitBoxSizing,m.extend(k,{reliableHiddenOffsets:function(){return null==g&&i(),g},boxSizingReliable:function(){return null==f&&i(),f},pixelPosition:function(){return null==e&&i(),e},reliableMarginRight:function(){return null==h&&i(),h}});function i(){var b,c,d,i;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),b.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",e=f=!1,h=!0,a.getComputedStyle&&(e="1%"!==(a.getComputedStyle(b,null)||{}).top,f="4px"===(a.getComputedStyle(b,null)||{width:"4px"}).width,i=b.appendChild(y.createElement("div")),i.style.cssText=b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",i.style.marginRight=i.style.width="0",b.style.width="1px",h=!parseFloat((a.getComputedStyle(i,null)||{}).marginRight),b.removeChild(i)),b.innerHTML="<table><tr><td></td><td>t</td></tr></table>",i=b.getElementsByTagName("td"),i[0].style.cssText="margin:0;border:0;padding:0;display:none",g=0===i[0].offsetHeight,g&&(i[0].style.display="",i[1].style.display="none",g=0===i[0].offsetHeight),c.removeChild(d))}}}(),m.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var Mb=/alpha\([^)]*\)/i,Nb=/opacity\s*=\s*([^)]*)/,Ob=/^(none|table(?!-c[ea]).+)/,Pb=new RegExp("^("+S+")(.*)$","i"),Qb=new RegExp("^([+-])=("+S+")","i"),Rb={position:"absolute",visibility:"hidden",display:"block"},Sb={letterSpacing:"0",fontWeight:"400"},Tb=["Webkit","O","Moz","ms"];function Ub(a,b){if(b in a)return b;var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=Tb.length;while(e--)if(b=Tb[e]+c,b in a)return b;return d}function Vb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=m._data(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&U(d)&&(f[g]=m._data(d,"olddisplay",Fb(d.nodeName)))):(e=U(d),(c&&"none"!==c||!e)&&m._data(d,"olddisplay",e?c:m.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}function Wb(a,b,c){var d=Pb.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Xb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=m.css(a,c+T[f],!0,e)),d?("content"===c&&(g-=m.css(a,"padding"+T[f],!0,e)),"margin"!==c&&(g-=m.css(a,"border"+T[f]+"Width",!0,e))):(g+=m.css(a,"padding"+T[f],!0,e),"padding"!==c&&(g+=m.css(a,"border"+T[f]+"Width",!0,e)));return g}function Yb(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Ib(a),g=k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=Jb(a,b,f),(0>e||null==e)&&(e=a.style[b]),Hb.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Xb(a,b,c||(g?"border":"content"),d,f)+"px"}m.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Jb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":k.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=m.camelCase(b),i=a.style;if(b=m.cssProps[h]||(m.cssProps[h]=Ub(i,h)),g=m.cssHooks[b]||m.cssHooks[h],void 0===c)return g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b];if(f=typeof c,"string"===f&&(e=Qb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(m.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||m.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),!(g&&"set"in g&&void 0===(c=g.set(a,c,d)))))try{i[b]=c}catch(j){}}},css:function(a,b,c,d){var e,f,g,h=m.camelCase(b);return b=m.cssProps[h]||(m.cssProps[h]=Ub(a.style,h)),g=m.cssHooks[b]||m.cssHooks[h],g&&"get"in g&&(f=g.get(a,!0,c)),void 0===f&&(f=Jb(a,b,d)),"normal"===f&&b in Sb&&(f=Sb[b]),""===c||c?(e=parseFloat(f),c===!0||m.isNumeric(e)?e||0:f):f}}),m.each(["height","width"],function(a,b){m.cssHooks[b]={get:function(a,c,d){return c?Ob.test(m.css(a,"display"))&&0===a.offsetWidth?m.swap(a,Rb,function(){return Yb(a,b,d)}):Yb(a,b,d):void 0},set:function(a,c,d){var e=d&&Ib(a);return Wb(a,c,d?Xb(a,b,d,k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,e),e):0)}}}),k.opacity||(m.cssHooks.opacity={get:function(a,b){return Nb.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=m.isNumeric(b)?"alpha(opacity="+100*b+")":"",f=d&&d.filter||c.filter||"";c.zoom=1,(b>=1||""===b)&&""===m.trim(f.replace(Mb,""))&&c.removeAttribute&&(c.removeAttribute("filter"),""===b||d&&!d.filter)||(c.filter=Mb.test(f)?f.replace(Mb,e):f+" "+e)}}),m.cssHooks.marginRight=Lb(k.reliableMarginRight,function(a,b){return b?m.swap(a,{display:"inline-block"},Jb,[a,"marginRight"]):void 0}),m.each({margin:"",padding:"",border:"Width"},function(a,b){m.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+T[d]+b]=f[d]||f[d-2]||f[0];return e}},Gb.test(a)||(m.cssHooks[a+b].set=Wb)}),m.fn.extend({css:function(a,b){return V(this,function(a,b,c){var d,e,f={},g=0;if(m.isArray(b)){for(d=Ib(a),e=b.length;e>g;g++)f[b[g]]=m.css(a,b[g],!1,d);return f}return void 0!==c?m.style(a,b,c):m.css(a,b)},a,b,arguments.length>1)},show:function(){return Vb(this,!0)},hide:function(){return Vb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){U(this)?m(this).show():m(this).hide()})}});function Zb(a,b,c,d,e){return new Zb.prototype.init(a,b,c,d,e)
}m.Tween=Zb,Zb.prototype={constructor:Zb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(m.cssNumber[c]?"":"px")},cur:function(){var a=Zb.propHooks[this.prop];return a&&a.get?a.get(this):Zb.propHooks._default.get(this)},run:function(a){var b,c=Zb.propHooks[this.prop];return this.pos=b=this.options.duration?m.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Zb.propHooks._default.set(this),this}},Zb.prototype.init.prototype=Zb.prototype,Zb.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=m.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){m.fx.step[a.prop]?m.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[m.cssProps[a.prop]]||m.cssHooks[a.prop])?m.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Zb.propHooks.scrollTop=Zb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},m.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},m.fx=Zb.prototype.init,m.fx.step={};var $b,_b,ac=/^(?:toggle|show|hide)$/,bc=new RegExp("^(?:([+-])=|)("+S+")([a-z%]*)$","i"),cc=/queueHooks$/,dc=[ic],ec={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=bc.exec(b),f=e&&e[3]||(m.cssNumber[a]?"":"px"),g=(m.cssNumber[a]||"px"!==f&&+d)&&bc.exec(m.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,m.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function fc(){return setTimeout(function(){$b=void 0}),$b=m.now()}function gc(a,b){var c,d={height:a},e=0;for(b=b?1:0;4>e;e+=2-b)c=T[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function hc(a,b,c){for(var d,e=(ec[b]||[]).concat(ec["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function ic(a,b,c){var d,e,f,g,h,i,j,l,n=this,o={},p=a.style,q=a.nodeType&&U(a),r=m._data(a,"fxshow");c.queue||(h=m._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,n.always(function(){n.always(function(){h.unqueued--,m.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[p.overflow,p.overflowX,p.overflowY],j=m.css(a,"display"),l="none"===j?m._data(a,"olddisplay")||Fb(a.nodeName):j,"inline"===l&&"none"===m.css(a,"float")&&(k.inlineBlockNeedsLayout&&"inline"!==Fb(a.nodeName)?p.zoom=1:p.display="inline-block")),c.overflow&&(p.overflow="hidden",k.shrinkWrapBlocks()||n.always(function(){p.overflow=c.overflow[0],p.overflowX=c.overflow[1],p.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],ac.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(q?"hide":"show")){if("show"!==e||!r||void 0===r[d])continue;q=!0}o[d]=r&&r[d]||m.style(a,d)}else j=void 0;if(m.isEmptyObject(o))"inline"===("none"===j?Fb(a.nodeName):j)&&(p.display=j);else{r?"hidden"in r&&(q=r.hidden):r=m._data(a,"fxshow",{}),f&&(r.hidden=!q),q?m(a).show():n.done(function(){m(a).hide()}),n.done(function(){var b;m._removeData(a,"fxshow");for(b in o)m.style(a,b,o[b])});for(d in o)g=hc(q?r[d]:0,d,n),d in r||(r[d]=g.start,q&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function jc(a,b){var c,d,e,f,g;for(c in a)if(d=m.camelCase(c),e=b[d],f=a[c],m.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=m.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function kc(a,b,c){var d,e,f=0,g=dc.length,h=m.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=$b||fc(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:m.extend({},b),opts:m.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:$b||fc(),duration:c.duration,tweens:[],createTween:function(b,c){var d=m.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(jc(k,j.opts.specialEasing);g>f;f++)if(d=dc[f].call(j,a,k,j.opts))return d;return m.map(k,hc,j),m.isFunction(j.opts.start)&&j.opts.start.call(a,j),m.fx.timer(m.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}m.Animation=m.extend(kc,{tweener:function(a,b){m.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],ec[c]=ec[c]||[],ec[c].unshift(b)},prefilter:function(a,b){b?dc.unshift(a):dc.push(a)}}),m.speed=function(a,b,c){var d=a&&"object"==typeof a?m.extend({},a):{complete:c||!c&&b||m.isFunction(a)&&a,duration:a,easing:c&&b||b&&!m.isFunction(b)&&b};return d.duration=m.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in m.fx.speeds?m.fx.speeds[d.duration]:m.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){m.isFunction(d.old)&&d.old.call(this),d.queue&&m.dequeue(this,d.queue)},d},m.fn.extend({fadeTo:function(a,b,c,d){return this.filter(U).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=m.isEmptyObject(a),f=m.speed(b,c,d),g=function(){var b=kc(this,m.extend({},a),f);(e||m._data(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=m.timers,g=m._data(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&cc.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&m.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=m._data(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=m.timers,g=d?d.length:0;for(c.finish=!0,m.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),m.each(["toggle","show","hide"],function(a,b){var c=m.fn[b];m.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(gc(b,!0),a,d,e)}}),m.each({slideDown:gc("show"),slideUp:gc("hide"),slideToggle:gc("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){m.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),m.timers=[],m.fx.tick=function(){var a,b=m.timers,c=0;for($b=m.now();c<b.length;c++)a=b[c],a()||b[c]!==a||b.splice(c--,1);b.length||m.fx.stop(),$b=void 0},m.fx.timer=function(a){m.timers.push(a),a()?m.fx.start():m.timers.pop()},m.fx.interval=13,m.fx.start=function(){_b||(_b=setInterval(m.fx.tick,m.fx.interval))},m.fx.stop=function(){clearInterval(_b),_b=null},m.fx.speeds={slow:600,fast:200,_default:400},m.fn.delay=function(a,b){return a=m.fx?m.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a,b,c,d,e;b=y.createElement("div"),b.setAttribute("className","t"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=y.createElement("select"),e=c.appendChild(y.createElement("option")),a=b.getElementsByTagName("input")[0],d.style.cssText="top:1px",k.getSetAttribute="t"!==b.className,k.style=/top/.test(d.getAttribute("style")),k.hrefNormalized="/a"===d.getAttribute("href"),k.checkOn=!!a.value,k.optSelected=e.selected,k.enctype=!!y.createElement("form").enctype,c.disabled=!0,k.optDisabled=!e.disabled,a=y.createElement("input"),a.setAttribute("value",""),k.input=""===a.getAttribute("value"),a.value="t",a.setAttribute("type","radio"),k.radioValue="t"===a.value}();var lc=/\r/g;m.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=m.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,m(this).val()):a,null==e?e="":"number"==typeof e?e+="":m.isArray(e)&&(e=m.map(e,function(a){return null==a?"":a+""})),b=m.valHooks[this.type]||m.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=m.valHooks[e.type]||m.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(lc,""):null==c?"":c)}}}),m.extend({valHooks:{option:{get:function(a){var b=m.find.attr(a,"value");return null!=b?b:m.trim(m.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&m.nodeName(c.parentNode,"optgroup"))){if(b=m(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=m.makeArray(b),g=e.length;while(g--)if(d=e[g],m.inArray(m.valHooks.option.get(d),f)>=0)try{d.selected=c=!0}catch(h){d.scrollHeight}else d.selected=!1;return c||(a.selectedIndex=-1),e}}}}),m.each(["radio","checkbox"],function(){m.valHooks[this]={set:function(a,b){return m.isArray(b)?a.checked=m.inArray(m(a).val(),b)>=0:void 0}},k.checkOn||(m.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var mc,nc,oc=m.expr.attrHandle,pc=/^(?:checked|selected)$/i,qc=k.getSetAttribute,rc=k.input;m.fn.extend({attr:function(a,b){return V(this,m.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){m.removeAttr(this,a)})}}),m.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===K?m.prop(a,b,c):(1===f&&m.isXMLDoc(a)||(b=b.toLowerCase(),d=m.attrHooks[b]||(m.expr.match.bool.test(b)?nc:mc)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=m.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void m.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=m.propFix[c]||c,m.expr.match.bool.test(c)?rc&&qc||!pc.test(c)?a[d]=!1:a[m.camelCase("default-"+c)]=a[d]=!1:m.attr(a,c,""),a.removeAttribute(qc?c:d)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&m.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),nc={set:function(a,b,c){return b===!1?m.removeAttr(a,c):rc&&qc||!pc.test(c)?a.setAttribute(!qc&&m.propFix[c]||c,c):a[m.camelCase("default-"+c)]=a[c]=!0,c}},m.each(m.expr.match.bool.source.match(/\w+/g),function(a,b){var c=oc[b]||m.find.attr;oc[b]=rc&&qc||!pc.test(b)?function(a,b,d){var e,f;return d||(f=oc[b],oc[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,oc[b]=f),e}:function(a,b,c){return c?void 0:a[m.camelCase("default-"+b)]?b.toLowerCase():null}}),rc&&qc||(m.attrHooks.value={set:function(a,b,c){return m.nodeName(a,"input")?void(a.defaultValue=b):mc&&mc.set(a,b,c)}}),qc||(mc={set:function(a,b,c){var d=a.getAttributeNode(c);return d||a.setAttributeNode(d=a.ownerDocument.createAttribute(c)),d.value=b+="","value"===c||b===a.getAttribute(c)?b:void 0}},oc.id=oc.name=oc.coords=function(a,b,c){var d;return c?void 0:(d=a.getAttributeNode(b))&&""!==d.value?d.value:null},m.valHooks.button={get:function(a,b){var c=a.getAttributeNode(b);return c&&c.specified?c.value:void 0},set:mc.set},m.attrHooks.contenteditable={set:function(a,b,c){mc.set(a,""===b?!1:b,c)}},m.each(["width","height"],function(a,b){m.attrHooks[b]={set:function(a,c){return""===c?(a.setAttribute(b,"auto"),c):void 0}}})),k.style||(m.attrHooks.style={get:function(a){return a.style.cssText||void 0},set:function(a,b){return a.style.cssText=b+""}});var sc=/^(?:input|select|textarea|button|object)$/i,tc=/^(?:a|area)$/i;m.fn.extend({prop:function(a,b){return V(this,m.prop,a,b,arguments.length>1)},removeProp:function(a){return a=m.propFix[a]||a,this.each(function(){try{this[a]=void 0,delete this[a]}catch(b){}})}}),m.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!m.isXMLDoc(a),f&&(b=m.propFix[b]||b,e=m.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=m.find.attr(a,"tabindex");return b?parseInt(b,10):sc.test(a.nodeName)||tc.test(a.nodeName)&&a.href?0:-1}}}}),k.hrefNormalized||m.each(["href","src"],function(a,b){m.propHooks[b]={get:function(a){return a.getAttribute(b,4)}}}),k.optSelected||(m.propHooks.selected={get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}}),m.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){m.propFix[this.toLowerCase()]=this}),k.enctype||(m.propFix.enctype="encoding");var uc=/[\t\r\n\f]/g;m.fn.extend({addClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j="string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).addClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(uc," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=m.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j=0===arguments.length||"string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).removeClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(uc," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?m.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(m.isFunction(a)?function(c){m(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=m(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===K||"boolean"===c)&&(this.className&&m._data(this,"__className__",this.className),this.className=this.className||a===!1?"":m._data(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(uc," ").indexOf(b)>=0)return!0;return!1}}),m.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){m.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),m.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var vc=m.now(),wc=/\?/,xc=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;m.parseJSON=function(b){if(a.JSON&&a.JSON.parse)return a.JSON.parse(b+"");var c,d=null,e=m.trim(b+"");return e&&!m.trim(e.replace(xc,function(a,b,e,f){return c&&b&&(d=0),0===d?a:(c=e||b,d+=!f-!e,"")}))?Function("return "+e)():m.error("Invalid JSON: "+b)},m.parseXML=function(b){var c,d;if(!b||"string"!=typeof b)return null;try{a.DOMParser?(d=new DOMParser,c=d.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b))}catch(e){c=void 0}return c&&c.documentElement&&!c.getElementsByTagName("parsererror").length||m.error("Invalid XML: "+b),c};var yc,zc,Ac=/#.*$/,Bc=/([?&])_=[^&]*/,Cc=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Dc=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Ec=/^(?:GET|HEAD)$/,Fc=/^\/\//,Gc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Hc={},Ic={},Jc="*/".concat("*");try{zc=location.href}catch(Kc){zc=y.createElement("a"),zc.href="",zc=zc.href}yc=Gc.exec(zc.toLowerCase())||[];function Lc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(m.isFunction(c))while(d=f[e++])"+"===d.charAt(0)?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Mc(a,b,c,d){var e={},f=a===Ic;function g(h){var i;return e[h]=!0,m.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Nc(a,b){var c,d,e=m.ajaxSettings.flatOptions||{};for(d in b)void 0!==b[d]&&((e[d]?a:c||(c={}))[d]=b[d]);return c&&m.extend(!0,a,c),a}function Oc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===e&&(e=a.mimeType||b.getResponseHeader("Content-Type"));if(e)for(g in h)if(h[g]&&h[g].test(e)){i.unshift(g);break}if(i[0]in c)f=i[0];else{for(g in c){if(!i[0]||a.converters[g+" "+i[0]]){f=g;break}d||(d=g)}f=f||d}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Pc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}m.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:zc,type:"GET",isLocal:Dc.test(yc[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Jc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":m.parseJSON,"text xml":m.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Nc(Nc(a,m.ajaxSettings),b):Nc(m.ajaxSettings,a)},ajaxPrefilter:Lc(Hc),ajaxTransport:Lc(Ic),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=m.ajaxSetup({},b),l=k.context||k,n=k.context&&(l.nodeType||l.jquery)?m(l):m.event,o=m.Deferred(),p=m.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!j){j={};while(b=Cc.exec(f))j[b[1].toLowerCase()]=b[2]}b=j[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?f:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return i&&i.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||zc)+"").replace(Ac,"").replace(Fc,yc[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=m.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(c=Gc.exec(k.url.toLowerCase()),k.crossDomain=!(!c||c[1]===yc[1]&&c[2]===yc[2]&&(c[3]||("http:"===c[1]?"80":"443"))===(yc[3]||("http:"===yc[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=m.param(k.data,k.traditional)),Mc(Hc,k,b,v),2===t)return v;h=m.event&&k.global,h&&0===m.active++&&m.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!Ec.test(k.type),e=k.url,k.hasContent||(k.data&&(e=k.url+=(wc.test(e)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=Bc.test(e)?e.replace(Bc,"$1_="+vc++):e+(wc.test(e)?"&":"?")+"_="+vc++)),k.ifModified&&(m.lastModified[e]&&v.setRequestHeader("If-Modified-Since",m.lastModified[e]),m.etag[e]&&v.setRequestHeader("If-None-Match",m.etag[e])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+Jc+"; q=0.01":""):k.accepts["*"]);for(d in k.headers)v.setRequestHeader(d,k.headers[d]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(d in{success:1,error:1,complete:1})v[d](k[d]);if(i=Mc(Ic,k,b,v)){v.readyState=1,h&&n.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,i.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,c,d){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),i=void 0,f=d||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,c&&(u=Oc(k,v,c)),u=Pc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(m.lastModified[e]=w),w=v.getResponseHeader("etag"),w&&(m.etag[e]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,h&&n.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),h&&(n.trigger("ajaxComplete",[v,k]),--m.active||m.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return m.get(a,b,c,"json")},getScript:function(a,b){return m.get(a,void 0,b,"script")}}),m.each(["get","post"],function(a,b){m[b]=function(a,c,d,e){return m.isFunction(c)&&(e=e||d,d=c,c=void 0),m.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),m._evalUrl=function(a){return m.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},m.fn.extend({wrapAll:function(a){if(m.isFunction(a))return this.each(function(b){m(this).wrapAll(a.call(this,b))});if(this[0]){var b=m(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&1===a.firstChild.nodeType)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return this.each(m.isFunction(a)?function(b){m(this).wrapInner(a.call(this,b))}:function(){var b=m(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=m.isFunction(a);return this.each(function(c){m(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){m.nodeName(this,"body")||m(this).replaceWith(this.childNodes)}).end()}}),m.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0||!k.reliableHiddenOffsets()&&"none"===(a.style&&a.style.display||m.css(a,"display"))},m.expr.filters.visible=function(a){return!m.expr.filters.hidden(a)};var Qc=/%20/g,Rc=/\[\]$/,Sc=/\r?\n/g,Tc=/^(?:submit|button|image|reset|file)$/i,Uc=/^(?:input|select|textarea|keygen)/i;function Vc(a,b,c,d){var e;if(m.isArray(b))m.each(b,function(b,e){c||Rc.test(a)?d(a,e):Vc(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==m.type(b))d(a,b);else for(e in b)Vc(a+"["+e+"]",b[e],c,d)}m.param=function(a,b){var c,d=[],e=function(a,b){b=m.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=m.ajaxSettings&&m.ajaxSettings.traditional),m.isArray(a)||a.jquery&&!m.isPlainObject(a))m.each(a,function(){e(this.name,this.value)});else for(c in a)Vc(c,a[c],b,e);return d.join("&").replace(Qc,"+")},m.fn.extend({serialize:function(){return m.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=m.prop(this,"elements");return a?m.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!m(this).is(":disabled")&&Uc.test(this.nodeName)&&!Tc.test(a)&&(this.checked||!W.test(a))}).map(function(a,b){var c=m(this).val();return null==c?null:m.isArray(c)?m.map(c,function(a){return{name:b.name,value:a.replace(Sc,"\r\n")}}):{name:b.name,value:c.replace(Sc,"\r\n")}}).get()}}),m.ajaxSettings.xhr=void 0!==a.ActiveXObject?function(){return!this.isLocal&&/^(get|post|head|put|delete|options)$/i.test(this.type)&&Zc()||$c()}:Zc;var Wc=0,Xc={},Yc=m.ajaxSettings.xhr();a.attachEvent&&a.attachEvent("onunload",function(){for(var a in Xc)Xc[a](void 0,!0)}),k.cors=!!Yc&&"withCredentials"in Yc,Yc=k.ajax=!!Yc,Yc&&m.ajaxTransport(function(a){if(!a.crossDomain||k.cors){var b;return{send:function(c,d){var e,f=a.xhr(),g=++Wc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)void 0!==c[e]&&f.setRequestHeader(e,c[e]+"");f.send(a.hasContent&&a.data||null),b=function(c,e){var h,i,j;if(b&&(e||4===f.readyState))if(delete Xc[g],b=void 0,f.onreadystatechange=m.noop,e)4!==f.readyState&&f.abort();else{j={},h=f.status,"string"==typeof f.responseText&&(j.text=f.responseText);try{i=f.statusText}catch(k){i=""}h||!a.isLocal||a.crossDomain?1223===h&&(h=204):h=j.text?200:404}j&&d(h,i,j,f.getAllResponseHeaders())},a.async?4===f.readyState?setTimeout(b):f.onreadystatechange=Xc[g]=b:b()},abort:function(){b&&b(void 0,!0)}}}});function Zc(){try{return new a.XMLHttpRequest}catch(b){}}function $c(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}m.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return m.globalEval(a),a}}}),m.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),m.ajaxTransport("script",function(a){if(a.crossDomain){var b,c=y.head||m("head")[0]||y.documentElement;return{send:function(d,e){b=y.createElement("script"),b.async=!0,a.scriptCharset&&(b.charset=a.scriptCharset),b.src=a.url,b.onload=b.onreadystatechange=function(a,c){(c||!b.readyState||/loaded|complete/.test(b.readyState))&&(b.onload=b.onreadystatechange=null,b.parentNode&&b.parentNode.removeChild(b),b=null,c||e(200,"success"))},c.insertBefore(b,c.firstChild)},abort:function(){b&&b.onload(void 0,!0)}}}});var _c=[],ad=/(=)\?(?=&|$)|\?\?/;m.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=_c.pop()||m.expando+"_"+vc++;return this[a]=!0,a}}),m.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(ad.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&ad.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=m.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(ad,"$1"+e):b.jsonp!==!1&&(b.url+=(wc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||m.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,_c.push(e)),g&&m.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),m.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||y;var d=u.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=m.buildFragment([a],b,e),e&&e.length&&m(e).remove(),m.merge([],d.childNodes))};var bd=m.fn.load;m.fn.load=function(a,b,c){if("string"!=typeof a&&bd)return bd.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=m.trim(a.slice(h,a.length)),a=a.slice(0,h)),m.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(f="POST"),g.length>0&&m.ajax({url:a,type:f,dataType:"html",data:b}).done(function(a){e=arguments,g.html(d?m("<div>").append(m.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,e||[a.responseText,b,a])}),this},m.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){m.fn[b]=function(a){return this.on(b,a)}}),m.expr.filters.animated=function(a){return m.grep(m.timers,function(b){return a===b.elem}).length};var cd=a.document.documentElement;function dd(a){return m.isWindow(a)?a:9===a.nodeType?a.defaultView||a.parentWindow:!1}m.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=m.css(a,"position"),l=m(a),n={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=m.css(a,"top"),i=m.css(a,"left"),j=("absolute"===k||"fixed"===k)&&m.inArray("auto",[f,i])>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),m.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(n.top=b.top-h.top+g),null!=b.left&&(n.left=b.left-h.left+e),"using"in b?b.using.call(a,n):l.css(n)}},m.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){m.offset.setOffset(this,a,b)});var b,c,d={top:0,left:0},e=this[0],f=e&&e.ownerDocument;if(f)return b=f.documentElement,m.contains(b,e)?(typeof e.getBoundingClientRect!==K&&(d=e.getBoundingClientRect()),c=dd(f),{top:d.top+(c.pageYOffset||b.scrollTop)-(b.clientTop||0),left:d.left+(c.pageXOffset||b.scrollLeft)-(b.clientLeft||0)}):d},position:function(){if(this[0]){var a,b,c={top:0,left:0},d=this[0];return"fixed"===m.css(d,"position")?b=d.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),m.nodeName(a[0],"html")||(c=a.offset()),c.top+=m.css(a[0],"borderTopWidth",!0),c.left+=m.css(a[0],"borderLeftWidth",!0)),{top:b.top-c.top-m.css(d,"marginTop",!0),left:b.left-c.left-m.css(d,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||cd;while(a&&!m.nodeName(a,"html")&&"static"===m.css(a,"position"))a=a.offsetParent;return a||cd})}}),m.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c=/Y/.test(b);m.fn[a]=function(d){return V(this,function(a,d,e){var f=dd(a);return void 0===e?f?b in f?f[b]:f.document.documentElement[d]:a[d]:void(f?f.scrollTo(c?m(f).scrollLeft():e,c?e:m(f).scrollTop()):a[d]=e)},a,d,arguments.length,null)}}),m.each(["top","left"],function(a,b){m.cssHooks[b]=Lb(k.pixelPosition,function(a,c){return c?(c=Jb(a,b),Hb.test(c)?m(a).position()[b]+"px":c):void 0})}),m.each({Height:"height",Width:"width"},function(a,b){m.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){m.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return V(this,function(b,c,d){var e;return m.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?m.css(b,c,g):m.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),m.fn.size=function(){return this.length},m.fn.andSelf=m.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return m});var ed=a.jQuery,fd=a.$;return m.noConflict=function(b){return a.$===m&&(a.$=fd),b&&a.jQuery===m&&(a.jQuery=ed),m},typeof b===K&&(a.jQuery=a.$=m),m});

define("jQuery", (function (global) {
    return function () {
        var ret, fn;
        return ret || global.jQuery;
    };
}(this)));

/*!
 * Bootstrap v3.3.1 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")}(jQuery),+function(a){function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.1",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a(f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.1",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")&&(c.prop("checked")&&this.$element.hasClass("active")?a=!1:b.find(".active").removeClass("active")),a&&c.prop("checked",!this.$element.hasClass("active")).trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active"));a&&this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),c.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=this.sliding=this.interval=this.$active=this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.1",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c="prev"==a?-1:1,d=this.getItemIndex(b),e=(d+c)%this.$items.length;return this.$items.eq(e)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));return a>this.$items.length-1||0>a?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){return this.sliding?void 0:this.slide("next")},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i="next"==b?"first":"last",j=this;if(!f.length){if(!this.options.wrap)return;f=this.$element.find(".item")[i]()}if(f.hasClass("active"))return this.sliding=!1;var k=f[0],l=a.Event("slide.bs.carousel",{relatedTarget:k,direction:h});if(this.$element.trigger(l),!l.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var m=a(this.$indicators.children()[this.getItemIndex(f)]);m&&m.addClass("active")}var n=a.Event("slid.bs.carousel",{relatedTarget:k,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),j.sliding=!1,setTimeout(function(){j.$element.trigger(n)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(n)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&"show"==b&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a(this.options.trigger).filter('[href="#'+b.id+'"], [data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.1",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0,trigger:'[data-toggle="collapse"]'},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.find("> .panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":a.extend({},e.data(),{trigger:this});c.call(f,h)})}(jQuery),+function(a){function b(b){b&&3===b.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=c(d),f={relatedTarget:this};e.hasClass("open")&&(e.trigger(b=a.Event("hide.bs.dropdown",f)),b.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger("hidden.bs.dropdown",f)))}))}function c(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.1",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=c(e),g=f.hasClass("open");if(b(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",b);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger("shown.bs.dropdown",h)}return!1}},g.prototype.keydown=function(b){if(/(38|40|27|32)/.test(b.which)&&!/input|textarea/i.test(b.target.tagName)){var d=a(this);if(b.preventDefault(),b.stopPropagation(),!d.is(".disabled, :disabled")){var e=c(d),g=e.hasClass("open");if(!g&&27!=b.which||g&&27==b.which)return 27==b.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.divider):visible a",i=e.find('[role="menu"]'+h+', [role="listbox"]'+h);if(i.length){var j=i.index(b.target);38==b.which&&j>0&&j--,40==b.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",b).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="menu"]',g.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="listbox"]',g.prototype.keydown)}(jQuery),+function(a){function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$backdrop=this.isShown=null,this.scrollbarWidth=0,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.1",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.options.backdrop&&d.adjustBackdrop(),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in").attr("aria-hidden",!1),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$element.find(".modal-dialog").one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a('<div class="modal-backdrop '+e+'" />').prependTo(this.$element).on("click.dismiss.bs.modal",a.proxy(function(a){a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.options.backdrop&&this.adjustBackdrop(),this.adjustDialog()},c.prototype.adjustBackdrop=function(){this.$backdrop.css("height",0).css("height",this.$element[0].scrollHeight)},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){this.bodyIsOverflowing=document.body.scrollHeight>document.documentElement.clientHeight,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right","")},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b,g=f&&f.selector;(e||"destroy"!=b)&&(g?(e||d.data("bs.tooltip",e={}),e[g]||(e[g]=new c(this,f))):e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",a,b)};c.VERSION="3.3.1",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(this.options.viewport.selector||this.options.viewport);for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c&&c.$tip&&c.$tip.is(":visible")?void(c.hoverState="in"):(c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.options.container?a(this.options.container):this.$element.parent(),p=this.getPosition(o);h="bottom"==h&&k.bottom+m>p.bottom?"top":"top"==h&&k.top-m<p.top?"bottom":"right"==h&&k.right+l>p.width?"left":"left"==h&&k.left-l<p.left?"right":h,f.removeClass(n).addClass(h)}var q=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(q,h);var r=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",r).emulateTransitionEnd(c.TRANSITION_DURATION):r()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top=b.top+g,b.left=b.left+h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=this.tip(),g=a.Event("hide.bs."+this.type);return this.$element.trigger(g),g.isDefaultPrevented()?void 0:(f.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this)},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=d?{top:0,left:0}:b.offset(),g={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},h=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,g,h,f)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.width&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type)})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b,g=f&&f.selector;(e||"destroy"!=b)&&(g?(e||d.data("bs.popover",e={}),e[g]||(e[g]=new c(this,f))):e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.1",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},c.prototype.tip=function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){function b(c,d){var e=a.proxy(this.process,this);this.$body=a("body"),this.$scrollElement=a(a(c).is("body")?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",e),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.1",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b="offset",c=0;a.isWindow(this.$scrollElement[0])||(b="position",c=this.$scrollElement.scrollTop()),this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight();var d=this;this.$body.find(this.selector).map(function(){var d=a(this),e=d.data("target")||d.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[b]().top+c,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){d.offsets.push(this[0]),d.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(!e[a+1]||b<=e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.1",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})
})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=this.unpin=this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.1",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return c>e?"top":!1;if("bottom"==this.affixed)return null!=c?e+this.unpin<=f.top?!1:"bottom":a-d>=e+g?!1:"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&c>=i?"top":null!=d&&i+j>=a-d?"bottom":!1},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=a("body").height();"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);
define("bootstrap", ["jQuery"], (function (global) {
    return function () {
        var ret, fn;
        return ret || global.jQuery;
    };
}(this)));

/*
 AngularJS v1.3.7
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(M,Y,t){function T(b){return function(){var a=arguments[0],c;c="["+(b?b+":":"")+a+"] http://errors.angularjs.org/1.3.7/"+(b?b+"/":"")+a;for(a=1;a<arguments.length;a++){c=c+(1==a?"?":"&")+"p"+(a-1)+"=";var d=encodeURIComponent,e;e=arguments[a];e="function"==typeof e?e.toString().replace(/ \{[\s\S]*$/,""):"undefined"==typeof e?"undefined":"string"!=typeof e?JSON.stringify(e):e;c+=d(e)}return Error(c)}}function Sa(b){if(null==b||Ta(b))return!1;var a=b.length;return b.nodeType===
na&&a?!0:H(b)||x(b)||0===a||"number"===typeof a&&0<a&&a-1 in b}function s(b,a,c){var d,e;if(b)if(G(b))for(d in b)"prototype"==d||"length"==d||"name"==d||b.hasOwnProperty&&!b.hasOwnProperty(d)||a.call(c,b[d],d,b);else if(x(b)||Sa(b)){var f="object"!==typeof b;d=0;for(e=b.length;d<e;d++)(f||d in b)&&a.call(c,b[d],d,b)}else if(b.forEach&&b.forEach!==s)b.forEach(a,c,b);else for(d in b)b.hasOwnProperty(d)&&a.call(c,b[d],d,b);return b}function Ed(b,a,c){for(var d=Object.keys(b).sort(),e=0;e<d.length;e++)a.call(c,
b[d[e]],d[e]);return d}function kc(b){return function(a,c){b(c,a)}}function Fd(){return++nb}function lc(b,a){a?b.$$hashKey=a:delete b.$$hashKey}function z(b){for(var a=b.$$hashKey,c=1,d=arguments.length;c<d;c++){var e=arguments[c];if(e)for(var f=Object.keys(e),g=0,h=f.length;g<h;g++){var l=f[g];b[l]=e[l]}}lc(b,a);return b}function ba(b){return parseInt(b,10)}function C(){}function oa(b){return b}function da(b){return function(){return b}}function D(b){return"undefined"===typeof b}function y(b){return"undefined"!==
typeof b}function P(b){return null!==b&&"object"===typeof b}function H(b){return"string"===typeof b}function V(b){return"number"===typeof b}function pa(b){return"[object Date]"===Da.call(b)}function G(b){return"function"===typeof b}function ob(b){return"[object RegExp]"===Da.call(b)}function Ta(b){return b&&b.window===b}function Ua(b){return b&&b.$evalAsync&&b.$watch}function Va(b){return"boolean"===typeof b}function mc(b){return!(!b||!(b.nodeName||b.prop&&b.attr&&b.find))}function Gd(b){var a={};
b=b.split(",");var c;for(c=0;c<b.length;c++)a[b[c]]=!0;return a}function ua(b){return Q(b.nodeName||b[0]&&b[0].nodeName)}function Wa(b,a){var c=b.indexOf(a);0<=c&&b.splice(c,1);return a}function Ea(b,a,c,d){if(Ta(b)||Ua(b))throw Ja("cpws");if(a){if(b===a)throw Ja("cpi");c=c||[];d=d||[];if(P(b)){var e=c.indexOf(b);if(-1!==e)return d[e];c.push(b);d.push(a)}if(x(b))for(var f=a.length=0;f<b.length;f++)e=Ea(b[f],null,c,d),P(b[f])&&(c.push(b[f]),d.push(e)),a.push(e);else{var g=a.$$hashKey;x(a)?a.length=
0:s(a,function(b,c){delete a[c]});for(f in b)b.hasOwnProperty(f)&&(e=Ea(b[f],null,c,d),P(b[f])&&(c.push(b[f]),d.push(e)),a[f]=e);lc(a,g)}}else if(a=b)x(b)?a=Ea(b,[],c,d):pa(b)?a=new Date(b.getTime()):ob(b)?(a=new RegExp(b.source,b.toString().match(/[^\/]*$/)[0]),a.lastIndex=b.lastIndex):P(b)&&(e=Object.create(Object.getPrototypeOf(b)),a=Ea(b,e,c,d));return a}function qa(b,a){if(x(b)){a=a||[];for(var c=0,d=b.length;c<d;c++)a[c]=b[c]}else if(P(b))for(c in a=a||{},b)if("$"!==c.charAt(0)||"$"!==c.charAt(1))a[c]=
b[c];return a||b}function fa(b,a){if(b===a)return!0;if(null===b||null===a)return!1;if(b!==b&&a!==a)return!0;var c=typeof b,d;if(c==typeof a&&"object"==c)if(x(b)){if(!x(a))return!1;if((c=b.length)==a.length){for(d=0;d<c;d++)if(!fa(b[d],a[d]))return!1;return!0}}else{if(pa(b))return pa(a)?fa(b.getTime(),a.getTime()):!1;if(ob(b)&&ob(a))return b.toString()==a.toString();if(Ua(b)||Ua(a)||Ta(b)||Ta(a)||x(a))return!1;c={};for(d in b)if("$"!==d.charAt(0)&&!G(b[d])){if(!fa(b[d],a[d]))return!1;c[d]=!0}for(d in a)if(!c.hasOwnProperty(d)&&
"$"!==d.charAt(0)&&a[d]!==t&&!G(a[d]))return!1;return!0}return!1}function Xa(b,a,c){return b.concat(Ya.call(a,c))}function nc(b,a){var c=2<arguments.length?Ya.call(arguments,2):[];return!G(a)||a instanceof RegExp?a:c.length?function(){return arguments.length?a.apply(b,Xa(c,arguments,0)):a.apply(b,c)}:function(){return arguments.length?a.apply(b,arguments):a.call(b)}}function Hd(b,a){var c=a;"string"===typeof b&&"$"===b.charAt(0)&&"$"===b.charAt(1)?c=t:Ta(a)?c="$WINDOW":a&&Y===a?c="$DOCUMENT":Ua(a)&&
(c="$SCOPE");return c}function Za(b,a){if("undefined"===typeof b)return t;V(a)||(a=a?2:null);return JSON.stringify(b,Hd,a)}function oc(b){return H(b)?JSON.parse(b):b}function va(b){b=B(b).clone();try{b.empty()}catch(a){}var c=B("<div>").append(b).html();try{return b[0].nodeType===pb?Q(c):c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/,function(a,b){return"<"+Q(b)})}catch(d){return Q(c)}}function pc(b){try{return decodeURIComponent(b)}catch(a){}}function qc(b){var a={},c,d;s((b||"").split("&"),function(b){b&&
(c=b.replace(/\+/g,"%20").split("="),d=pc(c[0]),y(d)&&(b=y(c[1])?pc(c[1]):!0,rc.call(a,d)?x(a[d])?a[d].push(b):a[d]=[a[d],b]:a[d]=b))});return a}function Nb(b){var a=[];s(b,function(b,d){x(b)?s(b,function(b){a.push(Fa(d,!0)+(!0===b?"":"="+Fa(b,!0)))}):a.push(Fa(d,!0)+(!0===b?"":"="+Fa(b,!0)))});return a.length?a.join("&"):""}function qb(b){return Fa(b,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function Fa(b,a){return encodeURIComponent(b).replace(/%40/gi,"@").replace(/%3A/gi,
":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%3B/gi,";").replace(/%20/g,a?"%20":"+")}function Id(b,a){var c,d,e=rb.length;b=B(b);for(d=0;d<e;++d)if(c=rb[d]+a,H(c=b.attr(c)))return c;return null}function Jd(b,a){var c,d,e={};s(rb,function(a){a+="app";!c&&b.hasAttribute&&b.hasAttribute(a)&&(c=b,d=b.getAttribute(a))});s(rb,function(a){a+="app";var e;!c&&(e=b.querySelector("["+a.replace(":","\\:")+"]"))&&(c=e,d=e.getAttribute(a))});c&&(e.strictDi=null!==Id(c,"strict-di"),a(c,d?[d]:[],e))}function sc(b,
a,c){P(c)||(c={});c=z({strictDi:!1},c);var d=function(){b=B(b);if(b.injector()){var d=b[0]===Y?"document":va(b);throw Ja("btstrpd",d.replace(/</,"&lt;").replace(/>/,"&gt;"));}a=a||[];a.unshift(["$provide",function(a){a.value("$rootElement",b)}]);c.debugInfoEnabled&&a.push(["$compileProvider",function(a){a.debugInfoEnabled(!0)}]);a.unshift("ng");d=Ob(a,c.strictDi);d.invoke(["$rootScope","$rootElement","$compile","$injector",function(a,b,c,d){a.$apply(function(){b.data("$injector",d);c(b)(a)})}]);return d},
e=/^NG_ENABLE_DEBUG_INFO!/,f=/^NG_DEFER_BOOTSTRAP!/;M&&e.test(M.name)&&(c.debugInfoEnabled=!0,M.name=M.name.replace(e,""));if(M&&!f.test(M.name))return d();M.name=M.name.replace(f,"");ga.resumeBootstrap=function(b){s(b,function(b){a.push(b)});d()}}function Kd(){M.name="NG_ENABLE_DEBUG_INFO!"+M.name;M.location.reload()}function Ld(b){b=ga.element(b).injector();if(!b)throw Ja("test");return b.get("$$testability")}function tc(b,a){a=a||"_";return b.replace(Md,function(b,d){return(d?a:"")+b.toLowerCase()})}
function Nd(){var b;uc||((ra=M.jQuery)&&ra.fn.on?(B=ra,z(ra.fn,{scope:Ka.scope,isolateScope:Ka.isolateScope,controller:Ka.controller,injector:Ka.injector,inheritedData:Ka.inheritedData}),b=ra.cleanData,ra.cleanData=function(a){var c;if(Pb)Pb=!1;else for(var d=0,e;null!=(e=a[d]);d++)(c=ra._data(e,"events"))&&c.$destroy&&ra(e).triggerHandler("$destroy");b(a)}):B=R,ga.element=B,uc=!0)}function Qb(b,a,c){if(!b)throw Ja("areq",a||"?",c||"required");return b}function sb(b,a,c){c&&x(b)&&(b=b[b.length-1]);
Qb(G(b),a,"not a function, got "+(b&&"object"===typeof b?b.constructor.name||"Object":typeof b));return b}function La(b,a){if("hasOwnProperty"===b)throw Ja("badname",a);}function vc(b,a,c){if(!a)return b;a=a.split(".");for(var d,e=b,f=a.length,g=0;g<f;g++)d=a[g],b&&(b=(e=b)[d]);return!c&&G(b)?nc(e,b):b}function tb(b){var a=b[0];b=b[b.length-1];var c=[a];do{a=a.nextSibling;if(!a)break;c.push(a)}while(a!==b);return B(c)}function ha(){return Object.create(null)}function Od(b){function a(a,b,c){return a[b]||
(a[b]=c())}var c=T("$injector"),d=T("ng");b=a(b,"angular",Object);b.$$minErr=b.$$minErr||T;return a(b,"module",function(){var b={};return function(f,g,h){if("hasOwnProperty"===f)throw d("badname","module");g&&b.hasOwnProperty(f)&&(b[f]=null);return a(b,f,function(){function a(c,d,e,f){f||(f=b);return function(){f[e||"push"]([c,d,arguments]);return u}}if(!g)throw c("nomod",f);var b=[],d=[],e=[],q=a("$injector","invoke","push",d),u={_invokeQueue:b,_configBlocks:d,_runBlocks:e,requires:g,name:f,provider:a("$provide",
"provider"),factory:a("$provide","factory"),service:a("$provide","service"),value:a("$provide","value"),constant:a("$provide","constant","unshift"),animation:a("$animateProvider","register"),filter:a("$filterProvider","register"),controller:a("$controllerProvider","register"),directive:a("$compileProvider","directive"),config:q,run:function(a){e.push(a);return this}};h&&q(h);return u})}})}function Pd(b){z(b,{bootstrap:sc,copy:Ea,extend:z,equals:fa,element:B,forEach:s,injector:Ob,noop:C,bind:nc,toJson:Za,
fromJson:oc,identity:oa,isUndefined:D,isDefined:y,isString:H,isFunction:G,isObject:P,isNumber:V,isElement:mc,isArray:x,version:Qd,isDate:pa,lowercase:Q,uppercase:ub,callbacks:{counter:0},getTestability:Ld,$$minErr:T,$$csp:$a,reloadWithDebugInfo:Kd});ab=Od(M);try{ab("ngLocale")}catch(a){ab("ngLocale",[]).provider("$locale",Rd)}ab("ng",["ngLocale"],["$provide",function(a){a.provider({$$sanitizeUri:Sd});a.provider("$compile",wc).directive({a:Td,input:xc,textarea:xc,form:Ud,script:Vd,select:Wd,style:Xd,
option:Yd,ngBind:Zd,ngBindHtml:$d,ngBindTemplate:ae,ngClass:be,ngClassEven:ce,ngClassOdd:de,ngCloak:ee,ngController:fe,ngForm:ge,ngHide:he,ngIf:ie,ngInclude:je,ngInit:ke,ngNonBindable:le,ngPluralize:me,ngRepeat:ne,ngShow:oe,ngStyle:pe,ngSwitch:qe,ngSwitchWhen:re,ngSwitchDefault:se,ngOptions:te,ngTransclude:ue,ngModel:ve,ngList:we,ngChange:xe,pattern:yc,ngPattern:yc,required:zc,ngRequired:zc,minlength:Ac,ngMinlength:Ac,maxlength:Bc,ngMaxlength:Bc,ngValue:ye,ngModelOptions:ze}).directive({ngInclude:Ae}).directive(vb).directive(Cc);
a.provider({$anchorScroll:Be,$animate:Ce,$browser:De,$cacheFactory:Ee,$controller:Fe,$document:Ge,$exceptionHandler:He,$filter:Dc,$interpolate:Ie,$interval:Je,$http:Ke,$httpBackend:Le,$location:Me,$log:Ne,$parse:Oe,$rootScope:Pe,$q:Qe,$$q:Re,$sce:Se,$sceDelegate:Te,$sniffer:Ue,$templateCache:Ve,$templateRequest:We,$$testability:Xe,$timeout:Ye,$window:Ze,$$rAF:$e,$$asyncCallback:af,$$jqLite:bf})}])}function bb(b){return b.replace(cf,function(a,b,d,e){return e?d.toUpperCase():d}).replace(df,"Moz$1")}
function Ec(b){b=b.nodeType;return b===na||!b||9===b}function Fc(b,a){var c,d,e=a.createDocumentFragment(),f=[];if(Rb.test(b)){c=c||e.appendChild(a.createElement("div"));d=(ef.exec(b)||["",""])[1].toLowerCase();d=ia[d]||ia._default;c.innerHTML=d[1]+b.replace(ff,"<$1></$2>")+d[2];for(d=d[0];d--;)c=c.lastChild;f=Xa(f,c.childNodes);c=e.firstChild;c.textContent=""}else f.push(a.createTextNode(b));e.textContent="";e.innerHTML="";s(f,function(a){e.appendChild(a)});return e}function R(b){if(b instanceof
R)return b;var a;H(b)&&(b=U(b),a=!0);if(!(this instanceof R)){if(a&&"<"!=b.charAt(0))throw Sb("nosel");return new R(b)}if(a){a=Y;var c;b=(c=gf.exec(b))?[a.createElement(c[1])]:(c=Fc(b,a))?c.childNodes:[]}Gc(this,b)}function Tb(b){return b.cloneNode(!0)}function wb(b,a){a||xb(b);if(b.querySelectorAll)for(var c=b.querySelectorAll("*"),d=0,e=c.length;d<e;d++)xb(c[d])}function Hc(b,a,c,d){if(y(d))throw Sb("offargs");var e=(d=yb(b))&&d.events,f=d&&d.handle;if(f)if(a)s(a.split(" "),function(a){if(y(c)){var d=
e[a];Wa(d||[],c);if(d&&0<d.length)return}b.removeEventListener(a,f,!1);delete e[a]});else for(a in e)"$destroy"!==a&&b.removeEventListener(a,f,!1),delete e[a]}function xb(b,a){var c=b.ng339,d=c&&zb[c];d&&(a?delete d.data[a]:(d.handle&&(d.events.$destroy&&d.handle({},"$destroy"),Hc(b)),delete zb[c],b.ng339=t))}function yb(b,a){var c=b.ng339,c=c&&zb[c];a&&!c&&(b.ng339=c=++hf,c=zb[c]={events:{},data:{},handle:t});return c}function Ub(b,a,c){if(Ec(b)){var d=y(c),e=!d&&a&&!P(a),f=!a;b=(b=yb(b,!e))&&b.data;
if(d)b[a]=c;else{if(f)return b;if(e)return b&&b[a];z(b,a)}}}function Ab(b,a){return b.getAttribute?-1<(" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").indexOf(" "+a+" "):!1}function Bb(b,a){a&&b.setAttribute&&s(a.split(" "),function(a){b.setAttribute("class",U((" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").replace(" "+U(a)+" "," ")))})}function Cb(b,a){if(a&&b.setAttribute){var c=(" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ");s(a.split(" "),function(a){a=
U(a);-1===c.indexOf(" "+a+" ")&&(c+=a+" ")});b.setAttribute("class",U(c))}}function Gc(b,a){if(a)if(a.nodeType)b[b.length++]=a;else{var c=a.length;if("number"===typeof c&&a.window!==a){if(c)for(var d=0;d<c;d++)b[b.length++]=a[d]}else b[b.length++]=a}}function Ic(b,a){return Db(b,"$"+(a||"ngController")+"Controller")}function Db(b,a,c){9==b.nodeType&&(b=b.documentElement);for(a=x(a)?a:[a];b;){for(var d=0,e=a.length;d<e;d++)if((c=B.data(b,a[d]))!==t)return c;b=b.parentNode||11===b.nodeType&&b.host}}
function Jc(b){for(wb(b,!0);b.firstChild;)b.removeChild(b.firstChild)}function Kc(b,a){a||wb(b);var c=b.parentNode;c&&c.removeChild(b)}function jf(b,a){a=a||M;if("complete"===a.document.readyState)a.setTimeout(b);else B(a).on("load",b)}function Lc(b,a){var c=Eb[a.toLowerCase()];return c&&Mc[ua(b)]&&c}function kf(b,a){var c=b.nodeName;return("INPUT"===c||"TEXTAREA"===c)&&Nc[a]}function lf(b,a){var c=function(c,e){c.isDefaultPrevented=function(){return c.defaultPrevented};var f=a[e||c.type],g=f?f.length:
0;if(g){if(D(c.immediatePropagationStopped)){var h=c.stopImmediatePropagation;c.stopImmediatePropagation=function(){c.immediatePropagationStopped=!0;c.stopPropagation&&c.stopPropagation();h&&h.call(c)}}c.isImmediatePropagationStopped=function(){return!0===c.immediatePropagationStopped};1<g&&(f=qa(f));for(var l=0;l<g;l++)c.isImmediatePropagationStopped()||f[l].call(b,c)}};c.elem=b;return c}function bf(){this.$get=function(){return z(R,{hasClass:function(b,a){b.attr&&(b=b[0]);return Ab(b,a)},addClass:function(b,
a){b.attr&&(b=b[0]);return Cb(b,a)},removeClass:function(b,a){b.attr&&(b=b[0]);return Bb(b,a)}})}}function Ma(b,a){var c=b&&b.$$hashKey;if(c)return"function"===typeof c&&(c=b.$$hashKey()),c;c=typeof b;return c="function"==c||"object"==c&&null!==b?b.$$hashKey=c+":"+(a||Fd)():c+":"+b}function cb(b,a){if(a){var c=0;this.nextUid=function(){return++c}}s(b,this.put,this)}function mf(b){return(b=b.toString().replace(Oc,"").match(Pc))?"function("+(b[1]||"").replace(/[\s\r\n]+/," ")+")":"fn"}function Vb(b,
a,c){var d;if("function"===typeof b){if(!(d=b.$inject)){d=[];if(b.length){if(a)throw H(c)&&c||(c=b.name||mf(b)),Ga("strictdi",c);a=b.toString().replace(Oc,"");a=a.match(Pc);s(a[1].split(nf),function(a){a.replace(of,function(a,b,c){d.push(c)})})}b.$inject=d}}else x(b)?(a=b.length-1,sb(b[a],"fn"),d=b.slice(0,a)):sb(b,"fn",!0);return d}function Ob(b,a){function c(a){return function(b,c){if(P(b))s(b,kc(a));else return a(b,c)}}function d(a,b){La(a,"service");if(G(b)||x(b))b=q.instantiate(b);if(!b.$get)throw Ga("pget",
a);return n[a+"Provider"]=b}function e(a,b){return function(){var c=r.invoke(b,this);if(D(c))throw Ga("undef",a);return c}}function f(a,b,c){return d(a,{$get:!1!==c?e(a,b):b})}function g(a){var b=[],c;s(a,function(a){function d(a){var b,c;b=0;for(c=a.length;b<c;b++){var e=a[b],f=q.get(e[0]);f[e[1]].apply(f,e[2])}}if(!m.get(a)){m.put(a,!0);try{H(a)?(c=ab(a),b=b.concat(g(c.requires)).concat(c._runBlocks),d(c._invokeQueue),d(c._configBlocks)):G(a)?b.push(q.invoke(a)):x(a)?b.push(q.invoke(a)):sb(a,"module")}catch(e){throw x(a)&&
(a=a[a.length-1]),e.message&&e.stack&&-1==e.stack.indexOf(e.message)&&(e=e.message+"\n"+e.stack),Ga("modulerr",a,e.stack||e.message||e);}}});return b}function h(b,c){function d(a,e){if(b.hasOwnProperty(a)){if(b[a]===l)throw Ga("cdep",a+" <- "+k.join(" <- "));return b[a]}try{return k.unshift(a),b[a]=l,b[a]=c(a,e)}catch(f){throw b[a]===l&&delete b[a],f;}finally{k.shift()}}function e(b,c,f,g){"string"===typeof f&&(g=f,f=null);var k=[],h=Vb(b,a,g),l,q,n;q=0;for(l=h.length;q<l;q++){n=h[q];if("string"!==
typeof n)throw Ga("itkn",n);k.push(f&&f.hasOwnProperty(n)?f[n]:d(n,g))}x(b)&&(b=b[l]);return b.apply(c,k)}return{invoke:e,instantiate:function(a,b,c){var d=Object.create((x(a)?a[a.length-1]:a).prototype);a=e(a,d,b,c);return P(a)||G(a)?a:d},get:d,annotate:Vb,has:function(a){return n.hasOwnProperty(a+"Provider")||b.hasOwnProperty(a)}}}a=!0===a;var l={},k=[],m=new cb([],!0),n={$provide:{provider:c(d),factory:c(f),service:c(function(a,b){return f(a,["$injector",function(a){return a.instantiate(b)}])}),
value:c(function(a,b){return f(a,da(b),!1)}),constant:c(function(a,b){La(a,"constant");n[a]=b;u[a]=b}),decorator:function(a,b){var c=q.get(a+"Provider"),d=c.$get;c.$get=function(){var a=r.invoke(d,c);return r.invoke(b,null,{$delegate:a})}}}},q=n.$injector=h(n,function(a,b){ga.isString(b)&&k.push(b);throw Ga("unpr",k.join(" <- "));}),u={},r=u.$injector=h(u,function(a,b){var c=q.get(a+"Provider",b);return r.invoke(c.$get,c,t,a)});s(g(b),function(a){r.invoke(a||C)});return r}function Be(){var b=!0;this.disableAutoScrolling=
function(){b=!1};this.$get=["$window","$location","$rootScope",function(a,c,d){function e(a){var b=null;Array.prototype.some.call(a,function(a){if("a"===ua(a))return b=a,!0});return b}function f(b){if(b){b.scrollIntoView();var c;c=g.yOffset;G(c)?c=c():mc(c)?(c=c[0],c="fixed"!==a.getComputedStyle(c).position?0:c.getBoundingClientRect().bottom):V(c)||(c=0);c&&(b=b.getBoundingClientRect().top,a.scrollBy(0,b-c))}else a.scrollTo(0,0)}function g(){var a=c.hash(),b;a?(b=h.getElementById(a))?f(b):(b=e(h.getElementsByName(a)))?
f(b):"top"===a&&f(null):f(null)}var h=a.document;b&&d.$watch(function(){return c.hash()},function(a,b){a===b&&""===a||jf(function(){d.$evalAsync(g)})});return g}]}function af(){this.$get=["$$rAF","$timeout",function(b,a){return b.supported?function(a){return b(a)}:function(b){return a(b,0,!1)}}]}function pf(b,a,c,d){function e(a){try{a.apply(null,Ya.call(arguments,1))}finally{if(v--,0===v)for(;w.length;)try{w.pop()()}catch(b){c.error(b)}}}function f(a,b){(function N(){s(L,function(a){a()});J=b(N,
a)})()}function g(){h();l()}function h(){A=b.history.state;A=D(A)?null:A;fa(A,I)&&(A=I);I=A}function l(){if(E!==m.url()||F!==A)E=m.url(),F=A,s(W,function(a){a(m.url(),A)})}function k(a){try{return decodeURIComponent(a)}catch(b){return a}}var m=this,n=a[0],q=b.location,u=b.history,r=b.setTimeout,O=b.clearTimeout,p={};m.isMock=!1;var v=0,w=[];m.$$completeOutstandingRequest=e;m.$$incOutstandingRequestCount=function(){v++};m.notifyWhenNoOutstandingRequests=function(a){s(L,function(a){a()});0===v?a():
w.push(a)};var L=[],J;m.addPollFn=function(a){D(J)&&f(100,r);L.push(a);return a};var A,F,E=q.href,S=a.find("base"),X=null;h();F=A;m.url=function(a,c,e){D(e)&&(e=null);q!==b.location&&(q=b.location);u!==b.history&&(u=b.history);if(a){var f=F===e;if(E===a&&(!d.history||f))return m;var g=E&&Ha(E)===Ha(a);E=a;F=e;!d.history||g&&f?(g||(X=a),c?q.replace(a):g?(c=q,e=a.indexOf("#"),a=-1===e?"":a.substr(e+1),c.hash=a):q.href=a):(u[c?"replaceState":"pushState"](e,"",a),h(),F=A);return m}return X||q.href.replace(/%27/g,
"'")};m.state=function(){return A};var W=[],wa=!1,I=null;m.onUrlChange=function(a){if(!wa){if(d.history)B(b).on("popstate",g);B(b).on("hashchange",g);wa=!0}W.push(a);return a};m.$$checkUrlChange=l;m.baseHref=function(){var a=S.attr("href");return a?a.replace(/^(https?\:)?\/\/[^\/]*/,""):""};var ea={},y="",ca=m.baseHref();m.cookies=function(a,b){var d,e,f,g;if(a)b===t?n.cookie=encodeURIComponent(a)+"=;path="+ca+";expires=Thu, 01 Jan 1970 00:00:00 GMT":H(b)&&(d=(n.cookie=encodeURIComponent(a)+"="+encodeURIComponent(b)+
";path="+ca).length+1,4096<d&&c.warn("Cookie '"+a+"' possibly not set or overflowed because it was too large ("+d+" > 4096 bytes)!"));else{if(n.cookie!==y)for(y=n.cookie,d=y.split("; "),ea={},f=0;f<d.length;f++)e=d[f],g=e.indexOf("="),0<g&&(a=k(e.substring(0,g)),ea[a]===t&&(ea[a]=k(e.substring(g+1))));return ea}};m.defer=function(a,b){var c;v++;c=r(function(){delete p[c];e(a)},b||0);p[c]=!0;return c};m.defer.cancel=function(a){return p[a]?(delete p[a],O(a),e(C),!0):!1}}function De(){this.$get=["$window",
"$log","$sniffer","$document",function(b,a,c,d){return new pf(b,d,a,c)}]}function Ee(){this.$get=function(){function b(b,d){function e(a){a!=n&&(q?q==a&&(q=a.n):q=a,f(a.n,a.p),f(a,n),n=a,n.n=null)}function f(a,b){a!=b&&(a&&(a.p=b),b&&(b.n=a))}if(b in a)throw T("$cacheFactory")("iid",b);var g=0,h=z({},d,{id:b}),l={},k=d&&d.capacity||Number.MAX_VALUE,m={},n=null,q=null;return a[b]={put:function(a,b){if(k<Number.MAX_VALUE){var c=m[a]||(m[a]={key:a});e(c)}if(!D(b))return a in l||g++,l[a]=b,g>k&&this.remove(q.key),
b},get:function(a){if(k<Number.MAX_VALUE){var b=m[a];if(!b)return;e(b)}return l[a]},remove:function(a){if(k<Number.MAX_VALUE){var b=m[a];if(!b)return;b==n&&(n=b.p);b==q&&(q=b.n);f(b.n,b.p);delete m[a]}delete l[a];g--},removeAll:function(){l={};g=0;m={};n=q=null},destroy:function(){m=h=l=null;delete a[b]},info:function(){return z({},h,{size:g})}}}var a={};b.info=function(){var b={};s(a,function(a,e){b[e]=a.info()});return b};b.get=function(b){return a[b]};return b}}function Ve(){this.$get=["$cacheFactory",
function(b){return b("templates")}]}function wc(b,a){function c(a,b){var c=/^\s*([@&]|=(\*?))(\??)\s*(\w*)\s*$/,d={};s(a,function(a,e){var f=a.match(c);if(!f)throw ja("iscp",b,e,a);d[e]={mode:f[1][0],collection:"*"===f[2],optional:"?"===f[3],attrName:f[4]||e}});return d}var d={},e=/^\s*directive\:\s*([\w\-]+)\s+(.*)$/,f=/(([\w\-]+)(?:\:([^;]+))?;?)/,g=Gd("ngSrc,ngSrcset,src,srcset"),h=/^(?:(\^\^?)?(\?)?(\^\^?)?)?/,l=/^(on[a-z]+|formaction)$/;this.directive=function n(a,e){La(a,"directive");H(a)?(Qb(e,
"directiveFactory"),d.hasOwnProperty(a)||(d[a]=[],b.factory(a+"Directive",["$injector","$exceptionHandler",function(b,e){var f=[];s(d[a],function(d,g){try{var h=b.invoke(d);G(h)?h={compile:da(h)}:!h.compile&&h.link&&(h.compile=da(h.link));h.priority=h.priority||0;h.index=g;h.name=h.name||a;h.require=h.require||h.controller&&h.name;h.restrict=h.restrict||"EA";P(h.scope)&&(h.$$isolateBindings=c(h.scope,h.name));f.push(h)}catch(l){e(l)}});return f}])),d[a].push(e)):s(a,kc(n));return this};this.aHrefSanitizationWhitelist=
function(b){return y(b)?(a.aHrefSanitizationWhitelist(b),this):a.aHrefSanitizationWhitelist()};this.imgSrcSanitizationWhitelist=function(b){return y(b)?(a.imgSrcSanitizationWhitelist(b),this):a.imgSrcSanitizationWhitelist()};var k=!0;this.debugInfoEnabled=function(a){return y(a)?(k=a,this):k};this.$get=["$injector","$interpolate","$exceptionHandler","$templateRequest","$parse","$controller","$rootScope","$document","$sce","$animate","$$sanitizeUri",function(a,b,c,r,O,p,v,w,L,J,A){function F(a,b){try{a.addClass(b)}catch(c){}}
function E(a,b,c,d,e){a instanceof B||(a=B(a));s(a,function(b,c){b.nodeType==pb&&b.nodeValue.match(/\S+/)&&(a[c]=B(b).wrap("<span></span>").parent()[0])});var f=S(a,b,a,c,d,e);E.$$addScopeClass(a);var g=null;return function(b,c,d){Qb(b,"scope");d=d||{};var e=d.parentBoundTranscludeFn,h=d.transcludeControllers;d=d.futureParentElement;e&&e.$$boundTransclude&&(e=e.$$boundTransclude);g||(g=(d=d&&d[0])?"foreignobject"!==ua(d)&&d.toString().match(/SVG/)?"svg":"html":"html");d="html"!==g?B(Wb(g,B("<div>").append(a).html())):
c?Ka.clone.call(a):a;if(h)for(var l in h)d.data("$"+l+"Controller",h[l].instance);E.$$addScopeInfo(d,b);c&&c(d,b);f&&f(b,d,d,e);return d}}function S(a,b,c,d,e,f){function g(a,c,d,e){var f,l,k,q,n,p,w;if(r)for(w=Array(c.length),q=0;q<h.length;q+=3)f=h[q],w[f]=c[f];else w=c;q=0;for(n=h.length;q<n;)l=w[h[q++]],c=h[q++],f=h[q++],c?(c.scope?(k=a.$new(),E.$$addScopeInfo(B(l),k)):k=a,p=c.transcludeOnThisElement?X(a,c.transclude,e,c.elementTranscludeOnThisElement):!c.templateOnThisElement&&e?e:!e&&b?X(a,
b):null,c(f,k,l,d,p)):f&&f(a,l.childNodes,t,e)}for(var h=[],l,k,q,n,r,p=0;p<a.length;p++){l=new Xb;k=W(a[p],[],l,0===p?d:t,e);(f=k.length?ea(k,a[p],l,b,c,null,[],[],f):null)&&f.scope&&E.$$addScopeClass(l.$$element);l=f&&f.terminal||!(q=a[p].childNodes)||!q.length?null:S(q,f?(f.transcludeOnThisElement||!f.templateOnThisElement)&&f.transclude:b);if(f||l)h.push(p,f,l),n=!0,r=r||f;f=null}return n?g:null}function X(a,b,c,d){return function(d,e,f,g,h){d||(d=a.$new(!1,h),d.$$transcluded=!0);return b(d,e,
{parentBoundTranscludeFn:c,transcludeControllers:f,futureParentElement:g})}}function W(a,b,c,d,g){var h=c.$attr,l;switch(a.nodeType){case na:ca(b,ya(ua(a)),"E",d,g);for(var k,q,n,r=a.attributes,p=0,w=r&&r.length;p<w;p++){var O=!1,L=!1;k=r[p];l=k.name;q=U(k.value);k=ya(l);if(n=eb.test(k))l=l.replace(Rc,"").substr(8).replace(/_(.)/g,function(a,b){return b.toUpperCase()});var u=k.replace(/(Start|End)$/,"");D(u)&&k===u+"Start"&&(O=l,L=l.substr(0,l.length-5)+"end",l=l.substr(0,l.length-6));k=ya(l.toLowerCase());
h[k]=l;if(n||!c.hasOwnProperty(k))c[k]=q,Lc(a,k)&&(c[k]=!0);Oa(a,b,q,k,n);ca(b,k,"A",d,g,O,L)}a=a.className;if(H(a)&&""!==a)for(;l=f.exec(a);)k=ya(l[2]),ca(b,k,"C",d,g)&&(c[k]=U(l[3])),a=a.substr(l.index+l[0].length);break;case pb:M(b,a.nodeValue);break;case 8:try{if(l=e.exec(a.nodeValue))k=ya(l[1]),ca(b,k,"M",d,g)&&(c[k]=U(l[2]))}catch(v){}}b.sort(N);return b}function wa(a,b,c){var d=[],e=0;if(b&&a.hasAttribute&&a.hasAttribute(b)){do{if(!a)throw ja("uterdir",b,c);a.nodeType==na&&(a.hasAttribute(b)&&
e++,a.hasAttribute(c)&&e--);d.push(a);a=a.nextSibling}while(0<e)}else d.push(a);return B(d)}function I(a,b,c){return function(d,e,f,g,h){e=wa(e[0],b,c);return a(d,e,f,g,h)}}function ea(a,d,e,f,g,l,k,n,r){function w(a,b,c,d){if(a){c&&(a=I(a,c,d));a.require=K.require;a.directiveName=z;if(S===K||K.$$isolateScope)a=Z(a,{isolateScope:!0});k.push(a)}if(b){c&&(b=I(b,c,d));b.require=K.require;b.directiveName=z;if(S===K||K.$$isolateScope)b=Z(b,{isolateScope:!0});n.push(b)}}function L(a,b,c,d){var e,f="data",
g=!1,l=c,k;if(H(b)){k=b.match(h);b=b.substring(k[0].length);k[3]&&(k[1]?k[3]=null:k[1]=k[3]);"^"===k[1]?f="inheritedData":"^^"===k[1]&&(f="inheritedData",l=c.parent());"?"===k[2]&&(g=!0);e=null;d&&"data"===f&&(e=d[b])&&(e=e.instance);e=e||l[f]("$"+b+"Controller");if(!e&&!g)throw ja("ctreq",b,a);return e||null}x(b)&&(e=[],s(b,function(b){e.push(L(a,b,c,d))}));return e}function v(a,c,f,g,h){function l(a,b,c){var d;Ua(a)||(c=b,b=a,a=t);C&&(d=F);c||(c=C?W.parent():W);return h(a,b,d,c,wa)}var r,w,u,A,
F,db,W,I;d===f?(I=e,W=e.$$element):(W=B(f),I=new Xb(W,e));S&&(A=c.$new(!0));h&&(db=l,db.$$boundTransclude=h);J&&(X={},F={},s(J,function(a){var b={$scope:a===S||a.$$isolateScope?A:c,$element:W,$attrs:I,$transclude:db};u=a.controller;"@"==u&&(u=I[a.name]);b=p(u,b,!0,a.controllerAs);F[a.name]=b;C||W.data("$"+a.name+"Controller",b.instance);X[a.name]=b}));if(S){E.$$addScopeInfo(W,A,!0,!(ka&&(ka===S||ka===S.$$originalDirective)));E.$$addScopeClass(W,!0);g=X&&X[S.name];var xa=A;g&&g.identifier&&!0===S.bindToController&&
(xa=g.instance);s(A.$$isolateBindings=S.$$isolateBindings,function(a,d){var e=a.attrName,f=a.optional,g,h,l,k;switch(a.mode){case "@":I.$observe(e,function(a){xa[d]=a});I.$$observers[e].$$scope=c;I[e]&&(xa[d]=b(I[e])(c));break;case "=":if(f&&!I[e])break;h=O(I[e]);k=h.literal?fa:function(a,b){return a===b||a!==a&&b!==b};l=h.assign||function(){g=xa[d]=h(c);throw ja("nonassign",I[e],S.name);};g=xa[d]=h(c);f=function(a){k(a,xa[d])||(k(a,g)?l(c,a=xa[d]):xa[d]=a);return g=a};f.$stateful=!0;f=a.collection?
c.$watchCollection(I[e],f):c.$watch(O(I[e],f),null,h.literal);A.$on("$destroy",f);break;case "&":h=O(I[e]),xa[d]=function(a){return h(c,a)}}})}X&&(s(X,function(a){a()}),X=null);g=0;for(r=k.length;g<r;g++)w=k[g],$(w,w.isolateScope?A:c,W,I,w.require&&L(w.directiveName,w.require,W,F),db);var wa=c;S&&(S.template||null===S.templateUrl)&&(wa=A);a&&a(wa,f.childNodes,t,h);for(g=n.length-1;0<=g;g--)w=n[g],$(w,w.isolateScope?A:c,W,I,w.require&&L(w.directiveName,w.require,W,F),db)}r=r||{};for(var A=-Number.MAX_VALUE,
F,J=r.controllerDirectives,X,S=r.newIsolateScopeDirective,ka=r.templateDirective,ea=r.nonTlbTranscludeDirective,ca=!1,D=!1,C=r.hasElementTranscludeDirective,aa=e.$$element=B(d),K,z,N,Aa=f,Q,M=0,R=a.length;M<R;M++){K=a[M];var Oa=K.$$start,eb=K.$$end;Oa&&(aa=wa(d,Oa,eb));N=t;if(A>K.priority)break;if(N=K.scope)K.templateUrl||(P(N)?(Na("new/isolated scope",S||F,K,aa),S=K):Na("new/isolated scope",S,K,aa)),F=F||K;z=K.name;!K.templateUrl&&K.controller&&(N=K.controller,J=J||{},Na("'"+z+"' controller",J[z],
K,aa),J[z]=K);if(N=K.transclude)ca=!0,K.$$tlb||(Na("transclusion",ea,K,aa),ea=K),"element"==N?(C=!0,A=K.priority,N=aa,aa=e.$$element=B(Y.createComment(" "+z+": "+e[z]+" ")),d=aa[0],V(g,Ya.call(N,0),d),Aa=E(N,f,A,l&&l.name,{nonTlbTranscludeDirective:ea})):(N=B(Tb(d)).contents(),aa.empty(),Aa=E(N,f));if(K.template)if(D=!0,Na("template",ka,K,aa),ka=K,N=G(K.template)?K.template(aa,e):K.template,N=Sc(N),K.replace){l=K;N=Rb.test(N)?Tc(Wb(K.templateNamespace,U(N))):[];d=N[0];if(1!=N.length||d.nodeType!==
na)throw ja("tplrt",z,"");V(g,aa,d);R={$attr:{}};N=W(d,[],R);var ba=a.splice(M+1,a.length-(M+1));S&&y(N);a=a.concat(N).concat(ba);Qc(e,R);R=a.length}else aa.html(N);if(K.templateUrl)D=!0,Na("template",ka,K,aa),ka=K,K.replace&&(l=K),v=T(a.splice(M,a.length-M),aa,e,g,ca&&Aa,k,n,{controllerDirectives:J,newIsolateScopeDirective:S,templateDirective:ka,nonTlbTranscludeDirective:ea}),R=a.length;else if(K.compile)try{Q=K.compile(aa,e,Aa),G(Q)?w(null,Q,Oa,eb):Q&&w(Q.pre,Q.post,Oa,eb)}catch(qf){c(qf,va(aa))}K.terminal&&
(v.terminal=!0,A=Math.max(A,K.priority))}v.scope=F&&!0===F.scope;v.transcludeOnThisElement=ca;v.elementTranscludeOnThisElement=C;v.templateOnThisElement=D;v.transclude=Aa;r.hasElementTranscludeDirective=C;return v}function y(a){for(var b=0,c=a.length;b<c;b++){var d=b,e;e=z(Object.create(a[b]),{$$isolateScope:!0});a[d]=e}}function ca(b,e,f,g,h,l,k){if(e===h)return null;h=null;if(d.hasOwnProperty(e)){var q;e=a.get(e+"Directive");for(var r=0,p=e.length;r<p;r++)try{if(q=e[r],(g===t||g>q.priority)&&-1!=
q.restrict.indexOf(f)){if(l){var w={$$start:l,$$end:k};q=z(Object.create(q),w)}b.push(q);h=q}}catch(O){c(O)}}return h}function D(b){if(d.hasOwnProperty(b))for(var c=a.get(b+"Directive"),e=0,f=c.length;e<f;e++)if(b=c[e],b.multiElement)return!0;return!1}function Qc(a,b){var c=b.$attr,d=a.$attr,e=a.$$element;s(a,function(d,e){"$"!=e.charAt(0)&&(b[e]&&b[e]!==d&&(d+=("style"===e?";":" ")+b[e]),a.$set(e,d,!0,c[e]))});s(b,function(b,f){"class"==f?(F(e,b),a["class"]=(a["class"]?a["class"]+" ":"")+b):"style"==
f?(e.attr("style",e.attr("style")+";"+b),a.style=(a.style?a.style+";":"")+b):"$"==f.charAt(0)||a.hasOwnProperty(f)||(a[f]=b,d[f]=c[f])})}function T(a,b,c,d,e,f,g,h){var l=[],k,q,n=b[0],p=a.shift(),w=z({},p,{templateUrl:null,transclude:null,replace:null,$$originalDirective:p}),O=G(p.templateUrl)?p.templateUrl(b,c):p.templateUrl,u=p.templateNamespace;b.empty();r(L.getTrustedResourceUrl(O)).then(function(r){var L,v;r=Sc(r);if(p.replace){r=Rb.test(r)?Tc(Wb(u,U(r))):[];L=r[0];if(1!=r.length||L.nodeType!==
na)throw ja("tplrt",p.name,O);r={$attr:{}};V(d,b,L);var A=W(L,[],r);P(p.scope)&&y(A);a=A.concat(a);Qc(c,r)}else L=n,b.html(r);a.unshift(w);k=ea(a,L,c,e,b,p,f,g,h);s(d,function(a,c){a==L&&(d[c]=b[0])});for(q=S(b[0].childNodes,e);l.length;){r=l.shift();v=l.shift();var J=l.shift(),E=l.shift(),A=b[0];if(!r.$$destroyed){if(v!==n){var I=v.className;h.hasElementTranscludeDirective&&p.replace||(A=Tb(L));V(J,B(v),A);F(B(A),I)}v=k.transcludeOnThisElement?X(r,k.transclude,E):E;k(q,r,A,d,v)}}l=null});return function(a,
b,c,d,e){a=e;b.$$destroyed||(l?l.push(b,c,d,a):(k.transcludeOnThisElement&&(a=X(b,k.transclude,e)),k(q,b,c,d,a)))}}function N(a,b){var c=b.priority-a.priority;return 0!==c?c:a.name!==b.name?a.name<b.name?-1:1:a.index-b.index}function Na(a,b,c,d){if(b)throw ja("multidir",b.name,c.name,a,va(d));}function M(a,c){var d=b(c,!0);d&&a.push({priority:0,compile:function(a){a=a.parent();var b=!!a.length;b&&E.$$addBindingClass(a);return function(a,c){var e=c.parent();b||E.$$addBindingClass(e);E.$$addBindingInfo(e,
d.expressions);a.$watch(d,function(a){c[0].nodeValue=a})}}})}function Wb(a,b){a=Q(a||"html");switch(a){case "svg":case "math":var c=Y.createElement("div");c.innerHTML="<"+a+">"+b+"</"+a+">";return c.childNodes[0].childNodes;default:return b}}function R(a,b){if("srcdoc"==b)return L.HTML;var c=ua(a);if("xlinkHref"==b||"form"==c&&"action"==b||"img"!=c&&("src"==b||"ngSrc"==b))return L.RESOURCE_URL}function Oa(a,c,d,e,f){var h=R(a,e);f=g[e]||f;var k=b(d,!0,h,f);if(k){if("multiple"===e&&"select"===ua(a))throw ja("selmulti",
va(a));c.push({priority:100,compile:function(){return{pre:function(a,c,g){c=g.$$observers||(g.$$observers={});if(l.test(e))throw ja("nodomevents");var n=g[e];n!==d&&(k=n&&b(n,!0,h,f),d=n);k&&(g[e]=k(a),(c[e]||(c[e]=[])).$$inter=!0,(g.$$observers&&g.$$observers[e].$$scope||a).$watch(k,function(a,b){"class"===e&&a!=b?g.$updateClass(a,b):g.$set(e,a)}))}}}})}}function V(a,b,c){var d=b[0],e=b.length,f=d.parentNode,g,h;if(a)for(g=0,h=a.length;g<h;g++)if(a[g]==d){a[g++]=c;h=g+e-1;for(var k=a.length;g<k;g++,
h++)h<k?a[g]=a[h]:delete a[g];a.length-=e-1;a.context===d&&(a.context=c);break}f&&f.replaceChild(c,d);a=Y.createDocumentFragment();a.appendChild(d);B(c).data(B(d).data());ra?(Pb=!0,ra.cleanData([d])):delete B.cache[d[B.expando]];d=1;for(e=b.length;d<e;d++)f=b[d],B(f).remove(),a.appendChild(f),delete b[d];b[0]=c;b.length=1}function Z(a,b){return z(function(){return a.apply(null,arguments)},a,b)}function $(a,b,d,e,f,g){try{a(b,d,e,f,g)}catch(h){c(h,va(d))}}var Xb=function(a,b){if(b){var c=Object.keys(b),
d,e,f;d=0;for(e=c.length;d<e;d++)f=c[d],this[f]=b[f]}else this.$attr={};this.$$element=a};Xb.prototype={$normalize:ya,$addClass:function(a){a&&0<a.length&&J.addClass(this.$$element,a)},$removeClass:function(a){a&&0<a.length&&J.removeClass(this.$$element,a)},$updateClass:function(a,b){var c=Uc(a,b);c&&c.length&&J.addClass(this.$$element,c);(c=Uc(b,a))&&c.length&&J.removeClass(this.$$element,c)},$set:function(a,b,d,e){var f=this.$$element[0],g=Lc(f,a),h=kf(f,a),f=a;g?(this.$$element.prop(a,b),e=g):
h&&(this[h]=b,f=h);this[a]=b;e?this.$attr[a]=e:(e=this.$attr[a])||(this.$attr[a]=e=tc(a,"-"));g=ua(this.$$element);if("a"===g&&"href"===a||"img"===g&&"src"===a)this[a]=b=A(b,"src"===a);else if("img"===g&&"srcset"===a){for(var g="",h=U(b),k=/(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/,k=/\s/.test(h)?k:/(,)/,h=h.split(k),k=Math.floor(h.length/2),l=0;l<k;l++)var q=2*l,g=g+A(U(h[q]),!0),g=g+(" "+U(h[q+1]));h=U(h[2*l]).split(/\s/);g+=A(U(h[0]),!0);2===h.length&&(g+=" "+U(h[1]));this[a]=b=g}!1!==d&&(null===b||
b===t?this.$$element.removeAttr(e):this.$$element.attr(e,b));(a=this.$$observers)&&s(a[f],function(a){try{a(b)}catch(d){c(d)}})},$observe:function(a,b){var c=this,d=c.$$observers||(c.$$observers=ha()),e=d[a]||(d[a]=[]);e.push(b);v.$evalAsync(function(){!e.$$inter&&c.hasOwnProperty(a)&&b(c[a])});return function(){Wa(e,b)}}};var Aa=b.startSymbol(),ka=b.endSymbol(),Sc="{{"==Aa||"}}"==ka?oa:function(a){return a.replace(/\{\{/g,Aa).replace(/}}/g,ka)},eb=/^ngAttr[A-Z]/;E.$$addBindingInfo=k?function(a,b){var c=
a.data("$binding")||[];x(b)?c=c.concat(b):c.push(b);a.data("$binding",c)}:C;E.$$addBindingClass=k?function(a){F(a,"ng-binding")}:C;E.$$addScopeInfo=k?function(a,b,c,d){a.data(c?d?"$isolateScopeNoTemplate":"$isolateScope":"$scope",b)}:C;E.$$addScopeClass=k?function(a,b){F(a,b?"ng-isolate-scope":"ng-scope")}:C;return E}]}function ya(b){return bb(b.replace(Rc,""))}function Uc(b,a){var c="",d=b.split(/\s+/),e=a.split(/\s+/),f=0;a:for(;f<d.length;f++){for(var g=d[f],h=0;h<e.length;h++)if(g==e[h])continue a;
c+=(0<c.length?" ":"")+g}return c}function Tc(b){b=B(b);var a=b.length;if(1>=a)return b;for(;a--;)8===b[a].nodeType&&rf.call(b,a,1);return b}function Fe(){var b={},a=!1,c=/^(\S+)(\s+as\s+(\w+))?$/;this.register=function(a,c){La(a,"controller");P(a)?z(b,a):b[a]=c};this.allowGlobals=function(){a=!0};this.$get=["$injector","$window",function(d,e){function f(a,b,c,d){if(!a||!P(a.$scope))throw T("$controller")("noscp",d,b);a.$scope[b]=c}return function(g,h,l,k){var m,n,q;l=!0===l;k&&H(k)&&(q=k);H(g)&&
(k=g.match(c),n=k[1],q=q||k[3],g=b.hasOwnProperty(n)?b[n]:vc(h.$scope,n,!0)||(a?vc(e,n,!0):t),sb(g,n,!0));if(l)return l=(x(g)?g[g.length-1]:g).prototype,m=Object.create(l),q&&f(h,q,m,n||g.name),z(function(){d.invoke(g,m,h,n);return m},{instance:m,identifier:q});m=d.instantiate(g,h,n);q&&f(h,q,m,n||g.name);return m}}]}function Ge(){this.$get=["$window",function(b){return B(b.document)}]}function He(){this.$get=["$log",function(b){return function(a,c){b.error.apply(b,arguments)}}]}function Yb(b,a){if(H(b)){var c=
b.replace(sf,"").trim();if(c){var d=a("Content-Type");(d=d&&0===d.indexOf(Vc))||(d=(d=c.match(tf))&&uf[d[0]].test(c));d&&(b=oc(c))}}return b}function Wc(b){var a=ha(),c,d,e;if(!b)return a;s(b.split("\n"),function(b){e=b.indexOf(":");c=Q(U(b.substr(0,e)));d=U(b.substr(e+1));c&&(a[c]=a[c]?a[c]+", "+d:d)});return a}function Xc(b){var a=P(b)?b:t;return function(c){a||(a=Wc(b));return c?(c=a[Q(c)],void 0===c&&(c=null),c):a}}function Yc(b,a,c,d){if(G(d))return d(b,a,c);s(d,function(d){b=d(b,a,c)});return b}
function Ke(){var b=this.defaults={transformResponse:[Yb],transformRequest:[function(a){return P(a)&&"[object File]"!==Da.call(a)&&"[object Blob]"!==Da.call(a)&&"[object FormData]"!==Da.call(a)?Za(a):a}],headers:{common:{Accept:"application/json, text/plain, */*"},post:qa(Zb),put:qa(Zb),patch:qa(Zb)},xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN"},a=!1;this.useApplyAsync=function(b){return y(b)?(a=!!b,this):a};var c=this.interceptors=[];this.$get=["$httpBackend","$browser","$cacheFactory",
"$rootScope","$q","$injector",function(d,e,f,g,h,l){function k(a){function c(a){var b=z({},a);b.data=a.data?Yc(a.data,a.headers,a.status,e.transformResponse):a.data;a=a.status;return 200<=a&&300>a?b:h.reject(b)}function d(a){var b,c={};s(a,function(a,d){G(a)?(b=a(),null!=b&&(c[d]=b)):c[d]=a});return c}if(!ga.isObject(a))throw T("$http")("badreq",a);var e=z({method:"get",transformRequest:b.transformRequest,transformResponse:b.transformResponse},a);e.headers=function(a){var c=b.headers,e=z({},a.headers),
f,g,c=z({},c.common,c[Q(a.method)]);a:for(f in c){a=Q(f);for(g in e)if(Q(g)===a)continue a;e[f]=c[f]}return d(e)}(a);e.method=ub(e.method);var f=[function(a){var d=a.headers,e=Yc(a.data,Xc(d),t,a.transformRequest);D(e)&&s(d,function(a,b){"content-type"===Q(b)&&delete d[b]});D(a.withCredentials)&&!D(b.withCredentials)&&(a.withCredentials=b.withCredentials);return m(a,e).then(c,c)},t],g=h.when(e);for(s(u,function(a){(a.request||a.requestError)&&f.unshift(a.request,a.requestError);(a.response||a.responseError)&&
f.push(a.response,a.responseError)});f.length;){a=f.shift();var k=f.shift(),g=g.then(a,k)}g.success=function(a){g.then(function(b){a(b.data,b.status,b.headers,e)});return g};g.error=function(a){g.then(null,function(b){a(b.data,b.status,b.headers,e)});return g};return g}function m(c,f){function l(b,c,d,e){function f(){m(c,b,d,e)}F&&(200<=b&&300>b?F.put(X,[b,c,Wc(d),e]):F.remove(X));a?g.$applyAsync(f):(f(),g.$$phase||g.$apply())}function m(a,b,d,e){b=Math.max(b,0);(200<=b&&300>b?J.resolve:J.reject)({data:a,
status:b,headers:Xc(d),config:c,statusText:e})}function w(a){m(a.data,a.status,qa(a.headers()),a.statusText)}function u(){var a=k.pendingRequests.indexOf(c);-1!==a&&k.pendingRequests.splice(a,1)}var J=h.defer(),A=J.promise,F,E,s=c.headers,X=n(c.url,c.params);k.pendingRequests.push(c);A.then(u,u);!c.cache&&!b.cache||!1===c.cache||"GET"!==c.method&&"JSONP"!==c.method||(F=P(c.cache)?c.cache:P(b.cache)?b.cache:q);F&&(E=F.get(X),y(E)?E&&G(E.then)?E.then(w,w):x(E)?m(E[1],E[0],qa(E[2]),E[3]):m(E,200,{},
"OK"):F.put(X,A));D(E)&&((E=Zc(c.url)?e.cookies()[c.xsrfCookieName||b.xsrfCookieName]:t)&&(s[c.xsrfHeaderName||b.xsrfHeaderName]=E),d(c.method,X,f,l,s,c.timeout,c.withCredentials,c.responseType));return A}function n(a,b){if(!b)return a;var c=[];Ed(b,function(a,b){null===a||D(a)||(x(a)||(a=[a]),s(a,function(a){P(a)&&(a=pa(a)?a.toISOString():Za(a));c.push(Fa(b)+"="+Fa(a))}))});0<c.length&&(a+=(-1==a.indexOf("?")?"?":"&")+c.join("&"));return a}var q=f("$http"),u=[];s(c,function(a){u.unshift(H(a)?l.get(a):
l.invoke(a))});k.pendingRequests=[];(function(a){s(arguments,function(a){k[a]=function(b,c){return k(z(c||{},{method:a,url:b}))}})})("get","delete","head","jsonp");(function(a){s(arguments,function(a){k[a]=function(b,c,d){return k(z(d||{},{method:a,url:b,data:c}))}})})("post","put","patch");k.defaults=b;return k}]}function vf(){return new M.XMLHttpRequest}function Le(){this.$get=["$browser","$window","$document",function(b,a,c){return wf(b,vf,b.defer,a.angular.callbacks,c[0])}]}function wf(b,a,c,
d,e){function f(a,b,c){var f=e.createElement("script"),m=null;f.type="text/javascript";f.src=a;f.async=!0;m=function(a){f.removeEventListener("load",m,!1);f.removeEventListener("error",m,!1);e.body.removeChild(f);f=null;var g=-1,u="unknown";a&&("load"!==a.type||d[b].called||(a={type:"error"}),u=a.type,g="error"===a.type?404:200);c&&c(g,u)};f.addEventListener("load",m,!1);f.addEventListener("error",m,!1);e.body.appendChild(f);return m}return function(e,h,l,k,m,n,q,u){function r(){v&&v();w&&w.abort()}
function O(a,d,e,f,g){J!==t&&c.cancel(J);v=w=null;a(d,e,f,g);b.$$completeOutstandingRequest(C)}b.$$incOutstandingRequestCount();h=h||b.url();if("jsonp"==Q(e)){var p="_"+(d.counter++).toString(36);d[p]=function(a){d[p].data=a;d[p].called=!0};var v=f(h.replace("JSON_CALLBACK","angular.callbacks."+p),p,function(a,b){O(k,a,d[p].data,"",b);d[p]=C})}else{var w=a();w.open(e,h,!0);s(m,function(a,b){y(a)&&w.setRequestHeader(b,a)});w.onload=function(){var a=w.statusText||"",b="response"in w?w.response:w.responseText,
c=1223===w.status?204:w.status;0===c&&(c=b?200:"file"==Ba(h).protocol?404:0);O(k,c,b,w.getAllResponseHeaders(),a)};e=function(){O(k,-1,null,null,"")};w.onerror=e;w.onabort=e;q&&(w.withCredentials=!0);if(u)try{w.responseType=u}catch(L){if("json"!==u)throw L;}w.send(l||null)}if(0<n)var J=c(r,n);else n&&G(n.then)&&n.then(r)}}function Ie(){var b="{{",a="}}";this.startSymbol=function(a){return a?(b=a,this):b};this.endSymbol=function(b){return b?(a=b,this):a};this.$get=["$parse","$exceptionHandler","$sce",
function(c,d,e){function f(a){return"\\\\\\"+a}function g(f,g,u,r){function O(c){return c.replace(k,b).replace(m,a)}function p(a){try{var b=a;a=u?e.getTrusted(u,b):e.valueOf(b);var c;if(r&&!y(a))c=a;else if(null==a)c="";else{switch(typeof a){case "string":break;case "number":a=""+a;break;default:a=Za(a)}c=a}return c}catch(g){c=$b("interr",f,g.toString()),d(c)}}r=!!r;for(var v,w,L=0,J=[],A=[],F=f.length,E=[],s=[];L<F;)if(-1!=(v=f.indexOf(b,L))&&-1!=(w=f.indexOf(a,v+h)))L!==v&&E.push(O(f.substring(L,
v))),L=f.substring(v+h,w),J.push(L),A.push(c(L,p)),L=w+l,s.push(E.length),E.push("");else{L!==F&&E.push(O(f.substring(L)));break}if(u&&1<E.length)throw $b("noconcat",f);if(!g||J.length){var X=function(a){for(var b=0,c=J.length;b<c;b++){if(r&&D(a[b]))return;E[s[b]]=a[b]}return E.join("")};return z(function(a){var b=0,c=J.length,e=Array(c);try{for(;b<c;b++)e[b]=A[b](a);return X(e)}catch(g){a=$b("interr",f,g.toString()),d(a)}},{exp:f,expressions:J,$$watchDelegate:function(a,b,c){var d;return a.$watchGroup(A,
function(c,e){var f=X(c);G(b)&&b.call(this,f,c!==e?d:f,a);d=f},c)}})}}var h=b.length,l=a.length,k=new RegExp(b.replace(/./g,f),"g"),m=new RegExp(a.replace(/./g,f),"g");g.startSymbol=function(){return b};g.endSymbol=function(){return a};return g}]}function Je(){this.$get=["$rootScope","$window","$q","$$q",function(b,a,c,d){function e(e,h,l,k){var m=a.setInterval,n=a.clearInterval,q=0,u=y(k)&&!k,r=(u?d:c).defer(),O=r.promise;l=y(l)?l:0;O.then(null,null,e);O.$$intervalId=m(function(){r.notify(q++);0<
l&&q>=l&&(r.resolve(q),n(O.$$intervalId),delete f[O.$$intervalId]);u||b.$apply()},h);f[O.$$intervalId]=r;return O}var f={};e.cancel=function(b){return b&&b.$$intervalId in f?(f[b.$$intervalId].reject("canceled"),a.clearInterval(b.$$intervalId),delete f[b.$$intervalId],!0):!1};return e}]}function Rd(){this.$get=function(){return{id:"en-us",NUMBER_FORMATS:{DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{minInt:1,minFrac:0,maxFrac:3,posPre:"",posSuf:"",negPre:"-",negSuf:"",gSize:3,lgSize:3},{minInt:1,minFrac:2,
maxFrac:2,posPre:"\u00a4",posSuf:"",negPre:"(\u00a4",negSuf:")",gSize:3,lgSize:3}],CURRENCY_SYM:"$"},DATETIME_FORMATS:{MONTH:"January February March April May June July August September October November December".split(" "),SHORTMONTH:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),DAY:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),SHORTDAY:"Sun Mon Tue Wed Thu Fri Sat".split(" "),AMPMS:["AM","PM"],medium:"MMM d, y h:mm:ss a","short":"M/d/yy h:mm a",fullDate:"EEEE, MMMM d, y",
longDate:"MMMM d, y",mediumDate:"MMM d, y",shortDate:"M/d/yy",mediumTime:"h:mm:ss a",shortTime:"h:mm a"},pluralCat:function(b){return 1===b?"one":"other"}}}}function ac(b){b=b.split("/");for(var a=b.length;a--;)b[a]=qb(b[a]);return b.join("/")}function $c(b,a){var c=Ba(b);a.$$protocol=c.protocol;a.$$host=c.hostname;a.$$port=ba(c.port)||xf[c.protocol]||null}function ad(b,a){var c="/"!==b.charAt(0);c&&(b="/"+b);var d=Ba(b);a.$$path=decodeURIComponent(c&&"/"===d.pathname.charAt(0)?d.pathname.substring(1):
d.pathname);a.$$search=qc(d.search);a.$$hash=decodeURIComponent(d.hash);a.$$path&&"/"!=a.$$path.charAt(0)&&(a.$$path="/"+a.$$path)}function za(b,a){if(0===a.indexOf(b))return a.substr(b.length)}function Ha(b){var a=b.indexOf("#");return-1==a?b:b.substr(0,a)}function bd(b){return b.replace(/(#.+)|#$/,"$1")}function bc(b){return b.substr(0,Ha(b).lastIndexOf("/")+1)}function cc(b,a){this.$$html5=!0;a=a||"";var c=bc(b);$c(b,this);this.$$parse=function(a){var b=za(c,a);if(!H(b))throw Fb("ipthprfx",a,c);
ad(b,this);this.$$path||(this.$$path="/");this.$$compose()};this.$$compose=function(){var a=Nb(this.$$search),b=this.$$hash?"#"+qb(this.$$hash):"";this.$$url=ac(this.$$path)+(a?"?"+a:"")+b;this.$$absUrl=c+this.$$url.substr(1)};this.$$parseLinkUrl=function(d,e){if(e&&"#"===e[0])return this.hash(e.slice(1)),!0;var f,g;(f=za(b,d))!==t?(g=f,g=(f=za(a,f))!==t?c+(za("/",f)||f):b+g):(f=za(c,d))!==t?g=c+f:c==d+"/"&&(g=c);g&&this.$$parse(g);return!!g}}function dc(b,a){var c=bc(b);$c(b,this);this.$$parse=function(d){d=
za(b,d)||za(c,d);var e;"#"===d.charAt(0)?(e=za(a,d),D(e)&&(e=d)):e=this.$$html5?d:"";ad(e,this);d=this.$$path;var f=/^\/[A-Z]:(\/.*)/;0===e.indexOf(b)&&(e=e.replace(b,""));f.exec(e)||(d=(e=f.exec(d))?e[1]:d);this.$$path=d;this.$$compose()};this.$$compose=function(){var c=Nb(this.$$search),e=this.$$hash?"#"+qb(this.$$hash):"";this.$$url=ac(this.$$path)+(c?"?"+c:"")+e;this.$$absUrl=b+(this.$$url?a+this.$$url:"")};this.$$parseLinkUrl=function(a,c){return Ha(b)==Ha(a)?(this.$$parse(a),!0):!1}}function cd(b,
a){this.$$html5=!0;dc.apply(this,arguments);var c=bc(b);this.$$parseLinkUrl=function(d,e){if(e&&"#"===e[0])return this.hash(e.slice(1)),!0;var f,g;b==Ha(d)?f=d:(g=za(c,d))?f=b+a+g:c===d+"/"&&(f=c);f&&this.$$parse(f);return!!f};this.$$compose=function(){var c=Nb(this.$$search),e=this.$$hash?"#"+qb(this.$$hash):"";this.$$url=ac(this.$$path)+(c?"?"+c:"")+e;this.$$absUrl=b+a+this.$$url}}function Gb(b){return function(){return this[b]}}function dd(b,a){return function(c){if(D(c))return this[b];this[b]=
a(c);this.$$compose();return this}}function Me(){var b="",a={enabled:!1,requireBase:!0,rewriteLinks:!0};this.hashPrefix=function(a){return y(a)?(b=a,this):b};this.html5Mode=function(b){return Va(b)?(a.enabled=b,this):P(b)?(Va(b.enabled)&&(a.enabled=b.enabled),Va(b.requireBase)&&(a.requireBase=b.requireBase),Va(b.rewriteLinks)&&(a.rewriteLinks=b.rewriteLinks),this):a};this.$get=["$rootScope","$browser","$sniffer","$rootElement","$window",function(c,d,e,f,g){function h(a,b,c){var e=k.url(),f=k.$$state;
try{d.url(a,b,c),k.$$state=d.state()}catch(g){throw k.url(e),k.$$state=f,g;}}function l(a,b){c.$broadcast("$locationChangeSuccess",k.absUrl(),a,k.$$state,b)}var k,m;m=d.baseHref();var n=d.url(),q;if(a.enabled){if(!m&&a.requireBase)throw Fb("nobase");q=n.substring(0,n.indexOf("/",n.indexOf("//")+2))+(m||"/");m=e.history?cc:cd}else q=Ha(n),m=dc;k=new m(q,"#"+b);k.$$parseLinkUrl(n,n);k.$$state=d.state();var u=/^\s*(javascript|mailto):/i;f.on("click",function(b){if(a.rewriteLinks&&!b.ctrlKey&&!b.metaKey&&
2!=b.which){for(var e=B(b.target);"a"!==ua(e[0]);)if(e[0]===f[0]||!(e=e.parent())[0])return;var h=e.prop("href"),l=e.attr("href")||e.attr("xlink:href");P(h)&&"[object SVGAnimatedString]"===h.toString()&&(h=Ba(h.animVal).href);u.test(h)||!h||e.attr("target")||b.isDefaultPrevented()||!k.$$parseLinkUrl(h,l)||(b.preventDefault(),k.absUrl()!=d.url()&&(c.$apply(),g.angular["ff-684208-preventDefault"]=!0))}});k.absUrl()!=n&&d.url(k.absUrl(),!0);var r=!0;d.onUrlChange(function(a,b){c.$evalAsync(function(){var d=
k.absUrl(),e=k.$$state,f;k.$$parse(a);k.$$state=b;f=c.$broadcast("$locationChangeStart",a,d,b,e).defaultPrevented;k.absUrl()===a&&(f?(k.$$parse(d),k.$$state=e,h(d,!1,e)):(r=!1,l(d,e)))});c.$$phase||c.$digest()});c.$watch(function(){var a=bd(d.url()),b=bd(k.absUrl()),f=d.state(),g=k.$$replace,q=a!==b||k.$$html5&&e.history&&f!==k.$$state;if(r||q)r=!1,c.$evalAsync(function(){var b=k.absUrl(),d=c.$broadcast("$locationChangeStart",b,a,k.$$state,f).defaultPrevented;k.absUrl()===b&&(d?(k.$$parse(a),k.$$state=
f):(q&&h(b,g,f===k.$$state?null:k.$$state),l(a,f)))});k.$$replace=!1});return k}]}function Ne(){var b=!0,a=this;this.debugEnabled=function(a){return y(a)?(b=a,this):b};this.$get=["$window",function(c){function d(a){a instanceof Error&&(a.stack?a=a.message&&-1===a.stack.indexOf(a.message)?"Error: "+a.message+"\n"+a.stack:a.stack:a.sourceURL&&(a=a.message+"\n"+a.sourceURL+":"+a.line));return a}function e(a){var b=c.console||{},e=b[a]||b.log||C;a=!1;try{a=!!e.apply}catch(l){}return a?function(){var a=
[];s(arguments,function(b){a.push(d(b))});return e.apply(b,a)}:function(a,b){e(a,null==b?"":b)}}return{log:e("log"),info:e("info"),warn:e("warn"),error:e("error"),debug:function(){var c=e("debug");return function(){b&&c.apply(a,arguments)}}()}}]}function sa(b,a){if("__defineGetter__"===b||"__defineSetter__"===b||"__lookupGetter__"===b||"__lookupSetter__"===b||"__proto__"===b)throw la("isecfld",a);return b}function ta(b,a){if(b){if(b.constructor===b)throw la("isecfn",a);if(b.window===b)throw la("isecwindow",
a);if(b.children&&(b.nodeName||b.prop&&b.attr&&b.find))throw la("isecdom",a);if(b===Object)throw la("isecobj",a);}return b}function ec(b){return b.constant}function fb(b,a,c,d){ta(b,d);a=a.split(".");for(var e,f=0;1<a.length;f++){e=sa(a.shift(),d);var g=ta(b[e],d);g||(g={},b[e]=g);b=g}e=sa(a.shift(),d);ta(b[e],d);return b[e]=c}function Pa(b){return"constructor"==b}function ed(b,a,c,d,e,f,g){sa(b,f);sa(a,f);sa(c,f);sa(d,f);sa(e,f);var h=function(a){return ta(a,f)},l=g||Pa(b)?h:oa,k=g||Pa(a)?h:oa,m=
g||Pa(c)?h:oa,n=g||Pa(d)?h:oa,q=g||Pa(e)?h:oa;return function(f,g){var h=g&&g.hasOwnProperty(b)?g:f;if(null==h)return h;h=l(h[b]);if(!a)return h;if(null==h)return t;h=k(h[a]);if(!c)return h;if(null==h)return t;h=m(h[c]);if(!d)return h;if(null==h)return t;h=n(h[d]);return e?null==h?t:h=q(h[e]):h}}function yf(b,a){return function(c,d){return b(c,d,ta,a)}}function zf(b,a,c){var d=a.expensiveChecks,e=d?Af:Bf,f=e[b];if(f)return f;var g=b.split("."),h=g.length;if(a.csp)f=6>h?ed(g[0],g[1],g[2],g[3],g[4],
c,d):function(a,b){var e=0,f;do f=ed(g[e++],g[e++],g[e++],g[e++],g[e++],c,d)(a,b),b=t,a=f;while(e<h);return f};else{var l="";d&&(l+="s = eso(s, fe);\nl = eso(l, fe);\n");var k=d;s(g,function(a,b){sa(a,c);var e=(b?"s":'((l&&l.hasOwnProperty("'+a+'"))?l:s)')+"."+a;if(d||Pa(a))e="eso("+e+", fe)",k=!0;l+="if(s == null) return undefined;\ns="+e+";\n"});l+="return s;";a=new Function("s","l","eso","fe",l);a.toString=da(l);k&&(a=yf(a,c));f=a}f.sharedGetter=!0;f.assign=function(a,c){return fb(a,b,c,b)};return e[b]=
f}function fc(b){return G(b.valueOf)?b.valueOf():Cf.call(b)}function Oe(){var b=ha(),a=ha();this.$get=["$filter","$sniffer",function(c,d){function e(a){var b=a;a.sharedGetter&&(b=function(b,c){return a(b,c)},b.literal=a.literal,b.constant=a.constant,b.assign=a.assign);return b}function f(a,b){for(var c=0,d=a.length;c<d;c++){var e=a[c];e.constant||(e.inputs?f(e.inputs,b):-1===b.indexOf(e)&&b.push(e))}return b}function g(a,b){return null==a||null==b?a===b:"object"===typeof a&&(a=fc(a),"object"===typeof a)?
!1:a===b||a!==a&&b!==b}function h(a,b,c,d){var e=d.$$inputs||(d.$$inputs=f(d.inputs,[])),h;if(1===e.length){var l=g,e=e[0];return a.$watch(function(a){var b=e(a);g(b,l)||(h=d(a),l=b&&fc(b));return h},b,c)}for(var k=[],q=0,n=e.length;q<n;q++)k[q]=g;return a.$watch(function(a){for(var b=!1,c=0,f=e.length;c<f;c++){var l=e[c](a);if(b||(b=!g(l,k[c])))k[c]=l&&fc(l)}b&&(h=d(a));return h},b,c)}function l(a,b,c,d){var e,f;return e=a.$watch(function(a){return d(a)},function(a,c,d){f=a;G(b)&&b.apply(this,arguments);
y(a)&&d.$$postDigest(function(){y(f)&&e()})},c)}function k(a,b,c,d){function e(a){var b=!0;s(a,function(a){y(a)||(b=!1)});return b}var f,g;return f=a.$watch(function(a){return d(a)},function(a,c,d){g=a;G(b)&&b.call(this,a,c,d);e(a)&&d.$$postDigest(function(){e(g)&&f()})},c)}function m(a,b,c,d){var e;return e=a.$watch(function(a){return d(a)},function(a,c,d){G(b)&&b.apply(this,arguments);e()},c)}function n(a,b){if(!b)return a;var c=a.$$watchDelegate,c=c!==k&&c!==l?function(c,d){var e=a(c,d);return b(e,
c,d)}:function(c,d){var e=a(c,d),f=b(e,c,d);return y(e)?f:e};a.$$watchDelegate&&a.$$watchDelegate!==h?c.$$watchDelegate=a.$$watchDelegate:b.$stateful||(c.$$watchDelegate=h,c.inputs=[a]);return c}var q={csp:d.csp,expensiveChecks:!1},u={csp:d.csp,expensiveChecks:!0};return function(d,f,g){var v,w,L;switch(typeof d){case "string":L=d=d.trim();var J=g?a:b;v=J[L];v||(":"===d.charAt(0)&&":"===d.charAt(1)&&(w=!0,d=d.substring(2)),g=g?u:q,v=new gc(g),v=(new gb(v,c,g)).parse(d),v.constant?v.$$watchDelegate=
m:w?(v=e(v),v.$$watchDelegate=v.literal?k:l):v.inputs&&(v.$$watchDelegate=h),J[L]=v);return n(v,f);case "function":return n(d,f);default:return n(C,f)}}}]}function Qe(){this.$get=["$rootScope","$exceptionHandler",function(b,a){return fd(function(a){b.$evalAsync(a)},a)}]}function Re(){this.$get=["$browser","$exceptionHandler",function(b,a){return fd(function(a){b.defer(a)},a)}]}function fd(b,a){function c(a,b,c){function d(b){return function(c){e||(e=!0,b.call(a,c))}}var e=!1;return[d(b),d(c)]}function d(){this.$$state=
{status:0}}function e(a,b){return function(c){b.call(a,c)}}function f(c){!c.processScheduled&&c.pending&&(c.processScheduled=!0,b(function(){var b,d,e;e=c.pending;c.processScheduled=!1;c.pending=t;for(var f=0,g=e.length;f<g;++f){d=e[f][0];b=e[f][c.status];try{G(b)?d.resolve(b(c.value)):1===c.status?d.resolve(c.value):d.reject(c.value)}catch(h){d.reject(h),a(h)}}}))}function g(){this.promise=new d;this.resolve=e(this,this.resolve);this.reject=e(this,this.reject);this.notify=e(this,this.notify)}var h=
T("$q",TypeError);d.prototype={then:function(a,b,c){var d=new g;this.$$state.pending=this.$$state.pending||[];this.$$state.pending.push([d,a,b,c]);0<this.$$state.status&&f(this.$$state);return d.promise},"catch":function(a){return this.then(null,a)},"finally":function(a,b){return this.then(function(b){return k(b,!0,a)},function(b){return k(b,!1,a)},b)}};g.prototype={resolve:function(a){this.promise.$$state.status||(a===this.promise?this.$$reject(h("qcycle",a)):this.$$resolve(a))},$$resolve:function(b){var d,
e;e=c(this,this.$$resolve,this.$$reject);try{if(P(b)||G(b))d=b&&b.then;G(d)?(this.promise.$$state.status=-1,d.call(b,e[0],e[1],this.notify)):(this.promise.$$state.value=b,this.promise.$$state.status=1,f(this.promise.$$state))}catch(g){e[1](g),a(g)}},reject:function(a){this.promise.$$state.status||this.$$reject(a)},$$reject:function(a){this.promise.$$state.value=a;this.promise.$$state.status=2;f(this.promise.$$state)},notify:function(c){var d=this.promise.$$state.pending;0>=this.promise.$$state.status&&
d&&d.length&&b(function(){for(var b,e,f=0,g=d.length;f<g;f++){e=d[f][0];b=d[f][3];try{e.notify(G(b)?b(c):c)}catch(h){a(h)}}})}};var l=function(a,b){var c=new g;b?c.resolve(a):c.reject(a);return c.promise},k=function(a,b,c){var d=null;try{G(c)&&(d=c())}catch(e){return l(e,!1)}return d&&G(d.then)?d.then(function(){return l(a,b)},function(a){return l(a,!1)}):l(a,b)},m=function(a,b,c,d){var e=new g;e.resolve(a);return e.promise.then(b,c,d)},n=function u(a){if(!G(a))throw h("norslvr",a);if(!(this instanceof
u))return new u(a);var b=new g;a(function(a){b.resolve(a)},function(a){b.reject(a)});return b.promise};n.defer=function(){return new g};n.reject=function(a){var b=new g;b.reject(a);return b.promise};n.when=m;n.all=function(a){var b=new g,c=0,d=x(a)?[]:{};s(a,function(a,e){c++;m(a).then(function(a){d.hasOwnProperty(e)||(d[e]=a,--c||b.resolve(d))},function(a){d.hasOwnProperty(e)||b.reject(a)})});0===c&&b.resolve(d);return b.promise};return n}function $e(){this.$get=["$window","$timeout",function(b,
a){var c=b.requestAnimationFrame||b.webkitRequestAnimationFrame,d=b.cancelAnimationFrame||b.webkitCancelAnimationFrame||b.webkitCancelRequestAnimationFrame,e=!!c,f=e?function(a){var b=c(a);return function(){d(b)}}:function(b){var c=a(b,16.66,!1);return function(){a.cancel(c)}};f.supported=e;return f}]}function Pe(){var b=10,a=T("$rootScope"),c=null,d=null;this.digestTtl=function(a){arguments.length&&(b=a);return b};this.$get=["$injector","$exceptionHandler","$parse","$browser",function(e,f,g,h){function l(){this.$id=
++nb;this.$$phase=this.$parent=this.$$watchers=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=null;this.$root=this;this.$$destroyed=!1;this.$$listeners={};this.$$listenerCount={};this.$$isolateBindings=null}function k(b){if(r.$$phase)throw a("inprog",r.$$phase);r.$$phase=b}function m(a,b,c){do a.$$listenerCount[c]-=b,0===a.$$listenerCount[c]&&delete a.$$listenerCount[c];while(a=a.$parent)}function n(){}function q(){for(;v.length;)try{v.shift()()}catch(a){f(a)}d=null}function u(){null===
d&&(d=h.defer(function(){r.$apply(q)}))}l.prototype={constructor:l,$new:function(a,b){function c(){d.$$destroyed=!0}var d;b=b||this;a?(d=new l,d.$root=this.$root):(this.$$ChildScope||(this.$$ChildScope=function(){this.$$watchers=this.$$nextSibling=this.$$childHead=this.$$childTail=null;this.$$listeners={};this.$$listenerCount={};this.$id=++nb;this.$$ChildScope=null},this.$$ChildScope.prototype=this),d=new this.$$ChildScope);d.$parent=b;d.$$prevSibling=b.$$childTail;b.$$childHead?(b.$$childTail.$$nextSibling=
d,b.$$childTail=d):b.$$childHead=b.$$childTail=d;(a||b!=this)&&d.$on("$destroy",c);return d},$watch:function(a,b,d){var e=g(a);if(e.$$watchDelegate)return e.$$watchDelegate(this,b,d,e);var f=this.$$watchers,h={fn:b,last:n,get:e,exp:a,eq:!!d};c=null;G(b)||(h.fn=C);f||(f=this.$$watchers=[]);f.unshift(h);return function(){Wa(f,h);c=null}},$watchGroup:function(a,b){function c(){h=!1;l?(l=!1,b(e,e,g)):b(e,d,g)}var d=Array(a.length),e=Array(a.length),f=[],g=this,h=!1,l=!0;if(!a.length){var k=!0;g.$evalAsync(function(){k&&
b(e,e,g)});return function(){k=!1}}if(1===a.length)return this.$watch(a[0],function(a,c,f){e[0]=a;d[0]=c;b(e,a===c?e:d,f)});s(a,function(a,b){var l=g.$watch(a,function(a,f){e[b]=a;d[b]=f;h||(h=!0,g.$evalAsync(c))});f.push(l)});return function(){for(;f.length;)f.shift()()}},$watchCollection:function(a,b){function c(a){e=a;var b,d,g,h;if(!D(e)){if(P(e))if(Sa(e))for(f!==q&&(f=q,p=f.length=0,k++),a=e.length,p!==a&&(k++,f.length=p=a),b=0;b<a;b++)h=f[b],g=e[b],d=h!==h&&g!==g,d||h===g||(k++,f[b]=g);else{f!==
m&&(f=m={},p=0,k++);a=0;for(b in e)e.hasOwnProperty(b)&&(a++,g=e[b],h=f[b],b in f?(d=h!==h&&g!==g,d||h===g||(k++,f[b]=g)):(p++,f[b]=g,k++));if(p>a)for(b in k++,f)e.hasOwnProperty(b)||(p--,delete f[b])}else f!==e&&(f=e,k++);return k}}c.$stateful=!0;var d=this,e,f,h,l=1<b.length,k=0,n=g(a,c),q=[],m={},u=!0,p=0;return this.$watch(n,function(){u?(u=!1,b(e,e,d)):b(e,h,d);if(l)if(P(e))if(Sa(e)){h=Array(e.length);for(var a=0;a<e.length;a++)h[a]=e[a]}else for(a in h={},e)rc.call(e,a)&&(h[a]=e[a]);else h=
e})},$digest:function(){var e,g,l,m,u,v,s=b,t,W=[],y,I;k("$digest");h.$$checkUrlChange();this===r&&null!==d&&(h.defer.cancel(d),q());c=null;do{v=!1;for(t=this;O.length;){try{I=O.shift(),I.scope.$eval(I.expression,I.locals)}catch(B){f(B)}c=null}a:do{if(m=t.$$watchers)for(u=m.length;u--;)try{if(e=m[u])if((g=e.get(t))!==(l=e.last)&&!(e.eq?fa(g,l):"number"===typeof g&&"number"===typeof l&&isNaN(g)&&isNaN(l)))v=!0,c=e,e.last=e.eq?Ea(g,null):g,e.fn(g,l===n?g:l,t),5>s&&(y=4-s,W[y]||(W[y]=[]),W[y].push({msg:G(e.exp)?
"fn: "+(e.exp.name||e.exp.toString()):e.exp,newVal:g,oldVal:l}));else if(e===c){v=!1;break a}}catch(D){f(D)}if(!(m=t.$$childHead||t!==this&&t.$$nextSibling))for(;t!==this&&!(m=t.$$nextSibling);)t=t.$parent}while(t=m);if((v||O.length)&&!s--)throw r.$$phase=null,a("infdig",b,W);}while(v||O.length);for(r.$$phase=null;p.length;)try{p.shift()()}catch(ca){f(ca)}},$destroy:function(){if(!this.$$destroyed){var a=this.$parent;this.$broadcast("$destroy");this.$$destroyed=!0;if(this!==r){for(var b in this.$$listenerCount)m(this,
this.$$listenerCount[b],b);a.$$childHead==this&&(a.$$childHead=this.$$nextSibling);a.$$childTail==this&&(a.$$childTail=this.$$prevSibling);this.$$prevSibling&&(this.$$prevSibling.$$nextSibling=this.$$nextSibling);this.$$nextSibling&&(this.$$nextSibling.$$prevSibling=this.$$prevSibling);this.$destroy=this.$digest=this.$apply=this.$evalAsync=this.$applyAsync=C;this.$on=this.$watch=this.$watchGroup=function(){return C};this.$$listeners={};this.$parent=this.$$nextSibling=this.$$prevSibling=this.$$childHead=
this.$$childTail=this.$root=this.$$watchers=null}}},$eval:function(a,b){return g(a)(this,b)},$evalAsync:function(a,b){r.$$phase||O.length||h.defer(function(){O.length&&r.$digest()});O.push({scope:this,expression:a,locals:b})},$$postDigest:function(a){p.push(a)},$apply:function(a){try{return k("$apply"),this.$eval(a)}catch(b){f(b)}finally{r.$$phase=null;try{r.$digest()}catch(c){throw f(c),c;}}},$applyAsync:function(a){function b(){c.$eval(a)}var c=this;a&&v.push(b);u()},$on:function(a,b){var c=this.$$listeners[a];
c||(this.$$listeners[a]=c=[]);c.push(b);var d=this;do d.$$listenerCount[a]||(d.$$listenerCount[a]=0),d.$$listenerCount[a]++;while(d=d.$parent);var e=this;return function(){var d=c.indexOf(b);-1!==d&&(c[d]=null,m(e,1,a))}},$emit:function(a,b){var c=[],d,e=this,g=!1,h={name:a,targetScope:e,stopPropagation:function(){g=!0},preventDefault:function(){h.defaultPrevented=!0},defaultPrevented:!1},l=Xa([h],arguments,1),k,n;do{d=e.$$listeners[a]||c;h.currentScope=e;k=0;for(n=d.length;k<n;k++)if(d[k])try{d[k].apply(null,
l)}catch(m){f(m)}else d.splice(k,1),k--,n--;if(g)return h.currentScope=null,h;e=e.$parent}while(e);h.currentScope=null;return h},$broadcast:function(a,b){var c=this,d=this,e={name:a,targetScope:this,preventDefault:function(){e.defaultPrevented=!0},defaultPrevented:!1};if(!this.$$listenerCount[a])return e;for(var g=Xa([e],arguments,1),h,l;c=d;){e.currentScope=c;d=c.$$listeners[a]||[];h=0;for(l=d.length;h<l;h++)if(d[h])try{d[h].apply(null,g)}catch(k){f(k)}else d.splice(h,1),h--,l--;if(!(d=c.$$listenerCount[a]&&
c.$$childHead||c!==this&&c.$$nextSibling))for(;c!==this&&!(d=c.$$nextSibling);)c=c.$parent}e.currentScope=null;return e}};var r=new l,O=r.$$asyncQueue=[],p=r.$$postDigestQueue=[],v=r.$$applyAsyncQueue=[];return r}]}function Sd(){var b=/^\s*(https?|ftp|mailto|tel|file):/,a=/^\s*((https?|ftp|file|blob):|data:image\/)/;this.aHrefSanitizationWhitelist=function(a){return y(a)?(b=a,this):b};this.imgSrcSanitizationWhitelist=function(b){return y(b)?(a=b,this):a};this.$get=function(){return function(c,d){var e=
d?a:b,f;f=Ba(c).href;return""===f||f.match(e)?c:"unsafe:"+f}}}function Df(b){if("self"===b)return b;if(H(b)){if(-1<b.indexOf("***"))throw Ca("iwcard",b);b=gd(b).replace("\\*\\*",".*").replace("\\*","[^:/.?&;]*");return new RegExp("^"+b+"$")}if(ob(b))return new RegExp("^"+b.source+"$");throw Ca("imatcher");}function hd(b){var a=[];y(b)&&s(b,function(b){a.push(Df(b))});return a}function Te(){this.SCE_CONTEXTS=ma;var b=["self"],a=[];this.resourceUrlWhitelist=function(a){arguments.length&&(b=hd(a));return b};
this.resourceUrlBlacklist=function(b){arguments.length&&(a=hd(b));return a};this.$get=["$injector",function(c){function d(a,b){return"self"===a?Zc(b):!!a.exec(b.href)}function e(a){var b=function(a){this.$$unwrapTrustedValue=function(){return a}};a&&(b.prototype=new a);b.prototype.valueOf=function(){return this.$$unwrapTrustedValue()};b.prototype.toString=function(){return this.$$unwrapTrustedValue().toString()};return b}var f=function(a){throw Ca("unsafe");};c.has("$sanitize")&&(f=c.get("$sanitize"));
var g=e(),h={};h[ma.HTML]=e(g);h[ma.CSS]=e(g);h[ma.URL]=e(g);h[ma.JS]=e(g);h[ma.RESOURCE_URL]=e(h[ma.URL]);return{trustAs:function(a,b){var c=h.hasOwnProperty(a)?h[a]:null;if(!c)throw Ca("icontext",a,b);if(null===b||b===t||""===b)return b;if("string"!==typeof b)throw Ca("itype",a);return new c(b)},getTrusted:function(c,e){if(null===e||e===t||""===e)return e;var g=h.hasOwnProperty(c)?h[c]:null;if(g&&e instanceof g)return e.$$unwrapTrustedValue();if(c===ma.RESOURCE_URL){var g=Ba(e.toString()),n,q,u=
!1;n=0;for(q=b.length;n<q;n++)if(d(b[n],g)){u=!0;break}if(u)for(n=0,q=a.length;n<q;n++)if(d(a[n],g)){u=!1;break}if(u)return e;throw Ca("insecurl",e.toString());}if(c===ma.HTML)return f(e);throw Ca("unsafe");},valueOf:function(a){return a instanceof g?a.$$unwrapTrustedValue():a}}}]}function Se(){var b=!0;this.enabled=function(a){arguments.length&&(b=!!a);return b};this.$get=["$parse","$sceDelegate",function(a,c){if(b&&8>Qa)throw Ca("iequirks");var d=qa(ma);d.isEnabled=function(){return b};d.trustAs=
c.trustAs;d.getTrusted=c.getTrusted;d.valueOf=c.valueOf;b||(d.trustAs=d.getTrusted=function(a,b){return b},d.valueOf=oa);d.parseAs=function(b,c){var e=a(c);return e.literal&&e.constant?e:a(c,function(a){return d.getTrusted(b,a)})};var e=d.parseAs,f=d.getTrusted,g=d.trustAs;s(ma,function(a,b){var c=Q(b);d[bb("parse_as_"+c)]=function(b){return e(a,b)};d[bb("get_trusted_"+c)]=function(b){return f(a,b)};d[bb("trust_as_"+c)]=function(b){return g(a,b)}});return d}]}function Ue(){this.$get=["$window","$document",
function(b,a){var c={},d=ba((/android (\d+)/.exec(Q((b.navigator||{}).userAgent))||[])[1]),e=/Boxee/i.test((b.navigator||{}).userAgent),f=a[0]||{},g,h=/^(Moz|webkit|ms)(?=[A-Z])/,l=f.body&&f.body.style,k=!1,m=!1;if(l){for(var n in l)if(k=h.exec(n)){g=k[0];g=g.substr(0,1).toUpperCase()+g.substr(1);break}g||(g="WebkitOpacity"in l&&"webkit");k=!!("transition"in l||g+"Transition"in l);m=!!("animation"in l||g+"Animation"in l);!d||k&&m||(k=H(f.body.style.webkitTransition),m=H(f.body.style.webkitAnimation))}return{history:!(!b.history||
!b.history.pushState||4>d||e),hasEvent:function(a){if("input"===a&&11>=Qa)return!1;if(D(c[a])){var b=f.createElement("div");c[a]="on"+a in b}return c[a]},csp:$a(),vendorPrefix:g,transitions:k,animations:m,android:d}}]}function We(){this.$get=["$templateCache","$http","$q",function(b,a,c){function d(e,f){d.totalPendingRequests++;var g=a.defaults&&a.defaults.transformResponse;x(g)?g=g.filter(function(a){return a!==Yb}):g===Yb&&(g=null);return a.get(e,{cache:b,transformResponse:g}).then(function(a){d.totalPendingRequests--;
return a.data},function(a){d.totalPendingRequests--;if(!f)throw ja("tpload",e);return c.reject(a)})}d.totalPendingRequests=0;return d}]}function Xe(){this.$get=["$rootScope","$browser","$location",function(b,a,c){return{findBindings:function(a,b,c){a=a.getElementsByClassName("ng-binding");var g=[];s(a,function(a){var d=ga.element(a).data("$binding");d&&s(d,function(d){c?(new RegExp("(^|\\s)"+gd(b)+"(\\s|\\||$)")).test(d)&&g.push(a):-1!=d.indexOf(b)&&g.push(a)})});return g},findModels:function(a,b,
c){for(var g=["ng-","data-ng-","ng\\:"],h=0;h<g.length;++h){var l=a.querySelectorAll("["+g[h]+"model"+(c?"=":"*=")+'"'+b+'"]');if(l.length)return l}},getLocation:function(){return c.url()},setLocation:function(a){a!==c.url()&&(c.url(a),b.$digest())},whenStable:function(b){a.notifyWhenNoOutstandingRequests(b)}}}]}function Ye(){this.$get=["$rootScope","$browser","$q","$$q","$exceptionHandler",function(b,a,c,d,e){function f(f,l,k){var m=y(k)&&!k,n=(m?d:c).defer(),q=n.promise;l=a.defer(function(){try{n.resolve(f())}catch(a){n.reject(a),
e(a)}finally{delete g[q.$$timeoutId]}m||b.$apply()},l);q.$$timeoutId=l;g[l]=n;return q}var g={};f.cancel=function(b){return b&&b.$$timeoutId in g?(g[b.$$timeoutId].reject("canceled"),delete g[b.$$timeoutId],a.defer.cancel(b.$$timeoutId)):!1};return f}]}function Ba(b){Qa&&(Z.setAttribute("href",b),b=Z.href);Z.setAttribute("href",b);return{href:Z.href,protocol:Z.protocol?Z.protocol.replace(/:$/,""):"",host:Z.host,search:Z.search?Z.search.replace(/^\?/,""):"",hash:Z.hash?Z.hash.replace(/^#/,""):"",hostname:Z.hostname,
port:Z.port,pathname:"/"===Z.pathname.charAt(0)?Z.pathname:"/"+Z.pathname}}function Zc(b){b=H(b)?Ba(b):b;return b.protocol===id.protocol&&b.host===id.host}function Ze(){this.$get=da(M)}function Dc(b){function a(c,d){if(P(c)){var e={};s(c,function(b,c){e[c]=a(c,b)});return e}return b.factory(c+"Filter",d)}this.register=a;this.$get=["$injector",function(a){return function(b){return a.get(b+"Filter")}}];a("currency",jd);a("date",kd);a("filter",Ef);a("json",Ff);a("limitTo",Gf);a("lowercase",Hf);a("number",
ld);a("orderBy",md);a("uppercase",If)}function Ef(){return function(b,a,c){if(!x(b))return b;var d;switch(typeof a){case "function":break;case "boolean":case "number":case "string":d=!0;case "object":a=Jf(a,c,d);break;default:return b}return b.filter(a)}}function Jf(b,a,c){!0===a?a=fa:G(a)||(a=function(a,b){if(P(a)||P(b))return!1;a=Q(""+a);b=Q(""+b);return-1!==a.indexOf(b)});return function(d){return hb(d,b,a,c)}}function hb(b,a,c,d){var e=typeof b,f=typeof a;if("string"===f&&"!"===a.charAt(0))return!hb(b,
a.substring(1),c,d);if("array"===e)return b.some(function(b){return hb(b,a,c,d)});switch(e){case "object":var g;if(d){for(g in b)if("$"!==g.charAt(0)&&hb(b[g],a,c))return!0;return!1}if("object"===f){for(g in a)if(e=a[g],!G(e)&&(f="$"===g,!hb(f?b:b[g],e,c,f)))return!1;return!0}return c(b,a);case "function":return!1;default:return c(b,a)}}function jd(b){var a=b.NUMBER_FORMATS;return function(b,d,e){D(d)&&(d=a.CURRENCY_SYM);D(e)&&(e=a.PATTERNS[1].maxFrac);return null==b?b:nd(b,a.PATTERNS[1],a.GROUP_SEP,
a.DECIMAL_SEP,e).replace(/\u00A4/g,d)}}function ld(b){var a=b.NUMBER_FORMATS;return function(b,d){return null==b?b:nd(b,a.PATTERNS[0],a.GROUP_SEP,a.DECIMAL_SEP,d)}}function nd(b,a,c,d,e){if(!isFinite(b)||P(b))return"";var f=0>b;b=Math.abs(b);var g=b+"",h="",l=[],k=!1;if(-1!==g.indexOf("e")){var m=g.match(/([\d\.]+)e(-?)(\d+)/);m&&"-"==m[2]&&m[3]>e+1?b=0:(h=g,k=!0)}if(k)0<e&&1>b&&(h=b.toFixed(e),b=parseFloat(h));else{g=(g.split(od)[1]||"").length;D(e)&&(e=Math.min(Math.max(a.minFrac,g),a.maxFrac));
b=+(Math.round(+(b.toString()+"e"+e)).toString()+"e"+-e);var g=(""+b).split(od),k=g[0],g=g[1]||"",n=0,q=a.lgSize,u=a.gSize;if(k.length>=q+u)for(n=k.length-q,m=0;m<n;m++)0===(n-m)%u&&0!==m&&(h+=c),h+=k.charAt(m);for(m=n;m<k.length;m++)0===(k.length-m)%q&&0!==m&&(h+=c),h+=k.charAt(m);for(;g.length<e;)g+="0";e&&"0"!==e&&(h+=d+g.substr(0,e))}0===b&&(f=!1);l.push(f?a.negPre:a.posPre,h,f?a.negSuf:a.posSuf);return l.join("")}function Hb(b,a,c){var d="";0>b&&(d="-",b=-b);for(b=""+b;b.length<a;)b="0"+b;c&&
(b=b.substr(b.length-a));return d+b}function $(b,a,c,d){c=c||0;return function(e){e=e["get"+b]();if(0<c||e>-c)e+=c;0===e&&-12==c&&(e=12);return Hb(e,a,d)}}function Ib(b,a){return function(c,d){var e=c["get"+b](),f=ub(a?"SHORT"+b:b);return d[f][e]}}function pd(b){var a=(new Date(b,0,1)).getDay();return new Date(b,0,(4>=a?5:12)-a)}function qd(b){return function(a){var c=pd(a.getFullYear());a=+new Date(a.getFullYear(),a.getMonth(),a.getDate()+(4-a.getDay()))-+c;a=1+Math.round(a/6048E5);return Hb(a,b)}}
function kd(b){function a(a){var b;if(b=a.match(c)){a=new Date(0);var f=0,g=0,h=b[8]?a.setUTCFullYear:a.setFullYear,l=b[8]?a.setUTCHours:a.setHours;b[9]&&(f=ba(b[9]+b[10]),g=ba(b[9]+b[11]));h.call(a,ba(b[1]),ba(b[2])-1,ba(b[3]));f=ba(b[4]||0)-f;g=ba(b[5]||0)-g;h=ba(b[6]||0);b=Math.round(1E3*parseFloat("0."+(b[7]||0)));l.call(a,f,g,h,b)}return a}var c=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;return function(c,e,f){var g="",h=[],l,k;e=e||
"mediumDate";e=b.DATETIME_FORMATS[e]||e;H(c)&&(c=Kf.test(c)?ba(c):a(c));V(c)&&(c=new Date(c));if(!pa(c))return c;for(;e;)(k=Lf.exec(e))?(h=Xa(h,k,1),e=h.pop()):(h.push(e),e=null);f&&"UTC"===f&&(c=new Date(c.getTime()),c.setMinutes(c.getMinutes()+c.getTimezoneOffset()));s(h,function(a){l=Mf[a];g+=l?l(c,b.DATETIME_FORMATS):a.replace(/(^'|'$)/g,"").replace(/''/g,"'")});return g}}function Ff(){return function(b,a){D(a)&&(a=2);return Za(b,a)}}function Gf(){return function(b,a){V(b)&&(b=b.toString());if(!x(b)&&
!H(b))return b;a=Infinity===Math.abs(Number(a))?Number(a):ba(a);if(H(b))return a?0<=a?b.slice(0,a):b.slice(a,b.length):"";var c=[],d,e;a>b.length?a=b.length:a<-b.length&&(a=-b.length);0<a?(d=0,e=a):(d=b.length+a,e=b.length);for(;d<e;d++)c.push(b[d]);return c}}function md(b){return function(a,c,d){function e(a,b){return b?function(b,c){return a(c,b)}:a}function f(a){switch(typeof a){case "number":case "boolean":case "string":return!0;default:return!1}}function g(a){return null===a?"null":"function"===
typeof a.toString&&(a=a.toString(),f(a))||"function"===typeof a.valueOf&&(a=a.valueOf(),f(a))?a:""}function h(a,b){var c=typeof a,d=typeof b;c===d&&"object"===c&&(a=g(a),b=g(b));return c===d?("string"===c&&(a=a.toLowerCase(),b=b.toLowerCase()),a===b?0:a<b?-1:1):c<d?-1:1}if(!Sa(a))return a;c=x(c)?c:[c];0===c.length&&(c=["+"]);c=c.map(function(a){var c=!1,d=a||oa;if(H(a)){if("+"==a.charAt(0)||"-"==a.charAt(0))c="-"==a.charAt(0),a=a.substring(1);if(""===a)return e(function(a,b){return h(a,b)},c);d=b(a);
if(d.constant){var f=d();return e(function(a,b){return h(a[f],b[f])},c)}}return e(function(a,b){return h(d(a),d(b))},c)});return Ya.call(a).sort(e(function(a,b){for(var d=0;d<c.length;d++){var e=c[d](a,b);if(0!==e)return e}return 0},d))}}function Ia(b){G(b)&&(b={link:b});b.restrict=b.restrict||"AC";return da(b)}function rd(b,a,c,d,e){var f=this,g=[],h=f.$$parentForm=b.parent().controller("form")||Jb;f.$error={};f.$$success={};f.$pending=t;f.$name=e(a.name||a.ngForm||"")(c);f.$dirty=!1;f.$pristine=
!0;f.$valid=!0;f.$invalid=!1;f.$submitted=!1;h.$addControl(f);f.$rollbackViewValue=function(){s(g,function(a){a.$rollbackViewValue()})};f.$commitViewValue=function(){s(g,function(a){a.$commitViewValue()})};f.$addControl=function(a){La(a.$name,"input");g.push(a);a.$name&&(f[a.$name]=a)};f.$$renameControl=function(a,b){var c=a.$name;f[c]===a&&delete f[c];f[b]=a;a.$name=b};f.$removeControl=function(a){a.$name&&f[a.$name]===a&&delete f[a.$name];s(f.$pending,function(b,c){f.$setValidity(c,null,a)});s(f.$error,
function(b,c){f.$setValidity(c,null,a)});Wa(g,a)};sd({ctrl:this,$element:b,set:function(a,b,c){var d=a[b];d?-1===d.indexOf(c)&&d.push(c):a[b]=[c]},unset:function(a,b,c){var d=a[b];d&&(Wa(d,c),0===d.length&&delete a[b])},parentForm:h,$animate:d});f.$setDirty=function(){d.removeClass(b,Ra);d.addClass(b,Kb);f.$dirty=!0;f.$pristine=!1;h.$setDirty()};f.$setPristine=function(){d.setClass(b,Ra,Kb+" ng-submitted");f.$dirty=!1;f.$pristine=!0;f.$submitted=!1;s(g,function(a){a.$setPristine()})};f.$setUntouched=
function(){s(g,function(a){a.$setUntouched()})};f.$setSubmitted=function(){d.addClass(b,"ng-submitted");f.$submitted=!0;h.$setSubmitted()}}function hc(b){b.$formatters.push(function(a){return b.$isEmpty(a)?a:a.toString()})}function ib(b,a,c,d,e,f){var g=Q(a[0].type);if(!e.android){var h=!1;a.on("compositionstart",function(a){h=!0});a.on("compositionend",function(){h=!1;l()})}var l=function(b){k&&(f.defer.cancel(k),k=null);if(!h){var e=a.val();b=b&&b.type;"password"===g||c.ngTrim&&"false"===c.ngTrim||
(e=U(e));(d.$viewValue!==e||""===e&&d.$$hasNativeValidators)&&d.$setViewValue(e,b)}};if(e.hasEvent("input"))a.on("input",l);else{var k,m=function(a,b,c){k||(k=f.defer(function(){k=null;b&&b.value===c||l(a)}))};a.on("keydown",function(a){var b=a.keyCode;91===b||15<b&&19>b||37<=b&&40>=b||m(a,this,this.value)});if(e.hasEvent("paste"))a.on("paste cut",m)}a.on("change",l);d.$render=function(){a.val(d.$isEmpty(d.$viewValue)?"":d.$viewValue)}}function Lb(b,a){return function(c,d){var e,f;if(pa(c))return c;
if(H(c)){'"'==c.charAt(0)&&'"'==c.charAt(c.length-1)&&(c=c.substring(1,c.length-1));if(Nf.test(c))return new Date(c);b.lastIndex=0;if(e=b.exec(c))return e.shift(),f=d?{yyyy:d.getFullYear(),MM:d.getMonth()+1,dd:d.getDate(),HH:d.getHours(),mm:d.getMinutes(),ss:d.getSeconds(),sss:d.getMilliseconds()/1E3}:{yyyy:1970,MM:1,dd:1,HH:0,mm:0,ss:0,sss:0},s(e,function(b,c){c<a.length&&(f[a[c]]=+b)}),new Date(f.yyyy,f.MM-1,f.dd,f.HH,f.mm,f.ss||0,1E3*f.sss||0)}return NaN}}function jb(b,a,c,d){return function(e,
f,g,h,l,k,m){function n(a){return a&&!(a.getTime&&a.getTime()!==a.getTime())}function q(a){return y(a)?pa(a)?a:c(a):t}td(e,f,g,h);ib(e,f,g,h,l,k);var u=h&&h.$options&&h.$options.timezone,r;h.$$parserName=b;h.$parsers.push(function(b){return h.$isEmpty(b)?null:a.test(b)?(b=c(b,r),"UTC"===u&&b.setMinutes(b.getMinutes()-b.getTimezoneOffset()),b):t});h.$formatters.push(function(a){if(a&&!pa(a))throw Mb("datefmt",a);if(n(a)){if((r=a)&&"UTC"===u){var b=6E4*r.getTimezoneOffset();r=new Date(r.getTime()+b)}return m("date")(a,
d,u)}r=null;return""});if(y(g.min)||g.ngMin){var s;h.$validators.min=function(a){return!n(a)||D(s)||c(a)>=s};g.$observe("min",function(a){s=q(a);h.$validate()})}if(y(g.max)||g.ngMax){var p;h.$validators.max=function(a){return!n(a)||D(p)||c(a)<=p};g.$observe("max",function(a){p=q(a);h.$validate()})}}}function td(b,a,c,d){(d.$$hasNativeValidators=P(a[0].validity))&&d.$parsers.push(function(b){var c=a.prop("validity")||{};return c.badInput&&!c.typeMismatch?t:b})}function ud(b,a,c,d,e){if(y(d)){b=b(d);
if(!b.constant)throw T("ngModel")("constexpr",c,d);return b(a)}return e}function sd(b){function a(a,b){b&&!f[a]?(k.addClass(e,a),f[a]=!0):!b&&f[a]&&(k.removeClass(e,a),f[a]=!1)}function c(b,c){b=b?"-"+tc(b,"-"):"";a(kb+b,!0===c);a(vd+b,!1===c)}var d=b.ctrl,e=b.$element,f={},g=b.set,h=b.unset,l=b.parentForm,k=b.$animate;f[vd]=!(f[kb]=e.hasClass(kb));d.$setValidity=function(b,e,f){e===t?(d.$pending||(d.$pending={}),g(d.$pending,b,f)):(d.$pending&&h(d.$pending,b,f),wd(d.$pending)&&(d.$pending=t));Va(e)?
e?(h(d.$error,b,f),g(d.$$success,b,f)):(g(d.$error,b,f),h(d.$$success,b,f)):(h(d.$error,b,f),h(d.$$success,b,f));d.$pending?(a(xd,!0),d.$valid=d.$invalid=t,c("",null)):(a(xd,!1),d.$valid=wd(d.$error),d.$invalid=!d.$valid,c("",d.$valid));e=d.$pending&&d.$pending[b]?t:d.$error[b]?!1:d.$$success[b]?!0:null;c(b,e);l.$setValidity(b,e,d)}}function wd(b){if(b)for(var a in b)return!1;return!0}function ic(b,a){b="ngClass"+b;return["$animate",function(c){function d(a,b){var c=[],d=0;a:for(;d<a.length;d++){for(var e=
a[d],m=0;m<b.length;m++)if(e==b[m])continue a;c.push(e)}return c}function e(a){if(!x(a)){if(H(a))return a.split(" ");if(P(a)){var b=[];s(a,function(a,c){a&&(b=b.concat(c.split(" ")))});return b}}return a}return{restrict:"AC",link:function(f,g,h){function l(a,b){var c=g.data("$classCounts")||{},d=[];s(a,function(a){if(0<b||c[a])c[a]=(c[a]||0)+b,c[a]===+(0<b)&&d.push(a)});g.data("$classCounts",c);return d.join(" ")}function k(b){if(!0===a||f.$index%2===a){var k=e(b||[]);if(!m){var u=l(k,1);h.$addClass(u)}else if(!fa(b,
m)){var r=e(m),u=d(k,r),k=d(r,k),u=l(u,1),k=l(k,-1);u&&u.length&&c.addClass(g,u);k&&k.length&&c.removeClass(g,k)}}m=qa(b)}var m;f.$watch(h[b],k,!0);h.$observe("class",function(a){k(f.$eval(h[b]))});"ngClass"!==b&&f.$watch("$index",function(c,d){var g=c&1;if(g!==(d&1)){var k=e(f.$eval(h[b]));g===a?(g=l(k,1),h.$addClass(g)):(g=l(k,-1),h.$removeClass(g))}})}}}]}var Of=/^\/(.+)\/([a-z]*)$/,Q=function(b){return H(b)?b.toLowerCase():b},rc=Object.prototype.hasOwnProperty,ub=function(b){return H(b)?b.toUpperCase():
b},Qa,B,ra,Ya=[].slice,rf=[].splice,Pf=[].push,Da=Object.prototype.toString,Ja=T("ng"),ga=M.angular||(M.angular={}),ab,nb=0;Qa=Y.documentMode;C.$inject=[];oa.$inject=[];var x=Array.isArray,U=function(b){return H(b)?b.trim():b},gd=function(b){return b.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08")},$a=function(){if(y($a.isActive_))return $a.isActive_;var b=!(!Y.querySelector("[ng-csp]")&&!Y.querySelector("[data-ng-csp]"));if(!b)try{new Function("")}catch(a){b=!0}return $a.isActive_=
b},rb=["ng-","data-ng-","ng:","x-ng-"],Md=/[A-Z]/g,uc=!1,Pb,na=1,pb=3,Qd={full:"1.3.7",major:1,minor:3,dot:7,codeName:"leaky-obstruction"};R.expando="ng339";var zb=R.cache={},hf=1;R._data=function(b){return this.cache[b[this.expando]]||{}};var cf=/([\:\-\_]+(.))/g,df=/^moz([A-Z])/,Qf={mouseleave:"mouseout",mouseenter:"mouseover"},Sb=T("jqLite"),gf=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,Rb=/<|&#?\w+;/,ef=/<([\w:]+)/,ff=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,ia={option:[1,'<select multiple="multiple">',
"</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ia.optgroup=ia.option;ia.tbody=ia.tfoot=ia.colgroup=ia.caption=ia.thead;ia.th=ia.td;var Ka=R.prototype={ready:function(b){function a(){c||(c=!0,b())}var c=!1;"complete"===Y.readyState?setTimeout(a):(this.on("DOMContentLoaded",a),R(M).on("load",a))},toString:function(){var b=[];s(this,function(a){b.push(""+
a)});return"["+b.join(", ")+"]"},eq:function(b){return 0<=b?B(this[b]):B(this[this.length+b])},length:0,push:Pf,sort:[].sort,splice:[].splice},Eb={};s("multiple selected checked disabled readOnly required open".split(" "),function(b){Eb[Q(b)]=b});var Mc={};s("input select option textarea button form details".split(" "),function(b){Mc[b]=!0});var Nc={ngMinlength:"minlength",ngMaxlength:"maxlength",ngMin:"min",ngMax:"max",ngPattern:"pattern"};s({data:Ub,removeData:xb},function(b,a){R[a]=b});s({data:Ub,
inheritedData:Db,scope:function(b){return B.data(b,"$scope")||Db(b.parentNode||b,["$isolateScope","$scope"])},isolateScope:function(b){return B.data(b,"$isolateScope")||B.data(b,"$isolateScopeNoTemplate")},controller:Ic,injector:function(b){return Db(b,"$injector")},removeAttr:function(b,a){b.removeAttribute(a)},hasClass:Ab,css:function(b,a,c){a=bb(a);if(y(c))b.style[a]=c;else return b.style[a]},attr:function(b,a,c){var d=Q(a);if(Eb[d])if(y(c))c?(b[a]=!0,b.setAttribute(a,d)):(b[a]=!1,b.removeAttribute(d));
else return b[a]||(b.attributes.getNamedItem(a)||C).specified?d:t;else if(y(c))b.setAttribute(a,c);else if(b.getAttribute)return b=b.getAttribute(a,2),null===b?t:b},prop:function(b,a,c){if(y(c))b[a]=c;else return b[a]},text:function(){function b(a,b){if(D(b)){var d=a.nodeType;return d===na||d===pb?a.textContent:""}a.textContent=b}b.$dv="";return b}(),val:function(b,a){if(D(a)){if(b.multiple&&"select"===ua(b)){var c=[];s(b.options,function(a){a.selected&&c.push(a.value||a.text)});return 0===c.length?
null:c}return b.value}b.value=a},html:function(b,a){if(D(a))return b.innerHTML;wb(b,!0);b.innerHTML=a},empty:Jc},function(b,a){R.prototype[a]=function(a,d){var e,f,g=this.length;if(b!==Jc&&(2==b.length&&b!==Ab&&b!==Ic?a:d)===t){if(P(a)){for(e=0;e<g;e++)if(b===Ub)b(this[e],a);else for(f in a)b(this[e],f,a[f]);return this}e=b.$dv;g=e===t?Math.min(g,1):g;for(f=0;f<g;f++){var h=b(this[f],a,d);e=e?e+h:h}return e}for(e=0;e<g;e++)b(this[e],a,d);return this}});s({removeData:xb,on:function a(c,d,e,f){if(y(f))throw Sb("onargs");
if(Ec(c)){var g=yb(c,!0);f=g.events;var h=g.handle;h||(h=g.handle=lf(c,f));for(var g=0<=d.indexOf(" ")?d.split(" "):[d],l=g.length;l--;){d=g[l];var k=f[d];k||(f[d]=[],"mouseenter"===d||"mouseleave"===d?a(c,Qf[d],function(a){var c=a.relatedTarget;c&&(c===this||this.contains(c))||h(a,d)}):"$destroy"!==d&&c.addEventListener(d,h,!1),k=f[d]);k.push(e)}}},off:Hc,one:function(a,c,d){a=B(a);a.on(c,function f(){a.off(c,d);a.off(c,f)});a.on(c,d)},replaceWith:function(a,c){var d,e=a.parentNode;wb(a);s(new R(c),
function(c){d?e.insertBefore(c,d.nextSibling):e.replaceChild(c,a);d=c})},children:function(a){var c=[];s(a.childNodes,function(a){a.nodeType===na&&c.push(a)});return c},contents:function(a){return a.contentDocument||a.childNodes||[]},append:function(a,c){var d=a.nodeType;if(d===na||11===d){c=new R(c);for(var d=0,e=c.length;d<e;d++)a.appendChild(c[d])}},prepend:function(a,c){if(a.nodeType===na){var d=a.firstChild;s(new R(c),function(c){a.insertBefore(c,d)})}},wrap:function(a,c){c=B(c).eq(0).clone()[0];
var d=a.parentNode;d&&d.replaceChild(c,a);c.appendChild(a)},remove:Kc,detach:function(a){Kc(a,!0)},after:function(a,c){var d=a,e=a.parentNode;c=new R(c);for(var f=0,g=c.length;f<g;f++){var h=c[f];e.insertBefore(h,d.nextSibling);d=h}},addClass:Cb,removeClass:Bb,toggleClass:function(a,c,d){c&&s(c.split(" "),function(c){var f=d;D(f)&&(f=!Ab(a,c));(f?Cb:Bb)(a,c)})},parent:function(a){return(a=a.parentNode)&&11!==a.nodeType?a:null},next:function(a){return a.nextElementSibling},find:function(a,c){return a.getElementsByTagName?
a.getElementsByTagName(c):[]},clone:Tb,triggerHandler:function(a,c,d){var e,f,g=c.type||c,h=yb(a);if(h=(h=h&&h.events)&&h[g])e={preventDefault:function(){this.defaultPrevented=!0},isDefaultPrevented:function(){return!0===this.defaultPrevented},stopImmediatePropagation:function(){this.immediatePropagationStopped=!0},isImmediatePropagationStopped:function(){return!0===this.immediatePropagationStopped},stopPropagation:C,type:g,target:a},c.type&&(e=z(e,c)),c=qa(h),f=d?[e].concat(d):[e],s(c,function(c){e.isImmediatePropagationStopped()||
c.apply(a,f)})}},function(a,c){R.prototype[c]=function(c,e,f){for(var g,h=0,l=this.length;h<l;h++)D(g)?(g=a(this[h],c,e,f),y(g)&&(g=B(g))):Gc(g,a(this[h],c,e,f));return y(g)?g:this};R.prototype.bind=R.prototype.on;R.prototype.unbind=R.prototype.off});cb.prototype={put:function(a,c){this[Ma(a,this.nextUid)]=c},get:function(a){return this[Ma(a,this.nextUid)]},remove:function(a){var c=this[a=Ma(a,this.nextUid)];delete this[a];return c}};var Pc=/^function\s*[^\(]*\(\s*([^\)]*)\)/m,nf=/,/,of=/^\s*(_?)(\S+?)\1\s*$/,
Oc=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,Ga=T("$injector");Ob.$$annotate=Vb;var Rf=T("$animate"),Ce=["$provide",function(a){this.$$selectors={};this.register=function(c,d){var e=c+"-animation";if(c&&"."!=c.charAt(0))throw Rf("notcsel",c);this.$$selectors[c.substr(1)]=e;a.factory(e,d)};this.classNameFilter=function(a){1===arguments.length&&(this.$$classNameFilter=a instanceof RegExp?a:null);return this.$$classNameFilter};this.$get=["$$q","$$asyncCallback","$rootScope",function(a,d,e){function f(d){var f,
g=a.defer();g.promise.$$cancelFn=function(){f&&f()};e.$$postDigest(function(){f=d(function(){g.resolve()})});return g.promise}function g(a,c){var d=[],e=[],f=ha();s((a.attr("class")||"").split(/\s+/),function(a){f[a]=!0});s(c,function(a,c){var g=f[c];!1===a&&g?e.push(c):!0!==a||g||d.push(c)});return 0<d.length+e.length&&[d.length?d:null,e.length?e:null]}function h(a,c,d){for(var e=0,f=c.length;e<f;++e)a[c[e]]=d}function l(){m||(m=a.defer(),d(function(){m.resolve();m=null}));return m.promise}function k(a,
c){if(ga.isObject(c)){var d=z(c.from||{},c.to||{});a.css(d)}}var m;return{animate:function(a,c,d){k(a,{from:c,to:d});return l()},enter:function(a,c,d,e){k(a,e);d?d.after(a):c.prepend(a);return l()},leave:function(a,c){a.remove();return l()},move:function(a,c,d,e){return this.enter(a,c,d,e)},addClass:function(a,c,d){return this.setClass(a,c,[],d)},$$addClassImmediately:function(a,c,d){a=B(a);c=H(c)?c:x(c)?c.join(" "):"";s(a,function(a){Cb(a,c)});k(a,d);return l()},removeClass:function(a,c,d){return this.setClass(a,
[],c,d)},$$removeClassImmediately:function(a,c,d){a=B(a);c=H(c)?c:x(c)?c.join(" "):"";s(a,function(a){Bb(a,c)});k(a,d);return l()},setClass:function(a,c,d,e){var k=this,l=!1;a=B(a);var m=a.data("$$animateClasses");m?e&&m.options&&(m.options=ga.extend(m.options||{},e)):(m={classes:{},options:e},l=!0);e=m.classes;c=x(c)?c:c.split(" ");d=x(d)?d:d.split(" ");h(e,c,!0);h(e,d,!1);l&&(m.promise=f(function(c){var d=a.data("$$animateClasses");a.removeData("$$animateClasses");if(d){var e=g(a,d.classes);e&&
k.$$setClassImmediately(a,e[0],e[1],d.options)}c()}),a.data("$$animateClasses",m));return m.promise},$$setClassImmediately:function(a,c,d,e){c&&this.$$addClassImmediately(a,c);d&&this.$$removeClassImmediately(a,d);k(a,e);return l()},enabled:C,cancel:C}}]}],ja=T("$compile");wc.$inject=["$provide","$$sanitizeUriProvider"];var Rc=/^((?:x|data)[\:\-_])/i,Vc="application/json",Zb={"Content-Type":Vc+";charset=utf-8"},tf=/^\[|^\{(?!\{)/,uf={"[":/]$/,"{":/}$/},sf=/^\)\]\}',?\n/,$b=T("$interpolate"),Sf=/^([^\?#]*)(\?([^#]*))?(#(.*))?$/,
xf={http:80,https:443,ftp:21},Fb=T("$location"),Tf={$$html5:!1,$$replace:!1,absUrl:Gb("$$absUrl"),url:function(a){if(D(a))return this.$$url;var c=Sf.exec(a);(c[1]||""===a)&&this.path(decodeURIComponent(c[1]));(c[2]||c[1]||""===a)&&this.search(c[3]||"");this.hash(c[5]||"");return this},protocol:Gb("$$protocol"),host:Gb("$$host"),port:Gb("$$port"),path:dd("$$path",function(a){a=null!==a?a.toString():"";return"/"==a.charAt(0)?a:"/"+a}),search:function(a,c){switch(arguments.length){case 0:return this.$$search;
case 1:if(H(a)||V(a))a=a.toString(),this.$$search=qc(a);else if(P(a))a=Ea(a,{}),s(a,function(c,e){null==c&&delete a[e]}),this.$$search=a;else throw Fb("isrcharg");break;default:D(c)||null===c?delete this.$$search[a]:this.$$search[a]=c}this.$$compose();return this},hash:dd("$$hash",function(a){return null!==a?a.toString():""}),replace:function(){this.$$replace=!0;return this}};s([cd,dc,cc],function(a){a.prototype=Object.create(Tf);a.prototype.state=function(c){if(!arguments.length)return this.$$state;
if(a!==cc||!this.$$html5)throw Fb("nostate");this.$$state=D(c)?null:c;return this}});var la=T("$parse"),Uf=Function.prototype.call,Vf=Function.prototype.apply,Wf=Function.prototype.bind,lb=ha();s({"null":function(){return null},"true":function(){return!0},"false":function(){return!1},undefined:function(){}},function(a,c){a.constant=a.literal=a.sharedGetter=!0;lb[c]=a});lb["this"]=function(a){return a};lb["this"].sharedGetter=!0;var mb=z(ha(),{"+":function(a,c,d,e){d=d(a,c);e=e(a,c);return y(d)?y(e)?
d+e:d:y(e)?e:t},"-":function(a,c,d,e){d=d(a,c);e=e(a,c);return(y(d)?d:0)-(y(e)?e:0)},"*":function(a,c,d,e){return d(a,c)*e(a,c)},"/":function(a,c,d,e){return d(a,c)/e(a,c)},"%":function(a,c,d,e){return d(a,c)%e(a,c)},"===":function(a,c,d,e){return d(a,c)===e(a,c)},"!==":function(a,c,d,e){return d(a,c)!==e(a,c)},"==":function(a,c,d,e){return d(a,c)==e(a,c)},"!=":function(a,c,d,e){return d(a,c)!=e(a,c)},"<":function(a,c,d,e){return d(a,c)<e(a,c)},">":function(a,c,d,e){return d(a,c)>e(a,c)},"<=":function(a,
c,d,e){return d(a,c)<=e(a,c)},">=":function(a,c,d,e){return d(a,c)>=e(a,c)},"&&":function(a,c,d,e){return d(a,c)&&e(a,c)},"||":function(a,c,d,e){return d(a,c)||e(a,c)},"!":function(a,c,d){return!d(a,c)},"=":!0,"|":!0}),Xf={n:"\n",f:"\f",r:"\r",t:"\t",v:"\v","'":"'",'"':'"'},gc=function(a){this.options=a};gc.prototype={constructor:gc,lex:function(a){this.text=a;this.index=0;for(this.tokens=[];this.index<this.text.length;)if(a=this.text.charAt(this.index),'"'===a||"'"===a)this.readString(a);else if(this.isNumber(a)||
"."===a&&this.isNumber(this.peek()))this.readNumber();else if(this.isIdent(a))this.readIdent();else if(this.is(a,"(){}[].,;:?"))this.tokens.push({index:this.index,text:a}),this.index++;else if(this.isWhitespace(a))this.index++;else{var c=a+this.peek(),d=c+this.peek(2),e=mb[c],f=mb[d];mb[a]||e||f?(a=f?d:e?c:a,this.tokens.push({index:this.index,text:a,operator:!0}),this.index+=a.length):this.throwError("Unexpected next character ",this.index,this.index+1)}return this.tokens},is:function(a,c){return-1!==
c.indexOf(a)},peek:function(a){a=a||1;return this.index+a<this.text.length?this.text.charAt(this.index+a):!1},isNumber:function(a){return"0"<=a&&"9">=a&&"string"===typeof a},isWhitespace:function(a){return" "===a||"\r"===a||"\t"===a||"\n"===a||"\v"===a||"\u00a0"===a},isIdent:function(a){return"a"<=a&&"z">=a||"A"<=a&&"Z">=a||"_"===a||"$"===a},isExpOperator:function(a){return"-"===a||"+"===a||this.isNumber(a)},throwError:function(a,c,d){d=d||this.index;c=y(c)?"s "+c+"-"+this.index+" ["+this.text.substring(c,
d)+"]":" "+d;throw la("lexerr",a,c,this.text);},readNumber:function(){for(var a="",c=this.index;this.index<this.text.length;){var d=Q(this.text.charAt(this.index));if("."==d||this.isNumber(d))a+=d;else{var e=this.peek();if("e"==d&&this.isExpOperator(e))a+=d;else if(this.isExpOperator(d)&&e&&this.isNumber(e)&&"e"==a.charAt(a.length-1))a+=d;else if(!this.isExpOperator(d)||e&&this.isNumber(e)||"e"!=a.charAt(a.length-1))break;else this.throwError("Invalid exponent")}this.index++}this.tokens.push({index:c,
text:a,constant:!0,value:Number(a)})},readIdent:function(){for(var a=this.index;this.index<this.text.length;){var c=this.text.charAt(this.index);if(!this.isIdent(c)&&!this.isNumber(c))break;this.index++}this.tokens.push({index:a,text:this.text.slice(a,this.index),identifier:!0})},readString:function(a){var c=this.index;this.index++;for(var d="",e=a,f=!1;this.index<this.text.length;){var g=this.text.charAt(this.index),e=e+g;if(f)"u"===g?(f=this.text.substring(this.index+1,this.index+5),f.match(/[\da-f]{4}/i)||
this.throwError("Invalid unicode escape [\\u"+f+"]"),this.index+=4,d+=String.fromCharCode(parseInt(f,16))):d+=Xf[g]||g,f=!1;else if("\\"===g)f=!0;else{if(g===a){this.index++;this.tokens.push({index:c,text:e,constant:!0,value:d});return}d+=g}this.index++}this.throwError("Unterminated quote",c)}};var gb=function(a,c,d){this.lexer=a;this.$filter=c;this.options=d};gb.ZERO=z(function(){return 0},{sharedGetter:!0,constant:!0});gb.prototype={constructor:gb,parse:function(a){this.text=a;this.tokens=this.lexer.lex(a);
a=this.statements();0!==this.tokens.length&&this.throwError("is an unexpected token",this.tokens[0]);a.literal=!!a.literal;a.constant=!!a.constant;return a},primary:function(){var a;this.expect("(")?(a=this.filterChain(),this.consume(")")):this.expect("[")?a=this.arrayDeclaration():this.expect("{")?a=this.object():this.peek().identifier&&this.peek().text in lb?a=lb[this.consume().text]:this.peek().identifier?a=this.identifier():this.peek().constant?a=this.constant():this.throwError("not a primary expression",
this.peek());for(var c,d;c=this.expect("(","[",".");)"("===c.text?(a=this.functionCall(a,d),d=null):"["===c.text?(d=a,a=this.objectIndex(a)):"."===c.text?(d=a,a=this.fieldAccess(a)):this.throwError("IMPOSSIBLE");return a},throwError:function(a,c){throw la("syntax",c.text,a,c.index+1,this.text,this.text.substring(c.index));},peekToken:function(){if(0===this.tokens.length)throw la("ueoe",this.text);return this.tokens[0]},peek:function(a,c,d,e){return this.peekAhead(0,a,c,d,e)},peekAhead:function(a,
c,d,e,f){if(this.tokens.length>a){a=this.tokens[a];var g=a.text;if(g===c||g===d||g===e||g===f||!(c||d||e||f))return a}return!1},expect:function(a,c,d,e){return(a=this.peek(a,c,d,e))?(this.tokens.shift(),a):!1},consume:function(a){if(0===this.tokens.length)throw la("ueoe",this.text);var c=this.expect(a);c||this.throwError("is unexpected, expecting ["+a+"]",this.peek());return c},unaryFn:function(a,c){var d=mb[a];return z(function(a,f){return d(a,f,c)},{constant:c.constant,inputs:[c]})},binaryFn:function(a,
c,d,e){var f=mb[c];return z(function(c,e){return f(c,e,a,d)},{constant:a.constant&&d.constant,inputs:!e&&[a,d]})},identifier:function(){for(var a=this.consume().text;this.peek(".")&&this.peekAhead(1).identifier&&!this.peekAhead(2,"(");)a+=this.consume().text+this.consume().text;return zf(a,this.options,this.text)},constant:function(){var a=this.consume().value;return z(function(){return a},{constant:!0,literal:!0})},statements:function(){for(var a=[];;)if(0<this.tokens.length&&!this.peek("}",")",
";","]")&&a.push(this.filterChain()),!this.expect(";"))return 1===a.length?a[0]:function(c,d){for(var e,f=0,g=a.length;f<g;f++)e=a[f](c,d);return e}},filterChain:function(){for(var a=this.expression();this.expect("|");)a=this.filter(a);return a},filter:function(a){var c=this.$filter(this.consume().text),d,e;if(this.peek(":"))for(d=[],e=[];this.expect(":");)d.push(this.expression());var f=[a].concat(d||[]);return z(function(f,h){var l=a(f,h);if(e){e[0]=l;for(l=d.length;l--;)e[l+1]=d[l](f,h);return c.apply(t,
e)}return c(l)},{constant:!c.$stateful&&f.every(ec),inputs:!c.$stateful&&f})},expression:function(){return this.assignment()},assignment:function(){var a=this.ternary(),c,d;return(d=this.expect("="))?(a.assign||this.throwError("implies assignment but ["+this.text.substring(0,d.index)+"] can not be assigned to",d),c=this.ternary(),z(function(d,f){return a.assign(d,c(d,f),f)},{inputs:[a,c]})):a},ternary:function(){var a=this.logicalOR(),c;if(this.expect("?")&&(c=this.assignment(),this.consume(":"))){var d=
this.assignment();return z(function(e,f){return a(e,f)?c(e,f):d(e,f)},{constant:a.constant&&c.constant&&d.constant})}return a},logicalOR:function(){for(var a=this.logicalAND(),c;c=this.expect("||");)a=this.binaryFn(a,c.text,this.logicalAND(),!0);return a},logicalAND:function(){for(var a=this.equality(),c;c=this.expect("&&");)a=this.binaryFn(a,c.text,this.equality(),!0);return a},equality:function(){for(var a=this.relational(),c;c=this.expect("==","!=","===","!==");)a=this.binaryFn(a,c.text,this.relational());
return a},relational:function(){for(var a=this.additive(),c;c=this.expect("<",">","<=",">=");)a=this.binaryFn(a,c.text,this.additive());return a},additive:function(){for(var a=this.multiplicative(),c;c=this.expect("+","-");)a=this.binaryFn(a,c.text,this.multiplicative());return a},multiplicative:function(){for(var a=this.unary(),c;c=this.expect("*","/","%");)a=this.binaryFn(a,c.text,this.unary());return a},unary:function(){var a;return this.expect("+")?this.primary():(a=this.expect("-"))?this.binaryFn(gb.ZERO,
a.text,this.unary()):(a=this.expect("!"))?this.unaryFn(a.text,this.unary()):this.primary()},fieldAccess:function(a){var c=this.identifier();return z(function(d,e,f){d=f||a(d,e);return null==d?t:c(d)},{assign:function(d,e,f){(f=a(d,f))||a.assign(d,f={});return c.assign(f,e)}})},objectIndex:function(a){var c=this.text,d=this.expression();this.consume("]");return z(function(e,f){var g=a(e,f),h=d(e,f);sa(h,c);return g?ta(g[h],c):t},{assign:function(e,f,g){var h=sa(d(e,g),c);(g=ta(a(e,g),c))||a.assign(e,
g={});return g[h]=f}})},functionCall:function(a,c){var d=[];if(")"!==this.peekToken().text){do d.push(this.expression());while(this.expect(","))}this.consume(")");var e=this.text,f=d.length?[]:null;return function(g,h){var l=c?c(g,h):y(c)?t:g,k=a(g,h,l)||C;if(f)for(var m=d.length;m--;)f[m]=ta(d[m](g,h),e);ta(l,e);if(k){if(k.constructor===k)throw la("isecfn",e);if(k===Uf||k===Vf||k===Wf)throw la("isecff",e);}l=k.apply?k.apply(l,f):k(f[0],f[1],f[2],f[3],f[4]);return ta(l,e)}},arrayDeclaration:function(){var a=
[];if("]"!==this.peekToken().text){do{if(this.peek("]"))break;a.push(this.expression())}while(this.expect(","))}this.consume("]");return z(function(c,d){for(var e=[],f=0,g=a.length;f<g;f++)e.push(a[f](c,d));return e},{literal:!0,constant:a.every(ec),inputs:a})},object:function(){var a=[],c=[];if("}"!==this.peekToken().text){do{if(this.peek("}"))break;var d=this.consume();d.constant?a.push(d.value):d.identifier?a.push(d.text):this.throwError("invalid key",d);this.consume(":");c.push(this.expression())}while(this.expect(","))
}this.consume("}");return z(function(d,f){for(var g={},h=0,l=c.length;h<l;h++)g[a[h]]=c[h](d,f);return g},{literal:!0,constant:c.every(ec),inputs:c})}};var Bf=ha(),Af=ha(),Cf=Object.prototype.valueOf,Ca=T("$sce"),ma={HTML:"html",CSS:"css",URL:"url",RESOURCE_URL:"resourceUrl",JS:"js"},ja=T("$compile"),Z=Y.createElement("a"),id=Ba(M.location.href);Dc.$inject=["$provide"];jd.$inject=["$locale"];ld.$inject=["$locale"];var od=".",Mf={yyyy:$("FullYear",4),yy:$("FullYear",2,0,!0),y:$("FullYear",1),MMMM:Ib("Month"),
MMM:Ib("Month",!0),MM:$("Month",2,1),M:$("Month",1,1),dd:$("Date",2),d:$("Date",1),HH:$("Hours",2),H:$("Hours",1),hh:$("Hours",2,-12),h:$("Hours",1,-12),mm:$("Minutes",2),m:$("Minutes",1),ss:$("Seconds",2),s:$("Seconds",1),sss:$("Milliseconds",3),EEEE:Ib("Day"),EEE:Ib("Day",!0),a:function(a,c){return 12>a.getHours()?c.AMPMS[0]:c.AMPMS[1]},Z:function(a){a=-1*a.getTimezoneOffset();return a=(0<=a?"+":"")+(Hb(Math[0<a?"floor":"ceil"](a/60),2)+Hb(Math.abs(a%60),2))},ww:qd(2),w:qd(1)},Lf=/((?:[^yMdHhmsaZEw']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|w+))(.*)/,
Kf=/^\-?\d+$/;kd.$inject=["$locale"];var Hf=da(Q),If=da(ub);md.$inject=["$parse"];var Td=da({restrict:"E",compile:function(a,c){if(!c.href&&!c.xlinkHref&&!c.name)return function(a,c){var f="[object SVGAnimatedString]"===Da.call(c.prop("href"))?"xlink:href":"href";c.on("click",function(a){c.attr(f)||a.preventDefault()})}}}),vb={};s(Eb,function(a,c){if("multiple"!=a){var d=ya("ng-"+c);vb[d]=function(){return{restrict:"A",priority:100,link:function(a,f,g){a.$watch(g[d],function(a){g.$set(c,!!a)})}}}}});
s(Nc,function(a,c){vb[c]=function(){return{priority:100,link:function(a,e,f){if("ngPattern"===c&&"/"==f.ngPattern.charAt(0)&&(e=f.ngPattern.match(Of))){f.$set("ngPattern",new RegExp(e[1],e[2]));return}a.$watch(f[c],function(a){f.$set(c,a)})}}}});s(["src","srcset","href"],function(a){var c=ya("ng-"+a);vb[c]=function(){return{priority:99,link:function(d,e,f){var g=a,h=a;"href"===a&&"[object SVGAnimatedString]"===Da.call(e.prop("href"))&&(h="xlinkHref",f.$attr[h]="xlink:href",g=null);f.$observe(c,function(c){c?
(f.$set(h,c),Qa&&g&&e.prop(g,f[h])):"href"===a&&f.$set(h,null)})}}}});var Jb={$addControl:C,$$renameControl:function(a,c){a.$name=c},$removeControl:C,$setValidity:C,$setDirty:C,$setPristine:C,$setSubmitted:C};rd.$inject=["$element","$attrs","$scope","$animate","$interpolate"];var yd=function(a){return["$timeout",function(c){return{name:"form",restrict:a?"EAC":"E",controller:rd,compile:function(a){a.addClass(Ra).addClass(kb);return{pre:function(a,d,g,h){if(!("action"in g)){var l=function(c){a.$apply(function(){h.$commitViewValue();
h.$setSubmitted()});c.preventDefault()};d[0].addEventListener("submit",l,!1);d.on("$destroy",function(){c(function(){d[0].removeEventListener("submit",l,!1)},0,!1)})}var k=h.$$parentForm,m=h.$name;m&&(fb(a,m,h,m),g.$observe(g.name?"name":"ngForm",function(c){m!==c&&(fb(a,m,t,m),m=c,fb(a,m,h,m),k.$$renameControl(h,m))}));d.on("$destroy",function(){k.$removeControl(h);m&&fb(a,m,t,m);z(h,Jb)})}}}}}]},Ud=yd(),ge=yd(!0),Nf=/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,Yf=/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
Zf=/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,$f=/^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,zd=/^(\d{4})-(\d{2})-(\d{2})$/,Ad=/^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,jc=/^(\d{4})-W(\d\d)$/,Bd=/^(\d{4})-(\d\d)$/,Cd=/^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,ag=/(\s+|^)default(\s+|$)/,Mb=new T("ngModel"),Dd={text:function(a,c,d,e,f,g){ib(a,c,d,e,f,g);hc(e)},date:jb("date",zd,Lb(zd,["yyyy","MM","dd"]),"yyyy-MM-dd"),"datetime-local":jb("datetimelocal",
Ad,Lb(Ad,"yyyy MM dd HH mm ss sss".split(" ")),"yyyy-MM-ddTHH:mm:ss.sss"),time:jb("time",Cd,Lb(Cd,["HH","mm","ss","sss"]),"HH:mm:ss.sss"),week:jb("week",jc,function(a,c){if(pa(a))return a;if(H(a)){jc.lastIndex=0;var d=jc.exec(a);if(d){var e=+d[1],f=+d[2],g=d=0,h=0,l=0,k=pd(e),f=7*(f-1);c&&(d=c.getHours(),g=c.getMinutes(),h=c.getSeconds(),l=c.getMilliseconds());return new Date(e,0,k.getDate()+f,d,g,h,l)}}return NaN},"yyyy-Www"),month:jb("month",Bd,Lb(Bd,["yyyy","MM"]),"yyyy-MM"),number:function(a,
c,d,e,f,g){td(a,c,d,e);ib(a,c,d,e,f,g);e.$$parserName="number";e.$parsers.push(function(a){return e.$isEmpty(a)?null:$f.test(a)?parseFloat(a):t});e.$formatters.push(function(a){if(!e.$isEmpty(a)){if(!V(a))throw Mb("numfmt",a);a=a.toString()}return a});if(d.min||d.ngMin){var h;e.$validators.min=function(a){return e.$isEmpty(a)||D(h)||a>=h};d.$observe("min",function(a){y(a)&&!V(a)&&(a=parseFloat(a,10));h=V(a)&&!isNaN(a)?a:t;e.$validate()})}if(d.max||d.ngMax){var l;e.$validators.max=function(a){return e.$isEmpty(a)||
D(l)||a<=l};d.$observe("max",function(a){y(a)&&!V(a)&&(a=parseFloat(a,10));l=V(a)&&!isNaN(a)?a:t;e.$validate()})}},url:function(a,c,d,e,f,g){ib(a,c,d,e,f,g);hc(e);e.$$parserName="url";e.$validators.url=function(a,c){var d=a||c;return e.$isEmpty(d)||Yf.test(d)}},email:function(a,c,d,e,f,g){ib(a,c,d,e,f,g);hc(e);e.$$parserName="email";e.$validators.email=function(a,c){var d=a||c;return e.$isEmpty(d)||Zf.test(d)}},radio:function(a,c,d,e){D(d.name)&&c.attr("name",++nb);c.on("click",function(a){c[0].checked&&
e.$setViewValue(d.value,a&&a.type)});e.$render=function(){c[0].checked=d.value==e.$viewValue};d.$observe("value",e.$render)},checkbox:function(a,c,d,e,f,g,h,l){var k=ud(l,a,"ngTrueValue",d.ngTrueValue,!0),m=ud(l,a,"ngFalseValue",d.ngFalseValue,!1);c.on("click",function(a){e.$setViewValue(c[0].checked,a&&a.type)});e.$render=function(){c[0].checked=e.$viewValue};e.$isEmpty=function(a){return!1===a};e.$formatters.push(function(a){return fa(a,k)});e.$parsers.push(function(a){return a?k:m})},hidden:C,
button:C,submit:C,reset:C,file:C},xc=["$browser","$sniffer","$filter","$parse",function(a,c,d,e){return{restrict:"E",require:["?ngModel"],link:{pre:function(f,g,h,l){l[0]&&(Dd[Q(h.type)]||Dd.text)(f,g,h,l[0],c,a,d,e)}}}}],kb="ng-valid",vd="ng-invalid",Ra="ng-pristine",Kb="ng-dirty",xd="ng-pending",bg=["$scope","$exceptionHandler","$attrs","$element","$parse","$animate","$timeout","$rootScope","$q","$interpolate",function(a,c,d,e,f,g,h,l,k,m){this.$modelValue=this.$viewValue=Number.NaN;this.$$rawModelValue=
t;this.$validators={};this.$asyncValidators={};this.$parsers=[];this.$formatters=[];this.$viewChangeListeners=[];this.$untouched=!0;this.$touched=!1;this.$pristine=!0;this.$dirty=!1;this.$valid=!0;this.$invalid=!1;this.$error={};this.$$success={};this.$pending=t;this.$name=m(d.name||"",!1)(a);var n=f(d.ngModel),q=n.assign,u=n,r=q,O=null,p=this;this.$$setOptions=function(a){if((p.$options=a)&&a.getterSetter){var c=f(d.ngModel+"()"),g=f(d.ngModel+"($$$p)");u=function(a){var d=n(a);G(d)&&(d=c(a));return d};
r=function(a,c){G(n(a))?g(a,{$$$p:p.$modelValue}):q(a,p.$modelValue)}}else if(!n.assign)throw Mb("nonassign",d.ngModel,va(e));};this.$render=C;this.$isEmpty=function(a){return D(a)||""===a||null===a||a!==a};var v=e.inheritedData("$formController")||Jb,w=0;sd({ctrl:this,$element:e,set:function(a,c){a[c]=!0},unset:function(a,c){delete a[c]},parentForm:v,$animate:g});this.$setPristine=function(){p.$dirty=!1;p.$pristine=!0;g.removeClass(e,Kb);g.addClass(e,Ra)};this.$setDirty=function(){p.$dirty=!0;p.$pristine=
!1;g.removeClass(e,Ra);g.addClass(e,Kb);v.$setDirty()};this.$setUntouched=function(){p.$touched=!1;p.$untouched=!0;g.setClass(e,"ng-untouched","ng-touched")};this.$setTouched=function(){p.$touched=!0;p.$untouched=!1;g.setClass(e,"ng-touched","ng-untouched")};this.$rollbackViewValue=function(){h.cancel(O);p.$viewValue=p.$$lastCommittedViewValue;p.$render()};this.$validate=function(){if(!V(p.$modelValue)||!isNaN(p.$modelValue)){var a=p.$$rawModelValue,c=p.$valid,d=p.$modelValue,e=p.$options&&p.$options.allowInvalid;
p.$$runValidators(p.$error[p.$$parserName||"parse"]?!1:t,a,p.$$lastCommittedViewValue,function(f){e||c===f||(p.$modelValue=f?a:t,p.$modelValue!==d&&p.$$writeModelToScope())})}};this.$$runValidators=function(a,c,d,e){function f(){var a=!0;s(p.$validators,function(e,f){var g=e(c,d);a=a&&g;h(f,g)});return a?!0:(s(p.$asyncValidators,function(a,c){h(c,null)}),!1)}function g(){var a=[],e=!0;s(p.$asyncValidators,function(f,g){var k=f(c,d);if(!k||!G(k.then))throw Mb("$asyncValidators",k);h(g,t);a.push(k.then(function(){h(g,
!0)},function(a){e=!1;h(g,!1)}))});a.length?k.all(a).then(function(){l(e)},C):l(!0)}function h(a,c){m===w&&p.$setValidity(a,c)}function l(a){m===w&&e(a)}w++;var m=w;(function(a){var c=p.$$parserName||"parse";if(a===t)h(c,null);else if(h(c,a),!a)return s(p.$validators,function(a,c){h(c,null)}),s(p.$asyncValidators,function(a,c){h(c,null)}),!1;return!0})(a)?f()?g():l(!1):l(!1)};this.$commitViewValue=function(){var a=p.$viewValue;h.cancel(O);if(p.$$lastCommittedViewValue!==a||""===a&&p.$$hasNativeValidators)p.$$lastCommittedViewValue=
a,p.$pristine&&this.$setDirty(),this.$$parseAndValidate()};this.$$parseAndValidate=function(){var c=p.$$lastCommittedViewValue,d=D(c)?t:!0;if(d)for(var e=0;e<p.$parsers.length;e++)if(c=p.$parsers[e](c),D(c)){d=!1;break}V(p.$modelValue)&&isNaN(p.$modelValue)&&(p.$modelValue=u(a));var f=p.$modelValue,g=p.$options&&p.$options.allowInvalid;p.$$rawModelValue=c;g&&(p.$modelValue=c,p.$modelValue!==f&&p.$$writeModelToScope());p.$$runValidators(d,c,p.$$lastCommittedViewValue,function(a){g||(p.$modelValue=
a?c:t,p.$modelValue!==f&&p.$$writeModelToScope())})};this.$$writeModelToScope=function(){r(a,p.$modelValue);s(p.$viewChangeListeners,function(a){try{a()}catch(d){c(d)}})};this.$setViewValue=function(a,c){p.$viewValue=a;p.$options&&!p.$options.updateOnDefault||p.$$debounceViewValueCommit(c)};this.$$debounceViewValueCommit=function(c){var d=0,e=p.$options;e&&y(e.debounce)&&(e=e.debounce,V(e)?d=e:V(e[c])?d=e[c]:V(e["default"])&&(d=e["default"]));h.cancel(O);d?O=h(function(){p.$commitViewValue()},d):
l.$$phase?p.$commitViewValue():a.$apply(function(){p.$commitViewValue()})};a.$watch(function(){var c=u(a);if(c!==p.$modelValue){p.$modelValue=p.$$rawModelValue=c;for(var d=p.$formatters,e=d.length,f=c;e--;)f=d[e](f);p.$viewValue!==f&&(p.$viewValue=p.$$lastCommittedViewValue=f,p.$render(),p.$$runValidators(t,c,f,C))}return c})}],ve=["$rootScope",function(a){return{restrict:"A",require:["ngModel","^?form","^?ngModelOptions"],controller:bg,priority:1,compile:function(c){c.addClass(Ra).addClass("ng-untouched").addClass(kb);
return{pre:function(a,c,f,g){var h=g[0],l=g[1]||Jb;h.$$setOptions(g[2]&&g[2].$options);l.$addControl(h);f.$observe("name",function(a){h.$name!==a&&l.$$renameControl(h,a)});a.$on("$destroy",function(){l.$removeControl(h)})},post:function(c,e,f,g){var h=g[0];if(h.$options&&h.$options.updateOn)e.on(h.$options.updateOn,function(a){h.$$debounceViewValueCommit(a&&a.type)});e.on("blur",function(e){h.$touched||(a.$$phase?c.$evalAsync(h.$setTouched):c.$apply(h.$setTouched))})}}}}}],xe=da({restrict:"A",require:"ngModel",
link:function(a,c,d,e){e.$viewChangeListeners.push(function(){a.$eval(d.ngChange)})}}),zc=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){e&&(d.required=!0,e.$validators.required=function(a,c){return!d.required||!e.$isEmpty(c)},d.$observe("required",function(){e.$validate()}))}}},yc=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){if(e){var f,g=d.ngPattern||d.pattern;d.$observe("pattern",function(a){H(a)&&0<a.length&&(a=new RegExp("^"+a+"$"));if(a&&
!a.test)throw T("ngPattern")("noregexp",g,a,va(c));f=a||t;e.$validate()});e.$validators.pattern=function(a){return e.$isEmpty(a)||D(f)||f.test(a)}}}}},Bc=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){if(e){var f=-1;d.$observe("maxlength",function(a){a=ba(a);f=isNaN(a)?-1:a;e.$validate()});e.$validators.maxlength=function(a,c){return 0>f||e.$isEmpty(a)||c.length<=f}}}}},Ac=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){if(e){var f=0;d.$observe("minlength",
function(a){f=ba(a)||0;e.$validate()});e.$validators.minlength=function(a,c){return e.$isEmpty(c)||c.length>=f}}}}},we=function(){return{restrict:"A",priority:100,require:"ngModel",link:function(a,c,d,e){var f=c.attr(d.$attr.ngList)||", ",g="false"!==d.ngTrim,h=g?U(f):f;e.$parsers.push(function(a){if(!D(a)){var c=[];a&&s(a.split(h),function(a){a&&c.push(g?U(a):a)});return c}});e.$formatters.push(function(a){return x(a)?a.join(f):t});e.$isEmpty=function(a){return!a||!a.length}}}},cg=/^(true|false|\d+)$/,
ye=function(){return{restrict:"A",priority:100,compile:function(a,c){return cg.test(c.ngValue)?function(a,c,f){f.$set("value",a.$eval(f.ngValue))}:function(a,c,f){a.$watch(f.ngValue,function(a){f.$set("value",a)})}}}},ze=function(){return{restrict:"A",controller:["$scope","$attrs",function(a,c){var d=this;this.$options=a.$eval(c.ngModelOptions);this.$options.updateOn!==t?(this.$options.updateOnDefault=!1,this.$options.updateOn=U(this.$options.updateOn.replace(ag,function(){d.$options.updateOnDefault=
!0;return" "}))):this.$options.updateOnDefault=!0}]}},Zd=["$compile",function(a){return{restrict:"AC",compile:function(c){a.$$addBindingClass(c);return function(c,e,f){a.$$addBindingInfo(e,f.ngBind);e=e[0];c.$watch(f.ngBind,function(a){e.textContent=a===t?"":a})}}}}],ae=["$interpolate","$compile",function(a,c){return{compile:function(d){c.$$addBindingClass(d);return function(d,f,g){d=a(f.attr(g.$attr.ngBindTemplate));c.$$addBindingInfo(f,d.expressions);f=f[0];g.$observe("ngBindTemplate",function(a){f.textContent=
a===t?"":a})}}}}],$d=["$sce","$parse","$compile",function(a,c,d){return{restrict:"A",compile:function(e,f){var g=c(f.ngBindHtml),h=c(f.ngBindHtml,function(a){return(a||"").toString()});d.$$addBindingClass(e);return function(c,e,f){d.$$addBindingInfo(e,f.ngBindHtml);c.$watch(h,function(){e.html(a.getTrustedHtml(g(c))||"")})}}}}],be=ic("",!0),de=ic("Odd",0),ce=ic("Even",1),ee=Ia({compile:function(a,c){c.$set("ngCloak",t);a.removeClass("ng-cloak")}}),fe=[function(){return{restrict:"A",scope:!0,controller:"@",
priority:500}}],Cc={},dg={blur:!0,focus:!0};s("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "),function(a){var c=ya("ng-"+a);Cc[c]=["$parse","$rootScope",function(d,e){return{restrict:"A",compile:function(f,g){var h=d(g[c],null,!0);return function(c,d){d.on(a,function(d){var f=function(){h(c,{$event:d})};dg[a]&&e.$$phase?c.$evalAsync(f):c.$apply(f)})}}}}]});var ie=["$animate",function(a){return{multiElement:!0,
transclude:"element",priority:600,terminal:!0,restrict:"A",$$tlb:!0,link:function(c,d,e,f,g){var h,l,k;c.$watch(e.ngIf,function(c){c?l||g(function(c,f){l=f;c[c.length++]=Y.createComment(" end ngIf: "+e.ngIf+" ");h={clone:c};a.enter(c,d.parent(),d)}):(k&&(k.remove(),k=null),l&&(l.$destroy(),l=null),h&&(k=tb(h.clone),a.leave(k).then(function(){k=null}),h=null))})}}}],je=["$templateRequest","$anchorScroll","$animate","$sce",function(a,c,d,e){return{restrict:"ECA",priority:400,terminal:!0,transclude:"element",
controller:ga.noop,compile:function(f,g){var h=g.ngInclude||g.src,l=g.onload||"",k=g.autoscroll;return function(f,g,q,s,r){var t=0,p,v,w,L=function(){v&&(v.remove(),v=null);p&&(p.$destroy(),p=null);w&&(d.leave(w).then(function(){v=null}),v=w,w=null)};f.$watch(e.parseAsResourceUrl(h),function(e){var h=function(){!y(k)||k&&!f.$eval(k)||c()},q=++t;e?(a(e,!0).then(function(a){if(q===t){var c=f.$new();s.template=a;a=r(c,function(a){L();d.enter(a,null,g).then(h)});p=c;w=a;p.$emit("$includeContentLoaded",
e);f.$eval(l)}},function(){q===t&&(L(),f.$emit("$includeContentError",e))}),f.$emit("$includeContentRequested",e)):(L(),s.template=null)})}}}}],Ae=["$compile",function(a){return{restrict:"ECA",priority:-400,require:"ngInclude",link:function(c,d,e,f){/SVG/.test(d[0].toString())?(d.empty(),a(Fc(f.template,Y).childNodes)(c,function(a){d.append(a)},{futureParentElement:d})):(d.html(f.template),a(d.contents())(c))}}}],ke=Ia({priority:450,compile:function(){return{pre:function(a,c,d){a.$eval(d.ngInit)}}}}),
le=Ia({terminal:!0,priority:1E3}),me=["$locale","$interpolate",function(a,c){var d=/{}/g,e=/^when(Minus)?(.+)$/;return{restrict:"EA",link:function(f,g,h){function l(a){g.text(a||"")}var k=h.count,m=h.$attr.when&&g.attr(h.$attr.when),n=h.offset||0,q=f.$eval(m)||{},u={},m=c.startSymbol(),r=c.endSymbol(),t=m+k+"-"+n+r,p=ga.noop,v;s(h,function(a,c){var d=e.exec(c);d&&(d=(d[1]?"-":"")+Q(d[2]),q[d]=g.attr(h.$attr[c]))});s(q,function(a,e){u[e]=c(a.replace(d,t))});f.$watch(k,function(c){c=parseFloat(c);var d=
isNaN(c);d||c in q||(c=a.pluralCat(c-n));c===v||d&&isNaN(v)||(p(),p=f.$watch(u[c],l),v=c)})}}}],ne=["$parse","$animate",function(a,c){var d=T("ngRepeat"),e=function(a,c,d,e,k,m,n){a[d]=e;k&&(a[k]=m);a.$index=c;a.$first=0===c;a.$last=c===n-1;a.$middle=!(a.$first||a.$last);a.$odd=!(a.$even=0===(c&1))};return{restrict:"A",multiElement:!0,transclude:"element",priority:1E3,terminal:!0,$$tlb:!0,compile:function(f,g){var h=g.ngRepeat,l=Y.createComment(" end ngRepeat: "+h+" "),k=h.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
if(!k)throw d("iexp",h);var m=k[1],n=k[2],q=k[3],u=k[4],k=m.match(/^(?:(\s*[\$\w]+)|\(\s*([\$\w]+)\s*,\s*([\$\w]+)\s*\))$/);if(!k)throw d("iidexp",m);var r=k[3]||k[1],y=k[2];if(q&&(!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(q)||/^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent)$/.test(q)))throw d("badident",q);var p,v,w,D,z={$id:Ma};u?p=a(u):(w=function(a,c){return Ma(c)},D=function(a){return a});return function(a,f,g,k,m){p&&(v=function(c,d,e){y&&(z[y]=c);z[r]=d;z.$index=e;return p(a,
z)});var u=ha();a.$watchCollection(n,function(g){var k,p,n=f[0],E,z=ha(),C,S,N,G,J,x,H;q&&(a[q]=g);if(Sa(g))J=g,p=v||w;else{p=v||D;J=[];for(H in g)g.hasOwnProperty(H)&&"$"!=H.charAt(0)&&J.push(H);J.sort()}C=J.length;H=Array(C);for(k=0;k<C;k++)if(S=g===J?k:J[k],N=g[S],G=p(S,N,k),u[G])x=u[G],delete u[G],z[G]=x,H[k]=x;else{if(z[G])throw s(H,function(a){a&&a.scope&&(u[a.id]=a)}),d("dupes",h,G,N);H[k]={id:G,scope:t,clone:t};z[G]=!0}for(E in u){x=u[E];G=tb(x.clone);c.leave(G);if(G[0].parentNode)for(k=0,
p=G.length;k<p;k++)G[k].$$NG_REMOVED=!0;x.scope.$destroy()}for(k=0;k<C;k++)if(S=g===J?k:J[k],N=g[S],x=H[k],x.scope){E=n;do E=E.nextSibling;while(E&&E.$$NG_REMOVED);x.clone[0]!=E&&c.move(tb(x.clone),null,B(n));n=x.clone[x.clone.length-1];e(x.scope,k,r,N,y,S,C)}else m(function(a,d){x.scope=d;var f=l.cloneNode(!1);a[a.length++]=f;c.enter(a,null,B(n));n=f;x.clone=a;z[x.id]=x;e(x.scope,k,r,N,y,S,C)});u=z})}}}}],oe=["$animate",function(a){return{restrict:"A",multiElement:!0,link:function(c,d,e){c.$watch(e.ngShow,
function(c){a[c?"removeClass":"addClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],he=["$animate",function(a){return{restrict:"A",multiElement:!0,link:function(c,d,e){c.$watch(e.ngHide,function(c){a[c?"addClass":"removeClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],pe=Ia(function(a,c,d){a.$watch(d.ngStyle,function(a,d){d&&a!==d&&s(d,function(a,d){c.css(d,"")});a&&c.css(a)},!0)}),qe=["$animate",function(a){return{restrict:"EA",require:"ngSwitch",controller:["$scope",function(){this.cases=
{}}],link:function(c,d,e,f){var g=[],h=[],l=[],k=[],m=function(a,c){return function(){a.splice(c,1)}};c.$watch(e.ngSwitch||e.on,function(c){var d,e;d=0;for(e=l.length;d<e;++d)a.cancel(l[d]);d=l.length=0;for(e=k.length;d<e;++d){var r=tb(h[d].clone);k[d].$destroy();(l[d]=a.leave(r)).then(m(l,d))}h.length=0;k.length=0;(g=f.cases["!"+c]||f.cases["?"])&&s(g,function(c){c.transclude(function(d,e){k.push(e);var f=c.element;d[d.length++]=Y.createComment(" end ngSwitchWhen: ");h.push({clone:d});a.enter(d,
f.parent(),f)})})})}}}],re=Ia({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,c,d,e,f){e.cases["!"+d.ngSwitchWhen]=e.cases["!"+d.ngSwitchWhen]||[];e.cases["!"+d.ngSwitchWhen].push({transclude:f,element:c})}}),se=Ia({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,c,d,e,f){e.cases["?"]=e.cases["?"]||[];e.cases["?"].push({transclude:f,element:c})}}),ue=Ia({restrict:"EAC",link:function(a,c,d,e,f){if(!f)throw T("ngTransclude")("orphan",
va(c));f(function(a){c.empty();c.append(a)})}}),Vd=["$templateCache",function(a){return{restrict:"E",terminal:!0,compile:function(c,d){"text/ng-template"==d.type&&a.put(d.id,c[0].text)}}}],eg=T("ngOptions"),te=da({restrict:"A",terminal:!0}),Wd=["$compile","$parse",function(a,c){var d=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,e={$setViewValue:C};
return{restrict:"E",require:["select","?ngModel"],controller:["$element","$scope","$attrs",function(a,c,d){var l=this,k={},m=e,n;l.databound=d.ngModel;l.init=function(a,c,d){m=a;n=d};l.addOption=function(c,d){La(c,'"option value"');k[c]=!0;m.$viewValue==c&&(a.val(c),n.parent()&&n.remove());d&&d[0].hasAttribute("selected")&&(d[0].selected=!0)};l.removeOption=function(a){this.hasOption(a)&&(delete k[a],m.$viewValue===a&&this.renderUnknownOption(a))};l.renderUnknownOption=function(c){c="? "+Ma(c)+" ?";
n.val(c);a.prepend(n);a.val(c);n.prop("selected",!0)};l.hasOption=function(a){return k.hasOwnProperty(a)};c.$on("$destroy",function(){l.renderUnknownOption=C})}],link:function(e,g,h,l){function k(a,c,d,e){d.$render=function(){var a=d.$viewValue;e.hasOption(a)?(C.parent()&&C.remove(),c.val(a),""===a&&p.prop("selected",!0)):D(a)&&p?c.val(""):e.renderUnknownOption(a)};c.on("change",function(){a.$apply(function(){C.parent()&&C.remove();d.$setViewValue(c.val())})})}function m(a,c,d){var e;d.$render=function(){var a=
new cb(d.$viewValue);s(c.find("option"),function(c){c.selected=y(a.get(c.value))})};a.$watch(function(){fa(e,d.$viewValue)||(e=qa(d.$viewValue),d.$render())});c.on("change",function(){a.$apply(function(){var a=[];s(c.find("option"),function(c){c.selected&&a.push(c.value)});d.$setViewValue(a)})})}function n(e,f,g){function h(a,c,d){T[A]=d;H&&(T[H]=c);return a(e,T)}function k(a){var c;if(u)if(M&&x(a)){c=new cb([]);for(var d=0;d<a.length;d++)c.put(h(M,null,a[d]),!0)}else c=new cb(a);else M&&(a=h(M,null,
a));return function(d,e){var f;f=M?M:B?B:F;return u?y(c.remove(h(f,d,e))):a===h(f,d,e)}}function l(){v||(e.$$postDigest(p),v=!0)}function m(a,c,d){a[c]=a[c]||0;a[c]+=d?1:-1}function p(){v=!1;var a={"":[]},c=[""],d,l,n,r,t;n=g.$viewValue;r=P(e)||[];var B=H?Object.keys(r).sort():r,x,A,D,F,N={};t=k(n);var I=!1,U,V;Q={};for(F=0;D=B.length,F<D;F++){x=F;if(H&&(x=B[F],"$"===x.charAt(0)))continue;A=r[x];d=h(J,x,A)||"";(l=a[d])||(l=a[d]=[],c.push(d));d=t(x,A);I=I||d;A=h(C,x,A);A=y(A)?A:"";V=M?M(e,T):H?B[F]:
F;M&&(Q[V]=x);l.push({id:V,label:A,selected:d})}u||(z||null===n?a[""].unshift({id:"",label:"",selected:!I}):I||a[""].unshift({id:"?",label:"",selected:!0}));x=0;for(B=c.length;x<B;x++){d=c[x];l=a[d];R.length<=x?(n={element:G.clone().attr("label",d),label:l.label},r=[n],R.push(r),f.append(n.element)):(r=R[x],n=r[0],n.label!=d&&n.element.attr("label",n.label=d));I=null;F=0;for(D=l.length;F<D;F++)d=l[F],(t=r[F+1])?(I=t.element,t.label!==d.label&&(m(N,t.label,!1),m(N,d.label,!0),I.text(t.label=d.label),
I.prop("label",t.label)),t.id!==d.id&&I.val(t.id=d.id),I[0].selected!==d.selected&&(I.prop("selected",t.selected=d.selected),Qa&&I.prop("selected",t.selected))):(""===d.id&&z?U=z:(U=w.clone()).val(d.id).prop("selected",d.selected).attr("selected",d.selected).prop("label",d.label).text(d.label),r.push(t={element:U,label:d.label,id:d.id,selected:d.selected}),m(N,d.label,!0),I?I.after(U):n.element.append(U),I=U);for(F++;r.length>F;)d=r.pop(),m(N,d.label,!1),d.element.remove()}for(;R.length>x;){l=R.pop();
for(F=1;F<l.length;++F)m(N,l[F].label,!1);l[0].element.remove()}s(N,function(a,c){0<a?q.addOption(c):0>a&&q.removeOption(c)})}var n;if(!(n=r.match(d)))throw eg("iexp",r,va(f));var C=c(n[2]||n[1]),A=n[4]||n[6],D=/ as /.test(n[0])&&n[1],B=D?c(D):null,H=n[5],J=c(n[3]||""),F=c(n[2]?n[1]:A),P=c(n[7]),M=n[8]?c(n[8]):null,Q={},R=[[{element:f,label:""}]],T={};z&&(a(z)(e),z.removeClass("ng-scope"),z.remove());f.empty();f.on("change",function(){e.$apply(function(){var a=P(e)||[],c;if(u)c=[],s(f.val(),function(d){d=
M?Q[d]:d;c.push("?"===d?t:""===d?null:h(B?B:F,d,a[d]))});else{var d=M?Q[f.val()]:f.val();c="?"===d?t:""===d?null:h(B?B:F,d,a[d])}g.$setViewValue(c);p()})});g.$render=p;e.$watchCollection(P,l);e.$watchCollection(function(){var a=P(e),c;if(a&&x(a)){c=Array(a.length);for(var d=0,f=a.length;d<f;d++)c[d]=h(C,d,a[d])}else if(a)for(d in c={},a)a.hasOwnProperty(d)&&(c[d]=h(C,d,a[d]));return c},l);u&&e.$watchCollection(function(){return g.$modelValue},l)}if(l[1]){var q=l[0];l=l[1];var u=h.multiple,r=h.ngOptions,
z=!1,p,v=!1,w=B(Y.createElement("option")),G=B(Y.createElement("optgroup")),C=w.clone();h=0;for(var A=g.children(),H=A.length;h<H;h++)if(""===A[h].value){p=z=A.eq(h);break}q.init(l,z,C);u&&(l.$isEmpty=function(a){return!a||0===a.length});r?n(e,g,l):u?m(e,g,l):k(e,g,l,q)}}}}],Yd=["$interpolate",function(a){var c={addOption:C,removeOption:C};return{restrict:"E",priority:100,compile:function(d,e){if(D(e.value)){var f=a(d.text(),!0);f||e.$set("value",d.text())}return function(a,d,e){var k=d.parent(),
m=k.data("$selectController")||k.parent().data("$selectController");m&&m.databound||(m=c);f?a.$watch(f,function(a,c){e.$set("value",a);c!==a&&m.removeOption(c);m.addOption(a,d)}):m.addOption(e.value,d);d.on("$destroy",function(){m.removeOption(e.value)})}}}}],Xd=da({restrict:"E",terminal:!1});M.angular.bootstrap?void 0:(Nd(),Pd(ga),B(Y).ready(function(){Jd(Y,sc)}))})(window,document);!window.angular.$$csp()&&window.angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}</style>');
//# sourceMappingURL=angular.min.js.map
;
define("angular", ["config","bootstrap"], (function (global) {
    return function () {
        var ret, fn;
        return ret || global.angular;
    };
}(this)));

/* jshint ignore:start */
(function (define) {

define('design/themeFiles',[],function () {
return {
'blitz' : [
'/preview.png',
'/images/404.png',
'/images/404_down.jpg',
'/images/about-1.jpg',
'/images/about-2.jpg',
'/images/about-3.jpg',
'/images/big_item1.jpg',
'/images/carousel1.jpg',
'/images/carousel2.jpg',
'/images/carousel3.jpg',
'/images/carousel4.jpg',
'/images/h-bottom.jpg',
'/images/h-logo.png',
'/images/item1.jpg',
'/images/item10.jpg',
'/images/item2.jpg',
'/images/item3.jpg',
'/images/item4.jpg',
'/images/item5.jpg',
'/images/item6.jpg',
'/images/item7.jpg',
'/images/item8.jpg',
'/images/item9.jpg',
'/images/logo.png',
'/images/placeholder.png',
'/images/slides1.jpg',
'/images/slides2.jpg',
'/lib/jquery.elevatezoom.js',
'/lib/owl.carousel.js',
'/lib/star-rating.min.js',
'/fonts/glyphicons-halflings-regular.eot',
'/fonts/glyphicons-halflings-regular.svg',
'/fonts/glyphicons-halflings-regular.ttf',
'/fonts/glyphicons-halflings-regular.woff',
'/fonts/roboto/roboto-black.eot',
'/fonts/roboto/roboto-black.ttf',
'/fonts/roboto/roboto-black.woff',
'/fonts/roboto/roboto-blackitalic.eot',
'/fonts/roboto/roboto-blackitalic.ttf',
'/fonts/roboto/roboto-blackitalic.woff',
'/fonts/roboto/roboto-bold.eot',
'/fonts/roboto/roboto-bold.ttf',
'/fonts/roboto/roboto-bold.woff',
'/fonts/roboto/roboto-boldcondensed.eot',
'/fonts/roboto/roboto-boldcondensed.ttf',
'/fonts/roboto/roboto-boldcondensed.woff',
'/fonts/roboto/roboto-boldcondenseditalic.eot',
'/fonts/roboto/roboto-boldcondenseditalic.ttf',
'/fonts/roboto/roboto-boldcondenseditalic.woff',
'/fonts/roboto/roboto-bolditalic.eot',
'/fonts/roboto/roboto-bolditalic.ttf',
'/fonts/roboto/roboto-bolditalic.woff',
'/fonts/roboto/roboto-condensed.eot',
'/fonts/roboto/roboto-condensed.ttf',
'/fonts/roboto/roboto-condensed.woff',
'/fonts/roboto/roboto-condenseditalic.eot',
'/fonts/roboto/roboto-condenseditalic.ttf',
'/fonts/roboto/roboto-condenseditalic.woff',
'/fonts/roboto/roboto-italic.eot',
'/fonts/roboto/roboto-italic.ttf',
'/fonts/roboto/roboto-italic.woff',
'/fonts/roboto/roboto-light.eot',
'/fonts/roboto/roboto-light.ttf',
'/fonts/roboto/roboto-light.woff',
'/fonts/roboto/roboto-lightitalic.eot',
'/fonts/roboto/roboto-lightitalic.ttf',
'/fonts/roboto/roboto-lightitalic.woff',
'/fonts/roboto/roboto-medium.eot',
'/fonts/roboto/roboto-medium.ttf',
'/fonts/roboto/roboto-medium.woff',
'/fonts/roboto/roboto-mediumitalic.eot',
'/fonts/roboto/roboto-mediumitalic.ttf',
'/fonts/roboto/roboto-mediumitalic.woff',
'/fonts/roboto/roboto-regular.eot',
'/fonts/roboto/roboto-regular.ttf',
'/fonts/roboto/roboto-regular.woff',
'/fonts/roboto/roboto-thin.eot',
'/fonts/roboto/roboto-thin.ttf',
'/fonts/roboto/roboto-thin.woff',
'/fonts/roboto/roboto-thinitalic.eot',
'/fonts/roboto/roboto-thinitalic.ttf',
'/fonts/roboto/roboto-thinitalic.woff',
'/fonts/roboto/roboto.css',
'/fonts/roboto/robotocondensed-light.eot',
'/fonts/roboto/robotocondensed-light.ttf',
'/fonts/roboto/robotocondensed-light.woff',
'/fonts/roboto/robotocondensed-lightitalic.eot',
'/fonts/roboto/robotocondensed-lightitalic.ttf',
'/fonts/roboto/robotocondensed-lightitalic.woff',
'/fonts/roboto/robotoslab-bold.eot',
'/fonts/roboto/robotoslab-bold.ttf',
'/fonts/roboto/robotoslab-bold.woff',
'/fonts/roboto/robotoslab-light.eot',
'/fonts/roboto/robotoslab-light.ttf',
'/fonts/roboto/robotoslab-light.woff',
'/fonts/roboto/robotoslab-regular.eot',
'/fonts/roboto/robotoslab-regular.ttf',
'/fonts/roboto/robotoslab-regular.woff',
'/fonts/roboto/robotoslab-thin.eot',
'/fonts/roboto/robotoslab-thin.ttf',
'/fonts/roboto/robotoslab-thin.woff',
'/scripts/init.js',
'/scripts/main.js',
'/scripts/cart/init.js',
'/scripts/category/controller.js',
'/scripts/category/init.js',
'/scripts/category/module.js',
'/scripts/common/controller.js',
'/scripts/common/init.js',
'/scripts/common/module.js',
'/scripts/pdp/controller.js',
'/scripts/pdp/init.js',
'/scripts/pdp/module.js',
'/scripts/visitor/init.js',
'/scripts/visitor/module.js',
'/scripts/visitor/controller/login.js',
'/styles/bootstrap-theme.css',
'/styles/style.css',
'/styles/lib/bootstrap/bootstrap.css',
'/styles/lib/bootstrap/bootstrap.css.map',
'/views/help.html',
'/views/index.html',
'/views/cart/quick-cart.html',
'/views/cart/view.html',
'/views/cms/page.html',
'/views/category/view.html',
'/views/category/modal/quick-view.html',
'/views/checkout/view.html',
'/views/checkout/view2.html',
'/views/checkout/modal/checkout-purchase-success.html',
'/views/checkout/modal/redirect.html',
'/views/common/about.html',
'/views/common/footer.html',
'/views/common/header.html',
'/views/common/home.html',
'/views/common/not-found.html',
'/views/common/navigation/breadcrumbs.html',
'/views/common/navigation/categories-items.html',
'/views/common/navigation/categories.html',
'/views/common/navigation/filters.html',
'/views/common/navigation/main.html',
'/views/design/gui/guiListBar.html',
'/views/design/gui/guiMessageManager.html',
'/views/design/gui/guiPaginator.html',
'/views/design/gui/guiState.html',
'/views/pdp/view.html',
'/views/pdp/gui/guiCustomOptions.html',
'/views/visitor/account.html',
'/views/visitor/forgot-password.html',
'/views/visitor/login-page.html',
'/views/visitor/registration-page.html',
'/views/visitor/resend-activation.html',
'/views/visitor/account/address-manager.html',
'/views/visitor/account/billing-address.html',
'/views/visitor/account/menu.html',
'/views/visitor/account/order-details.html',
'/views/visitor/account/order.html',
'/views/visitor/account/shipping-address.html',
'/views/visitor/modal/login.html',
'/views/visitor/modal/registration.html',
]
};
});
})(window.define);
/* jshint ignore:end */;
/*
 AngularJS v1.3.7
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(n,h,p){function E(a){var d=[];s(d,h.noop).chars(a);return d.join("")}function g(a){var d={};a=a.split(",");var c;for(c=0;c<a.length;c++)d[a[c]]=!0;return d}function F(a,d){function c(a,b,c,l){b=h.lowercase(b);if(t[b])for(;f.last()&&u[f.last()];)e("",f.last());v[b]&&f.last()==b&&e("",b);(l=w[b]||!!l)||f.push(b);var m={};c.replace(G,function(a,b,d,c,e){m[b]=r(d||c||e||"")});d.start&&d.start(b,m,l)}function e(a,b){var c=0,e;if(b=h.lowercase(b))for(c=f.length-1;0<=c&&f[c]!=b;c--);
if(0<=c){for(e=f.length-1;e>=c;e--)d.end&&d.end(f[e]);f.length=c}}"string"!==typeof a&&(a=null===a||"undefined"===typeof a?"":""+a);var b,k,f=[],m=a,l;for(f.last=function(){return f[f.length-1]};a;){l="";k=!0;if(f.last()&&x[f.last()])a=a.replace(new RegExp("(.*)<\\s*\\/\\s*"+f.last()+"[^>]*>","i"),function(a,b){b=b.replace(H,"$1").replace(I,"$1");d.chars&&d.chars(r(b));return""}),e("",f.last());else{if(0===a.indexOf("\x3c!--"))b=a.indexOf("--",4),0<=b&&a.lastIndexOf("--\x3e",b)===b&&(d.comment&&d.comment(a.substring(4,
b)),a=a.substring(b+3),k=!1);else if(y.test(a)){if(b=a.match(y))a=a.replace(b[0],""),k=!1}else if(J.test(a)){if(b=a.match(z))a=a.substring(b[0].length),b[0].replace(z,e),k=!1}else K.test(a)&&((b=a.match(A))?(b[4]&&(a=a.substring(b[0].length),b[0].replace(A,c)),k=!1):(l+="<",a=a.substring(1)));k&&(b=a.indexOf("<"),l+=0>b?a:a.substring(0,b),a=0>b?"":a.substring(b),d.chars&&d.chars(r(l)))}if(a==m)throw L("badparse",a);m=a}e()}function r(a){if(!a)return"";var d=M.exec(a);a=d[1];var c=d[3];if(d=d[2])q.innerHTML=
d.replace(/</g,"&lt;"),d="textContent"in q?q.textContent:q.innerText;return a+d+c}function B(a){return a.replace(/&/g,"&amp;").replace(N,function(a){var c=a.charCodeAt(0);a=a.charCodeAt(1);return"&#"+(1024*(c-55296)+(a-56320)+65536)+";"}).replace(O,function(a){return"&#"+a.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}function s(a,d){var c=!1,e=h.bind(a,a.push);return{start:function(a,k,f){a=h.lowercase(a);!c&&x[a]&&(c=a);c||!0!==C[a]||(e("<"),e(a),h.forEach(k,function(c,f){var k=
h.lowercase(f),g="img"===a&&"src"===k||"background"===k;!0!==P[k]||!0===D[k]&&!d(c,g)||(e(" "),e(f),e('="'),e(B(c)),e('"'))}),e(f?"/>":">"))},end:function(a){a=h.lowercase(a);c||!0!==C[a]||(e("</"),e(a),e(">"));a==c&&(c=!1)},chars:function(a){c||e(B(a))}}}var L=h.$$minErr("$sanitize"),A=/^<((?:[a-zA-Z])[\w:-]*)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*(>?)/,z=/^<\/\s*([\w:-]+)[^>]*>/,G=/([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,K=/^</,
J=/^<\//,H=/\x3c!--(.*?)--\x3e/g,y=/<!DOCTYPE([^>]*?)>/i,I=/<!\[CDATA\[(.*?)]]\x3e/g,N=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,O=/([^\#-~| |!])/g,w=g("area,br,col,hr,img,wbr");n=g("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr");p=g("rp,rt");var v=h.extend({},p,n),t=h.extend({},n,g("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")),u=h.extend({},p,g("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var"));
n=g("animate,animateColor,animateMotion,animateTransform,circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,set,stop,svg,switch,text,title,tspan,use");var x=g("script,style"),C=h.extend({},w,t,u,v,n),D=g("background,cite,href,longdesc,src,usemap,xlink:href");n=g("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,target,title,type,valign,value,vspace,width");
p=g("accent-height,accumulate,additive,alphabetic,arabic-form,ascent,attributeName,attributeType,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan");
var P=h.extend({},D,p,n),q=document.createElement("pre"),M=/^(\s*)([\s\S]*?)(\s*)$/;h.module("ngSanitize",[]).provider("$sanitize",function(){this.$get=["$$sanitizeUri",function(a){return function(d){var c=[];F(d,s(c,function(c,b){return!/^unsafe/.test(a(c,b))}));return c.join("")}}]});h.module("ngSanitize").filter("linky",["$sanitize",function(a){var d=/((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"\u201d\u2019]/,c=/^mailto:/;return function(e,b){function k(a){a&&g.push(E(a))}
function f(a,c){g.push("<a ");h.isDefined(b)&&g.push('target="',b,'" ');g.push('href="',a.replace(/"/g,"&quot;"),'">');k(c);g.push("</a>")}if(!e)return e;for(var m,l=e,g=[],n,p;m=l.match(d);)n=m[0],m[2]||m[4]||(n=(m[3]?"http://":"mailto:")+n),p=m.index,k(l.substr(0,p)),f(n,m[0].replace(c,"")),l=l.substring(p+m[0].length);k(l);return a(g.join(""))}}])})(window,window.angular);
//# sourceMappingURL=angular-sanitize.min.js.map
;
define("angular-sanitize", function(){});

(function (define) {
    

    /**
     *  Angular "designModule" is very common module and responds for a top HTML page rendering stuff.
     *  It contains theming feature as well as ui editor controls directives. And even more.
     *
     *  (check other modules dependency before exclude this module from include list)
     *
     */
    define('design/init',[
            "angular",
            "angular-sanitize"
        ],
        function (angular) {

            angular.getTheme = function (path) {

                return function () {
                    var template, tpl;
                    tpl = "/views/" + path;

                    
                    template = "themes/" + angular.appConfigValue("themes.list.active") + tpl;
                    

                    return template;
                };
            };

            /**
             *  Angular "designModule" allows to use themes
             *
             *  default [themeName] is blank
             *  Usage:
             *      <ng-include src="getTemplate("common/footer.html")" />
             *      i.e. - getTemplate("someTemplate.html") = views/[themeName]/someTemplate.html
             *
             */
            angular.module.designModule = angular.module("designModule", ["ngSanitize"])

                .constant("MEDIA_BASE_PATH", angular.appConfigValue("general.app.media_path"))
                .constant("PRODUCT_DEFAULT_IMG", "placeholder.png")

                /**
                 *  Startup for designModule - registration globally visible functions
                 */
                .run(["$designService", "$rootScope", function ($designService, $rootScope) {

                    /**
                     *  Global functions you can use in any angular template
                     */
                    $rootScope.getTemplate = $designService.getTemplate;
                    $rootScope.getTopPage = $designService.getTopPage;
                    $rootScope.getCss = $designService.getCssList;
                    $rootScope.getImg = $designService.getImage;

                }]);

            return angular.module.designModule;
        }
    );
})(window.define);

(function (define) {
    

    /**
     *
     */
    define('design/service/states',["design/init"], function (designModule) {

        designModule
            /**
             *
             */
            .service("$designStateService", [ function () {
                return [
                    {
                        "Code": "AL",
                        "Name": "Alabama",
                        "Capital": "Montgomery"
                    },
                    {
                        "Code": "AK",
                        "Name": "Alaska",
                        "Capital": "Juneau"
                    },
                    {
                        "Code": "AZ",
                        "Name": "Arizona",
                        "Capital": "Phoenix"
                    },
                    {
                        "Code": "AR",
                        "Name": "Arkansas",
                        "Capital": "Little Rock"
                    },
                    {
                        "Code": "CA",
                        "Name": "California",
                        "Capital": "Sacramento"
                    },
                    {
                        "Code": "CO",
                        "Name": "Colorado",
                        "Capital": "Denver"
                    },
                    {
                        "Code": "CT",
                        "Name": "Connecticut",
                        "Capital": "Hartford"
                    },
                    {
                        "Code": "DE",
                        "Name": "Delaware",
                        "Capital": "Dover"
                    },
                    {
                        "Code": "FL",
                        "Name": "Florida",
                        "Capital": "Tallahassee"
                    },
                    {
                        "Code": "GA",
                        "Name": "Georgia",
                        "Capital": "Atlanta"
                    },
                    {
                        "Code": "HI",
                        "Name": "Hawaii",
                        "Capital": "Honolulu"
                    },
                    {
                        "Code": "ID",
                        "Name": "Idaho",
                        "Capital": "Boise"
                    },
                    {
                        "Code": "IL",
                        "Name": "Illinois",
                        "Capital": "Springfield"
                    },
                    {
                        "Code": "IN",
                        "Name": "Indiana",
                        "Capital": "Indianapolis"
                    },
                    {
                        "Code": "IA",
                        "Name": "Iowa",
                        "Capital": "Des Moines"
                    },
                    {
                        "Code": "KS",
                        "Name": "Kansas",
                        "Capital": "Topeka"
                    },
                    {
                        "Code": "KY",
                        "Name": "Kentucky",
                        "Capital": "Frankfort"
                    },
                    {
                        "Code": "LA",
                        "Name": "Louisiana",
                        "Capital": "Baton Rouge"
                    },
                    {
                        "Code": "ME",
                        "Name": "Maine",
                        "Capital": "Augusta"
                    },
                    {
                        "Code": "MD",
                        "Name": "Maryland",
                        "Capital": "Annapolis"
                    },
                    {
                        "Code": "MA",
                        "Name": "Massachusetts",
                        "Capital": "Boston"
                    },
                    {
                        "Code": "MI",
                        "Name": "Michigan",
                        "Capital": "Lansing"
                    },
                    {
                        "Code": "MN",
                        "Name": "Minnesota",
                        "Capital": "Saint Paul"
                    },
                    {
                        "Code": "MS",
                        "Name": "Mississippi",
                        "Capital": "Jackson"
                    },
                    {
                        "Code": "MO",
                        "Name": "Missouri",
                        "Capital": "Jefferson City"
                    },
                    {
                        "Code": "MT",
                        "Name": "Montana",
                        "Capital": "Helena"
                    },
                    {
                        "Code": "NE",
                        "Name": "Nebraska",
                        "Capital": "Lincoln"
                    },
                    {
                        "Code": "NV",
                        "Name": "Nevada",
                        "Capital": "Carson City"
                    },
                    {
                        "Code": "NH",
                        "Name": "New Hampshire",
                        "Capital": "Concord"
                    },
                    {
                        "Code": "NJ",
                        "Name": "New Jersey",
                        "Capital": "Trenton"
                    },
                    {
                        "Code": "NM",
                        "Name": "New Mexico",
                        "Capital": "Santa Fe"
                    },
                    {
                        "Code": "NY",
                        "Name": "New York",
                        "Capital": "Albany"
                    },
                    {
                        "Code": "NC",
                        "Name": "North Carolina",
                        "Capital": "Raleigh"
                    },
                    {
                        "Code": "ND",
                        "Name": "North Dakota",
                        "Capital": "Bismarck"
                    },
                    {
                        "Code": "OH",
                        "Name": "Ohio",
                        "Capital": "Columbus"
                    },
                    {
                        "Code": "OK",
                        "Name": "Oklahoma",
                        "Capital": "Oklahoma City"
                    },
                    {
                        "Code": "OR",
                        "Name": "Oregon",
                        "Capital": "Salem"
                    },
                    {
                        "Code": "PA",
                        "Name": "Pennsylvania",
                        "Capital": "Harrisburg"
                    },
                    {
                        "Code": "RI",
                        "Name": "Rhode Island",
                        "Capital": "Providence"
                    },
                    {
                        "Code": "SC",
                        "Name": "South Carolina",
                        "Capital": "Columbia"
                    },
                    {
                        "Code": "SD",
                        "Name": "South Dakota",
                        "Capital": "Pierre"
                    },
                    {
                        "Code": "TN",
                        "Name": "Tennessee",
                        "Capital": "Nashville"
                    },
                    {
                        "Code": "TX",
                        "Name": "Texas",
                        "Capital": "Austin"
                    },
                    {
                        "Code": "UT",
                        "Name": "Utah",
                        "Capital": "Salt Lake City"
                    },
                    {
                        "Code": "VT",
                        "Name": "Vermont",
                        "Capital": "Montpelier"
                    },
                    {
                        "Code": "VA",
                        "Name": "Virginia",
                        "Capital": "Richmond"
                    },
                    {
                        "Code": "WA",
                        "Name": "Washington",
                        "Capital": "Olympia"
                    },
                    {
                        "Code": "WV",
                        "Name": "West Virginia",
                        "Capital": "Charleston"
                    },
                    {
                        "Code": "WI",
                        "Name": "Wisconsin",
                        "Capital": "Madison"
                    },
                    {
                        "Code": "WY",
                        "Name": "Wyoming",
                        "Capital": "Cheyenne"
                    }
                ];
            }
            ]
        );
    });
})(window.define);

(function (define) {
    
    define('design/directives/validator/between',["design/init"], function (designModule) {

        var numberToLess = "The value is not within the specified range.";
        var numberToMore = "The value is not within the specified range.";

        designModule
            .directive("otBetween", function () {
                return {
                    restrict: 'A',
                    require: '?ngModel',
                    link: function (scope, elem, attrs, ngModel) {
                        var params = elem.attr('ot-between').split(",");

                        var validate = function (value) {
                            var valid;
                            if (typeof value !== "undefined" &&
                                parseFloat(value) < parseFloat(params[0])) {
                                ngModel.message = numberToLess;
                                valid = false;
                            } else if (typeof value !== "undefined" &&
                                parseFloat(value) > parseFloat(params[1]))   {
                                ngModel.message = numberToMore;
                                valid = false;
                            } else {
                                valid = true;
                            }

                            ngModel.$setValidity('ot-between', valid);
                            return valid ? value : undefined;
                        };

                        //For DOM -> model validation
                        ngModel.$parsers.unshift(validate);
                        //For model -> DOM validation
                        ngModel.$formatters.unshift(validate);
                    }
                };
            });
    });
})(window.define);
(function (define) {
    

    define('design/directives/validator/date',["design/init"], function (designModule) {

        var dateNotValid = "Please enter a valid date (mm/dd/yyyy)";

        designModule.directive("otDate", ["$commonUtilService", function ($commonUtilService) {
            return {
                restrict: 'A',
                require: '?ngModel',
                link: function (scope, elem, attrs, ngModel) {

                    var validate = function (value) {
                        var date = $commonUtilService.getDate(value);
                        var valid = (!isNaN(date) && value.length === 10);
                        ngModel.$setValidity('ot-date', valid);
                        if (!valid) {
                            ngModel.message = dateNotValid;
                        }

                        return value;
                    };

                    //For DOM -> model validation
                    ngModel.$parsers.unshift(validate);
                    //For model -> DOM validation
                    ngModel.$formatters.unshift(validate);
                }
            };
        }]);
    });
})(window.define);
(function (define) {
    
    define('design/directives/validator/email',["design/init"], function (designModule) {

        var re = new RegExp("^(([^<>()[\\]\\.,;:\\s@\"]+(\\.[^<>()[\\]\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$", "");
        var emailNotValid = "Please enter a valid email address. For example johndoe@domain.com.";

        designModule.directive("otEmail", function () {
            return {
                restrict: 'EA',
                require: '?ngModel',
                link: function (scope, elem, attrs, ngModel) {
                    var validate = function (value) {
                        var valid = re.test(value);
                        ngModel.$setValidity('ot-email', valid);
                        if (!valid) {
                            ngModel.message = emailNotValid;
                        }

                        return value;
                    };

                    //For DOM -> model validation
                    ngModel.$parsers.unshift(validate);
                    //For model -> DOM validation
                    ngModel.$formatters.unshift(validate);
                }
            };
        });
    });
})(window.define);
(function (define) {
    
    define('design/directives/validator/len',["design/init"], function (designModule) {

        var stringToShort = "Text length does not satisfy specified text range.";
        var stringToLong = "Text length does not satisfy specified text range.";

        designModule
            .directive("otLen", function () {
                return {
                    restrict: 'A',
                    require: '?ngModel',
                    link: function (scope, elem, attrs, ngModel) {
                        var params = elem.attr('ot-len').split(",");
                        var validate = function (value) {
                            var valid;
                            if (params.length === 1 && typeof value !== "undefined" && value.length !== parseInt(params[0], 10)) {
                                ngModel.message = stringToShort;
                                valid = false;
                            } else {
                                if (typeof value !== "undefined" &&
                                    value.length < parseInt(params[0], 10)) {
                                    ngModel.message = stringToShort;
                                    valid = false;
                                } else if (typeof value !== "undefined" && value.length > parseInt(params[1], 10)) {
                                    ngModel.message = stringToLong;
                                    valid = false;
                                } else {
                                    valid = true;
                                    ngModel.message = "";
                                }
                            }

                            ngModel.$setValidity('ot-len', valid);
                            return valid ? value : undefined;
                        };

                        //For DOM -> model validation
                        ngModel.$parsers.unshift(validate);
                        //For model -> DOM validation
                        ngModel.$formatters.unshift(validate);
                    }
                };
            });
    });
})(window.define);
(function (define) {
    

    define('design/directives/validator/number',["design/init"], function (designModule) {

        var re = new RegExp("^[\\-]*[\\d]+$", "");
        var integerNotValid = "Please enter a valid number in this field.";

        designModule.directive("otNumber", function () {
            return {
                restrict: 'A',
                require: '?ngModel',
                link: function (scope, elem, attrs, ngModel) {

                    var validate = function (value) {
                        var valid = re.test(value);
                        ngModel.$setValidity('ot-number', valid);
                        if (!valid) {
                            ngModel.message = integerNotValid;
                        }

                        return value;
                    };


                    //For DOM -> model validation
                    ngModel.$parsers.unshift(validate);
                    //For model -> DOM validation
                    ngModel.$formatters.unshift(validate);
                }
            };
        });
    });
})(window.define);
(function (define) {
    

    define('design/directives/validator/positive',["design/init"], function (designModule) {

        var re = new RegExp("^[\\-]*[\\d]+[\\.\\d]*$", "");
        var integerNotValid = "not valid number";
        var positiveNotValid = "value should be more than zero";

        designModule.directive("otPositive", function () {
            return {
                restrict: 'A',
                require: '?ngModel',
                link: function (scope, elem, attrs, ngModel) {

                    var validate = function (value) {
                        var valid;
                        valid = re.test(value);
                        if(!valid){
                            ngModel.$setValidity('ot-positive', valid);
                            if (!valid) {
                                ngModel.message = integerNotValid;
                            }

                            return value;
                        }

                        valid = parseFloat(value) >= 0;
                        ngModel.$setValidity('ot-positive', valid);
                        if (!valid) {
                            ngModel.message = positiveNotValid;
                        }

                        return value;
                    };


                    //For DOM -> model validation
                    ngModel.$parsers.unshift(validate);
                    //For model -> DOM validation
                    ngModel.$formatters.unshift(validate);
                }
            };
        });
    });
})(window.define);
(function (define) {
    
    define('design/directives/validator/price',["design/init"], function (designModule) {

        var re = new RegExp("^\\d*\\.*\\d{0,2}$", "");
        var priceNotValid = "not valid price";

        designModule
            .directive("otPrice", function () {
                return {
                    restrict: 'A',
                    require: '?ngModel',
                    link: function (scope, elem, attrs, ngModel) {

                        var validate = function (value) {
                            var valid = re.test(value);
                            ngModel.$setValidity('ot-price', valid);
                            if (!valid) {
                                ngModel.message = priceNotValid;
                            }

                            return value;
                        };

                        //For DOM -> model validation
                        ngModel.$parsers.unshift(validate);
                        //For model -> DOM validation
                        ngModel.$formatters.unshift(validate);
                    }
                };
            });
    });
})(window.define);
(function (define) {
    

    define('design/directives/validator/regexp',["design/init"], function (designModule) {

        var notValid = "The field is not valid";

        designModule.directive("otRegexp", function () {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, elem, attrs, ngModel) {
                    var regexpValue = elem.attr('ot-regexp');


                    var validate = function (value) {
                        var params = regexpValue.split(/['"],['"]/);
                        var regExp;

                        if (params.length > 1) {
                            regExp = new RegExp(params[0].trim("/,\""), params[1].trim("/,\""));

                        } else {
                            regExp = new RegExp(params[0].trim("/,\""), "g");
                        }

                        var valid = regExp.test(value);
                        ngModel.$setValidity('ot-regexp', valid);
                        if (!valid) {
                            ngModel.message = notValid;
                        }

                        return value;
                    };

                    //For DOM -> model validation
                    ngModel.$parsers.unshift(validate);
                    //For model -> DOM validation
                    ngModel.$formatters.unshift(validate);
                }
            };
        });
    });
})(window.define);
(function (define) {
    

    define('design/directives/validator/sku',["design/init"], function (designModule) {

        var maxLength = 150;
        var re = new RegExp("^[\\w\\d\\_\\-]{1," + maxLength + "}$", "i");
        var skuNotValid = "Please use only letters (a-z, A-Z), numbers (0-9) or underscore(_) in this field, first character should be a letter. Max length " + maxLength;
        var skuTooMuchLong = "Please use only letters (a-z), numbers (0-9) or underscore(_) in this field, first character should be a letter. Max length " + maxLength;

        designModule.directive("otSku", function () {
            return {
                restrict: 'A',
                require: '?ngModel',
                link: function (scope, elem, attrs, ngModel) {

                    var validate = function (value) {
                        if (typeof value !== "undefined" && value.length > maxLength) {
                            ngModel.$setValidity('ot-sku', false);
                            ngModel.message = skuTooMuchLong;

                            return false;
                        }

                        var valid = re.test(value);
                        ngModel.$setValidity('ot-sku', valid);
                        if (!valid) {
                            ngModel.message = skuNotValid;
                        }

                        return value;
                    };


                    //For DOM -> model validation
                    ngModel.$parsers.unshift(validate);
                    //For model -> DOM validation
                    ngModel.$formatters.unshift(validate);
                }
            };
        });
    });
})(window.define);
(function (define) {
    
    define('design/directives/validator/password',["design/init"], function (designModule) {
        var minLen, minCountUppercase, minCountLowercase, minCountNumbers, minCountSymbols, passwordNotValidLength,
            passwordNotEnoughLowercases, passwordNotEnoughUppercases, passwordNotEnoughNumbers, passwordNotEnoughSymbols;

        minLen = 8;
        minCountUppercase = 1;
        minCountLowercase = 1;
        minCountNumbers = 1;
        minCountSymbols = 1;

        passwordNotValidLength = "password should have " + minLen + " char or more";
        passwordNotEnoughLowercases = "password should have at least " + minCountUppercase + " lowercase";
        passwordNotEnoughUppercases = "password should have at least " + minCountUppercase + " uppercase";
        passwordNotEnoughNumbers = "password should have at least " + minCountNumbers + " numbers";
        passwordNotEnoughSymbols = "password should have at least " + minCountSymbols + " symbols";

        designModule.directive("otPassword", function () {
            return {
                restrict: 'EA',
                require: '?ngModel',
                link: function (scope, elem, attrs, ngModel) {
                    var checkLowercases = function (value) {
                        var matches = value.match(/([a-z]+)/g);
                        return (matches === null || (matches !== null && matches.join("").length < minCountLowercase));
                    };
                    var checkUppercases = function (value) {
                        var matches = value.match(/([A-Z]+)/g);
                        return (matches === null || (matches !== null && matches.join("").length < minCountUppercase));
                    };
                    var checkNumbers = function (value) {
                        var matches = value.match(/([\d]+)/g);
                        return (matches === null || (matches !== null && matches.join("").length < minCountNumbers));
                    };
                    var checkSymbols = function (value) {
                        var matches = value.match(/([\!\@\#\\$\%\^\&\*\(\)\_\+\-\~]+)/g);
                        return (matches === null || (matches !== null && matches.join("").length < minCountSymbols));
                    };
                    var validate = function (value) {
                        /*jshint maxcomplexity:6 */
                        var valid = true;
                        if (value.length < minLen) {
                            valid = false;
                            ngModel.message = passwordNotValidLength;
                        }
                        if (checkLowercases(value)) {
                            valid = false;
                            ngModel.message = passwordNotEnoughLowercases;
                        }
                        if (checkUppercases(value)) {
                            valid = false;
                            ngModel.message = passwordNotEnoughUppercases;
                        }
                        if (checkNumbers(value)) {
                            valid = false;
                            ngModel.message = passwordNotEnoughNumbers;
                        }
                        if (checkSymbols(value)) {
                            valid = false;
                            ngModel.message = passwordNotEnoughSymbols;
                        }
                        ngModel.$setValidity('ot-password', valid);
                        return value;
                    };

                    //For DOM -> model validation
                    ngModel.$parsers.unshift(validate);
                    //For model -> DOM validation
                    ngModel.$formatters.unshift(validate);
                }
            };
        });
    });
})(window.define);

(function (define) {
    

    define('design/directives/guiBlock',['design/init'], function (designModule) {

        designModule.directive('guiBlock', [
            '$location',
            '$designService',
            '$sce',
            '$cmsApiService',
            function ($location, $designService, $sce, $cmsApiService) {
                return {
                    restrict: 'E',
                    scope: {
                        'identifier': '@name'
                    },
                    template: "<div class='custom-block' ng-bind-html='showContent()'></div>",
                    controller: function ($scope) {

                        $cmsApiService.getBlock({"blockID": $scope.identifier}).$promise.then(
                            function (response) {
                                if (response.error === null) {
                                    $scope.block = response.result;
                                }
                            }
                        );

                        $scope.showContent = function () {
                            if (typeof $scope.block === "undefined") {
                                return "";
                            }
                            return $sce.trustAsHtml($scope.block.content);
                        };
                    }
                };
            }]);

        return designModule;
    });
})(window.define);

(function (define) {
    

    define('design/directives/guiListBar',["design/init"], function (designModule) {

        designModule.directive("guiListBar", ["$designService", function ($designService) {
            return {
                restrict: "E",
                scope: {
                    "parent": "=object",
                    "items": "=items"
                },
                templateUrl: $designService.getTemplate("design/gui/guiListBar.html"),
                controller: function ($scope) {
                    $scope.blocks = {
                        "sort": false,
                        "search": false,
                        "filter": false
                    };

                    $scope.toggleBlock = function (block) {
                        return $scope.blocks[block] ? $scope.blocks[block] = false : $scope.blocks[block] = true;
                    };


                }
            };
        }]);

        return designModule;
    });
})(window.define);

(function (define) {
    

    define('design/directives/guiPaginator',['design/init'], function (designModule) {

        designModule.directive('guiPaginator', ['$location', '$designService', function ($location, $designService) {
            return {
                restrict: 'E',
                scope: {
                    'parent': '=object'
                },
                templateUrl: $designService.getTemplate('design/gui/guiPaginator.html'),
                controller: function ($scope) {
                    /**
                     * Prepares array of pages
                     *
                     * @returns {Array}
                     */
                    $scope.getPages = function () {
                        var p, result;
                        result = [];
                        for (p = 1; p <= $scope.parent.pages; p += 1) {
                            result.push(p);
                        }
                        return result;
                    };

                    $scope.isShow = function () {
                        if($scope.parent.pages <= 1 || $scope.parent.clickMore){
                            return false;
                        }

                        return true;
                    };

                    /**
                     * Gets class for item of paginator
                     *
                     * @param {string} page
                     * @returns {string}
                     */
                    $scope.getClass = function (page) {
                        var _class;
                        _class = "";

                        if (page === parseInt(($scope.parent.currentPage + 1), 10)) {
                            _class = 'active';
                        } else {
                            if ("prev" === page && $scope.parent.currentPage === 0) {
                                _class = 'disabled';
                            } else if ("next" === page && $scope.parent.currentPage + 1 >= $scope.parent.pages) {
                                _class = 'disabled';
                            }
                        }

                        return _class;
                    };

                    $scope.showMoreBtn = function () {
                        var countLoadedGoods;
                        countLoadedGoods = ($scope.parent.currentPage + 1) * $scope.parent.itemsPerPage;

                        if (countLoadedGoods >= $scope.parent.totalItems) {
                            return false;
                        }

                        return true;
                    };

                    $scope.loadMore = $scope.parent.loadMore;

                    /**
                     * Gets URI for item of paginator
                     *
                     * @param {string} page
                     * @returns {string}
                     */
                    $scope.getURI = function (page) {
                        var _page;
                        _page = 1;
                        switch (page) {
                            case 'prev':
                                if ($scope.parent.currentPage !== 0) {
                                    _page = $scope.parent.currentPage;
                                }
                                break;
                            case 'next':
                                if ($scope.parent.currentPage < $scope.parent.pages - 1) {
                                    _page = $scope.parent.currentPage + 2;
                                } else {
                                    _page = $scope.parent.pages;
                                }
                                break;
                            default:
                                _page = page;
                        }
                        $location.search("p", _page);
//                        return $scope.parent.uri.replace(':page', _page);
                    };
                }
            };
        }]);

        return designModule;
    });
})(window.define);

(function (define) {
    

    define('design/directives/guiMessageManager',["design/init"], function (designModule) {

        designModule.directive("guiMessageManager", ["$designService", "$timeout", function ($designService, $timeout) {
            return {
                restrict: "E",
                scope: {
                    "obj": "=item"
                },
                templateUrl: $designService.getTemplate("design/gui/guiMessageManager.html"),
                link: function ($scope) {
                    var timeout;
                    $scope.isShow = false;
                    $scope.$watch("obj", function () {

                        if (typeof $scope.obj !== "undefined") {

                            $scope.msg = $scope.obj.message;
                            $scope.type = $scope.obj.type || "success";
                            $scope.isShow = true;
                            timeout = $scope.obj.timeout;

                            if(timeout > 0) {
                                $timeout(function () {
                                    $scope.close();
                                }, 2000);
                            }
                        }

                    });

                    $scope.close = function () {
                        $scope.isShow = false;
                        $scope.msg = false;
                    };

                }
            };
        }]);

        return designModule;
    });
})(window.define);

(function (define) {
    

    /*
     *  HTML top page header manipulation stuff
     */
    define('design/service/image',["design/init"], function (designModule) {

        designModule
            /*
             *  $designImageService implementation
             */
            .service("$designImageService", [
                "$designService",
                "MEDIA_BASE_PATH",
                "PRODUCT_DEFAULT_IMG",
                function ($designService, MEDIA_BASE_PATH, PRODUCT_DEFAULT_IMG) {
                    var getFullImagePath, applySize;

                    applySize = function(path, filename, size) {
                        var src;
                        var imageName = new RegExp("(.+)(\\.)(.gif|png|jpg|jpeg|ico)$", "i");
                        var match = filename.match(imageName);
                        if(match instanceof Array && typeof size !== "undefined"){
                            src = MEDIA_BASE_PATH + path + match[1] + "_" + size + "." + match[3];
                        } else {
                            src = MEDIA_BASE_PATH + path + filename;
                        }

                        return src;
                    };

                    getFullImagePath = function (path, filename, size) {
                        var src, imgRegExp;
                        imgRegExp = new RegExp(".gif|png|jpg|jpeg|ico$", "i");

                        if (typeof path === "undefined" || typeof filename === "undefined" || filename === "" || !imgRegExp.test(filename)) {
                            src = $designService.getImage(PRODUCT_DEFAULT_IMG);
                        } else {
                            src = applySize(path, filename, size);
                        }


                        return src;
                    };

                    return {
                        getFullImagePath: getFullImagePath
                    };
                }
            ]
        );


        return designModule;
    });

})(window.define);
(function (define) {
    

    define('design/service/design',["angular", "design/init"], function (angular, designModule) {
        designModule
        /**
         *  $designService allows to do operations over very top HTML page
         */
            .service("$designService", [function () {

                var data = { theme: angular.appConfigValue("themes.list.active"), topPage: "index.html", cssList: []};
                var isFullPathRegex = new RegExp("^http[s]?://", "i");
                var isCssRegex = new RegExp(".css$", "i");
                var themesDir = "themes/";

                return {
                    getTheme: function () {
                        return data.theme;
                    },

                    setTheme: function (newTheme) {
                        data.theme = newTheme;

                        angular.activeTheme = newTheme;
                        angular.appConfig["themes.list.active"] = newTheme;
                        data.cssList = [];

                        return data.theme;
                    },

                    getTopPage: function () {
                        return this.getTemplate(data.topPage);
                    },

                    setTopPage: function (newTopPage) {
                        data.topPage = newTopPage;

                        return data.topPage;
                    },

                    getTemplate: function (templateName) {
                        var template;

                        template = angular.getTheme(templateName)();

                        return template;
                    },

                    addCss: function (cssName) {
                        var fileName;

                        if (isFullPathRegex.test(cssName) === false && isCssRegex.test(cssName) === true) {
                            fileName = "/styles/" + cssName;

                            cssName = (themesDir + data.theme + fileName).replace(/\/+/, "/");
                            
                        }
                        data.cssList.push(cssName);

                        return cssName;
                    },

                    getCssList: function () {
                        var i, uniqueCss;
                        uniqueCss = [];
                        for (i = 0; i < data.cssList.length; i += 1) {
                            if (-1 === uniqueCss.indexOf(data.cssList[i])) {
                                uniqueCss.push(data.cssList[i]);
                            }
                        }

                        return uniqueCss;
                    },

                    getImage: function (img) {
                        var image;
                        img = "/images/" + img;

                        image = themesDir + data.theme + img;
                        

                        return image;
                    }
                };
            }]);

        return designModule;
    });
})(window.define);

(function (define) {
    

    /**
     *
     */
    define('design/service/api',["design/init"], function (designModule) {

        designModule
            /*
             *  $designApiService interaction service
             */
            .service("$designApiService", ["$resource", "REST_SERVER_URI", function ($resource, REST_SERVER_URI) {


                return $resource(REST_SERVER_URI, {}, {
                    "getActiveTheme": {
                        method: "GET",
                        params: { path: "@path" },
                        url: REST_SERVER_URI + "/config/value/:path"
                    }
                });
            }]);

        return designModule;
    });

})(window.define);
(function (define) {
    

    define('design/directives/design',["design/init"], function (designModule) {
        designModule
        /**
         *  Directive that allows to declare CSS inside module templates
         */
            .directive("addCss", ["$designService", function ($designService) {
                return {
                    restrict: "E",
                    link: function (scope, elem, attrs) {
                        var cssFile = attrs.src;
                        if (typeof cssFile !== "undefined" && cssFile !== "") {
                            $designService.addCss(cssFile);
                        }
                    }
                };
            }])

            /*
             *  Directive to solve browser auto-fill issue on model
             */
            .directive("autoFillSync", ["$timeout", function ($timeout) {
                return {
                    require: "ngModel",
                    link: function (scope, elem, attrs, ngModel) {
                        var origVal = elem.val();
                        $timeout(function () {
                            var newVal = elem.val();
                            if (ngModel.$pristine && origVal !== newVal) {
                                ngModel.$setViewValue(newVal);
                            }
                        }, 500);
                    }
                };
            }])

            /*
             *  jQuery layout directive
             */
            .directive("jqLayout", function () {
                return {
                    restrict: "A",
                    link: function (scope, elem) {
                        jQuery(elem).layout({ applyDefaultStyles: true });
                    }
                };
            })

            .directive('errSrc', ["$rootScope", function ($rootScope) {
                return {
                    link: function (scope, element, attrs) {
                        element.bind('error', function () {
                            if (attrs.src !== attrs.errSrc) {
                                attrs.$set('src', $rootScope.getImg(attrs.errSrc));
                            }
                        });
                    }
                };
            }])

            .directive('ngEnter', function () {
                return function (scope, element, attrs) {
                    element.bind("keydown keypress", function (event) {
                        if(event.which === 13) {
                            scope.$apply(function (){
                                scope.$eval(attrs.ngEnter);
                            });

                            event.preventDefault();
                        }
                    });
                };
            });

        return designModule;
    });
})(window.define);
(function (define) {
    

    /**
     *
     */
    define('design/module',[
			"design/service/states",

			"design/directives/validator/between",
			"design/directives/validator/date",
			"design/directives/validator/email",
			"design/directives/validator/len",
			"design/directives/validator/number",
			"design/directives/validator/positive",
			"design/directives/validator/price",
			"design/directives/validator/regexp",
			"design/directives/validator/sku",
			"design/directives/validator/password",

			"design/directives/guiBlock",
			"design/directives/guiListBar",
			"design/directives/guiPaginator",
			"design/directives/guiMessageManager",
            "design/service/image",
            "design/service/design",
            "design/service/api",
            "design/directives/design"
        ],
        function (designModule) {

            return designModule;
        });

})(window.define);
/*
 AngularJS v1.3.7
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(p,d,C){function v(r,h,g){return{restrict:"ECA",terminal:!0,priority:400,transclude:"element",link:function(a,c,b,f,y){function z(){k&&(g.cancel(k),k=null);l&&(l.$destroy(),l=null);m&&(k=g.leave(m),k.then(function(){k=null}),m=null)}function x(){var b=r.current&&r.current.locals;if(d.isDefined(b&&b.$template)){var b=a.$new(),f=r.current;m=y(b,function(b){g.enter(b,null,m||c).then(function(){!d.isDefined(t)||t&&!a.$eval(t)||h()});z()});l=f.scope=b;l.$emit("$viewContentLoaded");
l.$eval(w)}else z()}var l,m,k,t=b.autoscroll,w=b.onload||"";a.$on("$routeChangeSuccess",x);x()}}}function A(d,h,g){return{restrict:"ECA",priority:-400,link:function(a,c){var b=g.current,f=b.locals;c.html(f.$template);var y=d(c.contents());b.controller&&(f.$scope=a,f=h(b.controller,f),b.controllerAs&&(a[b.controllerAs]=f),c.data("$ngControllerController",f),c.children().data("$ngControllerController",f));y(a)}}}p=d.module("ngRoute",["ng"]).provider("$route",function(){function r(a,c){return d.extend(Object.create(a),
c)}function h(a,d){var b=d.caseInsensitiveMatch,f={originalPath:a,regexp:a},g=f.keys=[];a=a.replace(/([().])/g,"\\$1").replace(/(\/)?:(\w+)([\?\*])?/g,function(a,d,b,c){a="?"===c?c:null;c="*"===c?c:null;g.push({name:b,optional:!!a});d=d||"";return""+(a?"":d)+"(?:"+(a?d:"")+(c&&"(.+?)"||"([^/]+)")+(a||"")+")"+(a||"")}).replace(/([\/$\*])/g,"\\$1");f.regexp=new RegExp("^"+a+"$",b?"i":"");return f}var g={};this.when=function(a,c){var b=d.copy(c);d.isUndefined(b.reloadOnSearch)&&(b.reloadOnSearch=!0);
d.isUndefined(b.caseInsensitiveMatch)&&(b.caseInsensitiveMatch=this.caseInsensitiveMatch);g[a]=d.extend(b,a&&h(a,b));if(a){var f="/"==a[a.length-1]?a.substr(0,a.length-1):a+"/";g[f]=d.extend({redirectTo:a},h(f,b))}return this};this.caseInsensitiveMatch=!1;this.otherwise=function(a){"string"===typeof a&&(a={redirectTo:a});this.when(null,a);return this};this.$get=["$rootScope","$location","$routeParams","$q","$injector","$templateRequest","$sce",function(a,c,b,f,h,p,x){function l(b){var e=s.current;
(v=(n=k())&&e&&n.$$route===e.$$route&&d.equals(n.pathParams,e.pathParams)&&!n.reloadOnSearch&&!w)||!e&&!n||a.$broadcast("$routeChangeStart",n,e).defaultPrevented&&b&&b.preventDefault()}function m(){var u=s.current,e=n;if(v)u.params=e.params,d.copy(u.params,b),a.$broadcast("$routeUpdate",u);else if(e||u)w=!1,(s.current=e)&&e.redirectTo&&(d.isString(e.redirectTo)?c.path(t(e.redirectTo,e.params)).search(e.params).replace():c.url(e.redirectTo(e.pathParams,c.path(),c.search())).replace()),f.when(e).then(function(){if(e){var a=
d.extend({},e.resolve),b,c;d.forEach(a,function(b,e){a[e]=d.isString(b)?h.get(b):h.invoke(b,null,null,e)});d.isDefined(b=e.template)?d.isFunction(b)&&(b=b(e.params)):d.isDefined(c=e.templateUrl)&&(d.isFunction(c)&&(c=c(e.params)),c=x.getTrustedResourceUrl(c),d.isDefined(c)&&(e.loadedTemplateUrl=c,b=p(c)));d.isDefined(b)&&(a.$template=b);return f.all(a)}}).then(function(c){e==s.current&&(e&&(e.locals=c,d.copy(e.params,b)),a.$broadcast("$routeChangeSuccess",e,u))},function(b){e==s.current&&a.$broadcast("$routeChangeError",
e,u,b)})}function k(){var a,b;d.forEach(g,function(f,g){var q;if(q=!b){var h=c.path();q=f.keys;var l={};if(f.regexp)if(h=f.regexp.exec(h)){for(var k=1,m=h.length;k<m;++k){var n=q[k-1],p=h[k];n&&p&&(l[n.name]=p)}q=l}else q=null;else q=null;q=a=q}q&&(b=r(f,{params:d.extend({},c.search(),a),pathParams:a}),b.$$route=f)});return b||g[null]&&r(g[null],{params:{},pathParams:{}})}function t(a,b){var c=[];d.forEach((a||"").split(":"),function(a,d){if(0===d)c.push(a);else{var f=a.match(/(\w+)(?:[?*])?(.*)/),
g=f[1];c.push(b[g]);c.push(f[2]||"");delete b[g]}});return c.join("")}var w=!1,n,v,s={routes:g,reload:function(){w=!0;a.$evalAsync(function(){l();m()})},updateParams:function(a){if(this.current&&this.current.$$route){var b={},f=this;d.forEach(Object.keys(a),function(c){f.current.pathParams[c]||(b[c]=a[c])});a=d.extend({},this.current.params,a);c.path(t(this.current.$$route.originalPath,a));c.search(d.extend({},c.search(),b))}else throw B("norout");}};a.$on("$locationChangeStart",l);a.$on("$locationChangeSuccess",
m);return s}]});var B=d.$$minErr("ngRoute");p.provider("$routeParams",function(){this.$get=function(){return{}}});p.directive("ngView",v);p.directive("ngView",A);v.$inject=["$route","$anchorScroll","$animate"];A.$inject=["$compile","$controller","$route"]})(window,window.angular);
//# sourceMappingURL=angular-route.min.js.map
;
define("angular-route", function(){});

(function (define) {
    

    /**
     *  Angular "commonModule" declaration
     *  (module internal files refers to this instance)
     */
    define('common/init',[
            "angular",
            "angular-route",
            "angular-sanitize"

        ],
        function (angular) {
            /**
             *  Angular "commonModule" declaration
             */

            var otherwiseResolveFunc = function () {
            };

            var deferTemplateValue = "";
            var deferControllerValue = "";

            angular.REST_SERVER_URI = angular.appConfigValue("general.app.foundation_url");

            angular.module.commonModule = angular.module("commonModule", ["ngRoute", "ngSanitize", "designModule"])

                .value("DEFAULT_TITLE", "Ottemo store")
                .value("DEFAULT_KEYWORDS", "Ottemo store")
                .value("DEFAULT_DESCRIPTION", "Ottemo store")
                .value("REST_SERVER_URI", angular.REST_SERVER_URI)

            /**
             *  Basic routing configuration
             */
                .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
                    $routeProvider
                        .when("/", {
                            templateUrl: angular.getTheme("common/home.html"),
                            controller: "commonController"
                        })
                        .when("/not-found", {
                            templateUrl: angular.getTheme("common/not-found.html"),
                            controller: "commonController"
                        })
                        .when("/help", { templateUrl: "views/help.html"})
                        .when("/about.html", {
                            templateUrl: angular.getTheme("common/about.html"),
                            controller: ""
                        })
                        .otherwise({
                            template: function () {
                                otherwiseResolveFunc();
                                return deferTemplateValue;
                            },
                            controller: function () {
                                otherwiseResolveFunc();
                                return deferControllerValue;
                            }
                        });
                    $locationProvider.html5Mode(true);
                }])

                .run([
                    "$rootScope",
                    "$designService",
                    "$route",
                    "$http",
                    "$commonSidebarService",
                    "$location",
                    "$q",
                    "$commonPageService",
                    "$commonRewriteService",
                    "REST_SERVER_URI",
                    function ($rootScope, $designService, $route, $http, $commonSidebarService, $location, $q,
                              $commonPageService, $commonRewriteService, REST_SERVER_URI) {

                        /**
                         * Hides mini-cart after change url
                         */
                        $rootScope.$on("$locationChangeSuccess", function () {
                            $(".modal").modal('hide');
                        });

                        // ajax cookies support fix
                        $http.defaults.withCredentials = true;
                        delete $http.defaults.headers.common["X-Requested-With"];

                        $rootScope.page = $commonPageService;

                        // Left navigation menu
                        $commonSidebarService.addItem("HOME", "", "glyphicon glyphicon-home", 100);
                        $commonSidebarService.addItem("ABOUT", "about.html", "glyphicon glyphicon-info-sign");

                        $commonRewriteService.init();

                        $commonPageService.setTitle();
                        $commonPageService.setMetaDescription();
                        $commonPageService.setMetaKeywords();

                        otherwiseResolveFunc = function () {
                            if (otherwiseResolveFunc.inProgress === undefined) {

                                otherwiseResolveFunc.inProgress = true;

                                deferControllerValue = $q.defer();
                                deferTemplateValue = $q.defer();

                                var errorFunction = function () {
                                    $commonPageService.setTitle();
                                    $commonPageService.setMetaDescription();
                                    $commonPageService.setMetaKeywords();

                                    $location.$$path = "/not-found";
                                    $location.$$url = "/not-found";

                                    var route = $route.routes["/not-found"];

                                    deferTemplateValue.resolve(route.templateUrl);
                                    deferControllerValue.resolve(route.controller);

                                    delete(otherwiseResolveFunc.inProgress);
                                    $route.reload();
                                };

                                var successFunction = function (data, status, headers, config) {
                                    $commonPageService.setTitle();
                                    $commonPageService.setMetaDescription();
                                    $commonPageService.setMetaKeywords();
                                    if (data.error === null &&
                                        data.result instanceof Array &&
                                        data.result.length > 0) {
                                        var rewrite = data.result[0];
                                        if (rewrite.type !== "") {
                                            $location.$$path = "/" + rewrite.type + "/" + rewrite.rewrite;
                                            $location.$$url = $location.$$path;

                                            $commonPageService.setTitle(rewrite.title);
                                            $commonPageService.setMetaDescription(rewrite["meta_description"]);
                                            $commonPageService.setMetaKeywords(rewrite["meta_keywords"]);

                                            var route = $route.routes["/" + rewrite.type + "/:id"];

                                            deferTemplateValue.resolve(route.templateUrl);
                                            deferControllerValue.resolve(route.controller);
                                        } else {
                                            window.location = rewrite.rewrite;
                                        }

                                        delete(otherwiseResolveFunc.inProgress);
                                        $route.reload();
                                    } else {
                                        errorFunction(data, status, headers, config);
                                    }
                                };

                                $http({
                                    url: REST_SERVER_URI + "/seo/url/" + $location.$$path,
                                    method: "GET"
                                }).success(successFunction).error(errorFunction);
                            }
                        };
                    }
                ]
            );

            return angular.module.commonModule;
        });
})(window.define);

(function (define, $) {
    

    define('common/controllers',["angular", "common/init"], function (angular, commonModule) {

        commonModule
            /*
             *  HTML top page header manipulator (direct service mapping)
             */
            .controller("commonHeaderController", [
                "$scope",
                "$commonHeaderService",
                "$commonApiService",
                "$categoryService",
                function ($scope, $commonHeaderService, $commonApiService, $categoryService) {
                    
                    $scope.hideNav = function () {
                        $("#pageslide").css("display","none");
                        $(".mini-cart").css("display","none");
                        $(".h-block ul li.active").removeClass("active");
                        $(".h-block nav").removeClass("active");
                        $(".shadow").css("display","none");
                    };
                    
                    $scope.it = $commonHeaderService;
                    $scope.rightMenu = $commonHeaderService;
                    $scope.categories = [];
                    $scope.categoryService = $categoryService;

                    var tree;
                    tree = $categoryService.getTree();
                    if(typeof tree === "undefined"){
                        $commonApiService.getCategories().$promise.then(
                            function (response) {
                                var categories = response.result || [];
                                $scope.categories = categories;
                                $categoryService.setTree(categories);
                            }
                        );
                    } else {
                        $scope.categories = tree;
                    }
                }
            ])

            .controller("commonBreadcrumbsController", [
                "$scope",
                "$commonBreadcrumbsService",
                function ($scope, $commonBreadcrumbsService) {
                    $scope.it = $commonBreadcrumbsService;
                    $scope.crumbs = $commonBreadcrumbsService.getItems();
                }
            ])

            .controller("commonSidebarController", [
                "$scope",
                "$commonSidebarService",
                function ($scope, $commonSidebarService) {
                    $scope.sidebar = $commonSidebarService;
                    
                    
                    $scope.hideNav = function () {
                        $("#pageslide").css("display","none");
                        $(".mini-cart").css("display","none");
                        $(".h-block ul li.active").removeClass("active");
                    };
                    
                }

            ])

            .controller("commonController", [
                "$scope",
                "$designService",
                "$commonApiService",
                "$designImageService",
                "$commonBreadcrumbsService",
                "$cartService",
                "$pdpProductService",
                "$route",
                function ($scope, $designService, $commonApiService, $designImageService, $commonBreadcrumbsService,
                          $cartService, $pdpProductService, $route) {
                    /**
                     * Gets full path to image
                     *
                     * @param {object} product
                     * @returns {string}
                     */
                    $scope.getImage = function (img, size) {
                        return $designImageService.getFullImagePath("", img, size);
                    };

                    // HANDLERS FOR BREADCRUMBS (START)
                    //
                    $scope.$on("$locationChangeSuccess", function () {
                        $commonBreadcrumbsService.clear();
                        $commonBreadcrumbsService.addItem("Home", "/");
                    });

                    $scope.$on("add-breadcrumbs", function (event, param) {
                        $commonBreadcrumbsService.addItem(param.label, param.url);
                    });
                    //
                    // HANDLERS FOR BREADCRUMBS (START)


                    // Switching themes
                    $scope.theme = angular.appConfigValue("themes.list.active");
                    $scope.setTheme = function(){
                        $designService.setTheme($scope.theme);
                        $route.reload();
                    };

                    /**
                     * Cart initialization
                     */
                    $cartService.init();
                }
            ]
        );

        return commonModule;
    });
})(window.define, jQuery);
(function (define) {
    

    /*
     *  HTML top page header manipulation stuff
     */
    define('common/service/api',[
        "common/init"
    ], function (commonModule) {

        commonModule
            /*
             *  $productApiService interaction service
             */
            .service("$commonApiService", ["$resource", "REST_SERVER_URI", function ($resource, REST_SERVER_URI) {

                var methods = {
                    "getProducts": {
                        method: "GET",
                        url: REST_SERVER_URI + "/products"
                    },
                    "getCategories": {
                        method: "GET",
                        url: REST_SERVER_URI + "/categories/tree"
                    },
                    "getRewriteUrls": {
                        method: "GET",
                        url: REST_SERVER_URI + "/seo/items"
                    }
                };

                return $resource(REST_SERVER_URI, {}, methods);
            }]
        );

        return commonModule;
    });

})(window.define);
(function (define) {
    

    /*
     *  HTML top page header manipulation stuff
     */
    define('common/service/page',[
            "common/init"
        ],
        function (commonModule) {

            commonModule
                /*
                 *  $pageSidebarService implementation
                 */
                .service("$commonPageService", [
                    "DEFAULT_TITLE",
                    "DEFAULT_DESCRIPTION",
                    "DEFAULT_KEYWORDS",
                    function (DEFAULT_TITLE, DEFAULT_DESCRIPTION, DEFAULT_KEYWORDS) {
                        // Variables
                        var page;

                        // Functions
                        var getPage, getTitle, getMetaDescription, getMetaKeywords, setTitle, setMetaDescription, setMetaKeywords;

                        page = {
                            "title": "",
                            "metaKeywords": "",
                            "metaDescriptions": ""
                        };

                        setTitle = function (title) {
                            if ("" !== title && typeof title !== "undefined") {
                                page.title = title;
                            } else {
                                page.title = DEFAULT_TITLE || "";
                            }

                            return page.title;
                        };

                        setMetaDescription = function (description) {
                            if ("" !== description && typeof description !== "undefined") {
                                page.metaDescriptions = description;
                            } else {
                                page.metaDescriptions = DEFAULT_DESCRIPTION || "";
                            }

                            return page.metaDescriptions;
                        };

                        setMetaKeywords = function (keywords) {
                            if ("" !== keywords && typeof keywords !== "undefined") {
                                page.metaKeywords = keywords;
                            } else {
                                page.metaKeywords = DEFAULT_KEYWORDS || "";
                            }

                            return page.metaKeywords;
                        };


                        getTitle = function () {
                            return page.title;
                        };

                        getMetaDescription = function () {
                            return page.metaDescriptions;
                        };

                        getMetaKeywords = function () {
                            return page.metaKeywords;
                        };

                        getPage = function () {
                            return page;
                        };

                        return {
                            "getPage": getPage,
                            "setTitle": setTitle,
                            "setMetaDescription": setMetaDescription,
                            "setMetaKeywords": setMetaKeywords,
                            "getTitle": getTitle,
                            "getMetaDescription": getMetaDescription,
                            "getMetaKeywords": getMetaKeywords
                        };
                    }
                ]);

            return commonModule;
        });

})(window.define);
(function (define) {
    

    /*
     *  HTML top page header manipulation stuff
     */
    define('common/service/header',[

            'common/init'
        ],
        function (commonModule) {

            var getParentItem, parentItem, transformMenu, prepareLink;

            getParentItem = function (data, field, value) {
                for (var i in data) {
                    if (data.hasOwnProperty(i)) {
                        if (data[i][field] === value) {
                            parentItem = data[i];
                        }
                        var $subList = data[i].items;
                        if ($subList) {
                            getParentItem($subList, field, value);
                        }
                    }
                }

                return parentItem;
            };

            /**
             * Transforms simple array with menu items to the object array which includes array subitems
             * and returns this array
             *
             * @param menu
             * @returns {Array}
             */
            transformMenu = function (menu) { // jshint ignore:line
                var i, item, parentPath, tmpMenu;
                tmpMenu = [];
                menu.sort(function (obj1, obj2) {
                    return obj2.path < obj1.path;
                });

                for (i in menu) {
                    if (menu.hasOwnProperty(i)) {

                        parentItem = undefined;
                        item = menu[i];
                        /**
                         * Item belongs to the upper level.
                         * He has only one level in path
                         */
                        if (item.path.split('/').length <= 2) {
                            tmpMenu.push(item);
                        } else {
                            /**
                             * Gets from path parent path
                             * Exaample:
                             * for this item with path
                             * /item_1/sub_item_1/sub_item_1_1
                             *
                             * parent item should have path
                             * /item_1/sub_item_1
                             *
                             * @type {string}
                             */
                            parentPath = item.path.substr(0, item.path.lastIndexOf('/'));
                            if (getParentItem(menu, 'path', parentPath)) {
                                if (typeof parentItem.items === 'undefined') {
                                    parentItem.items = [];
                                }
                                parentItem.items.push(item);
                            }
                        }
                    }
                }
                return tmpMenu;
            };

            prepareLink = function (link) {
                var fullUrlRegex, href;
                fullUrlRegex = new RegExp('^http|https.', 'i');

                if (fullUrlRegex.test(link)) {
                    href = link;
                } else {
                    href = (link !== null ? link : null);
                }

                return href;
            };

            commonModule
                /*
                 *  $pageHeaderService implementation
                 */
                .service('$commonHeaderService', function () {
                    // Variables
                    var it;
                    // Functions
                    var addMenuRightItem, addMenuLeftItem, getMenuRight, getMenuLeft, removeItem, removeDups;
                    it = {
                        menuLeft: [],
                        menuRight: []
                    };

                    removeDups = function (arr) {
                        var i, item, tmp;
                        tmp = [];

                        for (i = 0; i < arr.length; i += 1) {
                            item = arr[i];

                            if (typeof item !== 'undefined') {
                                if (tmp.indexOf(item.path) > 0) {
                                    delete arr[i];
                                    continue;
                                }

                                tmp.push(item.path);
                            }

                        }
                    };

                    /**
                     * Adds the item to the right(user) menu
                     *
                     * @param {string} path
                     * @param {string} label
                     * @param {string} link
                     */
                    addMenuRightItem = function (path, label, link) {
                        var item = {path: path, label: label, link: prepareLink(link)};
                        it.menuRight.push(item);
                        removeDups(it.menuRight);
                    };

                    getMenuRight = function () {
                        return transformMenu(it.menuRight);
                    };

                    /**
                     * Adds the item to the top menu
                     *
                     * @param {string} path
                     * @param {string} label
                     * @param {string} link
                     */
                    addMenuLeftItem = function (path, label, link) {
                        var item = {path: path, label: label, link: prepareLink(link)};
                        it.menuLeft.push(item);
                        removeDups(it.menuRight);
                    };

                    getMenuLeft = function () {
                        return transformMenu(it.menuLeft);
                    };

                    removeItem = function (menu, path) {
                        var nameMenu, i, menuItem;

                        if (menu === 'left') {
                            nameMenu = 'menuLeft';
                        } else if (menu === 'right') {
                            nameMenu = 'menuRight';
                        } else {
                            return false;
                        }

                        for (i = 0; i < it[nameMenu].length; i += 1) {
                            menuItem = it[nameMenu][i];
                            if (menuItem.path === path) {
                                it[nameMenu].splice(i, 1);
                                return true;
                            }

                        }
                        return false;
                    };

                    return {

                        'addMenuRightItem': addMenuRightItem,
                        'getMenuRight': getMenuRight,
                        'addMenuLeftItem': addMenuLeftItem,
                        'getMenuLeft': getMenuLeft,
                        'removeItem': removeItem
                    };
                }
            );

            return commonModule;
        });

})(window.define);

(function (define) {
    

    /**
     *  HTML top page header manipulation stuff
     */
    define('common/service/breadcrumbs',[
            "common/init"
        ],
        function (commonModule) {

            commonModule
            /**
             *  $commonBreadcrumbsService implementation
             */
                .service("$commonBreadcrumbsService", [function () {
                    var addItem, getItems, items, clear, removeDups;
                    items = [];

                    /**
                     * Removes duplicates from breadcrumbs
                     *
                     * @returns {Array} - breadcrumbs items
                     */
                    removeDups = function () {
                        var i, item, tmp, hash;
                        tmp = [];

                        for (i = 0; i < items.length; i += 1) {
                            item = items[i];
                            hash = item.label + ":" + item.url;
                            if (-1 !== tmp.indexOf(hash)) {
                                items.splice(i, 1);
                            }
                            tmp.push(hash);
                        }

                        return items;
                    };

                    /**
                     * Adds item
                     *
                     * @param {string} label
                     * @param {string} url
                     */
                    addItem = function (label, url) {
                        var i, isPresent, item;
                        isPresent = false;
                        for (i = 0; i < items.length; i += 1) {
                            item = items[i];
                            if (item.label === label && item.url === url) {
                                isPresent = true;
                            }
                        }
                        if (!isPresent) {
                            items.push({"label": label, "url": url.replace(new RegExp("^[#]+"), "")});
                        }
                    };

                    /**
                     * Gets items
                     *
                     * @returns {Array}
                     */
                    getItems = function () {
                        return removeDups();
                    };

                    /**
                     * Removes all items
                     */
                    clear = function () {
                        items = [];
                    };

                    return {
                        addItem: addItem,
                        getItems: getItems,
                        clear: clear
                    };
                }]);

            return commonModule;
        });

})(window.define);
(function (define) {
    

    /*
     *  HTML top page header manipulation stuff
     */
    define('common/service/sidebar',[
            "common/init"
        ],
        function (commonModule) {

            commonModule
                /*
                 *  $pageSidebarService implementation
                 */
                .service("$commonSidebarService", [function () {
                    var addItem, getItems, getType, items, isImagePathRegex, removeItem, getUrl;
                    items = [];
                    isImagePathRegex = new RegExp(".gif|png|jpg|ico$", "i");

                    /**
                     * Adds item in the left sidebar
                     *
                     * @param {string} title
                     * @param {string} link
                     * @param {string} _class
                     * @param {number} sort - The list will be displayed in descending order by this field
                     */
                    addItem = function (title, link, icon, sort) {
                        sort = ( sort || 0 );
                        items.push({"title": title, "link": link, "icon": icon, "sort": sort});
                    };

                    /**
                     * Gets items for left sidebar
                     *
                     * @returns {Array}
                     */
                    getItems = function () {
                        return items.sort(function (a, b) {
                            return a.sort < b.sort;
                        });
                    };

                    /**
                     *
                     * @param {string} icon
                     * @returns {string}
                     */
                    getType = function (icon) {
                        var type;

                        if (isImagePathRegex.test(icon) === true) {
                            type = "image";
                        }
                        if (typeof icon !== "undefined" && icon.indexOf("glyphicon") !== -1) {
                            type = "glyphicon";
                        }

                        return type;
                    };

                    /**
                     *
                     * @param link
                     * @returns {boolean}
                     */
                    removeItem = function (link) {
                        var i, sidebarItem;

                        for (i = 0; i < items.length; i += 1) {
                            sidebarItem = items[i];
                            if (sidebarItem.link === link) {
                                items.splice(i, 1);
                            }
                        }

                        return false;
                    };

                    getUrl = function (path) {
                        var result, httpRegex;
                        httpRegex = new RegExp("^(http|https)://.+$", "i");
                        if (httpRegex.test(path) === true) {
                            result = path;
                        } else {
                            result = "/" + path;
                        }

                        return result;
                    };

                    return {
                        "addItem": addItem,
                        "getItems": getItems,
                        "getType": getType,
                        "getUrl": getUrl,
                        "removeItem": removeItem
                    };
                }]);

            return commonModule;
        });

})(window.define);
(function (define) {
    

    /**
     *  HTML top page header manipulation stuff
     */
    define('common/service/utils',["common/init"], function (commonModule) {

        /**
         * Extends String object
         *
         * @param {string} charlist
         * @returns {string}
         */
        String.prototype.trimLeft = function (charlist) {
            if (typeof charlist === "undefined") {
                charlist = "\\s";
            }

            return this.replace(new RegExp("^[" + charlist + "]+"), "");
        };

        /**
         * Extends String object
         *
         * @param {string} charlist
         * @returns {string}
         */
        String.prototype.trimRight = function (charlist) {
            if (typeof charlist === "undefined") {
                charlist = "\\s";
            }

            return this.replace(new RegExp("[" + charlist + "]+$"), "");
        };

        /**
         * Extends String object
         *
         * @param {string} charlist
         * @returns {string}
         */
        String.prototype.trim = function (charlist) {
            return this.trimLeft(charlist).trimRight(charlist);
        };

        /**
         *  $commonUtilService interaction service
         */
        commonModule.service("$commonUtilService", function () {
                var cloneObj, getMessage, getMessageByCode, getDate;

                cloneObj = function (obj) {
                    if (null === obj || "object" !== typeof obj) {
                        return obj;
                    }
                    var copy = obj.constructor();
                    for (var attr in obj) {
                        if (obj.hasOwnProperty(attr)) {
                            copy[attr] = obj[attr];
                        }
                    }
                    return copy;
                };

                /**
                 * Gets message text by code. If message by code not exist, returns default message from  error object
                 *
                 * @param {object} error - should contain code and default message for error
                 * @returns {string}
                 */
                getMessageByCode = function (error) {
                    var msgList = {};

                    return typeof msgList[error.code] !== "undefined" ? msgList[error.code].toString() : error.message;
                };

                /**
                 *
                 * @param {object} response
                 * @param {string} type
                 * @param {string} message
                 * @param {int} timeout
                 */
                getMessage = function (response, type, message, timeout) {
                    var messageObj, error;
                    messageObj = {};
                    error = {};

                    if (response !== null && response.error !== null) {
                        messageObj.type = "danger";
                        if (typeof message === "undefined" || message === null) {
                            error = response.error;
                        } else {
                            error = {"code": message, "message": message};
                        }
                    } else {
                        messageObj.type = type;
                        error = {"code": message, "message": message};
                    }

                    messageObj.message = getMessageByCode(error);
                    messageObj.timeout = timeout || null;

                    return messageObj;
                };

                /**
                 * Fix convert date from string to object. Need for Safari, IE
                 *
                 * @param dateStr
                 * @returns {Date}
                 */
                getDate = function (dateStr) {
                    var parts, date;
                    parts = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(Z|(\+|-)(\d{2}?):?(\d{2})?)$/.exec(dateStr);

                    if (parts === null) {
                        date = new Date();
                    } else {
                        date = new Date(parts[1], parts[2]-1, parts[3], parts[4], parts[5], parts[6]);
                    }

                    return date;
                };

                return {
                    "clone": cloneObj,
                    "getMessage": getMessage,
                    "getDate": getDate
                };
            }
        );

        return commonModule;
    });

})(window.define);
(function (define) {
    

    /**
     *  HTML top page header manipulation stuff
     */
    define('common/service/rewrite',[
            "common/init"
        ],
        function (commonModule) {

            commonModule
            /**
             *  $commonRewriteService implementation
             */
                .service("$commonRewriteService", [
                    "$q",
                    "$commonApiService",
                    function ($q, $commonApiService) {
                        // Variables
                        var rules, deferInit;

                        // Functions
                        var init, getRewrite;

                        deferInit = $q.defer();

                        init = function () {

                            if (typeof rules !== "undefined") {
                                return deferInit.promise;
                            }

                            $commonApiService.getRewriteUrls().$promise.then(
                                function (response) {
                                    rules = response.result || [];
                                    deferInit.resolve(rules);
                                }
                            );

                            return deferInit.promise;
                        };

                        getRewrite = function (type, id) {
                            if(typeof  rules === "undefined"){
                                return false;
                            }

                            var i;
                            for (i = 0; i < rules.length; i += 1){
                                if(rules[i].type === type && rules[i].rewrite === id){
                                    return rules[i].url;
                                }
                            }
                            return false;
                        };

                        return {
                            "init": init,
                            "getRewrite": getRewrite
                        };
                    }
                ]
            );

            return commonModule;
        });

})(window.define);
(function (define) {
    

    /*
     *  requireJS module entry point
     *  (to use that module you should include it to main.js)
     */
    define('common/module',[
            "common/controllers",

            "common/service/api",
            "common/service/page",
            "common/service/header",
            "common/service/breadcrumbs",
            "common/service/sidebar",
            "common/service/utils",
            "common/service/rewrite"
        ],
        function (commonModule) {

            return commonModule;
        });

})(window.define);
/*
 AngularJS v1.3.7
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(I,d,B){function D(f,q){q=q||{};d.forEach(q,function(d,h){delete q[h]});for(var h in f)!f.hasOwnProperty(h)||"$"===h.charAt(0)&&"$"===h.charAt(1)||(q[h]=f[h]);return q}var w=d.$$minErr("$resource"),C=/^(\.[a-zA-Z_$][0-9a-zA-Z_$]*)+$/;d.module("ngResource",["ng"]).provider("$resource",function(){var f=this;this.defaults={stripTrailingSlashes:!0,actions:{get:{method:"GET"},save:{method:"POST"},query:{method:"GET",isArray:!0},remove:{method:"DELETE"},"delete":{method:"DELETE"}}};
this.$get=["$http","$q",function(q,h){function t(d,g){this.template=d;this.defaults=s({},f.defaults,g);this.urlParams={}}function v(x,g,l,m){function c(b,k){var c={};k=s({},g,k);r(k,function(a,k){u(a)&&(a=a());var d;if(a&&a.charAt&&"@"==a.charAt(0)){d=b;var e=a.substr(1);if(null==e||""===e||"hasOwnProperty"===e||!C.test("."+e))throw w("badmember",e);for(var e=e.split("."),n=0,g=e.length;n<g&&d!==B;n++){var h=e[n];d=null!==d?d[h]:B}}else d=a;c[k]=d});return c}function F(b){return b.resource}function e(b){D(b||
{},this)}var G=new t(x,m);l=s({},f.defaults.actions,l);e.prototype.toJSON=function(){var b=s({},this);delete b.$promise;delete b.$resolved;return b};r(l,function(b,k){var g=/^(POST|PUT|PATCH)$/i.test(b.method);e[k]=function(a,y,m,x){var n={},f,l,z;switch(arguments.length){case 4:z=x,l=m;case 3:case 2:if(u(y)){if(u(a)){l=a;z=y;break}l=y;z=m}else{n=a;f=y;l=m;break}case 1:u(a)?l=a:g?f=a:n=a;break;case 0:break;default:throw w("badargs",arguments.length);}var t=this instanceof e,p=t?f:b.isArray?[]:new e(f),
A={},v=b.interceptor&&b.interceptor.response||F,C=b.interceptor&&b.interceptor.responseError||B;r(b,function(b,a){"params"!=a&&"isArray"!=a&&"interceptor"!=a&&(A[a]=H(b))});g&&(A.data=f);G.setUrlParams(A,s({},c(f,b.params||{}),n),b.url);n=q(A).then(function(a){var c=a.data,g=p.$promise;if(c){if(d.isArray(c)!==!!b.isArray)throw w("badcfg",k,b.isArray?"array":"object",d.isArray(c)?"array":"object");b.isArray?(p.length=0,r(c,function(a){"object"===typeof a?p.push(new e(a)):p.push(a)})):(D(c,p),p.$promise=
g)}p.$resolved=!0;a.resource=p;return a},function(a){p.$resolved=!0;(z||E)(a);return h.reject(a)});n=n.then(function(a){var b=v(a);(l||E)(b,a.headers);return b},C);return t?n:(p.$promise=n,p.$resolved=!1,p)};e.prototype["$"+k]=function(a,b,c){u(a)&&(c=b,b=a,a={});a=e[k].call(this,a,this,b,c);return a.$promise||a}});e.bind=function(b){return v(x,s({},g,b),l)};return e}var E=d.noop,r=d.forEach,s=d.extend,H=d.copy,u=d.isFunction;t.prototype={setUrlParams:function(f,g,l){var m=this,c=l||m.template,h,
e,q=m.urlParams={};r(c.split(/\W/),function(b){if("hasOwnProperty"===b)throw w("badname");!/^\d+$/.test(b)&&b&&(new RegExp("(^|[^\\\\]):"+b+"(\\W|$)")).test(c)&&(q[b]=!0)});c=c.replace(/\\:/g,":");g=g||{};r(m.urlParams,function(b,k){h=g.hasOwnProperty(k)?g[k]:m.defaults[k];d.isDefined(h)&&null!==h?(e=encodeURIComponent(h).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"%20").replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+"),c=c.replace(new RegExp(":"+
k+"(\\W|$)","g"),function(b,a){return e+a})):c=c.replace(new RegExp("(/?):"+k+"(\\W|$)","g"),function(b,a,c){return"/"==c.charAt(0)?c:a+c})});m.defaults.stripTrailingSlashes&&(c=c.replace(/\/+$/,"")||"/");c=c.replace(/\/\.(?=\w+($|\?))/,".");f.url=c.replace(/\/\\\./,"/.");r(g,function(b,c){m.urlParams[c]||(f.params=f.params||{},f.params[c]=b)})}};return v}]})})(window,window.angular);
//# sourceMappingURL=angular-resource.min.js.map
;
define("angular-resource", function(){});

(function (define, d) {
    

    define('visitor/service/facebook',['angular'], function (angular) {

        var init, avatarLarge, avatarMedium , avatarSmall, avatarSquare, getAvatar;

        avatarLarge = "graph.facebook.com/##facebookId##/picture?type=large";
        avatarMedium = "graph.facebook.com/##facebookId##/picture?type=normal";
        avatarSmall = "graph.facebook.com/##facebookId##/picture?type=small";
        avatarSquare = "graph.facebook.com/##facebookId##/picture?type=square";

        /**
         *
         */
        init = function () {
            var js, fjs = d.getElementsByTagName("script")[0];
            if (d.getElementById("facebook-jssdk")) {
                return;
            }
            js = d.createElement("script");
            js.id = "facebook-jssdk";
            js.src = "http://connect.facebook.net/ru_RU/sdk.js#xfbml=1&appId=" + angular.appConfigValue("general.app.login.facebook.appId") + "&version=v2.0";
            fjs.parentNode.insertBefore(js, fjs);
        };

        getAvatar = function (userId, size) {
            var url, regexp;
            regexp = /##facebookId##/;
            switch (size) {
                case "large" :
                    url = avatarLarge.replace(regexp, userId);
                    break;
                case "medium" :
                    url = avatarMedium.replace(regexp, userId);
                    break;
                case "square" :
                    url = avatarSquare.replace(regexp, userId);
                    break;
                case "small":
                    url = avatarSmall.replace(regexp, userId);
                    break;
                default:
                    url = avatarSmall.replace(regexp, userId);
            }
            return url;
        };

        return{
            appId: angular.appConfigValue("general.app.login.facebook.appId"),
            secretKey: angular.appConfigValue("general.app.login.facebook.secretKey"),
            init: init,
            getAvatar: getAvatar
        };

    });
})(window.define, window.document);
(function (define) {
    

    define('visitor/service/google',['angular'], function (angular) {

            var init, requestData, login, loginCallback, userData, avatar, getAvatar;
            userData = {'access_token': ''};

            avatar = 'https://plus.google.com/s2/photos/profile/##googleId##?sz=150';

            requestData = {
                'clientid': angular.appConfigValue("general.app.login.google.clientId"),
                'cookiepolicy': 'single_host_origin',
                'callback': 'loginCallback',
                'approvalprompt': 'force',
                'redirecturi': 'postmessage',
                'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email'
            };

            /**
             *
             */
            init = function () {
                var po = document.createElement('script');
                po.type = 'text/javascript';
                po.async = true;
                po.src = 'https://apis.google.com/js/client.js?onload=onLoadCallback';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(po, s);
            };

            login = function () {
                gapi.auth.signIn(requestData); //jshint ignore:line
            };

            loginCallback = function (response) {
                if (response.status["signed_in"]) {
                    userData = {
                        "access_token": response["access_token"]
                    };
                } else {
                    userData = {'access_token': ''};
                }
                return userData;
            };

            getAvatar = function (userId) {
                var url, regexp;
                regexp = /##googleId##/;
                url = avatar.replace(regexp, userId);
                return url;
            };

            return{
                clientId: angular.appConfigValue("general.app.login.google.clientId"),
                requestData: requestData,
                userData: userData,
                login: login,
                loginCallback: loginCallback,
                getAvatar: getAvatar,
                init: init
            };

        }
    )
    ;
})(window.define);

/*
 AngularJS v1.3.7
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(p,f,n){f.module("ngCookies",["ng"]).factory("$cookies",["$rootScope","$browser",function(e,b){var c={},g={},h,k=!1,l=f.copy,m=f.isUndefined;b.addPollFn(function(){var a=b.cookies();h!=a&&(h=a,l(a,g),l(a,c),k&&e.$apply())})();k=!0;e.$watch(function(){var a,d,e;for(a in g)m(c[a])&&b.cookies(a,n);for(a in c)d=c[a],f.isString(d)||(d=""+d,c[a]=d),d!==g[a]&&(b.cookies(a,d),e=!0);if(e)for(a in d=b.cookies(),c)c[a]!==d[a]&&(m(d[a])?delete c[a]:c[a]=d[a])});return c}]).factory("$cookieStore",
["$cookies",function(e){return{get:function(b){return(b=e[b])?f.fromJson(b):b},put:function(b,c){e[b]=f.toJson(c)},remove:function(b){delete e[b]}}}])})(window,window.angular);
//# sourceMappingURL=angular-cookies.min.js.map
;
define("angular-cookies", function(){});

(function (define) {
    

    define('visitor/init',[
            "angular",
            "angular-route",
            "angular-resource",
            "visitor/service/facebook",
            "visitor/service/google",
            "angular-cookies"
        ],
        function (angular, aRoute, aResource, fb, gl) {

            /**
             *  Angular "visitorModule" declaration
             */
            angular.module.visitorModule = angular.module("visitorModule", ["ngRoute", "ngResource", "ngCookies", "ngCookies"])

                .constant("LOGIN_COOKIE", "OTTEMOSESSION")
                .constant("VISITOR_DEFAULT_AVATAR", "avatar-placeholder.png")

            /**
             *  Basic routing configuration
             */
                .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {

                    fb.init();
                    gl.init();

                    $routeProvider
                        .when("/logout", {
                            template: "",
                            controller: "visitorLogoutController"
                        })
                        .when("/account", {
                            templateUrl: angular.getTheme("visitor/account.html"),
                            controller: "visitorAccountController"
                        })
                        .when("/account/address", {
                            templateUrl: angular.getTheme("visitor/account/address-manager.html"),
                            controller: "visitorAddressController"
                        })
                        .when("/account/orders", {
                            templateUrl: angular.getTheme("visitor/account/order.html"),
                            controller: "visitorOrderController"
                        })

                        .when("/account/order/:id", {
                            templateUrl: angular.getTheme("visitor/account/order-details.html"),
                            controller: "visitorOrderController"
                        })
                        .when("/login", {
                            templateUrl: angular.getTheme("visitor/login-page.html"),
                            controller: "visitorLoginController"
                        })
                        .when("/forgot-password", {
                            templateUrl: angular.getTheme("visitor/forgot-password.html"),
                            controller: "visitorLoginController"
                        })
                        .when("/resend-activation", {
                            templateUrl: angular.getTheme("visitor/resend-activation.html"),
                            controller: "visitorLoginController"
                        })
                        .when("/registration", {
                            templateUrl: angular.getTheme("visitor/registration-page.html"),
                            controller: "visitorLoginController"
                        });

                    $locationProvider.html5Mode(true);
                }])
                .run([
                    "$rootScope",
                    "$location",
                    "$anchorScroll",
                    "$commonHeaderService",
                    "$visitorLoginService",
                    "$commonSidebarService",
                    function ($rootScope, $location, $anchorScroll, $commonHeaderService, $visitorLoginService, $commonSidebarService) {
                        $anchorScroll.yOffset = 150;
                        $visitorLoginService.isLoggedIn().then(function (isLoggedIn) {
                            if (isLoggedIn) {
                                $commonHeaderService.addMenuRightItem("/account", "My Account", "/account");
                                $commonHeaderService.addMenuRightItem("/logout", "Logout", "/logout");
                                $commonSidebarService.addItem("ACCOUNT", "account", "glyphicon glyphicon-user", 90);
                            } else {
                                $commonHeaderService.addMenuRightItem("/login", "Login", "/login");
                                $commonSidebarService.removeItem("logout");
                            }
                        });

                        $rootScope.$on('$locationChangeStart',function(evt, absNewUrl, absOldUrl) {
                            var prevUri = absOldUrl.substring($location.absUrl().length - $location.url().length);
                            var matches = /^([^?]+)\?*(.*)$/g.exec(prevUri);
                            if(matches !== null) {
                                angular.module.visitorModule.back = {};
                                angular.module.visitorModule.back.url = absOldUrl;
                                angular.module.visitorModule.back.path = matches[1] || "";
                                angular.module.visitorModule.back.params = matches[2] || "";
                            }
                        });
                    }
                ]
            );
            return angular.module.visitorModule;
        });

})(window.define);
(function (define) {
    

    /*
     *  HTML top page header manipulation stuff
     */
    define('visitor/service/api',["visitor/init"], function (productModule) {
        productModule
            /*
             *  $productApiService interaction service
             */
            .service("$visitorApiService", ["$resource", "REST_SERVER_URI", function ($resource, REST_SERVER_URI) {

                return $resource(REST_SERVER_URI, {},
                    {
                        "register": {
                            method: "POST",
                            url: REST_SERVER_URI + "/visitors/register"
                        },
                        "loginFacebook": {
                            method: "POST",
                            url: REST_SERVER_URI + "/visit/login-facebook"
                        },
                        "loginGoolge": {
                            method: "POST",
                            url: REST_SERVER_URI + "/visit/login-google"
                        },
                        "login": {
                            method: "POST",
                            url: REST_SERVER_URI + "/visit/login"
                        },
                        "validate": {
                            method: "GET",
                            url: REST_SERVER_URI + "/visitors/validate/:key"
                        },
                        "forgotPassword": {
                            method: "GET",
                            url: REST_SERVER_URI + "/visitors/forgot-password/:email"
                        },
                        "invalidate": {
                            method: "GET",
                            url: REST_SERVER_URI + "/visitors/invalidate/:email"
                        },
                        "info": {
                            method: "GET",
                            url: REST_SERVER_URI + "/visit"
                        },
                        "update": {
                            method: "PUT",
                            url: REST_SERVER_URI + "/visit"
                        },
                        "getAddresses": {
                            method: "GET",
                            url: REST_SERVER_URI + "/visit/addresses"
                        },
                        "addressUpdate":{
                            method: "PUT",
                            params: { addressID: "@id" },
                            url: REST_SERVER_URI + "/visit/address/:addressID"
                        },
                        "saveAddress": {
                            method: "POST",
                            url: REST_SERVER_URI + "/visit/address"
                        },
                        "loadAddress": {
                            method: "GET",
                            url: REST_SERVER_URI + "/visit/address/:addressID"
                        },
                        "deleteAddress": {
                            method: "DELETE",
                            url: REST_SERVER_URI + "/visit/address/:addressID"
                        },
                        "getOrderList": {
                            method: "GET",
                            url: REST_SERVER_URI + "/visit/orders"
                        },
                        "getOrder": {
                            method: "GET",
                            url: REST_SERVER_URI + "/visit/order/:orderID"
                        }
                    });
            }]);

        return productModule;
    });

})(window.define);
(function (define) {
    

    /*
     *  HTML top page header manipulation stuff
     */
    define('visitor/service/login',[
        'visitor/init',
        'visitor/service/facebook',
        'visitor/service/google'
    ], function (visitorModule, fb, gl) {
        visitorModule
        /**
         *  $visitorApiService interaction service
         */
            .service('$visitorLoginService', [
                '$resource',
                '$visitorApiService',
                '$cookieStore',
                '$q',
                '$designService',
                'VISITOR_DEFAULT_AVATAR',
                'LOGIN_COOKIE',
                function ($resource, $visitorApiService, $cookieStore, $q, $designService, VISITOR_DEFAULT_AVATAR, LOGIN_COOKIE) {

                    /** Variables */
                    var login, loginId, isLoggedIn, mapFields, sendingRequest;
                    /** Functions */
                    var getLogin, getLoginId, setLogin, cleanLogin, getVisitorProperty,
                        getAvatar, getFullName, fIsLoggedIn, getDefaultLogin, logout, fillFields;

                    isLoggedIn = null;
                    sendingRequest = [];
                    getDefaultLogin = function () {
                        return {
                            'facebook_id': '',
                            'google_id': '',
                            'billing_address_id': '',
                            'shipping_address_id': '',
                            'email': '',
                            'fname': '',
                            'lname': '',
                            'password': '',
                            'billing_address': {},
                            'shipping_address': {}
                        };
                    };

                    getVisitorProperty = function (field) {
                        var res, i, f;
                        for (res in mapFields) {
                            if (mapFields.hasOwnProperty(res)) {
                                for (i = 0; i < mapFields[res].length; i += 1) {
                                    f = mapFields[res][i];
                                    if (f === field) {
                                        return res;
                                    }
                                }
                            }
                        }

                        return null;
                    };

                    mapFields = {
                        'facebook_id': ['facebook_id', 'facebookId', 'facebookID'],
                        'google_id': ['google_id', 'googleId', 'googleID'],
                        'billing_address_id': ['billing_address_id', 'billing_id', 'billingId', 'billingID'],
                        'shipping_address_id': ['shipping_address_id', 'shipping_id', 'shippingId', 'shippingID'],
                        'email': ['email', 'e-mail', 'Email', 'EMail', 'E-Mail'],
                        'fname': ['fname', 'f-name', 'f_name', 'first_name', 'first-name'],
                        'lname': ['lname', 'l-name', 'l_name', 'last_name', 'last-name'],
                        'billing_address': ['billing_address'],
                        'shipping_address': ['shipping_address']
                    };

                    login = getDefaultLogin();

                    logout = function () {
                        var deferLogOut = $q.defer();

                        $cookieStore.remove(LOGIN_COOKIE);

                        isLoggedIn = false;

                        login = getDefaultLogin();
                        deferLogOut.resolve(false);

                        return deferLogOut.promise;
                    };

                    fillFields = function (obj) {
                        var field, prop;
                        for (field in obj) {
                            if (obj.hasOwnProperty(field)) {
                                prop = getVisitorProperty(field);
                                if (prop !== null) {
                                    login[prop] = obj[field];
                                }
                            }
                        }
                    };

                    setLogin = function (obj) {
                        fillFields(obj);
                        if (obj !== null) {
                            login["billing_address_id"] = obj["billing_address"] && obj["billing_address"]._id || '';
                            login["shipping_address_id"] = obj["shipping_address"] && obj["shipping_address"]._id || '';
                        }
                    };

                    getLogin = function () {
                        return login;
                    };

                    cleanLogin = function () {
                        login = getDefaultLogin();
                    };

                    getAvatar = function () {
                        var avatar;
                        avatar = $designService.getImage(VISITOR_DEFAULT_AVATAR);

                        if ('' !== login["facebook_id"]) {
                            avatar = 'http://' + fb.getAvatar(login["facebook_id"], 'large');
                        } else if (login["google_id"] !== '') {
                            avatar = gl.getAvatar(login["google_id"]);
                        }
                        return avatar;
                    };

                    getFullName = function () {
                        return login.fname + ' ' + login.lname;
                    };

                    getLoginId = function () {
                        return loginId;
                    };

                    fIsLoggedIn = function (force) {

                        var sendRequestFlag = false;
                        if (sendingRequest.length === 0) {
                            sendRequestFlag = true;
                        }

                        var deferIsLoggedIn = $q.defer();
                        sendingRequest.push(deferIsLoggedIn);

                        if (null !== isLoggedIn && !force) {
                            for (var i = 0; i < sendingRequest.length; i += 1) {
                                sendingRequest[i].resolve(isLoggedIn);
                            }
                            sendingRequest = [];
                        } else if (sendRequestFlag) {
                            $visitorApiService.info().$promise.then(function (response) {
                                if (response.error === null) {
                                    loginId = response.result._id || '';
                                    if (loginId !== '') {
                                        isLoggedIn = true;
                                        setLogin(response.result);
                                    } else {
                                        isLoggedIn = false;
                                    }
                                } else {
                                    isLoggedIn = false;
                                    cleanLogin();
                                }
                                for (var i = 0; i < sendingRequest.length; i += 1) {
                                    sendingRequest[i].resolve(isLoggedIn);
                                }
                                sendingRequest = [];
                            });
                        }

                        return deferIsLoggedIn.promise;
                    };

                    return {
                        cleanLogin: cleanLogin,
                        setLogin: setLogin,
                        getVisitor: getLogin,
                        getAvatar: getAvatar,
                        getFullName: getFullName,
                        getVisitorId: getLoginId,
                        isLoggedIn: fIsLoggedIn,
                        logout: logout
                    };
                }
            ]
        );

        return visitorModule;
    });

})(window.define);

(function (define, $) {
    

    define('visitor/controller/login',['angular', 'visitor/init', 'visitor/service/google'], function (angular, loginModule, gl) {
        loginModule.controller('visitorLoginController', [
            '$scope',
            '$route',
            '$routeParams',
            '$anchorScroll',
            '$visitorApiService',
            '$visitorLoginService',
            '$location',
            '$cartService',
            '$commonHeaderService',
            '$commonSidebarService',
            '$commonUtilService',
            function ($scope, $route, $routeParams, $anchorScroll, $visitorApiService, $visitorLoginService, $location, $cartService, $commonHeaderService, $commonSidebarService, $commonUtilService) {
                $scope.login = $visitorLoginService.getVisitor();
                $scope.loginCredentials = {};
                var verifyCode = $routeParams["validate"];

                var VALIDATION_SUCCESS = "<b>Congratulations!</b><br /> You have finished registration and can now enter the site.";
                var INVALIDATE_SUCCESS = "We sent you new activation code. Please check your email and click on the verification link.";
                var FORGOT_SUCCESS = "A new password has been created and forwarded to you. Please check your email.";

                $scope.needBirthdayCheck = true;
                $scope.birthday = {
                    "day": 0,
                    "month": 0,
                    "year": 0
                };

                var checkPassword = function () {
                    var status;
                    if (typeof $scope.login.password === "undefined" ||
                        $scope.login.password.trim() === "") {
                        $scope.message = $commonUtilService.getMessage(null, "warning", "Password can not be blank");
                        $scope.isCoincide = false;
                        status = false;
                    } else if ($scope.login.password === $scope.login["confirm_password"]) {
                        $scope.isCoincide = true;
                        status = true;
                    } else {
                        $scope.message = $commonUtilService.getMessage(null, "warning", "Passwords don't match");
                        $scope.isCoincide = false;
                        status = false;
                    }
                    return status;
                };

                $scope.init = function () {
                    if (typeof verifyCode !== "undefined") {
                        $visitorApiService.validate({"key": verifyCode}).$promise.then(function (response) {
                            if (response.error === null) {
                                $scope.messageValidaion = $commonUtilService.getMessage(null, "success", VALIDATION_SUCCESS);
                            } else {
                                $scope.messageValidaion = $commonUtilService.getMessage(response);
                            }
                        });

                    }
                };

                $scope.sendForgotEmail = function () {
                    $scope.forgotForm.submitted = true;
                    if ($scope.forgotForm.$valid) {
                        $visitorApiService.forgotPassword({"email": $scope.forgotCredentials.email}).$promise.then(function (response) {
                            if (response.result === 'ok') {
                                $scope.messageValidaion = $commonUtilService.getMessage(null, "success", FORGOT_SUCCESS);
                            } else {
                                $scope.messageValidaion = $commonUtilService.getMessage(response);
                            }
                            $('.modal').modal('hide');
                        });
                        $scope.forgotForm.submitted = false;
                    }
                };

                $scope.sendInvalidateEmail = function () {
                    $scope.invalidateForm.submitted = true;
                    if ($scope.invalidateForm.$valid) {
                        $visitorApiService.invalidate({"email": $scope.invalidateCredentials.email}).$promise.then(function (response) {
                            if (response.result === 'ok') {
                                $scope.messageValidaion = $commonUtilService.getMessage(null, "success", INVALIDATE_SUCCESS);
                            } else {
                                $scope.messageValidaion = $commonUtilService.getMessage(response);
                            }
                            $('.modal').modal('hide');
                        });
                        $scope.invalidateForm.submitted = false;
                    }
                };

                $scope.getItemsInCart = function () {
                    return $cartService.getCountItems();
                };

                $scope.clickToCartDesktop = function () {
                    var miniCart = $('.mini-cart');

                    if (angular.appConfigValue("general.checkout.guest_checkout")) {
                        miniCart.modal('toggle');
                    } else {
                        $visitorLoginService.isLoggedIn().then(function (isLoggedIn) {
                            if (isLoggedIn) {
                                miniCart.modal('toggle');
                            } else {
                                $('#form-login').modal('show');
                            }
                        });
                    }

                };

                $scope.save = function () {
                    $scope.register.submitted = true;
                    if ($scope.register.$valid && checkPassword()) {
                        delete $scope.login["billing_address_id"];
                        delete $scope.login["shipping_address_id"];

                        var data = {};
                        for (var field in $scope.login) {
                            if ($scope.login.hasOwnProperty(field) && field !== "confirm_password") {
                                data[field] = $scope.login[field];
                            }
                        }

                        $visitorApiService.register(data).$promise.then(function (response) {
                            if (response.error === null) {
                                $('.modal').modal('hide');

                                $scope.message = $commonUtilService.getMessage(null, "success", "Thanks for registration. Please check your email and confirm your account");
                                for (var field in $scope.register) {
                                    if ($scope.register.hasOwnProperty(field)) {
                                        $scope.register[field].$pristine = true;
                                    }
                                }
                                $scope.login = {};
                                $scope.register.submitted = false;
                            } else {
                                $scope.message = $commonUtilService.getMessage(response);

                                $scope.register.submitted = false;
                            }
                            if ($location.hash() !== "infoRegister") {
                                $location.hash('infoRegister');
                            } else {
                                $anchorScroll();
                            }
                        });
                    }
                };

                var singInSuccess = function (isPopUp) {
                    if (isPopUp) {
                        $route.reload();
                    } else {
                        var path = angular.module.visitorModule.back.path.trim('/');
                        if (typeof angular.module.visitorModule.back.path !== "undefined" &&
                            "" !== path &&
                            -1 === ['login', 'login.html', 'home', 'home.html', 'logout', 'logout.html'].indexOf(path)) {

                            $location.$$path = angular.module.visitorModule.back.path;
                            $location.$$url = angular.module.visitorModule.back.path;
                            $location.search(angular.module.visitorModule.back.params);
                        } else {
                            $location.path('/account');
                        }
                    }
                };

                $scope.signIn = function (isPopUp) {
                    $scope.loginForm.submitted = true;
                    if ($scope.loginForm.$valid) {
                        $visitorApiService.login($scope.loginCredentials).$promise.then(function (response) {
                            if (response.result === 'ok') {
                                $visitorLoginService.isLoggedIn(true).then(
                                    function () {
                                        $('.modal').modal('hide');
                                        $cartService.reload();

                                        // Update right menu
                                        $commonHeaderService.removeItem('right', '/login');
                                        $commonHeaderService.addMenuRightItem('/account', 'My Account', '/account');
                                        $commonHeaderService.addMenuRightItem('/logout', 'Logout', '/logout');

                                        // Update sidebar
                                        $commonSidebarService.addItem('ACCOUNT', 'account', 'glyphicon glyphicon-user', 90);

                                        singInSuccess(isPopUp);
                                    }
                                );
                            } else {
                                $scope.message = $commonUtilService.getMessage(response);
                            }
                        });
                        $scope.loginForm.submitted = false;
                    }
                };

                $scope.facebookLogin = function (isPopUp) {
                    FB.login(                                               // jshint ignore:line
                        function (response) {
                            if (typeof response.authResponse !== "undefined") {
                                $visitorApiService.loginFacebook({
                                    'user_id': response.authResponse.userID,
                                    'access_token': response.authResponse.accessToken
                                }).$promise.then(
                                    function () {
                                        $visitorLoginService.isLoggedIn(true).then(
                                            function () {
                                                $('.modal').modal('hide');
                                                $cartService.reload();

                                                // Update right menu
                                                $commonHeaderService.removeItem('right', '/login');
                                                $commonHeaderService.addMenuRightItem('/account', 'My Account', '/account');
                                                $commonHeaderService.addMenuRightItem('/logout', 'Logout', '/logout');

                                                // Update sidebar
                                                $commonSidebarService.addItem('ACCOUNT', 'account', 'glyphicon glyphicon-user', 90);

                                                singInSuccess(isPopUp);
                                            }
                                        );
                                    }
                                );
                            }
                        },
                        {scope: 'email'}
                    );
                };

                $scope.googleLogin = function () {
                    gl.login();
                };

                $scope.loginCallback = window.loginCallback = function (response) {
                    var data = gl.loginCallback(response);
                    $visitorApiService.loginGoolge(data).$promise.then(
                        function () {
                            $visitorLoginService.isLoggedIn(true).then(
                                function () {
                                    $('.modal').modal('hide');
                                    $cartService.reload();

                                    // Update right menu
                                    $commonHeaderService.removeItem('right', '/login');
                                    $commonHeaderService.addMenuRightItem('/account', 'My Account', '/account');
                                    $commonHeaderService.addMenuRightItem('/logout', 'Logout', '/logout');

                                    // Update sidebar
                                    $commonSidebarService.addItem('ACCOUNT', 'account', 'glyphicon glyphicon-user', 90);

                                    singInSuccess();
                                }
                            );
                        }
                    );
                };
            }
        ]);
        return loginModule;
    });
})(window.define, jQuery);

(function (define) {
    

    define('visitor/controller/logout',["visitor/init"], function (loginModule) {
        loginModule.controller("visitorLogoutController", [
            "$scope",
            "$visitorLoginService",
            "$location",
            "$cartService",
            "$commonHeaderService",
            "$commonSidebarService",
            function ($scope, $visitorLoginService, $location, $cartService, $commonHeaderService, $commonSidebarService) {

                $visitorLoginService.isLoggedIn().then(function(isLoggedIn){
                    if (!isLoggedIn) {
                        $location.path("/");
                    } else {
                        $visitorLoginService.logout().then(
                            function () {

                                $cartService.reload().then(
                                    function () {

                                        // Update right menu
                                        $commonHeaderService.addMenuRightItem("/login", "Login", "/login");
                                        $commonHeaderService.removeItem("right", "/account");
                                        $commonHeaderService.removeItem("right", "/logout");

                                        // Update sidebar
                                        $commonSidebarService.removeItem("account");

                                        $location.path("/");
                                    }
                                );

                            }
                        );
                    }
                });
            }
        ]);
        return loginModule;
    });
})(window.define);
(function (define, $) {
    

    define('visitor/controller/address',['visitor/init'], function (visitorModule) {
        visitorModule

            .controller('visitorAddressController', [
                '$scope',
                '$location',
                '$visitorLoginService',
                '$visitorApiService',
                '$designStateService',
                '$commonUtilService',
                function ($scope, $location, $visitorLoginService, $visitorApiService, $designStateService, $commonUtilService) {
                    var getFullName;

                    $scope.countries = [
                        { Code: 'US', Name: 'USA' }
                    ];
                    $scope.states = $designStateService;
                    $scope.addresses = [];
                    $scope.address = {};
                    $scope.visitor = $visitorLoginService.getVisitor();
                    $scope.visitorService = $visitorLoginService;
                    var activePath;

                    getFullName = function (obj) {
                        return obj["zip_code"] +
                            ' ' + obj["state"] +
                            ', ' + obj["city"] +
                            ', ' + obj["address_line1"] +
                            (obj["address_line2"] ? ', ' + obj["address_line2"] : '');
                    };

                    $scope.init = function () {
                        // BREADCRUMBS
                        $scope.$emit('add-breadcrumbs', {'label': 'myAccount', 'url': '/account'});
                        $scope.$emit('add-breadcrumbs', {'label': 'Addresses', 'url': '/account/address'});

                        activePath = $location.path();

                        $scope.visitorService.isLoggedIn().then(function(isLoggedIn){
                            if (!isLoggedIn) {
                                $location.path("/");
                            }
                        });
                    };

                    /**
                     * Clears the form to create a new address
                     */
                    $scope.clearForm = function () {
                        $scope.address = {'visitor_id': $scope.visitor._id};
                        $scope.submitted = false;
                    };

                    $scope.clearForm();

                    $visitorApiService.getAddresses().$promise.then(
                        function (response) {
                            var result = response.result || [];
                            $scope.addresses = result;
                        }
                    );


                    /**
                     * Handler event when selecting the address in the list
                     *
                     * @param id
                     */
                    $scope.select = function (addressId) {
                        $visitorApiService.loadAddress({'addressID': addressId}).$promise.then(
                            function (response) {
                                var result = response.result || {};
                                $scope.address = result;
                                $scope.address.Id = result._id;
                                $scope.address.Name = getFullName(result);
                            });
                    };

                    /**
                     * Removes address by ID
                     *
                     * @param {string} id
                     */
                    $scope.remove = function (id) {
                        var i, answer;
                        answer = window.confirm('You really want to remove this address');
                        if (answer) {
                            $visitorApiService.deleteAddress({'addressID': id}, function (response) {
                                if (response.result === 'ok') {
                                    for (i = 0; i < $scope.addresses.length; i += 1) {
                                        if ($scope.addresses[i].ID === id) {
                                            $scope.addresses.splice(i, 1);
                                            $scope.clearForm();
                                        }
                                    }
                                }
                            });
                        }
                    };

                    $scope.setAsDefault = function (id) {
                        $visitorApiService.update({'shipping_address_id': id}).$promise.then(
                            function (response) {
                                $visitorLoginService.setLogin(response.result);
                                $scope.visitor = $visitorLoginService.getVisitor();
                                $scope.message = $commonUtilService.getMessage(null, 'success', 'Address was selected as default with success');
                            }
                        );
                    };

                    $scope.save = function () {
                        var id, saveSuccess, saveError, updateSuccess, updateError;
                        $scope.submitted = true;

                        if (this.addressForm.$invalid) {
                            return false;
                        }

                        if (typeof $scope.address !== 'undefined') {
                            id = $scope.address.id || $scope.address._id;
                        }

                        /**
                         *
                         * @param response
                         */
                        saveSuccess = function (response) {
                            if (response.error === null) {
                                $scope.addresses.push({
                                        'ID': response.result._id,
                                        'Name': getFullName(response.result)
                                    }
                                );
                            }
                            $('#parent_popup_address').modal("hide");
                            $scope.submitted = false;
                            $scope.message = $commonUtilService.getMessage(null, 'success', 'New address was added with success');
                        };

                        /**
                         *
                         * @param response
                         */
                        saveError = function () {
                        };

                        /**
                         *
                         * @param response
                         */
                        updateSuccess = function (response) {
                            var i, addr;
                            if (response.error === null) {
                                addr = response.result;
                                for (i = 0; i < $scope.addresses.length; i += 1) {
                                    if ($scope.addresses[i].ID === addr._id) {
                                        $scope.addresses[i].ID = addr._id;
                                        $scope.addresses[i].Name = getFullName(addr);
                                    }
                                }
                            }
                            $('#parent_popup_address').modal('hide');
                            $scope.submitted = false;
                            $scope.message = $commonUtilService.getMessage(null, 'success', 'Address was changed with success');
                        };

                        /**
                         *
                         * @param response
                         */
                        updateError = function () {
                        };

                        if (!id) {
                            $scope.address["visitor_id"] = $visitorLoginService.getVisitorId();
                            $visitorApiService.saveAddress($scope.address, saveSuccess, saveError);
                        } else {
                            $scope.address.id = id;
                            $visitorApiService.addressUpdate($scope.address, updateSuccess, updateError);
                        }
                    };

                    $scope.popUpOpen = function (addressId) {
                        if (typeof addressId === 'undefined') {
                            $scope.clearForm();
                            $('#parent_popup_address').modal('show');
                        } else {
                            $visitorApiService.loadAddress({'addressID': addressId}).$promise.then(
                                function (response) {
                                    $scope.address = response.result || [];

                                    $scope.shippingAddressId = (typeof $scope.visitor["shipping_address"] !== 'undefined' && $scope.visitor["shipping_address"] !== null) ?
                                        $scope.visitor["shipping_address"]._id : null;
                                    $scope.billingAddressId = (typeof $scope.visitor["billing_address"] !== 'undefined' && $scope.visitor["billing_address"] !== null) ?
                                        $scope.visitor["billing_address"]._id : null;

                                    $('#parent_popup_address').modal('show');

                                }
                            );
                        }
                    };


                    $scope.changeShippingAsDefault = function (id) {
                        delete $scope.visitor["billing_address"];
                        delete $scope.visitor["shipping_address"];

                        if (!$scope.shippingAddressId) {
                            $scope.visitor["shipping_address_id"] = "";
                        } else {
                            $scope.visitor["shipping_address_id"] = id;
                        }

                        $visitorApiService.update($scope.visitor).$promise.then(
                            function (response) {
                                $visitorLoginService.setLogin(response.result);
                                $scope.visitor = $visitorLoginService.getVisitor();
                            }
                        );
                    };

                    $scope.changeBillingAsDefault = function (id) {
                        delete $scope.visitor["billing_address"];
                        delete $scope.visitor["shipping_address"];
                        if (!$scope.billingAddressId) {
                            $scope.visitor["billing_address_id"] = "";
                        } else {
                            $scope.visitor["billing_address_id"] = id;
                        }
                        $visitorApiService.update($scope.visitor).$promise.then(
                            function (response) {
                                $visitorLoginService.setLogin(response.result);
                                $scope.visitor = $visitorLoginService.getVisitor();
                            }
                        );
                    };

                    $scope.getAddressName = function (addr) {
                        var _default, name;
                        name = addr.Name;
                        _default = [];
                        if (typeof $scope.visitor["billing_address"] !== 'undefined' &&
                            $scope.visitor["billing_address"] !== null &&
                            addr.ID === $scope.visitor["billing_address"]._id) {
                            _default.push('default billing');
                        }
                        if (typeof $scope.visitor["shipping_address"] !== 'undefined' &&
                            $scope.visitor["shipping_address"] !== null &&
                            addr.ID === $scope.visitor["shipping_address"]._id) {
                            _default.push('default shipping');
                        }

                        if (_default.length > 0) {
                            name += '( ' + _default.join(', ') + ')';
                        }

                        return name;
                    };

                    $scope.isActive = function (path) {
                        if (activePath === path) {
                            $('.account-menu ul li:first-child').find('span')
                                .css('background', 'url("themes/default/images/tablet/tabL.jpg") no-repeat top left');
                            return true;
                        }
                        return false;
                    };
                }
            ])
        ;
        return visitorModule;
    });
})
(window.define, jQuery);

(function (define, $) {
    

    define('visitor/controller/account',[
        "visitor/init"
    ], function (visitorModule) {
        visitorModule

            .controller("visitorAccountController", [
                "$scope",
                "$location",
                "$visitorLoginService",
                "$visitorApiService",
                "$commonUtilService",
                function ($scope, $location, $visitorLoginService, $visitorApiService, $commonUtilService) {
                    $scope.addresses = [];
                    $scope.address = {};
                    $scope.visitor = $visitorLoginService.getVisitor();
                    $scope.visitorService = $visitorLoginService;
                    $scope.changePswCredentials = {};
                    $scope.isCoincide = false;

                    var activePath;

                    var getAddressList = function () {
                        $visitorApiService.getAddresses().$promise.then(
                            function (response) {
                                var result = response.result || [];
                                $scope.addresses = result;
                            }
                        );
                    };

                    var checkPassword = function () {
                        var status;
                        if (typeof $scope.changePswCredentials.oldpassword === "undefined" ||
                        $scope.changePswCredentials.oldpassword.trim() === "") {
                            $scope.messagePassword = $commonUtilService.getMessage(null, "warning", "Old password field can not be blank");
                            $scope.isCoincide = false;
                            status = false;
                        } else if (typeof $scope.changePswCredentials.password === "undefined" ||
                         $scope.changePswCredentials.password.trim() === "") {
                            $scope.messagePassword = $commonUtilService.getMessage(null, "warning", "Password field can not be blank");
                            $scope.isCoincide = false;
                            status = false;
                        } else if ($scope.changePswCredentials.password === $scope.changePswCredentials["confirm"]) {
                            $scope.isCoincide = true;
                            status = true;
                        } else {
                            $scope.messagePassword = $commonUtilService.getMessage(null, "warning", "New Passwords don't match");
                            $scope.isCoincide = false;
                            status = false;
                        }
                        return status;
                    };

                    $scope.init = function () {
                        // BREADCRUMBS
                        $scope.$emit("add-breadcrumbs", {"label": "MyAccount", "url": "/account"});
                        activePath = $location.path();

                        $scope.visitorService.isLoggedIn().then(function (isLoggedIn) {
                            if (!isLoggedIn) {
                                $location.path("/");
                            }
                        });
                    };

                    $scope.save = function () {
                        var updateSuccess, updateFail;
                        if ($scope.visitorForm.$invalid) {
                            return false;
                        }
                        updateSuccess = function () {
                            $scope.message = $commonUtilService.getMessage(null, "success", "Сhanges have been made");
                        };

                        updateFail = function () {
                            $scope.message = $commonUtilService.getMessage(null, "danger", "Something went wrong");
                        };

                        delete $scope.visitor["password"];
                        delete $scope.visitor["billing_address"];
                        delete $scope.visitor["shipping_address"];

                        $visitorApiService.update($scope.visitor, updateSuccess, updateFail);

                        setTimeout(function () {
                            $("#parent_popup_profile").modal("hide");
                        }, 2000);
                    };

                    $scope.changePassword = function () {
                        if (checkPassword()) {
                            $visitorApiService.update({
                            "old_password": $scope.changePswCredentials.oldpassword,
                            "password": $scope.changePswCredentials.password}).$promise.then(
                                function (response) {
                                    setTimeout(function () {
                                        $("#form-change-password").modal("hide");
                                    }, 2000);
                                    if (response.error === null) {
                                        $scope.messagePassword = $commonUtilService.getMessage(response, "success", "Password change was successfully");
                                        $scope.changePswCredentials = {};
                                    } else {
                                        $scope.messagePassword = $commonUtilService.getMessage(response);
                                    }
                                }
                            );
                        }
                    };

                    $scope.closePopUp = function () {
                        $(".modal").modal("hide");
                    };

                    $scope.popUpOpen = function (id) {
                        $("#" + id).modal("show");
                    };

                    $scope.shippingUpdate = function () {
                        $scope.visitor["shipping_address"].id = $scope.visitor["shipping_address_id"];
                        $visitorApiService.addressUpdate($scope.visitor["shipping_address"]);
                    };

                    $scope.billingUpdate = function () {
                        $scope.visitor["billing_address"].id = $scope.visitor["billing_address_id"];
                        $visitorApiService.addressUpdate($scope.visitor["billing_address"]);
                    };

                    $scope.$watch("visitor", getAddressList);

                    $scope.isActive = function (path) {
                        return activePath === path;
                    };

                }
            ]);

        return visitorModule;
    });
})(window.define, jQuery);
(function (define) {
    

    define('visitor/controller/order',['visitor/init'], function (visitorModule) {
        visitorModule

            .controller('visitorOrderController', [
                '$scope',
                '$location',
                '$routeParams',
                '$visitorLoginService',
                '$visitorApiService',
                '$commonUtilService',
                function ($scope, $location, $routeParams, $visitorLoginService, $visitorApiService, $commonUtilService) {
                    var activePath;

                    $scope.orderId = $routeParams.id;

                    $scope.visitor = $visitorLoginService.getVisitor();
                    $scope.visitorService = $visitorLoginService;

                    $scope.init = function () {
                        // BREADCRUMBS
                        $scope.$emit('add-breadcrumbs', {'label': 'myAccount', 'url': '/account'});
                        $scope.$emit('add-breadcrumbs', {'label': 'Order', 'url': '/account/orders'});

                        activePath = $location.path();

                        $scope.visitorService.isLoggedIn().then(function (isLoggedIn) {
                            if (!isLoggedIn) {
                                $location.path("/");
                            }
                        });
                    };

                    if (!$scope.orderId) {
                        $visitorApiService.getOrderList({"extra": "created_at,status,grand_total"}).$promise.then(
                            function (response) {
                                var i, isExist;
                                $scope.ordersList = response.result || [];

                                for (i = 0; i < $scope.ordersList.length; i += 1) {
                                    if ($scope.orderId === $scope.ordersList[i]["increment_id"]) {
                                        isExist = true;
                                    }
                                }
                            }
                        );
                    }

                    if ($scope.orderId) {
                        $visitorApiService.getOrder({"orderID": $scope.orderId}).$promise.then(
                            function (response) {
                                $scope.order = response.result || [];
                                $scope.$emit('add-breadcrumbs', {'label': $scope.order["increment_id"], 'url': '/account/order/' + $scope.orderId});

                            }
                        );
                    }

                    $scope.getDateCreated = function (str) {
                        var date, month, day;

                        date = $commonUtilService.getDate(str);
                        var m = date.getMonth() + 1;
                        month = m.toString().length < 2 ? '0' + m : m;
                        day = date.getDate().toString().length < 2 ? '0' + date.getDate() : date.getDate();

                        return date.getFullYear() + '/' + month + '/' + day;
                    };

                    $scope.$watch('addedOrderId', function () {
                        if (typeof $scope.addedOrderId !== 'undefined') {
                            $scope.message = $commonUtilService.getMessage(null, "success", "THANK YOU FOR YOUR PURCHASE!<br/>" +
                                    "Your order # is: <a href=\"/account/order/" + $scope.addedOrderId + "\">" + $scope.addedOrderId + "</a>"
                            );
                        }
                    });

                    $scope.isActive = function (path) {
                        if (activePath === path) {
                            $('.account-menu ul li:nth-child(2)').find('span')
                                .css('background', 'url("themes/default/images/tablet/tabL.jpg") no-repeat top left');
                            return true;
                        }
                        return false;
                    };

                }
            ]);
        return visitorModule;
    });
})(window.define);

(function (define) {
    

    /**
     *  requireJS module entry point
     *  (to use that module you should include it to main.js)
     */
    define('visitor/module',[
            "visitor/service/api",
            "visitor/service/login",

            "visitor/controller/login",
            "visitor/controller/logout",
            "visitor/controller/address",
            "visitor/controller/account",
            "visitor/controller/order"
        ],
        function (visitorModule) {

            return visitorModule;
        });

})(window.define);
(function (define) {
    

    define('category/init',[
            "angular",
            "angular-route",
            "angular-resource"
        ],
        function (angular) {
            /**
             *  Angular "categoryModule" declaration
             */
            angular.module.categoryModule = angular.module("categoryModule", ["ngRoute", "ngResource", "designModule"])

                .constant("SEARCH_KEY_NAME", "search")
                .constant("GENERAL_CATEGORY_URI", "/shop")
            /**
             *  Basic routing configuration
             */
                .config(["$routeProvider", "$locationProvider", "GENERAL_CATEGORY_URI", function ($routeProvider, $locationProvider, GENERAL_CATEGORY_URI) {
                    $routeProvider
                        .when("/category/:id", {
                            "templateUrl": angular.getTheme("category/view.html"),
                            "controller": "categoryListController"
                        })
                        .when(GENERAL_CATEGORY_URI, {
                            "templateUrl": angular.getTheme("category/view.html"),
                            "controller": "categoryListController"
                        });
                    $locationProvider.html5Mode(true);
                }])

                .run(["$rootScope", "$categoryService", "SEARCH_KEY_NAME", "GENERAL_CATEGORY_URI", function ($rootScope, $categoryService) {

                    $rootScope.searchProducts = $categoryService.searchProducts;

                }]);

            return angular.module.categoryModule;
        });

})(window.define);
(function (define) {
    

    /*
     *  HTML top page header manipulation stuff
     */
    define('category/service/api',["category/init"], function (productModule) {
        productModule
            /*
             *  $productApiService interaction service
             */
            .service("$categoryApiService", ["$resource", "REST_SERVER_URI", function ($resource, REST_SERVER_URI) {

                return $resource(REST_SERVER_URI, {}, {
                    "getProductsByCategoryId": {
                        method: "GET",
                        url: REST_SERVER_URI + "/category/:categoryID/products"
                    },
                    "getShopProducts": {
                        method: "GET",
                        url: REST_SERVER_URI + "/products/shop"
                    },
                    "getShopLayered": {
                        method: "GET",
                        url: REST_SERVER_URI + "/products/shop/layers"
                    },
                    "getShopCountProducts": {
                        method: "GET",
                        params: { action: "count" },
                        url: REST_SERVER_URI + "/products"
                    },
                    "load": {
                        method: "GET",
                        params: { id: "@id" },
                        url: REST_SERVER_URI + "/category/:id"
                    },
                    "getCountProducts": {
                        method: "GET",
                        params: { action: "count" },
                        url: REST_SERVER_URI + "/category/:categoryID/products"
                    },
                    "getPath":{
                        method: "GET",
                        params: {
                            productID: "@productId",
                            mediaType: "@mediaType"
                        },
                        url: REST_SERVER_URI + "/product/:productID/mediapath/:mediaType"
                    },

                    "getImage": {
                        method: "GET",
                        url: REST_SERVER_URI + "/category/:categoryID/media/image/:mediaName"
                    },
                    "getImagePath": {
                        method: "GET",
                        url: REST_SERVER_URI + "/category/:categoryID/mediapath/image"
                    },
                    "listImages": {
                        method: "GET",
                        url: REST_SERVER_URI + "/category/:categoryID/media/image"
                    },

                    "getCategories": {
                        method: "GET",
                        url: REST_SERVER_URI + "/categories/tree"
                    },
                    "getLayered": {
                        method: "GET",
                        url: REST_SERVER_URI + "/category/:categoryID/layers"
                    }
                });
            }]);

        return productModule;
    });

})(window.define);
(function (define) {
    

    /**
     *  HTML top page header manipulation stuff
     */
    define('category/service/category',[
            "common/init"
        ],
        function (commonModule) {

            commonModule
            /**
             *  $categoryService implementation
             *  Saves in the tree a categories list. Used for the breadcrumbs
             */
                .service("$categoryService",
                [
                    "$location",
                    "$commonRewriteService",
                    "SEARCH_KEY_NAME",
                    "GENERAL_CATEGORY_URI",
                    function ($location, $commonRewriteService, SEARCH_KEY_NAME, GENERAL_CATEGORY_URI) {
                        // Variables
                        var tree, type;
                        // Functions
                        var getTree, setTree, getChainCategories, getSubMenuItem, getUrl, setFiltersInLocation, searchProducts;
                        type = "category";

                        getUrl = function (id) {
                            var url;
                            url = $commonRewriteService.getRewrite(type, id);

                            if (!url) {
                                url = type + "/" + id;
                            }

                            return "/" + url;
                        };

                        /**
                         * Sets tree
                         *
                         * @param {string} label
                         * @param {string} url
                         */
                        setTree = function (arr) {
                            tree = arr;
                        };

                        /**
                         * Gets tree
                         *
                         * @return {array} tree
                         */
                        getTree = function () {
                            return tree;
                        };

                        getSubMenuItem = function (subMenuItems, id, list) {
                            var found, i, tmpList;

                            if (subMenuItems) {

                                for (i = 0; i < subMenuItems.length; i += 1) {

                                    tmpList = list;
                                    tmpList.push(subMenuItems[i]);

                                    if (subMenuItems[i].id === id) {
                                        return [subMenuItems[i]];
                                    }

                                    found = getSubMenuItem(subMenuItems[i].child, id, tmpList);

                                    if (found instanceof Array && found.length > 0) {
                                        found.push(subMenuItems[i]);
                                        return found;
                                    }
                                }
                            }

                            return [];
                        };

                        /**
                         *
                         * @param {string} id
                         * @returns {Array}
                         */
                        getChainCategories = function (id) {
                            var list = [];

                            list = getSubMenuItem(tree, id, list);

                            return list.reverse();
                        };

                        setFiltersInLocation = function(path, filter) {
                            // removes the  "#" in the begin string
                            var pathClear = path.trim('#');

                            $location.$$path = pathClear;
                            $location.$$url = pathClear;

                            $location.search(filter);
                        };

                        searchProducts = function (searchText) {
                            var params = SEARCH_KEY_NAME + "=~" + searchText.replace(/\s/g, ',');
                            setFiltersInLocation(GENERAL_CATEGORY_URI, params);
                        };

                        return {
                            getUrl: getUrl,
                            setTree: setTree,
                            getTree: getTree,
                            getChainCategories: getChainCategories,
                            setFiltersInLocation: setFiltersInLocation,
                            searchProducts: searchProducts
                        };
                    }
                ]
            );

            return commonModule;
        });

})(window.define);
(function (define, $) {
    

    define('category/controller',["angular", "category/init"], function (angular, categoryModule) {
        categoryModule

            .controller("categoryListController", [
                "$scope",
                "$location",
                "$route",
                "$routeParams",
                "$categoryApiService",
                "$designService",
                "$designImageService",
                "$categoryService",
                "$visitorLoginService",
                "$cartService",
                "$pdpProductService",
                "$commonUtilService",
                "GENERAL_CATEGORY_URI",
                "SEARCH_KEY_NAME",
                function ($scope, $location, $route, $routeParams, $categoryApiService, $designService,
                          $designImageService, $categoryService, $visitorLoginService, $cartService,
                          $pdpProductService, $commonUtilService, GENERAL_CATEGORY_URI, SEARCH_KEY_NAME) {

                    var init, getPage, addCategoryCrumbs, getFilters, setFilters, getParams, initWatchers,
                        defaultFilterSet, defaultOptionSet, changeLocation;

                    getPage = function () {
                        var param, page;

                        page = 0;
                        param = $location.search();

                        if (typeof param.p !== "undefined") {
                            page = (param.p - 1);
                        }

                        return page;
                    };

                    addCategoryCrumbs = function () {

                        if ($scope.isShop) {
                            $scope.$emit("add-breadcrumbs", {"label": "Shop", "url": $location.path()});
                        } else {
                            var list, i, category;
                            list = $categoryService.getChainCategories($scope.categoryId);

                            for (i = 0; i < list.length; i += 1) {
                                category = list[i];
                                $scope.$emit("add-breadcrumbs", {"label": category.name, "url": $categoryService.getUrl(category.id)});
                            }
                        }
                    };

                    getParams = function (withoutLimit) {
                        var search, result, key;

                        result = {};
                        search = $location.search();

                        for (key in search) {
                            if (search.hasOwnProperty(key)) {
                                result[key] = search[key];
                            }
                        }

                        if (!withoutLimit) {

                            if ($scope.currentPage === 0) {
                                result.limit = "0," + $scope.itemsPerPage;
                            } else {
                                result.limit = ($scope.currentPage * $scope.itemsPerPage) + "," + $scope.itemsPerPage;
                            }
                        }

                        return result;
                    };

                    init = function () {
                        /**
                         * Variables for paginator
                         */
                        $scope.currentPage = getPage();
                        $scope.itemsPerPage = angular.appConfigValue("general.app.category.itemsPerPage");
                        $scope.productsList = [];
                        $scope.paths = [];
                        $scope.isShop = (GENERAL_CATEGORY_URI === $location.path());
                        $scope.categoryId = $routeParams.id || null;
                        $scope.searchField = SEARCH_KEY_NAME;

                        $scope.category = {};
                        $scope.popupProduct = {};
                        $scope.productService = $pdpProductService;
                        $scope.options = {};
                        $scope.filters = {};
                        $scope.blocks = {
                            "sort": false,
                            "search": false,
                            "filter": false
                        };

                        var getSearchText = function () {
                            $scope.searchText = "";
                            if (typeof $routeParams[$scope.searchField] !== "undefined") {
                                $scope.searchText = $routeParams[$scope.searchField].trim("~").replace(/,/g, " ");
                            }
                        };
                        getSearchText();

                        addCategoryCrumbs();
                    };
                    init();

                    changeLocation = function () {
                        var filterStr, url;
                        filterStr = getFilters();
                        if (typeof filterStr !== "undefined") {
                            if($scope.categoryId === null && $scope.isShop){
                                url = GENERAL_CATEGORY_URI;
                            } else {
                                url = $categoryService.getUrl($scope.categoryId);
                            }

                            $categoryService.setFiltersInLocation(url, filterStr);
                        }
                    };

                    initWatchers = function () {
                        defaultFilterSet = $scope.$watch("filters", changeLocation, true);

                        defaultOptionSet = $scope.$watch("options", function () {
                            $pdpProductService.setOptions($scope.options);
                            $scope.popupProduct = $pdpProductService.getProduct();
                        }, true);
                    };

                    setFilters = function () {
                        var params, values, i, initFilter;
                        params = $location.search();
                        initFilter = function (attr) {
                            if (typeof $scope.filters[attr] === "undefined") {
                                $scope.filters[attr] = {};
                            }
                        };

                        for (var attr in params) {

                            if (params.hasOwnProperty(attr)) {
                                initFilter(attr);

                                if (typeof params[attr] === "string") {
                                    values = params[attr].replace(/[\?~]/, "").split(",");
                                    for (i = 0; i < values.length; i += 1) {
                                        $scope.filters[attr.replace(/[\?~]/, "")][values[i]] = true;
                                    }
                                } else {
                                    $scope.filters[attr.replace(/[\?~]/, "")][params[attr]] = true;
                                }

                            }

                        }

                    };

                    setFilters();

                    getFilters = function () {
                        var filters, prepareFilters, hasFilter;
                        filters = [];
                        hasFilter = false;

                        prepareFilters = function () {
                            var getFilterValues;

                            getFilterValues = function (attr) {
                                var values, val;
                                values = [];

                                for (val in $scope.filters[attr]) {
                                    if ($scope.filters[attr].hasOwnProperty(val) &&
                                        $scope.filters[attr][val] === true) {
                                        values.push(val);
                                        hasFilter = true;
                                    }
                                }

                                return values;
                            };
                            for (var attr in $scope.filters) {
                                if ($scope.filters.hasOwnProperty(attr)) {
                                    var values = getFilterValues(attr);
                                    if (values.length > 0 && attr !== SEARCH_KEY_NAME) {
                                        filters.push(attr + "=" + values.join(","));
                                    } else if (values.length > 0 && attr === SEARCH_KEY_NAME && values.join(",") !== "") {
                                        filters.push(attr + "=~" + values.join(","));
                                    }
                                }
                            }
                        };

                        prepareFilters();

                        if (!hasFilter) {
                            return "";
                        }

                        return filters.join("&");
                    };

                    /**
                     * Gets number items into collection
                     */
                    $scope.getCountProduct = function () {
                        if ($scope.isShop) {
                            $categoryApiService.getShopCountProducts(getParams(true)).$promise.then(function (response) {
                                var result = response.result || [];
                                $scope.totalItems = result;
                                $scope.pages = Math.ceil($scope.totalItems / $scope.itemsPerPage);
                            });
                        } else {
                            var params = getParams(true);
                            params["categoryID"] = $scope.categoryId;
                            $categoryApiService.getCountProducts(params).$promise.then(function (response) {
                                var result = response.result || [];
                                $scope.totalItems = result;
                                $scope.pages = Math.ceil($scope.totalItems / $scope.itemsPerPage);
                            });
                        }

                    };

                    /**
                     * Gets list of products
                     */
                    $scope.getProducts = function () {
                        if ($scope.isShop) {
                            $categoryApiService.getShopProducts(getParams(), {}).$promise.then(function (response) {
                                var result = response.result || [];
                                $scope.productsList = result;
                            });
                        } else {
                            var params = getParams();
                            params["categoryID"] = $scope.categoryId;
                            $categoryApiService.getProductsByCategoryId(params).$promise.then(function (response) {
                                var result = response.result || [];
                                $scope.productsList = result;
                            });
                        }
                    };

                    /**
                     * Gets layers for category
                     */
                    $scope.getLayered = function () {
                        if ($scope.isShop) {
                            $categoryApiService.getShopLayered($location.search(), {}).$promise.then(function (response) {
                                    var result = response.result || [];
                                    $scope.layered = result;
                                    for (var filter in $scope.layered) {
                                        if ($scope.layered.hasOwnProperty(filter)) {
                                            $scope.filters[filter] = {};
                                        }
                                    }
                                    setFilters();
                                }
                            );
                        } else {
                            var params = $location.search();
                            params["categoryID"] = $scope.categoryId;
                            $categoryApiService.getLayered(params).$promise.then(function (response) {
                                    var result = response.result || [];
                                    $scope.layered = result;
                                    for (var filter in $scope.layered) {
                                        if ($scope.layered.hasOwnProperty(filter)) {
                                            $scope.filters[filter] = {};
                                        }
                                    }
                                    setFilters();
                                }
                            );
                        }
                    };

                    $scope.init = function () {
                        var tree;

                        tree = $categoryService.getTree();
                        if (typeof tree === "undefined") {
                            $categoryApiService.getCategories().$promise.then(
                                function (response) {
                                    var categories = response.result || [];
                                    $categoryService.setTree(categories);
                                    addCategoryCrumbs();
                                }
                            );
                        }
                        $scope.getLayered();
                        $scope.getProducts();
                        $scope.getCountProduct();

                        if($scope.categoryId !== null) {
                            /**
                             * Gets category
                             */
                            $categoryApiService.load({"id": $scope.categoryId}).$promise.then(function (response) {
                                var result = response.result || [];
                                $scope.category = result;
                                $scope.initCategoryImages();
                            });
                        }

                        initWatchers();
                    };

                    $scope.toggleBlock = function (activeBlock) {
                        var block;

                        for (block in $scope.blocks) {

                            if ($scope.blocks.hasOwnProperty(block)) {
                                if (block === activeBlock) {
                                    if ($scope.blocks[block]) {
                                        $scope.blocks[block] = false;
                                    } else {
                                        $scope.blocks[block] = true;
                                    }
                                } else {
                                    $scope.blocks[block] = false;
                                }
                            }

                        }

                        return true;
                    };

                    $scope.closeBlock = function (nameBlock) {
                        $scope.blocks[nameBlock] = false;
                        jQuery('.list-bar span').removeClass('active');
                        jQuery('.shadow').css('display', 'none');
                    };

                    $scope.addToCart = function (product) {
                        var miniCart, addItem;
                        miniCart = $(".mini-cart");
                        addItem = function () {
                            $cartService.add(product._id, 1, $pdpProductService.getOptions()).then(
                                function (response) {
                                    if (response.error !== null) {
                                        $scope.openPopUp(product);
                                        $scope.message = $commonUtilService.getMessage(response);
                                    } else {
                                        $pdpProductService.setOptions({});
                                        $("#quick-view").modal('hide');

                                        miniCart.modal('show');
                                        setTimeout(function () {
                                            miniCart.modal('hide');
                                        }, 2000);
                                    }
                                }
                            );
                        };

                        if (angular.appConfigValue("general.checkout.guest_checkout")) {
                            addItem();
                        } else {
                            $visitorLoginService.isLoggedIn().then(function (isLoggedIn) {
                                if (isLoggedIn) {
                                    addItem();
                                } else {
                                    $("#form-login").modal("show");
                                }
                            });
                        }

                    };

                    /**
                     * Gets full path to image
                     *
                     * @param {object} product
                     * @returns {string}
                     */
                    $scope.getImage = function (product, size) {
                        if (typeof product === "undefined") {
                            return $designImageService.getFullImagePath("", null, size);
                        }
                        return $designImageService.getFullImagePath("", product["default_image"], size);
                    };

                    /**
                     * Set category image and images attributes value as a path
                     * $scope.category.image - default image path
                     * $scope.category.images - list of all images in this category
                     */
                    $scope.initCategoryImages = function () {
                        var categoryImageBasePath;

                        $categoryApiService.getImagePath({"categoryID": $scope.categoryId}).$promise.then(function (response) {
                            categoryImageBasePath = response.result || [];
                        });

                        $categoryApiService.listImages({"categoryID": $scope.categoryId}).$promise.then(function (response) {
                            $scope.category.images = response.result || [];
                            var categoryImagesPath = {};
                            for (var i=0, imageName, imagePath; i < $scope.category.images.length; i+=1) {
                                imageName = $scope.category.images[i];
                                imagePath = $designImageService.getFullImagePath("", categoryImageBasePath + imageName);
                                categoryImagesPath[imageName] = imagePath;
                            }
                            $scope.category.images = categoryImagesPath;
                            if (typeof $scope.category.image !== "undefined") {
                                $scope.category.image = $designImageService.getFullImagePath("", categoryImageBasePath + $scope.category.image);
                            }
                        });
                    };

                    $scope.sortByPrice = function (order) {
                        var orderStr;

                        if (order === "asc") {
                            orderStr = "price";
                        } else {
                            orderStr = "^price";
                        }

                        $scope.filters.sort = {};
                        $scope.filters.sort[orderStr] = true;
                    };

                    $scope.sortByName = function (order) {
                        var orderStr;

                        if (order === "asc") {
                            orderStr = "name";
                        } else {
                            orderStr = "^name";
                        }

                        $scope.filters.sort = {};
                        $scope.filters.sort[orderStr] = true;
                    };

                    $scope.openPopUp = function (product) {
                        $scope.message = {};
                        $scope.options = {};
                        $pdpProductService.setProduct(product);
                        $scope.popupProduct = $pdpProductService.getProduct();
                        $scope.productService.getRatingInfo(product._id);
                        $("#quick-view").modal('show');
                        setTimeout(function () {
                            try {
                                $('.rating').rating('update', $scope.productService.getAverageRating());
                            } catch (e) {

                            }
                        }, 300);
                    };

                    $scope.showMoreBtn = function () {
                        var countLoadedGoods;
                        countLoadedGoods = ($scope.currentPage + 1) * $scope.itemsPerPage;

                        if (countLoadedGoods >= $scope.totalItems) {
                            return false;
                        }

                        return true;
                    };

                    $scope.loadMore = function () {
                        $scope.clickMore = true;
                        $scope.currentPage += 1;

                        var params = getParams();
                        params["categoryID"] = $scope.categoryId;

                        $categoryApiService.getProductsByCategoryId(params).$promise.then(
                            function (response) {
                                var result = response.result || [];
                                $scope.productsList = $scope.productsList.concat(result);
                            }
                        );
                        if ($scope.isShop) {
                            $categoryApiService.getShopProducts(params).$promise.then(function (response) {
                                var result = response.result || [];
                                $scope.productsList = $scope.productsList.concat(result);
                            });
                        } else {
                            $categoryApiService.getProductsByCategoryId(params).$promise.then(
                                function (response) {
                                    var result = response.result || [];
                                    $scope.productsList = $scope.productsList.concat(result);
                                }
                            );
                        }
                    };

                    $scope.search = function () {
                        var searchObj, values;
                        searchObj = {};
                        values = this.searchText.split(/[, ]/);
                        searchObj[$scope.searchField] = {};
                        for (var i = 0; i < values.length; i += 1) {
                            searchObj[$scope.searchField][values[i]] = true;
                        }
                        $scope.filters[$scope.searchField] = searchObj[$scope.searchField];
                    };
                }
            ]);
        return categoryModule;
    });
})(window.define, jQuery);

(function (define) {
    

    /*
     *  requireJS module entry point
     *  (to use that module you should include it to main.js)
     */
    define('category/module',[
            "category/service/api",
            "category/service/category",
            "category/controller"
        ],
        function (categoryModule) {

            return categoryModule;
        });

})(window.define);
(function (define) {
    

    /*
     *  Angular "pdpModule" declaration
     *  (module internal files refers to this instance)
     */
    define('pdp/init',[
            "angular",
            "angular-route",
            "angular-resource"
        ],
        function (angular) {
            /*
             *  Angular "pdpModule" declaration
             */
            angular.module.pdpModule = angular.module("pdpModule", ["ngRoute", "ngResource"])

                /*
                 *  Basic routing configuration
                 */
                .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
                    $routeProvider
                        .when("/product/:id", {
                            templateUrl: angular.getTheme("pdp/view.html"),
                            controller: "pdpController"
                        });
                    $locationProvider.html5Mode(true);
                }]);

            return angular.module.pdpModule;
        });

})(window.define);
(function (define) {
    

    /*
     *  HTML top page header manipulation stuff
     */
    define('pdp/service/api',['pdp/init'], function (pdpModule) {
        pdpModule
            /*
             *  $productApiService interaction service
             */
            .service('$pdpApiService', ['$resource', 'REST_SERVER_URI', function ($resource, REST_SERVER_URI) {

                return $resource(REST_SERVER_URI, {}, {
                    'getProduct': {
                        method: 'GET',
                        url: REST_SERVER_URI + '/product/:productID'
                    },
                    'getImagePath': {
                        method: 'GET',
                        url: REST_SERVER_URI + '/product/:productID/mediapath/image'
                    },
                    'listImages': {
                        method: 'GET',
                        url: REST_SERVER_URI + '/product/:productID/media/image'
                    },
                    "getProducts": {
                        method: "GET",
                        url: REST_SERVER_URI + "/products"
                    },
                    "getRelated": {
                        method: "GET",
                        url: REST_SERVER_URI + "/product/:productID/related"
                    },
                    "ratingInfo": {
                        method: "GET",
                        url: REST_SERVER_URI + "/product/:productID/rating"
                    },
                    "addReview": {
                        method: "POST",
                        params: {
                            productID: "@productID",
                            stars: "@stars"
                        },
                        headers: {"Content-Type": "text/plain"},
                        url: REST_SERVER_URI + "/product/:productID/review"
                    },
                    "reviewList": {
                        method: "GET",
                        url: REST_SERVER_URI + "/product/:productID/reviews"
                    },
                    "reviewRemove": {
                        method: "DELETE",
                        url: REST_SERVER_URI + "/product/:productID/review/:reviewID"
                    },
                    "getAttributes": {
                        method: "GET",
                        url: REST_SERVER_URI + "/products/attributes"
                    }
                });
            }]);

        return pdpModule;
    });

})(window.define);

(function (define) {
    

    /**
     *
     */
    define('pdp/service/options',["pdp/init"], function (pdpModule) {

        pdpModule
        /**
         *  $pdpProductOptionsService applies the custom options for product
         */
            .service("$pdpProductOptionsService", [
                "$commonUtilService",
                function ($commonUtilService) {
                    // Variables
                    var product;

                    // Functions
                    var applyPrice, getOptionInfo, getMultiSelectOptionInfo, getSelectOptionInfo, applyOptions, getPriceRules;

                    getSelectOptionInfo = function (data, key) {
                        var info;
                        info = $commonUtilService.clone(data);
                        delete info.options;

                        for (var row in  data.options) {
                            if (data.options.hasOwnProperty(row)) {
                                for (var field in  data.options[row]) {
                                    if (data.options[row].hasOwnProperty(field) && row === key) {
                                        info[field] = data.options[row][field];
                                    }
                                }
                            }
                        }

                        return info;
                    };

                    getMultiSelectOptionInfo = function (data, key) {
                        var item, initItem, resetItem;
                        var info = [];

                        initItem = function (item) {
                            if (typeof item === "undefined") {
                                item = $commonUtilService.clone(data);
                                delete item.options;
                            }

                            return item;
                        };

                        resetItem = function (item) {
                            if (typeof item !== "undefined") {
                                info.push(item);
                                item = undefined;
                            }
                            return item;
                        };

                        for (var row in  data.options) {
                            if (data.options.hasOwnProperty(row)) {
                                for (var field in  data.options[row]) {
                                    if (data.options[row].hasOwnProperty(field) && (-1 !== key.indexOf(row))) {
                                        item = initItem(item);
                                        item[field] = data.options[row][field];
                                    }
                                }
                                item = resetItem(item);
                            }
                        }

                        return info;
                    };

                    getOptionInfo = function (data, key) {
                        var info;
                        info = [];

                        if (typeof key !== "undefined" && key !== "") {
                            switch (data.type) {
                                case "select" :
                                    info.push(getSelectOptionInfo(data, key));
                                    break;
                                case "multi_select" :
                                    info = info.concat(getMultiSelectOptionInfo(data, key));
                                    break;
                                default:
                                    info.push(data);
                            }
                        } else {
                            info.push({});
                        }

                        return info;
                    };

                    applyPrice = function (data) {
                        data.sort(function (a, b) {
                            return a.order < b.order;
                        });

                        var getDeltaPrice = function (productPrice, optionPrice) {
                            var result = {
                                "operation": "+",
                                "value": 0
                            };

                            var parts = /^([\+\-]?)([\d]*)([\%]?)$/.exec(optionPrice);
                            if (parts === null) {
                                return result;
                            }

                            result["operation"] = parts[1] || "=";

                            if (parts[3] === "%") {
                                result["value"] = parseFloat(productPrice * (parts[2] / 100));
                            } else {
                                result["value"] = parseFloat(parts[2]);
                            }
                            if(isNaN(result["value"])){
                                result["operation"] = null;
                            }
                            return result;
                        };

                        var startPrice = parseFloat(product.price);

                        for (var i = 0; i < data.length; i += 1) {
                            var deltaData = getDeltaPrice(startPrice, data[i].price);
                            switch (deltaData["operation"]) {
                                case "+":
                                    product.price = parseFloat(product.price) + deltaData["value"];
                                    break;
                                case "-":
                                    product.price = parseFloat(product.price) - deltaData["value"];
                                    break;
                                case "=":
                                    product.price = deltaData["value"];
                                    break;
                            }
                        }
                    };

                    getPriceRules = function (product, options) {
                        var rules = [];

                        for (var option in  product.options) {
                            if (product.options.hasOwnProperty(option) && typeof product.options[option] !== "undefined") {
                                rules = rules.concat(getOptionInfo(product.options[option], options[option]));
                            }
                        }

                        return rules;
                    };

                    applyOptions = function (prod, options) {
                        if (typeof prod === "undefined" ||
                            typeof options === "undefined" ||
                            JSON.stringify(options) === JSON.stringify({})) {
                            return prod;
                        }
                        var rules;

                        product = $commonUtilService.clone(prod);
                        rules = getPriceRules(product, options);
                        applyPrice(rules);

                        return product;
                    };

                    return {
                        "applyOptions": applyOptions
                    };
                }
            ]
        );

        return pdpModule;
    });

})(window.define);

(function (define) {
    

    /*
     *  HTML top page header manipulation stuff
     */
    define('pdp/service/product',["pdp/init"], function (pdpModule) {

        pdpModule
            /*
             *  $productApiService interaction service
             */
            .service("$pdpProductService", [
                "$commonRewriteService",
                "$commonUtilService",
                "$pdpApiService",
                "$pdpProductOptionsService",
                "$q",
                function ($commonRewriteService, $commonUtilService, $pdpApiService, $pdpProductOptionsService, $q) {
                    // Variables
                    var type, ratingInfo, oldProduct, product, options;

                    // Functions
                    var getUrl, getRatingInfo, getDefaultRatingInfo, getAverageRating, setProduct, getProduct, applyOptions,
                        setOptions, getOptions, getOptStr;

                    type = "product";

                    getUrl = function (id) {
                        var url;
                        url = $commonRewriteService.getRewrite(type, id);

                        if (!url) {
                            url = type + "/" + id;
                        }

                        return "/" + url;
                    };

                    setProduct = function (obj) {
                        product = obj;
                        oldProduct = $commonUtilService.clone(product);

                        return product;
                    };

                    getProduct = function () {

                        return product;
                    };

                    setOptions = function (obj) {
                        options = obj;
                        applyOptions();

                        return options;
                    };

                    getOptions = function () {

                        return options;
                    };

                    getDefaultRatingInfo = function () {
                        return {
                            "stars_1": 0,
                            "stars_2": 0,
                            "stars_3": 0,
                            "stars_4": 0,
                            "stars_5": 0,
                            "averageValue": 0,
                            "fifeStarPersent": 0,
                            "fourStarPersent": 0,
                            "oneStarPersent": 0,
                            "threeStarPersent": 0,
                            "twoStarPersent": 0
                        };
                    };

                    ratingInfo = getDefaultRatingInfo();

                    applyOptions = function () {
                        product = $commonUtilService.clone(oldProduct);
                        product = $pdpProductOptionsService.applyOptions(product, options);
                        return product;
                    };

                    getRatingInfo = function (productId) {
                        var defer = $q.defer();

                        $pdpApiService.ratingInfo({"productID": productId}).$promise.then(
                            function (response) {
                                if(response.result instanceof Array) {
                                    ratingInfo = response.result[0];
                                } else {
                                    ratingInfo = getDefaultRatingInfo();
                                }
                                ratingInfo.count = ratingInfo['stars_1'] + ratingInfo['stars_2'] + ratingInfo['stars_3'] + ratingInfo['stars_4'] + ratingInfo['stars_5'];
                                if (ratingInfo.count > 0) {
                                    ratingInfo.averageValue = ((1 * ratingInfo['stars_1']) +
                                        (2 * ratingInfo['stars_2']) +
                                        (3 * ratingInfo['stars_3']) +
                                        (4 * ratingInfo['stars_4']) +
                                        (5 * ratingInfo['stars_5'])) / (ratingInfo.count);
                                }
                                defer.resolve(ratingInfo);
                            }
                        );

                        return defer.promise;
                    };

                    getAverageRating = function () {
                        return (typeof ratingInfo.averageValue !== "undefined" ? ratingInfo.averageValue : 0);
                    };

                    getOptStr = function (value) {
                        return value instanceof Array ? value.join(", ") : value;
                    };

                    return {
                        "getUrl": getUrl,
                        "setProduct": setProduct,
                        "getProduct": getProduct,
                        "setOptions": setOptions,
                        "getOptions": getOptions,
                        "getOptStr": getOptStr,
                        "applyOptions": applyOptions,
                        "getRatingInfo": getRatingInfo,
                        "getAverageRating": getAverageRating
                    };
                }
            ]
        );

        return pdpModule;
    });

})(window.define);

(function (define) {
    

    define('pdp/directive/guiCustomOptions',["pdp/init"], function (pdpModule) {

        pdpModule.directive("guiCustomOptions", ["$designService", function ($designService) {
            return {
                restrict: "E",
                scope: {
                    "parent": "=object",
                    "product": "=item"
                },
                templateUrl: $designService.getTemplate("pdp/gui/guiCustomOptions.html"),
                controller: function ($scope) {
                    var prepareOptions;

                    $scope.optionName = "";
                    $scope.options = {};

                    $scope.setOptionName = function (name) {
                        $scope.optionName = name;
                    };

                    prepareOptions = function () {
                        var removeEmptyOptions;

                        removeEmptyOptions = function () {
                            if (typeof $scope.parent.options[$scope.optionName] !== "undefined" &&
                                $scope.parent.options[$scope.optionName].length <= 0) {
                                delete $scope.parent.options[$scope.optionName];
                            }
                        };

                        for (var field in $scope.options) {
                            if ($scope.options.hasOwnProperty(field) && $scope.options[field]) {
                                if (typeof $scope.parent.options[$scope.optionName] === "undefined") {
                                    $scope.parent.options[$scope.optionName] = [];
                                }
                                $scope.parent.options[$scope.optionName].push(field);
                            }
                        }

                        removeEmptyOptions();
                    };

                    $scope.$watch("options", function () {
                        if (typeof $scope.parent.options[$scope.optionName] !== "undefined") {
                            $scope.parent.options[$scope.optionName] = [];
                        }

                        prepareOptions();
                    }, true);

                    $scope.$watch("customOptionsForm", function () {
                        $scope.parent.customOptionsForm = $scope.customOptionsForm;

                    }, true);
                }
            };
        }])
            .filter('getOrdered', function () {
                return function (input) {
                    var ordered = {};
                    for (var key in input) {
                        if (input.hasOwnProperty(key)) {

                            ordered[input[key].order] = input[key];
                        }
                    }

                    return ordered;
                };
            });

        return pdpModule;
    });
})(window.define);

(function (define, $) {
    

    define('pdp/controller',["angular", "pdp/init"], function (angular, pdpModule) {

        pdpModule
        /**
         *  HTML top page header manipulator (direct service mapping)
         */
            .controller("pdpController", [
                "$scope",
                "$routeParams",
                "$location",
                "$timeout",
                "$pdpApiService",
                "$pdpProductService",
                "$designImageService",
                "$cartService",
                "$visitorLoginService",
                "$commonUtilService",
                function ($scope, $routeParams, $location, $timeout, $pdpApiService, $pdpProductService,
                          $designImageService, $cartService, $visitorLoginService, $commonUtilService) {
                    var defaultProduct, reinitializeStars, getAverageValue, getStarsPercents, getDefaultRatingInfo, initWatchers;

                    initWatchers = function () {
                        var defaultGetRatingInfo, defaultProductChange, defaultOptionChange;
                        defaultGetRatingInfo = $scope.$watch("ratingInfo", function () {
                            getAverageValue();
                            getStarsPercents();
                        }, true);

                        defaultProductChange = $scope.$watch("product", function () {
                            $scope.reloadImages();
                        });

                        defaultOptionChange = $scope.$watch("options", function () {
                            $scope.messageOptions = {};
                            $pdpProductService.setOptions($scope.options);
                            $scope.product = $pdpProductService.getProduct();
                        }, true);
                    };

                    $scope.init = function () {
                        getDefaultRatingInfo = function () {
                            return {
                                "stars_1": 0,
                                "stars_2": 0,
                                "stars_3": 0,
                                "stars_4": 0,
                                "stars_5": 0,
                                "averageValue": 0,
                                "fifeStarPersent": 0,
                                "fourStarPersent": 0,
                                "oneStarPersent": 0,
                                "threeStarPersent": 0,
                                "twoStarPersent": 0
                            };
                        };

                        defaultProduct = function () {
                            return {};
                        };

                        reinitializeStars = function () {
                            setTimeout(function () {
                                $("input.rating").each(function () {

                                    if ($(this).hasClass("disabled")) {
                                        $(this).rating({
                                            readonly: true,
                                            disabled: true,
                                            showCaption: false,
                                            showClear: false
                                        });
                                    } else {
                                        $(this).rating({
                                            showCaption: false,
                                            showClear: false
                                        });
                                    }

                                });

                            }, 300);
                        };

                        getAverageValue = function () {

                            if (typeof $scope.ratingInfo === "undefined") {
                                return false;
                            }

                            $scope.count = $scope.ratingInfo['stars_1'] + $scope.ratingInfo['stars_2'] + $scope.ratingInfo['stars_3'] + $scope.ratingInfo['stars_4'] + $scope.ratingInfo['stars_5'];
                            if ($scope.count > 0) {
                                $scope.ratingInfo.averageValue = ((1 * $scope.ratingInfo['stars_1']) +
                                    (2 * $scope.ratingInfo['stars_2']) +
                                    (3 * $scope.ratingInfo['stars_3']) +
                                    (4 * $scope.ratingInfo['stars_4']) +
                                    (5 * $scope.ratingInfo['stars_5'])) / ($scope.count);
                            }

                        };

                        getStarsPercents = function () {
                            if (typeof $scope.ratingInfo === "undefined") {
                                return false;
                            }

                            $scope.ratingInfo.oneStarPersent = ($scope.ratingInfo['stars_1'] / $scope.count) * 100;
                            $scope.ratingInfo.twoStarPersent = ($scope.ratingInfo['stars_2'] / $scope.count) * 100;
                            $scope.ratingInfo.threeStarPersent = ($scope.ratingInfo['stars_3'] / $scope.count) * 100;
                            $scope.ratingInfo.fourStarPersent = ($scope.ratingInfo['stars_4'] / $scope.count) * 100;
                            $scope.ratingInfo.fifeStarPersent = ($scope.ratingInfo['stars_5'] / $scope.count) * 100;
                        };

                        $scope.productId = $routeParams.id;
                        $scope.product = defaultProduct();
                        $scope.qty = 1;
                        $scope.ratingInfo = getDefaultRatingInfo();
                        $scope.options = {};
                        $scope.related = [];

                        $scope.getProduct();
                        $scope.getRelatedProducts();
                        $scope.getReviews();
                        $scope.getRatingInfo();
                        initWatchers();
                    };

                    $scope.getProduct = function () {
                        $pdpApiService.getProduct({"productID": $scope.productId}).$promise.then(function (response) {
                            if (response.error === null) {
                                var result = response.result || defaultProduct();

                                $pdpProductService.setProduct(result);
                                $scope.product = $pdpProductService.getProduct();

                                // BREADCRUMBS
                                $scope.$emit("add-breadcrumbs", {"label": $scope.product.name, "url": $pdpProductService.getUrl($scope.product._id)});
                            } else {
                                $location.path("/");
                            }
                        });
                    };

                    $scope.getPublicAttributes = function () {
                        if (typeof $scope.publicAttributes === "undefined") {
                            $scope.hasPublicAttributes = false;
                            $scope.publicAttributes = {};
                            $pdpApiService.getAttributes().$promise.then(
                                function (response) {
                                    var result = response.result;

                                    if (response.error === null) {
                                        for (var i = 0; i < result.length; i += 1) {
                                            if (result[i]['IsPublic'] && typeof $scope.product[result[i]['Attribute']] === "string") {
                                                $scope.publicAttributes[result[i]['Label']] = $scope.product[result[i]['Attribute']];
                                                $scope.hasPublicAttributes = true;
                                            }
                                            if (result[i]['IsPublic'] && $scope.product[result[i]['Attribute']] instanceof Array) {
                                                $scope.publicAttributes[result[i]['Label']] = $scope.product[result[i]['Attribute']].join(", ");
                                                $scope.hasPublicAttributes = true;
                                            }
                                        }
                                    }
                                }
                            );
                        }
                    };

                    $scope.getTotal = function () {
                        return $scope.qty * $scope.product.price;
                    };

                    //-----------------
                    // IMAGE FUNCTIONS
                    //-----------------
                    $scope.reloadImages = function () {
                        if ($scope.product !== undefined && $scope.product._id !== undefined) {
                            // taking media patch for new product
                            $pdpApiService.getImagePath({"productID": $scope.product._id}).$promise.then(
                                function (response) {
                                    $scope.imagesPath = response.result || "";
                                });

                            // taking registered images for product
                            $pdpApiService.listImages({"productID": $scope.product._id}).$promise.then(
                                function (response) {
                                    $scope.productImages = response.result || [];

                                    // Makes default_image first in array
                                    $scope.productImages.sort(function (a, b) {
                                        if (a.toString() < b.toString() && a === $scope.product["default_image"]) {
                                            return -1;
                                        }
                                        if (a.toString() > b.toString() && a !== $scope.product["default_image"]) {
                                            return 1;
                                        }

                                        return 0;
                                    });
                                });
                        }
                    };

                    /**
                     * Returns full path to image
                     *
                     * @param {string} path     - the destination path to product folder
                     * @param {string} image    - image name
                     * @returns {string}        - full path to image
                     */
                    $scope.getImage = function (path, image, size) {
                        return $designImageService.getFullImagePath(path, image, size);
                    };

                    $scope.addToCart = function () {
                        var addItem = function () {
                            $scope.submitted = true;
                            $cartService.add($scope.productId, $scope.qty, $pdpProductService.getOptions()).then(
                                function (response) {
                                    if (response.error !== null) {
                                        $scope.messageOptions = $commonUtilService.getMessage(response);
                                    } else {
                                        var miniCart;
                                        miniCart = $(".mini-cart");
                                        miniCart.modal('show');
                                        $timeout(function () {
                                            miniCart.modal('hide');
                                        }, 2000);
                                    }
                                }
                            );
                        };

                        if (angular.appConfigValue("general.checkout.guest_checkout")) {
                            addItem();
                        } else {
                            $visitorLoginService.isLoggedIn().then(function (isLoggedIn) {
                                if (isLoggedIn) {
                                    addItem();
                                } else {
                                    $("#form-login").modal("show");
                                }
                            });
                        }
                    };


                    /**
                     * "Related" products
                     */
                    $scope.getRelatedProducts = function () {
                        $pdpApiService.getRelated({"productID": $scope.productId, "extra": 'price'}).$promise.then(function (response) {
                            var result, i, parts, splitName;

                            splitName = function (string) {
                                var parts;
                                var regExp = /\[(.+)\](.+)/i;
                                parts = string.match(regExp);

                                return parts;
                            };
                            result = response.result || [];

                            for (i = 0; i < result.length; i += 1) {
                                parts = splitName(result[i].Name);
                                $scope.related.push({
                                    "ID": result[i].ID,
                                    "Image": result[i].Image,
                                    "Name": parts[2],
                                    "Sku": parts[1],
                                    "Price": result[i].Extra.price
                                });
                            }

                        });
                    };

                    $scope.changeQty = function (qtyItem, action) {
                        if (action === "up") {
                            $scope.qty = parseInt(qtyItem, 10) + 1;
                        }
                        else if (action === "down") {
                            if (qtyItem > 1) {
                                $scope.qty = parseInt(qtyItem, 10) - 1;
                            }
                        }
                    };

                    /**
                     * Gets reviews list
                     */
                    $scope.getReviews = function () {
                        $pdpApiService.reviewList({"productID": $scope.productId}).$promise.then(function (response) {
                            $scope.reviewsList = response.result || [];
                        });
                    };

                    /**
                     * Gets rating info
                     */
                    $scope.getRatingInfo = function () {
                        $pdpApiService.ratingInfo({"productID": $scope.productId}).$promise.then(function (response) {
                            if (response.result instanceof Array) {
                                $scope.ratingInfo = response.result[0];
                            } else {
                                $scope.ratingInfo = getDefaultRatingInfo();
                            }
                            getAverageValue();
                            getStarsPercents();
                        });
                    };

                    /**
                     * Gets date in format {Month} {day}, {year}
                     *
                     * @param {string} str
                     * @returns {string}
                     */
                    $scope.getDate = function (str) {
                        var date, month, day;
                        var months = [
                            "January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December"
                        ];

                        date = $commonUtilService.getDate(str);
                        month = date.getMonth() + 1;
                        day = date.getDay().toString().length < 2 ? "0" + date.getDay() : date.getDay();

                        return months[month] + " " + day + ", " + date.getFullYear();
                    };

                    /**
                     * Gets title for review
                     *
                     * @param {object} obj
                     * @returns {string}
                     */
                    $scope.getReviewTitle = function (obj) {
                        var pos;
                        pos = obj.review.indexOf(".") !== -1 ? obj.review.indexOf(".") : obj.review.length;
                        return obj.review.substring(0, pos);
                    };

                    /**
                     * Saves review and rating for product
                     */
                    $scope.saveReview = function () {
                        $scope.submittedReview = true;
                        if (!$scope.reviewForm.$invalid) {
                            $pdpApiService.addReview(
                                {
                                    "productID": $scope.productId,
                                    "stars": $scope.review.stars
                                }, $scope.review.comment).$promise.then(
                                function (response) {

                                    if (response.error === null) {
                                        $scope.reviewsList.push(response.result || []);

                                        $scope.sortByRating($scope.orderReviews);

                                        if (response.result.rating > 0) {
                                            $scope.ratingInfo[response.result.rating + "star"] += 1;
                                        }
                                        $scope.review = {};
                                        $scope.submittedReview = false;
                                        $scope.reviewForm.review.$pristine = true;
                                        $scope.review.stars = 0;
                                        reinitializeStars();
                                    } else {
                                        $scope.messageReview = $commonUtilService.getMessage(response);
                                    }

                                }
                            );
                        }
                    };

                    $scope.sortByRating = function (order) {
                        $scope.orderReviews = order;

                        switch (order) {
                            case "asc" :
                                $scope.sorting = "Low to High";
                                break;
                            case "desc" :
                                $scope.sorting = "High to Low";
                                break;
                        }

                        $scope.reviewsList.sort(function (a, b) {
                            if (order === "asc") {
                                return a.rating > b.rating;
                            } else {
                                return a.rating < b.rating;
                            }
                        });

                    };

                }
            ]
        );

        return pdpModule;
    });
})(window.define, jQuery);

(function (define) {
    

    /**
     *  Module contains general purpose directives and services used to render HTML page
     */
    define('pdp/module',[
            "pdp/service/api",
            "pdp/service/options",
            "pdp/service/product",

            "pdp/directive/guiCustomOptions",

            "pdp/controller"
        ],
        function (pdpModule) {

            return pdpModule;
        });

})(window.define);
(function (define) {
    

    define('cart/init',[
            "angular",
            "angular-route",
            "angular-resource"
        ],
        function (angular) {
            /*
             *  Angular "cartModule" declaration
             */
            angular.module.cartModule = angular.module("cartModule", ["ngRoute", "ngResource", "designModule"])

                /*
                 *  Basic routing configuration
                 */
                .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
                    $routeProvider
                        .when("/cart", {
                            templateUrl: angular.getTheme("cart/view.html"),
                            controller: "cartListController"
                        });
                    $locationProvider.html5Mode(true);
                }]);

            return angular.module.cartModule;
        });

})(window.define);
(function (define) {
    

    /*
     *  HTML top page header manipulation stuff
     */
    define('cart/service/api',["cart/init"], function (cartModule) {
        cartModule
            /*
             *  $cartApiService interaction service
             */
            .service("$cartApiService", ["$resource", "REST_SERVER_URI", function ($resource, REST_SERVER_URI) {

                return $resource(REST_SERVER_URI, {}, {
                    "add": {
                        method: "POST",
                        url: REST_SERVER_URI + "/cart/item"
                    },
                    "remove": {
                        method: "DELETE",
                        params: { itemIdx: "@itemIdx" },
                        url: REST_SERVER_URI + "/cart/item/:itemIdx"
                    },
                    "info": {
                        method: "GET",
                        url: REST_SERVER_URI + "/cart"
                    },
                    "update": {
                        method: "PUT",
                        params: {
                            itemIdx: "@itemIdx",
                            qty: "@qty"
                        },
                        url: REST_SERVER_URI + "/cart/item/:itemIdx/:qty"
                    }
                });
            }]);

        return cartModule;
    });

})(window.define);
(function (w, define) {
    

    /**
     *  HTML top page header manipulation stuff
     */
    define('cart/service/cart',[
        'cart/init'
    ], function (cartModule) {
        cartModule

        /**
         *  $cartService interaction service
         */
            .service('$cartService', [
                '$resource',
                '$cartApiService',
                '$cookieStore',
                '$pdpProductOptionsService',
                'LOGIN_COOKIE',
                '$q',
                function ($resource, $cartApiService, $cookieStore, $pdpProductOptionsService, LOGIN_COOKIE, $q) {

                    var isInit, items, visitorId, subtotal, saleTax, shipping, total, activeRequests, initScope,
                        addItem, init, reload, loadCartInfo, getItems, remove, update,
                        getSubtotal, getSalesTax, getShipping, getTotal,
                        setSubtotal, setSalesTax, setShipping, setTotal, getCountItems,
                        getItemsForMiniCart, getTotalQuantity, getItem, increaseCountRequest, decreaseCountRequest;

                    initScope = function() {
                        items = [];
                        subtotal = 0;
                        saleTax = 0;
                        shipping = 0;
                        total = 0;
                        activeRequests = 0;
                    };

                    init = function () {
                        var defer = $q.defer();

                        if (typeof isInit === 'undefined') {
                            initScope();
                            loadCartInfo().then(
                                function () {
                                    isInit = true;
                                    defer.resolve(isInit);
                                }
                            );
                        } else {
                            defer.resolve(isInit);
                        }

                        return defer.promise;
                    };

                    getItems = function () {
                        return items;
                    };

                    getItem = function (_idx) {
                        var _item, i;

                        for (i = 0; i < items.length; i += 1) {
                            if (items[i].idx === _idx) {
                                _item = items[i];
                                break;
                            }
                        }

                        return _item;
                    };

                    getItemsForMiniCart = function () {
                        var i, count, maxCount, res;
                        maxCount = 3;
                        res = [];
                        if (items instanceof Array && items.length) {
                            for (i = items.length - 1, count = 0; (i >= 0) && (count < maxCount); i -= 1, count += 1) {
                                res.push(items[i]);
                            }
                        }

                        return res;
                    };

                    getSubtotal = function () {
                        var i, item;

                        subtotal = 0;
                        if (typeof items !== 'undefined') {
                            for (i = 0; i < items.length; i += 1) {
                                item = items[i];
                                subtotal += item.qty * item.product.price;
                            }
                        }

                        return subtotal;
                    };

                    setSubtotal = function (value) {
                        subtotal = value;

                        return subtotal;
                    };

                    getSalesTax = function () {
                        return saleTax || 0;
                    };

                    setSalesTax = function (value) {
                        saleTax = value;

                        return saleTax;
                    };

                    getShipping = function () {
                        return shipping || 0;
                    };

                    setShipping = function (value) {
                        shipping = value;

                        return shipping;
                    };

                    getTotal = function () {
                        total = subtotal + saleTax + shipping;

                        return total;
                    };

                    setTotal = function (value) {
                        total = value;

                        return total;
                    };

                    /**
                     * Total unique goods
                     *
                     * @returns {number}
                     */
                    getCountItems = function () {
                        var count = 0;

                        if (typeof items !== 'undefined') {
                            count = items.length;
                        }

                        return count;
                    };

                    /**
                     * Total qty of items
                     *
                     * @returns {number}
                     */
                    getTotalQuantity = function () {
                        var count = 0;

                        if (typeof items !== 'undefined') {
                            for (var i = 0; i < items.length; i += 1) {
                                count += items[i].qty;
                            }
                        }

                        return count;
                    };

                    reload = function () {
                        var deferReload = $q.defer();

                        loadCartInfo().then(
                            function () {
                                isInit = true;
                                deferReload.resolve(isInit);
                            }
                        );

                        return deferReload.promise;
                    };

                    loadCartInfo = function () {
                        var deferLoadCart = $q.defer();
                        if (activeRequests > 0) {
                            deferLoadCart.resolve(true);
                        } else {
                            $cartApiService.info().$promise.then(
                                function (response) {
                                    if (response.error === null) {

                                        items = [];
                                        if (response.result.items instanceof Array) {
                                            // Apply options by all products
                                            for (var i = 0; i < response.result.items.length; i += 1) {
                                                response.result.items[i].product = response.result.items[i].product;
                                                response.result.items[i].hasOptions = JSON.stringify(response.result.items[i].options) === JSON.stringify({}) ? false : true;

                                                items.push(response.result.items[i]);
                                            }
                                        }

                                        visitorId = response.result["visitor_id"];
                                        deferLoadCart.resolve(true);
                                    } else {
                                        items = undefined;
                                        visitorId = undefined;
                                        deferLoadCart.resolve(false);
                                    }
                                }
                            );
                        }

                        return deferLoadCart.promise;
                    };

                    addItem = function (productId, qty, options) {
                        var deferAddItem = $q.defer();
                        $cartApiService.add({
                            'pid': productId,
                            'qty': qty
                        }, options).$promise.then(
                            function (response) {
                                deferAddItem.resolve(response);
                                loadCartInfo();
                            }
                        );

                        return deferAddItem.promise;
                    };

                    remove = function (itemIdx) {
                        if (w.confirm('You really want remove this item from shopping cart?')) {
                            var deferRemoveItem = $q.defer();
                            $cartApiService.remove({'itemIdx': itemIdx}).$promise.then(
                                function () {
                                    activeRequests -= 1;
                                    loadCartInfo().then(
                                        function () {
                                            deferRemoveItem.resolve(true);
                                        }
                                    );
                                }
                            );

                            return deferRemoveItem.promise;
                        }
                    };

                    update = function (itemIdx, qty) {
                        var deferRemoveItem = $q.defer();

                        $cartApiService.update({
                            'itemIdx': itemIdx,
                            'qty': qty
                        }).$promise.then(
                            function () {
                                activeRequests -= 1;
                                loadCartInfo().then(
                                    function () {
                                        deferRemoveItem.resolve(true);
                                    }
                                );
                            }
                        );

                        return deferRemoveItem.promise;
                    };

                    increaseCountRequest = function () {
                        activeRequests += 1;
                    };
                    decreaseCountRequest = function () {
                        activeRequests -= 1;
                    };

                    return {
                        'increaseCountRequest': increaseCountRequest,
                        'decreaseCountRequest': decreaseCountRequest,
                        'init': init,
                        'reload': reload,
                        'add': addItem,
                        'remove': remove,
                        'update': update,
                        'getItems': getItems,
                        'getItem': getItem,
                        'getItemsForMiniCart': getItemsForMiniCart,
                        'getCountItems': getCountItems,
                        'getTotalQuantity': getTotalQuantity,

                        'getSubtotal': getSubtotal,
                        'setSubtotal': setSubtotal,
                        'getSalesTax': getSalesTax,
                        'setSalesTax': setSalesTax,
                        'getShipping': getShipping,
                        'setShipping': setShipping,
                        'getTotal': getTotal,
                        'setTotal': setTotal
                    };
                }
            ]
        );

        return cartModule;
    });

})(window, window.define);

(function (define, $) {
    

    define('cart/controller',["angular", "cart/init"], function (angular, cartModule) {
        cartModule

            .controller("cartListController", [
                "$scope",
                "$interval",
                "$cartApiService",
                "$cartService",
                "$designImageService",
                "$visitorLoginService",
                "$pdpProductService",
                "$checkoutService",
                "$location",
                function ($scope, $interval, $cartApiService, $cartService, $designImageService, $visitorLoginService, $pdpProductService, $checkoutService, $location) {
                    $scope.it = $cartService;
                    $scope.checkout = $checkoutService;
                    $scope.productService = $pdpProductService;
                    $scope.visitorService = $visitorLoginService;

                    $scope.init = function () {
                        if (!angular.appConfigValue("general.checkout.guest_checkout")) {
                            $scope.visitorService.isLoggedIn().then(function (isLoggedIn) {
                                if (!isLoggedIn) {
                                    $location.path("/");
                                }
                            });
                        }

                        $cartService.reload();

                        $scope.$emit("add-breadcrumbs", {"label": "My Account", "url": "/account"});
                        $scope.$emit("add-breadcrumbs", {"label": "Shopping Cart", "url": "/cart"});
                    };

                    $scope.remove = function (itemIdx) {
                        $cartService.increaseCountRequest();
                        $cartService.remove(itemIdx);
                    };

                    var stop = {}, dateLastClick;
                    $scope.update = function (itemIdx) {
                        var stopCurrentInterval, delay, callback, getStartTime;
                        delay = 500;

                        dateLastClick = new Date();

                        stopCurrentInterval = function () {
                            if (angular.isDefined(stop[itemIdx])) {
                                $interval.cancel(stop[itemIdx]);
                                stop[itemIdx] = undefined;
                            }
                        };

                        getStartTime = function () {
                            return dateLastClick.getTime();
                        };

                        callback = function () {
                            var duration, d, qty;
                            d = new Date();
                            duration = d.getTime() - getStartTime();

                            if (duration >= delay) {
                                var item = $cartService.getItem(itemIdx);
                                qty = item.qty;
                                stopCurrentInterval();
                                $cartService.update(itemIdx, qty);
                            }
                        };

                        if (typeof stop[itemIdx] === "undefined") {
                            $cartService.increaseCountRequest();
                            stop[itemIdx] = $interval(callback, 100);
                        }
                    };

                    /**
                     * Gets full path to image
                     *
                     * @param {object} product
                     * @returns {string}
                     */
                    $scope.getImage = function (product, size) {
                        return $designImageService.getFullImagePath("", product.image, size);
                    };

                    $scope.getSubtotal = function () {
                        return $cartService.getSubtotal();
                    };

                    $scope.getSalesTax = function () {
                        return $cartService.getSalesTax();
                    };

                    $scope.getShipping = function () {
                        return $cartService.getShipping();
                    };

                    $scope.getTotal = function () {
                        return $cartService.getTotal();
                    };

                    $scope.changeQty = function (item, action) {
                        var _qty = parseInt(item.qty, 10);

                        if (action === "up") {
                            item.qty = _qty + 1;
                        }
                        else if (action === "down") {
                            if (_qty > 1) {
                                item.qty = _qty - 1;
                            }
                        }
                    };

                    /**
                     * Hides mini-cart after change url
                     */
                    $scope.$on("$locationChangeSuccess", function () {
                        $(".mini-cart").modal('hide');
                    });

                }
            ])
        ;
        return cartModule;
    });
})(window.define, jQuery);
(function (define) {
    

    /*
     *  requireJS module entry point
     *  (to use that module you should include it to main.js)
     */
    define('cart/module',[
            "cart/service/api",
            "cart/service/cart",
            "cart/controller"
        ],
        function (cartModule) {

            return cartModule;
        });

})(window.define);
(function (define) {
    

    define('checkout/init',[
            "angular",
            "angular-route",
            "angular-resource"
        ],
        function (angular) {
            /**
             *  Angular "checkoutModule" declaration
             */
            angular.module.checkoutModule = angular.module("checkoutModule", ["ngRoute", "ngResource", "designModule"])

                .constant("CHECKOUT_TYPE", "general.checkout.checkout_type")
                .constant("ONEPAGE_URL", "/spcheckout")
                .constant("ACCORDION_URL", "/checkout")

                /*
                 *  Basic routing configuration
                 */
                .config([
                    "$routeProvider",
                    "$locationProvider",
                    "ONEPAGE_URL",
                    "ACCORDION_URL",
                    function ($routeProvider, $locationProvider, ONEPAGE_URL, ACCORDION_URL) {
                        $routeProvider
                            .when(ONEPAGE_URL, {
                                templateUrl: angular.getTheme("checkout/view.html"),
                                controller: "checkoutOnepageController"
                            })
                            .when(ACCORDION_URL, {
                                templateUrl: angular.getTheme("checkout/view2.html"),
                                controller: "checkoutAccordionController"
                            });
                        $locationProvider.html5Mode(true);
                    }
                ])

                .run([
                    "$http",
                    "REST_SERVER_URI",
                    "CHECKOUT_TYPE",
                    "$checkoutService",
                    function ($http, REST_SERVER_URI, CHECKOUT_TYPE, $checkoutService) {
                        $http({
                            url: REST_SERVER_URI + "/config/value/" + CHECKOUT_TYPE,
                            method: "GET"
                        }).success(function (response) {
                            $checkoutService.setType(response.result);
                        });
                    }
                ]
            );

            return angular.module.checkoutModule;
        });

})(window.define);
(function (define) {
    

    /*
     *  HTML top page header manipulation stuff
     */
    define('checkout/service/api',["checkout/init"], function (checkoutModule) {
        checkoutModule
            /*
             *  $checkoutApiService interaction service
             */
            .service("$checkoutApiService", [
                "$resource",
                "REST_SERVER_URI",
                function ($resource, REST_SERVER_URI) {

                    return $resource(REST_SERVER_URI, {}, {
                        "shippingMethods": {
                            method: "GET",
                            url: REST_SERVER_URI + "/checkout/shipping/methods"
                        },
                        "setShippingMethod": {
                            method: "PUT",
                            params: {
                                method: "@method",
                                rate: "@rate"
                            },
                            url: REST_SERVER_URI + "/checkout/shipping/method/:method/:rate"
                        },
                        "paymentMethods": {
                            method: "GET",
                            url: REST_SERVER_URI + "/checkout/payment/methods"
                        },
                        "setPaymentMethod": {
                            method: "PUT",
                            params: {
                                method: "@method"
                            },
                            url: REST_SERVER_URI + "/checkout/payment/method/:method"
                        },
                        "setShippingAddress": {
                            method: "PUT",
                            url: REST_SERVER_URI + "/checkout/shipping/address"
                        },
                        "setBillingAddress": {
                            method: "PUT",
                            url: REST_SERVER_URI + "/checkout/billing/address"
                        },
                        "setInfo": {
                            method: "PUT",
                            url: REST_SERVER_URI + "/checkout"
                        },
                        "submit": {
                            method: "POST",
                            url: REST_SERVER_URI + "/checkout/submit"
                        },
                        "getAddresses": {
                            method: "GET",
                            url: REST_SERVER_URI + "/visit/addresses"
                        },
                        "info": {
                            method: "GET",
                            url: REST_SERVER_URI + "/checkout"
                        },
                        "save": {
                            method: "POST",
                            url: REST_SERVER_URI + "/checkout/submit"
                        },
                        "discountApply": {
                            method: "GET",
                            url: REST_SERVER_URI + "/discount/:coupon/apply"
                        },
                        "discountNeglect": {
                            method: "GET",
                            url: REST_SERVER_URI + "/discount/:coupon/neglect"
                        }
                    });
                }
            ]);

        return checkoutModule;
    });

})(window.define);
(function (define) {
    

    /**
     *
     */
    define('checkout/service/checkout',[
            "angular",
            "common/init"
        ],
        function (angular, checkoutModule) {

            checkoutModule
            /**
             *
             */
                .service("$checkoutService", [
                    "$q",
                    "$timeout",
                    "$interval",
                    "$checkoutApiService",
                    "ONEPAGE_URL",
                    "ACCORDION_URL",
                    function ($q, $timeout, $interval, $checkoutApiService, ONEPAGE_URL, ACCORDION_URL) {
                        // Variables
                        var checkout, allowedShippingMethods, allowedPaymentMethods, defaultType, activeType;

                        // Functions
                        var init, getUrl, getType, setType, update, loadShippingMethods, loadPaymentMethods,
                            saveBillingAddress, saveShippingAddress, saveShippingMethod, savePaymentMethod, discountApply, discountNeglect,
                            getCheckout, getAllowedPaymentMethods, getAllowedShippingMethods, saveAdditionalInfo, getAllowedGuestCheckout,
                            getMinimalCostShippingMethods;

                        checkout = {};
                        defaultType = "accordion";

                        loadShippingMethods = function () {
                            var defer = $q.defer();


                            var splitMethodToRates = function (method) {
                                var i, rate;
                                for (i = 0; i < method.Rates.length; i += 1) {
                                    rate = method.Rates[i];

                                    allowedShippingMethods.push(
                                        {
                                            "Name": method.Name + " - " + rate.Name + " ($" + rate.Price + ")",
                                            "Price": rate.Price,
                                            "Method": method.Code,
                                            "Rate": rate.Code
                                        }
                                    );
                                }
                            };

                            $checkoutApiService.shippingMethods().$promise.then(function (response) {
                                var i, method;
                                allowedShippingMethods = [];
                                if (response.error === null) {
                                    for (i = 0; i < response.result.length; i += 1) {
                                        method = response.result[i] || [];
                                        if (method.Rates instanceof Array && method.Rates.length > 0) {
                                            splitMethodToRates(method);
                                        }
                                    }
                                }

                                defer.resolve(allowedShippingMethods);
                            });

                            return defer.promise;
                        };

                        loadPaymentMethods = function () {
                            var defer = $q.defer();
                            allowedPaymentMethods = [];
                            $checkoutApiService.paymentMethods().$promise.then(function (response) {
                                allowedPaymentMethods = response.result || [];
                                defer.resolve(allowedPaymentMethods);
                            });

                            return defer.promise;
                        };

                        init = function () {
                            var defer, statuses;
                            statuses = {
                                "isLoadedSM": false,
                                "isLoadedPM": false
                            };
                            defer = $q.defer();

                            loadShippingMethods().then(function () {
                                statuses.isLoadedSM = true;
                            });
                            loadPaymentMethods().then(function () {
                                statuses.isLoadedPM = true;
                            });

                            var stop = $interval(function () {
                                var initAll = true;
                                for (var key in statuses) {
                                    if (statuses.hasOwnProperty(key) && !statuses[key]) {
                                        initAll = false;
                                        break;
                                    }
                                }
                                if (initAll) {
                                    $interval.cancel(stop);
                                    defer.resolve(checkout);
                                }
                            }, 100);

                            return defer.promise;
                        };

                        update = function () {
                            var defer = $q.defer();

                            $checkoutApiService.info().$promise.then(
                                function (response) {
                                    checkout = response.result || [];
                                    defer.resolve(checkout);
                                }
                            );

                            return defer.promise;
                        };

                        saveBillingAddress = function (address) {
                            var defer = $q.defer();

                            $checkoutApiService.setBillingAddress(address).$promise.then(
                                function (response) {
                                    defer.resolve(response);
                                }
                            );

                            return defer.promise;
                        };

                        saveShippingAddress = function (address) {
                            var defer = $q.defer();

                            $checkoutApiService.setShippingAddress(address).$promise.then(
                                function (response) {
                                    defer.resolve(response);
                                }
                            );

                            return defer.promise;
                        };

                        saveShippingMethod = function (method) {
                            var defer = $q.defer();

                            $checkoutApiService.setShippingMethod(method).$promise.then(
                                function (response) {
                                    defer.resolve(response);
                                }
                            );

                            return defer.promise;
                        };

                        savePaymentMethod = function (method) {
                            var defer = $q.defer();

                            $checkoutApiService.setPaymentMethod(method).$promise.then(
                                function (response) {
                                    defer.resolve(response);
                                }
                            );

                            return defer.promise;
                        };

                        saveAdditionalInfo = function (data) {
                            var defer = $q.defer();

                            $checkoutApiService.setInfo(data).$promise.then(
                                function (response) {
                                    defer.resolve(response);
                                }
                            );

                            return defer.promise;
                        };

                        discountApply = function (data) {
                            var defer = $q.defer();

                            $checkoutApiService.discountApply(data).$promise.then(
                                function (response) {
                                    defer.resolve(response);
                                }
                            );

                            return defer.promise;
                        };

                        discountNeglect = function (data) {
                            var defer = $q.defer();

                            $checkoutApiService.discountNeglect(data).$promise.then(
                                function (response) {
                                    if (response.error === null) {
                                        defer.resolve(response);
                                    }
                                }
                            );

                            return defer.promise;
                        };

                        getUrl = function () {
                            var url;

                            if ("onepage" === activeType) {
                                url = ONEPAGE_URL;
                            } else {
                                url = ACCORDION_URL;
                            }


                            return url;
                        };

                        setType = function (type) {
                            var types = ["onepage", "accordion"];

                            if (-1 !== types.indexOf(type)) {
                                activeType = type;
                            } else {
                                activeType = defaultType;
                            }

                            return activeType;
                        };

                        getType = function () {
                            return activeType;
                        };

                        getCheckout = function () {
                            return checkout;
                        };

                        getAllowedPaymentMethods = function () {
                            return allowedPaymentMethods || [];
                        };

                        getAllowedShippingMethods = function () {
                            return allowedShippingMethods || [];
                        };

                        getAllowedGuestCheckout = function () {
                            return angular.appConfigValue("general.checkout.guest_checkout");
                        };

                        getMinimalCostShippingMethods = function() {
                            var result, currentMinPrice;

                            for (var i = 0; i < allowedShippingMethods.length; i += 1){
                                if(typeof currentMinPrice === "undefined"){
                                    currentMinPrice = allowedShippingMethods[i].Price;
                                    result = allowedShippingMethods[i];
                                    result.index = i;
                                    continue;
                                }
                                if(currentMinPrice > allowedShippingMethods[i].Price){
                                    currentMinPrice = allowedShippingMethods[i].Price;
                                    result = allowedShippingMethods[i];
                                    result.index = i;
                                }
                            }

                            return result;
                        };

                        return {
                            "init": init,
                            "update": update,
                            "getUrl": getUrl,
                            "getType": getType,
                            "setType": setType,
                            "getAllowedPaymentMethods": getAllowedPaymentMethods,
                            "getAllowedShippingMethods": getAllowedShippingMethods,
                            "loadShippingMethods": loadShippingMethods,
                            "getCheckout": getCheckout,
                            "saveShippingAddress": saveShippingAddress,
                            "saveBillingAddress": saveBillingAddress,
                            "saveShippingMethod": saveShippingMethod,
                            "savePaymentMethod": savePaymentMethod,
                            "saveAdditionalInfo": saveAdditionalInfo,
                            "discountNeglect": discountNeglect,
                            "discountApply": discountApply,
                            "getAllowedGuestCheckout": getAllowedGuestCheckout,
                            "getMinimalCostShippingMethods": getMinimalCostShippingMethods
                        };
                    }
                ]
            );

            return checkoutModule;
        });

})(window.define);
(function (w, define, $) {
    

    define('checkout/controller/onepage',["angular", "checkout/init"], function (angular, checkoutModule) {

        checkoutModule

            .controller("checkoutOnepageController", [
                "$scope",
                "$location",
                "$checkoutApiService",
                "$designImageService",
                "$visitorLoginService",
                "$cartService",
                "$designStateService",
                "$commonUtilService",
                "$checkoutService",
                "$q",
                "$interval",
                function ($scope, $location, $checkoutApiService, $designImageService, $visitorLoginService, $cartService, $designStateService, $commonUtilService, $checkoutService, $q, $interval) {

                    var init, info, getDefaultAddress, getAddresses, enabledGuestCheckout,
                        getPaymentInfo, creditCartTypes, isValidSteps, initWatchers, defaultChoosePaymentMethod,
                        defaultSetPaymentData, defaultSetUseAsBilling;

                    /**
                     * Gets checkout information
                     * @return {promise}
                     */
                    info = function () {
                        var defer, initAddressesData, initCurrentShippingMethod, initCurrentPaymentType, initAdditionalInfo;

                        defer = $q.defer();

                        initAddressesData = function () {
                            if (typeof $scope.shippingAddress !== "undefined") {
                                isValidSteps.shippingAddress = $scope.shippingAddress.$valid;
                            }

                            if (typeof $scope.billingAddress !== "undefined") {
                                isValidSteps.billingAddress = $scope.billingAddress.$valid;
                            }
                        };

                        initCurrentShippingMethod = function () {
                            var item, i;
                            for (i = 0; i < $scope.shippingMethods.length; i += 1) {
                                item = $scope.shippingMethods[i];

                                if ($scope.checkout["shipping_method_code"] === item.Method &&
                                    $scope.checkout["shipping_rate"].Code === item.Rate) {

                                    $scope.indexShippingMethod = i;
                                    isValidSteps.shippingMethod = true;
                                }
                            }
                        };

                        initCurrentPaymentType = function () {
                            var item, i;

                            if(typeof $scope.paymentMethods !== "undefined"){
                                return true;
                            }

                            $scope.paymentMethods = $checkoutService.getAllowedPaymentMethods();
                            for (i = 0; i < $scope.paymentMethods.length; i += 1) {
                                item = $scope.paymentMethods[i];
                                if ($scope.checkout["payment_method_code"] === item.Code) {
                                    $scope.paymentType = item.Type;
                                    $scope.paymentMethods[i].cc = {};
                                    $scope.paymentMethods[i].cc.type = "VI";
                                    $scope.paymentMethods[i].cc["expire_month"] = "12";
                                    $scope.paymentMethods[i].cc["expire_year"] = "2017";
                                }
                            }
                        };

                        initAdditionalInfo = function() {
                            if ($scope.isGuestCheckout && typeof $scope.customerInfo !== "undefined") {
                                isValidSteps.additionalInfo = $scope.customerInfo.$valid;
                            }
                        };

                        $checkoutService.update().then(
                            function (checkout) {
                                $scope.checkout = checkout;
                                initCurrentShippingMethod();
                                initCurrentPaymentType();
                                initAddressesData();
                                initAdditionalInfo();
                                defer.resolve(true);
                            }
                        );

                        return defer.promise;
                    };

                    initWatchers = function () {
                        /**
                         * Sets payment method
                         */
                        defaultChoosePaymentMethod = $scope.$watch("checkout.payment_method_code", function () {
                            if (typeof $scope.checkout !== "undefined" &&
                                typeof $scope.checkout["payment_method_code"] !== "undefined" &&
                                $scope.checkout["payment_method_code"] !== "" &&
                                $scope.checkout["payment_method_code"] !== null) {
                                $checkoutService.savePaymentMethod({
                                    "method": $scope.checkout["payment_method_code"]
                                }).then(
                                    function (response) {
                                        if (response.result === "ok") {
                                            var isCreditCard;
                                            isCreditCard = $scope.paymentType.split("_").indexOf("cc") > 0;
                                            if (isCreditCard) {
                                                var payment = getPaymentInfo();
                                                isValidSteps.paymentMethod = false;
                                                if (payment.method.form.$valid && $scope.validateCcNumber()) {
                                                    isValidSteps.paymentMethod = true;
                                                }
                                            } else {
                                                isValidSteps.paymentMethod = true;
                                            }
                                            info();
                                        }
                                    }
                                );
                            }
                        });

                        /**
                         * Sets payment method
                         */
                        defaultSetPaymentData = $scope.$watch("paymentMethods", function () {
                            var payment = getPaymentInfo();

                            if ( payment.method !== null && typeof payment.method.form !== "undefined" && payment.method.Type.split("_").indexOf("cc") > 0) {

                                isValidSteps.paymentMethod = payment.method.form.$valid && $scope.validateCcNumber();
                            }

                        }, true);

                        defaultSetUseAsBilling = $scope.$watch("useAsBilling", function () {
                            if ($scope.useAsBilling && !$scope.isGuestCheckout && $scope.checkout["shipping_address"] !== null) {
                                $scope.choiceBilling($scope.checkout["shipping_address"]._id || false);
                            }

                            if ($scope.useAsBilling && $scope.isGuestCheckout) {
                                $scope.choiceShipping(false);
                            }
                        }, true);
                    };

                    init = function () {
                        getDefaultAddress = function () {
                            return {
                                "street": "",
                                "city": "",
                                "state": "",
                                "phone": "",
                                "zip_code": "",
                                "company": "",
                                "first_name": "",
                                "last_name": "",
                                "address_line1": "",
                                "address_line2": "",
                                "country": ""
                            };
                        };

                        creditCartTypes = {
                            'VI': [new RegExp('^4[0-9]{12}([0-9]{3})?$'), new RegExp('^[0-9]{3}$'), true],
                            'MC': [new RegExp('^5[1-5][0-9]{14}$'), new RegExp('^[0-9]{3}$'), true]
                        };

                        isValidSteps = {
                            "billingAddress": false,
                            "shippingAddress": false,
                            "shippingMethod": false,
                            "paymentMethod": false,
                            "discounts": true
                        };

                        if ($scope.isGuestCheckout) {
                            isValidSteps.additionalInfo = false;
                        }

                        $scope["checkoutService"] = $checkoutService;

                        $scope["countries"] = [
                            {
                                "Code": "US",
                                "Name": "USA"
                            }
                        ];
                        $scope["creditTypes"] = [
                            {
                                "Code": "VI",
                                "Name": "Visa"
                            },
                            {
                                "Code": "MC",
                                "Name": "Master Card"
                            }
                        ];

                        $scope["useAsBilling"] = false;
                        $scope["states"] = $designStateService;
                        $scope["cart"] = $cartService;
                        $scope["shippingMethods"] = [];
                        $scope["checkout"] = {};
                        $scope["shipping_address"] = getDefaultAddress();
                        $scope["billing_address"] = getDefaultAddress();
                        $scope["totals"] = 0;


                        info();
                    };

                    enabledGuestCheckout = function () {
                        $scope.subAdditionalInfo = false;
                        return angular.appConfigValue("general.checkout.guest_checkout");
                    };

                    /**
                     * Gets visitor addresses
                     */
                    getAddresses = function () {
                        if (!$scope["isGuestCheckout"]) {
                            $checkoutApiService.getAddresses().$promise.then(
                                function (response) {
                                    var result = response.result || [];
                                    $scope.addresses = result;
                                }
                            );
                        }
                    };

                    /**
                     * Checks visitor on the logged
                     * Adds breadcrumbs
                     * Gets checkout information
                     */
                    $scope.init = function () {
                        var stopWaiting, stop;
                        stopWaiting = function() {
                            if (typeof $checkoutService.getType() !== "undefined") {
                                $interval.cancel(stop);
                                stop = undefined;
                            }
                        };
                        stop = $interval(function() {
                            if(typeof $checkoutService.getType() !== "undefined") {
                                stopWaiting();
                                if ("accordion" === $checkoutService.getType()) {
                                    $location.path($checkoutService.getUrl().replace("#/", ""));
                                }

                                $cartService.init().then(function () {
                                    if ($cartService.getCountItems() === 0) {
                                        $location.path("/");
                                    } else {
                                        if (!enabledGuestCheckout()) {
                                            $scope.isGuestCheckout = false;
                                            $visitorLoginService.isLoggedIn().then(function (isLoggedIn) {
                                                if (!isLoggedIn) {
                                                    $location.path("/");
                                                } else {
                                                    getAddresses();
                                                    $checkoutService.init().then(function () {
                                                        init();
                                                        $scope.shippingMethods = $checkoutService.getAllowedShippingMethods();
                                                        initWatchers();
                                                    });
                                                }
                                            });
                                        } else {
                                            $visitorLoginService.isLoggedIn().then(function (isLoggedIn) {
                                                if (!isLoggedIn) {
                                                    $scope.isGuestCheckout = true;
                                                } else {
                                                    $scope.isGuestCheckout = false;
                                                }
                                                getAddresses();
                                                $checkoutService.init().then(function () {
                                                    init();
                                                    $scope.shippingMethods = $checkoutService.getAllowedShippingMethods();
                                                    initWatchers();
                                                });
                                            });
                                        }
                                    }
                                });
                            }
                        }, 100);


                        $scope.$emit("add-breadcrumbs", {"label": "My Account", "url": "/account"});
                        $scope.$emit("add-breadcrumbs", {"label": "Checkout", "url": "/checkout"});
                    };

                    getPaymentInfo = function () {
                        var i, info;
                        info = {
                            "method": null,
                            "form": null
                        };
                        if (typeof $scope.paymentMethods !== "undefined") {
                            for (i = 0; i < $scope.paymentMethods.length; i += 1) {
                                if ($scope.paymentMethods[i].Code === $scope.checkout["payment_method_code"]) {
                                    info.method = $scope.paymentMethods[i];
                                    info.form = info.method.form;
                                }
                            }
                        }

                        return info;
                    };

                    /**
                     * Saves checkout
                     */
                    $scope.save = function () {
                        var payment, sendPostForm, isValid;
                        $scope.message = "";
                        isValid = function () {
                            var result, message, getErrorMsg;
                            message = "";
                            result = {
                                status: true,
                                message: ""
                            };
                            $scope.subBillingAddress = true;
                            $scope.subShippingAddress = true;
                            $scope.subPaymentForm = true;
                            $scope.subAdditionalInfo = true;

                            getErrorMsg = function (step) {
                                /*jshint maxcomplexity:6 */
                                var msg = "Please fill all required fields";

                                switch (step) {
                                    case "billingAddress":
                                        msg = "Please fill all required fields in billing section <br />";
                                        break;
                                    case "shippingAddress":
                                        msg = "Please fill all required fields in shipping section <br />";
                                        break;
                                    case "shippingMethod":
                                        msg = "Please choose shipping method <br />";
                                        break;
                                    case "paymentMethod":
                                        msg = "Please choose payment method <br />";
                                        break;
                                    case "additionalInfo":
                                        msg = "Please fill all required fields in additional section <br />";
                                        break;
                                }
                                return msg;
                            };

                            for (var step in isValidSteps) {
                                if (isValidSteps.hasOwnProperty(step) && !isValidSteps[step]) {
                                    message += getErrorMsg(step);
                                    result = {
                                        status: false,
                                        message: message
                                    };
                                }
                            }

                            return result;
                        };

                        payment = getPaymentInfo();
                        if (payment.form !== null && typeof payment.form !== "undefined") {
                            payment.form.submited = true;
                        }

                        sendPostForm = function (method, response) {
                            var form;

                            form = "<div class='hidden' id='auth_net_form'>" + response.result;
                            form = form.replace("$CC_NUM", method.cc.number);
                            form = form.replace("$CC_MONTH", method.cc["expire_month"].toString().length < 2 ? "0" + method.cc["expire_month"] : method.cc["expire_month"]);
                            form = form.replace("$CC_YEAR", method.cc["expire_year"]) + "</div>";

                            $(".checkout > div").append(form);
                            $("#auth_net_form").find("form").submit();
                            $("#auth_net_form").remove();
                        };
                        info().then(function(){
                            var checkoutValid = isValid();
                            if (checkoutValid.status) {
                                $(this).parents('.confirm').css('display', 'none');
                                $('#processing').modal('show');
                                $checkoutApiService.save().$promise.then(
                                    function (response) {

                                        if (response.error === null && null !== payment.method && payment.method.Type === "remote" && response.result === "redirect") {
                                            w.location.replace(response.redirect);
                                        } else if (response.error === null && null !== payment.method && payment.method.Type === "post_cc") {
                                            // Handler for direct post form for Authorize.net
                                            sendPostForm(payment.method, response);
                                        } else if (response.error === null) {
//                                            info();
                                            $cartService.reload().then(
                                                function () {
                                                    $scope.subBillingAddress = false;
                                                    $scope.subShippingAddress = false;
                                                    $scope.subPaymentForm = false;
                                                    $scope.subAdditionalInfo = false;
                                                    $scope.purchase = response.result || {};
                                                    $('#processing').modal('hide');
                                                    $("#purchase-success").modal("show");
                                                }
                                            );
                                        } else {
                                            $(this).parents('.confirm').css('display', 'block');
                                            $('#processing').modal('hide');
                                            // Errors from server
                                            $scope.message = $commonUtilService.getMessage(response);
                                        }
                                    }
                                );
                            } else {
                                $(this).parents('.confirm').css('display', 'block');
                                $('#processing').modal('hide');
                                $scope.message = $commonUtilService.getMessage(null, "danger", checkoutValid.message);
                            }
                        });

                    };

                    /**
                     * Gets full path to image
                     *
                     * @param {object} product
                     * @returns {string}
                     */
                    $scope.getImage = function (product, size) {
                        return $designImageService.getFullImagePath("", product.image, size);
                    };

                    $scope.newBilling = function () {
                        // Sets submitted billing form in false
                        $scope.subBillingAddress = false;
                        // Sets a flag of form is not valid
                        isValidSteps.billingAddress = false;
                        // Initialise address by default
                        $scope.checkout["billing_address"] = getDefaultAddress();
                        $scope.useAsBilling = false;

                        for (var field in $scope.checkout["billing_address"]) {
                            if ($scope.billingAddress.hasOwnProperty(field)) {
                                $scope.billingAddress[field].$pristine = true;
                                $scope.billingAddress[field].$invalid = false;
                            }
                        }
                    };

                    $scope.newShipping = function () {
                        // Sets submitted shipping form in false
                        $scope.subShippingAddress = false;
                        // Sets a flag of form is not valid
                        isValidSteps.shippingAddress = false;
                        // Initialise address by default
                        $scope.checkout["shipping_address"] = getDefaultAddress();

                        for (var field in $scope.checkout["shipping_address"]) {
                            if ($scope.shippingAddress.hasOwnProperty(field)) {
                                $scope.shippingAddress[field].$pristine = true;
                                $scope.shippingAddress[field].$invalid = false;
                            }
                        }
                    };

                    $scope.choiceBilling = function (billingId) {
                        if ($scope.isGuestCheckout && $scope.shippingAddress.$valid) {
                            $checkoutService.saveBillingAddress($scope.checkout["shipping_address"]).then(
                                function (response) {
                                    if (response.error === null) {
                                        isValidSteps.billingAddress = true;
                                    }
                                    // update checkout
                                    info();
                                }
                            );
                        } else if (($scope.checkout["billing_address"] !== null && $scope.checkout["billing_address"]._id !== billingId) || typeof billingId === "string" && billingId !== "") {
                            // Sets existing address as billing
                            $checkoutService.saveBillingAddress({"id": billingId}).then(
                                function (response) {
                                    if (response.error === null) {
                                        isValidSteps.billingAddress = true;
                                    }
                                    // update checkout
                                    info();
                                }
                            );
                        } else {
                            if ($scope.shippingAddress.$valid) {
                                $checkoutService.saveBillingAddress($scope.checkout["shipping_address"]).then(
                                    function (response) {
                                        if (response.error === null) {
                                            isValidSteps.billingAddress = true;
                                        }
                                        // update checkout
                                        info();
                                    }
                                );
                            }
                        }
                    };

                    $scope.choiceShipping = function (shippingId) {
                        if ($scope.isGuestCheckout) {
                            $checkoutService.saveShippingAddress($scope.checkout["shipping_address"]).then(
                                function (response) {
                                    // update checkout
                                    info().then(function () {
                                        // if all ok, must update allowed shipping methods list
                                        // and must set billing address if set appropriate checkbox
                                        if (response.error === null) {
                                            $checkoutService.loadShippingMethods().then(function (methods) {
                                                $scope.shippingMethods = methods;
                                            });
                                            // sets billing address
                                            if ($scope.useAsBilling) {
                                                $scope.choiceBilling(response.result);
                                            }
                                        }
                                    });
                                }
                            );
                        } else if (($scope.checkout["shipping_address"] !== null && $scope.checkout["shipping_address"]._id !== shippingId) || Boolean(shippingId)) {

                            // Sets existing address as shipping
                            $checkoutService.saveShippingAddress({"id": shippingId}).then(
                                function (response) {
                                    // update checkout
                                    info().then(function () {
                                        // if all ok, must update allowed shipping methods list
                                        // and must set billing address if set appropriate checkbox
                                        if (response.error === null) {
                                            isValidSteps.shippingAddress = true;
                                            $checkoutService.loadShippingMethods().then(function (methods) {
                                                $scope.shippingMethods = methods;
                                            });
                                            // sets billing address
                                            if ($scope.useAsBilling) {
                                                $scope.choiceBilling(response.result._id);
                                            }
                                        } else {
                                            isValidSteps.billingAddress = false;
                                        }
                                    });
                                }
                            );
                        }
                    };

                    $scope.choiceShippingMethod = function (index) {

                        if (typeof index !== "undefined" && index !== "") {
                            $checkoutService.saveShippingMethod({
                                "method": $scope.shippingMethods[index].Method,
                                "rate": $scope.shippingMethods[index].Rate
                            }).then(
                                function (response) {
                                    if (response.result === "ok") {
                                        // update checkout
                                        info();
                                    }
                                }
                            );
                        }
                    };

                    $scope.setPaymentType = function (type) {
                        var isCreditCard;
                        isCreditCard = type.split("_").indexOf("cc") > 0;
                        if (!isCreditCard) {
                            isValidSteps.paymentMethod = true;
                        } else {
                            isValidSteps.paymentMethod = false;
                        }
                        $scope.paymentType = type;
                    };

                    $scope.isCreditCard = function () {
                        if (typeof $scope.paymentType !== "undefined") {
                            return $scope.paymentType.split("_").indexOf("cc") > 0;
                        }
                        return false;
                    };

                    $scope.showFormCc = function (method) {
                        if (typeof method !== "undefined") {
                            return method.Type.split("_").indexOf("cc") > 0;
                        }
                        return false;
                    };

                    $scope.discountApply = function () {
                        $checkoutService.discountApply({"coupon": $scope.discount}).$promise.then(
                            function (response) {
                                if (response.error === null) {
                                    info();
                                }
                            }
                        );
                    };

                    $scope.discountNeglect = function (code) {
                        $checkoutService.discountNeglect({"coupon": code}).$promise.then(
                            function (response) {
                                if (response.error === null) {
                                    info();
                                }
                            }
                        );
                    };

                    $scope.validateCcNumber = function () {
                        var i, payment, result;
                        result = false;

                        payment = getPaymentInfo();

                        var validateCreditCard = function (s) {
                            /*jshint maxcomplexity:6 */
                            // remove non-numerics
                            var a, c, m, k, j, x, w, v;
                            v = "0123456789";
                            w = "";
                            for (i = 0; i < s.length; i += 1) {
                                x = s.charAt(i);
                                if (v.indexOf(x, 0) !== -1) {
                                    w += x;
                                }
                            }
                            // validate number
                            j = w.length / 2;
                            k = Math.floor(j);
                            m = Math.ceil(j) - k;
                            c = 0;
                            for (i = 0; i < k; i += 1) {
                                a = w.charAt(i * 2 + m) * 2;
                                c += a > 9 ? Math.floor(a / 10 + a % 10) : a;
                            }
                            for (i = 0; i < k + m; i += 1) {
                                c += w.charAt(i * 2 + 1 - m) * 1;
                            }
                            return (c % 10 === 0);
                        };

                        if (payment.method === null && payment.form === null) {
                            return false;
                        }

                        if (creditCartTypes[payment.method.cc.type][0].test(payment.method.cc.number) === true) {
                            result = validateCreditCard(payment.method.cc.number);
                        }

                        if (typeof payment.form !== "undefined") {
                            payment.form.number.$invalidFormat = result;
                        }

                        return result;
                    };

                    $scope.saveByBlur = function (step) {
                        /*jshint maxcomplexity:6 */
                        var actionBillingAddress, actionShippingAddress,
                            actionCustomerAdditionalInfo;

                        actionBillingAddress = function () {
                            if ($scope.billingAddress.$valid) {
                                $scope.subBillingAddress = true;
                                $checkoutService.saveBillingAddress($scope.checkout["billing_address"]).then(
                                    function () {
                                        getAddresses();
                                        isValidSteps.billingAddress = true;
                                        // update checkout
                                        info();
                                    }
                                );
                            } else {
                                isValidSteps.billingAddress = false;
                            }
                        };

                        actionShippingAddress = function () {
                            if ($scope.shippingAddress.$valid) {
                                $scope.subShippingAddress = true;
                                if ((!Boolean($scope.checkout["shipping_address"]._id) && !$scope["isGuestCheckout"]) || $scope["isGuestCheckout"]) {
                                    $checkoutService.saveShippingAddress($scope.checkout["shipping_address"]).then(
                                        function () {
                                            getAddresses();
                                            isValidSteps.shippingAddress = true;
                                            $checkoutService.loadShippingMethods().then(function (methods) {
                                                $scope.shippingMethods = methods;
                                            });
                                            if ($scope.useAsBilling) {
                                                $checkoutService.saveBillingAddress($scope.checkout["shipping_address"]).then(function () {
                                                    isValidSteps.billingAddress = true;
                                                    // update checkout
                                                    info();
                                                });
                                            } else {
                                                // update checkout
                                                info();
                                            }
                                        }
                                    );
                                } else {
                                    isValidSteps.shippingAddress = false;
                                }
                            }
                        };

                        actionCustomerAdditionalInfo = function () {
                            if ($scope.customerInfo.$valid) {
                                $scope.subAdditionalInfo = true;
                                if ($scope["isGuestCheckout"]) {
                                    $checkoutService.saveAdditionalInfo({
                                        "customer_email": $scope.checkout.info["customer_email"],
                                        "customer_name": $scope.checkout.info["customer_name"]
                                    }).then(function () {
                                        // do something after save additional info
                                        isValidSteps.additionalInfo = true;
                                    });
                                } else {
                                    // do something if not valid additional info
                                    isValidSteps.additionalInfo = false;
                                }
                            }
                        };

                        switch (step) {
                            case "billingAddress":
                                actionBillingAddress();
                                break;
                            case "shippingAddress":
                                actionShippingAddress();
                                break;
                            case "customerInfo":
                                actionCustomerAdditionalInfo();
                                break;
                        }
                    };

                    $scope.closeSuccessPopup = function () {
                        $(".modal").modal("hide");
                        $(".modal-open").removeClass('modal-open');
                        $location.path("/");
                    };

                }
            ]
        );

        return checkoutModule;
    });
})(window, window.define, jQuery);

(function (w, define, $) {
    

    /**
     *
     */
    define('checkout/controller/accordion',["angular", "checkout/init"], function (angular, checkoutModule) {

        checkoutModule
            .controller("checkoutAccordionController", [
                "$scope",
                "$location",
                "$checkoutApiService",
                "$designImageService",
                "$visitorLoginService",
                "$cartService",
                "$designStateService",
                "$commonUtilService",
                "$checkoutService",
                "$q",
                "$interval",
                function ($scope, $location, $checkoutApiService, $designImageService, $visitorLoginService, $cartService, $designStateService, $commonUtilService, $checkoutService, $q, $interval) {

                    var init, info, getDefaultAddress, getAddresses, enabledGuestCheckout,
                        getPaymentInfo, creditCartTypes, isValidSteps, initWatchers, defaultChoosePaymentMethod,
                        defaultSetPaymentData, defaultSetUseAsBilling;

                    /**
                     * Gets checkout information
                     * @return {promise}
                     */
                    info = function () {
                        var defer, initAddressesData, initCurrentShippingMethod, initCurrentPaymentType, initAdditionalInfo;

                        defer = $q.defer();

                        initAddressesData = function () {
                            if ($scope.checkout["shipping_address"] === null) {
                                $scope.checkout["shipping_address"] = getDefaultAddress();
                            }

                            if ($scope.checkout["billing_address"] === null) {
                                $scope.checkout["billing_address"] = getDefaultAddress();
                            }
                        };

                        initCurrentShippingMethod = function () {
                            var item, i;
                            for (i = 0; i < $scope.shippingMethods.length; i += 1) {
                                item = $scope.shippingMethods[i];

                                if ($scope.checkout["shipping_method_code"] === item.Method &&
                                    $scope.checkout["shipping_rate"].Code === item.Rate) {

                                    $scope.indexShippingMethod = i;
                                    isValidSteps.shippingMethod = true;
                                }
                            }
                        };

                        initCurrentPaymentType = function () {
                            var item, i;

                            if(typeof $scope.paymentMethods !== "undefined"){
                                return true;
                            }

                            $scope.paymentMethods = $checkoutService.getAllowedPaymentMethods();
                            for (i = 0; i < $scope.paymentMethods.length; i += 1) {
                                item = $scope.paymentMethods[i];
                                if ($scope.checkout["payment_method_code"] === item.Code) {
                                    $scope.paymentType = item.Type;
                                    $scope.paymentMethods[i].cc = {};
                                    $scope.paymentMethods[i].cc.type = "VI";
                                    $scope.paymentMethods[i].cc["expire_month"] = "12";
                                    $scope.paymentMethods[i].cc["expire_year"] = "2017";
                                }
                            }
                        };

                        initAdditionalInfo = function() {
                            if ($scope.isGuestCheckout && typeof $scope.customerInfo !== "undefined") {
                                isValidSteps.additionalInfo = $scope.customerInfo.$valid;
                            }
                        };

                        $checkoutService.update().then(
                            function (checkout) {
                                $scope.checkout = checkout;
                                initCurrentShippingMethod();
                                initCurrentPaymentType();
                                initAddressesData();
                                initAdditionalInfo();
                                defer.resolve(true);
                            }
                        );

                        return defer.promise;
                    };

                    initWatchers = function () {
                        /**
                         * Sets payment method
                         */
                        defaultChoosePaymentMethod = $scope.$watch("checkout.payment_method_code", function () {
                            if (typeof $scope.checkout !== "undefined" &&
                                typeof $scope.checkout["payment_method_code"] !== "undefined" &&
                                $scope.checkout["payment_method_code"] !== "" &&
                                $scope.checkout["payment_method_code"] !== null) {

                                $checkoutService.savePaymentMethod({
                                    "method": $scope.checkout["payment_method_code"]
                                }).then(
                                    function (response) {
                                        if (response.result === "ok") {
                                            var isCreditCard;
                                            isCreditCard = $scope.paymentType.split("_").indexOf("cc") > 0;
                                            if (isCreditCard) {
                                                var payment = getPaymentInfo();
                                                isValidSteps.paymentMethod = false;
                                                if (payment.method.form.$valid && $scope.validateCcNumber()) {
                                                    isValidSteps.paymentMethod = true;
                                                }
                                            } else {
                                                isValidSteps.paymentMethod = true;
                                            }
                                            info();
                                        }
                                    }
                                );
                            }
                        });

                        /**
                         * Sets payment method
                         */
                        defaultSetPaymentData = $scope.$watch("paymentMethods", function () {
                            var payment = getPaymentInfo();

                            if (payment.method !== null && typeof payment.method.form !== "undefined" && payment.method.Type.split("_").indexOf("cc") > 0) {

                                isValidSteps.paymentMethod = payment.method.form.$valid && $scope.validateCcNumber();
                            }

                        }, true);

                        defaultSetUseAsBilling = $scope.$watch("useAsBilling", function () {
                            if ($scope.useAsBilling && !$scope.isGuestCheckout && $scope.checkout["shipping_address"] !== null) {
                                $scope.choiceBilling($scope.checkout["shipping_address"]._id || false);
                            }

                            if ($scope.useAsBilling && $scope.isGuestCheckout) {
                                $scope.choiceShipping(false);
                            }
                        }, true);
                    };

                    init = function () {
                        getDefaultAddress = function () {
                            return {
                                "street": "",
                                "city": "",
                                "state": "",
                                "phone": "",
                                "zip_code": "",
                                "company": "",
                                "first_name": "",
                                "last_name": "",
                                "address_line1": "",
                                "address_line2": "",
                                "country": ""
                            };
                        };

                        creditCartTypes = {
                            'VI': [new RegExp('^4[0-9]{12}([0-9]{3})?$'), new RegExp('^[0-9]{3}$'), true],
                            'MC': [new RegExp('^5[1-5][0-9]{14}$'), new RegExp('^[0-9]{3}$'), true]
                        };

                        isValidSteps = {
                            "billingAddress": false,
                            "shippingAddress": false,
                            "shippingMethod": false,
                            "paymentMethod": false,
                            "discounts": true
                        };
                        $scope["checkoutService"] = $checkoutService;

                        $scope["countries"] = [
                            {
                                "Code": "US",
                                "Name": "USA"
                            }
                        ];
                        $scope["creditTypes"] = [
                            {
                                "Code": "VI",
                                "Name": "Visa"
                            },
                            {
                                "Code": "MC",
                                "Name": "Master Card"
                            }
                        ];

                        $scope["useAsBilling"] = false;
                        $scope["states"] = $designStateService;
                        $scope["cart"] = $cartService;
                        $scope["shippingMethods"] = [];
                        $scope["checkout"] = {};
                        $scope["shipping_address"] = getDefaultAddress();
                        $scope["billing_address"] = getDefaultAddress();
                        $scope["totals"] = 0;

                        info();
                    };

                    enabledGuestCheckout = function () {
                        $scope.subAdditionalInfo = false;
                        return angular.appConfigValue("general.checkout.guest_checkout");
                    };

                    /**
                     * Gets visitor addresses
                     */
                    getAddresses = function () {
                        if (!$scope["isGuestCheckout"]) {
                            $checkoutApiService.getAddresses().$promise.then(
                                function (response) {
                                    var result = response.result || [];
                                    $scope.addresses = result;
                                }
                            );
                        }
                    };

                    /**
                     * Checks visitor on the logged
                     * Adds breadcrumbs
                     * Gets checkout information
                     */
                    $scope.init = function () {
                        var stopWaiting, stop;
                        stopWaiting = function() {
                            if (typeof $checkoutService.getType() !== "undefined") {
                                $interval.cancel(stop);
                                stop = undefined;
                            }
                        };
                        stop = $interval(function() {
                            if(typeof $checkoutService.getType() !== "undefined") {
                                stopWaiting();
                                if ("accordion" !== $checkoutService.getType()) {
                                    $location.path($checkoutService.getUrl().replace("#/", ""));
                                }

                                $cartService.init().then(function () {
                                    if ($cartService.getCountItems() === 0) {
                                        $location.path("/");
                                    } else {
                                        if (!enabledGuestCheckout()) {
                                            $scope.isGuestCheckout = false;
                                            $visitorLoginService.isLoggedIn().then(function (isLoggedIn) {
                                                if (!isLoggedIn) {
                                                    $location.path("/");
                                                } else {
                                                    getAddresses();
                                                    $checkoutService.init().then(function () {
                                                        init();
                                                        $scope.shippingMethods = $checkoutService.getAllowedShippingMethods();
                                                        var defaultMethod = $checkoutService.getMinimalCostShippingMethods();
                                                        $scope.indexShippingMethod = defaultMethod.index;
                                                        $scope.choiceShippingMethod($scope.indexShippingMethod);
                                                        initWatchers();
                                                    });
                                                }
                                            });
                                        } else {
                                            $visitorLoginService.isLoggedIn().then(function (isLoggedIn) {
                                                if (!isLoggedIn) {
                                                    $scope.isGuestCheckout = true;
                                                } else {
                                                    $scope.isGuestCheckout = false;
                                                }
                                                getAddresses();
                                                $checkoutService.init().then(function () {
                                                    init();
                                                    $scope.shippingMethods = $checkoutService.getAllowedShippingMethods();
                                                    var defaultMethod = $checkoutService.getMinimalCostShippingMethods();
                                                    $scope.indexShippingMethod = defaultMethod.index;
                                                    $scope.choiceShippingMethod($scope.indexShippingMethod);
                                                    initWatchers();
                                                });
                                            });
                                        }
                                    }
                                });
                            }
                        }, 100);


                        $scope.$emit("add-breadcrumbs", {"label": "My Account", "url": "/account"});
                        $scope.$emit("add-breadcrumbs", {"label": "Checkout", "url": "/checkout"});
                    };

                    getPaymentInfo = function () {
                        var i, info;
                        info = {
                            "method": null,
                            "form": null
                        };
                        if (typeof $scope.paymentMethods !== "undefined") {
                            for (i = 0; i < $scope.paymentMethods.length; i += 1) {
                                if ($scope.paymentMethods[i].Code === $scope.checkout["payment_method_code"]) {
                                    info.method = $scope.paymentMethods[i];
                                    info.form = info.method.form;
                                }
                            }
                        }

                        return info;
                    };

                    $scope.newBilling = function () {
                        // Sets submitted billing form in false
                        $scope.subBillingAddress = false;
                        // Sets a flag of form is not valid
                        isValidSteps.billingAddress = false;
                        // Initialise address by default
                        $scope.checkout["billing_address"] = getDefaultAddress();
                        $scope.useAsBilling = false;

                        for (var field in $scope.checkout["billing_address"]) {
                            if ($scope.billingAddress.hasOwnProperty(field)) {
                                $scope.billingAddress[field].$pristine = true;
                                $scope.billingAddress[field].$invalid = false;
                            }
                        }
                    };

                    $scope.newShipping = function () {
                        // Sets submitted shipping form in false
                        $scope.subShippingAddress = false;
                        // Sets a flag of form is not valid
                        isValidSteps.shippingAddress = false;
                        // Initialise address by default
                        $scope.checkout["shipping_address"] = getDefaultAddress();

                        for (var field in $scope.checkout["shipping_address"]) {
                            if ($scope.shippingAddress.hasOwnProperty(field)) {
                                $scope.shippingAddress[field].$pristine = true;
                                $scope.shippingAddress[field].$invalid = false;
                            }
                        }
                    };

                    $scope.choiceBilling = function (billingId) {
                        if ($scope.isGuestCheckout && $scope.shippingAddress.$valid) {
                            $checkoutService.saveBillingAddress($scope.checkout["shipping_address"]).then(
                                function (response) {
                                    if (response.error === null) {
                                        isValidSteps.billingAddress = true;
                                    }
                                    // update checkout
                                    info();
                                }
                            );
                        } else if ($scope.checkout["billing_address"] !== null && $scope.checkout["billing_address"]._id !== billingId && typeof billingId === "string" && billingId !== "") {
                            // Sets existing address as billing
                            $checkoutService.saveBillingAddress({"id": billingId}).then(
                                function (response) {
                                    if (response.error === null) {
                                        isValidSteps.billingAddress = true;
                                    }
                                    // update checkout
                                    info();
                                }
                            );
                        } else {
                            if ($scope.shippingAddress.$valid) {
                                $checkoutService.saveBillingAddress($scope.checkout["shipping_address"]).then(
                                    function (response) {
                                        if (response.error === null) {
                                            isValidSteps.billingAddress = true;
                                        }
                                        // update checkout
                                        info();
                                    }
                                );
                            }
                        }
                    };

                    $scope.choiceShipping = function (shippingId) {
                        if ($scope.isGuestCheckout) {
                            $checkoutService.saveShippingAddress($scope.checkout["shipping_address"]).then(
                                function (response) {
                                    // update checkout
                                    info().then(function () {
                                        // if all ok, must update allowed shipping methods list
                                        // and must set billing address if set appropriate checkbox
                                        if (response.error === null) {
                                            $checkoutService.loadShippingMethods().then(function (methods) {
                                                $scope.shippingMethods = methods;
                                            });
                                            // sets billing address
                                            if ($scope.useAsBilling) {
                                                $scope.choiceBilling(response.result);
                                            }
                                        }
                                    });
                                }
                            );
                        } else if (($scope.checkout["shipping_address"] !== null && $scope.checkout["shipping_address"]._id !== shippingId) || Boolean(shippingId)) {

                            // Sets existing address as shipping
                            $checkoutService.saveShippingAddress({"id": shippingId}).then(
                                function (response) {
                                    // update checkout
                                    info().then(function () {
                                        // if all ok, must update allowed shipping methods list
                                        // and must set billing address if set appropriate checkbox
                                        if (response.error === null) {
                                            isValidSteps.shippingAddress = true;
                                            $checkoutService.loadShippingMethods().then(function (methods) {
                                                $scope.shippingMethods = methods;
                                            });
                                            // sets billing address
                                            if ($scope.useAsBilling) {
                                                $scope.choiceBilling(response.result._id);
                                            }
                                        } else {
                                            isValidSteps.billingAddress = false;
                                        }
                                    });
                                }
                            );
                        }
                    };

                    $scope.choiceShippingMethod = function (index) {

                        if (typeof index !== "undefined" && index !== "") {
                            $checkoutService.saveShippingMethod({
                                "method": $scope.shippingMethods[index].Method,
                                "rate": $scope.shippingMethods[index].Rate
                            }).then(
                                function (response) {
                                    if (response.result === "ok") {
                                        // update checkout
                                        info();
                                    }
                                }
                            );
                        }
                    };

                    $scope.back = function (step) {
                        if(step === "review" && !$scope["isGuestCheckout"]) {
                            $("#" + step).slideUp("slow").parents('.panel').prev('.panel').prev('.panel').find('.accordion').slideDown(500);
                        } else {
                            $("#" + step).slideUp("slow").parents('.panel').prev('.panel').find('.accordion').slideDown(500);
                        }
                    };

                    $scope.next = function (step) {
                        /*jshint maxcomplexity:6 */
                        var actionBillingAddress, actionShippingAddress, actionPaymentMethod,
                            actionCustomerAdditionalInfo, actionDiscount, actionDefault;

                        actionBillingAddress = function () {
                            $scope.subBillingAddress = true;
                            if ($scope.billingAddress.$valid) {
                                isValidSteps.billingAddress = true;
                                if ((!Boolean($scope.checkout["billing_address"]._id) && !$scope["isGuestCheckout"]) || $scope["isGuestCheckout"]) {
                                    $checkoutService.saveBillingAddress($scope.checkout["billing_address"]).then(
                                        function () {
                                            getAddresses();
                                            // update checkout
                                            info();
                                            $("#" + step).slideUp("slow").parents('.panel').next('.panel').find('.accordion').slideDown(500);
                                        }
                                    );
                                } else {
                                    $("#" + step).slideUp("slow").parents('.panel').next('.panel').find('.accordion').slideDown(500);
                                }
                            }
                        };

                        actionShippingAddress = function () {
                            $scope.subShippingAddress = true;
                            if ($scope.shippingAddress.$valid) {
                                isValidSteps.shippingAddress = true;
                                if ((!Boolean($scope.checkout["shipping_address"]._id) && !$scope["isGuestCheckout"]) || $scope["isGuestCheckout"]) {
                                    $checkoutService.saveShippingAddress($scope.checkout["shipping_address"]).then(
                                        function () {
                                            getAddresses();
                                            $checkoutService.loadShippingMethods().then(function (methods) {
                                                $scope.shippingMethods = methods;
                                            });
                                            if ($scope.useAsBilling) {
                                                $checkoutService.saveBillingAddress($scope.checkout["shipping_address"]).then(function (response) {
                                                    if (response.error === null) {
                                                        isValidSteps.billingAddress = true;
                                                    }
                                                    // update checkout
                                                    info();
                                                    $("#" + step).slideUp("slow").parents('.panel').next('.panel').next('.panel').find('.accordion').slideDown(500);
                                                });
                                            } else {
                                                // update checkout
                                                info();
                                                $("#" + step).slideUp("slow").parents('.panel').next('.panel').find('.accordion').slideDown(500);
                                            }
                                        }
                                    );
                                } else {
                                    if ($scope.useAsBilling) {
                                        isValidSteps.billingAddress = true;
                                        $("#" + step).slideUp("slow").parents('.panel').next('.panel').next('.panel').find('.accordion').slideDown(500);
                                    } else {
                                        $("#" + step).slideUp("slow").parents('.panel').next('.panel').find('.accordion').slideDown(500);
                                    }
                                }
                            }
                        };

                        actionPaymentMethod = function () {
                            $scope.subPaymentForm = true;
                            if (isValidSteps[step]) {
                                $("#" + step).slideUp("slow").parents('.panel').next('.panel').find('.accordion').slideDown(500);
                            } else {
                                var isCreditCard;
                                if (typeof $scope.paymentType !== "undefined") {
                                    isCreditCard = $scope.paymentType.split("_").indexOf("cc") > 0;
                                    if (isCreditCard) {
                                        var payment = getPaymentInfo();
                                        payment.method.form.submited = true;
                                        if (payment.method.form.$valid && $scope.validateCcNumber()) {
                                            $("#" + step).slideUp("slow").parents('.panel').next('.panel').find('.accordion').slideDown(500);
                                        }
                                    }
                                }
                            }
                        };

                        actionCustomerAdditionalInfo = function () {
                            $scope.subAdditionalInfo = true;
                            if ($scope.customerInfo.$valid) {
                                if ($scope["isGuestCheckout"]) {
                                    $checkoutService.saveAdditionalInfo({
                                        "customer_email": $scope.checkout.info["customer_email"],
                                        "customer_name": $scope.checkout.info["customer_name"]
                                    }).then(function () {
                                        $("#" + step).slideUp("slow").parents('.panel').next('.panel').find('.accordion').slideDown(500);
                                    });
                                } else {
                                    $("#" + step).slideUp("slow").parents('.panel').next('.panel').find('.accordion').slideDown(500);
                                }
                            }
                        };

                        actionDiscount = function () {
                            if (isValidSteps[step] && $scope["isGuestCheckout"]) {
                                $("#" + step).slideUp("slow").parents('.panel').next('.panel').find('.accordion').slideDown(500);
                            }
                            if (isValidSteps[step] && !$scope["isGuestCheckout"]) {
                                $("#" + step).slideUp("slow").parents('.panel').next('.panel').next('.panel').find('.accordion').slideDown(500);
                            }
                        };

                        actionDefault = function () {
                            if (isValidSteps[step]) {
                                $("#" + step).slideUp("slow").parents('.panel').next('.panel').find('.accordion').slideDown(500);
                            }
                        };

                        switch (step) {
                            case "billingAddress":
                                actionBillingAddress();
                                break;
                            case "shippingAddress":
                                actionShippingAddress();
                                break;
                            case "paymentMethod":
                                actionPaymentMethod();
                                break;
                            case "customerInfo":
                                actionCustomerAdditionalInfo();
                                break;
                            case "discounts":
                                actionDiscount();
                                break;
                            default:
                                actionDefault();
                        }

                    };// jshint ignore:line

                    $scope.setPaymentType = function (type) {
                        $scope.paymentType = type;
                    };

                    $scope.isCreditCard = function () {
                        if (typeof $scope.paymentType !== "undefined") {
                            return $scope.paymentType.split("_").indexOf("cc") > 0;
                        }
                        return false;
                    };

                    $scope.showFormCc = function (method) {
                        if (typeof method !== "undefined") {
                            return method.Type.split("_").indexOf("cc") > 0;
                        }
                        return false;
                    };

                    $scope.closeSuccessPopup = function () {
                        $(".modal").modal("hide");
                        $(".modal-open").removeClass('modal-open');
                        $location.path("/");
                    };

                    /**
                     * Saves checkout
                     */
                    $scope.save = function () {
                        var payment, isValid, sendPostForm;
                        $scope.message = "";
                        isValid = function () {
                            var result, message, getErrorMsg;
                            message = "";
                            result = {
                                status: true,
                                message: ""
                            };
                            $scope.subBillingAddress = true;
                            $scope.subShippingAddress = true;
                            $scope.subPaymentForm = true;
                            $scope.subAdditionalInfo = true;

                            getErrorMsg = function (step) {
                                /*jshint maxcomplexity:6 */
                                var msg = "Please fill all required fields";

                                switch (step) {
                                    case "billingAddress":
                                        msg = "Please fill all required fields in billing section <br />";
                                        break;
                                    case "shippingAddress":
                                        msg = "Please fill all required fields in shipping section <br />";
                                        break;
                                    case "shippingMethod":
                                        msg = "Please choose shipping method <br />";
                                        break;
                                    case "paymentMethod":
                                        msg = "Please choose payment method <br />";
                                        break;
                                    case "additionalInfo":
                                        msg = "Please fill all required fields in additional section <br />";
                                        break;
                                }
                                return msg;
                            };

                            for (var step in isValidSteps) {
                                if (isValidSteps.hasOwnProperty(step) && !isValidSteps[step]) {
                                    message += getErrorMsg(step);
                                    result = {
                                        status: false,
                                        message: message
                                    };
                                }
                            }

                            return result;
                        };

                        sendPostForm = function (method, response) {
                            var form;

                            form = "<div class='hidden' id='auth_net_form'>" + response.result;
                            form = form.replace("$CC_NUM", method.cc.number);
                            form = form.replace("$CC_MONTH", method.cc["expire_month"].toString().length < 2 ? "0" + method.cc["expire_month"] : method.cc["expire_month"]);
                            form = form.replace("$CC_YEAR", method.cc["expire_year"]) + "</div>";

                            $(".checkout > div").append(form);
                            $("#auth_net_form").find("form").submit();
                            $("#auth_net_form").remove();
                        };

                        payment = getPaymentInfo();
                        if (payment.form !== null && typeof payment.form !== "undefined") {
                            payment.form.submited = true;
                        }
                        info().then(function(){
                            var checkoutValid = isValid();
                            if (checkoutValid.status) {
                                $(this).parents('.confirm').css('display', 'none');
                                $('#processing').modal('show');
                                $checkoutApiService.save().$promise.then(
                                    function (response) {
                                        if (response.error === null && null !== payment.method && payment.method.Type === "remote" && response.result === "redirect") {
                                            w.location.replace(response.redirect);
                                        } else if (response.error === null && null !== payment.method && payment.method.Type === "post_cc") {
                                            // Handler for direct post form for Authorize.net
                                            sendPostForm(payment.method, response);
                                        } else if (response.error === null) {
                                            info();
                                            $cartService.reload().then(
                                                function () {
                                                    $scope.purchase = response.result || {};
                                                    $('#processing').modal('hide');
                                                    $("#purchase-success").modal("show");
                                                }
                                            );
                                        } else {
                                            $(this).parents('.confirm').css('display', 'block');
                                            $('#processing').modal('hide');
                                            // Errors from server
                                            $scope.message = $commonUtilService.getMessage(response);
                                        }
                                    }
                                );
                            } else {
                                $(this).parents('.confirm').css('display', 'block');
                                $('#processing').modal('hide');
                                $scope.message = $commonUtilService.getMessage(null, "danger",checkoutValid.message);
                            }
                        });
                    };

                    $scope.discountApply = function () {
                        if ("" === $scope.discount || typeof $scope.discount === "undefined") {
                            $scope.messageDiscounts = $commonUtilService.getMessage(null, "warning", "Discount code can't be empty");
                        } else {
                            $checkoutService.discountApply({"coupon": $scope.discount}).then(
                                function (response) {
                                    if (response.error === null) {
                                        info();
                                    } else {
                                        $scope.messageDiscounts = $commonUtilService.getMessage(response);
                                        $scope.discount = "";
                                    }
                                }
                            );
                        }
                    };

                    $scope.discountNeglect = function (code) {
                        $checkoutService.discountNeglect({"coupon": code}).then(
                            function (response) {
                                if (response.error === null) {
                                    info();
                                }
                            }
                        );
                    };

                    $scope.validateCcNumber = function () {
                        var i, payment, result;
                        result = false;

                        payment = getPaymentInfo();

                        var validateCreditCard = function (s) {
                            /*jshint maxcomplexity:6 */
                            // remove non-numerics
                            var a, c, m, k, j, x, w, v;
                            v = "0123456789";
                            w = "";
                            for (i = 0; i < s.length; i += 1) {
                                x = s.charAt(i);
                                if (v.indexOf(x, 0) !== -1) {
                                    w += x;
                                }
                            }
                            // validate number
                            j = w.length / 2;
                            k = Math.floor(j);
                            m = Math.ceil(j) - k;
                            c = 0;
                            for (i = 0; i < k; i += 1) {
                                a = w.charAt(i * 2 + m) * 2;
                                c += a > 9 ? Math.floor(a / 10 + a % 10) : a;
                            }
                            for (i = 0; i < k + m; i += 1) {
                                c += w.charAt(i * 2 + 1 - m) * 1;
                            }
                            return (c % 10 === 0);
                        };

                        if (payment.method === null && payment.form === null) {
                            return false;
                        }

                        if (creditCartTypes[payment.method.cc.type][0].test(payment.method.cc.number) === true) {
                            result = validateCreditCard(payment.method.cc.number);
                        }

                        if (typeof payment.form !== "undefined") {
                            payment.form.number.$invalidFormat = result;
                        }

                        return result;
                    };
                }
            ]
        );

        return checkoutModule;
    });
})(window, window.define, jQuery);

(function (define) {
    

    /*
     *  requireJS module entry point
     *  (to use that module you should include it to main.js)
     */
    define('checkout/module',[
            "checkout/service/api",
            "checkout/service/checkout",
            "checkout/controller/onepage",
            "checkout/controller/accordion"
        ],
        function (checkoutModule) {

            return checkoutModule;
        });

})(window.define);
(function (define) {
    

    /*
     *  Angular "cmsModule" declaration
     *  (module internal files refers to this instance)
     */
    define('cms/init',[
            "angular",
            "angular-route",
            "angular-resource",
            "angular-sanitize"
        ],
        function (angular) {
            /*
             *  Angular "cmsModule" declaration
             */
            angular.module.cmsModule = angular.module("cmsModule", ["ngRoute", "ngResource", "ngSanitize"])

                /*
                 *  Basic routing configuration
                 */
                .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
                    $routeProvider
                        .when("/page/:id", {
                            templateUrl: angular.getTheme("cms/page.html"),
                            controller: "cmsPageController"
                        });
                    $locationProvider.html5Mode(true);
                }]);

            return angular.module.cmsModule;
        });

})(window.define);
(function (define) {
    

    /*
     *  HTML top page header manipulation stuff
     */
    define('cms/service/api',['cms/init'], function (cmsModule) {
        cmsModule
            /*
             *  $productApiService interaction service
             */
            .service('$cmsApiService', [
                '$resource',
                'REST_SERVER_URI',
                function ($resource, REST_SERVER_URI) {

                    return $resource(REST_SERVER_URI, {}, {
                        'getPage': {
                            method: 'GET',
                            url: REST_SERVER_URI + '/cms/page/:pageID'
                        },
                        'getBlock': {
                            method: 'GET',
                            url: REST_SERVER_URI + '/cms/block/:blockID'
                        }
                    });
                }
            ]
        );

        return cmsModule;
    });

})(window.define);

(function (define) {
    

    /*
     *  HTML top page header manipulation stuff
     */
    define('cms/service/page',["cms/init"], function (pdpModule) {
        pdpModule
            /*
             *  $productApiService interaction service
             */
            .service("$cmsPageService", [
                "$commonRewriteService",
                function ($commonRewriteService) {
                    var getUrl, type;

                    type = "page";

                    getUrl = function (id) {
                        var url;
                        url = $commonRewriteService.getRewrite(type, id);

                        if (!url) {
                            url = type + "/" + id;
                        }

                        return "/" + url;
                    };

                    return {
                        "getUrl": getUrl
                    };
                }
            ]
        );

        return pdpModule;
    });

})(window.define);

(function (define) {
    

    define('cms/controller/page',["cms/init"], function (cmsModule) {

        cmsModule
            /*
             *  HTML top page header manipulator (direct service mapping)
             */
            .controller("cmsPageController", [
                "$scope",
                "$routeParams",
                "$location",
                "$sce",
                "$cmsApiService",
                "$cmsPageService",
                "$commonPageService",
                function ($scope, $routeParams, $location, $sce, $cmsApiService, $cmsPageService) {
                    var getDefaultPage;

                    getDefaultPage = function () {
                        return {};
                    };

                    $scope.pageId = $routeParams.id;

                    $scope.page = getDefaultPage();

                    $cmsApiService.getPage({"pageID": $scope.pageId}).$promise.then(
                        function (response) {
                            if (response.error === null) {
                                var result = response.result || getDefaultPage();
                                $scope.page = result;

                                // BREADCRUMBS
                                $scope.$emit("add-breadcrumbs", {"label": $scope.page.identifier, "url": $cmsPageService.getUrl($scope.page._id)});
                            } else {
                                $location.path("/");
                            }
                        }
                    );

                    $scope.getContent = function() {
                        return $sce.trustAsHtml($scope.page.content);
                    };

                }
            ]
        );

        return cmsModule;
    });
})(window.define);

(function (define) {
    

    /**
     *
     */
    define('cms/module',[
            "cms/service/api",
            "cms/service/page",

            "cms/controller/page"
        ],
        function (cmsModule) {

            return cmsModule;
        });

})(window.define);


window.name = "NG_DEFER_BOOTSTRAP!";

require.config({
    "baseUrl": "scripts",
    "paths": {
        "config": "config",
        "jQuery": "../lib/jquery.min",
        "bootstrap": "../lib/bootstrap.min",
        "themeFiles": "design/themeFiles",
        "angular": "../lib/angular/angular.min",

        "angular-scenario": "../lib/angular/angular-scenario.min",
        "angular-sanitize": "../lib/angular/angular-sanitize.min",
        "angular-route": "../lib/angular/angular-route.min",
        "angular-resource": "../lib/angular/angular-resource.min",
        "angular-cookies": "../lib/angular/angular-cookies.min",
        "angular-mocks": "../lib/angular/angular-mocks"
    },
    "shim": {
        "jQuery": {exports: "jQuery"},
        "config": {deps: ["jQuery"], exports: "config"},
        "bootstrap": { deps: ["jQuery"], exports: "jQuery"},
        "angular": {deps: ["config", "bootstrap"], exports: "angular"},

        "angular-route": ["angular"],
        "angular-cookies": ["angular"],
        "angular-sanitize": ["angular"],
        "angular-resource": ["angular"],
        "angular-mocks": { deps: ["angular"], exports: "angular.mock"}
    },
    "priority": ["config", "angular"]
});

require(['angular'], function (angular) {
    if (typeof require.iniConfig === "undefined") {
        require.iniConfig = {};
    }

    angular.appConfig = {};
    angular.appConfigValue = function (valueName) {
        if (typeof angular.appConfig[valueName] !== "undefined") {
            return angular.appConfig[valueName];
        } else {
            if (typeof require.iniConfig[valueName] !== "undefined") {
                return require.iniConfig[valueName];
            }
        }
        return "";
    };
});

require([
        "jQuery",
        "angular",
        "design/themeFiles",
        "design/module",
        "common/module",

        "visitor/module",
        "category/module",
        "pdp/module",
        "cart/module",
        "checkout/module",
        "cms/module"
    ],
    function ($, angular, files) {
        /**
         * Page loader
         */
        $('#loader .progress-bar').animate({width: '60%'}, 800, function () {
            setTimeout(function () {
                $('#loader .progress-bar').animate({width: '100%'}, 200, function () {
                    $('#loader').animate({opacity: 0}, 400, function () {
                        $(this).css('display', 'none');
                        setTimeout(function () {
                            $('#content').removeClass('ng-hide');
                        }, 100);
                    });
                });
            }, 500);
        });

        angular.element(document).ready(function () {
            angular.referrer = document.referrer;

            var runApp = function () {
                
                require(["../themes/" + angular.appConfigValue("themes.list.active") + "/scripts/init"], function () {
                    var modules = Object.keys(angular.module);
                    angular.resumeBootstrap(modules);
                });
                
            };

            var errorResponse = function () {
                angular.activeTheme = "default";
                angular.appConfig["themes.list.active"] = "default";
                runApp();
            };

            var successResponse = function (data) {
                angular.activeTheme = data.result === null ? "default" : data.result;
                angular.appConfig["themes.list.active"] = angular.activeTheme;
                runApp();
            };

            /**
             * Use jQuery ajax for sending existing cookie value
             * angular.element.get can not send cookie
             */
            $.ajax({
                url: angular.appConfigValue("general.app.foundation_url") + "/config/value/themes.list.active",
                type: "GET",
                timeout: 10000,
                xhrFields: {
                    withCredentials: true
                },
                error: errorResponse,
                success: successResponse
            });
            /**
             * increase count of visits
             */
            $.ajax({
                url: angular.REST_SERVER_URI + "/rts/visit",
                type: "POST",
                xhrFields: {
                    withCredentials: true
                },
                headers: {
                    "X-Referer": angular.referrer
                }
            });
        });
    }
);


define("main", function(){});
