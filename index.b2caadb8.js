!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){"use strict";function r(e){return function(e){if(Array.isArray(e))return o(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return o(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.r(t),n.d(t,"categories",(function(){return c}));var c={"Zakupy codzienne":"yellow01",Rachunki:"red01",Rozrywka:"red04"};document.querySelectorAll(".form__list").forEach((function(e){for(var t in c)e.innerHTML+='<option value="'.concat(t,'">').concat(t,"</option>")}));var i=document.querySelector(".button--settings"),a=document.querySelector(".settings__item--categories");i.addEventListener("click",(function(e){e.preventDefault(),document.querySelector(".settings").classList.add("settings--active")}));a.addEventListener("click",(function(){document.querySelector(".categories").classList.add("categories--active"),function(){var e=document.querySelector(".categories__list");for(var t in e.innerHTML="",c)e.innerHTML+='<li><p class="categories__item">'.concat(t,"</p></li>")}()}));var u,l=document.querySelector(".categories__list");l.addEventListener("click",(function(e){if(e.target.classList.contains("categories__item")){var t=e.target.innerHTML;!function(e){document.querySelector(".category__name").innerHTML=e}(t),function(e){var t=c[e];document.getElementById(t).checked=!0}(t),r(document.querySelectorAll(".colors__input")).forEach((function(e){for(var t in e.disabled=!1,c)c[t]!==e.id||e.checked||(e.disabled=!0)})),u=t,document.querySelector(".category").classList.toggle("category--active")}}));var s=document.querySelector(".settings__arrow"),d=document.querySelector(".categories__arrow"),f=document.querySelector(".category__arrow");s.addEventListener("click",(function(){document.querySelector(".settings").classList.toggle("settings--active")})),f.addEventListener("click",(function(){document.querySelector(".category").classList.toggle("category--active")})),d.addEventListener("click",(function(){document.querySelector(".categories").classList.toggle("categories--active")}));var m=document.querySelector(".category");m.addEventListener("click",(function(e){if(e.target.classList.contains("colors__input")){var t=c[u],n=e.target.id;!function(e){c[u]=e}(n),function(e,t){r(document.querySelectorAll(".item--".concat(e))).forEach((function(n){n.classList.remove("item--".concat(e)),n.classList.add("item--".concat(t))}))}(t,n)}}))},function(e,t){},function(e,t,n){"use strict";n.r(t);n(3);var r=n(0);n(1);function o(e){return function(e){if(Array.isArray(e))return a(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||i(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,o=!1,c=void 0;try{for(var i,a=e[Symbol.iterator]();!(r=(i=a.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){o=!0,c=e}finally{try{r||null==a.return||a.return()}finally{if(o)throw c}}return n}(e,t)||i(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e,t){if(e){if("string"==typeof e)return a(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(e,t):void 0}}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var u=document.querySelector(".form-button--add"),l=document.querySelector(".form-button--delete"),s=document.querySelector(".form-button--save"),d=document.querySelector(".navigation__button--add"),f=document.querySelector(".add"),m=document.querySelector(".edit");d.addEventListener("click",(function(){f.classList.add("add--active")}));var y={},v=function e(t,n,r,o){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.date=t,this.category=n,this.name=r,this.price=o},p=function(e){var t=document.getElementById(e);t.innerHTML="";for(var n=y[e],o=0;o<y[e].length;o++){var c=n[o].category;t.innerHTML+='<li id="'.concat(o,'" class="day__item item item--').concat(r.categories[c],'">\n                                    <p class="item__content item__content--category">').concat(n[o].category,'</p>\n                                    <p class="item__content item__content--price">').concat(n[o].price,'</p>\n                                    <p class="item__content item__content--name">').concat(n[o].name,"</p>\n                                </li>")}},g=function(e){var t=0;for(var n in e)e[n].forEach((function(e){t+=Number(e.price)}));return t},_=function(e){document.querySelector(".info__sum").innerHTML=e},b=function(e,t,n,r){(function(e){return!!y[e]})(e)||function(e){document.querySelector(".content__list").innerHTML+='<li class="day">\n                            <div class="day__container">\n                                <h3 class="day__title">'.concat(e,'</h3>\n                                <ul  id="').concat(e,'" class="day__items">\n                                </ul>\n                            </div>\n                        </li>'),y[e]=[]}(e),y[e].push(new v(e,t,n,r)),p(e);var o=g(y);_(o)},S=[],h=function(){var e,t=c(S,3),n=(t[0],t[1]),r=t[2];y[n].splice(r,1),y[e=n].length?p(e):(delete y[e],document.getElementById(e).parentElement.parentElement.remove());var o=g(y);_(o)};u.addEventListener("click",(function(){var e=o(document.querySelectorAll(".form__input--add")),t=c(e.map((function(e){return e.value})),4),n=t[0],r=t[1],i=t[2],a=t[3];b(n,r,i,a),e.forEach((function(e){return e.value=""})),f.classList.remove("add--active")})),document.addEventListener("click",(function(e){var t,n,r,i,a,u,l,s,d,f;e.target.classList.contains("item__content")&&(d=(s=e).target.parentElement.parentElement.id,f=s.target.parentElement.id,S=[y[d][f],d,f],t=c(S,3),n=t[0],t[1],t[2],r=c(o(document.querySelectorAll(".form__input--edit")),4),i=r[0],a=r[1],u=r[2],l=r[3],i.value=n.date,a.value=n.category,u.value=n.name,l.value=n.price,m.classList.add("edit--active"))})),s.addEventListener("click",(function(){!function(){h();var e=c(o(document.querySelectorAll(".form__input--edit")).map((function(e){return e.value})),4),t=e[0],n=e[1],r=e[2],i=e[3];b(t,n,r,i)}(),m.classList.remove("edit--active")})),l.addEventListener("click",(function(){h(),m.classList.remove("edit--active")})),b("2021-02-01","Zakupy codzienne","Biedronka",154),b("2021-02-01","Rachunki","Prąd",120),b("2021-02-03","Rozrywka","Kino",24)},function(e,t,n){}]);