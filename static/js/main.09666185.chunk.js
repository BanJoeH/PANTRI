(this["webpackJsonprecipeshoppinglist2.0"]=this["webpackJsonprecipeshoppinglist2.0"]||[]).push([[0],{146:function(A,e,t){"use strict";t.d(e,"b",(function(){return s})),t.d(e,"c",(function(){return a})),t.d(e,"a",(function(){return r}));var n=t(66),c=t(1),i=t(94),s=function(A,e,t){i.store.addNotification({title:A,message:e,type:t,insert:"bottom",container:"bottom-center",dismiss:{duration:2e3}})},a=function(){var A=Object(c.useState)({width:void 0,height:void 0}),e=Object(n.a)(A,2),t=e[0],i=e[1];return Object(c.useEffect)((function(){function A(){i({width:window.innerWidth,height:window.innerHeight})}return window.addEventListener("resize",A),A(),function(){return window.removeEventListener("resize",A)}}),[]),t},r=function(A,e){return e.filter((function(e){return e.id===A}))[0]}},227:function(A,e,t){},29:function(A,e,t){"use strict";t.d(e,"c",(function(){return u})),t.d(e,"b",(function(){return d})),t.d(e,"a",(function(){return g}));var n=t(40),c=t.n(n),i=t(53),s=t(67),a=t(25),r=(t(443),t(237),t(51)),o=t(93),l={userProfile:"users",useFirestoreForProfile:!0,onAuthStateChanged:function(A,e,t){A||t({type:r.actionTypes.CLEAR_DATA})}},u={firebase:a.a,config:l,dispatch:o.a.dispatch,createFirestoreInstance:r.createFirestoreInstance},d=function(){var A=Object(s.a)(c.a.mark((function A(e,t){var n,s,a;return c.a.wrap((function(A){for(;;)switch(A.prev=A.next){case 0:if(e){A.next=2;break}return A.abrupt("return");case 2:return n=h.doc("users/".concat(e.uid)),A.next=5,n.get();case 5:if(A.sent.exists){A.next=16;break}return s=e.displayName,a=e.email,A.prev=8,A.next=11,n.set(Object(i.a)({displayName:s,email:a},t));case 11:A.next=16;break;case 13:A.prev=13,A.t0=A.catch(8),console.log("error creating user",A.t0.message);case 16:return A.abrupt("return",n);case 17:case"end":return A.stop()}}),A,null,[[8,13]])})));return function(e,t){return A.apply(this,arguments)}}();a.a.initializeApp({apiKey:"AIzaSyBBougi-iecxqTOOD2iahFN-yUfG5tKEMo",authDomain:"pantri-128f4.firebaseapp.com",projectId:"pantri-128f4",storageBucket:"pantri-128f4.appspot.com",messagingSenderId:"480125689887",appId:"1:480125689887:web:8603482672c1217834752a",measurementId:"G-5RVBRNC8RQ"});a.a.firestore().enablePersistence().catch((function(A){("failed-precondition"===A.code||"unimplemented"===A.code)&&console.log(A)})),a.a.auth().setPersistence(a.a.auth.Auth.Persistence.LOCAL);var g=a.a.auth(),h=a.a.firestore(),j=new a.a.auth.GoogleAuthProvider;j.setCustomParameters({prompt:"select_account"});a.a},418:function(A,e,t){},439:function(A,e,t){},440:function(A,e,t){},441:function(A,e,t){},442:function(A,e,t){"use strict";t.r(e);var n=t(53),c=t(1),i=t.n(c),s=t(92),a=t.n(s),r=(t(227),t(228),t(40)),o=t.n(r),l=t(67),u=t(66),d=t(26),g=t(7),h=t(29),j=t(52),b=t.n(j),f=Object(c.createContext)({showMenu:!1,toggleBurgerMenu:function(){}}),p=t.p+"static/media/P Pantri white.4f814cd3.png",O=(t(418),t(2)),w=function(){var A=Object(d.b)((function(A){return A.firebase.auth})).isEmpty,e=Object(g.g)(),t=Object(c.useContext)(j.MenuContext).toggleMenu,n=Object(c.useContext)(f),i=function(A,t){A.preventDefault(),e.push(t)};return Object(O.jsx)("header",{className:"slide-in-menu",onClick:function(A){A.preventDefault(),t(),n.toggleBurgerMenu()},children:Object(O.jsxs)("nav",{className:"slide-in-nav",children:[Object(O.jsx)("div",{className:"slide-in-nav-group",children:Object(O.jsx)("img",{src:p,alt:"logo",className:"logo",width:"250",height:"80"})}),Object(O.jsxs)("div",{className:"slide-in-nav-group",children:[Object(O.jsx)("div",{className:"nav-link",onClick:function(A){return i(A,"/PANTRI/shoppingList")},children:"Shopping list"}),Object(O.jsx)("div",{className:"nav-link",onClick:function(A){return i(A,"/PANTRI/recipes")},children:"Recipes"})]}),Object(O.jsxs)("div",{className:"slide-in-nav-group",children:[A?Object(O.jsx)("div",{className:"nav-link",onClick:function(A){return i(A,"/PANTRI/")},children:"Sign In"}):Object(O.jsx)("div",{className:"nav-link",onClick:function(){return h.a.signOut()},children:"Sign Out"}),Object(O.jsx)("div",{className:"nav-link",onClick:function(A){return i(A,"/PANTRI/contact")},children:"Contact Us"})]})]})})},m=t(94),v=t.n(m),D=t(221),I=t.n(D),x=t(146),C=t(31),k=(t(439),function(){var A=Object(d.b)((function(A){return A.firebase.auth})).isEmpty,e=Object(x.c)(),t=Object(c.useContext)(j.MenuContext).toggleMenu,n=Object(c.useContext)(f);return Object(O.jsx)("header",{className:"app-header",children:e.width>575?Object(O.jsxs)("nav",{className:"nav",children:[Object(O.jsx)("img",{src:p,alt:"logo",className:"logo",width:"250",height:"80"}),Object(O.jsxs)("div",{className:"nav-group",children:[Object(O.jsx)(C.b,{className:"nav-link",to:"/PANTRI/shoppingList",children:"Shopping list"}),Object(O.jsx)(C.b,{className:"nav-link",to:"/PANTRI/recipes",children:"Recipes"}),Object(O.jsx)(C.b,{className:"nav-link",to:"/PANTRI/contact",children:"Contact"}),A?Object(O.jsx)(C.b,{className:"nav-link",to:"/PANTRI/",children:"Sign In"}):Object(O.jsx)("div",{className:"nav-link",onClick:function(){return h.a.signOut()},children:"Sign Out"})]})]}):Object(O.jsxs)("div",{className:"small-screen",children:[Object(O.jsx)("img",{src:p,alt:"logo",className:"logo",width:"250",height:"80"}),Object(O.jsxs)("div",{className:"burger-container",onClick:function(A){A.preventDefault(),n.toggleBurgerMenu(),t()},children:[Object(O.jsx)("div",{className:n.showMenu?"bar1 change":"bar1"}),Object(O.jsx)("div",{className:n.showMenu?"bar2 change":"bar2"}),Object(O.jsx)("div",{className:n.showMenu?"bar3 change":"bar3"})]})]})})}),N=t.p+"static/media/github.a855c397.png",Q=(t(440),function(){return Object(O.jsx)("div",{className:"footer",children:Object(O.jsxs)("ul",{className:"social-section",children:[Object(O.jsx)("li",{className:"social github",children:Object(O.jsx)("a",{href:"https://github.com/BanJoeH/",children:Object(O.jsx)("img",{src:N,alt:"gitHub link",width:"30",height:"30"})})}),Object(O.jsx)("li",{className:"nav-link",children:Object(O.jsx)("a",{href:"https://joescript.io",className:"social",children:"Made by Joe"})}),Object(O.jsx)("li",{className:"social",children:Object(O.jsx)("a",{href:"https://www.linkedin.com/in/joescript/",children:Object(O.jsx)("img",{src:"data:image/png;base64,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",alt:"LinkedIn link",width:"30",height:"30"})})})]})})}),B=(t(441),Object(c.lazy)((function(){return t.e(4).then(t.bind(null,466))}))),y=Object(c.lazy)((function(){return t.e(3).then(t.bind(null,465))})),G=Object(c.lazy)((function(){return t.e(5).then(t.bind(null,467))})),P=Object(c.lazy)((function(){return t.e(7).then(t.bind(null,463))})),M=Object(c.lazy)((function(){return t.e(6).then(t.bind(null,464))}));function R(){var A=Object(c.useState)(!1),e=Object(u.a)(A,2),t=e[0],n=e[1],i=Object(d.b)((function(A){return A.firebase.auth.isLoaded}));Object(c.useEffect)((function(){var A=h.a.onAuthStateChanged(function(){var A=Object(l.a)(o.a.mark((function A(e){return o.a.wrap((function(A){for(;;)switch(A.prev=A.next){case 0:if(!e){A.next=5;break}return A.next=3,Object(h.b)(e);case 3:A.sent.onSnapshot();case 5:case"end":return A.stop()}}),A)})));return function(e){return A.apply(this,arguments)}}());return function(){A()}}),[]);var s=Object(d.b)((function(A){return A.firebase.auth})).isEmpty;return i&&Object(O.jsx)(f.Provider,{value:{showMenu:t,toggleBurgerMenu:function(){n(!t)}},children:Object(O.jsx)(b.a,{MenuComponent:w,width:"80vw",children:Object(O.jsxs)("div",{className:"app",children:[Object(O.jsx)(v.a,{}),Object(O.jsx)(k,{}),Object(O.jsx)("div",{className:"body",children:Object(O.jsxs)(g.d,{children:[Object(O.jsx)(g.b,{path:"/PANTRI/recipes",children:s?Object(O.jsx)(g.a,{to:"/PANTRI/"}):Object(O.jsx)(c.Suspense,{fallback:Object(O.jsx)("div",{children:"...loading"}),children:Object(O.jsx)(y,{})})}),Object(O.jsx)(g.b,{path:"/PANTRI/shoppingList",children:s?Object(O.jsx)(g.a,{to:"/PANTRI/"}):Object(O.jsx)(c.Suspense,{fallback:Object(O.jsx)("div",{children:"...loading"}),children:Object(O.jsx)(B,{})})}),Object(O.jsxs)(c.Suspense,{fallback:Object(O.jsx)("div",{children:"...loading"}),children:[Object(O.jsx)(g.b,{exact:!0,path:"/PANTRI/",component:G}),Object(O.jsx)(g.b,{path:"/PANTRI/forgotpassword",component:P}),Object(O.jsx)(g.b,{path:"/PANTRI/contact",component:M})]})]})}),Object(O.jsx)(I.a,{location:"bottom",buttonText:"Gimmie dem cookies",style:{padding:"5px"},children:"We use cookies to store your recipes to save data usage!"}),Object(O.jsx)(Q,{})]})})})}var Y=t(93),U=t(68),E=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function T(A,e){navigator.serviceWorker.register(A).then((function(A){A.onupdatefound=function(){var t=A.installing;null!=t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),e&&e.onUpdate&&e.onUpdate(A)):(console.log("Content is cached for offline use."),e&&e.onSuccess&&e.onSuccess(A)))})}})).catch((function(A){console.error("Error during service worker registration:",A)}))}a.a.render(Object(O.jsx)(i.a.StrictMode,{children:Object(O.jsx)(d.a,{store:Y.a,children:Object(O.jsx)(U.ReactReduxFirebaseProvider,Object(n.a)(Object(n.a)({},h.c),{},{children:Object(O.jsx)(C.a,{children:Object(O.jsx)(R,{})})}))})}),document.getElementById("root")),function(A){if("serviceWorker"in navigator){if(new URL("/PANTRI",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var e="".concat("/PANTRI","/service-worker.js");E?(!function(A,e){fetch(A,{headers:{"Service-Worker":"script"}}).then((function(t){var n=t.headers.get("content-type");404===t.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then((function(A){A.unregister().then((function(){window.location.reload()}))})):T(A,e)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(e,A),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):T(e,A)}))}}()},93:function(A,e,t){"use strict";var n=t(222),c=t(68),i=t(51),s=Object(n.a)({reducer:{firebase:c.firebaseReducer,firestore:i.firestoreReducer}});e.a=s}},[[442,1,2]]]);
//# sourceMappingURL=main.09666185.chunk.js.map