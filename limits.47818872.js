(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{4:function(t,e,r){"use strict";function n(t){return function(t){if(Array.isArray(t))return i(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return i(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return i(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}r.r(e),r.d(e,"limits",(function(){return o}));var o={daily:30,month:1e3};document.querySelector(".settings__item--limits").addEventListener("click",(function(){document.querySelector(".limits").classList.add("limits--active"),document.getElementById("day-limit").value=o.daily,document.getElementById("month-limit").value=o.month}));var a=document.querySelector(".limits__arrow");a.addEventListener("click",(function(){document.querySelector(".limits").classList.remove("limits--active"),o.daily=document.querySelector(".limits__input").value,n(document.querySelectorAll(".day__sum")).forEach((function(t){t.textContent>o.daily?t.classList.add("day__sum--red"):t.classList.remove("day__sum--red")}))}))}},[[4,0]]]);