var ut=Object.defineProperty,mt=Object.defineProperties;var gt=Object.getOwnPropertyDescriptors;var Oe=Object.getOwnPropertySymbols;var ft=Object.prototype.hasOwnProperty,pt=Object.prototype.propertyIsEnumerable;var Je=(e,t,n)=>t in e?ut(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,_=(e,t)=>{for(var n in t||(t={}))ft.call(t,n)&&Je(e,n,t[n]);if(Oe)for(var n of Oe(t))pt.call(t,n)&&Je(e,n,t[n]);return e},ke=(e,t)=>mt(e,gt(t));var M=(e,t,n)=>new Promise((a,o)=>{var i=l=>{try{r(n.next(l))}catch(c){o(c)}},s=l=>{try{r(n.throw(l))}catch(c){o(c)}},r=l=>l.done?a(l.value):Promise.resolve(l.value).then(i,s);r((n=n.apply(e,t)).next())});import{_ as ve}from"./preload-helper-lMf9uHy8.js";const yt={BASE_URL:"./",DEV:!0,FEATURE_COLLABORATION:"true",FEATURE_SETLIST_BUILDER:"true",MODE:"production",NODE_ENV:"production",PROD:!1,SSR:!1,VITE_DEMO_MODE:"false",VITE_FIREBASE_API_KEY:"AIzaSyDeXVG-3nT7e677aSjViE3IzjJ0u05e88c",VITE_FIREBASE_APP_ID:"1:789039351544:web:e746138c9fb8a0fd62dd0d",VITE_FIREBASE_AUTH_DOMAIN:"comedyapp-eef2d.firebaseapp.com",VITE_FIREBASE_MEASUREMENT_ID:"G-XK6L5SYQPM",VITE_FIREBASE_MESSAGING_SENDER_ID:"789039351544",VITE_FIREBASE_PROJECT_ID:"comedyapp-eef2d",VITE_FIREBASE_STORAGE_BUCKET:"comedyapp-eef2d.firebasestorage.app",VITE_NODE_ENV:"development",VITE_USER_NODE_ENV:"development",VITE_USE_FIREBASE_EMULATOR:"false"},w=(e,t)=>{try{return yt[e]||t}catch(n){return window.ENV_CONFIG&&window.ENV_CONFIG[e]||t}},vt={NODE_ENV:w("VITE_NODE_ENV","development"),VERSION:w("VITE_VERSION","2.0.0"),API_BASE_URL:w("VITE_API_BASE_URL","https://api.micfinderapp.com"),API_TIMEOUT:1e4,CSV_DATA_URL:w("VITE_CSV_DATA_URL","./coordinates.csv"),FEEDBACK_EMAIL:w("VITE_FEEDBACK_EMAIL","support@micfinderapp.com"),FEATURES:{ONBOARDING:w("VITE_FEATURE_ONBOARDING","true")!=="false",MIC_FINDER:w("VITE_FEATURE_MIC_FINDER","true")!=="false",STATS_CHARTS:w("VITE_FEATURE_STATS_CHARTS","true")!=="false",SETLIST_BUILDER:w("VITE_FEATURE_SETLIST_BUILDER","true")!=="false",DATA_EXPORT:w("VITE_FEATURE_DATA_EXPORT","true")!=="false",KEYBOARD_SHORTCUTS:w("VITE_FEATURE_KEYBOARD_SHORTCUTS","true")!=="false",COLLABORATION:w("VITE_FEATURE_COLLABORATION","false")==="true",OFFLINE_MODE:w("VITE_FEATURE_OFFLINE_MODE","false")==="true",ANALYTICS:w("VITE_FEATURE_ANALYTICS","false")==="true",PUSH_NOTIFICATIONS:w("VITE_FEATURE_PUSH_NOTIFICATIONS","false")==="true"},PERFORMANCE:{CHART_ANIMATION_DURATION:parseInt(w("VITE_CHART_ANIMATION_DURATION","750")),NOTIFICATION_DURATION:parseInt(w("VITE_NOTIFICATION_DURATION","3000")),DEBOUNCE_DELAY:parseInt(w("VITE_DEBOUNCE_DELAY","300")),MAX_EVENTS_PER_DAY:10,MAX_SAVED_SETLISTS:50},UI:{DEFAULT_VIEW:"week",DEFAULT_THEME:"dark",MOBILE_BREAKPOINT:768,MODAL_ANIMATION_DURATION:200,TOAST_POSITION:"top-right"},DATA:{STORAGE_KEY_PREFIX:"micCalendar",AUTO_SAVE:!0,BACKUP_FREQUENCY:24*60*60*1e3,MAX_STORAGE_SIZE:5*1024*1024},DEBUG:{ENABLED:w("VITE_DEBUG_ENABLED","false")==="true",LOG_LEVEL:w("VITE_LOG_LEVEL","info"),SHOW_PERFORMANCE_METRICS:w("VITE_SHOW_PERFORMANCE_METRICS","false")==="true",MOCK_API_DELAY:500}};class ht{constructor(){this.config=this.mergeConfig(vt,window.ENV_CONFIG||{}),this.config.NODE_ENV==="development"&&(this.config.DEBUG.ENABLED=!0,this.config.DEBUG.SHOW_PERFORMANCE_METRICS=!0),this.initializeLogger(),this.log("info","Configuration initialized",this.config)}mergeConfig(t,n){const a=_({},t);for(const o in n)n[o]&&typeof n[o]=="object"&&!Array.isArray(n[o])?a[o]=this.mergeConfig(a[o]||{},n[o]):a[o]=n[o];return a}initializeLogger(){const n={debug:0,info:1,warn:2,error:3}[this.config.DEBUG.LOG_LEVEL]||1;this.logger={debug:n<=0?console.debug.bind(console,"[MIC-CAL DEBUG]"):()=>{},info:n<=1?console.info.bind(console,"[MIC-CAL INFO]"):()=>{},warn:n<=2?console.warn.bind(console,"[MIC-CAL WARN]"):()=>{},error:n<=3?console.error.bind(console,"[MIC-CAL ERROR]"):()=>{}}}get(t,n=void 0){const a=t.split(".");let o=this.config;for(const i of a)if(o&&typeof o=="object"&&i in o)o=o[i];else return this.log("warn",`Configuration path not found: ${t}`),n;return o}set(t,n){const a=t.split(".");let o=this.config;for(let i=0;i<a.length-1;i++){const s=a[i];(!(s in o)||typeof o[s]!="object")&&(o[s]={}),o=o[s]}o[a[a.length-1]]=n,this.log("info",`Configuration updated: ${t} = ${n}`)}isFeatureEnabled(t){return this.get(`FEATURES.${t}`,!1)}setFeature(t,n){this.set(`FEATURES.${t}`,n),typeof window!="undefined"&&window.dispatchEvent(new CustomEvent("featureToggle",{detail:{feature:t,enabled:n}}))}getEnabledFeatures(){const t=this.get("FEATURES",{});return Object.keys(t).filter(n=>t[n])}isDevelopment(){return this.get("NODE_ENV")==="development"}isProduction(){return this.get("NODE_ENV")==="production"}getApiUrl(t=""){const n=this.get("API_BASE_URL");return t?`${n}/${t.replace(/^\//,"")}`:n}log(t,n,a=null){this.config.DEBUG.ENABLED&&this.logger&&(a?this.logger[t](n,a):this.logger[t](n))}measurePerformance(t,n){return M(this,null,function*(){if(!this.get("DEBUG.SHOW_PERFORMANCE_METRICS"))return yield n();const a=performance.now(),o=yield n(),i=performance.now();return this.log("debug",`Performance [${t}]: ${(i-a).toFixed(2)}ms`),o})}debounce(t,n=null){const a=n||this.get("PERFORMANCE.DEBOUNCE_DELAY");let o;return(...i)=>{clearTimeout(o),o=setTimeout(()=>t.apply(this,i),a)}}exportConfig(){return JSON.parse(JSON.stringify(this.config))}validate(){const t=[],n=[];this.get("CSV_DATA_URL")||t.push("CSV_DATA_URL is required");const a=this.get("PERFORMANCE.MAX_EVENTS_PER_DAY");return(a<1||a>100)&&n.push("MAX_EVENTS_PER_DAY should be between 1 and 100"),this.get("DATA.MAX_STORAGE_SIZE")<1024*1024&&n.push("MAX_STORAGE_SIZE might be too small"),{errors:t,warnings:n,valid:t.length===0}}}const T=new ht;typeof window!="undefined"&&(window.micCalendarConfig=T);T.isDevelopment()&&(console.log("🎭 Mic Calendar - Development Mode"),console.log("Config validation:",T.validate()),console.log("Enabled features:",T.getEnabledFeatures()));const d={sets:[],savedSetlists:[],jokes:[],userSettings:{},load(){const e=localStorage.getItem("micCalendarSets");e?this.sets=JSON.parse(e):this.sets=[{id:1,date:"2025-08-19",title:"Open Mic",venue:"The Laugh Factory",eventType:"green",setlist:"Airplane food joke",notes:"Good crowd.",tags:["new-material","practice"],goal:"Test new opener",imageUrl:"https://picsum.photos/400/300?random=1"},{id:2,date:"2025-08-20",title:"Showcase",venue:"The Comedy Store",eventType:"blue",setlist:`Cat joke
Dog joke`,notes:"",tags:["audition"],goal:"Get weekend spot",imageUrl:"https://picsum.photos/400/300?random=2"},{id:3,date:"2025-08-21",title:"Corporate Gig",venue:"Microsoft HQ",eventType:"orange",setlist:"Clean material only",notes:"Paid well.",tags:["corporate","clean"],goal:"Network for more gigs",imageUrl:""},{id:4,date:"2025-08-22",title:"Late Show",venue:"The Comedy Cellar",eventType:"red",setlist:"New 5 minutes",notes:"Felt a bit rusty.",tags:["late-night"],goal:"Work on timing",imageUrl:""},{id:5,date:"2025-08-23",title:"Weekend Special",venue:"The Comedy Store",eventType:"blue",setlist:"Best 10 minutes",notes:"Killed it.",tags:["headlining"],goal:"Perfect closer",imageUrl:"https://picsum.photos/400/300?random=3"},{id:6,date:"2025-07-04",title:"July 4th Bash",venue:"Town Hall",eventType:"orange",setlist:"Patriotic humor",notes:"Fireworks were loud.",tags:["holiday","themed"],goal:"Connect with audience",imageUrl:""}];const t=localStorage.getItem("micCalendarSetlists");t?this.savedSetlists=JSON.parse(t):this.savedSetlists=[{id:1,name:"Quick 3-Minute",jokes:["Airplane food joke","Cat joke","Coffee shop observation"]},{id:2,name:"Weekend 5-Minute",jokes:["Cat joke","Dog joke","Dating app story","Traffic rant","Weather bit"]},{id:3,name:"Clean Corporate",jokes:["Office humor","Meeting jokes","Email observations"]}];const n=localStorage.getItem("micCalendarJokes");n?this.jokes=JSON.parse(n):this.jokes=[];const a=localStorage.getItem("micCalendarSettings");a?this.userSettings=JSON.parse(a):this.userSettings={defaultView:"week",theme:"dark",notifications:!0,autoSave:!0,showOnboarding:!0}},save(){localStorage.setItem("micCalendarSets",JSON.stringify(this.sets)),localStorage.setItem("micCalendarSetlists",JSON.stringify(this.savedSetlists)),localStorage.setItem("micCalendarJokes",JSON.stringify(this.jokes)),localStorage.setItem("micCalendarSettings",JSON.stringify(this.userSettings))},getAllSets(){return this.sets},getSetById(e){return this.sets.find(t=>t.id===e)},addSet(e){e.id=Date.now(),this.sets.push(e),this.save()},updateSet(e,t){const n=this.sets.findIndex(a=>a.id===e);n!==-1&&(this.sets[n]=_(_({},this.sets[n]),t),this.save())},deleteSet(e){this.sets=this.sets.filter(t=>t.id!==e),this.save()},addJoke(e){const t={id:Date.now(),text:e.text||"",tags:e.tags||[],notes:e.notes||"",estimated_duration:e.estimated_duration||60,created_at:new Date().toISOString(),updated_at:new Date().toISOString(),archived:e.archived||!1};return this.jokes.push(t),this.save(),t},updateJoke(e,t){const n=this.jokes.findIndex(a=>a.id===e);return n!==-1?(this.jokes[n]=ke(_(_({},this.jokes[n]),t),{updated_at:new Date().toISOString()}),this.save(),this.jokes[n]):null},archiveJoke(e,t=!0){const n=this.jokes.findIndex(a=>a.id===e);return n!==-1?(this.jokes[n].archived=t,this.jokes[n].updated_at=new Date().toISOString(),this.save(),this.jokes[n]):null},deleteJoke(e){return this.jokes=this.jokes.filter(t=>t.id!==e),this.save(),!0},getJokeById(e){let t=this.jokes.find(n=>n.id===e);return t||(t=this.jokes.find(n=>n.id==e)),!t&&typeof e=="number"&&(t=this.jokes.find(n=>n.id.toString()===e.toString()),t||(t=this.jokes.find(n=>parseFloat(n.id)===parseFloat(e))),t||(t=this.jokes.find(n=>Math.floor(n.id)===Math.floor(e)))),!t&&typeof e=="string"&&!isNaN(parseFloat(e))&&(t=this.jokes.find(n=>n.id===parseFloat(e)),!t&&!isNaN(parseInt(e))&&(t=this.jokes.find(n=>n.id===parseInt(e)))),t||null},getAllJokes(e=!1){return e?this.jokes:this.jokes.filter(t=>!t.archived)},getJokesByTags(e){return!Array.isArray(e)||e.length===0?this.getAllJokes():this.jokes.filter(t=>!t.archived&&e.some(n=>t.tags.includes(n)))},searchJokes(e,t=!1){const n=t?this.jokes:this.getAllJokes();if(!e||e.trim()==="")return n;const a=e.toLowerCase();return n.filter(o=>o.text.toLowerCase().includes(a)||o.notes.toLowerCase().includes(a)||o.tags.some(i=>i.toLowerCase().includes(a)))},getJokePerformanceData(e){const t=[];return this.sets.forEach(n=>{let a=[];typeof n.setlist=="string"?a=n.setlist.split(`
`).filter(o=>o.trim()):Array.isArray(n.setlist)&&(a=n.setlist),(a.includes(e)||a.includes(e.toString()))&&t.push({date:n.date,venue:n.venue,title:n.title,eventType:n.eventType})}),t.sort((n,a)=>n.date.localeCompare(a.date))},getJokeLastPerformed(e){const t=this.getJokePerformanceData(e);return t.length>0?t[t.length-1].date:null},runMigrationV2(){if(localStorage.getItem("migration_jokebank_v2_complete")==="true")return;console.log("Starting Joke Bank V2 migration...");const t=new Map,n=a=>{const o=a.trim();if(!o)return null;if(t.has(o))return t.get(o);const i={id:Date.now()+Math.random(),text:o,tags:[],notes:"",estimated_duration:60,created_at:new Date().toISOString(),updated_at:new Date().toISOString(),archived:!1};return this.jokes.push(i),t.set(o,i.id),i.id};this.sets.forEach(a=>{if(typeof a.setlist=="string"&&a.setlist.trim()){const o=a.setlist.split(`
`).filter(s=>s.trim()),i=[];o.forEach(s=>{const r=n(s);r&&i.push(r)}),a.setlist=i}}),this.savedSetlists.forEach(a=>{if(Array.isArray(a.jokes)&&typeof a.jokes[0]=="string"){const i=[];a.jokes.forEach(s=>{const r=n(s);r&&i.push(r)}),a.jokes=i}}),this.save(),localStorage.setItem("migration_jokebank_v2_complete","true"),console.log(`Migration complete. Created ${this.jokes.length} jokes from existing setlists.`)},getJokeFrequency(){const e=new Map;return this.sets.forEach(t=>{if(t.setlist){let n=[];typeof t.setlist=="string"?n=t.setlist.split(`
`).filter(a=>a.trim()):Array.isArray(t.setlist)&&(n=t.setlist.map(a=>{const o=this.getJokeById(a);return o?o.text:null}).filter(a=>a)),n.forEach(a=>{const o=e.get(a)||0;e.set(a,o+1)})}}),Array.from(e.entries()).sort((t,n)=>n[1]-t[1]).slice(0,10)},getTopVenues(){const e=new Map;return this.sets.forEach(t=>{const n=e.get(t.venue)||0;e.set(t.venue,n+1)}),Array.from(e.entries()).sort((t,n)=>n[1]-t[1]).slice(0,5)},getPerformanceCountByType(){const e=new Map;return this.sets.forEach(t=>{const n=e.get(t.eventType)||0;e.set(t.eventType,n+1)}),Array.from(e.entries())},getPerformanceStats(){const e=this.sets.length,t=[...new Set(this.sets.map(a=>a.venue))],n=this.sets.reduce((a,o)=>o.setlist?typeof o.setlist=="string"?a+o.setlist.split(`
`).filter(i=>i.trim()).length:Array.isArray(o.setlist)?a+o.setlist.length:a:a,0);return{totalSets:e,uniqueVenues:t.length,totalJokes:n,averageJokesPerSet:e>0?Math.round(n/e):0}},getAllSetlists(){return this.savedSetlists},getSetlistById(e){return this.savedSetlists.find(t=>t.id===e)},addSetlist(e,t){const n={id:Date.now(),name:e,jokes:Array.isArray(t)?t:t.split(`
`).filter(a=>a.trim())};return this.savedSetlists.push(n),this.save(),n},updateSetlist(e,t,n){const a=this.savedSetlists.findIndex(o=>o.id===e);return a!==-1?(this.savedSetlists[a]={id:e,name:t,jokes:Array.isArray(n)?n:n.split(`
`).filter(o=>o.trim())},this.save(),this.savedSetlists[a]):null},deleteSetlist(e){this.savedSetlists=this.savedSetlists.filter(t=>t.id!==e),this.save()},getSetting(e){return this.userSettings[e]},setSetting(e,t){this.userSettings[e]=t,this.save()},getSettings(){return _({},this.userSettings)},updateSettings(e){this.userSettings=_(_({},this.userSettings),e),this.save()},getAllTags(){const e=new Set;return this.sets.forEach(t=>{t.tags&&Array.isArray(t.tags)&&t.tags.forEach(n=>e.add(n))}),Array.from(e).sort()},getTagStats(){const e={};return this.sets.forEach(t=>{t.tags&&Array.isArray(t.tags)&&t.tags.forEach(n=>{e[n]=(e[n]||0)+1})}),Object.entries(e).map(([t,n])=>({tag:t,count:n})).sort((t,n)=>n.count-t.count)},getSetsByTag(e){return this.sets.filter(t=>t.tags&&Array.isArray(t.tags)&&t.tags.includes(e))},getSetsWithGoals(){return this.sets.filter(e=>e.goal&&e.goal.trim()!=="")},ensureSetFormat(e){return ke(_({},e),{tags:e.tags||[],goal:e.goal||"",imageUrl:e.imageUrl||""})},getPerformanceOverTime(){const e={};return this.sets.forEach(t=>{const n=new Date(t.date),a=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`;if(e[a]||(e[a]={sets:0,jokes:0,venues:new Set,types:{}}),e[a].sets++,e[a].venues.add(t.venue),t.setlist){let o=0;typeof t.setlist=="string"?o=t.setlist.split(`
`).filter(i=>i.trim()).length:Array.isArray(t.setlist)&&(o=t.setlist.length),e[a].jokes+=o}e[a].types[t.eventType]=(e[a].types[t.eventType]||0)+1}),Object.entries(e).map(([t,n])=>({month:t,sets:n.sets,jokes:n.jokes,uniqueVenues:n.venues.size,avgJokesPerSet:n.jokes>0?Math.round(n.jokes/n.sets):0,types:n.types})).sort((t,n)=>t.month.localeCompare(n.month))},getJokePerformanceOverTime(){const e={},t={};return this.sets.forEach(n=>{if(!n.setlist)return;let a=[];typeof n.setlist=="string"?a=n.setlist.split(`
`).filter(o=>o.trim()):Array.isArray(n.setlist)&&(a=n.setlist.map(o=>{const i=this.getJokeById(o);return i?i.text:null}).filter(o=>o)),new Date(n.date),a.forEach(o=>{const i=o.trim().toLowerCase();i&&(e[i]=(e[i]||0)+1,t[i]||(t[i]=[]),t[i].push({date:n.date,venue:n.venue,title:n.title}))})}),Object.entries(e).map(([n,a])=>({joke:n,totalCount:a,performances:t[n].sort((o,i)=>o.date.localeCompare(i.date)),lastPerformed:t[n][t[n].length-1].date,daysSinceLastUsed:Math.floor((Date.now()-new Date(t[n][t[n].length-1].date))/(1e3*60*60*24))})).sort((n,a)=>a.totalCount-n.totalCount)}},bt=Object.freeze(Object.defineProperty({__proto__:null,dataStore:d},Symbol.toStringTag,{value:"Module"}));let Z=new Date,q=!1,U,xe,G,W;function Ge(){U=document.getElementById("calendarGrid"),xe=document.getElementById("dateRange"),G=document.getElementById("venueSearch"),W=document.getElementById("typeFilter")}function K(e){Z=new Date(e)}function de(e){q=e}function x(){var h,m,y;if(!U)return;U.innerHTML="";const e=new Date;e.setHours(0,0,0,0);let t=new Date(Z),n,a;if(q)n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0),xe.textContent=t.toLocaleDateString("en-us",{month:"long",year:"numeric"}),U.style.gridTemplateRows=`repeat(${Math.ceil((a.getDate()+n.getDay())/7)}, 1fr)`;else{let f=t.getDay();n=new Date(t),n.setDate(t.getDate()-f),a=new Date(n),a.setDate(n.getDate()+6),xe.textContent=`${n.toLocaleDateString("en-us",{month:"short",day:"numeric"})} – ${a.toLocaleDateString("en-us",{month:"short",day:"numeric",year:"numeric"})}`}const o=(G==null?void 0:G.value.toLowerCase())||"",i=(W==null?void 0:W.value)||"all",s=(h=document.getElementById("dateFrom"))==null?void 0:h.value,r=(m=document.getElementById("dateTo"))==null?void 0:m.value,l=parseInt((y=document.getElementById("minJokes"))==null?void 0:y.value)||0,c=d.getAllSets().filter(f=>{let S=!1;f.setlist&&(typeof f.setlist=="string"?S=f.setlist.toLowerCase().includes(o):Array.isArray(f.setlist)&&(S=f.setlist.map(B=>d.getJokeById(B)).filter(B=>B).some(B=>B.text.toLowerCase().includes(o)||B.notes.toLowerCase().includes(o)||B.tags.some(te=>te.toLowerCase().includes(o)))));const k=o===""||f.venue.toLowerCase().includes(o)||f.notes&&f.notes.toLowerCase().includes(o)||S,I=i==="all"||f.eventType===i,D=new Date(f.date),P=!s||D>=new Date(s),V=!r||D<=new Date(r);let N=0;f.setlist&&(typeof f.setlist=="string"?N=f.setlist.split(`
`).filter(O=>O.trim()).length:Array.isArray(f.setlist)&&(N=f.setlist.length));const R=N>=l;return k&&I&&P&&V&&R});let p={};for(let f=new Date(n);f<=a;f.setDate(f.getDate()+1)){const S=f.toISOString().split("T")[0],k=document.createElement("div");k.className="day-cell",k.dataset.date=S,f.getTime()===e.getTime()&&k.classList.add("is-today"),k.innerHTML=`
            <div class="day-header">
                <div class="day-name">${f.toLocaleDateString("en-us",{weekday:"short"})}</div>
                <div class="day-number">${f.getDate()}</div>
                <button class="add-set-btn" data-date="${S}" aria-label="Add set to ${f.toLocaleDateString()}" title="Add set to this day">+</button>
            </div>
            <div class="events-container"></div>
        `,U.appendChild(k),p[S]=k}if(q)for(let f=0;f<n.getDay();f++)U.prepend(document.createElement("div"));c.forEach(f=>{if(p[f.date]){const S=p[f.date].querySelector(".events-container"),k=kt(f);S.appendChild(k)}}),Object.values(p).forEach(f=>{const S=f.querySelector(".events-container"),k=new Date(f.dataset.date+"T00:00:00");if(S.children.length===0&&k>=e){const I=document.createElement("div");I.className="empty-day-message",I.textContent="No sets scheduled",S.appendChild(I)}})}function kt(e){const t=document.createElement("div");t.className=`event-pill event-${e.eventType}`,t.dataset.setId=e.id,t.setAttribute("aria-label",`${e.title} at ${e.venue}`),t.setAttribute("tabindex","0"),t.setAttribute("role","button");const n=document.createElement("div");n.className="event-title",n.textContent=e.title;const a=document.createElement("div");if(a.className="event-details",e.venue){const o=document.createElement("div");o.className="event-detail",o.innerHTML=`<i class="fas fa-map-marker-alt" aria-hidden="true"></i><span>${e.venue}</span>`,a.appendChild(o)}if(e.setlist){let o=0;if(typeof e.setlist=="string"&&e.setlist.trim()?o=e.setlist.split(`
`).filter(i=>i.trim()).length:Array.isArray(e.setlist)&&(o=e.setlist.length),o>0){const i=document.createElement("div");i.className="event-detail",i.innerHTML=`<i class="fas fa-list" aria-hidden="true"></i><span>${o} joke${o===1?"":"s"}</span>`,a.appendChild(i)}}if(e.notes&&e.notes.trim()){const o=e.notes.length>20?e.notes.substring(0,20)+"...":e.notes,i=document.createElement("div");i.className="event-detail",i.innerHTML=`<i class="fas fa-sticky-note" aria-hidden="true"></i><span>${o}</span>`,a.appendChild(i)}if(e.imageUrl&&e.imageUrl.trim()){const o=document.createElement("div");o.className="event-image-container";const i=document.createElement("img");i.className="event-image",i.src=e.imageUrl,i.alt=`Image for ${e.title}`,i.setAttribute("loading","lazy"),i.addEventListener("error",function(){this.style.display="none";const s=document.createElement("div");s.className="event-detail",s.innerHTML='<i class="fas fa-image" aria-hidden="true" style="opacity: 0.5"></i><span style="opacity: 0.5">Image unavailable</span>',o.appendChild(s)}),o.appendChild(i),a.appendChild(o)}return t.appendChild(n),t.appendChild(a),t}function We(){const e=(G==null?void 0:G.value.toLowerCase())||"",t=(W==null?void 0:W.value)||"all",n=d.getAllSets().filter(o=>{const i=o.venue.toLowerCase().includes(e),s=t==="all"||o.eventType===t;return i&&s}).sort((o,i)=>new Date(i.date)-new Date(o.date)),a=n.map(o=>{const i=new Date(o.date);let s=0;o.setlist&&(typeof o.setlist=="string"?s=o.setlist.split(`
`).filter(l=>l.trim()).length:Array.isArray(o.setlist)&&(s=o.setlist.length));const r={blue:"Showcase",green:"Open Mic",orange:"Corporate / Private",red:"Late Night"};return`
            <div class="list-item event-${o.eventType}" data-set-id="${o.id}" style="margin-bottom: 1rem; padding: 1rem; background: var(--bg-surface-2); border-radius: 8px; cursor: pointer; border-left: 4px solid;" role="button" tabindex="0" aria-label="Edit ${o.title} at ${o.venue}">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                    <h4 style="margin: 0; font-size: 1.1rem; font-weight: 600;">${o.title}</h4>
                    <span style="font-size: 0.8rem; padding: 0.25rem 0.75rem; background: var(--accent-blue); color: white; border-radius: 12px;">${r[o.eventType]}</span>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.5rem; font-size: 0.9rem; color: var(--text-secondary);">
                    <div><i class="fas fa-calendar" aria-hidden="true"></i> ${i.toLocaleDateString()}</div>
                    <div><i class="fas fa-map-marker-alt" aria-hidden="true"></i> ${o.venue}</div>
                    ${s>0?`<div><i class="fas fa-list" aria-hidden="true"></i> ${s} jokes</div>`:""}
                    ${o.notes?`<div><i class="fas fa-sticky-note" aria-hidden="true"></i> ${o.notes.length>50?o.notes.substring(0,50)+"...":o.notes}</div>`:""}
                </div>
                ${o.imageUrl&&o.imageUrl.trim()?`
                    <div style="margin-top: 0.75rem;">
                        <img src="${o.imageUrl}" alt="Image for ${o.title}" style="max-width: 200px; height: auto; max-height: 120px; object-fit: cover; border-radius: 6px; border: 1px solid var(--border-color);" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                        <div style="display: none; color: var(--text-secondary); font-size: 0.8rem; margin-top: 0.5rem;"><i class="fas fa-image" style="opacity: 0.5"></i> Image unavailable</div>
                    </div>
                `:""}
            </div>
        `}).join("");return U.innerHTML=`
        <div style="grid-column: 1 / -1; padding: 1rem 0;">
            <h3 style="margin-bottom: 1rem; color: var(--text-primary);">All Sets (${n.length})</h3>
            ${a||'<div style="text-align: center; color: var(--text-secondary); padding: 2rem;">No sets found</div>'}
        </div>
    `,n}function Ke(){const e=document.getElementById("calendarContainer"),t=document.getElementById("jokeBankContainer");e&&(e.style.display="none"),t&&(t.style.display="block"),Be(),Y(),Et()}function Ye(){const e=document.getElementById("calendarContainer"),t=document.getElementById("jokeBankContainer");e&&(e.style.display="block"),t&&(t.style.display="none")}function Be(){const e=document.getElementById("jokeTagFilter");if(!e)return;const t=d.getAllJokes(!0),n=[...new Set(t.flatMap(a=>a.tags))].sort();e.innerHTML='<option value="">All Tags</option>',n.forEach(a=>{const o=document.createElement("option");o.value=a,o.textContent=a,e.appendChild(o)})}function Et(){const e=document.getElementById("jokeSearch"),t=document.getElementById("jokeTagFilter"),n=document.getElementById("showArchivedJokes"),a=document.getElementById("addJokeBtn");e&&e.addEventListener("input",Y),t&&t.addEventListener("change",Y),n&&n.addEventListener("change",Y),a&&a.addEventListener("click",()=>{re()})}function Y(){var i,s,r;const e=document.getElementById("jokesGrid");if(!e)return;const t=((i=document.getElementById("jokeSearch"))==null?void 0:i.value)||"",n=((s=document.getElementById("jokeTagFilter"))==null?void 0:s.value)||"",a=((r=document.getElementById("showArchivedJokes"))==null?void 0:r.checked)||!1;let o=d.getAllJokes(a);if(t&&(o=d.searchJokes(t,a)),n&&(o=o.filter(l=>l.tags.includes(n))),o.sort((l,c)=>new Date(c.updated_at)-new Date(l.updated_at)),o.length===0){e.innerHTML=`
            <div class="empty-jokes-state" style="grid-column: 1 / -1;">
                <i class="fas fa-lightbulb"></i>
                <h3>No jokes found</h3>
                <p>${t||n?"Try adjusting your search or filters.":"Start building your comedy arsenal by adding your first joke!"}</p>
                ${!t&&!n?'<button class="add-set-btn" onclick="showJokeModal()"><i class="fas fa-plus"></i> Add Your First Joke</button>':""}
            </div>
        `;return}e.innerHTML=o.map(l=>St(l)).join(""),It()}function St(e){const t=d.getJokeLastPerformed(e.id),n=d.getJokePerformanceData(e.id),a=new Date(e.created_at).toLocaleDateString(),o=new Date(e.updated_at).toLocaleDateString();let i=null;return t&&(i=Math.floor((Date.now()-new Date(t))/864e5)),`
        <div class="joke-card ${e.archived?"archived":""}" data-joke-id="${e.id}">
            <div class="joke-actions">
                <button class="joke-action-btn edit" title="Edit joke" data-action="edit" data-joke-id="${e.id}">
                    <i class="fas fa-pencil-alt"></i>
                </button>
                <button class="joke-action-btn archive" title="${e.archived?"Unarchive":"Archive"} joke" data-action="archive" data-joke-id="${e.id}">
                    <i class="fas fa-${e.archived?"box-open":"archive"}"></i>
                </button>
                <button class="joke-action-btn delete" title="Delete joke" data-action="delete" data-joke-id="${e.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            
            <div class="joke-text">${e.text}</div>
            
            <div class="joke-meta">
                <span><i class="fas fa-clock"></i> ${e.estimated_duration}s</span>
                <span><i class="fas fa-calendar-plus"></i> ${a}</span>
                ${e.updated_at!==e.created_at?`<span><i class="fas fa-edit"></i> ${o}</span>`:""}
            </div>
            
            ${e.tags.length>0?`
                <div class="joke-tags">
                    ${e.tags.map(s=>`<span class="joke-tag">${s}</span>`).join("")}
                </div>
            `:""}
            
            ${e.notes?`
                <div class="joke-notes">${e.notes}</div>
            `:""}
            
            ${n.length>0?`
                <div class="joke-performance">
                    <i class="fas fa-chart-line"></i> Performed ${n.length} time${n.length===1?"":"s"}
                    ${t?` • Last: ${new Date(t).toLocaleDateString()}${i!==null?` (${i}d ago)`:""}`:""}
                </div>
            `:""}
        </div>
    `}function It(){document.querySelectorAll(".joke-card").forEach(t=>{t.addEventListener("click",a=>{if(a.target.closest(".joke-action-btn"))return;const o=parseInt(t.dataset.jokeId),i=d.getJokeById(o);i&&re(i)}),t.querySelectorAll(".joke-action-btn").forEach(a=>{a.addEventListener("click",o=>{o.stopPropagation(),wt(a.dataset.action,parseInt(a.dataset.jokeId))})})})}function wt(e,t){const n=d.getJokeById(t);if(n)switch(e){case"edit":re(n);break;case"archive":d.archiveJoke(t,!n.archived),Y(),Be();break;case"delete":confirm(`Are you sure you want to permanently delete this joke?

"${n.text.length>100?n.text.substring(0,100)+"...":n.text}"

This action cannot be undone.`)&&(d.deleteJoke(t),Y(),Be());break}}window.showJokeModal=re;function re(e=null){const t=new CustomEvent("showJokeModal",{detail:e});document.dispatchEvent(t)}const Xe=Object.freeze(Object.defineProperty({__proto__:null,get currentWeek(){return Z},hideJokeBankView:Ye,initializeUIElements:Ge,get isExpandedView(){return q},renderCalendar:x,renderJokeBank:Y,setCurrentWeek:K,setExpandedView:de,showJokeBankView:Ke,showJokeModal:re,showListView:We},Symbol.toStringTag,{value:"Module"}));let Qe,Ze,he,fe,et,tt,nt,Ae,at;function Tt(){Qe=document.getElementById("add-edit-modal"),Ze=document.getElementById("delete-confirm-modal"),he=document.getElementById("event-summary-modal"),document.getElementById("mic-selection-modal"),fe=document.getElementById("add-edit-joke-modal"),nt=document.getElementById("setForm"),Ae=document.getElementById("jokeForm"),et=document.getElementById("formTitle"),at=document.getElementById("jokeFormTitle"),tt=document.getElementById("setId")}function $(e){e.classList.add("is-visible"),setTimeout(()=>{const t=e.querySelectorAll('input, select, button, textarea, [tabindex]:not([tabindex="-1"])');t.length>0&&t[0].focus()},100),e.setAttribute("aria-modal","true")}function F(e){var t,n;e.classList.remove("is-visible"),e.removeAttribute("aria-modal"),e.id==="mic-selection-modal"&&(window.isSelectingMicForForm?(t=document.getElementById("addMicFromForm"))==null||t.focus():(n=document.getElementById("addMicBtn"))==null||n.focus())}function X(e={}){if(et.textContent=e.id?"Edit Set":"Log a New Set",nt.reset(),tt.value=e.id||"",e.title&&(document.getElementById("event-title").value=e.title),e.venue&&(document.getElementById("venue").value=e.venue),e.date&&(document.getElementById("date").value=e.date),e.eventType&&(document.getElementById("event-type").value=e.eventType),e.notes&&(document.getElementById("notes").value=e.notes),e.tags&&(document.getElementById("tags").value=Array.isArray(e.tags)?e.tags.join(", "):e.tags),e.goal&&(document.getElementById("goal").value=e.goal),e.imageUrl&&(document.getElementById("imageUrl").value=e.imageUrl),e.setlist){const t=document.getElementById("setlist"),n=document.getElementById("setlistData");typeof e.setlist=="string"?(t&&(t.value=e.setlist),n.value=JSON.stringify([])):Array.isArray(e.setlist)&&(n.value=JSON.stringify(e.setlist),t&&(t.value=""))}else{document.getElementById("setlistData").value=JSON.stringify([]);const t=document.getElementById("setlist");t&&(t.value="")}Ot(),zt(),$(Qe)}function xt(){$(Ze)}function Bt(){const e=d.getPerformanceStats(),t=d.getTopVenues(),n=d.getJokeFrequency(),a=d.getPerformanceCountByType(),o={blue:"Showcase",green:"Open Mic",orange:"Corporate / Private",red:"Late Night"},i={blue:"#45a3ff",green:"#32b977",orange:"#f5c518",red:"#ef4444"},s=`
        <div style="max-width: 800px; width: 100%;">
            <h3>Performance Statistics</h3>
            
            <!-- Key Metrics -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin: 2rem 0;">
                <div style="text-align: center; padding: 1rem; background: var(--bg-surface-2); border-radius: 8px;">
                    <div style="font-size: 2rem; font-weight: 700; color: var(--accent-blue);">${e.totalSets}</div>
                    <div style="color: var(--text-secondary);">Total Sets</div>
                </div>
                <div style="text-align: center; padding: 1rem; background: var(--bg-surface-2); border-radius: 8px;">
                    <div style="font-size: 2rem; font-weight: 700; color: var(--accent-green);">${e.uniqueVenues}</div>
                    <div style="color: var(--text-secondary);">Venues</div>
                </div>
                <div style="text-align: center; padding: 1rem; background: var(--bg-surface-2); border-radius: 8px;">
                    <div style="font-size: 2rem; font-weight: 700; color: var(--accent-orange);">${e.totalJokes}</div>
                    <div style="color: var(--text-secondary);">Total Jokes</div>
                </div>
                <div style="text-align: center; padding: 1rem; background: var(--bg-surface-2); border-radius: 8px;">
                    <div style="font-size: 2rem; font-weight: 700; color: var(--accent-red);">${e.averageJokesPerSet}</div>
                    <div style="color: var(--text-secondary);">Avg per Set</div>
                </div>
            </div>
            
            <!-- Charts Section -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
                ${a.length>0?`
                <div style="background: var(--bg-surface-2); padding: 1rem; border-radius: 8px;">
                    <h4 style="color: var(--text-primary); margin-bottom: 1rem; text-align: center;">Performance Types</h4>
                    <canvas id="performanceTypeChart" width="300" height="300"></canvas>
                </div>
                `:""}
                
                ${t.length>0?`
                <div style="background: var(--bg-surface-2); padding: 1rem; border-radius: 8px;">
                    <h4 style="color: var(--text-primary); margin-bottom: 1rem; text-align: center;">Top Venues</h4>
                    <canvas id="topVenuesChart" width="300" height="300"></canvas>
                </div>
                `:""}
            </div>
            
            <!-- Trend Analysis Charts -->
            <div style="margin: 2rem 0;">
                <h4 style="color: var(--text-primary); margin-bottom: 1rem;">Performance Over Time</h4>
                <div style="background: var(--bg-surface-2); padding: 1rem; border-radius: 8px;">
                    <canvas id="performanceTimelineChart" width="600" height="300"></canvas>
                </div>
            </div>
            
            ${n.length>0?`
            <div style="margin-bottom: 2rem;">
                <h4 style="color: var(--text-primary); margin-bottom: 1rem;">Top Jokes Performance</h4>
                <div style="display: grid; gap: 0.5rem; max-height: 200px; overflow-y: auto;">
                    ${n.slice(0,10).map(([r,l])=>{const c=Math.round(l/e.totalSets*100),p=d.getJokePerformanceOverTime().find(y=>y.joke.toLowerCase()===r.toLowerCase()),h=p?p.daysSinceLastUsed:0,m=h>90?"var(--accent-green)":h>30?"var(--accent-orange)":"var(--accent-red)";return`
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem; background: var(--bg-surface-2); border-radius: 6px;">
                                <span style="font-family: monospace; font-size: 0.9rem; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${r.length>40?r.substring(0,40)+"...":r}</span>
                                <div style="display: flex; align-items: center; gap: 1rem;">
                                    <span style="color: var(--accent-blue); font-weight: 600;">${l}x (${c}%)</span>
                                    <span style="color: ${m}; font-size: 0.8rem;">${h}d ago</span>
                                </div>
                            </div>
                        `}).join("")}
                </div>
                <div style="margin-top: 0.5rem; font-size: 0.8rem; color: var(--text-secondary);">
                    <span style="color: var(--accent-green);">●</span> Fresh (90+ days) 
                    <span style="color: var(--accent-orange);">●</span> Aging (30-90 days) 
                    <span style="color: var(--accent-red);">●</span> Overused (&lt;30 days)
                </div>
            </div>
            `:""}
            
            <button onclick="closeModal(eventSummaryModal)" style="width: 100%; padding: 0.75rem; background: var(--accent-blue); color: white; border: none; border-radius: 6px; cursor: pointer;">Close</button>
        </div>
    `;document.getElementById("summaryContent").innerHTML=s,$(he),setTimeout(()=>{document.getElementById("performanceTypeChart").parentElement.innerHTML=`
            <div style="height: 300px; display: flex; align-items: center; justify-content: center;">
                <div class="chart-skeleton">
                    <div class="skeleton-circle"></div>
                    <div class="skeleton-legend">
                        <div class="skeleton-legend-item"></div>
                        <div class="skeleton-legend-item"></div>
                        <div class="skeleton-legend-item"></div>
                    </div>
                </div>
            </div>
        `,document.getElementById("topVenuesChart").parentElement.innerHTML=`
            <div style="height: 300px; display: flex; align-items: center; justify-content: center;">
                <div class="chart-skeleton">
                    <div class="skeleton-bars">
                        <div class="skeleton-bar" style="height: 80%"></div>
                        <div class="skeleton-bar" style="height: 60%"></div>
                        <div class="skeleton-bar" style="height: 100%"></div>
                        <div class="skeleton-bar" style="height: 40%"></div>
                        <div class="skeleton-bar" style="height: 70%"></div>
                    </div>
                </div>
            </div>
        `},100),setTimeout(()=>{document.querySelector(".chart-container:first-of-type").innerHTML=`
            <h4 style="margin-bottom: 1rem; color: var(--text-primary);">Performance Types</h4>
            <canvas id="performanceTypeChart" width="400" height="300"></canvas>
        `,document.querySelector(".chart-container:last-of-type").innerHTML=`
            <h4 style="margin-bottom: 1rem; color: var(--text-primary);">Top Venues</h4>
            <canvas id="topVenuesChart" width="400" height="300"></canvas>
        `,$t(a,t,o,i);const r=d.getPerformanceOverTime();r.length>0&&_t(r)},800)}function Ct(){const e=d.getSettings(),t=`
        <h3>Settings</h3>
        <form id="settingsForm">
            <div style="margin: 2rem 0;">
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Default View</label>
                    <select id="defaultView" name="defaultView" style="width: 100%; padding: 0.5rem; background: var(--bg-input); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-primary);" aria-label="Default View">
                        <option value="week" ${e.defaultView==="week"?"selected":""}>Week View</option>
                        <option value="month" ${e.defaultView==="month"?"selected":""}>Month View</option>
                        <option value="list" ${e.defaultView==="list"?"selected":""}>List View</option>
                    </select>
                </div>
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Theme</label>
                    <select id="theme" name="theme" style="width: 100%; padding: 0.5rem; background: var(--bg-input); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-primary);" aria-label="Theme">
                        <option value="dark" ${e.theme==="dark"?"selected":""}>Dark Mode</option>
                        <option value="light" ${e.theme==="light"?"selected":""}>Light Mode</option>
                    </select>
                </div>
                <div style="margin-bottom: 1rem;">
                    <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                        <input type="checkbox" id="notifications" name="notifications" ${e.notifications?"checked":""} style="margin: 0;">
                        <span style="font-weight: 500;">Show notifications</span>
                    </label>
                </div>
                <div style="margin-bottom: 1rem;">
                    <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                        <input type="checkbox" id="autoSave" name="autoSave" ${e.autoSave?"checked":""} style="margin: 0;">
                        <span style="font-weight: 500;">Auto-save changes</span>
                    </label>
                </div>
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Help & Support</label>
                    <button type="button" data-action="restart-tour" style="width: 100%; padding: 0.5rem; background: var(--accent-orange); color: white; border: none; border-radius: 6px; cursor: pointer; margin-bottom: 0.5rem;">Restart Welcome Tour</button>
                    <button type="button" data-action="send-feedback" style="width: 100%; padding: 0.5rem; background: var(--accent-blue); color: white; border: none; border-radius: 6px; cursor: pointer;">Send Feedback</button>
                </div>
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Data Management</label>
                    <button type="button" data-action="export-data" style="width: 100%; padding: 0.5rem; background: var(--accent-green); color: white; border: none; border-radius: 6px; cursor: pointer; margin-bottom: 0.5rem;">Export My Data (JSON)</button>
                    <button type="button" data-action="clear-data" style="width: 100%; padding: 0.5rem; background: var(--accent-red); color: white; border: none; border-radius: 6px; cursor: pointer;">Clear All Data</button>
                </div>
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                <button type="button" class="form-btn btn-secondary modal-cancel-btn">Cancel</button>
                <button type="submit" class="form-btn btn-primary" id="saveSettingsBtn">
                    <span id="saveSettingsText">Save Settings</span>
                    <span id="saveSettingsCheck" style="display: none;">✓ Saved!</span>
                </button>
            </div>
        </form>
    `;document.getElementById("summaryContent").innerHTML=t;const n=document.getElementById("settingsForm");n.addEventListener("submit",At),n.addEventListener("click",Lt),$(he)}function Lt(e){const t=e.target.closest("[data-action]");if(!t)return;switch(t.dataset.action){case"restart-tour":Ft();break;case"send-feedback":window.open("mailto:support@micfinderapp.com?subject=Mic Calendar Feedback","_blank");break;case"export-data":jt();break;case"clear-data":Nt();break}}function At(e){e.preventDefault();const t=new FormData(e.target),n={defaultView:t.get("defaultView"),theme:t.get("theme"),notifications:t.has("notifications"),autoSave:t.has("autoSave")};d.updateSettings(n),n.theme!==d.getSetting("theme")&&Mt(n.theme),Dt(),setTimeout(()=>{F(he),g("Settings saved successfully!","success")},1e3)}function Dt(){const e=document.getElementById("saveSettingsBtn"),t=document.getElementById("saveSettingsText"),n=document.getElementById("saveSettingsCheck");e&&t&&n&&(e.style.background="var(--accent-green)",t.style.display="none",n.style.display="inline",e.disabled=!0)}function Mt(e){const t=document.documentElement;e==="light"?(t.style.setProperty("--bg-main","#ffffff"),t.style.setProperty("--bg-surface","#f8f9fa"),t.style.setProperty("--bg-surface-2","#e9ecef"),t.style.setProperty("--text-primary","#212529"),t.style.setProperty("--text-secondary","#6c757d"),t.style.setProperty("--border-color","#dee2e6")):(t.style.setProperty("--bg-main","#18191a"),t.style.setProperty("--bg-surface","#232533"),t.style.setProperty("--bg-surface-2","#3a3b3c"),t.style.setProperty("--text-primary","#e4e6eb"),t.style.setProperty("--text-secondary","#b0b3b8"),t.style.setProperty("--border-color","#3e4042"))}function g(e,t="success"){const n=document.createElement("div"),a=t==="success"?"var(--accent-green)":t==="error"?"var(--accent-red)":"var(--accent-blue)";n.style.cssText=`
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${a};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        font-weight: 600;
        max-width: 300px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `,n.innerHTML=`
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas fa-${t==="error"?"exclamation-triangle":"check-circle"}" aria-hidden="true"></i>
            <span>${e}</span>
        </div>
    `,document.body.appendChild(n),setTimeout(()=>{n.style.transform="translateX(0)"},100),setTimeout(()=>{n.style.transform="translateX(100%)",setTimeout(()=>{n.parentNode&&n.parentNode.removeChild(n)},300)},4e3)}function jt(){const e={sets:d.getAllSets(),setlists:d.getAllSetlists(),settings:d.getSettings(),exportDate:new Date().toISOString(),version:"2.0"},t=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),n=URL.createObjectURL(t),a=document.createElement("a");a.href=n,a.download=`mic-calendar-data-${new Date().toISOString().split("T")[0]}.json`,a.click(),URL.revokeObjectURL(n),g("Data exported successfully!")}function _t(e){const t=document.getElementById("performanceTimelineChart");if(!t||typeof Chart=="undefined")return;const n=e.map(a=>new Date(a.month+"-01").toLocaleDateString("en-US",{month:"short",year:"numeric"}));new Chart(t,{type:"line",data:{labels:n,datasets:[{label:"Sets Per Month",data:e.map(a=>a.sets),borderColor:"#45a3ff",backgroundColor:"rgba(69, 163, 255, 0.1)",fill:!0,tension:.4,yAxisID:"y"},{label:"Avg Jokes Per Set",data:e.map(a=>a.avgJokesPerSet),borderColor:"#32b977",backgroundColor:"rgba(50, 185, 119, 0.1)",fill:!1,tension:.4,yAxisID:"y1"},{label:"Unique Venues",data:e.map(a=>a.uniqueVenues),borderColor:"#f5c518",backgroundColor:"rgba(245, 197, 24, 0.1)",fill:!1,tension:.4,yAxisID:"y"}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{position:"top",labels:{color:"#e4e6eb",usePointStyle:!0,padding:15}},tooltip:{callbacks:{afterLabel:function(a){const o=e[a.dataIndex];return[`Total Jokes: ${o.jokes}`,`Most Common Type: ${Object.keys(o.types).reduce((i,s)=>o.types[i]>o.types[s]?i:s,"none")}`]}}}},scales:{x:{grid:{color:"rgba(255, 255, 255, 0.1)"},ticks:{color:"#e4e6eb"}},y:{type:"linear",display:!0,position:"left",grid:{color:"rgba(255, 255, 255, 0.1)"},ticks:{color:"#e4e6eb"}},y1:{type:"linear",display:!0,position:"right",grid:{drawOnChartArea:!1},ticks:{color:"#e4e6eb"}}}}})}function $t(e,t,n,a){if(typeof Chart=="undefined"){console.warn("Chart.js not available for stats visualization");return}const o=document.getElementById("performanceTypeChart");o&&e.length>0&&new Chart(o,{type:"doughnut",data:{labels:e.map(([s])=>n[s]||s),datasets:[{data:e.map(([,s])=>s),backgroundColor:e.map(([s])=>a[s]||"#666"),borderWidth:2,borderColor:"#18191a",hoverBorderWidth:4,hoverBorderColor:"#ffffff"}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{intersect:!1,mode:"index"},plugins:{legend:{position:"bottom",labels:{color:"#e4e6eb",usePointStyle:!0,padding:15}},tooltip:{callbacks:{label:function(s){const r=s.label||"",l=s.parsed,c=s.dataset.data.reduce((h,m)=>h+m,0),p=Math.round(l/c*100);return`${r}: ${l} sets (${p}%)`},afterLabel:function(s){return"Click to view detailed breakdown"}}}},onHover:(s,r)=>{s.native.target.style.cursor=r.length>0?"pointer":"default"},onClick:(s,r)=>{if(r.length>0){const l=r[0].index,c=e[l][0];Jt(c,n[c])}}}});const i=document.getElementById("topVenuesChart");i&&t.length>0&&new Chart(i,{type:"bar",data:{labels:t.map(([s])=>s.length>15?s.substring(0,15)+"...":s),datasets:[{label:"Sets Performed",data:t.map(([,s])=>s),backgroundColor:"#45a3ff",borderColor:"#45a3ff",borderWidth:1,hoverBackgroundColor:"#4f46e5",hoverBorderColor:"#4f46e5",hoverBorderWidth:2}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{intersect:!1,mode:"index"},scales:{y:{beginAtZero:!0,ticks:{color:"#b0b3b8",stepSize:1},grid:{color:"#3e4042"}},x:{ticks:{color:"#b0b3b8",maxRotation:45},grid:{color:"#3e4042"}}},plugins:{legend:{display:!1},tooltip:{callbacks:{title:function(s){const r=s[0].dataIndex;return t[r][0]},label:function(s){return`${s.parsed.y} sets performed`},afterLabel:function(s){return"Click to view sets at this venue"}}}},onHover:(s,r)=>{s.native.target.style.cursor=r.length>0?"pointer":"default"},onClick:(s,r)=>{if(r.length>0){const l=r[0].index,c=t[l][0];Pt(c)}}}})}function Ft(){return M(this,null,function*(){F(document.getElementById("event-summary-modal"));const{restartOnboardingTour:e}=yield ve(()=>M(this,null,function*(){const{restartOnboardingTour:t}=yield Promise.resolve().then(()=>Cn);return{restartOnboardingTour:t}}),void 0,import.meta.url);e()})}function Nt(){document.body.insertAdjacentHTML("beforeend",`
        <div id="safe-delete-modal" class="modal-container is-visible confirm-modal">
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <h3>⚠️ Are You Sure?</h3>
                <p>This will permanently delete all your sets, jokes, and settings. This action cannot be undone. Please type <strong>DELETE</strong> to confirm.</p>
                <div class="form-group" style="margin: 2rem 0;">
                    <input type="text" id="delete-confirmation-input" class="filter-input" style="text-align: center; padding: 0.8rem;" placeholder="Type DELETE here">
                </div>
                <div class="confirm-actions">
                    <button id="cancel-safe-delete" class="form-btn btn-secondary">Cancel</button>
                    <button id="confirm-safe-delete" class="form-btn btn-danger" disabled>Permanently Delete</button>
                </div>
            </div>
        </div>
    `);const t=document.getElementById("safe-delete-modal"),n=document.getElementById("delete-confirmation-input"),a=document.getElementById("confirm-safe-delete"),o=document.getElementById("cancel-safe-delete");n.addEventListener("input",()=>{a.disabled=n.value!=="DELETE"}),o.addEventListener("click",()=>t.remove()),t.querySelector(".modal-overlay").addEventListener("click",()=>t.remove()),a.addEventListener("click",()=>{localStorage.removeItem("micCalendarSets"),localStorage.removeItem("micCalendarSetlists"),localStorage.removeItem("micCalendarSettings"),localStorage.removeItem("micCalendarJokes"),localStorage.removeItem("hasCompletedOnboarding"),localStorage.removeItem("recentlyUsedMics"),d.sets=[],d.savedSetlists=[],d.jokes=[],d.userSettings={defaultView:"week",theme:"dark",notifications:!0,autoSave:!0,showOnboarding:!0},t.remove(),F(document.getElementById("event-summary-modal")),g("All data cleared. Refreshing page...","info"),setTimeout(()=>{window.location.reload()},2e3)})}function Ot(){const e=document.getElementById("tagsSuggestions");if(!e)return;const t=d.getAllTags(),n=["new-material","practice","audition","corporate","clean","late-night","headlining","open-mic"],a=[...new Set([...n,...t])];e.innerHTML=a.map(o=>`<span class="tag-suggestion" data-tag="${o}" style="
            padding: 0.25rem 0.5rem; 
            background: var(--bg-surface); 
            border: 1px solid var(--border-color); 
            border-radius: 12px; 
            font-size: 0.8rem; 
            cursor: pointer; 
            color: var(--text-secondary);
            transition: all 0.2s ease;
        " onmouseover="this.style.background='var(--accent-blue)'; this.style.color='white';" 
           onmouseout="this.style.background='var(--bg-surface)'; this.style.color='var(--text-secondary)';"
           onclick="addTagFromSuggestion('${o}')">${o}</span>`).join("")}window.addTagFromSuggestion=function(e){const t=document.getElementById("tags");if(!t)return;const n=t.value?t.value.split(",").map(a=>a.trim()):[];n.includes(e)||(n.push(e),t.value=n.join(", "))};function Jt(e,t){const n=d.getAllSets().filter(r=>r.eventType===e),a=[...new Set(n.map(r=>r.venue))],o=n.reduce((r,l)=>{let c=0;return l.setlist&&(typeof l.setlist=="string"?c=l.setlist.split(`
`).filter(p=>p.trim()).length:Array.isArray(l.setlist)&&(c=l.setlist.length)),r+c},0),i=n.sort((r,l)=>new Date(l.date)-new Date(r.date)).slice(0,5),s=`
        <div style="max-width: 600px;">
            <h3>${t} Performance Details</h3>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
                <div style="text-align: center; padding: 1rem; background: var(--bg-surface-2); border-radius: 8px;">
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--accent-blue);">${n.length}</div>
                    <div style="color: var(--text-secondary); font-size: 0.9rem;">Total Sets</div>
                </div>
                <div style="text-align: center; padding: 1rem; background: var(--bg-surface-2); border-radius: 8px;">
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--accent-green);">${a.length}</div>
                    <div style="color: var(--text-secondary); font-size: 0.9rem;">Venues</div>
                </div>
                <div style="text-align: center; padding: 1rem; background: var(--bg-surface-2); border-radius: 8px;">
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--accent-orange);">${o}</div>
                    <div style="color: var(--text-secondary); font-size: 0.9rem;">Total Jokes</div>
                </div>
                <div style="text-align: center; padding: 1rem; background: var(--bg-surface-2); border-radius: 8px;">
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--accent-red);">${n.length>0?Math.round(o/n.length):0}</div>
                    <div style="color: var(--text-secondary); font-size: 0.9rem;">Avg Jokes</div>
                </div>
            </div>
            
            <h4 style="margin: 1.5rem 0 1rem 0;">Recent ${t} Sets</h4>
            <div style="max-height: 300px; overflow-y: auto;">
                ${i.map(r=>`
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: var(--bg-surface-2); border-radius: 6px; margin-bottom: 0.5rem;">
                        <div>
                            <div style="font-weight: 600; color: var(--text-primary);">${r.title}</div>
                            <div style="font-size: 0.9rem; color: var(--text-secondary);">${r.venue} • ${new Date(r.date).toLocaleDateString()}</div>
                        </div>
                        <div style="text-align: right; color: var(--accent-blue); font-weight: 600;">
                            ${(()=>{let l=0;return r.setlist&&(typeof r.setlist=="string"?l=r.setlist.split(`
`).filter(c=>c.trim()).length:Array.isArray(r.setlist)&&(l=r.setlist.length)),l})()} jokes
                        </div>
                    </div>
                `).join("")}
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 1.5rem;">
                <button onclick="showStatsModal()" style="padding: 0.5rem 1rem; background: var(--accent-blue); color: white; border: none; border-radius: 6px; cursor: pointer;">← Back to Stats</button>
                <button onclick="closeModal(eventSummaryModal)" style="padding: 0.5rem 1rem; background: var(--bg-surface-2); color: var(--text-primary); border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer;">Close</button>
            </div>
        </div>
    `;document.getElementById("summaryContent").innerHTML=s}function Pt(e){const t=d.getAllSets().filter(l=>l.venue===e),n=[...new Set(t.map(l=>l.eventType))],a=t.reduce((l,c)=>{let p=0;return c.setlist&&(typeof c.setlist=="string"?p=c.setlist.split(`
`).filter(h=>h.trim()).length:Array.isArray(c.setlist)&&(p=c.setlist.length)),l+p},0),o={blue:"Showcase",green:"Open Mic",orange:"Corporate / Private",red:"Late Night"},i=t.sort((l,c)=>new Date(c.date)-new Date(l.date)).slice(0,8),s=t.reduce((l,c)=>{let p=0;c.setlist&&(typeof c.setlist=="string"?p=c.setlist.split(`
`).filter(m=>m.trim()).length:Array.isArray(c.setlist)&&(p=c.setlist.length));let h=0;return l.setlist&&(typeof l.setlist=="string"?h=l.setlist.split(`
`).filter(m=>m.trim()).length:Array.isArray(l.setlist)&&(h=l.setlist.length)),p>h?c:l},t[0]),r=`
        <div style="max-width: 600px;">
            <h3>📍 ${e}</h3>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
                <div style="text-align: center; padding: 1rem; background: var(--bg-surface-2); border-radius: 8px;">
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--accent-blue);">${t.length}</div>
                    <div style="color: var(--text-secondary); font-size: 0.9rem;">Total Sets</div>
                </div>
                <div style="text-align: center; padding: 1rem; background: var(--bg-surface-2); border-radius: 8px;">
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--accent-green);">${n.length}</div>
                    <div style="color: var(--text-secondary); font-size: 0.9rem;">Event Types</div>
                </div>
                <div style="text-align: center; padding: 1rem; background: var(--bg-surface-2); border-radius: 8px;">
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--accent-orange);">${a}</div>
                    <div style="color: var(--text-secondary); font-size: 0.9rem;">Total Jokes</div>
                </div>
                <div style="text-align: center; padding: 1rem; background: var(--bg-surface-2); border-radius: 8px;">
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--accent-red);">${s?(()=>{let l=0;return s.setlist&&(typeof s.setlist=="string"?l=s.setlist.split(`
`).filter(c=>c.trim()).length:Array.isArray(s.setlist)&&(l=s.setlist.length)),l})():0}</div>
                    <div style="color: var(--text-secondary); font-size: 0.9rem;">Best Set</div>
                </div>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <h4 style="margin-bottom: 0.5rem;">Performance Types at this Venue</h4>
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                    ${n.map(l=>`
                        <span style="padding: 0.25rem 0.75rem; background: var(--bg-surface-2); border-radius: 12px; font-size: 0.8rem; color: var(--text-secondary);">
                            ${o[l]||l}
                        </span>
                    `).join("")}
                </div>
            </div>
            
            <h4 style="margin: 1.5rem 0 1rem 0;">All Sets at ${e}</h4>
            <div style="max-height: 300px; overflow-y: auto;">
                ${i.map(l=>`
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: var(--bg-surface-2); border-radius: 6px; margin-bottom: 0.5rem;">
                        <div>
                            <div style="font-weight: 600; color: var(--text-primary);">${l.title}</div>
                            <div style="font-size: 0.9rem; color: var(--text-secondary);">${new Date(l.date).toLocaleDateString()} • ${o[l.eventType]}</div>
                            ${l.notes?`<div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.25rem;">${l.notes.length>50?l.notes.substring(0,50)+"...":l.notes}</div>`:""}
                        </div>
                        <div style="text-align: right; color: var(--accent-blue); font-weight: 600;">
                            ${(()=>{let c=0;return l.setlist&&(typeof l.setlist=="string"?c=l.setlist.split(`
`).filter(p=>p.trim()).length:Array.isArray(l.setlist)&&(c=l.setlist.length)),c})()} jokes
                        </div>
                    </div>
                `).join("")}
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 1.5rem;">
                <button onclick="showStatsModal()" style="padding: 0.5rem 1rem; background: var(--accent-blue); color: white; border: none; border-radius: 6px; cursor: pointer;">← Back to Stats</button>
                <button onclick="closeModal(eventSummaryModal)" style="padding: 0.5rem 1rem; background: var(--bg-surface-2); color: var(--text-primary); border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer;">Close</button>
            </div>
        </div>
    `;document.getElementById("summaryContent").innerHTML=r}function ot(e=null){fe&&(at.textContent=e?"Edit Joke":"Add New Joke",Ae.reset(),e?(document.getElementById("jokeId").value=e.id,document.getElementById("jokeText").value=e.text,document.getElementById("jokeTags").value=e.tags.join(", "),document.getElementById("estimatedDuration").value=e.estimated_duration,document.getElementById("jokeNotes").value=e.notes||""):document.getElementById("jokeId").value="",Vt(),$(fe))}function Vt(){const e=document.getElementById("jokeTagsSuggestions");if(!e)return;const t=d.getAllJokes(!0),n=[...new Set(t.flatMap(i=>i.tags))],a=["opener","closer","clean","crowd-work","observational","personal","callback","physical","impression","one-liner","story","topical"],o=[...new Set([...a,...n])];e.innerHTML=o.map(i=>`<span class="tag-suggestion" data-tag="${i}" onclick="addJokeTagFromSuggestion('${i}')">${i}</span>`).join("")}function Rt(e){e.preventDefault();const t=new FormData(Ae),n=t.get("jokeId"),a=t.get("jokeTags")?t.get("jokeTags").split(",").map(r=>r.trim()).filter(r=>r):[],o={text:t.get("jokeText"),tags:a,notes:t.get("jokeNotes"),estimated_duration:parseInt(t.get("estimatedDuration"))||60};n?d.updateJoke(parseInt(n),o):d.addJoke(o),F(fe);const i=document.getElementById("jokeBankContainer");i&&i.style.display!=="none"&&ve(()=>M(this,null,function*(){const{renderJokeBank:r}=yield Promise.resolve().then(()=>Xe);return{renderJokeBank:r}}),void 0,import.meta.url).then(({renderJokeBank:r})=>{r()}),document.getElementById("modalJokeBank")&&ee()}window.addJokeTagFromSuggestion=function(e){const t=document.getElementById("jokeTags");if(!t)return;const n=t.value?t.value.split(",").map(a=>a.trim()):[];n.includes(e)||(n.push(e),t.value=n.join(", "))};document.addEventListener("showJokeModal",e=>{ot(e.detail)});let E=[],Ee=null,Se=null,Ie=null,Ce=!1;window.enableDragDropDebug=function(){localStorage.setItem("debugDragDrop","true"),console.log("🔧 Drag & Drop debug mode enabled. Try dragging a joke now."),console.log("Available jokes:",d.getAllJokes().map(e=>({id:e.id,text:e.text.substring(0,30)+"..."})))};window.disableDragDropDebug=function(){localStorage.removeItem("debugDragDrop"),console.log("🔧 Drag & Drop debug mode disabled.")};window.debugJokeData=function(){const e=d.getAllJokes();return console.log("🔍 All jokes in database:",e),console.log("🔍 Current setlist data:",E),{jokes:e,currentSetlistData:E}};function Ut(){E.length>0&&typeof E[0]=="number"&&(console.log("📦 Migrating setlist data to new format..."),E=E.map(e=>({id:e,perfNote:""})),document.getElementById("setlistData").value=JSON.stringify(E))}function pe(){Ie&&clearTimeout(Ie),Ie=setTimeout(()=>{ye(),ee()},16)}function Ht(e,t=!1){if(t&&console.log("🔍 Validating joke:",{jokeId:e,type:typeof e,isNaN:isNaN(e),allJokes:d.getAllJokes().map(i=>({id:i.id,type:typeof i.id}))}),!e||isNaN(e))return g(`Invalid joke selected (ID: ${e}, type: ${typeof e})`,"error"),!1;let n=d.getJokeById(e);if(!n&&t&&console.log("🔍 Primary lookup failed, trying alternatives..."),!n){const i=d.getAllJokes();if(n=i.find(s=>s.id==e),n&&t&&console.log("🔍 Found with loose equality:",n),n||(n=i.find(s=>s.id.toString()===e.toString()),n&&t&&console.log("🔍 Found with string conversion:",n)),!n&&typeof e=="number"&&(n=i.find(s=>parseFloat(s.id)===parseFloat(e)),n&&t&&console.log("🔍 Found with parseFloat comparison:",n)),!n){const s=Math.floor(e);n=i.find(r=>Math.floor(r.id)===s),n&&t&&console.log("🔍 Found with floor comparison:",n)}}if(!n){const i=d.getAllJokes().map(r=>r.id),s=t?`Joke not found (ID: ${e}, type: ${typeof e}). Available IDs: [${i.join(", ")}]`:"Joke not found. Please try refreshing the page or contact support.";return g(s,"error"),t&&console.error("🚨 All joke lookup strategies failed:",{searchedId:e,searchedType:typeof e,availableIds:i,availableTypes:i.map(r=>typeof r)}),!1}const a=typeof e=="string"?parseInt(e):e,o=E.map(i=>typeof i=="object"?i.id:i);return o.includes(a)||o.includes(e)?(g("Joke is already in your setlist","error"),!1):!0}function zt(){const e=document.getElementById("setlistData");E=e.value?JSON.parse(e.value):[],Ut(),qt(),ye(),Kt(),Yt(),Xt(),Qt();const t=document.getElementById("setlistBuilder");t&&t.addEventListener("setlistCleared",()=>{E=[],ye(),ee()})}function qt(){const e=document.getElementById("modalJokeBank"),t=document.getElementById("modalJokeTagFilter");if(!e)return;const n=d.getAllJokes(),a=[...new Set(n.flatMap(o=>o.tags))].sort();t.innerHTML='<option value="">All Tags</option>',a.forEach(o=>{const i=document.createElement("option");i.value=o,i.textContent=o,t.appendChild(i)}),ee()}function ee(){var i,s;const e=document.getElementById("modalJokeBank"),t=((i=document.getElementById("modalJokeSearch"))==null?void 0:i.value)||"",n=((s=document.getElementById("modalJokeTagFilter"))==null?void 0:s.value)||"";if(!e)return;let a=d.getAllJokes();t&&(a=d.searchJokes(t)),n&&(a=a.filter(r=>r.tags.includes(n)));const o=E.map(r=>typeof r=="object"?r.id:r);if(a=a.filter(r=>!o.includes(r.id)),a.length===0){e.innerHTML=`
            <div class="empty-joke-bank">
                <i class="fas fa-lightbulb"></i>
                <p>${t||n?"No jokes match your filters":"No jokes available"}</p>
                ${!t&&!n?'<button onclick="showJokeModal()">Add Your First Joke</button>':""}
            </div>
        `;return}e.innerHTML=a.map(r=>Gt(r)).join("")}function Gt(e){const t=e.tags.slice(0,3);return`
        <div class="joke-bank-item" data-joke-id="${e.id}">
            <div class="joke-item-text">${e.text}</div>
            <div class="joke-item-meta">
                <div class="joke-item-tags">
                    ${t.map(n=>`<span class="joke-item-tag">${n}</span>`).join("")}
                    ${e.tags.length>3?`<span class="joke-item-tag">+${e.tags.length-3}</span>`:""}
                </div>
                <div class="joke-item-duration">${e.estimated_duration}s</div>
            </div>
        </div>
    `}function ye(){const e=document.getElementById("currentSetlist"),t=document.getElementById("jokeCount"),n=document.getElementById("totalDuration"),a=document.getElementById("clearSetlistBtn");if(!e)return;if(a&&(E.length>0?a.style.display="inline-block":a.style.display="none"),E.length===0){e.innerHTML=`
            <div class="empty-setlist">
                <i class="fas fa-arrow-left"></i>
                <p>Drag jokes here to build your setlist</p>
            </div>
        `,t&&(t.textContent="0 jokes"),n&&(n.textContent="0:00");return}const o=E.map(c=>({item:c,joke:d.getJokeById(typeof c=="object"?c.id:c)})).filter(c=>c.joke),i=o.reduce((c,p)=>c+(p.joke.estimated_duration||60),0),s=Math.floor(i/60),r=i%60,l=`${s}:${r.toString().padStart(2,"0")}`;t&&(t.textContent=`${o.length} joke${o.length===1?"":"s"}`),n&&(n.textContent=l),e.innerHTML=o.map((c,p)=>Wt(c.joke,p+1,c.item)).join("")}function Wt(e,t,n){const a=n&&typeof n=="object"&&n.perfNote||"";return`
        <div class="setlist-item" data-joke-id="${e.id}">
            <i class="fas fa-grip-vertical drag-handle"></i>
            <div class="setlist-item-number">${t}</div>
            
            <div class="setlist-item-content">
                <!-- This new wrapper keeps the main info together -->
                <div class="joke-info">
                    <div class="joke-item-text">${e.text}</div>
                    <div class="joke-item-meta">
                        <span>${e.tags.join(", ")}</span>
                        <div class="joke-item-duration">${e.estimated_duration||60}s</div>
                    </div>
                </div>
                <textarea class="performance-note-input ${a?"active":""}" placeholder="Add performance note..." data-joke-id="${e.id}">${a}</textarea>
            </div>

            <div class="setlist-item-actions">
                <i class="fas fa-comment-dots performance-note-icon" title="Add performance note" data-joke-id="${e.id}"></i>
                <button class="remove-joke-btn" title="Remove joke" data-action="remove" data-joke-id="${e.id}">
                    <i class="fas fa-times" data-action="remove" data-joke-id="${e.id}"></i>
                </button>
            </div>
        </div>
    `}function Kt(){const e=document.getElementById("modalJokeBank"),t=document.getElementById("currentSetlist");!e||!t||(Ee&&Ee.destroy(),Se&&Se.destroy(),Ee=new Sortable(e,{group:{name:"setlist",pull:"clone",put:!1},sort:!1,animation:150,ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",onStart:function(n){Ce=!0,n.item.classList.add("dragging")},onEnd:function(n){Ce=!1,n.item.classList.remove("dragging"),n.to===e&&n.item.remove()}}),Se=new Sortable(t,{group:{name:"setlist",pull:!1,put:!0},animation:150,ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",onAdd:function(n){const a=n.item.dataset.jokeId,o=parseFloat(a),i=n.newIndex,s=localStorage.getItem("debugDragDrop")==="true";if(s&&console.log("🎯 Drag operation:",{rawJokeId:a,jokeId:o,rawType:typeof a,parsedType:typeof o,newIndex:i,element:n.item}),Ht(o,s)){const r=d.getJokeById(o),l={id:r.id,perfNote:""};E.splice(i,0,l),document.getElementById("setlistData").value=JSON.stringify(E),n.item.remove(),pe(),setTimeout(()=>{const h=document.getElementById("currentSetlist").children[i];h&&(h.classList.add("flash"),setTimeout(()=>{h.classList.remove("flash")},700))},50);const c=r.text.substring(0,30)+(r.text.length>30?"...":"");g(`Added "${c}" to setlist`,"success")}else n.item.remove(),s&&console.error("🚨 Validation failed, removed dragged item")},onUpdate:function(n){const a=n.item.dataset.jokeId,o=parseFloat(a),i=n.oldIndex,s=n.newIndex;if(!o||isNaN(o)){g("Error reordering joke","error");return}if(i<0||s<0||i>=E.length){g("Error reordering joke","error");return}const r=E[i];E.splice(i,1),E.splice(s,0,r),document.getElementById("setlistData").value=JSON.stringify(E),pe()}}))}function Yt(){const e=document.getElementById("toggleLegacySetlist"),t=document.getElementById("setlistBuilder"),n=document.getElementById("legacySetlistInput");!e||!t||!n||e.addEventListener("click",()=>{n.style.display!=="none"?(n.style.display="none",t.style.display="block",e.innerHTML='<i class="fas fa-keyboard"></i>',e.title="Switch to text input"):(t.style.display="none",n.style.display="block",e.innerHTML='<i class="fas fa-magic"></i>',e.title="Switch to drag-and-drop builder")})}function Xt(){const e=document.getElementById("modalJokeSearch"),t=document.getElementById("modalJokeTagFilter");e&&e.addEventListener("input",ee),t&&t.addEventListener("change",ee)}window.debouncedRenderSetlistPanels=pe;window.renderCurrentSetlist=ye;window.renderMiniJokeBank=ee;window.removeFromSetlist=function(e){const t=E.findIndex(n=>(typeof n=="object"?n.id:n)===e);if(t>-1){const n=d.getJokeById(e);if(E.splice(t,1),document.getElementById("setlistData").value=JSON.stringify(E),pe(),n){const a=n.text.substring(0,30)+(n.text.length>30?"...":"");g(`Removed "${a}" from setlist`,"success")}}};function Qt(){const e=document.getElementById("modalJokeBank");e==null||e.addEventListener("click",t=>{if(Ce)return;const n=t.target.closest(".joke-bank-item");if(n&&!n.classList.contains("sortable-ghost")&&!n.classList.contains("sortable-chosen")&&!n.classList.contains("dragging")){const a=parseInt(n.dataset.jokeId);if(!a||isNaN(a))return;const o=d.getJokeById(a);o&&Zt(o)}})}function Zt(e){const t=`
        <div id="joke-detail-modal" class="modal-container is-visible">
            <div class="modal-overlay"></div>
            <div class="modal-content" style="max-width: 500px;">
                <button class="modal-close-btn" aria-label="Close">&times;</button>
                <h3 style="margin-top: 0; color: var(--accent-blue);"><i class="fas fa-lightbulb"></i> Joke Details</h3>
                
                <div class="joke-detail-content">
                    <div class="joke-text" style="background: var(--bg-surface-2); padding: 1rem; border-radius: 8px; margin: 1rem 0; font-size: 1.05rem; line-height: 1.5; border-left: 3px solid var(--accent-blue);">
                        ${e.text}
                    </div>
                    
                    <div class="joke-meta" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1.5rem 0;">
                        <div>
                            <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; display: block; margin-bottom: 0.5rem;">Duration</label>
                            <div style="color: var(--text-primary); font-weight: 500;">
                                <i class="fas fa-clock" style="color: var(--accent-orange); margin-right: 0.5rem;"></i>
                                ${e.estimated_duration} seconds
                            </div>
                        </div>
                        <div>
                            <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; display: block; margin-bottom: 0.5rem;">Created</label>
                            <div style="color: var(--text-primary); font-weight: 500;">
                                <i class="fas fa-calendar" style="color: var(--accent-green); margin-right: 0.5rem;"></i>
                                ${new Date(e.created_at).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                    
                    ${e.tags.length>0?`
                        <div style="margin: 1.5rem 0;">
                            <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; display: block; margin-bottom: 0.5rem;">Tags</label>
                            <div style="display: flex; flex-wrap: wrap; gap: 0.25rem;">
                                ${e.tags.map(a=>`
                                    <span style="padding: 0.25rem 0.5rem; background: var(--accent-blue); color: white; border-radius: 12px; font-size: 0.8rem;">
                                        ${a}
                                    </span>
                                `).join("")}
                            </div>
                        </div>
                    `:""}
                    
                    ${e.notes?`
                        <div style="margin: 1.5rem 0;">
                            <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; display: block; margin-bottom: 0.5rem;">Notes</label>
                            <div style="background: var(--bg-surface-2); padding: 1rem; border-radius: 8px; color: var(--text-primary); line-height: 1.5;">
                                ${e.notes}
                            </div>
                        </div>
                    `:""}
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
                    <button onclick="editJokeFromQuickView(${e.id})" class="form-btn" style="background: var(--accent-orange); color: white; border: none;">
                        <i class="fas fa-edit"></i> Edit Joke
                    </button>
                    <button onclick="closeJokeDetailModal()" class="form-btn btn-secondary">Close</button>
                </div>
            </div>
        </div>
    `;document.body.insertAdjacentHTML("beforeend",t);const n=document.getElementById("joke-detail-modal");n.querySelector(".modal-close-btn").addEventListener("click",closeJokeDetailModal),n.querySelector(".modal-overlay").addEventListener("click",closeJokeDetailModal)}window.closeJokeDetailModal=function(){const e=document.getElementById("joke-detail-modal");e&&(e.classList.remove("is-visible"),setTimeout(()=>e.remove(),200))};window.editJokeFromQuickView=function(e){const t=d.getJokeById(e);t&&(closeJokeDetailModal(),ot(t))};let ce=null,ue,me,C;function en(){ue=document.getElementById("calendarContainer"),me=document.getElementById("calendarGrid"),C=document.getElementById("event-context-menu")}function tn(){var r,l,c,p,h,m,y,f,S,k,I,D,P,V,N,R,O,B,te,ae,Me,je,_e,$e,Fe,Ne;Ge(),Tt(),en(),it(),fn(),document.querySelectorAll(".modal-overlay, .modal-close-btn, .modal-cancel-btn").forEach(u=>{u.addEventListener("click",()=>{const v=u.closest(".modal-container");F(v)})}),(r=document.getElementById("addSetBtn"))==null||r.addEventListener("click",()=>{X()}),(l=document.getElementById("addMicBtn"))==null||l.addEventListener("click",()=>{Pe()}),(c=document.getElementById("addMicFromForm"))==null||c.addEventListener("click",()=>{window.isSelectingMicForForm=!0,Pe()}),(p=document.getElementById("addJokeFromBuilderBtn"))==null||p.addEventListener("click",()=>{showJokeModal()});const e=document.getElementById("mic-selection-modal");if(e){const u=e.querySelector(".modal-overlay"),v=e.querySelector(".modal-close-btn");u&&u.addEventListener("click",()=>{window.isSelectingMicForForm=!1}),v&&v.addEventListener("click",()=>{window.isSelectingMicForForm=!1})}(h=document.getElementById("expandBtn"))==null||h.addEventListener("click",()=>{const u=!q;de(u),ue.classList.toggle("is-expanded");const v=document.getElementById("expandBtn").querySelector("i");v.className=u?"fas fa-compress":"fas fa-expand",x()}),(m=document.getElementById("prevWeekBtn"))==null||m.addEventListener("click",()=>{const u=new Date(Z);q?u.setMonth(u.getMonth()-1):u.setDate(u.getDate()-7),K(u),x()}),(y=document.getElementById("nextWeekBtn"))==null||y.addEventListener("click",()=>{const u=new Date(Z);q?u.setMonth(u.getMonth()+1):u.setDate(u.getDate()+7),K(u),x()}),(f=document.getElementById("todayBtn"))==null||f.addEventListener("click",()=>{K(new Date),x()}),(S=document.getElementById("weekViewBtn"))==null||S.addEventListener("click",()=>{var v;we("week"),de(!1),ue.classList.remove("is-expanded");const u=(v=document.getElementById("expandBtn"))==null?void 0:v.querySelector("i");u&&(u.className="fas fa-expand"),x()}),(k=document.getElementById("monthViewBtn"))==null||k.addEventListener("click",()=>{var v;we("month"),de(!0),ue.classList.add("is-expanded");const u=(v=document.getElementById("expandBtn"))==null?void 0:v.querySelector("i");u&&(u.className="fas fa-compress"),x()}),(I=document.getElementById("listViewBtn"))==null||I.addEventListener("click",()=>{we("list"),We(),rn()}),(D=document.getElementById("calendarNavBtn"))==null||D.addEventListener("click",()=>{Ye(),qe("calendar")}),(P=document.getElementById("jokesNavBtn"))==null||P.addEventListener("click",()=>{Ke(),qe("jokes")}),(V=document.getElementById("statsNavBtn"))==null||V.addEventListener("click",()=>{Bt()}),(N=document.getElementById("settingsNavBtn"))==null||N.addEventListener("click",()=>{Ct()}),(R=document.getElementById("jokeForm"))==null||R.addEventListener("submit",Rt);const t=document.getElementById("tags"),n=document.getElementById("tagsSuggestions");let a;t==null||t.addEventListener("input",()=>{clearTimeout(a),a=setTimeout(()=>{const u=t.value.split(",").map(A=>A.trim()),v=u[u.length-1].toLowerCase();if(!v){n.style.display="none";return}const J=d.getAllTags().filter(A=>A.toLowerCase().includes(v)&&!u.includes(A));J.length>0?(n.innerHTML=J.slice(0,8).map(A=>`<span class="tag-suggestion" data-tag="${A}">${A}</span>`).join(""),n.style.display="flex"):n.style.display="none"},300)}),n==null||n.addEventListener("click",u=>{if(u.target.classList.contains("tag-suggestion")){const v=u.target.dataset.tag;let L=t.value.split(",").map(J=>J.trim());L[L.length-1]=v,t.value=L.join(", ")+", ",n.style.display="none",t.focus()}}),t==null||t.addEventListener("blur",u=>{setTimeout(()=>{n&&!n.contains(document.activeElement)&&(n.style.display="none")},150)}),t==null||t.addEventListener("keydown",u=>{u.key==="Escape"&&n&&(n.style.display="none",u.preventDefault())}),document.addEventListener("click",u=>{n&&!(t!=null&&t.contains(u.target))&&!n.contains(u.target)&&(n.style.display="none")}),(O=document.getElementById("jokeBankToggle"))==null||O.addEventListener("click",xn),(B=document.getElementById("clearSetlistBtn"))==null||B.addEventListener("click",()=>{if(confirm("Are you sure you want to clear the entire setlist?")){document.getElementById("setlistData").value=JSON.stringify([]);const u=document.getElementById("setlistBuilder");if(u){const v=new CustomEvent("setlistCleared");u.dispatchEvent(v)}g("Setlist cleared","success")}}),(te=document.getElementById("currentSetlist"))==null||te.addEventListener("click",u=>{const v=u.target.dataset.action,L=parseInt(u.target.dataset.jokeId);if(v==="remove"&&L&&window.removeFromSetlist&&window.removeFromSetlist(L),u.target.classList.contains("performance-note-icon")){const A=u.target.closest(".setlist-item").querySelector(".performance-note-input");A.classList.toggle("active"),A.classList.contains("active")&&A.focus()}}),(ae=document.getElementById("currentSetlist"))==null||ae.addEventListener("input",u=>{if(u.target.classList.contains("performance-note-input")){const v=parseInt(u.target.dataset.jokeId),L=u.target.value,J=JSON.parse(document.getElementById("setlistData").value||"[]"),A=J.find(be=>(typeof be=="object"?be.id:be)===v);A&&typeof A=="object"&&(A.perfNote=L,document.getElementById("setlistData").value=JSON.stringify(J))}});const o=document.getElementById("venueSearch"),i=document.getElementById("typeFilter");o==null||o.addEventListener("input",x),i==null||i.addEventListener("change",x),(Me=document.getElementById("advancedSearchToggle"))==null||Me.addEventListener("click",()=>{const u=document.getElementById("advancedSearch"),v=document.getElementById("advancedSearchToggle");u==null||u.classList.toggle("active");const L=u==null?void 0:u.classList.contains("active");v&&(v.style.background=L?"var(--accent-blue)":"",v.style.color=L?"white":"")}),(je=document.getElementById("dateFrom"))==null||je.addEventListener("change",x),(_e=document.getElementById("dateTo"))==null||_e.addEventListener("change",x),($e=document.getElementById("minJokes"))==null||$e.addEventListener("input",x),(Fe=document.getElementById("clearFilters"))==null||Fe.addEventListener("click",()=>{o&&(o.value=""),i&&(i.value="all");const u=document.getElementById("dateFrom"),v=document.getElementById("dateTo"),L=document.getElementById("minJokes");u&&(u.value=""),v&&(v.value=""),L&&(L.value=""),x()}),me&&(me.addEventListener("contextmenu",nn),me.addEventListener("click",an)),C&&C.addEventListener("click",on);const s=document.getElementById("setForm");s&&s.addEventListener("submit",sn),(Ne=document.getElementById("confirmDeleteBtn"))==null||Ne.addEventListener("click",()=>{ce!==null&&(d.deleteSet(ce),F(document.getElementById("delete-confirm-modal")),x(),ce=null,g("Set deleted successfully"))}),document.addEventListener("keydown",ln),document.addEventListener("click",()=>{C&&(C.style.display="none")}),setTimeout(dn,500)}function we(e){document.querySelectorAll(".view-toggle-btn").forEach(n=>n.classList.remove("active"));const t=document.getElementById(`${e}ViewBtn`);t&&t.classList.add("active")}function Pe(){const e=document.getElementById("mic-selection-modal");if(e){$(e);const t=document.getElementById("micsList");t&&(t.innerHTML='<div style="padding: 2rem; text-align: center; color: var(--text-secondary);"><i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Loading mics...</div>'),kn()}}function nn(e){const t=e.target.closest(".event-pill");t&&(e.preventDefault(),C&&(C.style.display="block",C.style.left=`${e.pageX}px`,C.style.top=`${e.pageY}px`,C.dataset.setId=t.dataset.setId))}function an(e){const t=e.target.closest(".add-set-btn");if(t){e.stopPropagation();const a=t.dataset.date;X({date:a});return}const n=e.target.closest(".event-pill");if(n){const a=parseInt(n.dataset.setId,10),o=d.getSetById(a);o&&X(o)}else{const a=e.target.closest(".day-cell");a&&a.dataset.date&&X({date:a.dataset.date})}}function on(e){const t=e.target.closest(".context-menu-item");if(!t)return;const n=t.dataset.action,a=parseInt(C.dataset.setId,10),o=d.getSetById(a);n==="edit"?X(o):n==="delete"&&(ce=a,xt()),C&&(C.style.display="none")}function sn(e){var I,D,P,V,N,R,O;e.preventDefault();const t=new FormData(e.target),n=parseInt(t.get("setId"),10);gn();const a=(I=t.get("event-title"))==null?void 0:I.trim(),o=(D=t.get("venue"))==null?void 0:D.trim(),i=t.get("date"),s=(P=t.get("notes"))==null?void 0:P.trim(),r=(V=t.get("tags"))==null?void 0:V.trim(),l=(N=t.get("goal"))==null?void 0:N.trim(),c=(R=t.get("imageUrl"))==null?void 0:R.trim(),p=t.get("setlistData"),h=(O=t.get("setlist"))==null?void 0:O.trim();let m;if(p&&p!=="[]")try{m=JSON.parse(p)}catch(B){m=[]}else h?m=h:m=[];let y=!1;if(a?a.length<2?(j("event-title","Title must be at least 2 characters"),y=!0):a.length>100&&(j("event-title","Title must be less than 100 characters"),y=!0):(j("event-title","Event title is required"),y=!0),o?o.length<2?(j("venue","Venue must be at least 2 characters"),y=!0):o.length>100&&(j("venue","Venue must be less than 100 characters"),y=!0):(j("venue","Venue is required"),y=!0),!i)j("date","Date is required"),y=!0;else if(!cn(i))j("date","Please enter a valid date"),y=!0;else{const B=new Date(i),te=new Date,ae=new Date;ae.setFullYear(te.getFullYear()+1),B>ae&&(j("date","Date cannot be more than a year in the future"),y=!0)}if(typeof m=="string"&&m.length>5e3?(j("setlist","Setlist is too long (max 5000 characters)"),y=!0):Array.isArray(m)&&m.length>50&&(j("setlistData","Setlist has too many jokes (max 50)"),y=!0),s&&s.length>2e3&&(j("notes","Notes are too long (max 2000 characters)"),y=!0),y){g("Please fix the form errors before submitting","error");return}const f=r?r.split(",").map(B=>B.trim()).filter(B=>B):[],S={title:a,venue:o,date:i,eventType:t.get("eventType"),setlist:m,notes:s,tags:f,goal:l||"",imageUrl:c||""},k=e.target.querySelector('button[type="submit"]');if(k){const B=k.textContent;k.innerHTML='<i class="fas fa-check"></i> Saved!',k.style.background="var(--accent-green)",k.disabled=!0,setTimeout(()=>{n?(d.updateSet(n,S),g("Set updated successfully")):(d.addSet(S),g("Set added successfully")),F(document.getElementById("add-edit-modal")),x(),k.innerHTML=B,k.style.background="",k.disabled=!1},800)}else n?(d.updateSet(n,S),g("Set updated successfully")):(d.addSet(S),g("Set added successfully")),F(document.getElementById("add-edit-modal")),x()}function rn(e){document.querySelectorAll(".list-item").forEach(t=>{t.addEventListener("click",()=>{const n=parseInt(t.dataset.setId,10),a=d.getSetById(n);a&&X(a)}),t.addEventListener("keydown",n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),t.click())})})}function ln(e){var n,a,o,i,s,r,l,c,p,h;const t=e.target.matches("input, select, textarea");if(e.ctrlKey&&e.key==="f"){e.preventDefault();const m=document.getElementById("venueSearch");m&&(m.focus(),m.select(),g("Search focused - Type to search sets","info"))}if(e.ctrlKey&&e.key==="t"&&(e.preventDefault(),K(new Date),x(),g("Jumped to today","info")),e.ctrlKey&&e.key==="n"&&(e.preventDefault(),(n=document.getElementById("addSetBtn"))==null||n.click(),g("Add Set form opened","info")),e.ctrlKey&&e.key==="m"&&(e.preventDefault(),(a=document.getElementById("addMicBtn"))==null||a.click(),g("Mic Finder opened","info")),e.ctrlKey&&e.key==="s"&&!t&&(e.preventDefault(),(o=document.getElementById("statsNavBtn"))==null||o.click(),g("Stats opened","info")),e.ctrlKey&&e.key===","&&(e.preventDefault(),(i=document.getElementById("settingsNavBtn"))==null||i.click(),g("Settings opened","info")),e.key==="Escape"){const m=document.querySelectorAll(".modal-container.is-visible");if(m.length>0)m.forEach(y=>F(y)),g("Modal closed","info");else if(C&&C.style.display!=="none")C.style.display="none";else{const y=document.getElementById("venueSearch");document.activeElement===y&&(y!=null&&y.value)&&(y.value="",x(),g("Search cleared","info"))}}if(!t){if(e.key==="ArrowLeft")e.preventDefault(),(s=document.getElementById("prevWeekBtn"))==null||s.click();else if(e.key==="ArrowRight")e.preventDefault(),(r=document.getElementById("nextWeekBtn"))==null||r.click();else if(e.key==="ArrowUp"&&e.ctrlKey){e.preventDefault();const m=new Date(Z);m.setMonth(m.getMonth()-1),K(m),x(),g("Previous month","info")}else if(e.key==="ArrowDown"&&e.ctrlKey){e.preventDefault();const m=new Date(Z);m.setMonth(m.getMonth()+1),K(m),x(),g("Next month","info")}}if(t||(e.key==="1"?(e.preventDefault(),(l=document.getElementById("weekViewBtn"))==null||l.click(),g("Week view activated","info")):e.key==="2"?(e.preventDefault(),(c=document.getElementById("monthViewBtn"))==null||c.click(),g("Month view activated","info")):e.key==="3"&&(e.preventDefault(),(p=document.getElementById("listViewBtn"))==null||p.click(),g("List view activated","info"))),e.ctrlKey&&e.shiftKey&&e.key==="E"&&(e.preventDefault(),window.exportData()),e.ctrlKey&&e.shiftKey&&e.key==="C"&&(e.preventDefault(),(h=document.getElementById("clearFilters"))==null||h.click(),g("All filters cleared","info")),e.key==="?"&&!t&&(e.preventDefault(),un()),e.altKey&&!t){const m=document.getElementById("typeFilter");if(m)switch(e.key){case"1":e.preventDefault(),m.value="blue",m.dispatchEvent(new Event("change")),g("Filtered to Showcases","info");break;case"2":e.preventDefault(),m.value="green",m.dispatchEvent(new Event("change")),g("Filtered to Open Mics","info");break;case"3":e.preventDefault(),m.value="orange",m.dispatchEvent(new Event("change")),g("Filtered to Corporate/Private","info");break;case"4":e.preventDefault(),m.value="red",m.dispatchEvent(new Event("change")),g("Filtered to Late Night","info");break;case"0":e.preventDefault(),m.value="all",m.dispatchEvent(new Event("change")),g("Filter cleared - showing all types","info");break}}}function dn(){const e=localStorage.getItem("pendingCalendarAction");if(e)try{const t=JSON.parse(e);if(t.action==="addMic"&&t.mic){localStorage.removeItem("pendingCalendarAction");const n={venue:t.mic.venue,title:"Open Mic",eventType:"green",date:t.suggestedDate,notes:`Added from Mic Finder.
${t.mic.host?`Host: ${t.mic.host}
`:""}${t.mic.cost?`Cost: ${t.mic.cost}
`:""}${t.mic.signupTime?`Signup: ${t.mic.signupTime}
`:""}${t.mic.address?`Address: ${t.mic.address}
`:""}`};X(n),g(`Pre-filled form with ${t.mic.venue} details!`)}}catch(t){console.error("Error processing pending calendar action:",t),localStorage.removeItem("pendingCalendarAction")}}function cn(e){const t=new Date(e);return t instanceof Date&&!isNaN(t)}function un(){const e=`
        <div style="max-width: 700px;">
            <h3>⌨️ Keyboard Shortcuts</h3>
            <p style="color: var(--text-secondary); margin-bottom: 2rem;">Master these shortcuts to become a power user!</p>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 1.5rem 0;">
                <div>
                    <h4 style="color: var(--accent-blue); margin-bottom: 1rem;">🚀 Quick Actions</h4>
                    <div class="shortcut-list">
                        <div class="shortcut-item">
                            <kbd>Ctrl+N</kbd>
                            <span>Add New Set</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>Ctrl+M</kbd>
                            <span>Open Mic Finder</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>Ctrl+S</kbd>
                            <span>Open Stats</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>Ctrl+,</kbd>
                            <span>Open Settings</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>Ctrl+Shift+E</kbd>
                            <span>Export Data</span>
                        </div>
                    </div>
                </div>
                
                <div>
                    <h4 style="color: var(--accent-green); margin-bottom: 1rem;">🧭 Navigation</h4>
                    <div class="shortcut-list">
                        <div class="shortcut-item">
                            <kbd>Ctrl+T</kbd>
                            <span>Go to Today</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>←/→</kbd>
                            <span>Previous/Next Week</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>Ctrl+↑/↓</kbd>
                            <span>Previous/Next Month</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>1/2/3</kbd>
                            <span>Week/Month/List View</span>
                        </div>
                    </div>
                </div>
                
                <div>
                    <h4 style="color: var(--accent-orange); margin-bottom: 1rem;">🔍 Search & Filter</h4>
                    <div class="shortcut-list">
                        <div class="shortcut-item">
                            <kbd>Ctrl+F</kbd>
                            <span>Focus Search</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>Alt+1</kbd>
                            <span>Filter Showcases</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>Alt+2</kbd>
                            <span>Filter Open Mics</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>Alt+3</kbd>
                            <span>Filter Corporate</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>Alt+4</kbd>
                            <span>Filter Late Night</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>Alt+0</kbd>
                            <span>Clear Type Filter</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>Ctrl+Shift+C</kbd>
                            <span>Clear All Filters</span>
                        </div>
                    </div>
                </div>
                
                <div>
                    <h4 style="color: var(--accent-red); margin-bottom: 1rem;">⚡ Utilities</h4>
                    <div class="shortcut-list">
                        <div class="shortcut-item">
                            <kbd>Esc</kbd>
                            <span>Close Modal/Clear Search</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>?</kbd>
                            <span>Show This Help</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div style="background: var(--bg-surface-2); padding: 1rem; border-radius: 8px; margin: 1.5rem 0;">
                <h4 style="margin-bottom: 0.5rem;">💡 Pro Tips</h4>
                <ul style="margin: 0; padding-left: 1.5rem; color: var(--text-secondary);">
                    <li>Click empty calendar days to quickly add sets for that date</li>
                    <li>Right-click event pills for context menu options</li>
                    <li>Click charts in Stats to drill down into details</li>
                    <li>Use saved setlists to speed up data entry</li>
                </ul>
            </div>
            
            <div style="text-align: center; margin-top: 2rem;">
                <button onclick="closeModal(eventSummaryModal)" style="padding: 0.75rem 2rem; background: var(--accent-blue); color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">Got it!</button>
            </div>
        </div>
        
        <style>
            .shortcut-list {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
            
            .shortcut-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.5rem;
                background: var(--bg-surface-2);
                border-radius: 6px;
            }
            
            .shortcut-item kbd {
                background: var(--bg-main);
                padding: 0.25rem 0.5rem;
                border-radius: 4px;
                font-size: 0.8rem;
                font-family: monospace;
                border: 1px solid var(--border-color);
                color: var(--accent-blue);
                font-weight: 600;
            }
            
            .shortcut-item span {
                color: var(--text-primary);
                font-size: 0.9rem;
            }
        </style>
    `;document.getElementById("summaryContent").innerHTML=e,$(document.getElementById("event-summary-modal"))}function j(e,t){const n=document.getElementById(e);if(!n)return;mn(e),n.classList.add("field-error"),n.setAttribute("aria-invalid","true");const a=document.createElement("div");a.className="field-error-message",a.id=`${e}-error`,a.textContent=t,a.setAttribute("role","alert"),n.parentNode.insertBefore(a,n.nextSibling),n.setAttribute("aria-describedby",a.id)}function mn(e){const t=document.getElementById(e);if(!t)return;t.classList.remove("field-error"),t.removeAttribute("aria-invalid"),t.removeAttribute("aria-describedby");const n=document.getElementById(`${e}-error`);n&&n.remove()}function gn(){document.querySelectorAll(".field-error").forEach(n=>{n.classList.remove("field-error"),n.removeAttribute("aria-invalid"),n.removeAttribute("aria-describedby")}),document.querySelectorAll(".field-error-message").forEach(n=>n.remove())}function it(){typeof Datepicker!="undefined"?(document.querySelectorAll('input[type="date"]').forEach(t=>{new Datepicker(t,{format:"yyyy-mm-dd",todayHighlight:!0,orientation:"auto",container:t.closest(".modal-content")||document.body,clearBtn:!0,todayBtn:!0})}),console.log("Date pickers initialized successfully")):setTimeout(it,100)}function fn(){ie();const e=document.getElementById("setlistTemplate");e&&e.addEventListener("change",a=>{if(a.target.value){const o=d.getSetlistById(parseInt(a.target.value));o&&(document.getElementById("setlist").value=o.jokes.join(`
`),g(`Loaded "${o.name}" setlist`))}});const t=document.getElementById("manageSetlistsBtn");t&&t.addEventListener("click",pn);const n=document.getElementById("newSetlistForm");n&&n.addEventListener("submit",yn)}function ie(){const e=document.getElementById("setlistTemplate");e&&(e.innerHTML='<option value="">Choose a saved setlist...</option>',d.getAllSetlists().forEach(t=>{const n=document.createElement("option");n.value=t.id,n.textContent=`${t.name} (${t.jokes.length} jokes)`,e.appendChild(n)}))}function pn(){const e=document.getElementById("setlist-management-modal");if(!e)return;se();const t=document.getElementById("setlistsContainer");t&&(t.removeEventListener("click",Ve),t.addEventListener("click",Ve)),$(e)}function Ve(e){const t=e.target.closest("[data-action]");if(!t)return;const n=t.dataset.action,a=parseInt(t.dataset.setlistId);switch(n){case"edit-setlist":vn(a);break;case"delete-setlist":hn(a);break}}function se(){const e=document.getElementById("setlistsContainer");if(!e)return;const t=d.getAllSetlists();if(t.length===0){e.innerHTML='<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">No saved setlists yet. Create one below!</p>';return}e.innerHTML=t.map(n=>`
        <div style="background: var(--bg-surface-2); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                <h4 style="margin: 0; color: var(--text-primary);">${n.name}</h4>
                <div style="display: flex; gap: 0.5rem;">
                    <button data-action="edit-setlist" data-setlist-id="${n.id}" style="padding: 0.25rem 0.5rem; background: var(--accent-blue); color: white; border: none; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">Edit</button>
                    <button data-action="delete-setlist" data-setlist-id="${n.id}" style="padding: 0.25rem 0.5rem; background: var(--accent-red); color: white; border: none; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">Delete</button>
                </div>
            </div>
            <div style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem;">${n.jokes.length} jokes</div>
            <div style="background: var(--bg-main); padding: 0.5rem; border-radius: 4px; font-family: monospace; font-size: 0.8rem; max-height: 100px; overflow-y: auto;">
                ${n.jokes.map(a=>`<div>${a}</div>`).join("")}
            </div>
        </div>
    `).join("")}function yn(e){var i,s;e.preventDefault();const t=new FormData(e.target),n=(i=t.get("newSetlistName"))==null?void 0:i.trim(),a=(s=t.get("newSetlistJokes"))==null?void 0:s.trim();if(!n||!a){g("Please fill in all fields","error");return}const o=e.target.querySelector('button[type="submit"]');if(o){const r=o.textContent;o.innerHTML='<i class="fas fa-check"></i> Created!',o.style.background="var(--accent-green)",o.disabled=!0,setTimeout(()=>{d.addSetlist(n,a),g(`Setlist "${n}" created successfully!`),e.target.reset(),se(),ie(),o.innerHTML=r,o.style.background="",o.disabled=!1},600)}else d.addSetlist(n,a),g(`Setlist "${n}" created successfully!`),e.target.reset(),se(),ie()}function vn(e){const t=d.getSetlistById(e);if(!t)return;const n=prompt("Edit setlist name:",t.name);if(n===null)return;const a=prompt("Edit jokes (one per line):",t.jokes.join(`
`));a!==null&&n.trim()&&a.trim()&&(d.updateSetlist(e,n.trim(),a.trim()),g(`Setlist "${n}" updated successfully!`),se(),ie())}function hn(e){const t=d.getSetlistById(e);t&&confirm(`Are you sure you want to delete "${t.name}"?`)&&(d.deleteSetlist(e),g(`Setlist "${t.name}" deleted`),se(),ie())}let H=[],Q=[],oe=null,le=null,z={search:"",day:"all"},ge=JSON.parse(localStorage.getItem("recentlyUsedMics")||"[]");function bn(e){if(typeof Papa=="undefined"){console.error("Papa Parse library not available"),e([]);return}Papa.parse("coordinates.csv",{download:!0,header:!0,skipEmptyLines:!0,complete:function(t){const n=t.data.map((a,o)=>({id:`mic-${o}`,venue:a["Venue Name"]||a.venue||"",address:a.Location||a.address||"",borough:a.Borough||a.borough||"",neighborhood:a.Neighborhood||a.neighborhood||"",day:a.Day||a.day||"",time:a["Start Time"]||a.time||"",signupTime:a["Sign-Up Instructions"]||a.signupTime||"",host:a["Host(s) / Organizer"]||a.host||"",details:a["Other Rules"]||a.details||"",cost:a.Cost||a.cost||"Free",signup:a["Sign-Up Instructions"]||a.signup||"",lat:parseFloat(a["Geocodio Latitude"]||a.lat||0),lon:parseFloat(a["Geocodio Longitude"]||a.lon||0),isFree:(a.Cost||a.cost||"Free").toLowerCase().includes("free"),hasSignup:!!(a["Sign-Up Instructions"]||a.signupTime)})).filter(a=>a.venue&&a.day);e(n)},error:function(t){console.error("Error loading CSV:",t),e([])}})}function kn(){return oe?(H=oe,Q=[...H],Re(),Le(),Promise.resolve()):le||(le=new Promise(e=>{bn(t=>{oe=t||[],H=oe,Q=[...H],Re(),Le(),e(oe)})}),le)}function st(){const e=document.getElementById("micSearch"),t=document.getElementById("dayFilter");z={search:e?e.value:"",day:t?t.value:"all"}}function Re(){const e=document.getElementById("micSearch"),t=document.getElementById("dayFilter");e&&(e.value=z.search),t&&(t.value=z.day),(z.search||z.day!=="all")&&ne()}function En(e){ge=[e,...ge.filter(t=>t!==e)].slice(0,5),localStorage.setItem("recentlyUsedMics",JSON.stringify(ge))}function Sn(){return ge.map(e=>H.find(t=>t.id===e)).filter(e=>e&&Q.includes(e))}function In(e){const t=document.getElementById("micSearch"),n=document.getElementById("dayFilter"),a=new Date,o=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];switch(e){case"today":n&&(n.value=o[a.getDay()]),t&&(t.value="");break;case"tomorrow":const i=new Date(a);i.setDate(i.getDate()+1),n&&(n.value=o[i.getDay()]),t&&(t.value="");break;case"free":n&&(n.value="all"),t&&(t.value="free");break;case"popular":n&&(n.value="all"),t&&(t.value="Manhattan");break;case"clear":n&&(n.value="all"),t&&(t.value="");break}st(),ne()}function ne(){const e=document.getElementById("micSearch"),t=document.getElementById("dayFilter"),n=e?e.value.toLowerCase():"",a=t?t.value:"all";st(),Q=H.filter(o=>{const i=o.venue.toLowerCase().includes(n)||o.address&&o.address.toLowerCase().includes(n)||o.borough&&o.borough.toLowerCase().includes(n)||o.neighborhood&&o.neighborhood.toLowerCase().includes(n)||o.host&&o.host.toLowerCase().includes(n)||o.cost&&o.cost.toLowerCase().includes(n),s=a==="all"||o.day===a;return i&&s}),Le()}function Le(){const e=document.getElementById("micsList");if(!e)return;if(Q.length===0){e.innerHTML='<div style="padding: 2rem; text-align: center; color: var(--text-secondary);">No mics found. Try adjusting your filters.</div>';return}const a=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][new Date().getDay()];let o="";const i=Sn();i.length>0&&!z.search&&z.day==="all"&&(o+=`
            <div class="mic-section">
                <div class="mic-section-header">
                    <i class="fas fa-history"></i> Recently Used
                </div>
                ${i.map(l=>Te(l)).join("")}
            </div>
        `);const s=Q.filter(l=>l.day===a&&!i.includes(l)),r=Q.filter(l=>l.day!==a&&!i.includes(l));s.length>0&&(o+=`
            <div class="mic-section">
                <div class="mic-section-header">
                    <i class="fas fa-star"></i> Today's Mics
                </div>
                ${s.map(l=>Te(l)).join("")}
            </div>
        `),r.length>0&&(o+=`
            <div class="mic-section">
                <div class="mic-section-header">
                    <i class="fas fa-calendar-alt"></i> Other Days
                </div>
                ${r.map(l=>Te(l)).join("")}
            </div>
        `),e.innerHTML=o,wn()}function Te(e){return`
        <div class="mic-item" data-mic-id="${e.id}" role="button" tabindex="0" aria-label="Select ${e.venue}">
            <div class="mic-info">
                <div class="mic-venue">${e.venue}</div>
                <div class="mic-details">
                    <span><i class="fas fa-calendar-day"></i> ${e.day}</span>
                    <span><i class="fas fa-clock"></i> ${e.time}</span>
                    <span><i class="fas fa-dollar-sign"></i> ${e.cost}</span>
                    ${e.host?`<span><i class="fas fa-user"></i> ${e.host}</span>`:""}
                    ${e.borough?`<span><i class="fas fa-map-marker-alt"></i> ${e.borough}</span>`:""}
                    ${e.neighborhood?`<span><i class="fas fa-map-pin"></i> ${e.neighborhood}</span>`:""}
                </div>
                ${e.signupTime?`<div class="mic-details" style="margin-top: 0.25rem;"><span><i class="fas fa-clipboard-list"></i> ${e.signupTime}</span></div>`:""}
            </div>
            <div class="mic-select-indicator">
                <i class="fas fa-chevron-right"></i>
            </div>
        </div>
    `}function wn(){const e=document.getElementById("micsList");if(!e)return;e.removeEventListener("click",Ue),e.removeEventListener("keydown",He),e.addEventListener("click",Ue),e.addEventListener("keydown",He);const t=document.querySelector(".quick-filters");t&&(t.removeEventListener("click",ze),t.addEventListener("click",ze));const n=document.getElementById("micSearch"),a=document.getElementById("dayFilter");n&&(n.removeEventListener("input",ne),n.addEventListener("input",ne)),a&&(a.removeEventListener("change",ne),a.addEventListener("change",ne))}function Ue(e){const t=e.target.closest(".mic-item");if(t){const n=t.dataset.micId;rt(n)}}function He(e){if(e.key==="Enter"||e.key===" "){const t=e.target.closest(".mic-item");if(t){e.preventDefault();const n=t.dataset.micId;rt(n)}}}function ze(e){if(e.target.classList.contains("filter-chip")){const t=e.target.dataset.filter;In(t),document.querySelectorAll(".filter-chip").forEach(n=>n.classList.remove("active")),t!=="clear"&&e.target.classList.add("active")}}function rt(e){const t=H.find(I=>I.id===e);if(!t)return;En(e);const n=document.getElementById("mic-selection-modal");if(F(n),window.isSelectingMicForForm){const I=document.getElementById("venue");I&&(I.value=t.venue),window.isSelectingMicForForm=!1;const D=document.getElementById("add-edit-modal");D&&!D.classList.contains("is-visible")&&$(D);return}const o=document.getElementById("formTitle"),i=document.getElementById("setForm"),s=document.getElementById("setId");o&&(o.textContent="Log New Set from Mic"),i&&i.reset(),s&&(s.value="");const r=document.getElementById("venue");r&&(r.value=t.venue);const l=document.getElementById("event-title");l&&(l.value="Open Mic");const c=document.getElementById("event-type");c&&(c.value="green");const p=new Date,m=(["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].indexOf(t.day)-p.getDay()+7)%7,y=new Date(p);y.setDate(p.getDate()+(m===0?7:m));const f=document.getElementById("date");f&&(f.value=y.toISOString().split("T")[0]);const S=document.getElementById("notes");if(S){let I=`Added from Mic Finder.
`;t.host&&(I+=`Host: ${t.host}
`),t.cost&&(I+=`Cost: ${t.cost}
`),t.signupTime&&(I+=`Signup: ${t.signupTime}
`),t.address&&(I+=`Address: ${t.address}
`),S.value=I}const k=document.getElementById("add-edit-modal");k&&$(k),g(`Pre-filled form with ${t.venue} details!`)}function qe(e){document.querySelectorAll(".bottom-nav-item").forEach(o=>o.classList.remove("active"));const a={calendar:"calendarNavBtn",jokes:"jokesNavBtn",stats:"statsNavBtn",settings:"settingsNavBtn"}[e];if(a){const o=document.getElementById(a);o&&o.classList.add("active")}}function Tn(){const e=localStorage.getItem("jokeBankCollapsed")==="true",t=document.querySelector(".joke-bank-panel"),n=document.getElementById("jokeBankToggle"),a=document.getElementById("jokeBankCollapsible");e&&t&&n&&a?(t.classList.add("collapsed"),n.classList.remove("expanded"),a.classList.add("collapsed")):n&&n.classList.add("expanded")}function xn(){const e=document.querySelector(".joke-bank-panel"),t=document.getElementById("jokeBankToggle"),n=document.getElementById("jokeBankCollapsible");if(!e||!t||!n)return;e.classList.contains("collapsed")?(e.classList.remove("collapsed"),t.classList.add("expanded"),n.classList.remove("collapsed"),localStorage.setItem("jokeBankCollapsed","false")):(e.classList.add("collapsed"),t.classList.remove("expanded"),n.classList.add("collapsed"),localStorage.setItem("jokeBankCollapsed","true"))}document.addEventListener("DOMContentLoaded",()=>{new MutationObserver(t=>{t.forEach(n=>{n.addedNodes.forEach(a=>{a.nodeType===1&&(a.id==="setlistBuilder"||a.querySelector("#setlistBuilder"))&&setTimeout(()=>Tn(),100)})})}).observe(document.body,{childList:!0,subtree:!0})});let b=null;function lt(){const e=localStorage.getItem("hasCompletedOnboarding");ve(()=>M(this,null,function*(){const{dataStore:t}=yield Promise.resolve().then(()=>bt);return{dataStore:t}}),void 0,import.meta.url).then(({dataStore:t})=>{const n=t.getSetting("showOnboarding");!e&&n&&typeof Shepherd!="undefined"&&setTimeout(De,1e3)})}function De(){if(typeof Shepherd=="undefined"){console.warn("Shepherd.js not available for onboarding");return}b=new Shepherd.Tour({useModalOverlay:!0,defaultStepOptions:{classes:"shadow-md bg-purple-dark",scrollTo:!0,cancelIcon:{enabled:!0}}}),b.addStep({title:"Welcome to Mic Calendar! 🎤",text:`
            <p>Welcome to your comedy set tracking app! This tour will show you the key features to help you manage your performances effectively.</p>
            <p>Let's get started!</p>
        `,buttons:[{text:"Skip Tour",action:b.cancel,secondary:!0},{text:"Start Tour",action:b.next}]}),b.addStep({title:"Your Performance Calendar",text:"This is your main calendar view where you can see all your scheduled and past comedy sets. Each colored pill represents a different type of performance.",attachTo:{element:"#calendarGrid",on:"top"},buttons:[{text:"Back",action:b.back,secondary:!0},{text:"Next",action:b.next}]}),b.addStep({title:"Switch Views",text:"You can switch between Week, Month, and List views to see your sets in different formats. Try clicking these buttons!",attachTo:{element:".view-toggle",on:"bottom"},buttons:[{text:"Back",action:b.back,secondary:!0},{text:"Next",action:b.next}]}),b.addStep({title:"Log Your Sets",text:'Click "Add Set" to record a new comedy performance. You can add details like venue, date, setlist, and notes about how it went.',attachTo:{element:"#addSetBtn",on:"bottom"},buttons:[{text:"Back",action:b.back,secondary:!0},{text:"Next",action:b.next}]}),b.addStep({title:"Add from Mic Finder",text:'Use "Add Mic" to quickly add sets from our open mic database. This pre-fills venue information and saves you time.',attachTo:{element:"#addMicBtn",on:"bottom"},buttons:[{text:"Back",action:b.back,secondary:!0},{text:"Next",action:b.next}]}),b.addStep({title:"Search & Filter",text:"Use the search bar to find specific venues, jokes, or notes. Filter by performance type or use advanced filters for date ranges and joke counts.",attachTo:{element:"#venueSearch",on:"bottom"},buttons:[{text:"Back",action:b.back,secondary:!0},{text:"Next",action:b.next}]}),b.addStep({title:"Track Your Progress",text:"Click the Stats icon in the bottom navigation to see detailed analytics about your performances, top venues, and joke usage.",attachTo:{element:"#statsNavBtn",on:"top"},buttons:[{text:"Back",action:b.back,secondary:!0},{text:"Next",action:b.next}]}),b.addStep({title:"Pro Tips! ⚡",text:`
            <p><strong>Keyboard Shortcuts:</strong></p>
            <ul style="text-align: left; margin: 1rem 0;">
                <li><code>Ctrl+F</code> - Focus search</li>
                <li><code>Ctrl+T</code> - Go to today</li>
                <li><code>Ctrl+M</code> - Add mic</li>
                <li><code>1/2/3</code> - Switch views</li>
                <li><code>←/→</code> - Navigate weeks</li>
            </ul>
            <p><strong>Click any empty day to quickly add a set for that date!</strong></p>
        `,buttons:[{text:"Back",action:b.back,secondary:!0},{text:"Finish Tour",action:b.complete}]}),b.on("complete",()=>{localStorage.setItem("hasCompletedOnboarding","true"),g("Welcome aboard! You're ready to start tracking your comedy journey! 🎭","success")}),b.on("cancel",()=>{localStorage.setItem("hasCompletedOnboarding","true"),g("Tour skipped. You can restart it anytime from Settings!","info")}),b.start()}function Bn(){localStorage.removeItem("hasCompletedOnboarding"),De()}const Cn=Object.freeze(Object.defineProperty({__proto__:null,initializeOnboarding:lt,restartOnboardingTour:Bn,startOnboardingTour:De},Symbol.toStringTag,{value:"Module"}));document.addEventListener("DOMContentLoaded",()=>M(void 0,null,function*(){try{const e=T.validate();e.valid||T.log("error","Configuration validation failed",e.errors),e.warnings.length>0&&T.log("warn","Configuration warnings",e.warnings),yield T.measurePerformance("Data Loading",()=>M(void 0,null,function*(){d.load()})),yield T.measurePerformance("Data Migration V2",()=>M(void 0,null,function*(){d.runMigrationV2()}));const t=d.getSetting("theme")||T.get("UI.DEFAULT_THEME");t&&dt(t);const n=d.getSetting("defaultView")||T.get("UI.DEFAULT_VIEW");n&&ct(n),yield T.measurePerformance("Event Listeners Setup",()=>M(void 0,null,function*(){tn()})),yield T.measurePerformance("Initial Calendar Render",()=>M(void 0,null,function*(){x()})),T.isFeatureEnabled("ONBOARDING")&&lt(),T.log("info",`Mic Calendar v${T.get("VERSION")} initialized successfully!`),T.log("debug","Enabled features:",T.getEnabledFeatures()),window.dispatchEvent(new CustomEvent("micCalendarReady",{detail:{version:T.get("VERSION"),features:T.getEnabledFeatures()}}))}catch(e){T.log("error","Application initialization failed",e);const t=document.createElement("div");t.innerHTML=`
            <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                        background: var(--bg-surface); padding: 2rem; border-radius: 8px; 
                        border: 1px solid var(--accent-red); color: var(--text-primary); 
                        text-align: center; z-index: 10000;">
                <h3 style="color: var(--accent-red); margin-bottom: 1rem;">⚠️ Initialization Error</h3>
                <p>The application failed to start properly.</p>
                <p style="font-size: 0.9rem; color: var(--text-secondary);">Please refresh the page or contact support if the problem persists.</p>
                <button onclick="window.location.reload()" 
                        style="margin-top: 1rem; padding: 0.5rem 1rem; background: var(--accent-blue); 
                               color: white; border: none; border-radius: 4px; cursor: pointer;">
                    Refresh Page
                </button>
            </div>
        `,document.body.appendChild(t)}}));function dt(e){const t=document.documentElement;e==="light"?(t.style.setProperty("--bg-main","#ffffff"),t.style.setProperty("--bg-surface","#f8f9fa"),t.style.setProperty("--bg-surface-2","#e9ecef"),t.style.setProperty("--bg-input","#ffffff"),t.style.setProperty("--text-primary","#212529"),t.style.setProperty("--text-secondary","#6c757d"),t.style.setProperty("--border-color","#dee2e6")):(t.style.setProperty("--bg-main","#18191a"),t.style.setProperty("--bg-surface","#232533"),t.style.setProperty("--bg-surface-2","#3a3b3c"),t.style.setProperty("--bg-input","#2a2d3e"),t.style.setProperty("--text-primary","#e4e6eb"),t.style.setProperty("--text-secondary","#b0b3b8"),t.style.setProperty("--border-color","#3e4042"))}function ct(e){document.querySelector(".calendar-container")&&ve(()=>M(this,null,function*(){const{setExpandedView:n}=yield Promise.resolve().then(()=>Xe);return{setExpandedView:n}}),void 0,import.meta.url).then(({setExpandedView:n})=>{var a,o,i,s;switch(e){case"week":(a=document.getElementById("weekViewBtn"))==null||a.click();break;case"month":(o=document.getElementById("monthViewBtn"))==null||o.click();break;case"list":(i=document.getElementById("listViewBtn"))==null||i.click();break;default:(s=document.getElementById("weekViewBtn"))==null||s.click()}})}window.applyTheme=dt;window.applyDefaultView=ct;
