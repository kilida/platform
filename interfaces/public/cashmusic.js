// cashmusic.js v4 | (c) 2015 CASH Music | http://cashmusic.github.io/cashmusic.js/ | https://github.com/cashmusic/cashmusic.js/blob/master/LICENSE
window.cashmusic=function(){var h;null!=window.cashmusic?h=window.cashmusic:(h={embeds:{whitelist:"",all:[]},get:{},loaded:!1,soundplayer:!1,lightbox:!1,options:"",path:"",templates:{},eventlist:{},storage:{},embedded:!1,geo:!1,_init:function(){var a=window.cashmusic;a.scriptElement=document.querySelector('script[src$="cashmusic.js"]');a.scriptElement&&(a.path=a.scriptElement.src.substr(0,a.scriptElement.src.length-12));a.options=String(a.scriptElement.getAttribute("data-options"));-1!==this.options.indexOf("lightboxvideo")&&
a.loadScript(a.path+"lightbox/lightbox.js");0<document.querySelectorAll("a.cashmusic.soundplayer,div.cashmusic.soundplayer").length&&a.loadScript(a.path+"soundplayer/soundplayer.js");self!==top&&a._initEmbed();a.events.add(window,"message",function(b){-1!==a.embeds.whitelist.indexOf(b.origin)&&a._handleMessage(b)});a.embeds.whitelist+=window.location.href.split("/").slice(0,3).join("/");if(window.location.search){a.get.qs=window.location.search.substring(1);a.get.params={};for(var b,c=a.get.qs.split("&"),
d=0;d<c.length;d++)b=c[d].split("="),a.get.params[b[0]]=b[1]}if(a.embedded)a.loaded=Date.now(),a._drawQueuedEmbeds(),a.events.fire(a,"ready",a.loaded);else{a.get.qs&&-1!==a.get.qs.indexOf("element_id")&&window.history&&history.pushState&&history.pushState(null,null,window.location.href.split("?")[0]);-1===this.options.indexOf("nowrap")&&a.overlay.create();var e=0,d=setInterval(function(){25>e&&!a.geo?e++:(a.loaded=Date.now(),a._drawQueuedEmbeds(),clearInterval(d),a.events.fire(a,"ready",a.loaded))},
100)}},_drawQueuedEmbeds:function(){var a=window.cashmusic;"object"==typeof a.storage.elementQueue&&a.storage.elementQueue.forEach(function(b){a.embed(b[0],b[1],b[2],b[3],b[4],b[5])})},_initEmbed:function(){var a=window.cashmusic;a.embedded=!0;var b=document.querySelector("div.cashmusic.element");b&&(a.storage.embedheight=a.measure.scrollheight(),a.events.fire(a,"resize",a.storage.embedheight),b=b.className.split(" "),a.events.fire(a,"identify",[b[2],b[3].substr(3)]),window.setInterval(function(){var b=
a.measure.scrollheight();b!=a.storage.embedheight&&(a.storage.embedheight=b,a.events.fire(a,"resize",b))},250),(b=a.getQueryVariable("cssoverride"))&&a.styles.injectCSS(b,!0));for(var b=document.getElementsByTagName("form"),c=0;c<b.length;c++){var d=document.createElement("input");d.setAttribute("type","hidden");d.setAttribute("name","embedded_element");d.setAttribute("value","1");b[c].appendChild(d)}},_handleMessage:function(a){for(var b=window.cashmusic,c=JSON.parse(a.data),d,e=0;e<b.embeds.all.length;e++)if(b.embeds.all[e].el.contentWindow===
a.source){d=b.embeds.all[e];break}e=c.data;switch(c.type){case "resize":d.el.height=e;d.el.style.height=e+"px";break;case "identify":d.id==e[1]&&(d.type=e[0]);break;case "stripetokenrequested":b.stripe.generateToken(e,a.source);break;case "stripetoken":b.events.fire(b,"stripetokengenerated",e);break;case "overlayreveal":b.overlay.reveal(e.innerContent,e.wrapClass);b.events.fire(b,"overlayopened","");break;case "addoverlaytrigger":b.overlay.addOverlayTrigger(e.content,e.classname,e.ref);break;case "injectcss":b.styles.injectCSS(e.css,
e.important);break;case "addclass":b.styles.addClass(e.el,e.classname);break;case "removeclass":b.styles.removeClass(e.el,e.classname);break;case "swapclasses":b.styles.swapClasses(e.el,e.oldclass,e.newclass);break;case "sessionstarted":b.session.setid(e)}},contentLoaded:function(a){var b=!1,c=!0,d=window.document,e=d.documentElement,f=function(c){if("readystatechange"!=c.type||"complete"==d.readyState)h.events.remove("load"==c.type?window:d,c.type,f),!b&&(b=!0)&&a.call(window,c.type||c)},g=function(){try{e.doScroll("left")}catch(a){setTimeout(g,
50);return}f("poll")};if("complete"==d.readyState)a.call(window,"lazy");else{if(d.createEventObject&&e.doScroll){try{c=!window.frameElement}catch(n){}c&&g()}this.events.add(d,"DOMContentLoaded",f);this.events.add(d,"readystatechange",f);this.events.add(d,"load",f)}},embed:function(a,b,c,d,e,f){var g=window.cashmusic;if(!e)var h=document.querySelectorAll("script"),k=h[h.length-1];if(g.loaded){"object"===typeof a&&(b=a.elementid?a.elementid:!1,c=a.lightboxed?a.lightboxed:!1,d=a.lightboxtxt?a.lightboxtxt:
!1,e=a.targetnode?a.targetnode:!1,f=a.cssoverride?a.cssoverride:!1,a=a.endpoint);var k="string"===typeof e?document.querySelector(e):e,m=g.buildEmbedIframe(a,b,f);if(k)if(c){var l=document.createElement("span");l.className="cashmusic embed link";d||(d="open element");g.overlay.create(function(){var a=document.createElement("a");a.href="";a.target="_blank";a.innerHTML=d;l.appendChild(a);k.parentNode.insertBefore(l,k);(function(){g.events.add(a,"click",function(a){g.overlay.reveal(m);a.preventDefault();
return!1})})()})}else k.parentNode.insertBefore(m,k)}else"object"!==typeof g.storage.elementQueue&&(g.storage.elementQueue=[]),"object"===typeof a?a.targetnode||(a.targetnode=k,arguments[0]=a):arguments[4]=k,g.storage.elementQueue.push(arguments)},buildEmbedIframe:function(a,b,c,d){var e=window.cashmusic,f=a.replace(/\/$/,"")+"/request/embed/"+b+"?location="+encodeURIComponent(window.location.href);e.geo&&(f+="&geo="+encodeURIComponent(e.geo));c&&(f+="&cssoverride="+encodeURIComponent(c));d&&(f+=
"&"+d);e.get.params&&e.get.params.element_id==b&&(f+="&"+e.get.qs);(a=e.session.getid(a.split("/").slice(0,3).join("/")))&&(f+="&session_id="+a);a=document.createElement("iframe");a.src=f;a.id="cm-"+(new Date).getTime();a.className="cashmusic embed";a.style.width="100%";a.style.height="0";a.style.border="0";a.style.overflow="hidden";a.scrolling="no";f=f.split("/").slice(0,3).join("/");-1===e.embeds.whitelist.indexOf(f)&&(e.embeds.whitelist+=f);e.embeds.all.push({el:a,id:b,type:""});return a},getTemplate:function(a,
b){var c=window.cashmusic,d=c.templates;void 0!==d[a]?b(d[a]):(this.ajax.jsonp(c.path+"templates/"+a+".js","callback",function(c){d[a]=c.template;b(c.template)},"cashmusic"+a+"Callback"),document.querySelectorAll('link[href="'+c.path+"templates/"+a+'.css"]').length||c.styles.injectCSS(c.path+"templates/"+a+".css"))},addEventListener:function(a,b){var c=window.cashmusic;c.eventlist.hasOwnProperty(a)||(c.eventlist[a]=[]);c.eventlist[a].push(b)},removeEventListener:function(a,b){var c=window.cashmusic;
if(c.eventlist.hasOwnProperty(a)){var d=c.eventlist[a].indexOf(b);-1!=d&&c.eventlist[a].splice(d,1)}},dispatchEvent:function(a){var b=window.cashmusic;if(b.eventlist.hasOwnProperty(a.type)){var c;for(c=0;c<b.eventlist[a.type].length;c++)if(b.eventlist[a.type][c])b.eventlist[a.type][c](a)}},loadScript:function(a,b){if(0<document.querySelectorAll('a[src="'+a+'"]').length)"function"===typeof b&&b();else{var c=document.getElementsByTagName("head")[0]||document.documentElement,d=document.createElement("script");
d.src=a;var e=!1;d.onload=d.onreadystatechange=function(){e||this.readyState&&"loaded"!==this.readyState&&"complete"!==this.readyState||(e=!0,"function"===typeof b&&b(),d.onload=d.onreadystatechange=null,c&&d.parentNode&&c.removeChild(d))};c.insertBefore(d,c.firstChild)}},getQueryVariable:function(a){for(var b=window.location.search.substring(1).split("&"),c=0;c<b.length;c++){var d=b[c].split("=");if(d[0]==a)return decodeURIComponent(d[1])}return!1},ajax:{getXHR:function(){try{return new XMLHttpRequest}catch(a){try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(b){try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(c){return!1}}}},
send:function(a,b,c,d){var e="POST",f=window.cashmusic.session.getid(window.location.href.split("/").slice(0,3).join("/"));b?f&&(b+="&session_id="+f):(e="GET",b=null,f&&(a=-1===a.indexOf("?")?a+("?session_id="+f):a+("&session_id="+f)));var g=this.getXHR();g&&(g.open(e,a,!0),g.setRequestHeader("X-Requested-With","XMLHttpRequest"),"POST"==e&&g.setRequestHeader("Content-type","application/x-www-form-urlencoded"),"function"==typeof c&&(g.onreadystatechange=function(){4===g.readyState&&(200===g.status?
c(g.responseText):"function"===typeof d&&d(g.responseText))}),g.send(b))},jsonp:function(a,b,c,d){a=a||"";b=b||"";c=c||function(){};d=d||!1;"function"==typeof b&&(c=b,b="callback");if(d){var e=d,f=function(){};"function"==typeof window[e]&&(f=window[e])}else e="jsonp"+Math.round(1000001*Math.random());window[e]=function(a){c(a);d?f(a):delete window[e]};a=-1===a.indexOf("?")?a+"?":a+"&";var g=document.createElement("script");g.setAttribute("src",a+b+"="+e);document.getElementsByTagName("head")[0].appendChild(g)},
encodeForm:function(a){if("object"!==typeof a)return!1;var b="";a=a.elements||a;for(var c=0;c<a.length;c++)"checkbox"===a[c].type||"radio"===a[c].type?a[c].checked&&(b+=(b.length?"&":"")+a[c].name+"="+a[c].value):b+=(b.length?"&":"")+a[c].name+"="+a[c].value;return encodeURI(b)},getHeaderForURL:function(a,b,c){a=this.getXHR();a.open("HEAD","https://javascript-cashmusic.netdna-ssl.com/cashmusic.js");a.onreadystatechange=function(){this.readyState==this.DONE&&c(this.getResponseHeader(b))};a.send()}},
events:{add:function(a,b,c){a.attachEvent?(a["e"+b+c]=c,a[b+c]=function(){a["e"+b+c](window.event)},a.attachEvent("on"+b,a[b+c])):a.addEventListener(b,c,!1)},remove:function(a,b,c){a.detachEvent?(a.detachEvent("on"+b,a[b+c]),a[b+c]=null):a.removeEventListener(b,c,!1)},fire:function(a,b,c){var d=window.cashmusic;if(document.dispatchEvent){var e=document.createEvent("CustomEvent");e.initCustomEvent(b,!1,!1,c);a.dispatchEvent(e)}else e=document.createEventObject(),e.detail=c,a.fireEvent("on"+b,e);d.embedded&&
d.events.relay(b,c)},relay:function(a,b){window.parent.postMessage(JSON.stringify({type:a,data:b}),"*")}},session:{start:function(a){var b=window.cashmusic;b.session.getid(window.location.href.split("/").slice(0,3).join("/"))||(a||(a=window.location.href.split("/embed/")[0]+"/payload",a+="?cash_request_type=system&cash_action=startjssession&ts="+(new Date).getTime()),b.ajax.send(a,!1,function(a){a&&(b.events.fire(b,"sessionstarted",a),b.session.setid(a))}))},setid:function(a){a=JSON.parse(a);var b=
localStorage.getItem("sessions"),b=b?JSON.parse(b):{};b[a.endpoint]={id:a.id,expiration:a.expiration};localStorage.setItem("sessions",JSON.stringify(b))},getid:function(a){var b=!1;try{b=localStorage.getItem("sessions")}catch(c){b=!1}return b&&(b=JSON.parse(b),b[a]&&b[a].expiration>Math.floor((new Date).getTime()/1E3))?b[a].id:!1}},measure:{viewport:function(){return{x:window.innerWidth||document.body.offsetWidth||0,y:window.innerHeight||document.body.offsetHeight||0}},scrollheight:function(){var a=
document.body,b=document.documentElement;return Math.max(a.scrollHeight,b.scrollHeight,a.offsetHeight,b.offsetHeight,a.clientHeight,b.clientHeight)}},overlay:{bg:!1,wrapper:!1,content:!1,close:!1,callbacks:[],create:function(a){var b=window.cashmusic,c=b.overlay;if(!1===c.wrapper){b.styles.injectCSS(b.path+"templates/overlay.css");c.wrapper=document.createElement("div");c.wrapper.className="cm-wrapper";c.bg=document.createElement("div");c.bg.className="cm-bg";var d=window.getComputedStyle(document.body);
c.bg.style.backgroundImage=d.getPropertyValue("background-image");c.bg.style.backgroundPosition=d.getPropertyValue("background-position");c.bg.style.backgroundSize=d.getPropertyValue("background-size");c.bg.style.backgroundRepeat=d.getPropertyValue("background-repeat");c.bg.style.backgroundOrigin=d.getPropertyValue("background-origin");c.bg.style.backgroundClip=d.getPropertyValue("background-clip");c.bg.style.backgroundAttachment=d.getPropertyValue("background-attachment");for(c.bg.style.backgroundColor=
d.getPropertyValue("background-color");document.body.childNodes.length;)c.wrapper.appendChild(document.body.childNodes[0]);document.body.appendChild(c.wrapper);c.content=document.createElement("div");c.content.className="cm-overlay";c.close=document.createElement("div");c.close.className="cm-close";b.events.add(window,"keyup",function(a){27==a.keyCode&&c.content.parentNode==document.body&&c.hide()});b.events.add(c.close,"click",function(a){c.content.parentNode==document.body&&c.hide()})}"function"===
typeof a&&a()},hide:function(){var a=window.cashmusic,b=a.overlay,c=document.body;a.events.fire(a,"overlayclosed","");b.wrapper.className="cm-wrapper";b.bg.className="cm-bg";for(setTimeout(function(){c.removeChild(b.bg)},1E3);b.content.firstChild;)b.content.removeChild(b.content.firstChild);c.removeChild(b.close);c.removeChild(b.content);a=document.querySelectorAll(".cm-overlaytrigger");if(0<a.length)for(var d=0,e=a.length;d<e;d++)a[d].style.visibility="visible";c.style.overflow="auto"},reveal:function(a,
b){var c=window.cashmusic,d=c.overlay,e=document.body;if(c.embedded)c.events.fire(c,"overlayreveal",{innerContent:a,wrapClass:b});else{var f=document.createElement("div");f.className="cm-position";var g=document.createElement("div");g.className=b?b:"cm-element";if("string"===typeof a)g.innerHTML=a;else if(a.endpoint&&a.element){var h=c.buildEmbedIframe(a.endpoint,a.element,!1,"&state="+a.state);g.appendChild(h)}else g.appendChild(a);f.appendChild(g);d.content.appendChild(f);e.style.overflow="hidden";
d.wrapper.className="cm-wrapper cm-active";d.content.style.opacity=0;d.bg.style.height=c.measure.scrollheight()+"px";e.appendChild(d.bg);d.bg.className="cm-bg cm-active";e.appendChild(d.content);e.appendChild(d.close);window.getComputedStyle(d.content).opacity;d.content.style.opacity=1}},addOverlayTrigger:function(a,b,c){var d=window.cashmusic,e=d.overlay;if(d.embedded)d.events.fire(d,"addoverlaytrigger",{content:a,classname:b,ref:c});else{var f=document.createElement("div");f.className=b.toString()+
" cm-overlaytrigger";d.events.add(f,"click",function(b){d.overlay.reveal(a);this.style.visibility="hidden";b.preventDefault();return!1});e.wrapper.appendChild(f);d.storage[c]=f;d.events.fire(d,"triggeradded",c)}}},styles:{resolveElement:function(a){return"string"===typeof a?"storage:"==a.substr(0,8)?window.cashmusic.storage[a.substr(8)]:document.querySelector(a):a},addClass:function(a,b,c){var d=window.cashmusic;if(c&&d.embedded)d.events.fire(d,"addclass",{el:a,classname:b});else if(a=d.styles.resolveElement(a))a.className=
a.className+" "+b},hasClass:function(a,b){return-1<(" "+a.className+" ").indexOf(" "+b+" ")},injectCSS:function(a,b,c){var d=window.cashmusic;c&&d.embedded?d.events.fire(d,"injectcss",{css:a,important:b}):(c=document.getElementsByTagName("head")[0]||document.documentElement,"http"==a.substr(0,4)?(d=document.createElement("link"),d.rel="stylesheet",d.href=a):(d=document.createElement("style"),d.innerHTML=a),d.type="text/css",b?c.appendChild(d):c.insertBefore(d,c.firstChild))},removeClass:function(a,
b,c){var d=window.cashmusic;if(c&&d.embedded)d.events.fire(d,"removeclass",{el:a,classname:b});else if(a=d.styles.resolveElement(a))a.className=(" "+a.className+" ").replace(" "+b+" "," ").replace(/^\s+/,"").replace(/\s+$/,"")},swapClasses:function(a,b,c,d){var e=window.cashmusic;if(d&&e.embedded)e.events.fire(e,"swapclasses",{el:a,oldclass:b,newclass:c});else if(a=e.styles.resolveElement(a))a.className=(" "+a.className+" ").replace(" "+b+" "," "+c+" ").replace(/^\s+/,"").replace(/\s+$/,"")}},stripe:{generateToken:function(a,
b){var c=window.cashmusic;c.embedded?c.events.fire(c,"stripetokenrequested",a):c.loadScript("https://checkout.stripe.com/checkout.js",function(){StripeCheckout.configure({key:a.key,image:a.image,token:function(a){b?b.postMessage(JSON.stringify({type:"stripetoken",data:a}),"*"):c.events.fire(c,"stripetokengenerated",a)}}).open({name:a.name,description:a.description,amount:a.amount,currency:a.currency,bitcoin:a.bitcoin})})}}},h.ajax.getHeaderForURL("https://javascript-cashmusic.netdna-ssl.com/cashmusic.js",
"GeoIp-Data",function(a){h.geo=a}),h.contentLoaded(function(){h._init(h)}));return h}();
