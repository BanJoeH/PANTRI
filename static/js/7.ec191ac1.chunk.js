(this["webpackJsonprecipeshoppinglist2.0"]=this["webpackJsonprecipeshoppinglist2.0"]||[]).push([[7],{439:function(e,t,n){"use strict";n(1),n(441);var a=n(2);t.a=function(e){var t=e.onClick,n=e.isGoogleSignIn,c=e.value,r=e.children;return Object(a.jsx)("button",{className:"".concat(n?"google-sign-in":""," custom-button"),onClick:t,value:c,children:r})}},440:function(e,t,n){"use strict";var a=n(51);function c(e,t){if(null==e)return{};var n,a,c=function(e,t){if(null==e)return{};var n,a,c={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(c[n]=e[n]);return c}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(c[n]=e[n])}return c}n(1),n(445);var r=n(2),i=["handleChange","label"];t.a=function(e){var t=e.handleChange,n=e.label,s=c(e,i);return Object(r.jsxs)("div",{className:"group",children:[Object(r.jsx)("input",Object(a.a)(Object(a.a)({onChange:t},s),{},{className:"form-input"})),n?Object(r.jsx)("label",{className:"".concat(s.value.length?"shrink":""," form-input-label"),children:n}):null]})}},441:function(e,t,n){},443:function(e,t,n){"use strict";n(1);var a=n(2);t.a=function(e){var t=e.children;return Object(a.jsx)("div",{className:"page fade-in",children:t})}},444:function(e,t,n){"use strict";n(1);var a=n(2);t.a=function(e){var t=e.children,n=e.title;return Object(a.jsxs)("div",{className:"page-header",children:[Object(a.jsx)("h2",{className:"title",children:n}),t]})}},445:function(e,t,n){},458:function(e,t,n){"use strict";n.r(t);var a=n(65),c=n(1),r=n(7),i=n(439),s=n(440),l=n(443),o=n(444),u=n(28),b=n(2);t.default=function(){var e=Object(c.useState)(""),t=Object(a.a)(e,2),n=t[0],h=t[1],f=Object(c.useState)(!1),j=Object(a.a)(f,2),d=j[0],p=j[1],O=Object(c.useState)({}),v=Object(a.a)(O,2),g=v[0],m=v[1],x=Object(r.g)();return Object(c.useEffect)((function(){"Check your inbox for password reset"===g&&setTimeout((function(){return x.push("/PANTRI/")}),3e3)}),[g,x]),Object(b.jsx)(l.a,{children:Object(b.jsxs)(o.a,{title:"Forgotten Password",children:[Object(b.jsx)(s.a,{name:"email",type:"email",handleChange:function(e){var t=e.target.value;h(t)},value:n,label:"email"}),d?Object(b.jsx)("div",{className:"error",children:g}):null,Object(b.jsxs)(i.a,{type:"button",onClick:function(e){var t;e.preventDefault(),t=n,u.a.sendPasswordResetEmail(t).then((function(){m("Check your inbox for password reset"),p(!0)})).catch((function(e){"auth/user-not-found"===e.code?m("Email not found! Check your spelling"):"auth/invalid-email"===e.code?m("Invalid email"):m(e.message),p(!0)}))},children:[" ","Reset Password"," "]})]})})}}}]);
//# sourceMappingURL=7.ec191ac1.chunk.js.map