!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){"use strict";n.r(t),n.d(t,"receipts",(function(){return _})),n.d(t,"reloadDateSumColor",(function(){return g}));n(3);var r=n(1),o=n(2);function c(e){return function(e){if(Array.isArray(e))return u(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||a(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,o=!1,c=void 0;try{for(var i,a=e[Symbol.iterator]();!(r=(i=a.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){o=!0,c=e}finally{try{r||null==a.return||a.return()}finally{if(o)throw c}}return n}(e,t)||a(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e,t){if(e){if("string"==typeof e)return u(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?u(e,t):void 0}}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var l=document.querySelector(".form-button--add"),s=document.querySelector(".form-button--delete"),d=document.querySelector(".form-button--save"),m=document.querySelector(".navigation__button--add"),f=document.querySelector(".add"),y=document.querySelector(".edit"),v=document.querySelector(".button--settings");m.addEventListener("click",(function(){f.classList.add("add--active")}));var _={},p=function e(t,n,r,o){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.date=t,this.category=n,this.name=r,this.price=o},g=function(e){e.textContent>o.limits.daily?e.classList.add("day__sum--red"):e.classList.remove("day__sum--red")},S=function(e){var t=document.getElementById(e),n=t.querySelector(".day__items");n.innerHTML="";for(var o=_[e],c=0,i=0;i<_[e].length;i++){var a=o[i].category;n.innerHTML+='<li id="'.concat(i,'" class="day__item item item--').concat(r.categories[a],'">\n                                    <p class="item__content item__content--category">').concat(o[i].category,'</p>\n                                    <p class="item__content item__content--price">').concat(o[i].price,'</p>\n                                    <p class="item__content item__content--name">').concat(o[i].name,"</p>\n                                </li>"),c+=Number(o[i].price)}var u=t.querySelector(".day__sum");u.textContent=c,g(u)},b=function(e){var t=0;for(var n in e)e[n].forEach((function(e){t+=Number(e.price)}));return t},L=function(e){document.querySelector(".info__sum").innerHTML=e},h=function(e,t,n,r){(function(e){return!!_[e]})(e)||function(e){document.querySelector(".content__list").innerHTML+='<li id="'.concat(e,'" class="day">\n                            <div class="day__container">\n                            <div class="day__header">\n                                <h3 class="day__title">').concat(e,'</h3>\n                                <p class="day__sum day__sum--red">0</p>\n                            </div>\n                            <ul class="day__items">\n                            </ul>\n                            </div>\n                        </li>'),_[e]=[]}(e),_[e].push(new p(e,t,n,r)),S(e);var o=b(_);L(o)},q=[],E=function(){var e,t=i(q,3),n=(t[0],t[1]),r=t[2];_[n].splice(r,1),_[e=n].length?S(e):(delete _[e],document.getElementById(e).remove());var o=b(_);L(o)};l.addEventListener("click",(function(){var e=c(document.querySelectorAll(".form__input--add")),t=i(e.map((function(e){return e.value})),4),n=t[0],r=t[1],o=t[2],a=t[3];h(n,r,o,a),e.forEach((function(e){return e.value=""})),f.classList.remove("add--active")})),document.addEventListener("click",(function(e){var t,n,r,o,a,u,l,s,d,m;e.target.classList.contains("item__content")&&(d=(s=e).target.parentElement.parentElement.parentElement.parentElement.id,m=s.target.parentElement.id,q=[_[d][m],d,m],t=i(q,3),n=t[0],t[1],t[2],r=i(c(document.querySelectorAll(".form__input--edit")),4),o=r[0],a=r[1],u=r[2],l=r[3],o.value=n.date,a.value=n.category,u.value=n.name,l.value=n.price,y.classList.add("edit--active"))})),d.addEventListener("click",(function(){!function(){E();var e=i(c(document.querySelectorAll(".form__input--edit")).map((function(e){return e.value})),4),t=e[0],n=e[1],r=e[2],o=e[3];h(t,n,r,o)}(),y.classList.remove("edit--active")})),s.addEventListener("click",(function(){E(),y.classList.remove("edit--active")})),v.addEventListener("click",(function(e){e.preventDefault(),document.querySelector(".settings").classList.add("settings--active")})),h("2021-02-01","Zakupy codzienne","Biedronka",154),h("2021-02-01","Rachunki","Prąd",120),h("2021-02-03","Rozrywka","Kino",24)},function(e,t,n){"use strict";function r(e){return function(e){if(Array.isArray(e))return o(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return o(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.r(t),n.d(t,"categories",(function(){return c}));var c={"Zakupy codzienne":"yellow01",Rachunki:"red01",Rozrywka:"red04"};document.querySelectorAll(".form__list").forEach((function(e){for(var t in c)e.innerHTML+='<option value="'.concat(t,'">').concat(t,"</option>")}));var i=document.querySelector(".settings__item--categories");i.addEventListener("click",(function(){document.querySelector(".categories").classList.add("categories--active"),function(){var e=document.querySelector(".categories__list");for(var t in e.innerHTML="",c)e.innerHTML+='<li><p class="categories__item">'.concat(t,"</p></li>")}()}));var a,u=document.querySelector(".categories__list");u.addEventListener("click",(function(e){if(e.target.classList.contains("categories__item")){var t=e.target.innerHTML;!function(e){document.querySelector(".category__name").innerHTML=e}(t),function(e){var t=c[e];document.getElementById(t).checked=!0}(t),r(document.querySelectorAll(".colors__input")).forEach((function(e){for(var t in e.disabled=!1,c)c[t]!==e.id||e.checked||(e.disabled=!0)})),a=t,document.querySelector(".category").classList.toggle("category--active")}}));var l=document.querySelector(".settings__arrow"),s=document.querySelector(".categories__arrow"),d=document.querySelector(".category__arrow");l.addEventListener("click",(function(){document.querySelector(".settings").classList.toggle("settings--active")})),d.addEventListener("click",(function(){document.querySelector(".category").classList.toggle("category--active")})),s.addEventListener("click",(function(){document.querySelector(".categories").classList.toggle("categories--active")}));var m=document.querySelector(".category");m.addEventListener("click",(function(e){if(e.target.classList.contains("colors__input")){var t=c[a],n=e.target.id;!function(e){c[a]=e}(n),function(e,t){r(document.querySelectorAll(".item--".concat(e))).forEach((function(n){n.classList.remove("item--".concat(e)),n.classList.add("item--".concat(t))}))}(t,n)}}))},function(e,t,n){"use strict";n.r(t),n.d(t,"limits",(function(){return o}));var r=n(0),o={daily:30};document.querySelector(".settings__item--limits").addEventListener("click",(function(){document.querySelector(".limits").classList.add("limits--active"),document.querySelector(".limits__input").value=o.daily}));var c=document.querySelector(".limits__arrow");c.addEventListener("click",(function(){document.querySelector(".limits").classList.remove("limits--active"),o.daily=document.querySelector(".limits__input").value,function(){for(var e in r.receipts){var t=document.getElementById(e).querySelector(".day__sum");Object(r.reloadDateSumColor)(t)}}()}))},function(e,t,n){}]);