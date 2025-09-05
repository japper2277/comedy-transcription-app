var ny=Object.defineProperty,sy=Object.defineProperties;var iy=Object.getOwnPropertyDescriptors;var Ar=Object.getOwnPropertySymbols,ry=Object.getPrototypeOf,Ah=Object.prototype.hasOwnProperty,Rh=Object.prototype.propertyIsEnumerable,oy=Reflect.get;var Ch=(n,e,t)=>e in n?ny(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,ee=(n,e)=>{for(var t in e||(e={}))Ah.call(e,t)&&Ch(n,t,e[t]);if(Ar)for(var t of Ar(e))Rh.call(e,t)&&Ch(n,t,e[t]);return n},Rt=(n,e)=>sy(n,iy(e));var Rr=(n,e)=>{var t={};for(var s in n)Ah.call(n,s)&&e.indexOf(s)<0&&(t[s]=n[s]);if(n!=null&&Ar)for(var s of Ar(n))e.indexOf(s)<0&&Rh.call(n,s)&&(t[s]=n[s]);return t};var An=(n,e,t)=>oy(ry(n),t,e);var y=(n,e,t)=>new Promise((s,i)=>{var r=l=>{try{c(t.next(l))}catch(h){i(h)}},o=l=>{try{c(t.throw(l))}catch(h){i(h)}},c=l=>l.done?s(l.value):Promise.resolve(l.value).then(r,o);c((t=t.apply(n,e)).next())});const ay=()=>{};var Sh={};/**
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
 */const Wf={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
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
 */const O=function(n,e){if(!n)throw As(e)},As=function(n){return new Error("Firebase Database ("+Wf.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
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
 */const jf=function(n){const e=[];let t=0;for(let s=0;s<n.length;s++){let i=n.charCodeAt(s);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&s+1<n.length&&(n.charCodeAt(s+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++s)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},cy=function(n){const e=[];let t=0,s=0;for(;t<n.length;){const i=n[t++];if(i<128)e[s++]=String.fromCharCode(i);else if(i>191&&i<224){const r=n[t++];e[s++]=String.fromCharCode((i&31)<<6|r&63)}else if(i>239&&i<365){const r=n[t++],o=n[t++],c=n[t++],l=((i&7)<<18|(r&63)<<12|(o&63)<<6|c&63)-65536;e[s++]=String.fromCharCode(55296+(l>>10)),e[s++]=String.fromCharCode(56320+(l&1023))}else{const r=n[t++],o=n[t++];e[s++]=String.fromCharCode((i&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Wc={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let i=0;i<n.length;i+=3){const r=n[i],o=i+1<n.length,c=o?n[i+1]:0,l=i+2<n.length,h=l?n[i+2]:0,f=r>>2,p=(r&3)<<4|c>>4;let _=(c&15)<<2|h>>6,T=h&63;l||(T=64,o||(_=64)),s.push(t[f],t[p],t[_],t[T])}return s.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(jf(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):cy(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let i=0;i<n.length;){const r=t[n.charAt(i++)],c=i<n.length?t[n.charAt(i)]:0;++i;const h=i<n.length?t[n.charAt(i)]:64;++i;const p=i<n.length?t[n.charAt(i)]:64;if(++i,r==null||c==null||h==null||p==null)throw new ly;const _=r<<2|c>>4;if(s.push(_),h!==64){const T=c<<4&240|h>>2;if(s.push(T),p!==64){const S=h<<6&192|p;s.push(S)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class ly extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const $f=function(n){const e=jf(n);return Wc.encodeByteArray(e,!0)},zr=function(n){return $f(n).replace(/\./g,"")},Gr=function(n){try{return Wc.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function uy(n){return Hf(void 0,n)}function Hf(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!hy(t)||(n[t]=Hf(n[t],e[t]));return n}function hy(n){return n!=="__proto__"}/**
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
 */function dy(){if(typeof self!="undefined")return self;if(typeof window!="undefined")return window;if(typeof global!="undefined")return global;throw new Error("Unable to locate global object.")}/**
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
 */const fy=()=>dy().__FIREBASE_DEFAULTS__,py=()=>{if(typeof process=="undefined"||typeof Sh=="undefined")return;const n=Sh.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},_y=()=>{if(typeof document=="undefined")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(t){return}const e=n&&Gr(n[1]);return e&&JSON.parse(e)},ko=()=>{try{return ay()||fy()||py()||_y()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},zf=n=>{var e,t;return(t=(e=ko())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},Gf=n=>{const e=zf(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),s]:[e.substring(0,t),s]},Kf=()=>{var n;return(n=ko())==null?void 0:n.config},Qf=n=>{var e;return(e=ko())==null?void 0:e[`_${n}`]};/**
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
 */class Pt{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,s)=>{t?this.reject(t):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,s))}}}/**
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
 */function gn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch(e){return!1}}function jc(n){return y(this,null,function*(){return(yield fetch(n,{credentials:"include"})).ok})}/**
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
 */function Yf(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},s=e||"demo-project",i=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=ee({iss:`https://securetoken.google.com/${s}`,aud:s,iat:i,exp:i+3600,auth_time:i,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}}},n);return[zr(JSON.stringify(t)),zr(JSON.stringify(o)),""].join(".")}const li={};function my(){const n={prod:[],emulator:[]};for(const e of Object.keys(li))li[e]?n.emulator.push(e):n.prod.push(e);return n}function gy(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Ph=!1;function $c(n,e){if(typeof window=="undefined"||typeof document=="undefined"||!gn(window.location.host)||li[n]===e||li[n]||Ph)return;li[n]=e;function t(_){return`__firebase__banner__${_}`}const s="__firebase__banner",r=my().prod.length>0;function o(){const _=document.getElementById(s);_&&_.remove()}function c(_){_.style.display="flex",_.style.background="#7faaf0",_.style.position="fixed",_.style.bottom="5px",_.style.left="5px",_.style.padding=".5em",_.style.borderRadius="5px",_.style.alignItems="center"}function l(_,T){_.setAttribute("width","24"),_.setAttribute("id",T),_.setAttribute("height","24"),_.setAttribute("viewBox","0 0 24 24"),_.setAttribute("fill","none"),_.style.marginLeft="-6px"}function h(){const _=document.createElement("span");return _.style.cursor="pointer",_.style.marginLeft="16px",_.style.fontSize="24px",_.innerHTML=" &times;",_.onclick=()=>{Ph=!0,o()},_}function f(_,T){_.setAttribute("id",T),_.innerText="Learn more",_.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",_.setAttribute("target","__blank"),_.style.paddingLeft="5px",_.style.textDecoration="underline"}function p(){const _=gy(s),T=t("text"),S=document.getElementById(T)||document.createElement("span"),D=t("learnmore"),k=document.getElementById(D)||document.createElement("a"),$=t("preprendIcon"),q=document.getElementById($)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(_.created){const H=_.element;c(H),f(k,D);const ce=h();l(q,$),H.append(q,S,k,ce),document.body.appendChild(H)}r?(S.innerText="Preview backend disconnected.",q.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(q.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,S.innerText="Preview backend running in this workspace."),S.setAttribute("id",T)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",p):p()}/**
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
 */function Ue(){return typeof navigator!="undefined"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Hc(){return typeof window!="undefined"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ue())}function yy(){var e;const n=(e=ko())==null?void 0:e.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch(t){return!1}}function Ey(){return typeof navigator!="undefined"&&navigator.userAgent==="Cloudflare-Workers"}function vy(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Xf(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Iy(){const n=Ue();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Ty(){return Wf.NODE_ADMIN===!0}function wy(){return!yy()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Cy(){try{return typeof indexedDB=="object"}catch(n){return!1}}function Ay(){return new Promise((n,e)=>{try{let t=!0;const s="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(s);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(s),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var r;e(((r=i.error)==null?void 0:r.message)||"")}}catch(t){e(t)}})}/**
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
 */const Ry="FirebaseError";class qt extends Error{constructor(e,t,s){super(t),this.code=e,this.customData=s,this.name=Ry,Object.setPrototypeOf(this,qt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Bi.prototype.create)}}class Bi{constructor(e,t,s){this.service=e,this.serviceName=t,this.errors=s}create(e,...t){const s=t[0]||{},i=`${this.service}/${e}`,r=this.errors[e],o=r?Sy(r,s):"Error",c=`${this.serviceName}: ${o} (${i}).`;return new qt(i,c,s)}}function Sy(n,e){return n.replace(Py,(t,s)=>{const i=e[s];return i!=null?String(i):`<${s}?>`})}const Py=/\{\$([^}]+)}/g;/**
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
 */function Ii(n){return JSON.parse(n)}function Se(n){return JSON.stringify(n)}/**
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
 */const Jf=function(n){let e={},t={},s={},i="";try{const r=n.split(".");e=Ii(Gr(r[0])||""),t=Ii(Gr(r[1])||""),i=r[2],s=t.d||{},delete t.d}catch(r){}return{header:e,claims:t,data:s,signature:i}},by=function(n){const e=Jf(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},Ny=function(n){const e=Jf(n).claims;return typeof e=="object"&&e.admin===!0};/**
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
 */function vt(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function ds(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function Kr(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Qr(n,e,t){const s={};for(const i in n)Object.prototype.hasOwnProperty.call(n,i)&&(s[i]=e.call(t,n[i],i,n));return s}function an(n,e){if(n===e)return!0;const t=Object.keys(n),s=Object.keys(e);for(const i of t){if(!s.includes(i))return!1;const r=n[i],o=e[i];if(bh(r)&&bh(o)){if(!an(r,o))return!1}else if(r!==o)return!1}for(const i of s)if(!t.includes(i))return!1;return!0}function bh(n){return n!==null&&typeof n=="object"}/**
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
 */function Rs(n){const e=[];for(const[t,s]of Object.entries(n))Array.isArray(s)?s.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}function si(n){const e={};return n.replace(/^\?/,"").split("&").forEach(s=>{if(s){const[i,r]=s.split("=");e[decodeURIComponent(i)]=decodeURIComponent(r)}}),e}function ii(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}/**
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
 */class ky{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const s=this.W_;if(typeof e=="string")for(let p=0;p<16;p++)s[p]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let p=0;p<16;p++)s[p]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let p=16;p<80;p++){const _=s[p-3]^s[p-8]^s[p-14]^s[p-16];s[p]=(_<<1|_>>>31)&4294967295}let i=this.chain_[0],r=this.chain_[1],o=this.chain_[2],c=this.chain_[3],l=this.chain_[4],h,f;for(let p=0;p<80;p++){p<40?p<20?(h=c^r&(o^c),f=1518500249):(h=r^o^c,f=1859775393):p<60?(h=r&o|c&(r|o),f=2400959708):(h=r^o^c,f=3395469782);const _=(i<<5|i>>>27)+h+l+f+s[p]&4294967295;l=c,c=o,o=(r<<30|r>>>2)&4294967295,r=i,i=_}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+c&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const s=t-this.blockSize;let i=0;const r=this.buf_;let o=this.inbuf_;for(;i<t;){if(o===0)for(;i<=s;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<t;)if(r[o]=e.charCodeAt(i),++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}else for(;i<t;)if(r[o]=e[i],++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=t&255,t/=256;this.compress_(this.buf_);let s=0;for(let i=0;i<5;i++)for(let r=24;r>=0;r-=8)e[s]=this.chain_[i]>>r&255,++s;return e}}function Dy(n,e){const t=new Oy(n,e);return t.subscribe.bind(t)}class Oy{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,s){let i;if(e===void 0&&t===void 0&&s===void 0)throw new Error("Missing Observer.");Vy(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:s},i.next===void 0&&(i.next=La),i.error===void 0&&(i.error=La),i.complete===void 0&&(i.complete=La);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch(o){}}),this.observers.push(i),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(s){typeof console!="undefined"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Vy(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function La(){}function fs(n,e){return`${n} failed: ${e} argument `}/**
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
 */const My=function(n){const e=[];let t=0;for(let s=0;s<n.length;s++){let i=n.charCodeAt(s);if(i>=55296&&i<=56319){const r=i-55296;s++,O(s<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(s)-56320;i=65536+(r<<10)+o}i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):i<65536?(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Do=function(n){let e=0;for(let t=0;t<n.length;t++){const s=n.charCodeAt(t);s<128?e++:s<2048?e+=2:s>=55296&&s<=56319?(e+=4,t++):e+=3}return e};/**
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
 */function se(n){return n&&n._delegate?n._delegate:n}class cn{constructor(e,t,s){this.name=e,this.instanceFactory=t,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Rn="[DEFAULT]";/**
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
 */class xy{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const s=new Pt;if(this.instancesDeferred.set(t,s),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&s.resolve(i)}catch(i){}}return this.instancesDeferred.get(t).promise}getImmediate(e){var i;const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(i=e==null?void 0:e.optional)!=null?i:!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Fy(e))try{this.getOrInitializeService({instanceIdentifier:Rn})}catch(t){}for(const[t,s]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:i});s.resolve(r)}catch(r){}}}}clearInstance(e=Rn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}delete(){return y(this,null,function*(){const e=Array.from(this.instances.values());yield Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])})}isComponentSet(){return this.component!=null}isInitialized(e=Rn){return this.instances.has(e)}getOptions(e=Rn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:s,options:t});for(const[r,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(r);s===c&&o.resolve(i)}return i}onInit(e,t){var o;const s=this.normalizeInstanceIdentifier(t),i=(o=this.onInitCallbacks.get(s))!=null?o:new Set;i.add(e),this.onInitCallbacks.set(s,i);const r=this.instances.get(s);return r&&e(r,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const s=this.onInitCallbacks.get(t);if(s)for(const i of s)try{i(e,t)}catch(r){}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:Ly(e),options:t}),this.instances.set(e,s),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch(i){}return s||null}normalizeInstanceIdentifier(e=Rn){return this.component?this.component.multipleInstances?e:Rn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Ly(n){return n===Rn?void 0:n}function Fy(n){return n.instantiationMode==="EAGER"}/**
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
 */class Uy{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new xy(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var Q;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(Q||(Q={}));const By={debug:Q.DEBUG,verbose:Q.VERBOSE,info:Q.INFO,warn:Q.WARN,error:Q.ERROR,silent:Q.SILENT},qy=Q.INFO,Wy={[Q.DEBUG]:"log",[Q.VERBOSE]:"log",[Q.INFO]:"info",[Q.WARN]:"warn",[Q.ERROR]:"error"},jy=(n,e,...t)=>{if(e<n.logLevel)return;const s=new Date().toISOString(),i=Wy[e];if(i)console[i](`[${s}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Oo{constructor(e){this.name=e,this._logLevel=qy,this._logHandler=jy,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Q))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?By[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Q.DEBUG,...e),this._logHandler(this,Q.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Q.VERBOSE,...e),this._logHandler(this,Q.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Q.INFO,...e),this._logHandler(this,Q.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Q.WARN,...e),this._logHandler(this,Q.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Q.ERROR,...e),this._logHandler(this,Q.ERROR,...e)}}const $y=(n,e)=>e.some(t=>n instanceof t);let Nh,kh;function Hy(){return Nh||(Nh=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function zy(){return kh||(kh=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Zf=new WeakMap,sc=new WeakMap,ep=new WeakMap,Fa=new WeakMap,zc=new WeakMap;function Gy(n){const e=new Promise((t,s)=>{const i=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t(en(n.result)),i()},o=()=>{s(n.error),i()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Zf.set(t,n)}).catch(()=>{}),zc.set(e,n),e}function Ky(n){if(sc.has(n))return;const e=new Promise((t,s)=>{const i=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),i()},o=()=>{s(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});sc.set(n,e)}let ic={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return sc.get(n);if(e==="objectStoreNames")return n.objectStoreNames||ep.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return en(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Qy(n){ic=n(ic)}function Yy(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const s=n.call(Ua(this),e,...t);return ep.set(s,e.sort?e.sort():[e]),en(s)}:zy().includes(n)?function(...e){return n.apply(Ua(this),e),en(Zf.get(this))}:function(...e){return en(n.apply(Ua(this),e))}}function Xy(n){return typeof n=="function"?Yy(n):(n instanceof IDBTransaction&&Ky(n),$y(n,Hy())?new Proxy(n,ic):n)}function en(n){if(n instanceof IDBRequest)return Gy(n);if(Fa.has(n))return Fa.get(n);const e=Xy(n);return e!==n&&(Fa.set(n,e),zc.set(e,n)),e}const Ua=n=>zc.get(n);function Jy(n,e,{blocked:t,upgrade:s,blocking:i,terminated:r}={}){const o=indexedDB.open(n,e),c=en(o);return s&&o.addEventListener("upgradeneeded",l=>{s(en(o.result),l.oldVersion,l.newVersion,en(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),c.then(l=>{r&&l.addEventListener("close",()=>r()),i&&l.addEventListener("versionchange",h=>i(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}const Zy=["get","getKey","getAll","getAllKeys","count"],eE=["put","add","delete","clear"],Ba=new Map;function Dh(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Ba.get(e))return Ba.get(e);const t=e.replace(/FromIndex$/,""),s=e!==t,i=eE.includes(t);if(!(t in(s?IDBIndex:IDBObjectStore).prototype)||!(i||Zy.includes(t)))return;const r=function(o,...c){return y(this,null,function*(){const l=this.transaction(o,i?"readwrite":"readonly");let h=l.store;return s&&(h=h.index(c.shift())),(yield Promise.all([h[t](...c),i&&l.done]))[0]})};return Ba.set(e,r),r}Qy(n=>Rt(ee({},n),{get:(e,t,s)=>Dh(e,t)||n.get(e,t,s),has:(e,t)=>!!Dh(e,t)||n.has(e,t)}));/**
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
 */class tE{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(nE(t)){const s=t.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(t=>t).join(" ")}}function nE(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const rc="@firebase/app",Oh="0.14.1";/**
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
 */const Vt=new Oo("@firebase/app"),sE="@firebase/app-compat",iE="@firebase/analytics-compat",rE="@firebase/analytics",oE="@firebase/app-check-compat",aE="@firebase/app-check",cE="@firebase/auth",lE="@firebase/auth-compat",uE="@firebase/database",hE="@firebase/data-connect",dE="@firebase/database-compat",fE="@firebase/functions",pE="@firebase/functions-compat",_E="@firebase/installations",mE="@firebase/installations-compat",gE="@firebase/messaging",yE="@firebase/messaging-compat",EE="@firebase/performance",vE="@firebase/performance-compat",IE="@firebase/remote-config",TE="@firebase/remote-config-compat",wE="@firebase/storage",CE="@firebase/storage-compat",AE="@firebase/firestore",RE="@firebase/ai",SE="@firebase/firestore-compat",PE="firebase",bE="12.1.0";/**
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
 */const oc="[DEFAULT]",NE={[rc]:"fire-core",[sE]:"fire-core-compat",[rE]:"fire-analytics",[iE]:"fire-analytics-compat",[aE]:"fire-app-check",[oE]:"fire-app-check-compat",[cE]:"fire-auth",[lE]:"fire-auth-compat",[uE]:"fire-rtdb",[hE]:"fire-data-connect",[dE]:"fire-rtdb-compat",[fE]:"fire-fn",[pE]:"fire-fn-compat",[_E]:"fire-iid",[mE]:"fire-iid-compat",[gE]:"fire-fcm",[yE]:"fire-fcm-compat",[EE]:"fire-perf",[vE]:"fire-perf-compat",[IE]:"fire-rc",[TE]:"fire-rc-compat",[wE]:"fire-gcs",[CE]:"fire-gcs-compat",[AE]:"fire-fst",[SE]:"fire-fst-compat",[RE]:"fire-vertex","fire-js":"fire-js",[PE]:"fire-js-all"};/**
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
 */const Yr=new Map,kE=new Map,ac=new Map;function Vh(n,e){try{n.container.addComponent(e)}catch(t){Vt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Mn(n){const e=n.name;if(ac.has(e))return Vt.debug(`There were multiple attempts to register component ${e}.`),!1;ac.set(e,n);for(const t of Yr.values())Vh(t,n);for(const t of kE.values())Vh(t,n);return!0}function Vo(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function je(n){return n==null?!1:n.settings!==void 0}/**
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
 */const DE={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},tn=new Bi("app","Firebase",DE);/**
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
 */class OE{constructor(e,t,s){this._isDeleted=!1,this._options=ee({},e),this._config=ee({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new cn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw tn.create("app-deleted",{appName:this._name})}}/**
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
 */const jn=bE;function VE(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const s=ee({name:oc,automaticDataCollectionEnabled:!0},e),i=s.name;if(typeof i!="string"||!i)throw tn.create("bad-app-name",{appName:String(i)});if(t||(t=Kf()),!t)throw tn.create("no-options");const r=Yr.get(i);if(r){if(an(t,r.options)&&an(s,r.config))return r;throw tn.create("duplicate-app",{appName:i})}const o=new Uy(i);for(const l of ac.values())o.addComponent(l);const c=new OE(t,s,o);return Yr.set(i,c),c}function Gc(n=oc){const e=Yr.get(n);if(!e&&n===oc&&Kf())return VE();if(!e)throw tn.create("no-app",{appName:n});return e}function ht(n,e,t){var o;let s=(o=NE[n])!=null?o:n;t&&(s+=`-${t}`);const i=s.match(/\s|\//),r=e.match(/\s|\//);if(i||r){const c=[`Unable to register library "${s}" with version "${e}":`];i&&c.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&r&&c.push("and"),r&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Vt.warn(c.join(" "));return}Mn(new cn(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const ME="firebase-heartbeat-database",xE=1,Ti="firebase-heartbeat-store";let qa=null;function tp(){return qa||(qa=Jy(ME,xE,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Ti)}catch(t){console.warn(t)}}}}).catch(n=>{throw tn.create("idb-open",{originalErrorMessage:n.message})})),qa}function LE(n){return y(this,null,function*(){try{const t=(yield tp()).transaction(Ti),s=yield t.objectStore(Ti).get(np(n));return yield t.done,s}catch(e){if(e instanceof qt)Vt.warn(e.message);else{const t=tn.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Vt.warn(t.message)}}})}function Mh(n,e){return y(this,null,function*(){try{const s=(yield tp()).transaction(Ti,"readwrite");yield s.objectStore(Ti).put(e,np(n)),yield s.done}catch(t){if(t instanceof qt)Vt.warn(t.message);else{const s=tn.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Vt.warn(s.message)}}})}function np(n){return`${n.name}!${n.options.appId}`}/**
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
 */const FE=1024,UE=30;class BE{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new WE(t),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}triggerHeartbeat(){return y(this,null,function*(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=xh();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=yield this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:i}),this._heartbeatsCache.heartbeats.length>UE){const o=jE(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(s){Vt.warn(s)}})}getHeartbeatsHeader(){return y(this,null,function*(){var e;try{if(this._heartbeatsCache===null&&(yield this._heartbeatsCachePromise),((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=xh(),{heartbeatsToSend:s,unsentEntries:i}=qE(this._heartbeatsCache.heartbeats),r=zr(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,yield this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(t){return Vt.warn(t),""}})}}function xh(){return new Date().toISOString().substring(0,10)}function qE(n,e=FE){const t=[];let s=n.slice();for(const i of n){const r=t.find(o=>o.agent===i.agent);if(r){if(r.dates.push(i.date),Lh(t)>e){r.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),Lh(t)>e){t.pop();break}s=s.slice(1)}return{heartbeatsToSend:t,unsentEntries:s}}class WE{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}runIndexedDBEnvironmentCheck(){return y(this,null,function*(){return Cy()?Ay().then(()=>!0).catch(()=>!1):!1})}read(){return y(this,null,function*(){if(yield this._canUseIndexedDBPromise){const t=yield LE(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}})}overwrite(e){return y(this,null,function*(){var s;if(yield this._canUseIndexedDBPromise){const i=yield this.read();return Mh(this.app,{lastSentHeartbeatDate:(s=e.lastSentHeartbeatDate)!=null?s:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return})}add(e){return y(this,null,function*(){var s;if(yield this._canUseIndexedDBPromise){const i=yield this.read();return Mh(this.app,{lastSentHeartbeatDate:(s=e.lastSentHeartbeatDate)!=null?s:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return})}}function Lh(n){return zr(JSON.stringify({version:2,heartbeats:n})).length}function jE(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let s=1;s<n.length;s++)n[s].date<t&&(t=n[s].date,e=s);return e}/**
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
 */function $E(n){Mn(new cn("platform-logger",e=>new tE(e),"PRIVATE")),Mn(new cn("heartbeat",e=>new BE(e),"PRIVATE")),ht(rc,Oh,n),ht(rc,Oh,"esm2020"),ht("fire-js","")}$E("");function sp(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const HE=sp,ip=new Bi("auth","Firebase",sp());/**
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
 */const Xr=new Oo("@firebase/auth");function zE(n,...e){Xr.logLevel<=Q.WARN&&Xr.warn(`Auth (${jn}): ${n}`,...e)}function Mr(n,...e){Xr.logLevel<=Q.ERROR&&Xr.error(`Auth (${jn}): ${n}`,...e)}/**
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
 */function nt(n,...e){throw Qc(n,...e)}function at(n,...e){return Qc(n,...e)}function Kc(n,e,t){const s=Rt(ee({},HE()),{[e]:t});return new Bi("auth","Firebase",s).create(e,{appName:n.name})}function dt(n){return Kc(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function GE(n,e,t){const s=t;if(!(e instanceof s))throw s.name!==e.constructor.name&&nt(n,"argument-error"),Kc(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Qc(n,...e){if(typeof n!="string"){const t=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=n.name),n._errorFactory.create(t,...s)}return ip.create(n,...e)}function F(n,e,...t){if(!n)throw Qc(e,...t)}function bt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Mr(e),new Error(e)}function Mt(n,e){n||bt(e)}/**
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
 */function cc(){var n;return typeof self!="undefined"&&((n=self.location)==null?void 0:n.href)||""}function KE(){return Fh()==="http:"||Fh()==="https:"}function Fh(){var n;return typeof self!="undefined"&&((n=self.location)==null?void 0:n.protocol)||null}/**
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
 */function QE(){return typeof navigator!="undefined"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(KE()||vy()||"connection"in navigator)?navigator.onLine:!0}function YE(){if(typeof navigator=="undefined")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class qi{constructor(e,t){this.shortDelay=e,this.longDelay=t,Mt(t>e,"Short delay should be less than long delay!"),this.isMobile=Hc()||Xf()}get(){return QE()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Yc(n,e){Mt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class rp{static initialize(e,t,s){this.fetchImpl=e,t&&(this.headersImpl=t),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self!="undefined"&&"fetch"in self)return self.fetch;if(typeof globalThis!="undefined"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch!="undefined")return fetch;bt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self!="undefined"&&"Headers"in self)return self.Headers;if(typeof globalThis!="undefined"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers!="undefined")return Headers;bt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self!="undefined"&&"Response"in self)return self.Response;if(typeof globalThis!="undefined"&&globalThis.Response)return globalThis.Response;if(typeof Response!="undefined")return Response;bt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const XE={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const JE=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],ZE=new qi(3e4,6e4);function Wt(n,e){return n.tenantId&&!e.tenantId?Rt(ee({},e),{tenantId:n.tenantId}):e}function It(r,o,c,l){return y(this,arguments,function*(n,e,t,s,i={}){return op(n,i,()=>y(this,null,function*(){let h={},f={};s&&(e==="GET"?f=s:h={body:JSON.stringify(s)});const p=Rs(ee({key:n.config.apiKey},f)).slice(1),_=yield n._getAdditionalHeaders();_["Content-Type"]="application/json",n.languageCode&&(_["X-Firebase-Locale"]=n.languageCode);const T=ee({method:e,headers:_},h);return Ey()||(T.referrerPolicy="no-referrer"),n.emulatorConfig&&gn(n.emulatorConfig.host)&&(T.credentials="include"),rp.fetch()(yield ap(n,n.config.apiHost,t,p),T)}))})}function op(n,e,t){return y(this,null,function*(){n._canInitEmulator=!1;const s=ee(ee({},XE),e);try{const i=new tv(n),r=yield Promise.race([t(),i.promise]);i.clearNetworkTimeout();const o=yield r.json();if("needConfirmation"in o)throw Sr(n,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const c=r.ok?o.errorMessage:o.error.message,[l,h]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw Sr(n,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw Sr(n,"email-already-in-use",o);if(l==="USER_DISABLED")throw Sr(n,"user-disabled",o);const f=s[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw Kc(n,f,h);nt(n,f)}}catch(i){if(i instanceof qt)throw i;nt(n,"network-request-failed",{message:String(i)})}})}function Wi(r,o,c,l){return y(this,arguments,function*(n,e,t,s,i={}){const h=yield It(n,e,t,s,i);return"mfaPendingCredential"in h&&nt(n,"multi-factor-auth-required",{_serverResponse:h}),h})}function ap(n,e,t,s){return y(this,null,function*(){const i=`${e}${t}?${s}`,r=n,o=r.config.emulator?Yc(n.config,i):`${n.config.apiScheme}://${i}`;return JE.includes(t)&&(yield r._persistenceManagerAvailable,r._getPersistenceType()==="COOKIE")?r._getPersistence()._getFinalTarget(o).toString():o})}function ev(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class tv{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,s)=>{this.timer=setTimeout(()=>s(at(this.auth,"network-request-failed")),ZE.get())})}}function Sr(n,e,t){const s={appName:n.name};t.email&&(s.email=t.email),t.phoneNumber&&(s.phoneNumber=t.phoneNumber);const i=at(n,e,s);return i.customData._tokenResponse=t,i}function Uh(n){return n!==void 0&&n.enterprise!==void 0}class nv{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return ev(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}function sv(n,e){return y(this,null,function*(){return It(n,"GET","/v2/recaptchaConfig",Wt(n,e))})}/**
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
 */function iv(n,e){return y(this,null,function*(){return It(n,"POST","/v1/accounts:delete",e)})}function Jr(n,e){return y(this,null,function*(){return It(n,"POST","/v1/accounts:lookup",e)})}/**
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
 */function ui(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch(e){}}function rv(n,e=!1){return y(this,null,function*(){const t=se(n),s=yield t.getIdToken(e),i=Xc(s);F(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const r=typeof i.firebase=="object"?i.firebase:void 0,o=r==null?void 0:r.sign_in_provider;return{claims:i,token:s,authTime:ui(Wa(i.auth_time)),issuedAtTime:ui(Wa(i.iat)),expirationTime:ui(Wa(i.exp)),signInProvider:o||null,signInSecondFactor:(r==null?void 0:r.sign_in_second_factor)||null}})}function Wa(n){return Number(n)*1e3}function Xc(n){const[e,t,s]=n.split(".");if(e===void 0||t===void 0||s===void 0)return Mr("JWT malformed, contained fewer than 3 sections"),null;try{const i=Gr(t);return i?JSON.parse(i):(Mr("Failed to decode base64 JWT payload"),null)}catch(i){return Mr("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function Bh(n){const e=Xc(n);return F(e,"internal-error"),F(typeof e.exp!="undefined","internal-error"),F(typeof e.iat!="undefined","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */function ps(n,e,t=!1){return y(this,null,function*(){if(t)return e;try{return yield e}catch(s){throw s instanceof qt&&ov(s)&&n.auth.currentUser===n&&(yield n.auth.signOut()),s}})}function ov({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class av{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const s=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),s}else{this.errorBackoff=3e4;const i=((t=this.user.stsTokenManager.expirationTime)!=null?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(()=>y(this,null,function*(){yield this.iteration()}),t)}iteration(){return y(this,null,function*(){try{yield this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()})}}/**
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
 */class lc{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=ui(this.lastLoginAt),this.creationTime=ui(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */function Zr(n){return y(this,null,function*(){var p;const e=n.auth,t=yield n.getIdToken(),s=yield ps(n,Jr(e,{idToken:t}));F(s==null?void 0:s.users.length,e,"internal-error");const i=s.users[0];n._notifyReloadListener(i);const r=(p=i.providerUserInfo)!=null&&p.length?cp(i.providerUserInfo):[],o=lv(n.providerData,r),c=n.isAnonymous,l=!(n.email&&i.passwordHash)&&!(o!=null&&o.length),h=c?l:!1,f={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new lc(i.createdAt,i.lastLoginAt),isAnonymous:h};Object.assign(n,f)})}function cv(n){return y(this,null,function*(){const e=se(n);yield Zr(e),yield e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)})}function lv(n,e){return[...n.filter(s=>!e.some(i=>i.providerId===s.providerId)),...e]}function cp(n){return n.map(s=>{var i=s,{providerId:e}=i,t=Rr(i,["providerId"]);return{providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}})}/**
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
 */function uv(n,e){return y(this,null,function*(){const t=yield op(n,{},()=>y(this,null,function*(){const s=Rs({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:r}=n.config,o=yield ap(n,i,"/v1/token",`key=${r}`),c=yield n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const l={method:"POST",headers:c,body:s};return n.emulatorConfig&&gn(n.emulatorConfig.host)&&(l.credentials="include"),rp.fetch()(o,l)}));return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}})}function hv(n,e){return y(this,null,function*(){return It(n,"POST","/v2/accounts:revokeToken",Wt(n,e))})}/**
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
 */class is{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){F(e.idToken,"internal-error"),F(typeof e.idToken!="undefined","internal-error"),F(typeof e.refreshToken!="undefined","internal-error");const t="expiresIn"in e&&typeof e.expiresIn!="undefined"?Number(e.expiresIn):Bh(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){F(e.length!==0,"internal-error");const t=Bh(e);this.updateTokensAndExpiration(e,null,t)}getToken(e,t=!1){return y(this,null,function*(){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(F(this.refreshToken,e,"user-token-expired"),this.refreshToken?(yield this.refresh(e,this.refreshToken),this.accessToken):null)})}clearRefreshToken(){this.refreshToken=null}refresh(e,t){return y(this,null,function*(){const{accessToken:s,refreshToken:i,expiresIn:r}=yield uv(e,t);this.updateTokensAndExpiration(s,i,Number(r))})}updateTokensAndExpiration(e,t,s){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,t){const{refreshToken:s,accessToken:i,expirationTime:r}=t,o=new is;return s&&(F(typeof s=="string","internal-error",{appName:e}),o.refreshToken=s),i&&(F(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),r&&(F(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new is,this.toJSON())}_performRefresh(){return bt("not implemented")}}/**
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
 */function Kt(n,e){F(typeof n=="string"||typeof n=="undefined","internal-error",{appName:e})}class rt{constructor(r){var o=r,{uid:e,auth:t,stsTokenManager:s}=o,i=Rr(o,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new av(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new lc(i.createdAt||void 0,i.lastLoginAt||void 0)}getIdToken(e){return y(this,null,function*(){const t=yield ps(this,this.stsTokenManager.getToken(this.auth,e));return F(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,yield this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t})}getIdTokenResult(e){return rv(this,e)}reload(){return cv(this)}_assign(e){this!==e&&(F(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>ee({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new rt(Rt(ee({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){F(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}_updateTokensIfNecessary(e,t=!1){return y(this,null,function*(){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),t&&(yield Zr(this)),yield this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)})}delete(){return y(this,null,function*(){if(je(this.auth.app))return Promise.reject(dt(this.auth));const e=yield this.getIdToken();return yield ps(this,iv(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()})}toJSON(){return Rt(ee({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>ee({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var q,H,ce,Ze,ge,w,g,v;const s=(q=t.displayName)!=null?q:void 0,i=(H=t.email)!=null?H:void 0,r=(ce=t.phoneNumber)!=null?ce:void 0,o=(Ze=t.photoURL)!=null?Ze:void 0,c=(ge=t.tenantId)!=null?ge:void 0,l=(w=t._redirectEventId)!=null?w:void 0,h=(g=t.createdAt)!=null?g:void 0,f=(v=t.lastLoginAt)!=null?v:void 0,{uid:p,emailVerified:_,isAnonymous:T,providerData:S,stsTokenManager:D}=t;F(p&&D,e,"internal-error");const k=is.fromJSON(this.name,D);F(typeof p=="string",e,"internal-error"),Kt(s,e.name),Kt(i,e.name),F(typeof _=="boolean",e,"internal-error"),F(typeof T=="boolean",e,"internal-error"),Kt(r,e.name),Kt(o,e.name),Kt(c,e.name),Kt(l,e.name),Kt(h,e.name),Kt(f,e.name);const $=new rt({uid:p,auth:e,email:i,emailVerified:_,displayName:s,isAnonymous:T,photoURL:o,phoneNumber:r,tenantId:c,stsTokenManager:k,createdAt:h,lastLoginAt:f});return S&&Array.isArray(S)&&($.providerData=S.map(I=>ee({},I))),l&&($._redirectEventId=l),$}static _fromIdTokenResponse(e,t,s=!1){return y(this,null,function*(){const i=new is;i.updateFromServerResponse(t);const r=new rt({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:s});return yield Zr(r),r})}static _fromGetAccountInfoResponse(e,t,s){return y(this,null,function*(){const i=t.users[0];F(i.localId!==void 0,"internal-error");const r=i.providerUserInfo!==void 0?cp(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(r!=null&&r.length),c=new is;c.updateFromIdToken(s);const l=new rt({uid:i.localId,auth:e,stsTokenManager:c,isAnonymous:o}),h={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:r,metadata:new lc(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(r!=null&&r.length)};return Object.assign(l,h),l})}}/**
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
 */const qh=new Map;function Nt(n){Mt(n instanceof Function,"Expected a class definition");let e=qh.get(n);return e?(Mt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,qh.set(n,e),e)}/**
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
 */class lp{constructor(){this.type="NONE",this.storage={}}_isAvailable(){return y(this,null,function*(){return!0})}_set(e,t){return y(this,null,function*(){this.storage[e]=t})}_get(e){return y(this,null,function*(){const t=this.storage[e];return t===void 0?null:t})}_remove(e){return y(this,null,function*(){delete this.storage[e]})}_addListener(e,t){}_removeListener(e,t){}}lp.type="NONE";const Wh=lp;/**
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
 */function xr(n,e,t){return`firebase:${n}:${e}:${t}`}class rs{constructor(e,t,s){this.persistence=e,this.auth=t,this.userKey=s;const{config:i,name:r}=this.auth;this.fullUserKey=xr(this.userKey,i.apiKey,r),this.fullPersistenceKey=xr("persistence",i.apiKey,r),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}getCurrentUser(){return y(this,null,function*(){const e=yield this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=yield Jr(this.auth,{idToken:e}).catch(()=>{});return t?rt._fromGetAccountInfoResponse(this.auth,t,e):null}return rt._fromJSON(this.auth,e)})}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}setPersistence(e){return y(this,null,function*(){if(this.persistence===e)return;const t=yield this.getCurrentUser();if(yield this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)})}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static create(e,t,s="authUser"){return y(this,null,function*(){if(!t.length)return new rs(Nt(Wh),e,s);const i=(yield Promise.all(t.map(h=>y(this,null,function*(){if(yield h._isAvailable())return h})))).filter(h=>h);let r=i[0]||Nt(Wh);const o=xr(s,e.config.apiKey,e.name);let c=null;for(const h of t)try{const f=yield h._get(o);if(f){let p;if(typeof f=="string"){const _=yield Jr(e,{idToken:f}).catch(()=>{});if(!_)break;p=yield rt._fromGetAccountInfoResponse(e,_,f)}else p=rt._fromJSON(e,f);h!==r&&(c=p),r=h;break}}catch(f){}const l=i.filter(h=>h._shouldAllowMigration);return!r._shouldAllowMigration||!l.length?new rs(r,e,s):(r=l[0],c&&(yield r._set(o,c.toJSON())),yield Promise.all(t.map(h=>y(this,null,function*(){if(h!==r)try{yield h._remove(o)}catch(f){}}))),new rs(r,e,s))})}}/**
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
 */function jh(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(fp(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(up(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(_p(e))return"Blackberry";if(mp(e))return"Webos";if(hp(e))return"Safari";if((e.includes("chrome/")||dp(e))&&!e.includes("edge/"))return"Chrome";if(pp(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=n.match(t);if((s==null?void 0:s.length)===2)return s[1]}return"Other"}function up(n=Ue()){return/firefox\//i.test(n)}function hp(n=Ue()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function dp(n=Ue()){return/crios\//i.test(n)}function fp(n=Ue()){return/iemobile/i.test(n)}function pp(n=Ue()){return/android/i.test(n)}function _p(n=Ue()){return/blackberry/i.test(n)}function mp(n=Ue()){return/webos/i.test(n)}function Jc(n=Ue()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function dv(n=Ue()){var e;return Jc(n)&&!!((e=window.navigator)!=null&&e.standalone)}function fv(){return Iy()&&document.documentMode===10}function gp(n=Ue()){return Jc(n)||pp(n)||mp(n)||_p(n)||/windows phone/i.test(n)||fp(n)}/**
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
 */function yp(n,e=[]){let t;switch(n){case"Browser":t=jh(Ue());break;case"Worker":t=`${jh(Ue())}-${n}`;break;default:t=n}const s=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${jn}/${s}`}/**
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
 */class pv{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const s=r=>new Promise((o,c)=>{try{const l=e(r);o(l)}catch(l){c(l)}});s.onAbort=t,this.queue.push(s);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}runMiddleware(e){return y(this,null,function*(){if(this.auth.currentUser===e)return;const t=[];try{for(const s of this.queue)yield s(e),s.onAbort&&t.push(s.onAbort)}catch(s){t.reverse();for(const i of t)try{i()}catch(r){}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s==null?void 0:s.message})}})}}/**
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
 */function _v(t){return y(this,arguments,function*(n,e={}){return It(n,"GET","/v2/passwordPolicy",Wt(n,e))})}/**
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
 */const mv=6;class gv{constructor(e){var s,i,r,o;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(s=t.minPasswordLength)!=null?s:mv,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(r=(i=e.allowedNonAlphanumericCharacters)==null?void 0:i.join(""))!=null?r:"",this.forceUpgradeOnSignin=(o=e.forceUpgradeOnSignin)!=null?o:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var s,i,r,o,c,l;const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=(s=t.meetsMinPasswordLength)!=null?s:!0),t.isValid&&(t.isValid=(i=t.meetsMaxPasswordLength)!=null?i:!0),t.isValid&&(t.isValid=(r=t.containsLowercaseLetter)!=null?r:!0),t.isValid&&(t.isValid=(o=t.containsUppercaseLetter)!=null?o:!0),t.isValid&&(t.isValid=(c=t.containsNumericCharacter)!=null?c:!0),t.isValid&&(t.isValid=(l=t.containsNonAlphanumericCharacter)!=null?l:!0),t}validatePasswordLengthOptions(e,t){const s=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;s&&(t.meetsMinPasswordLength=e.length>=s),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let s;for(let i=0;i<e.length;i++)s=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(e,t,s,i,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}/**
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
 */class yv{constructor(e,t,s,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=s,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new $h(this),this.idTokenSubscription=new $h(this),this.beforeStateQueue=new pv(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=ip,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(r=>this._resolvePersistenceManagerAvailable=r)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Nt(t)),this._initializationPromise=this.queue(()=>y(this,null,function*(){var s,i,r;if(!this._deleted&&(this.persistenceManager=yield rs.create(this,e),(s=this._resolvePersistenceManagerAvailable)==null||s.call(this),!this._deleted)){if((i=this._popupRedirectResolver)!=null&&i._shouldInitProactively)try{yield this._popupRedirectResolver._initialize(this)}catch(o){}yield this.initializeCurrentUser(t),this.lastNotifiedUid=((r=this.currentUser)==null?void 0:r.uid)||null,!this._deleted&&(this._isInitialized=!0)}})),this._initializationPromise}_onStorageEvent(){return y(this,null,function*(){if(this._deleted)return;const e=yield this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),yield this.currentUser.getIdToken();return}yield this._updateCurrentUser(e,!0)}})}initializeCurrentUserFromIdToken(e){return y(this,null,function*(){try{const t=yield Jr(this,{idToken:e}),s=yield rt._fromGetAccountInfoResponse(this,t,e);yield this.directlySetCurrentUser(s)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),yield this.directlySetCurrentUser(null)}})}initializeCurrentUser(e){return y(this,null,function*(){var r;if(je(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const t=yield this.assertedPersistence.getCurrentUser();let s=t,i=!1;if(e&&this.config.authDomain){yield this.getOrInitRedirectPersistenceManager();const o=(r=this.redirectUser)==null?void 0:r._redirectEventId,c=s==null?void 0:s._redirectEventId,l=yield this.tryRedirectSignIn(e);(!o||o===c)&&(l!=null&&l.user)&&(s=l.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{yield this.beforeStateQueue.runMiddleware(s)}catch(o){s=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return F(this._popupRedirectResolver,this,"argument-error"),yield this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)})}tryRedirectSignIn(e){return y(this,null,function*(){let t=null;try{t=yield this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch(s){yield this._setRedirectUser(null)}return t})}reloadAndSetCurrentUserOrClear(e){return y(this,null,function*(){try{yield Zr(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)})}useDeviceLanguage(){this.languageCode=YE()}_delete(){return y(this,null,function*(){this._deleted=!0})}updateCurrentUser(e){return y(this,null,function*(){if(je(this.app))return Promise.reject(dt(this));const t=e?se(e):null;return t&&F(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))})}_updateCurrentUser(e,t=!1){return y(this,null,function*(){if(!this._deleted)return e&&F(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||(yield this.beforeStateQueue.runMiddleware(e)),this.queue(()=>y(this,null,function*(){yield this.directlySetCurrentUser(e),this.notifyAuthListeners()}))})}signOut(){return y(this,null,function*(){return je(this.app)?Promise.reject(dt(this)):(yield this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&(yield this._setRedirectUser(null)),this._updateCurrentUser(null,!0))})}setPersistence(e){return je(this.app)?Promise.reject(dt(this)):this.queue(()=>y(this,null,function*(){yield this.assertedPersistence.setPersistence(Nt(e))}))}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}validatePassword(e){return y(this,null,function*(){this._getPasswordPolicyInternal()||(yield this._updatePasswordPolicy());const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)})}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}_updatePasswordPolicy(){return y(this,null,function*(){const e=yield _v(this),t=new gv(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t})}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Bi("auth","Firebase",e())}onAuthStateChanged(e,t,s){return this.registerStateListener(this.authStateSubscription,e,t,s)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,s){return this.registerStateListener(this.idTokenSubscription,e,t,s)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const s=this.onAuthStateChanged(()=>{s(),e()},t)}})}revokeAccessToken(e){return y(this,null,function*(){if(this.currentUser){const t=yield this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(s.tenantId=this.tenantId),yield hv(this,s)}})}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}_setRedirectUser(e,t){return y(this,null,function*(){const s=yield this.getOrInitRedirectPersistenceManager(t);return e===null?s.removeCurrentUser():s.setCurrentUser(e)})}getOrInitRedirectPersistenceManager(e){return y(this,null,function*(){if(!this.redirectPersistenceManager){const t=e&&Nt(e)||this._popupRedirectResolver;F(t,this,"argument-error"),this.redirectPersistenceManager=yield rs.create(this,[Nt(t._redirectPersistence)],"redirectUser"),this.redirectUser=yield this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager})}_redirectUserForId(e){return y(this,null,function*(){var t,s;return this._isInitialized&&(yield this.queue(()=>y(this,null,function*(){}))),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((s=this.redirectUser)==null?void 0:s._redirectEventId)===e?this.redirectUser:null})}_persistUserIfCurrent(e){return y(this,null,function*(){if(e===this.currentUser)return this.queue(()=>y(this,null,function*(){return this.directlySetCurrentUser(e)}))})}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t,s;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=(s=(t=this.currentUser)==null?void 0:t.uid)!=null?s:null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,s,i){if(this._deleted)return()=>{};const r=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(F(c,this,"internal-error"),c.then(()=>{o||r(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,s,i);return()=>{o=!0,l()}}else{const l=e.addObserver(t);return()=>{o=!0,l()}}}directlySetCurrentUser(e){return y(this,null,function*(){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?yield this.assertedPersistence.setCurrentUser(e):yield this.assertedPersistence.removeCurrentUser()})}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return F(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=yp(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}_getAdditionalHeaders(){return y(this,null,function*(){var i;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=yield(i=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:i.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const s=yield this._getAppCheckToken();return s&&(e["X-Firebase-AppCheck"]=s),e})}_getAppCheckToken(){return y(this,null,function*(){var t;if(je(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=yield(t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken();return e!=null&&e.error&&zE(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token})}}function Tt(n){return se(n)}class $h{constructor(e){this.auth=e,this.observer=null,this.addObserver=Dy(t=>this.observer=t)}get next(){return F(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Mo={loadJS(){return y(this,null,function*(){throw new Error("Unable to load external scripts")})},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Ev(n){Mo=n}function Ep(n){return Mo.loadJS(n)}function vv(){return Mo.recaptchaEnterpriseScript}function Iv(){return Mo.gapiScript}function Tv(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class wv{constructor(){this.enterprise=new Cv}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class Cv{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const Av="recaptcha-enterprise",vp="NO_RECAPTCHA";class Rv{constructor(e){this.type=Av,this.auth=Tt(e)}verify(e="verify",t=!1){return y(this,null,function*(){function s(r){return y(this,null,function*(){if(!t){if(r.tenantId==null&&r._agentRecaptchaConfig!=null)return r._agentRecaptchaConfig.siteKey;if(r.tenantId!=null&&r._tenantRecaptchaConfigs[r.tenantId]!==void 0)return r._tenantRecaptchaConfigs[r.tenantId].siteKey}return new Promise((o,c)=>y(this,null,function*(){sv(r,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const h=new nv(l);return r.tenantId==null?r._agentRecaptchaConfig=h:r._tenantRecaptchaConfigs[r.tenantId]=h,o(h.siteKey)}}).catch(l=>{c(l)})}))})}function i(r,o,c){const l=window.grecaptcha;Uh(l)?l.enterprise.ready(()=>{l.enterprise.execute(r,{action:e}).then(h=>{o(h)}).catch(()=>{o(vp)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new wv().execute("siteKey",{action:"verify"}):new Promise((r,o)=>{s(this.auth).then(c=>{if(!t&&Uh(window.grecaptcha))i(c,r,o);else{if(typeof window=="undefined"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let l=vv();l.length!==0&&(l+=c),Ep(l).then(()=>{i(c,r,o)}).catch(h=>{o(h)})}}).catch(c=>{o(c)})})})}}function Hh(n,e,t,s=!1,i=!1){return y(this,null,function*(){const r=new Rv(n);let o;if(i)o=vp;else try{o=yield r.verify(t)}catch(l){o=yield r.verify(t,!0)}const c=ee({},e);if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const l=c.phoneEnrollmentInfo.phoneNumber,h=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:l,recaptchaToken:h,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const l=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:l,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return s?Object.assign(c,{captchaResp:o}):Object.assign(c,{captchaResponse:o}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c})}function eo(n,e,t,s,i){return y(this,null,function*(){var r;if((r=n._getRecaptchaConfig())!=null&&r.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=yield Hh(n,e,t,t==="getOobCode");return s(n,o)}else return s(n,e).catch(o=>y(this,null,function*(){if(o.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const c=yield Hh(n,e,t,t==="getOobCode");return s(n,c)}else return Promise.reject(o)}))})}/**
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
 */function Sv(n,e){const t=Vo(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),r=t.getOptions();if(an(r,e!=null?e:{}))return i;nt(i,"already-initialized")}return t.initialize({options:e})}function Pv(n,e){const t=(e==null?void 0:e.persistence)||[],s=(Array.isArray(t)?t:[t]).map(Nt);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(s,e==null?void 0:e.popupRedirectResolver)}function bv(n,e,t){const s=Tt(n);F(/^https?:\/\//.test(e),s,"invalid-emulator-scheme");const i=!1,r=Ip(e),{host:o,port:c}=Nv(e),l=c===null?"":`:${c}`,h={url:`${r}//${o}${l}/`},f=Object.freeze({host:o,port:c,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!s._canInitEmulator){F(s.config.emulator&&s.emulatorConfig,s,"emulator-config-failed"),F(an(h,s.config.emulator)&&an(f,s.emulatorConfig),s,"emulator-config-failed");return}s.config.emulator=h,s.emulatorConfig=f,s.settings.appVerificationDisabledForTesting=!0,gn(o)?(jc(`${r}//${o}${l}`),$c("Auth",!0)):kv()}function Ip(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Nv(n){const e=Ip(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const s=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(s);if(i){const r=i[1];return{host:r,port:zh(s.substr(r.length+1))}}else{const[r,o]=s.split(":");return{host:r,port:zh(o)}}}function zh(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function kv(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console!="undefined"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window!="undefined"&&typeof document!="undefined"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class Zc{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return bt("not implemented")}_getIdTokenResponse(e){return bt("not implemented")}_linkToIdToken(e,t){return bt("not implemented")}_getReauthenticationResolver(e){return bt("not implemented")}}function Dv(n,e){return y(this,null,function*(){return It(n,"POST","/v1/accounts:signUp",e)})}/**
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
 */function Ov(n,e){return y(this,null,function*(){return Wi(n,"POST","/v1/accounts:signInWithPassword",Wt(n,e))})}function Vv(n,e){return y(this,null,function*(){return It(n,"POST","/v1/accounts:sendOobCode",Wt(n,e))})}function Mv(n,e){return y(this,null,function*(){return Vv(n,e)})}/**
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
 */function xv(n,e){return y(this,null,function*(){return Wi(n,"POST","/v1/accounts:signInWithEmailLink",Wt(n,e))})}function Lv(n,e){return y(this,null,function*(){return Wi(n,"POST","/v1/accounts:signInWithEmailLink",Wt(n,e))})}/**
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
 */class wi extends Zc{constructor(e,t,s,i=null){super("password",s),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new wi(e,t,"password")}static _fromEmailAndCode(e,t,s=null){return new wi(e,t,"emailLink",s)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}_getIdTokenResponse(e){return y(this,null,function*(){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return eo(e,t,"signInWithPassword",Ov);case"emailLink":return xv(e,{email:this._email,oobCode:this._password});default:nt(e,"internal-error")}})}_linkToIdToken(e,t){return y(this,null,function*(){switch(this.signInMethod){case"password":const s={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return eo(e,s,"signUpPassword",Dv);case"emailLink":return Lv(e,{idToken:t,email:this._email,oobCode:this._password});default:nt(e,"internal-error")}})}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */function os(n,e){return y(this,null,function*(){return Wi(n,"POST","/v1/accounts:signInWithIdp",Wt(n,e))})}/**
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
 */const Fv="http://localhost";class xn extends Zc{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new xn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):nt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const c=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:i}=c,r=Rr(c,["providerId","signInMethod"]);if(!s||!i)return null;const o=new xn(s,i);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return os(e,t)}_linkToIdToken(e,t){const s=this.buildRequest();return s.idToken=t,os(e,s)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,os(e,t)}buildRequest(){const e={requestUri:Fv,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Rs(t)}return e}}/**
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
 */function Uv(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Bv(n){const e=si(ii(n)).link,t=e?si(ii(e)).deep_link_id:null,s=si(ii(n)).deep_link_id;return(s?si(ii(s)).link:null)||s||t||e||n}class el{constructor(e){var o,c,l,h,f,p;const t=si(ii(e)),s=(o=t.apiKey)!=null?o:null,i=(c=t.oobCode)!=null?c:null,r=Uv((l=t.mode)!=null?l:null);F(s&&i&&r,"argument-error"),this.apiKey=s,this.operation=r,this.code=i,this.continueUrl=(h=t.continueUrl)!=null?h:null,this.languageCode=(f=t.lang)!=null?f:null,this.tenantId=(p=t.tenantId)!=null?p:null}static parseLink(e){const t=Bv(e);try{return new el(t)}catch(s){return null}}}/**
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
 */class Ss{constructor(){this.providerId=Ss.PROVIDER_ID}static credential(e,t){return wi._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const s=el.parseLink(t);return F(s,"argument-error"),wi._fromEmailAndCode(e,s.code,s.tenantId)}}Ss.PROVIDER_ID="password";Ss.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Ss.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class tl{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class ji extends tl{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class Qt extends ji{constructor(){super("facebook.com")}static credential(e){return xn._fromParams({providerId:Qt.PROVIDER_ID,signInMethod:Qt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Qt.credentialFromTaggedObject(e)}static credentialFromError(e){return Qt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Qt.credential(e.oauthAccessToken)}catch(t){return null}}}Qt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Qt.PROVIDER_ID="facebook.com";/**
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
 */class Yt extends ji{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return xn._fromParams({providerId:Yt.PROVIDER_ID,signInMethod:Yt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Yt.credentialFromTaggedObject(e)}static credentialFromError(e){return Yt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:s}=e;if(!t&&!s)return null;try{return Yt.credential(t,s)}catch(i){return null}}}Yt.GOOGLE_SIGN_IN_METHOD="google.com";Yt.PROVIDER_ID="google.com";/**
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
 */class Xt extends ji{constructor(){super("github.com")}static credential(e){return xn._fromParams({providerId:Xt.PROVIDER_ID,signInMethod:Xt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Xt.credentialFromTaggedObject(e)}static credentialFromError(e){return Xt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Xt.credential(e.oauthAccessToken)}catch(t){return null}}}Xt.GITHUB_SIGN_IN_METHOD="github.com";Xt.PROVIDER_ID="github.com";/**
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
 */class Jt extends ji{constructor(){super("twitter.com")}static credential(e,t){return xn._fromParams({providerId:Jt.PROVIDER_ID,signInMethod:Jt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Jt.credentialFromTaggedObject(e)}static credentialFromError(e){return Jt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:s}=e;if(!t||!s)return null;try{return Jt.credential(t,s)}catch(i){return null}}}Jt.TWITTER_SIGN_IN_METHOD="twitter.com";Jt.PROVIDER_ID="twitter.com";/**
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
 */function Tp(n,e){return y(this,null,function*(){return Wi(n,"POST","/v1/accounts:signUp",Wt(n,e))})}/**
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
 */class xt{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static _fromIdTokenResponse(e,t,s,i=!1){return y(this,null,function*(){const r=yield rt._fromIdTokenResponse(e,s,i),o=Gh(s);return new xt({user:r,providerId:o,_tokenResponse:s,operationType:t})})}static _forOperation(e,t,s){return y(this,null,function*(){yield e._updateTokensIfNecessary(s,!0);const i=Gh(s);return new xt({user:e,providerId:i,_tokenResponse:s,operationType:t})})}}function Gh(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */function bP(n){return y(this,null,function*(){var i;if(je(n.app))return Promise.reject(dt(n));const e=Tt(n);if(yield e._initializationPromise,(i=e.currentUser)!=null&&i.isAnonymous)return new xt({user:e.currentUser,providerId:null,operationType:"signIn"});const t=yield Tp(e,{returnSecureToken:!0}),s=yield xt._fromIdTokenResponse(e,"signIn",t,!0);return yield e._updateCurrentUser(s.user),s})}/**
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
 */class to extends qt{constructor(e,t,s,i){var r;super(t.code,t.message),this.operationType=s,this.user=i,Object.setPrototypeOf(this,to.prototype),this.customData={appName:e.name,tenantId:(r=e.tenantId)!=null?r:void 0,_serverResponse:t.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,t,s,i){return new to(e,t,s,i)}}function wp(n,e,t,s){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?to._fromErrorAndOperation(n,r,e,s):r})}function qv(n,e,t=!1){return y(this,null,function*(){const s=yield ps(n,e._linkToIdToken(n.auth,yield n.getIdToken()),t);return xt._forOperation(n,"link",s)})}/**
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
 */function Wv(n,e,t=!1){return y(this,null,function*(){const{auth:s}=n;if(je(s.app))return Promise.reject(dt(s));const i="reauthenticate";try{const r=yield ps(n,wp(s,i,e,n),t);F(r.idToken,s,"internal-error");const o=Xc(r.idToken);F(o,s,"internal-error");const{sub:c}=o;return F(n.uid===c,s,"user-mismatch"),xt._forOperation(n,i,r)}catch(r){throw(r==null?void 0:r.code)==="auth/user-not-found"&&nt(s,"user-mismatch"),r}})}/**
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
 */function Cp(n,e,t=!1){return y(this,null,function*(){if(je(n.app))return Promise.reject(dt(n));const s="signIn",i=yield wp(n,s,e),r=yield xt._fromIdTokenResponse(n,s,i);return t||(yield n._updateCurrentUser(r.user)),r})}function jv(n,e){return y(this,null,function*(){return Cp(Tt(n),e)})}/**
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
 */function Ap(n){return y(this,null,function*(){const e=Tt(n);e._getPasswordPolicyInternal()&&(yield e._updatePasswordPolicy())})}function NP(n,e,t){return y(this,null,function*(){const s=Tt(n);yield eo(s,{requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"},"getOobCode",Mv)})}function kP(n,e,t){return y(this,null,function*(){if(je(n.app))return Promise.reject(dt(n));const s=Tt(n),o=yield eo(s,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Tp).catch(l=>{throw l.code==="auth/password-does-not-meet-requirements"&&Ap(n),l}),c=yield xt._fromIdTokenResponse(s,"signIn",o);return yield s._updateCurrentUser(c.user),c})}function DP(n,e,t){return je(n.app)?Promise.reject(dt(n)):jv(se(n),Ss.credential(e,t)).catch(s=>y(this,null,function*(){throw s.code==="auth/password-does-not-meet-requirements"&&Ap(n),s}))}/**
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
 */function $v(n,e){return y(this,null,function*(){return It(n,"POST","/v1/accounts:update",e)})}/**
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
 */function OP(s,i){return y(this,arguments,function*(n,{displayName:e,photoURL:t}){if(e===void 0&&t===void 0)return;const r=se(n),c={idToken:yield r.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},l=yield ps(r,$v(r.auth,c));r.displayName=l.displayName||null,r.photoURL=l.photoUrl||null;const h=r.providerData.find(({providerId:f})=>f==="password");h&&(h.displayName=r.displayName,h.photoURL=r.photoURL),yield r._updateTokensIfNecessary(l)})}function Hv(n,e,t,s){return se(n).onIdTokenChanged(e,t,s)}function zv(n,e,t){return se(n).beforeAuthStateChanged(e,t)}function VP(n,e,t,s){return se(n).onAuthStateChanged(e,t,s)}function MP(n){return se(n).signOut()}const no="__sak";/**
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
 */class Rp{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(no,"1"),this.storage.removeItem(no),Promise.resolve(!0)):Promise.resolve(!1)}catch(e){return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const Gv=1e3,Kv=10;class as extends Rp{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=gp(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const s=this.storage.getItem(t),i=this.localCache[t];s!==i&&e(t,i,s)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,l)=>{this.notifyListeners(o,l)});return}const s=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(s);!t&&this.localCache[s]===o||this.notifyListeners(s,o)},r=this.storage.getItem(s);fv()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Kv):i()}notifyListeners(e,t){this.localCache[e]=t;const s=this.listeners[e];if(s)for(const i of Array.from(s))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:s}),!0)})},Gv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}_set(e,t){return y(this,null,function*(){yield An(as.prototype,this,"_set").call(this,e,t),this.localCache[e]=JSON.stringify(t)})}_get(e){return y(this,null,function*(){const t=yield An(as.prototype,this,"_get").call(this,e);return this.localCache[e]=JSON.stringify(t),t})}_remove(e){return y(this,null,function*(){yield An(as.prototype,this,"_remove").call(this,e),delete this.localCache[e]})}}as.type="LOCAL";const Qv=as;/**
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
 */class Sp extends Rp{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Sp.type="SESSION";const Pp=Sp;/**
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
 */function Yv(n){return Promise.all(n.map(e=>y(this,null,function*(){try{return{fulfilled:!0,value:yield e}}catch(t){return{fulfilled:!1,reason:t}}})))}/**
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
 */class xo{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const s=new xo(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}handleEvent(e){return y(this,null,function*(){const t=e,{eventId:s,eventType:i,data:r}=t.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:s,eventType:i});const c=Array.from(o).map(h=>y(this,null,function*(){return h(t.origin,r)})),l=yield Yv(c);t.ports[0].postMessage({status:"done",eventId:s,eventType:i,response:l})})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}xo.receivers=[];/**
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
 */function nl(n="",e=10){let t="";for(let s=0;s<e;s++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class Xv{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}_send(e,t,s=50){return y(this,null,function*(){const i=typeof MessageChannel!="undefined"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let r,o;return new Promise((c,l)=>{const h=nl("",20);i.port1.start();const f=setTimeout(()=>{l(new Error("unsupported_event"))},s);o={messageChannel:i,onMessage(p){const _=p;if(_.data.eventId===h)switch(_.data.status){case"ack":clearTimeout(f),r=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),c(_.data.response);break;default:clearTimeout(f),clearTimeout(r),l(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})})}}/**
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
 */function ft(){return window}function Jv(n){ft().location.href=n}/**
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
 */function bp(){return typeof ft().WorkerGlobalScope!="undefined"&&typeof ft().importScripts=="function"}function Zv(){return y(this,null,function*(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(yield navigator.serviceWorker.ready).active}catch(n){return null}})}function eI(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function tI(){return bp()?self:null}/**
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
 */const Np="firebaseLocalStorageDb",nI=1,so="firebaseLocalStorage",kp="fbase_key";class $i{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Lo(n,e){return n.transaction([so],e?"readwrite":"readonly").objectStore(so)}function sI(){const n=indexedDB.deleteDatabase(Np);return new $i(n).toPromise()}function uc(){const n=indexedDB.open(Np,nI);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const s=n.result;try{s.createObjectStore(so,{keyPath:kp})}catch(i){t(i)}}),n.addEventListener("success",()=>y(this,null,function*(){const s=n.result;s.objectStoreNames.contains(so)?e(s):(s.close(),yield sI(),e(yield uc()))}))})}function Kh(n,e,t){return y(this,null,function*(){const s=Lo(n,!0).put({[kp]:e,value:t});return new $i(s).toPromise()})}function iI(n,e){return y(this,null,function*(){const t=Lo(n,!1).get(e),s=yield new $i(t).toPromise();return s===void 0?null:s.value})}function Qh(n,e){const t=Lo(n,!0).delete(e);return new $i(t).toPromise()}const rI=800,oI=3;class Dp{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}_openDb(){return y(this,null,function*(){return this.db?this.db:(this.db=yield uc(),this.db)})}_withRetries(e){return y(this,null,function*(){let t=0;for(;;)try{const s=yield this._openDb();return yield e(s)}catch(s){if(t++>oI)throw s;this.db&&(this.db.close(),this.db=void 0)}})}initializeServiceWorkerMessaging(){return y(this,null,function*(){return bp()?this.initializeReceiver():this.initializeSender()})}initializeReceiver(){return y(this,null,function*(){this.receiver=xo._getInstance(tI()),this.receiver._subscribe("keyChanged",(e,t)=>y(this,null,function*(){return{keyProcessed:(yield this._poll()).includes(t.key)}})),this.receiver._subscribe("ping",(e,t)=>y(this,null,function*(){return["keyChanged"]}))})}initializeSender(){return y(this,null,function*(){var t,s;if(this.activeServiceWorker=yield Zv(),!this.activeServiceWorker)return;this.sender=new Xv(this.activeServiceWorker);const e=yield this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(s=e[0])!=null&&s.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)})}notifyServiceWorker(e){return y(this,null,function*(){if(!(!this.sender||!this.activeServiceWorker||eI()!==this.activeServiceWorker))try{yield this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch(t){}})}_isAvailable(){return y(this,null,function*(){try{if(!indexedDB)return!1;const e=yield uc();return yield Kh(e,no,"1"),yield Qh(e,no),!0}catch(e){}return!1})}_withPendingWrite(e){return y(this,null,function*(){this.pendingWrites++;try{yield e()}finally{this.pendingWrites--}})}_set(e,t){return y(this,null,function*(){return this._withPendingWrite(()=>y(this,null,function*(){return yield this._withRetries(s=>Kh(s,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)}))})}_get(e){return y(this,null,function*(){const t=yield this._withRetries(s=>iI(s,e));return this.localCache[e]=t,t})}_remove(e){return y(this,null,function*(){return this._withPendingWrite(()=>y(this,null,function*(){return yield this._withRetries(t=>Qh(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)}))})}_poll(){return y(this,null,function*(){const e=yield this._withRetries(i=>{const r=Lo(i,!1).getAll();return new $i(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],s=new Set;if(e.length!==0)for(const{fbase_key:i,value:r}of e)s.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(r)&&(this.notifyListeners(i,r),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!s.has(i)&&(this.notifyListeners(i,null),t.push(i));return t})}notifyListeners(e,t){this.localCache[e]=t;const s=this.listeners[e];if(s)for(const i of Array.from(s))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>y(this,null,function*(){return this._poll()}),rI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Dp.type="LOCAL";const aI=Dp;new qi(3e4,6e4);/**
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
 */function Op(n,e){return e?Nt(e):(F(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class sl extends Zc{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return os(e,this._buildIdpRequest())}_linkToIdToken(e,t){return os(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return os(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function cI(n){return Cp(n.auth,new sl(n),n.bypassAuthState)}function lI(n){const{auth:e,user:t}=n;return F(t,e,"internal-error"),Wv(t,new sl(n),n.bypassAuthState)}function uI(n){return y(this,null,function*(){const{auth:e,user:t}=n;return F(t,e,"internal-error"),qv(t,new sl(n),n.bypassAuthState)})}/**
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
 */class Vp{constructor(e,t,s,i,r=!1){this.auth=e,this.resolver=s,this.user=i,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise((e,t)=>y(this,null,function*(){this.pendingPromise={resolve:e,reject:t};try{this.eventManager=yield this.resolver._initialize(this.auth),yield this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}}))}onAuthEvent(e){return y(this,null,function*(){const{urlResponse:t,sessionId:s,postBody:i,tenantId:r,error:o,type:c}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:t,sessionId:s,tenantId:r||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(yield this.getIdpTask(c)(l))}catch(h){this.reject(h)}})}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return cI;case"linkViaPopup":case"linkViaRedirect":return uI;case"reauthViaPopup":case"reauthViaRedirect":return lI;default:nt(this.auth,"internal-error")}}resolve(e){Mt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Mt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const hI=new qi(2e3,1e4);function xP(n,e,t){return y(this,null,function*(){if(je(n.app))return Promise.reject(at(n,"operation-not-supported-in-this-environment"));const s=Tt(n);GE(n,e,tl);const i=Op(s,t);return new Pn(s,"signInViaPopup",e,i).executeNotNull()})}class Pn extends Vp{constructor(e,t,s,i,r){super(e,t,i,r),this.provider=s,this.authWindow=null,this.pollId=null,Pn.currentPopupAction&&Pn.currentPopupAction.cancel(),Pn.currentPopupAction=this}executeNotNull(){return y(this,null,function*(){const e=yield this.execute();return F(e,this.auth,"internal-error"),e})}onExecution(){return y(this,null,function*(){Mt(this.filter.length===1,"Popup operations only handle one event");const e=nl();this.authWindow=yield this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(at(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()})}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(at(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Pn.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,s;if((s=(t=this.authWindow)==null?void 0:t.window)!=null&&s.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(at(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,hI.get())};e()}}Pn.currentPopupAction=null;/**
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
 */const dI="pendingRedirect",Lr=new Map;class hi extends Vp{constructor(e,t,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,s),this.eventId=null}execute(){return y(this,null,function*(){let e=Lr.get(this.auth._key());if(!e){try{const s=(yield fI(this.resolver,this.auth))?yield An(hi.prototype,this,"execute").call(this):null;e=()=>Promise.resolve(s)}catch(t){e=()=>Promise.reject(t)}Lr.set(this.auth._key(),e)}return this.bypassAuthState||Lr.set(this.auth._key(),()=>Promise.resolve(null)),e()})}onAuthEvent(e){return y(this,null,function*(){if(e.type==="signInViaRedirect")return An(hi.prototype,this,"onAuthEvent").call(this,e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=yield this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,An(hi.prototype,this,"onAuthEvent").call(this,e);this.resolve(null)}})}onExecution(){return y(this,null,function*(){})}cleanUp(){}}function fI(n,e){return y(this,null,function*(){const t=mI(e),s=_I(n);if(!(yield s._isAvailable()))return!1;const i=(yield s._get(t))==="true";return yield s._remove(t),i})}function pI(n,e){Lr.set(n._key(),e)}function _I(n){return Nt(n._redirectPersistence)}function mI(n){return xr(dI,n.config.apiKey,n.name)}function gI(n,e,t=!1){return y(this,null,function*(){if(je(n.app))return Promise.reject(dt(n));const s=Tt(n),i=Op(s,e),o=yield new hi(s,i,t).execute();return o&&!t&&(delete o.user._redirectEventId,yield s._persistUserIfCurrent(o.user),yield s._setRedirectUser(null,e)),o})}/**
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
 */const yI=10*60*1e3;class EI{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(t=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!vI(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var s;if(e.error&&!Mp(e)){const i=((s=e.error.code)==null?void 0:s.split("auth/")[1])||"internal-error";t.onError(at(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const s=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=yI&&this.cachedEventUids.clear(),this.cachedEventUids.has(Yh(e))}saveEventToCache(e){this.cachedEventUids.add(Yh(e)),this.lastProcessedEventTime=Date.now()}}function Yh(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Mp({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function vI(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Mp(n);default:return!1}}/**
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
 */function II(t){return y(this,arguments,function*(n,e={}){return It(n,"GET","/v1/projects",e)})}/**
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
 */const TI=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,wI=/^https?/;function CI(n){return y(this,null,function*(){if(n.config.emulator)return;const{authorizedDomains:e}=yield II(n);for(const t of e)try{if(AI(t))return}catch(s){}nt(n,"unauthorized-domain")})}function AI(n){const e=cc(),{protocol:t,hostname:s}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&s===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===s}if(!wI.test(t))return!1;if(TI.test(n))return s===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(s)}/**
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
 */const RI=new qi(3e4,6e4);function Xh(){const n=ft().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function SI(n){return new Promise((e,t)=>{var i,r,o;function s(){Xh(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Xh(),t(at(n,"network-request-failed"))},timeout:RI.get()})}if((r=(i=ft().gapi)==null?void 0:i.iframes)!=null&&r.Iframe)e(gapi.iframes.getContext());else if((o=ft().gapi)!=null&&o.load)s();else{const c=Tv("iframefcb");return ft()[c]=()=>{gapi.load?s():t(at(n,"network-request-failed"))},Ep(`${Iv()}?onload=${c}`).catch(l=>t(l))}}).catch(e=>{throw Fr=null,e})}let Fr=null;function PI(n){return Fr=Fr||SI(n),Fr}/**
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
 */const bI=new qi(5e3,15e3),NI="__/auth/iframe",kI="emulator/auth/iframe",DI={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},OI=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function VI(n){const e=n.config;F(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Yc(e,kI):`https://${n.config.authDomain}/${NI}`,s={apiKey:e.apiKey,appName:n.name,v:jn},i=OI.get(n.config.apiHost);i&&(s.eid=i);const r=n._getFrameworks();return r.length&&(s.fw=r.join(",")),`${t}?${Rs(s).slice(1)}`}function MI(n){return y(this,null,function*(){const e=yield PI(n),t=ft().gapi;return F(t,n,"internal-error"),e.open({where:document.body,url:VI(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:DI,dontclear:!0},s=>new Promise((i,r)=>y(this,null,function*(){yield s.restyle({setHideOnLeave:!1});const o=at(n,"network-request-failed"),c=ft().setTimeout(()=>{r(o)},bI.get());function l(){ft().clearTimeout(c),i(s)}s.ping(l).then(l,()=>{r(o)})})))})}/**
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
 */const xI={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},LI=500,FI=600,UI="_blank",BI="http://localhost";class Jh{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(e){}}}function qI(n,e,t,s=LI,i=FI){const r=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-s)/2,0).toString();let c="";const l=Rt(ee({},xI),{width:s.toString(),height:i.toString(),top:r,left:o}),h=Ue().toLowerCase();t&&(c=dp(h)?UI:t),up(h)&&(e=e||BI,l.scrollbars="yes");const f=Object.entries(l).reduce((_,[T,S])=>`${_}${T}=${S},`,"");if(dv(h)&&c!=="_self")return WI(e||"",c),new Jh(null);const p=window.open(e||"",c,f);F(p,n,"popup-blocked");try{p.focus()}catch(_){}return new Jh(p)}function WI(n,e){const t=document.createElement("a");t.href=n,t.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(s)}/**
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
 */const jI="__/auth/handler",$I="emulator/auth/handler",HI=encodeURIComponent("fac");function Zh(n,e,t,s,i,r){return y(this,null,function*(){F(n.config.authDomain,n,"auth-domain-config-required"),F(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:s,v:jn,eventId:i};if(e instanceof tl){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",Kr(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,p]of Object.entries({}))o[f]=p}if(e instanceof ji){const f=e.getScopes().filter(p=>p!=="");f.length>0&&(o.scopes=f.join(","))}n.tenantId&&(o.tid=n.tenantId);const c=o;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const l=yield n._getAppCheckToken(),h=l?`#${HI}=${encodeURIComponent(l)}`:"";return`${zI(n)}?${Rs(c).slice(1)}${h}`})}function zI({config:n}){return n.emulator?Yc(n,$I):`https://${n.authDomain}/${jI}`}/**
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
 */const ja="webStorageSupport";class GI{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Pp,this._completeRedirectFn=gI,this._overrideRedirectResult=pI}_openPopup(e,t,s,i){return y(this,null,function*(){var o;Mt((o=this.eventManagers[e._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const r=yield Zh(e,t,s,cc(),i);return qI(e,r,nl())})}_openRedirect(e,t,s,i){return y(this,null,function*(){yield this._originValidation(e);const r=yield Zh(e,t,s,cc(),i);return Jv(r),new Promise(()=>{})})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:r}=this.eventManagers[t];return i?Promise.resolve(i):(Mt(r,"If manager is not set, promise should be"),r)}const s=this.initAndGetManager(e);return this.eventManagers[t]={promise:s},s.catch(()=>{delete this.eventManagers[t]}),s}initAndGetManager(e){return y(this,null,function*(){const t=yield MI(e),s=new EI(e);return t.register("authEvent",i=>(F(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:s.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=t,s})}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(ja,{type:ja},i=>{var o;const r=(o=i==null?void 0:i[0])==null?void 0:o[ja];r!==void 0&&t(!!r),nt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=CI(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return gp()||hp()||Jc()}}const KI=GI;var ed="@firebase/auth",td="1.11.0";/**
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
 */class QI{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}getToken(e){return y(this,null,function*(){return this.assertAuthConfigured(),yield this.auth._initializationPromise,this.auth.currentUser?{accessToken:yield this.auth.currentUser.getIdToken(e)}:null})}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(s=>{e((s==null?void 0:s.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){F(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function YI(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function XI(n){Mn(new cn("auth",(e,{options:t})=>{const s=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=s.options;F(o&&!o.includes(":"),"invalid-api-key",{appName:s.name});const l={apiKey:o,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:yp(n)},h=new yv(s,i,r,l);return Pv(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,s)=>{e.getProvider("auth-internal").initialize()})),Mn(new cn("auth-internal",e=>{const t=Tt(e.getProvider("auth").getImmediate());return(s=>new QI(s))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),ht(ed,td,YI(n)),ht(ed,td,"esm2020")}/**
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
 */const JI=5*60,ZI=Qf("authIdTokenMaxAge")||JI;let nd=null;const eT=n=>e=>y(void 0,null,function*(){const t=e&&(yield e.getIdTokenResult()),s=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(s&&s>ZI)return;const i=t==null?void 0:t.token;nd!==i&&(nd=i,yield fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))});function LP(n=Gc()){const e=Vo(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Sv(n,{popupRedirectResolver:KI,persistence:[aI,Qv,Pp]}),s=Qf("authTokenSyncURL");if(s&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(s,location.origin);if(location.origin===r.origin){const o=eT(r.toString());zv(t,o,()=>o(t.currentUser)),Hv(t,c=>o(c))}}const i=zf("auth");return i&&bv(t,`http://${i}`),t}function tT(){var n,e;return(e=(n=document.getElementsByTagName("head"))==null?void 0:n[0])!=null?e:document}Ev({loadJS(n){return new Promise((e,t)=>{const s=document.createElement("script");s.setAttribute("src",n),s.onload=e,s.onerror=i=>{const r=at("internal-error");r.customData=i,t(r)},s.type="text/javascript",s.charset="UTF-8",tT().appendChild(s)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});XI("Browser");var sd=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var nn,xp;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(w,g){function v(){}v.prototype=g.prototype,w.D=g.prototype,w.prototype=new v,w.prototype.constructor=w,w.C=function(I,C,R){for(var E=Array(arguments.length-2),wt=2;wt<arguments.length;wt++)E[wt-2]=arguments[wt];return g.prototype[C].apply(I,E)}}function t(){this.blockSize=-1}function s(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(s,t),s.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(w,g,v){v||(v=0);var I=Array(16);if(typeof g=="string")for(var C=0;16>C;++C)I[C]=g.charCodeAt(v++)|g.charCodeAt(v++)<<8|g.charCodeAt(v++)<<16|g.charCodeAt(v++)<<24;else for(C=0;16>C;++C)I[C]=g[v++]|g[v++]<<8|g[v++]<<16|g[v++]<<24;g=w.g[0],v=w.g[1],C=w.g[2];var R=w.g[3],E=g+(R^v&(C^R))+I[0]+3614090360&4294967295;g=v+(E<<7&4294967295|E>>>25),E=R+(C^g&(v^C))+I[1]+3905402710&4294967295,R=g+(E<<12&4294967295|E>>>20),E=C+(v^R&(g^v))+I[2]+606105819&4294967295,C=R+(E<<17&4294967295|E>>>15),E=v+(g^C&(R^g))+I[3]+3250441966&4294967295,v=C+(E<<22&4294967295|E>>>10),E=g+(R^v&(C^R))+I[4]+4118548399&4294967295,g=v+(E<<7&4294967295|E>>>25),E=R+(C^g&(v^C))+I[5]+1200080426&4294967295,R=g+(E<<12&4294967295|E>>>20),E=C+(v^R&(g^v))+I[6]+2821735955&4294967295,C=R+(E<<17&4294967295|E>>>15),E=v+(g^C&(R^g))+I[7]+4249261313&4294967295,v=C+(E<<22&4294967295|E>>>10),E=g+(R^v&(C^R))+I[8]+1770035416&4294967295,g=v+(E<<7&4294967295|E>>>25),E=R+(C^g&(v^C))+I[9]+2336552879&4294967295,R=g+(E<<12&4294967295|E>>>20),E=C+(v^R&(g^v))+I[10]+4294925233&4294967295,C=R+(E<<17&4294967295|E>>>15),E=v+(g^C&(R^g))+I[11]+2304563134&4294967295,v=C+(E<<22&4294967295|E>>>10),E=g+(R^v&(C^R))+I[12]+1804603682&4294967295,g=v+(E<<7&4294967295|E>>>25),E=R+(C^g&(v^C))+I[13]+4254626195&4294967295,R=g+(E<<12&4294967295|E>>>20),E=C+(v^R&(g^v))+I[14]+2792965006&4294967295,C=R+(E<<17&4294967295|E>>>15),E=v+(g^C&(R^g))+I[15]+1236535329&4294967295,v=C+(E<<22&4294967295|E>>>10),E=g+(C^R&(v^C))+I[1]+4129170786&4294967295,g=v+(E<<5&4294967295|E>>>27),E=R+(v^C&(g^v))+I[6]+3225465664&4294967295,R=g+(E<<9&4294967295|E>>>23),E=C+(g^v&(R^g))+I[11]+643717713&4294967295,C=R+(E<<14&4294967295|E>>>18),E=v+(R^g&(C^R))+I[0]+3921069994&4294967295,v=C+(E<<20&4294967295|E>>>12),E=g+(C^R&(v^C))+I[5]+3593408605&4294967295,g=v+(E<<5&4294967295|E>>>27),E=R+(v^C&(g^v))+I[10]+38016083&4294967295,R=g+(E<<9&4294967295|E>>>23),E=C+(g^v&(R^g))+I[15]+3634488961&4294967295,C=R+(E<<14&4294967295|E>>>18),E=v+(R^g&(C^R))+I[4]+3889429448&4294967295,v=C+(E<<20&4294967295|E>>>12),E=g+(C^R&(v^C))+I[9]+568446438&4294967295,g=v+(E<<5&4294967295|E>>>27),E=R+(v^C&(g^v))+I[14]+3275163606&4294967295,R=g+(E<<9&4294967295|E>>>23),E=C+(g^v&(R^g))+I[3]+4107603335&4294967295,C=R+(E<<14&4294967295|E>>>18),E=v+(R^g&(C^R))+I[8]+1163531501&4294967295,v=C+(E<<20&4294967295|E>>>12),E=g+(C^R&(v^C))+I[13]+2850285829&4294967295,g=v+(E<<5&4294967295|E>>>27),E=R+(v^C&(g^v))+I[2]+4243563512&4294967295,R=g+(E<<9&4294967295|E>>>23),E=C+(g^v&(R^g))+I[7]+1735328473&4294967295,C=R+(E<<14&4294967295|E>>>18),E=v+(R^g&(C^R))+I[12]+2368359562&4294967295,v=C+(E<<20&4294967295|E>>>12),E=g+(v^C^R)+I[5]+4294588738&4294967295,g=v+(E<<4&4294967295|E>>>28),E=R+(g^v^C)+I[8]+2272392833&4294967295,R=g+(E<<11&4294967295|E>>>21),E=C+(R^g^v)+I[11]+1839030562&4294967295,C=R+(E<<16&4294967295|E>>>16),E=v+(C^R^g)+I[14]+4259657740&4294967295,v=C+(E<<23&4294967295|E>>>9),E=g+(v^C^R)+I[1]+2763975236&4294967295,g=v+(E<<4&4294967295|E>>>28),E=R+(g^v^C)+I[4]+1272893353&4294967295,R=g+(E<<11&4294967295|E>>>21),E=C+(R^g^v)+I[7]+4139469664&4294967295,C=R+(E<<16&4294967295|E>>>16),E=v+(C^R^g)+I[10]+3200236656&4294967295,v=C+(E<<23&4294967295|E>>>9),E=g+(v^C^R)+I[13]+681279174&4294967295,g=v+(E<<4&4294967295|E>>>28),E=R+(g^v^C)+I[0]+3936430074&4294967295,R=g+(E<<11&4294967295|E>>>21),E=C+(R^g^v)+I[3]+3572445317&4294967295,C=R+(E<<16&4294967295|E>>>16),E=v+(C^R^g)+I[6]+76029189&4294967295,v=C+(E<<23&4294967295|E>>>9),E=g+(v^C^R)+I[9]+3654602809&4294967295,g=v+(E<<4&4294967295|E>>>28),E=R+(g^v^C)+I[12]+3873151461&4294967295,R=g+(E<<11&4294967295|E>>>21),E=C+(R^g^v)+I[15]+530742520&4294967295,C=R+(E<<16&4294967295|E>>>16),E=v+(C^R^g)+I[2]+3299628645&4294967295,v=C+(E<<23&4294967295|E>>>9),E=g+(C^(v|~R))+I[0]+4096336452&4294967295,g=v+(E<<6&4294967295|E>>>26),E=R+(v^(g|~C))+I[7]+1126891415&4294967295,R=g+(E<<10&4294967295|E>>>22),E=C+(g^(R|~v))+I[14]+2878612391&4294967295,C=R+(E<<15&4294967295|E>>>17),E=v+(R^(C|~g))+I[5]+4237533241&4294967295,v=C+(E<<21&4294967295|E>>>11),E=g+(C^(v|~R))+I[12]+1700485571&4294967295,g=v+(E<<6&4294967295|E>>>26),E=R+(v^(g|~C))+I[3]+2399980690&4294967295,R=g+(E<<10&4294967295|E>>>22),E=C+(g^(R|~v))+I[10]+4293915773&4294967295,C=R+(E<<15&4294967295|E>>>17),E=v+(R^(C|~g))+I[1]+2240044497&4294967295,v=C+(E<<21&4294967295|E>>>11),E=g+(C^(v|~R))+I[8]+1873313359&4294967295,g=v+(E<<6&4294967295|E>>>26),E=R+(v^(g|~C))+I[15]+4264355552&4294967295,R=g+(E<<10&4294967295|E>>>22),E=C+(g^(R|~v))+I[6]+2734768916&4294967295,C=R+(E<<15&4294967295|E>>>17),E=v+(R^(C|~g))+I[13]+1309151649&4294967295,v=C+(E<<21&4294967295|E>>>11),E=g+(C^(v|~R))+I[4]+4149444226&4294967295,g=v+(E<<6&4294967295|E>>>26),E=R+(v^(g|~C))+I[11]+3174756917&4294967295,R=g+(E<<10&4294967295|E>>>22),E=C+(g^(R|~v))+I[2]+718787259&4294967295,C=R+(E<<15&4294967295|E>>>17),E=v+(R^(C|~g))+I[9]+3951481745&4294967295,w.g[0]=w.g[0]+g&4294967295,w.g[1]=w.g[1]+(C+(E<<21&4294967295|E>>>11))&4294967295,w.g[2]=w.g[2]+C&4294967295,w.g[3]=w.g[3]+R&4294967295}s.prototype.u=function(w,g){g===void 0&&(g=w.length);for(var v=g-this.blockSize,I=this.B,C=this.h,R=0;R<g;){if(C==0)for(;R<=v;)i(this,w,R),R+=this.blockSize;if(typeof w=="string"){for(;R<g;)if(I[C++]=w.charCodeAt(R++),C==this.blockSize){i(this,I),C=0;break}}else for(;R<g;)if(I[C++]=w[R++],C==this.blockSize){i(this,I),C=0;break}}this.h=C,this.o+=g},s.prototype.v=function(){var w=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);w[0]=128;for(var g=1;g<w.length-8;++g)w[g]=0;var v=8*this.o;for(g=w.length-8;g<w.length;++g)w[g]=v&255,v/=256;for(this.u(w),w=Array(16),g=v=0;4>g;++g)for(var I=0;32>I;I+=8)w[v++]=this.g[g]>>>I&255;return w};function r(w,g){var v=c;return Object.prototype.hasOwnProperty.call(v,w)?v[w]:v[w]=g(w)}function o(w,g){this.h=g;for(var v=[],I=!0,C=w.length-1;0<=C;C--){var R=w[C]|0;I&&R==g||(v[C]=R,I=!1)}this.g=v}var c={};function l(w){return-128<=w&&128>w?r(w,function(g){return new o([g|0],0>g?-1:0)}):new o([w|0],0>w?-1:0)}function h(w){if(isNaN(w)||!isFinite(w))return p;if(0>w)return k(h(-w));for(var g=[],v=1,I=0;w>=v;I++)g[I]=w/v|0,v*=4294967296;return new o(g,0)}function f(w,g){if(w.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(w.charAt(0)=="-")return k(f(w.substring(1),g));if(0<=w.indexOf("-"))throw Error('number format error: interior "-" character');for(var v=h(Math.pow(g,8)),I=p,C=0;C<w.length;C+=8){var R=Math.min(8,w.length-C),E=parseInt(w.substring(C,C+R),g);8>R?(R=h(Math.pow(g,R)),I=I.j(R).add(h(E))):(I=I.j(v),I=I.add(h(E)))}return I}var p=l(0),_=l(1),T=l(16777216);n=o.prototype,n.m=function(){if(D(this))return-k(this).m();for(var w=0,g=1,v=0;v<this.g.length;v++){var I=this.i(v);w+=(0<=I?I:4294967296+I)*g,g*=4294967296}return w},n.toString=function(w){if(w=w||10,2>w||36<w)throw Error("radix out of range: "+w);if(S(this))return"0";if(D(this))return"-"+k(this).toString(w);for(var g=h(Math.pow(w,6)),v=this,I="";;){var C=ce(v,g).g;v=$(v,C.j(g));var R=((0<v.g.length?v.g[0]:v.h)>>>0).toString(w);if(v=C,S(v))return R+I;for(;6>R.length;)R="0"+R;I=R+I}},n.i=function(w){return 0>w?0:w<this.g.length?this.g[w]:this.h};function S(w){if(w.h!=0)return!1;for(var g=0;g<w.g.length;g++)if(w.g[g]!=0)return!1;return!0}function D(w){return w.h==-1}n.l=function(w){return w=$(this,w),D(w)?-1:S(w)?0:1};function k(w){for(var g=w.g.length,v=[],I=0;I<g;I++)v[I]=~w.g[I];return new o(v,~w.h).add(_)}n.abs=function(){return D(this)?k(this):this},n.add=function(w){for(var g=Math.max(this.g.length,w.g.length),v=[],I=0,C=0;C<=g;C++){var R=I+(this.i(C)&65535)+(w.i(C)&65535),E=(R>>>16)+(this.i(C)>>>16)+(w.i(C)>>>16);I=E>>>16,R&=65535,E&=65535,v[C]=E<<16|R}return new o(v,v[v.length-1]&-2147483648?-1:0)};function $(w,g){return w.add(k(g))}n.j=function(w){if(S(this)||S(w))return p;if(D(this))return D(w)?k(this).j(k(w)):k(k(this).j(w));if(D(w))return k(this.j(k(w)));if(0>this.l(T)&&0>w.l(T))return h(this.m()*w.m());for(var g=this.g.length+w.g.length,v=[],I=0;I<2*g;I++)v[I]=0;for(I=0;I<this.g.length;I++)for(var C=0;C<w.g.length;C++){var R=this.i(I)>>>16,E=this.i(I)&65535,wt=w.i(C)>>>16,xs=w.i(C)&65535;v[2*I+2*C]+=E*xs,q(v,2*I+2*C),v[2*I+2*C+1]+=R*xs,q(v,2*I+2*C+1),v[2*I+2*C+1]+=E*wt,q(v,2*I+2*C+1),v[2*I+2*C+2]+=R*wt,q(v,2*I+2*C+2)}for(I=0;I<g;I++)v[I]=v[2*I+1]<<16|v[2*I];for(I=g;I<2*g;I++)v[I]=0;return new o(v,0)};function q(w,g){for(;(w[g]&65535)!=w[g];)w[g+1]+=w[g]>>>16,w[g]&=65535,g++}function H(w,g){this.g=w,this.h=g}function ce(w,g){if(S(g))throw Error("division by zero");if(S(w))return new H(p,p);if(D(w))return g=ce(k(w),g),new H(k(g.g),k(g.h));if(D(g))return g=ce(w,k(g)),new H(k(g.g),g.h);if(30<w.g.length){if(D(w)||D(g))throw Error("slowDivide_ only works with positive integers.");for(var v=_,I=g;0>=I.l(w);)v=Ze(v),I=Ze(I);var C=ge(v,1),R=ge(I,1);for(I=ge(I,2),v=ge(v,2);!S(I);){var E=R.add(I);0>=E.l(w)&&(C=C.add(v),R=E),I=ge(I,1),v=ge(v,1)}return g=$(w,C.j(g)),new H(C,g)}for(C=p;0<=w.l(g);){for(v=Math.max(1,Math.floor(w.m()/g.m())),I=Math.ceil(Math.log(v)/Math.LN2),I=48>=I?1:Math.pow(2,I-48),R=h(v),E=R.j(g);D(E)||0<E.l(w);)v-=I,R=h(v),E=R.j(g);S(R)&&(R=_),C=C.add(R),w=$(w,E)}return new H(C,w)}n.A=function(w){return ce(this,w).h},n.and=function(w){for(var g=Math.max(this.g.length,w.g.length),v=[],I=0;I<g;I++)v[I]=this.i(I)&w.i(I);return new o(v,this.h&w.h)},n.or=function(w){for(var g=Math.max(this.g.length,w.g.length),v=[],I=0;I<g;I++)v[I]=this.i(I)|w.i(I);return new o(v,this.h|w.h)},n.xor=function(w){for(var g=Math.max(this.g.length,w.g.length),v=[],I=0;I<g;I++)v[I]=this.i(I)^w.i(I);return new o(v,this.h^w.h)};function Ze(w){for(var g=w.g.length+1,v=[],I=0;I<g;I++)v[I]=w.i(I)<<1|w.i(I-1)>>>31;return new o(v,w.h)}function ge(w,g){var v=g>>5;g%=32;for(var I=w.g.length-v,C=[],R=0;R<I;R++)C[R]=0<g?w.i(R+v)>>>g|w.i(R+v+1)<<32-g:w.i(R+v);return new o(C,w.h)}s.prototype.digest=s.prototype.v,s.prototype.reset=s.prototype.s,s.prototype.update=s.prototype.u,xp=s,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=f,nn=o}).apply(typeof sd!="undefined"?sd:typeof self!="undefined"?self:typeof window!="undefined"?window:{});var Pr=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Lp,ri,Fp,Ur,hc,Up,Bp,qp;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,u,d){return a==Array.prototype||a==Object.prototype||(a[u]=d.value),a};function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Pr=="object"&&Pr];for(var u=0;u<a.length;++u){var d=a[u];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var s=t(this);function i(a,u){if(u)e:{var d=s;a=a.split(".");for(var m=0;m<a.length-1;m++){var A=a[m];if(!(A in d))break e;d=d[A]}a=a[a.length-1],m=d[a],u=u(m),u!=m&&u!=null&&e(d,a,{configurable:!0,writable:!0,value:u})}}function r(a,u){a instanceof String&&(a+="");var d=0,m=!1,A={next:function(){if(!m&&d<a.length){var P=d++;return{value:u(P,a[P]),done:!1}}return m=!0,{done:!0,value:void 0}}};return A[Symbol.iterator]=function(){return A},A}i("Array.prototype.values",function(a){return a||function(){return r(this,function(u,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},c=this||self;function l(a){var u=typeof a;return u=u!="object"?u:a?Array.isArray(a)?"array":u:"null",u=="array"||u=="object"&&typeof a.length=="number"}function h(a){var u=typeof a;return u=="object"&&a!=null||u=="function"}function f(a,u,d){return a.call.apply(a.bind,arguments)}function p(a,u,d){if(!a)throw Error();if(2<arguments.length){var m=Array.prototype.slice.call(arguments,2);return function(){var A=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(A,m),a.apply(u,A)}}return function(){return a.apply(u,arguments)}}function _(a,u,d){return _=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:p,_.apply(null,arguments)}function T(a,u){var d=Array.prototype.slice.call(arguments,1);return function(){var m=d.slice();return m.push.apply(m,arguments),a.apply(this,m)}}function S(a,u){function d(){}d.prototype=u.prototype,a.aa=u.prototype,a.prototype=new d,a.prototype.constructor=a,a.Qb=function(m,A,P){for(var V=Array(arguments.length-2),re=2;re<arguments.length;re++)V[re-2]=arguments[re];return u.prototype[A].apply(m,V)}}function D(a){const u=a.length;if(0<u){const d=Array(u);for(let m=0;m<u;m++)d[m]=a[m];return d}return[]}function k(a,u){for(let d=1;d<arguments.length;d++){const m=arguments[d];if(l(m)){const A=a.length||0,P=m.length||0;a.length=A+P;for(let V=0;V<P;V++)a[A+V]=m[V]}else a.push(m)}}class ${constructor(u,d){this.i=u,this.j=d,this.h=0,this.g=null}get(){let u;return 0<this.h?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function q(a){return/^[\s\xa0]*$/.test(a)}function H(){var a=c.navigator;return a&&(a=a.userAgent)?a:""}function ce(a){return ce[" "](a),a}ce[" "]=function(){};var Ze=H().indexOf("Gecko")!=-1&&!(H().toLowerCase().indexOf("webkit")!=-1&&H().indexOf("Edge")==-1)&&!(H().indexOf("Trident")!=-1||H().indexOf("MSIE")!=-1)&&H().indexOf("Edge")==-1;function ge(a,u,d){for(const m in a)u.call(d,a[m],m,a)}function w(a,u){for(const d in a)u.call(void 0,a[d],d,a)}function g(a){const u={};for(const d in a)u[d]=a[d];return u}const v="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function I(a,u){let d,m;for(let A=1;A<arguments.length;A++){m=arguments[A];for(d in m)a[d]=m[d];for(let P=0;P<v.length;P++)d=v[P],Object.prototype.hasOwnProperty.call(m,d)&&(a[d]=m[d])}}function C(a){var u=1;a=a.split(":");const d=[];for(;0<u&&a.length;)d.push(a.shift()),u--;return a.length&&d.push(a.join(":")),d}function R(a){c.setTimeout(()=>{throw a},0)}function E(){var a=fa;let u=null;return a.g&&(u=a.g,a.g=a.g.next,a.g||(a.h=null),u.next=null),u}class wt{constructor(){this.h=this.g=null}add(u,d){const m=xs.get();m.set(u,d),this.h?this.h.next=m:this.g=m,this.h=m}}var xs=new $(()=>new Ig,a=>a.reset());class Ig{constructor(){this.next=this.g=this.h=null}set(u,d){this.h=u,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let Ls,Fs=!1,fa=new wt,Cu=()=>{const a=c.Promise.resolve(void 0);Ls=()=>{a.then(Tg)}};var Tg=()=>{for(var a;a=E();){try{a.h.call(a.g)}catch(d){R(d)}var u=xs;u.j(a),100>u.h&&(u.h++,a.next=u.g,u.g=a)}Fs=!1};function $t(){this.s=this.s,this.C=this.C}$t.prototype.s=!1,$t.prototype.ma=function(){this.s||(this.s=!0,this.N())},$t.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function De(a,u){this.type=a,this.g=this.target=u,this.defaultPrevented=!1}De.prototype.h=function(){this.defaultPrevented=!0};var wg=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var a=!1,u=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const d=()=>{};c.addEventListener("test",d,u),c.removeEventListener("test",d,u)}catch(d){}return a}();function Us(a,u){if(De.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var d=this.type=a.type,m=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=u,u=a.relatedTarget){if(Ze){e:{try{ce(u.nodeName);var A=!0;break e}catch(P){}A=!1}A||(u=null)}}else d=="mouseover"?u=a.fromElement:d=="mouseout"&&(u=a.toElement);this.relatedTarget=u,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:Cg[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&Us.aa.h.call(this)}}S(Us,De);var Cg={2:"touch",3:"pen",4:"mouse"};Us.prototype.h=function(){Us.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var or="closure_listenable_"+(1e6*Math.random()|0),Ag=0;function Rg(a,u,d,m,A){this.listener=a,this.proxy=null,this.src=u,this.type=d,this.capture=!!m,this.ha=A,this.key=++Ag,this.da=this.fa=!1}function ar(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function cr(a){this.src=a,this.g={},this.h=0}cr.prototype.add=function(a,u,d,m,A){var P=a.toString();a=this.g[P],a||(a=this.g[P]=[],this.h++);var V=_a(a,u,m,A);return-1<V?(u=a[V],d||(u.fa=!1)):(u=new Rg(u,this.src,P,!!m,A),u.fa=d,a.push(u)),u};function pa(a,u){var d=u.type;if(d in a.g){var m=a.g[d],A=Array.prototype.indexOf.call(m,u,void 0),P;(P=0<=A)&&Array.prototype.splice.call(m,A,1),P&&(ar(u),a.g[d].length==0&&(delete a.g[d],a.h--))}}function _a(a,u,d,m){for(var A=0;A<a.length;++A){var P=a[A];if(!P.da&&P.listener==u&&P.capture==!!d&&P.ha==m)return A}return-1}var ma="closure_lm_"+(1e6*Math.random()|0),ga={};function Au(a,u,d,m,A){if(Array.isArray(u)){for(var P=0;P<u.length;P++)Au(a,u[P],d,m,A);return null}return d=Pu(d),a&&a[or]?a.K(u,d,h(m)?!!m.capture:!1,A):Sg(a,u,d,!1,m,A)}function Sg(a,u,d,m,A,P){if(!u)throw Error("Invalid event type");var V=h(A)?!!A.capture:!!A,re=Ea(a);if(re||(a[ma]=re=new cr(a)),d=re.add(u,d,m,V,P),d.proxy)return d;if(m=Pg(),d.proxy=m,m.src=a,m.listener=d,a.addEventListener)wg||(A=V),A===void 0&&(A=!1),a.addEventListener(u.toString(),m,A);else if(a.attachEvent)a.attachEvent(Su(u.toString()),m);else if(a.addListener&&a.removeListener)a.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return d}function Pg(){function a(d){return u.call(a.src,a.listener,d)}const u=bg;return a}function Ru(a,u,d,m,A){if(Array.isArray(u))for(var P=0;P<u.length;P++)Ru(a,u[P],d,m,A);else m=h(m)?!!m.capture:!!m,d=Pu(d),a&&a[or]?(a=a.i,u=String(u).toString(),u in a.g&&(P=a.g[u],d=_a(P,d,m,A),-1<d&&(ar(P[d]),Array.prototype.splice.call(P,d,1),P.length==0&&(delete a.g[u],a.h--)))):a&&(a=Ea(a))&&(u=a.g[u.toString()],a=-1,u&&(a=_a(u,d,m,A)),(d=-1<a?u[a]:null)&&ya(d))}function ya(a){if(typeof a!="number"&&a&&!a.da){var u=a.src;if(u&&u[or])pa(u.i,a);else{var d=a.type,m=a.proxy;u.removeEventListener?u.removeEventListener(d,m,a.capture):u.detachEvent?u.detachEvent(Su(d),m):u.addListener&&u.removeListener&&u.removeListener(m),(d=Ea(u))?(pa(d,a),d.h==0&&(d.src=null,u[ma]=null)):ar(a)}}}function Su(a){return a in ga?ga[a]:ga[a]="on"+a}function bg(a,u){if(a.da)a=!0;else{u=new Us(u,this);var d=a.listener,m=a.ha||a.src;a.fa&&ya(a),a=d.call(m,u)}return a}function Ea(a){return a=a[ma],a instanceof cr?a:null}var va="__closure_events_fn_"+(1e9*Math.random()>>>0);function Pu(a){return typeof a=="function"?a:(a[va]||(a[va]=function(u){return a.handleEvent(u)}),a[va])}function Oe(){$t.call(this),this.i=new cr(this),this.M=this,this.F=null}S(Oe,$t),Oe.prototype[or]=!0,Oe.prototype.removeEventListener=function(a,u,d,m){Ru(this,a,u,d,m)};function qe(a,u){var d,m=a.F;if(m)for(d=[];m;m=m.F)d.push(m);if(a=a.M,m=u.type||u,typeof u=="string")u=new De(u,a);else if(u instanceof De)u.target=u.target||a;else{var A=u;u=new De(m,a),I(u,A)}if(A=!0,d)for(var P=d.length-1;0<=P;P--){var V=u.g=d[P];A=lr(V,m,!0,u)&&A}if(V=u.g=a,A=lr(V,m,!0,u)&&A,A=lr(V,m,!1,u)&&A,d)for(P=0;P<d.length;P++)V=u.g=d[P],A=lr(V,m,!1,u)&&A}Oe.prototype.N=function(){if(Oe.aa.N.call(this),this.i){var a=this.i,u;for(u in a.g){for(var d=a.g[u],m=0;m<d.length;m++)ar(d[m]);delete a.g[u],a.h--}}this.F=null},Oe.prototype.K=function(a,u,d,m){return this.i.add(String(a),u,!1,d,m)},Oe.prototype.L=function(a,u,d,m){return this.i.add(String(a),u,!0,d,m)};function lr(a,u,d,m){if(u=a.i.g[String(u)],!u)return!0;u=u.concat();for(var A=!0,P=0;P<u.length;++P){var V=u[P];if(V&&!V.da&&V.capture==d){var re=V.listener,Pe=V.ha||V.src;V.fa&&pa(a.i,V),A=re.call(Pe,m)!==!1&&A}}return A&&!m.defaultPrevented}function bu(a,u,d){if(typeof a=="function")d&&(a=_(a,d));else if(a&&typeof a.handleEvent=="function")a=_(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(u)?-1:c.setTimeout(a,u||0)}function Nu(a){a.g=bu(()=>{a.g=null,a.i&&(a.i=!1,Nu(a))},a.l);const u=a.h;a.h=null,a.m.apply(null,u)}class Ng extends $t{constructor(u,d){super(),this.m=u,this.l=d,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:Nu(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Bs(a){$t.call(this),this.h=a,this.g={}}S(Bs,$t);var ku=[];function Du(a){ge(a.g,function(u,d){this.g.hasOwnProperty(d)&&ya(u)},a),a.g={}}Bs.prototype.N=function(){Bs.aa.N.call(this),Du(this)},Bs.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Ia=c.JSON.stringify,kg=c.JSON.parse,Dg=class{stringify(a){return c.JSON.stringify(a,void 0)}parse(a){return c.JSON.parse(a,void 0)}};function Ta(){}Ta.prototype.h=null;function Ou(a){return a.h||(a.h=a.i())}function Vu(){}var qs={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function wa(){De.call(this,"d")}S(wa,De);function Ca(){De.call(this,"c")}S(Ca,De);var In={},Mu=null;function ur(){return Mu=Mu||new Oe}In.La="serverreachability";function xu(a){De.call(this,In.La,a)}S(xu,De);function Ws(a){const u=ur();qe(u,new xu(u))}In.STAT_EVENT="statevent";function Lu(a,u){De.call(this,In.STAT_EVENT,a),this.stat=u}S(Lu,De);function We(a){const u=ur();qe(u,new Lu(u,a))}In.Ma="timingevent";function Fu(a,u){De.call(this,In.Ma,a),this.size=u}S(Fu,De);function js(a,u){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){a()},u)}function $s(){this.g=!0}$s.prototype.xa=function(){this.g=!1};function Og(a,u,d,m,A,P){a.info(function(){if(a.g)if(P)for(var V="",re=P.split("&"),Pe=0;Pe<re.length;Pe++){var Z=re[Pe].split("=");if(1<Z.length){var Ve=Z[0];Z=Z[1];var Me=Ve.split("_");V=2<=Me.length&&Me[1]=="type"?V+(Ve+"="+Z+"&"):V+(Ve+"=redacted&")}}else V=null;else V=P;return"XMLHTTP REQ ("+m+") [attempt "+A+"]: "+u+`
`+d+`
`+V})}function Vg(a,u,d,m,A,P,V){a.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+A+"]: "+u+`
`+d+`
`+P+" "+V})}function Kn(a,u,d,m){a.info(function(){return"XMLHTTP TEXT ("+u+"): "+xg(a,d)+(m?" "+m:"")})}function Mg(a,u){a.info(function(){return"TIMEOUT: "+u})}$s.prototype.info=function(){};function xg(a,u){if(!a.g)return u;if(!u)return null;try{var d=JSON.parse(u);if(d){for(a=0;a<d.length;a++)if(Array.isArray(d[a])){var m=d[a];if(!(2>m.length)){var A=m[1];if(Array.isArray(A)&&!(1>A.length)){var P=A[0];if(P!="noop"&&P!="stop"&&P!="close")for(var V=1;V<A.length;V++)A[V]=""}}}}return Ia(d)}catch(re){return u}}var hr={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Uu={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Aa;function dr(){}S(dr,Ta),dr.prototype.g=function(){return new XMLHttpRequest},dr.prototype.i=function(){return{}},Aa=new dr;function Ht(a,u,d,m){this.j=a,this.i=u,this.l=d,this.R=m||1,this.U=new Bs(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Bu}function Bu(){this.i=null,this.g="",this.h=!1}var qu={},Ra={};function Sa(a,u,d){a.L=1,a.v=mr(Ct(u)),a.m=d,a.P=!0,Wu(a,null)}function Wu(a,u){a.F=Date.now(),fr(a),a.A=Ct(a.v);var d=a.A,m=a.R;Array.isArray(m)||(m=[String(m)]),nh(d.i,"t",m),a.C=0,d=a.j.J,a.h=new Bu,a.g=vh(a.j,d?u:null,!a.m),0<a.O&&(a.M=new Ng(_(a.Y,a,a.g),a.O)),u=a.U,d=a.g,m=a.ca;var A="readystatechange";Array.isArray(A)||(A&&(ku[0]=A.toString()),A=ku);for(var P=0;P<A.length;P++){var V=Au(d,A[P],m||u.handleEvent,!1,u.h||u);if(!V)break;u.g[V.key]=V}u=a.H?g(a.H):{},a.m?(a.u||(a.u="POST"),u["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,u)):(a.u="GET",a.g.ea(a.A,a.u,null,u)),Ws(),Og(a.i,a.u,a.A,a.l,a.R,a.m)}Ht.prototype.ca=function(a){a=a.target;const u=this.M;u&&At(a)==3?u.j():this.Y(a)},Ht.prototype.Y=function(a){try{if(a==this.g)e:{const Me=At(this.g);var u=this.g.Ba();const Xn=this.g.Z();if(!(3>Me)&&(Me!=3||this.g&&(this.h.h||this.g.oa()||lh(this.g)))){this.J||Me!=4||u==7||(u==8||0>=Xn?Ws(3):Ws(2)),Pa(this);var d=this.g.Z();this.X=d;t:if(ju(this)){var m=lh(this.g);a="";var A=m.length,P=At(this.g)==4;if(!this.h.i){if(typeof TextDecoder=="undefined"){Tn(this),Hs(this);var V="";break t}this.h.i=new c.TextDecoder}for(u=0;u<A;u++)this.h.h=!0,a+=this.h.i.decode(m[u],{stream:!(P&&u==A-1)});m.length=0,this.h.g+=a,this.C=0,V=this.h.g}else V=this.g.oa();if(this.o=d==200,Vg(this.i,this.u,this.A,this.l,this.R,Me,d),this.o){if(this.T&&!this.K){t:{if(this.g){var re,Pe=this.g;if((re=Pe.g?Pe.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!q(re)){var Z=re;break t}}Z=null}if(d=Z)Kn(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,ba(this,d);else{this.o=!1,this.s=3,We(12),Tn(this),Hs(this);break e}}if(this.P){d=!0;let st;for(;!this.J&&this.C<V.length;)if(st=Lg(this,V),st==Ra){Me==4&&(this.s=4,We(14),d=!1),Kn(this.i,this.l,null,"[Incomplete Response]");break}else if(st==qu){this.s=4,We(15),Kn(this.i,this.l,V,"[Invalid Chunk]"),d=!1;break}else Kn(this.i,this.l,st,null),ba(this,st);if(ju(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Me!=4||V.length!=0||this.h.h||(this.s=1,We(16),d=!1),this.o=this.o&&d,!d)Kn(this.i,this.l,V,"[Invalid Chunked Response]"),Tn(this),Hs(this);else if(0<V.length&&!this.W){this.W=!0;var Ve=this.j;Ve.g==this&&Ve.ba&&!Ve.M&&(Ve.j.info("Great, no buffering proxy detected. Bytes received: "+V.length),Ma(Ve),Ve.M=!0,We(11))}}else Kn(this.i,this.l,V,null),ba(this,V);Me==4&&Tn(this),this.o&&!this.J&&(Me==4?mh(this.j,this):(this.o=!1,fr(this)))}else ey(this.g),d==400&&0<V.indexOf("Unknown SID")?(this.s=3,We(12)):(this.s=0,We(13)),Tn(this),Hs(this)}}}catch(Me){}finally{}};function ju(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function Lg(a,u){var d=a.C,m=u.indexOf(`
`,d);return m==-1?Ra:(d=Number(u.substring(d,m)),isNaN(d)?qu:(m+=1,m+d>u.length?Ra:(u=u.slice(m,m+d),a.C=m+d,u)))}Ht.prototype.cancel=function(){this.J=!0,Tn(this)};function fr(a){a.S=Date.now()+a.I,$u(a,a.I)}function $u(a,u){if(a.B!=null)throw Error("WatchDog timer not null");a.B=js(_(a.ba,a),u)}function Pa(a){a.B&&(c.clearTimeout(a.B),a.B=null)}Ht.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(Mg(this.i,this.A),this.L!=2&&(Ws(),We(17)),Tn(this),this.s=2,Hs(this)):$u(this,this.S-a)};function Hs(a){a.j.G==0||a.J||mh(a.j,a)}function Tn(a){Pa(a);var u=a.M;u&&typeof u.ma=="function"&&u.ma(),a.M=null,Du(a.U),a.g&&(u=a.g,a.g=null,u.abort(),u.ma())}function ba(a,u){try{var d=a.j;if(d.G!=0&&(d.g==a||Na(d.h,a))){if(!a.K&&Na(d.h,a)&&d.G==3){try{var m=d.Da.g.parse(u)}catch(Z){m=null}if(Array.isArray(m)&&m.length==3){var A=m;if(A[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<a.F)Tr(d),vr(d);else break e;Va(d),We(18)}}else d.za=A[1],0<d.za-d.T&&37500>A[2]&&d.F&&d.v==0&&!d.C&&(d.C=js(_(d.Za,d),6e3));if(1>=Gu(d.h)&&d.ca){try{d.ca()}catch(Z){}d.ca=void 0}}else Cn(d,11)}else if((a.K||d.g==a)&&Tr(d),!q(u))for(A=d.Da.g.parse(u),u=0;u<A.length;u++){let Z=A[u];if(d.T=Z[0],Z=Z[1],d.G==2)if(Z[0]=="c"){d.K=Z[1],d.ia=Z[2];const Ve=Z[3];Ve!=null&&(d.la=Ve,d.j.info("VER="+d.la));const Me=Z[4];Me!=null&&(d.Aa=Me,d.j.info("SVER="+d.Aa));const Xn=Z[5];Xn!=null&&typeof Xn=="number"&&0<Xn&&(m=1.5*Xn,d.L=m,d.j.info("backChannelRequestTimeoutMs_="+m)),m=d;const st=a.g;if(st){const Cr=st.g?st.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Cr){var P=m.h;P.g||Cr.indexOf("spdy")==-1&&Cr.indexOf("quic")==-1&&Cr.indexOf("h2")==-1||(P.j=P.l,P.g=new Set,P.h&&(ka(P,P.h),P.h=null))}if(m.D){const xa=st.g?st.g.getResponseHeader("X-HTTP-Session-Id"):null;xa&&(m.ya=xa,le(m.I,m.D,xa))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-a.F,d.j.info("Handshake RTT: "+d.R+"ms")),m=d;var V=a;if(m.qa=Eh(m,m.J?m.ia:null,m.W),V.K){Ku(m.h,V);var re=V,Pe=m.L;Pe&&(re.I=Pe),re.B&&(Pa(re),fr(re)),m.g=V}else ph(m);0<d.i.length&&Ir(d)}else Z[0]!="stop"&&Z[0]!="close"||Cn(d,7);else d.G==3&&(Z[0]=="stop"||Z[0]=="close"?Z[0]=="stop"?Cn(d,7):Oa(d):Z[0]!="noop"&&d.l&&d.l.ta(Z),d.v=0)}}Ws(4)}catch(Z){}}var Fg=class{constructor(a,u){this.g=a,this.map=u}};function Hu(a){this.l=a||10,c.PerformanceNavigationTiming?(a=c.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function zu(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Gu(a){return a.h?1:a.g?a.g.size:0}function Na(a,u){return a.h?a.h==u:a.g?a.g.has(u):!1}function ka(a,u){a.g?a.g.add(u):a.h=u}function Ku(a,u){a.h&&a.h==u?a.h=null:a.g&&a.g.has(u)&&a.g.delete(u)}Hu.prototype.cancel=function(){if(this.i=Qu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Qu(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let u=a.i;for(const d of a.g.values())u=u.concat(d.D);return u}return D(a.i)}function Ug(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map!="undefined"&&a instanceof Map||typeof Set!="undefined"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(l(a)){for(var u=[],d=a.length,m=0;m<d;m++)u.push(a[m]);return u}u=[],d=0;for(m in a)u[d++]=a[m];return u}function Bg(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map!="undefined"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set!="undefined"&&a instanceof Set)){if(l(a)||typeof a=="string"){var u=[];a=a.length;for(var d=0;d<a;d++)u.push(d);return u}u=[],d=0;for(const m in a)u[d++]=m;return u}}}function Yu(a,u){if(a.forEach&&typeof a.forEach=="function")a.forEach(u,void 0);else if(l(a)||typeof a=="string")Array.prototype.forEach.call(a,u,void 0);else for(var d=Bg(a),m=Ug(a),A=m.length,P=0;P<A;P++)u.call(void 0,m[P],d&&d[P],a)}var Xu=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function qg(a,u){if(a){a=a.split("&");for(var d=0;d<a.length;d++){var m=a[d].indexOf("="),A=null;if(0<=m){var P=a[d].substring(0,m);A=a[d].substring(m+1)}else P=a[d];u(P,A?decodeURIComponent(A.replace(/\+/g," ")):"")}}}function wn(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof wn){this.h=a.h,pr(this,a.j),this.o=a.o,this.g=a.g,_r(this,a.s),this.l=a.l;var u=a.i,d=new Ks;d.i=u.i,u.g&&(d.g=new Map(u.g),d.h=u.h),Ju(this,d),this.m=a.m}else a&&(u=String(a).match(Xu))?(this.h=!1,pr(this,u[1]||"",!0),this.o=zs(u[2]||""),this.g=zs(u[3]||"",!0),_r(this,u[4]),this.l=zs(u[5]||"",!0),Ju(this,u[6]||"",!0),this.m=zs(u[7]||"")):(this.h=!1,this.i=new Ks(null,this.h))}wn.prototype.toString=function(){var a=[],u=this.j;u&&a.push(Gs(u,Zu,!0),":");var d=this.g;return(d||u=="file")&&(a.push("//"),(u=this.o)&&a.push(Gs(u,Zu,!0),"@"),a.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&a.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(Gs(d,d.charAt(0)=="/"?$g:jg,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",Gs(d,zg)),a.join("")};function Ct(a){return new wn(a)}function pr(a,u,d){a.j=d?zs(u,!0):u,a.j&&(a.j=a.j.replace(/:$/,""))}function _r(a,u){if(u){if(u=Number(u),isNaN(u)||0>u)throw Error("Bad port number "+u);a.s=u}else a.s=null}function Ju(a,u,d){u instanceof Ks?(a.i=u,Gg(a.i,a.h)):(d||(u=Gs(u,Hg)),a.i=new Ks(u,a.h))}function le(a,u,d){a.i.set(u,d)}function mr(a){return le(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function zs(a,u){return a?u?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Gs(a,u,d){return typeof a=="string"?(a=encodeURI(a).replace(u,Wg),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function Wg(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Zu=/[#\/\?@]/g,jg=/[#\?:]/g,$g=/[#\?]/g,Hg=/[#\?@]/g,zg=/#/g;function Ks(a,u){this.h=this.g=null,this.i=a||null,this.j=!!u}function zt(a){a.g||(a.g=new Map,a.h=0,a.i&&qg(a.i,function(u,d){a.add(decodeURIComponent(u.replace(/\+/g," ")),d)}))}n=Ks.prototype,n.add=function(a,u){zt(this),this.i=null,a=Qn(this,a);var d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(u),this.h+=1,this};function eh(a,u){zt(a),u=Qn(a,u),a.g.has(u)&&(a.i=null,a.h-=a.g.get(u).length,a.g.delete(u))}function th(a,u){return zt(a),u=Qn(a,u),a.g.has(u)}n.forEach=function(a,u){zt(this),this.g.forEach(function(d,m){d.forEach(function(A){a.call(u,A,m,this)},this)},this)},n.na=function(){zt(this);const a=Array.from(this.g.values()),u=Array.from(this.g.keys()),d=[];for(let m=0;m<u.length;m++){const A=a[m];for(let P=0;P<A.length;P++)d.push(u[m])}return d},n.V=function(a){zt(this);let u=[];if(typeof a=="string")th(this,a)&&(u=u.concat(this.g.get(Qn(this,a))));else{a=Array.from(this.g.values());for(let d=0;d<a.length;d++)u=u.concat(a[d])}return u},n.set=function(a,u){return zt(this),this.i=null,a=Qn(this,a),th(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[u]),this.h+=1,this},n.get=function(a,u){return a?(a=this.V(a),0<a.length?String(a[0]):u):u};function nh(a,u,d){eh(a,u),0<d.length&&(a.i=null,a.g.set(Qn(a,u),D(d)),a.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],u=Array.from(this.g.keys());for(var d=0;d<u.length;d++){var m=u[d];const P=encodeURIComponent(String(m)),V=this.V(m);for(m=0;m<V.length;m++){var A=P;V[m]!==""&&(A+="="+encodeURIComponent(String(V[m]))),a.push(A)}}return this.i=a.join("&")};function Qn(a,u){return u=String(u),a.j&&(u=u.toLowerCase()),u}function Gg(a,u){u&&!a.j&&(zt(a),a.i=null,a.g.forEach(function(d,m){var A=m.toLowerCase();m!=A&&(eh(this,m),nh(this,A,d))},a)),a.j=u}function Kg(a,u){const d=new $s;if(c.Image){const m=new Image;m.onload=T(Gt,d,"TestLoadImage: loaded",!0,u,m),m.onerror=T(Gt,d,"TestLoadImage: error",!1,u,m),m.onabort=T(Gt,d,"TestLoadImage: abort",!1,u,m),m.ontimeout=T(Gt,d,"TestLoadImage: timeout",!1,u,m),c.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=a}else u(!1)}function Qg(a,u){const d=new $s,m=new AbortController,A=setTimeout(()=>{m.abort(),Gt(d,"TestPingServer: timeout",!1,u)},1e4);fetch(a,{signal:m.signal}).then(P=>{clearTimeout(A),P.ok?Gt(d,"TestPingServer: ok",!0,u):Gt(d,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(A),Gt(d,"TestPingServer: error",!1,u)})}function Gt(a,u,d,m,A){try{A&&(A.onload=null,A.onerror=null,A.onabort=null,A.ontimeout=null),m(d)}catch(P){}}function Yg(){this.g=new Dg}function Xg(a,u,d){const m=d||"";try{Yu(a,function(A,P){let V=A;h(A)&&(V=Ia(A)),u.push(m+P+"="+encodeURIComponent(V))})}catch(A){throw u.push(m+"type="+encodeURIComponent("_badmap")),A}}function gr(a){this.l=a.Ub||null,this.j=a.eb||!1}S(gr,Ta),gr.prototype.g=function(){return new yr(this.l,this.j)},gr.prototype.i=function(a){return function(){return a}}({});function yr(a,u){Oe.call(this),this.D=a,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}S(yr,Oe),n=yr.prototype,n.open=function(a,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=u,this.readyState=1,Ys(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const u={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(u.body=a),(this.D||c).fetch(new Request(this.A,u)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Qs(this)),this.readyState=0},n.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Ys(this)),this.g&&(this.readyState=3,Ys(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream!="undefined"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;sh(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function sh(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}n.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var u=a.value?a.value:new Uint8Array(0);(u=this.v.decode(u,{stream:!a.done}))&&(this.response=this.responseText+=u)}a.done?Qs(this):Ys(this),this.readyState==3&&sh(this)}},n.Ra=function(a){this.g&&(this.response=this.responseText=a,Qs(this))},n.Qa=function(a){this.g&&(this.response=a,Qs(this))},n.ga=function(){this.g&&Qs(this)};function Qs(a){a.readyState=4,a.l=null,a.j=null,a.v=null,Ys(a)}n.setRequestHeader=function(a,u){this.u.append(a,u)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],u=this.h.entries();for(var d=u.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=u.next();return a.join(`\r
`)};function Ys(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(yr.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function ih(a){let u="";return ge(a,function(d,m){u+=m,u+=":",u+=d,u+=`\r
`}),u}function Da(a,u,d){e:{for(m in d){var m=!1;break e}m=!0}m||(d=ih(d),typeof a=="string"?d!=null&&encodeURIComponent(String(d)):le(a,u,d))}function fe(a){Oe.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}S(fe,Oe);var Jg=/^https?$/i,Zg=["POST","PUT"];n=fe.prototype,n.Ha=function(a){this.J=a},n.ea=function(a,u,d,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);u=u?u.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Aa.g(),this.v=this.o?Ou(this.o):Ou(Aa),this.g.onreadystatechange=_(this.Ea,this);try{this.B=!0,this.g.open(u,String(a),!0),this.B=!1}catch(P){rh(this,P);return}if(a=d||"",d=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var A in m)d.set(A,m[A]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const P of m.keys())d.set(P,m.get(P));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(d.keys()).find(P=>P.toLowerCase()=="content-type"),A=c.FormData&&a instanceof c.FormData,!(0<=Array.prototype.indexOf.call(Zg,u,void 0))||m||A||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[P,V]of d)this.g.setRequestHeader(P,V);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{ch(this),this.u=!0,this.g.send(a),this.u=!1}catch(P){rh(this,P)}};function rh(a,u){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=u,a.m=5,oh(a),Er(a)}function oh(a){a.A||(a.A=!0,qe(a,"complete"),qe(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,qe(this,"complete"),qe(this,"abort"),Er(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Er(this,!0)),fe.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?ah(this):this.bb())},n.bb=function(){ah(this)};function ah(a){if(a.h&&typeof o!="undefined"&&(!a.v[1]||At(a)!=4||a.Z()!=2)){if(a.u&&At(a)==4)bu(a.Ea,0,a);else if(qe(a,"readystatechange"),At(a)==4){a.h=!1;try{const V=a.Z();e:switch(V){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var d;if(!(d=u)){var m;if(m=V===0){var A=String(a.D).match(Xu)[1]||null;!A&&c.self&&c.self.location&&(A=c.self.location.protocol.slice(0,-1)),m=!Jg.test(A?A.toLowerCase():"")}d=m}if(d)qe(a,"complete"),qe(a,"success");else{a.m=6;try{var P=2<At(a)?a.g.statusText:""}catch(re){P=""}a.l=P+" ["+a.Z()+"]",oh(a)}}finally{Er(a)}}}}function Er(a,u){if(a.g){ch(a);const d=a.g,m=a.v[0]?()=>{}:null;a.g=null,a.v=null,u||qe(a,"ready");try{d.onreadystatechange=m}catch(A){}}}function ch(a){a.I&&(c.clearTimeout(a.I),a.I=null)}n.isActive=function(){return!!this.g};function At(a){return a.g?a.g.readyState:0}n.Z=function(){try{return 2<At(this)?this.g.status:-1}catch(a){return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch(a){return""}},n.Oa=function(a){if(this.g){var u=this.g.responseText;return a&&u.indexOf(a)==0&&(u=u.substring(a.length)),kg(u)}};function lh(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch(u){return null}}function ey(a){const u={};a=(a.g&&2<=At(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<a.length;m++){if(q(a[m]))continue;var d=C(a[m]);const A=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const P=u[A]||[];u[A]=P,P.push(d)}w(u,function(m){return m.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Xs(a,u,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||u}function uh(a){this.Aa=0,this.i=[],this.j=new $s,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Xs("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Xs("baseRetryDelayMs",5e3,a),this.cb=Xs("retryDelaySeedMs",1e4,a),this.Wa=Xs("forwardChannelMaxRetries",2,a),this.wa=Xs("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new Hu(a&&a.concurrentRequestLimit),this.Da=new Yg,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=uh.prototype,n.la=8,n.G=1,n.connect=function(a,u,d,m){We(0),this.W=a,this.H=u||{},d&&m!==void 0&&(this.H.OSID=d,this.H.OAID=m),this.F=this.X,this.I=Eh(this,null,this.W),Ir(this)};function Oa(a){if(hh(a),a.G==3){var u=a.U++,d=Ct(a.I);if(le(d,"SID",a.K),le(d,"RID",u),le(d,"TYPE","terminate"),Js(a,d),u=new Ht(a,a.j,u),u.L=2,u.v=mr(Ct(d)),d=!1,c.navigator&&c.navigator.sendBeacon)try{d=c.navigator.sendBeacon(u.v.toString(),"")}catch(m){}!d&&c.Image&&(new Image().src=u.v,d=!0),d||(u.g=vh(u.j,null),u.g.ea(u.v)),u.F=Date.now(),fr(u)}yh(a)}function vr(a){a.g&&(Ma(a),a.g.cancel(),a.g=null)}function hh(a){vr(a),a.u&&(c.clearTimeout(a.u),a.u=null),Tr(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&c.clearTimeout(a.s),a.s=null)}function Ir(a){if(!zu(a.h)&&!a.s){a.s=!0;var u=a.Ga;Ls||Cu(),Fs||(Ls(),Fs=!0),fa.add(u,a),a.B=0}}function ty(a,u){return Gu(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=u.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=js(_(a.Ga,a,u),gh(a,a.B)),a.B++,!0)}n.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const A=new Ht(this,this.j,a);let P=this.o;if(this.S&&(P?(P=g(P),I(P,this.S)):P=this.S),this.m!==null||this.O||(A.H=P,P=null),this.P)e:{for(var u=0,d=0;d<this.i.length;d++){t:{var m=this.i[d];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(u+=m,4096<u){u=d;break e}if(u===4096||d===this.i.length-1){u=d+1;break e}}u=1e3}else u=1e3;u=fh(this,A,u),d=Ct(this.I),le(d,"RID",a),le(d,"CVER",22),this.D&&le(d,"X-HTTP-Session-Id",this.D),Js(this,d),P&&(this.O?u="headers="+encodeURIComponent(String(ih(P)))+"&"+u:this.m&&Da(d,this.m,P)),ka(this.h,A),this.Ua&&le(d,"TYPE","init"),this.P?(le(d,"$req",u),le(d,"SID","null"),A.T=!0,Sa(A,d,null)):Sa(A,d,u),this.G=2}}else this.G==3&&(a?dh(this,a):this.i.length==0||zu(this.h)||dh(this))};function dh(a,u){var d;u?d=u.l:d=a.U++;const m=Ct(a.I);le(m,"SID",a.K),le(m,"RID",d),le(m,"AID",a.T),Js(a,m),a.m&&a.o&&Da(m,a.m,a.o),d=new Ht(a,a.j,d,a.B+1),a.m===null&&(d.H=a.o),u&&(a.i=u.D.concat(a.i)),u=fh(a,d,1e3),d.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),ka(a.h,d),Sa(d,m,u)}function Js(a,u){a.H&&ge(a.H,function(d,m){le(u,m,d)}),a.l&&Yu({},function(d,m){le(u,m,d)})}function fh(a,u,d){d=Math.min(a.i.length,d);var m=a.l?_(a.l.Na,a.l,a):null;e:{var A=a.i;let P=-1;for(;;){const V=["count="+d];P==-1?0<d?(P=A[0].g,V.push("ofs="+P)):P=0:V.push("ofs="+P);let re=!0;for(let Pe=0;Pe<d;Pe++){let Z=A[Pe].g;const Ve=A[Pe].map;if(Z-=P,0>Z)P=Math.max(0,A[Pe].g-100),re=!1;else try{Xg(Ve,V,"req"+Z+"_")}catch(Me){m&&m(Ve)}}if(re){m=V.join("&");break e}}}return a=a.i.splice(0,d),u.D=a,m}function ph(a){if(!a.g&&!a.u){a.Y=1;var u=a.Fa;Ls||Cu(),Fs||(Ls(),Fs=!0),fa.add(u,a),a.v=0}}function Va(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=js(_(a.Fa,a),gh(a,a.v)),a.v++,!0)}n.Fa=function(){if(this.u=null,_h(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=js(_(this.ab,this),a)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,We(10),vr(this),_h(this))};function Ma(a){a.A!=null&&(c.clearTimeout(a.A),a.A=null)}function _h(a){a.g=new Ht(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var u=Ct(a.qa);le(u,"RID","rpc"),le(u,"SID",a.K),le(u,"AID",a.T),le(u,"CI",a.F?"0":"1"),!a.F&&a.ja&&le(u,"TO",a.ja),le(u,"TYPE","xmlhttp"),Js(a,u),a.m&&a.o&&Da(u,a.m,a.o),a.L&&(a.g.I=a.L);var d=a.g;a=a.ia,d.L=1,d.v=mr(Ct(u)),d.m=null,d.P=!0,Wu(d,a)}n.Za=function(){this.C!=null&&(this.C=null,vr(this),Va(this),We(19))};function Tr(a){a.C!=null&&(c.clearTimeout(a.C),a.C=null)}function mh(a,u){var d=null;if(a.g==u){Tr(a),Ma(a),a.g=null;var m=2}else if(Na(a.h,u))d=u.D,Ku(a.h,u),m=1;else return;if(a.G!=0){if(u.o)if(m==1){d=u.m?u.m.length:0,u=Date.now()-u.F;var A=a.B;m=ur(),qe(m,new Fu(m,d)),Ir(a)}else ph(a);else if(A=u.s,A==3||A==0&&0<u.X||!(m==1&&ty(a,u)||m==2&&Va(a)))switch(d&&0<d.length&&(u=a.h,u.i=u.i.concat(d)),A){case 1:Cn(a,5);break;case 4:Cn(a,10);break;case 3:Cn(a,6);break;default:Cn(a,2)}}}function gh(a,u){let d=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(d*=2),d*u}function Cn(a,u){if(a.j.info("Error code "+u),u==2){var d=_(a.fb,a),m=a.Xa;const A=!m;m=new wn(m||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||pr(m,"https"),mr(m),A?Kg(m.toString(),d):Qg(m.toString(),d)}else We(2);a.G=0,a.l&&a.l.sa(u),yh(a),hh(a)}n.fb=function(a){a?(this.j.info("Successfully pinged google.com"),We(2)):(this.j.info("Failed to ping google.com"),We(1))};function yh(a){if(a.G=0,a.ka=[],a.l){const u=Qu(a.h);(u.length!=0||a.i.length!=0)&&(k(a.ka,u),k(a.ka,a.i),a.h.i.length=0,D(a.i),a.i.length=0),a.l.ra()}}function Eh(a,u,d){var m=d instanceof wn?Ct(d):new wn(d);if(m.g!="")u&&(m.g=u+"."+m.g),_r(m,m.s);else{var A=c.location;m=A.protocol,u=u?u+"."+A.hostname:A.hostname,A=+A.port;var P=new wn(null);m&&pr(P,m),u&&(P.g=u),A&&_r(P,A),d&&(P.l=d),m=P}return d=a.D,u=a.ya,d&&u&&le(m,d,u),le(m,"VER",a.la),Js(a,m),m}function vh(a,u,d){if(u&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return u=a.Ca&&!a.pa?new fe(new gr({eb:d})):new fe(a.pa),u.Ha(a.J),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Ih(){}n=Ih.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function wr(){}wr.prototype.g=function(a,u){return new Xe(a,u)};function Xe(a,u){Oe.call(this),this.g=new uh(u),this.l=a,this.h=u&&u.messageUrlParams||null,a=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(a?a["X-WebChannel-Content-Type"]=u.messageContentType:a={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.va&&(a?a["X-WebChannel-Client-Profile"]=u.va:a={"X-WebChannel-Client-Profile":u.va}),this.g.S=a,(a=u&&u.Sb)&&!q(a)&&(this.g.m=a),this.v=u&&u.supportsCrossDomainXhr||!1,this.u=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!q(u)&&(this.g.D=u,a=this.h,a!==null&&u in a&&(a=this.h,u in a&&delete a[u])),this.j=new Yn(this)}S(Xe,Oe),Xe.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Xe.prototype.close=function(){Oa(this.g)},Xe.prototype.o=function(a){var u=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.u&&(d={},d.__data__=Ia(a),a=d);u.i.push(new Fg(u.Ya++,a)),u.G==3&&Ir(u)},Xe.prototype.N=function(){this.g.l=null,delete this.j,Oa(this.g),delete this.g,Xe.aa.N.call(this)};function Th(a){wa.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var u=a.__sm__;if(u){e:{for(const d in u){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,u=u!==null&&a in u?u[a]:void 0),this.data=u}else this.data=a}S(Th,wa);function wh(){Ca.call(this),this.status=1}S(wh,Ca);function Yn(a){this.g=a}S(Yn,Ih),Yn.prototype.ua=function(){qe(this.g,"a")},Yn.prototype.ta=function(a){qe(this.g,new Th(a))},Yn.prototype.sa=function(a){qe(this.g,new wh)},Yn.prototype.ra=function(){qe(this.g,"b")},wr.prototype.createWebChannel=wr.prototype.g,Xe.prototype.send=Xe.prototype.o,Xe.prototype.open=Xe.prototype.m,Xe.prototype.close=Xe.prototype.close,qp=function(){return new wr},Bp=function(){return ur()},Up=In,hc={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},hr.NO_ERROR=0,hr.TIMEOUT=8,hr.HTTP_ERROR=6,Ur=hr,Uu.COMPLETE="complete",Fp=Uu,Vu.EventType=qs,qs.OPEN="a",qs.CLOSE="b",qs.ERROR="c",qs.MESSAGE="d",Oe.prototype.listen=Oe.prototype.K,ri=Vu,fe.prototype.listenOnce=fe.prototype.L,fe.prototype.getLastError=fe.prototype.Ka,fe.prototype.getLastErrorCode=fe.prototype.Ba,fe.prototype.getStatus=fe.prototype.Z,fe.prototype.getResponseJson=fe.prototype.Oa,fe.prototype.getResponseText=fe.prototype.oa,fe.prototype.send=fe.prototype.ea,fe.prototype.setWithCredentials=fe.prototype.Ha,Lp=fe}).apply(typeof Pr!="undefined"?Pr:typeof self!="undefined"?self:typeof window!="undefined"?window:{});const id="@firebase/firestore",rd="4.9.0";/**
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
 */class Le{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Le.UNAUTHENTICATED=new Le(null),Le.GOOGLE_CREDENTIALS=new Le("google-credentials-uid"),Le.FIRST_PARTY=new Le("first-party-uid"),Le.MOCK_USER=new Le("mock-user");/**
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
 */let Ps="12.0.0";/**
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
 */const Ln=new Oo("@firebase/firestore");function Zn(){return Ln.logLevel}function x(n,...e){if(Ln.logLevel<=Q.DEBUG){const t=e.map(il);Ln.debug(`Firestore (${Ps}): ${n}`,...t)}}function Lt(n,...e){if(Ln.logLevel<=Q.ERROR){const t=e.map(il);Ln.error(`Firestore (${Ps}): ${n}`,...t)}}function _s(n,...e){if(Ln.logLevel<=Q.WARN){const t=e.map(il);Ln.warn(`Firestore (${Ps}): ${n}`,...t)}}function il(n){if(typeof n=="string")return n;try{/**
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
*/return function(t){return JSON.stringify(t)}(n)}catch(e){return n}}/**
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
 */function U(n,e,t){let s="Unexpected state";typeof e=="string"?s=e:t=e,Wp(n,s,t)}function Wp(n,e,t){let s=`FIRESTORE (${Ps}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{s+=" CONTEXT: "+JSON.stringify(t)}catch(i){s+=" CONTEXT: "+t}throw Lt(s),new Error(s)}function ne(n,e,t,s){let i="Unexpected state";typeof t=="string"?i=t:s=t,n||Wp(e,i,s)}function j(n,e){return n}/**
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
 */const b={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class M extends qt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class Dt{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
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
 */class jp{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class nT{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Le.UNAUTHENTICATED))}shutdown(){}}class sT{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class iT{constructor(e){this.t=e,this.currentUser=Le.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){ne(this.o===void 0,42304);let s=this.i;const i=l=>this.i!==s?(s=this.i,t(l)):Promise.resolve();let r=new Dt;this.o=()=>{this.i++,this.currentUser=this.u(),r.resolve(),r=new Dt,e.enqueueRetryable(()=>i(this.currentUser))};const o=()=>{const l=r;e.enqueueRetryable(()=>y(this,null,function*(){yield l.promise,yield i(this.currentUser)}))},c=l=>{x("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(l=>c(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?c(l):(x("FirebaseAuthCredentialsProvider","Auth not yet detected"),r.resolve(),r=new Dt)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(s=>this.i!==e?(x("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):s?(ne(typeof s.accessToken=="string",31837,{l:s}),new jp(s.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return ne(e===null||typeof e=="string",2055,{h:e}),new Le(e)}}class rT{constructor(e,t,s){this.P=e,this.T=t,this.I=s,this.type="FirstParty",this.user=Le.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class oT{constructor(e,t,s){this.P=e,this.T=t,this.I=s}getToken(){return Promise.resolve(new rT(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(Le.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class od{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class aT{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,je(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){ne(this.o===void 0,3512);const s=r=>{r.error!=null&&x("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${r.error.message}`);const o=r.token!==this.m;return this.m=r.token,x("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(r.token):Promise.resolve()};this.o=r=>{e.enqueueRetryable(()=>s(r))};const i=r=>{x("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=r,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(r=>i(r)),setTimeout(()=>{if(!this.appCheck){const r=this.V.getImmediate({optional:!0});r?i(r):x("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new od(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(ne(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new od(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function cT(n){const e=typeof self!="undefined"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let s=0;s<n;s++)t[s]=Math.floor(256*Math.random());return t}/**
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
 */class rl{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let s="";for(;s.length<20;){const i=cT(40);for(let r=0;r<i.length;++r)s.length<20&&i[r]<t&&(s+=e.charAt(i[r]%62))}return s}}function Y(n,e){return n<e?-1:n>e?1:0}function dc(n,e){const t=Math.min(n.length,e.length);for(let s=0;s<t;s++){const i=n.charAt(s),r=e.charAt(s);if(i!==r)return $a(i)===$a(r)?Y(i,r):$a(i)?1:-1}return Y(n.length,e.length)}const lT=55296,uT=57343;function $a(n){const e=n.charCodeAt(0);return e>=lT&&e<=uT}function ms(n,e,t){return n.length===e.length&&n.every((s,i)=>t(s,e[i]))}/**
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
 */const ad="__name__";class ut{constructor(e,t,s){t===void 0?t=0:t>e.length&&U(637,{offset:t,range:e.length}),s===void 0?s=e.length-t:s>e.length-t&&U(1746,{length:s,range:e.length-t}),this.segments=e,this.offset=t,this.len=s}get length(){return this.len}isEqual(e){return ut.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof ut?e.forEach(s=>{t.push(s)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,s=this.limit();t<s;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const s=Math.min(e.length,t.length);for(let i=0;i<s;i++){const r=ut.compareSegments(e.get(i),t.get(i));if(r!==0)return r}return Y(e.length,t.length)}static compareSegments(e,t){const s=ut.isNumericId(e),i=ut.isNumericId(t);return s&&!i?-1:!s&&i?1:s&&i?ut.extractNumericId(e).compare(ut.extractNumericId(t)):dc(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return nn.fromString(e.substring(4,e.length-2))}}class ae extends ut{construct(e,t,s){return new ae(e,t,s)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const s of e){if(s.indexOf("//")>=0)throw new M(b.INVALID_ARGUMENT,`Invalid segment (${s}). Paths must not contain // in them.`);t.push(...s.split("/").filter(i=>i.length>0))}return new ae(t)}static emptyPath(){return new ae([])}}const hT=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ne extends ut{construct(e,t,s){return new Ne(e,t,s)}static isValidIdentifier(e){return hT.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ne.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===ad}static keyField(){return new Ne([ad])}static fromServerFormat(e){const t=[];let s="",i=0;const r=()=>{if(s.length===0)throw new M(b.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(s),s=""};let o=!1;for(;i<e.length;){const c=e[i];if(c==="\\"){if(i+1===e.length)throw new M(b.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[i+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new M(b.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);s+=l,i+=2}else c==="`"?(o=!o,i++):c!=="."||o?(s+=c,i++):(r(),i++)}if(r(),o)throw new M(b.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ne(t)}static emptyPath(){return new Ne([])}}/**
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
 */class L{constructor(e){this.path=e}static fromPath(e){return new L(ae.fromString(e))}static fromName(e){return new L(ae.fromString(e).popFirst(5))}static empty(){return new L(ae.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ae.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return ae.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new L(new ae(e.slice()))}}/**
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
 */function $p(n,e,t){if(!t)throw new M(b.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function dT(n,e,t,s){if(e===!0&&s===!0)throw new M(b.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function cd(n){if(!L.isDocumentKey(n))throw new M(b.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function ld(n){if(L.isDocumentKey(n))throw new M(b.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Hp(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Fo(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(s){return s.constructor?s.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":U(12329,{type:typeof n})}function $e(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new M(b.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Fo(n);throw new M(b.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function fT(n,e){if(e<=0)throw new M(b.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
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
 */function Ie(n,e){const t={typeString:n};return e&&(t.value=e),t}function Hi(n,e){if(!Hp(n))throw new M(b.INVALID_ARGUMENT,"JSON must be an object");let t;for(const s in e)if(e[s]){const i=e[s].typeString,r="value"in e[s]?{value:e[s].value}:void 0;if(!(s in n)){t=`JSON missing required field: '${s}'`;break}const o=n[s];if(i&&typeof o!==i){t=`JSON field '${s}' must be a ${i}.`;break}if(r!==void 0&&o!==r.value){t=`Expected '${s}' field to equal '${r.value}'`;break}}if(t)throw new M(b.INVALID_ARGUMENT,t);return!0}/**
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
 */const ud=-62135596800,hd=1e6;class he{static now(){return he.fromMillis(Date.now())}static fromDate(e){return he.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),s=Math.floor((e-1e3*t)*hd);return new he(t,s)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new M(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new M(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<ud)throw new M(b.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new M(b.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/hd}_compareTo(e){return this.seconds===e.seconds?Y(this.nanoseconds,e.nanoseconds):Y(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:he._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Hi(e,he._jsonSchema))return new he(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-ud;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}he._jsonSchemaVersion="firestore/timestamp/1.0",he._jsonSchema={type:Ie("string",he._jsonSchemaVersion),seconds:Ie("number"),nanoseconds:Ie("number")};/**
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
 */class W{static fromTimestamp(e){return new W(e)}static min(){return new W(new he(0,0))}static max(){return new W(new he(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const Ci=-1;function pT(n,e){const t=n.toTimestamp().seconds,s=n.toTimestamp().nanoseconds+1,i=W.fromTimestamp(s===1e9?new he(t+1,0):new he(t,s));return new ln(i,L.empty(),e)}function _T(n){return new ln(n.readTime,n.key,Ci)}class ln{constructor(e,t,s){this.readTime=e,this.documentKey=t,this.largestBatchId=s}static min(){return new ln(W.min(),L.empty(),Ci)}static max(){return new ln(W.max(),L.empty(),Ci)}}function mT(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=L.comparator(n.documentKey,e.documentKey),t!==0?t:Y(n.largestBatchId,e.largestBatchId))}/**
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
 */const gT="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class yT{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */function bs(n){return y(this,null,function*(){if(n.code!==b.FAILED_PRECONDITION||n.message!==gT)throw n;x("LocalStore","Unexpectedly lost primary lease")})}/**
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
 */class N{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&U(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new N((s,i)=>{this.nextCallback=r=>{this.wrapSuccess(e,r).next(s,i)},this.catchCallback=r=>{this.wrapFailure(t,r).next(s,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof N?t:N.resolve(t)}catch(t){return N.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):N.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):N.reject(t)}static resolve(e){return new N((t,s)=>{t(e)})}static reject(e){return new N((t,s)=>{s(e)})}static waitFor(e){return new N((t,s)=>{let i=0,r=0,o=!1;e.forEach(c=>{++i,c.next(()=>{++r,o&&r===i&&t()},l=>s(l))}),o=!0,r===i&&t()})}static or(e){let t=N.resolve(!1);for(const s of e)t=t.next(i=>i?N.resolve(i):s());return t}static forEach(e,t){const s=[];return e.forEach((i,r)=>{s.push(t.call(this,i,r))}),this.waitFor(s)}static mapArray(e,t){return new N((s,i)=>{const r=e.length,o=new Array(r);let c=0;for(let l=0;l<r;l++){const h=l;t(e[h]).next(f=>{o[h]=f,++c,c===r&&s(o)},f=>i(f))}})}static doWhile(e,t){return new N((s,i)=>{const r=()=>{e()===!0?t().next(()=>{r()},i):s()};r()})}}function ET(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Ns(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class Uo{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=s=>this.ae(s),this.ue=s=>t.writeSequenceNumber(s))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Uo.ce=-1;/**
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
 */const ol=-1;function Bo(n){return n==null}function io(n){return n===0&&1/n==-1/0}function vT(n){return typeof n=="number"&&Number.isInteger(n)&&!io(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */const zp="";function IT(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=dd(e)),e=TT(n.get(t),e);return dd(e)}function TT(n,e){let t=e;const s=n.length;for(let i=0;i<s;i++){const r=n.charAt(i);switch(r){case"\0":t+="";break;case zp:t+="";break;default:t+=r}}return t}function dd(n){return n+zp+""}/**
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
 */function fd(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function yn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Gp(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
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
 */let Te=class fc{constructor(e,t){this.comparator=e,this.root=t||sn.EMPTY}insert(e,t){return new fc(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,sn.BLACK,null,null))}remove(e){return new fc(this.comparator,this.root.remove(e,this.comparator).copy(null,null,sn.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const s=this.comparator(e,t.key);if(s===0)return t.value;s<0?t=t.left:s>0&&(t=t.right)}return null}indexOf(e){let t=0,s=this.root;for(;!s.isEmpty();){const i=this.comparator(e,s.key);if(i===0)return t+s.left.size;i<0?s=s.left:(t+=s.left.size+1,s=s.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,s)=>(e(t,s),!1))}toString(){const e=[];return this.inorderTraversal((t,s)=>(e.push(`${t}:${s}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new br(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new br(this.root,e,this.comparator,!1)}getReverseIterator(){return new br(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new br(this.root,e,this.comparator,!0)}},br=class{constructor(e,t,s,i){this.isReverse=i,this.nodeStack=[];let r=1;for(;!e.isEmpty();)if(r=t?s(e.key,t):1,t&&i&&(r*=-1),r<0)e=this.isReverse?e.left:e.right;else{if(r===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},sn=class St{constructor(e,t,s,i,r){this.key=e,this.value=t,this.color=s!=null?s:St.RED,this.left=i!=null?i:St.EMPTY,this.right=r!=null?r:St.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,s,i,r){return new St(e!=null?e:this.key,t!=null?t:this.value,s!=null?s:this.color,i!=null?i:this.left,r!=null?r:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,s){let i=this;const r=s(e,i.key);return i=r<0?i.copy(null,null,null,i.left.insert(e,t,s),null):r===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,s)),i.fixUp()}removeMin(){if(this.left.isEmpty())return St.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let s,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return St.EMPTY;s=i.right.min(),i=i.copy(s.key,s.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,St.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,St.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw U(43730,{key:this.key,value:this.value});if(this.right.isRed())throw U(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw U(27949);return e+(this.isRed()?0:1)}};sn.EMPTY=null,sn.RED=!0,sn.BLACK=!1;sn.EMPTY=new class{constructor(){this.size=0}get key(){throw U(57766)}get value(){throw U(16141)}get color(){throw U(16727)}get left(){throw U(29726)}get right(){throw U(36894)}copy(e,t,s,i,r){return this}insert(e,t,s){return new sn(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class we{constructor(e){this.comparator=e,this.data=new Te(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,s)=>(e(t),!1))}forEachInRange(e,t){const s=this.data.getIteratorFrom(e[0]);for(;s.hasNext();){const i=s.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let s;for(s=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();s.hasNext();)if(!e(s.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new pd(this.data.getIterator())}getIteratorFrom(e){return new pd(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(s=>{t=t.add(s)}),t}isEqual(e){if(!(e instanceof we)||this.size!==e.size)return!1;const t=this.data.getIterator(),s=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,r=s.getNext().key;if(this.comparator(i,r)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new we(this.comparator);return t.data=e,t}}class pd{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class Je{constructor(e){this.fields=e,e.sort(Ne.comparator)}static empty(){return new Je([])}unionWith(e){let t=new we(Ne.comparator);for(const s of this.fields)t=t.add(s);for(const s of e)t=t.add(s);return new Je(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return ms(this.fields,e.fields,(t,s)=>t.isEqual(s))}}/**
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
 */class Kp extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class ke{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(i){try{return atob(i)}catch(r){throw typeof DOMException!="undefined"&&r instanceof DOMException?new Kp("Invalid base64 string: "+r):r}}(e);return new ke(t)}static fromUint8Array(e){const t=function(i){let r="";for(let o=0;o<i.length;++o)r+=String.fromCharCode(i[o]);return r}(e);return new ke(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const s=new Uint8Array(t.length);for(let i=0;i<t.length;i++)s[i]=t.charCodeAt(i);return s}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Y(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ke.EMPTY_BYTE_STRING=new ke("");const wT=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function un(n){if(ne(!!n,39018),typeof n=="string"){let e=0;const t=wT.exec(n);if(ne(!!t,46558,{timestamp:n}),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const s=new Date(n);return{seconds:Math.floor(s.getTime()/1e3),nanos:e}}return{seconds:_e(n.seconds),nanos:_e(n.nanos)}}function _e(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function hn(n){return typeof n=="string"?ke.fromBase64String(n):ke.fromUint8Array(n)}/**
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
 */const Qp="server_timestamp",Yp="__type__",Xp="__previous_value__",Jp="__local_write_time__";function al(n){var t,s;return((s=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[Yp])==null?void 0:s.stringValue)===Qp}function qo(n){const e=n.mapValue.fields[Xp];return al(e)?qo(e):e}function Ai(n){const e=un(n.mapValue.fields[Jp].timestampValue);return new he(e.seconds,e.nanos)}/**
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
 */class CT{constructor(e,t,s,i,r,o,c,l,h,f){this.databaseId=e,this.appId=t,this.persistenceKey=s,this.host=i,this.ssl=r,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=h,this.isUsingEmulator=f}}const ro="(default)";class Ri{constructor(e,t){this.projectId=e,this.database=t||ro}static empty(){return new Ri("","")}get isDefaultDatabase(){return this.database===ro}isEqual(e){return e instanceof Ri&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const Zp="__type__",AT="__max__",Nr={mapValue:{}},e_="__vector__",oo="value";function dn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?al(n)?4:ST(n)?9007199254740991:RT(n)?10:11:U(28295,{value:n})}function yt(n,e){if(n===e)return!0;const t=dn(n);if(t!==dn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Ai(n).isEqual(Ai(e));case 3:return function(i,r){if(typeof i.timestampValue=="string"&&typeof r.timestampValue=="string"&&i.timestampValue.length===r.timestampValue.length)return i.timestampValue===r.timestampValue;const o=un(i.timestampValue),c=un(r.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,r){return hn(i.bytesValue).isEqual(hn(r.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,r){return _e(i.geoPointValue.latitude)===_e(r.geoPointValue.latitude)&&_e(i.geoPointValue.longitude)===_e(r.geoPointValue.longitude)}(n,e);case 2:return function(i,r){if("integerValue"in i&&"integerValue"in r)return _e(i.integerValue)===_e(r.integerValue);if("doubleValue"in i&&"doubleValue"in r){const o=_e(i.doubleValue),c=_e(r.doubleValue);return o===c?io(o)===io(c):isNaN(o)&&isNaN(c)}return!1}(n,e);case 9:return ms(n.arrayValue.values||[],e.arrayValue.values||[],yt);case 10:case 11:return function(i,r){const o=i.mapValue.fields||{},c=r.mapValue.fields||{};if(fd(o)!==fd(c))return!1;for(const l in o)if(o.hasOwnProperty(l)&&(c[l]===void 0||!yt(o[l],c[l])))return!1;return!0}(n,e);default:return U(52216,{left:n})}}function Si(n,e){return(n.values||[]).find(t=>yt(t,e))!==void 0}function gs(n,e){if(n===e)return 0;const t=dn(n),s=dn(e);if(t!==s)return Y(t,s);switch(t){case 0:case 9007199254740991:return 0;case 1:return Y(n.booleanValue,e.booleanValue);case 2:return function(r,o){const c=_e(r.integerValue||r.doubleValue),l=_e(o.integerValue||o.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1}(n,e);case 3:return _d(n.timestampValue,e.timestampValue);case 4:return _d(Ai(n),Ai(e));case 5:return dc(n.stringValue,e.stringValue);case 6:return function(r,o){const c=hn(r),l=hn(o);return c.compareTo(l)}(n.bytesValue,e.bytesValue);case 7:return function(r,o){const c=r.split("/"),l=o.split("/");for(let h=0;h<c.length&&h<l.length;h++){const f=Y(c[h],l[h]);if(f!==0)return f}return Y(c.length,l.length)}(n.referenceValue,e.referenceValue);case 8:return function(r,o){const c=Y(_e(r.latitude),_e(o.latitude));return c!==0?c:Y(_e(r.longitude),_e(o.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return md(n.arrayValue,e.arrayValue);case 10:return function(r,o){var _,T,S,D;const c=r.fields||{},l=o.fields||{},h=(_=c[oo])==null?void 0:_.arrayValue,f=(T=l[oo])==null?void 0:T.arrayValue,p=Y(((S=h==null?void 0:h.values)==null?void 0:S.length)||0,((D=f==null?void 0:f.values)==null?void 0:D.length)||0);return p!==0?p:md(h,f)}(n.mapValue,e.mapValue);case 11:return function(r,o){if(r===Nr.mapValue&&o===Nr.mapValue)return 0;if(r===Nr.mapValue)return 1;if(o===Nr.mapValue)return-1;const c=r.fields||{},l=Object.keys(c),h=o.fields||{},f=Object.keys(h);l.sort(),f.sort();for(let p=0;p<l.length&&p<f.length;++p){const _=dc(l[p],f[p]);if(_!==0)return _;const T=gs(c[l[p]],h[f[p]]);if(T!==0)return T}return Y(l.length,f.length)}(n.mapValue,e.mapValue);default:throw U(23264,{he:t})}}function _d(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return Y(n,e);const t=un(n),s=un(e),i=Y(t.seconds,s.seconds);return i!==0?i:Y(t.nanos,s.nanos)}function md(n,e){const t=n.values||[],s=e.values||[];for(let i=0;i<t.length&&i<s.length;++i){const r=gs(t[i],s[i]);if(r)return r}return Y(t.length,s.length)}function ys(n){return pc(n)}function pc(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const s=un(t);return`time(${s.seconds},${s.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return hn(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return L.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let s="[",i=!0;for(const r of t.values||[])i?i=!1:s+=",",s+=pc(r);return s+"]"}(n.arrayValue):"mapValue"in n?function(t){const s=Object.keys(t.fields||{}).sort();let i="{",r=!0;for(const o of s)r?r=!1:i+=",",i+=`${o}:${pc(t.fields[o])}`;return i+"}"}(n.mapValue):U(61005,{value:n})}function Br(n){switch(dn(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=qo(n);return e?16+Br(e):16;case 5:return 2*n.stringValue.length;case 6:return hn(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(s){return(s.values||[]).reduce((i,r)=>i+Br(r),0)}(n.arrayValue);case 10:case 11:return function(s){let i=0;return yn(s.fields,(r,o)=>{i+=r.length+Br(o)}),i}(n.mapValue);default:throw U(13486,{value:n})}}function gd(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function _c(n){return!!n&&"integerValue"in n}function cl(n){return!!n&&"arrayValue"in n}function yd(n){return!!n&&"nullValue"in n}function Ed(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function qr(n){return!!n&&"mapValue"in n}function RT(n){var t,s;return((s=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[Zp])==null?void 0:s.stringValue)===e_}function di(n){if(n.geoPointValue)return{geoPointValue:ee({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:ee({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return yn(n.mapValue.fields,(t,s)=>e.mapValue.fields[t]=di(s)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=di(n.arrayValue.values[t]);return e}return ee({},n)}function ST(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===AT}/**
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
 */class Ge{constructor(e){this.value=e}static empty(){return new Ge({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let s=0;s<e.length-1;++s)if(t=(t.mapValue.fields||{})[e.get(s)],!qr(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=di(t)}setAll(e){let t=Ne.emptyPath(),s={},i=[];e.forEach((o,c)=>{if(!t.isImmediateParentOf(c)){const l=this.getFieldsMap(t);this.applyChanges(l,s,i),s={},i=[],t=c.popLast()}o?s[c.lastSegment()]=di(o):i.push(c.lastSegment())});const r=this.getFieldsMap(t);this.applyChanges(r,s,i)}delete(e){const t=this.field(e.popLast());qr(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return yt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let s=0;s<e.length;++s){let i=t.mapValue.fields[e.get(s)];qr(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(s)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,s){yn(t,(i,r)=>e[i]=r);for(const i of s)delete e[i]}clone(){return new Ge(di(this.value))}}function t_(n){const e=[];return yn(n.fields,(t,s)=>{const i=new Ne([t]);if(qr(s)){const r=t_(s.mapValue).fields;if(r.length===0)e.push(i);else for(const o of r)e.push(i.child(o))}else e.push(i)}),new Je(e)}/**
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
 */class Fe{constructor(e,t,s,i,r,o,c){this.key=e,this.documentType=t,this.version=s,this.readTime=i,this.createTime=r,this.data=o,this.documentState=c}static newInvalidDocument(e){return new Fe(e,0,W.min(),W.min(),W.min(),Ge.empty(),0)}static newFoundDocument(e,t,s,i){return new Fe(e,1,t,W.min(),s,i,0)}static newNoDocument(e,t){return new Fe(e,2,t,W.min(),W.min(),Ge.empty(),0)}static newUnknownDocument(e,t){return new Fe(e,3,t,W.min(),W.min(),Ge.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(W.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Ge.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Ge.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=W.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Fe&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Fe(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class ao{constructor(e,t){this.position=e,this.inclusive=t}}function vd(n,e,t){let s=0;for(let i=0;i<n.position.length;i++){const r=e[i],o=n.position[i];if(r.field.isKeyField()?s=L.comparator(L.fromName(o.referenceValue),t.key):s=gs(o,t.data.field(r.field)),r.dir==="desc"&&(s*=-1),s!==0)break}return s}function Id(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!yt(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class Pi{constructor(e,t="asc"){this.field=e,this.dir=t}}function PT(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class n_{}class ve extends n_{constructor(e,t,s){super(),this.field=e,this.op=t,this.value=s}static create(e,t,s){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,s):new NT(e,t,s):t==="array-contains"?new OT(e,s):t==="in"?new VT(e,s):t==="not-in"?new MT(e,s):t==="array-contains-any"?new xT(e,s):new ve(e,t,s)}static createKeyFieldInFilter(e,t,s){return t==="in"?new kT(e,s):new DT(e,s)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(gs(t,this.value)):t!==null&&dn(this.value)===dn(t)&&this.matchesComparison(gs(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return U(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class lt extends n_{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new lt(e,t)}matches(e){return s_(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function s_(n){return n.op==="and"}function i_(n){return bT(n)&&s_(n)}function bT(n){for(const e of n.filters)if(e instanceof lt)return!1;return!0}function mc(n){if(n instanceof ve)return n.field.canonicalString()+n.op.toString()+ys(n.value);if(i_(n))return n.filters.map(e=>mc(e)).join(",");{const e=n.filters.map(t=>mc(t)).join(",");return`${n.op}(${e})`}}function r_(n,e){return n instanceof ve?function(s,i){return i instanceof ve&&s.op===i.op&&s.field.isEqual(i.field)&&yt(s.value,i.value)}(n,e):n instanceof lt?function(s,i){return i instanceof lt&&s.op===i.op&&s.filters.length===i.filters.length?s.filters.reduce((r,o,c)=>r&&r_(o,i.filters[c]),!0):!1}(n,e):void U(19439)}function o_(n){return n instanceof ve?function(t){return`${t.field.canonicalString()} ${t.op} ${ys(t.value)}`}(n):n instanceof lt?function(t){return t.op.toString()+" {"+t.getFilters().map(o_).join(" ,")+"}"}(n):"Filter"}class NT extends ve{constructor(e,t,s){super(e,t,s),this.key=L.fromName(s.referenceValue)}matches(e){const t=L.comparator(e.key,this.key);return this.matchesComparison(t)}}class kT extends ve{constructor(e,t){super(e,"in",t),this.keys=a_("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class DT extends ve{constructor(e,t){super(e,"not-in",t),this.keys=a_("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function a_(n,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map(s=>L.fromName(s.referenceValue))}class OT extends ve{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return cl(t)&&Si(t.arrayValue,this.value)}}class VT extends ve{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Si(this.value.arrayValue,t)}}class MT extends ve{constructor(e,t){super(e,"not-in",t)}matches(e){if(Si(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Si(this.value.arrayValue,t)}}class xT extends ve{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!cl(t)||!t.arrayValue.values)&&t.arrayValue.values.some(s=>Si(this.value.arrayValue,s))}}/**
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
 */class LT{constructor(e,t=null,s=[],i=[],r=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=s,this.filters=i,this.limit=r,this.startAt=o,this.endAt=c,this.Te=null}}function Td(n,e=null,t=[],s=[],i=null,r=null,o=null){return new LT(n,e,t,s,i,r,o)}function ll(n){const e=j(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(s=>mc(s)).join(","),t+="|ob:",t+=e.orderBy.map(s=>function(r){return r.field.canonicalString()+r.dir}(s)).join(","),Bo(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(s=>ys(s)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(s=>ys(s)).join(",")),e.Te=t}return e.Te}function ul(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!PT(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!r_(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Id(n.startAt,e.startAt)&&Id(n.endAt,e.endAt)}function gc(n){return L.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
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
 */class ks{constructor(e,t=null,s=[],i=[],r=null,o="F",c=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=s,this.filters=i,this.limit=r,this.limitType=o,this.startAt=c,this.endAt=l,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function FT(n,e,t,s,i,r,o,c){return new ks(n,e,t,s,i,r,o,c)}function Wo(n){return new ks(n)}function wd(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function c_(n){return n.collectionGroup!==null}function fi(n){const e=j(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const r of e.explicitOrderBy)e.Ie.push(r),t.add(r.field.canonicalString());const s=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new we(Ne.comparator);return o.filters.forEach(l=>{l.getFlattenedFilters().forEach(h=>{h.isInequality()&&(c=c.add(h.field))})}),c})(e).forEach(r=>{t.has(r.canonicalString())||r.isKeyField()||e.Ie.push(new Pi(r,s))}),t.has(Ne.keyField().canonicalString())||e.Ie.push(new Pi(Ne.keyField(),s))}return e.Ie}function pt(n){const e=j(n);return e.Ee||(e.Ee=UT(e,fi(n))),e.Ee}function UT(n,e){if(n.limitType==="F")return Td(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{const r=i.dir==="desc"?"asc":"desc";return new Pi(i.field,r)});const t=n.endAt?new ao(n.endAt.position,n.endAt.inclusive):null,s=n.startAt?new ao(n.startAt.position,n.startAt.inclusive):null;return Td(n.path,n.collectionGroup,e,n.filters,n.limit,t,s)}}function yc(n,e){const t=n.filters.concat([e]);return new ks(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function co(n,e,t){return new ks(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function jo(n,e){return ul(pt(n),pt(e))&&n.limitType===e.limitType}function l_(n){return`${ll(pt(n))}|lt:${n.limitType}`}function es(n){return`Query(target=${function(t){let s=t.path.canonicalString();return t.collectionGroup!==null&&(s+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(s+=`, filters: [${t.filters.map(i=>o_(i)).join(", ")}]`),Bo(t.limit)||(s+=", limit: "+t.limit),t.orderBy.length>0&&(s+=`, orderBy: [${t.orderBy.map(i=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(i)).join(", ")}]`),t.startAt&&(s+=", startAt: ",s+=t.startAt.inclusive?"b:":"a:",s+=t.startAt.position.map(i=>ys(i)).join(",")),t.endAt&&(s+=", endAt: ",s+=t.endAt.inclusive?"a:":"b:",s+=t.endAt.position.map(i=>ys(i)).join(",")),`Target(${s})`}(pt(n))}; limitType=${n.limitType})`}function $o(n,e){return e.isFoundDocument()&&function(s,i){const r=i.key.path;return s.collectionGroup!==null?i.key.hasCollectionId(s.collectionGroup)&&s.path.isPrefixOf(r):L.isDocumentKey(s.path)?s.path.isEqual(r):s.path.isImmediateParentOf(r)}(n,e)&&function(s,i){for(const r of fi(s))if(!r.field.isKeyField()&&i.data.field(r.field)===null)return!1;return!0}(n,e)&&function(s,i){for(const r of s.filters)if(!r.matches(i))return!1;return!0}(n,e)&&function(s,i){return!(s.startAt&&!function(o,c,l){const h=vd(o,c,l);return o.inclusive?h<=0:h<0}(s.startAt,fi(s),i)||s.endAt&&!function(o,c,l){const h=vd(o,c,l);return o.inclusive?h>=0:h>0}(s.endAt,fi(s),i))}(n,e)}function BT(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function u_(n){return(e,t)=>{let s=!1;for(const i of fi(n)){const r=qT(i,e,t);if(r!==0)return r;s=s||i.field.isKeyField()}return 0}}function qT(n,e,t){const s=n.field.isKeyField()?L.comparator(e.key,t.key):function(r,o,c){const l=o.data.field(r),h=c.data.field(r);return l!==null&&h!==null?gs(l,h):U(42886)}(n.field,e,t);switch(n.dir){case"asc":return s;case"desc":return-1*s;default:return U(19790,{direction:n.dir})}}/**
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
 */class $n{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),s=this.inner[t];if(s!==void 0){for(const[i,r]of s)if(this.equalsFn(i,e))return r}}has(e){return this.get(e)!==void 0}set(e,t){const s=this.mapKeyFn(e),i=this.inner[s];if(i===void 0)return this.inner[s]=[[e,t]],void this.innerSize++;for(let r=0;r<i.length;r++)if(this.equalsFn(i[r][0],e))return void(i[r]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),s=this.inner[t];if(s===void 0)return!1;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return s.length===1?delete this.inner[t]:s.splice(i,1),this.innerSize--,!0;return!1}forEach(e){yn(this.inner,(t,s)=>{for(const[i,r]of s)e(i,r)})}isEmpty(){return Gp(this.inner)}size(){return this.innerSize}}/**
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
 */const WT=new Te(L.comparator);function Ft(){return WT}const h_=new Te(L.comparator);function oi(...n){let e=h_;for(const t of n)e=e.insert(t.key,t);return e}function d_(n){let e=h_;return n.forEach((t,s)=>e=e.insert(t,s.overlayedDocument)),e}function bn(){return pi()}function f_(){return pi()}function pi(){return new $n(n=>n.toString(),(n,e)=>n.isEqual(e))}const jT=new Te(L.comparator),$T=new we(L.comparator);function X(...n){let e=$T;for(const t of n)e=e.add(t);return e}const HT=new we(Y);function zT(){return HT}/**
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
 */function hl(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:io(e)?"-0":e}}function p_(n){return{integerValue:""+n}}function GT(n,e){return vT(e)?p_(e):hl(n,e)}/**
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
 */class Ho{constructor(){this._=void 0}}function KT(n,e,t){return n instanceof bi?function(i,r){const o={fields:{[Yp]:{stringValue:Qp},[Jp]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return r&&al(r)&&(r=qo(r)),r&&(o.fields[Xp]=r),{mapValue:o}}(t,e):n instanceof Ni?m_(n,e):n instanceof ki?g_(n,e):function(i,r){const o=__(i,r),c=Cd(o)+Cd(i.Ae);return _c(o)&&_c(i.Ae)?p_(c):hl(i.serializer,c)}(n,e)}function QT(n,e,t){return n instanceof Ni?m_(n,e):n instanceof ki?g_(n,e):t}function __(n,e){return n instanceof lo?function(s){return _c(s)||function(r){return!!r&&"doubleValue"in r}(s)}(e)?e:{integerValue:0}:null}class bi extends Ho{}class Ni extends Ho{constructor(e){super(),this.elements=e}}function m_(n,e){const t=y_(e);for(const s of n.elements)t.some(i=>yt(i,s))||t.push(s);return{arrayValue:{values:t}}}class ki extends Ho{constructor(e){super(),this.elements=e}}function g_(n,e){let t=y_(e);for(const s of n.elements)t=t.filter(i=>!yt(i,s));return{arrayValue:{values:t}}}class lo extends Ho{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function Cd(n){return _e(n.integerValue||n.doubleValue)}function y_(n){return cl(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
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
 */class YT{constructor(e,t){this.field=e,this.transform=t}}function XT(n,e){return n.field.isEqual(e.field)&&function(s,i){return s instanceof Ni&&i instanceof Ni||s instanceof ki&&i instanceof ki?ms(s.elements,i.elements,yt):s instanceof lo&&i instanceof lo?yt(s.Ae,i.Ae):s instanceof bi&&i instanceof bi}(n.transform,e.transform)}class JT{constructor(e,t){this.version=e,this.transformResults=t}}class He{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new He}static exists(e){return new He(void 0,e)}static updateTime(e){return new He(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Wr(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class zo{}function E_(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Go(n.key,He.none()):new zi(n.key,n.data,He.none());{const t=n.data,s=Ge.empty();let i=new we(Ne.comparator);for(let r of e.fields)if(!i.has(r)){let o=t.field(r);o===null&&r.length>1&&(r=r.popLast(),o=t.field(r)),o===null?s.delete(r):s.set(r,o),i=i.add(r)}return new En(n.key,s,new Je(i.toArray()),He.none())}}function ZT(n,e,t){n instanceof zi?function(i,r,o){const c=i.value.clone(),l=Rd(i.fieldTransforms,r,o.transformResults);c.setAll(l),r.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(n,e,t):n instanceof En?function(i,r,o){if(!Wr(i.precondition,r))return void r.convertToUnknownDocument(o.version);const c=Rd(i.fieldTransforms,r,o.transformResults),l=r.data;l.setAll(v_(i)),l.setAll(c),r.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(n,e,t):function(i,r,o){r.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function _i(n,e,t,s){return n instanceof zi?function(r,o,c,l){if(!Wr(r.precondition,o))return c;const h=r.value.clone(),f=Sd(r.fieldTransforms,l,o);return h.setAll(f),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null}(n,e,t,s):n instanceof En?function(r,o,c,l){if(!Wr(r.precondition,o))return c;const h=Sd(r.fieldTransforms,l,o),f=o.data;return f.setAll(v_(r)),f.setAll(h),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),c===null?null:c.unionWith(r.fieldMask.fields).unionWith(r.fieldTransforms.map(p=>p.field))}(n,e,t,s):function(r,o,c){return Wr(r.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c}(n,e,t)}function ew(n,e){let t=null;for(const s of n.fieldTransforms){const i=e.data.field(s.field),r=__(s.transform,i||null);r!=null&&(t===null&&(t=Ge.empty()),t.set(s.field,r))}return t||null}function Ad(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(s,i){return s===void 0&&i===void 0||!(!s||!i)&&ms(s,i,(r,o)=>XT(r,o))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class zi extends zo{constructor(e,t,s,i=[]){super(),this.key=e,this.value=t,this.precondition=s,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class En extends zo{constructor(e,t,s,i,r=[]){super(),this.key=e,this.data=t,this.fieldMask=s,this.precondition=i,this.fieldTransforms=r,this.type=1}getFieldMask(){return this.fieldMask}}function v_(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const s=n.data.field(t);e.set(t,s)}}),e}function Rd(n,e,t){const s=new Map;ne(n.length===t.length,32656,{Re:t.length,Ve:n.length});for(let i=0;i<t.length;i++){const r=n[i],o=r.transform,c=e.data.field(r.field);s.set(r.field,QT(o,c,t[i]))}return s}function Sd(n,e,t){const s=new Map;for(const i of n){const r=i.transform,o=t.data.field(i.field);s.set(i.field,KT(r,o,e))}return s}class Go extends zo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class tw extends zo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class nw{constructor(e,t,s,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=s,this.mutations=i}applyToRemoteDocument(e,t){const s=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const r=this.mutations[i];r.key.isEqual(e.key)&&ZT(r,e,s[i])}}applyToLocalView(e,t){for(const s of this.baseMutations)s.key.isEqual(e.key)&&(t=_i(s,e,t,this.localWriteTime));for(const s of this.mutations)s.key.isEqual(e.key)&&(t=_i(s,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const s=f_();return this.mutations.forEach(i=>{const r=e.get(i.key),o=r.overlayedDocument;let c=this.applyToLocalView(o,r.mutatedFields);c=t.has(i.key)?null:c;const l=E_(o,c);l!==null&&s.set(i.key,l),o.isValidDocument()||o.convertToNoDocument(W.min())}),s}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),X())}isEqual(e){return this.batchId===e.batchId&&ms(this.mutations,e.mutations,(t,s)=>Ad(t,s))&&ms(this.baseMutations,e.baseMutations,(t,s)=>Ad(t,s))}}class dl{constructor(e,t,s,i){this.batch=e,this.commitVersion=t,this.mutationResults=s,this.docVersions=i}static from(e,t,s){ne(e.mutations.length===s.length,58842,{me:e.mutations.length,fe:s.length});let i=function(){return jT}();const r=e.mutations;for(let o=0;o<r.length;o++)i=i.insert(r[o].key,s[o].version);return new dl(e,t,s,i)}}/**
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
 */class sw{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class iw{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
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
 */var ye,J;function rw(n){switch(n){case b.OK:return U(64938);case b.CANCELLED:case b.UNKNOWN:case b.DEADLINE_EXCEEDED:case b.RESOURCE_EXHAUSTED:case b.INTERNAL:case b.UNAVAILABLE:case b.UNAUTHENTICATED:return!1;case b.INVALID_ARGUMENT:case b.NOT_FOUND:case b.ALREADY_EXISTS:case b.PERMISSION_DENIED:case b.FAILED_PRECONDITION:case b.ABORTED:case b.OUT_OF_RANGE:case b.UNIMPLEMENTED:case b.DATA_LOSS:return!0;default:return U(15467,{code:n})}}function I_(n){if(n===void 0)return Lt("GRPC error has no .code"),b.UNKNOWN;switch(n){case ye.OK:return b.OK;case ye.CANCELLED:return b.CANCELLED;case ye.UNKNOWN:return b.UNKNOWN;case ye.DEADLINE_EXCEEDED:return b.DEADLINE_EXCEEDED;case ye.RESOURCE_EXHAUSTED:return b.RESOURCE_EXHAUSTED;case ye.INTERNAL:return b.INTERNAL;case ye.UNAVAILABLE:return b.UNAVAILABLE;case ye.UNAUTHENTICATED:return b.UNAUTHENTICATED;case ye.INVALID_ARGUMENT:return b.INVALID_ARGUMENT;case ye.NOT_FOUND:return b.NOT_FOUND;case ye.ALREADY_EXISTS:return b.ALREADY_EXISTS;case ye.PERMISSION_DENIED:return b.PERMISSION_DENIED;case ye.FAILED_PRECONDITION:return b.FAILED_PRECONDITION;case ye.ABORTED:return b.ABORTED;case ye.OUT_OF_RANGE:return b.OUT_OF_RANGE;case ye.UNIMPLEMENTED:return b.UNIMPLEMENTED;case ye.DATA_LOSS:return b.DATA_LOSS;default:return U(39323,{code:n})}}(J=ye||(ye={}))[J.OK=0]="OK",J[J.CANCELLED=1]="CANCELLED",J[J.UNKNOWN=2]="UNKNOWN",J[J.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",J[J.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",J[J.NOT_FOUND=5]="NOT_FOUND",J[J.ALREADY_EXISTS=6]="ALREADY_EXISTS",J[J.PERMISSION_DENIED=7]="PERMISSION_DENIED",J[J.UNAUTHENTICATED=16]="UNAUTHENTICATED",J[J.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",J[J.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",J[J.ABORTED=10]="ABORTED",J[J.OUT_OF_RANGE=11]="OUT_OF_RANGE",J[J.UNIMPLEMENTED=12]="UNIMPLEMENTED",J[J.INTERNAL=13]="INTERNAL",J[J.UNAVAILABLE=14]="UNAVAILABLE",J[J.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function ow(){return new TextEncoder}/**
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
 */const aw=new nn([4294967295,4294967295],0);function Pd(n){const e=ow().encode(n),t=new xp;return t.update(e),new Uint8Array(t.digest())}function bd(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),s=e.getUint32(4,!0),i=e.getUint32(8,!0),r=e.getUint32(12,!0);return[new nn([t,s],0),new nn([i,r],0)]}class fl{constructor(e,t,s){if(this.bitmap=e,this.padding=t,this.hashCount=s,t<0||t>=8)throw new ai(`Invalid padding: ${t}`);if(s<0)throw new ai(`Invalid hash count: ${s}`);if(e.length>0&&this.hashCount===0)throw new ai(`Invalid hash count: ${s}`);if(e.length===0&&t!==0)throw new ai(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=nn.fromNumber(this.ge)}ye(e,t,s){let i=e.add(t.multiply(nn.fromNumber(s)));return i.compare(aw)===1&&(i=new nn([i.getBits(0),i.getBits(1)],0)),i.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=Pd(e),[s,i]=bd(t);for(let r=0;r<this.hashCount;r++){const o=this.ye(s,i,r);if(!this.we(o))return!1}return!0}static create(e,t,s){const i=e%8==0?0:8-e%8,r=new Uint8Array(Math.ceil(e/8)),o=new fl(r,i,t);return s.forEach(c=>o.insert(c)),o}insert(e){if(this.ge===0)return;const t=Pd(e),[s,i]=bd(t);for(let r=0;r<this.hashCount;r++){const o=this.ye(s,i,r);this.Se(o)}}Se(e){const t=Math.floor(e/8),s=e%8;this.bitmap[t]|=1<<s}}class ai extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class Ko{constructor(e,t,s,i,r){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=s,this.documentUpdates=i,this.resolvedLimboDocuments=r}static createSynthesizedRemoteEventForCurrentChange(e,t,s){const i=new Map;return i.set(e,Gi.createSynthesizedTargetChangeForCurrentChange(e,t,s)),new Ko(W.min(),i,new Te(Y),Ft(),X())}}class Gi{constructor(e,t,s,i,r){this.resumeToken=e,this.current=t,this.addedDocuments=s,this.modifiedDocuments=i,this.removedDocuments=r}static createSynthesizedTargetChangeForCurrentChange(e,t,s){return new Gi(s,t,X(),X(),X())}}/**
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
 */class jr{constructor(e,t,s,i){this.be=e,this.removedTargetIds=t,this.key=s,this.De=i}}class T_{constructor(e,t){this.targetId=e,this.Ce=t}}class w_{constructor(e,t,s=ke.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=s,this.cause=i}}class Nd{constructor(){this.ve=0,this.Fe=kd(),this.Me=ke.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=X(),t=X(),s=X();return this.Fe.forEach((i,r)=>{switch(r){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:s=s.add(i);break;default:U(38017,{changeType:r})}}),new Gi(this.Me,this.xe,e,t,s)}qe(){this.Oe=!1,this.Fe=kd()}Qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,ne(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class cw{constructor(e){this.Ge=e,this.ze=new Map,this.je=Ft(),this.Je=kr(),this.He=kr(),this.Ye=new Te(Y)}Ze(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Xe(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{const s=this.nt(t);switch(e.state){case 0:this.rt(t)&&s.Le(e.resumeToken);break;case 1:s.Ke(),s.Ne||s.qe(),s.Le(e.resumeToken);break;case 2:s.Ke(),s.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(s.We(),s.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),s.Le(e.resumeToken));break;default:U(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((s,i)=>{this.rt(i)&&t(i)})}st(e){const t=e.targetId,s=e.Ce.count,i=this.ot(t);if(i){const r=i.target;if(gc(r))if(s===0){const o=new L(r.path);this.et(t,o,Fe.newNoDocument(o,W.min()))}else ne(s===1,20013,{expectedCount:s});else{const o=this._t(t);if(o!==s){const c=this.ut(e),l=c?this.ct(c,e,o):1;if(l!==0){this.it(t);const h=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(t,h)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:s="",padding:i=0},hashCount:r=0}=t;let o,c;try{o=hn(s).toUint8Array()}catch(l){if(l instanceof Kp)return _s("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new fl(o,i,r)}catch(l){return _s(l instanceof ai?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.ge===0?null:c}ct(e,t,s){return t.Ce.count===s-this.Pt(e,t.targetId)?0:2}Pt(e,t){const s=this.Ge.getRemoteKeysForTarget(t);let i=0;return s.forEach(r=>{const o=this.Ge.ht(),c=`projects/${o.projectId}/databases/${o.database}/documents/${r.path.canonicalString()}`;e.mightContain(c)||(this.et(t,r,null),i++)}),i}Tt(e){const t=new Map;this.ze.forEach((r,o)=>{const c=this.ot(o);if(c){if(r.current&&gc(c.target)){const l=new L(c.target.path);this.It(l).has(o)||this.Et(o,l)||this.et(o,l,Fe.newNoDocument(l,e))}r.Be&&(t.set(o,r.ke()),r.qe())}});let s=X();this.He.forEach((r,o)=>{let c=!0;o.forEachWhile(l=>{const h=this.ot(l);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(s=s.add(r))}),this.je.forEach((r,o)=>o.setReadTime(e));const i=new Ko(e,t,this.Ye,this.je,s);return this.je=Ft(),this.Je=kr(),this.He=kr(),this.Ye=new Te(Y),i}Xe(e,t){if(!this.rt(e))return;const s=this.Et(e,t.key)?2:0;this.nt(e).Qe(t.key,s),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.He=this.He.insert(t.key,this.dt(t.key).add(e))}et(e,t,s){if(!this.rt(e))return;const i=this.nt(e);this.Et(e,t)?i.Qe(t,1):i.$e(t),this.He=this.He.insert(t,this.dt(t).delete(e)),this.He=this.He.insert(t,this.dt(t).add(e)),s&&(this.je=this.je.insert(t,s))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let t=this.ze.get(e);return t||(t=new Nd,this.ze.set(e,t)),t}dt(e){let t=this.He.get(e);return t||(t=new we(Y),this.He=this.He.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new we(Y),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||x("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new Nd),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function kr(){return new Te(L.comparator)}function kd(){return new Te(L.comparator)}const lw={asc:"ASCENDING",desc:"DESCENDING"},uw={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},hw={and:"AND",or:"OR"};class dw{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Ec(n,e){return n.useProto3Json||Bo(e)?e:{value:e}}function uo(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function C_(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function fw(n,e){return uo(n,e.toTimestamp())}function _t(n){return ne(!!n,49232),W.fromTimestamp(function(t){const s=un(t);return new he(s.seconds,s.nanos)}(n))}function pl(n,e){return vc(n,e).canonicalString()}function vc(n,e){const t=function(i){return new ae(["projects",i.projectId,"databases",i.database])}(n).child("documents");return e===void 0?t:t.child(e)}function A_(n){const e=ae.fromString(n);return ne(N_(e),10190,{key:e.toString()}),e}function Ic(n,e){return pl(n.databaseId,e.path)}function Ha(n,e){const t=A_(e);if(t.get(1)!==n.databaseId.projectId)throw new M(b.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new M(b.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new L(S_(t))}function R_(n,e){return pl(n.databaseId,e)}function pw(n){const e=A_(n);return e.length===4?ae.emptyPath():S_(e)}function Tc(n){return new ae(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function S_(n){return ne(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Dd(n,e,t){return{name:Ic(n,e),fields:t.value.mapValue.fields}}function _w(n,e){let t;if("targetChange"in e){e.targetChange;const s=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:U(39313,{state:h})}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],r=function(h,f){return h.useProto3Json?(ne(f===void 0||typeof f=="string",58123),ke.fromBase64String(f||"")):(ne(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),ke.fromUint8Array(f||new Uint8Array))}(n,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&function(h){const f=h.code===void 0?b.UNKNOWN:I_(h.code);return new M(f,h.message||"")}(o);t=new w_(s,i,r,c||null)}else if("documentChange"in e){e.documentChange;const s=e.documentChange;s.document,s.document.name,s.document.updateTime;const i=Ha(n,s.document.name),r=_t(s.document.updateTime),o=s.document.createTime?_t(s.document.createTime):W.min(),c=new Ge({mapValue:{fields:s.document.fields}}),l=Fe.newFoundDocument(i,r,o,c),h=s.targetIds||[],f=s.removedTargetIds||[];t=new jr(h,f,l.key,l)}else if("documentDelete"in e){e.documentDelete;const s=e.documentDelete;s.document;const i=Ha(n,s.document),r=s.readTime?_t(s.readTime):W.min(),o=Fe.newNoDocument(i,r),c=s.removedTargetIds||[];t=new jr([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const s=e.documentRemove;s.document;const i=Ha(n,s.document),r=s.removedTargetIds||[];t=new jr([],r,i,null)}else{if(!("filter"in e))return U(11601,{Rt:e});{e.filter;const s=e.filter;s.targetId;const{count:i=0,unchangedNames:r}=s,o=new iw(i,r),c=s.targetId;t=new T_(c,o)}}return t}function mw(n,e){let t;if(e instanceof zi)t={update:Dd(n,e.key,e.value)};else if(e instanceof Go)t={delete:Ic(n,e.key)};else if(e instanceof En)t={update:Dd(n,e.key,e.data),updateMask:Aw(e.fieldMask)};else{if(!(e instanceof tw))return U(16599,{Vt:e.type});t={verify:Ic(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(s=>function(r,o){const c=o.transform;if(c instanceof bi)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Ni)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof ki)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof lo)return{fieldPath:o.field.canonicalString(),increment:c.Ae};throw U(20930,{transform:o.transform})}(0,s))),e.precondition.isNone||(t.currentDocument=function(i,r){return r.updateTime!==void 0?{updateTime:fw(i,r.updateTime)}:r.exists!==void 0?{exists:r.exists}:U(27497)}(n,e.precondition)),t}function gw(n,e){return n&&n.length>0?(ne(e!==void 0,14353),n.map(t=>function(i,r){let o=i.updateTime?_t(i.updateTime):_t(r);return o.isEqual(W.min())&&(o=_t(r)),new JT(o,i.transformResults||[])}(t,e))):[]}function yw(n,e){return{documents:[R_(n,e.path)]}}function Ew(n,e){const t={structuredQuery:{}},s=e.path;let i;e.collectionGroup!==null?(i=s,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=s.popLast(),t.structuredQuery.from=[{collectionId:s.lastSegment()}]),t.parent=R_(n,i);const r=function(h){if(h.length!==0)return b_(lt.create(h,"and"))}(e.filters);r&&(t.structuredQuery.where=r);const o=function(h){if(h.length!==0)return h.map(f=>function(_){return{field:ts(_.field),direction:Tw(_.dir)}}(f))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);const c=Ec(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{ft:t,parent:i}}function vw(n){let e=pw(n.parent);const t=n.structuredQuery,s=t.from?t.from.length:0;let i=null;if(s>0){ne(s===1,65062);const f=t.from[0];f.allDescendants?i=f.collectionId:e=e.child(f.collectionId)}let r=[];t.where&&(r=function(p){const _=P_(p);return _ instanceof lt&&i_(_)?_.getFilters():[_]}(t.where));let o=[];t.orderBy&&(o=function(p){return p.map(_=>function(S){return new Pi(ns(S.field),function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(S.direction))}(_))}(t.orderBy));let c=null;t.limit&&(c=function(p){let _;return _=typeof p=="object"?p.value:p,Bo(_)?null:_}(t.limit));let l=null;t.startAt&&(l=function(p){const _=!!p.before,T=p.values||[];return new ao(T,_)}(t.startAt));let h=null;return t.endAt&&(h=function(p){const _=!p.before,T=p.values||[];return new ao(T,_)}(t.endAt)),FT(e,i,o,r,c,"F",l,h)}function Iw(n,e){const t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return U(28987,{purpose:i})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function P_(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const s=ns(t.unaryFilter.field);return ve.create(s,"==",{doubleValue:NaN});case"IS_NULL":const i=ns(t.unaryFilter.field);return ve.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=ns(t.unaryFilter.field);return ve.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=ns(t.unaryFilter.field);return ve.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return U(61313);default:return U(60726)}}(n):n.fieldFilter!==void 0?function(t){return ve.create(ns(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return U(58110);default:return U(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return lt.create(t.compositeFilter.filters.map(s=>P_(s)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return U(1026)}}(t.compositeFilter.op))}(n):U(30097,{filter:n})}function Tw(n){return lw[n]}function ww(n){return uw[n]}function Cw(n){return hw[n]}function ts(n){return{fieldPath:n.canonicalString()}}function ns(n){return Ne.fromServerFormat(n.fieldPath)}function b_(n){return n instanceof ve?function(t){if(t.op==="=="){if(Ed(t.value))return{unaryFilter:{field:ts(t.field),op:"IS_NAN"}};if(yd(t.value))return{unaryFilter:{field:ts(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Ed(t.value))return{unaryFilter:{field:ts(t.field),op:"IS_NOT_NAN"}};if(yd(t.value))return{unaryFilter:{field:ts(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:ts(t.field),op:ww(t.op),value:t.value}}}(n):n instanceof lt?function(t){const s=t.getFilters().map(i=>b_(i));return s.length===1?s[0]:{compositeFilter:{op:Cw(t.op),filters:s}}}(n):U(54877,{filter:n})}function Aw(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function N_(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
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
 */class Zt{constructor(e,t,s,i,r=W.min(),o=W.min(),c=ke.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=s,this.sequenceNumber=i,this.snapshotVersion=r,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new Zt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Zt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Zt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Zt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class Rw{constructor(e){this.yt=e}}function Sw(n){const e=vw({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?co(e,e.limit,"L"):e}/**
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
 */class Pw{constructor(){this.Cn=new bw}addToCollectionParentIndex(e,t){return this.Cn.add(t),N.resolve()}getCollectionParents(e,t){return N.resolve(this.Cn.getEntries(t))}addFieldIndex(e,t){return N.resolve()}deleteFieldIndex(e,t){return N.resolve()}deleteAllFieldIndexes(e){return N.resolve()}createTargetIndexes(e,t){return N.resolve()}getDocumentsMatchingTarget(e,t){return N.resolve(null)}getIndexType(e,t){return N.resolve(0)}getFieldIndexes(e,t){return N.resolve([])}getNextCollectionGroupToUpdate(e){return N.resolve(null)}getMinOffset(e,t){return N.resolve(ln.min())}getMinOffsetFromCollectionGroup(e,t){return N.resolve(ln.min())}updateCollectionGroup(e,t,s){return N.resolve()}updateIndexEntries(e,t){return N.resolve()}}class bw{constructor(){this.index={}}add(e){const t=e.lastSegment(),s=e.popLast(),i=this.index[t]||new we(ae.comparator),r=!i.has(s);return this.index[t]=i.add(s),r}has(e){const t=e.lastSegment(),s=e.popLast(),i=this.index[t];return i&&i.has(s)}getEntries(e){return(this.index[e]||new we(ae.comparator)).toArray()}}/**
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
 */const Od={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},k_=41943040;class ze{static withCacheSize(e){return new ze(e,ze.DEFAULT_COLLECTION_PERCENTILE,ze.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,s){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=s}}/**
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
 */ze.DEFAULT_COLLECTION_PERCENTILE=10,ze.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,ze.DEFAULT=new ze(k_,ze.DEFAULT_COLLECTION_PERCENTILE,ze.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),ze.DISABLED=new ze(-1,0,0);/**
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
 */class Es{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new Es(0)}static cr(){return new Es(-1)}}/**
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
 */const Vd="LruGarbageCollector",Nw=1048576;function Md([n,e],[t,s]){const i=Y(n,t);return i===0?Y(e,s):i}class kw{constructor(e){this.Ir=e,this.buffer=new we(Md),this.Er=0}dr(){return++this.Er}Ar(e){const t=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(t);else{const s=this.buffer.last();Md(t,s)<0&&(this.buffer=this.buffer.delete(s).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Dw{constructor(e,t,s){this.garbageCollector=e,this.asyncQueue=t,this.localStore=s,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(e){x(Vd,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,()=>y(this,null,function*(){this.Rr=null;try{yield this.localStore.collectGarbage(this.garbageCollector)}catch(t){Ns(t)?x(Vd,"Ignoring IndexedDB error during garbage collection: ",t):yield bs(t)}yield this.Vr(3e5)}))}}class Ow{constructor(e,t){this.mr=e,this.params=t}calculateTargetCount(e,t){return this.mr.gr(e).next(s=>Math.floor(t/100*s))}nthSequenceNumber(e,t){if(t===0)return N.resolve(Uo.ce);const s=new kw(t);return this.mr.forEachTarget(e,i=>s.Ar(i.sequenceNumber)).next(()=>this.mr.pr(e,i=>s.Ar(i))).next(()=>s.maxValue)}removeTargets(e,t,s){return this.mr.removeTargets(e,t,s)}removeOrphanedDocuments(e,t){return this.mr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(x("LruGarbageCollector","Garbage collection skipped; disabled"),N.resolve(Od)):this.getCacheSize(e).next(s=>s<this.params.cacheSizeCollectionThreshold?(x("LruGarbageCollector",`Garbage collection skipped; Cache size ${s} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Od):this.yr(e,t))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,t){let s,i,r,o,c,l,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?(x("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),i=this.params.maximumSequenceNumbersToCollect):i=p,o=Date.now(),this.nthSequenceNumber(e,i))).next(p=>(s=p,c=Date.now(),this.removeTargets(e,s,t))).next(p=>(r=p,l=Date.now(),this.removeOrphanedDocuments(e,s))).next(p=>(h=Date.now(),Zn()<=Q.DEBUG&&x("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${i} in `+(c-o)+`ms
	Removed ${r} targets in `+(l-c)+`ms
	Removed ${p} documents in `+(h-l)+`ms
Total Duration: ${h-f}ms`),N.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:r,documentsRemoved:p})))}}function Vw(n,e){return new Ow(n,e)}/**
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
 */class Mw{constructor(){this.changes=new $n(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Fe.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const s=this.changes.get(t);return s!==void 0?N.resolve(s):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class xw{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class Lw{constructor(e,t,s,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=s,this.indexManager=i}getDocument(e,t){let s=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(s=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(s!==null&&_i(s.mutation,i,Je.empty(),he.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(s=>this.getLocalViewOfDocuments(e,s,X()).next(()=>s))}getLocalViewOfDocuments(e,t,s=X()){const i=bn();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,s).next(r=>{let o=oi();return r.forEach((c,l)=>{o=o.insert(c,l.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const s=bn();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,X()))}populateOverlays(e,t,s){const i=[];return s.forEach(r=>{t.has(r)||i.push(r)}),this.documentOverlayCache.getOverlays(e,i).next(r=>{r.forEach((o,c)=>{t.set(o,c)})})}computeViews(e,t,s,i){let r=Ft();const o=pi(),c=function(){return pi()}();return t.forEach((l,h)=>{const f=s.get(h.key);i.has(h.key)&&(f===void 0||f.mutation instanceof En)?r=r.insert(h.key,h):f!==void 0?(o.set(h.key,f.mutation.getFieldMask()),_i(f.mutation,h,f.mutation.getFieldMask(),he.now())):o.set(h.key,Je.empty())}),this.recalculateAndSaveOverlays(e,r).next(l=>(l.forEach((h,f)=>o.set(h,f)),t.forEach((h,f)=>{var p;return c.set(h,new xw(f,(p=o.get(h))!=null?p:null))}),c))}recalculateAndSaveOverlays(e,t){const s=pi();let i=new Te((o,c)=>o-c),r=X();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const c of o)c.keys().forEach(l=>{const h=t.get(l);if(h===null)return;let f=s.get(l)||Je.empty();f=c.applyToLocalView(h,f),s.set(l,f);const p=(i.get(c.batchId)||X()).add(l);i=i.insert(c.batchId,p)})}).next(()=>{const o=[],c=i.getReverseIterator();for(;c.hasNext();){const l=c.getNext(),h=l.key,f=l.value,p=f_();f.forEach(_=>{if(!r.has(_)){const T=E_(t.get(_),s.get(_));T!==null&&p.set(_,T),r=r.add(_)}}),o.push(this.documentOverlayCache.saveOverlays(e,h,p))}return N.waitFor(o)}).next(()=>s)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(s=>this.recalculateAndSaveOverlays(e,s))}getDocumentsMatchingQuery(e,t,s,i){return function(o){return L.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):c_(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,s,i):this.getDocumentsMatchingCollectionQuery(e,t,s,i)}getNextDocuments(e,t,s,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,s,i).next(r=>{const o=i-r.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,s.largestBatchId,i-r.size):N.resolve(bn());let c=Ci,l=r;return o.next(h=>N.forEach(h,(f,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),r.get(f)?N.resolve():this.remoteDocumentCache.getEntry(e,f).next(_=>{l=l.insert(f,_)}))).next(()=>this.populateOverlays(e,h,r)).next(()=>this.computeViews(e,l,h,X())).next(f=>({batchId:c,changes:d_(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new L(t)).next(s=>{let i=oi();return s.isFoundDocument()&&(i=i.insert(s.key,s)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,s,i){const r=t.collectionGroup;let o=oi();return this.indexManager.getCollectionParents(e,r).next(c=>N.forEach(c,l=>{const h=function(p,_){return new ks(_,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(t,l.child(r));return this.getDocumentsMatchingCollectionQuery(e,h,s,i).next(f=>{f.forEach((p,_)=>{o=o.insert(p,_)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,s,i){let r;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,s.largestBatchId).next(o=>(r=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,s,r,i))).next(o=>{r.forEach((l,h)=>{const f=h.getKey();o.get(f)===null&&(o=o.insert(f,Fe.newInvalidDocument(f)))});let c=oi();return o.forEach((l,h)=>{const f=r.get(l);f!==void 0&&_i(f.mutation,h,Je.empty(),he.now()),$o(t,h)&&(c=c.insert(l,h))}),c})}}/**
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
 */class Fw{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,t){return N.resolve(this.Lr.get(t))}saveBundleMetadata(e,t){return this.Lr.set(t.id,function(i){return{id:i.id,version:i.version,createTime:_t(i.createTime)}}(t)),N.resolve()}getNamedQuery(e,t){return N.resolve(this.kr.get(t))}saveNamedQuery(e,t){return this.kr.set(t.name,function(i){return{name:i.name,query:Sw(i.bundledQuery),readTime:_t(i.readTime)}}(t)),N.resolve()}}/**
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
 */class Uw{constructor(){this.overlays=new Te(L.comparator),this.qr=new Map}getOverlay(e,t){return N.resolve(this.overlays.get(t))}getOverlays(e,t){const s=bn();return N.forEach(t,i=>this.getOverlay(e,i).next(r=>{r!==null&&s.set(i,r)})).next(()=>s)}saveOverlays(e,t,s){return s.forEach((i,r)=>{this.St(e,t,r)}),N.resolve()}removeOverlaysForBatchId(e,t,s){const i=this.qr.get(s);return i!==void 0&&(i.forEach(r=>this.overlays=this.overlays.remove(r)),this.qr.delete(s)),N.resolve()}getOverlaysForCollection(e,t,s){const i=bn(),r=t.length+1,o=new L(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const l=c.getNext().value,h=l.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===r&&l.largestBatchId>s&&i.set(l.getKey(),l)}return N.resolve(i)}getOverlaysForCollectionGroup(e,t,s,i){let r=new Te((h,f)=>h-f);const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>s){let f=r.get(h.largestBatchId);f===null&&(f=bn(),r=r.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const c=bn(),l=r.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((h,f)=>c.set(h,f)),!(c.size()>=i)););return N.resolve(c)}St(e,t,s){const i=this.overlays.get(s.key);if(i!==null){const o=this.qr.get(i.largestBatchId).delete(s.key);this.qr.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(s.key,new sw(t,s));let r=this.qr.get(t);r===void 0&&(r=X(),this.qr.set(t,r)),this.qr.set(t,r.add(s.key))}}/**
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
 */class Bw{constructor(){this.sessionToken=ke.EMPTY_BYTE_STRING}getSessionToken(e){return N.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,N.resolve()}}/**
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
 */class _l{constructor(){this.Qr=new we(Ae.$r),this.Ur=new we(Ae.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,t){const s=new Ae(e,t);this.Qr=this.Qr.add(s),this.Ur=this.Ur.add(s)}Wr(e,t){e.forEach(s=>this.addReference(s,t))}removeReference(e,t){this.Gr(new Ae(e,t))}zr(e,t){e.forEach(s=>this.removeReference(s,t))}jr(e){const t=new L(new ae([])),s=new Ae(t,e),i=new Ae(t,e+1),r=[];return this.Ur.forEachInRange([s,i],o=>{this.Gr(o),r.push(o.key)}),r}Jr(){this.Qr.forEach(e=>this.Gr(e))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const t=new L(new ae([])),s=new Ae(t,e),i=new Ae(t,e+1);let r=X();return this.Ur.forEachInRange([s,i],o=>{r=r.add(o.key)}),r}containsKey(e){const t=new Ae(e,0),s=this.Qr.firstAfterOrEqual(t);return s!==null&&e.isEqual(s.key)}}class Ae{constructor(e,t){this.key=e,this.Yr=t}static $r(e,t){return L.comparator(e.key,t.key)||Y(e.Yr,t.Yr)}static Kr(e,t){return Y(e.Yr,t.Yr)||L.comparator(e.key,t.key)}}/**
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
 */class qw{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.tr=1,this.Zr=new we(Ae.$r)}checkEmpty(e){return N.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,s,i){const r=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new nw(r,t,s,i);this.mutationQueue.push(o);for(const c of i)this.Zr=this.Zr.add(new Ae(c.key,r)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return N.resolve(o)}lookupMutationBatch(e,t){return N.resolve(this.Xr(t))}getNextMutationBatchAfterBatchId(e,t){const s=t+1,i=this.ei(s),r=i<0?0:i;return N.resolve(this.mutationQueue.length>r?this.mutationQueue[r]:null)}getHighestUnacknowledgedBatchId(){return N.resolve(this.mutationQueue.length===0?ol:this.tr-1)}getAllMutationBatches(e){return N.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const s=new Ae(t,0),i=new Ae(t,Number.POSITIVE_INFINITY),r=[];return this.Zr.forEachInRange([s,i],o=>{const c=this.Xr(o.Yr);r.push(c)}),N.resolve(r)}getAllMutationBatchesAffectingDocumentKeys(e,t){let s=new we(Y);return t.forEach(i=>{const r=new Ae(i,0),o=new Ae(i,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([r,o],c=>{s=s.add(c.Yr)})}),N.resolve(this.ti(s))}getAllMutationBatchesAffectingQuery(e,t){const s=t.path,i=s.length+1;let r=s;L.isDocumentKey(r)||(r=r.child(""));const o=new Ae(new L(r),0);let c=new we(Y);return this.Zr.forEachWhile(l=>{const h=l.key.path;return!!s.isPrefixOf(h)&&(h.length===i&&(c=c.add(l.Yr)),!0)},o),N.resolve(this.ti(c))}ti(e){const t=[];return e.forEach(s=>{const i=this.Xr(s);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){ne(this.ni(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let s=this.Zr;return N.forEach(t.mutations,i=>{const r=new Ae(i.key,t.batchId);return s=s.delete(r),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.Zr=s})}ir(e){}containsKey(e,t){const s=new Ae(t,0),i=this.Zr.firstAfterOrEqual(s);return N.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,N.resolve()}ni(e,t){return this.ei(e)}ei(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Xr(e){const t=this.ei(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class Ww{constructor(e){this.ri=e,this.docs=function(){return new Te(L.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const s=t.key,i=this.docs.get(s),r=i?i.size:0,o=this.ri(t);return this.docs=this.docs.insert(s,{document:t.mutableCopy(),size:o}),this.size+=o-r,this.indexManager.addToCollectionParentIndex(e,s.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const s=this.docs.get(t);return N.resolve(s?s.document.mutableCopy():Fe.newInvalidDocument(t))}getEntries(e,t){let s=Ft();return t.forEach(i=>{const r=this.docs.get(i);s=s.insert(i,r?r.document.mutableCopy():Fe.newInvalidDocument(i))}),N.resolve(s)}getDocumentsMatchingQuery(e,t,s,i){let r=Ft();const o=t.path,c=new L(o.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){const{key:h,value:{document:f}}=l.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||mT(_T(f),s)<=0||(i.has(f.key)||$o(t,f))&&(r=r.insert(f.key,f.mutableCopy()))}return N.resolve(r)}getAllFromCollectionGroup(e,t,s,i){U(9500)}ii(e,t){return N.forEach(this.docs,s=>t(s))}newChangeBuffer(e){return new jw(this)}getSize(e){return N.resolve(this.size)}}class jw extends Mw{constructor(e){super(),this.Nr=e}applyChanges(e){const t=[];return this.changes.forEach((s,i)=>{i.isValidDocument()?t.push(this.Nr.addEntry(e,i)):this.Nr.removeEntry(s)}),N.waitFor(t)}getFromCache(e,t){return this.Nr.getEntry(e,t)}getAllFromCache(e,t){return this.Nr.getEntries(e,t)}}/**
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
 */class $w{constructor(e){this.persistence=e,this.si=new $n(t=>ll(t),ul),this.lastRemoteSnapshotVersion=W.min(),this.highestTargetId=0,this.oi=0,this._i=new _l,this.targetCount=0,this.ai=Es.ur()}forEachTarget(e,t){return this.si.forEach((s,i)=>t(i)),N.resolve()}getLastRemoteSnapshotVersion(e){return N.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return N.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),N.resolve(this.highestTargetId)}setTargetsMetadata(e,t,s){return s&&(this.lastRemoteSnapshotVersion=s),t>this.oi&&(this.oi=t),N.resolve()}Pr(e){this.si.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.ai=new Es(t),this.highestTargetId=t),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,t){return this.Pr(t),this.targetCount+=1,N.resolve()}updateTargetData(e,t){return this.Pr(t),N.resolve()}removeTargetData(e,t){return this.si.delete(t.target),this._i.jr(t.targetId),this.targetCount-=1,N.resolve()}removeTargets(e,t,s){let i=0;const r=[];return this.si.forEach((o,c)=>{c.sequenceNumber<=t&&s.get(c.targetId)===null&&(this.si.delete(o),r.push(this.removeMatchingKeysForTargetId(e,c.targetId)),i++)}),N.waitFor(r).next(()=>i)}getTargetCount(e){return N.resolve(this.targetCount)}getTargetData(e,t){const s=this.si.get(t)||null;return N.resolve(s)}addMatchingKeys(e,t,s){return this._i.Wr(t,s),N.resolve()}removeMatchingKeys(e,t,s){this._i.zr(t,s);const i=this.persistence.referenceDelegate,r=[];return i&&t.forEach(o=>{r.push(i.markPotentiallyOrphaned(e,o))}),N.waitFor(r)}removeMatchingKeysForTargetId(e,t){return this._i.jr(t),N.resolve()}getMatchingKeysForTargetId(e,t){const s=this._i.Hr(t);return N.resolve(s)}containsKey(e,t){return N.resolve(this._i.containsKey(t))}}/**
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
 */class D_{constructor(e,t){this.ui={},this.overlays={},this.ci=new Uo(0),this.li=!1,this.li=!0,this.hi=new Bw,this.referenceDelegate=e(this),this.Pi=new $w(this),this.indexManager=new Pw,this.remoteDocumentCache=function(i){return new Ww(i)}(s=>this.referenceDelegate.Ti(s)),this.serializer=new Rw(t),this.Ii=new Fw(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Uw,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let s=this.ui[e.toKey()];return s||(s=new qw(t,this.referenceDelegate),this.ui[e.toKey()]=s),s}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,t,s){x("MemoryPersistence","Starting transaction:",e);const i=new Hw(this.ci.next());return this.referenceDelegate.Ei(),s(i).next(r=>this.referenceDelegate.di(i).next(()=>r)).toPromise().then(r=>(i.raiseOnCommittedEvent(),r))}Ai(e,t){return N.or(Object.values(this.ui).map(s=>()=>s.containsKey(e,t)))}}class Hw extends yT{constructor(e){super(),this.currentSequenceNumber=e}}class ml{constructor(e){this.persistence=e,this.Ri=new _l,this.Vi=null}static mi(e){return new ml(e)}get fi(){if(this.Vi)return this.Vi;throw U(60996)}addReference(e,t,s){return this.Ri.addReference(s,t),this.fi.delete(s.toString()),N.resolve()}removeReference(e,t,s){return this.Ri.removeReference(s,t),this.fi.add(s.toString()),N.resolve()}markPotentiallyOrphaned(e,t){return this.fi.add(t.toString()),N.resolve()}removeTarget(e,t){this.Ri.jr(t.targetId).forEach(i=>this.fi.add(i.toString()));const s=this.persistence.getTargetCache();return s.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(r=>this.fi.add(r.toString()))}).next(()=>s.removeTargetData(e,t))}Ei(){this.Vi=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return N.forEach(this.fi,s=>{const i=L.fromPath(s);return this.gi(e,i).next(r=>{r||t.removeEntry(i,W.min())})}).next(()=>(this.Vi=null,t.apply(e)))}updateLimboDocument(e,t){return this.gi(e,t).next(s=>{s?this.fi.delete(t.toString()):this.fi.add(t.toString())})}Ti(e){return 0}gi(e,t){return N.or([()=>N.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ai(e,t)])}}class ho{constructor(e,t){this.persistence=e,this.pi=new $n(s=>IT(s.path),(s,i)=>s.isEqual(i)),this.garbageCollector=Vw(this,t)}static mi(e,t){return new ho(e,t)}Ei(){}di(e){return N.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}gr(e){const t=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next(s=>t.next(i=>s+i))}wr(e){let t=0;return this.pr(e,s=>{t++}).next(()=>t)}pr(e,t){return N.forEach(this.pi,(s,i)=>this.br(e,s,i).next(r=>r?N.resolve():t(i)))}removeTargets(e,t,s){return this.persistence.getTargetCache().removeTargets(e,t,s)}removeOrphanedDocuments(e,t){let s=0;const i=this.persistence.getRemoteDocumentCache(),r=i.newChangeBuffer();return i.ii(e,o=>this.br(e,o,t).next(c=>{c||(s++,r.removeEntry(o,W.min()))})).next(()=>r.apply(e)).next(()=>s)}markPotentiallyOrphaned(e,t){return this.pi.set(t,e.currentSequenceNumber),N.resolve()}removeTarget(e,t){const s=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,s)}addReference(e,t,s){return this.pi.set(s,e.currentSequenceNumber),N.resolve()}removeReference(e,t,s){return this.pi.set(s,e.currentSequenceNumber),N.resolve()}updateLimboDocument(e,t){return this.pi.set(t,e.currentSequenceNumber),N.resolve()}Ti(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Br(e.data.value)),t}br(e,t,s){return N.or([()=>this.persistence.Ai(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const i=this.pi.get(t);return N.resolve(i!==void 0&&i>s)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class gl{constructor(e,t,s,i){this.targetId=e,this.fromCache=t,this.Es=s,this.ds=i}static As(e,t){let s=X(),i=X();for(const r of t.docChanges)switch(r.type){case 0:s=s.add(r.doc.key);break;case 1:i=i.add(r.doc.key)}return new gl(e,t.fromCache,s,i)}}/**
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
 */class zw{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class Gw{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=function(){return wy()?8:ET(Ue())>0?6:4}()}initialize(e,t){this.ps=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,s,i){const r={result:null};return this.ys(e,t).next(o=>{r.result=o}).next(()=>{if(!r.result)return this.ws(e,t,i,s).next(o=>{r.result=o})}).next(()=>{if(r.result)return;const o=new zw;return this.Ss(e,t,o).next(c=>{if(r.result=c,this.Vs)return this.bs(e,t,o,c.size)})}).next(()=>r.result)}bs(e,t,s,i){return s.documentReadCount<this.fs?(Zn()<=Q.DEBUG&&x("QueryEngine","SDK will not create cache indexes for query:",es(t),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),N.resolve()):(Zn()<=Q.DEBUG&&x("QueryEngine","Query:",es(t),"scans",s.documentReadCount,"local documents and returns",i,"documents as results."),s.documentReadCount>this.gs*i?(Zn()<=Q.DEBUG&&x("QueryEngine","The SDK decides to create cache indexes for query:",es(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,pt(t))):N.resolve())}ys(e,t){if(wd(t))return N.resolve(null);let s=pt(t);return this.indexManager.getIndexType(e,s).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=co(t,null,"F"),s=pt(t)),this.indexManager.getDocumentsMatchingTarget(e,s).next(r=>{const o=X(...r);return this.ps.getDocuments(e,o).next(c=>this.indexManager.getMinOffset(e,s).next(l=>{const h=this.Ds(t,c);return this.Cs(t,h,o,l.readTime)?this.ys(e,co(t,null,"F")):this.vs(e,h,t,l)}))})))}ws(e,t,s,i){return wd(t)||i.isEqual(W.min())?N.resolve(null):this.ps.getDocuments(e,s).next(r=>{const o=this.Ds(t,r);return this.Cs(t,o,s,i)?N.resolve(null):(Zn()<=Q.DEBUG&&x("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),es(t)),this.vs(e,o,t,pT(i,Ci)).next(c=>c))})}Ds(e,t){let s=new we(u_(e));return t.forEach((i,r)=>{$o(e,r)&&(s=s.add(r))}),s}Cs(e,t,s,i){if(e.limit===null)return!1;if(s.size!==t.size)return!0;const r=e.limitType==="F"?t.last():t.first();return!!r&&(r.hasPendingWrites||r.version.compareTo(i)>0)}Ss(e,t,s){return Zn()<=Q.DEBUG&&x("QueryEngine","Using full collection scan to execute query:",es(t)),this.ps.getDocumentsMatchingQuery(e,t,ln.min(),s)}vs(e,t,s,i){return this.ps.getDocumentsMatchingQuery(e,s,i).next(r=>(t.forEach(o=>{r=r.insert(o.key,o)}),r))}}/**
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
 */const yl="LocalStore",Kw=3e8;class Qw{constructor(e,t,s,i){this.persistence=e,this.Fs=t,this.serializer=i,this.Ms=new Te(Y),this.xs=new $n(r=>ll(r),ul),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(s)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Lw(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ms))}}function Yw(n,e,t,s){return new Qw(n,e,t,s)}function O_(n,e){return y(this,null,function*(){const t=j(n);return yield t.persistence.runTransaction("Handle user change","readonly",s=>{let i;return t.mutationQueue.getAllMutationBatches(s).next(r=>(i=r,t.Bs(e),t.mutationQueue.getAllMutationBatches(s))).next(r=>{const o=[],c=[];let l=X();for(const h of i){o.push(h.batchId);for(const f of h.mutations)l=l.add(f.key)}for(const h of r){c.push(h.batchId);for(const f of h.mutations)l=l.add(f.key)}return t.localDocuments.getDocuments(s,l).next(h=>({Ls:h,removedBatchIds:o,addedBatchIds:c}))})})})}function Xw(n,e){const t=j(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",s=>{const i=e.batch.keys(),r=t.Ns.newChangeBuffer({trackRemovals:!0});return function(c,l,h,f){const p=h.batch,_=p.keys();let T=N.resolve();return _.forEach(S=>{T=T.next(()=>f.getEntry(l,S)).next(D=>{const k=h.docVersions.get(S);ne(k!==null,48541),D.version.compareTo(k)<0&&(p.applyToRemoteDocument(D,h),D.isValidDocument()&&(D.setReadTime(h.commitVersion),f.addEntry(D)))})}),T.next(()=>c.mutationQueue.removeMutationBatch(l,p))}(t,s,e,r).next(()=>r.apply(s)).next(()=>t.mutationQueue.performConsistencyCheck(s)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(s,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(s,function(c){let l=X();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(l=l.add(c.batch.mutations[h].key));return l}(e))).next(()=>t.localDocuments.getDocuments(s,i))})}function V_(n){const e=j(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Pi.getLastRemoteSnapshotVersion(t))}function Jw(n,e){const t=j(n),s=e.snapshotVersion;let i=t.Ms;return t.persistence.runTransaction("Apply remote event","readwrite-primary",r=>{const o=t.Ns.newChangeBuffer({trackRemovals:!0});i=t.Ms;const c=[];e.targetChanges.forEach((f,p)=>{const _=i.get(p);if(!_)return;c.push(t.Pi.removeMatchingKeys(r,f.removedDocuments,p).next(()=>t.Pi.addMatchingKeys(r,f.addedDocuments,p)));let T=_.withSequenceNumber(r.currentSequenceNumber);e.targetMismatches.get(p)!==null?T=T.withResumeToken(ke.EMPTY_BYTE_STRING,W.min()).withLastLimboFreeSnapshotVersion(W.min()):f.resumeToken.approximateByteSize()>0&&(T=T.withResumeToken(f.resumeToken,s)),i=i.insert(p,T),function(D,k,$){return D.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-D.snapshotVersion.toMicroseconds()>=Kw?!0:$.addedDocuments.size+$.modifiedDocuments.size+$.removedDocuments.size>0}(_,T,f)&&c.push(t.Pi.updateTargetData(r,T))});let l=Ft(),h=X();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(r,f))}),c.push(Zw(r,o,e.documentUpdates).next(f=>{l=f.ks,h=f.qs})),!s.isEqual(W.min())){const f=t.Pi.getLastRemoteSnapshotVersion(r).next(p=>t.Pi.setTargetsMetadata(r,r.currentSequenceNumber,s));c.push(f)}return N.waitFor(c).next(()=>o.apply(r)).next(()=>t.localDocuments.getLocalViewOfDocuments(r,l,h)).next(()=>l)}).then(r=>(t.Ms=i,r))}function Zw(n,e,t){let s=X(),i=X();return t.forEach(r=>s=s.add(r)),e.getEntries(n,s).next(r=>{let o=Ft();return t.forEach((c,l)=>{const h=r.get(c);l.isFoundDocument()!==h.isFoundDocument()&&(i=i.add(c)),l.isNoDocument()&&l.version.isEqual(W.min())?(e.removeEntry(c,l.readTime),o=o.insert(c,l)):!h.isValidDocument()||l.version.compareTo(h.version)>0||l.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(l),o=o.insert(c,l)):x(yl,"Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",l.version)}),{ks:o,qs:i}})}function eC(n,e){const t=j(n);return t.persistence.runTransaction("Get next mutation batch","readonly",s=>(e===void 0&&(e=ol),t.mutationQueue.getNextMutationBatchAfterBatchId(s,e)))}function tC(n,e){const t=j(n);return t.persistence.runTransaction("Allocate target","readwrite",s=>{let i;return t.Pi.getTargetData(s,e).next(r=>r?(i=r,N.resolve(i)):t.Pi.allocateTargetId(s).next(o=>(i=new Zt(e,o,"TargetPurposeListen",s.currentSequenceNumber),t.Pi.addTargetData(s,i).next(()=>i))))}).then(s=>{const i=t.Ms.get(s.targetId);return(i===null||s.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.Ms=t.Ms.insert(s.targetId,s),t.xs.set(e,s.targetId)),s})}function wc(n,e,t){return y(this,null,function*(){const s=j(n),i=s.Ms.get(e),r=t?"readwrite":"readwrite-primary";try{t||(yield s.persistence.runTransaction("Release target",r,o=>s.persistence.referenceDelegate.removeTarget(o,i)))}catch(o){if(!Ns(o))throw o;x(yl,`Failed to update sequence numbers for target ${e}: ${o}`)}s.Ms=s.Ms.remove(e),s.xs.delete(i.target)})}function xd(n,e,t){const s=j(n);let i=W.min(),r=X();return s.persistence.runTransaction("Execute query","readwrite",o=>function(l,h,f){const p=j(l),_=p.xs.get(f);return _!==void 0?N.resolve(p.Ms.get(_)):p.Pi.getTargetData(h,f)}(s,o,pt(e)).next(c=>{if(c)return i=c.lastLimboFreeSnapshotVersion,s.Pi.getMatchingKeysForTargetId(o,c.targetId).next(l=>{r=l})}).next(()=>s.Fs.getDocumentsMatchingQuery(o,e,t?i:W.min(),t?r:X())).next(c=>(nC(s,BT(e),c),{documents:c,Qs:r})))}function nC(n,e,t){let s=n.Os.get(e)||W.min();t.forEach((i,r)=>{r.readTime.compareTo(s)>0&&(s=r.readTime)}),n.Os.set(e,s)}class Ld{constructor(){this.activeTargetIds=zT()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class sC{constructor(){this.Mo=new Ld,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,s){}addLocalQueryTarget(e,t=!0){return t&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,t,s){this.xo[e]=t}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new Ld,Promise.resolve()}handleUserChange(e,t,s){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class iC{Oo(e){}shutdown(){}}/**
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
 */const Fd="ConnectivityMonitor";class Ud{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){x(Fd,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){x(Fd,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return typeof window!="undefined"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let Dr=null;function Cc(){return Dr===null?Dr=function(){return 268435456+Math.round(2147483648*Math.random())}():Dr++,"0x"+Dr.toString(16)}/**
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
 */const za="RestConnection",rC={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class oC{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.Uo=t+"://"+e.host,this.Ko=`projects/${s}/databases/${i}`,this.Wo=this.databaseId.database===ro?`project_id=${s}`:`project_id=${s}&database_id=${i}`}Go(e,t,s,i,r){const o=Cc(),c=this.zo(e,t.toUriEncodedString());x(za,`Sending RPC '${e}' ${o}:`,c,s);const l={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(l,i,r);const{host:h}=new URL(c),f=gn(h);return this.Jo(e,c,l,s,f).then(p=>(x(za,`Received RPC '${e}' ${o}: `,p),p),p=>{throw _s(za,`RPC '${e}' ${o} failed with error: `,p,"url: ",c,"request:",s),p})}Ho(e,t,s,i,r,o){return this.Go(e,t,s,i,r)}jo(e,t,s){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Ps}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((i,r)=>e[r]=i),s&&s.headers.forEach((i,r)=>e[r]=i)}zo(e,t){const s=rC[e];return`${this.Uo}/v1/${t}:${s}`}terminate(){}}/**
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
 */class aC{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}/**
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
 */const xe="WebChannelConnection";class cC extends oC{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,t,s,i,r){const o=Cc();return new Promise((c,l)=>{const h=new Lp;h.setWithCredentials(!0),h.listenOnce(Fp.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case Ur.NO_ERROR:const p=h.getResponseJson();x(xe,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(p)),c(p);break;case Ur.TIMEOUT:x(xe,`RPC '${e}' ${o} timed out`),l(new M(b.DEADLINE_EXCEEDED,"Request time out"));break;case Ur.HTTP_ERROR:const _=h.getStatus();if(x(xe,`RPC '${e}' ${o} failed with status:`,_,"response text:",h.getResponseText()),_>0){let T=h.getResponseJson();Array.isArray(T)&&(T=T[0]);const S=T==null?void 0:T.error;if(S&&S.status&&S.message){const D=function($){const q=$.toLowerCase().replace(/_/g,"-");return Object.values(b).indexOf(q)>=0?q:b.UNKNOWN}(S.status);l(new M(D,S.message))}else l(new M(b.UNKNOWN,"Server responded with status "+h.getStatus()))}else l(new M(b.UNAVAILABLE,"Connection failed."));break;default:U(9055,{l_:e,streamId:o,h_:h.getLastErrorCode(),P_:h.getLastError()})}}finally{x(xe,`RPC '${e}' ${o} completed.`)}});const f=JSON.stringify(i);x(xe,`RPC '${e}' ${o} sending request:`,i),h.send(t,"POST",f,s,15)})}T_(e,t,s){const i=Cc(),r=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=qp(),c=Bp(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(l.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(l.useFetchStreams=!0),this.jo(l.initMessageHeaders,t,s),l.encodeInitMessageHeaders=!0;const f=r.join("");x(xe,`Creating RPC '${e}' stream ${i}: ${f}`,l);const p=o.createWebChannel(f,l);this.I_(p);let _=!1,T=!1;const S=new aC({Yo:k=>{T?x(xe,`Not sending because RPC '${e}' stream ${i} is closed:`,k):(_||(x(xe,`Opening RPC '${e}' stream ${i} transport.`),p.open(),_=!0),x(xe,`RPC '${e}' stream ${i} sending:`,k),p.send(k))},Zo:()=>p.close()}),D=(k,$,q)=>{k.listen($,H=>{try{q(H)}catch(ce){setTimeout(()=>{throw ce},0)}})};return D(p,ri.EventType.OPEN,()=>{T||(x(xe,`RPC '${e}' stream ${i} transport opened.`),S.o_())}),D(p,ri.EventType.CLOSE,()=>{T||(T=!0,x(xe,`RPC '${e}' stream ${i} transport closed`),S.a_(),this.E_(p))}),D(p,ri.EventType.ERROR,k=>{T||(T=!0,_s(xe,`RPC '${e}' stream ${i} transport errored. Name:`,k.name,"Message:",k.message),S.a_(new M(b.UNAVAILABLE,"The operation could not be completed")))}),D(p,ri.EventType.MESSAGE,k=>{var $;if(!T){const q=k.data[0];ne(!!q,16349);const H=q,ce=(H==null?void 0:H.error)||(($=H[0])==null?void 0:$.error);if(ce){x(xe,`RPC '${e}' stream ${i} received error:`,ce);const Ze=ce.status;let ge=function(v){const I=ye[v];if(I!==void 0)return I_(I)}(Ze),w=ce.message;ge===void 0&&(ge=b.INTERNAL,w="Unknown error status: "+Ze+" with message "+ce.message),T=!0,S.a_(new M(ge,w)),p.close()}else x(xe,`RPC '${e}' stream ${i} received:`,q),S.u_(q)}}),D(c,Up.STAT_EVENT,k=>{k.stat===hc.PROXY?x(xe,`RPC '${e}' stream ${i} detected buffering proxy`):k.stat===hc.NOPROXY&&x(xe,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{S.__()},0),S}terminate(){this.c_.forEach(e=>e.close()),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter(t=>t===e)}}function Ga(){return typeof document!="undefined"?document:null}/**
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
 */function Qo(n){return new dw(n,!0)}/**
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
 */class M_{constructor(e,t,s=1e3,i=1.5,r=6e4){this.Mi=e,this.timerId=t,this.d_=s,this.A_=i,this.R_=r,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const t=Math.floor(this.V_+this.y_()),s=Math.max(0,Date.now()-this.f_),i=Math.max(0,t-s);i>0&&x("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${s} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,i,()=>(this.f_=Date.now(),e())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
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
 */const Bd="PersistentStream";class x_{constructor(e,t,s,i,r,o,c,l){this.Mi=e,this.S_=s,this.b_=i,this.connection=r,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new M_(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}stop(){return y(this,null,function*(){this.x_()&&(yield this.close(0))})}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.Q_(),this.stream.send(e)}k_(){return y(this,null,function*(){if(this.O_())return this.close(0)})}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}close(e,t){return y(this,null,function*(){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===b.RESOURCE_EXHAUSTED?(Lt(t.toString()),Lt("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===b.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,yield this.listener.r_(t)})}K_(){}auth(){this.state=1;const e=this.W_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([s,i])=>{this.D_===t&&this.G_(s,i)},s=>{e(()=>{const i=new M(b.UNKNOWN,"Fetching auth token failed: "+s.message);return this.z_(i)})})}G_(e,t){const s=this.W_(this.D_);this.stream=this.j_(e,t),this.stream.Xo(()=>{s(()=>this.listener.Xo())}),this.stream.t_(()=>{s(()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.t_()))}),this.stream.r_(i=>{s(()=>this.z_(i))}),this.stream.onMessage(i=>{s(()=>++this.F_==1?this.J_(i):this.onNext(i))})}N_(){this.state=5,this.M_.p_(()=>y(this,null,function*(){this.state=0,this.start()}))}z_(e){return x(Bd,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Mi.enqueueAndForget(()=>this.D_===e?t():(x(Bd,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class lC extends x_{constructor(e,t,s,i,r,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,s,i,o),this.serializer=r}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=_w(this.serializer,e),s=function(r){if(!("targetChange"in r))return W.min();const o=r.targetChange;return o.targetIds&&o.targetIds.length?W.min():o.readTime?_t(o.readTime):W.min()}(e);return this.listener.H_(t,s)}Y_(e){const t={};t.database=Tc(this.serializer),t.addTarget=function(r,o){let c;const l=o.target;if(c=gc(l)?{documents:yw(r,l)}:{query:Ew(r,l).ft},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=C_(r,o.resumeToken);const h=Ec(r,o.expectedCount);h!==null&&(c.expectedCount=h)}else if(o.snapshotVersion.compareTo(W.min())>0){c.readTime=uo(r,o.snapshotVersion.toTimestamp());const h=Ec(r,o.expectedCount);h!==null&&(c.expectedCount=h)}return c}(this.serializer,e);const s=Iw(this.serializer,e);s&&(t.labels=s),this.q_(t)}Z_(e){const t={};t.database=Tc(this.serializer),t.removeTarget=e,this.q_(t)}}class uC extends x_{constructor(e,t,s,i,r,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,s,i,o),this.serializer=r}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return ne(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,ne(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){ne(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=gw(e.writeResults,e.commitTime),s=_t(e.commitTime);return this.listener.na(s,t)}ra(){const e={};e.database=Tc(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map(s=>mw(this.serializer,s))};this.q_(t)}}/**
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
 */class hC{}class dC extends hC{constructor(e,t,s,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=s,this.serializer=i,this.ia=!1}sa(){if(this.ia)throw new M(b.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,t,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([r,o])=>this.connection.Go(e,vc(t,s),i,r,o)).catch(r=>{throw r.name==="FirebaseError"?(r.code===b.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),r):new M(b.UNKNOWN,r.toString())})}Ho(e,t,s,i,r){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,c])=>this.connection.Ho(e,vc(t,s),i,o,c,r)).catch(o=>{throw o.name==="FirebaseError"?(o.code===b.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new M(b.UNKNOWN,o.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class fC{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(Lt(t),this.aa=!1):x("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
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
 */const Fn="RemoteStore";class pC{constructor(e,t,s,i,r){this.localStore=e,this.datastore=t,this.asyncQueue=s,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=r,this.Aa.Oo(o=>{s.enqueueAndForget(()=>y(this,null,function*(){Hn(this)&&(x(Fn,"Restarting streams for network reachability change."),yield function(l){return y(this,null,function*(){const h=j(l);h.Ea.add(4),yield Ki(h),h.Ra.set("Unknown"),h.Ea.delete(4),yield Yo(h)})}(this))}))}),this.Ra=new fC(s,i)}}function Yo(n){return y(this,null,function*(){if(Hn(n))for(const e of n.da)yield e(!0)})}function Ki(n){return y(this,null,function*(){for(const e of n.da)yield e(!1)})}function L_(n,e){const t=j(n);t.Ia.has(e.targetId)||(t.Ia.set(e.targetId,e),Tl(t)?Il(t):Ds(t).O_()&&vl(t,e))}function El(n,e){const t=j(n),s=Ds(t);t.Ia.delete(e),s.O_()&&F_(t,e),t.Ia.size===0&&(s.O_()?s.L_():Hn(t)&&t.Ra.set("Unknown"))}function vl(n,e){if(n.Va.Ue(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(W.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Ds(n).Y_(e)}function F_(n,e){n.Va.Ue(e),Ds(n).Z_(e)}function Il(n){n.Va=new cw({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ia.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),Ds(n).start(),n.Ra.ua()}function Tl(n){return Hn(n)&&!Ds(n).x_()&&n.Ia.size>0}function Hn(n){return j(n).Ea.size===0}function U_(n){n.Va=void 0}function _C(n){return y(this,null,function*(){n.Ra.set("Online")})}function mC(n){return y(this,null,function*(){n.Ia.forEach((e,t)=>{vl(n,e)})})}function gC(n,e){return y(this,null,function*(){U_(n),Tl(n)?(n.Ra.ha(e),Il(n)):n.Ra.set("Unknown")})}function yC(n,e,t){return y(this,null,function*(){if(n.Ra.set("Online"),e instanceof w_&&e.state===2&&e.cause)try{yield function(i,r){return y(this,null,function*(){const o=r.cause;for(const c of r.targetIds)i.Ia.has(c)&&(yield i.remoteSyncer.rejectListen(c,o),i.Ia.delete(c),i.Va.removeTarget(c))})}(n,e)}catch(s){x(Fn,"Failed to remove targets %s: %s ",e.targetIds.join(","),s),yield fo(n,s)}else if(e instanceof jr?n.Va.Ze(e):e instanceof T_?n.Va.st(e):n.Va.tt(e),!t.isEqual(W.min()))try{const s=yield V_(n.localStore);t.compareTo(s)>=0&&(yield function(r,o){const c=r.Va.Tt(o);return c.targetChanges.forEach((l,h)=>{if(l.resumeToken.approximateByteSize()>0){const f=r.Ia.get(h);f&&r.Ia.set(h,f.withResumeToken(l.resumeToken,o))}}),c.targetMismatches.forEach((l,h)=>{const f=r.Ia.get(l);if(!f)return;r.Ia.set(l,f.withResumeToken(ke.EMPTY_BYTE_STRING,f.snapshotVersion)),F_(r,l);const p=new Zt(f.target,l,h,f.sequenceNumber);vl(r,p)}),r.remoteSyncer.applyRemoteEvent(c)}(n,t))}catch(s){x(Fn,"Failed to raise snapshot:",s),yield fo(n,s)}})}function fo(n,e,t){return y(this,null,function*(){if(!Ns(e))throw e;n.Ea.add(1),yield Ki(n),n.Ra.set("Offline"),t||(t=()=>V_(n.localStore)),n.asyncQueue.enqueueRetryable(()=>y(this,null,function*(){x(Fn,"Retrying IndexedDB access"),yield t(),n.Ea.delete(1),yield Yo(n)}))})}function B_(n,e){return e().catch(t=>fo(n,t,e))}function Xo(n){return y(this,null,function*(){const e=j(n),t=fn(e);let s=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:ol;for(;EC(e);)try{const i=yield eC(e.localStore,s);if(i===null){e.Ta.length===0&&t.L_();break}s=i.batchId,vC(e,i)}catch(i){yield fo(e,i)}q_(e)&&W_(e)})}function EC(n){return Hn(n)&&n.Ta.length<10}function vC(n,e){n.Ta.push(e);const t=fn(n);t.O_()&&t.X_&&t.ea(e.mutations)}function q_(n){return Hn(n)&&!fn(n).x_()&&n.Ta.length>0}function W_(n){fn(n).start()}function IC(n){return y(this,null,function*(){fn(n).ra()})}function TC(n){return y(this,null,function*(){const e=fn(n);for(const t of n.Ta)e.ea(t.mutations)})}function wC(n,e,t){return y(this,null,function*(){const s=n.Ta.shift(),i=dl.from(s,e,t);yield B_(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),yield Xo(n)})}function CC(n,e){return y(this,null,function*(){e&&fn(n).X_&&(yield function(s,i){return y(this,null,function*(){if(function(o){return rw(o)&&o!==b.ABORTED}(i.code)){const r=s.Ta.shift();fn(s).B_(),yield B_(s,()=>s.remoteSyncer.rejectFailedWrite(r.batchId,i)),yield Xo(s)}})}(n,e)),q_(n)&&W_(n)})}function qd(n,e){return y(this,null,function*(){const t=j(n);t.asyncQueue.verifyOperationInProgress(),x(Fn,"RemoteStore received new credentials");const s=Hn(t);t.Ea.add(3),yield Ki(t),s&&t.Ra.set("Unknown"),yield t.remoteSyncer.handleCredentialChange(e),t.Ea.delete(3),yield Yo(t)})}function AC(n,e){return y(this,null,function*(){const t=j(n);e?(t.Ea.delete(2),yield Yo(t)):e||(t.Ea.add(2),yield Ki(t),t.Ra.set("Unknown"))})}function Ds(n){return n.ma||(n.ma=function(t,s,i){const r=j(t);return r.sa(),new lC(s,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,i)}(n.datastore,n.asyncQueue,{Xo:_C.bind(null,n),t_:mC.bind(null,n),r_:gC.bind(null,n),H_:yC.bind(null,n)}),n.da.push(e=>y(this,null,function*(){e?(n.ma.B_(),Tl(n)?Il(n):n.Ra.set("Unknown")):(yield n.ma.stop(),U_(n))}))),n.ma}function fn(n){return n.fa||(n.fa=function(t,s,i){const r=j(t);return r.sa(),new uC(s,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,i)}(n.datastore,n.asyncQueue,{Xo:()=>Promise.resolve(),t_:IC.bind(null,n),r_:CC.bind(null,n),ta:TC.bind(null,n),na:wC.bind(null,n)}),n.da.push(e=>y(this,null,function*(){e?(n.fa.B_(),yield Xo(n)):(yield n.fa.stop(),n.Ta.length>0&&(x(Fn,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))}))),n.fa}/**
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
 */class wl{constructor(e,t,s,i,r){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=s,this.op=i,this.removalCallback=r,this.deferred=new Dt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,s,i,r){const o=Date.now()+s,c=new wl(e,t,o,i,r);return c.start(s),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new M(b.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Cl(n,e){if(Lt("AsyncQueue",`${e}: ${n}`),Ns(n))return new M(b.UNAVAILABLE,`${e}: ${n}`);throw n}/**
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
 */class cs{static emptySet(e){return new cs(e.comparator)}constructor(e){this.comparator=e?(t,s)=>e(t,s)||L.comparator(t.key,s.key):(t,s)=>L.comparator(t.key,s.key),this.keyedMap=oi(),this.sortedSet=new Te(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,s)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof cs)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),s=e.sortedSet.getIterator();for(;t.hasNext();){const i=t.getNext().key,r=s.getNext().key;if(!i.isEqual(r))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const s=new cs;return s.comparator=this.comparator,s.keyedMap=e,s.sortedSet=t,s}}/**
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
 */class Wd{constructor(){this.ga=new Te(L.comparator)}track(e){const t=e.doc.key,s=this.ga.get(t);s?e.type!==0&&s.type===3?this.ga=this.ga.insert(t,e):e.type===3&&s.type!==1?this.ga=this.ga.insert(t,{type:s.type,doc:e.doc}):e.type===2&&s.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&s.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&s.type===0?this.ga=this.ga.remove(t):e.type===1&&s.type===2?this.ga=this.ga.insert(t,{type:1,doc:s.doc}):e.type===0&&s.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):U(63341,{Rt:e,pa:s}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal((t,s)=>{e.push(s)}),e}}class vs{constructor(e,t,s,i,r,o,c,l,h){this.query=e,this.docs=t,this.oldDocs=s,this.docChanges=i,this.mutatedKeys=r,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=h}static fromInitialDocuments(e,t,s,i,r){const o=[];return t.forEach(c=>{o.push({type:0,doc:c})}),new vs(e,t,cs.emptySet(t),o,s,i,!0,!1,r)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&jo(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,s=e.docChanges;if(t.length!==s.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==s[i].type||!t[i].doc.isEqual(s[i].doc))return!1;return!0}}/**
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
 */class RC{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class SC{constructor(){this.queries=jd(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,s){const i=j(t),r=i.queries;i.queries=jd(),r.forEach((o,c)=>{for(const l of c.Sa)l.onError(s)})})(this,new M(b.ABORTED,"Firestore shutting down"))}}function jd(){return new $n(n=>l_(n),jo)}function Al(n,e){return y(this,null,function*(){const t=j(n);let s=3;const i=e.query;let r=t.queries.get(i);r?!r.ba()&&e.Da()&&(s=2):(r=new RC,s=e.Da()?0:1);try{switch(s){case 0:r.wa=yield t.onListen(i,!0);break;case 1:r.wa=yield t.onListen(i,!1);break;case 2:yield t.onFirstRemoteStoreListen(i)}}catch(o){const c=Cl(o,`Initialization of query '${es(e.query)}' failed`);return void e.onError(c)}t.queries.set(i,r),r.Sa.push(e),e.va(t.onlineState),r.wa&&e.Fa(r.wa)&&Sl(t)})}function Rl(n,e){return y(this,null,function*(){const t=j(n),s=e.query;let i=3;const r=t.queries.get(s);if(r){const o=r.Sa.indexOf(e);o>=0&&(r.Sa.splice(o,1),r.Sa.length===0?i=e.Da()?0:1:!r.ba()&&e.Da()&&(i=2))}switch(i){case 0:return t.queries.delete(s),t.onUnlisten(s,!0);case 1:return t.queries.delete(s),t.onUnlisten(s,!1);case 2:return t.onLastRemoteStoreUnlisten(s);default:return}})}function PC(n,e){const t=j(n);let s=!1;for(const i of e){const r=i.query,o=t.queries.get(r);if(o){for(const c of o.Sa)c.Fa(i)&&(s=!0);o.wa=i}}s&&Sl(t)}function bC(n,e,t){const s=j(n),i=s.queries.get(e);if(i)for(const r of i.Sa)r.onError(t);s.queries.delete(e)}function Sl(n){n.Ca.forEach(e=>{e.next()})}var Ac,$d;($d=Ac||(Ac={})).Ma="default",$d.Cache="cache";class Pl{constructor(e,t,s){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=s||{}}Fa(e){if(!this.options.includeMetadataChanges){const s=[];for(const i of e.docChanges)i.type!==3&&s.push(i);e=new vs(e.query,e.docs,e.oldDocs,s,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const s=t!=="Offline";return(!this.options.qa||!s)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=vs.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Ac.Cache}}/**
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
 */class j_{constructor(e){this.key=e}}class $_{constructor(e){this.key=e}}class NC{constructor(e,t){this.query=e,this.Ya=t,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=X(),this.mutatedKeys=X(),this.eu=u_(e),this.tu=new cs(this.eu)}get nu(){return this.Ya}ru(e,t){const s=t?t.iu:new Wd,i=t?t.tu:this.tu;let r=t?t.mutatedKeys:this.mutatedKeys,o=i,c=!1;const l=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,h=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((f,p)=>{const _=i.get(f),T=$o(this.query,p)?p:null,S=!!_&&this.mutatedKeys.has(_.key),D=!!T&&(T.hasLocalMutations||this.mutatedKeys.has(T.key)&&T.hasCommittedMutations);let k=!1;_&&T?_.data.isEqual(T.data)?S!==D&&(s.track({type:3,doc:T}),k=!0):this.su(_,T)||(s.track({type:2,doc:T}),k=!0,(l&&this.eu(T,l)>0||h&&this.eu(T,h)<0)&&(c=!0)):!_&&T?(s.track({type:0,doc:T}),k=!0):_&&!T&&(s.track({type:1,doc:_}),k=!0,(l||h)&&(c=!0)),k&&(T?(o=o.add(T),r=D?r.add(f):r.delete(f)):(o=o.delete(f),r=r.delete(f)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),r=r.delete(f.key),s.track({type:1,doc:f})}return{tu:o,iu:s,Cs:c,mutatedKeys:r}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,s,i){const r=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const o=e.iu.ya();o.sort((f,p)=>function(T,S){const D=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return U(20277,{Rt:k})}};return D(T)-D(S)}(f.type,p.type)||this.eu(f.doc,p.doc)),this.ou(s),i=i!=null?i:!1;const c=t&&!i?this._u():[],l=this.Xa.size===0&&this.current&&!i?1:0,h=l!==this.Za;return this.Za=l,o.length!==0||h?{snapshot:new vs(this.query,e.tu,r,o,e.mutatedKeys,l===0,h,!1,!!s&&s.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Wd,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(t=>this.Ya=this.Ya.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ya=this.Ya.delete(t)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=X(),this.tu.forEach(s=>{this.uu(s.key)&&(this.Xa=this.Xa.add(s.key))});const t=[];return e.forEach(s=>{this.Xa.has(s)||t.push(new $_(s))}),this.Xa.forEach(s=>{e.has(s)||t.push(new j_(s))}),t}cu(e){this.Ya=e.Qs,this.Xa=X();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return vs.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const bl="SyncEngine";class kC{constructor(e,t,s){this.query=e,this.targetId=t,this.view=s}}class DC{constructor(e){this.key=e,this.hu=!1}}class OC{constructor(e,t,s,i,r,o){this.localStore=e,this.remoteStore=t,this.eventManager=s,this.sharedClientState=i,this.currentUser=r,this.maxConcurrentLimboResolutions=o,this.Pu={},this.Tu=new $n(c=>l_(c),jo),this.Iu=new Map,this.Eu=new Set,this.du=new Te(L.comparator),this.Au=new Map,this.Ru=new _l,this.Vu={},this.mu=new Map,this.fu=Es.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}function VC(n,e,t=!0){return y(this,null,function*(){const s=Y_(n);let i;const r=s.Tu.get(e);return r?(s.sharedClientState.addLocalQueryTarget(r.targetId),i=r.view.lu()):i=yield H_(s,e,t,!0),i})}function MC(n,e){return y(this,null,function*(){const t=Y_(n);yield H_(t,e,!0,!1)})}function H_(n,e,t,s){return y(this,null,function*(){const i=yield tC(n.localStore,pt(e)),r=i.targetId,o=n.sharedClientState.addLocalQueryTarget(r,t);let c;return s&&(c=yield xC(n,e,r,o==="current",i.resumeToken)),n.isPrimaryClient&&t&&L_(n.remoteStore,i),c})}function xC(n,e,t,s,i){return y(this,null,function*(){n.pu=(p,_,T)=>function(D,k,$,q){return y(this,null,function*(){let H=k.view.ru($);H.Cs&&(H=yield xd(D.localStore,k.query,!1).then(({documents:w})=>k.view.ru(w,H)));const ce=q&&q.targetChanges.get(k.targetId),Ze=q&&q.targetMismatches.get(k.targetId)!=null,ge=k.view.applyChanges(H,D.isPrimaryClient,ce,Ze);return zd(D,k.targetId,ge.au),ge.snapshot})}(n,p,_,T);const r=yield xd(n.localStore,e,!0),o=new NC(e,r.Qs),c=o.ru(r.documents),l=Gi.createSynthesizedTargetChangeForCurrentChange(t,s&&n.onlineState!=="Offline",i),h=o.applyChanges(c,n.isPrimaryClient,l);zd(n,t,h.au);const f=new kC(e,t,o);return n.Tu.set(e,f),n.Iu.has(t)?n.Iu.get(t).push(e):n.Iu.set(t,[e]),h.snapshot})}function LC(n,e,t){return y(this,null,function*(){const s=j(n),i=s.Tu.get(e),r=s.Iu.get(i.targetId);if(r.length>1)return s.Iu.set(i.targetId,r.filter(o=>!jo(o,e))),void s.Tu.delete(e);s.isPrimaryClient?(s.sharedClientState.removeLocalQueryTarget(i.targetId),s.sharedClientState.isActiveQueryTarget(i.targetId)||(yield wc(s.localStore,i.targetId,!1).then(()=>{s.sharedClientState.clearQueryState(i.targetId),t&&El(s.remoteStore,i.targetId),Rc(s,i.targetId)}).catch(bs))):(Rc(s,i.targetId),yield wc(s.localStore,i.targetId,!0))})}function FC(n,e){return y(this,null,function*(){const t=j(n),s=t.Tu.get(e),i=t.Iu.get(s.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(s.targetId),El(t.remoteStore,s.targetId))})}function UC(n,e,t){return y(this,null,function*(){const s=zC(n);try{const i=yield function(o,c){const l=j(o),h=he.now(),f=c.reduce((T,S)=>T.add(S.key),X());let p,_;return l.persistence.runTransaction("Locally write mutations","readwrite",T=>{let S=Ft(),D=X();return l.Ns.getEntries(T,f).next(k=>{S=k,S.forEach(($,q)=>{q.isValidDocument()||(D=D.add($))})}).next(()=>l.localDocuments.getOverlayedDocuments(T,S)).next(k=>{p=k;const $=[];for(const q of c){const H=ew(q,p.get(q.key).overlayedDocument);H!=null&&$.push(new En(q.key,H,t_(H.value.mapValue),He.exists(!0)))}return l.mutationQueue.addMutationBatch(T,h,$,c)}).next(k=>{_=k;const $=k.applyToLocalDocumentSet(p,D);return l.documentOverlayCache.saveOverlays(T,k.batchId,$)})}).then(()=>({batchId:_.batchId,changes:d_(p)}))}(s.localStore,e);s.sharedClientState.addPendingMutation(i.batchId),function(o,c,l){let h=o.Vu[o.currentUser.toKey()];h||(h=new Te(Y)),h=h.insert(c,l),o.Vu[o.currentUser.toKey()]=h}(s,i.batchId,t),yield Qi(s,i.changes),yield Xo(s.remoteStore)}catch(i){const r=Cl(i,"Failed to persist write");t.reject(r)}})}function z_(n,e){return y(this,null,function*(){const t=j(n);try{const s=yield Jw(t.localStore,e);e.targetChanges.forEach((i,r)=>{const o=t.Au.get(r);o&&(ne(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1,22616),i.addedDocuments.size>0?o.hu=!0:i.modifiedDocuments.size>0?ne(o.hu,14607):i.removedDocuments.size>0&&(ne(o.hu,42227),o.hu=!1))}),yield Qi(t,s,e)}catch(s){yield bs(s)}})}function Hd(n,e,t){const s=j(n);if(s.isPrimaryClient&&t===0||!s.isPrimaryClient&&t===1){const i=[];s.Tu.forEach((r,o)=>{const c=o.view.va(e);c.snapshot&&i.push(c.snapshot)}),function(o,c){const l=j(o);l.onlineState=c;let h=!1;l.queries.forEach((f,p)=>{for(const _ of p.Sa)_.va(c)&&(h=!0)}),h&&Sl(l)}(s.eventManager,e),i.length&&s.Pu.H_(i),s.onlineState=e,s.isPrimaryClient&&s.sharedClientState.setOnlineState(e)}}function BC(n,e,t){return y(this,null,function*(){const s=j(n);s.sharedClientState.updateQueryState(e,"rejected",t);const i=s.Au.get(e),r=i&&i.key;if(r){let o=new Te(L.comparator);o=o.insert(r,Fe.newNoDocument(r,W.min()));const c=X().add(r),l=new Ko(W.min(),new Map,new Te(Y),o,c);yield z_(s,l),s.du=s.du.remove(r),s.Au.delete(e),Nl(s)}else yield wc(s.localStore,e,!1).then(()=>Rc(s,e,t)).catch(bs)})}function qC(n,e){return y(this,null,function*(){const t=j(n),s=e.batch.batchId;try{const i=yield Xw(t.localStore,e);K_(t,s,null),G_(t,s),t.sharedClientState.updateMutationState(s,"acknowledged"),yield Qi(t,i)}catch(i){yield bs(i)}})}function WC(n,e,t){return y(this,null,function*(){const s=j(n);try{const i=yield function(o,c){const l=j(o);return l.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let f;return l.mutationQueue.lookupMutationBatch(h,c).next(p=>(ne(p!==null,37113),f=p.keys(),l.mutationQueue.removeMutationBatch(h,p))).next(()=>l.mutationQueue.performConsistencyCheck(h)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(h,f,c)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f)).next(()=>l.localDocuments.getDocuments(h,f))})}(s.localStore,e);K_(s,e,t),G_(s,e),s.sharedClientState.updateMutationState(e,"rejected",t),yield Qi(s,i)}catch(i){yield bs(i)}})}function G_(n,e){(n.mu.get(e)||[]).forEach(t=>{t.resolve()}),n.mu.delete(e)}function K_(n,e,t){const s=j(n);let i=s.Vu[s.currentUser.toKey()];if(i){const r=i.get(e);r&&(t?r.reject(t):r.resolve(),i=i.remove(e)),s.Vu[s.currentUser.toKey()]=i}}function Rc(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const s of n.Iu.get(e))n.Tu.delete(s),t&&n.Pu.yu(s,t);n.Iu.delete(e),n.isPrimaryClient&&n.Ru.jr(e).forEach(s=>{n.Ru.containsKey(s)||Q_(n,s)})}function Q_(n,e){n.Eu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(El(n.remoteStore,t),n.du=n.du.remove(e),n.Au.delete(t),Nl(n))}function zd(n,e,t){for(const s of t)s instanceof j_?(n.Ru.addReference(s.key,e),jC(n,s)):s instanceof $_?(x(bl,"Document no longer in limbo: "+s.key),n.Ru.removeReference(s.key,e),n.Ru.containsKey(s.key)||Q_(n,s.key)):U(19791,{wu:s})}function jC(n,e){const t=e.key,s=t.path.canonicalString();n.du.get(t)||n.Eu.has(s)||(x(bl,"New document in limbo: "+t),n.Eu.add(s),Nl(n))}function Nl(n){for(;n.Eu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Eu.values().next().value;n.Eu.delete(e);const t=new L(ae.fromString(e)),s=n.fu.next();n.Au.set(s,new DC(t)),n.du=n.du.insert(t,s),L_(n.remoteStore,new Zt(pt(Wo(t.path)),s,"TargetPurposeLimboResolution",Uo.ce))}}function Qi(n,e,t){return y(this,null,function*(){const s=j(n),i=[],r=[],o=[];s.Tu.isEmpty()||(s.Tu.forEach((c,l)=>{o.push(s.pu(l,e,t).then(h=>{var f;if((h||t)&&s.isPrimaryClient){const p=h?!h.fromCache:(f=t==null?void 0:t.targetChanges.get(l.targetId))==null?void 0:f.current;s.sharedClientState.updateQueryState(l.targetId,p?"current":"not-current")}if(h){i.push(h);const p=gl.As(l.targetId,h);r.push(p)}}))}),yield Promise.all(o),s.Pu.H_(i),yield function(l,h){return y(this,null,function*(){const f=j(l);try{yield f.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>N.forEach(h,_=>N.forEach(_.Es,T=>f.persistence.referenceDelegate.addReference(p,_.targetId,T)).next(()=>N.forEach(_.ds,T=>f.persistence.referenceDelegate.removeReference(p,_.targetId,T)))))}catch(p){if(!Ns(p))throw p;x(yl,"Failed to update sequence numbers: "+p)}for(const p of h){const _=p.targetId;if(!p.fromCache){const T=f.Ms.get(_),S=T.snapshotVersion,D=T.withLastLimboFreeSnapshotVersion(S);f.Ms=f.Ms.insert(_,D)}}})}(s.localStore,r))})}function $C(n,e){return y(this,null,function*(){const t=j(n);if(!t.currentUser.isEqual(e)){x(bl,"User change. New user:",e.toKey());const s=yield O_(t.localStore,e);t.currentUser=e,function(r,o){r.mu.forEach(c=>{c.forEach(l=>{l.reject(new M(b.CANCELLED,o))})}),r.mu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,s.removedBatchIds,s.addedBatchIds),yield Qi(t,s.Ls)}})}function HC(n,e){const t=j(n),s=t.Au.get(e);if(s&&s.hu)return X().add(s.key);{let i=X();const r=t.Iu.get(e);if(!r)return i;for(const o of r){const c=t.Tu.get(o);i=i.unionWith(c.view.nu)}return i}}function Y_(n){const e=j(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=z_.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=HC.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=BC.bind(null,e),e.Pu.H_=PC.bind(null,e.eventManager),e.Pu.yu=bC.bind(null,e.eventManager),e}function zC(n){const e=j(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=qC.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=WC.bind(null,e),e}class po{constructor(){this.kind="memory",this.synchronizeTabs=!1}initialize(e){return y(this,null,function*(){this.serializer=Qo(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),yield this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)})}Fu(e,t){return null}Mu(e,t){return null}vu(e){return Yw(this.persistence,new Gw,e.initialUser,this.serializer)}Cu(e){return new D_(ml.mi,this.serializer)}Du(e){return new sC}terminate(){return y(this,null,function*(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),yield this.persistence.shutdown()})}}po.provider={build:()=>new po};class GC extends po{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){ne(this.persistence.referenceDelegate instanceof ho,46915);const s=this.persistence.referenceDelegate.garbageCollector;return new Dw(s,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?ze.withCacheSize(this.cacheSizeBytes):ze.DEFAULT;return new D_(s=>ho.mi(s,t),this.serializer)}}class Sc{initialize(e,t){return y(this,null,function*(){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=s=>Hd(this.syncEngine,s,1),this.remoteStore.remoteSyncer.handleCredentialChange=$C.bind(null,this.syncEngine),yield AC(this.remoteStore,this.syncEngine.isPrimaryClient))})}createEventManager(e){return function(){return new SC}()}createDatastore(e){const t=Qo(e.databaseInfo.databaseId),s=function(r){return new cC(r)}(e.databaseInfo);return function(r,o,c,l){return new dC(r,o,c,l)}(e.authCredentials,e.appCheckCredentials,s,t)}createRemoteStore(e){return function(s,i,r,o,c){return new pC(s,i,r,o,c)}(this.localStore,this.datastore,e.asyncQueue,t=>Hd(this.syncEngine,t,0),function(){return Ud.v()?new Ud:new iC}())}createSyncEngine(e,t){return function(i,r,o,c,l,h,f){const p=new OC(i,r,o,c,l,h);return f&&(p.gu=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}terminate(){return y(this,null,function*(){var e,t;yield function(i){return y(this,null,function*(){const r=j(i);x(Fn,"RemoteStore shutting down."),r.Ea.add(5),yield Ki(r),r.Aa.shutdown(),r.Ra.set("Unknown")})}(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()})}}Sc.provider={build:()=>new Sc};/**
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
 */class kl{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):Lt("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
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
 */const pn="FirestoreClient";class KC{constructor(e,t,s,i,r){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=s,this.databaseInfo=i,this.user=Le.UNAUTHENTICATED,this.clientId=rl.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=r,this.authCredentials.start(s,o=>y(this,null,function*(){x(pn,"Received user=",o.uid),yield this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(s,o=>(x(pn,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Dt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(()=>y(this,null,function*(){try{this._onlineComponents&&(yield this._onlineComponents.terminate()),this._offlineComponents&&(yield this._offlineComponents.terminate()),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const s=Cl(t,"Failed to shutdown persistence");e.reject(s)}})),e.promise}}function Ka(n,e){return y(this,null,function*(){n.asyncQueue.verifyOperationInProgress(),x(pn,"Initializing OfflineComponentProvider");const t=n.configuration;yield e.initialize(t);let s=t.initialUser;n.setCredentialChangeListener(i=>y(this,null,function*(){s.isEqual(i)||(yield O_(e.localStore,i),s=i)})),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e})}function Gd(n,e){return y(this,null,function*(){n.asyncQueue.verifyOperationInProgress();const t=yield QC(n);x(pn,"Initializing OnlineComponentProvider"),yield e.initialize(t,n.configuration),n.setCredentialChangeListener(s=>qd(e.remoteStore,s)),n.setAppCheckTokenChangeListener((s,i)=>qd(e.remoteStore,i)),n._onlineComponents=e})}function QC(n){return y(this,null,function*(){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){x(pn,"Using user provided OfflineComponentProvider");try{yield Ka(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(i){return i.name==="FirebaseError"?i.code===b.FAILED_PRECONDITION||i.code===b.UNIMPLEMENTED:!(typeof DOMException!="undefined"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(t))throw t;_s("Error using user provided cache. Falling back to memory cache: "+t),yield Ka(n,new po)}}else x(pn,"Using default OfflineComponentProvider"),yield Ka(n,new GC(void 0));return n._offlineComponents})}function X_(n){return y(this,null,function*(){return n._onlineComponents||(n._uninitializedComponentsProvider?(x(pn,"Using user provided OnlineComponentProvider"),yield Gd(n,n._uninitializedComponentsProvider._online)):(x(pn,"Using default OnlineComponentProvider"),yield Gd(n,new Sc))),n._onlineComponents})}function YC(n){return X_(n).then(e=>e.syncEngine)}function _o(n){return y(this,null,function*(){const e=yield X_(n),t=e.eventManager;return t.onListen=VC.bind(null,e.syncEngine),t.onUnlisten=LC.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=MC.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=FC.bind(null,e.syncEngine),t})}function XC(n,e,t={}){const s=new Dt;return n.asyncQueue.enqueueAndForget(()=>y(this,null,function*(){return function(r,o,c,l,h){const f=new kl({next:_=>{f.Nu(),o.enqueueAndForget(()=>Rl(r,p));const T=_.docs.has(c);!T&&_.fromCache?h.reject(new M(b.UNAVAILABLE,"Failed to get document because the client is offline.")):T&&_.fromCache&&l&&l.source==="server"?h.reject(new M(b.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(_)},error:_=>h.reject(_)}),p=new Pl(Wo(c.path),f,{includeMetadataChanges:!0,qa:!0});return Al(r,p)}(yield _o(n),n.asyncQueue,e,t,s)})),s.promise}function JC(n,e,t={}){const s=new Dt;return n.asyncQueue.enqueueAndForget(()=>y(this,null,function*(){return function(r,o,c,l,h){const f=new kl({next:_=>{f.Nu(),o.enqueueAndForget(()=>Rl(r,p)),_.fromCache&&l.source==="server"?h.reject(new M(b.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(_)},error:_=>h.reject(_)}),p=new Pl(c,f,{includeMetadataChanges:!0,qa:!0});return Al(r,p)}(yield _o(n),n.asyncQueue,e,t,s)})),s.promise}/**
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
 */function J_(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
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
 */const Kd=new Map;/**
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
 */const Z_="firestore.googleapis.com",Qd=!0;class Yd{constructor(e){var t,s;if(e.host===void 0){if(e.ssl!==void 0)throw new M(b.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Z_,this.ssl=Qd}else this.host=e.host,this.ssl=(t=e.ssl)!=null?t:Qd;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=k_;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Nw)throw new M(b.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}dT("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=J_((s=e.experimentalLongPollingOptions)!=null?s:{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new M(b.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new M(b.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new M(b.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(s,i){return s.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Jo{constructor(e,t,s,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=s,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Yd({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new M(b.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new M(b.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Yd(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(s){if(!s)return new nT;switch(s.type){case"firstParty":return new oT(s.sessionIndex||"0",s.iamToken||null,s.authTokenFactory||null);case"provider":return s.client;default:throw new M(b.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}_restart(){return y(this,null,function*(){this._terminateTask==="notTerminated"?yield this._terminate():this._terminateTask="notTerminated"})}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const s=Kd.get(t);s&&(x("ComponentProvider","Removing Datastore"),Kd.delete(t),s.terminate())}(this),Promise.resolve()}}function ZC(n,e,t,s={}){var h;n=$e(n,Jo);const i=gn(e),r=n._getSettings(),o=Rt(ee({},r),{emulatorOptions:n._getEmulatorOptions()}),c=`${e}:${t}`;i&&(jc(`https://${c}`),$c("Firestore",!0)),r.host!==Z_&&r.host!==c&&_s("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const l=Rt(ee({},r),{host:c,ssl:i,emulatorOptions:s});if(!an(l,o)&&(n._setSettings(l),s.mockUserToken)){let f,p;if(typeof s.mockUserToken=="string")f=s.mockUserToken,p=Le.MOCK_USER;else{f=Yf(s.mockUserToken,(h=n._app)==null?void 0:h.options.projectId);const _=s.mockUserToken.sub||s.mockUserToken.user_id;if(!_)throw new M(b.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new Le(_)}n._authCredentials=new sT(new jp(f,p))}}/**
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
 */class jt{constructor(e,t,s){this.converter=t,this._query=s,this.type="query",this.firestore=e}withConverter(e){return new jt(this.firestore,e,this._query)}}class pe{constructor(e,t,s){this.converter=t,this._key=s,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new rn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new pe(this.firestore,e,this._key)}toJSON(){return{type:pe._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,s){if(Hi(t,pe._jsonSchema))return new pe(e,s||null,new L(ae.fromString(t.referencePath)))}}pe._jsonSchemaVersion="firestore/documentReference/1.0",pe._jsonSchema={type:Ie("string",pe._jsonSchemaVersion),referencePath:Ie("string")};class rn extends jt{constructor(e,t,s){super(e,t,Wo(s)),this._path=s,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new pe(this.firestore,null,new L(e))}withConverter(e){return new rn(this.firestore,e,this._path)}}function BP(n,e,...t){if(n=se(n),$p("collection","path",e),n instanceof Jo){const s=ae.fromString(e,...t);return ld(s),new rn(n,null,s)}{if(!(n instanceof pe||n instanceof rn))throw new M(b.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=n._path.child(ae.fromString(e,...t));return ld(s),new rn(n.firestore,null,s)}}function eA(n,e,...t){if(n=se(n),arguments.length===1&&(e=rl.newId()),$p("doc","path",e),n instanceof Jo){const s=ae.fromString(e,...t);return cd(s),new pe(n,null,new L(s))}{if(!(n instanceof pe||n instanceof rn))throw new M(b.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=n._path.child(ae.fromString(e,...t));return cd(s),new pe(n.firestore,n instanceof rn?n.converter:null,new L(s))}}/**
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
 */const Xd="AsyncQueue";class Jd{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new M_(this,"async_queue_retry"),this._c=()=>{const s=Ga();s&&x(Xd,"Visibility state changed to "+s.visibilityState),this.M_.w_()},this.ac=e;const t=Ga();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=Ga();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new Dt;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Xu.push(e),this.lc()))}lc(){return y(this,null,function*(){if(this.Xu.length!==0){try{yield this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!Ns(e))throw e;x(Xd,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}})}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(s=>{throw this.nc=s,this.rc=!1,Lt("INTERNAL UNHANDLED ERROR: ",Zd(s)),s}).then(s=>(this.rc=!1,s))));return this.ac=t,t}enqueueAfterDelay(e,t,s){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const i=wl.createAndSchedule(this,e,t,s,r=>this.hc(r));return this.tc.push(i),i}uc(){this.nc&&U(47125,{Pc:Zd(this.nc)})}verifyOperationInProgress(){}Tc(){return y(this,null,function*(){let e;do e=this.ac,yield e;while(e!==this.ac)})}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((t,s)=>t.targetTimeMs-s.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()})}dc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function Zd(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}/**
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
 */function ef(n){return function(t,s){if(typeof t!="object"||t===null)return!1;const i=t;for(const r of s)if(r in i&&typeof i[r]=="function")return!0;return!1}(n,["next","error","complete"])}class Et extends Jo{constructor(e,t,s,i){super(e,t,s,i),this.type="firestore",this._queue=new Jd,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}_terminate(){return y(this,null,function*(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Jd(e),this._firestoreClient=void 0,yield e}})}}function qP(n,e){const t=typeof n=="object"?n:Gc(),s=typeof n=="string"?n:ro,i=Vo(t,"firestore").getImmediate({identifier:s});if(!i._initialized){const r=Gf("firestore");r&&ZC(i,...r)}return i}function Yi(n){if(n._terminated)throw new M(b.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||tA(n),n._firestoreClient}function tA(n){var s,i,r;const e=n._freezeSettings(),t=function(c,l,h,f){return new CT(c,l,h,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,J_(f.experimentalLongPollingOptions),f.useFetchStreams,f.isUsingEmulator)}(n._databaseId,((s=n._app)==null?void 0:s.options.appId)||"",n._persistenceKey,e);n._componentsProvider||(i=e.localCache)!=null&&i._offlineComponentProvider&&((r=e.localCache)!=null&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new KC(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&function(c){const l=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(l),_online:l}}(n._componentsProvider))}/**
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
 */class et{constructor(e){this._byteString=e}static fromBase64String(e){try{return new et(ke.fromBase64String(e))}catch(t){throw new M(b.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new et(ke.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:et._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Hi(e,et._jsonSchema))return et.fromBase64String(e.bytes)}}et._jsonSchemaVersion="firestore/bytes/1.0",et._jsonSchema={type:Ie("string",et._jsonSchemaVersion),bytes:Ie("string")};/**
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
 */class Xi{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new M(b.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ne(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class Zo{constructor(e){this._methodName=e}}/**
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
 */class mt{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new M(b.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new M(b.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return Y(this._lat,e._lat)||Y(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:mt._jsonSchemaVersion}}static fromJSON(e){if(Hi(e,mt._jsonSchema))return new mt(e.latitude,e.longitude)}}mt._jsonSchemaVersion="firestore/geoPoint/1.0",mt._jsonSchema={type:Ie("string",mt._jsonSchemaVersion),latitude:Ie("number"),longitude:Ie("number")};/**
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
 */class gt{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(s,i){if(s.length!==i.length)return!1;for(let r=0;r<s.length;++r)if(s[r]!==i[r])return!1;return!0}(this._values,e._values)}toJSON(){return{type:gt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Hi(e,gt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new gt(e.vectorValues);throw new M(b.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}gt._jsonSchemaVersion="firestore/vectorValue/1.0",gt._jsonSchema={type:Ie("string",gt._jsonSchemaVersion),vectorValues:Ie("object")};/**
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
 */const nA=/^__.*__$/;class sA{constructor(e,t,s){this.data=e,this.fieldMask=t,this.fieldTransforms=s}toMutation(e,t){return this.fieldMask!==null?new En(e,this.data,this.fieldMask,t,this.fieldTransforms):new zi(e,this.data,t,this.fieldTransforms)}}class em{constructor(e,t,s){this.data=e,this.fieldMask=t,this.fieldTransforms=s}toMutation(e,t){return new En(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function tm(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw U(40011,{Ac:n})}}class Dl{constructor(e,t,s,i,r,o){this.settings=e,this.databaseId=t,this.serializer=s,this.ignoreUndefinedProperties=i,r===void 0&&this.Rc(),this.fieldTransforms=r||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new Dl(ee(ee({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){var i;const t=(i=this.path)==null?void 0:i.child(e),s=this.Vc({path:t,fc:!1});return s.gc(e),s}yc(e){var i;const t=(i=this.path)==null?void 0:i.child(e),s=this.Vc({path:t,fc:!1});return s.Rc(),s}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return mo(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(e.length===0)throw this.Sc("Document fields must not be empty");if(tm(this.Ac)&&nA.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class iA{constructor(e,t,s){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=s||Qo(e)}Cc(e,t,s,i=!1){return new Dl({Ac:e,methodName:t,Dc:s,path:Ne.emptyPath(),fc:!1,bc:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Ji(n){const e=n._freezeSettings(),t=Qo(n._databaseId);return new iA(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Ol(n,e,t,s,i,r={}){const o=n.Cc(r.merge||r.mergeFields?2:0,e,t,i);Ml("Data must be an object, but it was:",o,s);const c=im(s,o);let l,h;if(r.merge)l=new Je(o.fieldMask),h=o.fieldTransforms;else if(r.mergeFields){const f=[];for(const p of r.mergeFields){const _=Pc(e,p,t);if(!o.contains(_))throw new M(b.INVALID_ARGUMENT,`Field '${_}' is specified in your field mask but missing from your input data.`);om(f,_)||f.push(_)}l=new Je(f),h=o.fieldTransforms.filter(p=>l.covers(p.field))}else l=null,h=o.fieldTransforms;return new sA(new Ge(c),l,h)}class ea extends Zo{_toFieldTransform(e){if(e.Ac!==2)throw e.Ac===1?e.Sc(`${this._methodName}() can only appear at the top level of your update data`):e.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof ea}}class Vl extends Zo{_toFieldTransform(e){return new YT(e.path,new bi)}isEqual(e){return e instanceof Vl}}function nm(n,e,t,s){const i=n.Cc(1,e,t);Ml("Data must be an object, but it was:",i,s);const r=[],o=Ge.empty();yn(s,(l,h)=>{const f=xl(e,l,t);h=se(h);const p=i.yc(f);if(h instanceof ea)r.push(f);else{const _=Zi(h,p);_!=null&&(r.push(f),o.set(f,_))}});const c=new Je(r);return new em(o,c,i.fieldTransforms)}function sm(n,e,t,s,i,r){const o=n.Cc(1,e,t),c=[Pc(e,s,t)],l=[i];if(r.length%2!=0)throw new M(b.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let _=0;_<r.length;_+=2)c.push(Pc(e,r[_])),l.push(r[_+1]);const h=[],f=Ge.empty();for(let _=c.length-1;_>=0;--_)if(!om(h,c[_])){const T=c[_];let S=l[_];S=se(S);const D=o.yc(T);if(S instanceof ea)h.push(T);else{const k=Zi(S,D);k!=null&&(h.push(T),f.set(T,k))}}const p=new Je(h);return new em(f,p,o.fieldTransforms)}function rA(n,e,t,s=!1){return Zi(t,n.Cc(s?4:3,e))}function Zi(n,e){if(rm(n=se(n)))return Ml("Unsupported field value:",e,n),im(n,e);if(n instanceof Zo)return function(s,i){if(!tm(i.Ac))throw i.Sc(`${s._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Sc(`${s._methodName}() is not currently supported inside arrays`);const r=s._toFieldTransform(i);r&&i.fieldTransforms.push(r)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.fc&&e.Ac!==4)throw e.Sc("Nested arrays are not supported");return function(s,i){const r=[];let o=0;for(const c of s){let l=Zi(c,i.wc(o));l==null&&(l={nullValue:"NULL_VALUE"}),r.push(l),o++}return{arrayValue:{values:r}}}(n,e)}return function(s,i){if((s=se(s))===null)return{nullValue:"NULL_VALUE"};if(typeof s=="number")return GT(i.serializer,s);if(typeof s=="boolean")return{booleanValue:s};if(typeof s=="string")return{stringValue:s};if(s instanceof Date){const r=he.fromDate(s);return{timestampValue:uo(i.serializer,r)}}if(s instanceof he){const r=new he(s.seconds,1e3*Math.floor(s.nanoseconds/1e3));return{timestampValue:uo(i.serializer,r)}}if(s instanceof mt)return{geoPointValue:{latitude:s.latitude,longitude:s.longitude}};if(s instanceof et)return{bytesValue:C_(i.serializer,s._byteString)};if(s instanceof pe){const r=i.databaseId,o=s.firestore._databaseId;if(!o.isEqual(r))throw i.Sc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${r.projectId}/${r.database}`);return{referenceValue:pl(s.firestore._databaseId||i.databaseId,s._key.path)}}if(s instanceof gt)return function(o,c){return{mapValue:{fields:{[Zp]:{stringValue:e_},[oo]:{arrayValue:{values:o.toArray().map(h=>{if(typeof h!="number")throw c.Sc("VectorValues must only contain numeric values.");return hl(c.serializer,h)})}}}}}}(s,i);throw i.Sc(`Unsupported field value: ${Fo(s)}`)}(n,e)}function im(n,e){const t={};return Gp(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):yn(n,(s,i)=>{const r=Zi(i,e.mc(s));r!=null&&(t[s]=r)}),{mapValue:{fields:t}}}function rm(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof he||n instanceof mt||n instanceof et||n instanceof pe||n instanceof Zo||n instanceof gt)}function Ml(n,e,t){if(!rm(t)||!Hp(t)){const s=Fo(t);throw s==="an object"?e.Sc(n+" a custom object"):e.Sc(n+" "+s)}}function Pc(n,e,t){if((e=se(e))instanceof Xi)return e._internalPath;if(typeof e=="string")return xl(n,e);throw mo("Field path arguments must be of type string or ",n,!1,void 0,t)}const oA=new RegExp("[~\\*/\\[\\]]");function xl(n,e,t){if(e.search(oA)>=0)throw mo(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Xi(...e.split("."))._internalPath}catch(s){throw mo(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function mo(n,e,t,s,i){const r=s&&!s.isEmpty(),o=i!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(r||o)&&(l+=" (found",r&&(l+=` in field ${s}`),o&&(l+=` in document ${i}`),l+=")"),new M(b.INVALID_ARGUMENT,c+n+l)}function om(n,e){return n.some(t=>t.isEqual(e))}/**
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
 */class am{constructor(e,t,s,i,r){this._firestore=e,this._userDataWriter=t,this._key=s,this._document=i,this._converter=r}get id(){return this._key.path.lastSegment()}get ref(){return new pe(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new aA(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(ta("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class aA extends am{data(){return super.data()}}function ta(n,e){return typeof e=="string"?xl(n,e):e instanceof Xi?e._internalPath:e._delegate._internalPath}/**
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
 */function cm(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new M(b.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Ll{}class Fl extends Ll{}function WP(n,e,...t){let s=[];e instanceof Ll&&s.push(e),s=s.concat(t),function(r){const o=r.filter(l=>l instanceof Ul).length,c=r.filter(l=>l instanceof na).length;if(o>1||o>0&&c>0)throw new M(b.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(s);for(const i of s)n=i._apply(n);return n}class na extends Fl{constructor(e,t,s){super(),this._field=e,this._op=t,this._value=s,this.type="where"}static _create(e,t,s){return new na(e,t,s)}_apply(e){const t=this._parse(e);return lm(e._query,t),new jt(e.firestore,e.converter,yc(e._query,t))}_parse(e){const t=Ji(e.firestore);return function(r,o,c,l,h,f,p){let _;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new M(b.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){nf(p,f);const S=[];for(const D of p)S.push(tf(l,r,D));_={arrayValue:{values:S}}}else _=tf(l,r,p)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||nf(p,f),_=rA(c,o,p,f==="in"||f==="not-in");return ve.create(h,f,_)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function jP(n,e,t){const s=e,i=ta("where",n);return na._create(i,s,t)}class Ul extends Ll{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Ul(e,t)}_parse(e){const t=this._queryConstraints.map(s=>s._parse(e)).filter(s=>s.getFilters().length>0);return t.length===1?t[0]:lt.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(i,r){let o=i;const c=r.getFlattenedFilters();for(const l of c)lm(o,l),o=yc(o,l)}(e._query,t),new jt(e.firestore,e.converter,yc(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Bl extends Fl{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Bl(e,t)}_apply(e){const t=function(i,r,o){if(i.startAt!==null)throw new M(b.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new M(b.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Pi(r,o)}(e._query,this._field,this._direction);return new jt(e.firestore,e.converter,function(i,r){const o=i.explicitOrderBy.concat([r]);return new ks(i.path,i.collectionGroup,o,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(e._query,t))}}function $P(n,e="asc"){const t=e,s=ta("orderBy",n);return Bl._create(s,t)}class ql extends Fl{constructor(e,t,s){super(),this.type=e,this._limit=t,this._limitType=s}static _create(e,t,s){return new ql(e,t,s)}_apply(e){return new jt(e.firestore,e.converter,co(e._query,this._limit,this._limitType))}}function HP(n){return fT("limit",n),ql._create("limit",n,"F")}function tf(n,e,t){if(typeof(t=se(t))=="string"){if(t==="")throw new M(b.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!c_(e)&&t.indexOf("/")!==-1)throw new M(b.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const s=e.path.child(ae.fromString(t));if(!L.isDocumentKey(s))throw new M(b.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${s}' is not because it has an odd number of segments (${s.length}).`);return gd(n,new L(s))}if(t instanceof pe)return gd(n,t._key);throw new M(b.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Fo(t)}.`)}function nf(n,e){if(!Array.isArray(n)||n.length===0)throw new M(b.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function lm(n,e){const t=function(i,r){for(const o of i)for(const c of o.getFlattenedFilters())if(r.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new M(b.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new M(b.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class cA{convertValue(e,t="none"){switch(dn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return _e(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(hn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw U(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const s={};return yn(e,(i,r)=>{s[i]=this.convertValue(r,t)}),s}convertVectorValue(e){var s,i,r;const t=(r=(i=(s=e.fields)==null?void 0:s[oo].arrayValue)==null?void 0:i.values)==null?void 0:r.map(o=>_e(o.doubleValue));return new gt(t)}convertGeoPoint(e){return new mt(_e(e.latitude),_e(e.longitude))}convertArray(e,t){return(e.values||[]).map(s=>this.convertValue(s,t))}convertServerTimestamp(e,t){switch(t){case"previous":const s=qo(e);return s==null?null:this.convertValue(s,t);case"estimate":return this.convertTimestamp(Ai(e));default:return null}}convertTimestamp(e){const t=un(e);return new he(t.seconds,t.nanos)}convertDocumentKey(e,t){const s=ae.fromString(e);ne(N_(s),9688,{name:e});const i=new Ri(s.get(1),s.get(3)),r=new L(s.popFirst(5));return i.isEqual(t)||Lt(`Document ${r} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),r}}/**
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
 */function Wl(n,e,t){let s;return s=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,s}class ci{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class On extends am{constructor(e,t,s,i,r,o){super(e,t,s,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=r}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new $r(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const s=this._document.data.field(ta("DocumentSnapshot.get",e));if(s!==null)return this._userDataWriter.convertValue(s,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new M(b.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=On._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}On._jsonSchemaVersion="firestore/documentSnapshot/1.0",On._jsonSchema={type:Ie("string",On._jsonSchemaVersion),bundleSource:Ie("string","DocumentSnapshot"),bundleName:Ie("string"),bundle:Ie("string")};class $r extends On{data(e={}){return super.data(e)}}class Vn{constructor(e,t,s,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new ci(i.hasPendingWrites,i.fromCache),this.query=s}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(s=>{e.call(t,new $r(this._firestore,this._userDataWriter,s.key,s,new ci(this._snapshot.mutatedKeys.has(s.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new M(b.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,r){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map(c=>{const l=new $r(i._firestore,i._userDataWriter,c.doc.key,c.doc,new ci(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:o++}})}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(c=>r||c.type!==3).map(c=>{const l=new $r(i._firestore,i._userDataWriter,c.doc.key,c.doc,new ci(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);let h=-1,f=-1;return c.type!==0&&(h=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),f=o.indexOf(c.doc.key)),{type:lA(c.type),doc:l,oldIndex:h,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new M(b.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Vn._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=rl.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],s=[],i=[];return this.docs.forEach(r=>{r._document!==null&&(t.push(r._document),s.push(this._userDataWriter.convertObjectMap(r._document.data.value.mapValue.fields,"previous")),i.push(r.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function lA(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return U(61501,{type:n})}}/**
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
 */function zP(n){n=$e(n,pe);const e=$e(n.firestore,Et);return XC(Yi(e),n._key).then(t=>um(e,n,t))}Vn._jsonSchemaVersion="firestore/querySnapshot/1.0",Vn._jsonSchema={type:Ie("string",Vn._jsonSchemaVersion),bundleSource:Ie("string","QuerySnapshot"),bundleName:Ie("string"),bundle:Ie("string")};class jl extends cA{constructor(e){super(),this.firestore=e}convertBytes(e){return new et(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new pe(this.firestore,null,t)}}function GP(n){n=$e(n,jt);const e=$e(n.firestore,Et),t=Yi(e),s=new jl(e);return cm(n._query),JC(t,n._query).then(i=>new Vn(e,s,n,i))}function KP(n,e,t){n=$e(n,pe);const s=$e(n.firestore,Et),i=Wl(n.converter,e,t);return er(s,[Ol(Ji(s),"setDoc",n._key,i,n.converter!==null,t).toMutation(n._key,He.none())])}function QP(n,e,t,...s){n=$e(n,pe);const i=$e(n.firestore,Et),r=Ji(i);let o;return o=typeof(e=se(e))=="string"||e instanceof Xi?sm(r,"updateDoc",n._key,e,t,s):nm(r,"updateDoc",n._key,e),er(i,[o.toMutation(n._key,He.exists(!0))])}function YP(n){return er($e(n.firestore,Et),[new Go(n._key,He.none())])}function XP(n,e){const t=$e(n.firestore,Et),s=eA(n),i=Wl(n.converter,e);return er(t,[Ol(Ji(n.firestore),"addDoc",s._key,i,n.converter!==null,{}).toMutation(s._key,He.exists(!1))]).then(()=>s)}function JP(n,...e){var l,h,f;n=se(n);let t={includeMetadataChanges:!1,source:"default"},s=0;typeof e[s]!="object"||ef(e[s])||(t=e[s++]);const i={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(ef(e[s])){const p=e[s];e[s]=(l=p.next)==null?void 0:l.bind(p),e[s+1]=(h=p.error)==null?void 0:h.bind(p),e[s+2]=(f=p.complete)==null?void 0:f.bind(p)}let r,o,c;if(n instanceof pe)o=$e(n.firestore,Et),c=Wo(n._key.path),r={next:p=>{e[s]&&e[s](um(o,n,p))},error:e[s+1],complete:e[s+2]};else{const p=$e(n,jt);o=$e(p.firestore,Et),c=p._query;const _=new jl(o);r={next:T=>{e[s]&&e[s](new Vn(o,_,p,T))},error:e[s+1],complete:e[s+2]},cm(n._query)}return function(_,T,S,D){const k=new kl(D),$=new Pl(T,k,S);return _.asyncQueue.enqueueAndForget(()=>y(this,null,function*(){return Al(yield _o(_),$)})),()=>{k.Nu(),_.asyncQueue.enqueueAndForget(()=>y(this,null,function*(){return Rl(yield _o(_),$)}))}}(Yi(o),c,i,r)}function er(n,e){return function(s,i){const r=new Dt;return s.asyncQueue.enqueueAndForget(()=>y(this,null,function*(){return UC(yield YC(s),i,r)})),r.promise}(Yi(n),e)}function um(n,e,t){const s=t.docs.get(e._key),i=new jl(n);return new On(n,i,e._key,s,new ci(t.hasPendingWrites,t.fromCache),e.converter)}/**
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
 */class uA{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=Ji(e)}set(e,t,s){this._verifyNotCommitted();const i=Qa(e,this._firestore),r=Wl(i.converter,t,s),o=Ol(this._dataReader,"WriteBatch.set",i._key,r,i.converter!==null,s);return this._mutations.push(o.toMutation(i._key,He.none())),this}update(e,t,s,...i){this._verifyNotCommitted();const r=Qa(e,this._firestore);let o;return o=typeof(t=se(t))=="string"||t instanceof Xi?sm(this._dataReader,"WriteBatch.update",r._key,t,s,i):nm(this._dataReader,"WriteBatch.update",r._key,t),this._mutations.push(o.toMutation(r._key,He.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=Qa(e,this._firestore);return this._mutations=this._mutations.concat(new Go(t._key,He.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new M(b.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Qa(n,e){if((n=se(n)).firestore!==e)throw new M(b.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}function ZP(){return new Vl("serverTimestamp")}/**
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
 */function eb(n){return Yi(n=$e(n,Et)),new uA(n,e=>er(n,e))}(function(e,t=!0){(function(i){Ps=i})(jn),Mn(new cn("firestore",(s,{instanceIdentifier:i,options:r})=>{const o=s.getProvider("app").getImmediate(),c=new Et(new iT(s.getProvider("auth-internal")),new aT(o,s.getProvider("app-check-internal")),function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new M(b.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ri(h.options.projectId,f)}(o,i),o);return r=ee({useFetchStreams:t},r),c._setSettings(r),c},"PUBLIC").setMultipleInstances(!0)),ht(id,rd,e),ht(id,rd,"esm2020")})();var hA="firebase",dA="12.1.0";/**
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
 */ht(hA,dA,"app");var sf={};const rf="@firebase/database",of="1.1.0";/**
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
 */let hm="";function fA(n){hm=n}/**
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
 */class pA{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),Se(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:Ii(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
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
 */class _A{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return vt(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
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
 */const dm=function(n){try{if(typeof window!="undefined"&&typeof window[n]!="undefined"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new pA(e)}}catch(e){}return new _A},Nn=dm("localStorage"),mA=dm("sessionStorage");/**
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
 */const ls=new Oo("@firebase/database"),gA=function(){let n=1;return function(){return n++}}(),fm=function(n){const e=My(n),t=new ky;t.update(e);const s=t.digest();return Wc.encodeByteArray(s)},tr=function(...n){let e="";for(let t=0;t<n.length;t++){const s=n[t];Array.isArray(s)||s&&typeof s=="object"&&typeof s.length=="number"?e+=tr.apply(null,s):typeof s=="object"?e+=Se(s):e+=s,e+=" "}return e};let mi=null,af=!0;const yA=function(n,e){O(!0,"Can't turn on custom loggers persistently."),ls.logLevel=Q.VERBOSE,mi=ls.log.bind(ls)},be=function(...n){if(af===!0&&(af=!1,mi===null&&mA.get("logging_enabled")===!0&&yA()),mi){const e=tr.apply(null,n);mi(e)}},nr=function(n){return function(...e){be(n,...e)}},bc=function(...n){const e="FIREBASE INTERNAL ERROR: "+tr(...n);ls.error(e)},Ut=function(...n){const e=`FIREBASE FATAL ERROR: ${tr(...n)}`;throw ls.error(e),new Error(e)},Ye=function(...n){const e="FIREBASE WARNING: "+tr(...n);ls.warn(e)},EA=function(){typeof window!="undefined"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&Ye("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},sa=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},vA=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},Is="[MIN_NAME]",Un="[MAX_NAME]",zn=function(n,e){if(n===e)return 0;if(n===Is||e===Un)return-1;if(e===Is||n===Un)return 1;{const t=cf(n),s=cf(e);return t!==null?s!==null?t-s===0?n.length-e.length:t-s:-1:s!==null?1:n<e?-1:1}},IA=function(n,e){return n===e?0:n<e?-1:1},Zs=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+Se(e))},$l=function(n){if(typeof n!="object"||n===null)return Se(n);const e=[];for(const s in n)e.push(s);e.sort();let t="{";for(let s=0;s<e.length;s++)s!==0&&(t+=","),t+=Se(e[s]),t+=":",t+=$l(n[e[s]]);return t+="}",t},pm=function(n,e){const t=n.length;if(t<=e)return[n];const s=[];for(let i=0;i<t;i+=e)i+e>t?s.push(n.substring(i,t)):s.push(n.substring(i,i+e));return s};function Be(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const _m=function(n){O(!sa(n),"Invalid JSON number");const e=11,t=52,s=(1<<e-1)-1;let i,r,o,c,l;n===0?(r=0,o=0,i=1/n===-1/0?1:0):(i=n<0,n=Math.abs(n),n>=Math.pow(2,1-s)?(c=Math.min(Math.floor(Math.log(n)/Math.LN2),s),r=c+s,o=Math.round(n*Math.pow(2,t-c)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-s-t))));const h=[];for(l=t;l;l-=1)h.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)h.push(r%2?1:0),r=Math.floor(r/2);h.push(i?1:0),h.reverse();const f=h.join("");let p="";for(l=0;l<64;l+=8){let _=parseInt(f.substr(l,8),2).toString(16);_.length===1&&(_="0"+_),p=p+_}return p.toLowerCase()},TA=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},wA=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function CA(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const s=new Error(n+" at "+e._path.toString()+": "+t);return s.code=n.toUpperCase(),s}const AA=new RegExp("^-?(0*)\\d{1,10}$"),RA=-2147483648,SA=2147483647,cf=function(n){if(AA.test(n)){const e=Number(n);if(e>=RA&&e<=SA)return e}return null},Os=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw Ye("Exception was thrown by user callback.",t),e},Math.floor(0))}},PA=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},gi=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno!="undefined"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
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
 */class bA{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,je(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t==null?void 0:t.getImmediate({optional:!0}),this.appCheck||t==null||t.get().then(s=>this.appCheck=s)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,s)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,s):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)==null||t.get().then(s=>s.addTokenListener(e))}notifyForInvalidToken(){Ye(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
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
 */class NA{constructor(e,t,s){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=s,this.auth_=null,this.auth_=s.getImmediate({optional:!0}),this.auth_||s.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(be("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,s)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,s):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',Ye(e)}}class Hr{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Hr.OWNER="owner";/**
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
 */const Hl="5",mm="v",gm="s",ym="r",Em="f",vm=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Im="ls",Tm="p",Nc="ac",wm="websocket",Cm="long_polling";/**
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
 */class Am{constructor(e,t,s,i,r=!1,o="",c=!1,l=!1,h=null){this.secure=t,this.namespace=s,this.webSocketOnly=i,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=c,this.isUsingEmulator=l,this.emulatorOptions=h,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Nn.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Nn.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function kA(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function Rm(n,e,t){O(typeof e=="string","typeof type must == string"),O(typeof t=="object","typeof params must == object");let s;if(e===wm)s=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===Cm)s=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);kA(n)&&(t.ns=n.namespace);const i=[];return Be(t,(r,o)=>{i.push(r+"="+o)}),s+i.join("&")}/**
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
 */class DA{constructor(){this.counters_={}}incrementCounter(e,t=1){vt(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return uy(this.counters_)}}/**
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
 */const Ya={},Xa={};function zl(n){const e=n.toString();return Ya[e]||(Ya[e]=new DA),Ya[e]}function OA(n,e){const t=n.toString();return Xa[t]||(Xa[t]=e()),Xa[t]}/**
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
 */class VA{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const s=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<s.length;++i)s[i]&&Os(()=>{this.onMessage_(s[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
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
 */const lf="start",MA="close",xA="pLPCommand",LA="pRTLPCB",Sm="id",Pm="pw",bm="ser",FA="cb",UA="seg",BA="ts",qA="d",WA="dframe",Nm=1870,km=30,jA=Nm-km,$A=25e3,HA=3e4;class ss{constructor(e,t,s,i,r,o,c){this.connId=e,this.repoInfo=t,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.transportSessionId=o,this.lastSessionId=c,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=nr(e),this.stats_=zl(t),this.urlFn=l=>(this.appCheckToken&&(l[Nc]=this.appCheckToken),Rm(t,Cm,l))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new VA(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(HA)),vA(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Gl((...r)=>{const[o,c,l,h,f]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===lf)this.id=c,this.password=l;else if(o===MA)c?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(c,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,c]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,c)},()=>{this.onClosed_()},this.urlFn);const s={};s[lf]="t",s[bm]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(s[FA]=this.scriptTagHolder.uniqueCallbackIdentifier),s[mm]=Hl,this.transportSessionId&&(s[gm]=this.transportSessionId),this.lastSessionId&&(s[Im]=this.lastSessionId),this.applicationId&&(s[Tm]=this.applicationId),this.appCheckToken&&(s[Nc]=this.appCheckToken),typeof location!="undefined"&&location.hostname&&vm.test(location.hostname)&&(s[ym]=Em);const i=this.urlFn(s);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){ss.forceAllow_=!0}static forceDisallow(){ss.forceDisallow_=!0}static isAvailable(){return ss.forceAllow_?!0:!ss.forceDisallow_&&typeof document!="undefined"&&document.createElement!=null&&!TA()&&!wA()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=Se(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const s=$f(t),i=pm(s,jA);for(let r=0;r<i.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const s={};s[WA]="t",s[Sm]=e,s[Pm]=t,this.myDisconnFrame.src=this.urlFn(s),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=Se(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class Gl{constructor(e,t,s,i){this.onDisconnect=s,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=gA(),window[xA+this.uniqueCallbackIdentifier]=e,window[LA+this.uniqueCallbackIdentifier]=t,this.myIFrame=Gl.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(c){be("frame writing exception"),c.stack&&be(c.stack),be(c)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||be("No IE domain setting required")}catch(t){const s=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+s+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Sm]=this.myID,e[Pm]=this.myPW,e[bm]=this.currentSerial;let t=this.urlFn(e),s="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+km+s.length<=Nm;){const o=this.pendingSegs.shift();s=s+"&"+UA+i+"="+o.seg+"&"+BA+i+"="+o.ts+"&"+qA+i+"="+o.d,i++}return t=t+s,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,s){this.pendingSegs.push({seg:e,ts:t,d:s}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const s=()=>{this.outstandingRequests.delete(t),this.newRequest_()},i=setTimeout(s,Math.floor($A)),r=()=>{clearTimeout(i),s()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const s=this.myIFrame.doc.createElement("script");s.type="text/javascript",s.async=!0,s.src=e,s.onload=s.onreadystatechange=function(){const i=s.readyState;(!i||i==="loaded"||i==="complete")&&(s.onload=s.onreadystatechange=null,s.parentNode&&s.parentNode.removeChild(s),t())},s.onerror=()=>{be("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(s)}catch(s){}},Math.floor(1))}}/**
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
 */const zA=16384,GA=45e3;let go=null;typeof MozWebSocket!="undefined"?go=MozWebSocket:typeof WebSocket!="undefined"&&(go=WebSocket);class it{constructor(e,t,s,i,r,o,c){this.connId=e,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=nr(this.connId),this.stats_=zl(t),this.connURL=it.connectionURL_(t,o,c,i,s),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,s,i,r){const o={};return o[mm]=Hl,typeof location!="undefined"&&location.hostname&&vm.test(location.hostname)&&(o[ym]=Em),t&&(o[gm]=t),s&&(o[Im]=s),i&&(o[Nc]=i),r&&(o[Tm]=r),Rm(e,wm,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Nn.set("previous_websocket_failure",!0);try{let s;Ty(),this.mySock=new go(this.connURL,[],s)}catch(s){this.log_("Error instantiating WebSocket.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=s=>{this.handleIncomingFrame(s)},this.mySock.onerror=s=>{this.log_("WebSocket error.  Closing connection.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){it.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator!="undefined"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,s=navigator.userAgent.match(t);s&&s.length>1&&parseFloat(s[1])<4.4&&(e=!0)}return!e&&go!==null&&!it.forceDisallow_}static previouslyFailed(){return Nn.isInMemoryStorage||Nn.get("previous_websocket_failure")===!0}markConnectionHealthy(){Nn.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const s=Ii(t);this.onMessage(s)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(O(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const s=this.extractFrameCount_(t);s!==null&&this.appendFrame_(s)}}send(e){this.resetKeepAlive();const t=Se(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const s=pm(t,zA);s.length>1&&this.sendString_(String(s.length));for(let i=0;i<s.length;i++)this.sendString_(s[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(GA))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}it.responsesRequiredToBeHealthy=2;it.healthyTimeout=3e4;/**
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
 */class Di{static get ALL_TRANSPORTS(){return[ss,it]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=it&&it.isAvailable();let s=t&&!it.previouslyFailed();if(e.webSocketOnly&&(t||Ye("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),s=!0),s)this.transports_=[it];else{const i=this.transports_=[];for(const r of Di.ALL_TRANSPORTS)r&&r.isAvailable()&&i.push(r);Di.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Di.globalTransportInitialized_=!1;/**
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
 */const KA=6e4,QA=5e3,YA=10*1024,XA=100*1024,Ja="t",uf="d",JA="s",hf="r",ZA="e",df="o",ff="a",pf="n",_f="p",eR="h";class tR{constructor(e,t,s,i,r,o,c,l,h,f){this.id=e,this.repoInfo_=t,this.applicationId_=s,this.appCheckToken_=i,this.authToken_=r,this.onMessage_=o,this.onReady_=c,this.onDisconnect_=l,this.onKill_=h,this.lastSessionId=f,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=nr("c:"+this.id+":"),this.transportManager_=new Di(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),s=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,s)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=gi(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>XA?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>YA?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Ja in e){const t=e[Ja];t===ff?this.upgradeIfSecondaryHealthy_():t===hf?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===df&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=Zs("t",e),s=Zs("d",e);if(t==="c")this.onSecondaryControl_(s);else if(t==="d")this.pendingDataMessages.push(s);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:_f,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:ff,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:pf,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=Zs("t",e),s=Zs("d",e);t==="c"?this.onControl_(s):t==="d"&&this.onDataMessage_(s)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=Zs(Ja,e);if(uf in e){const s=e[uf];if(t===eR){const i=ee({},s);this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(t===pf){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===JA?this.onConnectionShutdown_(s):t===hf?this.onReset_(s):t===ZA?bc("Server Error: "+s):t===df?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):bc("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,s=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),Hl!==s&&Ye("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),s=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,s),gi(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(KA))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):gi(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(QA))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:_f,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Nn.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
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
 */class Dm{put(e,t,s,i){}merge(e,t,s,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,s){}onDisconnectMerge(e,t,s){}onDisconnectCancel(e,t){}reportStats(e){}}/**
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
 */class Om{constructor(e){this.allowedEvents_=e,this.listeners_={},O(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const s=[...this.listeners_[e]];for(let i=0;i<s.length;i++)s[i].callback.apply(s[i].context,t)}}on(e,t,s){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:s});const i=this.getInitialEvent(e);i&&t.apply(s,i)}off(e,t,s){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let r=0;r<i.length;r++)if(i[r].callback===t&&(!s||s===i[r].context)){i.splice(r,1);return}}validateEventType_(e){O(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
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
 */class yo extends Om{static getInstance(){return new yo}constructor(){super(["online"]),this.online_=!0,typeof window!="undefined"&&typeof window.addEventListener!="undefined"&&!Hc()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return O(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
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
 */const mf=32,gf=768;class ie{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let s=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[s]=this.pieces_[i],s++);this.pieces_.length=s,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function te(){return new ie("")}function z(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function _n(n){return n.pieces_.length-n.pieceNum_}function oe(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new ie(n.pieces_,e)}function Kl(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function nR(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function Oi(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function Vm(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new ie(e,0)}function me(n,e){const t=[];for(let s=n.pieceNum_;s<n.pieces_.length;s++)t.push(n.pieces_[s]);if(e instanceof ie)for(let s=e.pieceNum_;s<e.pieces_.length;s++)t.push(e.pieces_[s]);else{const s=e.split("/");for(let i=0;i<s.length;i++)s[i].length>0&&t.push(s[i])}return new ie(t,0)}function G(n){return n.pieceNum_>=n.pieces_.length}function Ke(n,e){const t=z(n),s=z(e);if(t===null)return e;if(t===s)return Ke(oe(n),oe(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function sR(n,e){const t=Oi(n,0),s=Oi(e,0);for(let i=0;i<t.length&&i<s.length;i++){const r=zn(t[i],s[i]);if(r!==0)return r}return t.length===s.length?0:t.length<s.length?-1:1}function Ql(n,e){if(_n(n)!==_n(e))return!1;for(let t=n.pieceNum_,s=e.pieceNum_;t<=n.pieces_.length;t++,s++)if(n.pieces_[t]!==e.pieces_[s])return!1;return!0}function tt(n,e){let t=n.pieceNum_,s=e.pieceNum_;if(_n(n)>_n(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[s])return!1;++t,++s}return!0}class iR{constructor(e,t){this.errorPrefix_=t,this.parts_=Oi(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let s=0;s<this.parts_.length;s++)this.byteLength_+=Do(this.parts_[s]);Mm(this)}}function rR(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=Do(e),Mm(n)}function oR(n){const e=n.parts_.pop();n.byteLength_-=Do(e),n.parts_.length>0&&(n.byteLength_-=1)}function Mm(n){if(n.byteLength_>gf)throw new Error(n.errorPrefix_+"has a key path longer than "+gf+" bytes ("+n.byteLength_+").");if(n.parts_.length>mf)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+mf+") or object contains a cycle "+Sn(n))}function Sn(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
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
 */class Yl extends Om{static getInstance(){return new Yl}constructor(){super(["visible"]);let e,t;typeof document!="undefined"&&typeof document.addEventListener!="undefined"&&(typeof document.hidden!="undefined"?(t="visibilitychange",e="hidden"):typeof document.mozHidden!="undefined"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden!="undefined"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden!="undefined"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const s=!document[e];s!==this.visible_&&(this.visible_=s,this.trigger("visible",s))},!1)}getInitialEvent(e){return O(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
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
 */const ei=1e3,aR=60*5*1e3,yf=30*1e3,cR=1.3,lR=3e4,uR="server_kill",Ef=3;class Ot extends Dm{constructor(e,t,s,i,r,o,c,l){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=s,this.onConnectStatus_=i,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=c,this.authOverride_=l,this.id=Ot.nextPersistentConnectionId_++,this.log_=nr("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=ei,this.maxReconnectDelay_=aR,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Yl.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&yo.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,s){const i=++this.requestNumber_,r={r:i,a:e,b:t};this.log_(Se(r)),O(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),s&&(this.requestCBHash_[i]=s)}get(e){this.initConnection_();const t=new Pt,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const c=o.d;o.s==="ok"?t.resolve(c):t.reject(c)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,s,i){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),O(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),O(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const c={onComplete:i,hashFn:t,query:e,tag:s};this.listens.get(o).set(r,c),this.connected_&&this.sendListen_(c)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,s=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(s)})}sendListen_(e){const t=e.query,s=t._path.toString(),i=t._queryIdentifier;this.log_("Listen on "+s+" for "+i);const r={p:s},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,c=>{const l=c.d,h=c.s;Ot.warnOnListenWarnings_(l,t),(this.listens.get(s)&&this.listens.get(s).get(i))===e&&(this.log_("listen response",c),h!=="ok"&&this.removeListen_(s,i),e.onComplete&&e.onComplete(h,l))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&vt(e,"w")){const s=ds(e,"w");if(Array.isArray(s)&&~s.indexOf("no_index")){const i='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();Ye(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||Ny(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=yf)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=by(e)?"auth":"gauth",s={cred:e};this.authOverride_===null?s.noauth=!0:typeof this.authOverride_=="object"&&(s.authvar=this.authOverride_),this.sendRequest(t,s,i=>{const r=i.s,o=i.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,s=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,s)})}unlisten(e,t){const s=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+s+" "+i),O(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(s,i)&&this.connected_&&this.sendUnlisten_(s,i,e._queryObject,t)}sendUnlisten_(e,t,s,i){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";i&&(r.q=s,r.t=i),this.sendRequest(o,r)}onDisconnectPut(e,t,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:s})}onDisconnectMerge(e,t,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:s})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,s,i){const r={p:t,d:s};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,t,s,i){this.putInternal("p",e,t,s,i)}merge(e,t,s,i){this.putInternal("m",e,t,s,i)}putInternal(e,t,s,i,r){this.initConnection_();const o={p:t,d:s};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const c=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(c):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,s=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,s,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,s=>{if(s.s!=="ok"){const r=s.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+Se(e));const t=e.r,s=this.requestCBHash_[t];s&&(delete this.requestCBHash_[t],s(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):bc("Unrecognized action received from server: "+Se(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){O(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=ei,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=ei,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>lR&&(this.reconnectDelay_=ei),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*cR)}this.onConnectStatus_(!1)}establishConnection_(){return y(this,null,function*(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),s=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+Ot.nextConnectionId_++,r=this.lastSessionId;let o=!1,c=null;const l=function(){c?c.close():(o=!0,s())},h=function(p){O(c,"sendRequest call when we're not connected not allowed."),c.sendRequest(p)};this.realtime_={close:l,sendRequest:h};const f=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[p,_]=yield Promise.all([this.authTokenProvider_.getToken(f),this.appCheckTokenProvider_.getToken(f)]);o?be("getToken() completed but was canceled"):(be("getToken() completed. Creating connection."),this.authToken_=p&&p.accessToken,this.appCheckToken_=_&&_.token,c=new tR(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,s,T=>{Ye(T+" ("+this.repoInfo_.toString()+")"),this.interrupt(uR)},r))}catch(p){this.log_("Failed to get token: "+p),o||(this.repoInfo_.nodeAdmin&&Ye(p),l())}}})}interrupt(e){be("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){be("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Kr(this.interruptReasons_)&&(this.reconnectDelay_=ei,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let s;t?s=t.map(r=>$l(r)).join("$"):s="default";const i=this.removeListen_(e,s);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,t){const s=new ie(e).toString();let i;if(this.listens.has(s)){const r=this.listens.get(s);i=r.get(t),r.delete(t),r.size===0&&this.listens.delete(s)}else i=void 0;return i}onAuthRevoked_(e,t){be("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Ef&&(this.reconnectDelay_=yf,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){be("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Ef&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+hm.replace(/\./g,"-")]=1,Hc()?e["framework.cordova"]=1:Xf()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=yo.getInstance().currentlyOnline();return Kr(this.interruptReasons_)&&e}}Ot.nextPersistentConnectionId_=0;Ot.nextConnectionId_=0;/**
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
 */class K{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new K(e,t)}}/**
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
 */class ia{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const s=new K(Is,e),i=new K(Is,t);return this.compare(s,i)!==0}minPost(){return K.MIN}}/**
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
 */let Or;class xm extends ia{static get __EMPTY_NODE(){return Or}static set __EMPTY_NODE(e){Or=e}compare(e,t){return zn(e.name,t.name)}isDefinedOn(e){throw As("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return K.MIN}maxPost(){return new K(Un,Or)}makePost(e,t){return O(typeof e=="string","KeyIndex indexValue must always be a string."),new K(e,Or)}toString(){return".key"}}const us=new xm;/**
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
 */class Vr{constructor(e,t,s,i,r=null){this.isReverse_=i,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?s(e.key,t):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class Re{constructor(e,t,s,i,r){this.key=e,this.value=t,this.color=s!=null?s:Re.RED,this.left=i!=null?i:Qe.EMPTY_NODE,this.right=r!=null?r:Qe.EMPTY_NODE}copy(e,t,s,i,r){return new Re(e!=null?e:this.key,t!=null?t:this.value,s!=null?s:this.color,i!=null?i:this.left,r!=null?r:this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,s){let i=this;const r=s(e,i.key);return r<0?i=i.copy(null,null,null,i.left.insert(e,t,s),null):r===0?i=i.copy(null,t,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,t,s)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return Qe.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let s,i;if(s=this,t(e,s.key)<0)!s.left.isEmpty()&&!s.left.isRed_()&&!s.left.left.isRed_()&&(s=s.moveRedLeft_()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed_()&&(s=s.rotateRight_()),!s.right.isEmpty()&&!s.right.isRed_()&&!s.right.left.isRed_()&&(s=s.moveRedRight_()),t(e,s.key)===0){if(s.right.isEmpty())return Qe.EMPTY_NODE;i=s.right.min_(),s=s.copy(i.key,i.value,null,null,s.right.removeMin_())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,Re.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,Re.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}Re.RED=!0;Re.BLACK=!1;class hR{copy(e,t,s,i,r){return this}insert(e,t,s){return new Re(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class Qe{constructor(e,t=Qe.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new Qe(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,Re.BLACK,null,null))}remove(e){return new Qe(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,Re.BLACK,null,null))}get(e){let t,s=this.root_;for(;!s.isEmpty();){if(t=this.comparator_(e,s.key),t===0)return s.value;t<0?s=s.left:t>0&&(s=s.right)}return null}getPredecessorKey(e){let t,s=this.root_,i=null;for(;!s.isEmpty();)if(t=this.comparator_(e,s.key),t===0){if(s.left.isEmpty())return i?i.key:null;for(s=s.left;!s.right.isEmpty();)s=s.right;return s.key}else t<0?s=s.left:t>0&&(i=s,s=s.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Vr(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new Vr(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new Vr(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new Vr(this.root_,null,this.comparator_,!0,e)}}Qe.EMPTY_NODE=new hR;/**
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
 */function dR(n,e){return zn(n.name,e.name)}function Xl(n,e){return zn(n,e)}/**
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
 */let kc;function fR(n){kc=n}const Lm=function(n){return typeof n=="number"?"number:"+_m(n):"string:"+n},Fm=function(n){if(n.isLeafNode()){const e=n.val();O(typeof e=="string"||typeof e=="number"||typeof e=="object"&&vt(e,".sv"),"Priority must be a string or number.")}else O(n===kc||n.isEmpty(),"priority of unexpected type.");O(n===kc||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
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
 */let vf;class Ce{static set __childrenNodeConstructor(e){vf=e}static get __childrenNodeConstructor(){return vf}constructor(e,t=Ce.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,O(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Fm(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new Ce(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:Ce.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return G(e)?this:z(e)===".priority"?this.priorityNode_:Ce.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:Ce.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const s=z(e);return s===null?t:t.isEmpty()&&s!==".priority"?this:(O(s!==".priority"||_n(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(s,Ce.__childrenNodeConstructor.EMPTY_NODE.updateChild(oe(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Lm(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=_m(this.value_):e+=this.value_,this.lazyHash_=fm(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===Ce.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof Ce.__childrenNodeConstructor?-1:(O(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,s=typeof this.value_,i=Ce.VALUE_TYPE_ORDER.indexOf(t),r=Ce.VALUE_TYPE_ORDER.indexOf(s);return O(i>=0,"Unknown leaf type: "+t),O(r>=0,"Unknown leaf type: "+s),i===r?s==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}Ce.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
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
 */let Um,Bm;function pR(n){Um=n}function _R(n){Bm=n}class mR extends ia{compare(e,t){const s=e.node.getPriority(),i=t.node.getPriority(),r=s.compareTo(i);return r===0?zn(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return K.MIN}maxPost(){return new K(Un,new Ce("[PRIORITY-POST]",Bm))}makePost(e,t){const s=Um(e);return new K(t,new Ce("[PRIORITY-POST]",s))}toString(){return".priority"}}const de=new mR;/**
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
 */const gR=Math.log(2);class yR{constructor(e){const t=r=>parseInt(Math.log(r)/gR,10),s=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const i=s(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Eo=function(n,e,t,s){n.sort(e);const i=function(l,h){const f=h-l;let p,_;if(f===0)return null;if(f===1)return p=n[l],_=t?t(p):p,new Re(_,p.node,Re.BLACK,null,null);{const T=parseInt(f/2,10)+l,S=i(l,T),D=i(T+1,h);return p=n[T],_=t?t(p):p,new Re(_,p.node,Re.BLACK,S,D)}},r=function(l){let h=null,f=null,p=n.length;const _=function(S,D){const k=p-S,$=p;p-=S;const q=i(k+1,$),H=n[k],ce=t?t(H):H;T(new Re(ce,H.node,D,null,q))},T=function(S){h?(h.left=S,h=S):(f=S,h=S)};for(let S=0;S<l.count;++S){const D=l.nextBitIsOne(),k=Math.pow(2,l.count-(S+1));D?_(k,Re.BLACK):(_(k,Re.BLACK),_(k,Re.RED))}return f},o=new yR(n.length),c=r(o);return new Qe(s||e,c)};/**
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
 */let Za;const Jn={};class kt{static get Default(){return O(Jn&&de,"ChildrenNode.ts has not been loaded"),Za=Za||new kt({".priority":Jn},{".priority":de}),Za}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=ds(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof Qe?t:null}hasIndex(e){return vt(this.indexSet_,e.toString())}addIndex(e,t){O(e!==us,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const s=[];let i=!1;const r=t.getIterator(K.Wrap);let o=r.getNext();for(;o;)i=i||e.isDefinedOn(o.node),s.push(o),o=r.getNext();let c;i?c=Eo(s,e.getCompare()):c=Jn;const l=e.toString(),h=ee({},this.indexSet_);h[l]=e;const f=ee({},this.indexes_);return f[l]=c,new kt(f,h)}addToIndexes(e,t){const s=Qr(this.indexes_,(i,r)=>{const o=ds(this.indexSet_,r);if(O(o,"Missing index implementation for "+r),i===Jn)if(o.isDefinedOn(e.node)){const c=[],l=t.getIterator(K.Wrap);let h=l.getNext();for(;h;)h.name!==e.name&&c.push(h),h=l.getNext();return c.push(e),Eo(c,o.getCompare())}else return Jn;else{const c=t.get(e.name);let l=i;return c&&(l=l.remove(new K(e.name,c))),l.insert(e,e.node)}});return new kt(s,this.indexSet_)}removeFromIndexes(e,t){const s=Qr(this.indexes_,i=>{if(i===Jn)return i;{const r=t.get(e.name);return r?i.remove(new K(e.name,r)):i}});return new kt(s,this.indexSet_)}}/**
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
 */let ti;class B{static get EMPTY_NODE(){return ti||(ti=new B(new Qe(Xl),null,kt.Default))}constructor(e,t,s){this.children_=e,this.priorityNode_=t,this.indexMap_=s,this.lazyHash_=null,this.priorityNode_&&Fm(this.priorityNode_),this.children_.isEmpty()&&O(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||ti}updatePriority(e){return this.children_.isEmpty()?this:new B(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?ti:t}}getChild(e){const t=z(e);return t===null?this:this.getImmediateChild(t).getChild(oe(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(O(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const s=new K(e,t);let i,r;t.isEmpty()?(i=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(s,this.children_)):(i=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(s,this.children_));const o=i.isEmpty()?ti:this.priorityNode_;return new B(i,o,r)}}updateChild(e,t){const s=z(e);if(s===null)return t;{O(z(e)!==".priority"||_n(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(s).updateChild(oe(e),t);return this.updateImmediateChild(s,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let s=0,i=0,r=!0;if(this.forEachChild(de,(o,c)=>{t[o]=c.val(e),s++,r&&B.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):r=!1}),!e&&r&&i<2*s){const o=[];for(const c in t)o[c]=t[c];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Lm(this.getPriority().val())+":"),this.forEachChild(de,(t,s)=>{const i=s.hash();i!==""&&(e+=":"+t+":"+i)}),this.lazyHash_=e===""?"":fm(e)}return this.lazyHash_}getPredecessorChildName(e,t,s){const i=this.resolveIndex_(s);if(i){const r=i.getPredecessorKey(new K(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const s=t.minKey();return s&&s.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new K(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const s=t.maxKey();return s&&s.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new K(t,this.children_.get(t)):null}forEachChild(e,t){const s=this.resolveIndex_(e);return s?s.inorderTraversal(i=>t(i.name,i.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const s=this.resolveIndex_(t);if(s)return s.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,K.Wrap);let r=i.peek();for(;r!=null&&t.compare(r,e)<0;)i.getNext(),r=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const s=this.resolveIndex_(t);if(s)return s.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,K.Wrap);let r=i.peek();for(;r!=null&&t.compare(r,e)>0;)i.getNext(),r=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===sr?-1:0}withIndex(e){if(e===us||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new B(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===us||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const s=this.getIterator(de),i=t.getIterator(de);let r=s.getNext(),o=i.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=s.getNext(),o=i.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===us?null:this.indexMap_.get(e.toString())}}B.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class ER extends B{constructor(){super(new Qe(Xl),B.EMPTY_NODE,kt.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return B.EMPTY_NODE}isEmpty(){return!1}}const sr=new ER;Object.defineProperties(K,{MIN:{value:new K(Is,B.EMPTY_NODE)},MAX:{value:new K(Un,sr)}});xm.__EMPTY_NODE=B.EMPTY_NODE;Ce.__childrenNodeConstructor=B;fR(sr);_R(sr);/**
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
 */const vR=!0;function Ee(n,e=null){if(n===null)return B.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),O(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new Ce(t,Ee(e))}if(!(n instanceof Array)&&vR){const t=[];let s=!1;if(Be(n,(o,c)=>{if(o.substring(0,1)!=="."){const l=Ee(c);l.isEmpty()||(s=s||!l.getPriority().isEmpty(),t.push(new K(o,l)))}}),t.length===0)return B.EMPTY_NODE;const r=Eo(t,dR,o=>o.name,Xl);if(s){const o=Eo(t,de.getCompare());return new B(r,Ee(e),new kt({".priority":o},{".priority":de}))}else return new B(r,Ee(e),kt.Default)}else{let t=B.EMPTY_NODE;return Be(n,(s,i)=>{if(vt(n,s)&&s.substring(0,1)!=="."){const r=Ee(i);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(s,r))}}),t.updatePriority(Ee(e))}}pR(Ee);/**
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
 */class IR extends ia{constructor(e){super(),this.indexPath_=e,O(!G(e)&&z(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const s=this.extractChild(e.node),i=this.extractChild(t.node),r=s.compareTo(i);return r===0?zn(e.name,t.name):r}makePost(e,t){const s=Ee(e),i=B.EMPTY_NODE.updateChild(this.indexPath_,s);return new K(t,i)}maxPost(){const e=B.EMPTY_NODE.updateChild(this.indexPath_,sr);return new K(Un,e)}toString(){return Oi(this.indexPath_,0).join("/")}}/**
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
 */class TR extends ia{compare(e,t){const s=e.node.compareTo(t.node);return s===0?zn(e.name,t.name):s}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return K.MIN}maxPost(){return K.MAX}makePost(e,t){const s=Ee(e);return new K(t,s)}toString(){return".value"}}const wR=new TR;/**
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
 */function qm(n){return{type:"value",snapshotNode:n}}function Ts(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function Vi(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function Mi(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function CR(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
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
 */class Jl{constructor(e){this.index_=e}updateChild(e,t,s,i,r,o){O(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const c=e.getImmediateChild(t);return c.getChild(i).equals(s.getChild(i))&&c.isEmpty()===s.isEmpty()||(o!=null&&(s.isEmpty()?e.hasChild(t)?o.trackChildChange(Vi(t,c)):O(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):c.isEmpty()?o.trackChildChange(Ts(t,s)):o.trackChildChange(Mi(t,s,c))),e.isLeafNode()&&s.isEmpty())?e:e.updateImmediateChild(t,s).withIndex(this.index_)}updateFullNode(e,t,s){return s!=null&&(e.isLeafNode()||e.forEachChild(de,(i,r)=>{t.hasChild(i)||s.trackChildChange(Vi(i,r))}),t.isLeafNode()||t.forEachChild(de,(i,r)=>{if(e.hasChild(i)){const o=e.getImmediateChild(i);o.equals(r)||s.trackChildChange(Mi(i,r,o))}else s.trackChildChange(Ts(i,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?B.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
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
 */class xi{constructor(e){this.indexedFilter_=new Jl(e.getIndex()),this.index_=e.getIndex(),this.startPost_=xi.getStartPost_(e),this.endPost_=xi.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,s=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&s}updateChild(e,t,s,i,r,o){return this.matches(new K(t,s))||(s=B.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,s,i,r,o)}updateFullNode(e,t,s){t.isLeafNode()&&(t=B.EMPTY_NODE);let i=t.withIndex(this.index_);i=i.updatePriority(B.EMPTY_NODE);const r=this;return t.forEachChild(de,(o,c)=>{r.matches(new K(o,c))||(i=i.updateImmediateChild(o,B.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,s)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
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
 */class AR{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const s=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?s<=0:s<0},this.withinEndPost=t=>{const s=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?s<=0:s<0},this.rangedFilter_=new xi(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,s,i,r,o){return this.rangedFilter_.matches(new K(t,s))||(s=B.EMPTY_NODE),e.getImmediateChild(t).equals(s)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,s,i,r,o):this.fullLimitUpdateChild_(e,t,s,r,o)}updateFullNode(e,t,s){let i;if(t.isLeafNode()||t.isEmpty())i=B.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){i=B.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const c=r.getNext();if(this.withinDirectionalStart(c))if(this.withinDirectionalEnd(c))i=i.updateImmediateChild(c.name,c.node),o++;else break;else continue}}else{i=t.withIndex(this.index_),i=i.updatePriority(B.EMPTY_NODE);let r;this.reverse_?r=i.getReverseIterator(this.index_):r=i.getIterator(this.index_);let o=0;for(;r.hasNext();){const c=r.getNext();o<this.limit_&&this.withinDirectionalStart(c)&&this.withinDirectionalEnd(c)?o++:i=i.updateImmediateChild(c.name,B.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,s)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,s,i,r){let o;if(this.reverse_){const p=this.index_.getCompare();o=(_,T)=>p(T,_)}else o=this.index_.getCompare();const c=e;O(c.numChildren()===this.limit_,"");const l=new K(t,s),h=this.reverse_?c.getFirstChild(this.index_):c.getLastChild(this.index_),f=this.rangedFilter_.matches(l);if(c.hasChild(t)){const p=c.getImmediateChild(t);let _=i.getChildAfterChild(this.index_,h,this.reverse_);for(;_!=null&&(_.name===t||c.hasChild(_.name));)_=i.getChildAfterChild(this.index_,_,this.reverse_);const T=_==null?1:o(_,l);if(f&&!s.isEmpty()&&T>=0)return r!=null&&r.trackChildChange(Mi(t,s,p)),c.updateImmediateChild(t,s);{r!=null&&r.trackChildChange(Vi(t,p));const D=c.updateImmediateChild(t,B.EMPTY_NODE);return _!=null&&this.rangedFilter_.matches(_)?(r!=null&&r.trackChildChange(Ts(_.name,_.node)),D.updateImmediateChild(_.name,_.node)):D}}else return s.isEmpty()?e:f&&o(h,l)>=0?(r!=null&&(r.trackChildChange(Vi(h.name,h.node)),r.trackChildChange(Ts(t,s))),c.updateImmediateChild(t,s).updateImmediateChild(h.name,B.EMPTY_NODE)):e}}/**
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
 */class Zl{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=de}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return O(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return O(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Is}hasEnd(){return this.endSet_}getIndexEndValue(){return O(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return O(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Un}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return O(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===de}copy(){const e=new Zl;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function RR(n){return n.loadsAllData()?new Jl(n.getIndex()):n.hasLimit()?new AR(n):new xi(n)}function If(n){const e={};if(n.isDefault())return e;let t;if(n.index_===de?t="$priority":n.index_===wR?t="$value":n.index_===us?t="$key":(O(n.index_ instanceof IR,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=Se(t),n.startSet_){const s=n.startAfterSet_?"startAfter":"startAt";e[s]=Se(n.indexStartValue_),n.startNameSet_&&(e[s]+=","+Se(n.indexStartName_))}if(n.endSet_){const s=n.endBeforeSet_?"endBefore":"endAt";e[s]=Se(n.indexEndValue_),n.endNameSet_&&(e[s]+=","+Se(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function Tf(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==de&&(e.i=n.index_.toString()),e}/**
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
 */class vo extends Dm{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(O(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,s,i){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=s,this.appCheckTokenProvider_=i,this.log_=nr("p:rest:"),this.listens_={}}listen(e,t,s,i){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=vo.getListenId_(e,s),c={};this.listens_[o]=c;const l=If(e._queryParams);this.restRequest_(r+".json",l,(h,f)=>{let p=f;if(h===404&&(p=null,h=null),h===null&&this.onDataUpdate_(r,p,!1,s),ds(this.listens_,o)===c){let _;h?h===401?_="permission_denied":_="rest_error:"+h:_="ok",i(_,null)}})}unlisten(e,t){const s=vo.getListenId_(e,t);delete this.listens_[s]}get(e){const t=If(e._queryParams),s=e._path.toString(),i=new Pt;return this.restRequest_(s+".json",t,(r,o)=>{let c=o;r===404&&(c=null,r=null),r===null?(this.onDataUpdate_(s,c,!1,null),i.resolve(c)):i.reject(new Error(c))}),i.promise}refreshAuthToken(e){}restRequest_(e,t={},s){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,r])=>{i&&i.accessToken&&(t.auth=i.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Rs(t);this.log_("Sending REST request for "+o);const c=new XMLHttpRequest;c.onreadystatechange=()=>{if(s&&c.readyState===4){this.log_("REST Response for "+o+" received. status:",c.status,"response:",c.responseText);let l=null;if(c.status>=200&&c.status<300){try{l=Ii(c.responseText)}catch(h){Ye("Failed to parse JSON response for "+o+": "+c.responseText)}s(null,l)}else c.status!==401&&c.status!==404&&Ye("Got unsuccessful REST response for "+o+" Status: "+c.status),s(c.status);s=null}},c.open("GET",o,!0),c.send()})}}/**
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
 */class SR{constructor(){this.rootNode_=B.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
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
 */function Io(){return{value:null,children:new Map}}function Vs(n,e,t){if(G(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const s=z(e);n.children.has(s)||n.children.set(s,Io());const i=n.children.get(s);e=oe(e),Vs(i,e,t)}}function Dc(n,e){if(G(e))return n.value=null,n.children.clear(),!0;if(n.value!==null){if(n.value.isLeafNode())return!1;{const t=n.value;return n.value=null,t.forEachChild(de,(s,i)=>{Vs(n,new ie(s),i)}),Dc(n,e)}}else if(n.children.size>0){const t=z(e);return e=oe(e),n.children.has(t)&&Dc(n.children.get(t),e)&&n.children.delete(t),n.children.size===0}else return!0}function Oc(n,e,t){n.value!==null?t(e,n.value):PR(n,(s,i)=>{const r=new ie(e.toString()+"/"+s);Oc(i,r,t)})}function PR(n,e){n.children.forEach((t,s)=>{e(s,t)})}/**
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
 */class bR{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t=ee({},e);return this.last_&&Be(this.last_,(s,i)=>{t[s]=t[s]-i}),this.last_=e,t}}/**
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
 */const wf=10*1e3,NR=30*1e3,kR=5*60*1e3;class DR{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new bR(e);const s=wf+(NR-wf)*Math.random();gi(this.reportStats_.bind(this),Math.floor(s))}reportStats_(){const e=this.statsListener_.get(),t={};let s=!1;Be(e,(i,r)=>{r>0&&vt(this.statsToReport_,i)&&(t[i]=r,s=!0)}),s&&this.server_.reportStats(t),gi(this.reportStats_.bind(this),Math.floor(Math.random()*2*kR))}}/**
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
 */var ot;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(ot||(ot={}));function Wm(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function eu(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function tu(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
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
 */class To{constructor(e,t,s){this.path=e,this.affectedTree=t,this.revert=s,this.type=ot.ACK_USER_WRITE,this.source=Wm()}operationForChild(e){if(G(this.path)){if(this.affectedTree.value!=null)return O(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new ie(e));return new To(te(),t,this.revert)}}else return O(z(this.path)===e,"operationForChild called for unrelated child."),new To(oe(this.path),this.affectedTree,this.revert)}}/**
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
 */class Li{constructor(e,t){this.source=e,this.path=t,this.type=ot.LISTEN_COMPLETE}operationForChild(e){return G(this.path)?new Li(this.source,te()):new Li(this.source,oe(this.path))}}/**
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
 */class Bn{constructor(e,t,s){this.source=e,this.path=t,this.snap=s,this.type=ot.OVERWRITE}operationForChild(e){return G(this.path)?new Bn(this.source,te(),this.snap.getImmediateChild(e)):new Bn(this.source,oe(this.path),this.snap)}}/**
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
 */class Fi{constructor(e,t,s){this.source=e,this.path=t,this.children=s,this.type=ot.MERGE}operationForChild(e){if(G(this.path)){const t=this.children.subtree(new ie(e));return t.isEmpty()?null:t.value?new Bn(this.source,te(),t.value):new Fi(this.source,te(),t)}else return O(z(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Fi(this.source,oe(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
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
 */class qn{constructor(e,t,s){this.node_=e,this.fullyInitialized_=t,this.filtered_=s}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(G(e))return this.isFullyInitialized()&&!this.filtered_;const t=z(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
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
 */class OR{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function VR(n,e,t,s){const i=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(CR(o.childName,o.snapshotNode))}),ni(n,i,"child_removed",e,s,t),ni(n,i,"child_added",e,s,t),ni(n,i,"child_moved",r,s,t),ni(n,i,"child_changed",e,s,t),ni(n,i,"value",e,s,t),i}function ni(n,e,t,s,i,r){const o=s.filter(c=>c.type===t);o.sort((c,l)=>xR(n,c,l)),o.forEach(c=>{const l=MR(n,c,r);i.forEach(h=>{h.respondsTo(c.type)&&e.push(h.createEvent(l,n.query_))})})}function MR(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function xR(n,e,t){if(e.childName==null||t.childName==null)throw As("Should only compare child_ events.");const s=new K(e.childName,e.snapshotNode),i=new K(t.childName,t.snapshotNode);return n.index_.compare(s,i)}/**
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
 */function ra(n,e){return{eventCache:n,serverCache:e}}function yi(n,e,t,s){return ra(new qn(e,t,s),n.serverCache)}function jm(n,e,t,s){return ra(n.eventCache,new qn(e,t,s))}function Vc(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function Wn(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
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
 */let ec;const LR=()=>(ec||(ec=new Qe(IA)),ec);class ue{static fromObject(e){let t=new ue(null);return Be(e,(s,i)=>{t=t.set(new ie(s),i)}),t}constructor(e,t=LR()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:te(),value:this.value};if(G(e))return null;{const s=z(e),i=this.children.get(s);if(i!==null){const r=i.findRootMostMatchingPathAndValue(oe(e),t);return r!=null?{path:me(new ie(s),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(G(e))return this;{const t=z(e),s=this.children.get(t);return s!==null?s.subtree(oe(e)):new ue(null)}}set(e,t){if(G(e))return new ue(t,this.children);{const s=z(e),r=(this.children.get(s)||new ue(null)).set(oe(e),t),o=this.children.insert(s,r);return new ue(this.value,o)}}remove(e){if(G(e))return this.children.isEmpty()?new ue(null):new ue(null,this.children);{const t=z(e),s=this.children.get(t);if(s){const i=s.remove(oe(e));let r;return i.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,i),this.value===null&&r.isEmpty()?new ue(null):new ue(this.value,r)}else return this}}get(e){if(G(e))return this.value;{const t=z(e),s=this.children.get(t);return s?s.get(oe(e)):null}}setTree(e,t){if(G(e))return t;{const s=z(e),r=(this.children.get(s)||new ue(null)).setTree(oe(e),t);let o;return r.isEmpty()?o=this.children.remove(s):o=this.children.insert(s,r),new ue(this.value,o)}}fold(e){return this.fold_(te(),e)}fold_(e,t){const s={};return this.children.inorderTraversal((i,r)=>{s[i]=r.fold_(me(e,i),t)}),t(e,this.value,s)}findOnPath(e,t){return this.findOnPath_(e,te(),t)}findOnPath_(e,t,s){const i=this.value?s(t,this.value):!1;if(i)return i;if(G(e))return null;{const r=z(e),o=this.children.get(r);return o?o.findOnPath_(oe(e),me(t,r),s):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,te(),t)}foreachOnPath_(e,t,s){if(G(e))return this;{this.value&&s(t,this.value);const i=z(e),r=this.children.get(i);return r?r.foreachOnPath_(oe(e),me(t,i),s):new ue(null)}}foreach(e){this.foreach_(te(),e)}foreach_(e,t){this.children.inorderTraversal((s,i)=>{i.foreach_(me(e,s),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,s)=>{s.value&&e(t,s.value)})}}/**
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
 */class ct{constructor(e){this.writeTree_=e}static empty(){return new ct(new ue(null))}}function Ei(n,e,t){if(G(e))return new ct(new ue(t));{const s=n.writeTree_.findRootMostValueAndPath(e);if(s!=null){const i=s.path;let r=s.value;const o=Ke(i,e);return r=r.updateChild(o,t),new ct(n.writeTree_.set(i,r))}else{const i=new ue(t),r=n.writeTree_.setTree(e,i);return new ct(r)}}}function Cf(n,e,t){let s=n;return Be(t,(i,r)=>{s=Ei(s,me(e,i),r)}),s}function Af(n,e){if(G(e))return ct.empty();{const t=n.writeTree_.setTree(e,new ue(null));return new ct(t)}}function Mc(n,e){return Gn(n,e)!=null}function Gn(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(Ke(t.path,e)):null}function Rf(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(de,(s,i)=>{e.push(new K(s,i))}):n.writeTree_.children.inorderTraversal((s,i)=>{i.value!=null&&e.push(new K(s,i.value))}),e}function on(n,e){if(G(e))return n;{const t=Gn(n,e);return t!=null?new ct(new ue(t)):new ct(n.writeTree_.subtree(e))}}function xc(n){return n.writeTree_.isEmpty()}function ws(n,e){return $m(te(),n.writeTree_,e)}function $m(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let s=null;return e.children.inorderTraversal((i,r)=>{i===".priority"?(O(r.value!==null,"Priority writes must always be leaf nodes"),s=r.value):t=$m(me(n,i),r,t)}),!t.getChild(n).isEmpty()&&s!==null&&(t=t.updateChild(me(n,".priority"),s)),t}}/**
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
 */function nu(n,e){return Km(e,n)}function FR(n,e,t,s,i){O(s>n.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),n.allWrites.push({path:e,snap:t,writeId:s,visible:i}),i&&(n.visibleWrites=Ei(n.visibleWrites,e,t)),n.lastWriteId=s}function UR(n,e){for(let t=0;t<n.allWrites.length;t++){const s=n.allWrites[t];if(s.writeId===e)return s}return null}function BR(n,e){const t=n.allWrites.findIndex(c=>c.writeId===e);O(t>=0,"removeWrite called with nonexistent writeId.");const s=n.allWrites[t];n.allWrites.splice(t,1);let i=s.visible,r=!1,o=n.allWrites.length-1;for(;i&&o>=0;){const c=n.allWrites[o];c.visible&&(o>=t&&qR(c,s.path)?i=!1:tt(s.path,c.path)&&(r=!0)),o--}if(i){if(r)return WR(n),!0;if(s.snap)n.visibleWrites=Af(n.visibleWrites,s.path);else{const c=s.children;Be(c,l=>{n.visibleWrites=Af(n.visibleWrites,me(s.path,l))})}return!0}else return!1}function qR(n,e){if(n.snap)return tt(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&tt(me(n.path,t),e))return!0;return!1}function WR(n){n.visibleWrites=Hm(n.allWrites,jR,te()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function jR(n){return n.visible}function Hm(n,e,t){let s=ct.empty();for(let i=0;i<n.length;++i){const r=n[i];if(e(r)){const o=r.path;let c;if(r.snap)tt(t,o)?(c=Ke(t,o),s=Ei(s,c,r.snap)):tt(o,t)&&(c=Ke(o,t),s=Ei(s,te(),r.snap.getChild(c)));else if(r.children){if(tt(t,o))c=Ke(t,o),s=Cf(s,c,r.children);else if(tt(o,t))if(c=Ke(o,t),G(c))s=Cf(s,te(),r.children);else{const l=ds(r.children,z(c));if(l){const h=l.getChild(oe(c));s=Ei(s,te(),h)}}}else throw As("WriteRecord should have .snap or .children")}}return s}function zm(n,e,t,s,i){if(!s&&!i){const r=Gn(n.visibleWrites,e);if(r!=null)return r;{const o=on(n.visibleWrites,e);if(xc(o))return t;if(t==null&&!Mc(o,te()))return null;{const c=t||B.EMPTY_NODE;return ws(o,c)}}}else{const r=on(n.visibleWrites,e);if(!i&&xc(r))return t;if(!i&&t==null&&!Mc(r,te()))return null;{const o=function(h){return(h.visible||i)&&(!s||!~s.indexOf(h.writeId))&&(tt(h.path,e)||tt(e,h.path))},c=Hm(n.allWrites,o,e),l=t||B.EMPTY_NODE;return ws(c,l)}}}function $R(n,e,t){let s=B.EMPTY_NODE;const i=Gn(n.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(de,(r,o)=>{s=s.updateImmediateChild(r,o)}),s;if(t){const r=on(n.visibleWrites,e);return t.forEachChild(de,(o,c)=>{const l=ws(on(r,new ie(o)),c);s=s.updateImmediateChild(o,l)}),Rf(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}else{const r=on(n.visibleWrites,e);return Rf(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}}function HR(n,e,t,s,i){O(s||i,"Either existingEventSnap or existingServerSnap must exist");const r=me(e,t);if(Mc(n.visibleWrites,r))return null;{const o=on(n.visibleWrites,r);return xc(o)?i.getChild(t):ws(o,i.getChild(t))}}function zR(n,e,t,s){const i=me(e,t),r=Gn(n.visibleWrites,i);if(r!=null)return r;if(s.isCompleteForChild(t)){const o=on(n.visibleWrites,i);return ws(o,s.getNode().getImmediateChild(t))}else return null}function GR(n,e){return Gn(n.visibleWrites,e)}function KR(n,e,t,s,i,r,o){let c;const l=on(n.visibleWrites,e),h=Gn(l,te());if(h!=null)c=h;else if(t!=null)c=ws(l,t);else return[];if(c=c.withIndex(o),!c.isEmpty()&&!c.isLeafNode()){const f=[],p=o.getCompare(),_=r?c.getReverseIteratorFrom(s,o):c.getIteratorFrom(s,o);let T=_.getNext();for(;T&&f.length<i;)p(T,s)!==0&&f.push(T),T=_.getNext();return f}else return[]}function QR(){return{visibleWrites:ct.empty(),allWrites:[],lastWriteId:-1}}function wo(n,e,t,s){return zm(n.writeTree,n.treePath,e,t,s)}function su(n,e){return $R(n.writeTree,n.treePath,e)}function Sf(n,e,t,s){return HR(n.writeTree,n.treePath,e,t,s)}function Co(n,e){return GR(n.writeTree,me(n.treePath,e))}function YR(n,e,t,s,i,r){return KR(n.writeTree,n.treePath,e,t,s,i,r)}function iu(n,e,t){return zR(n.writeTree,n.treePath,e,t)}function Gm(n,e){return Km(me(n.treePath,e),n.writeTree)}function Km(n,e){return{treePath:n,writeTree:e}}/**
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
 */class XR{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,s=e.childName;O(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),O(s!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(s);if(i){const r=i.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(s,Mi(s,e.snapshotNode,i.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(s);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(s,Vi(s,i.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(s,Ts(s,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(s,Mi(s,e.snapshotNode,i.oldSnap));else throw As("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(s,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
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
 */class JR{getCompleteChild(e){return null}getChildAfterChild(e,t,s){return null}}const Qm=new JR;class ru{constructor(e,t,s=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=s}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const s=this.optCompleteServerCache_!=null?new qn(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return iu(this.writes_,e,s)}}getChildAfterChild(e,t,s){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Wn(this.viewCache_),r=YR(this.writes_,i,t,1,s,e);return r.length===0?null:r[0]}}/**
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
 */function ZR(n){return{filter:n}}function eS(n,e){O(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),O(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function tS(n,e,t,s,i){const r=new XR;let o,c;if(t.type===ot.OVERWRITE){const h=t;h.source.fromUser?o=Lc(n,e,h.path,h.snap,s,i,r):(O(h.source.fromServer,"Unknown source."),c=h.source.tagged||e.serverCache.isFiltered()&&!G(h.path),o=Ao(n,e,h.path,h.snap,s,i,c,r))}else if(t.type===ot.MERGE){const h=t;h.source.fromUser?o=sS(n,e,h.path,h.children,s,i,r):(O(h.source.fromServer,"Unknown source."),c=h.source.tagged||e.serverCache.isFiltered(),o=Fc(n,e,h.path,h.children,s,i,c,r))}else if(t.type===ot.ACK_USER_WRITE){const h=t;h.revert?o=oS(n,e,h.path,s,i,r):o=iS(n,e,h.path,h.affectedTree,s,i,r)}else if(t.type===ot.LISTEN_COMPLETE)o=rS(n,e,t.path,s,r);else throw As("Unknown operation type: "+t.type);const l=r.getChanges();return nS(e,o,l),{viewCache:o,changes:l}}function nS(n,e,t){const s=e.eventCache;if(s.isFullyInitialized()){const i=s.getNode().isLeafNode()||s.getNode().isEmpty(),r=Vc(n);(t.length>0||!n.eventCache.isFullyInitialized()||i&&!s.getNode().equals(r)||!s.getNode().getPriority().equals(r.getPriority()))&&t.push(qm(Vc(e)))}}function Ym(n,e,t,s,i,r){const o=e.eventCache;if(Co(s,t)!=null)return e;{let c,l;if(G(t))if(O(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const h=Wn(e),f=h instanceof B?h:B.EMPTY_NODE,p=su(s,f);c=n.filter.updateFullNode(e.eventCache.getNode(),p,r)}else{const h=wo(s,Wn(e));c=n.filter.updateFullNode(e.eventCache.getNode(),h,r)}else{const h=z(t);if(h===".priority"){O(_n(t)===1,"Can't have a priority with additional path components");const f=o.getNode();l=e.serverCache.getNode();const p=Sf(s,t,f,l);p!=null?c=n.filter.updatePriority(f,p):c=o.getNode()}else{const f=oe(t);let p;if(o.isCompleteForChild(h)){l=e.serverCache.getNode();const _=Sf(s,t,o.getNode(),l);_!=null?p=o.getNode().getImmediateChild(h).updateChild(f,_):p=o.getNode().getImmediateChild(h)}else p=iu(s,h,e.serverCache);p!=null?c=n.filter.updateChild(o.getNode(),h,p,f,i,r):c=o.getNode()}}return yi(e,c,o.isFullyInitialized()||G(t),n.filter.filtersNodes())}}function Ao(n,e,t,s,i,r,o,c){const l=e.serverCache;let h;const f=o?n.filter:n.filter.getIndexedFilter();if(G(t))h=f.updateFullNode(l.getNode(),s,null);else if(f.filtersNodes()&&!l.isFiltered()){const T=l.getNode().updateChild(t,s);h=f.updateFullNode(l.getNode(),T,null)}else{const T=z(t);if(!l.isCompleteForPath(t)&&_n(t)>1)return e;const S=oe(t),k=l.getNode().getImmediateChild(T).updateChild(S,s);T===".priority"?h=f.updatePriority(l.getNode(),k):h=f.updateChild(l.getNode(),T,k,S,Qm,null)}const p=jm(e,h,l.isFullyInitialized()||G(t),f.filtersNodes()),_=new ru(i,p,r);return Ym(n,p,t,i,_,c)}function Lc(n,e,t,s,i,r,o){const c=e.eventCache;let l,h;const f=new ru(i,e,r);if(G(t))h=n.filter.updateFullNode(e.eventCache.getNode(),s,o),l=yi(e,h,!0,n.filter.filtersNodes());else{const p=z(t);if(p===".priority")h=n.filter.updatePriority(e.eventCache.getNode(),s),l=yi(e,h,c.isFullyInitialized(),c.isFiltered());else{const _=oe(t),T=c.getNode().getImmediateChild(p);let S;if(G(_))S=s;else{const D=f.getCompleteChild(p);D!=null?Kl(_)===".priority"&&D.getChild(Vm(_)).isEmpty()?S=D:S=D.updateChild(_,s):S=B.EMPTY_NODE}if(T.equals(S))l=e;else{const D=n.filter.updateChild(c.getNode(),p,S,_,f,o);l=yi(e,D,c.isFullyInitialized(),n.filter.filtersNodes())}}}return l}function Pf(n,e){return n.eventCache.isCompleteForChild(e)}function sS(n,e,t,s,i,r,o){let c=e;return s.foreach((l,h)=>{const f=me(t,l);Pf(e,z(f))&&(c=Lc(n,c,f,h,i,r,o))}),s.foreach((l,h)=>{const f=me(t,l);Pf(e,z(f))||(c=Lc(n,c,f,h,i,r,o))}),c}function bf(n,e,t){return t.foreach((s,i)=>{e=e.updateChild(s,i)}),e}function Fc(n,e,t,s,i,r,o,c){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,h;G(t)?h=s:h=new ue(null).setTree(t,s);const f=e.serverCache.getNode();return h.children.inorderTraversal((p,_)=>{if(f.hasChild(p)){const T=e.serverCache.getNode().getImmediateChild(p),S=bf(n,T,_);l=Ao(n,l,new ie(p),S,i,r,o,c)}}),h.children.inorderTraversal((p,_)=>{const T=!e.serverCache.isCompleteForChild(p)&&_.value===null;if(!f.hasChild(p)&&!T){const S=e.serverCache.getNode().getImmediateChild(p),D=bf(n,S,_);l=Ao(n,l,new ie(p),D,i,r,o,c)}}),l}function iS(n,e,t,s,i,r,o){if(Co(i,t)!=null)return e;const c=e.serverCache.isFiltered(),l=e.serverCache;if(s.value!=null){if(G(t)&&l.isFullyInitialized()||l.isCompleteForPath(t))return Ao(n,e,t,l.getNode().getChild(t),i,r,c,o);if(G(t)){let h=new ue(null);return l.getNode().forEachChild(us,(f,p)=>{h=h.set(new ie(f),p)}),Fc(n,e,t,h,i,r,c,o)}else return e}else{let h=new ue(null);return s.foreach((f,p)=>{const _=me(t,f);l.isCompleteForPath(_)&&(h=h.set(f,l.getNode().getChild(_)))}),Fc(n,e,t,h,i,r,c,o)}}function rS(n,e,t,s,i){const r=e.serverCache,o=jm(e,r.getNode(),r.isFullyInitialized()||G(t),r.isFiltered());return Ym(n,o,t,s,Qm,i)}function oS(n,e,t,s,i,r){let o;if(Co(s,t)!=null)return e;{const c=new ru(s,e,i),l=e.eventCache.getNode();let h;if(G(t)||z(t)===".priority"){let f;if(e.serverCache.isFullyInitialized())f=wo(s,Wn(e));else{const p=e.serverCache.getNode();O(p instanceof B,"serverChildren would be complete if leaf node"),f=su(s,p)}f=f,h=n.filter.updateFullNode(l,f,r)}else{const f=z(t);let p=iu(s,f,e.serverCache);p==null&&e.serverCache.isCompleteForChild(f)&&(p=l.getImmediateChild(f)),p!=null?h=n.filter.updateChild(l,f,p,oe(t),c,r):e.eventCache.getNode().hasChild(f)?h=n.filter.updateChild(l,f,B.EMPTY_NODE,oe(t),c,r):h=l,h.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=wo(s,Wn(e)),o.isLeafNode()&&(h=n.filter.updateFullNode(h,o,r)))}return o=e.serverCache.isFullyInitialized()||Co(s,te())!=null,yi(e,h,o,n.filter.filtersNodes())}}/**
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
 */class aS{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const s=this.query_._queryParams,i=new Jl(s.getIndex()),r=RR(s);this.processor_=ZR(r);const o=t.serverCache,c=t.eventCache,l=i.updateFullNode(B.EMPTY_NODE,o.getNode(),null),h=r.updateFullNode(B.EMPTY_NODE,c.getNode(),null),f=new qn(l,o.isFullyInitialized(),i.filtersNodes()),p=new qn(h,c.isFullyInitialized(),r.filtersNodes());this.viewCache_=ra(p,f),this.eventGenerator_=new OR(this.query_)}get query(){return this.query_}}function cS(n){return n.viewCache_.serverCache.getNode()}function lS(n,e){const t=Wn(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!G(e)&&!t.getImmediateChild(z(e)).isEmpty())?t.getChild(e):null}function Nf(n){return n.eventRegistrations_.length===0}function uS(n,e){n.eventRegistrations_.push(e)}function kf(n,e,t){const s=[];if(t){O(e==null,"A cancel should cancel all event registrations.");const i=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,i);o&&s.push(o)})}if(e){let i=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=i}else n.eventRegistrations_=[];return s}function Df(n,e,t,s){e.type===ot.MERGE&&e.source.queryId!==null&&(O(Wn(n.viewCache_),"We should always have a full cache before handling merges"),O(Vc(n.viewCache_),"Missing event cache, even though we have a server cache"));const i=n.viewCache_,r=tS(n.processor_,i,e,t,s);return eS(n.processor_,r.viewCache),O(r.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,Xm(n,r.changes,r.viewCache.eventCache.getNode(),null)}function hS(n,e){const t=n.viewCache_.eventCache,s=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(de,(r,o)=>{s.push(Ts(r,o))}),t.isFullyInitialized()&&s.push(qm(t.getNode())),Xm(n,s,t.getNode(),e)}function Xm(n,e,t,s){const i=s?[s]:n.eventRegistrations_;return VR(n.eventGenerator_,e,t,i)}/**
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
 */let Ro;class dS{constructor(){this.views=new Map}}function fS(n){O(!Ro,"__referenceConstructor has already been defined"),Ro=n}function pS(){return O(Ro,"Reference.ts has not been loaded"),Ro}function _S(n){return n.views.size===0}function ou(n,e,t,s){const i=e.source.queryId;if(i!==null){const r=n.views.get(i);return O(r!=null,"SyncTree gave us an op for an invalid query."),Df(r,e,t,s)}else{let r=[];for(const o of n.views.values())r=r.concat(Df(o,e,t,s));return r}}function mS(n,e,t,s,i){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let c=wo(t,i?s:null),l=!1;c?l=!0:s instanceof B?(c=su(t,s),l=!1):(c=B.EMPTY_NODE,l=!1);const h=ra(new qn(c,l,!1),new qn(s,i,!1));return new aS(e,h)}return o}function gS(n,e,t,s,i,r){const o=mS(n,e,s,i,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),uS(o,t),hS(o,t)}function yS(n,e,t,s){const i=e._queryIdentifier,r=[];let o=[];const c=mn(n);if(i==="default")for(const[l,h]of n.views.entries())o=o.concat(kf(h,t,s)),Nf(h)&&(n.views.delete(l),h.query._queryParams.loadsAllData()||r.push(h.query));else{const l=n.views.get(i);l&&(o=o.concat(kf(l,t,s)),Nf(l)&&(n.views.delete(i),l.query._queryParams.loadsAllData()||r.push(l.query)))}return c&&!mn(n)&&r.push(new(pS())(e._repo,e._path)),{removed:r,events:o}}function Jm(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function hs(n,e){let t=null;for(const s of n.views.values())t=t||lS(s,e);return t}function Zm(n,e){if(e._queryParams.loadsAllData())return oa(n);{const s=e._queryIdentifier;return n.views.get(s)}}function eg(n,e){return Zm(n,e)!=null}function mn(n){return oa(n)!=null}function oa(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
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
 */let So;function ES(n){O(!So,"__referenceConstructor has already been defined"),So=n}function vS(){return O(So,"Reference.ts has not been loaded"),So}let IS=1;class Of{constructor(e){this.listenProvider_=e,this.syncPointTree_=new ue(null),this.pendingWriteTree_=QR(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function tg(n,e,t,s,i){return FR(n.pendingWriteTree_,e,t,s,i),i?ir(n,new Bn(Wm(),e,t)):[]}function kn(n,e,t=!1){const s=UR(n.pendingWriteTree_,e);if(BR(n.pendingWriteTree_,e)){let r=new ue(null);return s.snap!=null?r=r.set(te(),!0):Be(s.children,o=>{r=r.set(new ie(o),!0)}),ir(n,new To(s.path,r,t))}else return[]}function aa(n,e,t){return ir(n,new Bn(eu(),e,t))}function TS(n,e,t){const s=ue.fromObject(t);return ir(n,new Fi(eu(),e,s))}function wS(n,e){return ir(n,new Li(eu(),e))}function CS(n,e,t){const s=cu(n,t);if(s){const i=lu(s),r=i.path,o=i.queryId,c=Ke(r,e),l=new Li(tu(o),c);return uu(n,r,l)}else return[]}function Uc(n,e,t,s,i=!1){const r=e._path,o=n.syncPointTree_.get(r);let c=[];if(o&&(e._queryIdentifier==="default"||eg(o,e))){const l=yS(o,e,t,s);_S(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const h=l.removed;if(c=l.events,!i){const f=h.findIndex(_=>_._queryParams.loadsAllData())!==-1,p=n.syncPointTree_.findOnPath(r,(_,T)=>mn(T));if(f&&!p){const _=n.syncPointTree_.subtree(r);if(!_.isEmpty()){const T=SS(_);for(let S=0;S<T.length;++S){const D=T[S],k=D.query,$=ig(n,D);n.listenProvider_.startListening(vi(k),Po(n,k),$.hashFn,$.onComplete)}}}!p&&h.length>0&&!s&&(f?n.listenProvider_.stopListening(vi(e),null):h.forEach(_=>{const T=n.queryToTagMap.get(ca(_));n.listenProvider_.stopListening(vi(_),T)}))}PS(n,h)}return c}function AS(n,e,t,s){const i=cu(n,s);if(i!=null){const r=lu(i),o=r.path,c=r.queryId,l=Ke(o,e),h=new Bn(tu(c),l,t);return uu(n,o,h)}else return[]}function RS(n,e,t,s){const i=cu(n,s);if(i){const r=lu(i),o=r.path,c=r.queryId,l=Ke(o,e),h=ue.fromObject(t),f=new Fi(tu(c),l,h);return uu(n,o,f)}else return[]}function Vf(n,e,t,s=!1){const i=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(i,(_,T)=>{const S=Ke(_,i);r=r||hs(T,S),o=o||mn(T)});let c=n.syncPointTree_.get(i);c?(o=o||mn(c),r=r||hs(c,te())):(c=new dS,n.syncPointTree_=n.syncPointTree_.set(i,c));let l;r!=null?l=!0:(l=!1,r=B.EMPTY_NODE,n.syncPointTree_.subtree(i).foreachChild((T,S)=>{const D=hs(S,te());D&&(r=r.updateImmediateChild(T,D))}));const h=eg(c,e);if(!h&&!e._queryParams.loadsAllData()){const _=ca(e);O(!n.queryToTagMap.has(_),"View does not exist, but we have a tag");const T=bS();n.queryToTagMap.set(_,T),n.tagToQueryMap.set(T,_)}const f=nu(n.pendingWriteTree_,i);let p=gS(c,e,t,f,r,l);if(!h&&!o&&!s){const _=Zm(c,e);p=p.concat(NS(n,e,_))}return p}function au(n,e,t){const i=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,c)=>{const l=Ke(o,e),h=hs(c,l);if(h)return h});return zm(i,e,r,t,!0)}function ir(n,e){return ng(e,n.syncPointTree_,null,nu(n.pendingWriteTree_,te()))}function ng(n,e,t,s){if(G(n.path))return sg(n,e,t,s);{const i=e.get(te());t==null&&i!=null&&(t=hs(i,te()));let r=[];const o=z(n.path),c=n.operationForChild(o),l=e.children.get(o);if(l&&c){const h=t?t.getImmediateChild(o):null,f=Gm(s,o);r=r.concat(ng(c,l,h,f))}return i&&(r=r.concat(ou(i,n,s,t))),r}}function sg(n,e,t,s){const i=e.get(te());t==null&&i!=null&&(t=hs(i,te()));let r=[];return e.children.inorderTraversal((o,c)=>{const l=t?t.getImmediateChild(o):null,h=Gm(s,o),f=n.operationForChild(o);f&&(r=r.concat(sg(f,c,l,h)))}),i&&(r=r.concat(ou(i,n,s,t))),r}function ig(n,e){const t=e.query,s=Po(n,t);return{hashFn:()=>(cS(e)||B.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return s?CS(n,t._path,s):wS(n,t._path);{const r=CA(i,t);return Uc(n,t,null,r)}}}}function Po(n,e){const t=ca(e);return n.queryToTagMap.get(t)}function ca(n){return n._path.toString()+"$"+n._queryIdentifier}function cu(n,e){return n.tagToQueryMap.get(e)}function lu(n){const e=n.indexOf("$");return O(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new ie(n.substr(0,e))}}function uu(n,e,t){const s=n.syncPointTree_.get(e);O(s,"Missing sync point for query tag that we're tracking");const i=nu(n.pendingWriteTree_,e);return ou(s,t,i,null)}function SS(n){return n.fold((e,t,s)=>{if(t&&mn(t))return[oa(t)];{let i=[];return t&&(i=Jm(t)),Be(s,(r,o)=>{i=i.concat(o)}),i}})}function vi(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(vS())(n._repo,n._path):n}function PS(n,e){for(let t=0;t<e.length;++t){const s=e[t];if(!s._queryParams.loadsAllData()){const i=ca(s),r=n.queryToTagMap.get(i);n.queryToTagMap.delete(i),n.tagToQueryMap.delete(r)}}}function bS(){return IS++}function NS(n,e,t){const s=e._path,i=Po(n,e),r=ig(n,t),o=n.listenProvider_.startListening(vi(e),i,r.hashFn,r.onComplete),c=n.syncPointTree_.subtree(s);if(i)O(!mn(c.value),"If we're adding a query, it shouldn't be shadowed");else{const l=c.fold((h,f,p)=>{if(!G(h)&&f&&mn(f))return[oa(f).query];{let _=[];return f&&(_=_.concat(Jm(f).map(T=>T.query))),Be(p,(T,S)=>{_=_.concat(S)}),_}});for(let h=0;h<l.length;++h){const f=l[h];n.listenProvider_.stopListening(vi(f),Po(n,f))}}return o}/**
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
 */class hu{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new hu(t)}node(){return this.node_}}class du{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=me(this.path_,e);return new du(this.syncTree_,t)}node(){return au(this.syncTree_,this.path_)}}const kS=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},Mf=function(n,e,t){if(!n||typeof n!="object")return n;if(O(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return DS(n[".sv"],e,t);if(typeof n[".sv"]=="object")return OS(n[".sv"],e);O(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},DS=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:O(!1,"Unexpected server value: "+n)}},OS=function(n,e,t){n.hasOwnProperty("increment")||O(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const s=n.increment;typeof s!="number"&&O(!1,"Unexpected increment value: "+s);const i=e.node();if(O(i!==null&&typeof i!="undefined","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return s;const o=i.getValue();return typeof o!="number"?s:o+s},VS=function(n,e,t,s){return fu(e,new du(t,n),s)},rg=function(n,e,t){return fu(n,new hu(e),t)};function fu(n,e,t){const s=n.getPriority().val(),i=Mf(s,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,c=Mf(o.getValue(),e,t);return c!==o.getValue()||i!==o.getPriority().val()?new Ce(c,Ee(i)):n}else{const o=n;return r=o,i!==o.getPriority().val()&&(r=r.updatePriority(new Ce(i))),o.forEachChild(de,(c,l)=>{const h=fu(l,e.getImmediateChild(c),t);h!==l&&(r=r.updateImmediateChild(c,h))}),r}}/**
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
 */class pu{constructor(e="",t=null,s={children:{},childCount:0}){this.name=e,this.parent=t,this.node=s}}function _u(n,e){let t=e instanceof ie?e:new ie(e),s=n,i=z(t);for(;i!==null;){const r=ds(s.node.children,i)||{children:{},childCount:0};s=new pu(i,s,r),t=oe(t),i=z(t)}return s}function Ms(n){return n.node.value}function og(n,e){n.node.value=e,Bc(n)}function ag(n){return n.node.childCount>0}function MS(n){return Ms(n)===void 0&&!ag(n)}function la(n,e){Be(n.node.children,(t,s)=>{e(new pu(t,n,s))})}function cg(n,e,t,s){t&&e(n),la(n,i=>{cg(i,e,!0)})}function xS(n,e,t){let s=n.parent;for(;s!==null;){if(e(s))return!0;s=s.parent}return!1}function rr(n){return new ie(n.parent===null?n.name:rr(n.parent)+"/"+n.name)}function Bc(n){n.parent!==null&&LS(n.parent,n.name,n)}function LS(n,e,t){const s=MS(t),i=vt(n.node.children,e);s&&i?(delete n.node.children[e],n.node.childCount--,Bc(n)):!s&&!i&&(n.node.children[e]=t.node,n.node.childCount++,Bc(n))}/**
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
 */const FS=/[\[\].#$\/\u0000-\u001F\u007F]/,US=/[\[\].#$\u0000-\u001F\u007F]/,tc=10*1024*1024,mu=function(n){return typeof n=="string"&&n.length!==0&&!FS.test(n)},lg=function(n){return typeof n=="string"&&n.length!==0&&!US.test(n)},BS=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),lg(n)},ug=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!sa(n)||n&&typeof n=="object"&&vt(n,".sv")},bo=function(n,e,t,s){s&&e===void 0||ua(fs(n,"value"),e,t)},ua=function(n,e,t){const s=t instanceof ie?new iR(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+Sn(s));if(typeof e=="function")throw new Error(n+"contains a function "+Sn(s)+" with contents = "+e.toString());if(sa(e))throw new Error(n+"contains "+e.toString()+" "+Sn(s));if(typeof e=="string"&&e.length>tc/3&&Do(e)>tc)throw new Error(n+"contains a string greater than "+tc+" utf8 bytes "+Sn(s)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,r=!1;if(Be(e,(o,c)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!mu(o)))throw new Error(n+" contains an invalid key ("+o+") "+Sn(s)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);rR(s,o),ua(n,c,s),oR(s)}),i&&r)throw new Error(n+' contains ".value" child '+Sn(s)+" in addition to actual children.")}},qS=function(n,e){let t,s;for(t=0;t<e.length;t++){s=e[t];const r=Oi(s);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!mu(r[o]))throw new Error(n+"contains an invalid key ("+r[o]+") in path "+s.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(sR);let i=null;for(t=0;t<e.length;t++){if(s=e[t],i!==null&&tt(i,s))throw new Error(n+"contains a path "+i.toString()+" that is ancestor of another path "+s.toString());i=s}},WS=function(n,e,t,s){const i=fs(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(i+" must be an object containing the children to replace.");const r=[];Be(e,(o,c)=>{const l=new ie(o);if(ua(i,c,me(t,l)),Kl(l)===".priority"&&!ug(c))throw new Error(i+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(l)}),qS(i,r)},jS=function(n,e,t){if(sa(e))throw new Error(fs(n,"priority")+"is "+e.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!ug(e))throw new Error(fs(n,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")},hg=function(n,e,t,s){if(!lg(t))throw new Error(fs(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},$S=function(n,e,t,s){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),hg(n,e,t)},Dn=function(n,e){if(z(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},HS=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!mu(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!BS(t))throw new Error(fs(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
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
 */class zS{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function gu(n,e){let t=null;for(let s=0;s<e.length;s++){const i=e[s],r=i.getPath();t!==null&&!Ql(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(i)}t&&n.eventLists_.push(t)}function dg(n,e,t){gu(n,t),fg(n,s=>Ql(s,e))}function Bt(n,e,t){gu(n,t),fg(n,s=>tt(s,e)||tt(e,s))}function fg(n,e){n.recursionDepth_++;let t=!0;for(let s=0;s<n.eventLists_.length;s++){const i=n.eventLists_[s];if(i){const r=i.path;e(r)?(GS(n.eventLists_[s]),n.eventLists_[s]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function GS(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const s=t.getEventRunner();mi&&be("event: "+t.toString()),Os(s)}}}/**
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
 */const KS="repo_interrupt",QS=25;class YS{constructor(e,t,s,i){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=s,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new zS,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Io(),this.transactionQueueTree_=new pu,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function XS(n,e,t){if(n.stats_=zl(n.repoInfo_),n.forceRestClient_||PA())n.server_=new vo(n.repoInfo_,(s,i,r,o)=>{xf(n,s,i,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>Lf(n,!0),0);else{if(typeof t!="undefined"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{Se(t)}catch(s){throw new Error("Invalid authOverride provided: "+s)}}n.persistentConnection_=new Ot(n.repoInfo_,e,(s,i,r,o)=>{xf(n,s,i,r,o)},s=>{Lf(n,s)},s=>{JS(n,s)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(s=>{n.server_.refreshAuthToken(s)}),n.appCheckProvider_.addTokenChangeListener(s=>{n.server_.refreshAppCheckToken(s.token)}),n.statsReporter_=OA(n.repoInfo_,()=>new DR(n.stats_,n.server_)),n.infoData_=new SR,n.infoSyncTree_=new Of({startListening:(s,i,r,o)=>{let c=[];const l=n.infoData_.getNode(s._path);return l.isEmpty()||(c=aa(n.infoSyncTree_,s._path,l),setTimeout(()=>{o("ok")},0)),c},stopListening:()=>{}}),Eu(n,"connected",!1),n.serverSyncTree_=new Of({startListening:(s,i,r,o)=>(n.server_.listen(s,r,i,(c,l)=>{const h=o(c,l);Bt(n.eventQueue_,s._path,h)}),[]),stopListening:(s,i)=>{n.server_.unlisten(s,i)}})}function pg(n){const t=n.infoData_.getNode(new ie(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function yu(n){return kS({timestamp:pg(n)})}function xf(n,e,t,s,i){n.dataUpdateCount++;const r=new ie(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(i)if(s){const l=Qr(t,h=>Ee(h));o=RS(n.serverSyncTree_,r,l,i)}else{const l=Ee(t);o=AS(n.serverSyncTree_,r,l,i)}else if(s){const l=Qr(t,h=>Ee(h));o=TS(n.serverSyncTree_,r,l)}else{const l=Ee(t);o=aa(n.serverSyncTree_,r,l)}let c=r;o.length>0&&(c=ha(n,r)),Bt(n.eventQueue_,c,o)}function Lf(n,e){Eu(n,"connected",e),e===!1&&eP(n)}function JS(n,e){Be(e,(t,s)=>{Eu(n,t,s)})}function Eu(n,e,t){const s=new ie("/.info/"+e),i=Ee(t);n.infoData_.updateSnapshot(s,i);const r=aa(n.infoSyncTree_,s,i);Bt(n.eventQueue_,s,r)}function _g(n){return n.nextWriteId_++}function ZS(n,e,t,s,i){vu(n,"set",{path:e.toString(),value:t,priority:s});const r=yu(n),o=Ee(t,s),c=au(n.serverSyncTree_,e),l=rg(o,c,r),h=_g(n),f=tg(n.serverSyncTree_,e,l,h,!0);gu(n.eventQueue_,f),n.server_.put(e.toString(),o.val(!0),(_,T)=>{const S=_==="ok";S||Ye("set at "+e+" failed: "+_);const D=kn(n.serverSyncTree_,h,!S);Bt(n.eventQueue_,e,D),Cs(n,i,_,T)});const p=vg(n,e);ha(n,p),Bt(n.eventQueue_,p,[])}function eP(n){vu(n,"onDisconnectEvents");const e=yu(n),t=Io();Oc(n.onDisconnect_,te(),(i,r)=>{const o=VS(i,r,n.serverSyncTree_,e);Vs(t,i,o)});let s=[];Oc(t,te(),(i,r)=>{s=s.concat(aa(n.serverSyncTree_,i,r));const o=vg(n,i);ha(n,o)}),n.onDisconnect_=Io(),Bt(n.eventQueue_,te(),s)}function tP(n,e,t){n.server_.onDisconnectCancel(e.toString(),(s,i)=>{s==="ok"&&Dc(n.onDisconnect_,e),Cs(n,t,s,i)})}function Ff(n,e,t,s){const i=Ee(t);n.server_.onDisconnectPut(e.toString(),i.val(!0),(r,o)=>{r==="ok"&&Vs(n.onDisconnect_,e,i),Cs(n,s,r,o)})}function nP(n,e,t,s,i){const r=Ee(t,s);n.server_.onDisconnectPut(e.toString(),r.val(!0),(o,c)=>{o==="ok"&&Vs(n.onDisconnect_,e,r),Cs(n,i,o,c)})}function sP(n,e,t,s){if(Kr(t)){be("onDisconnect().update() called with empty data.  Don't do anything."),Cs(n,s,"ok",void 0);return}n.server_.onDisconnectMerge(e.toString(),t,(i,r)=>{i==="ok"&&Be(t,(o,c)=>{const l=Ee(c);Vs(n.onDisconnect_,me(e,o),l)}),Cs(n,s,i,r)})}function iP(n,e,t){let s;z(e._path)===".info"?s=Vf(n.infoSyncTree_,e,t):s=Vf(n.serverSyncTree_,e,t),dg(n.eventQueue_,e._path,s)}function Uf(n,e,t){let s;z(e._path)===".info"?s=Uc(n.infoSyncTree_,e,t):s=Uc(n.serverSyncTree_,e,t),dg(n.eventQueue_,e._path,s)}function rP(n){n.persistentConnection_&&n.persistentConnection_.interrupt(KS)}function vu(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),be(t,...e)}function Cs(n,e,t,s){e&&Os(()=>{if(t==="ok")e(null);else{const i=(t||"error").toUpperCase();let r=i;s&&(r+=": "+s);const o=new Error(r);o.code=i,e(o)}})}function mg(n,e,t){return au(n.serverSyncTree_,e,t)||B.EMPTY_NODE}function Iu(n,e=n.transactionQueueTree_){if(e||da(n,e),Ms(e)){const t=yg(n,e);O(t.length>0,"Sending zero length transaction queue"),t.every(i=>i.status===0)&&oP(n,rr(e),t)}else ag(e)&&la(e,t=>{Iu(n,t)})}function oP(n,e,t){const s=t.map(h=>h.currentWriteId),i=mg(n,e,s);let r=i;const o=i.hash();for(let h=0;h<t.length;h++){const f=t[h];O(f.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),f.status=1,f.retryCount++;const p=Ke(e,f.path);r=r.updateChild(p,f.currentOutputSnapshotRaw)}const c=r.val(!0),l=e;n.server_.put(l.toString(),c,h=>{vu(n,"transaction put response",{path:l.toString(),status:h});let f=[];if(h==="ok"){const p=[];for(let _=0;_<t.length;_++)t[_].status=2,f=f.concat(kn(n.serverSyncTree_,t[_].currentWriteId)),t[_].onComplete&&p.push(()=>t[_].onComplete(null,!0,t[_].currentOutputSnapshotResolved)),t[_].unwatcher();da(n,_u(n.transactionQueueTree_,e)),Iu(n,n.transactionQueueTree_),Bt(n.eventQueue_,e,f);for(let _=0;_<p.length;_++)Os(p[_])}else{if(h==="datastale")for(let p=0;p<t.length;p++)t[p].status===3?t[p].status=4:t[p].status=0;else{Ye("transaction at "+l.toString()+" failed: "+h);for(let p=0;p<t.length;p++)t[p].status=4,t[p].abortReason=h}ha(n,e)}},o)}function ha(n,e){const t=gg(n,e),s=rr(t),i=yg(n,t);return aP(n,i,s),s}function aP(n,e,t){if(e.length===0)return;const s=[];let i=[];const o=e.filter(c=>c.status===0).map(c=>c.currentWriteId);for(let c=0;c<e.length;c++){const l=e[c],h=Ke(t,l.path);let f=!1,p;if(O(h!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)f=!0,p=l.abortReason,i=i.concat(kn(n.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=QS)f=!0,p="maxretry",i=i.concat(kn(n.serverSyncTree_,l.currentWriteId,!0));else{const _=mg(n,l.path,o);l.currentInputSnapshot=_;const T=e[c].update(_.val());if(T!==void 0){ua("transaction failed: Data returned ",T,l.path);let S=Ee(T);typeof T=="object"&&T!=null&&vt(T,".priority")||(S=S.updatePriority(_.getPriority()));const k=l.currentWriteId,$=yu(n),q=rg(S,_,$);l.currentOutputSnapshotRaw=S,l.currentOutputSnapshotResolved=q,l.currentWriteId=_g(n),o.splice(o.indexOf(k),1),i=i.concat(tg(n.serverSyncTree_,l.path,q,l.currentWriteId,l.applyLocally)),i=i.concat(kn(n.serverSyncTree_,k,!0))}else f=!0,p="nodata",i=i.concat(kn(n.serverSyncTree_,l.currentWriteId,!0))}Bt(n.eventQueue_,t,i),i=[],f&&(e[c].status=2,function(_){setTimeout(_,Math.floor(0))}(e[c].unwatcher),e[c].onComplete&&(p==="nodata"?s.push(()=>e[c].onComplete(null,!1,e[c].currentInputSnapshot)):s.push(()=>e[c].onComplete(new Error(p),!1,null))))}da(n,n.transactionQueueTree_);for(let c=0;c<s.length;c++)Os(s[c]);Iu(n,n.transactionQueueTree_)}function gg(n,e){let t,s=n.transactionQueueTree_;for(t=z(e);t!==null&&Ms(s)===void 0;)s=_u(s,t),e=oe(e),t=z(e);return s}function yg(n,e){const t=[];return Eg(n,e,t),t.sort((s,i)=>s.order-i.order),t}function Eg(n,e,t){const s=Ms(e);if(s)for(let i=0;i<s.length;i++)t.push(s[i]);la(e,i=>{Eg(n,i,t)})}function da(n,e){const t=Ms(e);if(t){let s=0;for(let i=0;i<t.length;i++)t[i].status!==2&&(t[s]=t[i],s++);t.length=s,og(e,t.length>0?t:void 0)}la(e,s=>{da(n,s)})}function vg(n,e){const t=rr(gg(n,e)),s=_u(n.transactionQueueTree_,e);return xS(s,i=>{nc(n,i)}),nc(n,s),cg(s,i=>{nc(n,i)}),t}function nc(n,e){const t=Ms(e);if(t){const s=[];let i=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(O(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(O(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),i=i.concat(kn(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&s.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?og(e,void 0):t.length=r+1,Bt(n.eventQueue_,rr(e),i);for(let o=0;o<s.length;o++)Os(s[o])}}/**
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
 */function cP(n){let e="";const t=n.split("/");for(let s=0;s<t.length;s++)if(t[s].length>0){let i=t[s];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch(r){}e+="/"+i}return e}function lP(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const s=t.split("=");s.length===2?e[decodeURIComponent(s[0])]=decodeURIComponent(s[1]):Ye(`Invalid query segment '${t}' in query '${n}'`)}return e}const Bf=function(n,e){const t=uP(n),s=t.namespace;t.domain==="firebase.com"&&Ut(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!s||s==="undefined")&&t.domain!=="localhost"&&Ut("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||EA();const i=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new Am(t.host,t.secure,s,i,e,"",s!==t.subdomain),path:new ie(t.pathString)}},uP=function(n){let e="",t="",s="",i="",r="",o=!0,c="https",l=443;if(typeof n=="string"){let h=n.indexOf("//");h>=0&&(c=n.substring(0,h-1),n=n.substring(h+2));let f=n.indexOf("/");f===-1&&(f=n.length);let p=n.indexOf("?");p===-1&&(p=n.length),e=n.substring(0,Math.min(f,p)),f<p&&(i=cP(n.substring(f,p)));const _=lP(n.substring(Math.min(n.length,p)));h=e.indexOf(":"),h>=0?(o=c==="https"||c==="wss",l=parseInt(e.substring(h+1),10)):h=e.length;const T=e.slice(0,h);if(T.toLowerCase()==="localhost")t="localhost";else if(T.split(".").length<=2)t=T;else{const S=e.indexOf(".");s=e.substring(0,S).toLowerCase(),t=e.substring(S+1),r=s}"ns"in _&&(r=_.ns)}return{host:e,port:l,domain:t,subdomain:s,secure:o,scheme:c,pathString:i,namespace:r}};/**
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
 */const qf="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",hP=function(){let n=0;const e=[];return function(t){const s=t===n;n=t;let i;const r=new Array(8);for(i=7;i>=0;i--)r[i]=qf.charAt(t%64),t=Math.floor(t/64);O(t===0,"Cannot push at time == 0");let o=r.join("");if(s){for(i=11;i>=0&&e[i]===63;i--)e[i]=0;e[i]++}else for(i=0;i<12;i++)e[i]=Math.floor(Math.random()*64);for(i=0;i<12;i++)o+=qf.charAt(e[i]);return O(o.length===20,"nextPushId: Length should be 20."),o}}();/**
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
 */class dP{constructor(e,t,s,i){this.eventType=e,this.eventRegistration=t,this.snapshot=s,this.prevName=i}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+Se(this.snapshot.exportVal())}}class fP{constructor(e,t,s){this.eventRegistration=e,this.error=t,this.path=s}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
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
 */class pP{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return O(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class _P{constructor(e,t){this._repo=e,this._path=t}cancel(){const e=new Pt;return tP(this._repo,this._path,e.wrapCallback(()=>{})),e.promise}remove(){Dn("OnDisconnect.remove",this._path);const e=new Pt;return Ff(this._repo,this._path,null,e.wrapCallback(()=>{})),e.promise}set(e){Dn("OnDisconnect.set",this._path),bo("OnDisconnect.set",e,this._path,!1);const t=new Pt;return Ff(this._repo,this._path,e,t.wrapCallback(()=>{})),t.promise}setWithPriority(e,t){Dn("OnDisconnect.setWithPriority",this._path),bo("OnDisconnect.setWithPriority",e,this._path,!1),jS("OnDisconnect.setWithPriority",t);const s=new Pt;return nP(this._repo,this._path,e,t,s.wrapCallback(()=>{})),s.promise}update(e){Dn("OnDisconnect.update",this._path),WS("OnDisconnect.update",e,this._path);const t=new Pt;return sP(this._repo,this._path,e,t.wrapCallback(()=>{})),t.promise}}/**
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
 */class Tu{constructor(e,t,s,i){this._repo=e,this._path=t,this._queryParams=s,this._orderByCalled=i}get key(){return G(this._path)?null:Kl(this._path)}get ref(){return new vn(this._repo,this._path)}get _queryIdentifier(){const e=Tf(this._queryParams),t=$l(e);return t==="{}"?"default":t}get _queryObject(){return Tf(this._queryParams)}isEqual(e){if(e=se(e),!(e instanceof Tu))return!1;const t=this._repo===e._repo,s=Ql(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return t&&s&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+nR(this._path)}}class vn extends Tu{constructor(e,t){super(e,t,new Zl,!1)}get parent(){const e=Vm(this._path);return e===null?null:new vn(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class No{constructor(e,t,s){this._node=e,this.ref=t,this._index=s}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new ie(e),s=Ui(this.ref,e);return new No(this._node.getChild(t),s,de)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(s,i)=>e(new No(i,Ui(this.ref,s),de)))}hasChild(e){const t=new ie(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function tb(n,e){return n=se(n),n._checkNotDeleted("ref"),e!==void 0?Ui(n._root,e):n._root}function Ui(n,e){return n=se(n),z(n._path)===null?$S("child","path",e):hg("child","path",e),new vn(n._repo,me(n._path,e))}function nb(n){return n=se(n),new _P(n._repo,n._path)}function sb(n,e){n=se(n),Dn("push",n._path),bo("push",e,n._path,!0);const t=pg(n._repo),s=hP(t),i=Ui(n,s),r=Ui(n,s);let o;return o=Promise.resolve(r),i.then=o.then.bind(o),i.catch=o.then.bind(o,void 0),i}function ib(n){return Dn("remove",n._path),mP(n,null)}function mP(n,e){n=se(n),Dn("set",n._path),bo("set",e,n._path,!1);const t=new Pt;return ZS(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}class wu{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const s=t._queryParams.getIndex();return new dP("value",this,new No(e.snapshotNode,new vn(t._repo,t._path),s))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new fP(this,e,t):null}matches(e){return e instanceof wu?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function gP(n,e,t,s,i){let r;if(typeof s=="object"&&(r=void 0,i=s),typeof s=="function"&&(r=s),i&&i.onlyOnce){const l=t,h=(f,p)=>{Uf(n._repo,n,c),l(f,p)};h.userCallback=t.userCallback,h.context=t.context,t=h}const o=new pP(t,r||void 0),c=new wu(o);return iP(n._repo,n,c),()=>Uf(n._repo,n,c)}function rb(n,e,t,s){return gP(n,"value",e,t,s)}fS(vn);ES(vn);/**
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
 */const yP="FIREBASE_DATABASE_EMULATOR_HOST",qc={};let EP=!1;function vP(n,e,t,s){const i=e.lastIndexOf(":"),r=e.substring(0,i),o=gn(r);n.repoInfo_=new Am(e,o,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0,t),s&&(n.authTokenProvider_=s)}function IP(n,e,t,s,i){let r=s||n.options.databaseURL;r===void 0&&(n.options.projectId||Ut("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),be("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=Bf(r,i),c=o.repoInfo,l;typeof process!="undefined"&&sf&&(l=sf[yP]),l?(r=`http://${l}?ns=${c.namespace}`,o=Bf(r,i),c=o.repoInfo):o.repoInfo.secure;const h=new NA(n.name,n.options,e);HS("Invalid Firebase Database URL",o),G(o.path)||Ut("Database URL must point to the root of a Firebase Database (not including a child path).");const f=wP(c,n,h,new bA(n,t));return new CP(f,n)}function TP(n,e){const t=qc[e];(!t||t[n.key]!==n)&&Ut(`Database ${e}(${n.repoInfo_}) has already been deleted.`),rP(n),delete t[n.key]}function wP(n,e,t,s){let i=qc[e.name];i||(i={},qc[e.name]=i);let r=i[n.toURLString()];return r&&Ut("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new YS(n,EP,t,s),i[n.toURLString()]=r,r}class CP{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(XS(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new vn(this._repo,te())),this._rootInternal}_delete(){return this._rootInternal!==null&&(TP(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Ut("Cannot call "+e+" on a deleted database.")}}function ob(n=Gc(),e){const t=Vo(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const s=Gf("database");s&&AP(t,...s)}return t}function AP(n,e,t,s={}){n=se(n),n._checkNotDeleted("useEmulator");const i=`${e}:${t}`,r=n._repoInternal;if(n._instanceStarted){if(i===n._repoInternal.repoInfo_.host&&an(s,r.repoInfo_.emulatorOptions))return;Ut("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)s.mockUserToken&&Ut('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new Hr(Hr.OWNER);else if(s.mockUserToken){const c=typeof s.mockUserToken=="string"?s.mockUserToken:Yf(s.mockUserToken,n.app.options.projectId);o=new Hr(c)}gn(e)&&(jc(e),$c("Database",!0)),vP(r,i,s,o)}/**
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
 */function RP(n){fA(jn),Mn(new cn("database",(e,{instanceIdentifier:t})=>{const s=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return IP(s,i,r,t)},"PUBLIC").setMultipleInstances(!0)),ht(rf,of,n),ht(rf,of,"esm2020")}/**
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
 */const SP={".sv":"timestamp"};function ab(){return SP}Ot.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};Ot.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};RP();export{GP as A,JP as B,cn as C,$P as D,QP as E,eb as F,Yt as G,YP as H,HP as I,XP as J,ob as K,tb as L,sb as M,mP as N,nb as O,rb as P,ib as Q,ab as R,bP as S,Mn as _,je as a,Vo as b,se as c,Gf as d,VE as e,LP as f,Gc as g,qP as h,gn as i,eA as j,ZP as k,NP as l,MP as m,xP as n,VP as o,jc as p,DP as q,ht as r,KP as s,kP as t,$c as u,OP as v,zP as w,WP as x,BP as y,jP as z};
