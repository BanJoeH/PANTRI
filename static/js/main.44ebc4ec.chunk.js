(this["webpackJsonprecipeshoppinglist2.0"]=this["webpackJsonprecipeshoppinglist2.0"]||[]).push([[0],{37:function(e,t,n){},38:function(e,t,n){},46:function(e,t,n){},47:function(e,t,n){},48:function(e,t,n){},49:function(e,t,n){},50:function(e,t,n){},67:function(e,t,n){},68:function(e,t,n){},70:function(e,t,n){},74:function(e,t,n){"use strict";n.r(t);var i=n(0),c=n.n(i),r=n(19),a=n.n(r),s=(n(37),n(38),n(1));function l(){return Object(s.jsx)("div",{className:"footer",children:"Made by Joe"})}var d=n(18),o=n(3),u=n(15),j=n(6),b=n(11),p=n(4),h=n(14),f=JSON.parse(localStorage.getItem("storedShopping"))||[],O=Object(h.b)({name:"shoppingList",initialState:f,reducers:{shoppingListAdded:{reducer:function(e,t){e.unshift(t.payload)},prepare:function(e){return{payload:Object(p.a)(Object(p.a)({},e),{},{id:Math.random().toString(36).substr(2,9)})}}},shoppingListRemoved:function(e,t){return e.filter((function(e){return e.id!==t.payload}))},shoppingIngredientRemoved:function(e,t){var n=t.payload.split(" "),i=Object(j.a)(n,3),c=i[0],r=i[1],a=i[2],s=e.map((function(e){if(e.id===c){var t=e.ingredients.filter((function(e,t){return e+t!==r+a}));return e.ingredients=t,e}return e}));e=s}}}),m=O.actions,g=O.reducer,v=m.shoppingListAdded,x=m.shoppingListRemoved,N=m.shoppingIngredientRemoved,R=g,k=(n(46),function(e){var t=e.inputList,n=e.setInputList,c=e.label,r=function(){n([].concat(Object(u.a)(t),[{ingredient:"",ingredientRef:null}]))};return Object(i.useEffect)((function(){t[t.length-1].ingredientRef&&t[t.length-1].ingredientRef.focus()}),[t.length]),t.map((function(e,i){return Object(s.jsxs)("div",{className:"ingredient-input-group",children:[Object(s.jsxs)("div",{className:"group",children:[Object(s.jsx)("input",{name:"ingredient",label:c||"Ingredient",onChange:function(e){return function(e,i){var c=e.target,r=c.name,a=c.value,s=Object(u.a)(t);s[i][r]=a,n(s)}(e,i)},value:e.ingredient,onKeyDown:function(e){"Enter"===e.key&&r()},ref:function(t){return e.ingredientRef=t},autoComplete:"off",className:"form-input"}),c?Object(s.jsx)("label",{className:"".concat(e.ingredient.length?"shrink":""," form-input-label"),children:c}):null]}),Object(s.jsxs)("div",{className:"button-group",children:[t.length-1===i&&Object(s.jsx)("div",{className:"ingredient-button",children:Object(s.jsx)("button",{onClick:r,className:"add",children:"\u2715"})}),1!==t.length&&Object(s.jsx)("button",{onClick:function(){return function(e){var i=Object(u.a)(t);i.splice(e,1),n(i)}(i)},className:"ingredient-button delete",children:"\u2715"})]})]},i)}))}),S=function(e){var t=e.setOddBits,n=e.oddBits,c=Object(i.useState)(n.map((function(e){return{ingredient:e,ingredientRef:null}}))),r=Object(j.a)(c,2),a=r[0],l=r[1];return Object(i.useEffect)((function(){var e=a.map((function(e,t){return e.ingredient}));t(e)}),[a]),Object(s.jsxs)("article",{className:"card",children:[Object(s.jsx)("div",{className:"card-header",children:Object(s.jsx)("h2",{className:"card-title",children:"Odd Bits"})}),Object(s.jsx)("div",{className:"card-body ",children:Object(s.jsx)(k,{inputList:a,setInputList:l,label:"Odd bit"})})]})},C=(n(47),function(e){var t=e.onClick,n=e.value,i=e.children;return Object(s.jsx)("button",{className:"custom-button",onClick:t,value:n,children:i})}),y=(n(48),function(e){var t=e.recipeId,n=e.ingredients,i=e.pathname,c=e.ingredientButton;return n?Object(s.jsx)("div",{className:"ingredient-list",children:n.map((function(e,n){return Object(s.jsxs)("div",{className:"ingredient",children:[Object(s.jsx)("div",{htmlFor:e,className:"ingredient-text",children:e}),"/"===i?Object(s.jsx)("button",{className:"ingredient-button",onClick:c,name:t+" "+e+" "+n,value:e+n,children:"\u2715"}):Object(s.jsx)("div",{})]},t+e+n)}))}):null});n(49);var L=function(e){var t=e.recipe,n=e.button,i=e.ingredientButton,c=e.removeFromRecipes,r=e.editRecipe,a=window.location.pathname;return Object(s.jsxs)("article",{className:"card",children:[Object(s.jsxs)("div",{className:"card-header",children:[Object(s.jsx)("h2",{className:"card-title",children:t.name}),t.link?Object(s.jsx)("a",{className:"title-link",target:"_blank",rel:"noopener noreferrer",href:t.link,children:"Link"}):null,Object(s.jsxs)("div",{className:"card-header-buttons",children:["/recipes"===a?Object(s.jsx)("button",{value:t.id,onClick:r,className:"title-link",children:"Edit"}):null,Object(s.jsx)("button",{href:"#",value:t.id,onClick:function(e){return c(e)},className:" title-link",children:"\u2715"})]})]}),t.ingredients.length?Object(s.jsxs)("div",{className:"card-body",children:[Object(s.jsx)(y,{recipeId:t.id,ingredients:t.ingredients,pathname:a,ingredientButton:i}),Object(s.jsx)("button",{className:"card-button",onClick:n,value:t.id,children:"/"===a?"Done":"Add to Shopping List"})]}):null]})},B=n(31),w=n.n(B);n(50);var I=function(e){var t=e.recipes,n=e.removeFromRecipes,i=e.cardButton,c=e.editRecipeCardButton,r=e.ingredientButton,a={default:t.length<3?t.length:3,1400:2,1e3:1};return Object(s.jsx)("div",{className:"card-list fade-in",children:Object(s.jsx)(w.a,{breakpointCols:a,className:"masonry-grid",columnClassName:"masonry-grid_column",children:t.map((function(e){return Object(s.jsx)(L,{removeFromRecipes:n,recipe:e,button:i,editRecipe:c,ingredientButton:r},e.id)}))})})};var A=function(){var e=Object(b.c)((function(e){return e.shoppingList})),t=Object(b.b)(),n=Object(i.useState)(JSON.parse(localStorage.getItem("storedOdd"))||[""]),c=Object(j.a)(n,2),r=c[0],a=c[1];Object(i.useEffect)((function(){localStorage.setItem("storedOdd",JSON.stringify(r))}),[r]),Object(i.useEffect)((function(){localStorage.setItem("storedShopping",JSON.stringify(e))}),[e]);var l=e.map((function(e){return e.name})),d=function(n){n.preventDefault();var i=e.find((function(e){return e.id===n.target.value}));t(x(i.id))};return Object(s.jsxs)("div",{className:"page fade-in",children:[Object(s.jsxs)("div",{className:"page-header",children:[Object(s.jsx)("h2",{className:"title",children:"Shopping List"}),l.includes("Shopping List")||0===e.length?null:Object(s.jsx)(C,{value:"AddRecipe",onClick:function(n){n.preventDefault();var i=e.map((function(e,t){return e.ingredients})).flat().sort(),c=Object(u.a)(new Set(i)).map((function(e){return[e,i.filter((function(t){return t===e})).length]})).map((function(e,t){return[e[0]+"  X"+e[1]]}));t(v({id:"sort",name:"Shopping List",ingredients:c,link:""}))},children:"Sort shopping list"}),Object(s.jsx)(S,{setOddBits:a,oddBits:r})]}),0===e.length?Object(s.jsxs)("div",{className:"recipes-empty",children:[Object(s.jsx)("h2",{children:"No recipes in your shopping list."}),Object(s.jsx)("h2",{children:"Go to Recipes to add some!"})]}):Object(s.jsx)(I,{recipes:e,removeFromRecipes:d,cardButton:d,ingredientButton:function(e){e.preventDefault();var n=e.target.name;t(N(n))}})]})},E=n(13),D=n(21),J=n.n(D),F=function(e,t){D.store.addNotification({title:e,message:t,type:"success",insert:"bottom",container:"bottom-center",dismiss:{duration:2e3}})},M=JSON.parse(localStorage.getItem("storedRecipes"))||[],G=Object(h.b)({name:"recipes",initialState:M,reducers:{recipeAdded:function(e,t){e.push(t.payload)},recipeRemoved:function(e,t){return e.filter((function(e){return e.id!==t.payload}))},recipeEdited:function(e,t){return e.map((function(e){return e.id===t.payload.id?t.payload:e}))}}}),_=G.actions,K=G.reducer,X=_.recipeAdded,q=_.recipeRemoved,z=_.recipeEdited,H=K,P=n(32),Q=(n(67),function(e){var t=e.handleChange,n=e.label,i=Object(P.a)(e,["handleChange","label"]);return Object(s.jsxs)("div",{className:"group",children:[Object(s.jsx)("input",Object(p.a)(Object(p.a)({onChange:t},i),{},{className:"form-input"})),n?Object(s.jsx)("label",{className:"".concat(i.value.length?"shrink":""," form-input-label"),children:n}):null]})}),T=(n(68),function(e){var t=e.searchField,n=e.searchChange;return Object(s.jsx)("div",{className:"searchbox",children:Object(s.jsx)(Q,{type:"search",label:"Search Recipes",onChange:n,value:t})})}),U=function(){var e=Object(i.useState)({id:"",name:"",link:"",ingredients:[]}),t=Object(j.a)(e,2),n=t[0],c=t[1],r=Object(i.useState)([{ingredient:"",ingredientRef:null}]),a=Object(j.a)(r,2),l=a[0],d=a[1],o=Object(i.useState)(""),u=Object(j.a)(o,2),h=u[0],f=u[1],O=Object(b.c)((function(e){return e.recipes})),m=Object(b.b)();Object(i.useEffect)((function(){localStorage.setItem("storedRecipes",JSON.stringify(O))}),[O]);var g=function(e){c((function(t){return Object(p.a)(Object(p.a)({},t),{},Object(E.a)({},e.target.name,e.target.value))}))},x=O.filter((function(e){return e.name.toLowerCase().includes(h.toLowerCase())}));return Object(i.useEffect)((function(){c((function(e){return Object(p.a)(Object(p.a)({},e),{},{ingredients:l.map((function(e){return e.ingredient})).filter(Boolean)})}))}),[l]),Object(i.useEffect)((function(){var e=[];if(""===n.id)return[{ingredient:"",ingredientRef:null}];e=n.ingredients.map((function(e){return{ingredient:e,ingredientRef:null}})),d(e)}),[n.ingredients.length]),Object(s.jsxs)("div",{className:"page fade-in",children:[Object(s.jsxs)("div",{className:"page-header",children:[Object(s.jsx)("h2",{className:"title",children:"Recipe List"}),""===n.id?null:Object(s.jsxs)("article",{className:"card",children:[Object(s.jsx)("h2",{children:"Edit Recipe"}),Object(s.jsxs)("div",{className:"card-body",children:[Object(s.jsx)(Q,{name:"name",label:"Recipe Name",handleChange:g,value:n.name,autoComplete:"off"}),Object(s.jsx)(Q,{name:"link",label:"Link",handleChange:g,value:n.link,autoComplete:"off"}),Object(s.jsx)(k,{inputList:l,setInputList:d})]}),Object(s.jsx)(C,{value:"editRecipe",onClick:function(e){e.preventDefault(),console.log(e),m(z(n)),F(n.name,"edited"),c({id:"",name:"",link:"",ingredients:[]}),d([{ingredient:"",ingredientRef:null}])},children:"Done"})]}),Object(s.jsx)(T,{searchChange:function(e){f(e.target.value)},searchField:h})]}),x.length?Object(s.jsx)(I,{recipes:x,removeFromRecipes:function(e){if(e.preventDefault(),window.confirm("Are you sure you want to permanently delete this recipe?")){var t=e.target.value.split(" ")[0];m(q(t)),f("")}},cardButton:function(e){e.preventDefault();var t=e.target.value;O.find((function(e){e.id===t&&(m(v(e)),F(e.name,"Added to your shopping list"))})),f("")},editRecipeCardButton:function(e){e.preventDefault(),console.log(e);var t=O.find((function(t){return t.id===e.target.value}));c(t)}}):h.length?Object(s.jsx)("h2",{className:"title",children:"Recipe not found."}):Object(s.jsxs)("div",{className:"recipes-empty",children:[Object(s.jsx)("h2",{children:"No recipes in your recipe list."}),Object(s.jsx)("h2",{children:"Go to Add a recipe to add some!"})]})]})},V=function(){return Math.random().toString(36).substr(2,9)};var W=function(){var e=Object(i.useState)([{ingredient:"",ingredientRef:null}]),t=Object(j.a)(e,2),n=t[0],c=t[1],r=Object(i.useState)({id:V(),name:"",link:"",ingredients:[]}),a=Object(j.a)(r,2),l=a[0],d=a[1],o=Object(b.b)(),u=function(e){var t=e.target,n=t.name,i=t.value;d(Object(p.a)(Object(p.a)({},l),{},Object(E.a)({},n,i)))};return Object(i.useEffect)((function(){var e=n.map((function(e,t){return e.ingredient.toLowerCase()})).filter(Boolean);d(Object(p.a)(Object(p.a)({},l),{},{ingredients:e}))}),[n]),Object(s.jsx)("div",{className:"page fade-in",children:Object(s.jsxs)("div",{className:"page-header",children:[Object(s.jsx)("h2",{className:"title",children:"New Recipe"}),Object(s.jsxs)("div",{className:"card",children:[Object(s.jsx)("h3",{children:"Add a new recipe here"}),Object(s.jsx)(Q,{name:"name",label:"Recipe Name",handleChange:u,value:l.name}),Object(s.jsx)(Q,{name:"link",label:"Link",handleChange:u,value:l.link,autoComplete:"off"}),Object(s.jsx)(k,{inputList:n,setInputList:c}),Object(s.jsx)(C,{value:"AddRecipe",onClick:function(e){e.preventDefault(),o(X(l)),F(l.name,"Added to Recipes"),d({id:V(),name:"",link:"",ingredients:[]}),c([{ingredient:"",ingredientRef:null}])},children:"Add Recipe"})]}),Object(s.jsx)("div",{className:"center ph1 tc w-50-ns w-90"})]})})};n(69),n(70);function Y(){return Object(s.jsxs)("div",{className:"app fade-in",children:[Object(s.jsx)(J.a,{}),Object(s.jsxs)(d.a,{children:[Object(s.jsx)("header",{className:"app-header",children:Object(s.jsxs)("nav",{className:"nav",children:[Object(s.jsx)(d.b,{className:"nav-link",to:"/",children:"Shopping list"}),Object(s.jsx)(d.b,{className:"nav-link",to:"/recipes",children:"Recipes"}),Object(s.jsx)(d.b,{className:"nav-link",to:"/newrecipe",children:"Add a recipe"})]})}),Object(s.jsx)("div",{className:"body",children:Object(s.jsxs)(o.c,{children:[Object(s.jsx)(o.a,{path:"/recipes",children:Object(s.jsx)(U,{})}),Object(s.jsx)(o.a,{path:"/newrecipe",children:Object(s.jsx)(W,{})}),Object(s.jsx)(o.a,{path:"/",children:Object(s.jsx)(A,{})})]})})]}),Object(s.jsx)(l,{})]})}var Z=Object(h.a)({reducer:{recipes:H,shoppingList:R}});a.a.render(Object(s.jsx)(c.a.StrictMode,{children:Object(s.jsx)(b.a,{store:Z,children:Object(s.jsx)(Y,{})})}),document.getElementById("root"))}},[[74,1,2]]]);
//# sourceMappingURL=main.44ebc4ec.chunk.js.map