function Gv(a){return a&&a.__esModule&&Object.prototype.hasOwnProperty.call(a,"default")?a.default:a}var md={exports:{}},ll={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var l_;function q1(){if(l_)return ll;l_=1;var a=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function i(r,l,c){var d=null;if(c!==void 0&&(d=""+c),l.key!==void 0&&(d=""+l.key),"key"in l){c={};for(var p in l)p!=="key"&&(c[p]=l[p])}else c=l;return l=c.ref,{$$typeof:a,type:r,key:d,ref:l!==void 0?l:null,props:c}}return ll.Fragment=t,ll.jsx=i,ll.jsxs=i,ll}var u_;function H1(){return u_||(u_=1,md.exports=q1()),md.exports}var BI=H1(),gd={exports:{}},_t={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var c_;function j1(){if(c_)return _t;c_=1;var a=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),d=Symbol.for("react.context"),p=Symbol.for("react.forward_ref"),_=Symbol.for("react.suspense"),v=Symbol.for("react.memo"),A=Symbol.for("react.lazy"),S=Symbol.for("react.activity"),k=Symbol.iterator;function F(O){return O===null||typeof O!="object"?null:(O=k&&O[k]||O["@@iterator"],typeof O=="function"?O:null)}var J={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},et=Object.assign,Z={};function ht(O,K,tt){this.props=O,this.context=K,this.refs=Z,this.updater=tt||J}ht.prototype.isReactComponent={},ht.prototype.setState=function(O,K){if(typeof O!="object"&&typeof O!="function"&&O!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,O,K,"setState")},ht.prototype.forceUpdate=function(O){this.updater.enqueueForceUpdate(this,O,"forceUpdate")};function yt(){}yt.prototype=ht.prototype;function mt(O,K,tt){this.props=O,this.context=K,this.refs=Z,this.updater=tt||J}var zt=mt.prototype=new yt;zt.constructor=mt,et(zt,ht.prototype),zt.isPureReactComponent=!0;var ee=Array.isArray;function Vt(){}var I={H:null,A:null,T:null,S:null},b=Object.prototype.hasOwnProperty;function C(O,K,tt){var it=tt.ref;return{$$typeof:a,type:O,key:K,ref:it!==void 0?it:null,props:tt}}function M(O,K){return C(O.type,K,O.props)}function N(O){return typeof O=="object"&&O!==null&&O.$$typeof===a}function U(O){var K={"=":"=0",":":"=2"};return"$"+O.replace(/[=:]/g,function(tt){return K[tt]})}var R=/\/+/g;function ne(O,K){return typeof O=="object"&&O!==null&&O.key!=null?U(""+O.key):K.toString(36)}function we(O){switch(O.status){case"fulfilled":return O.value;case"rejected":throw O.reason;default:switch(typeof O.status=="string"?O.then(Vt,Vt):(O.status="pending",O.then(function(K){O.status==="pending"&&(O.status="fulfilled",O.value=K)},function(K){O.status==="pending"&&(O.status="rejected",O.reason=K)})),O.status){case"fulfilled":return O.value;case"rejected":throw O.reason}}throw O}function j(O,K,tt,it,gt){var At=typeof O;(At==="undefined"||At==="boolean")&&(O=null);var kt=!1;if(O===null)kt=!0;else switch(At){case"bigint":case"string":case"number":kt=!0;break;case"object":switch(O.$$typeof){case a:case t:kt=!0;break;case A:return kt=O._init,j(kt(O._payload),K,tt,it,gt)}}if(kt)return gt=gt(O),kt=it===""?"."+ne(O,0):it,ee(gt)?(tt="",kt!=null&&(tt=kt.replace(R,"$&/")+"/"),j(gt,K,tt,"",function($s){return $s})):gt!=null&&(N(gt)&&(gt=M(gt,tt+(gt.key==null||O&&O.key===gt.key?"":(""+gt.key).replace(R,"$&/")+"/")+kt)),K.push(gt)),1;kt=0;var Ce=it===""?".":it+":";if(ee(O))for(var ie=0;ie<O.length;ie++)it=O[ie],At=Ce+ne(it,ie),kt+=j(it,K,tt,At,gt);else if(ie=F(O),typeof ie=="function")for(O=ie.call(O),ie=0;!(it=O.next()).done;)it=it.value,At=Ce+ne(it,ie++),kt+=j(it,K,tt,At,gt);else if(At==="object"){if(typeof O.then=="function")return j(we(O),K,tt,it,gt);throw K=String(O),Error("Objects are not valid as a React child (found: "+(K==="[object Object]"?"object with keys {"+Object.keys(O).join(", ")+"}":K)+"). If you meant to render a collection of children, use an array instead.")}return kt}function W(O,K,tt){if(O==null)return O;var it=[],gt=0;return j(O,it,"","",function(At){return K.call(tt,At,gt++)}),it}function lt(O){if(O._status===-1){var K=O._result;K=K(),K.then(function(tt){(O._status===0||O._status===-1)&&(O._status=1,O._result=tt)},function(tt){(O._status===0||O._status===-1)&&(O._status=2,O._result=tt)}),O._status===-1&&(O._status=0,O._result=K)}if(O._status===1)return O._result.default;throw O._result}var Lt=typeof reportError=="function"?reportError:function(O){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var K=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof O=="object"&&O!==null&&typeof O.message=="string"?String(O.message):String(O),error:O});if(!window.dispatchEvent(K))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",O);return}console.error(O)},jt={map:W,forEach:function(O,K,tt){W(O,function(){K.apply(this,arguments)},tt)},count:function(O){var K=0;return W(O,function(){K++}),K},toArray:function(O){return W(O,function(K){return K})||[]},only:function(O){if(!N(O))throw Error("React.Children.only expected to receive a single React element child.");return O}};return _t.Activity=S,_t.Children=jt,_t.Component=ht,_t.Fragment=i,_t.Profiler=l,_t.PureComponent=mt,_t.StrictMode=r,_t.Suspense=_,_t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=I,_t.__COMPILER_RUNTIME={__proto__:null,c:function(O){return I.H.useMemoCache(O)}},_t.cache=function(O){return function(){return O.apply(null,arguments)}},_t.cacheSignal=function(){return null},_t.cloneElement=function(O,K,tt){if(O==null)throw Error("The argument must be a React element, but you passed "+O+".");var it=et({},O.props),gt=O.key;if(K!=null)for(At in K.key!==void 0&&(gt=""+K.key),K)!b.call(K,At)||At==="key"||At==="__self"||At==="__source"||At==="ref"&&K.ref===void 0||(it[At]=K[At]);var At=arguments.length-2;if(At===1)it.children=tt;else if(1<At){for(var kt=Array(At),Ce=0;Ce<At;Ce++)kt[Ce]=arguments[Ce+2];it.children=kt}return C(O.type,gt,it)},_t.createContext=function(O){return O={$$typeof:d,_currentValue:O,_currentValue2:O,_threadCount:0,Provider:null,Consumer:null},O.Provider=O,O.Consumer={$$typeof:c,_context:O},O},_t.createElement=function(O,K,tt){var it,gt={},At=null;if(K!=null)for(it in K.key!==void 0&&(At=""+K.key),K)b.call(K,it)&&it!=="key"&&it!=="__self"&&it!=="__source"&&(gt[it]=K[it]);var kt=arguments.length-2;if(kt===1)gt.children=tt;else if(1<kt){for(var Ce=Array(kt),ie=0;ie<kt;ie++)Ce[ie]=arguments[ie+2];gt.children=Ce}if(O&&O.defaultProps)for(it in kt=O.defaultProps,kt)gt[it]===void 0&&(gt[it]=kt[it]);return C(O,At,gt)},_t.createRef=function(){return{current:null}},_t.forwardRef=function(O){return{$$typeof:p,render:O}},_t.isValidElement=N,_t.lazy=function(O){return{$$typeof:A,_payload:{_status:-1,_result:O},_init:lt}},_t.memo=function(O,K){return{$$typeof:v,type:O,compare:K===void 0?null:K}},_t.startTransition=function(O){var K=I.T,tt={};I.T=tt;try{var it=O(),gt=I.S;gt!==null&&gt(tt,it),typeof it=="object"&&it!==null&&typeof it.then=="function"&&it.then(Vt,Lt)}catch(At){Lt(At)}finally{K!==null&&tt.types!==null&&(K.types=tt.types),I.T=K}},_t.unstable_useCacheRefresh=function(){return I.H.useCacheRefresh()},_t.use=function(O){return I.H.use(O)},_t.useActionState=function(O,K,tt){return I.H.useActionState(O,K,tt)},_t.useCallback=function(O,K){return I.H.useCallback(O,K)},_t.useContext=function(O){return I.H.useContext(O)},_t.useDebugValue=function(){},_t.useDeferredValue=function(O,K){return I.H.useDeferredValue(O,K)},_t.useEffect=function(O,K){return I.H.useEffect(O,K)},_t.useEffectEvent=function(O){return I.H.useEffectEvent(O)},_t.useId=function(){return I.H.useId()},_t.useImperativeHandle=function(O,K,tt){return I.H.useImperativeHandle(O,K,tt)},_t.useInsertionEffect=function(O,K){return I.H.useInsertionEffect(O,K)},_t.useLayoutEffect=function(O,K){return I.H.useLayoutEffect(O,K)},_t.useMemo=function(O,K){return I.H.useMemo(O,K)},_t.useOptimistic=function(O,K){return I.H.useOptimistic(O,K)},_t.useReducer=function(O,K,tt){return I.H.useReducer(O,K,tt)},_t.useRef=function(O){return I.H.useRef(O)},_t.useState=function(O){return I.H.useState(O)},_t.useSyncExternalStore=function(O,K,tt){return I.H.useSyncExternalStore(O,K,tt)},_t.useTransition=function(){return I.H.useTransition()},_t.version="19.2.3",_t}var h_;function nm(){return h_||(h_=1,gd.exports=j1()),gd.exports}var La=nm();const qI=Gv(La);var pd={exports:{}},ul={},yd={exports:{}},_d={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var f_;function G1(){return f_||(f_=1,(function(a){function t(j,W){var lt=j.length;j.push(W);t:for(;0<lt;){var Lt=lt-1>>>1,jt=j[Lt];if(0<l(jt,W))j[Lt]=W,j[lt]=jt,lt=Lt;else break t}}function i(j){return j.length===0?null:j[0]}function r(j){if(j.length===0)return null;var W=j[0],lt=j.pop();if(lt!==W){j[0]=lt;t:for(var Lt=0,jt=j.length,O=jt>>>1;Lt<O;){var K=2*(Lt+1)-1,tt=j[K],it=K+1,gt=j[it];if(0>l(tt,lt))it<jt&&0>l(gt,tt)?(j[Lt]=gt,j[it]=lt,Lt=it):(j[Lt]=tt,j[K]=lt,Lt=K);else if(it<jt&&0>l(gt,lt))j[Lt]=gt,j[it]=lt,Lt=it;else break t}}return W}function l(j,W){var lt=j.sortIndex-W.sortIndex;return lt!==0?lt:j.id-W.id}if(a.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;a.unstable_now=function(){return c.now()}}else{var d=Date,p=d.now();a.unstable_now=function(){return d.now()-p}}var _=[],v=[],A=1,S=null,k=3,F=!1,J=!1,et=!1,Z=!1,ht=typeof setTimeout=="function"?setTimeout:null,yt=typeof clearTimeout=="function"?clearTimeout:null,mt=typeof setImmediate<"u"?setImmediate:null;function zt(j){for(var W=i(v);W!==null;){if(W.callback===null)r(v);else if(W.startTime<=j)r(v),W.sortIndex=W.expirationTime,t(_,W);else break;W=i(v)}}function ee(j){if(et=!1,zt(j),!J)if(i(_)!==null)J=!0,Vt||(Vt=!0,U());else{var W=i(v);W!==null&&we(ee,W.startTime-j)}}var Vt=!1,I=-1,b=5,C=-1;function M(){return Z?!0:!(a.unstable_now()-C<b)}function N(){if(Z=!1,Vt){var j=a.unstable_now();C=j;var W=!0;try{t:{J=!1,et&&(et=!1,yt(I),I=-1),F=!0;var lt=k;try{e:{for(zt(j),S=i(_);S!==null&&!(S.expirationTime>j&&M());){var Lt=S.callback;if(typeof Lt=="function"){S.callback=null,k=S.priorityLevel;var jt=Lt(S.expirationTime<=j);if(j=a.unstable_now(),typeof jt=="function"){S.callback=jt,zt(j),W=!0;break e}S===i(_)&&r(_),zt(j)}else r(_);S=i(_)}if(S!==null)W=!0;else{var O=i(v);O!==null&&we(ee,O.startTime-j),W=!1}}break t}finally{S=null,k=lt,F=!1}W=void 0}}finally{W?U():Vt=!1}}}var U;if(typeof mt=="function")U=function(){mt(N)};else if(typeof MessageChannel<"u"){var R=new MessageChannel,ne=R.port2;R.port1.onmessage=N,U=function(){ne.postMessage(null)}}else U=function(){ht(N,0)};function we(j,W){I=ht(function(){j(a.unstable_now())},W)}a.unstable_IdlePriority=5,a.unstable_ImmediatePriority=1,a.unstable_LowPriority=4,a.unstable_NormalPriority=3,a.unstable_Profiling=null,a.unstable_UserBlockingPriority=2,a.unstable_cancelCallback=function(j){j.callback=null},a.unstable_forceFrameRate=function(j){0>j||125<j?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):b=0<j?Math.floor(1e3/j):5},a.unstable_getCurrentPriorityLevel=function(){return k},a.unstable_next=function(j){switch(k){case 1:case 2:case 3:var W=3;break;default:W=k}var lt=k;k=W;try{return j()}finally{k=lt}},a.unstable_requestPaint=function(){Z=!0},a.unstable_runWithPriority=function(j,W){switch(j){case 1:case 2:case 3:case 4:case 5:break;default:j=3}var lt=k;k=j;try{return W()}finally{k=lt}},a.unstable_scheduleCallback=function(j,W,lt){var Lt=a.unstable_now();switch(typeof lt=="object"&&lt!==null?(lt=lt.delay,lt=typeof lt=="number"&&0<lt?Lt+lt:Lt):lt=Lt,j){case 1:var jt=-1;break;case 2:jt=250;break;case 5:jt=1073741823;break;case 4:jt=1e4;break;default:jt=5e3}return jt=lt+jt,j={id:A++,callback:W,priorityLevel:j,startTime:lt,expirationTime:jt,sortIndex:-1},lt>Lt?(j.sortIndex=lt,t(v,j),i(_)===null&&j===i(v)&&(et?(yt(I),I=-1):et=!0,we(ee,lt-Lt))):(j.sortIndex=jt,t(_,j),J||F||(J=!0,Vt||(Vt=!0,U()))),j},a.unstable_shouldYield=M,a.unstable_wrapCallback=function(j){var W=k;return function(){var lt=k;k=W;try{return j.apply(this,arguments)}finally{k=lt}}}})(_d)),_d}var d_;function F1(){return d_||(d_=1,yd.exports=G1()),yd.exports}var vd={exports:{}},Qe={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var m_;function Q1(){if(m_)return Qe;m_=1;var a=nm();function t(_){var v="https://react.dev/errors/"+_;if(1<arguments.length){v+="?args[]="+encodeURIComponent(arguments[1]);for(var A=2;A<arguments.length;A++)v+="&args[]="+encodeURIComponent(arguments[A])}return"Minified React error #"+_+"; visit "+v+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var r={d:{f:i,r:function(){throw Error(t(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(_,v,A){var S=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:S==null?null:""+S,children:_,containerInfo:v,implementation:A}}var d=a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function p(_,v){if(_==="font")return"";if(typeof v=="string")return v==="use-credentials"?v:""}return Qe.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=r,Qe.createPortal=function(_,v){var A=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!v||v.nodeType!==1&&v.nodeType!==9&&v.nodeType!==11)throw Error(t(299));return c(_,v,null,A)},Qe.flushSync=function(_){var v=d.T,A=r.p;try{if(d.T=null,r.p=2,_)return _()}finally{d.T=v,r.p=A,r.d.f()}},Qe.preconnect=function(_,v){typeof _=="string"&&(v?(v=v.crossOrigin,v=typeof v=="string"?v==="use-credentials"?v:"":void 0):v=null,r.d.C(_,v))},Qe.prefetchDNS=function(_){typeof _=="string"&&r.d.D(_)},Qe.preinit=function(_,v){if(typeof _=="string"&&v&&typeof v.as=="string"){var A=v.as,S=p(A,v.crossOrigin),k=typeof v.integrity=="string"?v.integrity:void 0,F=typeof v.fetchPriority=="string"?v.fetchPriority:void 0;A==="style"?r.d.S(_,typeof v.precedence=="string"?v.precedence:void 0,{crossOrigin:S,integrity:k,fetchPriority:F}):A==="script"&&r.d.X(_,{crossOrigin:S,integrity:k,fetchPriority:F,nonce:typeof v.nonce=="string"?v.nonce:void 0})}},Qe.preinitModule=function(_,v){if(typeof _=="string")if(typeof v=="object"&&v!==null){if(v.as==null||v.as==="script"){var A=p(v.as,v.crossOrigin);r.d.M(_,{crossOrigin:A,integrity:typeof v.integrity=="string"?v.integrity:void 0,nonce:typeof v.nonce=="string"?v.nonce:void 0})}}else v==null&&r.d.M(_)},Qe.preload=function(_,v){if(typeof _=="string"&&typeof v=="object"&&v!==null&&typeof v.as=="string"){var A=v.as,S=p(A,v.crossOrigin);r.d.L(_,A,{crossOrigin:S,integrity:typeof v.integrity=="string"?v.integrity:void 0,nonce:typeof v.nonce=="string"?v.nonce:void 0,type:typeof v.type=="string"?v.type:void 0,fetchPriority:typeof v.fetchPriority=="string"?v.fetchPriority:void 0,referrerPolicy:typeof v.referrerPolicy=="string"?v.referrerPolicy:void 0,imageSrcSet:typeof v.imageSrcSet=="string"?v.imageSrcSet:void 0,imageSizes:typeof v.imageSizes=="string"?v.imageSizes:void 0,media:typeof v.media=="string"?v.media:void 0})}},Qe.preloadModule=function(_,v){if(typeof _=="string")if(v){var A=p(v.as,v.crossOrigin);r.d.m(_,{as:typeof v.as=="string"&&v.as!=="script"?v.as:void 0,crossOrigin:A,integrity:typeof v.integrity=="string"?v.integrity:void 0})}else r.d.m(_)},Qe.requestFormReset=function(_){r.d.r(_)},Qe.unstable_batchedUpdates=function(_,v){return _(v)},Qe.useFormState=function(_,v,A){return d.H.useFormState(_,v,A)},Qe.useFormStatus=function(){return d.H.useHostTransitionStatus()},Qe.version="19.2.3",Qe}var g_;function K1(){if(g_)return vd.exports;g_=1;function a(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a)}catch(t){console.error(t)}}return a(),vd.exports=Q1(),vd.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var p_;function Y1(){if(p_)return ul;p_=1;var a=F1(),t=nm(),i=K1();function r(e){var n="https://react.dev/errors/"+e;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var s=2;s<arguments.length;s++)n+="&args[]="+encodeURIComponent(arguments[s])}return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function c(e){var n=e,s=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,(n.flags&4098)!==0&&(s=n.return),e=n.return;while(e)}return n.tag===3?s:null}function d(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function p(e){if(e.tag===31){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function _(e){if(c(e)!==e)throw Error(r(188))}function v(e){var n=e.alternate;if(!n){if(n=c(e),n===null)throw Error(r(188));return n!==e?null:e}for(var s=e,o=n;;){var h=s.return;if(h===null)break;var f=h.alternate;if(f===null){if(o=h.return,o!==null){s=o;continue}break}if(h.child===f.child){for(f=h.child;f;){if(f===s)return _(h),e;if(f===o)return _(h),n;f=f.sibling}throw Error(r(188))}if(s.return!==o.return)s=h,o=f;else{for(var g=!1,E=h.child;E;){if(E===s){g=!0,s=h,o=f;break}if(E===o){g=!0,o=h,s=f;break}E=E.sibling}if(!g){for(E=f.child;E;){if(E===s){g=!0,s=f,o=h;break}if(E===o){g=!0,o=f,s=h;break}E=E.sibling}if(!g)throw Error(r(189))}}if(s.alternate!==o)throw Error(r(190))}if(s.tag!==3)throw Error(r(188));return s.stateNode.current===s?e:n}function A(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e;for(e=e.child;e!==null;){if(n=A(e),n!==null)return n;e=e.sibling}return null}var S=Object.assign,k=Symbol.for("react.element"),F=Symbol.for("react.transitional.element"),J=Symbol.for("react.portal"),et=Symbol.for("react.fragment"),Z=Symbol.for("react.strict_mode"),ht=Symbol.for("react.profiler"),yt=Symbol.for("react.consumer"),mt=Symbol.for("react.context"),zt=Symbol.for("react.forward_ref"),ee=Symbol.for("react.suspense"),Vt=Symbol.for("react.suspense_list"),I=Symbol.for("react.memo"),b=Symbol.for("react.lazy"),C=Symbol.for("react.activity"),M=Symbol.for("react.memo_cache_sentinel"),N=Symbol.iterator;function U(e){return e===null||typeof e!="object"?null:(e=N&&e[N]||e["@@iterator"],typeof e=="function"?e:null)}var R=Symbol.for("react.client.reference");function ne(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===R?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case et:return"Fragment";case ht:return"Profiler";case Z:return"StrictMode";case ee:return"Suspense";case Vt:return"SuspenseList";case C:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case J:return"Portal";case mt:return e.displayName||"Context";case yt:return(e._context.displayName||"Context")+".Consumer";case zt:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case I:return n=e.displayName||null,n!==null?n:ne(e.type)||"Memo";case b:n=e._payload,e=e._init;try{return ne(e(n))}catch{}}return null}var we=Array.isArray,j=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,W=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,lt={pending:!1,data:null,method:null,action:null},Lt=[],jt=-1;function O(e){return{current:e}}function K(e){0>jt||(e.current=Lt[jt],Lt[jt]=null,jt--)}function tt(e,n){jt++,Lt[jt]=e.current,e.current=n}var it=O(null),gt=O(null),At=O(null),kt=O(null);function Ce(e,n){switch(tt(At,n),tt(gt,e),tt(it,null),n.nodeType){case 9:case 11:e=(e=n.documentElement)&&(e=e.namespaceURI)?Oy(e):0;break;default:if(e=n.tagName,n=n.namespaceURI)n=Oy(n),e=My(n,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}K(it),tt(it,e)}function ie(){K(it),K(gt),K(At)}function $s(e){e.memoizedState!==null&&tt(kt,e);var n=it.current,s=My(n,e.type);n!==s&&(tt(gt,e),tt(it,s))}function qr(e){gt.current===e&&(K(it),K(gt)),kt.current===e&&(K(kt),sl._currentValue=lt)}var Hr,jr;function Xn(e){if(Hr===void 0)try{throw Error()}catch(s){var n=s.stack.trim().match(/\n( *(at )?)/);Hr=n&&n[1]||"",jr=-1<s.stack.indexOf(`
    at`)?" (<anonymous>)":-1<s.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Hr+e+jr}var io=!1;function Js(e,n){if(!e||io)return"";io=!0;var s=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(n){var Q=function(){throw Error()};if(Object.defineProperty(Q.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(Q,[])}catch(q){var z=q}Reflect.construct(e,[],Q)}else{try{Q.call()}catch(q){z=q}e.call(Q.prototype)}}else{try{throw Error()}catch(q){z=q}(Q=e())&&typeof Q.catch=="function"&&Q.catch(function(){})}}catch(q){if(q&&z&&typeof q.stack=="string")return[q.stack,z.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var h=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");h&&h.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var f=o.DetermineComponentFrameRoot(),g=f[0],E=f[1];if(g&&E){var w=g.split(`
`),P=E.split(`
`);for(h=o=0;o<w.length&&!w[o].includes("DetermineComponentFrameRoot");)o++;for(;h<P.length&&!P[h].includes("DetermineComponentFrameRoot");)h++;if(o===w.length||h===P.length)for(o=w.length-1,h=P.length-1;1<=o&&0<=h&&w[o]!==P[h];)h--;for(;1<=o&&0<=h;o--,h--)if(w[o]!==P[h]){if(o!==1||h!==1)do if(o--,h--,0>h||w[o]!==P[h]){var H=`
`+w[o].replace(" at new "," at ");return e.displayName&&H.includes("<anonymous>")&&(H=H.replace("<anonymous>",e.displayName)),H}while(1<=o&&0<=h);break}}}finally{io=!1,Error.prepareStackTrace=s}return(s=e?e.displayName||e.name:"")?Xn(s):""}function so(e,n){switch(e.tag){case 26:case 27:case 5:return Xn(e.type);case 16:return Xn("Lazy");case 13:return e.child!==n&&n!==null?Xn("Suspense Fallback"):Xn("Suspense");case 19:return Xn("SuspenseList");case 0:case 15:return Js(e.type,!1);case 11:return Js(e.type.render,!1);case 1:return Js(e.type,!0);case 31:return Xn("Activity");default:return""}}function ro(e){try{var n="",s=null;do n+=so(e,s),s=e,e=e.return;while(e);return n}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var ge=Object.prototype.hasOwnProperty,Ie=a.unstable_scheduleCallback,ts=a.unstable_cancelCallback,gh=a.unstable_shouldYield,zl=a.unstable_requestPaint,$e=a.unstable_now,Ws=a.unstable_getCurrentPriorityLevel,ao=a.unstable_ImmediatePriority,oo=a.unstable_UserBlockingPriority,es=a.unstable_NormalPriority,ph=a.unstable_LowPriority,Bl=a.unstable_IdlePriority,ql=a.log,Hl=a.unstable_setDisableYieldValue,kn=null,xe=null;function _n(e){if(typeof ql=="function"&&Hl(e),xe&&typeof xe.setStrictMode=="function")try{xe.setStrictMode(kn,e)}catch{}}var ce=Math.clz32?Math.clz32:Gl,jl=Math.log,Gr=Math.LN2;function Gl(e){return e>>>=0,e===0?32:31-(jl(e)/Gr|0)|0}var Zn=256,tr=262144,pe=4194304;function $n(e){var n=e&42;if(n!==0)return n;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Jn(e,n,s){var o=e.pendingLanes;if(o===0)return 0;var h=0,f=e.suspendedLanes,g=e.pingedLanes;e=e.warmLanes;var E=o&134217727;return E!==0?(o=E&~f,o!==0?h=$n(o):(g&=E,g!==0?h=$n(g):s||(s=E&~e,s!==0&&(h=$n(s))))):(E=o&~f,E!==0?h=$n(E):g!==0?h=$n(g):s||(s=o&~e,s!==0&&(h=$n(s)))),h===0?0:n!==0&&n!==h&&(n&f)===0&&(f=h&-h,s=n&-n,f>=s||f===32&&(s&4194048)!==0)?n:h}function Un(e,n){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&n)===0}function yh(e,n){switch(e){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Fl(){var e=pe;return pe<<=1,(pe&62914560)===0&&(pe=4194304),e}function Wn(e){for(var n=[],s=0;31>s;s++)n.push(e);return n}function er(e,n){e.pendingLanes|=n,n!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function _h(e,n,s,o,h,f){var g=e.pendingLanes;e.pendingLanes=s,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=s,e.entangledLanes&=s,e.errorRecoveryDisabledLanes&=s,e.shellSuspendCounter=0;var E=e.entanglements,w=e.expirationTimes,P=e.hiddenUpdates;for(s=g&~s;0<s;){var H=31-ce(s),Q=1<<H;E[H]=0,w[H]=-1;var z=P[H];if(z!==null)for(P[H]=null,H=0;H<z.length;H++){var q=z[H];q!==null&&(q.lane&=-536870913)}s&=~Q}o!==0&&nr(e,o,0),f!==0&&h===0&&e.tag!==0&&(e.suspendedLanes|=f&~(g&~n))}function nr(e,n,s){e.pendingLanes|=n,e.suspendedLanes&=~n;var o=31-ce(n);e.entangledLanes|=n,e.entanglements[o]=e.entanglements[o]|1073741824|s&261930}function lo(e,n){var s=e.entangledLanes|=n;for(e=e.entanglements;s;){var o=31-ce(s),h=1<<o;h&n|e[o]&n&&(e[o]|=n),s&=~h}}function uo(e,n){var s=n&-n;return s=(s&42)!==0?1:ir(s),(s&(e.suspendedLanes|n))!==0?0:s}function ir(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function wi(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Ql(){var e=W.p;return e!==0?e:(e=window.event,e===void 0?32:e_(e.type))}function Ln(e,n){var s=W.p;try{return W.p=e,n()}finally{W.p=s}}var xn=Math.random().toString(36).slice(2),ye="__reactFiber$"+xn,Me="__reactProps$"+xn,ti="__reactContainer$"+xn,Fr="__reactEvents$"+xn,vh="__reactListeners$"+xn,Kl="__reactHandles$"+xn,Yl="__reactResources$"+xn,ei="__reactMarker$"+xn;function Qr(e){delete e[ye],delete e[Me],delete e[Fr],delete e[vh],delete e[Kl]}function ni(e){var n=e[ye];if(n)return n;for(var s=e.parentNode;s;){if(n=s[ti]||s[ye]){if(s=n.alternate,n.child!==null||s!==null&&s.child!==null)for(e=zy(e);e!==null;){if(s=e[ye])return s;e=zy(e)}return n}e=s,s=e.parentNode}return null}function vn(e){if(e=e[ye]||e[ti]){var n=e.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return e}return null}function un(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e.stateNode;throw Error(r(33))}function ii(e){var n=e[Yl];return n||(n=e[Yl]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function _e(e){e[ei]=!0}var co=new Set,ho={};function si(e,n){ri(e,n),ri(e+"Capture",n)}function ri(e,n){for(ho[e]=n,e=0;e<n.length;e++)co.add(n[e])}var fo=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),mo={},go={};function Xl(e){return ge.call(go,e)?!0:ge.call(mo,e)?!1:fo.test(e)?go[e]=!0:(mo[e]=!0,!1)}function Kr(e,n,s){if(Xl(n))if(s===null)e.removeAttribute(n);else{switch(typeof s){case"undefined":case"function":case"symbol":e.removeAttribute(n);return;case"boolean":var o=n.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){e.removeAttribute(n);return}}e.setAttribute(n,""+s)}}function cn(e,n,s){if(s===null)e.removeAttribute(n);else{switch(typeof s){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttribute(n,""+s)}}function ve(e,n,s,o){if(o===null)e.removeAttribute(s);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(s);return}e.setAttributeNS(n,s,""+o)}}function Ve(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function ns(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function po(e,n,s){var o=Object.getOwnPropertyDescriptor(e.constructor.prototype,n);if(!e.hasOwnProperty(n)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var h=o.get,f=o.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return h.call(this)},set:function(g){s=""+g,f.call(this,g)}}),Object.defineProperty(e,n,{enumerable:o.enumerable}),{getValue:function(){return s},setValue:function(g){s=""+g},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function Gt(e){if(!e._valueTracker){var n=ns(e)?"checked":"value";e._valueTracker=po(e,n,""+e[n])}}function sr(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var s=n.getValue(),o="";return e&&(o=ns(e)?e.checked?"true":"false":e.value),e=o,e!==s?(n.setValue(e),!0):!1}function ai(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var rr=/[\n"\\]/g;function tn(e){return e.replace(rr,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function Yr(e,n,s,o,h,f,g,E){e.name="",g!=null&&typeof g!="function"&&typeof g!="symbol"&&typeof g!="boolean"?e.type=g:e.removeAttribute("type"),n!=null?g==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+Ve(n)):e.value!==""+Ve(n)&&(e.value=""+Ve(n)):g!=="submit"&&g!=="reset"||e.removeAttribute("value"),n!=null?yo(e,g,Ve(n)):s!=null?yo(e,g,Ve(s)):o!=null&&e.removeAttribute("value"),h==null&&f!=null&&(e.defaultChecked=!!f),h!=null&&(e.checked=h&&typeof h!="function"&&typeof h!="symbol"),E!=null&&typeof E!="function"&&typeof E!="symbol"&&typeof E!="boolean"?e.name=""+Ve(E):e.removeAttribute("name")}function Zl(e,n,s,o,h,f,g,E){if(f!=null&&typeof f!="function"&&typeof f!="symbol"&&typeof f!="boolean"&&(e.type=f),n!=null||s!=null){if(!(f!=="submit"&&f!=="reset"||n!=null)){Gt(e);return}s=s!=null?""+Ve(s):"",n=n!=null?""+Ve(n):s,E||n===e.value||(e.value=n),e.defaultValue=n}o=o??h,o=typeof o!="function"&&typeof o!="symbol"&&!!o,e.checked=E?e.checked:!!o,e.defaultChecked=!!o,g!=null&&typeof g!="function"&&typeof g!="symbol"&&typeof g!="boolean"&&(e.name=g),Gt(e)}function yo(e,n,s){n==="number"&&ai(e.ownerDocument)===e||e.defaultValue===""+s||(e.defaultValue=""+s)}function is(e,n,s,o){if(e=e.options,n){n={};for(var h=0;h<s.length;h++)n["$"+s[h]]=!0;for(s=0;s<e.length;s++)h=n.hasOwnProperty("$"+e[s].value),e[s].selected!==h&&(e[s].selected=h),h&&o&&(e[s].defaultSelected=!0)}else{for(s=""+Ve(s),n=null,h=0;h<e.length;h++){if(e[h].value===s){e[h].selected=!0,o&&(e[h].defaultSelected=!0);return}n!==null||e[h].disabled||(n=e[h])}n!==null&&(n.selected=!0)}}function $l(e,n,s){if(n!=null&&(n=""+Ve(n),n!==e.value&&(e.value=n),s==null)){e.defaultValue!==n&&(e.defaultValue=n);return}e.defaultValue=s!=null?""+Ve(s):""}function ss(e,n,s,o){if(n==null){if(o!=null){if(s!=null)throw Error(r(92));if(we(o)){if(1<o.length)throw Error(r(93));o=o[0]}s=o}s==null&&(s=""),n=s}s=Ve(n),e.defaultValue=s,o=e.textContent,o===s&&o!==""&&o!==null&&(e.value=o),Gt(e)}function en(e,n){if(n){var s=e.firstChild;if(s&&s===e.lastChild&&s.nodeType===3){s.nodeValue=n;return}}e.textContent=n}var Jl=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function _o(e,n,s){var o=n.indexOf("--")===0;s==null||typeof s=="boolean"||s===""?o?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="":o?e.setProperty(n,s):typeof s!="number"||s===0||Jl.has(n)?n==="float"?e.cssFloat=s:e[n]=(""+s).trim():e[n]=s+"px"}function vo(e,n,s){if(n!=null&&typeof n!="object")throw Error(r(62));if(e=e.style,s!=null){for(var o in s)!s.hasOwnProperty(o)||n!=null&&n.hasOwnProperty(o)||(o.indexOf("--")===0?e.setProperty(o,""):o==="float"?e.cssFloat="":e[o]="");for(var h in n)o=n[h],n.hasOwnProperty(h)&&s[h]!==o&&_o(e,h,o)}else for(var f in n)n.hasOwnProperty(f)&&_o(e,f,n[f])}function Xr(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Wl=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),rs=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Zr(e){return rs.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Pn(){}var Eo=null;function En(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var as=null,oi=null;function ar(e){var n=vn(e);if(n&&(e=n.stateNode)){var s=e[Me]||null;t:switch(e=n.stateNode,n.type){case"input":if(Yr(e,s.value,s.defaultValue,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name),n=s.name,s.type==="radio"&&n!=null){for(s=e;s.parentNode;)s=s.parentNode;for(s=s.querySelectorAll('input[name="'+tn(""+n)+'"][type="radio"]'),n=0;n<s.length;n++){var o=s[n];if(o!==e&&o.form===e.form){var h=o[Me]||null;if(!h)throw Error(r(90));Yr(o,h.value,h.defaultValue,h.defaultValue,h.checked,h.defaultChecked,h.type,h.name)}}for(n=0;n<s.length;n++)o=s[n],o.form===e.form&&sr(o)}break t;case"textarea":$l(e,s.value,s.defaultValue);break t;case"select":n=s.value,n!=null&&is(e,!!s.multiple,n,!1)}}}var $r=!1;function os(e,n,s){if($r)return e(n,s);$r=!0;try{var o=e(n);return o}finally{if($r=!1,(as!==null||oi!==null)&&(Qu(),as&&(n=as,e=oi,oi=as=null,ar(n),e)))for(n=0;n<e.length;n++)ar(e[n])}}function zn(e,n){var s=e.stateNode;if(s===null)return null;var o=s[Me]||null;if(o===null)return null;s=o[n];t:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(e=e.type,o=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!o;break t;default:e=!1}if(e)return null;if(s&&typeof s!="function")throw Error(r(231,n,typeof s));return s}var Tn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),or=!1;if(Tn)try{var Kt={};Object.defineProperty(Kt,"passive",{get:function(){or=!0}}),window.addEventListener("test",Kt,Kt),window.removeEventListener("test",Kt,Kt)}catch{or=!1}var li=null,To=null,lr=null;function Ao(){if(lr)return lr;var e,n=To,s=n.length,o,h="value"in li?li.value:li.textContent,f=h.length;for(e=0;e<s&&n[e]===h[e];e++);var g=s-e;for(o=1;o<=g&&n[s-o]===h[f-o];o++);return lr=h.slice(e,1<o?1-o:void 0)}function ur(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function Ci(){return!0}function Bn(){return!1}function Pe(e){function n(s,o,h,f,g){this._reactName=s,this._targetInst=h,this.type=o,this.nativeEvent=f,this.target=g,this.currentTarget=null;for(var E in e)e.hasOwnProperty(E)&&(s=e[E],this[E]=s?s(f):f[E]);return this.isDefaultPrevented=(f.defaultPrevented!=null?f.defaultPrevented:f.returnValue===!1)?Ci:Bn,this.isPropagationStopped=Bn,this}return S(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var s=this.nativeEvent;s&&(s.preventDefault?s.preventDefault():typeof s.returnValue!="unknown"&&(s.returnValue=!1),this.isDefaultPrevented=Ci)},stopPropagation:function(){var s=this.nativeEvent;s&&(s.stopPropagation?s.stopPropagation():typeof s.cancelBubble!="unknown"&&(s.cancelBubble=!0),this.isPropagationStopped=Ci)},persist:function(){},isPersistent:Ci}),n}var Ii={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ui=Pe(Ii),ls=S({},Ii,{view:0,detail:0}),So=Pe(ls),us,Jr,ci,Wr=S({},ls,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:cs,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==ci&&(ci&&e.type==="mousemove"?(us=e.screenX-ci.screenX,Jr=e.screenY-ci.screenY):Jr=us=0,ci=e),us)},movementY:function(e){return"movementY"in e?e.movementY:Jr}}),bo=Pe(Wr),cr=S({},Wr,{dataTransfer:0}),tu=Pe(cr),eu=S({},ls,{relatedTarget:0}),hr=Pe(eu),Ro=S({},Ii,{animationName:0,elapsedTime:0,pseudoElement:0}),nu=Pe(Ro),ta=S({},Ii,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),iu=Pe(ta),su=S({},Ii,{data:0}),hi=Pe(su),ru={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},au={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},ou={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function lu(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=ou[e])?!!n[e]:!1}function cs(){return lu}var Je=S({},ls,{key:function(e){if(e.key){var n=ru[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=ur(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?au[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:cs,charCode:function(e){return e.type==="keypress"?ur(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?ur(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),uu=Pe(Je),cu=S({},Wr,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Di=Pe(cu),u=S({},ls,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:cs}),m=Pe(u),y=S({},Ii,{propertyName:0,elapsedTime:0,pseudoElement:0}),T=Pe(y),L=S({},Wr,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),B=Pe(L),$=S({},Ii,{newState:0,oldState:0}),Et=Pe($),he=[9,13,27,32],Bt=Tn&&"CompositionEvent"in window,se=null;Tn&&"documentMode"in document&&(se=document.documentMode);var An=Tn&&"TextEvent"in window&&!se,fi=Tn&&(!Bt||se&&8<se&&11>=se),qn=" ",Hn=!1;function fr(e,n){switch(e){case"keyup":return he.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function ea(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var na=!1;function hT(e,n){switch(e){case"compositionend":return ea(n);case"keypress":return n.which!==32?null:(Hn=!0,qn);case"textInput":return e=n.data,e===qn&&Hn?null:e;default:return null}}function fT(e,n){if(na)return e==="compositionend"||!Bt&&fr(e,n)?(e=Ao(),lr=To=li=null,na=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return fi&&n.locale!=="ko"?null:n.data;default:return null}}var dT={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Hm(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!dT[e.type]:n==="textarea"}function jm(e,n,s,o){as?oi?oi.push(o):oi=[o]:as=o,n=Wu(n,"onChange"),0<n.length&&(s=new ui("onChange","change",null,s,o),e.push({event:s,listeners:n}))}var wo=null,Co=null;function mT(e){Ry(e,0)}function hu(e){var n=un(e);if(sr(n))return e}function Gm(e,n){if(e==="change")return n}var Fm=!1;if(Tn){var Eh;if(Tn){var Th="oninput"in document;if(!Th){var Qm=document.createElement("div");Qm.setAttribute("oninput","return;"),Th=typeof Qm.oninput=="function"}Eh=Th}else Eh=!1;Fm=Eh&&(!document.documentMode||9<document.documentMode)}function Km(){wo&&(wo.detachEvent("onpropertychange",Ym),Co=wo=null)}function Ym(e){if(e.propertyName==="value"&&hu(Co)){var n=[];jm(n,Co,e,En(e)),os(mT,n)}}function gT(e,n,s){e==="focusin"?(Km(),wo=n,Co=s,wo.attachEvent("onpropertychange",Ym)):e==="focusout"&&Km()}function pT(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return hu(Co)}function yT(e,n){if(e==="click")return hu(n)}function _T(e,n){if(e==="input"||e==="change")return hu(n)}function vT(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var hn=typeof Object.is=="function"?Object.is:vT;function Io(e,n){if(hn(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var s=Object.keys(e),o=Object.keys(n);if(s.length!==o.length)return!1;for(o=0;o<s.length;o++){var h=s[o];if(!ge.call(n,h)||!hn(e[h],n[h]))return!1}return!0}function Xm(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Zm(e,n){var s=Xm(e);e=0;for(var o;s;){if(s.nodeType===3){if(o=e+s.textContent.length,e<=n&&o>=n)return{node:s,offset:n-e};e=o}t:{for(;s;){if(s.nextSibling){s=s.nextSibling;break t}s=s.parentNode}s=void 0}s=Xm(s)}}function $m(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?$m(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function Jm(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var n=ai(e.document);n instanceof e.HTMLIFrameElement;){try{var s=typeof n.contentWindow.location.href=="string"}catch{s=!1}if(s)e=n.contentWindow;else break;n=ai(e.document)}return n}function Ah(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}var ET=Tn&&"documentMode"in document&&11>=document.documentMode,ia=null,Sh=null,Do=null,bh=!1;function Wm(e,n,s){var o=s.window===s?s.document:s.nodeType===9?s:s.ownerDocument;bh||ia==null||ia!==ai(o)||(o=ia,"selectionStart"in o&&Ah(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),Do&&Io(Do,o)||(Do=o,o=Wu(Sh,"onSelect"),0<o.length&&(n=new ui("onSelect","select",null,n,s),e.push({event:n,listeners:o}),n.target=ia)))}function dr(e,n){var s={};return s[e.toLowerCase()]=n.toLowerCase(),s["Webkit"+e]="webkit"+n,s["Moz"+e]="moz"+n,s}var sa={animationend:dr("Animation","AnimationEnd"),animationiteration:dr("Animation","AnimationIteration"),animationstart:dr("Animation","AnimationStart"),transitionrun:dr("Transition","TransitionRun"),transitionstart:dr("Transition","TransitionStart"),transitioncancel:dr("Transition","TransitionCancel"),transitionend:dr("Transition","TransitionEnd")},Rh={},tg={};Tn&&(tg=document.createElement("div").style,"AnimationEvent"in window||(delete sa.animationend.animation,delete sa.animationiteration.animation,delete sa.animationstart.animation),"TransitionEvent"in window||delete sa.transitionend.transition);function mr(e){if(Rh[e])return Rh[e];if(!sa[e])return e;var n=sa[e],s;for(s in n)if(n.hasOwnProperty(s)&&s in tg)return Rh[e]=n[s];return e}var eg=mr("animationend"),ng=mr("animationiteration"),ig=mr("animationstart"),TT=mr("transitionrun"),AT=mr("transitionstart"),ST=mr("transitioncancel"),sg=mr("transitionend"),rg=new Map,wh="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");wh.push("scrollEnd");function jn(e,n){rg.set(e,n),si(n,[e])}var fu=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Sn=[],ra=0,Ch=0;function du(){for(var e=ra,n=Ch=ra=0;n<e;){var s=Sn[n];Sn[n++]=null;var o=Sn[n];Sn[n++]=null;var h=Sn[n];Sn[n++]=null;var f=Sn[n];if(Sn[n++]=null,o!==null&&h!==null){var g=o.pending;g===null?h.next=h:(h.next=g.next,g.next=h),o.pending=h}f!==0&&ag(s,h,f)}}function mu(e,n,s,o){Sn[ra++]=e,Sn[ra++]=n,Sn[ra++]=s,Sn[ra++]=o,Ch|=o,e.lanes|=o,e=e.alternate,e!==null&&(e.lanes|=o)}function Ih(e,n,s,o){return mu(e,n,s,o),gu(e)}function gr(e,n){return mu(e,null,null,n),gu(e)}function ag(e,n,s){e.lanes|=s;var o=e.alternate;o!==null&&(o.lanes|=s);for(var h=!1,f=e.return;f!==null;)f.childLanes|=s,o=f.alternate,o!==null&&(o.childLanes|=s),f.tag===22&&(e=f.stateNode,e===null||e._visibility&1||(h=!0)),e=f,f=f.return;return e.tag===3?(f=e.stateNode,h&&n!==null&&(h=31-ce(s),e=f.hiddenUpdates,o=e[h],o===null?e[h]=[n]:o.push(n),n.lane=s|536870912),f):null}function gu(e){if(50<$o)throw $o=0,Pf=null,Error(r(185));for(var n=e.return;n!==null;)e=n,n=e.return;return e.tag===3?e.stateNode:null}var aa={};function bT(e,n,s,o){this.tag=e,this.key=s,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function fn(e,n,s,o){return new bT(e,n,s,o)}function Dh(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Ni(e,n){var s=e.alternate;return s===null?(s=fn(e.tag,n,e.key,e.mode),s.elementType=e.elementType,s.type=e.type,s.stateNode=e.stateNode,s.alternate=e,e.alternate=s):(s.pendingProps=n,s.type=e.type,s.flags=0,s.subtreeFlags=0,s.deletions=null),s.flags=e.flags&65011712,s.childLanes=e.childLanes,s.lanes=e.lanes,s.child=e.child,s.memoizedProps=e.memoizedProps,s.memoizedState=e.memoizedState,s.updateQueue=e.updateQueue,n=e.dependencies,s.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},s.sibling=e.sibling,s.index=e.index,s.ref=e.ref,s.refCleanup=e.refCleanup,s}function og(e,n){e.flags&=65011714;var s=e.alternate;return s===null?(e.childLanes=0,e.lanes=n,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=s.childLanes,e.lanes=s.lanes,e.child=s.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=s.memoizedProps,e.memoizedState=s.memoizedState,e.updateQueue=s.updateQueue,e.type=s.type,n=s.dependencies,e.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),e}function pu(e,n,s,o,h,f){var g=0;if(o=e,typeof e=="function")Dh(e)&&(g=1);else if(typeof e=="string")g=D1(e,s,it.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case C:return e=fn(31,s,n,h),e.elementType=C,e.lanes=f,e;case et:return pr(s.children,h,f,n);case Z:g=8,h|=24;break;case ht:return e=fn(12,s,n,h|2),e.elementType=ht,e.lanes=f,e;case ee:return e=fn(13,s,n,h),e.elementType=ee,e.lanes=f,e;case Vt:return e=fn(19,s,n,h),e.elementType=Vt,e.lanes=f,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case mt:g=10;break t;case yt:g=9;break t;case zt:g=11;break t;case I:g=14;break t;case b:g=16,o=null;break t}g=29,s=Error(r(130,e===null?"null":typeof e,"")),o=null}return n=fn(g,s,n,h),n.elementType=e,n.type=o,n.lanes=f,n}function pr(e,n,s,o){return e=fn(7,e,o,n),e.lanes=s,e}function Nh(e,n,s){return e=fn(6,e,null,n),e.lanes=s,e}function lg(e){var n=fn(18,null,null,0);return n.stateNode=e,n}function Oh(e,n,s){return n=fn(4,e.children!==null?e.children:[],e.key,n),n.lanes=s,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}var ug=new WeakMap;function bn(e,n){if(typeof e=="object"&&e!==null){var s=ug.get(e);return s!==void 0?s:(n={value:e,source:n,stack:ro(n)},ug.set(e,n),n)}return{value:e,source:n,stack:ro(n)}}var oa=[],la=0,yu=null,No=0,Rn=[],wn=0,hs=null,di=1,mi="";function Oi(e,n){oa[la++]=No,oa[la++]=yu,yu=e,No=n}function cg(e,n,s){Rn[wn++]=di,Rn[wn++]=mi,Rn[wn++]=hs,hs=e;var o=di;e=mi;var h=32-ce(o)-1;o&=~(1<<h),s+=1;var f=32-ce(n)+h;if(30<f){var g=h-h%5;f=(o&(1<<g)-1).toString(32),o>>=g,h-=g,di=1<<32-ce(n)+h|s<<h|o,mi=f+e}else di=1<<f|s<<h|o,mi=e}function Mh(e){e.return!==null&&(Oi(e,1),cg(e,1,0))}function Vh(e){for(;e===yu;)yu=oa[--la],oa[la]=null,No=oa[--la],oa[la]=null;for(;e===hs;)hs=Rn[--wn],Rn[wn]=null,mi=Rn[--wn],Rn[wn]=null,di=Rn[--wn],Rn[wn]=null}function hg(e,n){Rn[wn++]=di,Rn[wn++]=mi,Rn[wn++]=hs,di=n.id,mi=n.overflow,hs=e}var ze=null,Jt=null,Mt=!1,fs=null,Cn=!1,kh=Error(r(519));function ds(e){var n=Error(r(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Oo(bn(n,e)),kh}function fg(e){var n=e.stateNode,s=e.type,o=e.memoizedProps;switch(n[ye]=e,n[Me]=o,s){case"dialog":wt("cancel",n),wt("close",n);break;case"iframe":case"object":case"embed":wt("load",n);break;case"video":case"audio":for(s=0;s<Wo.length;s++)wt(Wo[s],n);break;case"source":wt("error",n);break;case"img":case"image":case"link":wt("error",n),wt("load",n);break;case"details":wt("toggle",n);break;case"input":wt("invalid",n),Zl(n,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":wt("invalid",n);break;case"textarea":wt("invalid",n),ss(n,o.value,o.defaultValue,o.children)}s=o.children,typeof s!="string"&&typeof s!="number"&&typeof s!="bigint"||n.textContent===""+s||o.suppressHydrationWarning===!0||Dy(n.textContent,s)?(o.popover!=null&&(wt("beforetoggle",n),wt("toggle",n)),o.onScroll!=null&&wt("scroll",n),o.onScrollEnd!=null&&wt("scrollend",n),o.onClick!=null&&(n.onclick=Pn),n=!0):n=!1,n||ds(e,!0)}function dg(e){for(ze=e.return;ze;)switch(ze.tag){case 5:case 31:case 13:Cn=!1;return;case 27:case 3:Cn=!0;return;default:ze=ze.return}}function ua(e){if(e!==ze)return!1;if(!Mt)return dg(e),Mt=!0,!1;var n=e.tag,s;if((s=n!==3&&n!==27)&&((s=n===5)&&(s=e.type,s=!(s!=="form"&&s!=="button")||Wf(e.type,e.memoizedProps)),s=!s),s&&Jt&&ds(e),dg(e),n===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(r(317));Jt=Py(e)}else if(n===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(r(317));Jt=Py(e)}else n===27?(n=Jt,Cs(e.type)?(e=sd,sd=null,Jt=e):Jt=n):Jt=ze?Dn(e.stateNode.nextSibling):null;return!0}function yr(){Jt=ze=null,Mt=!1}function Uh(){var e=fs;return e!==null&&(an===null?an=e:an.push.apply(an,e),fs=null),e}function Oo(e){fs===null?fs=[e]:fs.push(e)}var Lh=O(null),_r=null,Mi=null;function ms(e,n,s){tt(Lh,n._currentValue),n._currentValue=s}function Vi(e){e._currentValue=Lh.current,K(Lh)}function xh(e,n,s){for(;e!==null;){var o=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,o!==null&&(o.childLanes|=n)):o!==null&&(o.childLanes&n)!==n&&(o.childLanes|=n),e===s)break;e=e.return}}function Ph(e,n,s,o){var h=e.child;for(h!==null&&(h.return=e);h!==null;){var f=h.dependencies;if(f!==null){var g=h.child;f=f.firstContext;t:for(;f!==null;){var E=f;f=h;for(var w=0;w<n.length;w++)if(E.context===n[w]){f.lanes|=s,E=f.alternate,E!==null&&(E.lanes|=s),xh(f.return,s,e),o||(g=null);break t}f=E.next}}else if(h.tag===18){if(g=h.return,g===null)throw Error(r(341));g.lanes|=s,f=g.alternate,f!==null&&(f.lanes|=s),xh(g,s,e),g=null}else g=h.child;if(g!==null)g.return=h;else for(g=h;g!==null;){if(g===e){g=null;break}if(h=g.sibling,h!==null){h.return=g.return,g=h;break}g=g.return}h=g}}function ca(e,n,s,o){e=null;for(var h=n,f=!1;h!==null;){if(!f){if((h.flags&524288)!==0)f=!0;else if((h.flags&262144)!==0)break}if(h.tag===10){var g=h.alternate;if(g===null)throw Error(r(387));if(g=g.memoizedProps,g!==null){var E=h.type;hn(h.pendingProps.value,g.value)||(e!==null?e.push(E):e=[E])}}else if(h===kt.current){if(g=h.alternate,g===null)throw Error(r(387));g.memoizedState.memoizedState!==h.memoizedState.memoizedState&&(e!==null?e.push(sl):e=[sl])}h=h.return}e!==null&&Ph(n,e,s,o),n.flags|=262144}function _u(e){for(e=e.firstContext;e!==null;){if(!hn(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function vr(e){_r=e,Mi=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Be(e){return mg(_r,e)}function vu(e,n){return _r===null&&vr(e),mg(e,n)}function mg(e,n){var s=n._currentValue;if(n={context:n,memoizedValue:s,next:null},Mi===null){if(e===null)throw Error(r(308));Mi=n,e.dependencies={lanes:0,firstContext:n},e.flags|=524288}else Mi=Mi.next=n;return s}var RT=typeof AbortController<"u"?AbortController:function(){var e=[],n=this.signal={aborted:!1,addEventListener:function(s,o){e.push(o)}};this.abort=function(){n.aborted=!0,e.forEach(function(s){return s()})}},wT=a.unstable_scheduleCallback,CT=a.unstable_NormalPriority,Ee={$$typeof:mt,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function zh(){return{controller:new RT,data:new Map,refCount:0}}function Mo(e){e.refCount--,e.refCount===0&&wT(CT,function(){e.controller.abort()})}var Vo=null,Bh=0,ha=0,fa=null;function IT(e,n){if(Vo===null){var s=Vo=[];Bh=0,ha=Gf(),fa={status:"pending",value:void 0,then:function(o){s.push(o)}}}return Bh++,n.then(gg,gg),n}function gg(){if(--Bh===0&&Vo!==null){fa!==null&&(fa.status="fulfilled");var e=Vo;Vo=null,ha=0,fa=null;for(var n=0;n<e.length;n++)(0,e[n])()}}function DT(e,n){var s=[],o={status:"pending",value:null,reason:null,then:function(h){s.push(h)}};return e.then(function(){o.status="fulfilled",o.value=n;for(var h=0;h<s.length;h++)(0,s[h])(n)},function(h){for(o.status="rejected",o.reason=h,h=0;h<s.length;h++)(0,s[h])(void 0)}),o}var pg=j.S;j.S=function(e,n){Wp=$e(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&IT(e,n),pg!==null&&pg(e,n)};var Er=O(null);function qh(){var e=Er.current;return e!==null?e:$t.pooledCache}function Eu(e,n){n===null?tt(Er,Er.current):tt(Er,n.pool)}function yg(){var e=qh();return e===null?null:{parent:Ee._currentValue,pool:e}}var da=Error(r(460)),Hh=Error(r(474)),Tu=Error(r(542)),Au={then:function(){}};function _g(e){return e=e.status,e==="fulfilled"||e==="rejected"}function vg(e,n,s){switch(s=e[s],s===void 0?e.push(n):s!==n&&(n.then(Pn,Pn),n=s),n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,Tg(e),e;default:if(typeof n.status=="string")n.then(Pn,Pn);else{if(e=$t,e!==null&&100<e.shellSuspendCounter)throw Error(r(482));e=n,e.status="pending",e.then(function(o){if(n.status==="pending"){var h=n;h.status="fulfilled",h.value=o}},function(o){if(n.status==="pending"){var h=n;h.status="rejected",h.reason=o}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,Tg(e),e}throw Ar=n,da}}function Tr(e){try{var n=e._init;return n(e._payload)}catch(s){throw s!==null&&typeof s=="object"&&typeof s.then=="function"?(Ar=s,da):s}}var Ar=null;function Eg(){if(Ar===null)throw Error(r(459));var e=Ar;return Ar=null,e}function Tg(e){if(e===da||e===Tu)throw Error(r(483))}var ma=null,ko=0;function Su(e){var n=ko;return ko+=1,ma===null&&(ma=[]),vg(ma,e,n)}function Uo(e,n){n=n.props.ref,e.ref=n!==void 0?n:null}function bu(e,n){throw n.$$typeof===k?Error(r(525)):(e=Object.prototype.toString.call(n),Error(r(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)))}function Ag(e){function n(V,D){if(e){var x=V.deletions;x===null?(V.deletions=[D],V.flags|=16):x.push(D)}}function s(V,D){if(!e)return null;for(;D!==null;)n(V,D),D=D.sibling;return null}function o(V){for(var D=new Map;V!==null;)V.key!==null?D.set(V.key,V):D.set(V.index,V),V=V.sibling;return D}function h(V,D){return V=Ni(V,D),V.index=0,V.sibling=null,V}function f(V,D,x){return V.index=x,e?(x=V.alternate,x!==null?(x=x.index,x<D?(V.flags|=67108866,D):x):(V.flags|=67108866,D)):(V.flags|=1048576,D)}function g(V){return e&&V.alternate===null&&(V.flags|=67108866),V}function E(V,D,x,G){return D===null||D.tag!==6?(D=Nh(x,V.mode,G),D.return=V,D):(D=h(D,x),D.return=V,D)}function w(V,D,x,G){var ot=x.type;return ot===et?H(V,D,x.props.children,G,x.key):D!==null&&(D.elementType===ot||typeof ot=="object"&&ot!==null&&ot.$$typeof===b&&Tr(ot)===D.type)?(D=h(D,x.props),Uo(D,x),D.return=V,D):(D=pu(x.type,x.key,x.props,null,V.mode,G),Uo(D,x),D.return=V,D)}function P(V,D,x,G){return D===null||D.tag!==4||D.stateNode.containerInfo!==x.containerInfo||D.stateNode.implementation!==x.implementation?(D=Oh(x,V.mode,G),D.return=V,D):(D=h(D,x.children||[]),D.return=V,D)}function H(V,D,x,G,ot){return D===null||D.tag!==7?(D=pr(x,V.mode,G,ot),D.return=V,D):(D=h(D,x),D.return=V,D)}function Q(V,D,x){if(typeof D=="string"&&D!==""||typeof D=="number"||typeof D=="bigint")return D=Nh(""+D,V.mode,x),D.return=V,D;if(typeof D=="object"&&D!==null){switch(D.$$typeof){case F:return x=pu(D.type,D.key,D.props,null,V.mode,x),Uo(x,D),x.return=V,x;case J:return D=Oh(D,V.mode,x),D.return=V,D;case b:return D=Tr(D),Q(V,D,x)}if(we(D)||U(D))return D=pr(D,V.mode,x,null),D.return=V,D;if(typeof D.then=="function")return Q(V,Su(D),x);if(D.$$typeof===mt)return Q(V,vu(V,D),x);bu(V,D)}return null}function z(V,D,x,G){var ot=D!==null?D.key:null;if(typeof x=="string"&&x!==""||typeof x=="number"||typeof x=="bigint")return ot!==null?null:E(V,D,""+x,G);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case F:return x.key===ot?w(V,D,x,G):null;case J:return x.key===ot?P(V,D,x,G):null;case b:return x=Tr(x),z(V,D,x,G)}if(we(x)||U(x))return ot!==null?null:H(V,D,x,G,null);if(typeof x.then=="function")return z(V,D,Su(x),G);if(x.$$typeof===mt)return z(V,D,vu(V,x),G);bu(V,x)}return null}function q(V,D,x,G,ot){if(typeof G=="string"&&G!==""||typeof G=="number"||typeof G=="bigint")return V=V.get(x)||null,E(D,V,""+G,ot);if(typeof G=="object"&&G!==null){switch(G.$$typeof){case F:return V=V.get(G.key===null?x:G.key)||null,w(D,V,G,ot);case J:return V=V.get(G.key===null?x:G.key)||null,P(D,V,G,ot);case b:return G=Tr(G),q(V,D,x,G,ot)}if(we(G)||U(G))return V=V.get(x)||null,H(D,V,G,ot,null);if(typeof G.then=="function")return q(V,D,x,Su(G),ot);if(G.$$typeof===mt)return q(V,D,x,vu(D,G),ot);bu(D,G)}return null}function st(V,D,x,G){for(var ot=null,xt=null,rt=D,St=D=0,It=null;rt!==null&&St<x.length;St++){rt.index>St?(It=rt,rt=null):It=rt.sibling;var Pt=z(V,rt,x[St],G);if(Pt===null){rt===null&&(rt=It);break}e&&rt&&Pt.alternate===null&&n(V,rt),D=f(Pt,D,St),xt===null?ot=Pt:xt.sibling=Pt,xt=Pt,rt=It}if(St===x.length)return s(V,rt),Mt&&Oi(V,St),ot;if(rt===null){for(;St<x.length;St++)rt=Q(V,x[St],G),rt!==null&&(D=f(rt,D,St),xt===null?ot=rt:xt.sibling=rt,xt=rt);return Mt&&Oi(V,St),ot}for(rt=o(rt);St<x.length;St++)It=q(rt,V,St,x[St],G),It!==null&&(e&&It.alternate!==null&&rt.delete(It.key===null?St:It.key),D=f(It,D,St),xt===null?ot=It:xt.sibling=It,xt=It);return e&&rt.forEach(function(Ms){return n(V,Ms)}),Mt&&Oi(V,St),ot}function ct(V,D,x,G){if(x==null)throw Error(r(151));for(var ot=null,xt=null,rt=D,St=D=0,It=null,Pt=x.next();rt!==null&&!Pt.done;St++,Pt=x.next()){rt.index>St?(It=rt,rt=null):It=rt.sibling;var Ms=z(V,rt,Pt.value,G);if(Ms===null){rt===null&&(rt=It);break}e&&rt&&Ms.alternate===null&&n(V,rt),D=f(Ms,D,St),xt===null?ot=Ms:xt.sibling=Ms,xt=Ms,rt=It}if(Pt.done)return s(V,rt),Mt&&Oi(V,St),ot;if(rt===null){for(;!Pt.done;St++,Pt=x.next())Pt=Q(V,Pt.value,G),Pt!==null&&(D=f(Pt,D,St),xt===null?ot=Pt:xt.sibling=Pt,xt=Pt);return Mt&&Oi(V,St),ot}for(rt=o(rt);!Pt.done;St++,Pt=x.next())Pt=q(rt,V,St,Pt.value,G),Pt!==null&&(e&&Pt.alternate!==null&&rt.delete(Pt.key===null?St:Pt.key),D=f(Pt,D,St),xt===null?ot=Pt:xt.sibling=Pt,xt=Pt);return e&&rt.forEach(function(B1){return n(V,B1)}),Mt&&Oi(V,St),ot}function Zt(V,D,x,G){if(typeof x=="object"&&x!==null&&x.type===et&&x.key===null&&(x=x.props.children),typeof x=="object"&&x!==null){switch(x.$$typeof){case F:t:{for(var ot=x.key;D!==null;){if(D.key===ot){if(ot=x.type,ot===et){if(D.tag===7){s(V,D.sibling),G=h(D,x.props.children),G.return=V,V=G;break t}}else if(D.elementType===ot||typeof ot=="object"&&ot!==null&&ot.$$typeof===b&&Tr(ot)===D.type){s(V,D.sibling),G=h(D,x.props),Uo(G,x),G.return=V,V=G;break t}s(V,D);break}else n(V,D);D=D.sibling}x.type===et?(G=pr(x.props.children,V.mode,G,x.key),G.return=V,V=G):(G=pu(x.type,x.key,x.props,null,V.mode,G),Uo(G,x),G.return=V,V=G)}return g(V);case J:t:{for(ot=x.key;D!==null;){if(D.key===ot)if(D.tag===4&&D.stateNode.containerInfo===x.containerInfo&&D.stateNode.implementation===x.implementation){s(V,D.sibling),G=h(D,x.children||[]),G.return=V,V=G;break t}else{s(V,D);break}else n(V,D);D=D.sibling}G=Oh(x,V.mode,G),G.return=V,V=G}return g(V);case b:return x=Tr(x),Zt(V,D,x,G)}if(we(x))return st(V,D,x,G);if(U(x)){if(ot=U(x),typeof ot!="function")throw Error(r(150));return x=ot.call(x),ct(V,D,x,G)}if(typeof x.then=="function")return Zt(V,D,Su(x),G);if(x.$$typeof===mt)return Zt(V,D,vu(V,x),G);bu(V,x)}return typeof x=="string"&&x!==""||typeof x=="number"||typeof x=="bigint"?(x=""+x,D!==null&&D.tag===6?(s(V,D.sibling),G=h(D,x),G.return=V,V=G):(s(V,D),G=Nh(x,V.mode,G),G.return=V,V=G),g(V)):s(V,D)}return function(V,D,x,G){try{ko=0;var ot=Zt(V,D,x,G);return ma=null,ot}catch(rt){if(rt===da||rt===Tu)throw rt;var xt=fn(29,rt,null,V.mode);return xt.lanes=G,xt.return=V,xt}finally{}}}var Sr=Ag(!0),Sg=Ag(!1),gs=!1;function jh(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Gh(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function ps(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function ys(e,n,s){var o=e.updateQueue;if(o===null)return null;if(o=o.shared,(qt&2)!==0){var h=o.pending;return h===null?n.next=n:(n.next=h.next,h.next=n),o.pending=n,n=gu(e),ag(e,null,s),n}return mu(e,o,n,s),gu(e)}function Lo(e,n,s){if(n=n.updateQueue,n!==null&&(n=n.shared,(s&4194048)!==0)){var o=n.lanes;o&=e.pendingLanes,s|=o,n.lanes=s,lo(e,s)}}function Fh(e,n){var s=e.updateQueue,o=e.alternate;if(o!==null&&(o=o.updateQueue,s===o)){var h=null,f=null;if(s=s.firstBaseUpdate,s!==null){do{var g={lane:s.lane,tag:s.tag,payload:s.payload,callback:null,next:null};f===null?h=f=g:f=f.next=g,s=s.next}while(s!==null);f===null?h=f=n:f=f.next=n}else h=f=n;s={baseState:o.baseState,firstBaseUpdate:h,lastBaseUpdate:f,shared:o.shared,callbacks:o.callbacks},e.updateQueue=s;return}e=s.lastBaseUpdate,e===null?s.firstBaseUpdate=n:e.next=n,s.lastBaseUpdate=n}var Qh=!1;function xo(){if(Qh){var e=fa;if(e!==null)throw e}}function Po(e,n,s,o){Qh=!1;var h=e.updateQueue;gs=!1;var f=h.firstBaseUpdate,g=h.lastBaseUpdate,E=h.shared.pending;if(E!==null){h.shared.pending=null;var w=E,P=w.next;w.next=null,g===null?f=P:g.next=P,g=w;var H=e.alternate;H!==null&&(H=H.updateQueue,E=H.lastBaseUpdate,E!==g&&(E===null?H.firstBaseUpdate=P:E.next=P,H.lastBaseUpdate=w))}if(f!==null){var Q=h.baseState;g=0,H=P=w=null,E=f;do{var z=E.lane&-536870913,q=z!==E.lane;if(q?(Ct&z)===z:(o&z)===z){z!==0&&z===ha&&(Qh=!0),H!==null&&(H=H.next={lane:0,tag:E.tag,payload:E.payload,callback:null,next:null});t:{var st=e,ct=E;z=n;var Zt=s;switch(ct.tag){case 1:if(st=ct.payload,typeof st=="function"){Q=st.call(Zt,Q,z);break t}Q=st;break t;case 3:st.flags=st.flags&-65537|128;case 0:if(st=ct.payload,z=typeof st=="function"?st.call(Zt,Q,z):st,z==null)break t;Q=S({},Q,z);break t;case 2:gs=!0}}z=E.callback,z!==null&&(e.flags|=64,q&&(e.flags|=8192),q=h.callbacks,q===null?h.callbacks=[z]:q.push(z))}else q={lane:z,tag:E.tag,payload:E.payload,callback:E.callback,next:null},H===null?(P=H=q,w=Q):H=H.next=q,g|=z;if(E=E.next,E===null){if(E=h.shared.pending,E===null)break;q=E,E=q.next,q.next=null,h.lastBaseUpdate=q,h.shared.pending=null}}while(!0);H===null&&(w=Q),h.baseState=w,h.firstBaseUpdate=P,h.lastBaseUpdate=H,f===null&&(h.shared.lanes=0),As|=g,e.lanes=g,e.memoizedState=Q}}function bg(e,n){if(typeof e!="function")throw Error(r(191,e));e.call(n)}function Rg(e,n){var s=e.callbacks;if(s!==null)for(e.callbacks=null,e=0;e<s.length;e++)bg(s[e],n)}var ga=O(null),Ru=O(0);function wg(e,n){e=Hi,tt(Ru,e),tt(ga,n),Hi=e|n.baseLanes}function Kh(){tt(Ru,Hi),tt(ga,ga.current)}function Yh(){Hi=Ru.current,K(ga),K(Ru)}var dn=O(null),In=null;function _s(e){var n=e.alternate;tt(fe,fe.current&1),tt(dn,e),In===null&&(n===null||ga.current!==null||n.memoizedState!==null)&&(In=e)}function Xh(e){tt(fe,fe.current),tt(dn,e),In===null&&(In=e)}function Cg(e){e.tag===22?(tt(fe,fe.current),tt(dn,e),In===null&&(In=e)):vs()}function vs(){tt(fe,fe.current),tt(dn,dn.current)}function mn(e){K(dn),In===e&&(In=null),K(fe)}var fe=O(0);function wu(e){for(var n=e;n!==null;){if(n.tag===13){var s=n.memoizedState;if(s!==null&&(s=s.dehydrated,s===null||nd(s)||id(s)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var ki=0,Tt=null,Yt=null,Te=null,Cu=!1,pa=!1,br=!1,Iu=0,zo=0,ya=null,NT=0;function le(){throw Error(r(321))}function Zh(e,n){if(n===null)return!1;for(var s=0;s<n.length&&s<e.length;s++)if(!hn(e[s],n[s]))return!1;return!0}function $h(e,n,s,o,h,f){return ki=f,Tt=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,j.H=e===null||e.memoizedState===null?cp:df,br=!1,f=s(o,h),br=!1,pa&&(f=Dg(n,s,o,h)),Ig(e),f}function Ig(e){j.H=Ho;var n=Yt!==null&&Yt.next!==null;if(ki=0,Te=Yt=Tt=null,Cu=!1,zo=0,ya=null,n)throw Error(r(300));e===null||Ae||(e=e.dependencies,e!==null&&_u(e)&&(Ae=!0))}function Dg(e,n,s,o){Tt=e;var h=0;do{if(pa&&(ya=null),zo=0,pa=!1,25<=h)throw Error(r(301));if(h+=1,Te=Yt=null,e.updateQueue!=null){var f=e.updateQueue;f.lastEffect=null,f.events=null,f.stores=null,f.memoCache!=null&&(f.memoCache.index=0)}j.H=hp,f=n(s,o)}while(pa);return f}function OT(){var e=j.H,n=e.useState()[0];return n=typeof n.then=="function"?Bo(n):n,e=e.useState()[0],(Yt!==null?Yt.memoizedState:null)!==e&&(Tt.flags|=1024),n}function Jh(){var e=Iu!==0;return Iu=0,e}function Wh(e,n,s){n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~s}function tf(e){if(Cu){for(e=e.memoizedState;e!==null;){var n=e.queue;n!==null&&(n.pending=null),e=e.next}Cu=!1}ki=0,Te=Yt=Tt=null,pa=!1,zo=Iu=0,ya=null}function We(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Te===null?Tt.memoizedState=Te=e:Te=Te.next=e,Te}function de(){if(Yt===null){var e=Tt.alternate;e=e!==null?e.memoizedState:null}else e=Yt.next;var n=Te===null?Tt.memoizedState:Te.next;if(n!==null)Te=n,Yt=e;else{if(e===null)throw Tt.alternate===null?Error(r(467)):Error(r(310));Yt=e,e={memoizedState:Yt.memoizedState,baseState:Yt.baseState,baseQueue:Yt.baseQueue,queue:Yt.queue,next:null},Te===null?Tt.memoizedState=Te=e:Te=Te.next=e}return Te}function Du(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Bo(e){var n=zo;return zo+=1,ya===null&&(ya=[]),e=vg(ya,e,n),n=Tt,(Te===null?n.memoizedState:Te.next)===null&&(n=n.alternate,j.H=n===null||n.memoizedState===null?cp:df),e}function Nu(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Bo(e);if(e.$$typeof===mt)return Be(e)}throw Error(r(438,String(e)))}function ef(e){var n=null,s=Tt.updateQueue;if(s!==null&&(n=s.memoCache),n==null){var o=Tt.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(n={data:o.data.map(function(h){return h.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),s===null&&(s=Du(),Tt.updateQueue=s),s.memoCache=n,s=n.data[n.index],s===void 0)for(s=n.data[n.index]=Array(e),o=0;o<e;o++)s[o]=M;return n.index++,s}function Ui(e,n){return typeof n=="function"?n(e):n}function Ou(e){var n=de();return nf(n,Yt,e)}function nf(e,n,s){var o=e.queue;if(o===null)throw Error(r(311));o.lastRenderedReducer=s;var h=e.baseQueue,f=o.pending;if(f!==null){if(h!==null){var g=h.next;h.next=f.next,f.next=g}n.baseQueue=h=f,o.pending=null}if(f=e.baseState,h===null)e.memoizedState=f;else{n=h.next;var E=g=null,w=null,P=n,H=!1;do{var Q=P.lane&-536870913;if(Q!==P.lane?(Ct&Q)===Q:(ki&Q)===Q){var z=P.revertLane;if(z===0)w!==null&&(w=w.next={lane:0,revertLane:0,gesture:null,action:P.action,hasEagerState:P.hasEagerState,eagerState:P.eagerState,next:null}),Q===ha&&(H=!0);else if((ki&z)===z){P=P.next,z===ha&&(H=!0);continue}else Q={lane:0,revertLane:P.revertLane,gesture:null,action:P.action,hasEagerState:P.hasEagerState,eagerState:P.eagerState,next:null},w===null?(E=w=Q,g=f):w=w.next=Q,Tt.lanes|=z,As|=z;Q=P.action,br&&s(f,Q),f=P.hasEagerState?P.eagerState:s(f,Q)}else z={lane:Q,revertLane:P.revertLane,gesture:P.gesture,action:P.action,hasEagerState:P.hasEagerState,eagerState:P.eagerState,next:null},w===null?(E=w=z,g=f):w=w.next=z,Tt.lanes|=Q,As|=Q;P=P.next}while(P!==null&&P!==n);if(w===null?g=f:w.next=E,!hn(f,e.memoizedState)&&(Ae=!0,H&&(s=fa,s!==null)))throw s;e.memoizedState=f,e.baseState=g,e.baseQueue=w,o.lastRenderedState=f}return h===null&&(o.lanes=0),[e.memoizedState,o.dispatch]}function sf(e){var n=de(),s=n.queue;if(s===null)throw Error(r(311));s.lastRenderedReducer=e;var o=s.dispatch,h=s.pending,f=n.memoizedState;if(h!==null){s.pending=null;var g=h=h.next;do f=e(f,g.action),g=g.next;while(g!==h);hn(f,n.memoizedState)||(Ae=!0),n.memoizedState=f,n.baseQueue===null&&(n.baseState=f),s.lastRenderedState=f}return[f,o]}function Ng(e,n,s){var o=Tt,h=de(),f=Mt;if(f){if(s===void 0)throw Error(r(407));s=s()}else s=n();var g=!hn((Yt||h).memoizedState,s);if(g&&(h.memoizedState=s,Ae=!0),h=h.queue,of(Vg.bind(null,o,h,e),[e]),h.getSnapshot!==n||g||Te!==null&&Te.memoizedState.tag&1){if(o.flags|=2048,_a(9,{destroy:void 0},Mg.bind(null,o,h,s,n),null),$t===null)throw Error(r(349));f||(ki&127)!==0||Og(o,n,s)}return s}function Og(e,n,s){e.flags|=16384,e={getSnapshot:n,value:s},n=Tt.updateQueue,n===null?(n=Du(),Tt.updateQueue=n,n.stores=[e]):(s=n.stores,s===null?n.stores=[e]:s.push(e))}function Mg(e,n,s,o){n.value=s,n.getSnapshot=o,kg(n)&&Ug(e)}function Vg(e,n,s){return s(function(){kg(n)&&Ug(e)})}function kg(e){var n=e.getSnapshot;e=e.value;try{var s=n();return!hn(e,s)}catch{return!0}}function Ug(e){var n=gr(e,2);n!==null&&on(n,e,2)}function rf(e){var n=We();if(typeof e=="function"){var s=e;if(e=s(),br){_n(!0);try{s()}finally{_n(!1)}}}return n.memoizedState=n.baseState=e,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ui,lastRenderedState:e},n}function Lg(e,n,s,o){return e.baseState=s,nf(e,Yt,typeof o=="function"?o:Ui)}function MT(e,n,s,o,h){if(ku(e))throw Error(r(485));if(e=n.action,e!==null){var f={payload:h,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(g){f.listeners.push(g)}};j.T!==null?s(!0):f.isTransition=!1,o(f),s=n.pending,s===null?(f.next=n.pending=f,xg(n,f)):(f.next=s.next,n.pending=s.next=f)}}function xg(e,n){var s=n.action,o=n.payload,h=e.state;if(n.isTransition){var f=j.T,g={};j.T=g;try{var E=s(h,o),w=j.S;w!==null&&w(g,E),Pg(e,n,E)}catch(P){af(e,n,P)}finally{f!==null&&g.types!==null&&(f.types=g.types),j.T=f}}else try{f=s(h,o),Pg(e,n,f)}catch(P){af(e,n,P)}}function Pg(e,n,s){s!==null&&typeof s=="object"&&typeof s.then=="function"?s.then(function(o){zg(e,n,o)},function(o){return af(e,n,o)}):zg(e,n,s)}function zg(e,n,s){n.status="fulfilled",n.value=s,Bg(n),e.state=s,n=e.pending,n!==null&&(s=n.next,s===n?e.pending=null:(s=s.next,n.next=s,xg(e,s)))}function af(e,n,s){var o=e.pending;if(e.pending=null,o!==null){o=o.next;do n.status="rejected",n.reason=s,Bg(n),n=n.next;while(n!==o)}e.action=null}function Bg(e){e=e.listeners;for(var n=0;n<e.length;n++)(0,e[n])()}function qg(e,n){return n}function Hg(e,n){if(Mt){var s=$t.formState;if(s!==null){t:{var o=Tt;if(Mt){if(Jt){e:{for(var h=Jt,f=Cn;h.nodeType!==8;){if(!f){h=null;break e}if(h=Dn(h.nextSibling),h===null){h=null;break e}}f=h.data,h=f==="F!"||f==="F"?h:null}if(h){Jt=Dn(h.nextSibling),o=h.data==="F!";break t}}ds(o)}o=!1}o&&(n=s[0])}}return s=We(),s.memoizedState=s.baseState=n,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:qg,lastRenderedState:n},s.queue=o,s=op.bind(null,Tt,o),o.dispatch=s,o=rf(!1),f=ff.bind(null,Tt,!1,o.queue),o=We(),h={state:n,dispatch:null,action:e,pending:null},o.queue=h,s=MT.bind(null,Tt,h,f,s),h.dispatch=s,o.memoizedState=e,[n,s,!1]}function jg(e){var n=de();return Gg(n,Yt,e)}function Gg(e,n,s){if(n=nf(e,n,qg)[0],e=Ou(Ui)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var o=Bo(n)}catch(g){throw g===da?Tu:g}else o=n;n=de();var h=n.queue,f=h.dispatch;return s!==n.memoizedState&&(Tt.flags|=2048,_a(9,{destroy:void 0},VT.bind(null,h,s),null)),[o,f,e]}function VT(e,n){e.action=n}function Fg(e){var n=de(),s=Yt;if(s!==null)return Gg(n,s,e);de(),n=n.memoizedState,s=de();var o=s.queue.dispatch;return s.memoizedState=e,[n,o,!1]}function _a(e,n,s,o){return e={tag:e,create:s,deps:o,inst:n,next:null},n=Tt.updateQueue,n===null&&(n=Du(),Tt.updateQueue=n),s=n.lastEffect,s===null?n.lastEffect=e.next=e:(o=s.next,s.next=e,e.next=o,n.lastEffect=e),e}function Qg(){return de().memoizedState}function Mu(e,n,s,o){var h=We();Tt.flags|=e,h.memoizedState=_a(1|n,{destroy:void 0},s,o===void 0?null:o)}function Vu(e,n,s,o){var h=de();o=o===void 0?null:o;var f=h.memoizedState.inst;Yt!==null&&o!==null&&Zh(o,Yt.memoizedState.deps)?h.memoizedState=_a(n,f,s,o):(Tt.flags|=e,h.memoizedState=_a(1|n,f,s,o))}function Kg(e,n){Mu(8390656,8,e,n)}function of(e,n){Vu(2048,8,e,n)}function kT(e){Tt.flags|=4;var n=Tt.updateQueue;if(n===null)n=Du(),Tt.updateQueue=n,n.events=[e];else{var s=n.events;s===null?n.events=[e]:s.push(e)}}function Yg(e){var n=de().memoizedState;return kT({ref:n,nextImpl:e}),function(){if((qt&2)!==0)throw Error(r(440));return n.impl.apply(void 0,arguments)}}function Xg(e,n){return Vu(4,2,e,n)}function Zg(e,n){return Vu(4,4,e,n)}function $g(e,n){if(typeof n=="function"){e=e();var s=n(e);return function(){typeof s=="function"?s():n(null)}}if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Jg(e,n,s){s=s!=null?s.concat([e]):null,Vu(4,4,$g.bind(null,n,e),s)}function lf(){}function Wg(e,n){var s=de();n=n===void 0?null:n;var o=s.memoizedState;return n!==null&&Zh(n,o[1])?o[0]:(s.memoizedState=[e,n],e)}function tp(e,n){var s=de();n=n===void 0?null:n;var o=s.memoizedState;if(n!==null&&Zh(n,o[1]))return o[0];if(o=e(),br){_n(!0);try{e()}finally{_n(!1)}}return s.memoizedState=[o,n],o}function uf(e,n,s){return s===void 0||(ki&1073741824)!==0&&(Ct&261930)===0?e.memoizedState=n:(e.memoizedState=s,e=ey(),Tt.lanes|=e,As|=e,s)}function ep(e,n,s,o){return hn(s,n)?s:ga.current!==null?(e=uf(e,s,o),hn(e,n)||(Ae=!0),e):(ki&42)===0||(ki&1073741824)!==0&&(Ct&261930)===0?(Ae=!0,e.memoizedState=s):(e=ey(),Tt.lanes|=e,As|=e,n)}function np(e,n,s,o,h){var f=W.p;W.p=f!==0&&8>f?f:8;var g=j.T,E={};j.T=E,ff(e,!1,n,s);try{var w=h(),P=j.S;if(P!==null&&P(E,w),w!==null&&typeof w=="object"&&typeof w.then=="function"){var H=DT(w,o);qo(e,n,H,yn(e))}else qo(e,n,o,yn(e))}catch(Q){qo(e,n,{then:function(){},status:"rejected",reason:Q},yn())}finally{W.p=f,g!==null&&E.types!==null&&(g.types=E.types),j.T=g}}function UT(){}function cf(e,n,s,o){if(e.tag!==5)throw Error(r(476));var h=ip(e).queue;np(e,h,n,lt,s===null?UT:function(){return sp(e),s(o)})}function ip(e){var n=e.memoizedState;if(n!==null)return n;n={memoizedState:lt,baseState:lt,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ui,lastRenderedState:lt},next:null};var s={};return n.next={memoizedState:s,baseState:s,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ui,lastRenderedState:s},next:null},e.memoizedState=n,e=e.alternate,e!==null&&(e.memoizedState=n),n}function sp(e){var n=ip(e);n.next===null&&(n=e.alternate.memoizedState),qo(e,n.next.queue,{},yn())}function hf(){return Be(sl)}function rp(){return de().memoizedState}function ap(){return de().memoizedState}function LT(e){for(var n=e.return;n!==null;){switch(n.tag){case 24:case 3:var s=yn();e=ps(s);var o=ys(n,e,s);o!==null&&(on(o,n,s),Lo(o,n,s)),n={cache:zh()},e.payload=n;return}n=n.return}}function xT(e,n,s){var o=yn();s={lane:o,revertLane:0,gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null},ku(e)?lp(n,s):(s=Ih(e,n,s,o),s!==null&&(on(s,e,o),up(s,n,o)))}function op(e,n,s){var o=yn();qo(e,n,s,o)}function qo(e,n,s,o){var h={lane:o,revertLane:0,gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null};if(ku(e))lp(n,h);else{var f=e.alternate;if(e.lanes===0&&(f===null||f.lanes===0)&&(f=n.lastRenderedReducer,f!==null))try{var g=n.lastRenderedState,E=f(g,s);if(h.hasEagerState=!0,h.eagerState=E,hn(E,g))return mu(e,n,h,0),$t===null&&du(),!1}catch{}finally{}if(s=Ih(e,n,h,o),s!==null)return on(s,e,o),up(s,n,o),!0}return!1}function ff(e,n,s,o){if(o={lane:2,revertLane:Gf(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},ku(e)){if(n)throw Error(r(479))}else n=Ih(e,s,o,2),n!==null&&on(n,e,2)}function ku(e){var n=e.alternate;return e===Tt||n!==null&&n===Tt}function lp(e,n){pa=Cu=!0;var s=e.pending;s===null?n.next=n:(n.next=s.next,s.next=n),e.pending=n}function up(e,n,s){if((s&4194048)!==0){var o=n.lanes;o&=e.pendingLanes,s|=o,n.lanes=s,lo(e,s)}}var Ho={readContext:Be,use:Nu,useCallback:le,useContext:le,useEffect:le,useImperativeHandle:le,useLayoutEffect:le,useInsertionEffect:le,useMemo:le,useReducer:le,useRef:le,useState:le,useDebugValue:le,useDeferredValue:le,useTransition:le,useSyncExternalStore:le,useId:le,useHostTransitionStatus:le,useFormState:le,useActionState:le,useOptimistic:le,useMemoCache:le,useCacheRefresh:le};Ho.useEffectEvent=le;var cp={readContext:Be,use:Nu,useCallback:function(e,n){return We().memoizedState=[e,n===void 0?null:n],e},useContext:Be,useEffect:Kg,useImperativeHandle:function(e,n,s){s=s!=null?s.concat([e]):null,Mu(4194308,4,$g.bind(null,n,e),s)},useLayoutEffect:function(e,n){return Mu(4194308,4,e,n)},useInsertionEffect:function(e,n){Mu(4,2,e,n)},useMemo:function(e,n){var s=We();n=n===void 0?null:n;var o=e();if(br){_n(!0);try{e()}finally{_n(!1)}}return s.memoizedState=[o,n],o},useReducer:function(e,n,s){var o=We();if(s!==void 0){var h=s(n);if(br){_n(!0);try{s(n)}finally{_n(!1)}}}else h=n;return o.memoizedState=o.baseState=h,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:h},o.queue=e,e=e.dispatch=xT.bind(null,Tt,e),[o.memoizedState,e]},useRef:function(e){var n=We();return e={current:e},n.memoizedState=e},useState:function(e){e=rf(e);var n=e.queue,s=op.bind(null,Tt,n);return n.dispatch=s,[e.memoizedState,s]},useDebugValue:lf,useDeferredValue:function(e,n){var s=We();return uf(s,e,n)},useTransition:function(){var e=rf(!1);return e=np.bind(null,Tt,e.queue,!0,!1),We().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,n,s){var o=Tt,h=We();if(Mt){if(s===void 0)throw Error(r(407));s=s()}else{if(s=n(),$t===null)throw Error(r(349));(Ct&127)!==0||Og(o,n,s)}h.memoizedState=s;var f={value:s,getSnapshot:n};return h.queue=f,Kg(Vg.bind(null,o,f,e),[e]),o.flags|=2048,_a(9,{destroy:void 0},Mg.bind(null,o,f,s,n),null),s},useId:function(){var e=We(),n=$t.identifierPrefix;if(Mt){var s=mi,o=di;s=(o&~(1<<32-ce(o)-1)).toString(32)+s,n="_"+n+"R_"+s,s=Iu++,0<s&&(n+="H"+s.toString(32)),n+="_"}else s=NT++,n="_"+n+"r_"+s.toString(32)+"_";return e.memoizedState=n},useHostTransitionStatus:hf,useFormState:Hg,useActionState:Hg,useOptimistic:function(e){var n=We();n.memoizedState=n.baseState=e;var s={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=s,n=ff.bind(null,Tt,!0,s),s.dispatch=n,[e,n]},useMemoCache:ef,useCacheRefresh:function(){return We().memoizedState=LT.bind(null,Tt)},useEffectEvent:function(e){var n=We(),s={impl:e};return n.memoizedState=s,function(){if((qt&2)!==0)throw Error(r(440));return s.impl.apply(void 0,arguments)}}},df={readContext:Be,use:Nu,useCallback:Wg,useContext:Be,useEffect:of,useImperativeHandle:Jg,useInsertionEffect:Xg,useLayoutEffect:Zg,useMemo:tp,useReducer:Ou,useRef:Qg,useState:function(){return Ou(Ui)},useDebugValue:lf,useDeferredValue:function(e,n){var s=de();return ep(s,Yt.memoizedState,e,n)},useTransition:function(){var e=Ou(Ui)[0],n=de().memoizedState;return[typeof e=="boolean"?e:Bo(e),n]},useSyncExternalStore:Ng,useId:rp,useHostTransitionStatus:hf,useFormState:jg,useActionState:jg,useOptimistic:function(e,n){var s=de();return Lg(s,Yt,e,n)},useMemoCache:ef,useCacheRefresh:ap};df.useEffectEvent=Yg;var hp={readContext:Be,use:Nu,useCallback:Wg,useContext:Be,useEffect:of,useImperativeHandle:Jg,useInsertionEffect:Xg,useLayoutEffect:Zg,useMemo:tp,useReducer:sf,useRef:Qg,useState:function(){return sf(Ui)},useDebugValue:lf,useDeferredValue:function(e,n){var s=de();return Yt===null?uf(s,e,n):ep(s,Yt.memoizedState,e,n)},useTransition:function(){var e=sf(Ui)[0],n=de().memoizedState;return[typeof e=="boolean"?e:Bo(e),n]},useSyncExternalStore:Ng,useId:rp,useHostTransitionStatus:hf,useFormState:Fg,useActionState:Fg,useOptimistic:function(e,n){var s=de();return Yt!==null?Lg(s,Yt,e,n):(s.baseState=e,[e,s.queue.dispatch])},useMemoCache:ef,useCacheRefresh:ap};hp.useEffectEvent=Yg;function mf(e,n,s,o){n=e.memoizedState,s=s(o,n),s=s==null?n:S({},n,s),e.memoizedState=s,e.lanes===0&&(e.updateQueue.baseState=s)}var gf={enqueueSetState:function(e,n,s){e=e._reactInternals;var o=yn(),h=ps(o);h.payload=n,s!=null&&(h.callback=s),n=ys(e,h,o),n!==null&&(on(n,e,o),Lo(n,e,o))},enqueueReplaceState:function(e,n,s){e=e._reactInternals;var o=yn(),h=ps(o);h.tag=1,h.payload=n,s!=null&&(h.callback=s),n=ys(e,h,o),n!==null&&(on(n,e,o),Lo(n,e,o))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var s=yn(),o=ps(s);o.tag=2,n!=null&&(o.callback=n),n=ys(e,o,s),n!==null&&(on(n,e,s),Lo(n,e,s))}};function fp(e,n,s,o,h,f,g){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(o,f,g):n.prototype&&n.prototype.isPureReactComponent?!Io(s,o)||!Io(h,f):!0}function dp(e,n,s,o){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(s,o),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(s,o),n.state!==e&&gf.enqueueReplaceState(n,n.state,null)}function Rr(e,n){var s=n;if("ref"in n){s={};for(var o in n)o!=="ref"&&(s[o]=n[o])}if(e=e.defaultProps){s===n&&(s=S({},s));for(var h in e)s[h]===void 0&&(s[h]=e[h])}return s}function mp(e){fu(e)}function gp(e){console.error(e)}function pp(e){fu(e)}function Uu(e,n){try{var s=e.onUncaughtError;s(n.value,{componentStack:n.stack})}catch(o){setTimeout(function(){throw o})}}function yp(e,n,s){try{var o=e.onCaughtError;o(s.value,{componentStack:s.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(h){setTimeout(function(){throw h})}}function pf(e,n,s){return s=ps(s),s.tag=3,s.payload={element:null},s.callback=function(){Uu(e,n)},s}function _p(e){return e=ps(e),e.tag=3,e}function vp(e,n,s,o){var h=s.type.getDerivedStateFromError;if(typeof h=="function"){var f=o.value;e.payload=function(){return h(f)},e.callback=function(){yp(n,s,o)}}var g=s.stateNode;g!==null&&typeof g.componentDidCatch=="function"&&(e.callback=function(){yp(n,s,o),typeof h!="function"&&(Ss===null?Ss=new Set([this]):Ss.add(this));var E=o.stack;this.componentDidCatch(o.value,{componentStack:E!==null?E:""})})}function PT(e,n,s,o,h){if(s.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(n=s.alternate,n!==null&&ca(n,s,h,!0),s=dn.current,s!==null){switch(s.tag){case 31:case 13:return In===null?Ku():s.alternate===null&&ue===0&&(ue=3),s.flags&=-257,s.flags|=65536,s.lanes=h,o===Au?s.flags|=16384:(n=s.updateQueue,n===null?s.updateQueue=new Set([o]):n.add(o),qf(e,o,h)),!1;case 22:return s.flags|=65536,o===Au?s.flags|=16384:(n=s.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([o])},s.updateQueue=n):(s=n.retryQueue,s===null?n.retryQueue=new Set([o]):s.add(o)),qf(e,o,h)),!1}throw Error(r(435,s.tag))}return qf(e,o,h),Ku(),!1}if(Mt)return n=dn.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=h,o!==kh&&(e=Error(r(422),{cause:o}),Oo(bn(e,s)))):(o!==kh&&(n=Error(r(423),{cause:o}),Oo(bn(n,s))),e=e.current.alternate,e.flags|=65536,h&=-h,e.lanes|=h,o=bn(o,s),h=pf(e.stateNode,o,h),Fh(e,h),ue!==4&&(ue=2)),!1;var f=Error(r(520),{cause:o});if(f=bn(f,s),Zo===null?Zo=[f]:Zo.push(f),ue!==4&&(ue=2),n===null)return!0;o=bn(o,s),s=n;do{switch(s.tag){case 3:return s.flags|=65536,e=h&-h,s.lanes|=e,e=pf(s.stateNode,o,e),Fh(s,e),!1;case 1:if(n=s.type,f=s.stateNode,(s.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(Ss===null||!Ss.has(f))))return s.flags|=65536,h&=-h,s.lanes|=h,h=_p(h),vp(h,e,s,o),Fh(s,h),!1}s=s.return}while(s!==null);return!1}var yf=Error(r(461)),Ae=!1;function qe(e,n,s,o){n.child=e===null?Sg(n,null,s,o):Sr(n,e.child,s,o)}function Ep(e,n,s,o,h){s=s.render;var f=n.ref;if("ref"in o){var g={};for(var E in o)E!=="ref"&&(g[E]=o[E])}else g=o;return vr(n),o=$h(e,n,s,g,f,h),E=Jh(),e!==null&&!Ae?(Wh(e,n,h),Li(e,n,h)):(Mt&&E&&Mh(n),n.flags|=1,qe(e,n,o,h),n.child)}function Tp(e,n,s,o,h){if(e===null){var f=s.type;return typeof f=="function"&&!Dh(f)&&f.defaultProps===void 0&&s.compare===null?(n.tag=15,n.type=f,Ap(e,n,f,o,h)):(e=pu(s.type,null,o,n,n.mode,h),e.ref=n.ref,e.return=n,n.child=e)}if(f=e.child,!Rf(e,h)){var g=f.memoizedProps;if(s=s.compare,s=s!==null?s:Io,s(g,o)&&e.ref===n.ref)return Li(e,n,h)}return n.flags|=1,e=Ni(f,o),e.ref=n.ref,e.return=n,n.child=e}function Ap(e,n,s,o,h){if(e!==null){var f=e.memoizedProps;if(Io(f,o)&&e.ref===n.ref)if(Ae=!1,n.pendingProps=o=f,Rf(e,h))(e.flags&131072)!==0&&(Ae=!0);else return n.lanes=e.lanes,Li(e,n,h)}return _f(e,n,s,o,h)}function Sp(e,n,s,o){var h=o.children,f=e!==null?e.memoizedState:null;if(e===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((n.flags&128)!==0){if(f=f!==null?f.baseLanes|s:s,e!==null){for(o=n.child=e.child,h=0;o!==null;)h=h|o.lanes|o.childLanes,o=o.sibling;o=h&~f}else o=0,n.child=null;return bp(e,n,f,s,o)}if((s&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},e!==null&&Eu(n,f!==null?f.cachePool:null),f!==null?wg(n,f):Kh(),Cg(n);else return o=n.lanes=536870912,bp(e,n,f!==null?f.baseLanes|s:s,s,o)}else f!==null?(Eu(n,f.cachePool),wg(n,f),vs(),n.memoizedState=null):(e!==null&&Eu(n,null),Kh(),vs());return qe(e,n,h,s),n.child}function jo(e,n){return e!==null&&e.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function bp(e,n,s,o,h){var f=qh();return f=f===null?null:{parent:Ee._currentValue,pool:f},n.memoizedState={baseLanes:s,cachePool:f},e!==null&&Eu(n,null),Kh(),Cg(n),e!==null&&ca(e,n,o,!0),n.childLanes=h,null}function Lu(e,n){return n=Pu({mode:n.mode,children:n.children},e.mode),n.ref=e.ref,e.child=n,n.return=e,n}function Rp(e,n,s){return Sr(n,e.child,null,s),e=Lu(n,n.pendingProps),e.flags|=2,mn(n),n.memoizedState=null,e}function zT(e,n,s){var o=n.pendingProps,h=(n.flags&128)!==0;if(n.flags&=-129,e===null){if(Mt){if(o.mode==="hidden")return e=Lu(n,o),n.lanes=536870912,jo(null,e);if(Xh(n),(e=Jt)?(e=xy(e,Cn),e=e!==null&&e.data==="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:hs!==null?{id:di,overflow:mi}:null,retryLane:536870912,hydrationErrors:null},s=lg(e),s.return=n,n.child=s,ze=n,Jt=null)):e=null,e===null)throw ds(n);return n.lanes=536870912,null}return Lu(n,o)}var f=e.memoizedState;if(f!==null){var g=f.dehydrated;if(Xh(n),h)if(n.flags&256)n.flags&=-257,n=Rp(e,n,s);else if(n.memoizedState!==null)n.child=e.child,n.flags|=128,n=null;else throw Error(r(558));else if(Ae||ca(e,n,s,!1),h=(s&e.childLanes)!==0,Ae||h){if(o=$t,o!==null&&(g=uo(o,s),g!==0&&g!==f.retryLane))throw f.retryLane=g,gr(e,g),on(o,e,g),yf;Ku(),n=Rp(e,n,s)}else e=f.treeContext,Jt=Dn(g.nextSibling),ze=n,Mt=!0,fs=null,Cn=!1,e!==null&&hg(n,e),n=Lu(n,o),n.flags|=4096;return n}return e=Ni(e.child,{mode:o.mode,children:o.children}),e.ref=n.ref,n.child=e,e.return=n,e}function xu(e,n){var s=n.ref;if(s===null)e!==null&&e.ref!==null&&(n.flags|=4194816);else{if(typeof s!="function"&&typeof s!="object")throw Error(r(284));(e===null||e.ref!==s)&&(n.flags|=4194816)}}function _f(e,n,s,o,h){return vr(n),s=$h(e,n,s,o,void 0,h),o=Jh(),e!==null&&!Ae?(Wh(e,n,h),Li(e,n,h)):(Mt&&o&&Mh(n),n.flags|=1,qe(e,n,s,h),n.child)}function wp(e,n,s,o,h,f){return vr(n),n.updateQueue=null,s=Dg(n,o,s,h),Ig(e),o=Jh(),e!==null&&!Ae?(Wh(e,n,f),Li(e,n,f)):(Mt&&o&&Mh(n),n.flags|=1,qe(e,n,s,f),n.child)}function Cp(e,n,s,o,h){if(vr(n),n.stateNode===null){var f=aa,g=s.contextType;typeof g=="object"&&g!==null&&(f=Be(g)),f=new s(o,f),n.memoizedState=f.state!==null&&f.state!==void 0?f.state:null,f.updater=gf,n.stateNode=f,f._reactInternals=n,f=n.stateNode,f.props=o,f.state=n.memoizedState,f.refs={},jh(n),g=s.contextType,f.context=typeof g=="object"&&g!==null?Be(g):aa,f.state=n.memoizedState,g=s.getDerivedStateFromProps,typeof g=="function"&&(mf(n,s,g,o),f.state=n.memoizedState),typeof s.getDerivedStateFromProps=="function"||typeof f.getSnapshotBeforeUpdate=="function"||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(g=f.state,typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount(),g!==f.state&&gf.enqueueReplaceState(f,f.state,null),Po(n,o,f,h),xo(),f.state=n.memoizedState),typeof f.componentDidMount=="function"&&(n.flags|=4194308),o=!0}else if(e===null){f=n.stateNode;var E=n.memoizedProps,w=Rr(s,E);f.props=w;var P=f.context,H=s.contextType;g=aa,typeof H=="object"&&H!==null&&(g=Be(H));var Q=s.getDerivedStateFromProps;H=typeof Q=="function"||typeof f.getSnapshotBeforeUpdate=="function",E=n.pendingProps!==E,H||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(E||P!==g)&&dp(n,f,o,g),gs=!1;var z=n.memoizedState;f.state=z,Po(n,o,f,h),xo(),P=n.memoizedState,E||z!==P||gs?(typeof Q=="function"&&(mf(n,s,Q,o),P=n.memoizedState),(w=gs||fp(n,s,w,o,z,P,g))?(H||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount()),typeof f.componentDidMount=="function"&&(n.flags|=4194308)):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=o,n.memoizedState=P),f.props=o,f.state=P,f.context=g,o=w):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),o=!1)}else{f=n.stateNode,Gh(e,n),g=n.memoizedProps,H=Rr(s,g),f.props=H,Q=n.pendingProps,z=f.context,P=s.contextType,w=aa,typeof P=="object"&&P!==null&&(w=Be(P)),E=s.getDerivedStateFromProps,(P=typeof E=="function"||typeof f.getSnapshotBeforeUpdate=="function")||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(g!==Q||z!==w)&&dp(n,f,o,w),gs=!1,z=n.memoizedState,f.state=z,Po(n,o,f,h),xo();var q=n.memoizedState;g!==Q||z!==q||gs||e!==null&&e.dependencies!==null&&_u(e.dependencies)?(typeof E=="function"&&(mf(n,s,E,o),q=n.memoizedState),(H=gs||fp(n,s,H,o,z,q,w)||e!==null&&e.dependencies!==null&&_u(e.dependencies))?(P||typeof f.UNSAFE_componentWillUpdate!="function"&&typeof f.componentWillUpdate!="function"||(typeof f.componentWillUpdate=="function"&&f.componentWillUpdate(o,q,w),typeof f.UNSAFE_componentWillUpdate=="function"&&f.UNSAFE_componentWillUpdate(o,q,w)),typeof f.componentDidUpdate=="function"&&(n.flags|=4),typeof f.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof f.componentDidUpdate!="function"||g===e.memoizedProps&&z===e.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||g===e.memoizedProps&&z===e.memoizedState||(n.flags|=1024),n.memoizedProps=o,n.memoizedState=q),f.props=o,f.state=q,f.context=w,o=H):(typeof f.componentDidUpdate!="function"||g===e.memoizedProps&&z===e.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||g===e.memoizedProps&&z===e.memoizedState||(n.flags|=1024),o=!1)}return f=o,xu(e,n),o=(n.flags&128)!==0,f||o?(f=n.stateNode,s=o&&typeof s.getDerivedStateFromError!="function"?null:f.render(),n.flags|=1,e!==null&&o?(n.child=Sr(n,e.child,null,h),n.child=Sr(n,null,s,h)):qe(e,n,s,h),n.memoizedState=f.state,e=n.child):e=Li(e,n,h),e}function Ip(e,n,s,o){return yr(),n.flags|=256,qe(e,n,s,o),n.child}var vf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Ef(e){return{baseLanes:e,cachePool:yg()}}function Tf(e,n,s){return e=e!==null?e.childLanes&~s:0,n&&(e|=pn),e}function Dp(e,n,s){var o=n.pendingProps,h=!1,f=(n.flags&128)!==0,g;if((g=f)||(g=e!==null&&e.memoizedState===null?!1:(fe.current&2)!==0),g&&(h=!0,n.flags&=-129),g=(n.flags&32)!==0,n.flags&=-33,e===null){if(Mt){if(h?_s(n):vs(),(e=Jt)?(e=xy(e,Cn),e=e!==null&&e.data!=="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:hs!==null?{id:di,overflow:mi}:null,retryLane:536870912,hydrationErrors:null},s=lg(e),s.return=n,n.child=s,ze=n,Jt=null)):e=null,e===null)throw ds(n);return id(e)?n.lanes=32:n.lanes=536870912,null}var E=o.children;return o=o.fallback,h?(vs(),h=n.mode,E=Pu({mode:"hidden",children:E},h),o=pr(o,h,s,null),E.return=n,o.return=n,E.sibling=o,n.child=E,o=n.child,o.memoizedState=Ef(s),o.childLanes=Tf(e,g,s),n.memoizedState=vf,jo(null,o)):(_s(n),Af(n,E))}var w=e.memoizedState;if(w!==null&&(E=w.dehydrated,E!==null)){if(f)n.flags&256?(_s(n),n.flags&=-257,n=Sf(e,n,s)):n.memoizedState!==null?(vs(),n.child=e.child,n.flags|=128,n=null):(vs(),E=o.fallback,h=n.mode,o=Pu({mode:"visible",children:o.children},h),E=pr(E,h,s,null),E.flags|=2,o.return=n,E.return=n,o.sibling=E,n.child=o,Sr(n,e.child,null,s),o=n.child,o.memoizedState=Ef(s),o.childLanes=Tf(e,g,s),n.memoizedState=vf,n=jo(null,o));else if(_s(n),id(E)){if(g=E.nextSibling&&E.nextSibling.dataset,g)var P=g.dgst;g=P,o=Error(r(419)),o.stack="",o.digest=g,Oo({value:o,source:null,stack:null}),n=Sf(e,n,s)}else if(Ae||ca(e,n,s,!1),g=(s&e.childLanes)!==0,Ae||g){if(g=$t,g!==null&&(o=uo(g,s),o!==0&&o!==w.retryLane))throw w.retryLane=o,gr(e,o),on(g,e,o),yf;nd(E)||Ku(),n=Sf(e,n,s)}else nd(E)?(n.flags|=192,n.child=e.child,n=null):(e=w.treeContext,Jt=Dn(E.nextSibling),ze=n,Mt=!0,fs=null,Cn=!1,e!==null&&hg(n,e),n=Af(n,o.children),n.flags|=4096);return n}return h?(vs(),E=o.fallback,h=n.mode,w=e.child,P=w.sibling,o=Ni(w,{mode:"hidden",children:o.children}),o.subtreeFlags=w.subtreeFlags&65011712,P!==null?E=Ni(P,E):(E=pr(E,h,s,null),E.flags|=2),E.return=n,o.return=n,o.sibling=E,n.child=o,jo(null,o),o=n.child,E=e.child.memoizedState,E===null?E=Ef(s):(h=E.cachePool,h!==null?(w=Ee._currentValue,h=h.parent!==w?{parent:w,pool:w}:h):h=yg(),E={baseLanes:E.baseLanes|s,cachePool:h}),o.memoizedState=E,o.childLanes=Tf(e,g,s),n.memoizedState=vf,jo(e.child,o)):(_s(n),s=e.child,e=s.sibling,s=Ni(s,{mode:"visible",children:o.children}),s.return=n,s.sibling=null,e!==null&&(g=n.deletions,g===null?(n.deletions=[e],n.flags|=16):g.push(e)),n.child=s,n.memoizedState=null,s)}function Af(e,n){return n=Pu({mode:"visible",children:n},e.mode),n.return=e,e.child=n}function Pu(e,n){return e=fn(22,e,null,n),e.lanes=0,e}function Sf(e,n,s){return Sr(n,e.child,null,s),e=Af(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function Np(e,n,s){e.lanes|=n;var o=e.alternate;o!==null&&(o.lanes|=n),xh(e.return,n,s)}function bf(e,n,s,o,h,f){var g=e.memoizedState;g===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:o,tail:s,tailMode:h,treeForkCount:f}:(g.isBackwards=n,g.rendering=null,g.renderingStartTime=0,g.last=o,g.tail=s,g.tailMode=h,g.treeForkCount=f)}function Op(e,n,s){var o=n.pendingProps,h=o.revealOrder,f=o.tail;o=o.children;var g=fe.current,E=(g&2)!==0;if(E?(g=g&1|2,n.flags|=128):g&=1,tt(fe,g),qe(e,n,o,s),o=Mt?No:0,!E&&e!==null&&(e.flags&128)!==0)t:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Np(e,s,n);else if(e.tag===19)Np(e,s,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break t;for(;e.sibling===null;){if(e.return===null||e.return===n)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(h){case"forwards":for(s=n.child,h=null;s!==null;)e=s.alternate,e!==null&&wu(e)===null&&(h=s),s=s.sibling;s=h,s===null?(h=n.child,n.child=null):(h=s.sibling,s.sibling=null),bf(n,!1,h,s,f,o);break;case"backwards":case"unstable_legacy-backwards":for(s=null,h=n.child,n.child=null;h!==null;){if(e=h.alternate,e!==null&&wu(e)===null){n.child=h;break}e=h.sibling,h.sibling=s,s=h,h=e}bf(n,!0,s,null,f,o);break;case"together":bf(n,!1,null,null,void 0,o);break;default:n.memoizedState=null}return n.child}function Li(e,n,s){if(e!==null&&(n.dependencies=e.dependencies),As|=n.lanes,(s&n.childLanes)===0)if(e!==null){if(ca(e,n,s,!1),(s&n.childLanes)===0)return null}else return null;if(e!==null&&n.child!==e.child)throw Error(r(153));if(n.child!==null){for(e=n.child,s=Ni(e,e.pendingProps),n.child=s,s.return=n;e.sibling!==null;)e=e.sibling,s=s.sibling=Ni(e,e.pendingProps),s.return=n;s.sibling=null}return n.child}function Rf(e,n){return(e.lanes&n)!==0?!0:(e=e.dependencies,!!(e!==null&&_u(e)))}function BT(e,n,s){switch(n.tag){case 3:Ce(n,n.stateNode.containerInfo),ms(n,Ee,e.memoizedState.cache),yr();break;case 27:case 5:$s(n);break;case 4:Ce(n,n.stateNode.containerInfo);break;case 10:ms(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,Xh(n),null;break;case 13:var o=n.memoizedState;if(o!==null)return o.dehydrated!==null?(_s(n),n.flags|=128,null):(s&n.child.childLanes)!==0?Dp(e,n,s):(_s(n),e=Li(e,n,s),e!==null?e.sibling:null);_s(n);break;case 19:var h=(e.flags&128)!==0;if(o=(s&n.childLanes)!==0,o||(ca(e,n,s,!1),o=(s&n.childLanes)!==0),h){if(o)return Op(e,n,s);n.flags|=128}if(h=n.memoizedState,h!==null&&(h.rendering=null,h.tail=null,h.lastEffect=null),tt(fe,fe.current),o)break;return null;case 22:return n.lanes=0,Sp(e,n,s,n.pendingProps);case 24:ms(n,Ee,e.memoizedState.cache)}return Li(e,n,s)}function Mp(e,n,s){if(e!==null)if(e.memoizedProps!==n.pendingProps)Ae=!0;else{if(!Rf(e,s)&&(n.flags&128)===0)return Ae=!1,BT(e,n,s);Ae=(e.flags&131072)!==0}else Ae=!1,Mt&&(n.flags&1048576)!==0&&cg(n,No,n.index);switch(n.lanes=0,n.tag){case 16:t:{var o=n.pendingProps;if(e=Tr(n.elementType),n.type=e,typeof e=="function")Dh(e)?(o=Rr(e,o),n.tag=1,n=Cp(null,n,e,o,s)):(n.tag=0,n=_f(null,n,e,o,s));else{if(e!=null){var h=e.$$typeof;if(h===zt){n.tag=11,n=Ep(null,n,e,o,s);break t}else if(h===I){n.tag=14,n=Tp(null,n,e,o,s);break t}}throw n=ne(e)||e,Error(r(306,n,""))}}return n;case 0:return _f(e,n,n.type,n.pendingProps,s);case 1:return o=n.type,h=Rr(o,n.pendingProps),Cp(e,n,o,h,s);case 3:t:{if(Ce(n,n.stateNode.containerInfo),e===null)throw Error(r(387));o=n.pendingProps;var f=n.memoizedState;h=f.element,Gh(e,n),Po(n,o,null,s);var g=n.memoizedState;if(o=g.cache,ms(n,Ee,o),o!==f.cache&&Ph(n,[Ee],s,!0),xo(),o=g.element,f.isDehydrated)if(f={element:o,isDehydrated:!1,cache:g.cache},n.updateQueue.baseState=f,n.memoizedState=f,n.flags&256){n=Ip(e,n,o,s);break t}else if(o!==h){h=bn(Error(r(424)),n),Oo(h),n=Ip(e,n,o,s);break t}else{switch(e=n.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Jt=Dn(e.firstChild),ze=n,Mt=!0,fs=null,Cn=!0,s=Sg(n,null,o,s),n.child=s;s;)s.flags=s.flags&-3|4096,s=s.sibling}else{if(yr(),o===h){n=Li(e,n,s);break t}qe(e,n,o,s)}n=n.child}return n;case 26:return xu(e,n),e===null?(s=jy(n.type,null,n.pendingProps,null))?n.memoizedState=s:Mt||(s=n.type,e=n.pendingProps,o=tc(At.current).createElement(s),o[ye]=n,o[Me]=e,He(o,s,e),_e(o),n.stateNode=o):n.memoizedState=jy(n.type,e.memoizedProps,n.pendingProps,e.memoizedState),null;case 27:return $s(n),e===null&&Mt&&(o=n.stateNode=By(n.type,n.pendingProps,At.current),ze=n,Cn=!0,h=Jt,Cs(n.type)?(sd=h,Jt=Dn(o.firstChild)):Jt=h),qe(e,n,n.pendingProps.children,s),xu(e,n),e===null&&(n.flags|=4194304),n.child;case 5:return e===null&&Mt&&((h=o=Jt)&&(o=p1(o,n.type,n.pendingProps,Cn),o!==null?(n.stateNode=o,ze=n,Jt=Dn(o.firstChild),Cn=!1,h=!0):h=!1),h||ds(n)),$s(n),h=n.type,f=n.pendingProps,g=e!==null?e.memoizedProps:null,o=f.children,Wf(h,f)?o=null:g!==null&&Wf(h,g)&&(n.flags|=32),n.memoizedState!==null&&(h=$h(e,n,OT,null,null,s),sl._currentValue=h),xu(e,n),qe(e,n,o,s),n.child;case 6:return e===null&&Mt&&((e=s=Jt)&&(s=y1(s,n.pendingProps,Cn),s!==null?(n.stateNode=s,ze=n,Jt=null,e=!0):e=!1),e||ds(n)),null;case 13:return Dp(e,n,s);case 4:return Ce(n,n.stateNode.containerInfo),o=n.pendingProps,e===null?n.child=Sr(n,null,o,s):qe(e,n,o,s),n.child;case 11:return Ep(e,n,n.type,n.pendingProps,s);case 7:return qe(e,n,n.pendingProps,s),n.child;case 8:return qe(e,n,n.pendingProps.children,s),n.child;case 12:return qe(e,n,n.pendingProps.children,s),n.child;case 10:return o=n.pendingProps,ms(n,n.type,o.value),qe(e,n,o.children,s),n.child;case 9:return h=n.type._context,o=n.pendingProps.children,vr(n),h=Be(h),o=o(h),n.flags|=1,qe(e,n,o,s),n.child;case 14:return Tp(e,n,n.type,n.pendingProps,s);case 15:return Ap(e,n,n.type,n.pendingProps,s);case 19:return Op(e,n,s);case 31:return zT(e,n,s);case 22:return Sp(e,n,s,n.pendingProps);case 24:return vr(n),o=Be(Ee),e===null?(h=qh(),h===null&&(h=$t,f=zh(),h.pooledCache=f,f.refCount++,f!==null&&(h.pooledCacheLanes|=s),h=f),n.memoizedState={parent:o,cache:h},jh(n),ms(n,Ee,h)):((e.lanes&s)!==0&&(Gh(e,n),Po(n,null,null,s),xo()),h=e.memoizedState,f=n.memoizedState,h.parent!==o?(h={parent:o,cache:o},n.memoizedState=h,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=h),ms(n,Ee,o)):(o=f.cache,ms(n,Ee,o),o!==h.cache&&Ph(n,[Ee],s,!0))),qe(e,n,n.pendingProps.children,s),n.child;case 29:throw n.pendingProps}throw Error(r(156,n.tag))}function xi(e){e.flags|=4}function wf(e,n,s,o,h){if((n=(e.mode&32)!==0)&&(n=!1),n){if(e.flags|=16777216,(h&335544128)===h)if(e.stateNode.complete)e.flags|=8192;else if(ry())e.flags|=8192;else throw Ar=Au,Hh}else e.flags&=-16777217}function Vp(e,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Yy(n))if(ry())e.flags|=8192;else throw Ar=Au,Hh}function zu(e,n){n!==null&&(e.flags|=4),e.flags&16384&&(n=e.tag!==22?Fl():536870912,e.lanes|=n,Aa|=n)}function Go(e,n){if(!Mt)switch(e.tailMode){case"hidden":n=e.tail;for(var s=null;n!==null;)n.alternate!==null&&(s=n),n=n.sibling;s===null?e.tail=null:s.sibling=null;break;case"collapsed":s=e.tail;for(var o=null;s!==null;)s.alternate!==null&&(o=s),s=s.sibling;o===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:o.sibling=null}}function Wt(e){var n=e.alternate!==null&&e.alternate.child===e.child,s=0,o=0;if(n)for(var h=e.child;h!==null;)s|=h.lanes|h.childLanes,o|=h.subtreeFlags&65011712,o|=h.flags&65011712,h.return=e,h=h.sibling;else for(h=e.child;h!==null;)s|=h.lanes|h.childLanes,o|=h.subtreeFlags,o|=h.flags,h.return=e,h=h.sibling;return e.subtreeFlags|=o,e.childLanes=s,n}function qT(e,n,s){var o=n.pendingProps;switch(Vh(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Wt(n),null;case 1:return Wt(n),null;case 3:return s=n.stateNode,o=null,e!==null&&(o=e.memoizedState.cache),n.memoizedState.cache!==o&&(n.flags|=2048),Vi(Ee),ie(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),(e===null||e.child===null)&&(ua(n)?xi(n):e===null||e.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,Uh())),Wt(n),null;case 26:var h=n.type,f=n.memoizedState;return e===null?(xi(n),f!==null?(Wt(n),Vp(n,f)):(Wt(n),wf(n,h,null,o,s))):f?f!==e.memoizedState?(xi(n),Wt(n),Vp(n,f)):(Wt(n),n.flags&=-16777217):(e=e.memoizedProps,e!==o&&xi(n),Wt(n),wf(n,h,e,o,s)),null;case 27:if(qr(n),s=At.current,h=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==o&&xi(n);else{if(!o){if(n.stateNode===null)throw Error(r(166));return Wt(n),null}e=it.current,ua(n)?fg(n):(e=By(h,o,s),n.stateNode=e,xi(n))}return Wt(n),null;case 5:if(qr(n),h=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==o&&xi(n);else{if(!o){if(n.stateNode===null)throw Error(r(166));return Wt(n),null}if(f=it.current,ua(n))fg(n);else{var g=tc(At.current);switch(f){case 1:f=g.createElementNS("http://www.w3.org/2000/svg",h);break;case 2:f=g.createElementNS("http://www.w3.org/1998/Math/MathML",h);break;default:switch(h){case"svg":f=g.createElementNS("http://www.w3.org/2000/svg",h);break;case"math":f=g.createElementNS("http://www.w3.org/1998/Math/MathML",h);break;case"script":f=g.createElement("div"),f.innerHTML="<script><\/script>",f=f.removeChild(f.firstChild);break;case"select":f=typeof o.is=="string"?g.createElement("select",{is:o.is}):g.createElement("select"),o.multiple?f.multiple=!0:o.size&&(f.size=o.size);break;default:f=typeof o.is=="string"?g.createElement(h,{is:o.is}):g.createElement(h)}}f[ye]=n,f[Me]=o;t:for(g=n.child;g!==null;){if(g.tag===5||g.tag===6)f.appendChild(g.stateNode);else if(g.tag!==4&&g.tag!==27&&g.child!==null){g.child.return=g,g=g.child;continue}if(g===n)break t;for(;g.sibling===null;){if(g.return===null||g.return===n)break t;g=g.return}g.sibling.return=g.return,g=g.sibling}n.stateNode=f;t:switch(He(f,h,o),h){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break t;case"img":o=!0;break t;default:o=!1}o&&xi(n)}}return Wt(n),wf(n,n.type,e===null?null:e.memoizedProps,n.pendingProps,s),null;case 6:if(e&&n.stateNode!=null)e.memoizedProps!==o&&xi(n);else{if(typeof o!="string"&&n.stateNode===null)throw Error(r(166));if(e=At.current,ua(n)){if(e=n.stateNode,s=n.memoizedProps,o=null,h=ze,h!==null)switch(h.tag){case 27:case 5:o=h.memoizedProps}e[ye]=n,e=!!(e.nodeValue===s||o!==null&&o.suppressHydrationWarning===!0||Dy(e.nodeValue,s)),e||ds(n,!0)}else e=tc(e).createTextNode(o),e[ye]=n,n.stateNode=e}return Wt(n),null;case 31:if(s=n.memoizedState,e===null||e.memoizedState!==null){if(o=ua(n),s!==null){if(e===null){if(!o)throw Error(r(318));if(e=n.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(r(557));e[ye]=n}else yr(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Wt(n),e=!1}else s=Uh(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=s),e=!0;if(!e)return n.flags&256?(mn(n),n):(mn(n),null);if((n.flags&128)!==0)throw Error(r(558))}return Wt(n),null;case 13:if(o=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(h=ua(n),o!==null&&o.dehydrated!==null){if(e===null){if(!h)throw Error(r(318));if(h=n.memoizedState,h=h!==null?h.dehydrated:null,!h)throw Error(r(317));h[ye]=n}else yr(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Wt(n),h=!1}else h=Uh(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=h),h=!0;if(!h)return n.flags&256?(mn(n),n):(mn(n),null)}return mn(n),(n.flags&128)!==0?(n.lanes=s,n):(s=o!==null,e=e!==null&&e.memoizedState!==null,s&&(o=n.child,h=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(h=o.alternate.memoizedState.cachePool.pool),f=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(f=o.memoizedState.cachePool.pool),f!==h&&(o.flags|=2048)),s!==e&&s&&(n.child.flags|=8192),zu(n,n.updateQueue),Wt(n),null);case 4:return ie(),e===null&&Yf(n.stateNode.containerInfo),Wt(n),null;case 10:return Vi(n.type),Wt(n),null;case 19:if(K(fe),o=n.memoizedState,o===null)return Wt(n),null;if(h=(n.flags&128)!==0,f=o.rendering,f===null)if(h)Go(o,!1);else{if(ue!==0||e!==null&&(e.flags&128)!==0)for(e=n.child;e!==null;){if(f=wu(e),f!==null){for(n.flags|=128,Go(o,!1),e=f.updateQueue,n.updateQueue=e,zu(n,e),n.subtreeFlags=0,e=s,s=n.child;s!==null;)og(s,e),s=s.sibling;return tt(fe,fe.current&1|2),Mt&&Oi(n,o.treeForkCount),n.child}e=e.sibling}o.tail!==null&&$e()>Gu&&(n.flags|=128,h=!0,Go(o,!1),n.lanes=4194304)}else{if(!h)if(e=wu(f),e!==null){if(n.flags|=128,h=!0,e=e.updateQueue,n.updateQueue=e,zu(n,e),Go(o,!0),o.tail===null&&o.tailMode==="hidden"&&!f.alternate&&!Mt)return Wt(n),null}else 2*$e()-o.renderingStartTime>Gu&&s!==536870912&&(n.flags|=128,h=!0,Go(o,!1),n.lanes=4194304);o.isBackwards?(f.sibling=n.child,n.child=f):(e=o.last,e!==null?e.sibling=f:n.child=f,o.last=f)}return o.tail!==null?(e=o.tail,o.rendering=e,o.tail=e.sibling,o.renderingStartTime=$e(),e.sibling=null,s=fe.current,tt(fe,h?s&1|2:s&1),Mt&&Oi(n,o.treeForkCount),e):(Wt(n),null);case 22:case 23:return mn(n),Yh(),o=n.memoizedState!==null,e!==null?e.memoizedState!==null!==o&&(n.flags|=8192):o&&(n.flags|=8192),o?(s&536870912)!==0&&(n.flags&128)===0&&(Wt(n),n.subtreeFlags&6&&(n.flags|=8192)):Wt(n),s=n.updateQueue,s!==null&&zu(n,s.retryQueue),s=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(s=e.memoizedState.cachePool.pool),o=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),o!==s&&(n.flags|=2048),e!==null&&K(Er),null;case 24:return s=null,e!==null&&(s=e.memoizedState.cache),n.memoizedState.cache!==s&&(n.flags|=2048),Vi(Ee),Wt(n),null;case 25:return null;case 30:return null}throw Error(r(156,n.tag))}function HT(e,n){switch(Vh(n),n.tag){case 1:return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return Vi(Ee),ie(),e=n.flags,(e&65536)!==0&&(e&128)===0?(n.flags=e&-65537|128,n):null;case 26:case 27:case 5:return qr(n),null;case 31:if(n.memoizedState!==null){if(mn(n),n.alternate===null)throw Error(r(340));yr()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 13:if(mn(n),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(r(340));yr()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return K(fe),null;case 4:return ie(),null;case 10:return Vi(n.type),null;case 22:case 23:return mn(n),Yh(),e!==null&&K(Er),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 24:return Vi(Ee),null;case 25:return null;default:return null}}function kp(e,n){switch(Vh(n),n.tag){case 3:Vi(Ee),ie();break;case 26:case 27:case 5:qr(n);break;case 4:ie();break;case 31:n.memoizedState!==null&&mn(n);break;case 13:mn(n);break;case 19:K(fe);break;case 10:Vi(n.type);break;case 22:case 23:mn(n),Yh(),e!==null&&K(Er);break;case 24:Vi(Ee)}}function Fo(e,n){try{var s=n.updateQueue,o=s!==null?s.lastEffect:null;if(o!==null){var h=o.next;s=h;do{if((s.tag&e)===e){o=void 0;var f=s.create,g=s.inst;o=f(),g.destroy=o}s=s.next}while(s!==h)}}catch(E){Qt(n,n.return,E)}}function Es(e,n,s){try{var o=n.updateQueue,h=o!==null?o.lastEffect:null;if(h!==null){var f=h.next;o=f;do{if((o.tag&e)===e){var g=o.inst,E=g.destroy;if(E!==void 0){g.destroy=void 0,h=n;var w=s,P=E;try{P()}catch(H){Qt(h,w,H)}}}o=o.next}while(o!==f)}}catch(H){Qt(n,n.return,H)}}function Up(e){var n=e.updateQueue;if(n!==null){var s=e.stateNode;try{Rg(n,s)}catch(o){Qt(e,e.return,o)}}}function Lp(e,n,s){s.props=Rr(e.type,e.memoizedProps),s.state=e.memoizedState;try{s.componentWillUnmount()}catch(o){Qt(e,n,o)}}function Qo(e,n){try{var s=e.ref;if(s!==null){switch(e.tag){case 26:case 27:case 5:var o=e.stateNode;break;case 30:o=e.stateNode;break;default:o=e.stateNode}typeof s=="function"?e.refCleanup=s(o):s.current=o}}catch(h){Qt(e,n,h)}}function gi(e,n){var s=e.ref,o=e.refCleanup;if(s!==null)if(typeof o=="function")try{o()}catch(h){Qt(e,n,h)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof s=="function")try{s(null)}catch(h){Qt(e,n,h)}else s.current=null}function xp(e){var n=e.type,s=e.memoizedProps,o=e.stateNode;try{t:switch(n){case"button":case"input":case"select":case"textarea":s.autoFocus&&o.focus();break t;case"img":s.src?o.src=s.src:s.srcSet&&(o.srcset=s.srcSet)}}catch(h){Qt(e,e.return,h)}}function Cf(e,n,s){try{var o=e.stateNode;c1(o,e.type,s,n),o[Me]=n}catch(h){Qt(e,e.return,h)}}function Pp(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Cs(e.type)||e.tag===4}function If(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||Pp(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Cs(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Df(e,n,s){var o=e.tag;if(o===5||o===6)e=e.stateNode,n?(s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s).insertBefore(e,n):(n=s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s,n.appendChild(e),s=s._reactRootContainer,s!=null||n.onclick!==null||(n.onclick=Pn));else if(o!==4&&(o===27&&Cs(e.type)&&(s=e.stateNode,n=null),e=e.child,e!==null))for(Df(e,n,s),e=e.sibling;e!==null;)Df(e,n,s),e=e.sibling}function Bu(e,n,s){var o=e.tag;if(o===5||o===6)e=e.stateNode,n?s.insertBefore(e,n):s.appendChild(e);else if(o!==4&&(o===27&&Cs(e.type)&&(s=e.stateNode),e=e.child,e!==null))for(Bu(e,n,s),e=e.sibling;e!==null;)Bu(e,n,s),e=e.sibling}function zp(e){var n=e.stateNode,s=e.memoizedProps;try{for(var o=e.type,h=n.attributes;h.length;)n.removeAttributeNode(h[0]);He(n,o,s),n[ye]=e,n[Me]=s}catch(f){Qt(e,e.return,f)}}var Pi=!1,Se=!1,Nf=!1,Bp=typeof WeakSet=="function"?WeakSet:Set,ke=null;function jT(e,n){if(e=e.containerInfo,$f=oc,e=Jm(e),Ah(e)){if("selectionStart"in e)var s={start:e.selectionStart,end:e.selectionEnd};else t:{s=(s=e.ownerDocument)&&s.defaultView||window;var o=s.getSelection&&s.getSelection();if(o&&o.rangeCount!==0){s=o.anchorNode;var h=o.anchorOffset,f=o.focusNode;o=o.focusOffset;try{s.nodeType,f.nodeType}catch{s=null;break t}var g=0,E=-1,w=-1,P=0,H=0,Q=e,z=null;e:for(;;){for(var q;Q!==s||h!==0&&Q.nodeType!==3||(E=g+h),Q!==f||o!==0&&Q.nodeType!==3||(w=g+o),Q.nodeType===3&&(g+=Q.nodeValue.length),(q=Q.firstChild)!==null;)z=Q,Q=q;for(;;){if(Q===e)break e;if(z===s&&++P===h&&(E=g),z===f&&++H===o&&(w=g),(q=Q.nextSibling)!==null)break;Q=z,z=Q.parentNode}Q=q}s=E===-1||w===-1?null:{start:E,end:w}}else s=null}s=s||{start:0,end:0}}else s=null;for(Jf={focusedElem:e,selectionRange:s},oc=!1,ke=n;ke!==null;)if(n=ke,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,ke=e;else for(;ke!==null;){switch(n=ke,f=n.alternate,e=n.flags,n.tag){case 0:if((e&4)!==0&&(e=n.updateQueue,e=e!==null?e.events:null,e!==null))for(s=0;s<e.length;s++)h=e[s],h.ref.impl=h.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&f!==null){e=void 0,s=n,h=f.memoizedProps,f=f.memoizedState,o=s.stateNode;try{var st=Rr(s.type,h);e=o.getSnapshotBeforeUpdate(st,f),o.__reactInternalSnapshotBeforeUpdate=e}catch(ct){Qt(s,s.return,ct)}}break;case 3:if((e&1024)!==0){if(e=n.stateNode.containerInfo,s=e.nodeType,s===9)ed(e);else if(s===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":ed(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(r(163))}if(e=n.sibling,e!==null){e.return=n.return,ke=e;break}ke=n.return}}function qp(e,n,s){var o=s.flags;switch(s.tag){case 0:case 11:case 15:Bi(e,s),o&4&&Fo(5,s);break;case 1:if(Bi(e,s),o&4)if(e=s.stateNode,n===null)try{e.componentDidMount()}catch(g){Qt(s,s.return,g)}else{var h=Rr(s.type,n.memoizedProps);n=n.memoizedState;try{e.componentDidUpdate(h,n,e.__reactInternalSnapshotBeforeUpdate)}catch(g){Qt(s,s.return,g)}}o&64&&Up(s),o&512&&Qo(s,s.return);break;case 3:if(Bi(e,s),o&64&&(e=s.updateQueue,e!==null)){if(n=null,s.child!==null)switch(s.child.tag){case 27:case 5:n=s.child.stateNode;break;case 1:n=s.child.stateNode}try{Rg(e,n)}catch(g){Qt(s,s.return,g)}}break;case 27:n===null&&o&4&&zp(s);case 26:case 5:Bi(e,s),n===null&&o&4&&xp(s),o&512&&Qo(s,s.return);break;case 12:Bi(e,s);break;case 31:Bi(e,s),o&4&&Gp(e,s);break;case 13:Bi(e,s),o&4&&Fp(e,s),o&64&&(e=s.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(s=JT.bind(null,s),_1(e,s))));break;case 22:if(o=s.memoizedState!==null||Pi,!o){n=n!==null&&n.memoizedState!==null||Se,h=Pi;var f=Se;Pi=o,(Se=n)&&!f?qi(e,s,(s.subtreeFlags&8772)!==0):Bi(e,s),Pi=h,Se=f}break;case 30:break;default:Bi(e,s)}}function Hp(e){var n=e.alternate;n!==null&&(e.alternate=null,Hp(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&Qr(n)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var re=null,nn=!1;function zi(e,n,s){for(s=s.child;s!==null;)jp(e,n,s),s=s.sibling}function jp(e,n,s){if(xe&&typeof xe.onCommitFiberUnmount=="function")try{xe.onCommitFiberUnmount(kn,s)}catch{}switch(s.tag){case 26:Se||gi(s,n),zi(e,n,s),s.memoizedState?s.memoizedState.count--:s.stateNode&&(s=s.stateNode,s.parentNode.removeChild(s));break;case 27:Se||gi(s,n);var o=re,h=nn;Cs(s.type)&&(re=s.stateNode,nn=!1),zi(e,n,s),el(s.stateNode),re=o,nn=h;break;case 5:Se||gi(s,n);case 6:if(o=re,h=nn,re=null,zi(e,n,s),re=o,nn=h,re!==null)if(nn)try{(re.nodeType===9?re.body:re.nodeName==="HTML"?re.ownerDocument.body:re).removeChild(s.stateNode)}catch(f){Qt(s,n,f)}else try{re.removeChild(s.stateNode)}catch(f){Qt(s,n,f)}break;case 18:re!==null&&(nn?(e=re,Uy(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,s.stateNode),Na(e)):Uy(re,s.stateNode));break;case 4:o=re,h=nn,re=s.stateNode.containerInfo,nn=!0,zi(e,n,s),re=o,nn=h;break;case 0:case 11:case 14:case 15:Es(2,s,n),Se||Es(4,s,n),zi(e,n,s);break;case 1:Se||(gi(s,n),o=s.stateNode,typeof o.componentWillUnmount=="function"&&Lp(s,n,o)),zi(e,n,s);break;case 21:zi(e,n,s);break;case 22:Se=(o=Se)||s.memoizedState!==null,zi(e,n,s),Se=o;break;default:zi(e,n,s)}}function Gp(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Na(e)}catch(s){Qt(n,n.return,s)}}}function Fp(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Na(e)}catch(s){Qt(n,n.return,s)}}function GT(e){switch(e.tag){case 31:case 13:case 19:var n=e.stateNode;return n===null&&(n=e.stateNode=new Bp),n;case 22:return e=e.stateNode,n=e._retryCache,n===null&&(n=e._retryCache=new Bp),n;default:throw Error(r(435,e.tag))}}function qu(e,n){var s=GT(e);n.forEach(function(o){if(!s.has(o)){s.add(o);var h=WT.bind(null,e,o);o.then(h,h)}})}function sn(e,n){var s=n.deletions;if(s!==null)for(var o=0;o<s.length;o++){var h=s[o],f=e,g=n,E=g;t:for(;E!==null;){switch(E.tag){case 27:if(Cs(E.type)){re=E.stateNode,nn=!1;break t}break;case 5:re=E.stateNode,nn=!1;break t;case 3:case 4:re=E.stateNode.containerInfo,nn=!0;break t}E=E.return}if(re===null)throw Error(r(160));jp(f,g,h),re=null,nn=!1,f=h.alternate,f!==null&&(f.return=null),h.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)Qp(n,e),n=n.sibling}var Gn=null;function Qp(e,n){var s=e.alternate,o=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:sn(n,e),rn(e),o&4&&(Es(3,e,e.return),Fo(3,e),Es(5,e,e.return));break;case 1:sn(n,e),rn(e),o&512&&(Se||s===null||gi(s,s.return)),o&64&&Pi&&(e=e.updateQueue,e!==null&&(o=e.callbacks,o!==null&&(s=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=s===null?o:s.concat(o))));break;case 26:var h=Gn;if(sn(n,e),rn(e),o&512&&(Se||s===null||gi(s,s.return)),o&4){var f=s!==null?s.memoizedState:null;if(o=e.memoizedState,s===null)if(o===null)if(e.stateNode===null){t:{o=e.type,s=e.memoizedProps,h=h.ownerDocument||h;e:switch(o){case"title":f=h.getElementsByTagName("title")[0],(!f||f[ei]||f[ye]||f.namespaceURI==="http://www.w3.org/2000/svg"||f.hasAttribute("itemprop"))&&(f=h.createElement(o),h.head.insertBefore(f,h.querySelector("head > title"))),He(f,o,s),f[ye]=e,_e(f),o=f;break t;case"link":var g=Qy("link","href",h).get(o+(s.href||""));if(g){for(var E=0;E<g.length;E++)if(f=g[E],f.getAttribute("href")===(s.href==null||s.href===""?null:s.href)&&f.getAttribute("rel")===(s.rel==null?null:s.rel)&&f.getAttribute("title")===(s.title==null?null:s.title)&&f.getAttribute("crossorigin")===(s.crossOrigin==null?null:s.crossOrigin)){g.splice(E,1);break e}}f=h.createElement(o),He(f,o,s),h.head.appendChild(f);break;case"meta":if(g=Qy("meta","content",h).get(o+(s.content||""))){for(E=0;E<g.length;E++)if(f=g[E],f.getAttribute("content")===(s.content==null?null:""+s.content)&&f.getAttribute("name")===(s.name==null?null:s.name)&&f.getAttribute("property")===(s.property==null?null:s.property)&&f.getAttribute("http-equiv")===(s.httpEquiv==null?null:s.httpEquiv)&&f.getAttribute("charset")===(s.charSet==null?null:s.charSet)){g.splice(E,1);break e}}f=h.createElement(o),He(f,o,s),h.head.appendChild(f);break;default:throw Error(r(468,o))}f[ye]=e,_e(f),o=f}e.stateNode=o}else Ky(h,e.type,e.stateNode);else e.stateNode=Fy(h,o,e.memoizedProps);else f!==o?(f===null?s.stateNode!==null&&(s=s.stateNode,s.parentNode.removeChild(s)):f.count--,o===null?Ky(h,e.type,e.stateNode):Fy(h,o,e.memoizedProps)):o===null&&e.stateNode!==null&&Cf(e,e.memoizedProps,s.memoizedProps)}break;case 27:sn(n,e),rn(e),o&512&&(Se||s===null||gi(s,s.return)),s!==null&&o&4&&Cf(e,e.memoizedProps,s.memoizedProps);break;case 5:if(sn(n,e),rn(e),o&512&&(Se||s===null||gi(s,s.return)),e.flags&32){h=e.stateNode;try{en(h,"")}catch(st){Qt(e,e.return,st)}}o&4&&e.stateNode!=null&&(h=e.memoizedProps,Cf(e,h,s!==null?s.memoizedProps:h)),o&1024&&(Nf=!0);break;case 6:if(sn(n,e),rn(e),o&4){if(e.stateNode===null)throw Error(r(162));o=e.memoizedProps,s=e.stateNode;try{s.nodeValue=o}catch(st){Qt(e,e.return,st)}}break;case 3:if(ic=null,h=Gn,Gn=ec(n.containerInfo),sn(n,e),Gn=h,rn(e),o&4&&s!==null&&s.memoizedState.isDehydrated)try{Na(n.containerInfo)}catch(st){Qt(e,e.return,st)}Nf&&(Nf=!1,Kp(e));break;case 4:o=Gn,Gn=ec(e.stateNode.containerInfo),sn(n,e),rn(e),Gn=o;break;case 12:sn(n,e),rn(e);break;case 31:sn(n,e),rn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,qu(e,o)));break;case 13:sn(n,e),rn(e),e.child.flags&8192&&e.memoizedState!==null!=(s!==null&&s.memoizedState!==null)&&(ju=$e()),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,qu(e,o)));break;case 22:h=e.memoizedState!==null;var w=s!==null&&s.memoizedState!==null,P=Pi,H=Se;if(Pi=P||h,Se=H||w,sn(n,e),Se=H,Pi=P,rn(e),o&8192)t:for(n=e.stateNode,n._visibility=h?n._visibility&-2:n._visibility|1,h&&(s===null||w||Pi||Se||wr(e)),s=null,n=e;;){if(n.tag===5||n.tag===26){if(s===null){w=s=n;try{if(f=w.stateNode,h)g=f.style,typeof g.setProperty=="function"?g.setProperty("display","none","important"):g.display="none";else{E=w.stateNode;var Q=w.memoizedProps.style,z=Q!=null&&Q.hasOwnProperty("display")?Q.display:null;E.style.display=z==null||typeof z=="boolean"?"":(""+z).trim()}}catch(st){Qt(w,w.return,st)}}}else if(n.tag===6){if(s===null){w=n;try{w.stateNode.nodeValue=h?"":w.memoizedProps}catch(st){Qt(w,w.return,st)}}}else if(n.tag===18){if(s===null){w=n;try{var q=w.stateNode;h?Ly(q,!0):Ly(w.stateNode,!1)}catch(st){Qt(w,w.return,st)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===e)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break t;for(;n.sibling===null;){if(n.return===null||n.return===e)break t;s===n&&(s=null),n=n.return}s===n&&(s=null),n.sibling.return=n.return,n=n.sibling}o&4&&(o=e.updateQueue,o!==null&&(s=o.retryQueue,s!==null&&(o.retryQueue=null,qu(e,s))));break;case 19:sn(n,e),rn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,qu(e,o)));break;case 30:break;case 21:break;default:sn(n,e),rn(e)}}function rn(e){var n=e.flags;if(n&2){try{for(var s,o=e.return;o!==null;){if(Pp(o)){s=o;break}o=o.return}if(s==null)throw Error(r(160));switch(s.tag){case 27:var h=s.stateNode,f=If(e);Bu(e,f,h);break;case 5:var g=s.stateNode;s.flags&32&&(en(g,""),s.flags&=-33);var E=If(e);Bu(e,E,g);break;case 3:case 4:var w=s.stateNode.containerInfo,P=If(e);Df(e,P,w);break;default:throw Error(r(161))}}catch(H){Qt(e,e.return,H)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function Kp(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var n=e;Kp(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),e=e.sibling}}function Bi(e,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)qp(e,n.alternate,n),n=n.sibling}function wr(e){for(e=e.child;e!==null;){var n=e;switch(n.tag){case 0:case 11:case 14:case 15:Es(4,n,n.return),wr(n);break;case 1:gi(n,n.return);var s=n.stateNode;typeof s.componentWillUnmount=="function"&&Lp(n,n.return,s),wr(n);break;case 27:el(n.stateNode);case 26:case 5:gi(n,n.return),wr(n);break;case 22:n.memoizedState===null&&wr(n);break;case 30:wr(n);break;default:wr(n)}e=e.sibling}}function qi(e,n,s){for(s=s&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var o=n.alternate,h=e,f=n,g=f.flags;switch(f.tag){case 0:case 11:case 15:qi(h,f,s),Fo(4,f);break;case 1:if(qi(h,f,s),o=f,h=o.stateNode,typeof h.componentDidMount=="function")try{h.componentDidMount()}catch(P){Qt(o,o.return,P)}if(o=f,h=o.updateQueue,h!==null){var E=o.stateNode;try{var w=h.shared.hiddenCallbacks;if(w!==null)for(h.shared.hiddenCallbacks=null,h=0;h<w.length;h++)bg(w[h],E)}catch(P){Qt(o,o.return,P)}}s&&g&64&&Up(f),Qo(f,f.return);break;case 27:zp(f);case 26:case 5:qi(h,f,s),s&&o===null&&g&4&&xp(f),Qo(f,f.return);break;case 12:qi(h,f,s);break;case 31:qi(h,f,s),s&&g&4&&Gp(h,f);break;case 13:qi(h,f,s),s&&g&4&&Fp(h,f);break;case 22:f.memoizedState===null&&qi(h,f,s),Qo(f,f.return);break;case 30:break;default:qi(h,f,s)}n=n.sibling}}function Of(e,n){var s=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(s=e.memoizedState.cachePool.pool),e=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(e=n.memoizedState.cachePool.pool),e!==s&&(e!=null&&e.refCount++,s!=null&&Mo(s))}function Mf(e,n){e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&Mo(e))}function Fn(e,n,s,o){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)Yp(e,n,s,o),n=n.sibling}function Yp(e,n,s,o){var h=n.flags;switch(n.tag){case 0:case 11:case 15:Fn(e,n,s,o),h&2048&&Fo(9,n);break;case 1:Fn(e,n,s,o);break;case 3:Fn(e,n,s,o),h&2048&&(e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&Mo(e)));break;case 12:if(h&2048){Fn(e,n,s,o),e=n.stateNode;try{var f=n.memoizedProps,g=f.id,E=f.onPostCommit;typeof E=="function"&&E(g,n.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(w){Qt(n,n.return,w)}}else Fn(e,n,s,o);break;case 31:Fn(e,n,s,o);break;case 13:Fn(e,n,s,o);break;case 23:break;case 22:f=n.stateNode,g=n.alternate,n.memoizedState!==null?f._visibility&2?Fn(e,n,s,o):Ko(e,n):f._visibility&2?Fn(e,n,s,o):(f._visibility|=2,va(e,n,s,o,(n.subtreeFlags&10256)!==0||!1)),h&2048&&Of(g,n);break;case 24:Fn(e,n,s,o),h&2048&&Mf(n.alternate,n);break;default:Fn(e,n,s,o)}}function va(e,n,s,o,h){for(h=h&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var f=e,g=n,E=s,w=o,P=g.flags;switch(g.tag){case 0:case 11:case 15:va(f,g,E,w,h),Fo(8,g);break;case 23:break;case 22:var H=g.stateNode;g.memoizedState!==null?H._visibility&2?va(f,g,E,w,h):Ko(f,g):(H._visibility|=2,va(f,g,E,w,h)),h&&P&2048&&Of(g.alternate,g);break;case 24:va(f,g,E,w,h),h&&P&2048&&Mf(g.alternate,g);break;default:va(f,g,E,w,h)}n=n.sibling}}function Ko(e,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var s=e,o=n,h=o.flags;switch(o.tag){case 22:Ko(s,o),h&2048&&Of(o.alternate,o);break;case 24:Ko(s,o),h&2048&&Mf(o.alternate,o);break;default:Ko(s,o)}n=n.sibling}}var Yo=8192;function Ea(e,n,s){if(e.subtreeFlags&Yo)for(e=e.child;e!==null;)Xp(e,n,s),e=e.sibling}function Xp(e,n,s){switch(e.tag){case 26:Ea(e,n,s),e.flags&Yo&&e.memoizedState!==null&&N1(s,Gn,e.memoizedState,e.memoizedProps);break;case 5:Ea(e,n,s);break;case 3:case 4:var o=Gn;Gn=ec(e.stateNode.containerInfo),Ea(e,n,s),Gn=o;break;case 22:e.memoizedState===null&&(o=e.alternate,o!==null&&o.memoizedState!==null?(o=Yo,Yo=16777216,Ea(e,n,s),Yo=o):Ea(e,n,s));break;default:Ea(e,n,s)}}function Zp(e){var n=e.alternate;if(n!==null&&(e=n.child,e!==null)){n.child=null;do n=e.sibling,e.sibling=null,e=n;while(e!==null)}}function Xo(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var s=0;s<n.length;s++){var o=n[s];ke=o,Jp(o,e)}Zp(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)$p(e),e=e.sibling}function $p(e){switch(e.tag){case 0:case 11:case 15:Xo(e),e.flags&2048&&Es(9,e,e.return);break;case 3:Xo(e);break;case 12:Xo(e);break;case 22:var n=e.stateNode;e.memoizedState!==null&&n._visibility&2&&(e.return===null||e.return.tag!==13)?(n._visibility&=-3,Hu(e)):Xo(e);break;default:Xo(e)}}function Hu(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var s=0;s<n.length;s++){var o=n[s];ke=o,Jp(o,e)}Zp(e)}for(e=e.child;e!==null;){switch(n=e,n.tag){case 0:case 11:case 15:Es(8,n,n.return),Hu(n);break;case 22:s=n.stateNode,s._visibility&2&&(s._visibility&=-3,Hu(n));break;default:Hu(n)}e=e.sibling}}function Jp(e,n){for(;ke!==null;){var s=ke;switch(s.tag){case 0:case 11:case 15:Es(8,s,n);break;case 23:case 22:if(s.memoizedState!==null&&s.memoizedState.cachePool!==null){var o=s.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:Mo(s.memoizedState.cache)}if(o=s.child,o!==null)o.return=s,ke=o;else t:for(s=e;ke!==null;){o=ke;var h=o.sibling,f=o.return;if(Hp(o),o===s){ke=null;break t}if(h!==null){h.return=f,ke=h;break t}ke=f}}}var FT={getCacheForType:function(e){var n=Be(Ee),s=n.data.get(e);return s===void 0&&(s=e(),n.data.set(e,s)),s},cacheSignal:function(){return Be(Ee).controller.signal}},QT=typeof WeakMap=="function"?WeakMap:Map,qt=0,$t=null,Rt=null,Ct=0,Ft=0,gn=null,Ts=!1,Ta=!1,Vf=!1,Hi=0,ue=0,As=0,Cr=0,kf=0,pn=0,Aa=0,Zo=null,an=null,Uf=!1,ju=0,Wp=0,Gu=1/0,Fu=null,Ss=null,De=0,bs=null,Sa=null,ji=0,Lf=0,xf=null,ty=null,$o=0,Pf=null;function yn(){return(qt&2)!==0&&Ct!==0?Ct&-Ct:j.T!==null?Gf():Ql()}function ey(){if(pn===0)if((Ct&536870912)===0||Mt){var e=tr;tr<<=1,(tr&3932160)===0&&(tr=262144),pn=e}else pn=536870912;return e=dn.current,e!==null&&(e.flags|=32),pn}function on(e,n,s){(e===$t&&(Ft===2||Ft===9)||e.cancelPendingCommit!==null)&&(ba(e,0),Rs(e,Ct,pn,!1)),er(e,s),((qt&2)===0||e!==$t)&&(e===$t&&((qt&2)===0&&(Cr|=s),ue===4&&Rs(e,Ct,pn,!1)),pi(e))}function ny(e,n,s){if((qt&6)!==0)throw Error(r(327));var o=!s&&(n&127)===0&&(n&e.expiredLanes)===0||Un(e,n),h=o?XT(e,n):Bf(e,n,!0),f=o;do{if(h===0){Ta&&!o&&Rs(e,n,0,!1);break}else{if(s=e.current.alternate,f&&!KT(s)){h=Bf(e,n,!1),f=!1;continue}if(h===2){if(f=n,e.errorRecoveryDisabledLanes&f)var g=0;else g=e.pendingLanes&-536870913,g=g!==0?g:g&536870912?536870912:0;if(g!==0){n=g;t:{var E=e;h=Zo;var w=E.current.memoizedState.isDehydrated;if(w&&(ba(E,g).flags|=256),g=Bf(E,g,!1),g!==2){if(Vf&&!w){E.errorRecoveryDisabledLanes|=f,Cr|=f,h=4;break t}f=an,an=h,f!==null&&(an===null?an=f:an.push.apply(an,f))}h=g}if(f=!1,h!==2)continue}}if(h===1){ba(e,0),Rs(e,n,0,!0);break}t:{switch(o=e,f=h,f){case 0:case 1:throw Error(r(345));case 4:if((n&4194048)!==n)break;case 6:Rs(o,n,pn,!Ts);break t;case 2:an=null;break;case 3:case 5:break;default:throw Error(r(329))}if((n&62914560)===n&&(h=ju+300-$e(),10<h)){if(Rs(o,n,pn,!Ts),Jn(o,0,!0)!==0)break t;ji=n,o.timeoutHandle=Vy(iy.bind(null,o,s,an,Fu,Uf,n,pn,Cr,Aa,Ts,f,"Throttled",-0,0),h);break t}iy(o,s,an,Fu,Uf,n,pn,Cr,Aa,Ts,f,null,-0,0)}}break}while(!0);pi(e)}function iy(e,n,s,o,h,f,g,E,w,P,H,Q,z,q){if(e.timeoutHandle=-1,Q=n.subtreeFlags,Q&8192||(Q&16785408)===16785408){Q={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Pn},Xp(n,f,Q);var st=(f&62914560)===f?ju-$e():(f&4194048)===f?Wp-$e():0;if(st=O1(Q,st),st!==null){ji=f,e.cancelPendingCommit=st(hy.bind(null,e,n,f,s,o,h,g,E,w,H,Q,null,z,q)),Rs(e,f,g,!P);return}}hy(e,n,f,s,o,h,g,E,w)}function KT(e){for(var n=e;;){var s=n.tag;if((s===0||s===11||s===15)&&n.flags&16384&&(s=n.updateQueue,s!==null&&(s=s.stores,s!==null)))for(var o=0;o<s.length;o++){var h=s[o],f=h.getSnapshot;h=h.value;try{if(!hn(f(),h))return!1}catch{return!1}}if(s=n.child,n.subtreeFlags&16384&&s!==null)s.return=n,n=s;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function Rs(e,n,s,o){n&=~kf,n&=~Cr,e.suspendedLanes|=n,e.pingedLanes&=~n,o&&(e.warmLanes|=n),o=e.expirationTimes;for(var h=n;0<h;){var f=31-ce(h),g=1<<f;o[f]=-1,h&=~g}s!==0&&nr(e,s,n)}function Qu(){return(qt&6)===0?(Jo(0),!1):!0}function zf(){if(Rt!==null){if(Ft===0)var e=Rt.return;else e=Rt,Mi=_r=null,tf(e),ma=null,ko=0,e=Rt;for(;e!==null;)kp(e.alternate,e),e=e.return;Rt=null}}function ba(e,n){var s=e.timeoutHandle;s!==-1&&(e.timeoutHandle=-1,d1(s)),s=e.cancelPendingCommit,s!==null&&(e.cancelPendingCommit=null,s()),ji=0,zf(),$t=e,Rt=s=Ni(e.current,null),Ct=n,Ft=0,gn=null,Ts=!1,Ta=Un(e,n),Vf=!1,Aa=pn=kf=Cr=As=ue=0,an=Zo=null,Uf=!1,(n&8)!==0&&(n|=n&32);var o=e.entangledLanes;if(o!==0)for(e=e.entanglements,o&=n;0<o;){var h=31-ce(o),f=1<<h;n|=e[h],o&=~f}return Hi=n,du(),s}function sy(e,n){Tt=null,j.H=Ho,n===da||n===Tu?(n=Eg(),Ft=3):n===Hh?(n=Eg(),Ft=4):Ft=n===yf?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,gn=n,Rt===null&&(ue=1,Uu(e,bn(n,e.current)))}function ry(){var e=dn.current;return e===null?!0:(Ct&4194048)===Ct?In===null:(Ct&62914560)===Ct||(Ct&536870912)!==0?e===In:!1}function ay(){var e=j.H;return j.H=Ho,e===null?Ho:e}function oy(){var e=j.A;return j.A=FT,e}function Ku(){ue=4,Ts||(Ct&4194048)!==Ct&&dn.current!==null||(Ta=!0),(As&134217727)===0&&(Cr&134217727)===0||$t===null||Rs($t,Ct,pn,!1)}function Bf(e,n,s){var o=qt;qt|=2;var h=ay(),f=oy();($t!==e||Ct!==n)&&(Fu=null,ba(e,n)),n=!1;var g=ue;t:do try{if(Ft!==0&&Rt!==null){var E=Rt,w=gn;switch(Ft){case 8:zf(),g=6;break t;case 3:case 2:case 9:case 6:dn.current===null&&(n=!0);var P=Ft;if(Ft=0,gn=null,Ra(e,E,w,P),s&&Ta){g=0;break t}break;default:P=Ft,Ft=0,gn=null,Ra(e,E,w,P)}}YT(),g=ue;break}catch(H){sy(e,H)}while(!0);return n&&e.shellSuspendCounter++,Mi=_r=null,qt=o,j.H=h,j.A=f,Rt===null&&($t=null,Ct=0,du()),g}function YT(){for(;Rt!==null;)ly(Rt)}function XT(e,n){var s=qt;qt|=2;var o=ay(),h=oy();$t!==e||Ct!==n?(Fu=null,Gu=$e()+500,ba(e,n)):Ta=Un(e,n);t:do try{if(Ft!==0&&Rt!==null){n=Rt;var f=gn;e:switch(Ft){case 1:Ft=0,gn=null,Ra(e,n,f,1);break;case 2:case 9:if(_g(f)){Ft=0,gn=null,uy(n);break}n=function(){Ft!==2&&Ft!==9||$t!==e||(Ft=7),pi(e)},f.then(n,n);break t;case 3:Ft=7;break t;case 4:Ft=5;break t;case 7:_g(f)?(Ft=0,gn=null,uy(n)):(Ft=0,gn=null,Ra(e,n,f,7));break;case 5:var g=null;switch(Rt.tag){case 26:g=Rt.memoizedState;case 5:case 27:var E=Rt;if(g?Yy(g):E.stateNode.complete){Ft=0,gn=null;var w=E.sibling;if(w!==null)Rt=w;else{var P=E.return;P!==null?(Rt=P,Yu(P)):Rt=null}break e}}Ft=0,gn=null,Ra(e,n,f,5);break;case 6:Ft=0,gn=null,Ra(e,n,f,6);break;case 8:zf(),ue=6;break t;default:throw Error(r(462))}}ZT();break}catch(H){sy(e,H)}while(!0);return Mi=_r=null,j.H=o,j.A=h,qt=s,Rt!==null?0:($t=null,Ct=0,du(),ue)}function ZT(){for(;Rt!==null&&!gh();)ly(Rt)}function ly(e){var n=Mp(e.alternate,e,Hi);e.memoizedProps=e.pendingProps,n===null?Yu(e):Rt=n}function uy(e){var n=e,s=n.alternate;switch(n.tag){case 15:case 0:n=wp(s,n,n.pendingProps,n.type,void 0,Ct);break;case 11:n=wp(s,n,n.pendingProps,n.type.render,n.ref,Ct);break;case 5:tf(n);default:kp(s,n),n=Rt=og(n,Hi),n=Mp(s,n,Hi)}e.memoizedProps=e.pendingProps,n===null?Yu(e):Rt=n}function Ra(e,n,s,o){Mi=_r=null,tf(n),ma=null,ko=0;var h=n.return;try{if(PT(e,h,n,s,Ct)){ue=1,Uu(e,bn(s,e.current)),Rt=null;return}}catch(f){if(h!==null)throw Rt=h,f;ue=1,Uu(e,bn(s,e.current)),Rt=null;return}n.flags&32768?(Mt||o===1?e=!0:Ta||(Ct&536870912)!==0?e=!1:(Ts=e=!0,(o===2||o===9||o===3||o===6)&&(o=dn.current,o!==null&&o.tag===13&&(o.flags|=16384))),cy(n,e)):Yu(n)}function Yu(e){var n=e;do{if((n.flags&32768)!==0){cy(n,Ts);return}e=n.return;var s=qT(n.alternate,n,Hi);if(s!==null){Rt=s;return}if(n=n.sibling,n!==null){Rt=n;return}Rt=n=e}while(n!==null);ue===0&&(ue=5)}function cy(e,n){do{var s=HT(e.alternate,e);if(s!==null){s.flags&=32767,Rt=s;return}if(s=e.return,s!==null&&(s.flags|=32768,s.subtreeFlags=0,s.deletions=null),!n&&(e=e.sibling,e!==null)){Rt=e;return}Rt=e=s}while(e!==null);ue=6,Rt=null}function hy(e,n,s,o,h,f,g,E,w){e.cancelPendingCommit=null;do Xu();while(De!==0);if((qt&6)!==0)throw Error(r(327));if(n!==null){if(n===e.current)throw Error(r(177));if(f=n.lanes|n.childLanes,f|=Ch,_h(e,s,f,g,E,w),e===$t&&(Rt=$t=null,Ct=0),Sa=n,bs=e,ji=s,Lf=f,xf=h,ty=o,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,t1(es,function(){return py(),null})):(e.callbackNode=null,e.callbackPriority=0),o=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||o){o=j.T,j.T=null,h=W.p,W.p=2,g=qt,qt|=4;try{jT(e,n,s)}finally{qt=g,W.p=h,j.T=o}}De=1,fy(),dy(),my()}}function fy(){if(De===1){De=0;var e=bs,n=Sa,s=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||s){s=j.T,j.T=null;var o=W.p;W.p=2;var h=qt;qt|=4;try{Qp(n,e);var f=Jf,g=Jm(e.containerInfo),E=f.focusedElem,w=f.selectionRange;if(g!==E&&E&&E.ownerDocument&&$m(E.ownerDocument.documentElement,E)){if(w!==null&&Ah(E)){var P=w.start,H=w.end;if(H===void 0&&(H=P),"selectionStart"in E)E.selectionStart=P,E.selectionEnd=Math.min(H,E.value.length);else{var Q=E.ownerDocument||document,z=Q&&Q.defaultView||window;if(z.getSelection){var q=z.getSelection(),st=E.textContent.length,ct=Math.min(w.start,st),Zt=w.end===void 0?ct:Math.min(w.end,st);!q.extend&&ct>Zt&&(g=Zt,Zt=ct,ct=g);var V=Zm(E,ct),D=Zm(E,Zt);if(V&&D&&(q.rangeCount!==1||q.anchorNode!==V.node||q.anchorOffset!==V.offset||q.focusNode!==D.node||q.focusOffset!==D.offset)){var x=Q.createRange();x.setStart(V.node,V.offset),q.removeAllRanges(),ct>Zt?(q.addRange(x),q.extend(D.node,D.offset)):(x.setEnd(D.node,D.offset),q.addRange(x))}}}}for(Q=[],q=E;q=q.parentNode;)q.nodeType===1&&Q.push({element:q,left:q.scrollLeft,top:q.scrollTop});for(typeof E.focus=="function"&&E.focus(),E=0;E<Q.length;E++){var G=Q[E];G.element.scrollLeft=G.left,G.element.scrollTop=G.top}}oc=!!$f,Jf=$f=null}finally{qt=h,W.p=o,j.T=s}}e.current=n,De=2}}function dy(){if(De===2){De=0;var e=bs,n=Sa,s=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||s){s=j.T,j.T=null;var o=W.p;W.p=2;var h=qt;qt|=4;try{qp(e,n.alternate,n)}finally{qt=h,W.p=o,j.T=s}}De=3}}function my(){if(De===4||De===3){De=0,zl();var e=bs,n=Sa,s=ji,o=ty;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?De=5:(De=0,Sa=bs=null,gy(e,e.pendingLanes));var h=e.pendingLanes;if(h===0&&(Ss=null),wi(s),n=n.stateNode,xe&&typeof xe.onCommitFiberRoot=="function")try{xe.onCommitFiberRoot(kn,n,void 0,(n.current.flags&128)===128)}catch{}if(o!==null){n=j.T,h=W.p,W.p=2,j.T=null;try{for(var f=e.onRecoverableError,g=0;g<o.length;g++){var E=o[g];f(E.value,{componentStack:E.stack})}}finally{j.T=n,W.p=h}}(ji&3)!==0&&Xu(),pi(e),h=e.pendingLanes,(s&261930)!==0&&(h&42)!==0?e===Pf?$o++:($o=0,Pf=e):$o=0,Jo(0)}}function gy(e,n){(e.pooledCacheLanes&=n)===0&&(n=e.pooledCache,n!=null&&(e.pooledCache=null,Mo(n)))}function Xu(){return fy(),dy(),my(),py()}function py(){if(De!==5)return!1;var e=bs,n=Lf;Lf=0;var s=wi(ji),o=j.T,h=W.p;try{W.p=32>s?32:s,j.T=null,s=xf,xf=null;var f=bs,g=ji;if(De=0,Sa=bs=null,ji=0,(qt&6)!==0)throw Error(r(331));var E=qt;if(qt|=4,$p(f.current),Yp(f,f.current,g,s),qt=E,Jo(0,!1),xe&&typeof xe.onPostCommitFiberRoot=="function")try{xe.onPostCommitFiberRoot(kn,f)}catch{}return!0}finally{W.p=h,j.T=o,gy(e,n)}}function yy(e,n,s){n=bn(s,n),n=pf(e.stateNode,n,2),e=ys(e,n,2),e!==null&&(er(e,2),pi(e))}function Qt(e,n,s){if(e.tag===3)yy(e,e,s);else for(;n!==null;){if(n.tag===3){yy(n,e,s);break}else if(n.tag===1){var o=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(Ss===null||!Ss.has(o))){e=bn(s,e),s=_p(2),o=ys(n,s,2),o!==null&&(vp(s,o,n,e),er(o,2),pi(o));break}}n=n.return}}function qf(e,n,s){var o=e.pingCache;if(o===null){o=e.pingCache=new QT;var h=new Set;o.set(n,h)}else h=o.get(n),h===void 0&&(h=new Set,o.set(n,h));h.has(s)||(Vf=!0,h.add(s),e=$T.bind(null,e,n,s),n.then(e,e))}function $T(e,n,s){var o=e.pingCache;o!==null&&o.delete(n),e.pingedLanes|=e.suspendedLanes&s,e.warmLanes&=~s,$t===e&&(Ct&s)===s&&(ue===4||ue===3&&(Ct&62914560)===Ct&&300>$e()-ju?(qt&2)===0&&ba(e,0):kf|=s,Aa===Ct&&(Aa=0)),pi(e)}function _y(e,n){n===0&&(n=Fl()),e=gr(e,n),e!==null&&(er(e,n),pi(e))}function JT(e){var n=e.memoizedState,s=0;n!==null&&(s=n.retryLane),_y(e,s)}function WT(e,n){var s=0;switch(e.tag){case 31:case 13:var o=e.stateNode,h=e.memoizedState;h!==null&&(s=h.retryLane);break;case 19:o=e.stateNode;break;case 22:o=e.stateNode._retryCache;break;default:throw Error(r(314))}o!==null&&o.delete(n),_y(e,s)}function t1(e,n){return Ie(e,n)}var Zu=null,wa=null,Hf=!1,$u=!1,jf=!1,ws=0;function pi(e){e!==wa&&e.next===null&&(wa===null?Zu=wa=e:wa=wa.next=e),$u=!0,Hf||(Hf=!0,n1())}function Jo(e,n){if(!jf&&$u){jf=!0;do for(var s=!1,o=Zu;o!==null;){if(e!==0){var h=o.pendingLanes;if(h===0)var f=0;else{var g=o.suspendedLanes,E=o.pingedLanes;f=(1<<31-ce(42|e)+1)-1,f&=h&~(g&~E),f=f&201326741?f&201326741|1:f?f|2:0}f!==0&&(s=!0,Ay(o,f))}else f=Ct,f=Jn(o,o===$t?f:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(f&3)===0||Un(o,f)||(s=!0,Ay(o,f));o=o.next}while(s);jf=!1}}function e1(){vy()}function vy(){$u=Hf=!1;var e=0;ws!==0&&f1()&&(e=ws);for(var n=$e(),s=null,o=Zu;o!==null;){var h=o.next,f=Ey(o,n);f===0?(o.next=null,s===null?Zu=h:s.next=h,h===null&&(wa=s)):(s=o,(e!==0||(f&3)!==0)&&($u=!0)),o=h}De!==0&&De!==5||Jo(e),ws!==0&&(ws=0)}function Ey(e,n){for(var s=e.suspendedLanes,o=e.pingedLanes,h=e.expirationTimes,f=e.pendingLanes&-62914561;0<f;){var g=31-ce(f),E=1<<g,w=h[g];w===-1?((E&s)===0||(E&o)!==0)&&(h[g]=yh(E,n)):w<=n&&(e.expiredLanes|=E),f&=~E}if(n=$t,s=Ct,s=Jn(e,e===n?s:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o=e.callbackNode,s===0||e===n&&(Ft===2||Ft===9)||e.cancelPendingCommit!==null)return o!==null&&o!==null&&ts(o),e.callbackNode=null,e.callbackPriority=0;if((s&3)===0||Un(e,s)){if(n=s&-s,n===e.callbackPriority)return n;switch(o!==null&&ts(o),wi(s)){case 2:case 8:s=oo;break;case 32:s=es;break;case 268435456:s=Bl;break;default:s=es}return o=Ty.bind(null,e),s=Ie(s,o),e.callbackPriority=n,e.callbackNode=s,n}return o!==null&&o!==null&&ts(o),e.callbackPriority=2,e.callbackNode=null,2}function Ty(e,n){if(De!==0&&De!==5)return e.callbackNode=null,e.callbackPriority=0,null;var s=e.callbackNode;if(Xu()&&e.callbackNode!==s)return null;var o=Ct;return o=Jn(e,e===$t?o:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o===0?null:(ny(e,o,n),Ey(e,$e()),e.callbackNode!=null&&e.callbackNode===s?Ty.bind(null,e):null)}function Ay(e,n){if(Xu())return null;ny(e,n,!0)}function n1(){m1(function(){(qt&6)!==0?Ie(ao,e1):vy()})}function Gf(){if(ws===0){var e=ha;e===0&&(e=Zn,Zn<<=1,(Zn&261888)===0&&(Zn=256)),ws=e}return ws}function Sy(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Zr(""+e)}function by(e,n){var s=n.ownerDocument.createElement("input");return s.name=n.name,s.value=n.value,e.id&&s.setAttribute("form",e.id),n.parentNode.insertBefore(s,n),e=new FormData(e),s.parentNode.removeChild(s),e}function i1(e,n,s,o,h){if(n==="submit"&&s&&s.stateNode===h){var f=Sy((h[Me]||null).action),g=o.submitter;g&&(n=(n=g[Me]||null)?Sy(n.formAction):g.getAttribute("formAction"),n!==null&&(f=n,g=null));var E=new ui("action","action",null,o,h);e.push({event:E,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(ws!==0){var w=g?by(h,g):new FormData(h);cf(s,{pending:!0,data:w,method:h.method,action:f},null,w)}}else typeof f=="function"&&(E.preventDefault(),w=g?by(h,g):new FormData(h),cf(s,{pending:!0,data:w,method:h.method,action:f},f,w))},currentTarget:h}]})}}for(var Ff=0;Ff<wh.length;Ff++){var Qf=wh[Ff],s1=Qf.toLowerCase(),r1=Qf[0].toUpperCase()+Qf.slice(1);jn(s1,"on"+r1)}jn(eg,"onAnimationEnd"),jn(ng,"onAnimationIteration"),jn(ig,"onAnimationStart"),jn("dblclick","onDoubleClick"),jn("focusin","onFocus"),jn("focusout","onBlur"),jn(TT,"onTransitionRun"),jn(AT,"onTransitionStart"),jn(ST,"onTransitionCancel"),jn(sg,"onTransitionEnd"),ri("onMouseEnter",["mouseout","mouseover"]),ri("onMouseLeave",["mouseout","mouseover"]),ri("onPointerEnter",["pointerout","pointerover"]),ri("onPointerLeave",["pointerout","pointerover"]),si("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),si("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),si("onBeforeInput",["compositionend","keypress","textInput","paste"]),si("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),si("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),si("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Wo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),a1=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Wo));function Ry(e,n){n=(n&4)!==0;for(var s=0;s<e.length;s++){var o=e[s],h=o.event;o=o.listeners;t:{var f=void 0;if(n)for(var g=o.length-1;0<=g;g--){var E=o[g],w=E.instance,P=E.currentTarget;if(E=E.listener,w!==f&&h.isPropagationStopped())break t;f=E,h.currentTarget=P;try{f(h)}catch(H){fu(H)}h.currentTarget=null,f=w}else for(g=0;g<o.length;g++){if(E=o[g],w=E.instance,P=E.currentTarget,E=E.listener,w!==f&&h.isPropagationStopped())break t;f=E,h.currentTarget=P;try{f(h)}catch(H){fu(H)}h.currentTarget=null,f=w}}}}function wt(e,n){var s=n[Fr];s===void 0&&(s=n[Fr]=new Set);var o=e+"__bubble";s.has(o)||(wy(n,e,2,!1),s.add(o))}function Kf(e,n,s){var o=0;n&&(o|=4),wy(s,e,o,n)}var Ju="_reactListening"+Math.random().toString(36).slice(2);function Yf(e){if(!e[Ju]){e[Ju]=!0,co.forEach(function(s){s!=="selectionchange"&&(a1.has(s)||Kf(s,!1,e),Kf(s,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[Ju]||(n[Ju]=!0,Kf("selectionchange",!1,n))}}function wy(e,n,s,o){switch(e_(n)){case 2:var h=k1;break;case 8:h=U1;break;default:h=ud}s=h.bind(null,n,s,e),h=void 0,!or||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(h=!0),o?h!==void 0?e.addEventListener(n,s,{capture:!0,passive:h}):e.addEventListener(n,s,!0):h!==void 0?e.addEventListener(n,s,{passive:h}):e.addEventListener(n,s,!1)}function Xf(e,n,s,o,h){var f=o;if((n&1)===0&&(n&2)===0&&o!==null)t:for(;;){if(o===null)return;var g=o.tag;if(g===3||g===4){var E=o.stateNode.containerInfo;if(E===h)break;if(g===4)for(g=o.return;g!==null;){var w=g.tag;if((w===3||w===4)&&g.stateNode.containerInfo===h)return;g=g.return}for(;E!==null;){if(g=ni(E),g===null)return;if(w=g.tag,w===5||w===6||w===26||w===27){o=f=g;continue t}E=E.parentNode}}o=o.return}os(function(){var P=f,H=En(s),Q=[];t:{var z=rg.get(e);if(z!==void 0){var q=ui,st=e;switch(e){case"keypress":if(ur(s)===0)break t;case"keydown":case"keyup":q=uu;break;case"focusin":st="focus",q=hr;break;case"focusout":st="blur",q=hr;break;case"beforeblur":case"afterblur":q=hr;break;case"click":if(s.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":q=bo;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":q=tu;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":q=m;break;case eg:case ng:case ig:q=nu;break;case sg:q=T;break;case"scroll":case"scrollend":q=So;break;case"wheel":q=B;break;case"copy":case"cut":case"paste":q=iu;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":q=Di;break;case"toggle":case"beforetoggle":q=Et}var ct=(n&4)!==0,Zt=!ct&&(e==="scroll"||e==="scrollend"),V=ct?z!==null?z+"Capture":null:z;ct=[];for(var D=P,x;D!==null;){var G=D;if(x=G.stateNode,G=G.tag,G!==5&&G!==26&&G!==27||x===null||V===null||(G=zn(D,V),G!=null&&ct.push(tl(D,G,x))),Zt)break;D=D.return}0<ct.length&&(z=new q(z,st,null,s,H),Q.push({event:z,listeners:ct}))}}if((n&7)===0){t:{if(z=e==="mouseover"||e==="pointerover",q=e==="mouseout"||e==="pointerout",z&&s!==Eo&&(st=s.relatedTarget||s.fromElement)&&(ni(st)||st[ti]))break t;if((q||z)&&(z=H.window===H?H:(z=H.ownerDocument)?z.defaultView||z.parentWindow:window,q?(st=s.relatedTarget||s.toElement,q=P,st=st?ni(st):null,st!==null&&(Zt=c(st),ct=st.tag,st!==Zt||ct!==5&&ct!==27&&ct!==6)&&(st=null)):(q=null,st=P),q!==st)){if(ct=bo,G="onMouseLeave",V="onMouseEnter",D="mouse",(e==="pointerout"||e==="pointerover")&&(ct=Di,G="onPointerLeave",V="onPointerEnter",D="pointer"),Zt=q==null?z:un(q),x=st==null?z:un(st),z=new ct(G,D+"leave",q,s,H),z.target=Zt,z.relatedTarget=x,G=null,ni(H)===P&&(ct=new ct(V,D+"enter",st,s,H),ct.target=x,ct.relatedTarget=Zt,G=ct),Zt=G,q&&st)e:{for(ct=o1,V=q,D=st,x=0,G=V;G;G=ct(G))x++;G=0;for(var ot=D;ot;ot=ct(ot))G++;for(;0<x-G;)V=ct(V),x--;for(;0<G-x;)D=ct(D),G--;for(;x--;){if(V===D||D!==null&&V===D.alternate){ct=V;break e}V=ct(V),D=ct(D)}ct=null}else ct=null;q!==null&&Cy(Q,z,q,ct,!1),st!==null&&Zt!==null&&Cy(Q,Zt,st,ct,!0)}}t:{if(z=P?un(P):window,q=z.nodeName&&z.nodeName.toLowerCase(),q==="select"||q==="input"&&z.type==="file")var xt=Gm;else if(Hm(z))if(Fm)xt=_T;else{xt=pT;var rt=gT}else q=z.nodeName,!q||q.toLowerCase()!=="input"||z.type!=="checkbox"&&z.type!=="radio"?P&&Xr(P.elementType)&&(xt=Gm):xt=yT;if(xt&&(xt=xt(e,P))){jm(Q,xt,s,H);break t}rt&&rt(e,z,P),e==="focusout"&&P&&z.type==="number"&&P.memoizedProps.value!=null&&yo(z,"number",z.value)}switch(rt=P?un(P):window,e){case"focusin":(Hm(rt)||rt.contentEditable==="true")&&(ia=rt,Sh=P,Do=null);break;case"focusout":Do=Sh=ia=null;break;case"mousedown":bh=!0;break;case"contextmenu":case"mouseup":case"dragend":bh=!1,Wm(Q,s,H);break;case"selectionchange":if(ET)break;case"keydown":case"keyup":Wm(Q,s,H)}var St;if(Bt)t:{switch(e){case"compositionstart":var It="onCompositionStart";break t;case"compositionend":It="onCompositionEnd";break t;case"compositionupdate":It="onCompositionUpdate";break t}It=void 0}else na?fr(e,s)&&(It="onCompositionEnd"):e==="keydown"&&s.keyCode===229&&(It="onCompositionStart");It&&(fi&&s.locale!=="ko"&&(na||It!=="onCompositionStart"?It==="onCompositionEnd"&&na&&(St=Ao()):(li=H,To="value"in li?li.value:li.textContent,na=!0)),rt=Wu(P,It),0<rt.length&&(It=new hi(It,e,null,s,H),Q.push({event:It,listeners:rt}),St?It.data=St:(St=ea(s),St!==null&&(It.data=St)))),(St=An?hT(e,s):fT(e,s))&&(It=Wu(P,"onBeforeInput"),0<It.length&&(rt=new hi("onBeforeInput","beforeinput",null,s,H),Q.push({event:rt,listeners:It}),rt.data=St)),i1(Q,e,P,s,H)}Ry(Q,n)})}function tl(e,n,s){return{instance:e,listener:n,currentTarget:s}}function Wu(e,n){for(var s=n+"Capture",o=[];e!==null;){var h=e,f=h.stateNode;if(h=h.tag,h!==5&&h!==26&&h!==27||f===null||(h=zn(e,s),h!=null&&o.unshift(tl(e,h,f)),h=zn(e,n),h!=null&&o.push(tl(e,h,f))),e.tag===3)return o;e=e.return}return[]}function o1(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Cy(e,n,s,o,h){for(var f=n._reactName,g=[];s!==null&&s!==o;){var E=s,w=E.alternate,P=E.stateNode;if(E=E.tag,w!==null&&w===o)break;E!==5&&E!==26&&E!==27||P===null||(w=P,h?(P=zn(s,f),P!=null&&g.unshift(tl(s,P,w))):h||(P=zn(s,f),P!=null&&g.push(tl(s,P,w)))),s=s.return}g.length!==0&&e.push({event:n,listeners:g})}var l1=/\r\n?/g,u1=/\u0000|\uFFFD/g;function Iy(e){return(typeof e=="string"?e:""+e).replace(l1,`
`).replace(u1,"")}function Dy(e,n){return n=Iy(n),Iy(e)===n}function Xt(e,n,s,o,h,f){switch(s){case"children":typeof o=="string"?n==="body"||n==="textarea"&&o===""||en(e,o):(typeof o=="number"||typeof o=="bigint")&&n!=="body"&&en(e,""+o);break;case"className":cn(e,"class",o);break;case"tabIndex":cn(e,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":cn(e,s,o);break;case"style":vo(e,o,f);break;case"data":if(n!=="object"){cn(e,"data",o);break}case"src":case"href":if(o===""&&(n!=="a"||s!=="href")){e.removeAttribute(s);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(s);break}o=Zr(""+o),e.setAttribute(s,o);break;case"action":case"formAction":if(typeof o=="function"){e.setAttribute(s,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof f=="function"&&(s==="formAction"?(n!=="input"&&Xt(e,n,"name",h.name,h,null),Xt(e,n,"formEncType",h.formEncType,h,null),Xt(e,n,"formMethod",h.formMethod,h,null),Xt(e,n,"formTarget",h.formTarget,h,null)):(Xt(e,n,"encType",h.encType,h,null),Xt(e,n,"method",h.method,h,null),Xt(e,n,"target",h.target,h,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(s);break}o=Zr(""+o),e.setAttribute(s,o);break;case"onClick":o!=null&&(e.onclick=Pn);break;case"onScroll":o!=null&&wt("scroll",e);break;case"onScrollEnd":o!=null&&wt("scrollend",e);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(r(61));if(s=o.__html,s!=null){if(h.children!=null)throw Error(r(60));e.innerHTML=s}}break;case"multiple":e.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":e.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){e.removeAttribute("xlink:href");break}s=Zr(""+o),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",s);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(s,""+o):e.removeAttribute(s);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(s,""):e.removeAttribute(s);break;case"capture":case"download":o===!0?e.setAttribute(s,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(s,o):e.removeAttribute(s);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?e.setAttribute(s,o):e.removeAttribute(s);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?e.removeAttribute(s):e.setAttribute(s,o);break;case"popover":wt("beforetoggle",e),wt("toggle",e),Kr(e,"popover",o);break;case"xlinkActuate":ve(e,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":ve(e,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":ve(e,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":ve(e,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":ve(e,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":ve(e,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":ve(e,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":ve(e,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":ve(e,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":Kr(e,"is",o);break;case"innerText":case"textContent":break;default:(!(2<s.length)||s[0]!=="o"&&s[0]!=="O"||s[1]!=="n"&&s[1]!=="N")&&(s=Wl.get(s)||s,Kr(e,s,o))}}function Zf(e,n,s,o,h,f){switch(s){case"style":vo(e,o,f);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(r(61));if(s=o.__html,s!=null){if(h.children!=null)throw Error(r(60));e.innerHTML=s}}break;case"children":typeof o=="string"?en(e,o):(typeof o=="number"||typeof o=="bigint")&&en(e,""+o);break;case"onScroll":o!=null&&wt("scroll",e);break;case"onScrollEnd":o!=null&&wt("scrollend",e);break;case"onClick":o!=null&&(e.onclick=Pn);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!ho.hasOwnProperty(s))t:{if(s[0]==="o"&&s[1]==="n"&&(h=s.endsWith("Capture"),n=s.slice(2,h?s.length-7:void 0),f=e[Me]||null,f=f!=null?f[s]:null,typeof f=="function"&&e.removeEventListener(n,f,h),typeof o=="function")){typeof f!="function"&&f!==null&&(s in e?e[s]=null:e.hasAttribute(s)&&e.removeAttribute(s)),e.addEventListener(n,o,h);break t}s in e?e[s]=o:o===!0?e.setAttribute(s,""):Kr(e,s,o)}}}function He(e,n,s){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":wt("error",e),wt("load",e);var o=!1,h=!1,f;for(f in s)if(s.hasOwnProperty(f)){var g=s[f];if(g!=null)switch(f){case"src":o=!0;break;case"srcSet":h=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(r(137,n));default:Xt(e,n,f,g,s,null)}}h&&Xt(e,n,"srcSet",s.srcSet,s,null),o&&Xt(e,n,"src",s.src,s,null);return;case"input":wt("invalid",e);var E=f=g=h=null,w=null,P=null;for(o in s)if(s.hasOwnProperty(o)){var H=s[o];if(H!=null)switch(o){case"name":h=H;break;case"type":g=H;break;case"checked":w=H;break;case"defaultChecked":P=H;break;case"value":f=H;break;case"defaultValue":E=H;break;case"children":case"dangerouslySetInnerHTML":if(H!=null)throw Error(r(137,n));break;default:Xt(e,n,o,H,s,null)}}Zl(e,f,E,w,P,g,h,!1);return;case"select":wt("invalid",e),o=g=f=null;for(h in s)if(s.hasOwnProperty(h)&&(E=s[h],E!=null))switch(h){case"value":f=E;break;case"defaultValue":g=E;break;case"multiple":o=E;default:Xt(e,n,h,E,s,null)}n=f,s=g,e.multiple=!!o,n!=null?is(e,!!o,n,!1):s!=null&&is(e,!!o,s,!0);return;case"textarea":wt("invalid",e),f=h=o=null;for(g in s)if(s.hasOwnProperty(g)&&(E=s[g],E!=null))switch(g){case"value":o=E;break;case"defaultValue":h=E;break;case"children":f=E;break;case"dangerouslySetInnerHTML":if(E!=null)throw Error(r(91));break;default:Xt(e,n,g,E,s,null)}ss(e,o,h,f);return;case"option":for(w in s)if(s.hasOwnProperty(w)&&(o=s[w],o!=null))switch(w){case"selected":e.selected=o&&typeof o!="function"&&typeof o!="symbol";break;default:Xt(e,n,w,o,s,null)}return;case"dialog":wt("beforetoggle",e),wt("toggle",e),wt("cancel",e),wt("close",e);break;case"iframe":case"object":wt("load",e);break;case"video":case"audio":for(o=0;o<Wo.length;o++)wt(Wo[o],e);break;case"image":wt("error",e),wt("load",e);break;case"details":wt("toggle",e);break;case"embed":case"source":case"link":wt("error",e),wt("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(P in s)if(s.hasOwnProperty(P)&&(o=s[P],o!=null))switch(P){case"children":case"dangerouslySetInnerHTML":throw Error(r(137,n));default:Xt(e,n,P,o,s,null)}return;default:if(Xr(n)){for(H in s)s.hasOwnProperty(H)&&(o=s[H],o!==void 0&&Zf(e,n,H,o,s,void 0));return}}for(E in s)s.hasOwnProperty(E)&&(o=s[E],o!=null&&Xt(e,n,E,o,s,null))}function c1(e,n,s,o){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var h=null,f=null,g=null,E=null,w=null,P=null,H=null;for(q in s){var Q=s[q];if(s.hasOwnProperty(q)&&Q!=null)switch(q){case"checked":break;case"value":break;case"defaultValue":w=Q;default:o.hasOwnProperty(q)||Xt(e,n,q,null,o,Q)}}for(var z in o){var q=o[z];if(Q=s[z],o.hasOwnProperty(z)&&(q!=null||Q!=null))switch(z){case"type":f=q;break;case"name":h=q;break;case"checked":P=q;break;case"defaultChecked":H=q;break;case"value":g=q;break;case"defaultValue":E=q;break;case"children":case"dangerouslySetInnerHTML":if(q!=null)throw Error(r(137,n));break;default:q!==Q&&Xt(e,n,z,q,o,Q)}}Yr(e,g,E,w,P,H,f,h);return;case"select":q=g=E=z=null;for(f in s)if(w=s[f],s.hasOwnProperty(f)&&w!=null)switch(f){case"value":break;case"multiple":q=w;default:o.hasOwnProperty(f)||Xt(e,n,f,null,o,w)}for(h in o)if(f=o[h],w=s[h],o.hasOwnProperty(h)&&(f!=null||w!=null))switch(h){case"value":z=f;break;case"defaultValue":E=f;break;case"multiple":g=f;default:f!==w&&Xt(e,n,h,f,o,w)}n=E,s=g,o=q,z!=null?is(e,!!s,z,!1):!!o!=!!s&&(n!=null?is(e,!!s,n,!0):is(e,!!s,s?[]:"",!1));return;case"textarea":q=z=null;for(E in s)if(h=s[E],s.hasOwnProperty(E)&&h!=null&&!o.hasOwnProperty(E))switch(E){case"value":break;case"children":break;default:Xt(e,n,E,null,o,h)}for(g in o)if(h=o[g],f=s[g],o.hasOwnProperty(g)&&(h!=null||f!=null))switch(g){case"value":z=h;break;case"defaultValue":q=h;break;case"children":break;case"dangerouslySetInnerHTML":if(h!=null)throw Error(r(91));break;default:h!==f&&Xt(e,n,g,h,o,f)}$l(e,z,q);return;case"option":for(var st in s)if(z=s[st],s.hasOwnProperty(st)&&z!=null&&!o.hasOwnProperty(st))switch(st){case"selected":e.selected=!1;break;default:Xt(e,n,st,null,o,z)}for(w in o)if(z=o[w],q=s[w],o.hasOwnProperty(w)&&z!==q&&(z!=null||q!=null))switch(w){case"selected":e.selected=z&&typeof z!="function"&&typeof z!="symbol";break;default:Xt(e,n,w,z,o,q)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var ct in s)z=s[ct],s.hasOwnProperty(ct)&&z!=null&&!o.hasOwnProperty(ct)&&Xt(e,n,ct,null,o,z);for(P in o)if(z=o[P],q=s[P],o.hasOwnProperty(P)&&z!==q&&(z!=null||q!=null))switch(P){case"children":case"dangerouslySetInnerHTML":if(z!=null)throw Error(r(137,n));break;default:Xt(e,n,P,z,o,q)}return;default:if(Xr(n)){for(var Zt in s)z=s[Zt],s.hasOwnProperty(Zt)&&z!==void 0&&!o.hasOwnProperty(Zt)&&Zf(e,n,Zt,void 0,o,z);for(H in o)z=o[H],q=s[H],!o.hasOwnProperty(H)||z===q||z===void 0&&q===void 0||Zf(e,n,H,z,o,q);return}}for(var V in s)z=s[V],s.hasOwnProperty(V)&&z!=null&&!o.hasOwnProperty(V)&&Xt(e,n,V,null,o,z);for(Q in o)z=o[Q],q=s[Q],!o.hasOwnProperty(Q)||z===q||z==null&&q==null||Xt(e,n,Q,z,o,q)}function Ny(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function h1(){if(typeof performance.getEntriesByType=="function"){for(var e=0,n=0,s=performance.getEntriesByType("resource"),o=0;o<s.length;o++){var h=s[o],f=h.transferSize,g=h.initiatorType,E=h.duration;if(f&&E&&Ny(g)){for(g=0,E=h.responseEnd,o+=1;o<s.length;o++){var w=s[o],P=w.startTime;if(P>E)break;var H=w.transferSize,Q=w.initiatorType;H&&Ny(Q)&&(w=w.responseEnd,g+=H*(w<E?1:(E-P)/(w-P)))}if(--o,n+=8*(f+g)/(h.duration/1e3),e++,10<e)break}}if(0<e)return n/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var $f=null,Jf=null;function tc(e){return e.nodeType===9?e:e.ownerDocument}function Oy(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function My(e,n){if(e===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&n==="foreignObject"?0:e}function Wf(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var td=null;function f1(){var e=window.event;return e&&e.type==="popstate"?e===td?!1:(td=e,!0):(td=null,!1)}var Vy=typeof setTimeout=="function"?setTimeout:void 0,d1=typeof clearTimeout=="function"?clearTimeout:void 0,ky=typeof Promise=="function"?Promise:void 0,m1=typeof queueMicrotask=="function"?queueMicrotask:typeof ky<"u"?function(e){return ky.resolve(null).then(e).catch(g1)}:Vy;function g1(e){setTimeout(function(){throw e})}function Cs(e){return e==="head"}function Uy(e,n){var s=n,o=0;do{var h=s.nextSibling;if(e.removeChild(s),h&&h.nodeType===8)if(s=h.data,s==="/$"||s==="/&"){if(o===0){e.removeChild(h),Na(n);return}o--}else if(s==="$"||s==="$?"||s==="$~"||s==="$!"||s==="&")o++;else if(s==="html")el(e.ownerDocument.documentElement);else if(s==="head"){s=e.ownerDocument.head,el(s);for(var f=s.firstChild;f;){var g=f.nextSibling,E=f.nodeName;f[ei]||E==="SCRIPT"||E==="STYLE"||E==="LINK"&&f.rel.toLowerCase()==="stylesheet"||s.removeChild(f),f=g}}else s==="body"&&el(e.ownerDocument.body);s=h}while(s);Na(n)}function Ly(e,n){var s=e;e=0;do{var o=s.nextSibling;if(s.nodeType===1?n?(s._stashedDisplay=s.style.display,s.style.display="none"):(s.style.display=s._stashedDisplay||"",s.getAttribute("style")===""&&s.removeAttribute("style")):s.nodeType===3&&(n?(s._stashedText=s.nodeValue,s.nodeValue=""):s.nodeValue=s._stashedText||""),o&&o.nodeType===8)if(s=o.data,s==="/$"){if(e===0)break;e--}else s!=="$"&&s!=="$?"&&s!=="$~"&&s!=="$!"||e++;s=o}while(s)}function ed(e){var n=e.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var s=n;switch(n=n.nextSibling,s.nodeName){case"HTML":case"HEAD":case"BODY":ed(s),Qr(s);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(s.rel.toLowerCase()==="stylesheet")continue}e.removeChild(s)}}function p1(e,n,s,o){for(;e.nodeType===1;){var h=s;if(e.nodeName.toLowerCase()!==n.toLowerCase()){if(!o&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(o){if(!e[ei])switch(n){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(f=e.getAttribute("rel"),f==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(f!==h.rel||e.getAttribute("href")!==(h.href==null||h.href===""?null:h.href)||e.getAttribute("crossorigin")!==(h.crossOrigin==null?null:h.crossOrigin)||e.getAttribute("title")!==(h.title==null?null:h.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(f=e.getAttribute("src"),(f!==(h.src==null?null:h.src)||e.getAttribute("type")!==(h.type==null?null:h.type)||e.getAttribute("crossorigin")!==(h.crossOrigin==null?null:h.crossOrigin))&&f&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(n==="input"&&e.type==="hidden"){var f=h.name==null?null:""+h.name;if(h.type==="hidden"&&e.getAttribute("name")===f)return e}else return e;if(e=Dn(e.nextSibling),e===null)break}return null}function y1(e,n,s){if(n==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!s||(e=Dn(e.nextSibling),e===null))return null;return e}function xy(e,n){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=Dn(e.nextSibling),e===null))return null;return e}function nd(e){return e.data==="$?"||e.data==="$~"}function id(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function _1(e,n){var s=e.ownerDocument;if(e.data==="$~")e._reactRetry=n;else if(e.data!=="$?"||s.readyState!=="loading")n();else{var o=function(){n(),s.removeEventListener("DOMContentLoaded",o)};s.addEventListener("DOMContentLoaded",o),e._reactRetry=o}}function Dn(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return e}var sd=null;function Py(e){e=e.nextSibling;for(var n=0;e;){if(e.nodeType===8){var s=e.data;if(s==="/$"||s==="/&"){if(n===0)return Dn(e.nextSibling);n--}else s!=="$"&&s!=="$!"&&s!=="$?"&&s!=="$~"&&s!=="&"||n++}e=e.nextSibling}return null}function zy(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var s=e.data;if(s==="$"||s==="$!"||s==="$?"||s==="$~"||s==="&"){if(n===0)return e;n--}else s!=="/$"&&s!=="/&"||n++}e=e.previousSibling}return null}function By(e,n,s){switch(n=tc(s),e){case"html":if(e=n.documentElement,!e)throw Error(r(452));return e;case"head":if(e=n.head,!e)throw Error(r(453));return e;case"body":if(e=n.body,!e)throw Error(r(454));return e;default:throw Error(r(451))}}function el(e){for(var n=e.attributes;n.length;)e.removeAttributeNode(n[0]);Qr(e)}var Nn=new Map,qy=new Set;function ec(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var Gi=W.d;W.d={f:v1,r:E1,D:T1,C:A1,L:S1,m:b1,X:w1,S:R1,M:C1};function v1(){var e=Gi.f(),n=Qu();return e||n}function E1(e){var n=vn(e);n!==null&&n.tag===5&&n.type==="form"?sp(n):Gi.r(e)}var Ca=typeof document>"u"?null:document;function Hy(e,n,s){var o=Ca;if(o&&typeof n=="string"&&n){var h=tn(n);h='link[rel="'+e+'"][href="'+h+'"]',typeof s=="string"&&(h+='[crossorigin="'+s+'"]'),qy.has(h)||(qy.add(h),e={rel:e,crossOrigin:s,href:n},o.querySelector(h)===null&&(n=o.createElement("link"),He(n,"link",e),_e(n),o.head.appendChild(n)))}}function T1(e){Gi.D(e),Hy("dns-prefetch",e,null)}function A1(e,n){Gi.C(e,n),Hy("preconnect",e,n)}function S1(e,n,s){Gi.L(e,n,s);var o=Ca;if(o&&e&&n){var h='link[rel="preload"][as="'+tn(n)+'"]';n==="image"&&s&&s.imageSrcSet?(h+='[imagesrcset="'+tn(s.imageSrcSet)+'"]',typeof s.imageSizes=="string"&&(h+='[imagesizes="'+tn(s.imageSizes)+'"]')):h+='[href="'+tn(e)+'"]';var f=h;switch(n){case"style":f=Ia(e);break;case"script":f=Da(e)}Nn.has(f)||(e=S({rel:"preload",href:n==="image"&&s&&s.imageSrcSet?void 0:e,as:n},s),Nn.set(f,e),o.querySelector(h)!==null||n==="style"&&o.querySelector(nl(f))||n==="script"&&o.querySelector(il(f))||(n=o.createElement("link"),He(n,"link",e),_e(n),o.head.appendChild(n)))}}function b1(e,n){Gi.m(e,n);var s=Ca;if(s&&e){var o=n&&typeof n.as=="string"?n.as:"script",h='link[rel="modulepreload"][as="'+tn(o)+'"][href="'+tn(e)+'"]',f=h;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":f=Da(e)}if(!Nn.has(f)&&(e=S({rel:"modulepreload",href:e},n),Nn.set(f,e),s.querySelector(h)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(s.querySelector(il(f)))return}o=s.createElement("link"),He(o,"link",e),_e(o),s.head.appendChild(o)}}}function R1(e,n,s){Gi.S(e,n,s);var o=Ca;if(o&&e){var h=ii(o).hoistableStyles,f=Ia(e);n=n||"default";var g=h.get(f);if(!g){var E={loading:0,preload:null};if(g=o.querySelector(nl(f)))E.loading=5;else{e=S({rel:"stylesheet",href:e,"data-precedence":n},s),(s=Nn.get(f))&&rd(e,s);var w=g=o.createElement("link");_e(w),He(w,"link",e),w._p=new Promise(function(P,H){w.onload=P,w.onerror=H}),w.addEventListener("load",function(){E.loading|=1}),w.addEventListener("error",function(){E.loading|=2}),E.loading|=4,nc(g,n,o)}g={type:"stylesheet",instance:g,count:1,state:E},h.set(f,g)}}}function w1(e,n){Gi.X(e,n);var s=Ca;if(s&&e){var o=ii(s).hoistableScripts,h=Da(e),f=o.get(h);f||(f=s.querySelector(il(h)),f||(e=S({src:e,async:!0},n),(n=Nn.get(h))&&ad(e,n),f=s.createElement("script"),_e(f),He(f,"link",e),s.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},o.set(h,f))}}function C1(e,n){Gi.M(e,n);var s=Ca;if(s&&e){var o=ii(s).hoistableScripts,h=Da(e),f=o.get(h);f||(f=s.querySelector(il(h)),f||(e=S({src:e,async:!0,type:"module"},n),(n=Nn.get(h))&&ad(e,n),f=s.createElement("script"),_e(f),He(f,"link",e),s.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},o.set(h,f))}}function jy(e,n,s,o){var h=(h=At.current)?ec(h):null;if(!h)throw Error(r(446));switch(e){case"meta":case"title":return null;case"style":return typeof s.precedence=="string"&&typeof s.href=="string"?(n=Ia(s.href),s=ii(h).hoistableStyles,o=s.get(n),o||(o={type:"style",instance:null,count:0,state:null},s.set(n,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(s.rel==="stylesheet"&&typeof s.href=="string"&&typeof s.precedence=="string"){e=Ia(s.href);var f=ii(h).hoistableStyles,g=f.get(e);if(g||(h=h.ownerDocument||h,g={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},f.set(e,g),(f=h.querySelector(nl(e)))&&!f._p&&(g.instance=f,g.state.loading=5),Nn.has(e)||(s={rel:"preload",as:"style",href:s.href,crossOrigin:s.crossOrigin,integrity:s.integrity,media:s.media,hrefLang:s.hrefLang,referrerPolicy:s.referrerPolicy},Nn.set(e,s),f||I1(h,e,s,g.state))),n&&o===null)throw Error(r(528,""));return g}if(n&&o!==null)throw Error(r(529,""));return null;case"script":return n=s.async,s=s.src,typeof s=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=Da(s),s=ii(h).hoistableScripts,o=s.get(n),o||(o={type:"script",instance:null,count:0,state:null},s.set(n,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(r(444,e))}}function Ia(e){return'href="'+tn(e)+'"'}function nl(e){return'link[rel="stylesheet"]['+e+"]"}function Gy(e){return S({},e,{"data-precedence":e.precedence,precedence:null})}function I1(e,n,s,o){e.querySelector('link[rel="preload"][as="style"]['+n+"]")?o.loading=1:(n=e.createElement("link"),o.preload=n,n.addEventListener("load",function(){return o.loading|=1}),n.addEventListener("error",function(){return o.loading|=2}),He(n,"link",s),_e(n),e.head.appendChild(n))}function Da(e){return'[src="'+tn(e)+'"]'}function il(e){return"script[async]"+e}function Fy(e,n,s){if(n.count++,n.instance===null)switch(n.type){case"style":var o=e.querySelector('style[data-href~="'+tn(s.href)+'"]');if(o)return n.instance=o,_e(o),o;var h=S({},s,{"data-href":s.href,"data-precedence":s.precedence,href:null,precedence:null});return o=(e.ownerDocument||e).createElement("style"),_e(o),He(o,"style",h),nc(o,s.precedence,e),n.instance=o;case"stylesheet":h=Ia(s.href);var f=e.querySelector(nl(h));if(f)return n.state.loading|=4,n.instance=f,_e(f),f;o=Gy(s),(h=Nn.get(h))&&rd(o,h),f=(e.ownerDocument||e).createElement("link"),_e(f);var g=f;return g._p=new Promise(function(E,w){g.onload=E,g.onerror=w}),He(f,"link",o),n.state.loading|=4,nc(f,s.precedence,e),n.instance=f;case"script":return f=Da(s.src),(h=e.querySelector(il(f)))?(n.instance=h,_e(h),h):(o=s,(h=Nn.get(f))&&(o=S({},s),ad(o,h)),e=e.ownerDocument||e,h=e.createElement("script"),_e(h),He(h,"link",o),e.head.appendChild(h),n.instance=h);case"void":return null;default:throw Error(r(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(o=n.instance,n.state.loading|=4,nc(o,s.precedence,e));return n.instance}function nc(e,n,s){for(var o=s.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),h=o.length?o[o.length-1]:null,f=h,g=0;g<o.length;g++){var E=o[g];if(E.dataset.precedence===n)f=E;else if(f!==h)break}f?f.parentNode.insertBefore(e,f.nextSibling):(n=s.nodeType===9?s.head:s,n.insertBefore(e,n.firstChild))}function rd(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.title==null&&(e.title=n.title)}function ad(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.integrity==null&&(e.integrity=n.integrity)}var ic=null;function Qy(e,n,s){if(ic===null){var o=new Map,h=ic=new Map;h.set(s,o)}else h=ic,o=h.get(s),o||(o=new Map,h.set(s,o));if(o.has(e))return o;for(o.set(e,null),s=s.getElementsByTagName(e),h=0;h<s.length;h++){var f=s[h];if(!(f[ei]||f[ye]||e==="link"&&f.getAttribute("rel")==="stylesheet")&&f.namespaceURI!=="http://www.w3.org/2000/svg"){var g=f.getAttribute(n)||"";g=e+g;var E=o.get(g);E?E.push(f):o.set(g,[f])}}return o}function Ky(e,n,s){e=e.ownerDocument||e,e.head.insertBefore(s,n==="title"?e.querySelector("head > title"):null)}function D1(e,n,s){if(s===1||n.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;switch(n.rel){case"stylesheet":return e=n.disabled,typeof n.precedence=="string"&&e==null;default:return!0}case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function Yy(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function N1(e,n,s,o){if(s.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(s.state.loading&4)===0){if(s.instance===null){var h=Ia(o.href),f=n.querySelector(nl(h));if(f){n=f._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(e.count++,e=sc.bind(e),n.then(e,e)),s.state.loading|=4,s.instance=f,_e(f);return}f=n.ownerDocument||n,o=Gy(o),(h=Nn.get(h))&&rd(o,h),f=f.createElement("link"),_e(f);var g=f;g._p=new Promise(function(E,w){g.onload=E,g.onerror=w}),He(f,"link",o),s.instance=f}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(s,n),(n=s.state.preload)&&(s.state.loading&3)===0&&(e.count++,s=sc.bind(e),n.addEventListener("load",s),n.addEventListener("error",s))}}var od=0;function O1(e,n){return e.stylesheets&&e.count===0&&ac(e,e.stylesheets),0<e.count||0<e.imgCount?function(s){var o=setTimeout(function(){if(e.stylesheets&&ac(e,e.stylesheets),e.unsuspend){var f=e.unsuspend;e.unsuspend=null,f()}},6e4+n);0<e.imgBytes&&od===0&&(od=62500*h1());var h=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&ac(e,e.stylesheets),e.unsuspend)){var f=e.unsuspend;e.unsuspend=null,f()}},(e.imgBytes>od?50:800)+n);return e.unsuspend=s,function(){e.unsuspend=null,clearTimeout(o),clearTimeout(h)}}:null}function sc(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)ac(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var rc=null;function ac(e,n){e.stylesheets=null,e.unsuspend!==null&&(e.count++,rc=new Map,n.forEach(M1,e),rc=null,sc.call(e))}function M1(e,n){if(!(n.state.loading&4)){var s=rc.get(e);if(s)var o=s.get(null);else{s=new Map,rc.set(e,s);for(var h=e.querySelectorAll("link[data-precedence],style[data-precedence]"),f=0;f<h.length;f++){var g=h[f];(g.nodeName==="LINK"||g.getAttribute("media")!=="not all")&&(s.set(g.dataset.precedence,g),o=g)}o&&s.set(null,o)}h=n.instance,g=h.getAttribute("data-precedence"),f=s.get(g)||o,f===o&&s.set(null,h),s.set(g,h),this.count++,o=sc.bind(this),h.addEventListener("load",o),h.addEventListener("error",o),f?f.parentNode.insertBefore(h,f.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(h,e.firstChild)),n.state.loading|=4}}var sl={$$typeof:mt,Provider:null,Consumer:null,_currentValue:lt,_currentValue2:lt,_threadCount:0};function V1(e,n,s,o,h,f,g,E,w){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Wn(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Wn(0),this.hiddenUpdates=Wn(null),this.identifierPrefix=o,this.onUncaughtError=h,this.onCaughtError=f,this.onRecoverableError=g,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=w,this.incompleteTransitions=new Map}function Xy(e,n,s,o,h,f,g,E,w,P,H,Q){return e=new V1(e,n,s,g,w,P,H,Q,E),n=1,f===!0&&(n|=24),f=fn(3,null,null,n),e.current=f,f.stateNode=e,n=zh(),n.refCount++,e.pooledCache=n,n.refCount++,f.memoizedState={element:o,isDehydrated:s,cache:n},jh(f),e}function Zy(e){return e?(e=aa,e):aa}function $y(e,n,s,o,h,f){h=Zy(h),o.context===null?o.context=h:o.pendingContext=h,o=ps(n),o.payload={element:s},f=f===void 0?null:f,f!==null&&(o.callback=f),s=ys(e,o,n),s!==null&&(on(s,e,n),Lo(s,e,n))}function Jy(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var s=e.retryLane;e.retryLane=s!==0&&s<n?s:n}}function ld(e,n){Jy(e,n),(e=e.alternate)&&Jy(e,n)}function Wy(e){if(e.tag===13||e.tag===31){var n=gr(e,67108864);n!==null&&on(n,e,67108864),ld(e,67108864)}}function t_(e){if(e.tag===13||e.tag===31){var n=yn();n=ir(n);var s=gr(e,n);s!==null&&on(s,e,n),ld(e,n)}}var oc=!0;function k1(e,n,s,o){var h=j.T;j.T=null;var f=W.p;try{W.p=2,ud(e,n,s,o)}finally{W.p=f,j.T=h}}function U1(e,n,s,o){var h=j.T;j.T=null;var f=W.p;try{W.p=8,ud(e,n,s,o)}finally{W.p=f,j.T=h}}function ud(e,n,s,o){if(oc){var h=cd(o);if(h===null)Xf(e,n,o,lc,s),n_(e,o);else if(x1(h,e,n,s,o))o.stopPropagation();else if(n_(e,o),n&4&&-1<L1.indexOf(e)){for(;h!==null;){var f=vn(h);if(f!==null)switch(f.tag){case 3:if(f=f.stateNode,f.current.memoizedState.isDehydrated){var g=$n(f.pendingLanes);if(g!==0){var E=f;for(E.pendingLanes|=2,E.entangledLanes|=2;g;){var w=1<<31-ce(g);E.entanglements[1]|=w,g&=~w}pi(f),(qt&6)===0&&(Gu=$e()+500,Jo(0))}}break;case 31:case 13:E=gr(f,2),E!==null&&on(E,f,2),Qu(),ld(f,2)}if(f=cd(o),f===null&&Xf(e,n,o,lc,s),f===h)break;h=f}h!==null&&o.stopPropagation()}else Xf(e,n,o,null,s)}}function cd(e){return e=En(e),hd(e)}var lc=null;function hd(e){if(lc=null,e=ni(e),e!==null){var n=c(e);if(n===null)e=null;else{var s=n.tag;if(s===13){if(e=d(n),e!==null)return e;e=null}else if(s===31){if(e=p(n),e!==null)return e;e=null}else if(s===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null)}}return lc=e,null}function e_(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Ws()){case ao:return 2;case oo:return 8;case es:case ph:return 32;case Bl:return 268435456;default:return 32}default:return 32}}var fd=!1,Is=null,Ds=null,Ns=null,rl=new Map,al=new Map,Os=[],L1="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function n_(e,n){switch(e){case"focusin":case"focusout":Is=null;break;case"dragenter":case"dragleave":Ds=null;break;case"mouseover":case"mouseout":Ns=null;break;case"pointerover":case"pointerout":rl.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":al.delete(n.pointerId)}}function ol(e,n,s,o,h,f){return e===null||e.nativeEvent!==f?(e={blockedOn:n,domEventName:s,eventSystemFlags:o,nativeEvent:f,targetContainers:[h]},n!==null&&(n=vn(n),n!==null&&Wy(n)),e):(e.eventSystemFlags|=o,n=e.targetContainers,h!==null&&n.indexOf(h)===-1&&n.push(h),e)}function x1(e,n,s,o,h){switch(n){case"focusin":return Is=ol(Is,e,n,s,o,h),!0;case"dragenter":return Ds=ol(Ds,e,n,s,o,h),!0;case"mouseover":return Ns=ol(Ns,e,n,s,o,h),!0;case"pointerover":var f=h.pointerId;return rl.set(f,ol(rl.get(f)||null,e,n,s,o,h)),!0;case"gotpointercapture":return f=h.pointerId,al.set(f,ol(al.get(f)||null,e,n,s,o,h)),!0}return!1}function i_(e){var n=ni(e.target);if(n!==null){var s=c(n);if(s!==null){if(n=s.tag,n===13){if(n=d(s),n!==null){e.blockedOn=n,Ln(e.priority,function(){t_(s)});return}}else if(n===31){if(n=p(s),n!==null){e.blockedOn=n,Ln(e.priority,function(){t_(s)});return}}else if(n===3&&s.stateNode.current.memoizedState.isDehydrated){e.blockedOn=s.tag===3?s.stateNode.containerInfo:null;return}}}e.blockedOn=null}function uc(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var s=cd(e.nativeEvent);if(s===null){s=e.nativeEvent;var o=new s.constructor(s.type,s);Eo=o,s.target.dispatchEvent(o),Eo=null}else return n=vn(s),n!==null&&Wy(n),e.blockedOn=s,!1;n.shift()}return!0}function s_(e,n,s){uc(e)&&s.delete(n)}function P1(){fd=!1,Is!==null&&uc(Is)&&(Is=null),Ds!==null&&uc(Ds)&&(Ds=null),Ns!==null&&uc(Ns)&&(Ns=null),rl.forEach(s_),al.forEach(s_)}function cc(e,n){e.blockedOn===n&&(e.blockedOn=null,fd||(fd=!0,a.unstable_scheduleCallback(a.unstable_NormalPriority,P1)))}var hc=null;function r_(e){hc!==e&&(hc=e,a.unstable_scheduleCallback(a.unstable_NormalPriority,function(){hc===e&&(hc=null);for(var n=0;n<e.length;n+=3){var s=e[n],o=e[n+1],h=e[n+2];if(typeof o!="function"){if(hd(o||s)===null)continue;break}var f=vn(s);f!==null&&(e.splice(n,3),n-=3,cf(f,{pending:!0,data:h,method:s.method,action:o},o,h))}}))}function Na(e){function n(w){return cc(w,e)}Is!==null&&cc(Is,e),Ds!==null&&cc(Ds,e),Ns!==null&&cc(Ns,e),rl.forEach(n),al.forEach(n);for(var s=0;s<Os.length;s++){var o=Os[s];o.blockedOn===e&&(o.blockedOn=null)}for(;0<Os.length&&(s=Os[0],s.blockedOn===null);)i_(s),s.blockedOn===null&&Os.shift();if(s=(e.ownerDocument||e).$$reactFormReplay,s!=null)for(o=0;o<s.length;o+=3){var h=s[o],f=s[o+1],g=h[Me]||null;if(typeof f=="function")g||r_(s);else if(g){var E=null;if(f&&f.hasAttribute("formAction")){if(h=f,g=f[Me]||null)E=g.formAction;else if(hd(h)!==null)continue}else E=g.action;typeof E=="function"?s[o+1]=E:(s.splice(o,3),o-=3),r_(s)}}}function a_(){function e(f){f.canIntercept&&f.info==="react-transition"&&f.intercept({handler:function(){return new Promise(function(g){return h=g})},focusReset:"manual",scroll:"manual"})}function n(){h!==null&&(h(),h=null),o||setTimeout(s,20)}function s(){if(!o&&!navigation.transition){var f=navigation.currentEntry;f&&f.url!=null&&navigation.navigate(f.url,{state:f.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,h=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(s,100),function(){o=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),h!==null&&(h(),h=null)}}}function dd(e){this._internalRoot=e}fc.prototype.render=dd.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(r(409));var s=n.current,o=yn();$y(s,o,e,n,null,null)},fc.prototype.unmount=dd.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;$y(e.current,2,null,e,null,null),Qu(),n[ti]=null}};function fc(e){this._internalRoot=e}fc.prototype.unstable_scheduleHydration=function(e){if(e){var n=Ql();e={blockedOn:null,target:e,priority:n};for(var s=0;s<Os.length&&n!==0&&n<Os[s].priority;s++);Os.splice(s,0,e),s===0&&i_(e)}};var o_=t.version;if(o_!=="19.2.3")throw Error(r(527,o_,"19.2.3"));W.findDOMNode=function(e){var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(r(188)):(e=Object.keys(e).join(","),Error(r(268,e)));return e=v(n),e=e!==null?A(e):null,e=e===null?null:e.stateNode,e};var z1={bundleType:0,version:"19.2.3",rendererPackageName:"react-dom",currentDispatcherRef:j,reconcilerVersion:"19.2.3"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var dc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!dc.isDisabled&&dc.supportsFiber)try{kn=dc.inject(z1),xe=dc}catch{}}return ul.createRoot=function(e,n){if(!l(e))throw Error(r(299));var s=!1,o="",h=mp,f=gp,g=pp;return n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onUncaughtError!==void 0&&(h=n.onUncaughtError),n.onCaughtError!==void 0&&(f=n.onCaughtError),n.onRecoverableError!==void 0&&(g=n.onRecoverableError)),n=Xy(e,1,!1,null,null,s,o,null,h,f,g,a_),e[ti]=n.current,Yf(e),new dd(n)},ul.hydrateRoot=function(e,n,s){if(!l(e))throw Error(r(299));var o=!1,h="",f=mp,g=gp,E=pp,w=null;return s!=null&&(s.unstable_strictMode===!0&&(o=!0),s.identifierPrefix!==void 0&&(h=s.identifierPrefix),s.onUncaughtError!==void 0&&(f=s.onUncaughtError),s.onCaughtError!==void 0&&(g=s.onCaughtError),s.onRecoverableError!==void 0&&(E=s.onRecoverableError),s.formState!==void 0&&(w=s.formState)),n=Xy(e,1,!0,n,s??null,o,h,w,f,g,E,a_),n.context=Zy(null),s=n.current,o=yn(),o=ir(o),h=ps(o),h.callback=null,ys(s,h,o),s=o,n.current.lanes=s,er(n,s),pi(n),e[ti]=n.current,Yf(e),new fc(n)},ul.version="19.2.3",ul}var y_;function X1(){if(y_)return pd.exports;y_=1;function a(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a)}catch(t){console.error(t)}}return a(),pd.exports=Y1(),pd.exports}var Z1=X1();const HI=Gv(Z1);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $1=a=>a.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),J1=a=>a.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,i,r)=>r?r.toUpperCase():i.toLowerCase()),__=a=>{const t=J1(a);return t.charAt(0).toUpperCase()+t.slice(1)},Fv=(...a)=>a.filter((t,i,r)=>!!t&&t.trim()!==""&&r.indexOf(t)===i).join(" ").trim(),W1=a=>{for(const t in a)if(t.startsWith("aria-")||t==="role"||t==="title")return!0};/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var tA={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eA=La.forwardRef(({color:a="currentColor",size:t=24,strokeWidth:i=2,absoluteStrokeWidth:r,className:l="",children:c,iconNode:d,...p},_)=>La.createElement("svg",{ref:_,...tA,width:t,height:t,stroke:a,strokeWidth:r?Number(i)*24/Number(t):i,className:Fv("lucide",l),...!c&&!W1(p)&&{"aria-hidden":"true"},...p},[...d.map(([v,A])=>La.createElement(v,A)),...Array.isArray(c)?c:[c]]));/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bt=(a,t)=>{const i=La.forwardRef(({className:r,...l},c)=>La.createElement(eA,{ref:c,iconNode:t,className:Fv(`lucide-${$1(__(a))}`,`lucide-${a}`,r),...l}));return i.displayName=__(a),i};/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nA=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]],jI=bt("activity",nA);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iA=[["path",{d:"M12 5v14",key:"s699le"}],["path",{d:"m19 12-7 7-7-7",key:"1idqje"}]],GI=bt("arrow-down",iA);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sA=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],FI=bt("arrow-right",sA);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rA=[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]],QI=bt("book-open",rA);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const aA=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"m9 16 2 2 4-4",key:"19s6y9"}]],KI=bt("calendar-check",aA);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oA=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],YI=bt("calendar",oA);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lA=[["path",{d:"M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z",key:"pzmjnu"}],["path",{d:"M21.21 15.89A10 10 0 1 1 8 2.83",key:"k2fpak"}]],XI=bt("chart-pie",lA);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uA=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],ZI=bt("check",uA);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cA=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],$I=bt("chevron-down",cA);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hA=[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]],JI=bt("chevron-left",hA);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fA=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],WI=bt("chevron-right",fA);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dA=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],tD=bt("circle-alert",dA);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mA=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],eD=bt("circle-check",mA);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gA=[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}],["path",{d:"M12 11h4",key:"1jrz19"}],["path",{d:"M12 16h4",key:"n85exb"}],["path",{d:"M8 11h.01",key:"1dfujw"}],["path",{d:"M8 16h.01",key:"18s6g9"}]],nD=bt("clipboard-list",gA);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pA=[["path",{d:"M12 6v6l4 2",key:"mmk7yg"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],iD=bt("clock",pA);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yA=[["path",{d:"M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",key:"p7xjir"}]],sD=bt("cloud",yA);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _A=[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]],rD=bt("database",_A);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vA=[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]],aD=bt("download",vA);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const EA=[["path",{d:"M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",key:"1slcih"}]],oD=bt("flame",EA);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const TA=[["path",{d:"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",key:"j76jl0"}],["path",{d:"M22 10v6",key:"1lu8f3"}],["path",{d:"M6 12.5V16a6 3 0 0 0 12 0v-3.5",key:"1r8lef"}]],lD=bt("graduation-cap",TA);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const AA=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"r6nss1"}]],uD=bt("house",AA);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const SA=[["path",{d:"m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4",key:"g0fldk"}],["path",{d:"m21 2-9.6 9.6",key:"1j0ho8"}],["circle",{cx:"7.5",cy:"15.5",r:"5.5",key:"yqb3hr"}]],cD=bt("key",SA);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bA=[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1",key:"1g98yp"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1",key:"6d4xhi"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1",key:"nxv5o0"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1",key:"1bb6yr"}]],hD=bt("layout-grid",bA);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const RA=[["path",{d:"M5 12h14",key:"1ays0h"}]],fD=bt("minus",RA);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wA=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",key:"kfwtm"}]],dD=bt("moon",wA);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const CA=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],mD=bt("plus",CA);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const IA=[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]],gD=bt("save",IA);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const DA=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],pD=bt("search",DA);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const NA=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],yD=bt("settings",NA);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const OA=[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",key:"ohrbg2"}]],_D=bt("square-pen",OA);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const MA=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],vD=bt("sun",MA);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const VA=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]],ED=bt("target",VA);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kA=[["path",{d:"M3 5h18",key:"1u36vt"}],["path",{d:"M3 12h18",key:"1i2n21"}],["path",{d:"M3 19h18",key:"awlh7x"}]],TD=bt("text-align-justify",kA);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const UA=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],AD=bt("trash-2",UA);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const LA=[["path",{d:"M16 7h6v6",key:"box55l"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17",key:"1t1m79"}]],SD=bt("trending-up",LA);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xA=[["path",{d:"M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978",key:"1n3hpd"}],["path",{d:"M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978",key:"rfe1zi"}],["path",{d:"M18 9h1.5a1 1 0 0 0 0-5H18",key:"7xy6bh"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z",key:"1mhfuq"}],["path",{d:"M6 9H4.5a1 1 0 0 1 0-5H6",key:"tex48p"}]],bD=bt("trophy",xA);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const PA=[["path",{d:"M12 3v12",key:"1x0j5s"}],["path",{d:"m17 8-5-5-5 5",key:"7q97r8"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}]],RD=bt("upload",PA);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zA=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],wD=bt("x",zA);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const BA=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],CD=bt("zap",BA),qA=()=>{};var v_={};/**
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
 */const Qv=function(a){const t=[];let i=0;for(let r=0;r<a.length;r++){let l=a.charCodeAt(r);l<128?t[i++]=l:l<2048?(t[i++]=l>>6|192,t[i++]=l&63|128):(l&64512)===55296&&r+1<a.length&&(a.charCodeAt(r+1)&64512)===56320?(l=65536+((l&1023)<<10)+(a.charCodeAt(++r)&1023),t[i++]=l>>18|240,t[i++]=l>>12&63|128,t[i++]=l>>6&63|128,t[i++]=l&63|128):(t[i++]=l>>12|224,t[i++]=l>>6&63|128,t[i++]=l&63|128)}return t},HA=function(a){const t=[];let i=0,r=0;for(;i<a.length;){const l=a[i++];if(l<128)t[r++]=String.fromCharCode(l);else if(l>191&&l<224){const c=a[i++];t[r++]=String.fromCharCode((l&31)<<6|c&63)}else if(l>239&&l<365){const c=a[i++],d=a[i++],p=a[i++],_=((l&7)<<18|(c&63)<<12|(d&63)<<6|p&63)-65536;t[r++]=String.fromCharCode(55296+(_>>10)),t[r++]=String.fromCharCode(56320+(_&1023))}else{const c=a[i++],d=a[i++];t[r++]=String.fromCharCode((l&15)<<12|(c&63)<<6|d&63)}}return t.join("")},Kv={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(a,t){if(!Array.isArray(a))throw Error("encodeByteArray takes an array as a parameter");this.init_();const i=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let l=0;l<a.length;l+=3){const c=a[l],d=l+1<a.length,p=d?a[l+1]:0,_=l+2<a.length,v=_?a[l+2]:0,A=c>>2,S=(c&3)<<4|p>>4;let k=(p&15)<<2|v>>6,F=v&63;_||(F=64,d||(k=64)),r.push(i[A],i[S],i[k],i[F])}return r.join("")},encodeString(a,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(a):this.encodeByteArray(Qv(a),t)},decodeString(a,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(a):HA(this.decodeStringToByteArray(a,t))},decodeStringToByteArray(a,t){this.init_();const i=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let l=0;l<a.length;){const c=i[a.charAt(l++)],p=l<a.length?i[a.charAt(l)]:0;++l;const v=l<a.length?i[a.charAt(l)]:64;++l;const S=l<a.length?i[a.charAt(l)]:64;if(++l,c==null||p==null||v==null||S==null)throw new jA;const k=c<<2|p>>4;if(r.push(k),v!==64){const F=p<<4&240|v>>2;if(r.push(F),S!==64){const J=v<<6&192|S;r.push(J)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let a=0;a<this.ENCODED_VALS.length;a++)this.byteToCharMap_[a]=this.ENCODED_VALS.charAt(a),this.charToByteMap_[this.byteToCharMap_[a]]=a,this.byteToCharMapWebSafe_[a]=this.ENCODED_VALS_WEBSAFE.charAt(a),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[a]]=a,a>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(a)]=a,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(a)]=a)}}};class jA extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const GA=function(a){const t=Qv(a);return Kv.encodeByteArray(t,!0)},Nc=function(a){return GA(a).replace(/\./g,"")},Yv=function(a){try{return Kv.decodeString(a,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
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
 */function FA(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const QA=()=>FA().__FIREBASE_DEFAULTS__,KA=()=>{if(typeof process>"u"||typeof v_>"u")return;const a=v_.__FIREBASE_DEFAULTS__;if(a)return JSON.parse(a)},YA=()=>{if(typeof document>"u")return;let a;try{a=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=a&&Yv(a[1]);return t&&JSON.parse(t)},$c=()=>{try{return qA()||QA()||KA()||YA()}catch(a){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${a}`);return}},Xv=a=>{var t,i;return(i=(t=$c())==null?void 0:t.emulatorHosts)==null?void 0:i[a]},XA=a=>{const t=Xv(a);if(!t)return;const i=t.lastIndexOf(":");if(i<=0||i+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(i+1),10);return t[0]==="["?[t.substring(1,i-1),r]:[t.substring(0,i),r]},Zv=()=>{var a;return(a=$c())==null?void 0:a.config},$v=a=>{var t;return(t=$c())==null?void 0:t[`_${a}`]};/**
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
 */class ZA{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,i)=>{this.resolve=t,this.reject=i})}wrapCallback(t){return(i,r)=>{i?this.reject(i):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(i):t(i,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
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
 */function Za(a){try{return(a.startsWith("http://")||a.startsWith("https://")?new URL(a).hostname:a).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Jv(a){return(await fetch(a,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
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
 */function $A(a,t){if(a.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const i={alg:"none",type:"JWT"},r=t||"demo-project",l=a.iat||0,c=a.sub||a.user_id;if(!c)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const d={iss:`https://securetoken.google.com/${r}`,aud:r,iat:l,exp:l+3600,auth_time:l,sub:c,user_id:c,firebase:{sign_in_provider:"custom",identities:{}},...a};return[Nc(JSON.stringify(i)),Nc(JSON.stringify(d)),""].join(".")}const ml={};function JA(){const a={prod:[],emulator:[]};for(const t of Object.keys(ml))ml[t]?a.emulator.push(t):a.prod.push(t);return a}function WA(a){let t=document.getElementById(a),i=!1;return t||(t=document.createElement("div"),t.setAttribute("id",a),i=!0),{created:i,element:t}}let E_=!1;function Wv(a,t){if(typeof window>"u"||typeof document>"u"||!Za(window.location.host)||ml[a]===t||ml[a]||E_)return;ml[a]=t;function i(k){return`__firebase__banner__${k}`}const r="__firebase__banner",c=JA().prod.length>0;function d(){const k=document.getElementById(r);k&&k.remove()}function p(k){k.style.display="flex",k.style.background="#7faaf0",k.style.position="fixed",k.style.bottom="5px",k.style.left="5px",k.style.padding=".5em",k.style.borderRadius="5px",k.style.alignItems="center"}function _(k,F){k.setAttribute("width","24"),k.setAttribute("id",F),k.setAttribute("height","24"),k.setAttribute("viewBox","0 0 24 24"),k.setAttribute("fill","none"),k.style.marginLeft="-6px"}function v(){const k=document.createElement("span");return k.style.cursor="pointer",k.style.marginLeft="16px",k.style.fontSize="24px",k.innerHTML=" &times;",k.onclick=()=>{E_=!0,d()},k}function A(k,F){k.setAttribute("id",F),k.innerText="Learn more",k.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",k.setAttribute("target","__blank"),k.style.paddingLeft="5px",k.style.textDecoration="underline"}function S(){const k=WA(r),F=i("text"),J=document.getElementById(F)||document.createElement("span"),et=i("learnmore"),Z=document.getElementById(et)||document.createElement("a"),ht=i("preprendIcon"),yt=document.getElementById(ht)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(k.created){const mt=k.element;p(mt),A(Z,et);const zt=v();_(yt,ht),mt.append(yt,J,Z,zt),document.body.appendChild(mt)}c?(J.innerText="Preview backend disconnected.",yt.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(yt.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,J.innerText="Preview backend running in this workspace."),J.setAttribute("id",F)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",S):S()}/**
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
 */function Ze(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function tS(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ze())}function eS(){var t;const a=(t=$c())==null?void 0:t.forceEnvironment;if(a==="node")return!0;if(a==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function nS(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function iS(){const a=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof a=="object"&&a.id!==void 0}function sS(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function rS(){const a=Ze();return a.indexOf("MSIE ")>=0||a.indexOf("Trident/")>=0}function aS(){return!eS()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function oS(){try{return typeof indexedDB=="object"}catch{return!1}}function lS(){return new Promise((a,t)=>{try{let i=!0;const r="validate-browser-context-for-indexeddb-analytics-module",l=self.indexedDB.open(r);l.onsuccess=()=>{l.result.close(),i||self.indexedDB.deleteDatabase(r),a(!0)},l.onupgradeneeded=()=>{i=!1},l.onerror=()=>{var c;t(((c=l.error)==null?void 0:c.message)||"")}}catch(i){t(i)}})}/**
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
 */const uS="FirebaseError";class Wi extends Error{constructor(t,i,r){super(i),this.code=t,this.customData=r,this.name=uS,Object.setPrototypeOf(this,Wi.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Dl.prototype.create)}}class Dl{constructor(t,i,r){this.service=t,this.serviceName=i,this.errors=r}create(t,...i){const r=i[0]||{},l=`${this.service}/${t}`,c=this.errors[t],d=c?cS(c,r):"Error",p=`${this.serviceName}: ${d} (${l}).`;return new Wi(l,p,r)}}function cS(a,t){return a.replace(hS,(i,r)=>{const l=t[r];return l!=null?String(l):`<${r}?>`})}const hS=/\{\$([^}]+)}/g;function fS(a){for(const t in a)if(Object.prototype.hasOwnProperty.call(a,t))return!1;return!0}function Mr(a,t){if(a===t)return!0;const i=Object.keys(a),r=Object.keys(t);for(const l of i){if(!r.includes(l))return!1;const c=a[l],d=t[l];if(T_(c)&&T_(d)){if(!Mr(c,d))return!1}else if(c!==d)return!1}for(const l of r)if(!i.includes(l))return!1;return!0}function T_(a){return a!==null&&typeof a=="object"}/**
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
 */function Nl(a){const t=[];for(const[i,r]of Object.entries(a))Array.isArray(r)?r.forEach(l=>{t.push(encodeURIComponent(i)+"="+encodeURIComponent(l))}):t.push(encodeURIComponent(i)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}function dS(a,t){const i=new mS(a,t);return i.subscribe.bind(i)}class mS{constructor(t,i){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=i,this.task.then(()=>{t(this)}).catch(r=>{this.error(r)})}next(t){this.forEachObserver(i=>{i.next(t)})}error(t){this.forEachObserver(i=>{i.error(t)}),this.close(t)}complete(){this.forEachObserver(t=>{t.complete()}),this.close()}subscribe(t,i,r){let l;if(t===void 0&&i===void 0&&r===void 0)throw new Error("Missing Observer.");gS(t,["next","error","complete"])?l=t:l={next:t,error:i,complete:r},l.next===void 0&&(l.next=Ed),l.error===void 0&&(l.error=Ed),l.complete===void 0&&(l.complete=Ed);const c=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?l.error(this.finalError):l.complete()}catch{}}),this.observers.push(l),c}unsubscribeOne(t){this.observers===void 0||this.observers[t]===void 0||(delete this.observers[t],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(t){if(!this.finalized)for(let i=0;i<this.observers.length;i++)this.sendOne(i,t)}sendOne(t,i){this.task.then(()=>{if(this.observers!==void 0&&this.observers[t]!==void 0)try{i(this.observers[t])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(t){this.finalized||(this.finalized=!0,t!==void 0&&(this.finalError=t),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function gS(a,t){if(typeof a!="object"||a===null)return!1;for(const i of t)if(i in a&&typeof a[i]=="function")return!0;return!1}function Ed(){}/**
 * @license
 * Copyright 2021 Google LLC
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
 */function Vn(a){return a&&a._delegate?a._delegate:a}class Vr{constructor(t,i,r){this.name=t,this.instanceFactory=i,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
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
 */const Ir="[DEFAULT]";/**
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
 */class pS{constructor(t,i){this.name=t,this.container=i,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const i=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(i)){const r=new ZA;if(this.instancesDeferred.set(i,r),this.isInitialized(i)||this.shouldAutoInitialize())try{const l=this.getOrInitializeService({instanceIdentifier:i});l&&r.resolve(l)}catch{}}return this.instancesDeferred.get(i).promise}getImmediate(t){const i=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),r=(t==null?void 0:t.optional)??!1;if(this.isInitialized(i)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:i})}catch(l){if(r)return null;throw l}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(_S(t))try{this.getOrInitializeService({instanceIdentifier:Ir})}catch{}for(const[i,r]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);try{const c=this.getOrInitializeService({instanceIdentifier:l});r.resolve(c)}catch{}}}}clearInstance(t=Ir){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(i=>"INTERNAL"in i).map(i=>i.INTERNAL.delete()),...t.filter(i=>"_delete"in i).map(i=>i._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=Ir){return this.instances.has(t)}getOptions(t=Ir){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:i={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const l=this.getOrInitializeService({instanceIdentifier:r,options:i});for(const[c,d]of this.instancesDeferred.entries()){const p=this.normalizeInstanceIdentifier(c);r===p&&d.resolve(l)}return l}onInit(t,i){const r=this.normalizeInstanceIdentifier(i),l=this.onInitCallbacks.get(r)??new Set;l.add(t),this.onInitCallbacks.set(r,l);const c=this.instances.get(r);return c&&t(c,r),()=>{l.delete(t)}}invokeOnInitCallbacks(t,i){const r=this.onInitCallbacks.get(i);if(r)for(const l of r)try{l(t,i)}catch{}}getOrInitializeService({instanceIdentifier:t,options:i={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:yS(t),options:i}),this.instances.set(t,r),this.instancesOptions.set(t,i),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=Ir){return this.component?this.component.multipleInstances?t:Ir:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function yS(a){return a===Ir?void 0:a}function _S(a){return a.instantiationMode==="EAGER"}/**
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
 */class vS{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const i=this.getProvider(t.name);if(i.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);i.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const i=new pS(t,this);return this.providers.set(t,i),i}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var Dt;(function(a){a[a.DEBUG=0]="DEBUG",a[a.VERBOSE=1]="VERBOSE",a[a.INFO=2]="INFO",a[a.WARN=3]="WARN",a[a.ERROR=4]="ERROR",a[a.SILENT=5]="SILENT"})(Dt||(Dt={}));const ES={debug:Dt.DEBUG,verbose:Dt.VERBOSE,info:Dt.INFO,warn:Dt.WARN,error:Dt.ERROR,silent:Dt.SILENT},TS=Dt.INFO,AS={[Dt.DEBUG]:"log",[Dt.VERBOSE]:"log",[Dt.INFO]:"info",[Dt.WARN]:"warn",[Dt.ERROR]:"error"},SS=(a,t,...i)=>{if(t<a.logLevel)return;const r=new Date().toISOString(),l=AS[t];if(l)console[l](`[${r}]  ${a.name}:`,...i);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class im{constructor(t){this.name=t,this._logLevel=TS,this._logHandler=SS,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in Dt))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?ES[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,Dt.DEBUG,...t),this._logHandler(this,Dt.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,Dt.VERBOSE,...t),this._logHandler(this,Dt.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,Dt.INFO,...t),this._logHandler(this,Dt.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,Dt.WARN,...t),this._logHandler(this,Dt.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,Dt.ERROR,...t),this._logHandler(this,Dt.ERROR,...t)}}const bS=(a,t)=>t.some(i=>a instanceof i);let A_,S_;function RS(){return A_||(A_=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function wS(){return S_||(S_=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const t0=new WeakMap,Md=new WeakMap,e0=new WeakMap,Td=new WeakMap,sm=new WeakMap;function CS(a){const t=new Promise((i,r)=>{const l=()=>{a.removeEventListener("success",c),a.removeEventListener("error",d)},c=()=>{i(zs(a.result)),l()},d=()=>{r(a.error),l()};a.addEventListener("success",c),a.addEventListener("error",d)});return t.then(i=>{i instanceof IDBCursor&&t0.set(i,a)}).catch(()=>{}),sm.set(t,a),t}function IS(a){if(Md.has(a))return;const t=new Promise((i,r)=>{const l=()=>{a.removeEventListener("complete",c),a.removeEventListener("error",d),a.removeEventListener("abort",d)},c=()=>{i(),l()},d=()=>{r(a.error||new DOMException("AbortError","AbortError")),l()};a.addEventListener("complete",c),a.addEventListener("error",d),a.addEventListener("abort",d)});Md.set(a,t)}let Vd={get(a,t,i){if(a instanceof IDBTransaction){if(t==="done")return Md.get(a);if(t==="objectStoreNames")return a.objectStoreNames||e0.get(a);if(t==="store")return i.objectStoreNames[1]?void 0:i.objectStore(i.objectStoreNames[0])}return zs(a[t])},set(a,t,i){return a[t]=i,!0},has(a,t){return a instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in a}};function DS(a){Vd=a(Vd)}function NS(a){return a===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...i){const r=a.call(Ad(this),t,...i);return e0.set(r,t.sort?t.sort():[t]),zs(r)}:wS().includes(a)?function(...t){return a.apply(Ad(this),t),zs(t0.get(this))}:function(...t){return zs(a.apply(Ad(this),t))}}function OS(a){return typeof a=="function"?NS(a):(a instanceof IDBTransaction&&IS(a),bS(a,RS())?new Proxy(a,Vd):a)}function zs(a){if(a instanceof IDBRequest)return CS(a);if(Td.has(a))return Td.get(a);const t=OS(a);return t!==a&&(Td.set(a,t),sm.set(t,a)),t}const Ad=a=>sm.get(a);function MS(a,t,{blocked:i,upgrade:r,blocking:l,terminated:c}={}){const d=indexedDB.open(a,t),p=zs(d);return r&&d.addEventListener("upgradeneeded",_=>{r(zs(d.result),_.oldVersion,_.newVersion,zs(d.transaction),_)}),i&&d.addEventListener("blocked",_=>i(_.oldVersion,_.newVersion,_)),p.then(_=>{c&&_.addEventListener("close",()=>c()),l&&_.addEventListener("versionchange",v=>l(v.oldVersion,v.newVersion,v))}).catch(()=>{}),p}const VS=["get","getKey","getAll","getAllKeys","count"],kS=["put","add","delete","clear"],Sd=new Map;function b_(a,t){if(!(a instanceof IDBDatabase&&!(t in a)&&typeof t=="string"))return;if(Sd.get(t))return Sd.get(t);const i=t.replace(/FromIndex$/,""),r=t!==i,l=kS.includes(i);if(!(i in(r?IDBIndex:IDBObjectStore).prototype)||!(l||VS.includes(i)))return;const c=async function(d,...p){const _=this.transaction(d,l?"readwrite":"readonly");let v=_.store;return r&&(v=v.index(p.shift())),(await Promise.all([v[i](...p),l&&_.done]))[0]};return Sd.set(t,c),c}DS(a=>({...a,get:(t,i,r)=>b_(t,i)||a.get(t,i,r),has:(t,i)=>!!b_(t,i)||a.has(t,i)}));/**
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
 */class US{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(i=>{if(LS(i)){const r=i.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(i=>i).join(" ")}}function LS(a){const t=a.getComponent();return(t==null?void 0:t.type)==="VERSION"}const kd="@firebase/app",R_="0.14.6";/**
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
 */const Yi=new im("@firebase/app"),xS="@firebase/app-compat",PS="@firebase/analytics-compat",zS="@firebase/analytics",BS="@firebase/app-check-compat",qS="@firebase/app-check",HS="@firebase/auth",jS="@firebase/auth-compat",GS="@firebase/database",FS="@firebase/data-connect",QS="@firebase/database-compat",KS="@firebase/functions",YS="@firebase/functions-compat",XS="@firebase/installations",ZS="@firebase/installations-compat",$S="@firebase/messaging",JS="@firebase/messaging-compat",WS="@firebase/performance",t2="@firebase/performance-compat",e2="@firebase/remote-config",n2="@firebase/remote-config-compat",i2="@firebase/storage",s2="@firebase/storage-compat",r2="@firebase/firestore",a2="@firebase/ai",o2="@firebase/firestore-compat",l2="firebase",u2="12.6.0";/**
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
 */const Ud="[DEFAULT]",c2={[kd]:"fire-core",[xS]:"fire-core-compat",[zS]:"fire-analytics",[PS]:"fire-analytics-compat",[qS]:"fire-app-check",[BS]:"fire-app-check-compat",[HS]:"fire-auth",[jS]:"fire-auth-compat",[GS]:"fire-rtdb",[FS]:"fire-data-connect",[QS]:"fire-rtdb-compat",[KS]:"fire-fn",[YS]:"fire-fn-compat",[XS]:"fire-iid",[ZS]:"fire-iid-compat",[$S]:"fire-fcm",[JS]:"fire-fcm-compat",[WS]:"fire-perf",[t2]:"fire-perf-compat",[e2]:"fire-rc",[n2]:"fire-rc-compat",[i2]:"fire-gcs",[s2]:"fire-gcs-compat",[r2]:"fire-fst",[o2]:"fire-fst-compat",[a2]:"fire-vertex","fire-js":"fire-js",[l2]:"fire-js-all"};/**
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
 */const Oc=new Map,h2=new Map,Ld=new Map;function w_(a,t){try{a.container.addComponent(t)}catch(i){Yi.debug(`Component ${t.name} failed to register with FirebaseApp ${a.name}`,i)}}function ja(a){const t=a.name;if(Ld.has(t))return Yi.debug(`There were multiple attempts to register component ${t}.`),!1;Ld.set(t,a);for(const i of Oc.values())w_(i,a);for(const i of h2.values())w_(i,a);return!0}function rm(a,t){const i=a.container.getProvider("heartbeat").getImmediate({optional:!0});return i&&i.triggerHeartbeat(),a.container.getProvider(t)}function Qn(a){return a==null?!1:a.settings!==void 0}/**
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
 */const f2={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Bs=new Dl("app","Firebase",f2);/**
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
 */class d2{constructor(t,i,r){this._isDeleted=!1,this._options={...t},this._config={...i},this._name=i.name,this._automaticDataCollectionEnabled=i.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Vr("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw Bs.create("app-deleted",{appName:this._name})}}/**
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
 */const $a=u2;function m2(a,t={}){let i=a;typeof t!="object"&&(t={name:t});const r={name:Ud,automaticDataCollectionEnabled:!0,...t},l=r.name;if(typeof l!="string"||!l)throw Bs.create("bad-app-name",{appName:String(l)});if(i||(i=Zv()),!i)throw Bs.create("no-options");const c=Oc.get(l);if(c){if(Mr(i,c.options)&&Mr(r,c.config))return c;throw Bs.create("duplicate-app",{appName:l})}const d=new vS(l);for(const _ of Ld.values())d.addComponent(_);const p=new d2(i,r,d);return Oc.set(l,p),p}function n0(a=Ud){const t=Oc.get(a);if(!t&&a===Ud&&Zv())return m2();if(!t)throw Bs.create("no-app",{appName:a});return t}function qs(a,t,i){let r=c2[a]??a;i&&(r+=`-${i}`);const l=r.match(/\s|\//),c=t.match(/\s|\//);if(l||c){const d=[`Unable to register library "${r}" with version "${t}":`];l&&d.push(`library name "${r}" contains illegal characters (whitespace or "/")`),l&&c&&d.push("and"),c&&d.push(`version name "${t}" contains illegal characters (whitespace or "/")`),Yi.warn(d.join(" "));return}ja(new Vr(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
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
 */const g2="firebase-heartbeat-database",p2=1,El="firebase-heartbeat-store";let bd=null;function i0(){return bd||(bd=MS(g2,p2,{upgrade:(a,t)=>{switch(t){case 0:try{a.createObjectStore(El)}catch(i){console.warn(i)}}}}).catch(a=>{throw Bs.create("idb-open",{originalErrorMessage:a.message})})),bd}async function y2(a){try{const i=(await i0()).transaction(El),r=await i.objectStore(El).get(s0(a));return await i.done,r}catch(t){if(t instanceof Wi)Yi.warn(t.message);else{const i=Bs.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});Yi.warn(i.message)}}}async function C_(a,t){try{const r=(await i0()).transaction(El,"readwrite");await r.objectStore(El).put(t,s0(a)),await r.done}catch(i){if(i instanceof Wi)Yi.warn(i.message);else{const r=Bs.create("idb-set",{originalErrorMessage:i==null?void 0:i.message});Yi.warn(r.message)}}}function s0(a){return`${a.name}!${a.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
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
 */const _2=1024,v2=30;class E2{constructor(t){this.container=t,this._heartbeatsCache=null;const i=this.container.getProvider("app").getImmediate();this._storage=new A2(i),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,i;try{const l=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),c=I_();if(((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((i=this._heartbeatsCache)==null?void 0:i.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===c||this._heartbeatsCache.heartbeats.some(d=>d.date===c))return;if(this._heartbeatsCache.heartbeats.push({date:c,agent:l}),this._heartbeatsCache.heartbeats.length>v2){const d=S2(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(d,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Yi.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const i=I_(),{heartbeatsToSend:r,unsentEntries:l}=T2(this._heartbeatsCache.heartbeats),c=Nc(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=i,l.length>0?(this._heartbeatsCache.heartbeats=l,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),c}catch(i){return Yi.warn(i),""}}}function I_(){return new Date().toISOString().substring(0,10)}function T2(a,t=_2){const i=[];let r=a.slice();for(const l of a){const c=i.find(d=>d.agent===l.agent);if(c){if(c.dates.push(l.date),D_(i)>t){c.dates.pop();break}}else if(i.push({agent:l.agent,dates:[l.date]}),D_(i)>t){i.pop();break}r=r.slice(1)}return{heartbeatsToSend:i,unsentEntries:r}}class A2{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return oS()?lS().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const i=await y2(this.app);return i!=null&&i.heartbeats?i:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return C_(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return C_(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...t.heartbeats]})}else return}}function D_(a){return Nc(JSON.stringify({version:2,heartbeats:a})).length}function S2(a){if(a.length===0)return-1;let t=0,i=a[0].date;for(let r=1;r<a.length;r++)a[r].date<i&&(i=a[r].date,t=r);return t}/**
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
 */function b2(a){ja(new Vr("platform-logger",t=>new US(t),"PRIVATE")),ja(new Vr("heartbeat",t=>new E2(t),"PRIVATE")),qs(kd,R_,a),qs(kd,R_,"esm2020"),qs("fire-js","")}b2("");var R2="firebase",w2="12.7.0";/**
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
 */qs(R2,w2,"app");var N_=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Hs,r0;(function(){var a;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(I,b){function C(){}C.prototype=b.prototype,I.F=b.prototype,I.prototype=new C,I.prototype.constructor=I,I.D=function(M,N,U){for(var R=Array(arguments.length-2),ne=2;ne<arguments.length;ne++)R[ne-2]=arguments[ne];return b.prototype[N].apply(M,R)}}function i(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}t(r,i),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function l(I,b,C){C||(C=0);const M=Array(16);if(typeof b=="string")for(var N=0;N<16;++N)M[N]=b.charCodeAt(C++)|b.charCodeAt(C++)<<8|b.charCodeAt(C++)<<16|b.charCodeAt(C++)<<24;else for(N=0;N<16;++N)M[N]=b[C++]|b[C++]<<8|b[C++]<<16|b[C++]<<24;b=I.g[0],C=I.g[1],N=I.g[2];let U=I.g[3],R;R=b+(U^C&(N^U))+M[0]+3614090360&4294967295,b=C+(R<<7&4294967295|R>>>25),R=U+(N^b&(C^N))+M[1]+3905402710&4294967295,U=b+(R<<12&4294967295|R>>>20),R=N+(C^U&(b^C))+M[2]+606105819&4294967295,N=U+(R<<17&4294967295|R>>>15),R=C+(b^N&(U^b))+M[3]+3250441966&4294967295,C=N+(R<<22&4294967295|R>>>10),R=b+(U^C&(N^U))+M[4]+4118548399&4294967295,b=C+(R<<7&4294967295|R>>>25),R=U+(N^b&(C^N))+M[5]+1200080426&4294967295,U=b+(R<<12&4294967295|R>>>20),R=N+(C^U&(b^C))+M[6]+2821735955&4294967295,N=U+(R<<17&4294967295|R>>>15),R=C+(b^N&(U^b))+M[7]+4249261313&4294967295,C=N+(R<<22&4294967295|R>>>10),R=b+(U^C&(N^U))+M[8]+1770035416&4294967295,b=C+(R<<7&4294967295|R>>>25),R=U+(N^b&(C^N))+M[9]+2336552879&4294967295,U=b+(R<<12&4294967295|R>>>20),R=N+(C^U&(b^C))+M[10]+4294925233&4294967295,N=U+(R<<17&4294967295|R>>>15),R=C+(b^N&(U^b))+M[11]+2304563134&4294967295,C=N+(R<<22&4294967295|R>>>10),R=b+(U^C&(N^U))+M[12]+1804603682&4294967295,b=C+(R<<7&4294967295|R>>>25),R=U+(N^b&(C^N))+M[13]+4254626195&4294967295,U=b+(R<<12&4294967295|R>>>20),R=N+(C^U&(b^C))+M[14]+2792965006&4294967295,N=U+(R<<17&4294967295|R>>>15),R=C+(b^N&(U^b))+M[15]+1236535329&4294967295,C=N+(R<<22&4294967295|R>>>10),R=b+(N^U&(C^N))+M[1]+4129170786&4294967295,b=C+(R<<5&4294967295|R>>>27),R=U+(C^N&(b^C))+M[6]+3225465664&4294967295,U=b+(R<<9&4294967295|R>>>23),R=N+(b^C&(U^b))+M[11]+643717713&4294967295,N=U+(R<<14&4294967295|R>>>18),R=C+(U^b&(N^U))+M[0]+3921069994&4294967295,C=N+(R<<20&4294967295|R>>>12),R=b+(N^U&(C^N))+M[5]+3593408605&4294967295,b=C+(R<<5&4294967295|R>>>27),R=U+(C^N&(b^C))+M[10]+38016083&4294967295,U=b+(R<<9&4294967295|R>>>23),R=N+(b^C&(U^b))+M[15]+3634488961&4294967295,N=U+(R<<14&4294967295|R>>>18),R=C+(U^b&(N^U))+M[4]+3889429448&4294967295,C=N+(R<<20&4294967295|R>>>12),R=b+(N^U&(C^N))+M[9]+568446438&4294967295,b=C+(R<<5&4294967295|R>>>27),R=U+(C^N&(b^C))+M[14]+3275163606&4294967295,U=b+(R<<9&4294967295|R>>>23),R=N+(b^C&(U^b))+M[3]+4107603335&4294967295,N=U+(R<<14&4294967295|R>>>18),R=C+(U^b&(N^U))+M[8]+1163531501&4294967295,C=N+(R<<20&4294967295|R>>>12),R=b+(N^U&(C^N))+M[13]+2850285829&4294967295,b=C+(R<<5&4294967295|R>>>27),R=U+(C^N&(b^C))+M[2]+4243563512&4294967295,U=b+(R<<9&4294967295|R>>>23),R=N+(b^C&(U^b))+M[7]+1735328473&4294967295,N=U+(R<<14&4294967295|R>>>18),R=C+(U^b&(N^U))+M[12]+2368359562&4294967295,C=N+(R<<20&4294967295|R>>>12),R=b+(C^N^U)+M[5]+4294588738&4294967295,b=C+(R<<4&4294967295|R>>>28),R=U+(b^C^N)+M[8]+2272392833&4294967295,U=b+(R<<11&4294967295|R>>>21),R=N+(U^b^C)+M[11]+1839030562&4294967295,N=U+(R<<16&4294967295|R>>>16),R=C+(N^U^b)+M[14]+4259657740&4294967295,C=N+(R<<23&4294967295|R>>>9),R=b+(C^N^U)+M[1]+2763975236&4294967295,b=C+(R<<4&4294967295|R>>>28),R=U+(b^C^N)+M[4]+1272893353&4294967295,U=b+(R<<11&4294967295|R>>>21),R=N+(U^b^C)+M[7]+4139469664&4294967295,N=U+(R<<16&4294967295|R>>>16),R=C+(N^U^b)+M[10]+3200236656&4294967295,C=N+(R<<23&4294967295|R>>>9),R=b+(C^N^U)+M[13]+681279174&4294967295,b=C+(R<<4&4294967295|R>>>28),R=U+(b^C^N)+M[0]+3936430074&4294967295,U=b+(R<<11&4294967295|R>>>21),R=N+(U^b^C)+M[3]+3572445317&4294967295,N=U+(R<<16&4294967295|R>>>16),R=C+(N^U^b)+M[6]+76029189&4294967295,C=N+(R<<23&4294967295|R>>>9),R=b+(C^N^U)+M[9]+3654602809&4294967295,b=C+(R<<4&4294967295|R>>>28),R=U+(b^C^N)+M[12]+3873151461&4294967295,U=b+(R<<11&4294967295|R>>>21),R=N+(U^b^C)+M[15]+530742520&4294967295,N=U+(R<<16&4294967295|R>>>16),R=C+(N^U^b)+M[2]+3299628645&4294967295,C=N+(R<<23&4294967295|R>>>9),R=b+(N^(C|~U))+M[0]+4096336452&4294967295,b=C+(R<<6&4294967295|R>>>26),R=U+(C^(b|~N))+M[7]+1126891415&4294967295,U=b+(R<<10&4294967295|R>>>22),R=N+(b^(U|~C))+M[14]+2878612391&4294967295,N=U+(R<<15&4294967295|R>>>17),R=C+(U^(N|~b))+M[5]+4237533241&4294967295,C=N+(R<<21&4294967295|R>>>11),R=b+(N^(C|~U))+M[12]+1700485571&4294967295,b=C+(R<<6&4294967295|R>>>26),R=U+(C^(b|~N))+M[3]+2399980690&4294967295,U=b+(R<<10&4294967295|R>>>22),R=N+(b^(U|~C))+M[10]+4293915773&4294967295,N=U+(R<<15&4294967295|R>>>17),R=C+(U^(N|~b))+M[1]+2240044497&4294967295,C=N+(R<<21&4294967295|R>>>11),R=b+(N^(C|~U))+M[8]+1873313359&4294967295,b=C+(R<<6&4294967295|R>>>26),R=U+(C^(b|~N))+M[15]+4264355552&4294967295,U=b+(R<<10&4294967295|R>>>22),R=N+(b^(U|~C))+M[6]+2734768916&4294967295,N=U+(R<<15&4294967295|R>>>17),R=C+(U^(N|~b))+M[13]+1309151649&4294967295,C=N+(R<<21&4294967295|R>>>11),R=b+(N^(C|~U))+M[4]+4149444226&4294967295,b=C+(R<<6&4294967295|R>>>26),R=U+(C^(b|~N))+M[11]+3174756917&4294967295,U=b+(R<<10&4294967295|R>>>22),R=N+(b^(U|~C))+M[2]+718787259&4294967295,N=U+(R<<15&4294967295|R>>>17),R=C+(U^(N|~b))+M[9]+3951481745&4294967295,I.g[0]=I.g[0]+b&4294967295,I.g[1]=I.g[1]+(N+(R<<21&4294967295|R>>>11))&4294967295,I.g[2]=I.g[2]+N&4294967295,I.g[3]=I.g[3]+U&4294967295}r.prototype.v=function(I,b){b===void 0&&(b=I.length);const C=b-this.blockSize,M=this.C;let N=this.h,U=0;for(;U<b;){if(N==0)for(;U<=C;)l(this,I,U),U+=this.blockSize;if(typeof I=="string"){for(;U<b;)if(M[N++]=I.charCodeAt(U++),N==this.blockSize){l(this,M),N=0;break}}else for(;U<b;)if(M[N++]=I[U++],N==this.blockSize){l(this,M),N=0;break}}this.h=N,this.o+=b},r.prototype.A=function(){var I=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);I[0]=128;for(var b=1;b<I.length-8;++b)I[b]=0;b=this.o*8;for(var C=I.length-8;C<I.length;++C)I[C]=b&255,b/=256;for(this.v(I),I=Array(16),b=0,C=0;C<4;++C)for(let M=0;M<32;M+=8)I[b++]=this.g[C]>>>M&255;return I};function c(I,b){var C=p;return Object.prototype.hasOwnProperty.call(C,I)?C[I]:C[I]=b(I)}function d(I,b){this.h=b;const C=[];let M=!0;for(let N=I.length-1;N>=0;N--){const U=I[N]|0;M&&U==b||(C[N]=U,M=!1)}this.g=C}var p={};function _(I){return-128<=I&&I<128?c(I,function(b){return new d([b|0],b<0?-1:0)}):new d([I|0],I<0?-1:0)}function v(I){if(isNaN(I)||!isFinite(I))return S;if(I<0)return Z(v(-I));const b=[];let C=1;for(let M=0;I>=C;M++)b[M]=I/C|0,C*=4294967296;return new d(b,0)}function A(I,b){if(I.length==0)throw Error("number format error: empty string");if(b=b||10,b<2||36<b)throw Error("radix out of range: "+b);if(I.charAt(0)=="-")return Z(A(I.substring(1),b));if(I.indexOf("-")>=0)throw Error('number format error: interior "-" character');const C=v(Math.pow(b,8));let M=S;for(let U=0;U<I.length;U+=8){var N=Math.min(8,I.length-U);const R=parseInt(I.substring(U,U+N),b);N<8?(N=v(Math.pow(b,N)),M=M.j(N).add(v(R))):(M=M.j(C),M=M.add(v(R)))}return M}var S=_(0),k=_(1),F=_(16777216);a=d.prototype,a.m=function(){if(et(this))return-Z(this).m();let I=0,b=1;for(let C=0;C<this.g.length;C++){const M=this.i(C);I+=(M>=0?M:4294967296+M)*b,b*=4294967296}return I},a.toString=function(I){if(I=I||10,I<2||36<I)throw Error("radix out of range: "+I);if(J(this))return"0";if(et(this))return"-"+Z(this).toString(I);const b=v(Math.pow(I,6));var C=this;let M="";for(;;){const N=zt(C,b).g;C=ht(C,N.j(b));let U=((C.g.length>0?C.g[0]:C.h)>>>0).toString(I);if(C=N,J(C))return U+M;for(;U.length<6;)U="0"+U;M=U+M}},a.i=function(I){return I<0?0:I<this.g.length?this.g[I]:this.h};function J(I){if(I.h!=0)return!1;for(let b=0;b<I.g.length;b++)if(I.g[b]!=0)return!1;return!0}function et(I){return I.h==-1}a.l=function(I){return I=ht(this,I),et(I)?-1:J(I)?0:1};function Z(I){const b=I.g.length,C=[];for(let M=0;M<b;M++)C[M]=~I.g[M];return new d(C,~I.h).add(k)}a.abs=function(){return et(this)?Z(this):this},a.add=function(I){const b=Math.max(this.g.length,I.g.length),C=[];let M=0;for(let N=0;N<=b;N++){let U=M+(this.i(N)&65535)+(I.i(N)&65535),R=(U>>>16)+(this.i(N)>>>16)+(I.i(N)>>>16);M=R>>>16,U&=65535,R&=65535,C[N]=R<<16|U}return new d(C,C[C.length-1]&-2147483648?-1:0)};function ht(I,b){return I.add(Z(b))}a.j=function(I){if(J(this)||J(I))return S;if(et(this))return et(I)?Z(this).j(Z(I)):Z(Z(this).j(I));if(et(I))return Z(this.j(Z(I)));if(this.l(F)<0&&I.l(F)<0)return v(this.m()*I.m());const b=this.g.length+I.g.length,C=[];for(var M=0;M<2*b;M++)C[M]=0;for(M=0;M<this.g.length;M++)for(let N=0;N<I.g.length;N++){const U=this.i(M)>>>16,R=this.i(M)&65535,ne=I.i(N)>>>16,we=I.i(N)&65535;C[2*M+2*N]+=R*we,yt(C,2*M+2*N),C[2*M+2*N+1]+=U*we,yt(C,2*M+2*N+1),C[2*M+2*N+1]+=R*ne,yt(C,2*M+2*N+1),C[2*M+2*N+2]+=U*ne,yt(C,2*M+2*N+2)}for(I=0;I<b;I++)C[I]=C[2*I+1]<<16|C[2*I];for(I=b;I<2*b;I++)C[I]=0;return new d(C,0)};function yt(I,b){for(;(I[b]&65535)!=I[b];)I[b+1]+=I[b]>>>16,I[b]&=65535,b++}function mt(I,b){this.g=I,this.h=b}function zt(I,b){if(J(b))throw Error("division by zero");if(J(I))return new mt(S,S);if(et(I))return b=zt(Z(I),b),new mt(Z(b.g),Z(b.h));if(et(b))return b=zt(I,Z(b)),new mt(Z(b.g),b.h);if(I.g.length>30){if(et(I)||et(b))throw Error("slowDivide_ only works with positive integers.");for(var C=k,M=b;M.l(I)<=0;)C=ee(C),M=ee(M);var N=Vt(C,1),U=Vt(M,1);for(M=Vt(M,2),C=Vt(C,2);!J(M);){var R=U.add(M);R.l(I)<=0&&(N=N.add(C),U=R),M=Vt(M,1),C=Vt(C,1)}return b=ht(I,N.j(b)),new mt(N,b)}for(N=S;I.l(b)>=0;){for(C=Math.max(1,Math.floor(I.m()/b.m())),M=Math.ceil(Math.log(C)/Math.LN2),M=M<=48?1:Math.pow(2,M-48),U=v(C),R=U.j(b);et(R)||R.l(I)>0;)C-=M,U=v(C),R=U.j(b);J(U)&&(U=k),N=N.add(U),I=ht(I,R)}return new mt(N,I)}a.B=function(I){return zt(this,I).h},a.and=function(I){const b=Math.max(this.g.length,I.g.length),C=[];for(let M=0;M<b;M++)C[M]=this.i(M)&I.i(M);return new d(C,this.h&I.h)},a.or=function(I){const b=Math.max(this.g.length,I.g.length),C=[];for(let M=0;M<b;M++)C[M]=this.i(M)|I.i(M);return new d(C,this.h|I.h)},a.xor=function(I){const b=Math.max(this.g.length,I.g.length),C=[];for(let M=0;M<b;M++)C[M]=this.i(M)^I.i(M);return new d(C,this.h^I.h)};function ee(I){const b=I.g.length+1,C=[];for(let M=0;M<b;M++)C[M]=I.i(M)<<1|I.i(M-1)>>>31;return new d(C,I.h)}function Vt(I,b){const C=b>>5;b%=32;const M=I.g.length-C,N=[];for(let U=0;U<M;U++)N[U]=b>0?I.i(U+C)>>>b|I.i(U+C+1)<<32-b:I.i(U+C);return new d(N,I.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,r0=r,d.prototype.add=d.prototype.add,d.prototype.multiply=d.prototype.j,d.prototype.modulo=d.prototype.B,d.prototype.compare=d.prototype.l,d.prototype.toNumber=d.prototype.m,d.prototype.toString=d.prototype.toString,d.prototype.getBits=d.prototype.i,d.fromNumber=v,d.fromString=A,Hs=d}).apply(typeof N_<"u"?N_:typeof self<"u"?self:typeof window<"u"?window:{});var mc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var a0,cl,o0,Ec,xd,l0,u0,c0;(function(){var a,t=Object.defineProperty;function i(u){u=[typeof globalThis=="object"&&globalThis,u,typeof window=="object"&&window,typeof self=="object"&&self,typeof mc=="object"&&mc];for(var m=0;m<u.length;++m){var y=u[m];if(y&&y.Math==Math)return y}throw Error("Cannot find global object")}var r=i(this);function l(u,m){if(m)t:{var y=r;u=u.split(".");for(var T=0;T<u.length-1;T++){var L=u[T];if(!(L in y))break t;y=y[L]}u=u[u.length-1],T=y[u],m=m(T),m!=T&&m!=null&&t(y,u,{configurable:!0,writable:!0,value:m})}}l("Symbol.dispose",function(u){return u||Symbol("Symbol.dispose")}),l("Array.prototype.values",function(u){return u||function(){return this[Symbol.iterator]()}}),l("Object.entries",function(u){return u||function(m){var y=[],T;for(T in m)Object.prototype.hasOwnProperty.call(m,T)&&y.push([T,m[T]]);return y}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var c=c||{},d=this||self;function p(u){var m=typeof u;return m=="object"&&u!=null||m=="function"}function _(u,m,y){return u.call.apply(u.bind,arguments)}function v(u,m,y){return v=_,v.apply(null,arguments)}function A(u,m){var y=Array.prototype.slice.call(arguments,1);return function(){var T=y.slice();return T.push.apply(T,arguments),u.apply(this,T)}}function S(u,m){function y(){}y.prototype=m.prototype,u.Z=m.prototype,u.prototype=new y,u.prototype.constructor=u,u.Ob=function(T,L,B){for(var $=Array(arguments.length-2),Et=2;Et<arguments.length;Et++)$[Et-2]=arguments[Et];return m.prototype[L].apply(T,$)}}var k=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?u=>u&&AsyncContext.Snapshot.wrap(u):u=>u;function F(u){const m=u.length;if(m>0){const y=Array(m);for(let T=0;T<m;T++)y[T]=u[T];return y}return[]}function J(u,m){for(let T=1;T<arguments.length;T++){const L=arguments[T];var y=typeof L;if(y=y!="object"?y:L?Array.isArray(L)?"array":y:"null",y=="array"||y=="object"&&typeof L.length=="number"){y=u.length||0;const B=L.length||0;u.length=y+B;for(let $=0;$<B;$++)u[y+$]=L[$]}else u.push(L)}}class et{constructor(m,y){this.i=m,this.j=y,this.h=0,this.g=null}get(){let m;return this.h>0?(this.h--,m=this.g,this.g=m.next,m.next=null):m=this.i(),m}}function Z(u){d.setTimeout(()=>{throw u},0)}function ht(){var u=I;let m=null;return u.g&&(m=u.g,u.g=u.g.next,u.g||(u.h=null),m.next=null),m}class yt{constructor(){this.h=this.g=null}add(m,y){const T=mt.get();T.set(m,y),this.h?this.h.next=T:this.g=T,this.h=T}}var mt=new et(()=>new zt,u=>u.reset());class zt{constructor(){this.next=this.g=this.h=null}set(m,y){this.h=m,this.g=y,this.next=null}reset(){this.next=this.g=this.h=null}}let ee,Vt=!1,I=new yt,b=()=>{const u=Promise.resolve(void 0);ee=()=>{u.then(C)}};function C(){for(var u;u=ht();){try{u.h.call(u.g)}catch(y){Z(y)}var m=mt;m.j(u),m.h<100&&(m.h++,u.next=m.g,m.g=u)}Vt=!1}function M(){this.u=this.u,this.C=this.C}M.prototype.u=!1,M.prototype.dispose=function(){this.u||(this.u=!0,this.N())},M.prototype[Symbol.dispose]=function(){this.dispose()},M.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function N(u,m){this.type=u,this.g=this.target=m,this.defaultPrevented=!1}N.prototype.h=function(){this.defaultPrevented=!0};var U=(function(){if(!d.addEventListener||!Object.defineProperty)return!1;var u=!1,m=Object.defineProperty({},"passive",{get:function(){u=!0}});try{const y=()=>{};d.addEventListener("test",y,m),d.removeEventListener("test",y,m)}catch{}return u})();function R(u){return/^[\s\xa0]*$/.test(u)}function ne(u,m){N.call(this,u?u.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,u&&this.init(u,m)}S(ne,N),ne.prototype.init=function(u,m){const y=this.type=u.type,T=u.changedTouches&&u.changedTouches.length?u.changedTouches[0]:null;this.target=u.target||u.srcElement,this.g=m,m=u.relatedTarget,m||(y=="mouseover"?m=u.fromElement:y=="mouseout"&&(m=u.toElement)),this.relatedTarget=m,T?(this.clientX=T.clientX!==void 0?T.clientX:T.pageX,this.clientY=T.clientY!==void 0?T.clientY:T.pageY,this.screenX=T.screenX||0,this.screenY=T.screenY||0):(this.clientX=u.clientX!==void 0?u.clientX:u.pageX,this.clientY=u.clientY!==void 0?u.clientY:u.pageY,this.screenX=u.screenX||0,this.screenY=u.screenY||0),this.button=u.button,this.key=u.key||"",this.ctrlKey=u.ctrlKey,this.altKey=u.altKey,this.shiftKey=u.shiftKey,this.metaKey=u.metaKey,this.pointerId=u.pointerId||0,this.pointerType=u.pointerType,this.state=u.state,this.i=u,u.defaultPrevented&&ne.Z.h.call(this)},ne.prototype.h=function(){ne.Z.h.call(this);const u=this.i;u.preventDefault?u.preventDefault():u.returnValue=!1};var we="closure_listenable_"+(Math.random()*1e6|0),j=0;function W(u,m,y,T,L){this.listener=u,this.proxy=null,this.src=m,this.type=y,this.capture=!!T,this.ha=L,this.key=++j,this.da=this.fa=!1}function lt(u){u.da=!0,u.listener=null,u.proxy=null,u.src=null,u.ha=null}function Lt(u,m,y){for(const T in u)m.call(y,u[T],T,u)}function jt(u,m){for(const y in u)m.call(void 0,u[y],y,u)}function O(u){const m={};for(const y in u)m[y]=u[y];return m}const K="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function tt(u,m){let y,T;for(let L=1;L<arguments.length;L++){T=arguments[L];for(y in T)u[y]=T[y];for(let B=0;B<K.length;B++)y=K[B],Object.prototype.hasOwnProperty.call(T,y)&&(u[y]=T[y])}}function it(u){this.src=u,this.g={},this.h=0}it.prototype.add=function(u,m,y,T,L){const B=u.toString();u=this.g[B],u||(u=this.g[B]=[],this.h++);const $=At(u,m,T,L);return $>-1?(m=u[$],y||(m.fa=!1)):(m=new W(m,this.src,B,!!T,L),m.fa=y,u.push(m)),m};function gt(u,m){const y=m.type;if(y in u.g){var T=u.g[y],L=Array.prototype.indexOf.call(T,m,void 0),B;(B=L>=0)&&Array.prototype.splice.call(T,L,1),B&&(lt(m),u.g[y].length==0&&(delete u.g[y],u.h--))}}function At(u,m,y,T){for(let L=0;L<u.length;++L){const B=u[L];if(!B.da&&B.listener==m&&B.capture==!!y&&B.ha==T)return L}return-1}var kt="closure_lm_"+(Math.random()*1e6|0),Ce={};function ie(u,m,y,T,L){if(Array.isArray(m)){for(let B=0;B<m.length;B++)ie(u,m[B],y,T,L);return null}return y=ro(y),u&&u[we]?u.J(m,y,p(T)?!!T.capture:!1,L):$s(u,m,y,!1,T,L)}function $s(u,m,y,T,L,B){if(!m)throw Error("Invalid event type");const $=p(L)?!!L.capture:!!L;let Et=Js(u);if(Et||(u[kt]=Et=new it(u)),y=Et.add(m,y,T,$,B),y.proxy)return y;if(T=qr(),y.proxy=T,T.src=u,T.listener=y,u.addEventListener)U||(L=$),L===void 0&&(L=!1),u.addEventListener(m.toString(),T,L);else if(u.attachEvent)u.attachEvent(Xn(m.toString()),T);else if(u.addListener&&u.removeListener)u.addListener(T);else throw Error("addEventListener and attachEvent are unavailable.");return y}function qr(){function u(y){return m.call(u.src,u.listener,y)}const m=io;return u}function Hr(u,m,y,T,L){if(Array.isArray(m))for(var B=0;B<m.length;B++)Hr(u,m[B],y,T,L);else T=p(T)?!!T.capture:!!T,y=ro(y),u&&u[we]?(u=u.i,B=String(m).toString(),B in u.g&&(m=u.g[B],y=At(m,y,T,L),y>-1&&(lt(m[y]),Array.prototype.splice.call(m,y,1),m.length==0&&(delete u.g[B],u.h--)))):u&&(u=Js(u))&&(m=u.g[m.toString()],u=-1,m&&(u=At(m,y,T,L)),(y=u>-1?m[u]:null)&&jr(y))}function jr(u){if(typeof u!="number"&&u&&!u.da){var m=u.src;if(m&&m[we])gt(m.i,u);else{var y=u.type,T=u.proxy;m.removeEventListener?m.removeEventListener(y,T,u.capture):m.detachEvent?m.detachEvent(Xn(y),T):m.addListener&&m.removeListener&&m.removeListener(T),(y=Js(m))?(gt(y,u),y.h==0&&(y.src=null,m[kt]=null)):lt(u)}}}function Xn(u){return u in Ce?Ce[u]:Ce[u]="on"+u}function io(u,m){if(u.da)u=!0;else{m=new ne(m,this);const y=u.listener,T=u.ha||u.src;u.fa&&jr(u),u=y.call(T,m)}return u}function Js(u){return u=u[kt],u instanceof it?u:null}var so="__closure_events_fn_"+(Math.random()*1e9>>>0);function ro(u){return typeof u=="function"?u:(u[so]||(u[so]=function(m){return u.handleEvent(m)}),u[so])}function ge(){M.call(this),this.i=new it(this),this.M=this,this.G=null}S(ge,M),ge.prototype[we]=!0,ge.prototype.removeEventListener=function(u,m,y,T){Hr(this,u,m,y,T)};function Ie(u,m){var y,T=u.G;if(T)for(y=[];T;T=T.G)y.push(T);if(u=u.M,T=m.type||m,typeof m=="string")m=new N(m,u);else if(m instanceof N)m.target=m.target||u;else{var L=m;m=new N(T,u),tt(m,L)}L=!0;let B,$;if(y)for($=y.length-1;$>=0;$--)B=m.g=y[$],L=ts(B,T,!0,m)&&L;if(B=m.g=u,L=ts(B,T,!0,m)&&L,L=ts(B,T,!1,m)&&L,y)for($=0;$<y.length;$++)B=m.g=y[$],L=ts(B,T,!1,m)&&L}ge.prototype.N=function(){if(ge.Z.N.call(this),this.i){var u=this.i;for(const m in u.g){const y=u.g[m];for(let T=0;T<y.length;T++)lt(y[T]);delete u.g[m],u.h--}}this.G=null},ge.prototype.J=function(u,m,y,T){return this.i.add(String(u),m,!1,y,T)},ge.prototype.K=function(u,m,y,T){return this.i.add(String(u),m,!0,y,T)};function ts(u,m,y,T){if(m=u.i.g[String(m)],!m)return!0;m=m.concat();let L=!0;for(let B=0;B<m.length;++B){const $=m[B];if($&&!$.da&&$.capture==y){const Et=$.listener,he=$.ha||$.src;$.fa&&gt(u.i,$),L=Et.call(he,T)!==!1&&L}}return L&&!T.defaultPrevented}function gh(u,m){if(typeof u!="function")if(u&&typeof u.handleEvent=="function")u=v(u.handleEvent,u);else throw Error("Invalid listener argument");return Number(m)>2147483647?-1:d.setTimeout(u,m||0)}function zl(u){u.g=gh(()=>{u.g=null,u.i&&(u.i=!1,zl(u))},u.l);const m=u.h;u.h=null,u.m.apply(null,m)}class $e extends M{constructor(m,y){super(),this.m=m,this.l=y,this.h=null,this.i=!1,this.g=null}j(m){this.h=arguments,this.g?this.i=!0:zl(this)}N(){super.N(),this.g&&(d.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Ws(u){M.call(this),this.h=u,this.g={}}S(Ws,M);var ao=[];function oo(u){Lt(u.g,function(m,y){this.g.hasOwnProperty(y)&&jr(m)},u),u.g={}}Ws.prototype.N=function(){Ws.Z.N.call(this),oo(this)},Ws.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var es=d.JSON.stringify,ph=d.JSON.parse,Bl=class{stringify(u){return d.JSON.stringify(u,void 0)}parse(u){return d.JSON.parse(u,void 0)}};function ql(){}function Hl(){}var kn={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function xe(){N.call(this,"d")}S(xe,N);function _n(){N.call(this,"c")}S(_n,N);var ce={},jl=null;function Gr(){return jl=jl||new ge}ce.Ia="serverreachability";function Gl(u){N.call(this,ce.Ia,u)}S(Gl,N);function Zn(u){const m=Gr();Ie(m,new Gl(m))}ce.STAT_EVENT="statevent";function tr(u,m){N.call(this,ce.STAT_EVENT,u),this.stat=m}S(tr,N);function pe(u){const m=Gr();Ie(m,new tr(m,u))}ce.Ja="timingevent";function $n(u,m){N.call(this,ce.Ja,u),this.size=m}S($n,N);function Jn(u,m){if(typeof u!="function")throw Error("Fn must not be null and must be a function");return d.setTimeout(function(){u()},m)}function Un(){this.g=!0}Un.prototype.ua=function(){this.g=!1};function yh(u,m,y,T,L,B){u.info(function(){if(u.g)if(B){var $="",Et=B.split("&");for(let Bt=0;Bt<Et.length;Bt++){var he=Et[Bt].split("=");if(he.length>1){const se=he[0];he=he[1];const An=se.split("_");$=An.length>=2&&An[1]=="type"?$+(se+"="+he+"&"):$+(se+"=redacted&")}}}else $=null;else $=B;return"XMLHTTP REQ ("+T+") [attempt "+L+"]: "+m+`
`+y+`
`+$})}function Fl(u,m,y,T,L,B,$){u.info(function(){return"XMLHTTP RESP ("+T+") [ attempt "+L+"]: "+m+`
`+y+`
`+B+" "+$})}function Wn(u,m,y,T){u.info(function(){return"XMLHTTP TEXT ("+m+"): "+_h(u,y)+(T?" "+T:"")})}function er(u,m){u.info(function(){return"TIMEOUT: "+m})}Un.prototype.info=function(){};function _h(u,m){if(!u.g)return m;if(!m)return null;try{const B=JSON.parse(m);if(B){for(u=0;u<B.length;u++)if(Array.isArray(B[u])){var y=B[u];if(!(y.length<2)){var T=y[1];if(Array.isArray(T)&&!(T.length<1)){var L=T[0];if(L!="noop"&&L!="stop"&&L!="close")for(let $=1;$<T.length;$++)T[$]=""}}}}return es(B)}catch{return m}}var nr={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},lo={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},uo;function ir(){}S(ir,ql),ir.prototype.g=function(){return new XMLHttpRequest},uo=new ir;function wi(u){return encodeURIComponent(String(u))}function Ql(u){var m=1;u=u.split(":");const y=[];for(;m>0&&u.length;)y.push(u.shift()),m--;return u.length&&y.push(u.join(":")),y}function Ln(u,m,y,T){this.j=u,this.i=m,this.l=y,this.S=T||1,this.V=new Ws(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new xn}function xn(){this.i=null,this.g="",this.h=!1}var ye={},Me={};function ti(u,m,y){u.M=1,u.A=sr(ve(m)),u.u=y,u.R=!0,Fr(u,null)}function Fr(u,m){u.F=Date.now(),ei(u),u.B=ve(u.A);var y=u.B,T=u.S;Array.isArray(T)||(T=[String(T)]),Xr(y.i,"t",T),u.C=0,y=u.j.L,u.h=new xn,u.g=ou(u.j,y?m:null,!u.u),u.P>0&&(u.O=new $e(v(u.Y,u,u.g),u.P)),m=u.V,y=u.g,T=u.ba;var L="readystatechange";Array.isArray(L)||(L&&(ao[0]=L.toString()),L=ao);for(let B=0;B<L.length;B++){const $=ie(y,L[B],T||m.handleEvent,!1,m.h||m);if(!$)break;m.g[$.key]=$}m=u.J?O(u.J):{},u.u?(u.v||(u.v="POST"),m["Content-Type"]="application/x-www-form-urlencoded",u.g.ea(u.B,u.v,u.u,m)):(u.v="GET",u.g.ea(u.B,u.v,null,m)),Zn(),yh(u.i,u.v,u.B,u.l,u.S,u.u)}Ln.prototype.ba=function(u){u=u.target;const m=this.O;m&&Bn(u)==3?m.j():this.Y(u)},Ln.prototype.Y=function(u){try{if(u==this.g)t:{const Et=Bn(this.g),he=this.g.ya(),Bt=this.g.ca();if(!(Et<3)&&(Et!=3||this.g&&(this.h.h||this.g.la()||Pe(this.g)))){this.K||Et!=4||he==7||(he==8||Bt<=0?Zn(3):Zn(2)),ni(this);var m=this.g.ca();this.X=m;var y=vh(this);if(this.o=m==200,Fl(this.i,this.v,this.B,this.l,this.S,Et,m),this.o){if(this.U&&!this.L){e:{if(this.g){var T,L=this.g;if((T=L.g?L.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!R(T)){var B=T;break e}}B=null}if(u=B)Wn(this.i,this.l,u,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,ii(this,u);else{this.o=!1,this.m=3,pe(12),un(this),vn(this);break t}}if(this.R){u=!0;let se;for(;!this.K&&this.C<y.length;)if(se=Yl(this,y),se==Me){Et==4&&(this.m=4,pe(14),u=!1),Wn(this.i,this.l,null,"[Incomplete Response]");break}else if(se==ye){this.m=4,pe(15),Wn(this.i,this.l,y,"[Invalid Chunk]"),u=!1;break}else Wn(this.i,this.l,se,null),ii(this,se);if(Kl(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Et!=4||y.length!=0||this.h.h||(this.m=1,pe(16),u=!1),this.o=this.o&&u,!u)Wn(this.i,this.l,y,"[Invalid Chunked Response]"),un(this),vn(this);else if(y.length>0&&!this.W){this.W=!0;var $=this.j;$.g==this&&$.aa&&!$.P&&($.j.info("Great, no buffering proxy detected. Bytes received: "+y.length),Ro($),$.P=!0,pe(11))}}else Wn(this.i,this.l,y,null),ii(this,y);Et==4&&un(this),this.o&&!this.K&&(Et==4?iu(this.j,this):(this.o=!1,ei(this)))}else Ii(this.g),m==400&&y.indexOf("Unknown SID")>0?(this.m=3,pe(12)):(this.m=0,pe(13)),un(this),vn(this)}}}catch{}finally{}};function vh(u){if(!Kl(u))return u.g.la();const m=Pe(u.g);if(m==="")return"";let y="";const T=m.length,L=Bn(u.g)==4;if(!u.h.i){if(typeof TextDecoder>"u")return un(u),vn(u),"";u.h.i=new d.TextDecoder}for(let B=0;B<T;B++)u.h.h=!0,y+=u.h.i.decode(m[B],{stream:!(L&&B==T-1)});return m.length=0,u.h.g+=y,u.C=0,u.h.g}function Kl(u){return u.g?u.v=="GET"&&u.M!=2&&u.j.Aa:!1}function Yl(u,m){var y=u.C,T=m.indexOf(`
`,y);return T==-1?Me:(y=Number(m.substring(y,T)),isNaN(y)?ye:(T+=1,T+y>m.length?Me:(m=m.slice(T,T+y),u.C=T+y,m)))}Ln.prototype.cancel=function(){this.K=!0,un(this)};function ei(u){u.T=Date.now()+u.H,Qr(u,u.H)}function Qr(u,m){if(u.D!=null)throw Error("WatchDog timer not null");u.D=Jn(v(u.aa,u),m)}function ni(u){u.D&&(d.clearTimeout(u.D),u.D=null)}Ln.prototype.aa=function(){this.D=null;const u=Date.now();u-this.T>=0?(er(this.i,this.B),this.M!=2&&(Zn(),pe(17)),un(this),this.m=2,vn(this)):Qr(this,this.T-u)};function vn(u){u.j.I==0||u.K||iu(u.j,u)}function un(u){ni(u);var m=u.O;m&&typeof m.dispose=="function"&&m.dispose(),u.O=null,oo(u.V),u.g&&(m=u.g,u.g=null,m.abort(),m.dispose())}function ii(u,m){try{var y=u.j;if(y.I!=0&&(y.g==u||ri(y.h,u))){if(!u.L&&ri(y.h,u)&&y.I==3){try{var T=y.Ba.g.parse(m)}catch{T=null}if(Array.isArray(T)&&T.length==3){var L=T;if(L[0]==0){t:if(!y.v){if(y.g)if(y.g.F+3e3<u.F)ta(y),us(y);else break t;hr(y),pe(18)}}else y.xa=L[1],0<y.xa-y.K&&L[2]<37500&&y.F&&y.A==0&&!y.C&&(y.C=Jn(v(y.Va,y),6e3));si(y.h)<=1&&y.ta&&(y.ta=void 0)}else hi(y,11)}else if((u.L||y.g==u)&&ta(y),!R(m))for(L=y.Ba.g.parse(m),m=0;m<L.length;m++){let Bt=L[m];const se=Bt[0];if(!(se<=y.K))if(y.K=se,Bt=Bt[1],y.I==2)if(Bt[0]=="c"){y.M=Bt[1],y.ba=Bt[2];const An=Bt[3];An!=null&&(y.ka=An,y.j.info("VER="+y.ka));const fi=Bt[4];fi!=null&&(y.za=fi,y.j.info("SVER="+y.za));const qn=Bt[5];qn!=null&&typeof qn=="number"&&qn>0&&(T=1.5*qn,y.O=T,y.j.info("backChannelRequestTimeoutMs_="+T)),T=y;const Hn=u.g;if(Hn){const fr=Hn.g?Hn.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(fr){var B=T.h;B.g||fr.indexOf("spdy")==-1&&fr.indexOf("quic")==-1&&fr.indexOf("h2")==-1||(B.j=B.l,B.g=new Set,B.h&&(fo(B,B.h),B.h=null))}if(T.G){const ea=Hn.g?Hn.g.getResponseHeader("X-HTTP-Session-Id"):null;ea&&(T.wa=ea,Gt(T.J,T.G,ea))}}y.I=3,y.l&&y.l.ra(),y.aa&&(y.T=Date.now()-u.F,y.j.info("Handshake RTT: "+y.T+"ms")),T=y;var $=u;if(T.na=au(T,T.L?T.ba:null,T.W),$.L){mo(T.h,$);var Et=$,he=T.O;he&&(Et.H=he),Et.D&&(ni(Et),ei(Et)),T.g=$}else eu(T);y.i.length>0&&ci(y)}else Bt[0]!="stop"&&Bt[0]!="close"||hi(y,7);else y.I==3&&(Bt[0]=="stop"||Bt[0]=="close"?Bt[0]=="stop"?hi(y,7):So(y):Bt[0]!="noop"&&y.l&&y.l.qa(Bt),y.A=0)}}Zn(4)}catch{}}var _e=class{constructor(u,m){this.g=u,this.map=m}};function co(u){this.l=u||10,d.PerformanceNavigationTiming?(u=d.performance.getEntriesByType("navigation"),u=u.length>0&&(u[0].nextHopProtocol=="hq"||u[0].nextHopProtocol=="h2")):u=!!(d.chrome&&d.chrome.loadTimes&&d.chrome.loadTimes()&&d.chrome.loadTimes().wasFetchedViaSpdy),this.j=u?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function ho(u){return u.h?!0:u.g?u.g.size>=u.j:!1}function si(u){return u.h?1:u.g?u.g.size:0}function ri(u,m){return u.h?u.h==m:u.g?u.g.has(m):!1}function fo(u,m){u.g?u.g.add(m):u.h=m}function mo(u,m){u.h&&u.h==m?u.h=null:u.g&&u.g.has(m)&&u.g.delete(m)}co.prototype.cancel=function(){if(this.i=go(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const u of this.g.values())u.cancel();this.g.clear()}};function go(u){if(u.h!=null)return u.i.concat(u.h.G);if(u.g!=null&&u.g.size!==0){let m=u.i;for(const y of u.g.values())m=m.concat(y.G);return m}return F(u.i)}var Xl=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Kr(u,m){if(u){u=u.split("&");for(let y=0;y<u.length;y++){const T=u[y].indexOf("=");let L,B=null;T>=0?(L=u[y].substring(0,T),B=u[y].substring(T+1)):L=u[y],m(L,B?decodeURIComponent(B.replace(/\+/g," ")):"")}}}function cn(u){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let m;u instanceof cn?(this.l=u.l,Ve(this,u.j),this.o=u.o,this.g=u.g,ns(this,u.u),this.h=u.h,po(this,Wl(u.i)),this.m=u.m):u&&(m=String(u).match(Xl))?(this.l=!1,Ve(this,m[1]||"",!0),this.o=ai(m[2]||""),this.g=ai(m[3]||"",!0),ns(this,m[4]),this.h=ai(m[5]||"",!0),po(this,m[6]||"",!0),this.m=ai(m[7]||"")):(this.l=!1,this.i=new ss(null,this.l))}cn.prototype.toString=function(){const u=[];var m=this.j;m&&u.push(rr(m,Yr,!0),":");var y=this.g;return(y||m=="file")&&(u.push("//"),(m=this.o)&&u.push(rr(m,Yr,!0),"@"),u.push(wi(y).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),y=this.u,y!=null&&u.push(":",String(y))),(y=this.h)&&(this.g&&y.charAt(0)!="/"&&u.push("/"),u.push(rr(y,y.charAt(0)=="/"?yo:Zl,!0))),(y=this.i.toString())&&u.push("?",y),(y=this.m)&&u.push("#",rr(y,$l)),u.join("")},cn.prototype.resolve=function(u){const m=ve(this);let y=!!u.j;y?Ve(m,u.j):y=!!u.o,y?m.o=u.o:y=!!u.g,y?m.g=u.g:y=u.u!=null;var T=u.h;if(y)ns(m,u.u);else if(y=!!u.h){if(T.charAt(0)!="/")if(this.g&&!this.h)T="/"+T;else{var L=m.h.lastIndexOf("/");L!=-1&&(T=m.h.slice(0,L+1)+T)}if(L=T,L==".."||L==".")T="";else if(L.indexOf("./")!=-1||L.indexOf("/.")!=-1){T=L.lastIndexOf("/",0)==0,L=L.split("/");const B=[];for(let $=0;$<L.length;){const Et=L[$++];Et=="."?T&&$==L.length&&B.push(""):Et==".."?((B.length>1||B.length==1&&B[0]!="")&&B.pop(),T&&$==L.length&&B.push("")):(B.push(Et),T=!0)}T=B.join("/")}else T=L}return y?m.h=T:y=u.i.toString()!=="",y?po(m,Wl(u.i)):y=!!u.m,y&&(m.m=u.m),m};function ve(u){return new cn(u)}function Ve(u,m,y){u.j=y?ai(m,!0):m,u.j&&(u.j=u.j.replace(/:$/,""))}function ns(u,m){if(m){if(m=Number(m),isNaN(m)||m<0)throw Error("Bad port number "+m);u.u=m}else u.u=null}function po(u,m,y){m instanceof ss?(u.i=m,Zr(u.i,u.l)):(y||(m=rr(m,is)),u.i=new ss(m,u.l))}function Gt(u,m,y){u.i.set(m,y)}function sr(u){return Gt(u,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),u}function ai(u,m){return u?m?decodeURI(u.replace(/%25/g,"%2525")):decodeURIComponent(u):""}function rr(u,m,y){return typeof u=="string"?(u=encodeURI(u).replace(m,tn),y&&(u=u.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),u):null}function tn(u){return u=u.charCodeAt(0),"%"+(u>>4&15).toString(16)+(u&15).toString(16)}var Yr=/[#\/\?@]/g,Zl=/[#\?:]/g,yo=/[#\?]/g,is=/[#\?@]/g,$l=/#/g;function ss(u,m){this.h=this.g=null,this.i=u||null,this.j=!!m}function en(u){u.g||(u.g=new Map,u.h=0,u.i&&Kr(u.i,function(m,y){u.add(decodeURIComponent(m.replace(/\+/g," ")),y)}))}a=ss.prototype,a.add=function(u,m){en(this),this.i=null,u=rs(this,u);let y=this.g.get(u);return y||this.g.set(u,y=[]),y.push(m),this.h+=1,this};function Jl(u,m){en(u),m=rs(u,m),u.g.has(m)&&(u.i=null,u.h-=u.g.get(m).length,u.g.delete(m))}function _o(u,m){return en(u),m=rs(u,m),u.g.has(m)}a.forEach=function(u,m){en(this),this.g.forEach(function(y,T){y.forEach(function(L){u.call(m,L,T,this)},this)},this)};function vo(u,m){en(u);let y=[];if(typeof m=="string")_o(u,m)&&(y=y.concat(u.g.get(rs(u,m))));else for(u=Array.from(u.g.values()),m=0;m<u.length;m++)y=y.concat(u[m]);return y}a.set=function(u,m){return en(this),this.i=null,u=rs(this,u),_o(this,u)&&(this.h-=this.g.get(u).length),this.g.set(u,[m]),this.h+=1,this},a.get=function(u,m){return u?(u=vo(this,u),u.length>0?String(u[0]):m):m};function Xr(u,m,y){Jl(u,m),y.length>0&&(u.i=null,u.g.set(rs(u,m),F(y)),u.h+=y.length)}a.toString=function(){if(this.i)return this.i;if(!this.g)return"";const u=[],m=Array.from(this.g.keys());for(let T=0;T<m.length;T++){var y=m[T];const L=wi(y);y=vo(this,y);for(let B=0;B<y.length;B++){let $=L;y[B]!==""&&($+="="+wi(y[B])),u.push($)}}return this.i=u.join("&")};function Wl(u){const m=new ss;return m.i=u.i,u.g&&(m.g=new Map(u.g),m.h=u.h),m}function rs(u,m){return m=String(m),u.j&&(m=m.toLowerCase()),m}function Zr(u,m){m&&!u.j&&(en(u),u.i=null,u.g.forEach(function(y,T){const L=T.toLowerCase();T!=L&&(Jl(this,T),Xr(this,L,y))},u)),u.j=m}function Pn(u,m){const y=new Un;if(d.Image){const T=new Image;T.onload=A(En,y,"TestLoadImage: loaded",!0,m,T),T.onerror=A(En,y,"TestLoadImage: error",!1,m,T),T.onabort=A(En,y,"TestLoadImage: abort",!1,m,T),T.ontimeout=A(En,y,"TestLoadImage: timeout",!1,m,T),d.setTimeout(function(){T.ontimeout&&T.ontimeout()},1e4),T.src=u}else m(!1)}function Eo(u,m){const y=new Un,T=new AbortController,L=setTimeout(()=>{T.abort(),En(y,"TestPingServer: timeout",!1,m)},1e4);fetch(u,{signal:T.signal}).then(B=>{clearTimeout(L),B.ok?En(y,"TestPingServer: ok",!0,m):En(y,"TestPingServer: server error",!1,m)}).catch(()=>{clearTimeout(L),En(y,"TestPingServer: error",!1,m)})}function En(u,m,y,T,L){try{L&&(L.onload=null,L.onerror=null,L.onabort=null,L.ontimeout=null),T(y)}catch{}}function as(){this.g=new Bl}function oi(u){this.i=u.Sb||null,this.h=u.ab||!1}S(oi,ql),oi.prototype.g=function(){return new ar(this.i,this.h)};function ar(u,m){ge.call(this),this.H=u,this.o=m,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}S(ar,ge),a=ar.prototype,a.open=function(u,m){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=u,this.D=m,this.readyState=1,zn(this)},a.send=function(u){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const m={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};u&&(m.body=u),(this.H||d).fetch(new Request(this.D,m)).then(this.Pa.bind(this),this.ga.bind(this))},a.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,os(this)),this.readyState=0},a.Pa=function(u){if(this.g&&(this.l=u,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=u.headers,this.readyState=2,zn(this)),this.g&&(this.readyState=3,zn(this),this.g)))if(this.responseType==="arraybuffer")u.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof d.ReadableStream<"u"&&"body"in u){if(this.j=u.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;$r(this)}else u.text().then(this.Oa.bind(this),this.ga.bind(this))};function $r(u){u.j.read().then(u.Ma.bind(u)).catch(u.ga.bind(u))}a.Ma=function(u){if(this.g){if(this.o&&u.value)this.response.push(u.value);else if(!this.o){var m=u.value?u.value:new Uint8Array(0);(m=this.B.decode(m,{stream:!u.done}))&&(this.response=this.responseText+=m)}u.done?os(this):zn(this),this.readyState==3&&$r(this)}},a.Oa=function(u){this.g&&(this.response=this.responseText=u,os(this))},a.Na=function(u){this.g&&(this.response=u,os(this))},a.ga=function(){this.g&&os(this)};function os(u){u.readyState=4,u.l=null,u.j=null,u.B=null,zn(u)}a.setRequestHeader=function(u,m){this.A.append(u,m)},a.getResponseHeader=function(u){return this.h&&this.h.get(u.toLowerCase())||""},a.getAllResponseHeaders=function(){if(!this.h)return"";const u=[],m=this.h.entries();for(var y=m.next();!y.done;)y=y.value,u.push(y[0]+": "+y[1]),y=m.next();return u.join(`\r
`)};function zn(u){u.onreadystatechange&&u.onreadystatechange.call(u)}Object.defineProperty(ar.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(u){this.m=u?"include":"same-origin"}});function Tn(u){let m="";return Lt(u,function(y,T){m+=T,m+=":",m+=y,m+=`\r
`}),m}function or(u,m,y){t:{for(T in y){var T=!1;break t}T=!0}T||(y=Tn(y),typeof u=="string"?y!=null&&wi(y):Gt(u,m,y))}function Kt(u){ge.call(this),this.headers=new Map,this.L=u||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}S(Kt,ge);var li=/^https?$/i,To=["POST","PUT"];a=Kt.prototype,a.Fa=function(u){this.H=u},a.ea=function(u,m,y,T){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+u);m=m?m.toUpperCase():"GET",this.D=u,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():uo.g(),this.g.onreadystatechange=k(v(this.Ca,this));try{this.B=!0,this.g.open(m,String(u),!0),this.B=!1}catch(B){lr(this,B);return}if(u=y||"",y=new Map(this.headers),T)if(Object.getPrototypeOf(T)===Object.prototype)for(var L in T)y.set(L,T[L]);else if(typeof T.keys=="function"&&typeof T.get=="function")for(const B of T.keys())y.set(B,T.get(B));else throw Error("Unknown input type for opt_headers: "+String(T));T=Array.from(y.keys()).find(B=>B.toLowerCase()=="content-type"),L=d.FormData&&u instanceof d.FormData,!(Array.prototype.indexOf.call(To,m,void 0)>=0)||T||L||y.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[B,$]of y)this.g.setRequestHeader(B,$);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(u),this.v=!1}catch(B){lr(this,B)}};function lr(u,m){u.h=!1,u.g&&(u.j=!0,u.g.abort(),u.j=!1),u.l=m,u.o=5,Ao(u),Ci(u)}function Ao(u){u.A||(u.A=!0,Ie(u,"complete"),Ie(u,"error"))}a.abort=function(u){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=u||7,Ie(this,"complete"),Ie(this,"abort"),Ci(this))},a.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ci(this,!0)),Kt.Z.N.call(this)},a.Ca=function(){this.u||(this.B||this.v||this.j?ur(this):this.Xa())},a.Xa=function(){ur(this)};function ur(u){if(u.h&&typeof c<"u"){if(u.v&&Bn(u)==4)setTimeout(u.Ca.bind(u),0);else if(Ie(u,"readystatechange"),Bn(u)==4){u.h=!1;try{const B=u.ca();t:switch(B){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var m=!0;break t;default:m=!1}var y;if(!(y=m)){var T;if(T=B===0){let $=String(u.D).match(Xl)[1]||null;!$&&d.self&&d.self.location&&($=d.self.location.protocol.slice(0,-1)),T=!li.test($?$.toLowerCase():"")}y=T}if(y)Ie(u,"complete"),Ie(u,"success");else{u.o=6;try{var L=Bn(u)>2?u.g.statusText:""}catch{L=""}u.l=L+" ["+u.ca()+"]",Ao(u)}}finally{Ci(u)}}}}function Ci(u,m){if(u.g){u.m&&(clearTimeout(u.m),u.m=null);const y=u.g;u.g=null,m||Ie(u,"ready");try{y.onreadystatechange=null}catch{}}}a.isActive=function(){return!!this.g};function Bn(u){return u.g?u.g.readyState:0}a.ca=function(){try{return Bn(this)>2?this.g.status:-1}catch{return-1}},a.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},a.La=function(u){if(this.g){var m=this.g.responseText;return u&&m.indexOf(u)==0&&(m=m.substring(u.length)),ph(m)}};function Pe(u){try{if(!u.g)return null;if("response"in u.g)return u.g.response;switch(u.F){case"":case"text":return u.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in u.g)return u.g.mozResponseArrayBuffer}return null}catch{return null}}function Ii(u){const m={};u=(u.g&&Bn(u)>=2&&u.g.getAllResponseHeaders()||"").split(`\r
`);for(let T=0;T<u.length;T++){if(R(u[T]))continue;var y=Ql(u[T]);const L=y[0];if(y=y[1],typeof y!="string")continue;y=y.trim();const B=m[L]||[];m[L]=B,B.push(y)}jt(m,function(T){return T.join(", ")})}a.ya=function(){return this.o},a.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function ui(u,m,y){return y&&y.internalChannelParams&&y.internalChannelParams[u]||m}function ls(u){this.za=0,this.i=[],this.j=new Un,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=ui("failFast",!1,u),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=ui("baseRetryDelayMs",5e3,u),this.Za=ui("retryDelaySeedMs",1e4,u),this.Ta=ui("forwardChannelMaxRetries",2,u),this.va=ui("forwardChannelRequestTimeoutMs",2e4,u),this.ma=u&&u.xmlHttpFactory||void 0,this.Ua=u&&u.Rb||void 0,this.Aa=u&&u.useFetchStreams||!1,this.O=void 0,this.L=u&&u.supportsCrossDomainXhr||!1,this.M="",this.h=new co(u&&u.concurrentRequestLimit),this.Ba=new as,this.S=u&&u.fastHandshake||!1,this.R=u&&u.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=u&&u.Pb||!1,u&&u.ua&&this.j.ua(),u&&u.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&u&&u.detectBufferingProxy||!1,this.ia=void 0,u&&u.longPollingTimeout&&u.longPollingTimeout>0&&(this.ia=u.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}a=ls.prototype,a.ka=8,a.I=1,a.connect=function(u,m,y,T){pe(0),this.W=u,this.H=m||{},y&&T!==void 0&&(this.H.OSID=y,this.H.OAID=T),this.F=this.X,this.J=au(this,null,this.W),ci(this)};function So(u){if(Jr(u),u.I==3){var m=u.V++,y=ve(u.J);if(Gt(y,"SID",u.M),Gt(y,"RID",m),Gt(y,"TYPE","terminate"),cr(u,y),m=new Ln(u,u.j,m),m.M=2,m.A=sr(ve(y)),y=!1,d.navigator&&d.navigator.sendBeacon)try{y=d.navigator.sendBeacon(m.A.toString(),"")}catch{}!y&&d.Image&&(new Image().src=m.A,y=!0),y||(m.g=ou(m.j,null),m.g.ea(m.A)),m.F=Date.now(),ei(m)}ru(u)}function us(u){u.g&&(Ro(u),u.g.cancel(),u.g=null)}function Jr(u){us(u),u.v&&(d.clearTimeout(u.v),u.v=null),ta(u),u.h.cancel(),u.m&&(typeof u.m=="number"&&d.clearTimeout(u.m),u.m=null)}function ci(u){if(!ho(u.h)&&!u.m){u.m=!0;var m=u.Ea;ee||b(),Vt||(ee(),Vt=!0),I.add(m,u),u.D=0}}function Wr(u,m){return si(u.h)>=u.h.j-(u.m?1:0)?!1:u.m?(u.i=m.G.concat(u.i),!0):u.I==1||u.I==2||u.D>=(u.Sa?0:u.Ta)?!1:(u.m=Jn(v(u.Ea,u,m),su(u,u.D)),u.D++,!0)}a.Ea=function(u){if(this.m)if(this.m=null,this.I==1){if(!u){this.V=Math.floor(Math.random()*1e5),u=this.V++;const L=new Ln(this,this.j,u);let B=this.o;if(this.U&&(B?(B=O(B),tt(B,this.U)):B=this.U),this.u!==null||this.R||(L.J=B,B=null),this.S)t:{for(var m=0,y=0;y<this.i.length;y++){e:{var T=this.i[y];if("__data__"in T.map&&(T=T.map.__data__,typeof T=="string")){T=T.length;break e}T=void 0}if(T===void 0)break;if(m+=T,m>4096){m=y;break t}if(m===4096||y===this.i.length-1){m=y+1;break t}}m=1e3}else m=1e3;m=tu(this,L,m),y=ve(this.J),Gt(y,"RID",u),Gt(y,"CVER",22),this.G&&Gt(y,"X-HTTP-Session-Id",this.G),cr(this,y),B&&(this.R?m="headers="+wi(Tn(B))+"&"+m:this.u&&or(y,this.u,B)),fo(this.h,L),this.Ra&&Gt(y,"TYPE","init"),this.S?(Gt(y,"$req",m),Gt(y,"SID","null"),L.U=!0,ti(L,y,null)):ti(L,y,m),this.I=2}}else this.I==3&&(u?bo(this,u):this.i.length==0||ho(this.h)||bo(this))};function bo(u,m){var y;m?y=m.l:y=u.V++;const T=ve(u.J);Gt(T,"SID",u.M),Gt(T,"RID",y),Gt(T,"AID",u.K),cr(u,T),u.u&&u.o&&or(T,u.u,u.o),y=new Ln(u,u.j,y,u.D+1),u.u===null&&(y.J=u.o),m&&(u.i=m.G.concat(u.i)),m=tu(u,y,1e3),y.H=Math.round(u.va*.5)+Math.round(u.va*.5*Math.random()),fo(u.h,y),ti(y,T,m)}function cr(u,m){u.H&&Lt(u.H,function(y,T){Gt(m,T,y)}),u.l&&Lt({},function(y,T){Gt(m,T,y)})}function tu(u,m,y){y=Math.min(u.i.length,y);const T=u.l?v(u.l.Ka,u.l,u):null;t:{var L=u.i;let Et=-1;for(;;){const he=["count="+y];Et==-1?y>0?(Et=L[0].g,he.push("ofs="+Et)):Et=0:he.push("ofs="+Et);let Bt=!0;for(let se=0;se<y;se++){var B=L[se].g;const An=L[se].map;if(B-=Et,B<0)Et=Math.max(0,L[se].g-100),Bt=!1;else try{B="req"+B+"_"||"";try{var $=An instanceof Map?An:Object.entries(An);for(const[fi,qn]of $){let Hn=qn;p(qn)&&(Hn=es(qn)),he.push(B+fi+"="+encodeURIComponent(Hn))}}catch(fi){throw he.push(B+"type="+encodeURIComponent("_badmap")),fi}}catch{T&&T(An)}}if(Bt){$=he.join("&");break t}}$=void 0}return u=u.i.splice(0,y),m.G=u,$}function eu(u){if(!u.g&&!u.v){u.Y=1;var m=u.Da;ee||b(),Vt||(ee(),Vt=!0),I.add(m,u),u.A=0}}function hr(u){return u.g||u.v||u.A>=3?!1:(u.Y++,u.v=Jn(v(u.Da,u),su(u,u.A)),u.A++,!0)}a.Da=function(){if(this.v=null,nu(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var u=4*this.T;this.j.info("BP detection timer enabled: "+u),this.B=Jn(v(this.Wa,this),u)}},a.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,pe(10),us(this),nu(this))};function Ro(u){u.B!=null&&(d.clearTimeout(u.B),u.B=null)}function nu(u){u.g=new Ln(u,u.j,"rpc",u.Y),u.u===null&&(u.g.J=u.o),u.g.P=0;var m=ve(u.na);Gt(m,"RID","rpc"),Gt(m,"SID",u.M),Gt(m,"AID",u.K),Gt(m,"CI",u.F?"0":"1"),!u.F&&u.ia&&Gt(m,"TO",u.ia),Gt(m,"TYPE","xmlhttp"),cr(u,m),u.u&&u.o&&or(m,u.u,u.o),u.O&&(u.g.H=u.O);var y=u.g;u=u.ba,y.M=1,y.A=sr(ve(m)),y.u=null,y.R=!0,Fr(y,u)}a.Va=function(){this.C!=null&&(this.C=null,us(this),hr(this),pe(19))};function ta(u){u.C!=null&&(d.clearTimeout(u.C),u.C=null)}function iu(u,m){var y=null;if(u.g==m){ta(u),Ro(u),u.g=null;var T=2}else if(ri(u.h,m))y=m.G,mo(u.h,m),T=1;else return;if(u.I!=0){if(m.o)if(T==1){y=m.u?m.u.length:0,m=Date.now()-m.F;var L=u.D;T=Gr(),Ie(T,new $n(T,y)),ci(u)}else eu(u);else if(L=m.m,L==3||L==0&&m.X>0||!(T==1&&Wr(u,m)||T==2&&hr(u)))switch(y&&y.length>0&&(m=u.h,m.i=m.i.concat(y)),L){case 1:hi(u,5);break;case 4:hi(u,10);break;case 3:hi(u,6);break;default:hi(u,2)}}}function su(u,m){let y=u.Qa+Math.floor(Math.random()*u.Za);return u.isActive()||(y*=2),y*m}function hi(u,m){if(u.j.info("Error code "+m),m==2){var y=v(u.bb,u),T=u.Ua;const L=!T;T=new cn(T||"//www.google.com/images/cleardot.gif"),d.location&&d.location.protocol=="http"||Ve(T,"https"),sr(T),L?Pn(T.toString(),y):Eo(T.toString(),y)}else pe(2);u.I=0,u.l&&u.l.pa(m),ru(u),Jr(u)}a.bb=function(u){u?(this.j.info("Successfully pinged google.com"),pe(2)):(this.j.info("Failed to ping google.com"),pe(1))};function ru(u){if(u.I=0,u.ja=[],u.l){const m=go(u.h);(m.length!=0||u.i.length!=0)&&(J(u.ja,m),J(u.ja,u.i),u.h.i.length=0,F(u.i),u.i.length=0),u.l.oa()}}function au(u,m,y){var T=y instanceof cn?ve(y):new cn(y);if(T.g!="")m&&(T.g=m+"."+T.g),ns(T,T.u);else{var L=d.location;T=L.protocol,m=m?m+"."+L.hostname:L.hostname,L=+L.port;const B=new cn(null);T&&Ve(B,T),m&&(B.g=m),L&&ns(B,L),y&&(B.h=y),T=B}return y=u.G,m=u.wa,y&&m&&Gt(T,y,m),Gt(T,"VER",u.ka),cr(u,T),T}function ou(u,m,y){if(m&&!u.L)throw Error("Can't create secondary domain capable XhrIo object.");return m=u.Aa&&!u.ma?new Kt(new oi({ab:y})):new Kt(u.ma),m.Fa(u.L),m}a.isActive=function(){return!!this.l&&this.l.isActive(this)};function lu(){}a=lu.prototype,a.ra=function(){},a.qa=function(){},a.pa=function(){},a.oa=function(){},a.isActive=function(){return!0},a.Ka=function(){};function cs(){}cs.prototype.g=function(u,m){return new Je(u,m)};function Je(u,m){ge.call(this),this.g=new ls(m),this.l=u,this.h=m&&m.messageUrlParams||null,u=m&&m.messageHeaders||null,m&&m.clientProtocolHeaderRequired&&(u?u["X-Client-Protocol"]="webchannel":u={"X-Client-Protocol":"webchannel"}),this.g.o=u,u=m&&m.initMessageHeaders||null,m&&m.messageContentType&&(u?u["X-WebChannel-Content-Type"]=m.messageContentType:u={"X-WebChannel-Content-Type":m.messageContentType}),m&&m.sa&&(u?u["X-WebChannel-Client-Profile"]=m.sa:u={"X-WebChannel-Client-Profile":m.sa}),this.g.U=u,(u=m&&m.Qb)&&!R(u)&&(this.g.u=u),this.A=m&&m.supportsCrossDomainXhr||!1,this.v=m&&m.sendRawJson||!1,(m=m&&m.httpSessionIdParam)&&!R(m)&&(this.g.G=m,u=this.h,u!==null&&m in u&&(u=this.h,m in u&&delete u[m])),this.j=new Di(this)}S(Je,ge),Je.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Je.prototype.close=function(){So(this.g)},Je.prototype.o=function(u){var m=this.g;if(typeof u=="string"){var y={};y.__data__=u,u=y}else this.v&&(y={},y.__data__=es(u),u=y);m.i.push(new _e(m.Ya++,u)),m.I==3&&ci(m)},Je.prototype.N=function(){this.g.l=null,delete this.j,So(this.g),delete this.g,Je.Z.N.call(this)};function uu(u){xe.call(this),u.__headers__&&(this.headers=u.__headers__,this.statusCode=u.__status__,delete u.__headers__,delete u.__status__);var m=u.__sm__;if(m){t:{for(const y in m){u=y;break t}u=void 0}(this.i=u)&&(u=this.i,m=m!==null&&u in m?m[u]:void 0),this.data=m}else this.data=u}S(uu,xe);function cu(){_n.call(this),this.status=1}S(cu,_n);function Di(u){this.g=u}S(Di,lu),Di.prototype.ra=function(){Ie(this.g,"a")},Di.prototype.qa=function(u){Ie(this.g,new uu(u))},Di.prototype.pa=function(u){Ie(this.g,new cu)},Di.prototype.oa=function(){Ie(this.g,"b")},cs.prototype.createWebChannel=cs.prototype.g,Je.prototype.send=Je.prototype.o,Je.prototype.open=Je.prototype.m,Je.prototype.close=Je.prototype.close,c0=function(){return new cs},u0=function(){return Gr()},l0=ce,xd={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},nr.NO_ERROR=0,nr.TIMEOUT=8,nr.HTTP_ERROR=6,Ec=nr,lo.COMPLETE="complete",o0=lo,Hl.EventType=kn,kn.OPEN="a",kn.CLOSE="b",kn.ERROR="c",kn.MESSAGE="d",ge.prototype.listen=ge.prototype.J,cl=Hl,Kt.prototype.listenOnce=Kt.prototype.K,Kt.prototype.getLastError=Kt.prototype.Ha,Kt.prototype.getLastErrorCode=Kt.prototype.ya,Kt.prototype.getStatus=Kt.prototype.ca,Kt.prototype.getResponseJson=Kt.prototype.La,Kt.prototype.getResponseText=Kt.prototype.la,Kt.prototype.send=Kt.prototype.ea,Kt.prototype.setWithCredentials=Kt.prototype.Fa,a0=Kt}).apply(typeof mc<"u"?mc:typeof self<"u"?self:typeof window<"u"?window:{});const O_="@firebase/firestore",M_="4.9.3";/**
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
 */class Ye{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}Ye.UNAUTHENTICATED=new Ye(null),Ye.GOOGLE_CREDENTIALS=new Ye("google-credentials-uid"),Ye.FIRST_PARTY=new Ye("first-party-uid"),Ye.MOCK_USER=new Ye("mock-user");/**
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
 */let Ja="12.7.0";/**
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
 */const kr=new im("@firebase/firestore");function Oa(){return kr.logLevel}function nt(a,...t){if(kr.logLevel<=Dt.DEBUG){const i=t.map(am);kr.debug(`Firestore (${Ja}): ${a}`,...i)}}function Xi(a,...t){if(kr.logLevel<=Dt.ERROR){const i=t.map(am);kr.error(`Firestore (${Ja}): ${a}`,...i)}}function Ga(a,...t){if(kr.logLevel<=Dt.WARN){const i=t.map(am);kr.warn(`Firestore (${Ja}): ${a}`,...i)}}function am(a){if(typeof a=="string")return a;try{/**
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
*/return(function(i){return JSON.stringify(i)})(a)}catch{return a}}/**
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
 */function ft(a,t,i){let r="Unexpected state";typeof t=="string"?r=t:i=t,h0(a,r,i)}function h0(a,t,i){let r=`FIRESTORE (${Ja}) INTERNAL ASSERTION FAILED: ${t} (ID: ${a.toString(16)})`;if(i!==void 0)try{r+=" CONTEXT: "+JSON.stringify(i)}catch{r+=" CONTEXT: "+i}throw Xi(r),new Error(r)}function Ht(a,t,i,r){let l="Unexpected state";typeof i=="string"?l=i:r=i,a||h0(t,l,r)}function vt(a,t){return a}/**
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
 */const X={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class at extends Wi{constructor(t,i){super(t,i),this.code=t,this.message=i,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class Nr{constructor(){this.promise=new Promise(((t,i)=>{this.resolve=t,this.reject=i}))}}/**
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
 */class f0{constructor(t,i){this.user=i,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class C2{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,i){t.enqueueRetryable((()=>i(Ye.UNAUTHENTICATED)))}shutdown(){}}class I2{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,i){this.changeListener=i,t.enqueueRetryable((()=>i(this.token.user)))}shutdown(){this.changeListener=null}}class D2{constructor(t){this.t=t,this.currentUser=Ye.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,i){Ht(this.o===void 0,42304);let r=this.i;const l=_=>this.i!==r?(r=this.i,i(_)):Promise.resolve();let c=new Nr;this.o=()=>{this.i++,this.currentUser=this.u(),c.resolve(),c=new Nr,t.enqueueRetryable((()=>l(this.currentUser)))};const d=()=>{const _=c;t.enqueueRetryable((async()=>{await _.promise,await l(this.currentUser)}))},p=_=>{nt("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=_,this.o&&(this.auth.addAuthTokenListener(this.o),d())};this.t.onInit((_=>p(_))),setTimeout((()=>{if(!this.auth){const _=this.t.getImmediate({optional:!0});_?p(_):(nt("FirebaseAuthCredentialsProvider","Auth not yet detected"),c.resolve(),c=new Nr)}}),0),d()}getToken(){const t=this.i,i=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(i).then((r=>this.i!==t?(nt("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Ht(typeof r.accessToken=="string",31837,{l:r}),new f0(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return Ht(t===null||typeof t=="string",2055,{h:t}),new Ye(t)}}class N2{constructor(t,i,r){this.P=t,this.T=i,this.I=r,this.type="FirstParty",this.user=Ye.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const t=this.R();return t&&this.A.set("Authorization",t),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class O2{constructor(t,i,r){this.P=t,this.T=i,this.I=r}getToken(){return Promise.resolve(new N2(this.P,this.T,this.I))}start(t,i){t.enqueueRetryable((()=>i(Ye.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class V_{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class M2{constructor(t,i){this.V=i,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Qn(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,i){Ht(this.o===void 0,3512);const r=c=>{c.error!=null&&nt("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${c.error.message}`);const d=c.token!==this.m;return this.m=c.token,nt("FirebaseAppCheckTokenProvider",`Received ${d?"new":"existing"} token.`),d?i(c.token):Promise.resolve()};this.o=c=>{t.enqueueRetryable((()=>r(c)))};const l=c=>{nt("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=c,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((c=>l(c))),setTimeout((()=>{if(!this.appCheck){const c=this.V.getImmediate({optional:!0});c?l(c):nt("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new V_(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then((i=>i?(Ht(typeof i.token=="string",44558,{tokenResult:i}),this.m=i.token,new V_(i.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function V2(a){const t=typeof self<"u"&&(self.crypto||self.msCrypto),i=new Uint8Array(a);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(i);else for(let r=0;r<a;r++)i[r]=Math.floor(256*Math.random());return i}/**
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
 */class om{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",i=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const l=V2(40);for(let c=0;c<l.length;++c)r.length<20&&l[c]<i&&(r+=t.charAt(l[c]%62))}return r}}function Nt(a,t){return a<t?-1:a>t?1:0}function Pd(a,t){const i=Math.min(a.length,t.length);for(let r=0;r<i;r++){const l=a.charAt(r),c=t.charAt(r);if(l!==c)return Rd(l)===Rd(c)?Nt(l,c):Rd(l)?1:-1}return Nt(a.length,t.length)}const k2=55296,U2=57343;function Rd(a){const t=a.charCodeAt(0);return t>=k2&&t<=U2}function Fa(a,t,i){return a.length===t.length&&a.every(((r,l)=>i(r,t[l])))}/**
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
 */const k_="__name__";class yi{constructor(t,i,r){i===void 0?i=0:i>t.length&&ft(637,{offset:i,range:t.length}),r===void 0?r=t.length-i:r>t.length-i&&ft(1746,{length:r,range:t.length-i}),this.segments=t,this.offset=i,this.len=r}get length(){return this.len}isEqual(t){return yi.comparator(this,t)===0}child(t){const i=this.segments.slice(this.offset,this.limit());return t instanceof yi?t.forEach((r=>{i.push(r)})):i.push(t),this.construct(i)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let i=0;i<this.length;i++)if(this.get(i)!==t.get(i))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let i=0;i<this.length;i++)if(this.get(i)!==t.get(i))return!1;return!0}forEach(t){for(let i=this.offset,r=this.limit();i<r;i++)t(this.segments[i])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,i){const r=Math.min(t.length,i.length);for(let l=0;l<r;l++){const c=yi.compareSegments(t.get(l),i.get(l));if(c!==0)return c}return Nt(t.length,i.length)}static compareSegments(t,i){const r=yi.isNumericId(t),l=yi.isNumericId(i);return r&&!l?-1:!r&&l?1:r&&l?yi.extractNumericId(t).compare(yi.extractNumericId(i)):Pd(t,i)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return Hs.fromString(t.substring(4,t.length-2))}}class ae extends yi{construct(t,i,r){return new ae(t,i,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const i=[];for(const r of t){if(r.indexOf("//")>=0)throw new at(X.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);i.push(...r.split("/").filter((l=>l.length>0)))}return new ae(i)}static emptyPath(){return new ae([])}}const L2=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ge extends yi{construct(t,i,r){return new Ge(t,i,r)}static isValidIdentifier(t){return L2.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ge.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===k_}static keyField(){return new Ge([k_])}static fromServerFormat(t){const i=[];let r="",l=0;const c=()=>{if(r.length===0)throw new at(X.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);i.push(r),r=""};let d=!1;for(;l<t.length;){const p=t[l];if(p==="\\"){if(l+1===t.length)throw new at(X.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const _=t[l+1];if(_!=="\\"&&_!=="."&&_!=="`")throw new at(X.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=_,l+=2}else p==="`"?(d=!d,l++):p!=="."||d?(r+=p,l++):(c(),l++)}if(c(),d)throw new at(X.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new Ge(i)}static emptyPath(){return new Ge([])}}/**
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
 */class ut{constructor(t){this.path=t}static fromPath(t){return new ut(ae.fromString(t))}static fromName(t){return new ut(ae.fromString(t).popFirst(5))}static empty(){return new ut(ae.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&ae.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,i){return ae.comparator(t.path,i.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new ut(new ae(t.slice()))}}/**
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
 */function x2(a,t,i){if(!i)throw new at(X.INVALID_ARGUMENT,`Function ${a}() cannot be called with an empty ${t}.`)}function P2(a,t,i,r){if(t===!0&&r===!0)throw new at(X.INVALID_ARGUMENT,`${a} and ${i} cannot be used together.`)}function U_(a){if(!ut.isDocumentKey(a))throw new at(X.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${a} has ${a.length}.`)}function d0(a){return typeof a=="object"&&a!==null&&(Object.getPrototypeOf(a)===Object.prototype||Object.getPrototypeOf(a)===null)}function lm(a){if(a===void 0)return"undefined";if(a===null)return"null";if(typeof a=="string")return a.length>20&&(a=`${a.substring(0,20)}...`),JSON.stringify(a);if(typeof a=="number"||typeof a=="boolean")return""+a;if(typeof a=="object"){if(a instanceof Array)return"an array";{const t=(function(r){return r.constructor?r.constructor.name:null})(a);return t?`a custom ${t} object`:"an object"}}return typeof a=="function"?"a function":ft(12329,{type:typeof a})}function xa(a,t){if("_delegate"in a&&(a=a._delegate),!(a instanceof t)){if(t.name===a.constructor.name)throw new at(X.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const i=lm(a);throw new at(X.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${i}`)}}return a}/**
 * @license
 * Copyright 2025 Google LLC
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
 */function Re(a,t){const i={typeString:a};return t&&(i.value=t),i}function Ol(a,t){if(!d0(a))throw new at(X.INVALID_ARGUMENT,"JSON must be an object");let i;for(const r in t)if(t[r]){const l=t[r].typeString,c="value"in t[r]?{value:t[r].value}:void 0;if(!(r in a)){i=`JSON missing required field: '${r}'`;break}const d=a[r];if(l&&typeof d!==l){i=`JSON field '${r}' must be a ${l}.`;break}if(c!==void 0&&d!==c.value){i=`Expected '${r}' field to equal '${c.value}'`;break}}if(i)throw new at(X.INVALID_ARGUMENT,i);return!0}/**
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
 */const L_=-62135596800,x_=1e6;class te{static now(){return te.fromMillis(Date.now())}static fromDate(t){return te.fromMillis(t.getTime())}static fromMillis(t){const i=Math.floor(t/1e3),r=Math.floor((t-1e3*i)*x_);return new te(i,r)}constructor(t,i){if(this.seconds=t,this.nanoseconds=i,i<0)throw new at(X.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+i);if(i>=1e9)throw new at(X.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+i);if(t<L_)throw new at(X.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new at(X.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/x_}_compareTo(t){return this.seconds===t.seconds?Nt(this.nanoseconds,t.nanoseconds):Nt(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:te._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(Ol(t,te._jsonSchema))return new te(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-L_;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}te._jsonSchemaVersion="firestore/timestamp/1.0",te._jsonSchema={type:Re("string",te._jsonSchemaVersion),seconds:Re("number"),nanoseconds:Re("number")};/**
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
 */class pt{static fromTimestamp(t){return new pt(t)}static min(){return new pt(new te(0,0))}static max(){return new pt(new te(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
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
 */const Tl=-1;function z2(a,t){const i=a.toTimestamp().seconds,r=a.toTimestamp().nanoseconds+1,l=pt.fromTimestamp(r===1e9?new te(i+1,0):new te(i,r));return new Gs(l,ut.empty(),t)}function B2(a){return new Gs(a.readTime,a.key,Tl)}class Gs{constructor(t,i,r){this.readTime=t,this.documentKey=i,this.largestBatchId=r}static min(){return new Gs(pt.min(),ut.empty(),Tl)}static max(){return new Gs(pt.max(),ut.empty(),Tl)}}function q2(a,t){let i=a.readTime.compareTo(t.readTime);return i!==0?i:(i=ut.comparator(a.documentKey,t.documentKey),i!==0?i:Nt(a.largestBatchId,t.largestBatchId))}/**
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
 */const H2="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class j2{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((t=>t()))}}/**
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
 */async function Wa(a){if(a.code!==X.FAILED_PRECONDITION||a.message!==H2)throw a;nt("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class Y{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t((i=>{this.isDone=!0,this.result=i,this.nextCallback&&this.nextCallback(i)}),(i=>{this.isDone=!0,this.error=i,this.catchCallback&&this.catchCallback(i)}))}catch(t){return this.next(void 0,t)}next(t,i){return this.callbackAttached&&ft(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(i,this.error):this.wrapSuccess(t,this.result):new Y(((r,l)=>{this.nextCallback=c=>{this.wrapSuccess(t,c).next(r,l)},this.catchCallback=c=>{this.wrapFailure(i,c).next(r,l)}}))}toPromise(){return new Promise(((t,i)=>{this.next(t,i)}))}wrapUserFunction(t){try{const i=t();return i instanceof Y?i:Y.resolve(i)}catch(i){return Y.reject(i)}}wrapSuccess(t,i){return t?this.wrapUserFunction((()=>t(i))):Y.resolve(i)}wrapFailure(t,i){return t?this.wrapUserFunction((()=>t(i))):Y.reject(i)}static resolve(t){return new Y(((i,r)=>{i(t)}))}static reject(t){return new Y(((i,r)=>{r(t)}))}static waitFor(t){return new Y(((i,r)=>{let l=0,c=0,d=!1;t.forEach((p=>{++l,p.next((()=>{++c,d&&c===l&&i()}),(_=>r(_)))})),d=!0,c===l&&i()}))}static or(t){let i=Y.resolve(!1);for(const r of t)i=i.next((l=>l?Y.resolve(l):r()));return i}static forEach(t,i){const r=[];return t.forEach(((l,c)=>{r.push(i.call(this,l,c))})),this.waitFor(r)}static mapArray(t,i){return new Y(((r,l)=>{const c=t.length,d=new Array(c);let p=0;for(let _=0;_<c;_++){const v=_;i(t[v]).next((A=>{d[v]=A,++p,p===c&&r(d)}),(A=>l(A)))}}))}static doWhile(t,i){return new Y(((r,l)=>{const c=()=>{t()===!0?i().next((()=>{c()}),l):r()};c()}))}}function G2(a){const t=a.match(/Android ([\d.]+)/i),i=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(i)}function to(a){return a.name==="IndexedDbTransactionError"}/**
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
 */class Jc{constructor(t,i){this.previousValue=t,i&&(i.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>i.writeSequenceNumber(r))}ae(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ue&&this.ue(t),t}}Jc.ce=-1;/**
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
 */const um=-1;function Wc(a){return a==null}function Mc(a){return a===0&&1/a==-1/0}function F2(a){return typeof a=="number"&&Number.isInteger(a)&&!Mc(a)&&a<=Number.MAX_SAFE_INTEGER&&a>=Number.MIN_SAFE_INTEGER}/**
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
 */const m0="";function Q2(a){let t="";for(let i=0;i<a.length;i++)t.length>0&&(t=P_(t)),t=K2(a.get(i),t);return P_(t)}function K2(a,t){let i=t;const r=a.length;for(let l=0;l<r;l++){const c=a.charAt(l);switch(c){case"\0":i+="";break;case m0:i+="";break;default:i+=c}}return i}function P_(a){return a+m0+""}/**
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
 */function z_(a){let t=0;for(const i in a)Object.prototype.hasOwnProperty.call(a,i)&&t++;return t}function xr(a,t){for(const i in a)Object.prototype.hasOwnProperty.call(a,i)&&t(i,a[i])}function g0(a){for(const t in a)if(Object.prototype.hasOwnProperty.call(a,t))return!1;return!0}/**
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
 */class oe{constructor(t,i){this.comparator=t,this.root=i||je.EMPTY}insert(t,i){return new oe(this.comparator,this.root.insert(t,i,this.comparator).copy(null,null,je.BLACK,null,null))}remove(t){return new oe(this.comparator,this.root.remove(t,this.comparator).copy(null,null,je.BLACK,null,null))}get(t){let i=this.root;for(;!i.isEmpty();){const r=this.comparator(t,i.key);if(r===0)return i.value;r<0?i=i.left:r>0&&(i=i.right)}return null}indexOf(t){let i=0,r=this.root;for(;!r.isEmpty();){const l=this.comparator(t,r.key);if(l===0)return i+r.left.size;l<0?r=r.left:(i+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal(((i,r)=>(t(i,r),!1)))}toString(){const t=[];return this.inorderTraversal(((i,r)=>(t.push(`${i}:${r}`),!1))),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new gc(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new gc(this.root,t,this.comparator,!1)}getReverseIterator(){return new gc(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new gc(this.root,t,this.comparator,!0)}}class gc{constructor(t,i,r,l){this.isReverse=l,this.nodeStack=[];let c=1;for(;!t.isEmpty();)if(c=i?r(t.key,i):1,i&&l&&(c*=-1),c<0)t=this.isReverse?t.left:t.right;else{if(c===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const i={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return i}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class je{constructor(t,i,r,l,c){this.key=t,this.value=i,this.color=r??je.RED,this.left=l??je.EMPTY,this.right=c??je.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,i,r,l,c){return new je(t??this.key,i??this.value,r??this.color,l??this.left,c??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,i,r){let l=this;const c=r(t,l.key);return l=c<0?l.copy(null,null,null,l.left.insert(t,i,r),null):c===0?l.copy(null,i,null,null,null):l.copy(null,null,null,null,l.right.insert(t,i,r)),l.fixUp()}removeMin(){if(this.left.isEmpty())return je.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,i){let r,l=this;if(i(t,l.key)<0)l.left.isEmpty()||l.left.isRed()||l.left.left.isRed()||(l=l.moveRedLeft()),l=l.copy(null,null,null,l.left.remove(t,i),null);else{if(l.left.isRed()&&(l=l.rotateRight()),l.right.isEmpty()||l.right.isRed()||l.right.left.isRed()||(l=l.moveRedRight()),i(t,l.key)===0){if(l.right.isEmpty())return je.EMPTY;r=l.right.min(),l=l.copy(r.key,r.value,null,null,l.right.removeMin())}l=l.copy(null,null,null,null,l.right.remove(t,i))}return l.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,je.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,je.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),i=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,i)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw ft(43730,{key:this.key,value:this.value});if(this.right.isRed())throw ft(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw ft(27949);return t+(this.isRed()?0:1)}}je.EMPTY=null,je.RED=!0,je.BLACK=!1;je.EMPTY=new class{constructor(){this.size=0}get key(){throw ft(57766)}get value(){throw ft(16141)}get color(){throw ft(16727)}get left(){throw ft(29726)}get right(){throw ft(36894)}copy(t,i,r,l,c){return this}insert(t,i,r){return new je(t,i)}remove(t,i){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class Oe{constructor(t){this.comparator=t,this.data=new oe(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal(((i,r)=>(t(i),!1)))}forEachInRange(t,i){const r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){const l=r.getNext();if(this.comparator(l.key,t[1])>=0)return;i(l.key)}}forEachWhile(t,i){let r;for(r=i!==void 0?this.data.getIteratorFrom(i):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){const i=this.data.getIteratorFrom(t);return i.hasNext()?i.getNext().key:null}getIterator(){return new B_(this.data.getIterator())}getIteratorFrom(t){return new B_(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let i=this;return i.size<t.size&&(i=t,t=this),t.forEach((r=>{i=i.add(r)})),i}isEqual(t){if(!(t instanceof Oe)||this.size!==t.size)return!1;const i=this.data.getIterator(),r=t.data.getIterator();for(;i.hasNext();){const l=i.getNext().key,c=r.getNext().key;if(this.comparator(l,c)!==0)return!1}return!0}toArray(){const t=[];return this.forEach((i=>{t.push(i)})),t}toString(){const t=[];return this.forEach((i=>t.push(i))),"SortedSet("+t.toString()+")"}copy(t){const i=new Oe(this.comparator);return i.data=t,i}}class B_{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class Kn{constructor(t){this.fields=t,t.sort(Ge.comparator)}static empty(){return new Kn([])}unionWith(t){let i=new Oe(Ge.comparator);for(const r of this.fields)i=i.add(r);for(const r of t)i=i.add(r);return new Kn(i.toArray())}covers(t){for(const i of this.fields)if(i.isPrefixOf(t))return!0;return!1}isEqual(t){return Fa(this.fields,t.fields,((i,r)=>i.isEqual(r)))}}/**
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
 */class p0 extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class Fe{constructor(t){this.binaryString=t}static fromBase64String(t){const i=(function(l){try{return atob(l)}catch(c){throw typeof DOMException<"u"&&c instanceof DOMException?new p0("Invalid base64 string: "+c):c}})(t);return new Fe(i)}static fromUint8Array(t){const i=(function(l){let c="";for(let d=0;d<l.length;++d)c+=String.fromCharCode(l[d]);return c})(t);return new Fe(i)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(i){return btoa(i)})(this.binaryString)}toUint8Array(){return(function(i){const r=new Uint8Array(i.length);for(let l=0;l<i.length;l++)r[l]=i.charCodeAt(l);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return Nt(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}Fe.EMPTY_BYTE_STRING=new Fe("");const Y2=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Fs(a){if(Ht(!!a,39018),typeof a=="string"){let t=0;const i=Y2.exec(a);if(Ht(!!i,46558,{timestamp:a}),i[1]){let l=i[1];l=(l+"000000000").substr(0,9),t=Number(l)}const r=new Date(a);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:me(a.seconds),nanos:me(a.nanos)}}function me(a){return typeof a=="number"?a:typeof a=="string"?Number(a):0}function Qs(a){return typeof a=="string"?Fe.fromBase64String(a):Fe.fromUint8Array(a)}/**
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
 */const y0="server_timestamp",_0="__type__",v0="__previous_value__",E0="__local_write_time__";function cm(a){var i,r;return((r=(((i=a==null?void 0:a.mapValue)==null?void 0:i.fields)||{})[_0])==null?void 0:r.stringValue)===y0}function th(a){const t=a.mapValue.fields[v0];return cm(t)?th(t):t}function Al(a){const t=Fs(a.mapValue.fields[E0].timestampValue);return new te(t.seconds,t.nanos)}/**
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
 */class X2{constructor(t,i,r,l,c,d,p,_,v,A){this.databaseId=t,this.appId=i,this.persistenceKey=r,this.host=l,this.ssl=c,this.forceLongPolling=d,this.autoDetectLongPolling=p,this.longPollingOptions=_,this.useFetchStreams=v,this.isUsingEmulator=A}}const Vc="(default)";class Sl{constructor(t,i){this.projectId=t,this.database=i||Vc}static empty(){return new Sl("","")}get isDefaultDatabase(){return this.database===Vc}isEqual(t){return t instanceof Sl&&t.projectId===this.projectId&&t.database===this.database}}/**
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
 */const T0="__type__",Z2="__max__",pc={mapValue:{}},A0="__vector__",kc="value";function Ks(a){return"nullValue"in a?0:"booleanValue"in a?1:"integerValue"in a||"doubleValue"in a?2:"timestampValue"in a?3:"stringValue"in a?5:"bytesValue"in a?6:"referenceValue"in a?7:"geoPointValue"in a?8:"arrayValue"in a?9:"mapValue"in a?cm(a)?4:J2(a)?9007199254740991:$2(a)?10:11:ft(28295,{value:a})}function bi(a,t){if(a===t)return!0;const i=Ks(a);if(i!==Ks(t))return!1;switch(i){case 0:case 9007199254740991:return!0;case 1:return a.booleanValue===t.booleanValue;case 4:return Al(a).isEqual(Al(t));case 3:return(function(l,c){if(typeof l.timestampValue=="string"&&typeof c.timestampValue=="string"&&l.timestampValue.length===c.timestampValue.length)return l.timestampValue===c.timestampValue;const d=Fs(l.timestampValue),p=Fs(c.timestampValue);return d.seconds===p.seconds&&d.nanos===p.nanos})(a,t);case 5:return a.stringValue===t.stringValue;case 6:return(function(l,c){return Qs(l.bytesValue).isEqual(Qs(c.bytesValue))})(a,t);case 7:return a.referenceValue===t.referenceValue;case 8:return(function(l,c){return me(l.geoPointValue.latitude)===me(c.geoPointValue.latitude)&&me(l.geoPointValue.longitude)===me(c.geoPointValue.longitude)})(a,t);case 2:return(function(l,c){if("integerValue"in l&&"integerValue"in c)return me(l.integerValue)===me(c.integerValue);if("doubleValue"in l&&"doubleValue"in c){const d=me(l.doubleValue),p=me(c.doubleValue);return d===p?Mc(d)===Mc(p):isNaN(d)&&isNaN(p)}return!1})(a,t);case 9:return Fa(a.arrayValue.values||[],t.arrayValue.values||[],bi);case 10:case 11:return(function(l,c){const d=l.mapValue.fields||{},p=c.mapValue.fields||{};if(z_(d)!==z_(p))return!1;for(const _ in d)if(d.hasOwnProperty(_)&&(p[_]===void 0||!bi(d[_],p[_])))return!1;return!0})(a,t);default:return ft(52216,{left:a})}}function bl(a,t){return(a.values||[]).find((i=>bi(i,t)))!==void 0}function Qa(a,t){if(a===t)return 0;const i=Ks(a),r=Ks(t);if(i!==r)return Nt(i,r);switch(i){case 0:case 9007199254740991:return 0;case 1:return Nt(a.booleanValue,t.booleanValue);case 2:return(function(c,d){const p=me(c.integerValue||c.doubleValue),_=me(d.integerValue||d.doubleValue);return p<_?-1:p>_?1:p===_?0:isNaN(p)?isNaN(_)?0:-1:1})(a,t);case 3:return q_(a.timestampValue,t.timestampValue);case 4:return q_(Al(a),Al(t));case 5:return Pd(a.stringValue,t.stringValue);case 6:return(function(c,d){const p=Qs(c),_=Qs(d);return p.compareTo(_)})(a.bytesValue,t.bytesValue);case 7:return(function(c,d){const p=c.split("/"),_=d.split("/");for(let v=0;v<p.length&&v<_.length;v++){const A=Nt(p[v],_[v]);if(A!==0)return A}return Nt(p.length,_.length)})(a.referenceValue,t.referenceValue);case 8:return(function(c,d){const p=Nt(me(c.latitude),me(d.latitude));return p!==0?p:Nt(me(c.longitude),me(d.longitude))})(a.geoPointValue,t.geoPointValue);case 9:return H_(a.arrayValue,t.arrayValue);case 10:return(function(c,d){var k,F,J,et;const p=c.fields||{},_=d.fields||{},v=(k=p[kc])==null?void 0:k.arrayValue,A=(F=_[kc])==null?void 0:F.arrayValue,S=Nt(((J=v==null?void 0:v.values)==null?void 0:J.length)||0,((et=A==null?void 0:A.values)==null?void 0:et.length)||0);return S!==0?S:H_(v,A)})(a.mapValue,t.mapValue);case 11:return(function(c,d){if(c===pc.mapValue&&d===pc.mapValue)return 0;if(c===pc.mapValue)return 1;if(d===pc.mapValue)return-1;const p=c.fields||{},_=Object.keys(p),v=d.fields||{},A=Object.keys(v);_.sort(),A.sort();for(let S=0;S<_.length&&S<A.length;++S){const k=Pd(_[S],A[S]);if(k!==0)return k;const F=Qa(p[_[S]],v[A[S]]);if(F!==0)return F}return Nt(_.length,A.length)})(a.mapValue,t.mapValue);default:throw ft(23264,{he:i})}}function q_(a,t){if(typeof a=="string"&&typeof t=="string"&&a.length===t.length)return Nt(a,t);const i=Fs(a),r=Fs(t),l=Nt(i.seconds,r.seconds);return l!==0?l:Nt(i.nanos,r.nanos)}function H_(a,t){const i=a.values||[],r=t.values||[];for(let l=0;l<i.length&&l<r.length;++l){const c=Qa(i[l],r[l]);if(c)return c}return Nt(i.length,r.length)}function Ka(a){return zd(a)}function zd(a){return"nullValue"in a?"null":"booleanValue"in a?""+a.booleanValue:"integerValue"in a?""+a.integerValue:"doubleValue"in a?""+a.doubleValue:"timestampValue"in a?(function(i){const r=Fs(i);return`time(${r.seconds},${r.nanos})`})(a.timestampValue):"stringValue"in a?a.stringValue:"bytesValue"in a?(function(i){return Qs(i).toBase64()})(a.bytesValue):"referenceValue"in a?(function(i){return ut.fromName(i).toString()})(a.referenceValue):"geoPointValue"in a?(function(i){return`geo(${i.latitude},${i.longitude})`})(a.geoPointValue):"arrayValue"in a?(function(i){let r="[",l=!0;for(const c of i.values||[])l?l=!1:r+=",",r+=zd(c);return r+"]"})(a.arrayValue):"mapValue"in a?(function(i){const r=Object.keys(i.fields||{}).sort();let l="{",c=!0;for(const d of r)c?c=!1:l+=",",l+=`${d}:${zd(i.fields[d])}`;return l+"}"})(a.mapValue):ft(61005,{value:a})}function Tc(a){switch(Ks(a)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=th(a);return t?16+Tc(t):16;case 5:return 2*a.stringValue.length;case 6:return Qs(a.bytesValue).approximateByteSize();case 7:return a.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((l,c)=>l+Tc(c)),0)})(a.arrayValue);case 10:case 11:return(function(r){let l=0;return xr(r.fields,((c,d)=>{l+=c.length+Tc(d)})),l})(a.mapValue);default:throw ft(13486,{value:a})}}function Bd(a){return!!a&&"integerValue"in a}function hm(a){return!!a&&"arrayValue"in a}function j_(a){return!!a&&"nullValue"in a}function G_(a){return!!a&&"doubleValue"in a&&isNaN(Number(a.doubleValue))}function Ac(a){return!!a&&"mapValue"in a}function $2(a){var i,r;return((r=(((i=a==null?void 0:a.mapValue)==null?void 0:i.fields)||{})[T0])==null?void 0:r.stringValue)===A0}function gl(a){if(a.geoPointValue)return{geoPointValue:{...a.geoPointValue}};if(a.timestampValue&&typeof a.timestampValue=="object")return{timestampValue:{...a.timestampValue}};if(a.mapValue){const t={mapValue:{fields:{}}};return xr(a.mapValue.fields,((i,r)=>t.mapValue.fields[i]=gl(r))),t}if(a.arrayValue){const t={arrayValue:{values:[]}};for(let i=0;i<(a.arrayValue.values||[]).length;++i)t.arrayValue.values[i]=gl(a.arrayValue.values[i]);return t}return{...a}}function J2(a){return(((a.mapValue||{}).fields||{}).__type__||{}).stringValue===Z2}/**
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
 */class On{constructor(t){this.value=t}static empty(){return new On({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let i=this.value;for(let r=0;r<t.length-1;++r)if(i=(i.mapValue.fields||{})[t.get(r)],!Ac(i))return null;return i=(i.mapValue.fields||{})[t.lastSegment()],i||null}}set(t,i){this.getFieldsMap(t.popLast())[t.lastSegment()]=gl(i)}setAll(t){let i=Ge.emptyPath(),r={},l=[];t.forEach(((d,p)=>{if(!i.isImmediateParentOf(p)){const _=this.getFieldsMap(i);this.applyChanges(_,r,l),r={},l=[],i=p.popLast()}d?r[p.lastSegment()]=gl(d):l.push(p.lastSegment())}));const c=this.getFieldsMap(i);this.applyChanges(c,r,l)}delete(t){const i=this.field(t.popLast());Ac(i)&&i.mapValue.fields&&delete i.mapValue.fields[t.lastSegment()]}isEqual(t){return bi(this.value,t.value)}getFieldsMap(t){let i=this.value;i.mapValue.fields||(i.mapValue={fields:{}});for(let r=0;r<t.length;++r){let l=i.mapValue.fields[t.get(r)];Ac(l)&&l.mapValue.fields||(l={mapValue:{fields:{}}},i.mapValue.fields[t.get(r)]=l),i=l}return i.mapValue.fields}applyChanges(t,i,r){xr(i,((l,c)=>t[l]=c));for(const l of r)delete t[l]}clone(){return new On(gl(this.value))}}function S0(a){const t=[];return xr(a.fields,((i,r)=>{const l=new Ge([i]);if(Ac(r)){const c=S0(r.mapValue).fields;if(c.length===0)t.push(l);else for(const d of c)t.push(l.child(d))}else t.push(l)})),new Kn(t)}/**
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
 */class Xe{constructor(t,i,r,l,c,d,p){this.key=t,this.documentType=i,this.version=r,this.readTime=l,this.createTime=c,this.data=d,this.documentState=p}static newInvalidDocument(t){return new Xe(t,0,pt.min(),pt.min(),pt.min(),On.empty(),0)}static newFoundDocument(t,i,r,l){return new Xe(t,1,i,pt.min(),r,l,0)}static newNoDocument(t,i){return new Xe(t,2,i,pt.min(),pt.min(),On.empty(),0)}static newUnknownDocument(t,i){return new Xe(t,3,i,pt.min(),pt.min(),On.empty(),2)}convertToFoundDocument(t,i){return!this.createTime.isEqual(pt.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=i,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=On.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=On.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=pt.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof Xe&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new Xe(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class Uc{constructor(t,i){this.position=t,this.inclusive=i}}function F_(a,t,i){let r=0;for(let l=0;l<a.position.length;l++){const c=t[l],d=a.position[l];if(c.field.isKeyField()?r=ut.comparator(ut.fromName(d.referenceValue),i.key):r=Qa(d,i.data.field(c.field)),c.dir==="desc"&&(r*=-1),r!==0)break}return r}function Q_(a,t){if(a===null)return t===null;if(t===null||a.inclusive!==t.inclusive||a.position.length!==t.position.length)return!1;for(let i=0;i<a.position.length;i++)if(!bi(a.position[i],t.position[i]))return!1;return!0}/**
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
 */class Lc{constructor(t,i="asc"){this.field=t,this.dir=i}}function W2(a,t){return a.dir===t.dir&&a.field.isEqual(t.field)}/**
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
 */class b0{}class Ne extends b0{constructor(t,i,r){super(),this.field=t,this.op=i,this.value=r}static create(t,i,r){return t.isKeyField()?i==="in"||i==="not-in"?this.createKeyFieldInFilter(t,i,r):new eb(t,i,r):i==="array-contains"?new sb(t,r):i==="in"?new rb(t,r):i==="not-in"?new ab(t,r):i==="array-contains-any"?new ob(t,r):new Ne(t,i,r)}static createKeyFieldInFilter(t,i,r){return i==="in"?new nb(t,r):new ib(t,r)}matches(t){const i=t.data.field(this.field);return this.op==="!="?i!==null&&i.nullValue===void 0&&this.matchesComparison(Qa(i,this.value)):i!==null&&Ks(this.value)===Ks(i)&&this.matchesComparison(Qa(i,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return ft(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Ri extends b0{constructor(t,i){super(),this.filters=t,this.op=i,this.Pe=null}static create(t,i){return new Ri(t,i)}matches(t){return R0(this)?this.filters.find((i=>!i.matches(t)))===void 0:this.filters.find((i=>i.matches(t)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((t,i)=>t.concat(i.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function R0(a){return a.op==="and"}function w0(a){return tb(a)&&R0(a)}function tb(a){for(const t of a.filters)if(t instanceof Ri)return!1;return!0}function qd(a){if(a instanceof Ne)return a.field.canonicalString()+a.op.toString()+Ka(a.value);if(w0(a))return a.filters.map((t=>qd(t))).join(",");{const t=a.filters.map((i=>qd(i))).join(",");return`${a.op}(${t})`}}function C0(a,t){return a instanceof Ne?(function(r,l){return l instanceof Ne&&r.op===l.op&&r.field.isEqual(l.field)&&bi(r.value,l.value)})(a,t):a instanceof Ri?(function(r,l){return l instanceof Ri&&r.op===l.op&&r.filters.length===l.filters.length?r.filters.reduce(((c,d,p)=>c&&C0(d,l.filters[p])),!0):!1})(a,t):void ft(19439)}function I0(a){return a instanceof Ne?(function(i){return`${i.field.canonicalString()} ${i.op} ${Ka(i.value)}`})(a):a instanceof Ri?(function(i){return i.op.toString()+" {"+i.getFilters().map(I0).join(" ,")+"}"})(a):"Filter"}class eb extends Ne{constructor(t,i,r){super(t,i,r),this.key=ut.fromName(r.referenceValue)}matches(t){const i=ut.comparator(t.key,this.key);return this.matchesComparison(i)}}class nb extends Ne{constructor(t,i){super(t,"in",i),this.keys=D0("in",i)}matches(t){return this.keys.some((i=>i.isEqual(t.key)))}}class ib extends Ne{constructor(t,i){super(t,"not-in",i),this.keys=D0("not-in",i)}matches(t){return!this.keys.some((i=>i.isEqual(t.key)))}}function D0(a,t){var i;return(((i=t.arrayValue)==null?void 0:i.values)||[]).map((r=>ut.fromName(r.referenceValue)))}class sb extends Ne{constructor(t,i){super(t,"array-contains",i)}matches(t){const i=t.data.field(this.field);return hm(i)&&bl(i.arrayValue,this.value)}}class rb extends Ne{constructor(t,i){super(t,"in",i)}matches(t){const i=t.data.field(this.field);return i!==null&&bl(this.value.arrayValue,i)}}class ab extends Ne{constructor(t,i){super(t,"not-in",i)}matches(t){if(bl(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const i=t.data.field(this.field);return i!==null&&i.nullValue===void 0&&!bl(this.value.arrayValue,i)}}class ob extends Ne{constructor(t,i){super(t,"array-contains-any",i)}matches(t){const i=t.data.field(this.field);return!(!hm(i)||!i.arrayValue.values)&&i.arrayValue.values.some((r=>bl(this.value.arrayValue,r)))}}/**
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
 */class lb{constructor(t,i=null,r=[],l=[],c=null,d=null,p=null){this.path=t,this.collectionGroup=i,this.orderBy=r,this.filters=l,this.limit=c,this.startAt=d,this.endAt=p,this.Te=null}}function K_(a,t=null,i=[],r=[],l=null,c=null,d=null){return new lb(a,t,i,r,l,c,d)}function fm(a){const t=vt(a);if(t.Te===null){let i=t.path.canonicalString();t.collectionGroup!==null&&(i+="|cg:"+t.collectionGroup),i+="|f:",i+=t.filters.map((r=>qd(r))).join(","),i+="|ob:",i+=t.orderBy.map((r=>(function(c){return c.field.canonicalString()+c.dir})(r))).join(","),Wc(t.limit)||(i+="|l:",i+=t.limit),t.startAt&&(i+="|lb:",i+=t.startAt.inclusive?"b:":"a:",i+=t.startAt.position.map((r=>Ka(r))).join(",")),t.endAt&&(i+="|ub:",i+=t.endAt.inclusive?"a:":"b:",i+=t.endAt.position.map((r=>Ka(r))).join(",")),t.Te=i}return t.Te}function dm(a,t){if(a.limit!==t.limit||a.orderBy.length!==t.orderBy.length)return!1;for(let i=0;i<a.orderBy.length;i++)if(!W2(a.orderBy[i],t.orderBy[i]))return!1;if(a.filters.length!==t.filters.length)return!1;for(let i=0;i<a.filters.length;i++)if(!C0(a.filters[i],t.filters[i]))return!1;return a.collectionGroup===t.collectionGroup&&!!a.path.isEqual(t.path)&&!!Q_(a.startAt,t.startAt)&&Q_(a.endAt,t.endAt)}function Hd(a){return ut.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}/**
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
 */class eh{constructor(t,i=null,r=[],l=[],c=null,d="F",p=null,_=null){this.path=t,this.collectionGroup=i,this.explicitOrderBy=r,this.filters=l,this.limit=c,this.limitType=d,this.startAt=p,this.endAt=_,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function ub(a,t,i,r,l,c,d,p){return new eh(a,t,i,r,l,c,d,p)}function mm(a){return new eh(a)}function Y_(a){return a.filters.length===0&&a.limit===null&&a.startAt==null&&a.endAt==null&&(a.explicitOrderBy.length===0||a.explicitOrderBy.length===1&&a.explicitOrderBy[0].field.isKeyField())}function cb(a){return a.collectionGroup!==null}function pl(a){const t=vt(a);if(t.Ie===null){t.Ie=[];const i=new Set;for(const c of t.explicitOrderBy)t.Ie.push(c),i.add(c.field.canonicalString());const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(d){let p=new Oe(Ge.comparator);return d.filters.forEach((_=>{_.getFlattenedFilters().forEach((v=>{v.isInequality()&&(p=p.add(v.field))}))})),p})(t).forEach((c=>{i.has(c.canonicalString())||c.isKeyField()||t.Ie.push(new Lc(c,r))})),i.has(Ge.keyField().canonicalString())||t.Ie.push(new Lc(Ge.keyField(),r))}return t.Ie}function _i(a){const t=vt(a);return t.Ee||(t.Ee=hb(t,pl(a))),t.Ee}function hb(a,t){if(a.limitType==="F")return K_(a.path,a.collectionGroup,t,a.filters,a.limit,a.startAt,a.endAt);{t=t.map((l=>{const c=l.dir==="desc"?"asc":"desc";return new Lc(l.field,c)}));const i=a.endAt?new Uc(a.endAt.position,a.endAt.inclusive):null,r=a.startAt?new Uc(a.startAt.position,a.startAt.inclusive):null;return K_(a.path,a.collectionGroup,t,a.filters,a.limit,i,r)}}function jd(a,t,i){return new eh(a.path,a.collectionGroup,a.explicitOrderBy.slice(),a.filters.slice(),t,i,a.startAt,a.endAt)}function nh(a,t){return dm(_i(a),_i(t))&&a.limitType===t.limitType}function N0(a){return`${fm(_i(a))}|lt:${a.limitType}`}function Ma(a){return`Query(target=${(function(i){let r=i.path.canonicalString();return i.collectionGroup!==null&&(r+=" collectionGroup="+i.collectionGroup),i.filters.length>0&&(r+=`, filters: [${i.filters.map((l=>I0(l))).join(", ")}]`),Wc(i.limit)||(r+=", limit: "+i.limit),i.orderBy.length>0&&(r+=`, orderBy: [${i.orderBy.map((l=>(function(d){return`${d.field.canonicalString()} (${d.dir})`})(l))).join(", ")}]`),i.startAt&&(r+=", startAt: ",r+=i.startAt.inclusive?"b:":"a:",r+=i.startAt.position.map((l=>Ka(l))).join(",")),i.endAt&&(r+=", endAt: ",r+=i.endAt.inclusive?"a:":"b:",r+=i.endAt.position.map((l=>Ka(l))).join(",")),`Target(${r})`})(_i(a))}; limitType=${a.limitType})`}function ih(a,t){return t.isFoundDocument()&&(function(r,l){const c=l.key.path;return r.collectionGroup!==null?l.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(c):ut.isDocumentKey(r.path)?r.path.isEqual(c):r.path.isImmediateParentOf(c)})(a,t)&&(function(r,l){for(const c of pl(r))if(!c.field.isKeyField()&&l.data.field(c.field)===null)return!1;return!0})(a,t)&&(function(r,l){for(const c of r.filters)if(!c.matches(l))return!1;return!0})(a,t)&&(function(r,l){return!(r.startAt&&!(function(d,p,_){const v=F_(d,p,_);return d.inclusive?v<=0:v<0})(r.startAt,pl(r),l)||r.endAt&&!(function(d,p,_){const v=F_(d,p,_);return d.inclusive?v>=0:v>0})(r.endAt,pl(r),l))})(a,t)}function fb(a){return a.collectionGroup||(a.path.length%2==1?a.path.lastSegment():a.path.get(a.path.length-2))}function O0(a){return(t,i)=>{let r=!1;for(const l of pl(a)){const c=db(l,t,i);if(c!==0)return c;r=r||l.field.isKeyField()}return 0}}function db(a,t,i){const r=a.field.isKeyField()?ut.comparator(t.key,i.key):(function(c,d,p){const _=d.data.field(c),v=p.data.field(c);return _!==null&&v!==null?Qa(_,v):ft(42886)})(a.field,t,i);switch(a.dir){case"asc":return r;case"desc":return-1*r;default:return ft(19790,{direction:a.dir})}}/**
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
 */class Pr{constructor(t,i){this.mapKeyFn=t,this.equalsFn=i,this.inner={},this.innerSize=0}get(t){const i=this.mapKeyFn(t),r=this.inner[i];if(r!==void 0){for(const[l,c]of r)if(this.equalsFn(l,t))return c}}has(t){return this.get(t)!==void 0}set(t,i){const r=this.mapKeyFn(t),l=this.inner[r];if(l===void 0)return this.inner[r]=[[t,i]],void this.innerSize++;for(let c=0;c<l.length;c++)if(this.equalsFn(l[c][0],t))return void(l[c]=[t,i]);l.push([t,i]),this.innerSize++}delete(t){const i=this.mapKeyFn(t),r=this.inner[i];if(r===void 0)return!1;for(let l=0;l<r.length;l++)if(this.equalsFn(r[l][0],t))return r.length===1?delete this.inner[i]:r.splice(l,1),this.innerSize--,!0;return!1}forEach(t){xr(this.inner,((i,r)=>{for(const[l,c]of r)t(l,c)}))}isEmpty(){return g0(this.inner)}size(){return this.innerSize}}/**
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
 */const mb=new oe(ut.comparator);function Zi(){return mb}const M0=new oe(ut.comparator);function hl(...a){let t=M0;for(const i of a)t=t.insert(i.key,i);return t}function V0(a){let t=M0;return a.forEach(((i,r)=>t=t.insert(i,r.overlayedDocument))),t}function Dr(){return yl()}function k0(){return yl()}function yl(){return new Pr((a=>a.toString()),((a,t)=>a.isEqual(t)))}const gb=new oe(ut.comparator),pb=new Oe(ut.comparator);function Ot(...a){let t=pb;for(const i of a)t=t.add(i);return t}const yb=new Oe(Nt);function _b(){return yb}/**
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
 */function gm(a,t){if(a.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Mc(t)?"-0":t}}function U0(a){return{integerValue:""+a}}function vb(a,t){return F2(t)?U0(t):gm(a,t)}/**
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
 */class sh{constructor(){this._=void 0}}function Eb(a,t,i){return a instanceof xc?(function(l,c){const d={fields:{[_0]:{stringValue:y0},[E0]:{timestampValue:{seconds:l.seconds,nanos:l.nanoseconds}}}};return c&&cm(c)&&(c=th(c)),c&&(d.fields[v0]=c),{mapValue:d}})(i,t):a instanceof Rl?x0(a,t):a instanceof wl?P0(a,t):(function(l,c){const d=L0(l,c),p=X_(d)+X_(l.Ae);return Bd(d)&&Bd(l.Ae)?U0(p):gm(l.serializer,p)})(a,t)}function Tb(a,t,i){return a instanceof Rl?x0(a,t):a instanceof wl?P0(a,t):i}function L0(a,t){return a instanceof Pc?(function(r){return Bd(r)||(function(c){return!!c&&"doubleValue"in c})(r)})(t)?t:{integerValue:0}:null}class xc extends sh{}class Rl extends sh{constructor(t){super(),this.elements=t}}function x0(a,t){const i=z0(t);for(const r of a.elements)i.some((l=>bi(l,r)))||i.push(r);return{arrayValue:{values:i}}}class wl extends sh{constructor(t){super(),this.elements=t}}function P0(a,t){let i=z0(t);for(const r of a.elements)i=i.filter((l=>!bi(l,r)));return{arrayValue:{values:i}}}class Pc extends sh{constructor(t,i){super(),this.serializer=t,this.Ae=i}}function X_(a){return me(a.integerValue||a.doubleValue)}function z0(a){return hm(a)&&a.arrayValue.values?a.arrayValue.values.slice():[]}function Ab(a,t){return a.field.isEqual(t.field)&&(function(r,l){return r instanceof Rl&&l instanceof Rl||r instanceof wl&&l instanceof wl?Fa(r.elements,l.elements,bi):r instanceof Pc&&l instanceof Pc?bi(r.Ae,l.Ae):r instanceof xc&&l instanceof xc})(a.transform,t.transform)}class Sb{constructor(t,i){this.version=t,this.transformResults=i}}class Ki{constructor(t,i){this.updateTime=t,this.exists=i}static none(){return new Ki}static exists(t){return new Ki(void 0,t)}static updateTime(t){return new Ki(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function Sc(a,t){return a.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(a.updateTime):a.exists===void 0||a.exists===t.isFoundDocument()}class rh{}function B0(a,t){if(!a.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return a.isNoDocument()?new H0(a.key,Ki.none()):new Ml(a.key,a.data,Ki.none());{const i=a.data,r=On.empty();let l=new Oe(Ge.comparator);for(let c of t.fields)if(!l.has(c)){let d=i.field(c);d===null&&c.length>1&&(c=c.popLast(),d=i.field(c)),d===null?r.delete(c):r.set(c,d),l=l.add(c)}return new zr(a.key,r,new Kn(l.toArray()),Ki.none())}}function bb(a,t,i){a instanceof Ml?(function(l,c,d){const p=l.value.clone(),_=$_(l.fieldTransforms,c,d.transformResults);p.setAll(_),c.convertToFoundDocument(d.version,p).setHasCommittedMutations()})(a,t,i):a instanceof zr?(function(l,c,d){if(!Sc(l.precondition,c))return void c.convertToUnknownDocument(d.version);const p=$_(l.fieldTransforms,c,d.transformResults),_=c.data;_.setAll(q0(l)),_.setAll(p),c.convertToFoundDocument(d.version,_).setHasCommittedMutations()})(a,t,i):(function(l,c,d){c.convertToNoDocument(d.version).setHasCommittedMutations()})(0,t,i)}function _l(a,t,i,r){return a instanceof Ml?(function(c,d,p,_){if(!Sc(c.precondition,d))return p;const v=c.value.clone(),A=J_(c.fieldTransforms,_,d);return v.setAll(A),d.convertToFoundDocument(d.version,v).setHasLocalMutations(),null})(a,t,i,r):a instanceof zr?(function(c,d,p,_){if(!Sc(c.precondition,d))return p;const v=J_(c.fieldTransforms,_,d),A=d.data;return A.setAll(q0(c)),A.setAll(v),d.convertToFoundDocument(d.version,A).setHasLocalMutations(),p===null?null:p.unionWith(c.fieldMask.fields).unionWith(c.fieldTransforms.map((S=>S.field)))})(a,t,i,r):(function(c,d,p){return Sc(c.precondition,d)?(d.convertToNoDocument(d.version).setHasLocalMutations(),null):p})(a,t,i)}function Rb(a,t){let i=null;for(const r of a.fieldTransforms){const l=t.data.field(r.field),c=L0(r.transform,l||null);c!=null&&(i===null&&(i=On.empty()),i.set(r.field,c))}return i||null}function Z_(a,t){return a.type===t.type&&!!a.key.isEqual(t.key)&&!!a.precondition.isEqual(t.precondition)&&!!(function(r,l){return r===void 0&&l===void 0||!(!r||!l)&&Fa(r,l,((c,d)=>Ab(c,d)))})(a.fieldTransforms,t.fieldTransforms)&&(a.type===0?a.value.isEqual(t.value):a.type!==1||a.data.isEqual(t.data)&&a.fieldMask.isEqual(t.fieldMask))}class Ml extends rh{constructor(t,i,r,l=[]){super(),this.key=t,this.value=i,this.precondition=r,this.fieldTransforms=l,this.type=0}getFieldMask(){return null}}class zr extends rh{constructor(t,i,r,l,c=[]){super(),this.key=t,this.data=i,this.fieldMask=r,this.precondition=l,this.fieldTransforms=c,this.type=1}getFieldMask(){return this.fieldMask}}function q0(a){const t=new Map;return a.fieldMask.fields.forEach((i=>{if(!i.isEmpty()){const r=a.data.field(i);t.set(i,r)}})),t}function $_(a,t,i){const r=new Map;Ht(a.length===i.length,32656,{Re:i.length,Ve:a.length});for(let l=0;l<i.length;l++){const c=a[l],d=c.transform,p=t.data.field(c.field);r.set(c.field,Tb(d,p,i[l]))}return r}function J_(a,t,i){const r=new Map;for(const l of a){const c=l.transform,d=i.data.field(l.field);r.set(l.field,Eb(c,d,t))}return r}class H0 extends rh{constructor(t,i){super(),this.key=t,this.precondition=i,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class wb extends rh{constructor(t,i){super(),this.key=t,this.precondition=i,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class Cb{constructor(t,i,r,l){this.batchId=t,this.localWriteTime=i,this.baseMutations=r,this.mutations=l}applyToRemoteDocument(t,i){const r=i.mutationResults;for(let l=0;l<this.mutations.length;l++){const c=this.mutations[l];c.key.isEqual(t.key)&&bb(c,t,r[l])}}applyToLocalView(t,i){for(const r of this.baseMutations)r.key.isEqual(t.key)&&(i=_l(r,t,i,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(t.key)&&(i=_l(r,t,i,this.localWriteTime));return i}applyToLocalDocumentSet(t,i){const r=k0();return this.mutations.forEach((l=>{const c=t.get(l.key),d=c.overlayedDocument;let p=this.applyToLocalView(d,c.mutatedFields);p=i.has(l.key)?null:p;const _=B0(d,p);_!==null&&r.set(l.key,_),d.isValidDocument()||d.convertToNoDocument(pt.min())})),r}keys(){return this.mutations.reduce(((t,i)=>t.add(i.key)),Ot())}isEqual(t){return this.batchId===t.batchId&&Fa(this.mutations,t.mutations,((i,r)=>Z_(i,r)))&&Fa(this.baseMutations,t.baseMutations,((i,r)=>Z_(i,r)))}}class pm{constructor(t,i,r,l){this.batch=t,this.commitVersion=i,this.mutationResults=r,this.docVersions=l}static from(t,i,r){Ht(t.mutations.length===r.length,58842,{me:t.mutations.length,fe:r.length});let l=(function(){return gb})();const c=t.mutations;for(let d=0;d<c.length;d++)l=l.insert(c[d].key,r[d].version);return new pm(t,i,r,l)}}/**
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
 */class Ib{constructor(t,i){this.largestBatchId=t,this.mutation=i}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
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
 */class Db{constructor(t,i){this.count=t,this.unchangedNames=i}}/**
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
 */var be,Ut;function Nb(a){switch(a){case X.OK:return ft(64938);case X.CANCELLED:case X.UNKNOWN:case X.DEADLINE_EXCEEDED:case X.RESOURCE_EXHAUSTED:case X.INTERNAL:case X.UNAVAILABLE:case X.UNAUTHENTICATED:return!1;case X.INVALID_ARGUMENT:case X.NOT_FOUND:case X.ALREADY_EXISTS:case X.PERMISSION_DENIED:case X.FAILED_PRECONDITION:case X.ABORTED:case X.OUT_OF_RANGE:case X.UNIMPLEMENTED:case X.DATA_LOSS:return!0;default:return ft(15467,{code:a})}}function j0(a){if(a===void 0)return Xi("GRPC error has no .code"),X.UNKNOWN;switch(a){case be.OK:return X.OK;case be.CANCELLED:return X.CANCELLED;case be.UNKNOWN:return X.UNKNOWN;case be.DEADLINE_EXCEEDED:return X.DEADLINE_EXCEEDED;case be.RESOURCE_EXHAUSTED:return X.RESOURCE_EXHAUSTED;case be.INTERNAL:return X.INTERNAL;case be.UNAVAILABLE:return X.UNAVAILABLE;case be.UNAUTHENTICATED:return X.UNAUTHENTICATED;case be.INVALID_ARGUMENT:return X.INVALID_ARGUMENT;case be.NOT_FOUND:return X.NOT_FOUND;case be.ALREADY_EXISTS:return X.ALREADY_EXISTS;case be.PERMISSION_DENIED:return X.PERMISSION_DENIED;case be.FAILED_PRECONDITION:return X.FAILED_PRECONDITION;case be.ABORTED:return X.ABORTED;case be.OUT_OF_RANGE:return X.OUT_OF_RANGE;case be.UNIMPLEMENTED:return X.UNIMPLEMENTED;case be.DATA_LOSS:return X.DATA_LOSS;default:return ft(39323,{code:a})}}(Ut=be||(be={}))[Ut.OK=0]="OK",Ut[Ut.CANCELLED=1]="CANCELLED",Ut[Ut.UNKNOWN=2]="UNKNOWN",Ut[Ut.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Ut[Ut.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Ut[Ut.NOT_FOUND=5]="NOT_FOUND",Ut[Ut.ALREADY_EXISTS=6]="ALREADY_EXISTS",Ut[Ut.PERMISSION_DENIED=7]="PERMISSION_DENIED",Ut[Ut.UNAUTHENTICATED=16]="UNAUTHENTICATED",Ut[Ut.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Ut[Ut.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Ut[Ut.ABORTED=10]="ABORTED",Ut[Ut.OUT_OF_RANGE=11]="OUT_OF_RANGE",Ut[Ut.UNIMPLEMENTED=12]="UNIMPLEMENTED",Ut[Ut.INTERNAL=13]="INTERNAL",Ut[Ut.UNAVAILABLE=14]="UNAVAILABLE",Ut[Ut.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function Ob(){return new TextEncoder}/**
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
 */const Mb=new Hs([4294967295,4294967295],0);function W_(a){const t=Ob().encode(a),i=new r0;return i.update(t),new Uint8Array(i.digest())}function tv(a){const t=new DataView(a.buffer),i=t.getUint32(0,!0),r=t.getUint32(4,!0),l=t.getUint32(8,!0),c=t.getUint32(12,!0);return[new Hs([i,r],0),new Hs([l,c],0)]}class ym{constructor(t,i,r){if(this.bitmap=t,this.padding=i,this.hashCount=r,i<0||i>=8)throw new fl(`Invalid padding: ${i}`);if(r<0)throw new fl(`Invalid hash count: ${r}`);if(t.length>0&&this.hashCount===0)throw new fl(`Invalid hash count: ${r}`);if(t.length===0&&i!==0)throw new fl(`Invalid padding when bitmap length is 0: ${i}`);this.ge=8*t.length-i,this.pe=Hs.fromNumber(this.ge)}ye(t,i,r){let l=t.add(i.multiply(Hs.fromNumber(r)));return l.compare(Mb)===1&&(l=new Hs([l.getBits(0),l.getBits(1)],0)),l.modulo(this.pe).toNumber()}we(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.ge===0)return!1;const i=W_(t),[r,l]=tv(i);for(let c=0;c<this.hashCount;c++){const d=this.ye(r,l,c);if(!this.we(d))return!1}return!0}static create(t,i,r){const l=t%8==0?0:8-t%8,c=new Uint8Array(Math.ceil(t/8)),d=new ym(c,l,i);return r.forEach((p=>d.insert(p))),d}insert(t){if(this.ge===0)return;const i=W_(t),[r,l]=tv(i);for(let c=0;c<this.hashCount;c++){const d=this.ye(r,l,c);this.Se(d)}}Se(t){const i=Math.floor(t/8),r=t%8;this.bitmap[i]|=1<<r}}class fl extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class ah{constructor(t,i,r,l,c){this.snapshotVersion=t,this.targetChanges=i,this.targetMismatches=r,this.documentUpdates=l,this.resolvedLimboDocuments=c}static createSynthesizedRemoteEventForCurrentChange(t,i,r){const l=new Map;return l.set(t,Vl.createSynthesizedTargetChangeForCurrentChange(t,i,r)),new ah(pt.min(),l,new oe(Nt),Zi(),Ot())}}class Vl{constructor(t,i,r,l,c){this.resumeToken=t,this.current=i,this.addedDocuments=r,this.modifiedDocuments=l,this.removedDocuments=c}static createSynthesizedTargetChangeForCurrentChange(t,i,r){return new Vl(r,i,Ot(),Ot(),Ot())}}/**
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
 */class bc{constructor(t,i,r,l){this.be=t,this.removedTargetIds=i,this.key=r,this.De=l}}class G0{constructor(t,i){this.targetId=t,this.Ce=i}}class F0{constructor(t,i,r=Fe.EMPTY_BYTE_STRING,l=null){this.state=t,this.targetIds=i,this.resumeToken=r,this.cause=l}}class ev{constructor(){this.ve=0,this.Fe=nv(),this.Me=Fe.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(t){t.approximateByteSize()>0&&(this.Oe=!0,this.Me=t)}ke(){let t=Ot(),i=Ot(),r=Ot();return this.Fe.forEach(((l,c)=>{switch(c){case 0:t=t.add(l);break;case 2:i=i.add(l);break;case 1:r=r.add(l);break;default:ft(38017,{changeType:c})}})),new Vl(this.Me,this.xe,t,i,r)}qe(){this.Oe=!1,this.Fe=nv()}Qe(t,i){this.Oe=!0,this.Fe=this.Fe.insert(t,i)}$e(t){this.Oe=!0,this.Fe=this.Fe.remove(t)}Ue(){this.ve+=1}Ke(){this.ve-=1,Ht(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class Vb{constructor(t){this.Ge=t,this.ze=new Map,this.je=Zi(),this.Je=yc(),this.He=yc(),this.Ye=new oe(Nt)}Ze(t){for(const i of t.be)t.De&&t.De.isFoundDocument()?this.Xe(i,t.De):this.et(i,t.key,t.De);for(const i of t.removedTargetIds)this.et(i,t.key,t.De)}tt(t){this.forEachTarget(t,(i=>{const r=this.nt(i);switch(t.state){case 0:this.rt(i)&&r.Le(t.resumeToken);break;case 1:r.Ke(),r.Ne||r.qe(),r.Le(t.resumeToken);break;case 2:r.Ke(),r.Ne||this.removeTarget(i);break;case 3:this.rt(i)&&(r.We(),r.Le(t.resumeToken));break;case 4:this.rt(i)&&(this.it(i),r.Le(t.resumeToken));break;default:ft(56790,{state:t.state})}}))}forEachTarget(t,i){t.targetIds.length>0?t.targetIds.forEach(i):this.ze.forEach(((r,l)=>{this.rt(l)&&i(l)}))}st(t){const i=t.targetId,r=t.Ce.count,l=this.ot(i);if(l){const c=l.target;if(Hd(c))if(r===0){const d=new ut(c.path);this.et(i,d,Xe.newNoDocument(d,pt.min()))}else Ht(r===1,20013,{expectedCount:r});else{const d=this._t(i);if(d!==r){const p=this.ut(t),_=p?this.ct(p,t,d):1;if(_!==0){this.it(i);const v=_===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(i,v)}}}}}ut(t){const i=t.Ce.unchangedNames;if(!i||!i.bits)return null;const{bits:{bitmap:r="",padding:l=0},hashCount:c=0}=i;let d,p;try{d=Qs(r).toUint8Array()}catch(_){if(_ instanceof p0)return Ga("Decoding the base64 bloom filter in existence filter failed ("+_.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw _}try{p=new ym(d,l,c)}catch(_){return Ga(_ instanceof fl?"BloomFilter error: ":"Applying bloom filter failed: ",_),null}return p.ge===0?null:p}ct(t,i,r){return i.Ce.count===r-this.Pt(t,i.targetId)?0:2}Pt(t,i){const r=this.Ge.getRemoteKeysForTarget(i);let l=0;return r.forEach((c=>{const d=this.Ge.ht(),p=`projects/${d.projectId}/databases/${d.database}/documents/${c.path.canonicalString()}`;t.mightContain(p)||(this.et(i,c,null),l++)})),l}Tt(t){const i=new Map;this.ze.forEach(((c,d)=>{const p=this.ot(d);if(p){if(c.current&&Hd(p.target)){const _=new ut(p.target.path);this.It(_).has(d)||this.Et(d,_)||this.et(d,_,Xe.newNoDocument(_,t))}c.Be&&(i.set(d,c.ke()),c.qe())}}));let r=Ot();this.He.forEach(((c,d)=>{let p=!0;d.forEachWhile((_=>{const v=this.ot(_);return!v||v.purpose==="TargetPurposeLimboResolution"||(p=!1,!1)})),p&&(r=r.add(c))})),this.je.forEach(((c,d)=>d.setReadTime(t)));const l=new ah(t,i,this.Ye,this.je,r);return this.je=Zi(),this.Je=yc(),this.He=yc(),this.Ye=new oe(Nt),l}Xe(t,i){if(!this.rt(t))return;const r=this.Et(t,i.key)?2:0;this.nt(t).Qe(i.key,r),this.je=this.je.insert(i.key,i),this.Je=this.Je.insert(i.key,this.It(i.key).add(t)),this.He=this.He.insert(i.key,this.dt(i.key).add(t))}et(t,i,r){if(!this.rt(t))return;const l=this.nt(t);this.Et(t,i)?l.Qe(i,1):l.$e(i),this.He=this.He.insert(i,this.dt(i).delete(t)),this.He=this.He.insert(i,this.dt(i).add(t)),r&&(this.je=this.je.insert(i,r))}removeTarget(t){this.ze.delete(t)}_t(t){const i=this.nt(t).ke();return this.Ge.getRemoteKeysForTarget(t).size+i.addedDocuments.size-i.removedDocuments.size}Ue(t){this.nt(t).Ue()}nt(t){let i=this.ze.get(t);return i||(i=new ev,this.ze.set(t,i)),i}dt(t){let i=this.He.get(t);return i||(i=new Oe(Nt),this.He=this.He.insert(t,i)),i}It(t){let i=this.Je.get(t);return i||(i=new Oe(Nt),this.Je=this.Je.insert(t,i)),i}rt(t){const i=this.ot(t)!==null;return i||nt("WatchChangeAggregator","Detected inactive target",t),i}ot(t){const i=this.ze.get(t);return i&&i.Ne?null:this.Ge.At(t)}it(t){this.ze.set(t,new ev),this.Ge.getRemoteKeysForTarget(t).forEach((i=>{this.et(t,i,null)}))}Et(t,i){return this.Ge.getRemoteKeysForTarget(t).has(i)}}function yc(){return new oe(ut.comparator)}function nv(){return new oe(ut.comparator)}const kb={asc:"ASCENDING",desc:"DESCENDING"},Ub={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Lb={and:"AND",or:"OR"};class xb{constructor(t,i){this.databaseId=t,this.useProto3Json=i}}function Gd(a,t){return a.useProto3Json||Wc(t)?t:{value:t}}function zc(a,t){return a.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function Q0(a,t){return a.useProto3Json?t.toBase64():t.toUint8Array()}function Pb(a,t){return zc(a,t.toTimestamp())}function vi(a){return Ht(!!a,49232),pt.fromTimestamp((function(i){const r=Fs(i);return new te(r.seconds,r.nanos)})(a))}function _m(a,t){return Fd(a,t).canonicalString()}function Fd(a,t){const i=(function(l){return new ae(["projects",l.projectId,"databases",l.database])})(a).child("documents");return t===void 0?i:i.child(t)}function K0(a){const t=ae.fromString(a);return Ht(J0(t),10190,{key:t.toString()}),t}function Qd(a,t){return _m(a.databaseId,t.path)}function wd(a,t){const i=K0(t);if(i.get(1)!==a.databaseId.projectId)throw new at(X.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+i.get(1)+" vs "+a.databaseId.projectId);if(i.get(3)!==a.databaseId.database)throw new at(X.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+i.get(3)+" vs "+a.databaseId.database);return new ut(X0(i))}function Y0(a,t){return _m(a.databaseId,t)}function zb(a){const t=K0(a);return t.length===4?ae.emptyPath():X0(t)}function Kd(a){return new ae(["projects",a.databaseId.projectId,"databases",a.databaseId.database]).canonicalString()}function X0(a){return Ht(a.length>4&&a.get(4)==="documents",29091,{key:a.toString()}),a.popFirst(5)}function iv(a,t,i){return{name:Qd(a,t),fields:i.value.mapValue.fields}}function Bb(a,t){let i;if("targetChange"in t){t.targetChange;const r=(function(v){return v==="NO_CHANGE"?0:v==="ADD"?1:v==="REMOVE"?2:v==="CURRENT"?3:v==="RESET"?4:ft(39313,{state:v})})(t.targetChange.targetChangeType||"NO_CHANGE"),l=t.targetChange.targetIds||[],c=(function(v,A){return v.useProto3Json?(Ht(A===void 0||typeof A=="string",58123),Fe.fromBase64String(A||"")):(Ht(A===void 0||A instanceof Buffer||A instanceof Uint8Array,16193),Fe.fromUint8Array(A||new Uint8Array))})(a,t.targetChange.resumeToken),d=t.targetChange.cause,p=d&&(function(v){const A=v.code===void 0?X.UNKNOWN:j0(v.code);return new at(A,v.message||"")})(d);i=new F0(r,l,c,p||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const l=wd(a,r.document.name),c=vi(r.document.updateTime),d=r.document.createTime?vi(r.document.createTime):pt.min(),p=new On({mapValue:{fields:r.document.fields}}),_=Xe.newFoundDocument(l,c,d,p),v=r.targetIds||[],A=r.removedTargetIds||[];i=new bc(v,A,_.key,_)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const l=wd(a,r.document),c=r.readTime?vi(r.readTime):pt.min(),d=Xe.newNoDocument(l,c),p=r.removedTargetIds||[];i=new bc([],p,d.key,d)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const l=wd(a,r.document),c=r.removedTargetIds||[];i=new bc([],c,l,null)}else{if(!("filter"in t))return ft(11601,{Rt:t});{t.filter;const r=t.filter;r.targetId;const{count:l=0,unchangedNames:c}=r,d=new Db(l,c),p=r.targetId;i=new G0(p,d)}}return i}function qb(a,t){let i;if(t instanceof Ml)i={update:iv(a,t.key,t.value)};else if(t instanceof H0)i={delete:Qd(a,t.key)};else if(t instanceof zr)i={update:iv(a,t.key,t.data),updateMask:Zb(t.fieldMask)};else{if(!(t instanceof wb))return ft(16599,{Vt:t.type});i={verify:Qd(a,t.key)}}return t.fieldTransforms.length>0&&(i.updateTransforms=t.fieldTransforms.map((r=>(function(c,d){const p=d.transform;if(p instanceof xc)return{fieldPath:d.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(p instanceof Rl)return{fieldPath:d.field.canonicalString(),appendMissingElements:{values:p.elements}};if(p instanceof wl)return{fieldPath:d.field.canonicalString(),removeAllFromArray:{values:p.elements}};if(p instanceof Pc)return{fieldPath:d.field.canonicalString(),increment:p.Ae};throw ft(20930,{transform:d.transform})})(0,r)))),t.precondition.isNone||(i.currentDocument=(function(l,c){return c.updateTime!==void 0?{updateTime:Pb(l,c.updateTime)}:c.exists!==void 0?{exists:c.exists}:ft(27497)})(a,t.precondition)),i}function Hb(a,t){return a&&a.length>0?(Ht(t!==void 0,14353),a.map((i=>(function(l,c){let d=l.updateTime?vi(l.updateTime):vi(c);return d.isEqual(pt.min())&&(d=vi(c)),new Sb(d,l.transformResults||[])})(i,t)))):[]}function jb(a,t){return{documents:[Y0(a,t.path)]}}function Gb(a,t){const i={structuredQuery:{}},r=t.path;let l;t.collectionGroup!==null?(l=r,i.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(l=r.popLast(),i.structuredQuery.from=[{collectionId:r.lastSegment()}]),i.parent=Y0(a,l);const c=(function(v){if(v.length!==0)return $0(Ri.create(v,"and"))})(t.filters);c&&(i.structuredQuery.where=c);const d=(function(v){if(v.length!==0)return v.map((A=>(function(k){return{field:Va(k.field),direction:Kb(k.dir)}})(A)))})(t.orderBy);d&&(i.structuredQuery.orderBy=d);const p=Gd(a,t.limit);return p!==null&&(i.structuredQuery.limit=p),t.startAt&&(i.structuredQuery.startAt=(function(v){return{before:v.inclusive,values:v.position}})(t.startAt)),t.endAt&&(i.structuredQuery.endAt=(function(v){return{before:!v.inclusive,values:v.position}})(t.endAt)),{ft:i,parent:l}}function Fb(a){let t=zb(a.parent);const i=a.structuredQuery,r=i.from?i.from.length:0;let l=null;if(r>0){Ht(r===1,65062);const A=i.from[0];A.allDescendants?l=A.collectionId:t=t.child(A.collectionId)}let c=[];i.where&&(c=(function(S){const k=Z0(S);return k instanceof Ri&&w0(k)?k.getFilters():[k]})(i.where));let d=[];i.orderBy&&(d=(function(S){return S.map((k=>(function(J){return new Lc(ka(J.field),(function(Z){switch(Z){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(J.direction))})(k)))})(i.orderBy));let p=null;i.limit&&(p=(function(S){let k;return k=typeof S=="object"?S.value:S,Wc(k)?null:k})(i.limit));let _=null;i.startAt&&(_=(function(S){const k=!!S.before,F=S.values||[];return new Uc(F,k)})(i.startAt));let v=null;return i.endAt&&(v=(function(S){const k=!S.before,F=S.values||[];return new Uc(F,k)})(i.endAt)),ub(t,l,d,c,p,"F",_,v)}function Qb(a,t){const i=(function(l){switch(l){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return ft(28987,{purpose:l})}})(t.purpose);return i==null?null:{"goog-listen-tags":i}}function Z0(a){return a.unaryFilter!==void 0?(function(i){switch(i.unaryFilter.op){case"IS_NAN":const r=ka(i.unaryFilter.field);return Ne.create(r,"==",{doubleValue:NaN});case"IS_NULL":const l=ka(i.unaryFilter.field);return Ne.create(l,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const c=ka(i.unaryFilter.field);return Ne.create(c,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const d=ka(i.unaryFilter.field);return Ne.create(d,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return ft(61313);default:return ft(60726)}})(a):a.fieldFilter!==void 0?(function(i){return Ne.create(ka(i.fieldFilter.field),(function(l){switch(l){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return ft(58110);default:return ft(50506)}})(i.fieldFilter.op),i.fieldFilter.value)})(a):a.compositeFilter!==void 0?(function(i){return Ri.create(i.compositeFilter.filters.map((r=>Z0(r))),(function(l){switch(l){case"AND":return"and";case"OR":return"or";default:return ft(1026)}})(i.compositeFilter.op))})(a):ft(30097,{filter:a})}function Kb(a){return kb[a]}function Yb(a){return Ub[a]}function Xb(a){return Lb[a]}function Va(a){return{fieldPath:a.canonicalString()}}function ka(a){return Ge.fromServerFormat(a.fieldPath)}function $0(a){return a instanceof Ne?(function(i){if(i.op==="=="){if(G_(i.value))return{unaryFilter:{field:Va(i.field),op:"IS_NAN"}};if(j_(i.value))return{unaryFilter:{field:Va(i.field),op:"IS_NULL"}}}else if(i.op==="!="){if(G_(i.value))return{unaryFilter:{field:Va(i.field),op:"IS_NOT_NAN"}};if(j_(i.value))return{unaryFilter:{field:Va(i.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Va(i.field),op:Yb(i.op),value:i.value}}})(a):a instanceof Ri?(function(i){const r=i.getFilters().map((l=>$0(l)));return r.length===1?r[0]:{compositeFilter:{op:Xb(i.op),filters:r}}})(a):ft(54877,{filter:a})}function Zb(a){const t=[];return a.fields.forEach((i=>t.push(i.canonicalString()))),{fieldPaths:t}}function J0(a){return a.length>=4&&a.get(0)==="projects"&&a.get(2)==="databases"}/**
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
 */class Ps{constructor(t,i,r,l,c=pt.min(),d=pt.min(),p=Fe.EMPTY_BYTE_STRING,_=null){this.target=t,this.targetId=i,this.purpose=r,this.sequenceNumber=l,this.snapshotVersion=c,this.lastLimboFreeSnapshotVersion=d,this.resumeToken=p,this.expectedCount=_}withSequenceNumber(t){return new Ps(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,i){return new Ps(this.target,this.targetId,this.purpose,this.sequenceNumber,i,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new Ps(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new Ps(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
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
 */class $b{constructor(t){this.yt=t}}function Jb(a){const t=Fb({parent:a.parent,structuredQuery:a.structuredQuery});return a.limitType==="LAST"?jd(t,t.limit,"L"):t}/**
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
 */class Wb{constructor(){this.Cn=new tR}addToCollectionParentIndex(t,i){return this.Cn.add(i),Y.resolve()}getCollectionParents(t,i){return Y.resolve(this.Cn.getEntries(i))}addFieldIndex(t,i){return Y.resolve()}deleteFieldIndex(t,i){return Y.resolve()}deleteAllFieldIndexes(t){return Y.resolve()}createTargetIndexes(t,i){return Y.resolve()}getDocumentsMatchingTarget(t,i){return Y.resolve(null)}getIndexType(t,i){return Y.resolve(0)}getFieldIndexes(t,i){return Y.resolve([])}getNextCollectionGroupToUpdate(t){return Y.resolve(null)}getMinOffset(t,i){return Y.resolve(Gs.min())}getMinOffsetFromCollectionGroup(t,i){return Y.resolve(Gs.min())}updateCollectionGroup(t,i,r){return Y.resolve()}updateIndexEntries(t,i){return Y.resolve()}}class tR{constructor(){this.index={}}add(t){const i=t.lastSegment(),r=t.popLast(),l=this.index[i]||new Oe(ae.comparator),c=!l.has(r);return this.index[i]=l.add(r),c}has(t){const i=t.lastSegment(),r=t.popLast(),l=this.index[i];return l&&l.has(r)}getEntries(t){return(this.index[t]||new Oe(ae.comparator)).toArray()}}/**
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
 */const sv={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},W0=41943040;class ln{static withCacheSize(t){return new ln(t,ln.DEFAULT_COLLECTION_PERCENTILE,ln.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,i,r){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=i,this.maximumSequenceNumbersToCollect=r}}/**
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
 */ln.DEFAULT_COLLECTION_PERCENTILE=10,ln.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,ln.DEFAULT=new ln(W0,ln.DEFAULT_COLLECTION_PERCENTILE,ln.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),ln.DISABLED=new ln(-1,0,0);/**
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
 */class Ya{constructor(t){this.ar=t}next(){return this.ar+=2,this.ar}static ur(){return new Ya(0)}static cr(){return new Ya(-1)}}/**
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
 */const rv="LruGarbageCollector",eR=1048576;function av([a,t],[i,r]){const l=Nt(a,i);return l===0?Nt(t,r):l}class nR{constructor(t){this.Ir=t,this.buffer=new Oe(av),this.Er=0}dr(){return++this.Er}Ar(t){const i=[t,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(i);else{const r=this.buffer.last();av(i,r)<0&&(this.buffer=this.buffer.delete(r).add(i))}}get maxValue(){return this.buffer.last()[0]}}class iR{constructor(t,i,r){this.garbageCollector=t,this.asyncQueue=i,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(t){nt(rv,`Garbage collection scheduled in ${t}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(i){to(i)?nt(rv,"Ignoring IndexedDB error during garbage collection: ",i):await Wa(i)}await this.Vr(3e5)}))}}class sR{constructor(t,i){this.mr=t,this.params=i}calculateTargetCount(t,i){return this.mr.gr(t).next((r=>Math.floor(i/100*r)))}nthSequenceNumber(t,i){if(i===0)return Y.resolve(Jc.ce);const r=new nR(i);return this.mr.forEachTarget(t,(l=>r.Ar(l.sequenceNumber))).next((()=>this.mr.pr(t,(l=>r.Ar(l))))).next((()=>r.maxValue))}removeTargets(t,i,r){return this.mr.removeTargets(t,i,r)}removeOrphanedDocuments(t,i){return this.mr.removeOrphanedDocuments(t,i)}collect(t,i){return this.params.cacheSizeCollectionThreshold===-1?(nt("LruGarbageCollector","Garbage collection skipped; disabled"),Y.resolve(sv)):this.getCacheSize(t).next((r=>r<this.params.cacheSizeCollectionThreshold?(nt("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),sv):this.yr(t,i)))}getCacheSize(t){return this.mr.getCacheSize(t)}yr(t,i){let r,l,c,d,p,_,v;const A=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next((S=>(S>this.params.maximumSequenceNumbersToCollect?(nt("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${S}`),l=this.params.maximumSequenceNumbersToCollect):l=S,d=Date.now(),this.nthSequenceNumber(t,l)))).next((S=>(r=S,p=Date.now(),this.removeTargets(t,r,i)))).next((S=>(c=S,_=Date.now(),this.removeOrphanedDocuments(t,r)))).next((S=>(v=Date.now(),Oa()<=Dt.DEBUG&&nt("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${d-A}ms
	Determined least recently used ${l} in `+(p-d)+`ms
	Removed ${c} targets in `+(_-p)+`ms
	Removed ${S} documents in `+(v-_)+`ms
Total Duration: ${v-A}ms`),Y.resolve({didRun:!0,sequenceNumbersCollected:l,targetsRemoved:c,documentsRemoved:S}))))}}function rR(a,t){return new sR(a,t)}/**
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
 */class aR{constructor(){this.changes=new Pr((t=>t.toString()),((t,i)=>t.isEqual(i))),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,i){this.assertNotApplied(),this.changes.set(t,Xe.newInvalidDocument(t).setReadTime(i))}getEntry(t,i){this.assertNotApplied();const r=this.changes.get(i);return r!==void 0?Y.resolve(r):this.getFromCache(t,i)}getEntries(t,i){return this.getAllFromCache(t,i)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
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
 */class oR{constructor(t,i){this.overlayedDocument=t,this.mutatedFields=i}}/**
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
 */class lR{constructor(t,i,r,l){this.remoteDocumentCache=t,this.mutationQueue=i,this.documentOverlayCache=r,this.indexManager=l}getDocument(t,i){let r=null;return this.documentOverlayCache.getOverlay(t,i).next((l=>(r=l,this.remoteDocumentCache.getEntry(t,i)))).next((l=>(r!==null&&_l(r.mutation,l,Kn.empty(),te.now()),l)))}getDocuments(t,i){return this.remoteDocumentCache.getEntries(t,i).next((r=>this.getLocalViewOfDocuments(t,r,Ot()).next((()=>r))))}getLocalViewOfDocuments(t,i,r=Ot()){const l=Dr();return this.populateOverlays(t,l,i).next((()=>this.computeViews(t,i,l,r).next((c=>{let d=hl();return c.forEach(((p,_)=>{d=d.insert(p,_.overlayedDocument)})),d}))))}getOverlayedDocuments(t,i){const r=Dr();return this.populateOverlays(t,r,i).next((()=>this.computeViews(t,i,r,Ot())))}populateOverlays(t,i,r){const l=[];return r.forEach((c=>{i.has(c)||l.push(c)})),this.documentOverlayCache.getOverlays(t,l).next((c=>{c.forEach(((d,p)=>{i.set(d,p)}))}))}computeViews(t,i,r,l){let c=Zi();const d=yl(),p=(function(){return yl()})();return i.forEach(((_,v)=>{const A=r.get(v.key);l.has(v.key)&&(A===void 0||A.mutation instanceof zr)?c=c.insert(v.key,v):A!==void 0?(d.set(v.key,A.mutation.getFieldMask()),_l(A.mutation,v,A.mutation.getFieldMask(),te.now())):d.set(v.key,Kn.empty())})),this.recalculateAndSaveOverlays(t,c).next((_=>(_.forEach(((v,A)=>d.set(v,A))),i.forEach(((v,A)=>p.set(v,new oR(A,d.get(v)??null)))),p)))}recalculateAndSaveOverlays(t,i){const r=yl();let l=new oe(((d,p)=>d-p)),c=Ot();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,i).next((d=>{for(const p of d)p.keys().forEach((_=>{const v=i.get(_);if(v===null)return;let A=r.get(_)||Kn.empty();A=p.applyToLocalView(v,A),r.set(_,A);const S=(l.get(p.batchId)||Ot()).add(_);l=l.insert(p.batchId,S)}))})).next((()=>{const d=[],p=l.getReverseIterator();for(;p.hasNext();){const _=p.getNext(),v=_.key,A=_.value,S=k0();A.forEach((k=>{if(!c.has(k)){const F=B0(i.get(k),r.get(k));F!==null&&S.set(k,F),c=c.add(k)}})),d.push(this.documentOverlayCache.saveOverlays(t,v,S))}return Y.waitFor(d)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(t,i){return this.remoteDocumentCache.getEntries(t,i).next((r=>this.recalculateAndSaveOverlays(t,r)))}getDocumentsMatchingQuery(t,i,r,l){return(function(d){return ut.isDocumentKey(d.path)&&d.collectionGroup===null&&d.filters.length===0})(i)?this.getDocumentsMatchingDocumentQuery(t,i.path):cb(i)?this.getDocumentsMatchingCollectionGroupQuery(t,i,r,l):this.getDocumentsMatchingCollectionQuery(t,i,r,l)}getNextDocuments(t,i,r,l){return this.remoteDocumentCache.getAllFromCollectionGroup(t,i,r,l).next((c=>{const d=l-c.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,i,r.largestBatchId,l-c.size):Y.resolve(Dr());let p=Tl,_=c;return d.next((v=>Y.forEach(v,((A,S)=>(p<S.largestBatchId&&(p=S.largestBatchId),c.get(A)?Y.resolve():this.remoteDocumentCache.getEntry(t,A).next((k=>{_=_.insert(A,k)}))))).next((()=>this.populateOverlays(t,v,c))).next((()=>this.computeViews(t,_,v,Ot()))).next((A=>({batchId:p,changes:V0(A)})))))}))}getDocumentsMatchingDocumentQuery(t,i){return this.getDocument(t,new ut(i)).next((r=>{let l=hl();return r.isFoundDocument()&&(l=l.insert(r.key,r)),l}))}getDocumentsMatchingCollectionGroupQuery(t,i,r,l){const c=i.collectionGroup;let d=hl();return this.indexManager.getCollectionParents(t,c).next((p=>Y.forEach(p,(_=>{const v=(function(S,k){return new eh(k,null,S.explicitOrderBy.slice(),S.filters.slice(),S.limit,S.limitType,S.startAt,S.endAt)})(i,_.child(c));return this.getDocumentsMatchingCollectionQuery(t,v,r,l).next((A=>{A.forEach(((S,k)=>{d=d.insert(S,k)}))}))})).next((()=>d))))}getDocumentsMatchingCollectionQuery(t,i,r,l){let c;return this.documentOverlayCache.getOverlaysForCollection(t,i.path,r.largestBatchId).next((d=>(c=d,this.remoteDocumentCache.getDocumentsMatchingQuery(t,i,r,c,l)))).next((d=>{c.forEach(((_,v)=>{const A=v.getKey();d.get(A)===null&&(d=d.insert(A,Xe.newInvalidDocument(A)))}));let p=hl();return d.forEach(((_,v)=>{const A=c.get(_);A!==void 0&&_l(A.mutation,v,Kn.empty(),te.now()),ih(i,v)&&(p=p.insert(_,v))})),p}))}}/**
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
 */class uR{constructor(t){this.serializer=t,this.Lr=new Map,this.kr=new Map}getBundleMetadata(t,i){return Y.resolve(this.Lr.get(i))}saveBundleMetadata(t,i){return this.Lr.set(i.id,(function(l){return{id:l.id,version:l.version,createTime:vi(l.createTime)}})(i)),Y.resolve()}getNamedQuery(t,i){return Y.resolve(this.kr.get(i))}saveNamedQuery(t,i){return this.kr.set(i.name,(function(l){return{name:l.name,query:Jb(l.bundledQuery),readTime:vi(l.readTime)}})(i)),Y.resolve()}}/**
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
 */class cR{constructor(){this.overlays=new oe(ut.comparator),this.qr=new Map}getOverlay(t,i){return Y.resolve(this.overlays.get(i))}getOverlays(t,i){const r=Dr();return Y.forEach(i,(l=>this.getOverlay(t,l).next((c=>{c!==null&&r.set(l,c)})))).next((()=>r))}saveOverlays(t,i,r){return r.forEach(((l,c)=>{this.St(t,i,c)})),Y.resolve()}removeOverlaysForBatchId(t,i,r){const l=this.qr.get(r);return l!==void 0&&(l.forEach((c=>this.overlays=this.overlays.remove(c))),this.qr.delete(r)),Y.resolve()}getOverlaysForCollection(t,i,r){const l=Dr(),c=i.length+1,d=new ut(i.child("")),p=this.overlays.getIteratorFrom(d);for(;p.hasNext();){const _=p.getNext().value,v=_.getKey();if(!i.isPrefixOf(v.path))break;v.path.length===c&&_.largestBatchId>r&&l.set(_.getKey(),_)}return Y.resolve(l)}getOverlaysForCollectionGroup(t,i,r,l){let c=new oe(((v,A)=>v-A));const d=this.overlays.getIterator();for(;d.hasNext();){const v=d.getNext().value;if(v.getKey().getCollectionGroup()===i&&v.largestBatchId>r){let A=c.get(v.largestBatchId);A===null&&(A=Dr(),c=c.insert(v.largestBatchId,A)),A.set(v.getKey(),v)}}const p=Dr(),_=c.getIterator();for(;_.hasNext()&&(_.getNext().value.forEach(((v,A)=>p.set(v,A))),!(p.size()>=l)););return Y.resolve(p)}St(t,i,r){const l=this.overlays.get(r.key);if(l!==null){const d=this.qr.get(l.largestBatchId).delete(r.key);this.qr.set(l.largestBatchId,d)}this.overlays=this.overlays.insert(r.key,new Ib(i,r));let c=this.qr.get(i);c===void 0&&(c=Ot(),this.qr.set(i,c)),this.qr.set(i,c.add(r.key))}}/**
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
 */class hR{constructor(){this.sessionToken=Fe.EMPTY_BYTE_STRING}getSessionToken(t){return Y.resolve(this.sessionToken)}setSessionToken(t,i){return this.sessionToken=i,Y.resolve()}}/**
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
 */class vm{constructor(){this.Qr=new Oe(Ue.$r),this.Ur=new Oe(Ue.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(t,i){const r=new Ue(t,i);this.Qr=this.Qr.add(r),this.Ur=this.Ur.add(r)}Wr(t,i){t.forEach((r=>this.addReference(r,i)))}removeReference(t,i){this.Gr(new Ue(t,i))}zr(t,i){t.forEach((r=>this.removeReference(r,i)))}jr(t){const i=new ut(new ae([])),r=new Ue(i,t),l=new Ue(i,t+1),c=[];return this.Ur.forEachInRange([r,l],(d=>{this.Gr(d),c.push(d.key)})),c}Jr(){this.Qr.forEach((t=>this.Gr(t)))}Gr(t){this.Qr=this.Qr.delete(t),this.Ur=this.Ur.delete(t)}Hr(t){const i=new ut(new ae([])),r=new Ue(i,t),l=new Ue(i,t+1);let c=Ot();return this.Ur.forEachInRange([r,l],(d=>{c=c.add(d.key)})),c}containsKey(t){const i=new Ue(t,0),r=this.Qr.firstAfterOrEqual(i);return r!==null&&t.isEqual(r.key)}}class Ue{constructor(t,i){this.key=t,this.Yr=i}static $r(t,i){return ut.comparator(t.key,i.key)||Nt(t.Yr,i.Yr)}static Kr(t,i){return Nt(t.Yr,i.Yr)||ut.comparator(t.key,i.key)}}/**
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
 */class fR{constructor(t,i){this.indexManager=t,this.referenceDelegate=i,this.mutationQueue=[],this.tr=1,this.Zr=new Oe(Ue.$r)}checkEmpty(t){return Y.resolve(this.mutationQueue.length===0)}addMutationBatch(t,i,r,l){const c=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const d=new Cb(c,i,r,l);this.mutationQueue.push(d);for(const p of l)this.Zr=this.Zr.add(new Ue(p.key,c)),this.indexManager.addToCollectionParentIndex(t,p.key.path.popLast());return Y.resolve(d)}lookupMutationBatch(t,i){return Y.resolve(this.Xr(i))}getNextMutationBatchAfterBatchId(t,i){const r=i+1,l=this.ei(r),c=l<0?0:l;return Y.resolve(this.mutationQueue.length>c?this.mutationQueue[c]:null)}getHighestUnacknowledgedBatchId(){return Y.resolve(this.mutationQueue.length===0?um:this.tr-1)}getAllMutationBatches(t){return Y.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,i){const r=new Ue(i,0),l=new Ue(i,Number.POSITIVE_INFINITY),c=[];return this.Zr.forEachInRange([r,l],(d=>{const p=this.Xr(d.Yr);c.push(p)})),Y.resolve(c)}getAllMutationBatchesAffectingDocumentKeys(t,i){let r=new Oe(Nt);return i.forEach((l=>{const c=new Ue(l,0),d=new Ue(l,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([c,d],(p=>{r=r.add(p.Yr)}))})),Y.resolve(this.ti(r))}getAllMutationBatchesAffectingQuery(t,i){const r=i.path,l=r.length+1;let c=r;ut.isDocumentKey(c)||(c=c.child(""));const d=new Ue(new ut(c),0);let p=new Oe(Nt);return this.Zr.forEachWhile((_=>{const v=_.key.path;return!!r.isPrefixOf(v)&&(v.length===l&&(p=p.add(_.Yr)),!0)}),d),Y.resolve(this.ti(p))}ti(t){const i=[];return t.forEach((r=>{const l=this.Xr(r);l!==null&&i.push(l)})),i}removeMutationBatch(t,i){Ht(this.ni(i.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Zr;return Y.forEach(i.mutations,(l=>{const c=new Ue(l.key,i.batchId);return r=r.delete(c),this.referenceDelegate.markPotentiallyOrphaned(t,l.key)})).next((()=>{this.Zr=r}))}ir(t){}containsKey(t,i){const r=new Ue(i,0),l=this.Zr.firstAfterOrEqual(r);return Y.resolve(i.isEqual(l&&l.key))}performConsistencyCheck(t){return this.mutationQueue.length,Y.resolve()}ni(t,i){return this.ei(t)}ei(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Xr(t){const i=this.ei(t);return i<0||i>=this.mutationQueue.length?null:this.mutationQueue[i]}}/**
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
 */class dR{constructor(t){this.ri=t,this.docs=(function(){return new oe(ut.comparator)})(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,i){const r=i.key,l=this.docs.get(r),c=l?l.size:0,d=this.ri(i);return this.docs=this.docs.insert(r,{document:i.mutableCopy(),size:d}),this.size+=d-c,this.indexManager.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const i=this.docs.get(t);i&&(this.docs=this.docs.remove(t),this.size-=i.size)}getEntry(t,i){const r=this.docs.get(i);return Y.resolve(r?r.document.mutableCopy():Xe.newInvalidDocument(i))}getEntries(t,i){let r=Zi();return i.forEach((l=>{const c=this.docs.get(l);r=r.insert(l,c?c.document.mutableCopy():Xe.newInvalidDocument(l))})),Y.resolve(r)}getDocumentsMatchingQuery(t,i,r,l){let c=Zi();const d=i.path,p=new ut(d.child("__id-9223372036854775808__")),_=this.docs.getIteratorFrom(p);for(;_.hasNext();){const{key:v,value:{document:A}}=_.getNext();if(!d.isPrefixOf(v.path))break;v.path.length>d.length+1||q2(B2(A),r)<=0||(l.has(A.key)||ih(i,A))&&(c=c.insert(A.key,A.mutableCopy()))}return Y.resolve(c)}getAllFromCollectionGroup(t,i,r,l){ft(9500)}ii(t,i){return Y.forEach(this.docs,(r=>i(r)))}newChangeBuffer(t){return new mR(this)}getSize(t){return Y.resolve(this.size)}}class mR extends aR{constructor(t){super(),this.Nr=t}applyChanges(t){const i=[];return this.changes.forEach(((r,l)=>{l.isValidDocument()?i.push(this.Nr.addEntry(t,l)):this.Nr.removeEntry(r)})),Y.waitFor(i)}getFromCache(t,i){return this.Nr.getEntry(t,i)}getAllFromCache(t,i){return this.Nr.getEntries(t,i)}}/**
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
 */class gR{constructor(t){this.persistence=t,this.si=new Pr((i=>fm(i)),dm),this.lastRemoteSnapshotVersion=pt.min(),this.highestTargetId=0,this.oi=0,this._i=new vm,this.targetCount=0,this.ai=Ya.ur()}forEachTarget(t,i){return this.si.forEach(((r,l)=>i(l))),Y.resolve()}getLastRemoteSnapshotVersion(t){return Y.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return Y.resolve(this.oi)}allocateTargetId(t){return this.highestTargetId=this.ai.next(),Y.resolve(this.highestTargetId)}setTargetsMetadata(t,i,r){return r&&(this.lastRemoteSnapshotVersion=r),i>this.oi&&(this.oi=i),Y.resolve()}Pr(t){this.si.set(t.target,t);const i=t.targetId;i>this.highestTargetId&&(this.ai=new Ya(i),this.highestTargetId=i),t.sequenceNumber>this.oi&&(this.oi=t.sequenceNumber)}addTargetData(t,i){return this.Pr(i),this.targetCount+=1,Y.resolve()}updateTargetData(t,i){return this.Pr(i),Y.resolve()}removeTargetData(t,i){return this.si.delete(i.target),this._i.jr(i.targetId),this.targetCount-=1,Y.resolve()}removeTargets(t,i,r){let l=0;const c=[];return this.si.forEach(((d,p)=>{p.sequenceNumber<=i&&r.get(p.targetId)===null&&(this.si.delete(d),c.push(this.removeMatchingKeysForTargetId(t,p.targetId)),l++)})),Y.waitFor(c).next((()=>l))}getTargetCount(t){return Y.resolve(this.targetCount)}getTargetData(t,i){const r=this.si.get(i)||null;return Y.resolve(r)}addMatchingKeys(t,i,r){return this._i.Wr(i,r),Y.resolve()}removeMatchingKeys(t,i,r){this._i.zr(i,r);const l=this.persistence.referenceDelegate,c=[];return l&&i.forEach((d=>{c.push(l.markPotentiallyOrphaned(t,d))})),Y.waitFor(c)}removeMatchingKeysForTargetId(t,i){return this._i.jr(i),Y.resolve()}getMatchingKeysForTargetId(t,i){const r=this._i.Hr(i);return Y.resolve(r)}containsKey(t,i){return Y.resolve(this._i.containsKey(i))}}/**
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
 */class tE{constructor(t,i){this.ui={},this.overlays={},this.ci=new Jc(0),this.li=!1,this.li=!0,this.hi=new hR,this.referenceDelegate=t(this),this.Pi=new gR(this),this.indexManager=new Wb,this.remoteDocumentCache=(function(l){return new dR(l)})((r=>this.referenceDelegate.Ti(r))),this.serializer=new $b(i),this.Ii=new uR(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let i=this.overlays[t.toKey()];return i||(i=new cR,this.overlays[t.toKey()]=i),i}getMutationQueue(t,i){let r=this.ui[t.toKey()];return r||(r=new fR(i,this.referenceDelegate),this.ui[t.toKey()]=r),r}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(t,i,r){nt("MemoryPersistence","Starting transaction:",t);const l=new pR(this.ci.next());return this.referenceDelegate.Ei(),r(l).next((c=>this.referenceDelegate.di(l).next((()=>c)))).toPromise().then((c=>(l.raiseOnCommittedEvent(),c)))}Ai(t,i){return Y.or(Object.values(this.ui).map((r=>()=>r.containsKey(t,i))))}}class pR extends j2{constructor(t){super(),this.currentSequenceNumber=t}}class Em{constructor(t){this.persistence=t,this.Ri=new vm,this.Vi=null}static mi(t){return new Em(t)}get fi(){if(this.Vi)return this.Vi;throw ft(60996)}addReference(t,i,r){return this.Ri.addReference(r,i),this.fi.delete(r.toString()),Y.resolve()}removeReference(t,i,r){return this.Ri.removeReference(r,i),this.fi.add(r.toString()),Y.resolve()}markPotentiallyOrphaned(t,i){return this.fi.add(i.toString()),Y.resolve()}removeTarget(t,i){this.Ri.jr(i.targetId).forEach((l=>this.fi.add(l.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(t,i.targetId).next((l=>{l.forEach((c=>this.fi.add(c.toString())))})).next((()=>r.removeTargetData(t,i)))}Ei(){this.Vi=new Set}di(t){const i=this.persistence.getRemoteDocumentCache().newChangeBuffer();return Y.forEach(this.fi,(r=>{const l=ut.fromPath(r);return this.gi(t,l).next((c=>{c||i.removeEntry(l,pt.min())}))})).next((()=>(this.Vi=null,i.apply(t))))}updateLimboDocument(t,i){return this.gi(t,i).next((r=>{r?this.fi.delete(i.toString()):this.fi.add(i.toString())}))}Ti(t){return 0}gi(t,i){return Y.or([()=>Y.resolve(this.Ri.containsKey(i)),()=>this.persistence.getTargetCache().containsKey(t,i),()=>this.persistence.Ai(t,i)])}}class Bc{constructor(t,i){this.persistence=t,this.pi=new Pr((r=>Q2(r.path)),((r,l)=>r.isEqual(l))),this.garbageCollector=rR(this,i)}static mi(t,i){return new Bc(t,i)}Ei(){}di(t){return Y.resolve()}forEachTarget(t,i){return this.persistence.getTargetCache().forEachTarget(t,i)}gr(t){const i=this.wr(t);return this.persistence.getTargetCache().getTargetCount(t).next((r=>i.next((l=>r+l))))}wr(t){let i=0;return this.pr(t,(r=>{i++})).next((()=>i))}pr(t,i){return Y.forEach(this.pi,((r,l)=>this.br(t,r,l).next((c=>c?Y.resolve():i(l)))))}removeTargets(t,i,r){return this.persistence.getTargetCache().removeTargets(t,i,r)}removeOrphanedDocuments(t,i){let r=0;const l=this.persistence.getRemoteDocumentCache(),c=l.newChangeBuffer();return l.ii(t,(d=>this.br(t,d,i).next((p=>{p||(r++,c.removeEntry(d,pt.min()))})))).next((()=>c.apply(t))).next((()=>r))}markPotentiallyOrphaned(t,i){return this.pi.set(i,t.currentSequenceNumber),Y.resolve()}removeTarget(t,i){const r=i.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,r)}addReference(t,i,r){return this.pi.set(r,t.currentSequenceNumber),Y.resolve()}removeReference(t,i,r){return this.pi.set(r,t.currentSequenceNumber),Y.resolve()}updateLimboDocument(t,i){return this.pi.set(i,t.currentSequenceNumber),Y.resolve()}Ti(t){let i=t.key.toString().length;return t.isFoundDocument()&&(i+=Tc(t.data.value)),i}br(t,i,r){return Y.or([()=>this.persistence.Ai(t,i),()=>this.persistence.getTargetCache().containsKey(t,i),()=>{const l=this.pi.get(i);return Y.resolve(l!==void 0&&l>r)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
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
 */class Tm{constructor(t,i,r,l){this.targetId=t,this.fromCache=i,this.Es=r,this.ds=l}static As(t,i){let r=Ot(),l=Ot();for(const c of i.docChanges)switch(c.type){case 0:r=r.add(c.doc.key);break;case 1:l=l.add(c.doc.key)}return new Tm(t,i.fromCache,r,l)}}/**
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
 */class yR{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
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
 */class _R{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=(function(){return aS()?8:G2(Ze())>0?6:4})()}initialize(t,i){this.ps=t,this.indexManager=i,this.Rs=!0}getDocumentsMatchingQuery(t,i,r,l){const c={result:null};return this.ys(t,i).next((d=>{c.result=d})).next((()=>{if(!c.result)return this.ws(t,i,l,r).next((d=>{c.result=d}))})).next((()=>{if(c.result)return;const d=new yR;return this.Ss(t,i,d).next((p=>{if(c.result=p,this.Vs)return this.bs(t,i,d,p.size)}))})).next((()=>c.result))}bs(t,i,r,l){return r.documentReadCount<this.fs?(Oa()<=Dt.DEBUG&&nt("QueryEngine","SDK will not create cache indexes for query:",Ma(i),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),Y.resolve()):(Oa()<=Dt.DEBUG&&nt("QueryEngine","Query:",Ma(i),"scans",r.documentReadCount,"local documents and returns",l,"documents as results."),r.documentReadCount>this.gs*l?(Oa()<=Dt.DEBUG&&nt("QueryEngine","The SDK decides to create cache indexes for query:",Ma(i),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,_i(i))):Y.resolve())}ys(t,i){if(Y_(i))return Y.resolve(null);let r=_i(i);return this.indexManager.getIndexType(t,r).next((l=>l===0?null:(i.limit!==null&&l===1&&(i=jd(i,null,"F"),r=_i(i)),this.indexManager.getDocumentsMatchingTarget(t,r).next((c=>{const d=Ot(...c);return this.ps.getDocuments(t,d).next((p=>this.indexManager.getMinOffset(t,r).next((_=>{const v=this.Ds(i,p);return this.Cs(i,v,d,_.readTime)?this.ys(t,jd(i,null,"F")):this.vs(t,v,i,_)}))))})))))}ws(t,i,r,l){return Y_(i)||l.isEqual(pt.min())?Y.resolve(null):this.ps.getDocuments(t,r).next((c=>{const d=this.Ds(i,c);return this.Cs(i,d,r,l)?Y.resolve(null):(Oa()<=Dt.DEBUG&&nt("QueryEngine","Re-using previous result from %s to execute query: %s",l.toString(),Ma(i)),this.vs(t,d,i,z2(l,Tl)).next((p=>p)))}))}Ds(t,i){let r=new Oe(O0(t));return i.forEach(((l,c)=>{ih(t,c)&&(r=r.add(c))})),r}Cs(t,i,r,l){if(t.limit===null)return!1;if(r.size!==i.size)return!0;const c=t.limitType==="F"?i.last():i.first();return!!c&&(c.hasPendingWrites||c.version.compareTo(l)>0)}Ss(t,i,r){return Oa()<=Dt.DEBUG&&nt("QueryEngine","Using full collection scan to execute query:",Ma(i)),this.ps.getDocumentsMatchingQuery(t,i,Gs.min(),r)}vs(t,i,r,l){return this.ps.getDocumentsMatchingQuery(t,r,l).next((c=>(i.forEach((d=>{c=c.insert(d.key,d)})),c)))}}/**
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
 */const Am="LocalStore",vR=3e8;class ER{constructor(t,i,r,l){this.persistence=t,this.Fs=i,this.serializer=l,this.Ms=new oe(Nt),this.xs=new Pr((c=>fm(c)),dm),this.Os=new Map,this.Ns=t.getRemoteDocumentCache(),this.Pi=t.getTargetCache(),this.Ii=t.getBundleCache(),this.Bs(r)}Bs(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new lR(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(i=>t.collect(i,this.Ms)))}}function TR(a,t,i,r){return new ER(a,t,i,r)}async function eE(a,t){const i=vt(a);return await i.persistence.runTransaction("Handle user change","readonly",(r=>{let l;return i.mutationQueue.getAllMutationBatches(r).next((c=>(l=c,i.Bs(t),i.mutationQueue.getAllMutationBatches(r)))).next((c=>{const d=[],p=[];let _=Ot();for(const v of l){d.push(v.batchId);for(const A of v.mutations)_=_.add(A.key)}for(const v of c){p.push(v.batchId);for(const A of v.mutations)_=_.add(A.key)}return i.localDocuments.getDocuments(r,_).next((v=>({Ls:v,removedBatchIds:d,addedBatchIds:p})))}))}))}function AR(a,t){const i=vt(a);return i.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const l=t.batch.keys(),c=i.Ns.newChangeBuffer({trackRemovals:!0});return(function(p,_,v,A){const S=v.batch,k=S.keys();let F=Y.resolve();return k.forEach((J=>{F=F.next((()=>A.getEntry(_,J))).next((et=>{const Z=v.docVersions.get(J);Ht(Z!==null,48541),et.version.compareTo(Z)<0&&(S.applyToRemoteDocument(et,v),et.isValidDocument()&&(et.setReadTime(v.commitVersion),A.addEntry(et)))}))})),F.next((()=>p.mutationQueue.removeMutationBatch(_,S)))})(i,r,t,c).next((()=>c.apply(r))).next((()=>i.mutationQueue.performConsistencyCheck(r))).next((()=>i.documentOverlayCache.removeOverlaysForBatchId(r,l,t.batch.batchId))).next((()=>i.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(p){let _=Ot();for(let v=0;v<p.mutationResults.length;++v)p.mutationResults[v].transformResults.length>0&&(_=_.add(p.batch.mutations[v].key));return _})(t)))).next((()=>i.localDocuments.getDocuments(r,l)))}))}function nE(a){const t=vt(a);return t.persistence.runTransaction("Get last remote snapshot version","readonly",(i=>t.Pi.getLastRemoteSnapshotVersion(i)))}function SR(a,t){const i=vt(a),r=t.snapshotVersion;let l=i.Ms;return i.persistence.runTransaction("Apply remote event","readwrite-primary",(c=>{const d=i.Ns.newChangeBuffer({trackRemovals:!0});l=i.Ms;const p=[];t.targetChanges.forEach(((A,S)=>{const k=l.get(S);if(!k)return;p.push(i.Pi.removeMatchingKeys(c,A.removedDocuments,S).next((()=>i.Pi.addMatchingKeys(c,A.addedDocuments,S))));let F=k.withSequenceNumber(c.currentSequenceNumber);t.targetMismatches.get(S)!==null?F=F.withResumeToken(Fe.EMPTY_BYTE_STRING,pt.min()).withLastLimboFreeSnapshotVersion(pt.min()):A.resumeToken.approximateByteSize()>0&&(F=F.withResumeToken(A.resumeToken,r)),l=l.insert(S,F),(function(et,Z,ht){return et.resumeToken.approximateByteSize()===0||Z.snapshotVersion.toMicroseconds()-et.snapshotVersion.toMicroseconds()>=vR?!0:ht.addedDocuments.size+ht.modifiedDocuments.size+ht.removedDocuments.size>0})(k,F,A)&&p.push(i.Pi.updateTargetData(c,F))}));let _=Zi(),v=Ot();if(t.documentUpdates.forEach((A=>{t.resolvedLimboDocuments.has(A)&&p.push(i.persistence.referenceDelegate.updateLimboDocument(c,A))})),p.push(bR(c,d,t.documentUpdates).next((A=>{_=A.ks,v=A.qs}))),!r.isEqual(pt.min())){const A=i.Pi.getLastRemoteSnapshotVersion(c).next((S=>i.Pi.setTargetsMetadata(c,c.currentSequenceNumber,r)));p.push(A)}return Y.waitFor(p).next((()=>d.apply(c))).next((()=>i.localDocuments.getLocalViewOfDocuments(c,_,v))).next((()=>_))})).then((c=>(i.Ms=l,c)))}function bR(a,t,i){let r=Ot(),l=Ot();return i.forEach((c=>r=r.add(c))),t.getEntries(a,r).next((c=>{let d=Zi();return i.forEach(((p,_)=>{const v=c.get(p);_.isFoundDocument()!==v.isFoundDocument()&&(l=l.add(p)),_.isNoDocument()&&_.version.isEqual(pt.min())?(t.removeEntry(p,_.readTime),d=d.insert(p,_)):!v.isValidDocument()||_.version.compareTo(v.version)>0||_.version.compareTo(v.version)===0&&v.hasPendingWrites?(t.addEntry(_),d=d.insert(p,_)):nt(Am,"Ignoring outdated watch update for ",p,". Current version:",v.version," Watch version:",_.version)})),{ks:d,qs:l}}))}function RR(a,t){const i=vt(a);return i.persistence.runTransaction("Get next mutation batch","readonly",(r=>(t===void 0&&(t=um),i.mutationQueue.getNextMutationBatchAfterBatchId(r,t))))}function wR(a,t){const i=vt(a);return i.persistence.runTransaction("Allocate target","readwrite",(r=>{let l;return i.Pi.getTargetData(r,t).next((c=>c?(l=c,Y.resolve(l)):i.Pi.allocateTargetId(r).next((d=>(l=new Ps(t,d,"TargetPurposeListen",r.currentSequenceNumber),i.Pi.addTargetData(r,l).next((()=>l)))))))})).then((r=>{const l=i.Ms.get(r.targetId);return(l===null||r.snapshotVersion.compareTo(l.snapshotVersion)>0)&&(i.Ms=i.Ms.insert(r.targetId,r),i.xs.set(t,r.targetId)),r}))}async function Yd(a,t,i){const r=vt(a),l=r.Ms.get(t),c=i?"readwrite":"readwrite-primary";try{i||await r.persistence.runTransaction("Release target",c,(d=>r.persistence.referenceDelegate.removeTarget(d,l)))}catch(d){if(!to(d))throw d;nt(Am,`Failed to update sequence numbers for target ${t}: ${d}`)}r.Ms=r.Ms.remove(t),r.xs.delete(l.target)}function ov(a,t,i){const r=vt(a);let l=pt.min(),c=Ot();return r.persistence.runTransaction("Execute query","readwrite",(d=>(function(_,v,A){const S=vt(_),k=S.xs.get(A);return k!==void 0?Y.resolve(S.Ms.get(k)):S.Pi.getTargetData(v,A)})(r,d,_i(t)).next((p=>{if(p)return l=p.lastLimboFreeSnapshotVersion,r.Pi.getMatchingKeysForTargetId(d,p.targetId).next((_=>{c=_}))})).next((()=>r.Fs.getDocumentsMatchingQuery(d,t,i?l:pt.min(),i?c:Ot()))).next((p=>(CR(r,fb(t),p),{documents:p,Qs:c})))))}function CR(a,t,i){let r=a.Os.get(t)||pt.min();i.forEach(((l,c)=>{c.readTime.compareTo(r)>0&&(r=c.readTime)})),a.Os.set(t,r)}class lv{constructor(){this.activeTargetIds=_b()}zs(t){this.activeTargetIds=this.activeTargetIds.add(t)}js(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Gs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class IR{constructor(){this.Mo=new lv,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,i,r){}addLocalQueryTarget(t,i=!0){return i&&this.Mo.zs(t),this.xo[t]||"not-current"}updateQueryState(t,i,r){this.xo[t]=i}removeLocalQueryTarget(t){this.Mo.js(t)}isLocalQueryTarget(t){return this.Mo.activeTargetIds.has(t)}clearQueryState(t){delete this.xo[t]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(t){return this.Mo.activeTargetIds.has(t)}start(){return this.Mo=new lv,Promise.resolve()}handleUserChange(t,i,r){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
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
 */class DR{Oo(t){}shutdown(){}}/**
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
 */const uv="ConnectivityMonitor";class cv{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(t){this.qo.push(t)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){nt(uv,"Network connectivity changed: AVAILABLE");for(const t of this.qo)t(0)}ko(){nt(uv,"Network connectivity changed: UNAVAILABLE");for(const t of this.qo)t(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let _c=null;function Xd(){return _c===null?_c=(function(){return 268435456+Math.round(2147483648*Math.random())})():_c++,"0x"+_c.toString(16)}/**
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
 */const Cd="RestConnection",NR={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class OR{get $o(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const i=t.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),l=encodeURIComponent(this.databaseId.database);this.Uo=i+"://"+t.host,this.Ko=`projects/${r}/databases/${l}`,this.Wo=this.databaseId.database===Vc?`project_id=${r}`:`project_id=${r}&database_id=${l}`}Go(t,i,r,l,c){const d=Xd(),p=this.zo(t,i.toUriEncodedString());nt(Cd,`Sending RPC '${t}' ${d}:`,p,r);const _={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(_,l,c);const{host:v}=new URL(p),A=Za(v);return this.Jo(t,p,_,r,A).then((S=>(nt(Cd,`Received RPC '${t}' ${d}: `,S),S)),(S=>{throw Ga(Cd,`RPC '${t}' ${d} failed with error: `,S,"url: ",p,"request:",r),S}))}Ho(t,i,r,l,c,d){return this.Go(t,i,r,l,c)}jo(t,i,r){t["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Ja})(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),i&&i.headers.forEach(((l,c)=>t[c]=l)),r&&r.headers.forEach(((l,c)=>t[c]=l))}zo(t,i){const r=NR[t];return`${this.Uo}/v1/${i}:${r}`}terminate(){}}/**
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
 */class MR{constructor(t){this.Yo=t.Yo,this.Zo=t.Zo}Xo(t){this.e_=t}t_(t){this.n_=t}r_(t){this.i_=t}onMessage(t){this.s_=t}close(){this.Zo()}send(t){this.Yo(t)}o_(){this.e_()}__(){this.n_()}a_(t){this.i_(t)}u_(t){this.s_(t)}}/**
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
 */const Ke="WebChannelConnection";class VR extends OR{constructor(t){super(t),this.c_=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}Jo(t,i,r,l,c){const d=Xd();return new Promise(((p,_)=>{const v=new a0;v.setWithCredentials(!0),v.listenOnce(o0.COMPLETE,(()=>{try{switch(v.getLastErrorCode()){case Ec.NO_ERROR:const S=v.getResponseJson();nt(Ke,`XHR for RPC '${t}' ${d} received:`,JSON.stringify(S)),p(S);break;case Ec.TIMEOUT:nt(Ke,`RPC '${t}' ${d} timed out`),_(new at(X.DEADLINE_EXCEEDED,"Request time out"));break;case Ec.HTTP_ERROR:const k=v.getStatus();if(nt(Ke,`RPC '${t}' ${d} failed with status:`,k,"response text:",v.getResponseText()),k>0){let F=v.getResponseJson();Array.isArray(F)&&(F=F[0]);const J=F==null?void 0:F.error;if(J&&J.status&&J.message){const et=(function(ht){const yt=ht.toLowerCase().replace(/_/g,"-");return Object.values(X).indexOf(yt)>=0?yt:X.UNKNOWN})(J.status);_(new at(et,J.message))}else _(new at(X.UNKNOWN,"Server responded with status "+v.getStatus()))}else _(new at(X.UNAVAILABLE,"Connection failed."));break;default:ft(9055,{l_:t,streamId:d,h_:v.getLastErrorCode(),P_:v.getLastError()})}}finally{nt(Ke,`RPC '${t}' ${d} completed.`)}}));const A=JSON.stringify(l);nt(Ke,`RPC '${t}' ${d} sending request:`,l),v.send(i,"POST",A,r,15)}))}T_(t,i,r){const l=Xd(),c=[this.Uo,"/","google.firestore.v1.Firestore","/",t,"/channel"],d=c0(),p=u0(),_={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},v=this.longPollingOptions.timeoutSeconds;v!==void 0&&(_.longPollingTimeout=Math.round(1e3*v)),this.useFetchStreams&&(_.useFetchStreams=!0),this.jo(_.initMessageHeaders,i,r),_.encodeInitMessageHeaders=!0;const A=c.join("");nt(Ke,`Creating RPC '${t}' stream ${l}: ${A}`,_);const S=d.createWebChannel(A,_);this.I_(S);let k=!1,F=!1;const J=new MR({Yo:Z=>{F?nt(Ke,`Not sending because RPC '${t}' stream ${l} is closed:`,Z):(k||(nt(Ke,`Opening RPC '${t}' stream ${l} transport.`),S.open(),k=!0),nt(Ke,`RPC '${t}' stream ${l} sending:`,Z),S.send(Z))},Zo:()=>S.close()}),et=(Z,ht,yt)=>{Z.listen(ht,(mt=>{try{yt(mt)}catch(zt){setTimeout((()=>{throw zt}),0)}}))};return et(S,cl.EventType.OPEN,(()=>{F||(nt(Ke,`RPC '${t}' stream ${l} transport opened.`),J.o_())})),et(S,cl.EventType.CLOSE,(()=>{F||(F=!0,nt(Ke,`RPC '${t}' stream ${l} transport closed`),J.a_(),this.E_(S))})),et(S,cl.EventType.ERROR,(Z=>{F||(F=!0,Ga(Ke,`RPC '${t}' stream ${l} transport errored. Name:`,Z.name,"Message:",Z.message),J.a_(new at(X.UNAVAILABLE,"The operation could not be completed")))})),et(S,cl.EventType.MESSAGE,(Z=>{var ht;if(!F){const yt=Z.data[0];Ht(!!yt,16349);const mt=yt,zt=(mt==null?void 0:mt.error)||((ht=mt[0])==null?void 0:ht.error);if(zt){nt(Ke,`RPC '${t}' stream ${l} received error:`,zt);const ee=zt.status;let Vt=(function(C){const M=be[C];if(M!==void 0)return j0(M)})(ee),I=zt.message;Vt===void 0&&(Vt=X.INTERNAL,I="Unknown error status: "+ee+" with message "+zt.message),F=!0,J.a_(new at(Vt,I)),S.close()}else nt(Ke,`RPC '${t}' stream ${l} received:`,yt),J.u_(yt)}})),et(p,l0.STAT_EVENT,(Z=>{Z.stat===xd.PROXY?nt(Ke,`RPC '${t}' stream ${l} detected buffering proxy`):Z.stat===xd.NOPROXY&&nt(Ke,`RPC '${t}' stream ${l} detected no buffering proxy`)})),setTimeout((()=>{J.__()}),0),J}terminate(){this.c_.forEach((t=>t.close())),this.c_=[]}I_(t){this.c_.push(t)}E_(t){this.c_=this.c_.filter((i=>i===t))}}function Id(){return typeof document<"u"?document:null}/**
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
 */function oh(a){return new xb(a,!0)}/**
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
 */class iE{constructor(t,i,r=1e3,l=1.5,c=6e4){this.Mi=t,this.timerId=i,this.d_=r,this.A_=l,this.R_=c,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(t){this.cancel();const i=Math.floor(this.V_+this.y_()),r=Math.max(0,Date.now()-this.f_),l=Math.max(0,i-r);l>0&&nt("ExponentialBackoff",`Backing off for ${l} ms (base delay: ${this.V_} ms, delay with jitter: ${i} ms, last attempt: ${r} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,l,(()=>(this.f_=Date.now(),t()))),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
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
 */const hv="PersistentStream";class sE{constructor(t,i,r,l,c,d,p,_){this.Mi=t,this.S_=r,this.b_=l,this.connection=c,this.authCredentialsProvider=d,this.appCheckCredentialsProvider=p,this.listener=_,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new iE(t,i)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(t){this.Q_(),this.stream.send(t)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(t,i){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,t!==4?this.M_.reset():i&&i.code===X.RESOURCE_EXHAUSTED?(Xi(i.toString()),Xi("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):i&&i.code===X.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.r_(i)}K_(){}auth(){this.state=1;const t=this.W_(this.D_),i=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,l])=>{this.D_===i&&this.G_(r,l)}),(r=>{t((()=>{const l=new at(X.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(l)}))}))}G_(t,i){const r=this.W_(this.D_);this.stream=this.j_(t,i),this.stream.Xo((()=>{r((()=>this.listener.Xo()))})),this.stream.t_((()=>{r((()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.t_())))})),this.stream.r_((l=>{r((()=>this.z_(l)))})),this.stream.onMessage((l=>{r((()=>++this.F_==1?this.J_(l):this.onNext(l)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(t){return nt(hv,`close with error: ${t}`),this.stream=null,this.close(4,t)}W_(t){return i=>{this.Mi.enqueueAndForget((()=>this.D_===t?i():(nt(hv,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class kR extends sE{constructor(t,i,r,l,c,d){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",i,r,l,d),this.serializer=c}j_(t,i){return this.connection.T_("Listen",t,i)}J_(t){return this.onNext(t)}onNext(t){this.M_.reset();const i=Bb(this.serializer,t),r=(function(c){if(!("targetChange"in c))return pt.min();const d=c.targetChange;return d.targetIds&&d.targetIds.length?pt.min():d.readTime?vi(d.readTime):pt.min()})(t);return this.listener.H_(i,r)}Y_(t){const i={};i.database=Kd(this.serializer),i.addTarget=(function(c,d){let p;const _=d.target;if(p=Hd(_)?{documents:jb(c,_)}:{query:Gb(c,_).ft},p.targetId=d.targetId,d.resumeToken.approximateByteSize()>0){p.resumeToken=Q0(c,d.resumeToken);const v=Gd(c,d.expectedCount);v!==null&&(p.expectedCount=v)}else if(d.snapshotVersion.compareTo(pt.min())>0){p.readTime=zc(c,d.snapshotVersion.toTimestamp());const v=Gd(c,d.expectedCount);v!==null&&(p.expectedCount=v)}return p})(this.serializer,t);const r=Qb(this.serializer,t);r&&(i.labels=r),this.q_(i)}Z_(t){const i={};i.database=Kd(this.serializer),i.removeTarget=t,this.q_(i)}}class UR extends sE{constructor(t,i,r,l,c,d){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",i,r,l,d),this.serializer=c}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(t,i){return this.connection.T_("Write",t,i)}J_(t){return Ht(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,Ht(!t.writeResults||t.writeResults.length===0,55816),this.listener.ta()}onNext(t){Ht(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.M_.reset();const i=Hb(t.writeResults,t.commitTime),r=vi(t.commitTime);return this.listener.na(r,i)}ra(){const t={};t.database=Kd(this.serializer),this.q_(t)}ea(t){const i={streamToken:this.lastStreamToken,writes:t.map((r=>qb(this.serializer,r)))};this.q_(i)}}/**
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
 */class LR{}class xR extends LR{constructor(t,i,r,l){super(),this.authCredentials=t,this.appCheckCredentials=i,this.connection=r,this.serializer=l,this.ia=!1}sa(){if(this.ia)throw new at(X.FAILED_PRECONDITION,"The client has already been terminated.")}Go(t,i,r,l){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([c,d])=>this.connection.Go(t,Fd(i,r),l,c,d))).catch((c=>{throw c.name==="FirebaseError"?(c.code===X.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),c):new at(X.UNKNOWN,c.toString())}))}Ho(t,i,r,l,c){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([d,p])=>this.connection.Ho(t,Fd(i,r),l,d,p,c))).catch((d=>{throw d.name==="FirebaseError"?(d.code===X.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),d):new at(X.UNKNOWN,d.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}class PR{constructor(t,i){this.asyncQueue=t,this.onlineStateHandler=i,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(t){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.ca("Offline")))}set(t){this.Pa(),this.oa=0,t==="Online"&&(this.aa=!1),this.ca(t)}ca(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}la(t){const i=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(Xi(i),this.aa=!1):nt("OnlineStateTracker",i)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
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
 */const Ur="RemoteStore";class zR{constructor(t,i,r,l,c){this.localStore=t,this.datastore=i,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=c,this.Aa.Oo((d=>{r.enqueueAndForget((async()=>{Br(this)&&(nt(Ur,"Restarting streams for network reachability change."),await(async function(_){const v=vt(_);v.Ea.add(4),await kl(v),v.Ra.set("Unknown"),v.Ea.delete(4),await lh(v)})(this))}))})),this.Ra=new PR(r,l)}}async function lh(a){if(Br(a))for(const t of a.da)await t(!0)}async function kl(a){for(const t of a.da)await t(!1)}function rE(a,t){const i=vt(a);i.Ia.has(t.targetId)||(i.Ia.set(t.targetId,t),wm(i)?Rm(i):eo(i).O_()&&bm(i,t))}function Sm(a,t){const i=vt(a),r=eo(i);i.Ia.delete(t),r.O_()&&aE(i,t),i.Ia.size===0&&(r.O_()?r.L_():Br(i)&&i.Ra.set("Unknown"))}function bm(a,t){if(a.Va.Ue(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(pt.min())>0){const i=a.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(i)}eo(a).Y_(t)}function aE(a,t){a.Va.Ue(t),eo(a).Z_(t)}function Rm(a){a.Va=new Vb({getRemoteKeysForTarget:t=>a.remoteSyncer.getRemoteKeysForTarget(t),At:t=>a.Ia.get(t)||null,ht:()=>a.datastore.serializer.databaseId}),eo(a).start(),a.Ra.ua()}function wm(a){return Br(a)&&!eo(a).x_()&&a.Ia.size>0}function Br(a){return vt(a).Ea.size===0}function oE(a){a.Va=void 0}async function BR(a){a.Ra.set("Online")}async function qR(a){a.Ia.forEach(((t,i)=>{bm(a,t)}))}async function HR(a,t){oE(a),wm(a)?(a.Ra.ha(t),Rm(a)):a.Ra.set("Unknown")}async function jR(a,t,i){if(a.Ra.set("Online"),t instanceof F0&&t.state===2&&t.cause)try{await(async function(l,c){const d=c.cause;for(const p of c.targetIds)l.Ia.has(p)&&(await l.remoteSyncer.rejectListen(p,d),l.Ia.delete(p),l.Va.removeTarget(p))})(a,t)}catch(r){nt(Ur,"Failed to remove targets %s: %s ",t.targetIds.join(","),r),await qc(a,r)}else if(t instanceof bc?a.Va.Ze(t):t instanceof G0?a.Va.st(t):a.Va.tt(t),!i.isEqual(pt.min()))try{const r=await nE(a.localStore);i.compareTo(r)>=0&&await(function(c,d){const p=c.Va.Tt(d);return p.targetChanges.forEach(((_,v)=>{if(_.resumeToken.approximateByteSize()>0){const A=c.Ia.get(v);A&&c.Ia.set(v,A.withResumeToken(_.resumeToken,d))}})),p.targetMismatches.forEach(((_,v)=>{const A=c.Ia.get(_);if(!A)return;c.Ia.set(_,A.withResumeToken(Fe.EMPTY_BYTE_STRING,A.snapshotVersion)),aE(c,_);const S=new Ps(A.target,_,v,A.sequenceNumber);bm(c,S)})),c.remoteSyncer.applyRemoteEvent(p)})(a,i)}catch(r){nt(Ur,"Failed to raise snapshot:",r),await qc(a,r)}}async function qc(a,t,i){if(!to(t))throw t;a.Ea.add(1),await kl(a),a.Ra.set("Offline"),i||(i=()=>nE(a.localStore)),a.asyncQueue.enqueueRetryable((async()=>{nt(Ur,"Retrying IndexedDB access"),await i(),a.Ea.delete(1),await lh(a)}))}function lE(a,t){return t().catch((i=>qc(a,i,t)))}async function uh(a){const t=vt(a),i=Ys(t);let r=t.Ta.length>0?t.Ta[t.Ta.length-1].batchId:um;for(;GR(t);)try{const l=await RR(t.localStore,r);if(l===null){t.Ta.length===0&&i.L_();break}r=l.batchId,FR(t,l)}catch(l){await qc(t,l)}uE(t)&&cE(t)}function GR(a){return Br(a)&&a.Ta.length<10}function FR(a,t){a.Ta.push(t);const i=Ys(a);i.O_()&&i.X_&&i.ea(t.mutations)}function uE(a){return Br(a)&&!Ys(a).x_()&&a.Ta.length>0}function cE(a){Ys(a).start()}async function QR(a){Ys(a).ra()}async function KR(a){const t=Ys(a);for(const i of a.Ta)t.ea(i.mutations)}async function YR(a,t,i){const r=a.Ta.shift(),l=pm.from(r,t,i);await lE(a,(()=>a.remoteSyncer.applySuccessfulWrite(l))),await uh(a)}async function XR(a,t){t&&Ys(a).X_&&await(async function(r,l){if((function(d){return Nb(d)&&d!==X.ABORTED})(l.code)){const c=r.Ta.shift();Ys(r).B_(),await lE(r,(()=>r.remoteSyncer.rejectFailedWrite(c.batchId,l))),await uh(r)}})(a,t),uE(a)&&cE(a)}async function fv(a,t){const i=vt(a);i.asyncQueue.verifyOperationInProgress(),nt(Ur,"RemoteStore received new credentials");const r=Br(i);i.Ea.add(3),await kl(i),r&&i.Ra.set("Unknown"),await i.remoteSyncer.handleCredentialChange(t),i.Ea.delete(3),await lh(i)}async function ZR(a,t){const i=vt(a);t?(i.Ea.delete(2),await lh(i)):t||(i.Ea.add(2),await kl(i),i.Ra.set("Unknown"))}function eo(a){return a.ma||(a.ma=(function(i,r,l){const c=vt(i);return c.sa(),new kR(r,c.connection,c.authCredentials,c.appCheckCredentials,c.serializer,l)})(a.datastore,a.asyncQueue,{Xo:BR.bind(null,a),t_:qR.bind(null,a),r_:HR.bind(null,a),H_:jR.bind(null,a)}),a.da.push((async t=>{t?(a.ma.B_(),wm(a)?Rm(a):a.Ra.set("Unknown")):(await a.ma.stop(),oE(a))}))),a.ma}function Ys(a){return a.fa||(a.fa=(function(i,r,l){const c=vt(i);return c.sa(),new UR(r,c.connection,c.authCredentials,c.appCheckCredentials,c.serializer,l)})(a.datastore,a.asyncQueue,{Xo:()=>Promise.resolve(),t_:QR.bind(null,a),r_:XR.bind(null,a),ta:KR.bind(null,a),na:YR.bind(null,a)}),a.da.push((async t=>{t?(a.fa.B_(),await uh(a)):(await a.fa.stop(),a.Ta.length>0&&(nt(Ur,`Stopping write stream with ${a.Ta.length} pending writes`),a.Ta=[]))}))),a.fa}/**
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
 */class Cm{constructor(t,i,r,l,c){this.asyncQueue=t,this.timerId=i,this.targetTimeMs=r,this.op=l,this.removalCallback=c,this.deferred=new Nr,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((d=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(t,i,r,l,c){const d=Date.now()+r,p=new Cm(t,i,d,l,c);return p.start(r),p}start(t){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new at(X.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((t=>this.deferred.resolve(t)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Im(a,t){if(Xi("AsyncQueue",`${t}: ${a}`),to(a))return new at(X.UNAVAILABLE,`${t}: ${a}`);throw a}/**
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
 */class Pa{static emptySet(t){return new Pa(t.comparator)}constructor(t){this.comparator=t?(i,r)=>t(i,r)||ut.comparator(i.key,r.key):(i,r)=>ut.comparator(i.key,r.key),this.keyedMap=hl(),this.sortedSet=new oe(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const i=this.keyedMap.get(t);return i?this.sortedSet.indexOf(i):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal(((i,r)=>(t(i),!1)))}add(t){const i=this.delete(t.key);return i.copy(i.keyedMap.insert(t.key,t),i.sortedSet.insert(t,null))}delete(t){const i=this.get(t);return i?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(i)):this}isEqual(t){if(!(t instanceof Pa)||this.size!==t.size)return!1;const i=this.sortedSet.getIterator(),r=t.sortedSet.getIterator();for(;i.hasNext();){const l=i.getNext().key,c=r.getNext().key;if(!l.isEqual(c))return!1}return!0}toString(){const t=[];return this.forEach((i=>{t.push(i.toString())})),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,i){const r=new Pa;return r.comparator=this.comparator,r.keyedMap=t,r.sortedSet=i,r}}/**
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
 */class dv{constructor(){this.ga=new oe(ut.comparator)}track(t){const i=t.doc.key,r=this.ga.get(i);r?t.type!==0&&r.type===3?this.ga=this.ga.insert(i,t):t.type===3&&r.type!==1?this.ga=this.ga.insert(i,{type:r.type,doc:t.doc}):t.type===2&&r.type===2?this.ga=this.ga.insert(i,{type:2,doc:t.doc}):t.type===2&&r.type===0?this.ga=this.ga.insert(i,{type:0,doc:t.doc}):t.type===1&&r.type===0?this.ga=this.ga.remove(i):t.type===1&&r.type===2?this.ga=this.ga.insert(i,{type:1,doc:r.doc}):t.type===0&&r.type===1?this.ga=this.ga.insert(i,{type:2,doc:t.doc}):ft(63341,{Rt:t,pa:r}):this.ga=this.ga.insert(i,t)}ya(){const t=[];return this.ga.inorderTraversal(((i,r)=>{t.push(r)})),t}}class Xa{constructor(t,i,r,l,c,d,p,_,v){this.query=t,this.docs=i,this.oldDocs=r,this.docChanges=l,this.mutatedKeys=c,this.fromCache=d,this.syncStateChanged=p,this.excludesMetadataChanges=_,this.hasCachedResults=v}static fromInitialDocuments(t,i,r,l,c){const d=[];return i.forEach((p=>{d.push({type:0,doc:p})})),new Xa(t,i,Pa.emptySet(i),d,r,l,!0,!1,c)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&nh(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const i=this.docChanges,r=t.docChanges;if(i.length!==r.length)return!1;for(let l=0;l<i.length;l++)if(i[l].type!==r[l].type||!i[l].doc.isEqual(r[l].doc))return!1;return!0}}/**
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
 */class $R{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some((t=>t.Da()))}}class JR{constructor(){this.queries=mv(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(i,r){const l=vt(i),c=l.queries;l.queries=mv(),c.forEach(((d,p)=>{for(const _ of p.Sa)_.onError(r)}))})(this,new at(X.ABORTED,"Firestore shutting down"))}}function mv(){return new Pr((a=>N0(a)),nh)}async function WR(a,t){const i=vt(a);let r=3;const l=t.query;let c=i.queries.get(l);c?!c.ba()&&t.Da()&&(r=2):(c=new $R,r=t.Da()?0:1);try{switch(r){case 0:c.wa=await i.onListen(l,!0);break;case 1:c.wa=await i.onListen(l,!1);break;case 2:await i.onFirstRemoteStoreListen(l)}}catch(d){const p=Im(d,`Initialization of query '${Ma(t.query)}' failed`);return void t.onError(p)}i.queries.set(l,c),c.Sa.push(t),t.va(i.onlineState),c.wa&&t.Fa(c.wa)&&Dm(i)}async function tw(a,t){const i=vt(a),r=t.query;let l=3;const c=i.queries.get(r);if(c){const d=c.Sa.indexOf(t);d>=0&&(c.Sa.splice(d,1),c.Sa.length===0?l=t.Da()?0:1:!c.ba()&&t.Da()&&(l=2))}switch(l){case 0:return i.queries.delete(r),i.onUnlisten(r,!0);case 1:return i.queries.delete(r),i.onUnlisten(r,!1);case 2:return i.onLastRemoteStoreUnlisten(r);default:return}}function ew(a,t){const i=vt(a);let r=!1;for(const l of t){const c=l.query,d=i.queries.get(c);if(d){for(const p of d.Sa)p.Fa(l)&&(r=!0);d.wa=l}}r&&Dm(i)}function nw(a,t,i){const r=vt(a),l=r.queries.get(t);if(l)for(const c of l.Sa)c.onError(i);r.queries.delete(t)}function Dm(a){a.Ca.forEach((t=>{t.next()}))}var Zd,gv;(gv=Zd||(Zd={})).Ma="default",gv.Cache="cache";class iw{constructor(t,i,r){this.query=t,this.xa=i,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(t){if(!this.options.includeMetadataChanges){const r=[];for(const l of t.docChanges)l.type!==3&&r.push(l);t=new Xa(t.query,t.docs,t.oldDocs,r,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let i=!1;return this.Oa?this.Ba(t)&&(this.xa.next(t),i=!0):this.La(t,this.onlineState)&&(this.ka(t),i=!0),this.Na=t,i}onError(t){this.xa.error(t)}va(t){this.onlineState=t;let i=!1;return this.Na&&!this.Oa&&this.La(this.Na,t)&&(this.ka(this.Na),i=!0),i}La(t,i){if(!t.fromCache||!this.Da())return!0;const r=i!=="Offline";return(!this.options.qa||!r)&&(!t.docs.isEmpty()||t.hasCachedResults||i==="Offline")}Ba(t){if(t.docChanges.length>0)return!0;const i=this.Na&&this.Na.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!i)&&this.options.includeMetadataChanges===!0}ka(t){t=Xa.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.Oa=!0,this.xa.next(t)}Da(){return this.options.source!==Zd.Cache}}/**
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
 */class hE{constructor(t){this.key=t}}class fE{constructor(t){this.key=t}}class sw{constructor(t,i){this.query=t,this.Ya=i,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=Ot(),this.mutatedKeys=Ot(),this.eu=O0(t),this.tu=new Pa(this.eu)}get nu(){return this.Ya}ru(t,i){const r=i?i.iu:new dv,l=i?i.tu:this.tu;let c=i?i.mutatedKeys:this.mutatedKeys,d=l,p=!1;const _=this.query.limitType==="F"&&l.size===this.query.limit?l.last():null,v=this.query.limitType==="L"&&l.size===this.query.limit?l.first():null;if(t.inorderTraversal(((A,S)=>{const k=l.get(A),F=ih(this.query,S)?S:null,J=!!k&&this.mutatedKeys.has(k.key),et=!!F&&(F.hasLocalMutations||this.mutatedKeys.has(F.key)&&F.hasCommittedMutations);let Z=!1;k&&F?k.data.isEqual(F.data)?J!==et&&(r.track({type:3,doc:F}),Z=!0):this.su(k,F)||(r.track({type:2,doc:F}),Z=!0,(_&&this.eu(F,_)>0||v&&this.eu(F,v)<0)&&(p=!0)):!k&&F?(r.track({type:0,doc:F}),Z=!0):k&&!F&&(r.track({type:1,doc:k}),Z=!0,(_||v)&&(p=!0)),Z&&(F?(d=d.add(F),c=et?c.add(A):c.delete(A)):(d=d.delete(A),c=c.delete(A)))})),this.query.limit!==null)for(;d.size>this.query.limit;){const A=this.query.limitType==="F"?d.last():d.first();d=d.delete(A.key),c=c.delete(A.key),r.track({type:1,doc:A})}return{tu:d,iu:r,Cs:p,mutatedKeys:c}}su(t,i){return t.hasLocalMutations&&i.hasCommittedMutations&&!i.hasLocalMutations}applyChanges(t,i,r,l){const c=this.tu;this.tu=t.tu,this.mutatedKeys=t.mutatedKeys;const d=t.iu.ya();d.sort(((A,S)=>(function(F,J){const et=Z=>{switch(Z){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return ft(20277,{Rt:Z})}};return et(F)-et(J)})(A.type,S.type)||this.eu(A.doc,S.doc))),this.ou(r),l=l??!1;const p=i&&!l?this._u():[],_=this.Xa.size===0&&this.current&&!l?1:0,v=_!==this.Za;return this.Za=_,d.length!==0||v?{snapshot:new Xa(this.query,t.tu,c,d,t.mutatedKeys,_===0,v,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:p}:{au:p}}va(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new dv,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(t){return!this.Ya.has(t)&&!!this.tu.has(t)&&!this.tu.get(t).hasLocalMutations}ou(t){t&&(t.addedDocuments.forEach((i=>this.Ya=this.Ya.add(i))),t.modifiedDocuments.forEach((i=>{})),t.removedDocuments.forEach((i=>this.Ya=this.Ya.delete(i))),this.current=t.current)}_u(){if(!this.current)return[];const t=this.Xa;this.Xa=Ot(),this.tu.forEach((r=>{this.uu(r.key)&&(this.Xa=this.Xa.add(r.key))}));const i=[];return t.forEach((r=>{this.Xa.has(r)||i.push(new fE(r))})),this.Xa.forEach((r=>{t.has(r)||i.push(new hE(r))})),i}cu(t){this.Ya=t.Qs,this.Xa=Ot();const i=this.ru(t.documents);return this.applyChanges(i,!0)}lu(){return Xa.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const Nm="SyncEngine";class rw{constructor(t,i,r){this.query=t,this.targetId=i,this.view=r}}class aw{constructor(t){this.key=t,this.hu=!1}}class ow{constructor(t,i,r,l,c,d){this.localStore=t,this.remoteStore=i,this.eventManager=r,this.sharedClientState=l,this.currentUser=c,this.maxConcurrentLimboResolutions=d,this.Pu={},this.Tu=new Pr((p=>N0(p)),nh),this.Iu=new Map,this.Eu=new Set,this.du=new oe(ut.comparator),this.Au=new Map,this.Ru=new vm,this.Vu={},this.mu=new Map,this.fu=Ya.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function lw(a,t,i=!0){const r=_E(a);let l;const c=r.Tu.get(t);return c?(r.sharedClientState.addLocalQueryTarget(c.targetId),l=c.view.lu()):l=await dE(r,t,i,!0),l}async function uw(a,t){const i=_E(a);await dE(i,t,!0,!1)}async function dE(a,t,i,r){const l=await wR(a.localStore,_i(t)),c=l.targetId,d=a.sharedClientState.addLocalQueryTarget(c,i);let p;return r&&(p=await cw(a,t,c,d==="current",l.resumeToken)),a.isPrimaryClient&&i&&rE(a.remoteStore,l),p}async function cw(a,t,i,r,l){a.pu=(S,k,F)=>(async function(et,Z,ht,yt){let mt=Z.view.ru(ht);mt.Cs&&(mt=await ov(et.localStore,Z.query,!1).then((({documents:I})=>Z.view.ru(I,mt))));const zt=yt&&yt.targetChanges.get(Z.targetId),ee=yt&&yt.targetMismatches.get(Z.targetId)!=null,Vt=Z.view.applyChanges(mt,et.isPrimaryClient,zt,ee);return yv(et,Z.targetId,Vt.au),Vt.snapshot})(a,S,k,F);const c=await ov(a.localStore,t,!0),d=new sw(t,c.Qs),p=d.ru(c.documents),_=Vl.createSynthesizedTargetChangeForCurrentChange(i,r&&a.onlineState!=="Offline",l),v=d.applyChanges(p,a.isPrimaryClient,_);yv(a,i,v.au);const A=new rw(t,i,d);return a.Tu.set(t,A),a.Iu.has(i)?a.Iu.get(i).push(t):a.Iu.set(i,[t]),v.snapshot}async function hw(a,t,i){const r=vt(a),l=r.Tu.get(t),c=r.Iu.get(l.targetId);if(c.length>1)return r.Iu.set(l.targetId,c.filter((d=>!nh(d,t)))),void r.Tu.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(l.targetId),r.sharedClientState.isActiveQueryTarget(l.targetId)||await Yd(r.localStore,l.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(l.targetId),i&&Sm(r.remoteStore,l.targetId),$d(r,l.targetId)})).catch(Wa)):($d(r,l.targetId),await Yd(r.localStore,l.targetId,!0))}async function fw(a,t){const i=vt(a),r=i.Tu.get(t),l=i.Iu.get(r.targetId);i.isPrimaryClient&&l.length===1&&(i.sharedClientState.removeLocalQueryTarget(r.targetId),Sm(i.remoteStore,r.targetId))}async function dw(a,t,i){const r=Ew(a);try{const l=await(function(d,p){const _=vt(d),v=te.now(),A=p.reduce(((F,J)=>F.add(J.key)),Ot());let S,k;return _.persistence.runTransaction("Locally write mutations","readwrite",(F=>{let J=Zi(),et=Ot();return _.Ns.getEntries(F,A).next((Z=>{J=Z,J.forEach(((ht,yt)=>{yt.isValidDocument()||(et=et.add(ht))}))})).next((()=>_.localDocuments.getOverlayedDocuments(F,J))).next((Z=>{S=Z;const ht=[];for(const yt of p){const mt=Rb(yt,S.get(yt.key).overlayedDocument);mt!=null&&ht.push(new zr(yt.key,mt,S0(mt.value.mapValue),Ki.exists(!0)))}return _.mutationQueue.addMutationBatch(F,v,ht,p)})).next((Z=>{k=Z;const ht=Z.applyToLocalDocumentSet(S,et);return _.documentOverlayCache.saveOverlays(F,Z.batchId,ht)}))})).then((()=>({batchId:k.batchId,changes:V0(S)})))})(r.localStore,t);r.sharedClientState.addPendingMutation(l.batchId),(function(d,p,_){let v=d.Vu[d.currentUser.toKey()];v||(v=new oe(Nt)),v=v.insert(p,_),d.Vu[d.currentUser.toKey()]=v})(r,l.batchId,i),await Ul(r,l.changes),await uh(r.remoteStore)}catch(l){const c=Im(l,"Failed to persist write");i.reject(c)}}async function mE(a,t){const i=vt(a);try{const r=await SR(i.localStore,t);t.targetChanges.forEach(((l,c)=>{const d=i.Au.get(c);d&&(Ht(l.addedDocuments.size+l.modifiedDocuments.size+l.removedDocuments.size<=1,22616),l.addedDocuments.size>0?d.hu=!0:l.modifiedDocuments.size>0?Ht(d.hu,14607):l.removedDocuments.size>0&&(Ht(d.hu,42227),d.hu=!1))})),await Ul(i,r,t)}catch(r){await Wa(r)}}function pv(a,t,i){const r=vt(a);if(r.isPrimaryClient&&i===0||!r.isPrimaryClient&&i===1){const l=[];r.Tu.forEach(((c,d)=>{const p=d.view.va(t);p.snapshot&&l.push(p.snapshot)})),(function(d,p){const _=vt(d);_.onlineState=p;let v=!1;_.queries.forEach(((A,S)=>{for(const k of S.Sa)k.va(p)&&(v=!0)})),v&&Dm(_)})(r.eventManager,t),l.length&&r.Pu.H_(l),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function mw(a,t,i){const r=vt(a);r.sharedClientState.updateQueryState(t,"rejected",i);const l=r.Au.get(t),c=l&&l.key;if(c){let d=new oe(ut.comparator);d=d.insert(c,Xe.newNoDocument(c,pt.min()));const p=Ot().add(c),_=new ah(pt.min(),new Map,new oe(Nt),d,p);await mE(r,_),r.du=r.du.remove(c),r.Au.delete(t),Om(r)}else await Yd(r.localStore,t,!1).then((()=>$d(r,t,i))).catch(Wa)}async function gw(a,t){const i=vt(a),r=t.batch.batchId;try{const l=await AR(i.localStore,t);pE(i,r,null),gE(i,r),i.sharedClientState.updateMutationState(r,"acknowledged"),await Ul(i,l)}catch(l){await Wa(l)}}async function pw(a,t,i){const r=vt(a);try{const l=await(function(d,p){const _=vt(d);return _.persistence.runTransaction("Reject batch","readwrite-primary",(v=>{let A;return _.mutationQueue.lookupMutationBatch(v,p).next((S=>(Ht(S!==null,37113),A=S.keys(),_.mutationQueue.removeMutationBatch(v,S)))).next((()=>_.mutationQueue.performConsistencyCheck(v))).next((()=>_.documentOverlayCache.removeOverlaysForBatchId(v,A,p))).next((()=>_.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(v,A))).next((()=>_.localDocuments.getDocuments(v,A)))}))})(r.localStore,t);pE(r,t,i),gE(r,t),r.sharedClientState.updateMutationState(t,"rejected",i),await Ul(r,l)}catch(l){await Wa(l)}}function gE(a,t){(a.mu.get(t)||[]).forEach((i=>{i.resolve()})),a.mu.delete(t)}function pE(a,t,i){const r=vt(a);let l=r.Vu[r.currentUser.toKey()];if(l){const c=l.get(t);c&&(i?c.reject(i):c.resolve(),l=l.remove(t)),r.Vu[r.currentUser.toKey()]=l}}function $d(a,t,i=null){a.sharedClientState.removeLocalQueryTarget(t);for(const r of a.Iu.get(t))a.Tu.delete(r),i&&a.Pu.yu(r,i);a.Iu.delete(t),a.isPrimaryClient&&a.Ru.jr(t).forEach((r=>{a.Ru.containsKey(r)||yE(a,r)}))}function yE(a,t){a.Eu.delete(t.path.canonicalString());const i=a.du.get(t);i!==null&&(Sm(a.remoteStore,i),a.du=a.du.remove(t),a.Au.delete(i),Om(a))}function yv(a,t,i){for(const r of i)r instanceof hE?(a.Ru.addReference(r.key,t),yw(a,r)):r instanceof fE?(nt(Nm,"Document no longer in limbo: "+r.key),a.Ru.removeReference(r.key,t),a.Ru.containsKey(r.key)||yE(a,r.key)):ft(19791,{wu:r})}function yw(a,t){const i=t.key,r=i.path.canonicalString();a.du.get(i)||a.Eu.has(r)||(nt(Nm,"New document in limbo: "+i),a.Eu.add(r),Om(a))}function Om(a){for(;a.Eu.size>0&&a.du.size<a.maxConcurrentLimboResolutions;){const t=a.Eu.values().next().value;a.Eu.delete(t);const i=new ut(ae.fromString(t)),r=a.fu.next();a.Au.set(r,new aw(i)),a.du=a.du.insert(i,r),rE(a.remoteStore,new Ps(_i(mm(i.path)),r,"TargetPurposeLimboResolution",Jc.ce))}}async function Ul(a,t,i){const r=vt(a),l=[],c=[],d=[];r.Tu.isEmpty()||(r.Tu.forEach(((p,_)=>{d.push(r.pu(_,t,i).then((v=>{var A;if((v||i)&&r.isPrimaryClient){const S=v?!v.fromCache:(A=i==null?void 0:i.targetChanges.get(_.targetId))==null?void 0:A.current;r.sharedClientState.updateQueryState(_.targetId,S?"current":"not-current")}if(v){l.push(v);const S=Tm.As(_.targetId,v);c.push(S)}})))})),await Promise.all(d),r.Pu.H_(l),await(async function(_,v){const A=vt(_);try{await A.persistence.runTransaction("notifyLocalViewChanges","readwrite",(S=>Y.forEach(v,(k=>Y.forEach(k.Es,(F=>A.persistence.referenceDelegate.addReference(S,k.targetId,F))).next((()=>Y.forEach(k.ds,(F=>A.persistence.referenceDelegate.removeReference(S,k.targetId,F)))))))))}catch(S){if(!to(S))throw S;nt(Am,"Failed to update sequence numbers: "+S)}for(const S of v){const k=S.targetId;if(!S.fromCache){const F=A.Ms.get(k),J=F.snapshotVersion,et=F.withLastLimboFreeSnapshotVersion(J);A.Ms=A.Ms.insert(k,et)}}})(r.localStore,c))}async function _w(a,t){const i=vt(a);if(!i.currentUser.isEqual(t)){nt(Nm,"User change. New user:",t.toKey());const r=await eE(i.localStore,t);i.currentUser=t,(function(c,d){c.mu.forEach((p=>{p.forEach((_=>{_.reject(new at(X.CANCELLED,d))}))})),c.mu.clear()})(i,"'waitForPendingWrites' promise is rejected due to a user change."),i.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await Ul(i,r.Ls)}}function vw(a,t){const i=vt(a),r=i.Au.get(t);if(r&&r.hu)return Ot().add(r.key);{let l=Ot();const c=i.Iu.get(t);if(!c)return l;for(const d of c){const p=i.Tu.get(d);l=l.unionWith(p.view.nu)}return l}}function _E(a){const t=vt(a);return t.remoteStore.remoteSyncer.applyRemoteEvent=mE.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=vw.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=mw.bind(null,t),t.Pu.H_=ew.bind(null,t.eventManager),t.Pu.yu=nw.bind(null,t.eventManager),t}function Ew(a){const t=vt(a);return t.remoteStore.remoteSyncer.applySuccessfulWrite=gw.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=pw.bind(null,t),t}class Hc{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=oh(t.databaseInfo.databaseId),this.sharedClientState=this.Du(t),this.persistence=this.Cu(t),await this.persistence.start(),this.localStore=this.vu(t),this.gcScheduler=this.Fu(t,this.localStore),this.indexBackfillerScheduler=this.Mu(t,this.localStore)}Fu(t,i){return null}Mu(t,i){return null}vu(t){return TR(this.persistence,new _R,t.initialUser,this.serializer)}Cu(t){return new tE(Em.mi,this.serializer)}Du(t){return new IR}async terminate(){var t,i;(t=this.gcScheduler)==null||t.stop(),(i=this.indexBackfillerScheduler)==null||i.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Hc.provider={build:()=>new Hc};class Tw extends Hc{constructor(t){super(),this.cacheSizeBytes=t}Fu(t,i){Ht(this.persistence.referenceDelegate instanceof Bc,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new iR(r,t.asyncQueue,i)}Cu(t){const i=this.cacheSizeBytes!==void 0?ln.withCacheSize(this.cacheSizeBytes):ln.DEFAULT;return new tE((r=>Bc.mi(r,i)),this.serializer)}}class Jd{async initialize(t,i){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(i),this.remoteStore=this.createRemoteStore(i),this.eventManager=this.createEventManager(i),this.syncEngine=this.createSyncEngine(i,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>pv(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=_w.bind(null,this.syncEngine),await ZR(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return(function(){return new JR})()}createDatastore(t){const i=oh(t.databaseInfo.databaseId),r=(function(c){return new VR(c)})(t.databaseInfo);return(function(c,d,p,_){return new xR(c,d,p,_)})(t.authCredentials,t.appCheckCredentials,r,i)}createRemoteStore(t){return(function(r,l,c,d,p){return new zR(r,l,c,d,p)})(this.localStore,this.datastore,t.asyncQueue,(i=>pv(this.syncEngine,i,0)),(function(){return cv.v()?new cv:new DR})())}createSyncEngine(t,i){return(function(l,c,d,p,_,v,A){const S=new ow(l,c,d,p,_,v);return A&&(S.gu=!0),S})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,i)}async terminate(){var t,i;await(async function(l){const c=vt(l);nt(Ur,"RemoteStore shutting down."),c.Ea.add(5),await kl(c),c.Aa.shutdown(),c.Ra.set("Unknown")})(this.remoteStore),(t=this.datastore)==null||t.terminate(),(i=this.eventManager)==null||i.terminate()}}Jd.provider={build:()=>new Jd};/**
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
 */class Aw{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Ou(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Ou(this.observer.error,t):Xi("Uncaught Error in snapshot listener:",t.toString()))}Nu(){this.muted=!0}Ou(t,i){setTimeout((()=>{this.muted||t(i)}),0)}}/**
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
 */const Xs="FirestoreClient";class Sw{constructor(t,i,r,l,c){this.authCredentials=t,this.appCheckCredentials=i,this.asyncQueue=r,this.databaseInfo=l,this.user=Ye.UNAUTHENTICATED,this.clientId=om.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=c,this.authCredentials.start(r,(async d=>{nt(Xs,"Received user=",d.uid),await this.authCredentialListener(d),this.user=d})),this.appCheckCredentials.start(r,(d=>(nt(Xs,"Received new app check token=",d),this.appCheckCredentialListener(d,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new Nr;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(i){const r=Im(i,"Failed to shutdown persistence");t.reject(r)}})),t.promise}}async function Dd(a,t){a.asyncQueue.verifyOperationInProgress(),nt(Xs,"Initializing OfflineComponentProvider");const i=a.configuration;await t.initialize(i);let r=i.initialUser;a.setCredentialChangeListener((async l=>{r.isEqual(l)||(await eE(t.localStore,l),r=l)})),t.persistence.setDatabaseDeletedListener((()=>a.terminate())),a._offlineComponents=t}async function _v(a,t){a.asyncQueue.verifyOperationInProgress();const i=await bw(a);nt(Xs,"Initializing OnlineComponentProvider"),await t.initialize(i,a.configuration),a.setCredentialChangeListener((r=>fv(t.remoteStore,r))),a.setAppCheckTokenChangeListener(((r,l)=>fv(t.remoteStore,l))),a._onlineComponents=t}async function bw(a){if(!a._offlineComponents)if(a._uninitializedComponentsProvider){nt(Xs,"Using user provided OfflineComponentProvider");try{await Dd(a,a._uninitializedComponentsProvider._offline)}catch(t){const i=t;if(!(function(l){return l.name==="FirebaseError"?l.code===X.FAILED_PRECONDITION||l.code===X.UNIMPLEMENTED:!(typeof DOMException<"u"&&l instanceof DOMException)||l.code===22||l.code===20||l.code===11})(i))throw i;Ga("Error using user provided cache. Falling back to memory cache: "+i),await Dd(a,new Hc)}}else nt(Xs,"Using default OfflineComponentProvider"),await Dd(a,new Tw(void 0));return a._offlineComponents}async function vE(a){return a._onlineComponents||(a._uninitializedComponentsProvider?(nt(Xs,"Using user provided OnlineComponentProvider"),await _v(a,a._uninitializedComponentsProvider._online)):(nt(Xs,"Using default OnlineComponentProvider"),await _v(a,new Jd))),a._onlineComponents}function Rw(a){return vE(a).then((t=>t.syncEngine))}async function vv(a){const t=await vE(a),i=t.eventManager;return i.onListen=lw.bind(null,t.syncEngine),i.onUnlisten=hw.bind(null,t.syncEngine),i.onFirstRemoteStoreListen=uw.bind(null,t.syncEngine),i.onLastRemoteStoreUnlisten=fw.bind(null,t.syncEngine),i}/**
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
 */function EE(a){const t={};return a.timeoutSeconds!==void 0&&(t.timeoutSeconds=a.timeoutSeconds),t}/**
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
 */const Ev=new Map;/**
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
 */const TE="firestore.googleapis.com",Tv=!0;class Av{constructor(t){if(t.host===void 0){if(t.ssl!==void 0)throw new at(X.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=TE,this.ssl=Tv}else this.host=t.host,this.ssl=t.ssl??Tv;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=W0;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<eR)throw new at(X.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}P2("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=EE(t.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new at(X.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new at(X.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new at(X.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(function(r,l){return r.timeoutSeconds===l.timeoutSeconds})(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class Mm{constructor(t,i,r,l){this._authCredentials=t,this._appCheckCredentials=i,this._databaseId=r,this._app=l,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Av({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new at(X.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new at(X.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Av(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new C2;switch(r.type){case"firstParty":return new O2(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new at(X.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(i){const r=Ev.get(i);r&&(nt("ComponentProvider","Removing Datastore"),Ev.delete(i),r.terminate())})(this),Promise.resolve()}}function ww(a,t,i,r={}){var v;a=xa(a,Mm);const l=Za(t),c=a._getSettings(),d={...c,emulatorOptions:a._getEmulatorOptions()},p=`${t}:${i}`;l&&(Jv(`https://${p}`),Wv("Firestore",!0)),c.host!==TE&&c.host!==p&&Ga("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const _={...c,host:p,ssl:l,emulatorOptions:r};if(!Mr(_,d)&&(a._setSettings(_),r.mockUserToken)){let A,S;if(typeof r.mockUserToken=="string")A=r.mockUserToken,S=Ye.MOCK_USER;else{A=$A(r.mockUserToken,(v=a._app)==null?void 0:v.options.projectId);const k=r.mockUserToken.sub||r.mockUserToken.user_id;if(!k)throw new at(X.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");S=new Ye(k)}a._authCredentials=new I2(new f0(A,S))}}/**
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
 */class ch{constructor(t,i,r){this.converter=i,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new ch(this.firestore,t,this._query)}}class Le{constructor(t,i,r){this.converter=i,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Cl(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new Le(this.firestore,t,this._key)}toJSON(){return{type:Le._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,i,r){if(Ol(i,Le._jsonSchema))return new Le(t,r||null,new ut(ae.fromString(i.referencePath)))}}Le._jsonSchemaVersion="firestore/documentReference/1.0",Le._jsonSchema={type:Re("string",Le._jsonSchemaVersion),referencePath:Re("string")};class Cl extends ch{constructor(t,i,r){super(t,i,mm(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new Le(this.firestore,null,new ut(t))}withConverter(t){return new Cl(this.firestore,t,this._path)}}function DD(a,t,...i){if(a=Vn(a),arguments.length===1&&(t=om.newId()),x2("doc","path",t),a instanceof Mm){const r=ae.fromString(t,...i);return U_(r),new Le(a,null,new ut(r))}{if(!(a instanceof Le||a instanceof Cl))throw new at(X.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=a._path.child(ae.fromString(t,...i));return U_(r),new Le(a.firestore,a instanceof Cl?a.converter:null,new ut(r))}}/**
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
 */const Sv="AsyncQueue";class bv{constructor(t=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new iE(this,"async_queue_retry"),this._c=()=>{const r=Id();r&&nt(Sv,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=t;const i=Id();i&&typeof i.addEventListener=="function"&&i.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.uc(),this.cc(t)}enterRestrictedMode(t){if(!this.ec){this.ec=!0,this.sc=t||!1;const i=Id();i&&typeof i.removeEventListener=="function"&&i.removeEventListener("visibilitychange",this._c)}}enqueue(t){if(this.uc(),this.ec)return new Promise((()=>{}));const i=new Nr;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(t().then(i.resolve,i.reject),i.promise))).then((()=>i.promise))}enqueueRetryable(t){this.enqueueAndForget((()=>(this.Xu.push(t),this.lc())))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(t){if(!to(t))throw t;nt(Sv,"Operation failed with retryable error: "+t)}this.Xu.length>0&&this.M_.p_((()=>this.lc()))}}cc(t){const i=this.ac.then((()=>(this.rc=!0,t().catch((r=>{throw this.nc=r,this.rc=!1,Xi("INTERNAL UNHANDLED ERROR: ",Rv(r)),r})).then((r=>(this.rc=!1,r))))));return this.ac=i,i}enqueueAfterDelay(t,i,r){this.uc(),this.oc.indexOf(t)>-1&&(i=0);const l=Cm.createAndSchedule(this,t,i,r,(c=>this.hc(c)));return this.tc.push(l),l}uc(){this.nc&&ft(47125,{Pc:Rv(this.nc)})}verifyOperationInProgress(){}async Tc(){let t;do t=this.ac,await t;while(t!==this.ac)}Ic(t){for(const i of this.tc)if(i.timerId===t)return!0;return!1}Ec(t){return this.Tc().then((()=>{this.tc.sort(((i,r)=>i.targetTimeMs-r.targetTimeMs));for(const i of this.tc)if(i.skipDelay(),t!=="all"&&i.timerId===t)break;return this.Tc()}))}dc(t){this.oc.push(t)}hc(t){const i=this.tc.indexOf(t);this.tc.splice(i,1)}}function Rv(a){let t=a.message||"";return a.stack&&(t=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),t}/**
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
 */function wv(a){return(function(i,r){if(typeof i!="object"||i===null)return!1;const l=i;for(const c of r)if(c in l&&typeof l[c]=="function")return!0;return!1})(a,["next","error","complete"])}class jc extends Mm{constructor(t,i,r,l){super(t,i,r,l),this.type="firestore",this._queue=new bv,this._persistenceKey=(l==null?void 0:l.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new bv(t),this._firestoreClient=void 0,await t}}}function ND(a,t){const i=typeof a=="object"?a:n0(),r=typeof a=="string"?a:Vc,l=rm(i,"firestore").getImmediate({identifier:r});if(!l._initialized){const c=XA("firestore");c&&ww(l,...c)}return l}function AE(a){if(a._terminated)throw new at(X.FAILED_PRECONDITION,"The client has already been terminated.");return a._firestoreClient||Cw(a),a._firestoreClient}function Cw(a){var r,l,c;const t=a._freezeSettings(),i=(function(p,_,v,A){return new X2(p,_,v,A.host,A.ssl,A.experimentalForceLongPolling,A.experimentalAutoDetectLongPolling,EE(A.experimentalLongPollingOptions),A.useFetchStreams,A.isUsingEmulator)})(a._databaseId,((r=a._app)==null?void 0:r.options.appId)||"",a._persistenceKey,t);a._componentsProvider||(l=t.localCache)!=null&&l._offlineComponentProvider&&((c=t.localCache)!=null&&c._onlineComponentProvider)&&(a._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),a._firestoreClient=new Sw(a._authCredentials,a._appCheckCredentials,a._queue,i,a._componentsProvider&&(function(p){const _=p==null?void 0:p._online.build();return{_offline:p==null?void 0:p._offline.build(_),_online:_}})(a._componentsProvider))}/**
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
 */class Mn{constructor(t){this._byteString=t}static fromBase64String(t){try{return new Mn(Fe.fromBase64String(t))}catch(i){throw new at(X.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+i)}}static fromUint8Array(t){return new Mn(Fe.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:Mn._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(Ol(t,Mn._jsonSchema))return Mn.fromBase64String(t.bytes)}}Mn._jsonSchemaVersion="firestore/bytes/1.0",Mn._jsonSchema={type:Re("string",Mn._jsonSchemaVersion),bytes:Re("string")};/**
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
 */class Vm{constructor(...t){for(let i=0;i<t.length;++i)if(t[i].length===0)throw new at(X.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ge(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
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
 */class SE{constructor(t){this._methodName=t}}/**
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
 */class Ei{constructor(t,i){if(!isFinite(t)||t<-90||t>90)throw new at(X.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(i)||i<-180||i>180)throw new at(X.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+i);this._lat=t,this._long=i}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return Nt(this._lat,t._lat)||Nt(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Ei._jsonSchemaVersion}}static fromJSON(t){if(Ol(t,Ei._jsonSchema))return new Ei(t.latitude,t.longitude)}}Ei._jsonSchemaVersion="firestore/geoPoint/1.0",Ei._jsonSchema={type:Re("string",Ei._jsonSchemaVersion),latitude:Re("number"),longitude:Re("number")};/**
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
 */class Ti{constructor(t){this._values=(t||[]).map((i=>i))}toArray(){return this._values.map((t=>t))}isEqual(t){return(function(r,l){if(r.length!==l.length)return!1;for(let c=0;c<r.length;++c)if(r[c]!==l[c])return!1;return!0})(this._values,t._values)}toJSON(){return{type:Ti._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(Ol(t,Ti._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every((i=>typeof i=="number")))return new Ti(t.vectorValues);throw new at(X.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Ti._jsonSchemaVersion="firestore/vectorValue/1.0",Ti._jsonSchema={type:Re("string",Ti._jsonSchemaVersion),vectorValues:Re("object")};/**
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
 */const Iw=/^__.*__$/;class Dw{constructor(t,i,r){this.data=t,this.fieldMask=i,this.fieldTransforms=r}toMutation(t,i){return this.fieldMask!==null?new zr(t,this.data,this.fieldMask,i,this.fieldTransforms):new Ml(t,this.data,i,this.fieldTransforms)}}function bE(a){switch(a){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw ft(40011,{Ac:a})}}class km{constructor(t,i,r,l,c,d){this.settings=t,this.databaseId=i,this.serializer=r,this.ignoreUndefinedProperties=l,c===void 0&&this.Rc(),this.fieldTransforms=c||[],this.fieldMask=d||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(t){return new km({...this.settings,...t},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(t){var l;const i=(l=this.path)==null?void 0:l.child(t),r=this.Vc({path:i,fc:!1});return r.gc(t),r}yc(t){var l;const i=(l=this.path)==null?void 0:l.child(t),r=this.Vc({path:i,fc:!1});return r.Rc(),r}wc(t){return this.Vc({path:void 0,fc:!0})}Sc(t){return Gc(t,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(t){return this.fieldMask.find((i=>t.isPrefixOf(i)))!==void 0||this.fieldTransforms.find((i=>t.isPrefixOf(i.field)))!==void 0}Rc(){if(this.path)for(let t=0;t<this.path.length;t++)this.gc(this.path.get(t))}gc(t){if(t.length===0)throw this.Sc("Document fields must not be empty");if(bE(this.Ac)&&Iw.test(t))throw this.Sc('Document fields cannot begin and end with "__"')}}class Nw{constructor(t,i,r){this.databaseId=t,this.ignoreUndefinedProperties=i,this.serializer=r||oh(t)}Cc(t,i,r,l=!1){return new km({Ac:t,methodName:i,Dc:r,path:Ge.emptyPath(),fc:!1,bc:l},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Ow(a){const t=a._freezeSettings(),i=oh(a._databaseId);return new Nw(a._databaseId,!!t.ignoreUndefinedProperties,i)}function Mw(a,t,i,r,l,c={}){const d=a.Cc(c.merge||c.mergeFields?2:0,t,i,l);IE("Data must be an object, but it was:",d,r);const p=wE(r,d);let _,v;if(c.merge)_=new Kn(d.fieldMask),v=d.fieldTransforms;else if(c.mergeFields){const A=[];for(const S of c.mergeFields){const k=Vw(t,S,i);if(!d.contains(k))throw new at(X.INVALID_ARGUMENT,`Field '${k}' is specified in your field mask but missing from your input data.`);Uw(A,k)||A.push(k)}_=new Kn(A),v=d.fieldTransforms.filter((S=>_.covers(S.field)))}else _=null,v=d.fieldTransforms;return new Dw(new On(p),_,v)}function RE(a,t){if(CE(a=Vn(a)))return IE("Unsupported field value:",t,a),wE(a,t);if(a instanceof SE)return(function(r,l){if(!bE(l.Ac))throw l.Sc(`${r._methodName}() can only be used with update() and set()`);if(!l.path)throw l.Sc(`${r._methodName}() is not currently supported inside arrays`);const c=r._toFieldTransform(l);c&&l.fieldTransforms.push(c)})(a,t),null;if(a===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),a instanceof Array){if(t.settings.fc&&t.Ac!==4)throw t.Sc("Nested arrays are not supported");return(function(r,l){const c=[];let d=0;for(const p of r){let _=RE(p,l.wc(d));_==null&&(_={nullValue:"NULL_VALUE"}),c.push(_),d++}return{arrayValue:{values:c}}})(a,t)}return(function(r,l){if((r=Vn(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return vb(l.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const c=te.fromDate(r);return{timestampValue:zc(l.serializer,c)}}if(r instanceof te){const c=new te(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:zc(l.serializer,c)}}if(r instanceof Ei)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Mn)return{bytesValue:Q0(l.serializer,r._byteString)};if(r instanceof Le){const c=l.databaseId,d=r.firestore._databaseId;if(!d.isEqual(c))throw l.Sc(`Document reference is for database ${d.projectId}/${d.database} but should be for database ${c.projectId}/${c.database}`);return{referenceValue:_m(r.firestore._databaseId||l.databaseId,r._key.path)}}if(r instanceof Ti)return(function(d,p){return{mapValue:{fields:{[T0]:{stringValue:A0},[kc]:{arrayValue:{values:d.toArray().map((v=>{if(typeof v!="number")throw p.Sc("VectorValues must only contain numeric values.");return gm(p.serializer,v)}))}}}}}})(r,l);throw l.Sc(`Unsupported field value: ${lm(r)}`)})(a,t)}function wE(a,t){const i={};return g0(a)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):xr(a,((r,l)=>{const c=RE(l,t.mc(r));c!=null&&(i[r]=c)})),{mapValue:{fields:i}}}function CE(a){return!(typeof a!="object"||a===null||a instanceof Array||a instanceof Date||a instanceof te||a instanceof Ei||a instanceof Mn||a instanceof Le||a instanceof SE||a instanceof Ti)}function IE(a,t,i){if(!CE(i)||!d0(i)){const r=lm(i);throw r==="an object"?t.Sc(a+" a custom object"):t.Sc(a+" "+r)}}function Vw(a,t,i){if((t=Vn(t))instanceof Vm)return t._internalPath;if(typeof t=="string")return DE(a,t);throw Gc("Field path arguments must be of type string or ",a,!1,void 0,i)}const kw=new RegExp("[~\\*/\\[\\]]");function DE(a,t,i){if(t.search(kw)>=0)throw Gc(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,a,!1,void 0,i);try{return new Vm(...t.split("."))._internalPath}catch{throw Gc(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,a,!1,void 0,i)}}function Gc(a,t,i,r,l){const c=r&&!r.isEmpty(),d=l!==void 0;let p=`Function ${t}() called with invalid data`;i&&(p+=" (via `toFirestore()`)"),p+=". ";let _="";return(c||d)&&(_+=" (found",c&&(_+=` in field ${r}`),d&&(_+=` in document ${l}`),_+=")"),new at(X.INVALID_ARGUMENT,p+a+_)}function Uw(a,t){return a.some((i=>i.isEqual(t)))}/**
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
 */class NE{constructor(t,i,r,l,c){this._firestore=t,this._userDataWriter=i,this._key=r,this._document=l,this._converter=c}get id(){return this._key.path.lastSegment()}get ref(){return new Le(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new Lw(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const i=this._document.data.field(OE("DocumentSnapshot.get",t));if(i!==null)return this._userDataWriter.convertValue(i)}}}class Lw extends NE{data(){return super.data()}}function OE(a,t){return typeof t=="string"?DE(a,t):t instanceof Vm?t._internalPath:t._delegate._internalPath}/**
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
 */function xw(a){if(a.limitType==="L"&&a.explicitOrderBy.length===0)throw new at(X.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Pw{convertValue(t,i="none"){switch(Ks(t)){case 0:return null;case 1:return t.booleanValue;case 2:return me(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,i);case 5:return t.stringValue;case 6:return this.convertBytes(Qs(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,i);case 11:return this.convertObject(t.mapValue,i);case 10:return this.convertVectorValue(t.mapValue);default:throw ft(62114,{value:t})}}convertObject(t,i){return this.convertObjectMap(t.fields,i)}convertObjectMap(t,i="none"){const r={};return xr(t,((l,c)=>{r[l]=this.convertValue(c,i)})),r}convertVectorValue(t){var r,l,c;const i=(c=(l=(r=t.fields)==null?void 0:r[kc].arrayValue)==null?void 0:l.values)==null?void 0:c.map((d=>me(d.doubleValue)));return new Ti(i)}convertGeoPoint(t){return new Ei(me(t.latitude),me(t.longitude))}convertArray(t,i){return(t.values||[]).map((r=>this.convertValue(r,i)))}convertServerTimestamp(t,i){switch(i){case"previous":const r=th(t);return r==null?null:this.convertValue(r,i);case"estimate":return this.convertTimestamp(Al(t));default:return null}}convertTimestamp(t){const i=Fs(t);return new te(i.seconds,i.nanos)}convertDocumentKey(t,i){const r=ae.fromString(t);Ht(J0(r),9688,{name:t});const l=new Sl(r.get(1),r.get(3)),c=new ut(r.popFirst(5));return l.isEqual(i)||Xi(`Document ${c} contains a document reference within a different database (${l.projectId}/${l.database}) which is not supported. It will be treated as a reference in the current database (${i.projectId}/${i.database}) instead.`),c}}/**
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
 */function zw(a,t,i){let r;return r=a?i&&(i.merge||i.mergeFields)?a.toFirestore(t,i):a.toFirestore(t):t,r}class dl{constructor(t,i){this.hasPendingWrites=t,this.fromCache=i}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class Or extends NE{constructor(t,i,r,l,c,d){super(t,i,r,l,d),this._firestore=t,this._firestoreImpl=t,this.metadata=c}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const i=new Rc(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(i,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,i={}){if(this._document){const r=this._document.data.field(OE("DocumentSnapshot.get",t));if(r!==null)return this._userDataWriter.convertValue(r,i.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new at(X.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t=this._document,i={};return i.type=Or._jsonSchemaVersion,i.bundle="",i.bundleSource="DocumentSnapshot",i.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?i:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),i.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),i)}}Or._jsonSchemaVersion="firestore/documentSnapshot/1.0",Or._jsonSchema={type:Re("string",Or._jsonSchemaVersion),bundleSource:Re("string","DocumentSnapshot"),bundleName:Re("string"),bundle:Re("string")};class Rc extends Or{data(t={}){return super.data(t)}}class za{constructor(t,i,r,l){this._firestore=t,this._userDataWriter=i,this._snapshot=l,this.metadata=new dl(l.hasPendingWrites,l.fromCache),this.query=r}get docs(){const t=[];return this.forEach((i=>t.push(i))),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,i){this._snapshot.docs.forEach((r=>{t.call(i,new Rc(this._firestore,this._userDataWriter,r.key,r,new dl(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(t={}){const i=!!t.includeMetadataChanges;if(i&&this._snapshot.excludesMetadataChanges)throw new at(X.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===i||(this._cachedChanges=(function(l,c){if(l._snapshot.oldDocs.isEmpty()){let d=0;return l._snapshot.docChanges.map((p=>{const _=new Rc(l._firestore,l._userDataWriter,p.doc.key,p.doc,new dl(l._snapshot.mutatedKeys.has(p.doc.key),l._snapshot.fromCache),l.query.converter);return p.doc,{type:"added",doc:_,oldIndex:-1,newIndex:d++}}))}{let d=l._snapshot.oldDocs;return l._snapshot.docChanges.filter((p=>c||p.type!==3)).map((p=>{const _=new Rc(l._firestore,l._userDataWriter,p.doc.key,p.doc,new dl(l._snapshot.mutatedKeys.has(p.doc.key),l._snapshot.fromCache),l.query.converter);let v=-1,A=-1;return p.type!==0&&(v=d.indexOf(p.doc.key),d=d.delete(p.doc.key)),p.type!==1&&(d=d.add(p.doc),A=d.indexOf(p.doc.key)),{type:Bw(p.type),doc:_,oldIndex:v,newIndex:A}}))}})(this,i),this._cachedChangesIncludeMetadataChanges=i),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new at(X.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t={};t.type=za._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=om.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const i=[],r=[],l=[];return this.docs.forEach((c=>{c._document!==null&&(i.push(c._document),r.push(this._userDataWriter.convertObjectMap(c._document.data.value.mapValue.fields,"previous")),l.push(c.ref.path))})),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}}function Bw(a){switch(a){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return ft(61501,{type:a})}}za._jsonSchemaVersion="firestore/querySnapshot/1.0",za._jsonSchema={type:Re("string",za._jsonSchemaVersion),bundleSource:Re("string","QuerySnapshot"),bundleName:Re("string"),bundle:Re("string")};class ME extends Pw{constructor(t){super(),this.firestore=t}convertBytes(t){return new Mn(t)}convertReference(t){const i=this.convertDocumentKey(t,this.firestore._databaseId);return new Le(this.firestore,null,i)}}function OD(a,t,i){a=xa(a,Le);const r=xa(a.firestore,jc),l=zw(a.converter,t,i);return qw(r,[Mw(Ow(r),"setDoc",a._key,l,a.converter!==null,i).toMutation(a._key,Ki.none())])}function MD(a,...t){var _,v,A;a=Vn(a);let i={includeMetadataChanges:!1,source:"default"},r=0;typeof t[r]!="object"||wv(t[r])||(i=t[r++]);const l={includeMetadataChanges:i.includeMetadataChanges,source:i.source};if(wv(t[r])){const S=t[r];t[r]=(_=S.next)==null?void 0:_.bind(S),t[r+1]=(v=S.error)==null?void 0:v.bind(S),t[r+2]=(A=S.complete)==null?void 0:A.bind(S)}let c,d,p;if(a instanceof Le)d=xa(a.firestore,jc),p=mm(a._key.path),c={next:S=>{t[r]&&t[r](Hw(d,a,S))},error:t[r+1],complete:t[r+2]};else{const S=xa(a,ch);d=xa(S.firestore,jc),p=S._query;const k=new ME(d);c={next:F=>{t[r]&&t[r](new za(d,k,S,F))},error:t[r+1],complete:t[r+2]},xw(a._query)}return(function(k,F,J,et){const Z=new Aw(et),ht=new iw(F,Z,J);return k.asyncQueue.enqueueAndForget((async()=>WR(await vv(k),ht))),()=>{Z.Nu(),k.asyncQueue.enqueueAndForget((async()=>tw(await vv(k),ht)))}})(AE(d),p,l,c)}function qw(a,t){return(function(r,l){const c=new Nr;return r.asyncQueue.enqueueAndForget((async()=>dw(await Rw(r),l,c))),c.promise})(AE(a),t)}function Hw(a,t,i){const r=i.docs.get(t._key),l=new ME(a);return new Or(a,l,t._key,r,new dl(i.hasPendingWrites,i.fromCache),t.converter)}(function(t,i=!0){(function(l){Ja=l})($a),ja(new Vr("firestore",((r,{instanceIdentifier:l,options:c})=>{const d=r.getProvider("app").getImmediate(),p=new jc(new D2(r.getProvider("auth-internal")),new M2(d,r.getProvider("app-check-internal")),(function(v,A){if(!Object.prototype.hasOwnProperty.apply(v.options,["projectId"]))throw new at(X.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Sl(v.options.projectId,A)})(d,l),d);return c={useFetchStreams:i,...c},p._setSettings(c),p}),"PUBLIC").setMultipleInstances(!0)),qs(O_,M_,t),qs(O_,M_,"esm2020")})();function VE(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const jw=VE,kE=new Dl("auth","Firebase",VE());/**
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
 */const Fc=new im("@firebase/auth");function Gw(a,...t){Fc.logLevel<=Dt.WARN&&Fc.warn(`Auth (${$a}): ${a}`,...t)}function wc(a,...t){Fc.logLevel<=Dt.ERROR&&Fc.error(`Auth (${$a}): ${a}`,...t)}/**
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
 */function $i(a,...t){throw Um(a,...t)}function Ai(a,...t){return Um(a,...t)}function UE(a,t,i){const r={...jw(),[t]:i};return new Dl("auth","Firebase",r).create(t,{appName:a.name})}function js(a){return UE(a,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Um(a,...t){if(typeof a!="string"){const i=t[0],r=[...t.slice(1)];return r[0]&&(r[0].appName=a.name),a._errorFactory.create(i,...r)}return kE.create(a,...t)}function dt(a,t,...i){if(!a)throw Um(t,...i)}function Fi(a){const t="INTERNAL ASSERTION FAILED: "+a;throw wc(t),new Error(t)}function Ji(a,t){a||Fi(t)}/**
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
 */function Wd(){var a;return typeof self<"u"&&((a=self.location)==null?void 0:a.href)||""}function Fw(){return Cv()==="http:"||Cv()==="https:"}function Cv(){var a;return typeof self<"u"&&((a=self.location)==null?void 0:a.protocol)||null}/**
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
 */function Qw(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Fw()||iS()||"connection"in navigator)?navigator.onLine:!0}function Kw(){if(typeof navigator>"u")return null;const a=navigator;return a.languages&&a.languages[0]||a.language||null}/**
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
 */class Ll{constructor(t,i){this.shortDelay=t,this.longDelay=i,Ji(i>t,"Short delay should be less than long delay!"),this.isMobile=tS()||sS()}get(){return Qw()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Lm(a,t){Ji(a.emulator,"Emulator should always be set here");const{url:i}=a.emulator;return t?`${i}${t.startsWith("/")?t.slice(1):t}`:i}/**
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
 */class LE{static initialize(t,i,r){this.fetchImpl=t,i&&(this.headersImpl=i),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Fi("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Fi("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Fi("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const Yw={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const Xw=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Zw=new Ll(3e4,6e4);function hh(a,t){return a.tenantId&&!t.tenantId?{...t,tenantId:a.tenantId}:t}async function no(a,t,i,r,l={}){return xE(a,l,async()=>{let c={},d={};r&&(t==="GET"?d=r:c={body:JSON.stringify(r)});const p=Nl({key:a.config.apiKey,...d}).slice(1),_=await a._getAdditionalHeaders();_["Content-Type"]="application/json",a.languageCode&&(_["X-Firebase-Locale"]=a.languageCode);const v={method:t,headers:_,...c};return nS()||(v.referrerPolicy="no-referrer"),a.emulatorConfig&&Za(a.emulatorConfig.host)&&(v.credentials="include"),LE.fetch()(await zE(a,a.config.apiHost,i,p),v)})}async function xE(a,t,i){a._canInitEmulator=!1;const r={...Yw,...t};try{const l=new $w(a),c=await Promise.race([i(),l.promise]);l.clearNetworkTimeout();const d=await c.json();if("needConfirmation"in d)throw vc(a,"account-exists-with-different-credential",d);if(c.ok&&!("errorMessage"in d))return d;{const p=c.ok?d.errorMessage:d.error.message,[_,v]=p.split(" : ");if(_==="FEDERATED_USER_ID_ALREADY_LINKED")throw vc(a,"credential-already-in-use",d);if(_==="EMAIL_EXISTS")throw vc(a,"email-already-in-use",d);if(_==="USER_DISABLED")throw vc(a,"user-disabled",d);const A=r[_]||_.toLowerCase().replace(/[_\s]+/g,"-");if(v)throw UE(a,A,v);$i(a,A)}}catch(l){if(l instanceof Wi)throw l;$i(a,"network-request-failed",{message:String(l)})}}async function PE(a,t,i,r,l={}){const c=await no(a,t,i,r,l);return"mfaPendingCredential"in c&&$i(a,"multi-factor-auth-required",{_serverResponse:c}),c}async function zE(a,t,i,r){const l=`${t}${i}?${r}`,c=a,d=c.config.emulator?Lm(a.config,l):`${a.config.apiScheme}://${l}`;return Xw.includes(i)&&(await c._persistenceManagerAvailable,c._getPersistenceType()==="COOKIE")?c._getPersistence()._getFinalTarget(d).toString():d}class $w{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(t){this.auth=t,this.timer=null,this.promise=new Promise((i,r)=>{this.timer=setTimeout(()=>r(Ai(this.auth,"network-request-failed")),Zw.get())})}}function vc(a,t,i){const r={appName:a.name};i.email&&(r.email=i.email),i.phoneNumber&&(r.phoneNumber=i.phoneNumber);const l=Ai(a,t,r);return l.customData._tokenResponse=i,l}/**
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
 */async function Jw(a,t){return no(a,"POST","/v1/accounts:delete",t)}async function Qc(a,t){return no(a,"POST","/v1/accounts:lookup",t)}/**
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
 */function vl(a){if(a)try{const t=new Date(Number(a));if(!isNaN(t.getTime()))return t.toUTCString()}catch{}}async function Ww(a,t=!1){const i=Vn(a),r=await i.getIdToken(t),l=xm(r);dt(l&&l.exp&&l.auth_time&&l.iat,i.auth,"internal-error");const c=typeof l.firebase=="object"?l.firebase:void 0,d=c==null?void 0:c.sign_in_provider;return{claims:l,token:r,authTime:vl(Nd(l.auth_time)),issuedAtTime:vl(Nd(l.iat)),expirationTime:vl(Nd(l.exp)),signInProvider:d||null,signInSecondFactor:(c==null?void 0:c.sign_in_second_factor)||null}}function Nd(a){return Number(a)*1e3}function xm(a){const[t,i,r]=a.split(".");if(t===void 0||i===void 0||r===void 0)return wc("JWT malformed, contained fewer than 3 sections"),null;try{const l=Yv(i);return l?JSON.parse(l):(wc("Failed to decode base64 JWT payload"),null)}catch(l){return wc("Caught error parsing JWT payload as JSON",l==null?void 0:l.toString()),null}}function Iv(a){const t=xm(a);return dt(t,"internal-error"),dt(typeof t.exp<"u","internal-error"),dt(typeof t.iat<"u","internal-error"),Number(t.exp)-Number(t.iat)}/**
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
 */async function Il(a,t,i=!1){if(i)return t;try{return await t}catch(r){throw r instanceof Wi&&tC(r)&&a.auth.currentUser===a&&await a.auth.signOut(),r}}function tC({code:a}){return a==="auth/user-disabled"||a==="auth/user-token-expired"}/**
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
 */class eC{constructor(t){this.user=t,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(t){if(t){const i=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),i}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(t=!1){if(!this.isRunning)return;const i=this.getInterval(t);this.timerId=setTimeout(async()=>{await this.iteration()},i)}async iteration(){try{await this.user.getIdToken(!0)}catch(t){(t==null?void 0:t.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class tm{constructor(t,i){this.createdAt=t,this.lastLoginAt=i,this._initializeTime()}_initializeTime(){this.lastSignInTime=vl(this.lastLoginAt),this.creationTime=vl(this.createdAt)}_copy(t){this.createdAt=t.createdAt,this.lastLoginAt=t.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Kc(a){var S;const t=a.auth,i=await a.getIdToken(),r=await Il(a,Qc(t,{idToken:i}));dt(r==null?void 0:r.users.length,t,"internal-error");const l=r.users[0];a._notifyReloadListener(l);const c=(S=l.providerUserInfo)!=null&&S.length?BE(l.providerUserInfo):[],d=iC(a.providerData,c),p=a.isAnonymous,_=!(a.email&&l.passwordHash)&&!(d!=null&&d.length),v=p?_:!1,A={uid:l.localId,displayName:l.displayName||null,photoURL:l.photoUrl||null,email:l.email||null,emailVerified:l.emailVerified||!1,phoneNumber:l.phoneNumber||null,tenantId:l.tenantId||null,providerData:d,metadata:new tm(l.createdAt,l.lastLoginAt),isAnonymous:v};Object.assign(a,A)}async function nC(a){const t=Vn(a);await Kc(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}function iC(a,t){return[...a.filter(r=>!t.some(l=>l.providerId===r.providerId)),...t]}function BE(a){return a.map(({providerId:t,...i})=>({providerId:t,uid:i.rawId||"",displayName:i.displayName||null,email:i.email||null,phoneNumber:i.phoneNumber||null,photoURL:i.photoUrl||null}))}/**
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
 */async function sC(a,t){const i=await xE(a,{},async()=>{const r=Nl({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:l,apiKey:c}=a.config,d=await zE(a,l,"/v1/token",`key=${c}`),p=await a._getAdditionalHeaders();p["Content-Type"]="application/x-www-form-urlencoded";const _={method:"POST",headers:p,body:r};return a.emulatorConfig&&Za(a.emulatorConfig.host)&&(_.credentials="include"),LE.fetch()(d,_)});return{accessToken:i.access_token,expiresIn:i.expires_in,refreshToken:i.refresh_token}}async function rC(a,t){return no(a,"POST","/v2/accounts:revokeToken",hh(a,t))}/**
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
 */class Ba{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(t){dt(t.idToken,"internal-error"),dt(typeof t.idToken<"u","internal-error"),dt(typeof t.refreshToken<"u","internal-error");const i="expiresIn"in t&&typeof t.expiresIn<"u"?Number(t.expiresIn):Iv(t.idToken);this.updateTokensAndExpiration(t.idToken,t.refreshToken,i)}updateFromIdToken(t){dt(t.length!==0,"internal-error");const i=Iv(t);this.updateTokensAndExpiration(t,null,i)}async getToken(t,i=!1){return!i&&this.accessToken&&!this.isExpired?this.accessToken:(dt(this.refreshToken,t,"user-token-expired"),this.refreshToken?(await this.refresh(t,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(t,i){const{accessToken:r,refreshToken:l,expiresIn:c}=await sC(t,i);this.updateTokensAndExpiration(r,l,Number(c))}updateTokensAndExpiration(t,i,r){this.refreshToken=i||null,this.accessToken=t||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(t,i){const{refreshToken:r,accessToken:l,expirationTime:c}=i,d=new Ba;return r&&(dt(typeof r=="string","internal-error",{appName:t}),d.refreshToken=r),l&&(dt(typeof l=="string","internal-error",{appName:t}),d.accessToken=l),c&&(dt(typeof c=="number","internal-error",{appName:t}),d.expirationTime=c),d}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(t){this.accessToken=t.accessToken,this.refreshToken=t.refreshToken,this.expirationTime=t.expirationTime}_clone(){return Object.assign(new Ba,this.toJSON())}_performRefresh(){return Fi("not implemented")}}/**
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
 */function Vs(a,t){dt(typeof a=="string"||typeof a>"u","internal-error",{appName:t})}class Yn{constructor({uid:t,auth:i,stsTokenManager:r,...l}){this.providerId="firebase",this.proactiveRefresh=new eC(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=i,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=l.displayName||null,this.email=l.email||null,this.emailVerified=l.emailVerified||!1,this.phoneNumber=l.phoneNumber||null,this.photoURL=l.photoURL||null,this.isAnonymous=l.isAnonymous||!1,this.tenantId=l.tenantId||null,this.providerData=l.providerData?[...l.providerData]:[],this.metadata=new tm(l.createdAt||void 0,l.lastLoginAt||void 0)}async getIdToken(t){const i=await Il(this,this.stsTokenManager.getToken(this.auth,t));return dt(i,this.auth,"internal-error"),this.accessToken!==i&&(this.accessToken=i,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),i}getIdTokenResult(t){return Ww(this,t)}reload(){return nC(this)}_assign(t){this!==t&&(dt(this.uid===t.uid,this.auth,"internal-error"),this.displayName=t.displayName,this.photoURL=t.photoURL,this.email=t.email,this.emailVerified=t.emailVerified,this.phoneNumber=t.phoneNumber,this.isAnonymous=t.isAnonymous,this.tenantId=t.tenantId,this.providerData=t.providerData.map(i=>({...i})),this.metadata._copy(t.metadata),this.stsTokenManager._assign(t.stsTokenManager))}_clone(t){const i=new Yn({...this,auth:t,stsTokenManager:this.stsTokenManager._clone()});return i.metadata._copy(this.metadata),i}_onReload(t){dt(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=t,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(t){this.reloadListener?this.reloadListener(t):this.reloadUserInfo=t}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(t,i=!1){let r=!1;t.idToken&&t.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(t),r=!0),i&&await Kc(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Qn(this.auth.app))return Promise.reject(js(this.auth));const t=await this.getIdToken();return await Il(this,Jw(this.auth,{idToken:t})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(t=>({...t})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(t,i){const r=i.displayName??void 0,l=i.email??void 0,c=i.phoneNumber??void 0,d=i.photoURL??void 0,p=i.tenantId??void 0,_=i._redirectEventId??void 0,v=i.createdAt??void 0,A=i.lastLoginAt??void 0,{uid:S,emailVerified:k,isAnonymous:F,providerData:J,stsTokenManager:et}=i;dt(S&&et,t,"internal-error");const Z=Ba.fromJSON(this.name,et);dt(typeof S=="string",t,"internal-error"),Vs(r,t.name),Vs(l,t.name),dt(typeof k=="boolean",t,"internal-error"),dt(typeof F=="boolean",t,"internal-error"),Vs(c,t.name),Vs(d,t.name),Vs(p,t.name),Vs(_,t.name),Vs(v,t.name),Vs(A,t.name);const ht=new Yn({uid:S,auth:t,email:l,emailVerified:k,displayName:r,isAnonymous:F,photoURL:d,phoneNumber:c,tenantId:p,stsTokenManager:Z,createdAt:v,lastLoginAt:A});return J&&Array.isArray(J)&&(ht.providerData=J.map(yt=>({...yt}))),_&&(ht._redirectEventId=_),ht}static async _fromIdTokenResponse(t,i,r=!1){const l=new Ba;l.updateFromServerResponse(i);const c=new Yn({uid:i.localId,auth:t,stsTokenManager:l,isAnonymous:r});return await Kc(c),c}static async _fromGetAccountInfoResponse(t,i,r){const l=i.users[0];dt(l.localId!==void 0,"internal-error");const c=l.providerUserInfo!==void 0?BE(l.providerUserInfo):[],d=!(l.email&&l.passwordHash)&&!(c!=null&&c.length),p=new Ba;p.updateFromIdToken(r);const _=new Yn({uid:l.localId,auth:t,stsTokenManager:p,isAnonymous:d}),v={uid:l.localId,displayName:l.displayName||null,photoURL:l.photoUrl||null,email:l.email||null,emailVerified:l.emailVerified||!1,phoneNumber:l.phoneNumber||null,tenantId:l.tenantId||null,providerData:c,metadata:new tm(l.createdAt,l.lastLoginAt),isAnonymous:!(l.email&&l.passwordHash)&&!(c!=null&&c.length)};return Object.assign(_,v),_}}/**
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
 */const Dv=new Map;function Qi(a){Ji(a instanceof Function,"Expected a class definition");let t=Dv.get(a);return t?(Ji(t instanceof a,"Instance stored in cache mismatched with class"),t):(t=new a,Dv.set(a,t),t)}/**
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
 */class qE{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(t,i){this.storage[t]=i}async _get(t){const i=this.storage[t];return i===void 0?null:i}async _remove(t){delete this.storage[t]}_addListener(t,i){}_removeListener(t,i){}}qE.type="NONE";const Nv=qE;/**
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
 */function Cc(a,t,i){return`firebase:${a}:${t}:${i}`}class qa{constructor(t,i,r){this.persistence=t,this.auth=i,this.userKey=r;const{config:l,name:c}=this.auth;this.fullUserKey=Cc(this.userKey,l.apiKey,c),this.fullPersistenceKey=Cc("persistence",l.apiKey,c),this.boundEventHandler=i._onStorageEvent.bind(i),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(t){return this.persistence._set(this.fullUserKey,t.toJSON())}async getCurrentUser(){const t=await this.persistence._get(this.fullUserKey);if(!t)return null;if(typeof t=="string"){const i=await Qc(this.auth,{idToken:t}).catch(()=>{});return i?Yn._fromGetAccountInfoResponse(this.auth,i,t):null}return Yn._fromJSON(this.auth,t)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(t){if(this.persistence===t)return;const i=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=t,i)return this.setCurrentUser(i)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(t,i,r="authUser"){if(!i.length)return new qa(Qi(Nv),t,r);const l=(await Promise.all(i.map(async v=>{if(await v._isAvailable())return v}))).filter(v=>v);let c=l[0]||Qi(Nv);const d=Cc(r,t.config.apiKey,t.name);let p=null;for(const v of i)try{const A=await v._get(d);if(A){let S;if(typeof A=="string"){const k=await Qc(t,{idToken:A}).catch(()=>{});if(!k)break;S=await Yn._fromGetAccountInfoResponse(t,k,A)}else S=Yn._fromJSON(t,A);v!==c&&(p=S),c=v;break}}catch{}const _=l.filter(v=>v._shouldAllowMigration);return!c._shouldAllowMigration||!_.length?new qa(c,t,r):(c=_[0],p&&await c._set(d,p.toJSON()),await Promise.all(i.map(async v=>{if(v!==c)try{await v._remove(d)}catch{}})),new qa(c,t,r))}}/**
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
 */function Ov(a){const t=a.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(FE(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(HE(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(KE(t))return"Blackberry";if(YE(t))return"Webos";if(jE(t))return"Safari";if((t.includes("chrome/")||GE(t))&&!t.includes("edge/"))return"Chrome";if(QE(t))return"Android";{const i=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=a.match(i);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function HE(a=Ze()){return/firefox\//i.test(a)}function jE(a=Ze()){const t=a.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function GE(a=Ze()){return/crios\//i.test(a)}function FE(a=Ze()){return/iemobile/i.test(a)}function QE(a=Ze()){return/android/i.test(a)}function KE(a=Ze()){return/blackberry/i.test(a)}function YE(a=Ze()){return/webos/i.test(a)}function Pm(a=Ze()){return/iphone|ipad|ipod/i.test(a)||/macintosh/i.test(a)&&/mobile/i.test(a)}function aC(a=Ze()){var t;return Pm(a)&&!!((t=window.navigator)!=null&&t.standalone)}function oC(){return rS()&&document.documentMode===10}function XE(a=Ze()){return Pm(a)||QE(a)||YE(a)||KE(a)||/windows phone/i.test(a)||FE(a)}/**
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
 */function ZE(a,t=[]){let i;switch(a){case"Browser":i=Ov(Ze());break;case"Worker":i=`${Ov(Ze())}-${a}`;break;default:i=a}const r=t.length?t.join(","):"FirebaseCore-web";return`${i}/JsCore/${$a}/${r}`}/**
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
 */class lC{constructor(t){this.auth=t,this.queue=[]}pushCallback(t,i){const r=c=>new Promise((d,p)=>{try{const _=t(c);d(_)}catch(_){p(_)}});r.onAbort=i,this.queue.push(r);const l=this.queue.length-1;return()=>{this.queue[l]=()=>Promise.resolve()}}async runMiddleware(t){if(this.auth.currentUser===t)return;const i=[];try{for(const r of this.queue)await r(t),r.onAbort&&i.push(r.onAbort)}catch(r){i.reverse();for(const l of i)try{l()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function uC(a,t={}){return no(a,"GET","/v2/passwordPolicy",hh(a,t))}/**
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
 */const cC=6;class hC{constructor(t){var r;const i=t.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=i.minPasswordLength??cC,i.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=i.maxPasswordLength),i.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=i.containsLowercaseCharacter),i.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=i.containsUppercaseCharacter),i.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=i.containsNumericCharacter),i.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=i.containsNonAlphanumericCharacter),this.enforcementState=t.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=t.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=t.forceUpgradeOnSignin??!1,this.schemaVersion=t.schemaVersion}validatePassword(t){const i={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(t,i),this.validatePasswordCharacterOptions(t,i),i.isValid&&(i.isValid=i.meetsMinPasswordLength??!0),i.isValid&&(i.isValid=i.meetsMaxPasswordLength??!0),i.isValid&&(i.isValid=i.containsLowercaseLetter??!0),i.isValid&&(i.isValid=i.containsUppercaseLetter??!0),i.isValid&&(i.isValid=i.containsNumericCharacter??!0),i.isValid&&(i.isValid=i.containsNonAlphanumericCharacter??!0),i}validatePasswordLengthOptions(t,i){const r=this.customStrengthOptions.minPasswordLength,l=this.customStrengthOptions.maxPasswordLength;r&&(i.meetsMinPasswordLength=t.length>=r),l&&(i.meetsMaxPasswordLength=t.length<=l)}validatePasswordCharacterOptions(t,i){this.updatePasswordCharacterOptionsStatuses(i,!1,!1,!1,!1);let r;for(let l=0;l<t.length;l++)r=t.charAt(l),this.updatePasswordCharacterOptionsStatuses(i,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(t,i,r,l,c){this.customStrengthOptions.containsLowercaseLetter&&(t.containsLowercaseLetter||(t.containsLowercaseLetter=i)),this.customStrengthOptions.containsUppercaseLetter&&(t.containsUppercaseLetter||(t.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(t.containsNumericCharacter||(t.containsNumericCharacter=l)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(t.containsNonAlphanumericCharacter||(t.containsNonAlphanumericCharacter=c))}}/**
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
 */class fC{constructor(t,i,r,l){this.app=t,this.heartbeatServiceProvider=i,this.appCheckServiceProvider=r,this.config=l,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Mv(this),this.idTokenSubscription=new Mv(this),this.beforeStateQueue=new lC(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=kE,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=t.name,this.clientVersion=l.sdkClientVersion,this._persistenceManagerAvailable=new Promise(c=>this._resolvePersistenceManagerAvailable=c)}_initializeWithPersistence(t,i){return i&&(this._popupRedirectResolver=Qi(i)),this._initializationPromise=this.queue(async()=>{var r,l,c;if(!this._deleted&&(this.persistenceManager=await qa.create(this,t),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((l=this._popupRedirectResolver)!=null&&l._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(i),this.lastNotifiedUid=((c=this.currentUser)==null?void 0:c.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const t=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!t)){if(this.currentUser&&t&&this.currentUser.uid===t.uid){this._currentUser._assign(t),await this.currentUser.getIdToken();return}await this._updateCurrentUser(t,!0)}}async initializeCurrentUserFromIdToken(t){try{const i=await Qc(this,{idToken:t}),r=await Yn._fromGetAccountInfoResponse(this,i,t);await this.directlySetCurrentUser(r)}catch(i){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",i),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(t){var c;if(Qn(this.app)){const d=this.app.settings.authIdToken;return d?new Promise(p=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(d).then(p,p))}):this.directlySetCurrentUser(null)}const i=await this.assertedPersistence.getCurrentUser();let r=i,l=!1;if(t&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const d=(c=this.redirectUser)==null?void 0:c._redirectEventId,p=r==null?void 0:r._redirectEventId,_=await this.tryRedirectSignIn(t);(!d||d===p)&&(_!=null&&_.user)&&(r=_.user,l=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(l)try{await this.beforeStateQueue.runMiddleware(r)}catch(d){r=i,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(d))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return dt(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(t){let i=null;try{i=await this._popupRedirectResolver._completeRedirectFn(this,t,!0)}catch{await this._setRedirectUser(null)}return i}async reloadAndSetCurrentUserOrClear(t){try{await Kc(t)}catch(i){if((i==null?void 0:i.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(t)}useDeviceLanguage(){this.languageCode=Kw()}async _delete(){this._deleted=!0}async updateCurrentUser(t){if(Qn(this.app))return Promise.reject(js(this));const i=t?Vn(t):null;return i&&dt(i.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(i&&i._clone(this))}async _updateCurrentUser(t,i=!1){if(!this._deleted)return t&&dt(this.tenantId===t.tenantId,this,"tenant-id-mismatch"),i||await this.beforeStateQueue.runMiddleware(t),this.queue(async()=>{await this.directlySetCurrentUser(t),this.notifyAuthListeners()})}async signOut(){return Qn(this.app)?Promise.reject(js(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(t){return Qn(this.app)?Promise.reject(js(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Qi(t))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(t){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const i=this._getPasswordPolicyInternal();return i.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):i.validatePassword(t)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const t=await uC(this),i=new hC(t);this.tenantId===null?this._projectPasswordPolicy=i:this._tenantPasswordPolicies[this.tenantId]=i}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(t){this._errorFactory=new Dl("auth","Firebase",t())}onAuthStateChanged(t,i,r){return this.registerStateListener(this.authStateSubscription,t,i,r)}beforeAuthStateChanged(t,i){return this.beforeStateQueue.pushCallback(t,i)}onIdTokenChanged(t,i,r){return this.registerStateListener(this.idTokenSubscription,t,i,r)}authStateReady(){return new Promise((t,i)=>{if(this.currentUser)t();else{const r=this.onAuthStateChanged(()=>{r(),t()},i)}})}async revokeAccessToken(t){if(this.currentUser){const i=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:t,idToken:i};this.tenantId!=null&&(r.tenantId=this.tenantId),await rC(this,r)}}toJSON(){var t;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(t=this._currentUser)==null?void 0:t.toJSON()}}async _setRedirectUser(t,i){const r=await this.getOrInitRedirectPersistenceManager(i);return t===null?r.removeCurrentUser():r.setCurrentUser(t)}async getOrInitRedirectPersistenceManager(t){if(!this.redirectPersistenceManager){const i=t&&Qi(t)||this._popupRedirectResolver;dt(i,this,"argument-error"),this.redirectPersistenceManager=await qa.create(this,[Qi(i._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(t){var i,r;return this._isInitialized&&await this.queue(async()=>{}),((i=this._currentUser)==null?void 0:i._redirectEventId)===t?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===t?this.redirectUser:null}async _persistUserIfCurrent(t){if(t===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(t))}_notifyListenersIfCurrent(t){t===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var i;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const t=((i=this.currentUser)==null?void 0:i.uid)??null;this.lastNotifiedUid!==t&&(this.lastNotifiedUid=t,this.authStateSubscription.next(this.currentUser))}registerStateListener(t,i,r,l){if(this._deleted)return()=>{};const c=typeof i=="function"?i:i.next.bind(i);let d=!1;const p=this._isInitialized?Promise.resolve():this._initializationPromise;if(dt(p,this,"internal-error"),p.then(()=>{d||c(this.currentUser)}),typeof i=="function"){const _=t.addObserver(i,r,l);return()=>{d=!0,_()}}else{const _=t.addObserver(i);return()=>{d=!0,_()}}}async directlySetCurrentUser(t){this.currentUser&&this.currentUser!==t&&this._currentUser._stopProactiveRefresh(),t&&this.isProactiveRefreshEnabled&&t._startProactiveRefresh(),this.currentUser=t,t?await this.assertedPersistence.setCurrentUser(t):await this.assertedPersistence.removeCurrentUser()}queue(t){return this.operations=this.operations.then(t,t),this.operations}get assertedPersistence(){return dt(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(t){!t||this.frameworks.includes(t)||(this.frameworks.push(t),this.frameworks.sort(),this.clientVersion=ZE(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var l;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const i=await((l=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:l.getHeartbeatsHeader());i&&(t["X-Firebase-Client"]=i);const r=await this._getAppCheckToken();return r&&(t["X-Firebase-AppCheck"]=r),t}async _getAppCheckToken(){var i;if(Qn(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((i=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:i.getToken());return t!=null&&t.error&&Gw(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function fh(a){return Vn(a)}class Mv{constructor(t){this.auth=t,this.observer=null,this.addObserver=dS(i=>this.observer=i)}get next(){return dt(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let zm={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function dC(a){zm=a}function mC(a){return zm.loadJS(a)}function gC(){return zm.gapiScript}function pC(a){return`__${a}${Math.floor(Math.random()*1e6)}`}/**
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
 */function yC(a,t){const i=rm(a,"auth");if(i.isInitialized()){const l=i.getImmediate(),c=i.getOptions();if(Mr(c,t??{}))return l;$i(l,"already-initialized")}return i.initialize({options:t})}function _C(a,t){const i=(t==null?void 0:t.persistence)||[],r=(Array.isArray(i)?i:[i]).map(Qi);t!=null&&t.errorMap&&a._updateErrorMap(t.errorMap),a._initializeWithPersistence(r,t==null?void 0:t.popupRedirectResolver)}function vC(a,t,i){const r=fh(a);dt(/^https?:\/\//.test(t),r,"invalid-emulator-scheme");const l=!1,c=$E(t),{host:d,port:p}=EC(t),_=p===null?"":`:${p}`,v={url:`${c}//${d}${_}/`},A=Object.freeze({host:d,port:p,protocol:c.replace(":",""),options:Object.freeze({disableWarnings:l})});if(!r._canInitEmulator){dt(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),dt(Mr(v,r.config.emulator)&&Mr(A,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=v,r.emulatorConfig=A,r.settings.appVerificationDisabledForTesting=!0,Za(d)?(Jv(`${c}//${d}${_}`),Wv("Auth",!0)):TC()}function $E(a){const t=a.indexOf(":");return t<0?"":a.substr(0,t+1)}function EC(a){const t=$E(a),i=/(\/\/)?([^?#/]+)/.exec(a.substr(t.length));if(!i)return{host:"",port:null};const r=i[2].split("@").pop()||"",l=/^(\[[^\]]+\])(:|$)/.exec(r);if(l){const c=l[1];return{host:c,port:Vv(r.substr(c.length+1))}}else{const[c,d]=r.split(":");return{host:c,port:Vv(d)}}}function Vv(a){if(!a)return null;const t=Number(a);return isNaN(t)?null:t}function TC(){function a(){const t=document.createElement("p"),i=t.style;t.innerText="Running in emulator mode. Do not use with production credentials.",i.position="fixed",i.width="100%",i.backgroundColor="#ffffff",i.border=".1em solid #000000",i.color="#b50000",i.bottom="0px",i.left="0px",i.margin="0px",i.zIndex="10000",i.textAlign="center",t.classList.add("firebase-emulator-warning"),document.body.appendChild(t)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",a):a())}/**
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
 */class JE{constructor(t,i){this.providerId=t,this.signInMethod=i}toJSON(){return Fi("not implemented")}_getIdTokenResponse(t){return Fi("not implemented")}_linkToIdToken(t,i){return Fi("not implemented")}_getReauthenticationResolver(t){return Fi("not implemented")}}/**
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
 */async function Ha(a,t){return PE(a,"POST","/v1/accounts:signInWithIdp",hh(a,t))}/**
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
 */const AC="http://localhost";class Lr extends JE{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(t){const i=new Lr(t.providerId,t.signInMethod);return t.idToken||t.accessToken?(t.idToken&&(i.idToken=t.idToken),t.accessToken&&(i.accessToken=t.accessToken),t.nonce&&!t.pendingToken&&(i.nonce=t.nonce),t.pendingToken&&(i.pendingToken=t.pendingToken)):t.oauthToken&&t.oauthTokenSecret?(i.accessToken=t.oauthToken,i.secret=t.oauthTokenSecret):$i("argument-error"),i}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(t){const i=typeof t=="string"?JSON.parse(t):t,{providerId:r,signInMethod:l,...c}=i;if(!r||!l)return null;const d=new Lr(r,l);return d.idToken=c.idToken||void 0,d.accessToken=c.accessToken||void 0,d.secret=c.secret,d.nonce=c.nonce,d.pendingToken=c.pendingToken||null,d}_getIdTokenResponse(t){const i=this.buildRequest();return Ha(t,i)}_linkToIdToken(t,i){const r=this.buildRequest();return r.idToken=i,Ha(t,r)}_getReauthenticationResolver(t){const i=this.buildRequest();return i.autoCreate=!1,Ha(t,i)}buildRequest(){const t={requestUri:AC,returnSecureToken:!0};if(this.pendingToken)t.pendingToken=this.pendingToken;else{const i={};this.idToken&&(i.id_token=this.idToken),this.accessToken&&(i.access_token=this.accessToken),this.secret&&(i.oauth_token_secret=this.secret),i.providerId=this.providerId,this.nonce&&!this.pendingToken&&(i.nonce=this.nonce),t.postBody=Nl(i)}return t}}/**
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
 */class WE{constructor(t){this.providerId=t,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(t){this.defaultLanguageCode=t}setCustomParameters(t){return this.customParameters=t,this}getCustomParameters(){return this.customParameters}}/**
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
 */class xl extends WE{constructor(){super(...arguments),this.scopes=[]}addScope(t){return this.scopes.includes(t)||this.scopes.push(t),this}getScopes(){return[...this.scopes]}}/**
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
 */class ks extends xl{constructor(){super("facebook.com")}static credential(t){return Lr._fromParams({providerId:ks.PROVIDER_ID,signInMethod:ks.FACEBOOK_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return ks.credentialFromTaggedObject(t)}static credentialFromError(t){return ks.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t)||!t.oauthAccessToken)return null;try{return ks.credential(t.oauthAccessToken)}catch{return null}}}ks.FACEBOOK_SIGN_IN_METHOD="facebook.com";ks.PROVIDER_ID="facebook.com";/**
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
 */class Us extends xl{constructor(){super("google.com"),this.addScope("profile")}static credential(t,i){return Lr._fromParams({providerId:Us.PROVIDER_ID,signInMethod:Us.GOOGLE_SIGN_IN_METHOD,idToken:t,accessToken:i})}static credentialFromResult(t){return Us.credentialFromTaggedObject(t)}static credentialFromError(t){return Us.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthIdToken:i,oauthAccessToken:r}=t;if(!i&&!r)return null;try{return Us.credential(i,r)}catch{return null}}}Us.GOOGLE_SIGN_IN_METHOD="google.com";Us.PROVIDER_ID="google.com";/**
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
 */class Ls extends xl{constructor(){super("github.com")}static credential(t){return Lr._fromParams({providerId:Ls.PROVIDER_ID,signInMethod:Ls.GITHUB_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return Ls.credentialFromTaggedObject(t)}static credentialFromError(t){return Ls.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t)||!t.oauthAccessToken)return null;try{return Ls.credential(t.oauthAccessToken)}catch{return null}}}Ls.GITHUB_SIGN_IN_METHOD="github.com";Ls.PROVIDER_ID="github.com";/**
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
 */class xs extends xl{constructor(){super("twitter.com")}static credential(t,i){return Lr._fromParams({providerId:xs.PROVIDER_ID,signInMethod:xs.TWITTER_SIGN_IN_METHOD,oauthToken:t,oauthTokenSecret:i})}static credentialFromResult(t){return xs.credentialFromTaggedObject(t)}static credentialFromError(t){return xs.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthAccessToken:i,oauthTokenSecret:r}=t;if(!i||!r)return null;try{return xs.credential(i,r)}catch{return null}}}xs.TWITTER_SIGN_IN_METHOD="twitter.com";xs.PROVIDER_ID="twitter.com";/**
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
 */async function SC(a,t){return PE(a,"POST","/v1/accounts:signUp",hh(a,t))}/**
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
 */class Zs{constructor(t){this.user=t.user,this.providerId=t.providerId,this._tokenResponse=t._tokenResponse,this.operationType=t.operationType}static async _fromIdTokenResponse(t,i,r,l=!1){const c=await Yn._fromIdTokenResponse(t,r,l),d=kv(r);return new Zs({user:c,providerId:d,_tokenResponse:r,operationType:i})}static async _forOperation(t,i,r){await t._updateTokensIfNecessary(r,!0);const l=kv(r);return new Zs({user:t,providerId:l,_tokenResponse:r,operationType:i})}}function kv(a){return a.providerId?a.providerId:"phoneNumber"in a?"phone":null}/**
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
 */async function VD(a){var l;if(Qn(a.app))return Promise.reject(js(a));const t=fh(a);if(await t._initializationPromise,(l=t.currentUser)!=null&&l.isAnonymous)return new Zs({user:t.currentUser,providerId:null,operationType:"signIn"});const i=await SC(t,{returnSecureToken:!0}),r=await Zs._fromIdTokenResponse(t,"signIn",i,!0);return await t._updateCurrentUser(r.user),r}/**
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
 */class Yc extends Wi{constructor(t,i,r,l){super(i.code,i.message),this.operationType=r,this.user=l,Object.setPrototypeOf(this,Yc.prototype),this.customData={appName:t.name,tenantId:t.tenantId??void 0,_serverResponse:i.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(t,i,r,l){return new Yc(t,i,r,l)}}function tT(a,t,i,r){return(t==="reauthenticate"?i._getReauthenticationResolver(a):i._getIdTokenResponse(a)).catch(c=>{throw c.code==="auth/multi-factor-auth-required"?Yc._fromErrorAndOperation(a,c,t,r):c})}async function bC(a,t,i=!1){const r=await Il(a,t._linkToIdToken(a.auth,await a.getIdToken()),i);return Zs._forOperation(a,"link",r)}/**
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
 */async function RC(a,t,i=!1){const{auth:r}=a;if(Qn(r.app))return Promise.reject(js(r));const l="reauthenticate";try{const c=await Il(a,tT(r,l,t,a),i);dt(c.idToken,r,"internal-error");const d=xm(c.idToken);dt(d,r,"internal-error");const{sub:p}=d;return dt(a.uid===p,r,"user-mismatch"),Zs._forOperation(a,l,c)}catch(c){throw(c==null?void 0:c.code)==="auth/user-not-found"&&$i(r,"user-mismatch"),c}}/**
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
 */async function wC(a,t,i=!1){if(Qn(a.app))return Promise.reject(js(a));const r="signIn",l=await tT(a,r,t),c=await Zs._fromIdTokenResponse(a,r,l);return i||await a._updateCurrentUser(c.user),c}function CC(a,t,i,r){return Vn(a).onIdTokenChanged(t,i,r)}function IC(a,t,i){return Vn(a).beforeAuthStateChanged(t,i)}function kD(a,t,i,r){return Vn(a).onAuthStateChanged(t,i,r)}const Xc="__sak";/**
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
 */class eT{constructor(t,i){this.storageRetriever=t,this.type=i}_isAvailable(){try{return this.storage?(this.storage.setItem(Xc,"1"),this.storage.removeItem(Xc),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(t,i){return this.storage.setItem(t,JSON.stringify(i)),Promise.resolve()}_get(t){const i=this.storage.getItem(t);return Promise.resolve(i?JSON.parse(i):null)}_remove(t){return this.storage.removeItem(t),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const DC=1e3,NC=10;class nT extends eT{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(t,i)=>this.onStorageEvent(t,i),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=XE(),this._shouldAllowMigration=!0}forAllChangedKeys(t){for(const i of Object.keys(this.listeners)){const r=this.storage.getItem(i),l=this.localCache[i];r!==l&&t(i,l,r)}}onStorageEvent(t,i=!1){if(!t.key){this.forAllChangedKeys((d,p,_)=>{this.notifyListeners(d,_)});return}const r=t.key;i?this.detachListener():this.stopPolling();const l=()=>{const d=this.storage.getItem(r);!i&&this.localCache[r]===d||this.notifyListeners(r,d)},c=this.storage.getItem(r);oC()&&c!==t.newValue&&t.newValue!==t.oldValue?setTimeout(l,NC):l()}notifyListeners(t,i){this.localCache[t]=i;const r=this.listeners[t];if(r)for(const l of Array.from(r))l(i&&JSON.parse(i))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((t,i,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:t,oldValue:i,newValue:r}),!0)})},DC)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(t,i){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[t]||(this.listeners[t]=new Set,this.localCache[t]=this.storage.getItem(t)),this.listeners[t].add(i)}_removeListener(t,i){this.listeners[t]&&(this.listeners[t].delete(i),this.listeners[t].size===0&&delete this.listeners[t]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(t,i){await super._set(t,i),this.localCache[t]=JSON.stringify(i)}async _get(t){const i=await super._get(t);return this.localCache[t]=JSON.stringify(i),i}async _remove(t){await super._remove(t),delete this.localCache[t]}}nT.type="LOCAL";const OC=nT;/**
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
 */class iT extends eT{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(t,i){}_removeListener(t,i){}}iT.type="SESSION";const sT=iT;/**
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
 */function MC(a){return Promise.all(a.map(async t=>{try{return{fulfilled:!0,value:await t}}catch(i){return{fulfilled:!1,reason:i}}}))}/**
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
 */class dh{constructor(t){this.eventTarget=t,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(t){const i=this.receivers.find(l=>l.isListeningto(t));if(i)return i;const r=new dh(t);return this.receivers.push(r),r}isListeningto(t){return this.eventTarget===t}async handleEvent(t){const i=t,{eventId:r,eventType:l,data:c}=i.data,d=this.handlersMap[l];if(!(d!=null&&d.size))return;i.ports[0].postMessage({status:"ack",eventId:r,eventType:l});const p=Array.from(d).map(async v=>v(i.origin,c)),_=await MC(p);i.ports[0].postMessage({status:"done",eventId:r,eventType:l,response:_})}_subscribe(t,i){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[t]||(this.handlersMap[t]=new Set),this.handlersMap[t].add(i)}_unsubscribe(t,i){this.handlersMap[t]&&i&&this.handlersMap[t].delete(i),(!i||this.handlersMap[t].size===0)&&delete this.handlersMap[t],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}dh.receivers=[];/**
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
 */function Bm(a="",t=10){let i="";for(let r=0;r<t;r++)i+=Math.floor(Math.random()*10);return a+i}/**
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
 */class VC{constructor(t){this.target=t,this.handlers=new Set}removeMessageHandler(t){t.messageChannel&&(t.messageChannel.port1.removeEventListener("message",t.onMessage),t.messageChannel.port1.close()),this.handlers.delete(t)}async _send(t,i,r=50){const l=typeof MessageChannel<"u"?new MessageChannel:null;if(!l)throw new Error("connection_unavailable");let c,d;return new Promise((p,_)=>{const v=Bm("",20);l.port1.start();const A=setTimeout(()=>{_(new Error("unsupported_event"))},r);d={messageChannel:l,onMessage(S){const k=S;if(k.data.eventId===v)switch(k.data.status){case"ack":clearTimeout(A),c=setTimeout(()=>{_(new Error("timeout"))},3e3);break;case"done":clearTimeout(c),p(k.data.response);break;default:clearTimeout(A),clearTimeout(c),_(new Error("invalid_response"));break}}},this.handlers.add(d),l.port1.addEventListener("message",d.onMessage),this.target.postMessage({eventType:t,eventId:v,data:i},[l.port2])}).finally(()=>{d&&this.removeMessageHandler(d)})}}/**
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
 */function Si(){return window}function kC(a){Si().location.href=a}/**
 * @license
 * Copyright 2020 Google LLC.
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
 */function rT(){return typeof Si().WorkerGlobalScope<"u"&&typeof Si().importScripts=="function"}async function UC(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function LC(){var a;return((a=navigator==null?void 0:navigator.serviceWorker)==null?void 0:a.controller)||null}function xC(){return rT()?self:null}/**
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
 */const aT="firebaseLocalStorageDb",PC=1,Zc="firebaseLocalStorage",oT="fbase_key";class Pl{constructor(t){this.request=t}toPromise(){return new Promise((t,i)=>{this.request.addEventListener("success",()=>{t(this.request.result)}),this.request.addEventListener("error",()=>{i(this.request.error)})})}}function mh(a,t){return a.transaction([Zc],t?"readwrite":"readonly").objectStore(Zc)}function zC(){const a=indexedDB.deleteDatabase(aT);return new Pl(a).toPromise()}function em(){const a=indexedDB.open(aT,PC);return new Promise((t,i)=>{a.addEventListener("error",()=>{i(a.error)}),a.addEventListener("upgradeneeded",()=>{const r=a.result;try{r.createObjectStore(Zc,{keyPath:oT})}catch(l){i(l)}}),a.addEventListener("success",async()=>{const r=a.result;r.objectStoreNames.contains(Zc)?t(r):(r.close(),await zC(),t(await em()))})})}async function Uv(a,t,i){const r=mh(a,!0).put({[oT]:t,value:i});return new Pl(r).toPromise()}async function BC(a,t){const i=mh(a,!1).get(t),r=await new Pl(i).toPromise();return r===void 0?null:r.value}function Lv(a,t){const i=mh(a,!0).delete(t);return new Pl(i).toPromise()}const qC=800,HC=3;class lT{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await em(),this.db)}async _withRetries(t){let i=0;for(;;)try{const r=await this._openDb();return await t(r)}catch(r){if(i++>HC)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return rT()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=dh._getInstance(xC()),this.receiver._subscribe("keyChanged",async(t,i)=>({keyProcessed:(await this._poll()).includes(i.key)})),this.receiver._subscribe("ping",async(t,i)=>["keyChanged"])}async initializeSender(){var i,r;if(this.activeServiceWorker=await UC(),!this.activeServiceWorker)return;this.sender=new VC(this.activeServiceWorker);const t=await this.sender._send("ping",{},800);t&&(i=t[0])!=null&&i.fulfilled&&(r=t[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(t){if(!(!this.sender||!this.activeServiceWorker||LC()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:t},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const t=await em();return await Uv(t,Xc,"1"),await Lv(t,Xc),!0}catch{}return!1}async _withPendingWrite(t){this.pendingWrites++;try{await t()}finally{this.pendingWrites--}}async _set(t,i){return this._withPendingWrite(async()=>(await this._withRetries(r=>Uv(r,t,i)),this.localCache[t]=i,this.notifyServiceWorker(t)))}async _get(t){const i=await this._withRetries(r=>BC(r,t));return this.localCache[t]=i,i}async _remove(t){return this._withPendingWrite(async()=>(await this._withRetries(i=>Lv(i,t)),delete this.localCache[t],this.notifyServiceWorker(t)))}async _poll(){const t=await this._withRetries(l=>{const c=mh(l,!1).getAll();return new Pl(c).toPromise()});if(!t)return[];if(this.pendingWrites!==0)return[];const i=[],r=new Set;if(t.length!==0)for(const{fbase_key:l,value:c}of t)r.add(l),JSON.stringify(this.localCache[l])!==JSON.stringify(c)&&(this.notifyListeners(l,c),i.push(l));for(const l of Object.keys(this.localCache))this.localCache[l]&&!r.has(l)&&(this.notifyListeners(l,null),i.push(l));return i}notifyListeners(t,i){this.localCache[t]=i;const r=this.listeners[t];if(r)for(const l of Array.from(r))l(i)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),qC)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(t,i){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[t]||(this.listeners[t]=new Set,this._get(t)),this.listeners[t].add(i)}_removeListener(t,i){this.listeners[t]&&(this.listeners[t].delete(i),this.listeners[t].size===0&&delete this.listeners[t]),Object.keys(this.listeners).length===0&&this.stopPolling()}}lT.type="LOCAL";const jC=lT;new Ll(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
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
 */function GC(a,t){return t?Qi(t):(dt(a._popupRedirectResolver,a,"argument-error"),a._popupRedirectResolver)}/**
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
 */class qm extends JE{constructor(t){super("custom","custom"),this.params=t}_getIdTokenResponse(t){return Ha(t,this._buildIdpRequest())}_linkToIdToken(t,i){return Ha(t,this._buildIdpRequest(i))}_getReauthenticationResolver(t){return Ha(t,this._buildIdpRequest())}_buildIdpRequest(t){const i={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return t&&(i.idToken=t),i}}function FC(a){return wC(a.auth,new qm(a),a.bypassAuthState)}function QC(a){const{auth:t,user:i}=a;return dt(i,t,"internal-error"),RC(i,new qm(a),a.bypassAuthState)}async function KC(a){const{auth:t,user:i}=a;return dt(i,t,"internal-error"),bC(i,new qm(a),a.bypassAuthState)}/**
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
 */class uT{constructor(t,i,r,l,c=!1){this.auth=t,this.resolver=r,this.user=l,this.bypassAuthState=c,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(i)?i:[i]}execute(){return new Promise(async(t,i)=>{this.pendingPromise={resolve:t,reject:i};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(t){const{urlResponse:i,sessionId:r,postBody:l,tenantId:c,error:d,type:p}=t;if(d){this.reject(d);return}const _={auth:this.auth,requestUri:i,sessionId:r,tenantId:c||void 0,postBody:l||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(p)(_))}catch(v){this.reject(v)}}onError(t){this.reject(t)}getIdpTask(t){switch(t){case"signInViaPopup":case"signInViaRedirect":return FC;case"linkViaPopup":case"linkViaRedirect":return KC;case"reauthViaPopup":case"reauthViaRedirect":return QC;default:$i(this.auth,"internal-error")}}resolve(t){Ji(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(t),this.unregisterAndCleanUp()}reject(t){Ji(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(t),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const YC=new Ll(2e3,1e4);class Ua extends uT{constructor(t,i,r,l,c){super(t,i,l,c),this.provider=r,this.authWindow=null,this.pollId=null,Ua.currentPopupAction&&Ua.currentPopupAction.cancel(),Ua.currentPopupAction=this}async executeNotNull(){const t=await this.execute();return dt(t,this.auth,"internal-error"),t}async onExecution(){Ji(this.filter.length===1,"Popup operations only handle one event");const t=Bm();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],t),this.authWindow.associatedEvent=t,this.resolver._originValidation(this.auth).catch(i=>{this.reject(i)}),this.resolver._isIframeWebStorageSupported(this.auth,i=>{i||this.reject(Ai(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var t;return((t=this.authWindow)==null?void 0:t.associatedEvent)||null}cancel(){this.reject(Ai(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Ua.currentPopupAction=null}pollUserCancellation(){const t=()=>{var i,r;if((r=(i=this.authWindow)==null?void 0:i.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ai(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(t,YC.get())};t()}}Ua.currentPopupAction=null;/**
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
 */const XC="pendingRedirect",Ic=new Map;class ZC extends uT{constructor(t,i,r=!1){super(t,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],i,void 0,r),this.eventId=null}async execute(){let t=Ic.get(this.auth._key());if(!t){try{const r=await $C(this.resolver,this.auth)?await super.execute():null;t=()=>Promise.resolve(r)}catch(i){t=()=>Promise.reject(i)}Ic.set(this.auth._key(),t)}return this.bypassAuthState||Ic.set(this.auth._key(),()=>Promise.resolve(null)),t()}async onAuthEvent(t){if(t.type==="signInViaRedirect")return super.onAuthEvent(t);if(t.type==="unknown"){this.resolve(null);return}if(t.eventId){const i=await this.auth._redirectUserForId(t.eventId);if(i)return this.user=i,super.onAuthEvent(t);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function $C(a,t){const i=tI(t),r=WC(a);if(!await r._isAvailable())return!1;const l=await r._get(i)==="true";return await r._remove(i),l}function JC(a,t){Ic.set(a._key(),t)}function WC(a){return Qi(a._redirectPersistence)}function tI(a){return Cc(XC,a.config.apiKey,a.name)}async function eI(a,t,i=!1){if(Qn(a.app))return Promise.reject(js(a));const r=fh(a),l=GC(r,t),d=await new ZC(r,l,i).execute();return d&&!i&&(delete d.user._redirectEventId,await r._persistUserIfCurrent(d.user),await r._setRedirectUser(null,t)),d}/**
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
 */const nI=600*1e3;class iI{constructor(t){this.auth=t,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(t){this.consumers.add(t),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,t)&&(this.sendToConsumer(this.queuedRedirectEvent,t),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(t){this.consumers.delete(t)}onEvent(t){if(this.hasEventBeenHandled(t))return!1;let i=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(t,r)&&(i=!0,this.sendToConsumer(t,r),this.saveEventToCache(t))}),this.hasHandledPotentialRedirect||!sI(t)||(this.hasHandledPotentialRedirect=!0,i||(this.queuedRedirectEvent=t,i=!0)),i}sendToConsumer(t,i){var r;if(t.error&&!cT(t)){const l=((r=t.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";i.onError(Ai(this.auth,l))}else i.onAuthEvent(t)}isEventForConsumer(t,i){const r=i.eventId===null||!!t.eventId&&t.eventId===i.eventId;return i.filter.includes(t.type)&&r}hasEventBeenHandled(t){return Date.now()-this.lastProcessedEventTime>=nI&&this.cachedEventUids.clear(),this.cachedEventUids.has(xv(t))}saveEventToCache(t){this.cachedEventUids.add(xv(t)),this.lastProcessedEventTime=Date.now()}}function xv(a){return[a.type,a.eventId,a.sessionId,a.tenantId].filter(t=>t).join("-")}function cT({type:a,error:t}){return a==="unknown"&&(t==null?void 0:t.code)==="auth/no-auth-event"}function sI(a){switch(a.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return cT(a);default:return!1}}/**
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
 */async function rI(a,t={}){return no(a,"GET","/v1/projects",t)}/**
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
 */const aI=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,oI=/^https?/;async function lI(a){if(a.config.emulator)return;const{authorizedDomains:t}=await rI(a);for(const i of t)try{if(uI(i))return}catch{}$i(a,"unauthorized-domain")}function uI(a){const t=Wd(),{protocol:i,hostname:r}=new URL(t);if(a.startsWith("chrome-extension://")){const d=new URL(a);return d.hostname===""&&r===""?i==="chrome-extension:"&&a.replace("chrome-extension://","")===t.replace("chrome-extension://",""):i==="chrome-extension:"&&d.hostname===r}if(!oI.test(i))return!1;if(aI.test(a))return r===a;const l=a.replace(/\./g,"\\.");return new RegExp("^(.+\\."+l+"|"+l+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
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
 */const cI=new Ll(3e4,6e4);function Pv(){const a=Si().___jsl;if(a!=null&&a.H){for(const t of Object.keys(a.H))if(a.H[t].r=a.H[t].r||[],a.H[t].L=a.H[t].L||[],a.H[t].r=[...a.H[t].L],a.CP)for(let i=0;i<a.CP.length;i++)a.CP[i]=null}}function hI(a){return new Promise((t,i)=>{var l,c,d;function r(){Pv(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{Pv(),i(Ai(a,"network-request-failed"))},timeout:cI.get()})}if((c=(l=Si().gapi)==null?void 0:l.iframes)!=null&&c.Iframe)t(gapi.iframes.getContext());else if((d=Si().gapi)!=null&&d.load)r();else{const p=pC("iframefcb");return Si()[p]=()=>{gapi.load?r():i(Ai(a,"network-request-failed"))},mC(`${gC()}?onload=${p}`).catch(_=>i(_))}}).catch(t=>{throw Dc=null,t})}let Dc=null;function fI(a){return Dc=Dc||hI(a),Dc}/**
 * @license
 * Copyright 2020 Google LLC.
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
 */const dI=new Ll(5e3,15e3),mI="__/auth/iframe",gI="emulator/auth/iframe",pI={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},yI=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function _I(a){const t=a.config;dt(t.authDomain,a,"auth-domain-config-required");const i=t.emulator?Lm(t,gI):`https://${a.config.authDomain}/${mI}`,r={apiKey:t.apiKey,appName:a.name,v:$a},l=yI.get(a.config.apiHost);l&&(r.eid=l);const c=a._getFrameworks();return c.length&&(r.fw=c.join(",")),`${i}?${Nl(r).slice(1)}`}async function vI(a){const t=await fI(a),i=Si().gapi;return dt(i,a,"internal-error"),t.open({where:document.body,url:_I(a),messageHandlersFilter:i.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:pI,dontclear:!0},r=>new Promise(async(l,c)=>{await r.restyle({setHideOnLeave:!1});const d=Ai(a,"network-request-failed"),p=Si().setTimeout(()=>{c(d)},dI.get());function _(){Si().clearTimeout(p),l(r)}r.ping(_).then(_,()=>{c(d)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
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
 */const EI={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},TI=500,AI=600,SI="_blank",bI="http://localhost";class zv{constructor(t){this.window=t,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function RI(a,t,i,r=TI,l=AI){const c=Math.max((window.screen.availHeight-l)/2,0).toString(),d=Math.max((window.screen.availWidth-r)/2,0).toString();let p="";const _={...EI,width:r.toString(),height:l.toString(),top:c,left:d},v=Ze().toLowerCase();i&&(p=GE(v)?SI:i),HE(v)&&(t=t||bI,_.scrollbars="yes");const A=Object.entries(_).reduce((k,[F,J])=>`${k}${F}=${J},`,"");if(aC(v)&&p!=="_self")return wI(t||"",p),new zv(null);const S=window.open(t||"",p,A);dt(S,a,"popup-blocked");try{S.focus()}catch{}return new zv(S)}function wI(a,t){const i=document.createElement("a");i.href=a,i.target=t;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),i.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
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
 */const CI="__/auth/handler",II="emulator/auth/handler",DI=encodeURIComponent("fac");async function Bv(a,t,i,r,l,c){dt(a.config.authDomain,a,"auth-domain-config-required"),dt(a.config.apiKey,a,"invalid-api-key");const d={apiKey:a.config.apiKey,appName:a.name,authType:i,redirectUrl:r,v:$a,eventId:l};if(t instanceof WE){t.setDefaultLanguage(a.languageCode),d.providerId=t.providerId||"",fS(t.getCustomParameters())||(d.customParameters=JSON.stringify(t.getCustomParameters()));for(const[A,S]of Object.entries({}))d[A]=S}if(t instanceof xl){const A=t.getScopes().filter(S=>S!=="");A.length>0&&(d.scopes=A.join(","))}a.tenantId&&(d.tid=a.tenantId);const p=d;for(const A of Object.keys(p))p[A]===void 0&&delete p[A];const _=await a._getAppCheckToken(),v=_?`#${DI}=${encodeURIComponent(_)}`:"";return`${NI(a)}?${Nl(p).slice(1)}${v}`}function NI({config:a}){return a.emulator?Lm(a,II):`https://${a.authDomain}/${CI}`}/**
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
 */const Od="webStorageSupport";class OI{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=sT,this._completeRedirectFn=eI,this._overrideRedirectResult=JC}async _openPopup(t,i,r,l){var d;Ji((d=this.eventManagers[t._key()])==null?void 0:d.manager,"_initialize() not called before _openPopup()");const c=await Bv(t,i,r,Wd(),l);return RI(t,c,Bm())}async _openRedirect(t,i,r,l){await this._originValidation(t);const c=await Bv(t,i,r,Wd(),l);return kC(c),new Promise(()=>{})}_initialize(t){const i=t._key();if(this.eventManagers[i]){const{manager:l,promise:c}=this.eventManagers[i];return l?Promise.resolve(l):(Ji(c,"If manager is not set, promise should be"),c)}const r=this.initAndGetManager(t);return this.eventManagers[i]={promise:r},r.catch(()=>{delete this.eventManagers[i]}),r}async initAndGetManager(t){const i=await vI(t),r=new iI(t);return i.register("authEvent",l=>(dt(l==null?void 0:l.authEvent,t,"invalid-auth-event"),{status:r.onEvent(l.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[t._key()]={manager:r},this.iframes[t._key()]=i,r}_isIframeWebStorageSupported(t,i){this.iframes[t._key()].send(Od,{type:Od},l=>{var d;const c=(d=l==null?void 0:l[0])==null?void 0:d[Od];c!==void 0&&i(!!c),$i(t,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(t){const i=t._key();return this.originValidationPromises[i]||(this.originValidationPromises[i]=lI(t)),this.originValidationPromises[i]}get _shouldInitProactively(){return XE()||jE()||Pm()}}const MI=OI;var qv="@firebase/auth",Hv="1.12.0";/**
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
 */class VI{constructor(t){this.auth=t,this.internalListeners=new Map}getUid(){var t;return this.assertAuthConfigured(),((t=this.auth.currentUser)==null?void 0:t.uid)||null}async getToken(t){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(t)}:null}addAuthTokenListener(t){if(this.assertAuthConfigured(),this.internalListeners.has(t))return;const i=this.auth.onIdTokenChanged(r=>{t((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(t,i),this.updateProactiveRefresh()}removeAuthTokenListener(t){this.assertAuthConfigured();const i=this.internalListeners.get(t);i&&(this.internalListeners.delete(t),i(),this.updateProactiveRefresh())}assertAuthConfigured(){dt(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function kI(a){switch(a){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function UI(a){ja(new Vr("auth",(t,{options:i})=>{const r=t.getProvider("app").getImmediate(),l=t.getProvider("heartbeat"),c=t.getProvider("app-check-internal"),{apiKey:d,authDomain:p}=r.options;dt(d&&!d.includes(":"),"invalid-api-key",{appName:r.name});const _={apiKey:d,authDomain:p,clientPlatform:a,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:ZE(a)},v=new fC(r,l,c,_);return _C(v,i),v},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,i,r)=>{t.getProvider("auth-internal").initialize()})),ja(new Vr("auth-internal",t=>{const i=fh(t.getProvider("auth").getImmediate());return(r=>new VI(r))(i)},"PRIVATE").setInstantiationMode("EXPLICIT")),qs(qv,Hv,kI(a)),qs(qv,Hv,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
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
 */const LI=300,xI=$v("authIdTokenMaxAge")||LI;let jv=null;const PI=a=>async t=>{const i=t&&await t.getIdTokenResult(),r=i&&(new Date().getTime()-Date.parse(i.issuedAtTime))/1e3;if(r&&r>xI)return;const l=i==null?void 0:i.token;jv!==l&&(jv=l,await fetch(a,{method:l?"POST":"DELETE",headers:l?{Authorization:`Bearer ${l}`}:{}}))};function UD(a=n0()){const t=rm(a,"auth");if(t.isInitialized())return t.getImmediate();const i=yC(a,{popupRedirectResolver:MI,persistence:[jC,OC,sT]}),r=$v("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const c=new URL(r,location.origin);if(location.origin===c.origin){const d=PI(c.toString());IC(i,d,()=>d(i.currentUser)),CC(i,p=>d(p))}}const l=Xv("auth");return l&&vC(i,`http://${l}`),i}function zI(){var a;return((a=document.getElementsByTagName("head"))==null?void 0:a[0])??document}dC({loadJS(a){return new Promise((t,i)=>{const r=document.createElement("script");r.setAttribute("src",a),r.onload=t,r.onerror=l=>{const c=Ai("internal-error");c.customData=l,i(c)},r.type="text/javascript",r.charset="UTF-8",zI().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});UI("Browser");export{jI as A,QI as B,tD as C,rD as D,sD as E,oD as F,lD as G,ZI as H,uD as I,ED as J,cD as K,hD as L,gD as M,aD as N,dD as O,mD as P,fD as Q,qI as R,vD as S,bD as T,RD as U,FI as V,HI as W,wD as X,CD as Z,ND as a,VD as b,MD as c,DD as d,YI as e,WI as f,UD as g,SD as h,m2 as i,BI as j,iD as k,eD as l,KI as m,TD as n,kD as o,JI as p,nD as q,La as r,OD as s,GI as t,$I as u,_D as v,AD as w,XI as x,yD as y,pD as z};
