import{S as g,i as y}from"./assets/vendor-7659544d.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&t(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();const d="https://pixabay.com/api/",h="42527705-4e95d3f46fcc8571248d3eb24";function b(s){const r=`${d}?key=${h}&q=${s}&image_type=photo&orientation=horizontal&safesearch=true`;return fetch(r)}const S="/goit-js-hw-12/assets/icon-error-3c862585.svg",a=()=>y.error({message:"Sorry, there are no images matching your search query. Please try again!",iconUrl:S,position:"topRight",backgroundColor:"#ef4040",theme:"dark",transitionIn:"fadeInRight"}),u=document.querySelector(".form"),m=document.querySelector(".gallery"),v=document.querySelector(".loader"),c=()=>v.classList.toggle("is-hidden");function L(s){s.preventDefault(),m.innerHTML="";const r=s.currentTarget.elements.image.value.trim(),i=r.split(" ").join("+");r&&(c(),b(i).then(t=>{if(!t.ok)throw new Error(`Error request ${t.status}`);return t.json()}).then(t=>{c(),t.hits.length!==0?(q(t),u.reset()):a()}).catch(t=>{console.log(t),c(),a()}))}u.addEventListener("submit",L);const f=new g(".gallery a",{captionsData:"alt",captionDelay:250});function q(s){let r="";s.hits.map(({webformatURL:i,largeImageURL:t,tags:e,likes:o,views:n,comments:l,downloads:p})=>r+=`<li class="gallery-item">
        <a href="${t}"><img class="gallery-item-images" src="${i}" alt="${e}" /></a>
        <ul class="gallery-item-info">
            <li class="item-info">
                <p class="item-info-name">Likes</p>
                <p class="item-info-value">${o}</p>
            </li>
            <li class="item-info">
                <p class="item-info-name">Views</p>
                <p class="item-info-value">${n}</p>
            </li>
            <li class="item-info">
                <p class="item-info-name">Comments</p>
                <p class="item-info-value">${l}</p>
            </li>
            <li class="item-info">
                <p class="item-info-name">Downloads</p>
                <p class="item-info-value">${p}</p>
            </li>
            </ul>
    </li>`).join(""),m.innerHTML=r,f.refresh(),f.on("shown.simplelightbox",function(){const i=document.querySelector(".sl-overlay"),t=document.querySelector(".sl-close "),e=document.querySelector(".sl-counter"),o=document.querySelectorAll(".sl-navigation button"),n=document.querySelector(".sl-caption");i.style.backgroundColor="rgb(46, 47, 66)",t.style.color="#ffffff",t.style.fontSize="2rem",e.style.color="#ffffff",o.forEach(l=>l.style.color="#ffffff"),n.style.backgroundColor="rgba(46, 47, 66, 0.80)"})}
//# sourceMappingURL=commonHelpers.js.map
