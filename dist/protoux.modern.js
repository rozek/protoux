function e(e,t){if(null==e)return{};var n,i,r={},s=Object.keys(e);for(i=0;i<s.length;i++)t.indexOf(n=s[i])>=0||(r[n]=e[n]);return r}function t(e){return"function"==typeof e}function n(e){return null!=e&&"object"==typeof e&&Object.getPrototypeOf(e)===Object.prototype}function i(e,t){return void 0===t&&(t='"'),t+function(e,t){return void 0===t&&(t='"'),e.replace("'"===t?/\\x[0-9a-zA-Z]{2}|\\u[0-9a-zA-Z]{4}|\\[0bfnrtv'"\\\/]?|'/g:/\\x[0-9a-zA-Z]{2}|\\u[0-9a-zA-Z]{4}|\\[0bfnrtv'"\\\/]?|"/g,function(e){switch(e){case"'":return"\\'";case'"':return'\\"';case"\\":return"\\\\";default:return e}}).replace(/[\x00-\x1f\x7f-\x9f]/g,function(e){switch(e){case"\0":return"\\0";case"\b":return"\\b";case"\f":return"\\f";case"\n":return"\\n";case"\r":return"\\r";case"\t":return"\\t";case"\v":return"\\v";default:var t=e.charCodeAt(0).toString(16);return"\\x"+"00".slice(t.length)+t}})}(e,t)+t}var r,s,l,o,d,u,a,p={},c=[],h=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,_=Array.isArray;function g(e,t){for(var n in t)e[n]=t[n];return e}function f(e){var t=e.parentNode;t&&t.removeChild(e)}function y(e,t,n){var i,s,l,o={};for(l in t)"key"==l?i=t[l]:"ref"==l?s=t[l]:o[l]=t[l];if(arguments.length>2&&(o.children=arguments.length>3?r.call(arguments,2):n),"function"==typeof e&&null!=e.defaultProps)for(l in e.defaultProps)void 0===o[l]&&(o[l]=e.defaultProps[l]);return x(e,o,i,s,null)}function x(e,t,n,i,r){var o={type:e,props:t,key:n,ref:i,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:null==r?++l:r,__i:-1,__u:0};return null==r&&null!=s.vnode&&s.vnode(o),o}function $(e){return e.children}function v(e,t){this.props=e,this.context=t}function w(e,t){if(null==t)return e.__?w(e.__,e.__i+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?w(e):null}function S(e){var t,n;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e){e.__e=e.__c.base=n.__e;break}return S(e)}}function W(e){(!e.__d&&(e.__d=!0)&&o.push(e)&&!b.__r++||d!==s.debounceRendering)&&((d=s.debounceRendering)||u)(b)}function b(){var e,t,n,i,r,l,d,u,p;for(o.sort(a);e=o.shift();)e.__d&&(t=o.length,i=void 0,l=(r=(n=e).__v).__e,u=[],p=[],(d=n.__P)&&((i=g({},r)).__v=r.__v+1,s.vnode&&s.vnode(i),H(d,i,r,n.__n,void 0!==d.ownerSVGElement,32&r.__u?[l]:null,u,null==l?w(r):l,!!(32&r.__u),p),i.__v=r.__v,i.__.__k[i.__i]=i,T(u,i,p),i.__e!=l&&S(i)),o.length>t&&o.sort(a));b.__r=0}function m(e,t,n,i,r,s,l,o,d,u,a){var h,_,g,f,y,x=i&&i.__k||c,$=t.length;for(n.__d=d,V(n,t,x),d=n.__d,h=0;h<$;h++)null!=(g=n.__k[h])&&"boolean"!=typeof g&&"function"!=typeof g&&(_=-1===g.__i?p:x[g.__i]||p,g.__i=h,H(e,g,_,r,s,l,o,d,u,a),f=g.__e,g.ref&&_.ref!=g.ref&&(_.ref&&N(_.ref,null,g),a.push(g.ref,g.__c||f,g)),null==y&&null!=f&&(y=f),65536&g.__u||_.__k===g.__k?(f||_.__e!=d||(d=w(_)),d=P(g,d,e)):"function"==typeof g.type&&void 0!==g.__d?d=g.__d:f&&(d=f.nextSibling),g.__d=void 0,g.__u&=-196609);n.__d=d,n.__e=y}function V(e,t,n){var i,r,s,l,o,d=t.length,u=n.length,a=u,p=0;for(e.__k=[],i=0;i<d;i++)l=i+p,null!=(r=e.__k[i]=null==(r=t[i])||"boolean"==typeof r||"function"==typeof r?null:"string"==typeof r||"number"==typeof r||"bigint"==typeof r||r.constructor==String?x(null,r,null,null,null):_(r)?x($,{children:r},null,null,null):void 0===r.constructor&&r.__b>0?x(r.type,r.props,r.key,r.ref?r.ref:null,r.__v):r)?(r.__=e,r.__b=e.__b+1,o=I(r,n,l,a),r.__i=o,s=null,-1!==o&&(a--,(s=n[o])&&(s.__u|=131072)),null==s||null===s.__v?(-1==o&&p--,"function"!=typeof r.type&&(r.__u|=65536)):o!==l&&(o===l+1?p++:o>l?a>d-l?p+=o-l:p--:o<l?o==l-1&&(p=o-l):p=0,o!==i+p&&(r.__u|=65536))):(s=n[l])&&null==s.key&&s.__e&&!(131072&s.__u)&&(s.__e==e.__d&&(e.__d=w(s)),L(s,s,!1),n[l]=null,a--);if(a)for(i=0;i<u;i++)null!=(s=n[i])&&!(131072&s.__u)&&(s.__e==e.__d&&(e.__d=w(s)),L(s,s))}function P(e,t,n){var i,r;if("function"==typeof e.type){for(i=e.__k,r=0;i&&r<i.length;r++)i[r]&&(i[r].__=e,t=P(i[r],t,n));return t}e.__e!=t&&(n.insertBefore(e.__e,t||null),t=e.__e);do{t=t&&t.nextSibling}while(null!=t&&8===t.nodeType);return t}function I(e,t,n,i){var r=e.key,s=e.type,l=n-1,o=n+1,d=t[n];if(null===d||d&&r==d.key&&s===d.type&&!(131072&d.__u))return n;if(i>(null==d||131072&d.__u?0:1))for(;l>=0||o<t.length;){if(l>=0){if((d=t[l])&&!(131072&d.__u)&&r==d.key&&s===d.type)return l;l--}if(o<t.length){if((d=t[o])&&!(131072&d.__u)&&r==d.key&&s===d.type)return o;o++}}return-1}function U(e,t,n){"-"===t[0]?e.setProperty(t,null==n?"":n):e[t]=null==n?"":"number"!=typeof n||h.test(t)?n:n+"px"}function k(e,t,n,i,r){var s;e:if("style"===t)if("string"==typeof n)e.style.cssText=n;else{if("string"==typeof i&&(e.style.cssText=i=""),i)for(t in i)n&&t in n||U(e.style,t,"");if(n)for(t in n)i&&n[t]===i[t]||U(e.style,t,n[t])}else if("o"===t[0]&&"n"===t[1])s=t!==(t=t.replace(/(PointerCapture)$|Capture$/i,"$1")),t=t.toLowerCase()in e||"onFocusOut"===t||"onFocusIn"===t?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+s]=n,n?i?n.u=i.u:(n.u=Date.now(),e.addEventListener(t,s?X:C,s)):e.removeEventListener(t,s?X:C,s);else{if(r)t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("width"!==t&&"height"!==t&&"href"!==t&&"list"!==t&&"form"!==t&&"tabIndex"!==t&&"download"!==t&&"rowSpan"!==t&&"colSpan"!==t&&"role"!==t&&t in e)try{e[t]=null==n?"":n;break e}catch(e){}"function"==typeof n||(null==n||!1===n&&"-"!==t[4]?e.removeAttribute(t):e.setAttribute(t,n))}}function C(e){if(this.l){var t=this.l[e.type+!1];if(e.t){if(e.t<=t.u)return}else e.t=Date.now();return t(s.event?s.event(e):e)}}function X(e){if(this.l)return this.l[e.type+!0](s.event?s.event(e):e)}function H(e,t,n,i,r,l,o,d,u,a){var p,c,h,f,y,x,w,S,W,b,V,P,I,U,k,C=t.type;if(void 0!==t.constructor)return null;128&n.__u&&(u=!!(32&n.__u),l=[d=t.__e=n.__e]),(p=s.__b)&&p(t);e:if("function"==typeof C)try{if(S=t.props,W=(p=C.contextType)&&i[p.__c],b=p?W?W.props.value:p.__:i,n.__c?w=(c=t.__c=n.__c).__=c.__E:("prototype"in C&&C.prototype.render?t.__c=c=new C(S,b):(t.__c=c=new v(S,b),c.constructor=C,c.render=D),W&&W.sub(c),c.props=S,c.state||(c.state={}),c.context=b,c.__n=i,h=c.__d=!0,c.__h=[],c._sb=[]),null==c.__s&&(c.__s=c.state),null!=C.getDerivedStateFromProps&&(c.__s==c.state&&(c.__s=g({},c.__s)),g(c.__s,C.getDerivedStateFromProps(S,c.__s))),f=c.props,y=c.state,c.__v=t,h)null==C.getDerivedStateFromProps&&null!=c.componentWillMount&&c.componentWillMount(),null!=c.componentDidMount&&c.__h.push(c.componentDidMount);else{if(null==C.getDerivedStateFromProps&&S!==f&&null!=c.componentWillReceiveProps&&c.componentWillReceiveProps(S,b),!c.__e&&(null!=c.shouldComponentUpdate&&!1===c.shouldComponentUpdate(S,c.__s,b)||t.__v===n.__v)){for(t.__v!==n.__v&&(c.props=S,c.state=c.__s,c.__d=!1),t.__e=n.__e,t.__k=n.__k,t.__k.forEach(function(e){e&&(e.__=t)}),V=0;V<c._sb.length;V++)c.__h.push(c._sb[V]);c._sb=[],c.__h.length&&o.push(c);break e}null!=c.componentWillUpdate&&c.componentWillUpdate(S,c.__s,b),null!=c.componentDidUpdate&&c.__h.push(function(){c.componentDidUpdate(f,y,x)})}if(c.context=b,c.props=S,c.__P=e,c.__e=!1,P=s.__r,I=0,"prototype"in C&&C.prototype.render){for(c.state=c.__s,c.__d=!1,P&&P(t),p=c.render(c.props,c.state,c.context),U=0;U<c._sb.length;U++)c.__h.push(c._sb[U]);c._sb=[]}else do{c.__d=!1,P&&P(t),p=c.render(c.props,c.state,c.context),c.state=c.__s}while(c.__d&&++I<25);c.state=c.__s,null!=c.getChildContext&&(i=g(g({},i),c.getChildContext())),h||null==c.getSnapshotBeforeUpdate||(x=c.getSnapshotBeforeUpdate(f,y)),m(e,_(k=null!=p&&p.type===$&&null==p.key?p.props.children:p)?k:[k],t,n,i,r,l,o,d,u,a),c.base=t.__e,t.__u&=-161,c.__h.length&&o.push(c),w&&(c.__E=c.__=null)}catch(e){t.__v=null,u||null!=l?(t.__e=d,t.__u|=u?160:32,l[l.indexOf(d)]=null):(t.__e=n.__e,t.__k=n.__k),s.__e(e,t,n)}else null==l&&t.__v===n.__v?(t.__k=n.__k,t.__e=n.__e):t.__e=O(n.__e,t,n,i,r,l,o,u,a);(p=s.diffed)&&p(t)}function T(e,t,n){t.__d=void 0;for(var i=0;i<n.length;i++)N(n[i],n[++i],n[++i]);s.__c&&s.__c(t,e),e.some(function(t){try{e=t.__h,t.__h=[],e.some(function(e){e.call(t)})}catch(e){s.__e(e,t.__v)}})}function O(e,t,n,i,s,l,o,d,u){var a,c,h,g,y,x,$,v=n.props,S=t.props,W=t.type;if("svg"===W&&(s=!0),null!=l)for(a=0;a<l.length;a++)if((y=l[a])&&"setAttribute"in y==!!W&&(W?y.localName===W:3===y.nodeType)){e=y,l[a]=null;break}if(null==e){if(null===W)return document.createTextNode(S);e=s?document.createElementNS("http://www.w3.org/2000/svg",W):document.createElement(W,S.is&&S),l=null,d=!1}if(null===W)v===S||d&&e.data===S||(e.data=S);else{if(l=l&&r.call(e.childNodes),v=n.props||p,!d&&null!=l)for(v={},a=0;a<e.attributes.length;a++)v[(y=e.attributes[a]).name]=y.value;for(a in v)y=v[a],"children"==a||("dangerouslySetInnerHTML"==a?h=y:"key"===a||a in S||k(e,a,null,y,s));for(a in S)y=S[a],"children"==a?g=y:"dangerouslySetInnerHTML"==a?c=y:"value"==a?x=y:"checked"==a?$=y:"key"===a||d&&"function"!=typeof y||v[a]===y||k(e,a,y,v[a],s);if(c)d||h&&(c.__html===h.__html||c.__html===e.innerHTML)||(e.innerHTML=c.__html),t.__k=[];else if(h&&(e.innerHTML=""),m(e,_(g)?g:[g],t,n,i,s&&"foreignObject"!==W,l,o,l?l[0]:n.__k&&w(n,0),d,u),null!=l)for(a=l.length;a--;)null!=l[a]&&f(l[a]);d||(a="value",void 0!==x&&(x!==e[a]||"progress"===W&&!x||"option"===W&&x!==v[a])&&k(e,a,x,v[a],!1),a="checked",void 0!==$&&$!==e[a]&&k(e,a,$,v[a],!1))}return e}function N(e,t,n){try{"function"==typeof e?e(t):e.current=t}catch(e){s.__e(e,n)}}function L(e,t,n){var i,r;if(s.unmount&&s.unmount(e),(i=e.ref)&&(i.current&&i.current!==e.__e||N(i,null,t)),null!=(i=e.__c)){if(i.componentWillUnmount)try{i.componentWillUnmount()}catch(e){s.__e(e,t)}i.base=i.__P=null,e.__c=void 0}if(i=e.__k)for(r=0;r<i.length;r++)i[r]&&L(i[r],t,n||"function"!=typeof e.type);n||null==e.__e||f(e.__e),e.__=e.__e=e.__d=void 0}function D(e,t,n){return this.constructor(e,n)}r=c.slice,s={__e:function(e,t,n,i){for(var r,s,l;t=t.__;)if((r=t.__c)&&!r.__)try{if((s=r.constructor)&&null!=s.getDerivedStateFromError&&(r.setState(s.getDerivedStateFromError(e)),l=r.__d),null!=r.componentDidCatch&&(r.componentDidCatch(e,i||{}),l=r.__d),l)return r.__E=r}catch(t){e=t}throw e}},l=0,v.prototype.setState=function(e,t){var n;n=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=g({},this.state),"function"==typeof e&&(e=e(g({},n),this.props)),e&&g(n,e),null!=e&&this.__v&&(t&&this._sb.push(t),W(this))},v.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),W(this))},v.prototype.render=$,o=[],u="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,a=function(e,t){return e.__v.__b-t.__v.__b},b.__r=0;var A=function(e,t,n,i){var r;t[0]=0;for(var s=1;s<t.length;s++){var l=t[s++],o=t[s]?(t[0]|=l?1:2,n[t[s++]]):t[++s];3===l?i[0]=o:4===l?i[1]=Object.assign(i[1]||{},o):5===l?(i[1]=i[1]||{})[t[++s]]=o:6===l?i[1][t[++s]]+=o+"":l?(r=e.apply(o,A(e,o,n,["",null])),i.push(r),o[0]?t[0]|=2:(t[s-2]=0,t[s]=r)):i.push(o)}return i},M=new Map,E=function(e){var t=M.get(this);return t||(t=new Map,M.set(this,t)),(t=A(this,t.get(e)||(t.set(e,t=function(e){for(var t,n,i=1,r="",s="",l=[0],o=function(e){1===i&&(e||(r=r.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?l.push(0,e,r):3===i&&(e||r)?(l.push(3,e,r),i=2):2===i&&"..."===r&&e?l.push(4,e,0):2===i&&r&&!e?l.push(5,0,!0,r):i>=5&&((r||!e&&5===i)&&(l.push(i,0,r,n),i=6),e&&(l.push(i,e,0,n),i=6)),r=""},d=0;d<e.length;d++){d&&(1===i&&o(),o(d));for(var u=0;u<e[d].length;u++)t=e[d][u],1===i?"<"===t?(o(),l=[l],i=3):r+=t:4===i?"--"===r&&">"===t?(i=1,r=""):r=t+r[0]:s?t===s?s="":r+=t:'"'===t||"'"===t?s=t:">"===t?(o(),i=1):i&&("="===t?(i=5,n=r,r=""):"/"===t&&(i<5||">"===e[d][u+1])?(o(),3===i&&(l=l[0]),i=l,(l=l[0]).push(2,0,i),i=0):" "===t||"\t"===t||"\n"===t||"\r"===t?(o(),i=2):r+=t),3===i&&"!--"===r&&(i=4,l=l[0])}return o(),l}(e)),t),arguments,[])).length>1?t:t[0]}.bind(y);const F=["String","Number","Object","Array","Boolean","Date"];function j(e){return e&&"object"==typeof e}function z(e,t,n){Object.defineProperty(e,t,{value:n,enumerable:!1,configurable:!0})}function R(e,t,n){z(e,"__key",t),z(e,"__parent",n)}const B={computedStack:[],trackerSymbol:Symbol("tracker")};let Z=null;const G=Symbol();function q(){if(Z){for(const e of Z)e(),e[G]=!1;Z=null}}function Y(e,t){e[G]||(null===Z&&(Z=[],!0===t?queueMicrotask(q):setTimeout(q,t)),Z.push(e))}const{computedStack:J,trackerSymbol:K}=B,Q=Symbol("__observed"),ee=Symbol("modifiedProperty");function te(e,t,n){if(e===t)return!1;let i=typeof e;if(i!==typeof t)return!0;switch(i){case"undefined":case"boolean":case"string":case"function":default:return!0;case"number":return isNaN(e)!==isNaN(t)||Math.abs(e-t)>Number.EPSILON;case"object":return null==e||null==t||("by-value"===n&&(e instanceof Boolean||e instanceof Number||e instanceof String)?e.valueOf()!==t.valueOf():Array.isArray(e)?function(e,t,n){if(!Array.isArray(t))return!0;if(e.length!==t.length)return!0;for(let i=0,r=e.length;i<r;i++)if(te(e[i],t[i],n))return!0;return!1}(e,t,n):"by-reference"===n||function(e,t,n){if(Object.getPrototypeOf(e)!==Object.getPrototypeOf(t))return!0;for(let n in e)if(!(n in t))return!0;for(let i in t){if(!(i in e))return!0;if(te(e[i],t[i],n))return!0}return!1}(e,t,n))}return!0}const{computedStack:ne,trackerSymbol:ie}=B;var re={observe:function e(t,n={}){const{props:i,ignore:r,batch:s,deep:l=!0,bubble:o,bind:d}=n;if(t[Q])return t;const u=e=>e!==Q&&(null==i||i instanceof Array&&i.includes(e))&&(null==r||r instanceof Array&&!r.includes(e));function a(t,i,r){if("__handler"===i)z(t,"__handler",r);else if(u(i)){if(Array.isArray(t)&&"length"===i||te(t[i],r)){const d=i!==ee&&l&&j(r),u=t[i];t[i]=d?e(r,n):r,d&&o&&R(t[i],i,t);const a=[i];let h=t;for(;h&&(!h.__handler||!1!==h.__handler(a,r,u,c));)h.__key&&h.__parent?(a.unshift(h.__key),h=h.__parent):h=null;const _=p.get(i);if(_)for(const e of _){const n=e[K],r=n&&n.get(t),l=r&&r.has(i);e.__disposed||n&&!l?_.delete(e):e!==J[0]&&(void 0!==s&&!1!==s?(Y(e,s),e[G]=!0):e())}if(i!==ee){t[ee]=i;const e=p.get(ee);if(e)for(const n of e){const i=n[K],r=i&&i.get(t),l=r&&r.has(ee);n.__disposed||i&&!l?e.delete(n):n!==J[0]&&(void 0!==s&&!1!==s?(Y(n,s),n[G]=!0):n())}}}}else t[i]=r}l&&Object.entries(t).forEach(function([i,r]){j(r)&&u(i)&&(t[i]=e(r,n),o&&R(t[i],i,t))});const p=new Map,c=new Proxy(t,{get(e,n){if(n===Q)return!0;if(u(n)&&J.length){const e=J[0],i=e[K];if(i){let e=i.get(t);e||(e=new Set,i.set(t,e)),e.add(n)}let r=p.get(n);r||(r=new Set,p.set(n,r)),r.add(e)}return t[n]},set:(e,n,i)=>(a(t,n,i),!0),defineProperty(i,r,s){if("__handler"===r)throw new Error("Don't track bubble handlers");if(!u(r))return Reflect.defineProperty(t,r,s);if(!Array.isArray(t)||"length"===r){"value"in s&&l&&j(s.value)&&((s={...s}).value=e(s.value,n));const i=Reflect.defineProperty(t,r,s);return r!==ee&&(t[ee]=r),i}return!1},deleteProperty(e,n){if(n===ee)throw new Error('internal property Symbol("modifiedProperty") must not be deleted');return n in t&&a(t,n,void 0),Reflect.deleteProperty(e,n)}});var h;return d&&(h=t,Object.getOwnPropertyNames(h).concat(Object.getPrototypeOf(h)&&F.indexOf(Object.getPrototypeOf(h).constructor.name)<0?Object.getOwnPropertyNames(Object.getPrototypeOf(h)):[]).filter(e=>"constructor"!==e&&"function"==typeof h[e])).forEach(e=>t[e]=t[e].bind(c)),c},modifiedProperty:ee,computed:function(e,{autoRun:t=!0,callback:n,bind:i,disableTracking:r=!1}={}){function s(t,s=[]){const d=n||o;r||(d[ie]=new WeakMap),ne.unshift(d),s=s.length>0?[...s,l]:[l];const u=t?t():i?e.apply(i,s):e(...s);return ne.shift(),u}const l={computeAsync:s},o=(...e)=>s(null,e);return t&&o(),o},dispose:function(e){return e[B.trackerSymbol]=null,e.__disposed=!0},batch:q};const se=["Id","Type","Classes","Style","x","y","Width","Height","Value","hidden","View","WidgetList"],le=["Id","Type","Classes","x","y","Width","Height","Value","View"],oe=["Id","Type","Classes","Style","x","y","Width","Height","Value","View"],de=["Id","Type","Classes","Style","x","y","Width","Height","Value","View"],ue=["Id","Type","Classes","Style","x","y","Width","Height","Value","View"],ae=["Id","Type","Classes","Style","x","y","Width","Height","Value","View"],pe=["Id","Type","Classes","Style","x","y","Width","Height","Value","View"],ce=["Id","Type","Classes","Style","x","y","Width","Height","Value","View"],he=["Id","Type","Classes","Style","x","y","Width","Height","Value","View"],_e=["Id","Type","Classes","Style","x","y","Width","Height","Value","View"],ge=["Id","Type","Classes","Style","x","y","Width","Height","Value","View"],fe=["Id","Type","Classes","Style","x","y","Width","Height","Value","View"],ye=["Id","Type","Classes","Style","x","y","Width","Height","Value","View"],xe=["Id","Type","Classes","Style","x","y","Width","Height","Value","View"],$e=["Id","Type","Classes","Style","x","y","Width","Height","Value","View"],ve=["Id","Type","Classes","Style","x","y","Width","Height","Value","View"],we=["Id","Type","Classes","Style","x","y","Width","Height","Value","View"],Se=["Id","Type","Classes","Style","x","y","Width","Height","Value","View"],We=["Id","Type","Classes","Style","x","y","Width","Height","Value","View"],be=["Id","Type","Classes","Style","x","y","Width","Height","Value","View"],me=["Id","Type","Classes","Style","x","y","Width","Height","Value","View"],Ve=["Id","Type","Classes","Style","x","y","Width","Height","Value","View"],Pe=["Id","Type","Classes","Style","x","y","Width","Height","Value","View","Placeholder","onDrop"],Ie=["Id","Type","Classes","Style","x","y","Width","Height","Value","View"],Ue=["Id","Type","Classes","Style","x","y","Width","Height","Value","Options","View"],ke=["Id","Type","Classes","Style","x","y","Width","Height","Value","View"],Ce=["Id","Type","Classes","Style","x","y","Width","Height","Value","Color","View"];let Xe,He,Te,Oe,Ne,Le,De,Ae,Me,Ee,Fe,je,ze,Re,Be,Ze,Ge,qe,Ye,Je,Ke,Qe,et,tt,nt,it,rt,st,lt,ot,dt,ut,at,pt,ct,ht,_t,gt,ft,yt=e=>e;const{observe:xt,computed:$t}=re,vt=document.createElement("style");function wt(e){let t=/^([$a-zA-Z][$a-zA-Z0-9]*):\s*(\S.+)\s*$/.exec(e);if(null==t)throw new Error(e);{let e=new Error(t[2]);throw e.name=t[1],e}}function St(e){wt("ReadOnlyProperty: property "+i(e)+" must not be set")}vt.setAttribute("id","ProtoUX"),vt.innerHTML="/*******************************************************************************\n*                                                                              *\n*                                ProtoUX (PUX)                                 *\n*                                                                              *\n*******************************************************************************/\n\n  .PUX {\n    display:block; position:absolute;\n    margin:0px;\n    background:none;\n    border:none; border-radius:0px;\n    box-shadow:none;\n    padding:0px;\n  }\n\n  .PUX.Screen {\n    background:white; color:black;\n    font-family:'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif;\n    font-size:14px; font-weight:normal; line-height:1.4; color:black;\n    text-align:left; text-shadow:none;\n  }\n\n  .PUX.Box { background-color:white }\n\n  .PUX.Title    { font-size:20px; font-weight:normal; padding:0px 0px 0px 0px }\n  .PUX.Label    { font-size:14px; font-weight:bold;   padding:4px 0px 0px 0px }\n  .PUX.Textline { font-size:14px; font-weight:normal; padding:4px 0px 0px 0px }\n  .PUX.Text     { font-size:14px; font-weight:normal; padding:2px 0px 0px 0px }\n  .PUX.Hint     { font-size:12px; font-weight:normal; padding:4px 0px 0px 0px }\n\n  .PUX.Button > button, .PUX.Checkbox > input, .PUX.Radiobutton > input,\n  .PUX.Gauge > meter, .PUX.Progressbar > progress, .PUX.Slider > input,\n  .PUX.TextlineInput > input, .PUX.PasswordInput > input,\n  .PUX.NumberInput > input, .PUX.PhoneNumberInput > input,\n  .PUX.EMailAddressInput > input, .PUX.URLInput > input,\n  .PUX.TimeInput > input, .PUX.DateTimeInput > input, .PUX.DateInput > input,\n  .PUX.WeekInput > input, .PUX.MonthInput > input, .PUX.SearchInput > input,\n  .PUX.ColorInput > input, .PUX.DropDown > select, .PUX.FileInput > input,\n  .PUX.TextInput > textarea {\n    display:block; position:absolute;\n    left:0px; top:0px; width:100%; height:100%;\n  }\n\n  .PUX.Button > button {\n    background:white;\n    border:solid 1px black; border-radius:4px;\n  }\n\n  .PUX.FileInput {\n    color:lightgray;\n    border:solid 1px black; border-radius:3px;\n  }\n  .PUX.FileInput > span {\n    display:flex; align-items:center; position:absolute; overflow:hidden;\n    left:0px; top:0px; width:100%; height:100%;\n    padding:0px 2px 0px 2px; text-overflow:ellipsis;\n  }\n\n  .PUX.TextInput.no-resize > textarea { resize:none }\n\n  .PUX.horizontalSeparator {\n    height:1px; margin:0px; margin-top:7px;\n    border:none; border-top:solid 1px black\n  }\n  .PUX.verticalSeparator {\n    width:1px; margin:0px; margin-left:7px;\n    border:none; border-left:solid 1px black\n  }\n\n  .disabled            { opacity:0.3 }\n  .readonly            { background:none }\n  .no-pointer-events   { pointer-events:none }\n\n  .vertically-centered {\n    display:flex; align-items:center;\n  }\n\n  .textured { background-image:repeat }\n\n  .scrollable   { overflow:scroll }\n  .scrollable-x { overflow-x:scroll; overflow-y:hidden }\n  .scrollable-y { overflow-x:hidden; overflow-y:scroll }\n\n",document.head.appendChild(vt);class Wt{constructor(e="PUX"){this._IdPrefix=void 0,this._ImageFolder="",this._ScreenSet={},this._observed=xt({}),this._UpdaterList=[],this._StartScreen={},this._openScreenList=[],this._View=void 0,this._IdPrefix=e}get ImageFolder(){return this._ImageFolder}set ImageFolder(e){""===(e=e.trim())||e.endsWith("/")||(e+="/"),this._ImageFolder=e}get Style(){const e=document.getElementById(this._IdPrefix+"-Style");return null==e?"":e.innerHTML}set Style(e){const t=this._IdPrefix+"-Style";let n=this._ImageFolder;""!==n&&(e=e.replace(/url\("\/images\//g,'url("'+n));let i=document.getElementById(t);null==i&&(i=document.createElement("style"),i.setAttribute("id",t),document.head.appendChild(i)),i.innerHTML=e}get ScreenSet(){return this._ScreenSet}set ScreenSet(e){this._ScreenSet=e;for(let t in e){this._StartScreen=e[t];break}for(let t in e)Object.assign(e[t],{dX:0,dY:0,dW:0,dH:0})}get observed(){return this._observed}set observed(e){St("observed")}ScreenNamed(e){return this._ScreenSet[e]}existingScreenNamed(e){let t=this._ScreenSet[e];return null==t&&wt("NoSuchScreen: a screen named "+i(e)+" does not exist"),t}packScreen(e,t=10,n){null==n&&(n=t);const i=this.existingScreenNamed(e),r=i.WidgetList;if(0===r.length)return;let s=Infinity,l=0,o=Infinity,d=0;r.forEach(e=>{let{x:t,y:n,Width:i,Height:r}=e;s=Math.min(s,t),l=Math.max(l,t+i-1),o=Math.min(o,n),d=Math.max(d,n+r-1)}),s-=t,l+=t,o-=n,d+=n,i.Width=l-s,i.Height=d-o,r.forEach(e=>{e.x-=s,e.y-=o})}ScreenIsOverlay(e){return this.existingScreenNamed(e).isOverlay}get openScreenList(){return this._openScreenList.slice()}set openScreenList(e){St("openScreenList")}ScreenIsOpen(e){let t=this.existingScreenNamed(e);return this._openScreenList.indexOf(t)>=0}openScreen(e){let t=this.existingScreenNamed(e);const n=this._openScreenList;let i=n.indexOf(t);switch(!0){case 0===i:return;case i>0:if(!(i<n.length-1))return;n.splice(i,1),n.push(t);break;default:t.isOverlay?n.push(t):this._openScreenList=[t]}this.rerender()}closeScreen(e){let t=this.ScreenNamed(e);if(null==t)return;const n=this._openScreenList;let i=n.indexOf(t);i<0||(0===i?this._openScreenList=[this._StartScreen]:n.splice(i,1),this.rerender())}closeAllOverlays(){const e=this._openScreenList;e.length>1&&(e.length=1,this.rerender())}startWithScreen(e){this._StartScreen=this.existingScreenNamed(e),this.openScreen(e)}get StartScreen(){return this._StartScreen}set StartScreen(e){St("StartScreen")}WidgetNamed(e){const t=this._ScreenSet;for(let n in t){let i=t[n].WidgetList;for(let t=0,n=i.length;t<n;t++)if(i[t].Name===e)return i[t]}}existingWidgetNamed(e){let t=this.WidgetNamed(e);return null==t&&wt("NoSuchWidget: a widget named "+i(e)+" does not exist"),t}WidgetOnScreen(e,t){let n=t.WidgetList;for(let t=0,i=n.length;t<i;t++)if(n[t].Name===e)return n[t]}existingWidgetOnScreen(e,t){let n=this.WidgetOnScreen(e,t);return null==n&&wt("NoSuchWidget: screen "+i(t.Name)+" does not contain a widget named "+i(e)),n}WidgetInContainer(e,t){let n=t.WidgetList||[];for(let t=0,i=n.length;t<i;t++)if(n[t].Name===e)return n[t]}configure(e){for(let t in e){let n=this.existingScreenNamed(t);this.configureScreen(n,e[t])}}configureScreen(e,t){for(let n in t){let i=this.existingWidgetOnScreen(n,e);this.configureWidget(i,t[n])}}configureWidget(e,i){for(let r in i){let s=i[r];if(n(s)&&t(s.Updater))this._UpdaterList.push($t(()=>{this.updateWidget(e,{[r]:s.Updater()})}));else{if(n(s)&&null!=e.WidgetList){const t=this.WidgetInContainer(r,e);if(null!=t){this.configureWidget(t,s);continue}}e[r]=s}}}update(e){for(let t in e){let n=this.existingScreenNamed(t);this.updateScreen(n,e[t])}}updateScreen(e,t){for(let n in t){let i=this.existingWidgetOnScreen(n,e);this.updateWidget(i,t[n])}}updateWidget(e,t){for(let n in t)e[n]=t[n];let n=e.View;null!=n&&n.rerender()}updatedFrom(e){return{Updater:e}}get View(){return this._View}set View(e){St("View")}renderInto(e){!function(e,t,n){var i,l,o;s.__&&s.__(e,t),i=t.__k,l=[],o=[],H(t,e=t.__k=y($,null,[e]),i||p,p,void 0!==t.ownerSVGElement,i?null:t.firstChild?r.call(t.childNodes):null,l,i?i.__e:t.firstChild,!1,o),T(l,e,o)}(E(Xe||(Xe=yt`<${0} ProtoUX=${0}/>`),bt,this),e)}rerender(){null!=this._View&&this._View.rerender()}static registerWidgetView(e,t){Wt._WidgetViewRegistry[e]=t}static WidgetViewForType(e){return Wt._WidgetViewRegistry[e]}}Wt._WidgetViewRegistry=Object.create(null);class bt extends v{constructor(...e){super(...e),this.state=0}rerender(){this.setState(this.state+1)}render(e){let t=e.ProtoUX;t._View=this;const n=t.openScreenList;return E(He||(He=yt`<div style="
        display:block; position:absolute;
        left:0px; top:0px; right:0px; bottom:0px;
      ">
        <${0} ProtoUX=${0} Screen=${0}/>
        ${0}
      </div>`),mt,t,n[0],n.slice(1).map(e=>E(Te||(Te=yt`<${0} ProtoUX=${0} Overlay=${0}/>`),Vt,t,e)))}}class mt extends v{render(e){const t=e.Screen;t.View=this;const{Id:n,Classes:i,Style:r,Width:s,Height:l,WidgetList:o}=t;return E(Oe||(Oe=yt`<div class="PUX Screen ${0}" id=${0} style="
        width:${0}px; height:${0}px; ${0}
      ">
        ${0}
      </div>`),i||"",n,s,l,r||"",o.map(t=>E(Ne||(Ne=yt`<${0} Widget=${0} ProtoUX=${0}/>`),Pt,t,e.ProtoUX)))}}class Vt extends v{render(e){const t=e.Overlay;t.View=this;const{Id:n,Classes:i,Style:r,Width:s,Height:l,WidgetList:o}=t;return E(Le||(Le=yt`<div class="PUX Overlay ${0}" id=${0} style="
        width:${0}px; height:${0}px; ${0}
      ">
        ${0}
      </div>`),i,n,s,l,r||"",o.map(t=>E(De||(De=yt`<${0} Widget=${0} ProtoUX=${0}/>`),Pt,t,e.ProtoUX)))}}class Pt extends v{constructor(...e){super(...e),this.state=0}rerender(){this.setState(this.state+1)}render(t){const n=t.Widget;if(n.View=this,1==t.hidden||1==n.hidden)return"";const i=Wt.WidgetViewForType(n.Type);if(null==i){const{Id:i,Classes:r,Style:s,x:l,y:o,Width:d,Height:u,Value:a,WidgetList:p}=n,c=e(n,se);return E(Ae||(Ae=yt`<div class="PUX Widget ${0}" id=${0} style="
          left:${0}px; top:${0}px; width:${0}px; height:${0}px; ${0}
        " ...${0}>
          ${0}
          ${0}
        </div>`),r,i,l,o,d,u,s||"",c,a||"",(p||[]).map(e=>E(Me||(Me=yt`<${0} Widget=${0} ProtoUX=${0}/>`),Pt,e,t.ProtoUX)))}return E(Ee||(Ee=yt`<${0} Widget=${0} ProtoUX=${0}/>`),i,n,t.ProtoUX)}}Wt.registerWidgetView("HTMLView",class extends Pt{render(t){const n=t.Widget;n.View=this;const{Id:i,Classes:r,x:s,y:l,Width:o,Height:d,Value:u}=n;return e(n,le),E(Fe||(Fe=yt`<div class="PUX HTMLView Widget ${0}" id=${0} style="
        left:${0}px; top:${0}px; width:${0}px; height:${0}px
      "
        dangerouslySetInnerHTML=${0}
      />`),r,i,s,l,o,d,{__html:u})}}),Wt.registerWidgetView("horizontalSeparator",class extends Pt{render(t){const n=t.Widget;n.View=this;const{Id:i,Classes:r,Style:s,x:l,y:o,Width:d,Height:u}=n,a=e(n,oe);return E(je||(je=yt`<div class="PUX horizontalSeparator Widget ${0}" id=${0} style="
        left:${0}px; top:${0}px; width:${0}px; height:${0}px; ${0}
      " ...${0}/>`),r,i,l,o,d,u,s||"",a)}}),Wt.registerWidgetView("verticalSeparator",class extends Pt{render(t){const n=t.Widget;n.View=this;const{Id:i,Classes:r,Style:s,x:l,y:o,Width:d,Height:u}=n,a=e(n,de);return E(ze||(ze=yt`<div class="PUX verticalSeparator Widget ${0}" id=${0} style="
        left:${0}px; top:${0}px; width:${0}px; height:${0}px; ${0}
      " ...${0}/>`),r,i,l,o,d,u,s||"",a)}}),Wt.registerWidgetView("Button",class extends Pt{render(t){const n=t.Widget;n.View=this;const{Id:i,Classes:r,Style:s,x:l,y:o,Width:d,Height:u,Value:a}=n,p=e(n,ue);return E(Re||(Re=yt`<div class="PUX Button Widget ${0}" id=${0} style="
        left:${0}px; top:${0}px; width:${0}px; height:${0}px; ${0}
      ">
        <button ...${0}>${0}</button>
      </div>`),r,i,l,o,d,u,s||"",p,a||"")}}),Wt.registerWidgetView("Checkbox",class extends Pt{render(t){const n=t.Widget;n.View=this;const{Id:i,Classes:r,Style:s,x:l,y:o,Width:d,Height:u,Value:a}=n,p=e(n,ae);return E(Be||(Be=yt`<div class="PUX Checkbox Widget ${0}" id=${0} style="
        left:${0}px; top:${0}px; width:${0}px; height:${0}px; ${0}
      ">
        <input type="checkbox" value=${0} ...${0}/>
      </div>`),r,i,l,o,d,u,s||"",a||"",p)}}),Wt.registerWidgetView("Radiobutton",class extends Pt{render(t){const n=t.Widget;n.View=this;const{Id:i,Classes:r,Style:s,x:l,y:o,Width:d,Height:u,Value:a}=n,p=e(n,pe);return E(Ze||(Ze=yt`<div class="PUX Radiobutton Widget ${0}" id=${0} style="
        left:${0}px; top:${0}px; width:${0}px; height:${0}px; ${0}
      ">
        <input type="radio" value=${0} ...${0}/>
      </div>`),r,i,l,o,d,u,s||"",a||"",p)}}),Wt.registerWidgetView("Gauge",class extends Pt{render(t){const n=t.Widget;n.View=this;const{Id:i,Classes:r,Style:s,x:l,y:o,Width:d,Height:u,Value:a}=n,p=e(n,ce);return E(Ge||(Ge=yt`<div class="PUX Gauge Widget ${0}" id=${0} style="
        left:${0}px; top:${0}px; width:${0}px; height:${0}px; ${0}
      ">
        <meter value=${0} ...${0}/>
      </div>`),r,i,l,o,d,u,s||"",a||"",p)}}),Wt.registerWidgetView("Progressbar",class extends Pt{render(t){const n=t.Widget;n.View=this;const{Id:i,Classes:r,Style:s,x:l,y:o,Width:d,Height:u,Value:a}=n,p=e(n,he);return E(qe||(qe=yt`<div class="PUX Progressbar Widget ${0}" id=${0} style="
        left:${0}px; top:${0}px; width:${0}px; height:${0}px; ${0}
      ">
        <progress value=${0} ...${0}/>
      </div>`),r,i,l,o,d,u,s||"",a||"",p)}}),Wt.registerWidgetView("Slider",class extends Pt{render(t){const n=t.Widget;n.View=this;const{Id:i,Classes:r,Style:s,x:l,y:o,Width:d,Height:u,Value:a}=n,p=e(n,_e);return E(Ye||(Ye=yt`<div class="PUX Slider Widget ${0}" id=${0} style="
        left:${0}px; top:${0}px; width:${0}px; height:${0}px; ${0}
      ">
        <input type="range" value=${0} ...${0}/>
      </div>`),r,i,l,o,d,u,s||"",a||"",p)}}),Wt.registerWidgetView("TextlineInput",class extends Pt{render(t){const n=t.Widget;n.View=this;const{Id:i,Classes:r,Style:s,x:l,y:o,Width:d,Height:u,Value:a}=n,p=e(n,ge);return E(Je||(Je=yt`<div class="PUX TextlineInput Widget ${0}" id=${0} style="
        left:${0}px; top:${0}px; width:${0}px; height:${0}px; ${0}
      ">
        <input type="text" value=${0} ...${0}/>
      </div>`),r,i,l,o,d,u,s||"",a||"",p)}}),Wt.registerWidgetView("PasswordInput",class extends Pt{render(t){const n=t.Widget;n.View=this;const{Id:i,Classes:r,Style:s,x:l,y:o,Width:d,Height:u,Value:a}=n,p=e(n,fe);return E(Ke||(Ke=yt`<div class="PUX PasswordInput Widget ${0}" id=${0} style="
        left:${0}px; top:${0}px; width:${0}px; height:${0}px; ${0}
      ">
        <input type="password" value=${0} ...${0}/>
      </div>`),r,i,l,o,d,u,s||"",a||"",p)}}),Wt.registerWidgetView("NumberInput",class extends Pt{render(t){const n=t.Widget;n.View=this;const{Id:i,Classes:r,Style:s,x:l,y:o,Width:d,Height:u,Value:a}=n,p=e(n,ye);return E(Qe||(Qe=yt`<div class="PUX NumberInput Widget ${0}" id=${0} style="
        left:${0}px; top:${0}px; width:${0}px; height:${0}px; ${0}
      ">
        <input type="number" value=${0} ...${0}/>
      </div>`),r,i,l,o,d,u,s||"",a||"",p)}}),Wt.registerWidgetView("PhoneNumberInput",class extends Pt{render(t){const n=t.Widget;n.View=this;const{Id:i,Classes:r,Style:s,x:l,y:o,Width:d,Height:u,Value:a}=n,p=e(n,xe);return E(et||(et=yt`<div class="PUX PhoneNumberInput Widget ${0}" id=${0} style="
        left:${0}px; top:${0}px; width:${0}px; height:${0}px; ${0}
      ">
        <input type="tel" value=${0} ...${0}/>
      </div>`),r,i,l,o,d,u,s||"",a||"",p)}}),Wt.registerWidgetView("EMailAddressInput",class extends Pt{render(t){const n=t.Widget;n.View=this;const{Id:i,Classes:r,Style:s,x:l,y:o,Width:d,Height:u,Value:a}=n,p=e(n,$e);return E(tt||(tt=yt`<div class="PUX EMailAddressInput Widget ${0}" id=${0} style="
        left:${0}px; top:${0}px; width:${0}px; height:${0}px; ${0}
      ">
        <input type="email" value=${0} ...${0}/>
      </div>`),r,i,l,o,d,u,s||"",a||"",p)}}),Wt.registerWidgetView("URLInput",class extends Pt{render(t){const n=t.Widget;n.View=this;const{Id:i,Classes:r,Style:s,x:l,y:o,Width:d,Height:u,Value:a}=n,p=e(n,ve);return E(nt||(nt=yt`<div class="PUX URLInput Widget ${0}" id=${0} style="
        left:${0}px; top:${0}px; width:${0}px; height:${0}px; ${0}
      ">
        <input type="url" value=${0} ...${0}/>
      </div>`),r,i,l,o,d,u,s||"",a||"",p)}}),Wt.registerWidgetView("TimeInput",class extends Pt{render(t){const n=t.Widget;n.View=this;const{Id:i,Classes:r,Style:s,x:l,y:o,Width:d,Height:u,Value:a}=n,p=e(n,we);return E(it||(it=yt`<div class="PUX TimeInput Widget ${0}" id=${0} style="
        left:${0}px; top:${0}px; width:${0}px; height:${0}px; ${0}
      ">
        <input type="time" value=${0} ...${0}/>
      </div>`),r,i,l,o,d,u,s||"",a||"",p)}}),Wt.registerWidgetView("DateTimeInput",class extends Pt{render(t){const n=t.Widget;n.View=this;const{Id:i,Classes:r,Style:s,x:l,y:o,Width:d,Height:u,Value:a}=n,p=e(n,Se);return E(rt||(rt=yt`<div class="PUX DateTimeInput Widget ${0}" id=${0} style="
        left:${0}px; top:${0}px; width:${0}px; height:${0}px; ${0}
      ">
        <input type="datetime-local" value=${0} ...${0}/>
      </div>`),r,i,l,o,d,u,s||"",a||"",p)}}),Wt.registerWidgetView("DateInput",class extends Pt{render(t){const n=t.Widget;n.View=this;const{Id:i,Classes:r,Style:s,x:l,y:o,Width:d,Height:u,Value:a}=n,p=e(n,We);return E(st||(st=yt`<div class="PUX DateInput Widget ${0}" id=${0} style="
        left:${0}px; top:${0}px; width:${0}px; height:${0}px; ${0}
      ">
        <input type="date" value=${0} ...${0}/>
      </div>`),r,i,l,o,d,u,s||"",a||"",p)}}),Wt.registerWidgetView("WeekInput",class extends Pt{render(t){const n=t.Widget;n.View=this;const{Id:i,Classes:r,Style:s,x:l,y:o,Width:d,Height:u,Value:a}=n,p=e(n,be);return E(lt||(lt=yt`<div class="PUX WeekInput Widget ${0}" id=${0} style="
        left:${0}px; top:${0}px; width:${0}px; height:${0}px; ${0}
      ">
        <input type="week" value=${0} ...${0}/>
      </div>`),r,i,l,o,d,u,s||"",a||"",p)}}),Wt.registerWidgetView("MonthInput",class extends Pt{render(t){const n=t.Widget;n.View=this;const{Id:i,Classes:r,Style:s,x:l,y:o,Width:d,Height:u,Value:a}=n,p=e(n,me);return E(ot||(ot=yt`<div class="PUX MonthInput Widget ${0}" id=${0} style="
        left:${0}px; top:${0}px; width:${0}px; height:${0}px; ${0}
      ">
        <input type="month" value=${0} ...${0}/>
      </div>`),r,i,l,o,d,u,s||"",a||"",p)}}),Wt.registerWidgetView("SearchInput",class extends Pt{render(t){const n=t.Widget;n.View=this;const{Id:i,Classes:r,Style:s,x:l,y:o,Width:d,Height:u,Value:a}=n,p=e(n,Ve);return E(dt||(dt=yt`<div class="PUX SearchInput Widget ${0}" id=${0} style="
        left:${0}px; top:${0}px; width:${0}px; height:${0}px; ${0}
      ">
        <input type="search" value=${0} ...${0}/>
      </div>`),r,i,l,o,d,u,s||"",a||"",p)}}),Wt.registerWidgetView("FileInput",class extends Pt{render(t){const n=t.Widget;n.View=this;const{Id:i,Classes:r,Style:s,x:l,y:o,Width:d,Height:u,Value:a,Placeholder:p,onDrop:c}=n,h=e(n,Pe);return E(ut||(ut=yt`<label class="PUX FileInput Widget ${0}" id=${0} style="
        left:${0}px; top:${0}px; width:${0}px; height:${0}px; ${0}
      " onDragEnter=${0} onDragOver=${0} onDrop=${0}>
        <input type="file" style="display:none" ...${0}/>
        ${0}
        ${0}
      </label>`),r,i,l,o,d,u,s||"",function(e){e.stopPropagation(),e.preventDefault()},function(e){e.stopPropagation(),e.preventDefault()},function(e){e.stopPropagation(),e.preventDefault(),"function"==typeof c&&c(e)},h,""===(a||"")?"":E(at||(at=yt`<span>${0}</span>`),a),""===(a||"")?""===(p||"")?"":E(pt||(pt=yt`<span>${0}</span>`),p):"")}}),Wt.registerWidgetView("ColorInput",class extends Pt{render(t){const n=t.Widget;n.View=this;const{Id:i,Classes:r,Style:s,x:l,y:o,Width:d,Height:u,Value:a}=n,p=e(n,Ie);return E(ct||(ct=yt`<div class="PUX ColorInput Widget ${0}" id=${0} style="
        left:${0}px; top:${0}px; width:${0}px; height:${0}px; ${0}
      ">
        <input type="color" value=${0} ...${0}/>
      </div>`),r,i,l,o,d,u,s||"",a||"",p)}}),Wt.registerWidgetView("DropDown",class extends Pt{render(t){const n=t.Widget;n.View=this;const{Id:i,Classes:r,Style:s,x:l,y:o,Width:d,Height:u,Value:a,Options:p}=n,c=e(n,Ue);return E(ht||(ht=yt`<div class="PUX DropDown Widget ${0}" id=${0} style="
        left:${0}px; top:${0}px; width:${0}px; height:${0}px; ${0}
      ">
        <select ...${0}>
          ${0}
        </select>
      </div>`),r,i,l,o,d,u,s||"",c,(p||[]).map(e=>E(_t||(_t=yt`<option selected=${0}>${0}</>`),e===a,e)))}}),Wt.registerWidgetView("TextInput",class extends Pt{render(t){const n=t.Widget;n.View=this;const{Id:i,Classes:r,Style:s,x:l,y:o,Width:d,Height:u,Value:a}=n,p=e(n,ke);return E(gt||(gt=yt`<div class="PUX TextInput Widget ${0}" id=${0} style="
        left:${0}px; top:${0}px; width:${0}px; height:${0}px; ${0}
      ">
        <textarea ...${0}>${0}</textarea>
      </div>`),r,i,l,o,d,u,s||"",p,a||"")}}),Wt.registerWidgetView("Icon",class extends Pt{render(t){const n=t.Widget;n.View=this;let{Id:i,Classes:r,Style:s,x:l,y:o,Width:d,Height:u,Value:a,Color:p}=n;e(n,Ce);let c=t.ProtoUX.ImageFolder;return null!=a&&""!==a.trim()&&(a=a.trim().replace(/url\("\/images\//g,'url("'+c)),E(ft||(ft=yt`<div class="PUX Icon Widget ${0}" id=${0} style="
        left:${0}px; top:${0}px; width:${0}px; height:${0}px; ${0}
      "><div style="
        display:block; position:absolute;
        left:0px; top:0px; width:100%; height:100%;
        -webkit-mask-image:${0};         mask-image:${0};
        -webkit-mask-size:contain;           mask-size:contain;
        -webkit-mask-position:center center; mask-position:center center;
        background-color:${0};
      "/></>`),r,i,l,o,d,u,s||"",a,a,p||"black")}});export{Wt as ProtoUX,wt as throwError,St as throwReadOnlyError};
//# sourceMappingURL=protoux.modern.js.map
