import{h as We,g as ou,c as au,j as uu,F as lu,k as hu,L as cu,l as Ut,S as fu,e as du,C as mu,r as vi,m as pu,n as gu}from"./index.esm2017-Bwze0Ywn.js";var Ii=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ht,oo;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(E,m){function g(){}g.prototype=m.prototype,E.D=m.prototype,E.prototype=new g,E.prototype.constructor=E,E.C=function(y,T,I){for(var p=Array(arguments.length-2),Ct=2;Ct<arguments.length;Ct++)p[Ct-2]=arguments[Ct];return m.prototype[T].apply(y,p)}}function e(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}t(n,e),n.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(E,m,g){g||(g=0);var y=Array(16);if(typeof m=="string")for(var T=0;16>T;++T)y[T]=m.charCodeAt(g++)|m.charCodeAt(g++)<<8|m.charCodeAt(g++)<<16|m.charCodeAt(g++)<<24;else for(T=0;16>T;++T)y[T]=m[g++]|m[g++]<<8|m[g++]<<16|m[g++]<<24;m=E.g[0],g=E.g[1],T=E.g[2];var I=E.g[3],p=m+(I^g&(T^I))+y[0]+3614090360&4294967295;m=g+(p<<7&4294967295|p>>>25),p=I+(T^m&(g^T))+y[1]+3905402710&4294967295,I=m+(p<<12&4294967295|p>>>20),p=T+(g^I&(m^g))+y[2]+606105819&4294967295,T=I+(p<<17&4294967295|p>>>15),p=g+(m^T&(I^m))+y[3]+3250441966&4294967295,g=T+(p<<22&4294967295|p>>>10),p=m+(I^g&(T^I))+y[4]+4118548399&4294967295,m=g+(p<<7&4294967295|p>>>25),p=I+(T^m&(g^T))+y[5]+1200080426&4294967295,I=m+(p<<12&4294967295|p>>>20),p=T+(g^I&(m^g))+y[6]+2821735955&4294967295,T=I+(p<<17&4294967295|p>>>15),p=g+(m^T&(I^m))+y[7]+4249261313&4294967295,g=T+(p<<22&4294967295|p>>>10),p=m+(I^g&(T^I))+y[8]+1770035416&4294967295,m=g+(p<<7&4294967295|p>>>25),p=I+(T^m&(g^T))+y[9]+2336552879&4294967295,I=m+(p<<12&4294967295|p>>>20),p=T+(g^I&(m^g))+y[10]+4294925233&4294967295,T=I+(p<<17&4294967295|p>>>15),p=g+(m^T&(I^m))+y[11]+2304563134&4294967295,g=T+(p<<22&4294967295|p>>>10),p=m+(I^g&(T^I))+y[12]+1804603682&4294967295,m=g+(p<<7&4294967295|p>>>25),p=I+(T^m&(g^T))+y[13]+4254626195&4294967295,I=m+(p<<12&4294967295|p>>>20),p=T+(g^I&(m^g))+y[14]+2792965006&4294967295,T=I+(p<<17&4294967295|p>>>15),p=g+(m^T&(I^m))+y[15]+1236535329&4294967295,g=T+(p<<22&4294967295|p>>>10),p=m+(T^I&(g^T))+y[1]+4129170786&4294967295,m=g+(p<<5&4294967295|p>>>27),p=I+(g^T&(m^g))+y[6]+3225465664&4294967295,I=m+(p<<9&4294967295|p>>>23),p=T+(m^g&(I^m))+y[11]+643717713&4294967295,T=I+(p<<14&4294967295|p>>>18),p=g+(I^m&(T^I))+y[0]+3921069994&4294967295,g=T+(p<<20&4294967295|p>>>12),p=m+(T^I&(g^T))+y[5]+3593408605&4294967295,m=g+(p<<5&4294967295|p>>>27),p=I+(g^T&(m^g))+y[10]+38016083&4294967295,I=m+(p<<9&4294967295|p>>>23),p=T+(m^g&(I^m))+y[15]+3634488961&4294967295,T=I+(p<<14&4294967295|p>>>18),p=g+(I^m&(T^I))+y[4]+3889429448&4294967295,g=T+(p<<20&4294967295|p>>>12),p=m+(T^I&(g^T))+y[9]+568446438&4294967295,m=g+(p<<5&4294967295|p>>>27),p=I+(g^T&(m^g))+y[14]+3275163606&4294967295,I=m+(p<<9&4294967295|p>>>23),p=T+(m^g&(I^m))+y[3]+4107603335&4294967295,T=I+(p<<14&4294967295|p>>>18),p=g+(I^m&(T^I))+y[8]+1163531501&4294967295,g=T+(p<<20&4294967295|p>>>12),p=m+(T^I&(g^T))+y[13]+2850285829&4294967295,m=g+(p<<5&4294967295|p>>>27),p=I+(g^T&(m^g))+y[2]+4243563512&4294967295,I=m+(p<<9&4294967295|p>>>23),p=T+(m^g&(I^m))+y[7]+1735328473&4294967295,T=I+(p<<14&4294967295|p>>>18),p=g+(I^m&(T^I))+y[12]+2368359562&4294967295,g=T+(p<<20&4294967295|p>>>12),p=m+(g^T^I)+y[5]+4294588738&4294967295,m=g+(p<<4&4294967295|p>>>28),p=I+(m^g^T)+y[8]+2272392833&4294967295,I=m+(p<<11&4294967295|p>>>21),p=T+(I^m^g)+y[11]+1839030562&4294967295,T=I+(p<<16&4294967295|p>>>16),p=g+(T^I^m)+y[14]+4259657740&4294967295,g=T+(p<<23&4294967295|p>>>9),p=m+(g^T^I)+y[1]+2763975236&4294967295,m=g+(p<<4&4294967295|p>>>28),p=I+(m^g^T)+y[4]+1272893353&4294967295,I=m+(p<<11&4294967295|p>>>21),p=T+(I^m^g)+y[7]+4139469664&4294967295,T=I+(p<<16&4294967295|p>>>16),p=g+(T^I^m)+y[10]+3200236656&4294967295,g=T+(p<<23&4294967295|p>>>9),p=m+(g^T^I)+y[13]+681279174&4294967295,m=g+(p<<4&4294967295|p>>>28),p=I+(m^g^T)+y[0]+3936430074&4294967295,I=m+(p<<11&4294967295|p>>>21),p=T+(I^m^g)+y[3]+3572445317&4294967295,T=I+(p<<16&4294967295|p>>>16),p=g+(T^I^m)+y[6]+76029189&4294967295,g=T+(p<<23&4294967295|p>>>9),p=m+(g^T^I)+y[9]+3654602809&4294967295,m=g+(p<<4&4294967295|p>>>28),p=I+(m^g^T)+y[12]+3873151461&4294967295,I=m+(p<<11&4294967295|p>>>21),p=T+(I^m^g)+y[15]+530742520&4294967295,T=I+(p<<16&4294967295|p>>>16),p=g+(T^I^m)+y[2]+3299628645&4294967295,g=T+(p<<23&4294967295|p>>>9),p=m+(T^(g|~I))+y[0]+4096336452&4294967295,m=g+(p<<6&4294967295|p>>>26),p=I+(g^(m|~T))+y[7]+1126891415&4294967295,I=m+(p<<10&4294967295|p>>>22),p=T+(m^(I|~g))+y[14]+2878612391&4294967295,T=I+(p<<15&4294967295|p>>>17),p=g+(I^(T|~m))+y[5]+4237533241&4294967295,g=T+(p<<21&4294967295|p>>>11),p=m+(T^(g|~I))+y[12]+1700485571&4294967295,m=g+(p<<6&4294967295|p>>>26),p=I+(g^(m|~T))+y[3]+2399980690&4294967295,I=m+(p<<10&4294967295|p>>>22),p=T+(m^(I|~g))+y[10]+4293915773&4294967295,T=I+(p<<15&4294967295|p>>>17),p=g+(I^(T|~m))+y[1]+2240044497&4294967295,g=T+(p<<21&4294967295|p>>>11),p=m+(T^(g|~I))+y[8]+1873313359&4294967295,m=g+(p<<6&4294967295|p>>>26),p=I+(g^(m|~T))+y[15]+4264355552&4294967295,I=m+(p<<10&4294967295|p>>>22),p=T+(m^(I|~g))+y[6]+2734768916&4294967295,T=I+(p<<15&4294967295|p>>>17),p=g+(I^(T|~m))+y[13]+1309151649&4294967295,g=T+(p<<21&4294967295|p>>>11),p=m+(T^(g|~I))+y[4]+4149444226&4294967295,m=g+(p<<6&4294967295|p>>>26),p=I+(g^(m|~T))+y[11]+3174756917&4294967295,I=m+(p<<10&4294967295|p>>>22),p=T+(m^(I|~g))+y[2]+718787259&4294967295,T=I+(p<<15&4294967295|p>>>17),p=g+(I^(T|~m))+y[9]+3951481745&4294967295,E.g[0]=E.g[0]+m&4294967295,E.g[1]=E.g[1]+(T+(p<<21&4294967295|p>>>11))&4294967295,E.g[2]=E.g[2]+T&4294967295,E.g[3]=E.g[3]+I&4294967295}n.prototype.u=function(E,m){m===void 0&&(m=E.length);for(var g=m-this.blockSize,y=this.B,T=this.h,I=0;I<m;){if(T==0)for(;I<=g;)i(this,E,I),I+=this.blockSize;if(typeof E=="string"){for(;I<m;)if(y[T++]=E.charCodeAt(I++),T==this.blockSize){i(this,y),T=0;break}}else for(;I<m;)if(y[T++]=E[I++],T==this.blockSize){i(this,y),T=0;break}}this.h=T,this.o+=m},n.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var m=1;m<E.length-8;++m)E[m]=0;var g=8*this.o;for(m=E.length-8;m<E.length;++m)E[m]=g&255,g/=256;for(this.u(E),E=Array(16),m=g=0;4>m;++m)for(var y=0;32>y;y+=8)E[g++]=this.g[m]>>>y&255;return E};function o(E,m){var g=h;return Object.prototype.hasOwnProperty.call(g,E)?g[E]:g[E]=m(E)}function u(E,m){this.h=m;for(var g=[],y=!0,T=E.length-1;0<=T;T--){var I=E[T]|0;y&&I==m||(g[T]=I,y=!1)}this.g=g}var h={};function f(E){return-128<=E&&128>E?o(E,function(m){return new u([m|0],0>m?-1:0)}):new u([E|0],0>E?-1:0)}function d(E){if(isNaN(E)||!isFinite(E))return A;if(0>E)return k(d(-E));for(var m=[],g=1,y=0;E>=g;y++)m[y]=E/g|0,g*=4294967296;return new u(m,0)}function _(E,m){if(E.length==0)throw Error("number format error: empty string");if(m=m||10,2>m||36<m)throw Error("radix out of range: "+m);if(E.charAt(0)=="-")return k(_(E.substring(1),m));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var g=d(Math.pow(m,8)),y=A,T=0;T<E.length;T+=8){var I=Math.min(8,E.length-T),p=parseInt(E.substring(T,T+I),m);8>I?(I=d(Math.pow(m,I)),y=y.j(I).add(d(p))):(y=y.j(g),y=y.add(d(p)))}return y}var A=f(0),R=f(1),S=f(16777216);r=u.prototype,r.m=function(){if(b(this))return-k(this).m();for(var E=0,m=1,g=0;g<this.g.length;g++){var y=this.i(g);E+=(0<=y?y:4294967296+y)*m,m*=4294967296}return E},r.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(D(this))return"0";if(b(this))return"-"+k(this).toString(E);for(var m=d(Math.pow(E,6)),g=this,y="";;){var T=nt(g,m).g;g=z(g,T.j(m));var I=((0<g.g.length?g.g[0]:g.h)>>>0).toString(E);if(g=T,D(g))return I+y;for(;6>I.length;)I="0"+I;y=I+y}},r.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function D(E){if(E.h!=0)return!1;for(var m=0;m<E.g.length;m++)if(E.g[m]!=0)return!1;return!0}function b(E){return E.h==-1}r.l=function(E){return E=z(this,E),b(E)?-1:D(E)?0:1};function k(E){for(var m=E.g.length,g=[],y=0;y<m;y++)g[y]=~E.g[y];return new u(g,~E.h).add(R)}r.abs=function(){return b(this)?k(this):this},r.add=function(E){for(var m=Math.max(this.g.length,E.g.length),g=[],y=0,T=0;T<=m;T++){var I=y+(this.i(T)&65535)+(E.i(T)&65535),p=(I>>>16)+(this.i(T)>>>16)+(E.i(T)>>>16);y=p>>>16,I&=65535,p&=65535,g[T]=p<<16|I}return new u(g,g[g.length-1]&-2147483648?-1:0)};function z(E,m){return E.add(k(m))}r.j=function(E){if(D(this)||D(E))return A;if(b(this))return b(E)?k(this).j(k(E)):k(k(this).j(E));if(b(E))return k(this.j(k(E)));if(0>this.l(S)&&0>E.l(S))return d(this.m()*E.m());for(var m=this.g.length+E.g.length,g=[],y=0;y<2*m;y++)g[y]=0;for(y=0;y<this.g.length;y++)for(var T=0;T<E.g.length;T++){var I=this.i(y)>>>16,p=this.i(y)&65535,Ct=E.i(T)>>>16,Ie=E.i(T)&65535;g[2*y+2*T]+=p*Ie,$(g,2*y+2*T),g[2*y+2*T+1]+=I*Ie,$(g,2*y+2*T+1),g[2*y+2*T+1]+=p*Ct,$(g,2*y+2*T+1),g[2*y+2*T+2]+=I*Ct,$(g,2*y+2*T+2)}for(y=0;y<m;y++)g[y]=g[2*y+1]<<16|g[2*y];for(y=m;y<2*m;y++)g[y]=0;return new u(g,0)};function $(E,m){for(;(E[m]&65535)!=E[m];)E[m+1]+=E[m]>>>16,E[m]&=65535,m++}function Q(E,m){this.g=E,this.h=m}function nt(E,m){if(D(m))throw Error("division by zero");if(D(E))return new Q(A,A);if(b(E))return m=nt(k(E),m),new Q(k(m.g),k(m.h));if(b(m))return m=nt(E,k(m)),new Q(k(m.g),m.h);if(30<E.g.length){if(b(E)||b(m))throw Error("slowDivide_ only works with positive integers.");for(var g=R,y=m;0>=y.l(E);)g=St(g),y=St(y);var T=st(g,1),I=st(y,1);for(y=st(y,2),g=st(g,2);!D(y);){var p=I.add(y);0>=p.l(E)&&(T=T.add(g),I=p),y=st(y,1),g=st(g,1)}return m=z(E,T.j(m)),new Q(T,m)}for(T=A;0<=E.l(m);){for(g=Math.max(1,Math.floor(E.m()/m.m())),y=Math.ceil(Math.log(g)/Math.LN2),y=48>=y?1:Math.pow(2,y-48),I=d(g),p=I.j(m);b(p)||0<p.l(E);)g-=y,I=d(g),p=I.j(m);D(I)&&(I=R),T=T.add(I),E=z(E,p)}return new Q(T,E)}r.A=function(E){return nt(this,E).h},r.and=function(E){for(var m=Math.max(this.g.length,E.g.length),g=[],y=0;y<m;y++)g[y]=this.i(y)&E.i(y);return new u(g,this.h&E.h)},r.or=function(E){for(var m=Math.max(this.g.length,E.g.length),g=[],y=0;y<m;y++)g[y]=this.i(y)|E.i(y);return new u(g,this.h|E.h)},r.xor=function(E){for(var m=Math.max(this.g.length,E.g.length),g=[],y=0;y<m;y++)g[y]=this.i(y)^E.i(y);return new u(g,this.h^E.h)};function St(E){for(var m=E.g.length+1,g=[],y=0;y<m;y++)g[y]=E.i(y)<<1|E.i(y-1)>>>31;return new u(g,E.h)}function st(E,m){var g=m>>5;m%=32;for(var y=E.g.length-g,T=[],I=0;I<y;I++)T[I]=0<m?E.i(I+g)>>>m|E.i(I+g+1)<<32-m:E.i(I+g);return new u(T,E.h)}n.prototype.digest=n.prototype.v,n.prototype.reset=n.prototype.s,n.prototype.update=n.prototype.u,oo=n,u.prototype.add=u.prototype.add,u.prototype.multiply=u.prototype.j,u.prototype.modulo=u.prototype.A,u.prototype.compare=u.prototype.l,u.prototype.toNumber=u.prototype.m,u.prototype.toString=u.prototype.toString,u.prototype.getBits=u.prototype.i,u.fromNumber=d,u.fromString=_,Ht=u}).apply(typeof Ii<"u"?Ii:typeof self<"u"?self:typeof window<"u"?window:{});var Sn=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ao,qe,uo,Nn,Nr,lo,ho,co;(function(){var r,t=typeof Object.defineProperties=="function"?Object.defineProperty:function(s,a,l){return s==Array.prototype||s==Object.prototype||(s[a]=l.value),s};function e(s){s=[typeof globalThis=="object"&&globalThis,s,typeof window=="object"&&window,typeof self=="object"&&self,typeof Sn=="object"&&Sn];for(var a=0;a<s.length;++a){var l=s[a];if(l&&l.Math==Math)return l}throw Error("Cannot find global object")}var n=e(this);function i(s,a){if(a)t:{var l=n;s=s.split(".");for(var c=0;c<s.length-1;c++){var v=s[c];if(!(v in l))break t;l=l[v]}s=s[s.length-1],c=l[s],a=a(c),a!=c&&a!=null&&t(l,s,{configurable:!0,writable:!0,value:a})}}function o(s,a){s instanceof String&&(s+="");var l=0,c=!1,v={next:function(){if(!c&&l<s.length){var w=l++;return{value:a(w,s[w]),done:!1}}return c=!0,{done:!0,value:void 0}}};return v[Symbol.iterator]=function(){return v},v}i("Array.prototype.values",function(s){return s||function(){return o(this,function(a,l){return l})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var u=u||{},h=this||self;function f(s){var a=typeof s;return a=a!="object"?a:s?Array.isArray(s)?"array":a:"null",a=="array"||a=="object"&&typeof s.length=="number"}function d(s){var a=typeof s;return a=="object"&&s!=null||a=="function"}function _(s,a,l){return s.call.apply(s.bind,arguments)}function A(s,a,l){if(!s)throw Error();if(2<arguments.length){var c=Array.prototype.slice.call(arguments,2);return function(){var v=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(v,c),s.apply(a,v)}}return function(){return s.apply(a,arguments)}}function R(s,a,l){return R=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?_:A,R.apply(null,arguments)}function S(s,a){var l=Array.prototype.slice.call(arguments,1);return function(){var c=l.slice();return c.push.apply(c,arguments),s.apply(this,c)}}function D(s,a){function l(){}l.prototype=a.prototype,s.aa=a.prototype,s.prototype=new l,s.prototype.constructor=s,s.Qb=function(c,v,w){for(var C=Array(arguments.length-2),G=2;G<arguments.length;G++)C[G-2]=arguments[G];return a.prototype[v].apply(c,C)}}function b(s){const a=s.length;if(0<a){const l=Array(a);for(let c=0;c<a;c++)l[c]=s[c];return l}return[]}function k(s,a){for(let l=1;l<arguments.length;l++){const c=arguments[l];if(f(c)){const v=s.length||0,w=c.length||0;s.length=v+w;for(let C=0;C<w;C++)s[v+C]=c[C]}else s.push(c)}}class z{constructor(a,l){this.i=a,this.j=l,this.h=0,this.g=null}get(){let a;return 0<this.h?(this.h--,a=this.g,this.g=a.next,a.next=null):a=this.i(),a}}function $(s){return/^[\s\xa0]*$/.test(s)}function Q(){var s=h.navigator;return s&&(s=s.userAgent)?s:""}function nt(s){return nt[" "](s),s}nt[" "]=function(){};var St=Q().indexOf("Gecko")!=-1&&!(Q().toLowerCase().indexOf("webkit")!=-1&&Q().indexOf("Edge")==-1)&&!(Q().indexOf("Trident")!=-1||Q().indexOf("MSIE")!=-1)&&Q().indexOf("Edge")==-1;function st(s,a,l){for(const c in s)a.call(l,s[c],c,s)}function E(s,a){for(const l in s)a.call(void 0,s[l],l,s)}function m(s){const a={};for(const l in s)a[l]=s[l];return a}const g="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function y(s,a){let l,c;for(let v=1;v<arguments.length;v++){c=arguments[v];for(l in c)s[l]=c[l];for(let w=0;w<g.length;w++)l=g[w],Object.prototype.hasOwnProperty.call(c,l)&&(s[l]=c[l])}}function T(s){var a=1;s=s.split(":");const l=[];for(;0<a&&s.length;)l.push(s.shift()),a--;return s.length&&l.push(s.join(":")),l}function I(s){h.setTimeout(()=>{throw s},0)}function p(){var s=sr;let a=null;return s.g&&(a=s.g,s.g=s.g.next,s.g||(s.h=null),a.next=null),a}class Ct{constructor(){this.h=this.g=null}add(a,l){const c=Ie.get();c.set(a,l),this.h?this.h.next=c:this.g=c,this.h=c}}var Ie=new z(()=>new Ra,s=>s.reset());class Ra{constructor(){this.next=this.g=this.h=null}set(a,l){this.h=a,this.g=l,this.next=null}reset(){this.next=this.g=this.h=null}}let Ae,we=!1,sr=new Ct,vs=()=>{const s=h.Promise.resolve(void 0);Ae=()=>{s.then(Pa)}};var Pa=()=>{for(var s;s=p();){try{s.h.call(s.g)}catch(l){I(l)}var a=Ie;a.j(s),100>a.h&&(a.h++,s.next=a.g,a.g=s)}we=!1};function Mt(){this.s=this.s,this.C=this.C}Mt.prototype.s=!1,Mt.prototype.ma=function(){this.s||(this.s=!0,this.N())},Mt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function ht(s,a){this.type=s,this.g=this.target=a,this.defaultPrevented=!1}ht.prototype.h=function(){this.defaultPrevented=!0};var Va=function(){if(!h.addEventListener||!Object.defineProperty)return!1;var s=!1,a=Object.defineProperty({},"passive",{get:function(){s=!0}});try{const l=()=>{};h.addEventListener("test",l,a),h.removeEventListener("test",l,a)}catch{}return s}();function Re(s,a){if(ht.call(this,s?s.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,s){var l=this.type=s.type,c=s.changedTouches&&s.changedTouches.length?s.changedTouches[0]:null;if(this.target=s.target||s.srcElement,this.g=a,a=s.relatedTarget){if(St){t:{try{nt(a.nodeName);var v=!0;break t}catch{}v=!1}v||(a=null)}}else l=="mouseover"?a=s.fromElement:l=="mouseout"&&(a=s.toElement);this.relatedTarget=a,c?(this.clientX=c.clientX!==void 0?c.clientX:c.pageX,this.clientY=c.clientY!==void 0?c.clientY:c.pageY,this.screenX=c.screenX||0,this.screenY=c.screenY||0):(this.clientX=s.clientX!==void 0?s.clientX:s.pageX,this.clientY=s.clientY!==void 0?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0),this.button=s.button,this.key=s.key||"",this.ctrlKey=s.ctrlKey,this.altKey=s.altKey,this.shiftKey=s.shiftKey,this.metaKey=s.metaKey,this.pointerId=s.pointerId||0,this.pointerType=typeof s.pointerType=="string"?s.pointerType:Sa[s.pointerType]||"",this.state=s.state,this.i=s,s.defaultPrevented&&Re.aa.h.call(this)}}D(Re,ht);var Sa={2:"touch",3:"pen",4:"mouse"};Re.prototype.h=function(){Re.aa.h.call(this);var s=this.i;s.preventDefault?s.preventDefault():s.returnValue=!1};var ln="closure_listenable_"+(1e6*Math.random()|0),Ca=0;function ka(s,a,l,c,v){this.listener=s,this.proxy=null,this.src=a,this.type=l,this.capture=!!c,this.ha=v,this.key=++Ca,this.da=this.fa=!1}function hn(s){s.da=!0,s.listener=null,s.proxy=null,s.src=null,s.ha=null}function cn(s){this.src=s,this.g={},this.h=0}cn.prototype.add=function(s,a,l,c,v){var w=s.toString();s=this.g[w],s||(s=this.g[w]=[],this.h++);var C=or(s,a,c,v);return-1<C?(a=s[C],l||(a.fa=!1)):(a=new ka(a,this.src,w,!!c,v),a.fa=l,s.push(a)),a};function ir(s,a){var l=a.type;if(l in s.g){var c=s.g[l],v=Array.prototype.indexOf.call(c,a,void 0),w;(w=0<=v)&&Array.prototype.splice.call(c,v,1),w&&(hn(a),s.g[l].length==0&&(delete s.g[l],s.h--))}}function or(s,a,l,c){for(var v=0;v<s.length;++v){var w=s[v];if(!w.da&&w.listener==a&&w.capture==!!l&&w.ha==c)return v}return-1}var ar="closure_lm_"+(1e6*Math.random()|0),ur={};function Is(s,a,l,c,v){if(Array.isArray(a)){for(var w=0;w<a.length;w++)Is(s,a[w],l,c,v);return null}return l=Rs(l),s&&s[ln]?s.K(a,l,d(c)?!!c.capture:!1,v):Da(s,a,l,!1,c,v)}function Da(s,a,l,c,v,w){if(!a)throw Error("Invalid event type");var C=d(v)?!!v.capture:!!v,G=hr(s);if(G||(s[ar]=G=new cn(s)),l=G.add(a,l,c,C,w),l.proxy)return l;if(c=Na(),l.proxy=c,c.src=s,c.listener=l,s.addEventListener)Va||(v=C),v===void 0&&(v=!1),s.addEventListener(a.toString(),c,v);else if(s.attachEvent)s.attachEvent(ws(a.toString()),c);else if(s.addListener&&s.removeListener)s.addListener(c);else throw Error("addEventListener and attachEvent are unavailable.");return l}function Na(){function s(l){return a.call(s.src,s.listener,l)}const a=ba;return s}function As(s,a,l,c,v){if(Array.isArray(a))for(var w=0;w<a.length;w++)As(s,a[w],l,c,v);else c=d(c)?!!c.capture:!!c,l=Rs(l),s&&s[ln]?(s=s.i,a=String(a).toString(),a in s.g&&(w=s.g[a],l=or(w,l,c,v),-1<l&&(hn(w[l]),Array.prototype.splice.call(w,l,1),w.length==0&&(delete s.g[a],s.h--)))):s&&(s=hr(s))&&(a=s.g[a.toString()],s=-1,a&&(s=or(a,l,c,v)),(l=-1<s?a[s]:null)&&lr(l))}function lr(s){if(typeof s!="number"&&s&&!s.da){var a=s.src;if(a&&a[ln])ir(a.i,s);else{var l=s.type,c=s.proxy;a.removeEventListener?a.removeEventListener(l,c,s.capture):a.detachEvent?a.detachEvent(ws(l),c):a.addListener&&a.removeListener&&a.removeListener(c),(l=hr(a))?(ir(l,s),l.h==0&&(l.src=null,a[ar]=null)):hn(s)}}}function ws(s){return s in ur?ur[s]:ur[s]="on"+s}function ba(s,a){if(s.da)s=!0;else{a=new Re(a,this);var l=s.listener,c=s.ha||s.src;s.fa&&lr(s),s=l.call(c,a)}return s}function hr(s){return s=s[ar],s instanceof cn?s:null}var cr="__closure_events_fn_"+(1e9*Math.random()>>>0);function Rs(s){return typeof s=="function"?s:(s[cr]||(s[cr]=function(a){return s.handleEvent(a)}),s[cr])}function ct(){Mt.call(this),this.i=new cn(this),this.M=this,this.F=null}D(ct,Mt),ct.prototype[ln]=!0,ct.prototype.removeEventListener=function(s,a,l,c){As(this,s,a,l,c)};function _t(s,a){var l,c=s.F;if(c)for(l=[];c;c=c.F)l.push(c);if(s=s.M,c=a.type||a,typeof a=="string")a=new ht(a,s);else if(a instanceof ht)a.target=a.target||s;else{var v=a;a=new ht(c,s),y(a,v)}if(v=!0,l)for(var w=l.length-1;0<=w;w--){var C=a.g=l[w];v=fn(C,c,!0,a)&&v}if(C=a.g=s,v=fn(C,c,!0,a)&&v,v=fn(C,c,!1,a)&&v,l)for(w=0;w<l.length;w++)C=a.g=l[w],v=fn(C,c,!1,a)&&v}ct.prototype.N=function(){if(ct.aa.N.call(this),this.i){var s=this.i,a;for(a in s.g){for(var l=s.g[a],c=0;c<l.length;c++)hn(l[c]);delete s.g[a],s.h--}}this.F=null},ct.prototype.K=function(s,a,l,c){return this.i.add(String(s),a,!1,l,c)},ct.prototype.L=function(s,a,l,c){return this.i.add(String(s),a,!0,l,c)};function fn(s,a,l,c){if(a=s.i.g[String(a)],!a)return!0;a=a.concat();for(var v=!0,w=0;w<a.length;++w){var C=a[w];if(C&&!C.da&&C.capture==l){var G=C.listener,it=C.ha||C.src;C.fa&&ir(s.i,C),v=G.call(it,c)!==!1&&v}}return v&&!c.defaultPrevented}function Ps(s,a,l){if(typeof s=="function")l&&(s=R(s,l));else if(s&&typeof s.handleEvent=="function")s=R(s.handleEvent,s);else throw Error("Invalid listener argument");return 2147483647<Number(a)?-1:h.setTimeout(s,a||0)}function Vs(s){s.g=Ps(()=>{s.g=null,s.i&&(s.i=!1,Vs(s))},s.l);const a=s.h;s.h=null,s.m.apply(null,a)}class xa extends Mt{constructor(a,l){super(),this.m=a,this.l=l,this.h=null,this.i=!1,this.g=null}j(a){this.h=arguments,this.g?this.i=!0:Vs(this)}N(){super.N(),this.g&&(h.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Pe(s){Mt.call(this),this.h=s,this.g={}}D(Pe,Mt);var Ss=[];function Cs(s){st(s.g,function(a,l){this.g.hasOwnProperty(l)&&lr(a)},s),s.g={}}Pe.prototype.N=function(){Pe.aa.N.call(this),Cs(this)},Pe.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var fr=h.JSON.stringify,Ma=h.JSON.parse,Oa=class{stringify(s){return h.JSON.stringify(s,void 0)}parse(s){return h.JSON.parse(s,void 0)}};function dr(){}dr.prototype.h=null;function ks(s){return s.h||(s.h=s.i())}function Ds(){}var Ve={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function mr(){ht.call(this,"d")}D(mr,ht);function pr(){ht.call(this,"c")}D(pr,ht);var Kt={},Ns=null;function dn(){return Ns=Ns||new ct}Kt.La="serverreachability";function bs(s){ht.call(this,Kt.La,s)}D(bs,ht);function Se(s){const a=dn();_t(a,new bs(a))}Kt.STAT_EVENT="statevent";function xs(s,a){ht.call(this,Kt.STAT_EVENT,s),this.stat=a}D(xs,ht);function yt(s){const a=dn();_t(a,new xs(a,s))}Kt.Ma="timingevent";function Ms(s,a){ht.call(this,Kt.Ma,s),this.size=a}D(Ms,ht);function Ce(s,a){if(typeof s!="function")throw Error("Fn must not be null and must be a function");return h.setTimeout(function(){s()},a)}function ke(){this.g=!0}ke.prototype.xa=function(){this.g=!1};function La(s,a,l,c,v,w){s.info(function(){if(s.g)if(w)for(var C="",G=w.split("&"),it=0;it<G.length;it++){var B=G[it].split("=");if(1<B.length){var ft=B[0];B=B[1];var dt=ft.split("_");C=2<=dt.length&&dt[1]=="type"?C+(ft+"="+B+"&"):C+(ft+"=redacted&")}}else C=null;else C=w;return"XMLHTTP REQ ("+c+") [attempt "+v+"]: "+a+`
`+l+`
`+C})}function Fa(s,a,l,c,v,w,C){s.info(function(){return"XMLHTTP RESP ("+c+") [ attempt "+v+"]: "+a+`
`+l+`
`+w+" "+C})}function ne(s,a,l,c){s.info(function(){return"XMLHTTP TEXT ("+a+"): "+qa(s,l)+(c?" "+c:"")})}function Ua(s,a){s.info(function(){return"TIMEOUT: "+a})}ke.prototype.info=function(){};function qa(s,a){if(!s.g)return a;if(!a)return null;try{var l=JSON.parse(a);if(l){for(s=0;s<l.length;s++)if(Array.isArray(l[s])){var c=l[s];if(!(2>c.length)){var v=c[1];if(Array.isArray(v)&&!(1>v.length)){var w=v[0];if(w!="noop"&&w!="stop"&&w!="close")for(var C=1;C<v.length;C++)v[C]=""}}}}return fr(l)}catch{return a}}var mn={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Os={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},gr;function pn(){}D(pn,dr),pn.prototype.g=function(){return new XMLHttpRequest},pn.prototype.i=function(){return{}},gr=new pn;function Ot(s,a,l,c){this.j=s,this.i=a,this.l=l,this.R=c||1,this.U=new Pe(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Ls}function Ls(){this.i=null,this.g="",this.h=!1}var Fs={},_r={};function yr(s,a,l){s.L=1,s.v=Tn(kt(a)),s.m=l,s.P=!0,Us(s,null)}function Us(s,a){s.F=Date.now(),gn(s),s.A=kt(s.v);var l=s.A,c=s.R;Array.isArray(c)||(c=[String(c)]),Zs(l.i,"t",c),s.C=0,l=s.j.J,s.h=new Ls,s.g=_i(s.j,l?a:null,!s.m),0<s.O&&(s.M=new xa(R(s.Y,s,s.g),s.O)),a=s.U,l=s.g,c=s.ca;var v="readystatechange";Array.isArray(v)||(v&&(Ss[0]=v.toString()),v=Ss);for(var w=0;w<v.length;w++){var C=Is(l,v[w],c||a.handleEvent,!1,a.h||a);if(!C)break;a.g[C.key]=C}a=s.H?m(s.H):{},s.m?(s.u||(s.u="POST"),a["Content-Type"]="application/x-www-form-urlencoded",s.g.ea(s.A,s.u,s.m,a)):(s.u="GET",s.g.ea(s.A,s.u,null,a)),Se(),La(s.i,s.u,s.A,s.l,s.R,s.m)}Ot.prototype.ca=function(s){s=s.target;const a=this.M;a&&Dt(s)==3?a.j():this.Y(s)},Ot.prototype.Y=function(s){try{if(s==this.g)t:{const dt=Dt(this.g);var a=this.g.Ba();const ie=this.g.Z();if(!(3>dt)&&(dt!=3||this.g&&(this.h.h||this.g.oa()||oi(this.g)))){this.J||dt!=4||a==7||(a==8||0>=ie?Se(3):Se(2)),Tr(this);var l=this.g.Z();this.X=l;e:if(qs(this)){var c=oi(this.g);s="";var v=c.length,w=Dt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){$t(this),De(this);var C="";break e}this.h.i=new h.TextDecoder}for(a=0;a<v;a++)this.h.h=!0,s+=this.h.i.decode(c[a],{stream:!(w&&a==v-1)});c.length=0,this.h.g+=s,this.C=0,C=this.h.g}else C=this.g.oa();if(this.o=l==200,Fa(this.i,this.u,this.A,this.l,this.R,dt,l),this.o){if(this.T&&!this.K){e:{if(this.g){var G,it=this.g;if((G=it.g?it.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!$(G)){var B=G;break e}}B=null}if(l=B)ne(this.i,this.l,l,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Er(this,l);else{this.o=!1,this.s=3,yt(12),$t(this),De(this);break t}}if(this.P){l=!0;let It;for(;!this.J&&this.C<C.length;)if(It=Ba(this,C),It==_r){dt==4&&(this.s=4,yt(14),l=!1),ne(this.i,this.l,null,"[Incomplete Response]");break}else if(It==Fs){this.s=4,yt(15),ne(this.i,this.l,C,"[Invalid Chunk]"),l=!1;break}else ne(this.i,this.l,It,null),Er(this,It);if(qs(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),dt!=4||C.length!=0||this.h.h||(this.s=1,yt(16),l=!1),this.o=this.o&&l,!l)ne(this.i,this.l,C,"[Invalid Chunked Response]"),$t(this),De(this);else if(0<C.length&&!this.W){this.W=!0;var ft=this.j;ft.g==this&&ft.ba&&!ft.M&&(ft.j.info("Great, no buffering proxy detected. Bytes received: "+C.length),Pr(ft),ft.M=!0,yt(11))}}else ne(this.i,this.l,C,null),Er(this,C);dt==4&&$t(this),this.o&&!this.J&&(dt==4?di(this.j,this):(this.o=!1,gn(this)))}else su(this.g),l==400&&0<C.indexOf("Unknown SID")?(this.s=3,yt(12)):(this.s=0,yt(13)),$t(this),De(this)}}}catch{}finally{}};function qs(s){return s.g?s.u=="GET"&&s.L!=2&&s.j.Ca:!1}function Ba(s,a){var l=s.C,c=a.indexOf(`
`,l);return c==-1?_r:(l=Number(a.substring(l,c)),isNaN(l)?Fs:(c+=1,c+l>a.length?_r:(a=a.slice(c,c+l),s.C=c+l,a)))}Ot.prototype.cancel=function(){this.J=!0,$t(this)};function gn(s){s.S=Date.now()+s.I,Bs(s,s.I)}function Bs(s,a){if(s.B!=null)throw Error("WatchDog timer not null");s.B=Ce(R(s.ba,s),a)}function Tr(s){s.B&&(h.clearTimeout(s.B),s.B=null)}Ot.prototype.ba=function(){this.B=null;const s=Date.now();0<=s-this.S?(Ua(this.i,this.A),this.L!=2&&(Se(),yt(17)),$t(this),this.s=2,De(this)):Bs(this,this.S-s)};function De(s){s.j.G==0||s.J||di(s.j,s)}function $t(s){Tr(s);var a=s.M;a&&typeof a.ma=="function"&&a.ma(),s.M=null,Cs(s.U),s.g&&(a=s.g,s.g=null,a.abort(),a.ma())}function Er(s,a){try{var l=s.j;if(l.G!=0&&(l.g==s||vr(l.h,s))){if(!s.K&&vr(l.h,s)&&l.G==3){try{var c=l.Da.g.parse(a)}catch{c=null}if(Array.isArray(c)&&c.length==3){var v=c;if(v[0]==0){t:if(!l.u){if(l.g)if(l.g.F+3e3<s.F)Rn(l),An(l);else break t;Rr(l),yt(18)}}else l.za=v[1],0<l.za-l.T&&37500>v[2]&&l.F&&l.v==0&&!l.C&&(l.C=Ce(R(l.Za,l),6e3));if(1>=Ks(l.h)&&l.ca){try{l.ca()}catch{}l.ca=void 0}}else Qt(l,11)}else if((s.K||l.g==s)&&Rn(l),!$(a))for(v=l.Da.g.parse(a),a=0;a<v.length;a++){let B=v[a];if(l.T=B[0],B=B[1],l.G==2)if(B[0]=="c"){l.K=B[1],l.ia=B[2];const ft=B[3];ft!=null&&(l.la=ft,l.j.info("VER="+l.la));const dt=B[4];dt!=null&&(l.Aa=dt,l.j.info("SVER="+l.Aa));const ie=B[5];ie!=null&&typeof ie=="number"&&0<ie&&(c=1.5*ie,l.L=c,l.j.info("backChannelRequestTimeoutMs_="+c)),c=l;const It=s.g;if(It){const Vn=It.g?It.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Vn){var w=c.h;w.g||Vn.indexOf("spdy")==-1&&Vn.indexOf("quic")==-1&&Vn.indexOf("h2")==-1||(w.j=w.l,w.g=new Set,w.h&&(Ir(w,w.h),w.h=null))}if(c.D){const Vr=It.g?It.g.getResponseHeader("X-HTTP-Session-Id"):null;Vr&&(c.ya=Vr,W(c.I,c.D,Vr))}}l.G=3,l.l&&l.l.ua(),l.ba&&(l.R=Date.now()-s.F,l.j.info("Handshake RTT: "+l.R+"ms")),c=l;var C=s;if(c.qa=gi(c,c.J?c.ia:null,c.W),C.K){$s(c.h,C);var G=C,it=c.L;it&&(G.I=it),G.B&&(Tr(G),gn(G)),c.g=C}else ci(c);0<l.i.length&&wn(l)}else B[0]!="stop"&&B[0]!="close"||Qt(l,7);else l.G==3&&(B[0]=="stop"||B[0]=="close"?B[0]=="stop"?Qt(l,7):wr(l):B[0]!="noop"&&l.l&&l.l.ta(B),l.v=0)}}Se(4)}catch{}}var ja=class{constructor(s,a){this.g=s,this.map=a}};function js(s){this.l=s||10,h.PerformanceNavigationTiming?(s=h.performance.getEntriesByType("navigation"),s=0<s.length&&(s[0].nextHopProtocol=="hq"||s[0].nextHopProtocol=="h2")):s=!!(h.chrome&&h.chrome.loadTimes&&h.chrome.loadTimes()&&h.chrome.loadTimes().wasFetchedViaSpdy),this.j=s?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function zs(s){return s.h?!0:s.g?s.g.size>=s.j:!1}function Ks(s){return s.h?1:s.g?s.g.size:0}function vr(s,a){return s.h?s.h==a:s.g?s.g.has(a):!1}function Ir(s,a){s.g?s.g.add(a):s.h=a}function $s(s,a){s.h&&s.h==a?s.h=null:s.g&&s.g.has(a)&&s.g.delete(a)}js.prototype.cancel=function(){if(this.i=Gs(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const s of this.g.values())s.cancel();this.g.clear()}};function Gs(s){if(s.h!=null)return s.i.concat(s.h.D);if(s.g!=null&&s.g.size!==0){let a=s.i;for(const l of s.g.values())a=a.concat(l.D);return a}return b(s.i)}function za(s){if(s.V&&typeof s.V=="function")return s.V();if(typeof Map<"u"&&s instanceof Map||typeof Set<"u"&&s instanceof Set)return Array.from(s.values());if(typeof s=="string")return s.split("");if(f(s)){for(var a=[],l=s.length,c=0;c<l;c++)a.push(s[c]);return a}a=[],l=0;for(c in s)a[l++]=s[c];return a}function Ka(s){if(s.na&&typeof s.na=="function")return s.na();if(!s.V||typeof s.V!="function"){if(typeof Map<"u"&&s instanceof Map)return Array.from(s.keys());if(!(typeof Set<"u"&&s instanceof Set)){if(f(s)||typeof s=="string"){var a=[];s=s.length;for(var l=0;l<s;l++)a.push(l);return a}a=[],l=0;for(const c in s)a[l++]=c;return a}}}function Qs(s,a){if(s.forEach&&typeof s.forEach=="function")s.forEach(a,void 0);else if(f(s)||typeof s=="string")Array.prototype.forEach.call(s,a,void 0);else for(var l=Ka(s),c=za(s),v=c.length,w=0;w<v;w++)a.call(void 0,c[w],l&&l[w],s)}var Ws=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function $a(s,a){if(s){s=s.split("&");for(var l=0;l<s.length;l++){var c=s[l].indexOf("="),v=null;if(0<=c){var w=s[l].substring(0,c);v=s[l].substring(c+1)}else w=s[l];a(w,v?decodeURIComponent(v.replace(/\+/g," ")):"")}}}function Gt(s){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,s instanceof Gt){this.h=s.h,_n(this,s.j),this.o=s.o,this.g=s.g,yn(this,s.s),this.l=s.l;var a=s.i,l=new xe;l.i=a.i,a.g&&(l.g=new Map(a.g),l.h=a.h),Hs(this,l),this.m=s.m}else s&&(a=String(s).match(Ws))?(this.h=!1,_n(this,a[1]||"",!0),this.o=Ne(a[2]||""),this.g=Ne(a[3]||"",!0),yn(this,a[4]),this.l=Ne(a[5]||"",!0),Hs(this,a[6]||"",!0),this.m=Ne(a[7]||"")):(this.h=!1,this.i=new xe(null,this.h))}Gt.prototype.toString=function(){var s=[],a=this.j;a&&s.push(be(a,Xs,!0),":");var l=this.g;return(l||a=="file")&&(s.push("//"),(a=this.o)&&s.push(be(a,Xs,!0),"@"),s.push(encodeURIComponent(String(l)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),l=this.s,l!=null&&s.push(":",String(l))),(l=this.l)&&(this.g&&l.charAt(0)!="/"&&s.push("/"),s.push(be(l,l.charAt(0)=="/"?Wa:Qa,!0))),(l=this.i.toString())&&s.push("?",l),(l=this.m)&&s.push("#",be(l,Xa)),s.join("")};function kt(s){return new Gt(s)}function _n(s,a,l){s.j=l?Ne(a,!0):a,s.j&&(s.j=s.j.replace(/:$/,""))}function yn(s,a){if(a){if(a=Number(a),isNaN(a)||0>a)throw Error("Bad port number "+a);s.s=a}else s.s=null}function Hs(s,a,l){a instanceof xe?(s.i=a,Ya(s.i,s.h)):(l||(a=be(a,Ha)),s.i=new xe(a,s.h))}function W(s,a,l){s.i.set(a,l)}function Tn(s){return W(s,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),s}function Ne(s,a){return s?a?decodeURI(s.replace(/%25/g,"%2525")):decodeURIComponent(s):""}function be(s,a,l){return typeof s=="string"?(s=encodeURI(s).replace(a,Ga),l&&(s=s.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),s):null}function Ga(s){return s=s.charCodeAt(0),"%"+(s>>4&15).toString(16)+(s&15).toString(16)}var Xs=/[#\/\?@]/g,Qa=/[#\?:]/g,Wa=/[#\?]/g,Ha=/[#\?@]/g,Xa=/#/g;function xe(s,a){this.h=this.g=null,this.i=s||null,this.j=!!a}function Lt(s){s.g||(s.g=new Map,s.h=0,s.i&&$a(s.i,function(a,l){s.add(decodeURIComponent(a.replace(/\+/g," ")),l)}))}r=xe.prototype,r.add=function(s,a){Lt(this),this.i=null,s=re(this,s);var l=this.g.get(s);return l||this.g.set(s,l=[]),l.push(a),this.h+=1,this};function Ys(s,a){Lt(s),a=re(s,a),s.g.has(a)&&(s.i=null,s.h-=s.g.get(a).length,s.g.delete(a))}function Js(s,a){return Lt(s),a=re(s,a),s.g.has(a)}r.forEach=function(s,a){Lt(this),this.g.forEach(function(l,c){l.forEach(function(v){s.call(a,v,c,this)},this)},this)},r.na=function(){Lt(this);const s=Array.from(this.g.values()),a=Array.from(this.g.keys()),l=[];for(let c=0;c<a.length;c++){const v=s[c];for(let w=0;w<v.length;w++)l.push(a[c])}return l},r.V=function(s){Lt(this);let a=[];if(typeof s=="string")Js(this,s)&&(a=a.concat(this.g.get(re(this,s))));else{s=Array.from(this.g.values());for(let l=0;l<s.length;l++)a=a.concat(s[l])}return a},r.set=function(s,a){return Lt(this),this.i=null,s=re(this,s),Js(this,s)&&(this.h-=this.g.get(s).length),this.g.set(s,[a]),this.h+=1,this},r.get=function(s,a){return s?(s=this.V(s),0<s.length?String(s[0]):a):a};function Zs(s,a,l){Ys(s,a),0<l.length&&(s.i=null,s.g.set(re(s,a),b(l)),s.h+=l.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const s=[],a=Array.from(this.g.keys());for(var l=0;l<a.length;l++){var c=a[l];const w=encodeURIComponent(String(c)),C=this.V(c);for(c=0;c<C.length;c++){var v=w;C[c]!==""&&(v+="="+encodeURIComponent(String(C[c]))),s.push(v)}}return this.i=s.join("&")};function re(s,a){return a=String(a),s.j&&(a=a.toLowerCase()),a}function Ya(s,a){a&&!s.j&&(Lt(s),s.i=null,s.g.forEach(function(l,c){var v=c.toLowerCase();c!=v&&(Ys(this,c),Zs(this,v,l))},s)),s.j=a}function Ja(s,a){const l=new ke;if(h.Image){const c=new Image;c.onload=S(Ft,l,"TestLoadImage: loaded",!0,a,c),c.onerror=S(Ft,l,"TestLoadImage: error",!1,a,c),c.onabort=S(Ft,l,"TestLoadImage: abort",!1,a,c),c.ontimeout=S(Ft,l,"TestLoadImage: timeout",!1,a,c),h.setTimeout(function(){c.ontimeout&&c.ontimeout()},1e4),c.src=s}else a(!1)}function Za(s,a){const l=new ke,c=new AbortController,v=setTimeout(()=>{c.abort(),Ft(l,"TestPingServer: timeout",!1,a)},1e4);fetch(s,{signal:c.signal}).then(w=>{clearTimeout(v),w.ok?Ft(l,"TestPingServer: ok",!0,a):Ft(l,"TestPingServer: server error",!1,a)}).catch(()=>{clearTimeout(v),Ft(l,"TestPingServer: error",!1,a)})}function Ft(s,a,l,c,v){try{v&&(v.onload=null,v.onerror=null,v.onabort=null,v.ontimeout=null),c(l)}catch{}}function tu(){this.g=new Oa}function eu(s,a,l){const c=l||"";try{Qs(s,function(v,w){let C=v;d(v)&&(C=fr(v)),a.push(c+w+"="+encodeURIComponent(C))})}catch(v){throw a.push(c+"type="+encodeURIComponent("_badmap")),v}}function En(s){this.l=s.Ub||null,this.j=s.eb||!1}D(En,dr),En.prototype.g=function(){return new vn(this.l,this.j)},En.prototype.i=function(s){return function(){return s}}({});function vn(s,a){ct.call(this),this.D=s,this.o=a,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}D(vn,ct),r=vn.prototype,r.open=function(s,a){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=s,this.A=a,this.readyState=1,Oe(this)},r.send=function(s){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const a={headers:this.u,method:this.B,credentials:this.m,cache:void 0};s&&(a.body=s),(this.D||h).fetch(new Request(this.A,a)).then(this.Sa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Me(this)),this.readyState=0},r.Sa=function(s){if(this.g&&(this.l=s,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=s.headers,this.readyState=2,Oe(this)),this.g&&(this.readyState=3,Oe(this),this.g)))if(this.responseType==="arraybuffer")s.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof h.ReadableStream<"u"&&"body"in s){if(this.j=s.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;ti(this)}else s.text().then(this.Ra.bind(this),this.ga.bind(this))};function ti(s){s.j.read().then(s.Pa.bind(s)).catch(s.ga.bind(s))}r.Pa=function(s){if(this.g){if(this.o&&s.value)this.response.push(s.value);else if(!this.o){var a=s.value?s.value:new Uint8Array(0);(a=this.v.decode(a,{stream:!s.done}))&&(this.response=this.responseText+=a)}s.done?Me(this):Oe(this),this.readyState==3&&ti(this)}},r.Ra=function(s){this.g&&(this.response=this.responseText=s,Me(this))},r.Qa=function(s){this.g&&(this.response=s,Me(this))},r.ga=function(){this.g&&Me(this)};function Me(s){s.readyState=4,s.l=null,s.j=null,s.v=null,Oe(s)}r.setRequestHeader=function(s,a){this.u.append(s,a)},r.getResponseHeader=function(s){return this.h&&this.h.get(s.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const s=[],a=this.h.entries();for(var l=a.next();!l.done;)l=l.value,s.push(l[0]+": "+l[1]),l=a.next();return s.join(`\r
`)};function Oe(s){s.onreadystatechange&&s.onreadystatechange.call(s)}Object.defineProperty(vn.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(s){this.m=s?"include":"same-origin"}});function ei(s){let a="";return st(s,function(l,c){a+=c,a+=":",a+=l,a+=`\r
`}),a}function Ar(s,a,l){t:{for(c in l){var c=!1;break t}c=!0}c||(l=ei(l),typeof s=="string"?l!=null&&encodeURIComponent(String(l)):W(s,a,l))}function X(s){ct.call(this),this.headers=new Map,this.o=s||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}D(X,ct);var nu=/^https?$/i,ru=["POST","PUT"];r=X.prototype,r.Ha=function(s){this.J=s},r.ea=function(s,a,l,c){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+s);a=a?a.toUpperCase():"GET",this.D=s,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():gr.g(),this.v=this.o?ks(this.o):ks(gr),this.g.onreadystatechange=R(this.Ea,this);try{this.B=!0,this.g.open(a,String(s),!0),this.B=!1}catch(w){ni(this,w);return}if(s=l||"",l=new Map(this.headers),c)if(Object.getPrototypeOf(c)===Object.prototype)for(var v in c)l.set(v,c[v]);else if(typeof c.keys=="function"&&typeof c.get=="function")for(const w of c.keys())l.set(w,c.get(w));else throw Error("Unknown input type for opt_headers: "+String(c));c=Array.from(l.keys()).find(w=>w.toLowerCase()=="content-type"),v=h.FormData&&s instanceof h.FormData,!(0<=Array.prototype.indexOf.call(ru,a,void 0))||c||v||l.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[w,C]of l)this.g.setRequestHeader(w,C);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{ii(this),this.u=!0,this.g.send(s),this.u=!1}catch(w){ni(this,w)}};function ni(s,a){s.h=!1,s.g&&(s.j=!0,s.g.abort(),s.j=!1),s.l=a,s.m=5,ri(s),In(s)}function ri(s){s.A||(s.A=!0,_t(s,"complete"),_t(s,"error"))}r.abort=function(s){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=s||7,_t(this,"complete"),_t(this,"abort"),In(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),In(this,!0)),X.aa.N.call(this)},r.Ea=function(){this.s||(this.B||this.u||this.j?si(this):this.bb())},r.bb=function(){si(this)};function si(s){if(s.h&&typeof u<"u"&&(!s.v[1]||Dt(s)!=4||s.Z()!=2)){if(s.u&&Dt(s)==4)Ps(s.Ea,0,s);else if(_t(s,"readystatechange"),Dt(s)==4){s.h=!1;try{const C=s.Z();t:switch(C){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var a=!0;break t;default:a=!1}var l;if(!(l=a)){var c;if(c=C===0){var v=String(s.D).match(Ws)[1]||null;!v&&h.self&&h.self.location&&(v=h.self.location.protocol.slice(0,-1)),c=!nu.test(v?v.toLowerCase():"")}l=c}if(l)_t(s,"complete"),_t(s,"success");else{s.m=6;try{var w=2<Dt(s)?s.g.statusText:""}catch{w=""}s.l=w+" ["+s.Z()+"]",ri(s)}}finally{In(s)}}}}function In(s,a){if(s.g){ii(s);const l=s.g,c=s.v[0]?()=>{}:null;s.g=null,s.v=null,a||_t(s,"ready");try{l.onreadystatechange=c}catch{}}}function ii(s){s.I&&(h.clearTimeout(s.I),s.I=null)}r.isActive=function(){return!!this.g};function Dt(s){return s.g?s.g.readyState:0}r.Z=function(){try{return 2<Dt(this)?this.g.status:-1}catch{return-1}},r.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.Oa=function(s){if(this.g){var a=this.g.responseText;return s&&a.indexOf(s)==0&&(a=a.substring(s.length)),Ma(a)}};function oi(s){try{if(!s.g)return null;if("response"in s.g)return s.g.response;switch(s.H){case"":case"text":return s.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in s.g)return s.g.mozResponseArrayBuffer}return null}catch{return null}}function su(s){const a={};s=(s.g&&2<=Dt(s)&&s.g.getAllResponseHeaders()||"").split(`\r
`);for(let c=0;c<s.length;c++){if($(s[c]))continue;var l=T(s[c]);const v=l[0];if(l=l[1],typeof l!="string")continue;l=l.trim();const w=a[v]||[];a[v]=w,w.push(l)}E(a,function(c){return c.join(", ")})}r.Ba=function(){return this.m},r.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Le(s,a,l){return l&&l.internalChannelParams&&l.internalChannelParams[s]||a}function ai(s){this.Aa=0,this.i=[],this.j=new ke,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Le("failFast",!1,s),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Le("baseRetryDelayMs",5e3,s),this.cb=Le("retryDelaySeedMs",1e4,s),this.Wa=Le("forwardChannelMaxRetries",2,s),this.wa=Le("forwardChannelRequestTimeoutMs",2e4,s),this.pa=s&&s.xmlHttpFactory||void 0,this.Xa=s&&s.Tb||void 0,this.Ca=s&&s.useFetchStreams||!1,this.L=void 0,this.J=s&&s.supportsCrossDomainXhr||!1,this.K="",this.h=new js(s&&s.concurrentRequestLimit),this.Da=new tu,this.P=s&&s.fastHandshake||!1,this.O=s&&s.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=s&&s.Rb||!1,s&&s.xa&&this.j.xa(),s&&s.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&s&&s.detectBufferingProxy||!1,this.ja=void 0,s&&s.longPollingTimeout&&0<s.longPollingTimeout&&(this.ja=s.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}r=ai.prototype,r.la=8,r.G=1,r.connect=function(s,a,l,c){yt(0),this.W=s,this.H=a||{},l&&c!==void 0&&(this.H.OSID=l,this.H.OAID=c),this.F=this.X,this.I=gi(this,null,this.W),wn(this)};function wr(s){if(ui(s),s.G==3){var a=s.U++,l=kt(s.I);if(W(l,"SID",s.K),W(l,"RID",a),W(l,"TYPE","terminate"),Fe(s,l),a=new Ot(s,s.j,a),a.L=2,a.v=Tn(kt(l)),l=!1,h.navigator&&h.navigator.sendBeacon)try{l=h.navigator.sendBeacon(a.v.toString(),"")}catch{}!l&&h.Image&&(new Image().src=a.v,l=!0),l||(a.g=_i(a.j,null),a.g.ea(a.v)),a.F=Date.now(),gn(a)}pi(s)}function An(s){s.g&&(Pr(s),s.g.cancel(),s.g=null)}function ui(s){An(s),s.u&&(h.clearTimeout(s.u),s.u=null),Rn(s),s.h.cancel(),s.s&&(typeof s.s=="number"&&h.clearTimeout(s.s),s.s=null)}function wn(s){if(!zs(s.h)&&!s.s){s.s=!0;var a=s.Ga;Ae||vs(),we||(Ae(),we=!0),sr.add(a,s),s.B=0}}function iu(s,a){return Ks(s.h)>=s.h.j-(s.s?1:0)?!1:s.s?(s.i=a.D.concat(s.i),!0):s.G==1||s.G==2||s.B>=(s.Va?0:s.Wa)?!1:(s.s=Ce(R(s.Ga,s,a),mi(s,s.B)),s.B++,!0)}r.Ga=function(s){if(this.s)if(this.s=null,this.G==1){if(!s){this.U=Math.floor(1e5*Math.random()),s=this.U++;const v=new Ot(this,this.j,s);let w=this.o;if(this.S&&(w?(w=m(w),y(w,this.S)):w=this.S),this.m!==null||this.O||(v.H=w,w=null),this.P)t:{for(var a=0,l=0;l<this.i.length;l++){e:{var c=this.i[l];if("__data__"in c.map&&(c=c.map.__data__,typeof c=="string")){c=c.length;break e}c=void 0}if(c===void 0)break;if(a+=c,4096<a){a=l;break t}if(a===4096||l===this.i.length-1){a=l+1;break t}}a=1e3}else a=1e3;a=hi(this,v,a),l=kt(this.I),W(l,"RID",s),W(l,"CVER",22),this.D&&W(l,"X-HTTP-Session-Id",this.D),Fe(this,l),w&&(this.O?a="headers="+encodeURIComponent(String(ei(w)))+"&"+a:this.m&&Ar(l,this.m,w)),Ir(this.h,v),this.Ua&&W(l,"TYPE","init"),this.P?(W(l,"$req",a),W(l,"SID","null"),v.T=!0,yr(v,l,null)):yr(v,l,a),this.G=2}}else this.G==3&&(s?li(this,s):this.i.length==0||zs(this.h)||li(this))};function li(s,a){var l;a?l=a.l:l=s.U++;const c=kt(s.I);W(c,"SID",s.K),W(c,"RID",l),W(c,"AID",s.T),Fe(s,c),s.m&&s.o&&Ar(c,s.m,s.o),l=new Ot(s,s.j,l,s.B+1),s.m===null&&(l.H=s.o),a&&(s.i=a.D.concat(s.i)),a=hi(s,l,1e3),l.I=Math.round(.5*s.wa)+Math.round(.5*s.wa*Math.random()),Ir(s.h,l),yr(l,c,a)}function Fe(s,a){s.H&&st(s.H,function(l,c){W(a,c,l)}),s.l&&Qs({},function(l,c){W(a,c,l)})}function hi(s,a,l){l=Math.min(s.i.length,l);var c=s.l?R(s.l.Na,s.l,s):null;t:{var v=s.i;let w=-1;for(;;){const C=["count="+l];w==-1?0<l?(w=v[0].g,C.push("ofs="+w)):w=0:C.push("ofs="+w);let G=!0;for(let it=0;it<l;it++){let B=v[it].g;const ft=v[it].map;if(B-=w,0>B)w=Math.max(0,v[it].g-100),G=!1;else try{eu(ft,C,"req"+B+"_")}catch{c&&c(ft)}}if(G){c=C.join("&");break t}}}return s=s.i.splice(0,l),a.D=s,c}function ci(s){if(!s.g&&!s.u){s.Y=1;var a=s.Fa;Ae||vs(),we||(Ae(),we=!0),sr.add(a,s),s.v=0}}function Rr(s){return s.g||s.u||3<=s.v?!1:(s.Y++,s.u=Ce(R(s.Fa,s),mi(s,s.v)),s.v++,!0)}r.Fa=function(){if(this.u=null,fi(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var s=2*this.R;this.j.info("BP detection timer enabled: "+s),this.A=Ce(R(this.ab,this),s)}},r.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,yt(10),An(this),fi(this))};function Pr(s){s.A!=null&&(h.clearTimeout(s.A),s.A=null)}function fi(s){s.g=new Ot(s,s.j,"rpc",s.Y),s.m===null&&(s.g.H=s.o),s.g.O=0;var a=kt(s.qa);W(a,"RID","rpc"),W(a,"SID",s.K),W(a,"AID",s.T),W(a,"CI",s.F?"0":"1"),!s.F&&s.ja&&W(a,"TO",s.ja),W(a,"TYPE","xmlhttp"),Fe(s,a),s.m&&s.o&&Ar(a,s.m,s.o),s.L&&(s.g.I=s.L);var l=s.g;s=s.ia,l.L=1,l.v=Tn(kt(a)),l.m=null,l.P=!0,Us(l,s)}r.Za=function(){this.C!=null&&(this.C=null,An(this),Rr(this),yt(19))};function Rn(s){s.C!=null&&(h.clearTimeout(s.C),s.C=null)}function di(s,a){var l=null;if(s.g==a){Rn(s),Pr(s),s.g=null;var c=2}else if(vr(s.h,a))l=a.D,$s(s.h,a),c=1;else return;if(s.G!=0){if(a.o)if(c==1){l=a.m?a.m.length:0,a=Date.now()-a.F;var v=s.B;c=dn(),_t(c,new Ms(c,l)),wn(s)}else ci(s);else if(v=a.s,v==3||v==0&&0<a.X||!(c==1&&iu(s,a)||c==2&&Rr(s)))switch(l&&0<l.length&&(a=s.h,a.i=a.i.concat(l)),v){case 1:Qt(s,5);break;case 4:Qt(s,10);break;case 3:Qt(s,6);break;default:Qt(s,2)}}}function mi(s,a){let l=s.Ta+Math.floor(Math.random()*s.cb);return s.isActive()||(l*=2),l*a}function Qt(s,a){if(s.j.info("Error code "+a),a==2){var l=R(s.fb,s),c=s.Xa;const v=!c;c=new Gt(c||"//www.google.com/images/cleardot.gif"),h.location&&h.location.protocol=="http"||_n(c,"https"),Tn(c),v?Ja(c.toString(),l):Za(c.toString(),l)}else yt(2);s.G=0,s.l&&s.l.sa(a),pi(s),ui(s)}r.fb=function(s){s?(this.j.info("Successfully pinged google.com"),yt(2)):(this.j.info("Failed to ping google.com"),yt(1))};function pi(s){if(s.G=0,s.ka=[],s.l){const a=Gs(s.h);(a.length!=0||s.i.length!=0)&&(k(s.ka,a),k(s.ka,s.i),s.h.i.length=0,b(s.i),s.i.length=0),s.l.ra()}}function gi(s,a,l){var c=l instanceof Gt?kt(l):new Gt(l);if(c.g!="")a&&(c.g=a+"."+c.g),yn(c,c.s);else{var v=h.location;c=v.protocol,a=a?a+"."+v.hostname:v.hostname,v=+v.port;var w=new Gt(null);c&&_n(w,c),a&&(w.g=a),v&&yn(w,v),l&&(w.l=l),c=w}return l=s.D,a=s.ya,l&&a&&W(c,l,a),W(c,"VER",s.la),Fe(s,c),c}function _i(s,a,l){if(a&&!s.J)throw Error("Can't create secondary domain capable XhrIo object.");return a=s.Ca&&!s.pa?new X(new En({eb:l})):new X(s.pa),a.Ha(s.J),a}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function yi(){}r=yi.prototype,r.ua=function(){},r.ta=function(){},r.sa=function(){},r.ra=function(){},r.isActive=function(){return!0},r.Na=function(){};function Pn(){}Pn.prototype.g=function(s,a){return new Tt(s,a)};function Tt(s,a){ct.call(this),this.g=new ai(a),this.l=s,this.h=a&&a.messageUrlParams||null,s=a&&a.messageHeaders||null,a&&a.clientProtocolHeaderRequired&&(s?s["X-Client-Protocol"]="webchannel":s={"X-Client-Protocol":"webchannel"}),this.g.o=s,s=a&&a.initMessageHeaders||null,a&&a.messageContentType&&(s?s["X-WebChannel-Content-Type"]=a.messageContentType:s={"X-WebChannel-Content-Type":a.messageContentType}),a&&a.va&&(s?s["X-WebChannel-Client-Profile"]=a.va:s={"X-WebChannel-Client-Profile":a.va}),this.g.S=s,(s=a&&a.Sb)&&!$(s)&&(this.g.m=s),this.v=a&&a.supportsCrossDomainXhr||!1,this.u=a&&a.sendRawJson||!1,(a=a&&a.httpSessionIdParam)&&!$(a)&&(this.g.D=a,s=this.h,s!==null&&a in s&&(s=this.h,a in s&&delete s[a])),this.j=new se(this)}D(Tt,ct),Tt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Tt.prototype.close=function(){wr(this.g)},Tt.prototype.o=function(s){var a=this.g;if(typeof s=="string"){var l={};l.__data__=s,s=l}else this.u&&(l={},l.__data__=fr(s),s=l);a.i.push(new ja(a.Ya++,s)),a.G==3&&wn(a)},Tt.prototype.N=function(){this.g.l=null,delete this.j,wr(this.g),delete this.g,Tt.aa.N.call(this)};function Ti(s){mr.call(this),s.__headers__&&(this.headers=s.__headers__,this.statusCode=s.__status__,delete s.__headers__,delete s.__status__);var a=s.__sm__;if(a){t:{for(const l in a){s=l;break t}s=void 0}(this.i=s)&&(s=this.i,a=a!==null&&s in a?a[s]:void 0),this.data=a}else this.data=s}D(Ti,mr);function Ei(){pr.call(this),this.status=1}D(Ei,pr);function se(s){this.g=s}D(se,yi),se.prototype.ua=function(){_t(this.g,"a")},se.prototype.ta=function(s){_t(this.g,new Ti(s))},se.prototype.sa=function(s){_t(this.g,new Ei)},se.prototype.ra=function(){_t(this.g,"b")},Pn.prototype.createWebChannel=Pn.prototype.g,Tt.prototype.send=Tt.prototype.o,Tt.prototype.open=Tt.prototype.m,Tt.prototype.close=Tt.prototype.close,co=function(){return new Pn},ho=function(){return dn()},lo=Kt,Nr={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},mn.NO_ERROR=0,mn.TIMEOUT=8,mn.HTTP_ERROR=6,Nn=mn,Os.COMPLETE="complete",uo=Os,Ds.EventType=Ve,Ve.OPEN="a",Ve.CLOSE="b",Ve.ERROR="c",Ve.MESSAGE="d",ct.prototype.listen=ct.prototype.K,qe=Ds,X.prototype.listenOnce=X.prototype.L,X.prototype.getLastError=X.prototype.Ka,X.prototype.getLastErrorCode=X.prototype.Ba,X.prototype.getStatus=X.prototype.Z,X.prototype.getResponseJson=X.prototype.Oa,X.prototype.getResponseText=X.prototype.oa,X.prototype.send=X.prototype.ea,X.prototype.setWithCredentials=X.prototype.Ha,ao=X}).apply(typeof Sn<"u"?Sn:typeof self<"u"?self:typeof window<"u"?window:{});const Ai="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}pt.UNAUTHENTICATED=new pt(null),pt.GOOGLE_CREDENTIALS=new pt("google-credentials-uid"),pt.FIRST_PARTY=new pt("first-party-uid"),pt.MOCK_USER=new pt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ye="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yt=new cu("@firebase/firestore");function Ue(){return Yt.logLevel}function N(r,...t){if(Yt.logLevel<=Ut.DEBUG){const e=t.map(Gr);Yt.debug(`Firestore (${ye}): ${r}`,...e)}}function bt(r,...t){if(Yt.logLevel<=Ut.ERROR){const e=t.map(Gr);Yt.error(`Firestore (${ye}): ${r}`,...e)}}function ce(r,...t){if(Yt.logLevel<=Ut.WARN){const e=t.map(Gr);Yt.warn(`Firestore (${ye}): ${r}`,...e)}}function Gr(r){if(typeof r=="string")return r;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(e){return JSON.stringify(e)}(r)}catch{return r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function O(r="Unexpected state"){const t=`FIRESTORE (${ye}) INTERNAL ASSERTION FAILED: `+r;throw bt(t),new Error(t)}function K(r,t){r||O()}function F(r,t){return r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const V={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class x extends lu{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xt{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fo{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class _u{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(pt.UNAUTHENTICATED))}shutdown(){}}class yu{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class Tu{constructor(t){this.t=t,this.currentUser=pt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){K(this.o===void 0);let n=this.i;const i=f=>this.i!==n?(n=this.i,e(f)):Promise.resolve();let o=new Xt;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new Xt,t.enqueueRetryable(()=>i(this.currentUser))};const u=()=>{const f=o;t.enqueueRetryable(async()=>{await f.promise,await i(this.currentUser)})},h=f=>{N("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=f,this.o&&(this.auth.addAuthTokenListener(this.o),u())};this.t.onInit(f=>h(f)),setTimeout(()=>{if(!this.auth){const f=this.t.getImmediate({optional:!0});f?h(f):(N("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new Xt)}},0),u()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(n=>this.i!==t?(N("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(K(typeof n.accessToken=="string"),new fo(n.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return K(t===null||typeof t=="string"),new pt(t)}}class Eu{constructor(t,e,n){this.l=t,this.h=e,this.P=n,this.type="FirstParty",this.user=pt.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const t=this.T();return t&&this.I.set("Authorization",t),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class vu{constructor(t,e,n){this.l=t,this.h=e,this.P=n}getToken(){return Promise.resolve(new Eu(this.l,this.h,this.P))}start(t,e){t.enqueueRetryable(()=>e(pt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Iu{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Au{constructor(t){this.A=t,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(t,e){K(this.o===void 0);const n=o=>{o.error!=null&&N("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const u=o.token!==this.R;return this.R=o.token,N("FirebaseAppCheckTokenProvider",`Received ${u?"new":"existing"} token.`),u?e(o.token):Promise.resolve()};this.o=o=>{t.enqueueRetryable(()=>n(o))};const i=o=>{N("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(o=>i(o)),setTimeout(()=>{if(!this.appCheck){const o=this.A.getImmediate({optional:!0});o?i(o):N("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(e=>e?(K(typeof e.token=="string"),this.R=e.token,new Iu(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wu(r){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(r);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let n=0;n<r;n++)e[n]=Math.floor(256*Math.random());return e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mo{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=Math.floor(256/t.length)*t.length;let n="";for(;n.length<20;){const i=wu(40);for(let o=0;o<i.length;++o)n.length<20&&i[o]<e&&(n+=t.charAt(i[o]%t.length))}return n}}function j(r,t){return r<t?-1:r>t?1:0}function fe(r,t,e){return r.length===t.length&&r.every((n,i)=>e(n,t[i]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et{constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new x(V.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new x(V.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<-62135596800)throw new x(V.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new x(V.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}static now(){return et.fromMillis(Date.now())}static fromDate(t){return et.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),n=Math.floor(1e6*(t-1e3*e));return new et(e,n)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(t){return this.seconds===t.seconds?j(this.nanoseconds,t.nanoseconds):j(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds- -62135596800;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{constructor(t){this.timestamp=t}static fromTimestamp(t){return new L(t)}static min(){return new L(new et(0,0))}static max(){return new L(new et(253402300799,999999999))}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class He{constructor(t,e,n){e===void 0?e=0:e>t.length&&O(),n===void 0?n=t.length-e:n>t.length-e&&O(),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return He.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof He?t.forEach(n=>{e.push(n)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let i=0;i<n;i++){const o=t.get(i),u=e.get(i);if(o<u)return-1;if(o>u)return 1}return t.length<e.length?-1:t.length>e.length?1:0}}class Y extends He{construct(t,e,n){return new Y(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new x(V.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter(i=>i.length>0))}return new Y(e)}static emptyPath(){return new Y([])}}const Ru=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class at extends He{construct(t,e,n){return new at(t,e,n)}static isValidIdentifier(t){return Ru.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),at.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new at(["__name__"])}static fromServerFormat(t){const e=[];let n="",i=0;const o=()=>{if(n.length===0)throw new x(V.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let u=!1;for(;i<t.length;){const h=t[i];if(h==="\\"){if(i+1===t.length)throw new x(V.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const f=t[i+1];if(f!=="\\"&&f!=="."&&f!=="`")throw new x(V.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);n+=f,i+=2}else h==="`"?(u=!u,i++):h!=="."||u?(n+=h,i++):(o(),i++)}if(o(),u)throw new x(V.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new at(e)}static emptyPath(){return new at([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(t){this.path=t}static fromPath(t){return new M(Y.fromString(t))}static fromName(t){return new M(Y.fromString(t).popFirst(5))}static empty(){return new M(Y.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&Y.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return Y.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new M(new Y(t.slice()))}}function Pu(r,t){const e=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,i=L.fromTimestamp(n===1e9?new et(e+1,0):new et(e,n));return new Bt(i,M.empty(),t)}function Vu(r){return new Bt(r.readTime,r.key,-1)}class Bt{constructor(t,e,n){this.readTime=t,this.documentKey=e,this.largestBatchId=n}static min(){return new Bt(L.min(),M.empty(),-1)}static max(){return new Bt(L.max(),M.empty(),-1)}}function Su(r,t){let e=r.readTime.compareTo(t.readTime);return e!==0?e:(e=M.comparator(r.documentKey,t.documentKey),e!==0?e:j(r.largestBatchId,t.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cu="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class ku{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nn(r){if(r.code!==V.FAILED_PRECONDITION||r.message!==Cu)throw r;N("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&O(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new P((n,i)=>{this.nextCallback=o=>{this.wrapSuccess(t,o).next(n,i)},this.catchCallback=o=>{this.wrapFailure(e,o).next(n,i)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof P?e:P.resolve(e)}catch(e){return P.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):P.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):P.reject(e)}static resolve(t){return new P((e,n)=>{e(t)})}static reject(t){return new P((e,n)=>{n(t)})}static waitFor(t){return new P((e,n)=>{let i=0,o=0,u=!1;t.forEach(h=>{++i,h.next(()=>{++o,u&&o===i&&e()},f=>n(f))}),u=!0,o===i&&e()})}static or(t){let e=P.resolve(!1);for(const n of t)e=e.next(i=>i?P.resolve(i):n());return e}static forEach(t,e){const n=[];return t.forEach((i,o)=>{n.push(e.call(this,i,o))}),this.waitFor(n)}static mapArray(t,e){return new P((n,i)=>{const o=t.length,u=new Array(o);let h=0;for(let f=0;f<o;f++){const d=f;e(t[d]).next(_=>{u[d]=_,++h,h===o&&n(u)},_=>i(_))}})}static doWhile(t,e){return new P((n,i)=>{const o=()=>{t()===!0?e().next(()=>{o()},i):n()};o()})}}function Du(r){const t=r.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function rn(r){return r.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qr{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=n=>this.ie(n),this.se=n=>e.writeSequenceNumber(n))}ie(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.se&&this.se(t),t}}Qr.oe=-1;function Qn(r){return r==null}function Ln(r){return r===0&&1/r==-1/0}function Nu(r){return typeof r=="number"&&Number.isInteger(r)&&!Ln(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wi(r){let t=0;for(const e in r)Object.prototype.hasOwnProperty.call(r,e)&&t++;return t}function Te(r,t){for(const e in r)Object.prototype.hasOwnProperty.call(r,e)&&t(e,r[e])}function po(r){for(const t in r)if(Object.prototype.hasOwnProperty.call(r,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H{constructor(t,e){this.comparator=t,this.root=e||ot.EMPTY}insert(t,e){return new H(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,ot.BLACK,null,null))}remove(t){return new H(this.comparator,this.root.remove(t,this.comparator).copy(null,null,ot.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const n=this.comparator(t,e.key);if(n===0)return e.value;n<0?e=e.left:n>0&&(e=e.right)}return null}indexOf(t){let e=0,n=this.root;for(;!n.isEmpty();){const i=this.comparator(t,n.key);if(i===0)return e+n.left.size;i<0?n=n.left:(e+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,n)=>(t(e,n),!1))}toString(){const t=[];return this.inorderTraversal((e,n)=>(t.push(`${e}:${n}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new Cn(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new Cn(this.root,t,this.comparator,!1)}getReverseIterator(){return new Cn(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new Cn(this.root,t,this.comparator,!0)}}class Cn{constructor(t,e,n,i){this.isReverse=i,this.nodeStack=[];let o=1;for(;!t.isEmpty();)if(o=e?n(t.key,e):1,e&&i&&(o*=-1),o<0)t=this.isReverse?t.left:t.right;else{if(o===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class ot{constructor(t,e,n,i,o){this.key=t,this.value=e,this.color=n??ot.RED,this.left=i??ot.EMPTY,this.right=o??ot.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,n,i,o){return new ot(t??this.key,e??this.value,n??this.color,i??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,n){let i=this;const o=n(t,i.key);return i=o<0?i.copy(null,null,null,i.left.insert(t,e,n),null):o===0?i.copy(null,e,null,null,null):i.copy(null,null,null,null,i.right.insert(t,e,n)),i.fixUp()}removeMin(){if(this.left.isEmpty())return ot.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let n,i=this;if(e(t,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(t,e),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),e(t,i.key)===0){if(i.right.isEmpty())return ot.EMPTY;n=i.right.min(),i=i.copy(n.key,n.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(t,e))}return i.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,ot.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,ot.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw O();const t=this.left.check();if(t!==this.right.check())throw O();return t+(this.isRed()?0:1)}}ot.EMPTY=null,ot.RED=!0,ot.BLACK=!1;ot.EMPTY=new class{constructor(){this.size=0}get key(){throw O()}get value(){throw O()}get color(){throw O()}get left(){throw O()}get right(){throw O()}copy(t,e,n,i,o){return this}insert(t,e,n){return new ot(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(t){this.comparator=t,this.data=new H(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,n)=>(t(e),!1))}forEachInRange(t,e){const n=this.data.getIteratorFrom(t[0]);for(;n.hasNext();){const i=n.getNext();if(this.comparator(i.key,t[1])>=0)return;e(i.key)}}forEachWhile(t,e){let n;for(n=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();n.hasNext();)if(!t(n.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new Ri(this.data.getIterator())}getIteratorFrom(t){return new Ri(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(n=>{e=e.add(n)}),e}isEqual(t){if(!(t instanceof ut)||this.size!==t.size)return!1;const e=this.data.getIterator(),n=t.data.getIterator();for(;e.hasNext();){const i=e.getNext().key,o=n.getNext().key;if(this.comparator(i,o)!==0)return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new ut(this.comparator);return e.data=t,e}}class Ri{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At{constructor(t){this.fields=t,t.sort(at.comparator)}static empty(){return new At([])}unionWith(t){let e=new ut(at.comparator);for(const n of this.fields)e=e.add(n);for(const n of t)e=e.add(n);return new At(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return fe(this.fields,t.fields,(e,n)=>e.isEqual(n))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class go extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(i){try{return atob(i)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new go("Invalid base64 string: "+o):o}}(t);return new lt(e)}static fromUint8Array(t){const e=function(i){let o="";for(let u=0;u<i.length;++u)o+=String.fromCharCode(i[u]);return o}(t);return new lt(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){const n=new Uint8Array(e.length);for(let i=0;i<e.length;i++)n[i]=e.charCodeAt(i);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return j(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}lt.EMPTY_BYTE_STRING=new lt("");const bu=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function jt(r){if(K(!!r),typeof r=="string"){let t=0;const e=bu.exec(r);if(K(!!e),e[1]){let i=e[1];i=(i+"000000000").substr(0,9),t=Number(i)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:t}}return{seconds:J(r.seconds),nanos:J(r.nanos)}}function J(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function Jt(r){return typeof r=="string"?lt.fromBase64String(r):lt.fromUint8Array(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wr(r){var t,e;return((e=(((t=r==null?void 0:r.mapValue)===null||t===void 0?void 0:t.fields)||{}).__type__)===null||e===void 0?void 0:e.stringValue)==="server_timestamp"}function Hr(r){const t=r.mapValue.fields.__previous_value__;return Wr(t)?Hr(t):t}function Xe(r){const t=jt(r.mapValue.fields.__local_write_time__.timestampValue);return new et(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xu{constructor(t,e,n,i,o,u,h,f,d){this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=i,this.ssl=o,this.forceLongPolling=u,this.autoDetectLongPolling=h,this.longPollingOptions=f,this.useFetchStreams=d}}class Ye{constructor(t,e){this.projectId=t,this.database=e||"(default)"}static empty(){return new Ye("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(t){return t instanceof Ye&&t.projectId===this.projectId&&t.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kn={mapValue:{}};function Zt(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?Wr(r)?4:Ou(r)?9007199254740991:Mu(r)?10:11:O()}function Pt(r,t){if(r===t)return!0;const e=Zt(r);if(e!==Zt(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===t.booleanValue;case 4:return Xe(r).isEqual(Xe(t));case 3:return function(i,o){if(typeof i.timestampValue=="string"&&typeof o.timestampValue=="string"&&i.timestampValue.length===o.timestampValue.length)return i.timestampValue===o.timestampValue;const u=jt(i.timestampValue),h=jt(o.timestampValue);return u.seconds===h.seconds&&u.nanos===h.nanos}(r,t);case 5:return r.stringValue===t.stringValue;case 6:return function(i,o){return Jt(i.bytesValue).isEqual(Jt(o.bytesValue))}(r,t);case 7:return r.referenceValue===t.referenceValue;case 8:return function(i,o){return J(i.geoPointValue.latitude)===J(o.geoPointValue.latitude)&&J(i.geoPointValue.longitude)===J(o.geoPointValue.longitude)}(r,t);case 2:return function(i,o){if("integerValue"in i&&"integerValue"in o)return J(i.integerValue)===J(o.integerValue);if("doubleValue"in i&&"doubleValue"in o){const u=J(i.doubleValue),h=J(o.doubleValue);return u===h?Ln(u)===Ln(h):isNaN(u)&&isNaN(h)}return!1}(r,t);case 9:return fe(r.arrayValue.values||[],t.arrayValue.values||[],Pt);case 10:case 11:return function(i,o){const u=i.mapValue.fields||{},h=o.mapValue.fields||{};if(wi(u)!==wi(h))return!1;for(const f in u)if(u.hasOwnProperty(f)&&(h[f]===void 0||!Pt(u[f],h[f])))return!1;return!0}(r,t);default:return O()}}function Je(r,t){return(r.values||[]).find(e=>Pt(e,t))!==void 0}function de(r,t){if(r===t)return 0;const e=Zt(r),n=Zt(t);if(e!==n)return j(e,n);switch(e){case 0:case 9007199254740991:return 0;case 1:return j(r.booleanValue,t.booleanValue);case 2:return function(o,u){const h=J(o.integerValue||o.doubleValue),f=J(u.integerValue||u.doubleValue);return h<f?-1:h>f?1:h===f?0:isNaN(h)?isNaN(f)?0:-1:1}(r,t);case 3:return Pi(r.timestampValue,t.timestampValue);case 4:return Pi(Xe(r),Xe(t));case 5:return j(r.stringValue,t.stringValue);case 6:return function(o,u){const h=Jt(o),f=Jt(u);return h.compareTo(f)}(r.bytesValue,t.bytesValue);case 7:return function(o,u){const h=o.split("/"),f=u.split("/");for(let d=0;d<h.length&&d<f.length;d++){const _=j(h[d],f[d]);if(_!==0)return _}return j(h.length,f.length)}(r.referenceValue,t.referenceValue);case 8:return function(o,u){const h=j(J(o.latitude),J(u.latitude));return h!==0?h:j(J(o.longitude),J(u.longitude))}(r.geoPointValue,t.geoPointValue);case 9:return Vi(r.arrayValue,t.arrayValue);case 10:return function(o,u){var h,f,d,_;const A=o.fields||{},R=u.fields||{},S=(h=A.value)===null||h===void 0?void 0:h.arrayValue,D=(f=R.value)===null||f===void 0?void 0:f.arrayValue,b=j(((d=S==null?void 0:S.values)===null||d===void 0?void 0:d.length)||0,((_=D==null?void 0:D.values)===null||_===void 0?void 0:_.length)||0);return b!==0?b:Vi(S,D)}(r.mapValue,t.mapValue);case 11:return function(o,u){if(o===kn.mapValue&&u===kn.mapValue)return 0;if(o===kn.mapValue)return 1;if(u===kn.mapValue)return-1;const h=o.fields||{},f=Object.keys(h),d=u.fields||{},_=Object.keys(d);f.sort(),_.sort();for(let A=0;A<f.length&&A<_.length;++A){const R=j(f[A],_[A]);if(R!==0)return R;const S=de(h[f[A]],d[_[A]]);if(S!==0)return S}return j(f.length,_.length)}(r.mapValue,t.mapValue);default:throw O()}}function Pi(r,t){if(typeof r=="string"&&typeof t=="string"&&r.length===t.length)return j(r,t);const e=jt(r),n=jt(t),i=j(e.seconds,n.seconds);return i!==0?i:j(e.nanos,n.nanos)}function Vi(r,t){const e=r.values||[],n=t.values||[];for(let i=0;i<e.length&&i<n.length;++i){const o=de(e[i],n[i]);if(o)return o}return j(e.length,n.length)}function me(r){return br(r)}function br(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?function(e){const n=jt(e);return`time(${n.seconds},${n.nanos})`}(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?function(e){return Jt(e).toBase64()}(r.bytesValue):"referenceValue"in r?function(e){return M.fromName(e).toString()}(r.referenceValue):"geoPointValue"in r?function(e){return`geo(${e.latitude},${e.longitude})`}(r.geoPointValue):"arrayValue"in r?function(e){let n="[",i=!0;for(const o of e.values||[])i?i=!1:n+=",",n+=br(o);return n+"]"}(r.arrayValue):"mapValue"in r?function(e){const n=Object.keys(e.fields||{}).sort();let i="{",o=!0;for(const u of n)o?o=!1:i+=",",i+=`${u}:${br(e.fields[u])}`;return i+"}"}(r.mapValue):O()}function xr(r){return!!r&&"integerValue"in r}function Xr(r){return!!r&&"arrayValue"in r}function Si(r){return!!r&&"nullValue"in r}function Ci(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function bn(r){return!!r&&"mapValue"in r}function Mu(r){var t,e;return((e=(((t=r==null?void 0:r.mapValue)===null||t===void 0?void 0:t.fields)||{}).__type__)===null||e===void 0?void 0:e.stringValue)==="__vector__"}function Ke(r){if(r.geoPointValue)return{geoPointValue:Object.assign({},r.geoPointValue)};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:Object.assign({},r.timestampValue)};if(r.mapValue){const t={mapValue:{fields:{}}};return Te(r.mapValue.fields,(e,n)=>t.mapValue.fields[e]=Ke(n)),t}if(r.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(r.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=Ke(r.arrayValue.values[e]);return t}return Object.assign({},r)}function Ou(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Et{constructor(t){this.value=t}static empty(){return new Et({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let n=0;n<t.length-1;++n)if(e=(e.mapValue.fields||{})[t.get(n)],!bn(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=Ke(e)}setAll(t){let e=at.emptyPath(),n={},i=[];t.forEach((u,h)=>{if(!e.isImmediateParentOf(h)){const f=this.getFieldsMap(e);this.applyChanges(f,n,i),n={},i=[],e=h.popLast()}u?n[h.lastSegment()]=Ke(u):i.push(h.lastSegment())});const o=this.getFieldsMap(e);this.applyChanges(o,n,i)}delete(t){const e=this.field(t.popLast());bn(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Pt(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let n=0;n<t.length;++n){let i=e.mapValue.fields[t.get(n)];bn(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},e.mapValue.fields[t.get(n)]=i),e=i}return e.mapValue.fields}applyChanges(t,e,n){Te(e,(i,o)=>t[i]=o);for(const i of n)delete t[i]}clone(){return new Et(Ke(this.value))}}function _o(r){const t=[];return Te(r.fields,(e,n)=>{const i=new at([e]);if(bn(n)){const o=_o(n.mapValue).fields;if(o.length===0)t.push(i);else for(const u of o)t.push(i.child(u))}else t.push(i)}),new At(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(t,e,n,i,o,u,h){this.key=t,this.documentType=e,this.version=n,this.readTime=i,this.createTime=o,this.data=u,this.documentState=h}static newInvalidDocument(t){return new gt(t,0,L.min(),L.min(),L.min(),Et.empty(),0)}static newFoundDocument(t,e,n,i){return new gt(t,1,e,L.min(),n,i,0)}static newNoDocument(t,e){return new gt(t,2,e,L.min(),L.min(),Et.empty(),0)}static newUnknownDocument(t,e){return new gt(t,3,e,L.min(),L.min(),Et.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(L.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=Et.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=Et.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=L.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof gt&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new gt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fn{constructor(t,e){this.position=t,this.inclusive=e}}function ki(r,t,e){let n=0;for(let i=0;i<r.position.length;i++){const o=t[i],u=r.position[i];if(o.field.isKeyField()?n=M.comparator(M.fromName(u.referenceValue),e.key):n=de(u,e.data.field(o.field)),o.dir==="desc"&&(n*=-1),n!==0)break}return n}function Di(r,t){if(r===null)return t===null;if(t===null||r.inclusive!==t.inclusive||r.position.length!==t.position.length)return!1;for(let e=0;e<r.position.length;e++)if(!Pt(r.position[e],t.position[e]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Un{constructor(t,e="asc"){this.field=t,this.dir=e}}function Lu(r,t){return r.dir===t.dir&&r.field.isEqual(t.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yo{}class tt extends yo{constructor(t,e,n){super(),this.field=t,this.op=e,this.value=n}static create(t,e,n){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,n):new Uu(t,e,n):e==="array-contains"?new ju(t,n):e==="in"?new zu(t,n):e==="not-in"?new Ku(t,n):e==="array-contains-any"?new $u(t,n):new tt(t,e,n)}static createKeyFieldInFilter(t,e,n){return e==="in"?new qu(t,n):new Bu(t,n)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&this.matchesComparison(de(e,this.value)):e!==null&&Zt(this.value)===Zt(e)&&this.matchesComparison(de(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return O()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Vt extends yo{constructor(t,e){super(),this.filters=t,this.op=e,this.ae=null}static create(t,e){return new Vt(t,e)}matches(t){return To(this)?this.filters.find(e=>!e.matches(t))===void 0:this.filters.find(e=>e.matches(t))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function To(r){return r.op==="and"}function Eo(r){return Fu(r)&&To(r)}function Fu(r){for(const t of r.filters)if(t instanceof Vt)return!1;return!0}function Mr(r){if(r instanceof tt)return r.field.canonicalString()+r.op.toString()+me(r.value);if(Eo(r))return r.filters.map(t=>Mr(t)).join(",");{const t=r.filters.map(e=>Mr(e)).join(",");return`${r.op}(${t})`}}function vo(r,t){return r instanceof tt?function(n,i){return i instanceof tt&&n.op===i.op&&n.field.isEqual(i.field)&&Pt(n.value,i.value)}(r,t):r instanceof Vt?function(n,i){return i instanceof Vt&&n.op===i.op&&n.filters.length===i.filters.length?n.filters.reduce((o,u,h)=>o&&vo(u,i.filters[h]),!0):!1}(r,t):void O()}function Io(r){return r instanceof tt?function(e){return`${e.field.canonicalString()} ${e.op} ${me(e.value)}`}(r):r instanceof Vt?function(e){return e.op.toString()+" {"+e.getFilters().map(Io).join(" ,")+"}"}(r):"Filter"}class Uu extends tt{constructor(t,e,n){super(t,e,n),this.key=M.fromName(n.referenceValue)}matches(t){const e=M.comparator(t.key,this.key);return this.matchesComparison(e)}}class qu extends tt{constructor(t,e){super(t,"in",e),this.keys=Ao("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class Bu extends tt{constructor(t,e){super(t,"not-in",e),this.keys=Ao("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function Ao(r,t){var e;return(((e=t.arrayValue)===null||e===void 0?void 0:e.values)||[]).map(n=>M.fromName(n.referenceValue))}class ju extends tt{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return Xr(e)&&Je(e.arrayValue,this.value)}}class zu extends tt{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&Je(this.value.arrayValue,e)}}class Ku extends tt{constructor(t,e){super(t,"not-in",e)}matches(t){if(Je(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&!Je(this.value.arrayValue,e)}}class $u extends tt{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!Xr(e)||!e.arrayValue.values)&&e.arrayValue.values.some(n=>Je(this.value.arrayValue,n))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gu{constructor(t,e=null,n=[],i=[],o=null,u=null,h=null){this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=i,this.limit=o,this.startAt=u,this.endAt=h,this.ue=null}}function Ni(r,t=null,e=[],n=[],i=null,o=null,u=null){return new Gu(r,t,e,n,i,o,u)}function Yr(r){const t=F(r);if(t.ue===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(n=>Mr(n)).join(","),e+="|ob:",e+=t.orderBy.map(n=>function(o){return o.field.canonicalString()+o.dir}(n)).join(","),Qn(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(n=>me(n)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(n=>me(n)).join(",")),t.ue=e}return t.ue}function Jr(r,t){if(r.limit!==t.limit||r.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<r.orderBy.length;e++)if(!Lu(r.orderBy[e],t.orderBy[e]))return!1;if(r.filters.length!==t.filters.length)return!1;for(let e=0;e<r.filters.length;e++)if(!vo(r.filters[e],t.filters[e]))return!1;return r.collectionGroup===t.collectionGroup&&!!r.path.isEqual(t.path)&&!!Di(r.startAt,t.startAt)&&Di(r.endAt,t.endAt)}function Or(r){return M.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wn{constructor(t,e=null,n=[],i=[],o=null,u="F",h=null,f=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=i,this.limit=o,this.limitType=u,this.startAt=h,this.endAt=f,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function Qu(r,t,e,n,i,o,u,h){return new Wn(r,t,e,n,i,o,u,h)}function Zr(r){return new Wn(r)}function bi(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function Wu(r){return r.collectionGroup!==null}function $e(r){const t=F(r);if(t.ce===null){t.ce=[];const e=new Set;for(const o of t.explicitOrderBy)t.ce.push(o),e.add(o.field.canonicalString());const n=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(u){let h=new ut(at.comparator);return u.filters.forEach(f=>{f.getFlattenedFilters().forEach(d=>{d.isInequality()&&(h=h.add(d.field))})}),h})(t).forEach(o=>{e.has(o.canonicalString())||o.isKeyField()||t.ce.push(new Un(o,n))}),e.has(at.keyField().canonicalString())||t.ce.push(new Un(at.keyField(),n))}return t.ce}function wt(r){const t=F(r);return t.le||(t.le=Hu(t,$e(r))),t.le}function Hu(r,t){if(r.limitType==="F")return Ni(r.path,r.collectionGroup,t,r.filters,r.limit,r.startAt,r.endAt);{t=t.map(i=>{const o=i.dir==="desc"?"asc":"desc";return new Un(i.field,o)});const e=r.endAt?new Fn(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new Fn(r.startAt.position,r.startAt.inclusive):null;return Ni(r.path,r.collectionGroup,t,r.filters,r.limit,e,n)}}function Lr(r,t,e){return new Wn(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),t,e,r.startAt,r.endAt)}function Hn(r,t){return Jr(wt(r),wt(t))&&r.limitType===t.limitType}function wo(r){return`${Yr(wt(r))}|lt:${r.limitType}`}function oe(r){return`Query(target=${function(e){let n=e.path.canonicalString();return e.collectionGroup!==null&&(n+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(n+=`, filters: [${e.filters.map(i=>Io(i)).join(", ")}]`),Qn(e.limit)||(n+=", limit: "+e.limit),e.orderBy.length>0&&(n+=`, orderBy: [${e.orderBy.map(i=>function(u){return`${u.field.canonicalString()} (${u.dir})`}(i)).join(", ")}]`),e.startAt&&(n+=", startAt: ",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(i=>me(i)).join(",")),e.endAt&&(n+=", endAt: ",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(i=>me(i)).join(",")),`Target(${n})`}(wt(r))}; limitType=${r.limitType})`}function Xn(r,t){return t.isFoundDocument()&&function(n,i){const o=i.key.path;return n.collectionGroup!==null?i.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(o):M.isDocumentKey(n.path)?n.path.isEqual(o):n.path.isImmediateParentOf(o)}(r,t)&&function(n,i){for(const o of $e(n))if(!o.field.isKeyField()&&i.data.field(o.field)===null)return!1;return!0}(r,t)&&function(n,i){for(const o of n.filters)if(!o.matches(i))return!1;return!0}(r,t)&&function(n,i){return!(n.startAt&&!function(u,h,f){const d=ki(u,h,f);return u.inclusive?d<=0:d<0}(n.startAt,$e(n),i)||n.endAt&&!function(u,h,f){const d=ki(u,h,f);return u.inclusive?d>=0:d>0}(n.endAt,$e(n),i))}(r,t)}function Xu(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function Ro(r){return(t,e)=>{let n=!1;for(const i of $e(r)){const o=Yu(i,t,e);if(o!==0)return o;n=n||i.field.isKeyField()}return 0}}function Yu(r,t,e){const n=r.field.isKeyField()?M.comparator(t.key,e.key):function(o,u,h){const f=u.data.field(o),d=h.data.field(o);return f!==null&&d!==null?de(f,d):O()}(r.field,t,e);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return O()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ee{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),n=this.inner[e];if(n!==void 0){for(const[i,o]of n)if(this.equalsFn(i,t))return o}}has(t){return this.get(t)!==void 0}set(t,e){const n=this.mapKeyFn(t),i=this.inner[n];if(i===void 0)return this.inner[n]=[[t,e]],void this.innerSize++;for(let o=0;o<i.length;o++)if(this.equalsFn(i[o][0],t))return void(i[o]=[t,e]);i.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),n=this.inner[e];if(n===void 0)return!1;for(let i=0;i<n.length;i++)if(this.equalsFn(n[i][0],t))return n.length===1?delete this.inner[e]:n.splice(i,1),this.innerSize--,!0;return!1}forEach(t){Te(this.inner,(e,n)=>{for(const[i,o]of n)t(i,o)})}isEmpty(){return po(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ju=new H(M.comparator);function xt(){return Ju}const Po=new H(M.comparator);function Be(...r){let t=Po;for(const e of r)t=t.insert(e.key,e);return t}function Vo(r){let t=Po;return r.forEach((e,n)=>t=t.insert(e,n.overlayedDocument)),t}function Wt(){return Ge()}function So(){return Ge()}function Ge(){return new Ee(r=>r.toString(),(r,t)=>r.isEqual(t))}const Zu=new H(M.comparator),tl=new ut(M.comparator);function U(...r){let t=tl;for(const e of r)t=t.add(e);return t}const el=new ut(j);function nl(){return el}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ts(r,t){if(r.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Ln(t)?"-0":t}}function Co(r){return{integerValue:""+r}}function rl(r,t){return Nu(t)?Co(t):ts(r,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yn{constructor(){this._=void 0}}function sl(r,t,e){return r instanceof qn?function(i,o){const u={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return o&&Wr(o)&&(o=Hr(o)),o&&(u.fields.__previous_value__=o),{mapValue:u}}(e,t):r instanceof Ze?Do(r,t):r instanceof tn?No(r,t):function(i,o){const u=ko(i,o),h=xi(u)+xi(i.Pe);return xr(u)&&xr(i.Pe)?Co(h):ts(i.serializer,h)}(r,t)}function il(r,t,e){return r instanceof Ze?Do(r,t):r instanceof tn?No(r,t):e}function ko(r,t){return r instanceof Bn?function(n){return xr(n)||function(o){return!!o&&"doubleValue"in o}(n)}(t)?t:{integerValue:0}:null}class qn extends Yn{}class Ze extends Yn{constructor(t){super(),this.elements=t}}function Do(r,t){const e=bo(t);for(const n of r.elements)e.some(i=>Pt(i,n))||e.push(n);return{arrayValue:{values:e}}}class tn extends Yn{constructor(t){super(),this.elements=t}}function No(r,t){let e=bo(t);for(const n of r.elements)e=e.filter(i=>!Pt(i,n));return{arrayValue:{values:e}}}class Bn extends Yn{constructor(t,e){super(),this.serializer=t,this.Pe=e}}function xi(r){return J(r.integerValue||r.doubleValue)}function bo(r){return Xr(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}function ol(r,t){return r.field.isEqual(t.field)&&function(n,i){return n instanceof Ze&&i instanceof Ze||n instanceof tn&&i instanceof tn?fe(n.elements,i.elements,Pt):n instanceof Bn&&i instanceof Bn?Pt(n.Pe,i.Pe):n instanceof qn&&i instanceof qn}(r.transform,t.transform)}class al{constructor(t,e){this.version=t,this.transformResults=e}}class Nt{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new Nt}static exists(t){return new Nt(void 0,t)}static updateTime(t){return new Nt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function xn(r,t){return r.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(r.updateTime):r.exists===void 0||r.exists===t.isFoundDocument()}class Jn{}function xo(r,t){if(!r.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return r.isNoDocument()?new Oo(r.key,Nt.none()):new sn(r.key,r.data,Nt.none());{const e=r.data,n=Et.empty();let i=new ut(at.comparator);for(let o of t.fields)if(!i.has(o)){let u=e.field(o);u===null&&o.length>1&&(o=o.popLast(),u=e.field(o)),u===null?n.delete(o):n.set(o,u),i=i.add(o)}return new te(r.key,n,new At(i.toArray()),Nt.none())}}function ul(r,t,e){r instanceof sn?function(i,o,u){const h=i.value.clone(),f=Oi(i.fieldTransforms,o,u.transformResults);h.setAll(f),o.convertToFoundDocument(u.version,h).setHasCommittedMutations()}(r,t,e):r instanceof te?function(i,o,u){if(!xn(i.precondition,o))return void o.convertToUnknownDocument(u.version);const h=Oi(i.fieldTransforms,o,u.transformResults),f=o.data;f.setAll(Mo(i)),f.setAll(h),o.convertToFoundDocument(u.version,f).setHasCommittedMutations()}(r,t,e):function(i,o,u){o.convertToNoDocument(u.version).setHasCommittedMutations()}(0,t,e)}function Qe(r,t,e,n){return r instanceof sn?function(o,u,h,f){if(!xn(o.precondition,u))return h;const d=o.value.clone(),_=Li(o.fieldTransforms,f,u);return d.setAll(_),u.convertToFoundDocument(u.version,d).setHasLocalMutations(),null}(r,t,e,n):r instanceof te?function(o,u,h,f){if(!xn(o.precondition,u))return h;const d=Li(o.fieldTransforms,f,u),_=u.data;return _.setAll(Mo(o)),_.setAll(d),u.convertToFoundDocument(u.version,_).setHasLocalMutations(),h===null?null:h.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(A=>A.field))}(r,t,e,n):function(o,u,h){return xn(o.precondition,u)?(u.convertToNoDocument(u.version).setHasLocalMutations(),null):h}(r,t,e)}function ll(r,t){let e=null;for(const n of r.fieldTransforms){const i=t.data.field(n.field),o=ko(n.transform,i||null);o!=null&&(e===null&&(e=Et.empty()),e.set(n.field,o))}return e||null}function Mi(r,t){return r.type===t.type&&!!r.key.isEqual(t.key)&&!!r.precondition.isEqual(t.precondition)&&!!function(n,i){return n===void 0&&i===void 0||!(!n||!i)&&fe(n,i,(o,u)=>ol(o,u))}(r.fieldTransforms,t.fieldTransforms)&&(r.type===0?r.value.isEqual(t.value):r.type!==1||r.data.isEqual(t.data)&&r.fieldMask.isEqual(t.fieldMask))}class sn extends Jn{constructor(t,e,n,i=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class te extends Jn{constructor(t,e,n,i,o=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=i,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function Mo(r){const t=new Map;return r.fieldMask.fields.forEach(e=>{if(!e.isEmpty()){const n=r.data.field(e);t.set(e,n)}}),t}function Oi(r,t,e){const n=new Map;K(r.length===e.length);for(let i=0;i<e.length;i++){const o=r[i],u=o.transform,h=t.data.field(o.field);n.set(o.field,il(u,h,e[i]))}return n}function Li(r,t,e){const n=new Map;for(const i of r){const o=i.transform,u=e.data.field(i.field);n.set(i.field,sl(o,u,t))}return n}class Oo extends Jn{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class hl extends Jn{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cl{constructor(t,e,n,i){this.batchId=t,this.localWriteTime=e,this.baseMutations=n,this.mutations=i}applyToRemoteDocument(t,e){const n=e.mutationResults;for(let i=0;i<this.mutations.length;i++){const o=this.mutations[i];o.key.isEqual(t.key)&&ul(o,t,n[i])}}applyToLocalView(t,e){for(const n of this.baseMutations)n.key.isEqual(t.key)&&(e=Qe(n,t,e,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(t.key)&&(e=Qe(n,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const n=So();return this.mutations.forEach(i=>{const o=t.get(i.key),u=o.overlayedDocument;let h=this.applyToLocalView(u,o.mutatedFields);h=e.has(i.key)?null:h;const f=xo(u,h);f!==null&&n.set(i.key,f),u.isValidDocument()||u.convertToNoDocument(L.min())}),n}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),U())}isEqual(t){return this.batchId===t.batchId&&fe(this.mutations,t.mutations,(e,n)=>Mi(e,n))&&fe(this.baseMutations,t.baseMutations,(e,n)=>Mi(e,n))}}class es{constructor(t,e,n,i){this.batch=t,this.commitVersion=e,this.mutationResults=n,this.docVersions=i}static from(t,e,n){K(t.mutations.length===n.length);let i=function(){return Zu}();const o=t.mutations;for(let u=0;u<o.length;u++)i=i.insert(o[u].key,n[u].version);return new es(t,e,n,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fl{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dl{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Z,q;function ml(r){switch(r){default:return O();case V.CANCELLED:case V.UNKNOWN:case V.DEADLINE_EXCEEDED:case V.RESOURCE_EXHAUSTED:case V.INTERNAL:case V.UNAVAILABLE:case V.UNAUTHENTICATED:return!1;case V.INVALID_ARGUMENT:case V.NOT_FOUND:case V.ALREADY_EXISTS:case V.PERMISSION_DENIED:case V.FAILED_PRECONDITION:case V.ABORTED:case V.OUT_OF_RANGE:case V.UNIMPLEMENTED:case V.DATA_LOSS:return!0}}function Lo(r){if(r===void 0)return bt("GRPC error has no .code"),V.UNKNOWN;switch(r){case Z.OK:return V.OK;case Z.CANCELLED:return V.CANCELLED;case Z.UNKNOWN:return V.UNKNOWN;case Z.DEADLINE_EXCEEDED:return V.DEADLINE_EXCEEDED;case Z.RESOURCE_EXHAUSTED:return V.RESOURCE_EXHAUSTED;case Z.INTERNAL:return V.INTERNAL;case Z.UNAVAILABLE:return V.UNAVAILABLE;case Z.UNAUTHENTICATED:return V.UNAUTHENTICATED;case Z.INVALID_ARGUMENT:return V.INVALID_ARGUMENT;case Z.NOT_FOUND:return V.NOT_FOUND;case Z.ALREADY_EXISTS:return V.ALREADY_EXISTS;case Z.PERMISSION_DENIED:return V.PERMISSION_DENIED;case Z.FAILED_PRECONDITION:return V.FAILED_PRECONDITION;case Z.ABORTED:return V.ABORTED;case Z.OUT_OF_RANGE:return V.OUT_OF_RANGE;case Z.UNIMPLEMENTED:return V.UNIMPLEMENTED;case Z.DATA_LOSS:return V.DATA_LOSS;default:return O()}}(q=Z||(Z={}))[q.OK=0]="OK",q[q.CANCELLED=1]="CANCELLED",q[q.UNKNOWN=2]="UNKNOWN",q[q.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",q[q.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",q[q.NOT_FOUND=5]="NOT_FOUND",q[q.ALREADY_EXISTS=6]="ALREADY_EXISTS",q[q.PERMISSION_DENIED=7]="PERMISSION_DENIED",q[q.UNAUTHENTICATED=16]="UNAUTHENTICATED",q[q.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",q[q.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",q[q.ABORTED=10]="ABORTED",q[q.OUT_OF_RANGE=11]="OUT_OF_RANGE",q[q.UNIMPLEMENTED=12]="UNIMPLEMENTED",q[q.INTERNAL=13]="INTERNAL",q[q.UNAVAILABLE=14]="UNAVAILABLE",q[q.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pl(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gl=new Ht([4294967295,4294967295],0);function Fi(r){const t=pl().encode(r),e=new oo;return e.update(t),new Uint8Array(e.digest())}function Ui(r){const t=new DataView(r.buffer),e=t.getUint32(0,!0),n=t.getUint32(4,!0),i=t.getUint32(8,!0),o=t.getUint32(12,!0);return[new Ht([e,n],0),new Ht([i,o],0)]}class ns{constructor(t,e,n){if(this.bitmap=t,this.padding=e,this.hashCount=n,e<0||e>=8)throw new je(`Invalid padding: ${e}`);if(n<0)throw new je(`Invalid hash count: ${n}`);if(t.length>0&&this.hashCount===0)throw new je(`Invalid hash count: ${n}`);if(t.length===0&&e!==0)throw new je(`Invalid padding when bitmap length is 0: ${e}`);this.Ie=8*t.length-e,this.Te=Ht.fromNumber(this.Ie)}Ee(t,e,n){let i=t.add(e.multiply(Ht.fromNumber(n)));return i.compare(gl)===1&&(i=new Ht([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Te).toNumber()}de(t){return(this.bitmap[Math.floor(t/8)]&1<<t%8)!=0}mightContain(t){if(this.Ie===0)return!1;const e=Fi(t),[n,i]=Ui(e);for(let o=0;o<this.hashCount;o++){const u=this.Ee(n,i,o);if(!this.de(u))return!1}return!0}static create(t,e,n){const i=t%8==0?0:8-t%8,o=new Uint8Array(Math.ceil(t/8)),u=new ns(o,i,e);return n.forEach(h=>u.insert(h)),u}insert(t){if(this.Ie===0)return;const e=Fi(t),[n,i]=Ui(e);for(let o=0;o<this.hashCount;o++){const u=this.Ee(n,i,o);this.Ae(u)}}Ae(t){const e=Math.floor(t/8),n=t%8;this.bitmap[e]|=1<<n}}class je extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zn{constructor(t,e,n,i,o){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=n,this.documentUpdates=i,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(t,e,n){const i=new Map;return i.set(t,on.createSynthesizedTargetChangeForCurrentChange(t,e,n)),new Zn(L.min(),i,new H(j),xt(),U())}}class on{constructor(t,e,n,i,o){this.resumeToken=t,this.current=e,this.addedDocuments=n,this.modifiedDocuments=i,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(t,e,n){return new on(n,e,U(),U(),U())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mn{constructor(t,e,n,i){this.Re=t,this.removedTargetIds=e,this.key=n,this.Ve=i}}class Fo{constructor(t,e){this.targetId=t,this.me=e}}class Uo{constructor(t,e,n=lt.EMPTY_BYTE_STRING,i=null){this.state=t,this.targetIds=e,this.resumeToken=n,this.cause=i}}class qi{constructor(){this.fe=0,this.ge=ji(),this.pe=lt.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(t){t.approximateByteSize()>0&&(this.we=!0,this.pe=t)}ve(){let t=U(),e=U(),n=U();return this.ge.forEach((i,o)=>{switch(o){case 0:t=t.add(i);break;case 2:e=e.add(i);break;case 1:n=n.add(i);break;default:O()}}),new on(this.pe,this.ye,t,e,n)}Ce(){this.we=!1,this.ge=ji()}Fe(t,e){this.we=!0,this.ge=this.ge.insert(t,e)}Me(t){this.we=!0,this.ge=this.ge.remove(t)}xe(){this.fe+=1}Oe(){this.fe-=1,K(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class _l{constructor(t){this.Le=t,this.Be=new Map,this.ke=xt(),this.qe=Bi(),this.Qe=new H(j)}Ke(t){for(const e of t.Re)t.Ve&&t.Ve.isFoundDocument()?this.$e(e,t.Ve):this.Ue(e,t.key,t.Ve);for(const e of t.removedTargetIds)this.Ue(e,t.key,t.Ve)}We(t){this.forEachTarget(t,e=>{const n=this.Ge(e);switch(t.state){case 0:this.ze(e)&&n.De(t.resumeToken);break;case 1:n.Oe(),n.Se||n.Ce(),n.De(t.resumeToken);break;case 2:n.Oe(),n.Se||this.removeTarget(e);break;case 3:this.ze(e)&&(n.Ne(),n.De(t.resumeToken));break;case 4:this.ze(e)&&(this.je(e),n.De(t.resumeToken));break;default:O()}})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.Be.forEach((n,i)=>{this.ze(i)&&e(i)})}He(t){const e=t.targetId,n=t.me.count,i=this.Je(e);if(i){const o=i.target;if(Or(o))if(n===0){const u=new M(o.path);this.Ue(e,u,gt.newNoDocument(u,L.min()))}else K(n===1);else{const u=this.Ye(e);if(u!==n){const h=this.Ze(t),f=h?this.Xe(h,t,u):1;if(f!==0){this.je(e);const d=f===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(e,d)}}}}}Ze(t){const e=t.me.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:n="",padding:i=0},hashCount:o=0}=e;let u,h;try{u=Jt(n).toUint8Array()}catch(f){if(f instanceof go)return ce("Decoding the base64 bloom filter in existence filter failed ("+f.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw f}try{h=new ns(u,i,o)}catch(f){return ce(f instanceof je?"BloomFilter error: ":"Applying bloom filter failed: ",f),null}return h.Ie===0?null:h}Xe(t,e,n){return e.me.count===n-this.nt(t,e.targetId)?0:2}nt(t,e){const n=this.Le.getRemoteKeysForTarget(e);let i=0;return n.forEach(o=>{const u=this.Le.tt(),h=`projects/${u.projectId}/databases/${u.database}/documents/${o.path.canonicalString()}`;t.mightContain(h)||(this.Ue(e,o,null),i++)}),i}rt(t){const e=new Map;this.Be.forEach((o,u)=>{const h=this.Je(u);if(h){if(o.current&&Or(h.target)){const f=new M(h.target.path);this.ke.get(f)!==null||this.it(u,f)||this.Ue(u,f,gt.newNoDocument(f,t))}o.be&&(e.set(u,o.ve()),o.Ce())}});let n=U();this.qe.forEach((o,u)=>{let h=!0;u.forEachWhile(f=>{const d=this.Je(f);return!d||d.purpose==="TargetPurposeLimboResolution"||(h=!1,!1)}),h&&(n=n.add(o))}),this.ke.forEach((o,u)=>u.setReadTime(t));const i=new Zn(t,e,this.Qe,this.ke,n);return this.ke=xt(),this.qe=Bi(),this.Qe=new H(j),i}$e(t,e){if(!this.ze(t))return;const n=this.it(t,e.key)?2:0;this.Ge(t).Fe(e.key,n),this.ke=this.ke.insert(e.key,e),this.qe=this.qe.insert(e.key,this.st(e.key).add(t))}Ue(t,e,n){if(!this.ze(t))return;const i=this.Ge(t);this.it(t,e)?i.Fe(e,1):i.Me(e),this.qe=this.qe.insert(e,this.st(e).delete(t)),n&&(this.ke=this.ke.insert(e,n))}removeTarget(t){this.Be.delete(t)}Ye(t){const e=this.Ge(t).ve();return this.Le.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}xe(t){this.Ge(t).xe()}Ge(t){let e=this.Be.get(t);return e||(e=new qi,this.Be.set(t,e)),e}st(t){let e=this.qe.get(t);return e||(e=new ut(j),this.qe=this.qe.insert(t,e)),e}ze(t){const e=this.Je(t)!==null;return e||N("WatchChangeAggregator","Detected inactive target",t),e}Je(t){const e=this.Be.get(t);return e&&e.Se?null:this.Le.ot(t)}je(t){this.Be.set(t,new qi),this.Le.getRemoteKeysForTarget(t).forEach(e=>{this.Ue(t,e,null)})}it(t,e){return this.Le.getRemoteKeysForTarget(t).has(e)}}function Bi(){return new H(M.comparator)}function ji(){return new H(M.comparator)}const yl={asc:"ASCENDING",desc:"DESCENDING"},Tl={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},El={and:"AND",or:"OR"};class vl{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function Fr(r,t){return r.useProto3Json||Qn(t)?t:{value:t}}function jn(r,t){return r.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function qo(r,t){return r.useProto3Json?t.toBase64():t.toUint8Array()}function Il(r,t){return jn(r,t.toTimestamp())}function Rt(r){return K(!!r),L.fromTimestamp(function(e){const n=jt(e);return new et(n.seconds,n.nanos)}(r))}function rs(r,t){return Ur(r,t).canonicalString()}function Ur(r,t){const e=function(i){return new Y(["projects",i.projectId,"databases",i.database])}(r).child("documents");return t===void 0?e:e.child(t)}function Bo(r){const t=Y.fromString(r);return K(Go(t)),t}function qr(r,t){return rs(r.databaseId,t.path)}function Sr(r,t){const e=Bo(t);if(e.get(1)!==r.databaseId.projectId)throw new x(V.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+r.databaseId.projectId);if(e.get(3)!==r.databaseId.database)throw new x(V.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+r.databaseId.database);return new M(zo(e))}function jo(r,t){return rs(r.databaseId,t)}function Al(r){const t=Bo(r);return t.length===4?Y.emptyPath():zo(t)}function Br(r){return new Y(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function zo(r){return K(r.length>4&&r.get(4)==="documents"),r.popFirst(5)}function zi(r,t,e){return{name:qr(r,t),fields:e.value.mapValue.fields}}function wl(r,t){let e;if("targetChange"in t){t.targetChange;const n=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:O()}(t.targetChange.targetChangeType||"NO_CHANGE"),i=t.targetChange.targetIds||[],o=function(d,_){return d.useProto3Json?(K(_===void 0||typeof _=="string"),lt.fromBase64String(_||"")):(K(_===void 0||_ instanceof Buffer||_ instanceof Uint8Array),lt.fromUint8Array(_||new Uint8Array))}(r,t.targetChange.resumeToken),u=t.targetChange.cause,h=u&&function(d){const _=d.code===void 0?V.UNKNOWN:Lo(d.code);return new x(_,d.message||"")}(u);e=new Uo(n,i,o,h||null)}else if("documentChange"in t){t.documentChange;const n=t.documentChange;n.document,n.document.name,n.document.updateTime;const i=Sr(r,n.document.name),o=Rt(n.document.updateTime),u=n.document.createTime?Rt(n.document.createTime):L.min(),h=new Et({mapValue:{fields:n.document.fields}}),f=gt.newFoundDocument(i,o,u,h),d=n.targetIds||[],_=n.removedTargetIds||[];e=new Mn(d,_,f.key,f)}else if("documentDelete"in t){t.documentDelete;const n=t.documentDelete;n.document;const i=Sr(r,n.document),o=n.readTime?Rt(n.readTime):L.min(),u=gt.newNoDocument(i,o),h=n.removedTargetIds||[];e=new Mn([],h,u.key,u)}else if("documentRemove"in t){t.documentRemove;const n=t.documentRemove;n.document;const i=Sr(r,n.document),o=n.removedTargetIds||[];e=new Mn([],o,i,null)}else{if(!("filter"in t))return O();{t.filter;const n=t.filter;n.targetId;const{count:i=0,unchangedNames:o}=n,u=new dl(i,o),h=n.targetId;e=new Fo(h,u)}}return e}function Rl(r,t){let e;if(t instanceof sn)e={update:zi(r,t.key,t.value)};else if(t instanceof Oo)e={delete:qr(r,t.key)};else if(t instanceof te)e={update:zi(r,t.key,t.data),updateMask:xl(t.fieldMask)};else{if(!(t instanceof hl))return O();e={verify:qr(r,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map(n=>function(o,u){const h=u.transform;if(h instanceof qn)return{fieldPath:u.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(h instanceof Ze)return{fieldPath:u.field.canonicalString(),appendMissingElements:{values:h.elements}};if(h instanceof tn)return{fieldPath:u.field.canonicalString(),removeAllFromArray:{values:h.elements}};if(h instanceof Bn)return{fieldPath:u.field.canonicalString(),increment:h.Pe};throw O()}(0,n))),t.precondition.isNone||(e.currentDocument=function(i,o){return o.updateTime!==void 0?{updateTime:Il(i,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:O()}(r,t.precondition)),e}function Pl(r,t){return r&&r.length>0?(K(t!==void 0),r.map(e=>function(i,o){let u=i.updateTime?Rt(i.updateTime):Rt(o);return u.isEqual(L.min())&&(u=Rt(o)),new al(u,i.transformResults||[])}(e,t))):[]}function Vl(r,t){return{documents:[jo(r,t.path)]}}function Sl(r,t){const e={structuredQuery:{}},n=t.path;let i;t.collectionGroup!==null?(i=n,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(i=n.popLast(),e.structuredQuery.from=[{collectionId:n.lastSegment()}]),e.parent=jo(r,i);const o=function(d){if(d.length!==0)return $o(Vt.create(d,"and"))}(t.filters);o&&(e.structuredQuery.where=o);const u=function(d){if(d.length!==0)return d.map(_=>function(R){return{field:ae(R.field),direction:Dl(R.dir)}}(_))}(t.orderBy);u&&(e.structuredQuery.orderBy=u);const h=Fr(r,t.limit);return h!==null&&(e.structuredQuery.limit=h),t.startAt&&(e.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(t.startAt)),t.endAt&&(e.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(t.endAt)),{_t:e,parent:i}}function Cl(r){let t=Al(r.parent);const e=r.structuredQuery,n=e.from?e.from.length:0;let i=null;if(n>0){K(n===1);const _=e.from[0];_.allDescendants?i=_.collectionId:t=t.child(_.collectionId)}let o=[];e.where&&(o=function(A){const R=Ko(A);return R instanceof Vt&&Eo(R)?R.getFilters():[R]}(e.where));let u=[];e.orderBy&&(u=function(A){return A.map(R=>function(D){return new Un(ue(D.field),function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(D.direction))}(R))}(e.orderBy));let h=null;e.limit&&(h=function(A){let R;return R=typeof A=="object"?A.value:A,Qn(R)?null:R}(e.limit));let f=null;e.startAt&&(f=function(A){const R=!!A.before,S=A.values||[];return new Fn(S,R)}(e.startAt));let d=null;return e.endAt&&(d=function(A){const R=!A.before,S=A.values||[];return new Fn(S,R)}(e.endAt)),Qu(t,i,u,o,h,"F",f,d)}function kl(r,t){const e=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return O()}}(t.purpose);return e==null?null:{"goog-listen-tags":e}}function Ko(r){return r.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const n=ue(e.unaryFilter.field);return tt.create(n,"==",{doubleValue:NaN});case"IS_NULL":const i=ue(e.unaryFilter.field);return tt.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=ue(e.unaryFilter.field);return tt.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const u=ue(e.unaryFilter.field);return tt.create(u,"!=",{nullValue:"NULL_VALUE"});default:return O()}}(r):r.fieldFilter!==void 0?function(e){return tt.create(ue(e.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return O()}}(e.fieldFilter.op),e.fieldFilter.value)}(r):r.compositeFilter!==void 0?function(e){return Vt.create(e.compositeFilter.filters.map(n=>Ko(n)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return O()}}(e.compositeFilter.op))}(r):O()}function Dl(r){return yl[r]}function Nl(r){return Tl[r]}function bl(r){return El[r]}function ae(r){return{fieldPath:r.canonicalString()}}function ue(r){return at.fromServerFormat(r.fieldPath)}function $o(r){return r instanceof tt?function(e){if(e.op==="=="){if(Ci(e.value))return{unaryFilter:{field:ae(e.field),op:"IS_NAN"}};if(Si(e.value))return{unaryFilter:{field:ae(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(Ci(e.value))return{unaryFilter:{field:ae(e.field),op:"IS_NOT_NAN"}};if(Si(e.value))return{unaryFilter:{field:ae(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:ae(e.field),op:Nl(e.op),value:e.value}}}(r):r instanceof Vt?function(e){const n=e.getFilters().map(i=>$o(i));return n.length===1?n[0]:{compositeFilter:{op:bl(e.op),filters:n}}}(r):O()}function xl(r){const t=[];return r.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function Go(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt{constructor(t,e,n,i,o=L.min(),u=L.min(),h=lt.EMPTY_BYTE_STRING,f=null){this.target=t,this.targetId=e,this.purpose=n,this.sequenceNumber=i,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=u,this.resumeToken=h,this.expectedCount=f}withSequenceNumber(t){return new qt(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new qt(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new qt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new qt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ml{constructor(t){this.ct=t}}function Ol(r){const t=Cl({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?Lr(t,t.limit,"L"):t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ll{constructor(){this.un=new Fl}addToCollectionParentIndex(t,e){return this.un.add(e),P.resolve()}getCollectionParents(t,e){return P.resolve(this.un.getEntries(e))}addFieldIndex(t,e){return P.resolve()}deleteFieldIndex(t,e){return P.resolve()}deleteAllFieldIndexes(t){return P.resolve()}createTargetIndexes(t,e){return P.resolve()}getDocumentsMatchingTarget(t,e){return P.resolve(null)}getIndexType(t,e){return P.resolve(0)}getFieldIndexes(t,e){return P.resolve([])}getNextCollectionGroupToUpdate(t){return P.resolve(null)}getMinOffset(t,e){return P.resolve(Bt.min())}getMinOffsetFromCollectionGroup(t,e){return P.resolve(Bt.min())}updateCollectionGroup(t,e,n){return P.resolve()}updateIndexEntries(t,e){return P.resolve()}}class Fl{constructor(){this.index={}}add(t){const e=t.lastSegment(),n=t.popLast(),i=this.index[e]||new ut(Y.comparator),o=!i.has(n);return this.index[e]=i.add(n),o}has(t){const e=t.lastSegment(),n=t.popLast(),i=this.index[e];return i&&i.has(n)}getEntries(t){return(this.index[t]||new ut(Y.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pe{constructor(t){this.Ln=t}next(){return this.Ln+=2,this.Ln}static Bn(){return new pe(0)}static kn(){return new pe(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ul{constructor(){this.changes=new Ee(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,gt.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const n=this.changes.get(e);return n!==void 0?P.resolve(n):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ql{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bl{constructor(t,e,n,i){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=n,this.indexManager=i}getDocument(t,e){let n=null;return this.documentOverlayCache.getOverlay(t,e).next(i=>(n=i,this.remoteDocumentCache.getEntry(t,e))).next(i=>(n!==null&&Qe(n.mutation,i,At.empty(),et.now()),i))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(n=>this.getLocalViewOfDocuments(t,n,U()).next(()=>n))}getLocalViewOfDocuments(t,e,n=U()){const i=Wt();return this.populateOverlays(t,i,e).next(()=>this.computeViews(t,e,i,n).next(o=>{let u=Be();return o.forEach((h,f)=>{u=u.insert(h,f.overlayedDocument)}),u}))}getOverlayedDocuments(t,e){const n=Wt();return this.populateOverlays(t,n,e).next(()=>this.computeViews(t,e,n,U()))}populateOverlays(t,e,n){const i=[];return n.forEach(o=>{e.has(o)||i.push(o)}),this.documentOverlayCache.getOverlays(t,i).next(o=>{o.forEach((u,h)=>{e.set(u,h)})})}computeViews(t,e,n,i){let o=xt();const u=Ge(),h=function(){return Ge()}();return e.forEach((f,d)=>{const _=n.get(d.key);i.has(d.key)&&(_===void 0||_.mutation instanceof te)?o=o.insert(d.key,d):_!==void 0?(u.set(d.key,_.mutation.getFieldMask()),Qe(_.mutation,d,_.mutation.getFieldMask(),et.now())):u.set(d.key,At.empty())}),this.recalculateAndSaveOverlays(t,o).next(f=>(f.forEach((d,_)=>u.set(d,_)),e.forEach((d,_)=>{var A;return h.set(d,new ql(_,(A=u.get(d))!==null&&A!==void 0?A:null))}),h))}recalculateAndSaveOverlays(t,e){const n=Ge();let i=new H((u,h)=>u-h),o=U();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(u=>{for(const h of u)h.keys().forEach(f=>{const d=e.get(f);if(d===null)return;let _=n.get(f)||At.empty();_=h.applyToLocalView(d,_),n.set(f,_);const A=(i.get(h.batchId)||U()).add(f);i=i.insert(h.batchId,A)})}).next(()=>{const u=[],h=i.getReverseIterator();for(;h.hasNext();){const f=h.getNext(),d=f.key,_=f.value,A=So();_.forEach(R=>{if(!o.has(R)){const S=xo(e.get(R),n.get(R));S!==null&&A.set(R,S),o=o.add(R)}}),u.push(this.documentOverlayCache.saveOverlays(t,d,A))}return P.waitFor(u)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(n=>this.recalculateAndSaveOverlays(t,n))}getDocumentsMatchingQuery(t,e,n,i){return function(u){return M.isDocumentKey(u.path)&&u.collectionGroup===null&&u.filters.length===0}(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):Wu(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,n,i):this.getDocumentsMatchingCollectionQuery(t,e,n,i)}getNextDocuments(t,e,n,i){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,n,i).next(o=>{const u=i-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,n.largestBatchId,i-o.size):P.resolve(Wt());let h=-1,f=o;return u.next(d=>P.forEach(d,(_,A)=>(h<A.largestBatchId&&(h=A.largestBatchId),o.get(_)?P.resolve():this.remoteDocumentCache.getEntry(t,_).next(R=>{f=f.insert(_,R)}))).next(()=>this.populateOverlays(t,d,o)).next(()=>this.computeViews(t,f,d,U())).next(_=>({batchId:h,changes:Vo(_)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new M(e)).next(n=>{let i=Be();return n.isFoundDocument()&&(i=i.insert(n.key,n)),i})}getDocumentsMatchingCollectionGroupQuery(t,e,n,i){const o=e.collectionGroup;let u=Be();return this.indexManager.getCollectionParents(t,o).next(h=>P.forEach(h,f=>{const d=function(A,R){return new Wn(R,null,A.explicitOrderBy.slice(),A.filters.slice(),A.limit,A.limitType,A.startAt,A.endAt)}(e,f.child(o));return this.getDocumentsMatchingCollectionQuery(t,d,n,i).next(_=>{_.forEach((A,R)=>{u=u.insert(A,R)})})}).next(()=>u))}getDocumentsMatchingCollectionQuery(t,e,n,i){let o;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,n.largestBatchId).next(u=>(o=u,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,n,o,i))).next(u=>{o.forEach((f,d)=>{const _=d.getKey();u.get(_)===null&&(u=u.insert(_,gt.newInvalidDocument(_)))});let h=Be();return u.forEach((f,d)=>{const _=o.get(f);_!==void 0&&Qe(_.mutation,d,At.empty(),et.now()),Xn(e,d)&&(h=h.insert(f,d))}),h})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jl{constructor(t){this.serializer=t,this.hr=new Map,this.Pr=new Map}getBundleMetadata(t,e){return P.resolve(this.hr.get(e))}saveBundleMetadata(t,e){return this.hr.set(e.id,function(i){return{id:i.id,version:i.version,createTime:Rt(i.createTime)}}(e)),P.resolve()}getNamedQuery(t,e){return P.resolve(this.Pr.get(e))}saveNamedQuery(t,e){return this.Pr.set(e.name,function(i){return{name:i.name,query:Ol(i.bundledQuery),readTime:Rt(i.readTime)}}(e)),P.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zl{constructor(){this.overlays=new H(M.comparator),this.Ir=new Map}getOverlay(t,e){return P.resolve(this.overlays.get(e))}getOverlays(t,e){const n=Wt();return P.forEach(e,i=>this.getOverlay(t,i).next(o=>{o!==null&&n.set(i,o)})).next(()=>n)}saveOverlays(t,e,n){return n.forEach((i,o)=>{this.ht(t,e,o)}),P.resolve()}removeOverlaysForBatchId(t,e,n){const i=this.Ir.get(n);return i!==void 0&&(i.forEach(o=>this.overlays=this.overlays.remove(o)),this.Ir.delete(n)),P.resolve()}getOverlaysForCollection(t,e,n){const i=Wt(),o=e.length+1,u=new M(e.child("")),h=this.overlays.getIteratorFrom(u);for(;h.hasNext();){const f=h.getNext().value,d=f.getKey();if(!e.isPrefixOf(d.path))break;d.path.length===o&&f.largestBatchId>n&&i.set(f.getKey(),f)}return P.resolve(i)}getOverlaysForCollectionGroup(t,e,n,i){let o=new H((d,_)=>d-_);const u=this.overlays.getIterator();for(;u.hasNext();){const d=u.getNext().value;if(d.getKey().getCollectionGroup()===e&&d.largestBatchId>n){let _=o.get(d.largestBatchId);_===null&&(_=Wt(),o=o.insert(d.largestBatchId,_)),_.set(d.getKey(),d)}}const h=Wt(),f=o.getIterator();for(;f.hasNext()&&(f.getNext().value.forEach((d,_)=>h.set(d,_)),!(h.size()>=i)););return P.resolve(h)}ht(t,e,n){const i=this.overlays.get(n.key);if(i!==null){const u=this.Ir.get(i.largestBatchId).delete(n.key);this.Ir.set(i.largestBatchId,u)}this.overlays=this.overlays.insert(n.key,new fl(e,n));let o=this.Ir.get(e);o===void 0&&(o=U(),this.Ir.set(e,o)),this.Ir.set(e,o.add(n.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kl{constructor(){this.sessionToken=lt.EMPTY_BYTE_STRING}getSessionToken(t){return P.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,P.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ss{constructor(){this.Tr=new ut(rt.Er),this.dr=new ut(rt.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(t,e){const n=new rt(t,e);this.Tr=this.Tr.add(n),this.dr=this.dr.add(n)}Rr(t,e){t.forEach(n=>this.addReference(n,e))}removeReference(t,e){this.Vr(new rt(t,e))}mr(t,e){t.forEach(n=>this.removeReference(n,e))}gr(t){const e=new M(new Y([])),n=new rt(e,t),i=new rt(e,t+1),o=[];return this.dr.forEachInRange([n,i],u=>{this.Vr(u),o.push(u.key)}),o}pr(){this.Tr.forEach(t=>this.Vr(t))}Vr(t){this.Tr=this.Tr.delete(t),this.dr=this.dr.delete(t)}yr(t){const e=new M(new Y([])),n=new rt(e,t),i=new rt(e,t+1);let o=U();return this.dr.forEachInRange([n,i],u=>{o=o.add(u.key)}),o}containsKey(t){const e=new rt(t,0),n=this.Tr.firstAfterOrEqual(e);return n!==null&&t.isEqual(n.key)}}class rt{constructor(t,e){this.key=t,this.wr=e}static Er(t,e){return M.comparator(t.key,e.key)||j(t.wr,e.wr)}static Ar(t,e){return j(t.wr,e.wr)||M.comparator(t.key,e.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $l{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.Sr=1,this.br=new ut(rt.Er)}checkEmpty(t){return P.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,n,i){const o=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const u=new cl(o,e,n,i);this.mutationQueue.push(u);for(const h of i)this.br=this.br.add(new rt(h.key,o)),this.indexManager.addToCollectionParentIndex(t,h.key.path.popLast());return P.resolve(u)}lookupMutationBatch(t,e){return P.resolve(this.Dr(e))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,i=this.vr(n),o=i<0?0:i;return P.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return P.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(t){return P.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const n=new rt(e,0),i=new rt(e,Number.POSITIVE_INFINITY),o=[];return this.br.forEachInRange([n,i],u=>{const h=this.Dr(u.wr);o.push(h)}),P.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new ut(j);return e.forEach(i=>{const o=new rt(i,0),u=new rt(i,Number.POSITIVE_INFINITY);this.br.forEachInRange([o,u],h=>{n=n.add(h.wr)})}),P.resolve(this.Cr(n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,i=n.length+1;let o=n;M.isDocumentKey(o)||(o=o.child(""));const u=new rt(new M(o),0);let h=new ut(j);return this.br.forEachWhile(f=>{const d=f.key.path;return!!n.isPrefixOf(d)&&(d.length===i&&(h=h.add(f.wr)),!0)},u),P.resolve(this.Cr(h))}Cr(t){const e=[];return t.forEach(n=>{const i=this.Dr(n);i!==null&&e.push(i)}),e}removeMutationBatch(t,e){K(this.Fr(e.batchId,"removed")===0),this.mutationQueue.shift();let n=this.br;return P.forEach(e.mutations,i=>{const o=new rt(i.key,e.batchId);return n=n.delete(o),this.referenceDelegate.markPotentiallyOrphaned(t,i.key)}).next(()=>{this.br=n})}On(t){}containsKey(t,e){const n=new rt(e,0),i=this.br.firstAfterOrEqual(n);return P.resolve(e.isEqual(i&&i.key))}performConsistencyCheck(t){return this.mutationQueue.length,P.resolve()}Fr(t,e){return this.vr(t)}vr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Dr(t){const e=this.vr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gl{constructor(t){this.Mr=t,this.docs=function(){return new H(M.comparator)}(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const n=e.key,i=this.docs.get(n),o=i?i.size:0,u=this.Mr(e);return this.docs=this.docs.insert(n,{document:e.mutableCopy(),size:u}),this.size+=u-o,this.indexManager.addToCollectionParentIndex(t,n.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const n=this.docs.get(e);return P.resolve(n?n.document.mutableCopy():gt.newInvalidDocument(e))}getEntries(t,e){let n=xt();return e.forEach(i=>{const o=this.docs.get(i);n=n.insert(i,o?o.document.mutableCopy():gt.newInvalidDocument(i))}),P.resolve(n)}getDocumentsMatchingQuery(t,e,n,i){let o=xt();const u=e.path,h=new M(u.child("")),f=this.docs.getIteratorFrom(h);for(;f.hasNext();){const{key:d,value:{document:_}}=f.getNext();if(!u.isPrefixOf(d.path))break;d.path.length>u.length+1||Su(Vu(_),n)<=0||(i.has(_.key)||Xn(e,_))&&(o=o.insert(_.key,_.mutableCopy()))}return P.resolve(o)}getAllFromCollectionGroup(t,e,n,i){O()}Or(t,e){return P.forEach(this.docs,n=>e(n))}newChangeBuffer(t){return new Ql(this)}getSize(t){return P.resolve(this.size)}}class Ql extends Ul{constructor(t){super(),this.cr=t}applyChanges(t){const e=[];return this.changes.forEach((n,i)=>{i.isValidDocument()?e.push(this.cr.addEntry(t,i)):this.cr.removeEntry(n)}),P.waitFor(e)}getFromCache(t,e){return this.cr.getEntry(t,e)}getAllFromCache(t,e){return this.cr.getEntries(t,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wl{constructor(t){this.persistence=t,this.Nr=new Ee(e=>Yr(e),Jr),this.lastRemoteSnapshotVersion=L.min(),this.highestTargetId=0,this.Lr=0,this.Br=new ss,this.targetCount=0,this.kr=pe.Bn()}forEachTarget(t,e){return this.Nr.forEach((n,i)=>e(i)),P.resolve()}getLastRemoteSnapshotVersion(t){return P.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return P.resolve(this.Lr)}allocateTargetId(t){return this.highestTargetId=this.kr.next(),P.resolve(this.highestTargetId)}setTargetsMetadata(t,e,n){return n&&(this.lastRemoteSnapshotVersion=n),e>this.Lr&&(this.Lr=e),P.resolve()}Kn(t){this.Nr.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.kr=new pe(e),this.highestTargetId=e),t.sequenceNumber>this.Lr&&(this.Lr=t.sequenceNumber)}addTargetData(t,e){return this.Kn(e),this.targetCount+=1,P.resolve()}updateTargetData(t,e){return this.Kn(e),P.resolve()}removeTargetData(t,e){return this.Nr.delete(e.target),this.Br.gr(e.targetId),this.targetCount-=1,P.resolve()}removeTargets(t,e,n){let i=0;const o=[];return this.Nr.forEach((u,h)=>{h.sequenceNumber<=e&&n.get(h.targetId)===null&&(this.Nr.delete(u),o.push(this.removeMatchingKeysForTargetId(t,h.targetId)),i++)}),P.waitFor(o).next(()=>i)}getTargetCount(t){return P.resolve(this.targetCount)}getTargetData(t,e){const n=this.Nr.get(e)||null;return P.resolve(n)}addMatchingKeys(t,e,n){return this.Br.Rr(e,n),P.resolve()}removeMatchingKeys(t,e,n){this.Br.mr(e,n);const i=this.persistence.referenceDelegate,o=[];return i&&e.forEach(u=>{o.push(i.markPotentiallyOrphaned(t,u))}),P.waitFor(o)}removeMatchingKeysForTargetId(t,e){return this.Br.gr(e),P.resolve()}getMatchingKeysForTargetId(t,e){const n=this.Br.yr(e);return P.resolve(n)}containsKey(t,e){return P.resolve(this.Br.containsKey(e))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hl{constructor(t,e){this.qr={},this.overlays={},this.Qr=new Qr(0),this.Kr=!1,this.Kr=!0,this.$r=new Kl,this.referenceDelegate=t(this),this.Ur=new Wl(this),this.indexManager=new Ll,this.remoteDocumentCache=function(i){return new Gl(i)}(n=>this.referenceDelegate.Wr(n)),this.serializer=new Ml(e),this.Gr=new jl(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new zl,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let n=this.qr[t.toKey()];return n||(n=new $l(e,this.referenceDelegate),this.qr[t.toKey()]=n),n}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(t,e,n){N("MemoryPersistence","Starting transaction:",t);const i=new Xl(this.Qr.next());return this.referenceDelegate.zr(),n(i).next(o=>this.referenceDelegate.jr(i).next(()=>o)).toPromise().then(o=>(i.raiseOnCommittedEvent(),o))}Hr(t,e){return P.or(Object.values(this.qr).map(n=>()=>n.containsKey(t,e)))}}class Xl extends ku{constructor(t){super(),this.currentSequenceNumber=t}}class is{constructor(t){this.persistence=t,this.Jr=new ss,this.Yr=null}static Zr(t){return new is(t)}get Xr(){if(this.Yr)return this.Yr;throw O()}addReference(t,e,n){return this.Jr.addReference(n,e),this.Xr.delete(n.toString()),P.resolve()}removeReference(t,e,n){return this.Jr.removeReference(n,e),this.Xr.add(n.toString()),P.resolve()}markPotentiallyOrphaned(t,e){return this.Xr.add(e.toString()),P.resolve()}removeTarget(t,e){this.Jr.gr(e.targetId).forEach(i=>this.Xr.add(i.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(t,e.targetId).next(i=>{i.forEach(o=>this.Xr.add(o.toString()))}).next(()=>n.removeTargetData(t,e))}zr(){this.Yr=new Set}jr(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return P.forEach(this.Xr,n=>{const i=M.fromPath(n);return this.ei(t,i).next(o=>{o||e.removeEntry(i,L.min())})}).next(()=>(this.Yr=null,e.apply(t)))}updateLimboDocument(t,e){return this.ei(t,e).next(n=>{n?this.Xr.delete(e.toString()):this.Xr.add(e.toString())})}Wr(t){return 0}ei(t,e){return P.or([()=>P.resolve(this.Jr.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Hr(t,e)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class os{constructor(t,e,n,i){this.targetId=t,this.fromCache=e,this.$i=n,this.Ui=i}static Wi(t,e){let n=U(),i=U();for(const o of e.docChanges)switch(o.type){case 0:n=n.add(o.doc.key);break;case 1:i=i.add(o.doc.key)}return new os(t,e.fromCache,n,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yl{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jl{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return pu()?8:Du(gu())>0?6:4}()}initialize(t,e){this.Ji=t,this.indexManager=e,this.Gi=!0}getDocumentsMatchingQuery(t,e,n,i){const o={result:null};return this.Yi(t,e).next(u=>{o.result=u}).next(()=>{if(!o.result)return this.Zi(t,e,i,n).next(u=>{o.result=u})}).next(()=>{if(o.result)return;const u=new Yl;return this.Xi(t,e,u).next(h=>{if(o.result=h,this.zi)return this.es(t,e,u,h.size)})}).next(()=>o.result)}es(t,e,n,i){return n.documentReadCount<this.ji?(Ue()<=Ut.DEBUG&&N("QueryEngine","SDK will not create cache indexes for query:",oe(e),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),P.resolve()):(Ue()<=Ut.DEBUG&&N("QueryEngine","Query:",oe(e),"scans",n.documentReadCount,"local documents and returns",i,"documents as results."),n.documentReadCount>this.Hi*i?(Ue()<=Ut.DEBUG&&N("QueryEngine","The SDK decides to create cache indexes for query:",oe(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,wt(e))):P.resolve())}Yi(t,e){if(bi(e))return P.resolve(null);let n=wt(e);return this.indexManager.getIndexType(t,n).next(i=>i===0?null:(e.limit!==null&&i===1&&(e=Lr(e,null,"F"),n=wt(e)),this.indexManager.getDocumentsMatchingTarget(t,n).next(o=>{const u=U(...o);return this.Ji.getDocuments(t,u).next(h=>this.indexManager.getMinOffset(t,n).next(f=>{const d=this.ts(e,h);return this.ns(e,d,u,f.readTime)?this.Yi(t,Lr(e,null,"F")):this.rs(t,d,e,f)}))})))}Zi(t,e,n,i){return bi(e)||i.isEqual(L.min())?P.resolve(null):this.Ji.getDocuments(t,n).next(o=>{const u=this.ts(e,o);return this.ns(e,u,n,i)?P.resolve(null):(Ue()<=Ut.DEBUG&&N("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),oe(e)),this.rs(t,u,e,Pu(i,-1)).next(h=>h))})}ts(t,e){let n=new ut(Ro(t));return e.forEach((i,o)=>{Xn(t,o)&&(n=n.add(o))}),n}ns(t,e,n,i){if(t.limit===null)return!1;if(n.size!==e.size)return!0;const o=t.limitType==="F"?e.last():e.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(i)>0)}Xi(t,e,n){return Ue()<=Ut.DEBUG&&N("QueryEngine","Using full collection scan to execute query:",oe(e)),this.Ji.getDocumentsMatchingQuery(t,e,Bt.min(),n)}rs(t,e,n,i){return this.Ji.getDocumentsMatchingQuery(t,n,i).next(o=>(e.forEach(u=>{o=o.insert(u.key,u)}),o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zl{constructor(t,e,n,i){this.persistence=t,this.ss=e,this.serializer=i,this.os=new H(j),this._s=new Ee(o=>Yr(o),Jr),this.us=new Map,this.cs=t.getRemoteDocumentCache(),this.Ur=t.getTargetCache(),this.Gr=t.getBundleCache(),this.ls(n)}ls(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new Bl(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.os))}}function th(r,t,e,n){return new Zl(r,t,e,n)}async function Qo(r,t){const e=F(r);return await e.persistence.runTransaction("Handle user change","readonly",n=>{let i;return e.mutationQueue.getAllMutationBatches(n).next(o=>(i=o,e.ls(t),e.mutationQueue.getAllMutationBatches(n))).next(o=>{const u=[],h=[];let f=U();for(const d of i){u.push(d.batchId);for(const _ of d.mutations)f=f.add(_.key)}for(const d of o){h.push(d.batchId);for(const _ of d.mutations)f=f.add(_.key)}return e.localDocuments.getDocuments(n,f).next(d=>({hs:d,removedBatchIds:u,addedBatchIds:h}))})})}function eh(r,t){const e=F(r);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",n=>{const i=t.batch.keys(),o=e.cs.newChangeBuffer({trackRemovals:!0});return function(h,f,d,_){const A=d.batch,R=A.keys();let S=P.resolve();return R.forEach(D=>{S=S.next(()=>_.getEntry(f,D)).next(b=>{const k=d.docVersions.get(D);K(k!==null),b.version.compareTo(k)<0&&(A.applyToRemoteDocument(b,d),b.isValidDocument()&&(b.setReadTime(d.commitVersion),_.addEntry(b)))})}),S.next(()=>h.mutationQueue.removeMutationBatch(f,A))}(e,n,t,o).next(()=>o.apply(n)).next(()=>e.mutationQueue.performConsistencyCheck(n)).next(()=>e.documentOverlayCache.removeOverlaysForBatchId(n,i,t.batch.batchId)).next(()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,function(h){let f=U();for(let d=0;d<h.mutationResults.length;++d)h.mutationResults[d].transformResults.length>0&&(f=f.add(h.batch.mutations[d].key));return f}(t))).next(()=>e.localDocuments.getDocuments(n,i))})}function Wo(r){const t=F(r);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.Ur.getLastRemoteSnapshotVersion(e))}function nh(r,t){const e=F(r),n=t.snapshotVersion;let i=e.os;return e.persistence.runTransaction("Apply remote event","readwrite-primary",o=>{const u=e.cs.newChangeBuffer({trackRemovals:!0});i=e.os;const h=[];t.targetChanges.forEach((_,A)=>{const R=i.get(A);if(!R)return;h.push(e.Ur.removeMatchingKeys(o,_.removedDocuments,A).next(()=>e.Ur.addMatchingKeys(o,_.addedDocuments,A)));let S=R.withSequenceNumber(o.currentSequenceNumber);t.targetMismatches.get(A)!==null?S=S.withResumeToken(lt.EMPTY_BYTE_STRING,L.min()).withLastLimboFreeSnapshotVersion(L.min()):_.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(_.resumeToken,n)),i=i.insert(A,S),function(b,k,z){return b.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-b.snapshotVersion.toMicroseconds()>=3e8?!0:z.addedDocuments.size+z.modifiedDocuments.size+z.removedDocuments.size>0}(R,S,_)&&h.push(e.Ur.updateTargetData(o,S))});let f=xt(),d=U();if(t.documentUpdates.forEach(_=>{t.resolvedLimboDocuments.has(_)&&h.push(e.persistence.referenceDelegate.updateLimboDocument(o,_))}),h.push(rh(o,u,t.documentUpdates).next(_=>{f=_.Ps,d=_.Is})),!n.isEqual(L.min())){const _=e.Ur.getLastRemoteSnapshotVersion(o).next(A=>e.Ur.setTargetsMetadata(o,o.currentSequenceNumber,n));h.push(_)}return P.waitFor(h).next(()=>u.apply(o)).next(()=>e.localDocuments.getLocalViewOfDocuments(o,f,d)).next(()=>f)}).then(o=>(e.os=i,o))}function rh(r,t,e){let n=U(),i=U();return e.forEach(o=>n=n.add(o)),t.getEntries(r,n).next(o=>{let u=xt();return e.forEach((h,f)=>{const d=o.get(h);f.isFoundDocument()!==d.isFoundDocument()&&(i=i.add(h)),f.isNoDocument()&&f.version.isEqual(L.min())?(t.removeEntry(h,f.readTime),u=u.insert(h,f)):!d.isValidDocument()||f.version.compareTo(d.version)>0||f.version.compareTo(d.version)===0&&d.hasPendingWrites?(t.addEntry(f),u=u.insert(h,f)):N("LocalStore","Ignoring outdated watch update for ",h,". Current version:",d.version," Watch version:",f.version)}),{Ps:u,Is:i}})}function sh(r,t){const e=F(r);return e.persistence.runTransaction("Get next mutation batch","readonly",n=>(t===void 0&&(t=-1),e.mutationQueue.getNextMutationBatchAfterBatchId(n,t)))}function ih(r,t){const e=F(r);return e.persistence.runTransaction("Allocate target","readwrite",n=>{let i;return e.Ur.getTargetData(n,t).next(o=>o?(i=o,P.resolve(i)):e.Ur.allocateTargetId(n).next(u=>(i=new qt(t,u,"TargetPurposeListen",n.currentSequenceNumber),e.Ur.addTargetData(n,i).next(()=>i))))}).then(n=>{const i=e.os.get(n.targetId);return(i===null||n.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(e.os=e.os.insert(n.targetId,n),e._s.set(t,n.targetId)),n})}async function jr(r,t,e){const n=F(r),i=n.os.get(t),o=e?"readwrite":"readwrite-primary";try{e||await n.persistence.runTransaction("Release target",o,u=>n.persistence.referenceDelegate.removeTarget(u,i))}catch(u){if(!rn(u))throw u;N("LocalStore",`Failed to update sequence numbers for target ${t}: ${u}`)}n.os=n.os.remove(t),n._s.delete(i.target)}function Ki(r,t,e){const n=F(r);let i=L.min(),o=U();return n.persistence.runTransaction("Execute query","readwrite",u=>function(f,d,_){const A=F(f),R=A._s.get(_);return R!==void 0?P.resolve(A.os.get(R)):A.Ur.getTargetData(d,_)}(n,u,wt(t)).next(h=>{if(h)return i=h.lastLimboFreeSnapshotVersion,n.Ur.getMatchingKeysForTargetId(u,h.targetId).next(f=>{o=f})}).next(()=>n.ss.getDocumentsMatchingQuery(u,t,e?i:L.min(),e?o:U())).next(h=>(oh(n,Xu(t),h),{documents:h,Ts:o})))}function oh(r,t,e){let n=r.us.get(t)||L.min();e.forEach((i,o)=>{o.readTime.compareTo(n)>0&&(n=o.readTime)}),r.us.set(t,n)}class $i{constructor(){this.activeTargetIds=nl()}fs(t){this.activeTargetIds=this.activeTargetIds.add(t)}gs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Vs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class ah{constructor(){this.so=new $i,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,n){}addLocalQueryTarget(t,e=!0){return e&&this.so.fs(t),this.oo[t]||"not-current"}updateQueryState(t,e,n){this.oo[t]=e}removeLocalQueryTarget(t){this.so.gs(t)}isLocalQueryTarget(t){return this.so.activeTargetIds.has(t)}clearQueryState(t){delete this.oo[t]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(t){return this.so.activeTargetIds.has(t)}start(){return this.so=new $i,Promise.resolve()}handleUserChange(t,e,n){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uh{_o(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gi{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(t){this.ho.push(t)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){N("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const t of this.ho)t(0)}lo(){N("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const t of this.ho)t(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Dn=null;function Cr(){return Dn===null?Dn=function(){return 268435456+Math.round(2147483648*Math.random())}():Dn++,"0x"+Dn.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lh={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hh{constructor(t){this.Io=t.Io,this.To=t.To}Eo(t){this.Ao=t}Ro(t){this.Vo=t}mo(t){this.fo=t}onMessage(t){this.po=t}close(){this.To()}send(t){this.Io(t)}yo(){this.Ao()}wo(){this.Vo()}So(t){this.fo(t)}bo(t){this.po(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mt="WebChannelConnection";class ch extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const n=e.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),o=encodeURIComponent(this.databaseId.database);this.Do=n+"://"+e.host,this.vo=`projects/${i}/databases/${o}`,this.Co=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${o}`}get Fo(){return!1}Mo(e,n,i,o,u){const h=Cr(),f=this.xo(e,n.toUriEncodedString());N("RestConnection",`Sending RPC '${e}' ${h}:`,f,i);const d={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(d,o,u),this.No(e,f,d,i).then(_=>(N("RestConnection",`Received RPC '${e}' ${h}: `,_),_),_=>{throw ce("RestConnection",`RPC '${e}' ${h} failed with error: `,_,"url: ",f,"request:",i),_})}Lo(e,n,i,o,u,h){return this.Mo(e,n,i,o,u)}Oo(e,n,i){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+ye}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((o,u)=>e[u]=o),i&&i.headers.forEach((o,u)=>e[u]=o)}xo(e,n){const i=lh[e];return`${this.Do}/v1/${n}:${i}`}terminate(){}}{constructor(t){super(t),this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}No(t,e,n,i){const o=Cr();return new Promise((u,h)=>{const f=new ao;f.setWithCredentials(!0),f.listenOnce(uo.COMPLETE,()=>{try{switch(f.getLastErrorCode()){case Nn.NO_ERROR:const _=f.getResponseJson();N(mt,`XHR for RPC '${t}' ${o} received:`,JSON.stringify(_)),u(_);break;case Nn.TIMEOUT:N(mt,`RPC '${t}' ${o} timed out`),h(new x(V.DEADLINE_EXCEEDED,"Request time out"));break;case Nn.HTTP_ERROR:const A=f.getStatus();if(N(mt,`RPC '${t}' ${o} failed with status:`,A,"response text:",f.getResponseText()),A>0){let R=f.getResponseJson();Array.isArray(R)&&(R=R[0]);const S=R==null?void 0:R.error;if(S&&S.status&&S.message){const D=function(k){const z=k.toLowerCase().replace(/_/g,"-");return Object.values(V).indexOf(z)>=0?z:V.UNKNOWN}(S.status);h(new x(D,S.message))}else h(new x(V.UNKNOWN,"Server responded with status "+f.getStatus()))}else h(new x(V.UNAVAILABLE,"Connection failed."));break;default:O()}}finally{N(mt,`RPC '${t}' ${o} completed.`)}});const d=JSON.stringify(i);N(mt,`RPC '${t}' ${o} sending request:`,i),f.send(e,"POST",d,n,15)})}Bo(t,e,n){const i=Cr(),o=[this.Do,"/","google.firestore.v1.Firestore","/",t,"/channel"],u=co(),h=ho(),f={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(f.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(f.useFetchStreams=!0),this.Oo(f.initMessageHeaders,e,n),f.encodeInitMessageHeaders=!0;const _=o.join("");N(mt,`Creating RPC '${t}' stream ${i}: ${_}`,f);const A=u.createWebChannel(_,f);let R=!1,S=!1;const D=new hh({Io:k=>{S?N(mt,`Not sending because RPC '${t}' stream ${i} is closed:`,k):(R||(N(mt,`Opening RPC '${t}' stream ${i} transport.`),A.open(),R=!0),N(mt,`RPC '${t}' stream ${i} sending:`,k),A.send(k))},To:()=>A.close()}),b=(k,z,$)=>{k.listen(z,Q=>{try{$(Q)}catch(nt){setTimeout(()=>{throw nt},0)}})};return b(A,qe.EventType.OPEN,()=>{S||(N(mt,`RPC '${t}' stream ${i} transport opened.`),D.yo())}),b(A,qe.EventType.CLOSE,()=>{S||(S=!0,N(mt,`RPC '${t}' stream ${i} transport closed`),D.So())}),b(A,qe.EventType.ERROR,k=>{S||(S=!0,ce(mt,`RPC '${t}' stream ${i} transport errored:`,k),D.So(new x(V.UNAVAILABLE,"The operation could not be completed")))}),b(A,qe.EventType.MESSAGE,k=>{var z;if(!S){const $=k.data[0];K(!!$);const Q=$,nt=Q.error||((z=Q[0])===null||z===void 0?void 0:z.error);if(nt){N(mt,`RPC '${t}' stream ${i} received error:`,nt);const St=nt.status;let st=function(g){const y=Z[g];if(y!==void 0)return Lo(y)}(St),E=nt.message;st===void 0&&(st=V.INTERNAL,E="Unknown error status: "+St+" with message "+nt.message),S=!0,D.So(new x(st,E)),A.close()}else N(mt,`RPC '${t}' stream ${i} received:`,$),D.bo($)}}),b(h,lo.STAT_EVENT,k=>{k.stat===Nr.PROXY?N(mt,`RPC '${t}' stream ${i} detected buffering proxy`):k.stat===Nr.NOPROXY&&N(mt,`RPC '${t}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{D.wo()},0),D}}function kr(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tr(r){return new vl(r,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ho{constructor(t,e,n=1e3,i=1.5,o=6e4){this.ui=t,this.timerId=e,this.ko=n,this.qo=i,this.Qo=o,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(t){this.cancel();const e=Math.floor(this.Ko+this.zo()),n=Math.max(0,Date.now()-this.Uo),i=Math.max(0,e-n);i>0&&N("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Ko} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,i,()=>(this.Uo=Date.now(),t())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xo{constructor(t,e,n,i,o,u,h,f){this.ui=t,this.Ho=n,this.Jo=i,this.connection=o,this.authCredentialsProvider=u,this.appCheckCredentialsProvider=h,this.listener=f,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new Ho(t,e)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(t){this.u_(),this.stream.send(t)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(t,e){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,t!==4?this.t_.reset():e&&e.code===V.RESOURCE_EXHAUSTED?(bt(e.toString()),bt("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):e&&e.code===V.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.mo(e)}l_(){}auth(){this.state=1;const t=this.h_(this.Yo),e=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([n,i])=>{this.Yo===e&&this.P_(n,i)},n=>{t(()=>{const i=new x(V.UNKNOWN,"Fetching auth token failed: "+n.message);return this.I_(i)})})}P_(t,e){const n=this.h_(this.Yo);this.stream=this.T_(t,e),this.stream.Eo(()=>{n(()=>this.listener.Eo())}),this.stream.Ro(()=>{n(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(i=>{n(()=>this.I_(i))}),this.stream.onMessage(i=>{n(()=>++this.e_==1?this.E_(i):this.onNext(i))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(t){return N("PersistentStream",`close with error: ${t}`),this.stream=null,this.close(4,t)}h_(t){return e=>{this.ui.enqueueAndForget(()=>this.Yo===t?e():(N("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class fh extends Xo{constructor(t,e,n,i,o,u){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,n,i,u),this.serializer=o}T_(t,e){return this.connection.Bo("Listen",t,e)}E_(t){return this.onNext(t)}onNext(t){this.t_.reset();const e=wl(this.serializer,t),n=function(o){if(!("targetChange"in o))return L.min();const u=o.targetChange;return u.targetIds&&u.targetIds.length?L.min():u.readTime?Rt(u.readTime):L.min()}(t);return this.listener.d_(e,n)}A_(t){const e={};e.database=Br(this.serializer),e.addTarget=function(o,u){let h;const f=u.target;if(h=Or(f)?{documents:Vl(o,f)}:{query:Sl(o,f)._t},h.targetId=u.targetId,u.resumeToken.approximateByteSize()>0){h.resumeToken=qo(o,u.resumeToken);const d=Fr(o,u.expectedCount);d!==null&&(h.expectedCount=d)}else if(u.snapshotVersion.compareTo(L.min())>0){h.readTime=jn(o,u.snapshotVersion.toTimestamp());const d=Fr(o,u.expectedCount);d!==null&&(h.expectedCount=d)}return h}(this.serializer,t);const n=kl(this.serializer,t);n&&(e.labels=n),this.a_(e)}R_(t){const e={};e.database=Br(this.serializer),e.removeTarget=t,this.a_(e)}}class dh extends Xo{constructor(t,e,n,i,o,u){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,n,i,u),this.serializer=o}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(t,e){return this.connection.Bo("Write",t,e)}E_(t){return K(!!t.streamToken),this.lastStreamToken=t.streamToken,K(!t.writeResults||t.writeResults.length===0),this.listener.f_()}onNext(t){K(!!t.streamToken),this.lastStreamToken=t.streamToken,this.t_.reset();const e=Pl(t.writeResults,t.commitTime),n=Rt(t.commitTime);return this.listener.g_(n,e)}p_(){const t={};t.database=Br(this.serializer),this.a_(t)}m_(t){const e={streamToken:this.lastStreamToken,writes:t.map(n=>Rl(this.serializer,n))};this.a_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mh extends class{}{constructor(t,e,n,i){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=n,this.serializer=i,this.y_=!1}w_(){if(this.y_)throw new x(V.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(t,e,n,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,u])=>this.connection.Mo(t,Ur(e,n),i,o,u)).catch(o=>{throw o.name==="FirebaseError"?(o.code===V.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new x(V.UNKNOWN,o.toString())})}Lo(t,e,n,i,o){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([u,h])=>this.connection.Lo(t,Ur(e,n),i,u,h,o)).catch(u=>{throw u.name==="FirebaseError"?(u.code===V.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),u):new x(V.UNKNOWN,u.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class ph{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(t){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.C_("Offline")))}set(t){this.x_(),this.S_=0,t==="Online"&&(this.D_=!1),this.C_(t)}C_(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}F_(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(bt(e),this.D_=!1):N("OnlineStateTracker",e)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gh{constructor(t,e,n,i,o){this.localStore=t,this.datastore=e,this.asyncQueue=n,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=o,this.k_._o(u=>{n.enqueueAndForget(async()=>{ee(this)&&(N("RemoteStore","Restarting streams for network reachability change."),await async function(f){const d=F(f);d.L_.add(4),await an(d),d.q_.set("Unknown"),d.L_.delete(4),await er(d)}(this))})}),this.q_=new ph(n,i)}}async function er(r){if(ee(r))for(const t of r.B_)await t(!0)}async function an(r){for(const t of r.B_)await t(!1)}function Yo(r,t){const e=F(r);e.N_.has(t.targetId)||(e.N_.set(t.targetId,t),hs(e)?ls(e):ve(e).r_()&&us(e,t))}function as(r,t){const e=F(r),n=ve(e);e.N_.delete(t),n.r_()&&Jo(e,t),e.N_.size===0&&(n.r_()?n.o_():ee(e)&&e.q_.set("Unknown"))}function us(r,t){if(r.Q_.xe(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(L.min())>0){const e=r.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}ve(r).A_(t)}function Jo(r,t){r.Q_.xe(t),ve(r).R_(t)}function ls(r){r.Q_=new _l({getRemoteKeysForTarget:t=>r.remoteSyncer.getRemoteKeysForTarget(t),ot:t=>r.N_.get(t)||null,tt:()=>r.datastore.serializer.databaseId}),ve(r).start(),r.q_.v_()}function hs(r){return ee(r)&&!ve(r).n_()&&r.N_.size>0}function ee(r){return F(r).L_.size===0}function Zo(r){r.Q_=void 0}async function _h(r){r.q_.set("Online")}async function yh(r){r.N_.forEach((t,e)=>{us(r,t)})}async function Th(r,t){Zo(r),hs(r)?(r.q_.M_(t),ls(r)):r.q_.set("Unknown")}async function Eh(r,t,e){if(r.q_.set("Online"),t instanceof Uo&&t.state===2&&t.cause)try{await async function(i,o){const u=o.cause;for(const h of o.targetIds)i.N_.has(h)&&(await i.remoteSyncer.rejectListen(h,u),i.N_.delete(h),i.Q_.removeTarget(h))}(r,t)}catch(n){N("RemoteStore","Failed to remove targets %s: %s ",t.targetIds.join(","),n),await zn(r,n)}else if(t instanceof Mn?r.Q_.Ke(t):t instanceof Fo?r.Q_.He(t):r.Q_.We(t),!e.isEqual(L.min()))try{const n=await Wo(r.localStore);e.compareTo(n)>=0&&await function(o,u){const h=o.Q_.rt(u);return h.targetChanges.forEach((f,d)=>{if(f.resumeToken.approximateByteSize()>0){const _=o.N_.get(d);_&&o.N_.set(d,_.withResumeToken(f.resumeToken,u))}}),h.targetMismatches.forEach((f,d)=>{const _=o.N_.get(f);if(!_)return;o.N_.set(f,_.withResumeToken(lt.EMPTY_BYTE_STRING,_.snapshotVersion)),Jo(o,f);const A=new qt(_.target,f,d,_.sequenceNumber);us(o,A)}),o.remoteSyncer.applyRemoteEvent(h)}(r,e)}catch(n){N("RemoteStore","Failed to raise snapshot:",n),await zn(r,n)}}async function zn(r,t,e){if(!rn(t))throw t;r.L_.add(1),await an(r),r.q_.set("Offline"),e||(e=()=>Wo(r.localStore)),r.asyncQueue.enqueueRetryable(async()=>{N("RemoteStore","Retrying IndexedDB access"),await e(),r.L_.delete(1),await er(r)})}function ta(r,t){return t().catch(e=>zn(r,e,t))}async function nr(r){const t=F(r),e=zt(t);let n=t.O_.length>0?t.O_[t.O_.length-1].batchId:-1;for(;vh(t);)try{const i=await sh(t.localStore,n);if(i===null){t.O_.length===0&&e.o_();break}n=i.batchId,Ih(t,i)}catch(i){await zn(t,i)}ea(t)&&na(t)}function vh(r){return ee(r)&&r.O_.length<10}function Ih(r,t){r.O_.push(t);const e=zt(r);e.r_()&&e.V_&&e.m_(t.mutations)}function ea(r){return ee(r)&&!zt(r).n_()&&r.O_.length>0}function na(r){zt(r).start()}async function Ah(r){zt(r).p_()}async function wh(r){const t=zt(r);for(const e of r.O_)t.m_(e.mutations)}async function Rh(r,t,e){const n=r.O_.shift(),i=es.from(n,t,e);await ta(r,()=>r.remoteSyncer.applySuccessfulWrite(i)),await nr(r)}async function Ph(r,t){t&&zt(r).V_&&await async function(n,i){if(function(u){return ml(u)&&u!==V.ABORTED}(i.code)){const o=n.O_.shift();zt(n).s_(),await ta(n,()=>n.remoteSyncer.rejectFailedWrite(o.batchId,i)),await nr(n)}}(r,t),ea(r)&&na(r)}async function Qi(r,t){const e=F(r);e.asyncQueue.verifyOperationInProgress(),N("RemoteStore","RemoteStore received new credentials");const n=ee(e);e.L_.add(3),await an(e),n&&e.q_.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.L_.delete(3),await er(e)}async function Vh(r,t){const e=F(r);t?(e.L_.delete(2),await er(e)):t||(e.L_.add(2),await an(e),e.q_.set("Unknown"))}function ve(r){return r.K_||(r.K_=function(e,n,i){const o=F(e);return o.w_(),new fh(n,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,i)}(r.datastore,r.asyncQueue,{Eo:_h.bind(null,r),Ro:yh.bind(null,r),mo:Th.bind(null,r),d_:Eh.bind(null,r)}),r.B_.push(async t=>{t?(r.K_.s_(),hs(r)?ls(r):r.q_.set("Unknown")):(await r.K_.stop(),Zo(r))})),r.K_}function zt(r){return r.U_||(r.U_=function(e,n,i){const o=F(e);return o.w_(),new dh(n,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,i)}(r.datastore,r.asyncQueue,{Eo:()=>Promise.resolve(),Ro:Ah.bind(null,r),mo:Ph.bind(null,r),f_:wh.bind(null,r),g_:Rh.bind(null,r)}),r.B_.push(async t=>{t?(r.U_.s_(),await nr(r)):(await r.U_.stop(),r.O_.length>0&&(N("RemoteStore",`Stopping write stream with ${r.O_.length} pending writes`),r.O_=[]))})),r.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cs{constructor(t,e,n,i,o){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=n,this.op=i,this.removalCallback=o,this.deferred=new Xt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(u=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,n,i,o){const u=Date.now()+n,h=new cs(t,e,u,i,o);return h.start(n),h}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new x(V.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function fs(r,t){if(bt("AsyncQueue",`${t}: ${r}`),rn(r))return new x(V.UNAVAILABLE,`${t}: ${r}`);throw r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class le{constructor(t){this.comparator=t?(e,n)=>t(e,n)||M.comparator(e.key,n.key):(e,n)=>M.comparator(e.key,n.key),this.keyedMap=Be(),this.sortedSet=new H(this.comparator)}static emptySet(t){return new le(t.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,n)=>(t(e),!1))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof le)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),n=t.sortedSet.getIterator();for(;e.hasNext();){const i=e.getNext().key,o=n.getNext().key;if(!i.isEqual(o))return!1}return!0}toString(){const t=[];return this.forEach(e=>{t.push(e.toString())}),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const n=new le;return n.comparator=this.comparator,n.keyedMap=t,n.sortedSet=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wi{constructor(){this.W_=new H(M.comparator)}track(t){const e=t.doc.key,n=this.W_.get(e);n?t.type!==0&&n.type===3?this.W_=this.W_.insert(e,t):t.type===3&&n.type!==1?this.W_=this.W_.insert(e,{type:n.type,doc:t.doc}):t.type===2&&n.type===2?this.W_=this.W_.insert(e,{type:2,doc:t.doc}):t.type===2&&n.type===0?this.W_=this.W_.insert(e,{type:0,doc:t.doc}):t.type===1&&n.type===0?this.W_=this.W_.remove(e):t.type===1&&n.type===2?this.W_=this.W_.insert(e,{type:1,doc:n.doc}):t.type===0&&n.type===1?this.W_=this.W_.insert(e,{type:2,doc:t.doc}):O():this.W_=this.W_.insert(e,t)}G_(){const t=[];return this.W_.inorderTraversal((e,n)=>{t.push(n)}),t}}class ge{constructor(t,e,n,i,o,u,h,f,d){this.query=t,this.docs=e,this.oldDocs=n,this.docChanges=i,this.mutatedKeys=o,this.fromCache=u,this.syncStateChanged=h,this.excludesMetadataChanges=f,this.hasCachedResults=d}static fromInitialDocuments(t,e,n,i,o){const u=[];return e.forEach(h=>{u.push({type:0,doc:h})}),new ge(t,e,le.emptySet(e),u,n,i,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&Hn(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,n=t.docChanges;if(e.length!==n.length)return!1;for(let i=0;i<e.length;i++)if(e[i].type!==n[i].type||!e[i].doc.isEqual(n[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sh{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(t=>t.J_())}}class Ch{constructor(){this.queries=Hi(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(e,n){const i=F(e),o=i.queries;i.queries=Hi(),o.forEach((u,h)=>{for(const f of h.j_)f.onError(n)})})(this,new x(V.ABORTED,"Firestore shutting down"))}}function Hi(){return new Ee(r=>wo(r),Hn)}async function kh(r,t){const e=F(r);let n=3;const i=t.query;let o=e.queries.get(i);o?!o.H_()&&t.J_()&&(n=2):(o=new Sh,n=t.J_()?0:1);try{switch(n){case 0:o.z_=await e.onListen(i,!0);break;case 1:o.z_=await e.onListen(i,!1);break;case 2:await e.onFirstRemoteStoreListen(i)}}catch(u){const h=fs(u,`Initialization of query '${oe(t.query)}' failed`);return void t.onError(h)}e.queries.set(i,o),o.j_.push(t),t.Z_(e.onlineState),o.z_&&t.X_(o.z_)&&ds(e)}async function Dh(r,t){const e=F(r),n=t.query;let i=3;const o=e.queries.get(n);if(o){const u=o.j_.indexOf(t);u>=0&&(o.j_.splice(u,1),o.j_.length===0?i=t.J_()?0:1:!o.H_()&&t.J_()&&(i=2))}switch(i){case 0:return e.queries.delete(n),e.onUnlisten(n,!0);case 1:return e.queries.delete(n),e.onUnlisten(n,!1);case 2:return e.onLastRemoteStoreUnlisten(n);default:return}}function Nh(r,t){const e=F(r);let n=!1;for(const i of t){const o=i.query,u=e.queries.get(o);if(u){for(const h of u.j_)h.X_(i)&&(n=!0);u.z_=i}}n&&ds(e)}function bh(r,t,e){const n=F(r),i=n.queries.get(t);if(i)for(const o of i.j_)o.onError(e);n.queries.delete(t)}function ds(r){r.Y_.forEach(t=>{t.next()})}var zr,Xi;(Xi=zr||(zr={})).ea="default",Xi.Cache="cache";class xh{constructor(t,e,n){this.query=t,this.ta=e,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=n||{}}X_(t){if(!this.options.includeMetadataChanges){const n=[];for(const i of t.docChanges)i.type!==3&&n.push(i);t=new ge(t.query,t.docs,t.oldDocs,n,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.na?this.ia(t)&&(this.ta.next(t),e=!0):this.sa(t,this.onlineState)&&(this.oa(t),e=!0),this.ra=t,e}onError(t){this.ta.error(t)}Z_(t){this.onlineState=t;let e=!1;return this.ra&&!this.na&&this.sa(this.ra,t)&&(this.oa(this.ra),e=!0),e}sa(t,e){if(!t.fromCache||!this.J_())return!0;const n=e!=="Offline";return(!this.options._a||!n)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}ia(t){if(t.docChanges.length>0)return!0;const e=this.ra&&this.ra.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}oa(t){t=ge.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.na=!0,this.ta.next(t)}J_(){return this.options.source!==zr.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ra{constructor(t){this.key=t}}class sa{constructor(t){this.key=t}}class Mh{constructor(t,e){this.query=t,this.Ta=e,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=U(),this.mutatedKeys=U(),this.Aa=Ro(t),this.Ra=new le(this.Aa)}get Va(){return this.Ta}ma(t,e){const n=e?e.fa:new Wi,i=e?e.Ra:this.Ra;let o=e?e.mutatedKeys:this.mutatedKeys,u=i,h=!1;const f=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,d=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(t.inorderTraversal((_,A)=>{const R=i.get(_),S=Xn(this.query,A)?A:null,D=!!R&&this.mutatedKeys.has(R.key),b=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations);let k=!1;R&&S?R.data.isEqual(S.data)?D!==b&&(n.track({type:3,doc:S}),k=!0):this.ga(R,S)||(n.track({type:2,doc:S}),k=!0,(f&&this.Aa(S,f)>0||d&&this.Aa(S,d)<0)&&(h=!0)):!R&&S?(n.track({type:0,doc:S}),k=!0):R&&!S&&(n.track({type:1,doc:R}),k=!0,(f||d)&&(h=!0)),k&&(S?(u=u.add(S),o=b?o.add(_):o.delete(_)):(u=u.delete(_),o=o.delete(_)))}),this.query.limit!==null)for(;u.size>this.query.limit;){const _=this.query.limitType==="F"?u.last():u.first();u=u.delete(_.key),o=o.delete(_.key),n.track({type:1,doc:_})}return{Ra:u,fa:n,ns:h,mutatedKeys:o}}ga(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,n,i){const o=this.Ra;this.Ra=t.Ra,this.mutatedKeys=t.mutatedKeys;const u=t.fa.G_();u.sort((_,A)=>function(S,D){const b=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return O()}};return b(S)-b(D)}(_.type,A.type)||this.Aa(_.doc,A.doc)),this.pa(n),i=i!=null&&i;const h=e&&!i?this.ya():[],f=this.da.size===0&&this.current&&!i?1:0,d=f!==this.Ea;return this.Ea=f,u.length!==0||d?{snapshot:new ge(this.query,t.Ra,o,u,t.mutatedKeys,f===0,d,!1,!!n&&n.resumeToken.approximateByteSize()>0),wa:h}:{wa:h}}Z_(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new Wi,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(t){return!this.Ta.has(t)&&!!this.Ra.has(t)&&!this.Ra.get(t).hasLocalMutations}pa(t){t&&(t.addedDocuments.forEach(e=>this.Ta=this.Ta.add(e)),t.modifiedDocuments.forEach(e=>{}),t.removedDocuments.forEach(e=>this.Ta=this.Ta.delete(e)),this.current=t.current)}ya(){if(!this.current)return[];const t=this.da;this.da=U(),this.Ra.forEach(n=>{this.Sa(n.key)&&(this.da=this.da.add(n.key))});const e=[];return t.forEach(n=>{this.da.has(n)||e.push(new sa(n))}),this.da.forEach(n=>{t.has(n)||e.push(new ra(n))}),e}ba(t){this.Ta=t.Ts,this.da=U();const e=this.ma(t.documents);return this.applyChanges(e,!0)}Da(){return ge.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class Oh{constructor(t,e,n){this.query=t,this.targetId=e,this.view=n}}class Lh{constructor(t){this.key=t,this.va=!1}}class Fh{constructor(t,e,n,i,o,u){this.localStore=t,this.remoteStore=e,this.eventManager=n,this.sharedClientState=i,this.currentUser=o,this.maxConcurrentLimboResolutions=u,this.Ca={},this.Fa=new Ee(h=>wo(h),Hn),this.Ma=new Map,this.xa=new Set,this.Oa=new H(M.comparator),this.Na=new Map,this.La=new ss,this.Ba={},this.ka=new Map,this.qa=pe.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function Uh(r,t,e=!0){const n=ha(r);let i;const o=n.Fa.get(t);return o?(n.sharedClientState.addLocalQueryTarget(o.targetId),i=o.view.Da()):i=await ia(n,t,e,!0),i}async function qh(r,t){const e=ha(r);await ia(e,t,!0,!1)}async function ia(r,t,e,n){const i=await ih(r.localStore,wt(t)),o=i.targetId,u=r.sharedClientState.addLocalQueryTarget(o,e);let h;return n&&(h=await Bh(r,t,o,u==="current",i.resumeToken)),r.isPrimaryClient&&e&&Yo(r.remoteStore,i),h}async function Bh(r,t,e,n,i){r.Ka=(A,R,S)=>async function(b,k,z,$){let Q=k.view.ma(z);Q.ns&&(Q=await Ki(b.localStore,k.query,!1).then(({documents:E})=>k.view.ma(E,Q)));const nt=$&&$.targetChanges.get(k.targetId),St=$&&$.targetMismatches.get(k.targetId)!=null,st=k.view.applyChanges(Q,b.isPrimaryClient,nt,St);return Ji(b,k.targetId,st.wa),st.snapshot}(r,A,R,S);const o=await Ki(r.localStore,t,!0),u=new Mh(t,o.Ts),h=u.ma(o.documents),f=on.createSynthesizedTargetChangeForCurrentChange(e,n&&r.onlineState!=="Offline",i),d=u.applyChanges(h,r.isPrimaryClient,f);Ji(r,e,d.wa);const _=new Oh(t,e,u);return r.Fa.set(t,_),r.Ma.has(e)?r.Ma.get(e).push(t):r.Ma.set(e,[t]),d.snapshot}async function jh(r,t,e){const n=F(r),i=n.Fa.get(t),o=n.Ma.get(i.targetId);if(o.length>1)return n.Ma.set(i.targetId,o.filter(u=>!Hn(u,t))),void n.Fa.delete(t);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(i.targetId),n.sharedClientState.isActiveQueryTarget(i.targetId)||await jr(n.localStore,i.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(i.targetId),e&&as(n.remoteStore,i.targetId),Kr(n,i.targetId)}).catch(nn)):(Kr(n,i.targetId),await jr(n.localStore,i.targetId,!0))}async function zh(r,t){const e=F(r),n=e.Fa.get(t),i=e.Ma.get(n.targetId);e.isPrimaryClient&&i.length===1&&(e.sharedClientState.removeLocalQueryTarget(n.targetId),as(e.remoteStore,n.targetId))}async function Kh(r,t,e){const n=Yh(r);try{const i=await function(u,h){const f=F(u),d=et.now(),_=h.reduce((S,D)=>S.add(D.key),U());let A,R;return f.persistence.runTransaction("Locally write mutations","readwrite",S=>{let D=xt(),b=U();return f.cs.getEntries(S,_).next(k=>{D=k,D.forEach((z,$)=>{$.isValidDocument()||(b=b.add(z))})}).next(()=>f.localDocuments.getOverlayedDocuments(S,D)).next(k=>{A=k;const z=[];for(const $ of h){const Q=ll($,A.get($.key).overlayedDocument);Q!=null&&z.push(new te($.key,Q,_o(Q.value.mapValue),Nt.exists(!0)))}return f.mutationQueue.addMutationBatch(S,d,z,h)}).next(k=>{R=k;const z=k.applyToLocalDocumentSet(A,b);return f.documentOverlayCache.saveOverlays(S,k.batchId,z)})}).then(()=>({batchId:R.batchId,changes:Vo(A)}))}(n.localStore,t);n.sharedClientState.addPendingMutation(i.batchId),function(u,h,f){let d=u.Ba[u.currentUser.toKey()];d||(d=new H(j)),d=d.insert(h,f),u.Ba[u.currentUser.toKey()]=d}(n,i.batchId,e),await un(n,i.changes),await nr(n.remoteStore)}catch(i){const o=fs(i,"Failed to persist write");e.reject(o)}}async function oa(r,t){const e=F(r);try{const n=await nh(e.localStore,t);t.targetChanges.forEach((i,o)=>{const u=e.Na.get(o);u&&(K(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?u.va=!0:i.modifiedDocuments.size>0?K(u.va):i.removedDocuments.size>0&&(K(u.va),u.va=!1))}),await un(e,n,t)}catch(n){await nn(n)}}function Yi(r,t,e){const n=F(r);if(n.isPrimaryClient&&e===0||!n.isPrimaryClient&&e===1){const i=[];n.Fa.forEach((o,u)=>{const h=u.view.Z_(t);h.snapshot&&i.push(h.snapshot)}),function(u,h){const f=F(u);f.onlineState=h;let d=!1;f.queries.forEach((_,A)=>{for(const R of A.j_)R.Z_(h)&&(d=!0)}),d&&ds(f)}(n.eventManager,t),i.length&&n.Ca.d_(i),n.onlineState=t,n.isPrimaryClient&&n.sharedClientState.setOnlineState(t)}}async function $h(r,t,e){const n=F(r);n.sharedClientState.updateQueryState(t,"rejected",e);const i=n.Na.get(t),o=i&&i.key;if(o){let u=new H(M.comparator);u=u.insert(o,gt.newNoDocument(o,L.min()));const h=U().add(o),f=new Zn(L.min(),new Map,new H(j),u,h);await oa(n,f),n.Oa=n.Oa.remove(o),n.Na.delete(t),ms(n)}else await jr(n.localStore,t,!1).then(()=>Kr(n,t,e)).catch(nn)}async function Gh(r,t){const e=F(r),n=t.batch.batchId;try{const i=await eh(e.localStore,t);ua(e,n,null),aa(e,n),e.sharedClientState.updateMutationState(n,"acknowledged"),await un(e,i)}catch(i){await nn(i)}}async function Qh(r,t,e){const n=F(r);try{const i=await function(u,h){const f=F(u);return f.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let _;return f.mutationQueue.lookupMutationBatch(d,h).next(A=>(K(A!==null),_=A.keys(),f.mutationQueue.removeMutationBatch(d,A))).next(()=>f.mutationQueue.performConsistencyCheck(d)).next(()=>f.documentOverlayCache.removeOverlaysForBatchId(d,_,h)).next(()=>f.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,_)).next(()=>f.localDocuments.getDocuments(d,_))})}(n.localStore,t);ua(n,t,e),aa(n,t),n.sharedClientState.updateMutationState(t,"rejected",e),await un(n,i)}catch(i){await nn(i)}}function aa(r,t){(r.ka.get(t)||[]).forEach(e=>{e.resolve()}),r.ka.delete(t)}function ua(r,t,e){const n=F(r);let i=n.Ba[n.currentUser.toKey()];if(i){const o=i.get(t);o&&(e?o.reject(e):o.resolve(),i=i.remove(t)),n.Ba[n.currentUser.toKey()]=i}}function Kr(r,t,e=null){r.sharedClientState.removeLocalQueryTarget(t);for(const n of r.Ma.get(t))r.Fa.delete(n),e&&r.Ca.$a(n,e);r.Ma.delete(t),r.isPrimaryClient&&r.La.gr(t).forEach(n=>{r.La.containsKey(n)||la(r,n)})}function la(r,t){r.xa.delete(t.path.canonicalString());const e=r.Oa.get(t);e!==null&&(as(r.remoteStore,e),r.Oa=r.Oa.remove(t),r.Na.delete(e),ms(r))}function Ji(r,t,e){for(const n of e)n instanceof ra?(r.La.addReference(n.key,t),Wh(r,n)):n instanceof sa?(N("SyncEngine","Document no longer in limbo: "+n.key),r.La.removeReference(n.key,t),r.La.containsKey(n.key)||la(r,n.key)):O()}function Wh(r,t){const e=t.key,n=e.path.canonicalString();r.Oa.get(e)||r.xa.has(n)||(N("SyncEngine","New document in limbo: "+e),r.xa.add(n),ms(r))}function ms(r){for(;r.xa.size>0&&r.Oa.size<r.maxConcurrentLimboResolutions;){const t=r.xa.values().next().value;r.xa.delete(t);const e=new M(Y.fromString(t)),n=r.qa.next();r.Na.set(n,new Lh(e)),r.Oa=r.Oa.insert(e,n),Yo(r.remoteStore,new qt(wt(Zr(e.path)),n,"TargetPurposeLimboResolution",Qr.oe))}}async function un(r,t,e){const n=F(r),i=[],o=[],u=[];n.Fa.isEmpty()||(n.Fa.forEach((h,f)=>{u.push(n.Ka(f,t,e).then(d=>{var _;if((d||e)&&n.isPrimaryClient){const A=d?!d.fromCache:(_=e==null?void 0:e.targetChanges.get(f.targetId))===null||_===void 0?void 0:_.current;n.sharedClientState.updateQueryState(f.targetId,A?"current":"not-current")}if(d){i.push(d);const A=os.Wi(f.targetId,d);o.push(A)}}))}),await Promise.all(u),n.Ca.d_(i),await async function(f,d){const _=F(f);try{await _.persistence.runTransaction("notifyLocalViewChanges","readwrite",A=>P.forEach(d,R=>P.forEach(R.$i,S=>_.persistence.referenceDelegate.addReference(A,R.targetId,S)).next(()=>P.forEach(R.Ui,S=>_.persistence.referenceDelegate.removeReference(A,R.targetId,S)))))}catch(A){if(!rn(A))throw A;N("LocalStore","Failed to update sequence numbers: "+A)}for(const A of d){const R=A.targetId;if(!A.fromCache){const S=_.os.get(R),D=S.snapshotVersion,b=S.withLastLimboFreeSnapshotVersion(D);_.os=_.os.insert(R,b)}}}(n.localStore,o))}async function Hh(r,t){const e=F(r);if(!e.currentUser.isEqual(t)){N("SyncEngine","User change. New user:",t.toKey());const n=await Qo(e.localStore,t);e.currentUser=t,function(o,u){o.ka.forEach(h=>{h.forEach(f=>{f.reject(new x(V.CANCELLED,u))})}),o.ka.clear()}(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,n.removedBatchIds,n.addedBatchIds),await un(e,n.hs)}}function Xh(r,t){const e=F(r),n=e.Na.get(t);if(n&&n.va)return U().add(n.key);{let i=U();const o=e.Ma.get(t);if(!o)return i;for(const u of o){const h=e.Fa.get(u);i=i.unionWith(h.view.Va)}return i}}function ha(r){const t=F(r);return t.remoteStore.remoteSyncer.applyRemoteEvent=oa.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=Xh.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=$h.bind(null,t),t.Ca.d_=Nh.bind(null,t.eventManager),t.Ca.$a=bh.bind(null,t.eventManager),t}function Yh(r){const t=F(r);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Gh.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=Qh.bind(null,t),t}class Kn{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=tr(t.databaseInfo.databaseId),this.sharedClientState=this.Wa(t),this.persistence=this.Ga(t),await this.persistence.start(),this.localStore=this.za(t),this.gcScheduler=this.ja(t,this.localStore),this.indexBackfillerScheduler=this.Ha(t,this.localStore)}ja(t,e){return null}Ha(t,e){return null}za(t){return th(this.persistence,new Jl,t.initialUser,this.serializer)}Ga(t){return new Hl(is.Zr,this.serializer)}Wa(t){return new ah}async terminate(){var t,e;(t=this.gcScheduler)===null||t===void 0||t.stop(),(e=this.indexBackfillerScheduler)===null||e===void 0||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Kn.provider={build:()=>new Kn};class $r{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>Yi(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=Hh.bind(null,this.syncEngine),await Vh(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return function(){return new Ch}()}createDatastore(t){const e=tr(t.databaseInfo.databaseId),n=function(o){return new ch(o)}(t.databaseInfo);return function(o,u,h,f){return new mh(o,u,h,f)}(t.authCredentials,t.appCheckCredentials,n,e)}createRemoteStore(t){return function(n,i,o,u,h){return new gh(n,i,o,u,h)}(this.localStore,this.datastore,t.asyncQueue,e=>Yi(this.syncEngine,e,0),function(){return Gi.D()?new Gi:new uh}())}createSyncEngine(t,e){return function(i,o,u,h,f,d,_){const A=new Fh(i,o,u,h,f,d);return _&&(A.Qa=!0),A}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(i){const o=F(i);N("RemoteStore","RemoteStore shutting down."),o.L_.add(5),await an(o),o.k_.shutdown(),o.q_.set("Unknown")}(this.remoteStore),(t=this.datastore)===null||t===void 0||t.terminate(),(e=this.eventManager)===null||e===void 0||e.terminate()}}$r.provider={build:()=>new $r};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jh{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Ya(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Ya(this.observer.error,t):bt("Uncaught Error in snapshot listener:",t.toString()))}Za(){this.muted=!0}Ya(t,e){setTimeout(()=>{this.muted||t(e)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zh{constructor(t,e,n,i,o){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=n,this.databaseInfo=i,this.user=pt.UNAUTHENTICATED,this.clientId=mo.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(n,async u=>{N("FirestoreClient","Received user=",u.uid),await this.authCredentialListener(u),this.user=u}),this.appCheckCredentials.start(n,u=>(N("FirestoreClient","Received new app check token=",u),this.appCheckCredentialListener(u,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new Xt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const n=fs(e,"Failed to shutdown persistence");t.reject(n)}}),t.promise}}async function Dr(r,t){r.asyncQueue.verifyOperationInProgress(),N("FirestoreClient","Initializing OfflineComponentProvider");const e=r.configuration;await t.initialize(e);let n=e.initialUser;r.setCredentialChangeListener(async i=>{n.isEqual(i)||(await Qo(t.localStore,i),n=i)}),t.persistence.setDatabaseDeletedListener(()=>r.terminate()),r._offlineComponents=t}async function Zi(r,t){r.asyncQueue.verifyOperationInProgress();const e=await tc(r);N("FirestoreClient","Initializing OnlineComponentProvider"),await t.initialize(e,r.configuration),r.setCredentialChangeListener(n=>Qi(t.remoteStore,n)),r.setAppCheckTokenChangeListener((n,i)=>Qi(t.remoteStore,i)),r._onlineComponents=t}async function tc(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){N("FirestoreClient","Using user provided OfflineComponentProvider");try{await Dr(r,r._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!function(i){return i.name==="FirebaseError"?i.code===V.FAILED_PRECONDITION||i.code===V.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(e))throw e;ce("Error using user provided cache. Falling back to memory cache: "+e),await Dr(r,new Kn)}}else N("FirestoreClient","Using default OfflineComponentProvider"),await Dr(r,new Kn);return r._offlineComponents}async function ca(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(N("FirestoreClient","Using user provided OnlineComponentProvider"),await Zi(r,r._uninitializedComponentsProvider._online)):(N("FirestoreClient","Using default OnlineComponentProvider"),await Zi(r,new $r))),r._onlineComponents}function ec(r){return ca(r).then(t=>t.syncEngine)}async function to(r){const t=await ca(r),e=t.eventManager;return e.onListen=Uh.bind(null,t.syncEngine),e.onUnlisten=jh.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=qh.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=zh.bind(null,t.syncEngine),e}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fa(r){const t={};return r.timeoutSeconds!==void 0&&(t.timeoutSeconds=r.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eo=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nc(r,t,e){if(!e)throw new x(V.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${t}.`)}function rc(r,t,e,n){if(t===!0&&n===!0)throw new x(V.INVALID_ARGUMENT,`${r} and ${e} cannot be used together.`)}function no(r){if(!M.isDocumentKey(r))throw new x(V.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function ps(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const t=function(n){return n.constructor?n.constructor.name:null}(r);return t?`a custom ${t} object`:"an object"}}return typeof r=="function"?"a function":O()}function he(r,t){if("_delegate"in r&&(r=r._delegate),!(r instanceof t)){if(t.name===r.constructor.name)throw new x(V.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=ps(r);throw new x(V.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ro{constructor(t){var e,n;if(t.host===void 0){if(t.ssl!==void 0)throw new x(V.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=t.host,this.ssl=(e=t.ssl)===null||e===void 0||e;if(this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<1048576)throw new x(V.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}rc("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=fa((n=t.experimentalLongPollingOptions)!==null&&n!==void 0?n:{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new x(V.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new x(V.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new x(V.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&function(n,i){return n.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class gs{constructor(t,e,n,i){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=n,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new ro({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new x(V.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new x(V.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new ro(t),t.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new _u;switch(n.type){case"firstParty":return new vu(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new x(V.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const n=eo.get(e);n&&(N("ComponentProvider","Removing Datastore"),eo.delete(e),n.terminate())}(this),Promise.resolve()}}function sc(r,t,e,n={}){var i;const o=(r=he(r,gs))._getSettings(),u=`${t}:${e}`;if(o.host!=="firestore.googleapis.com"&&o.host!==u&&ce("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),r._setSettings(Object.assign(Object.assign({},o),{host:u,ssl:!1})),n.mockUserToken){let h,f;if(typeof n.mockUserToken=="string")h=n.mockUserToken,f=pt.MOCK_USER;else{h=hu(n.mockUserToken,(i=r._app)===null||i===void 0?void 0:i.options.projectId);const d=n.mockUserToken.sub||n.mockUserToken.user_id;if(!d)throw new x(V.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");f=new pt(d)}r._authCredentials=new yu(new fo(h,f))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rr{constructor(t,e,n){this.converter=e,this._query=n,this.type="query",this.firestore=t}withConverter(t){return new rr(this.firestore,t,this._query)}}class vt{constructor(t,e,n){this.converter=e,this._key=n,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new en(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new vt(this.firestore,t,this._key)}}class en extends rr{constructor(t,e,n){super(t,e,Zr(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new vt(this.firestore,null,new M(t))}withConverter(t){return new en(this.firestore,t,this._path)}}function Pc(r,t,...e){if(r=We(r),arguments.length===1&&(t=mo.newId()),nc("doc","path",t),r instanceof gs){const n=Y.fromString(t,...e);return no(n),new vt(r,null,new M(n))}{if(!(r instanceof vt||r instanceof en))throw new x(V.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(Y.fromString(t,...e));return no(n),new vt(r.firestore,r instanceof en?r.converter:null,new M(n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class so{constructor(t=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new Ho(this,"async_queue_retry"),this.Vu=()=>{const n=kr();n&&N("AsyncQueue","Visibility state changed to "+n.visibilityState),this.t_.jo()},this.mu=t;const e=kr();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.fu(),this.gu(t)}enterRestrictedMode(t){if(!this.Iu){this.Iu=!0,this.Au=t||!1;const e=kr();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this.Vu)}}enqueue(t){if(this.fu(),this.Iu)return new Promise(()=>{});const e=new Xt;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.Pu.push(t),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(t){if(!rn(t))throw t;N("AsyncQueue","Operation failed with retryable error: "+t)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(t){const e=this.mu.then(()=>(this.du=!0,t().catch(n=>{this.Eu=n,this.du=!1;const i=function(u){let h=u.message||"";return u.stack&&(h=u.stack.includes(u.message)?u.stack:u.message+`
`+u.stack),h}(n);throw bt("INTERNAL UNHANDLED ERROR: ",i),n}).then(n=>(this.du=!1,n))));return this.mu=e,e}enqueueAfterDelay(t,e,n){this.fu(),this.Ru.indexOf(t)>-1&&(e=0);const i=cs.createAndSchedule(this,t,e,n,o=>this.yu(o));return this.Tu.push(i),i}fu(){this.Eu&&O()}verifyOperationInProgress(){}async wu(){let t;do t=this.mu,await t;while(t!==this.mu)}Su(t){for(const e of this.Tu)if(e.timerId===t)return!0;return!1}bu(t){return this.wu().then(()=>{this.Tu.sort((e,n)=>e.targetTimeMs-n.targetTimeMs);for(const e of this.Tu)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.wu()})}Du(t){this.Ru.push(t)}yu(t){const e=this.Tu.indexOf(t);this.Tu.splice(e,1)}}function io(r){return function(e,n){if(typeof e!="object"||e===null)return!1;const i=e;for(const o of n)if(o in i&&typeof i[o]=="function")return!0;return!1}(r,["next","error","complete"])}class $n extends gs{constructor(t,e,n,i){super(t,e,n,i),this.type="firestore",this._queue=new so,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new so(t),this._firestoreClient=void 0,await t}}}function Vc(r,t){const e=typeof r=="object"?r:ou(),n=typeof r=="string"?r:t||"(default)",i=au(e,"firestore").getImmediate({identifier:n});if(!i._initialized){const o=uu("firestore");o&&sc(i,...o)}return i}function da(r){if(r._terminated)throw new x(V.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||ic(r),r._firestoreClient}function ic(r){var t,e,n;const i=r._freezeSettings(),o=function(h,f,d,_){return new xu(h,f,d,_.host,_.ssl,_.experimentalForceLongPolling,_.experimentalAutoDetectLongPolling,fa(_.experimentalLongPollingOptions),_.useFetchStreams)}(r._databaseId,((t=r._app)===null||t===void 0?void 0:t.options.appId)||"",r._persistenceKey,i);r._componentsProvider||!((e=i.localCache)===null||e===void 0)&&e._offlineComponentProvider&&(!((n=i.localCache)===null||n===void 0)&&n._onlineComponentProvider)&&(r._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),r._firestoreClient=new Zh(r._authCredentials,r._appCheckCredentials,r._queue,o,r._componentsProvider&&function(h){const f=h==null?void 0:h._online.build();return{_offline:h==null?void 0:h._offline.build(f),_online:f}}(r._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _e{constructor(t){this._byteString=t}static fromBase64String(t){try{return new _e(lt.fromBase64String(t))}catch(e){throw new x(V.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new _e(lt.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _s{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new x(V.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new at(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ma{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ys{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new x(V.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new x(V.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return j(this._lat,t._lat)||j(this._long,t._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ts{constructor(t){this._values=(t||[]).map(e=>e)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(n,i){if(n.length!==i.length)return!1;for(let o=0;o<n.length;++o)if(n[o]!==i[o])return!1;return!0}(this._values,t._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oc=/^__.*__$/;class ac{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return this.fieldMask!==null?new te(t,this.data,this.fieldMask,e,this.fieldTransforms):new sn(t,this.data,e,this.fieldTransforms)}}function pa(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw O()}}class Es{constructor(t,e,n,i,o,u){this.settings=t,this.databaseId=e,this.serializer=n,this.ignoreUndefinedProperties=i,o===void 0&&this.vu(),this.fieldTransforms=o||[],this.fieldMask=u||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(t){return new Es(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(t){var e;const n=(e=this.path)===null||e===void 0?void 0:e.child(t),i=this.Fu({path:n,xu:!1});return i.Ou(t),i}Nu(t){var e;const n=(e=this.path)===null||e===void 0?void 0:e.child(t),i=this.Fu({path:n,xu:!1});return i.vu(),i}Lu(t){return this.Fu({path:void 0,xu:!0})}Bu(t){return Gn(t,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(t){return this.fieldMask.find(e=>t.isPrefixOf(e))!==void 0||this.fieldTransforms.find(e=>t.isPrefixOf(e.field))!==void 0}vu(){if(this.path)for(let t=0;t<this.path.length;t++)this.Ou(this.path.get(t))}Ou(t){if(t.length===0)throw this.Bu("Document fields must not be empty");if(pa(this.Cu)&&oc.test(t))throw this.Bu('Document fields cannot begin and end with "__"')}}class uc{constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=n||tr(t)}Qu(t,e,n,i=!1){return new Es({Cu:t,methodName:e,qu:n,path:at.emptyPath(),xu:!1,ku:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function lc(r){const t=r._freezeSettings(),e=tr(r._databaseId);return new uc(r._databaseId,!!t.ignoreUndefinedProperties,e)}function hc(r,t,e,n,i,o={}){const u=r.Qu(o.merge||o.mergeFields?2:0,t,e,i);Ta("Data must be an object, but it was:",u,n);const h=_a(n,u);let f,d;if(o.merge)f=new At(u.fieldMask),d=u.fieldTransforms;else if(o.mergeFields){const _=[];for(const A of o.mergeFields){const R=cc(t,A,e);if(!u.contains(R))throw new x(V.INVALID_ARGUMENT,`Field '${R}' is specified in your field mask but missing from your input data.`);dc(_,R)||_.push(R)}f=new At(_),d=u.fieldTransforms.filter(A=>f.covers(A.field))}else f=null,d=u.fieldTransforms;return new ac(new Et(h),f,d)}function ga(r,t){if(ya(r=We(r)))return Ta("Unsupported field value:",t,r),_a(r,t);if(r instanceof ma)return function(n,i){if(!pa(i.Cu))throw i.Bu(`${n._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Bu(`${n._methodName}() is not currently supported inside arrays`);const o=n._toFieldTransform(i);o&&i.fieldTransforms.push(o)}(r,t),null;if(r===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),r instanceof Array){if(t.settings.xu&&t.Cu!==4)throw t.Bu("Nested arrays are not supported");return function(n,i){const o=[];let u=0;for(const h of n){let f=ga(h,i.Lu(u));f==null&&(f={nullValue:"NULL_VALUE"}),o.push(f),u++}return{arrayValue:{values:o}}}(r,t)}return function(n,i){if((n=We(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return rl(i.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const o=et.fromDate(n);return{timestampValue:jn(i.serializer,o)}}if(n instanceof et){const o=new et(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:jn(i.serializer,o)}}if(n instanceof ys)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof _e)return{bytesValue:qo(i.serializer,n._byteString)};if(n instanceof vt){const o=i.databaseId,u=n.firestore._databaseId;if(!u.isEqual(o))throw i.Bu(`Document reference is for database ${u.projectId}/${u.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:rs(n.firestore._databaseId||i.databaseId,n._key.path)}}if(n instanceof Ts)return function(u,h){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:u.toArray().map(f=>{if(typeof f!="number")throw h.Bu("VectorValues must only contain numeric values.");return ts(h.serializer,f)})}}}}}}(n,i);throw i.Bu(`Unsupported field value: ${ps(n)}`)}(r,t)}function _a(r,t){const e={};return po(r)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):Te(r,(n,i)=>{const o=ga(i,t.Mu(n));o!=null&&(e[n]=o)}),{mapValue:{fields:e}}}function ya(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof et||r instanceof ys||r instanceof _e||r instanceof vt||r instanceof ma||r instanceof Ts)}function Ta(r,t,e){if(!ya(e)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(e)){const n=ps(e);throw n==="an object"?t.Bu(r+" a custom object"):t.Bu(r+" "+n)}}function cc(r,t,e){if((t=We(t))instanceof _s)return t._internalPath;if(typeof t=="string")return Ea(r,t);throw Gn("Field path arguments must be of type string or ",r,!1,void 0,e)}const fc=new RegExp("[~\\*/\\[\\]]");function Ea(r,t,e){if(t.search(fc)>=0)throw Gn(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,e);try{return new _s(...t.split("."))._internalPath}catch{throw Gn(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,e)}}function Gn(r,t,e,n,i){const o=n&&!n.isEmpty(),u=i!==void 0;let h=`Function ${t}() called with invalid data`;e&&(h+=" (via `toFirestore()`)"),h+=". ";let f="";return(o||u)&&(f+=" (found",o&&(f+=` in field ${n}`),u&&(f+=` in document ${i}`),f+=")"),new x(V.INVALID_ARGUMENT,h+r+f)}function dc(r,t){return r.some(e=>e.isEqual(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class va{constructor(t,e,n,i,o){this._firestore=t,this._userDataWriter=e,this._key=n,this._document=i,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new vt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new mc(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(Ia("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class mc extends va{data(){return super.data()}}function Ia(r,t){return typeof t=="string"?Ea(r,t):t instanceof _s?t._internalPath:t._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pc(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new x(V.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class gc{convertValue(t,e="none"){switch(Zt(t)){case 0:return null;case 1:return t.booleanValue;case 2:return J(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(Jt(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw O()}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const n={};return Te(t,(i,o)=>{n[i]=this.convertValue(o,e)}),n}convertVectorValue(t){var e,n,i;const o=(i=(n=(e=t.fields)===null||e===void 0?void 0:e.value.arrayValue)===null||n===void 0?void 0:n.values)===null||i===void 0?void 0:i.map(u=>J(u.doubleValue));return new Ts(o)}convertGeoPoint(t){return new ys(J(t.latitude),J(t.longitude))}convertArray(t,e){return(t.values||[]).map(n=>this.convertValue(n,e))}convertServerTimestamp(t,e){switch(e){case"previous":const n=Hr(t);return n==null?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(Xe(t));default:return null}}convertTimestamp(t){const e=jt(t);return new et(e.seconds,e.nanos)}convertDocumentKey(t,e){const n=Y.fromString(t);K(Go(n));const i=new Ye(n.get(1),n.get(3)),o=new M(n.popFirst(5));return i.isEqual(e)||bt(`Document ${o} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _c(r,t,e){let n;return n=r?e&&(e.merge||e.mergeFields)?r.toFirestore(t,e):r.toFirestore(t):t,n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ze{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class Aa extends va{constructor(t,e,n,i,o,u){super(t,e,n,i,u),this._firestore=t,this._firestoreImpl=t,this.metadata=o}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new On(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const n=this._document.data.field(Ia("DocumentSnapshot.get",t));if(n!==null)return this._userDataWriter.convertValue(n,e.serverTimestamps)}}}class On extends Aa{data(t={}){return super.data(t)}}class yc{constructor(t,e,n,i){this._firestore=t,this._userDataWriter=e,this._snapshot=i,this.metadata=new ze(i.hasPendingWrites,i.fromCache),this.query=n}get docs(){const t=[];return this.forEach(e=>t.push(e)),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach(n=>{t.call(e,new On(this._firestore,this._userDataWriter,n.key,n,new ze(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new x(V.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(i,o){if(i._snapshot.oldDocs.isEmpty()){let u=0;return i._snapshot.docChanges.map(h=>{const f=new On(i._firestore,i._userDataWriter,h.doc.key,h.doc,new ze(i._snapshot.mutatedKeys.has(h.doc.key),i._snapshot.fromCache),i.query.converter);return h.doc,{type:"added",doc:f,oldIndex:-1,newIndex:u++}})}{let u=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(h=>o||h.type!==3).map(h=>{const f=new On(i._firestore,i._userDataWriter,h.doc.key,h.doc,new ze(i._snapshot.mutatedKeys.has(h.doc.key),i._snapshot.fromCache),i.query.converter);let d=-1,_=-1;return h.type!==0&&(d=u.indexOf(h.doc.key),u=u.delete(h.doc.key)),h.type!==1&&(u=u.add(h.doc),_=u.indexOf(h.doc.key)),{type:Tc(h.type),doc:f,oldIndex:d,newIndex:_}})}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}}function Tc(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return O()}}class wa extends gc{constructor(t){super(),this.firestore=t}convertBytes(t){return new _e(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new vt(this.firestore,null,e)}}function Sc(r,t,e){r=he(r,vt);const n=he(r.firestore,$n),i=_c(r.converter,t,e);return Ec(n,[hc(lc(n),"setDoc",r._key,i,r.converter!==null,e).toMutation(r._key,Nt.none())])}function Cc(r,...t){var e,n,i;r=We(r);let o={includeMetadataChanges:!1,source:"default"},u=0;typeof t[u]!="object"||io(t[u])||(o=t[u],u++);const h={includeMetadataChanges:o.includeMetadataChanges,source:o.source};if(io(t[u])){const A=t[u];t[u]=(e=A.next)===null||e===void 0?void 0:e.bind(A),t[u+1]=(n=A.error)===null||n===void 0?void 0:n.bind(A),t[u+2]=(i=A.complete)===null||i===void 0?void 0:i.bind(A)}let f,d,_;if(r instanceof vt)d=he(r.firestore,$n),_=Zr(r._key.path),f={next:A=>{t[u]&&t[u](vc(d,r,A))},error:t[u+1],complete:t[u+2]};else{const A=he(r,rr);d=he(A.firestore,$n),_=A._query;const R=new wa(d);f={next:S=>{t[u]&&t[u](new yc(d,R,A,S))},error:t[u+1],complete:t[u+2]},pc(r._query)}return function(R,S,D,b){const k=new Jh(b),z=new xh(S,k,D);return R.asyncQueue.enqueueAndForget(async()=>kh(await to(R),z)),()=>{k.Za(),R.asyncQueue.enqueueAndForget(async()=>Dh(await to(R),z))}}(da(d),_,h,f)}function Ec(r,t){return function(n,i){const o=new Xt;return n.asyncQueue.enqueueAndForget(async()=>Kh(await ec(n),i,o)),o.promise}(da(r),t)}function vc(r,t,e){const n=e.docs.get(t._key),i=new wa(r);return new Aa(r,i,t._key,n,new ze(e.hasPendingWrites,e.fromCache),t.converter)}(function(t,e=!0){(function(i){ye=i})(fu),du(new mu("firestore",(n,{instanceIdentifier:i,options:o})=>{const u=n.getProvider("app").getImmediate(),h=new $n(new Tu(n.getProvider("auth-internal")),new Au(n.getProvider("app-check-internal")),function(d,_){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new x(V.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ye(d.options.projectId,_)}(u,i),u);return o=Object.assign({useFetchStreams:e},o),h._setSettings(o),h},"PUBLIC").setMultipleInstances(!0)),vi(Ai,"4.7.3",t),vi(Ai,"4.7.3","esm2017")})();export{gc as AbstractUserDataWriter,_e as Bytes,en as CollectionReference,vt as DocumentReference,Aa as DocumentSnapshot,_s as FieldPath,ma as FieldValue,$n as Firestore,x as FirestoreError,ys as GeoPoint,rr as Query,On as QueryDocumentSnapshot,yc as QuerySnapshot,ze as SnapshotMetadata,et as Timestamp,Ts as VectorValue,mo as _AutoId,lt as _ByteString,Ye as _DatabaseId,M as _DocumentKey,_u as _EmptyAuthCredentialsProvider,at as _FieldPath,he as _cast,ce as _logWarn,rc as _validateIsNotUsedTogether,sc as connectFirestoreEmulator,Pc as doc,da as ensureFirestoreConfigured,Ec as executeWrite,Vc as getFirestore,Cc as onSnapshot,Sc as setDoc};
