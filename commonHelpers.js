import{a as m,i as p,S as w}from"./assets/vendor-da186403.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();async function h(r,s,i){m.defaults.baseURL="https://pixabay.com/api";const o=new URLSearchParams({key:"42527705-4e95d3f46fcc8571248d3eb24",q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:i});return await m.get(`/?${o}`)}const I="/goit-js-hw-12/assets/icon-error-3c862585.svg",d=()=>p.error({message:"Sorry, there are no images matching your search query. Please try again!",iconUrl:I,position:"topRight",backgroundColor:"#ef4040",theme:"dark",transitionIn:"fadeInRight"}),y=document.querySelector(".form"),b=document.querySelector(".gallery"),P=document.querySelector(".loader"),l=document.querySelector(".btn-load-more"),a=()=>P.classList.toggle("is-hidden");y.addEventListener("submit",$);let u=15,c=1,L;function $(r){r.preventDefault(),b.innerHTML="";const s=r.currentTarget.elements.image.value.trim(),i=s.split(" ").join("+");l.classList.add("is-hidden"),s?(a(),h(i,c,u).then(o=>{a(),o.data.hits.length!==0?(v(o.data),l.classList.remove("is-hidden"),S(),L=i,y.reset()):(d(),l.classList.add("is-hidden"))}).catch(o=>{console.log(o),a(),d()})):d()}l.addEventListener("click",C);function C(){a(),c++,h(L,c,u).then(r=>{r.data.totalHits<u*c?(a(),l.classList.add("is-hidden"),p.info({position:"topRight",theme:"dark",backgroundColor:"#4e75ff",transitionIn:"fadeInRight",message:"We're sorry, but you've reached the end of search results."})):(a(),v(r.data),S())}).catch(()=>{a(),l.classList.add("is-hidden")})}const g=new w(".gallery a",{captionsData:"alt",captionDelay:250});function S(){const s=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:2*s.height,behavior:"smooth"})}function v(r){let s="";r.hits.map(({webformatURL:i,largeImageURL:o,tags:e,likes:t,views:n,comments:f,downloads:q})=>s+=`<li class="gallery-item">
        <a href="${o}"><img class="gallery-item-images" src="${i}" alt="${e}" /></a>
        <ul class="gallery-item-info">
            <li class="item-info">
                <p class="item-info-name">Likes</p>
                <p class="item-info-value">${t}</p>
            </li>
            <li class="item-info">
                <p class="item-info-name">Views</p>
                <p class="item-info-value">${n}</p>
            </li>
            <li class="item-info">
                <p class="item-info-name">Comments</p>
                <p class="item-info-value">${f}</p>
            </li>
            <li class="item-info">
                <p class="item-info-name">Downloads</p>
                <p class="item-info-value">${q}</p>
            </li>
            </ul>
    </li>`).join(""),b.insertAdjacentHTML("beforeend",s),g.refresh(),g.on("shown.simplelightbox",function(){const i=document.querySelector(".sl-overlay"),o=document.querySelector(".sl-close "),e=document.querySelector(".sl-counter"),t=document.querySelectorAll(".sl-navigation button"),n=document.querySelector(".sl-caption");i.style.backgroundColor="rgb(46, 47, 66)",o.style.color="#ffffff",o.style.fontSize="2rem",e.style.color="#ffffff",t.forEach(f=>f.style.color="#ffffff"),n.style.backgroundColor="rgba(46, 47, 66, 0.80)"})}
//# sourceMappingURL=commonHelpers.js.map
