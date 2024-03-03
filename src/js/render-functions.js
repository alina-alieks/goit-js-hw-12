// Імпорт бібліотеки SimpleLightbox - відображення модалки фото
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
//Імпорт функцій з "./pixabay-api"
import { getImagesService } from "./pixabay-api";
//Імпорт iziToast для відображення повідомлення
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import iconError from "../img/icon-error.svg";

//Використання iziToast
const showErrorMessage = () => iziToast.error({
    message: 'Sorry, there are no images matching your search query. Please try again!',
    iconUrl: iconError,
    position: "topRight",
    backgroundColor: "#ef4040",
    theme: "dark",
    transitionIn: "fadeInRight",
})

const form = document.querySelector(".form");
const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const btnLoadMore = document.querySelector(".btn-load-more");


//Функція додавання та видалення класу "is-hidden" для видимості завантажувача
const showLoader = () => loader.classList.toggle("is-hidden");


form.addEventListener("submit", getImagesFromPixabay);

let limit = 15;
let page;
let currentInputSearch;

//Функція до слухача події до кнопки - відправка запиту та відповідь
function getImagesFromPixabay(event) {
    event.preventDefault();
    gallery.innerHTML = "";
    page = 1;
    const input = event.currentTarget.elements.image.value.trim();
    const inputSearch = input.split(" ").join("+");
    btnLoadMore.classList.add("is-hidden")

    if (input) {
        showLoader();
        getImagesService(inputSearch, page, limit)
            .then(response => {
                showLoader();
                if (response.data.hits.length !== 0) {
                    markup(response.data);
                    btnLoadMore.classList.remove("is-hidden");
                    scrollImages();
                    currentInputSearch = inputSearch;
                    form.reset()
                } else {
                    showErrorMessage();
                    btnLoadMore.classList.add("is-hidden");
                    }
            })
            .catch(error => {
                console.log(error);
                showLoader()
                showErrorMessage();
            })
    } else {
        showErrorMessage();
        }
}

btnLoadMore.addEventListener("click", loadMoreImages);

//Функція до слухача події до кнопки - загрузка більше 
function loadMoreImages() {
    showLoader();
    page++
    getImagesService(currentInputSearch, page, limit)
        .then(response => { 
            // console.log(response)
            if (response.data.totalHits < (limit * page)) {
                showLoader();
                btnLoadMore.classList.add("is-hidden");
                iziToast.info({
                    position: "topRight",
                    theme: "dark",
                    backgroundColor: "#4e75ff",
                    transitionIn: "fadeInRight",
                    message: "We're sorry, but you've reached the end of search results.",
                })
                
            } else {
            showLoader();
            markup(response.data);
            scrollImages();
            // console.log(response)
        }
        })
        .catch(() => {
            showLoader();
            btnLoadMore.classList.add("is-hidden")})
}

//Вікористання бібліотеки SimpleLightbox
const lightbox = new SimpleLightbox('.gallery a', { captionsData: "alt", captionDelay: 250 });

//Функція плавного скролу
function scrollImages() {
    const itemGallery = document.querySelector(".gallery-item");
    const rect = itemGallery.getBoundingClientRect();
    // console.log(rect.height);
    window.scrollBy({
        top: 2 * rect.height,
        behavior: "smooth",
    });
}


//Додавання HTML коду списку галереї
function markup(data) {
//   console.log(data)
let galleryHTML = "";
data.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return galleryHTML += `<li class="gallery-item">
        <a href="${largeImageURL}"><img class="gallery-item-images" src="${webformatURL}" alt="${tags}" /></a>
        <ul class="gallery-item-info">
            <li class="item-info">
                <p class="item-info-name">Likes</p>
                <p class="item-info-value">${likes}</p>
            </li>
            <li class="item-info">
                <p class="item-info-name">Views</p>
                <p class="item-info-value">${views}</p>
            </li>
            <li class="item-info">
                <p class="item-info-name">Comments</p>
                <p class="item-info-value">${comments}</p>
            </li>
            <li class="item-info">
                <p class="item-info-name">Downloads</p>
                <p class="item-info-value">${downloads}</p>
            </li>
            </ul>
    </li>`
    }).join("");
    gallery.insertAdjacentHTML("beforeend", galleryHTML);
    //Оновлення метод refresh() для даних Ajax Calls або після DOM-маніпуляцій 
    lightbox.refresh();
    //Стилі бібліотеки simplelightbox
    lightbox.on('shown.simplelightbox', function () {
    const overlay = document.querySelector(".sl-overlay");
    const btnClose = document.querySelector(".sl-close ");
    const counter = document.querySelector(".sl-counter");
    const btnArrow = document.querySelectorAll(".sl-navigation button");
    const overlayImage = document.querySelector(".sl-caption");

    overlay.style.backgroundColor = "rgb(46, 47, 66)";
    btnClose.style.color = "#ffffff";
    btnClose.style.fontSize = "2rem";
    counter.style.color = "#ffffff";
    btnArrow.forEach(item => item.style.color = "#ffffff");
    overlayImage.style.backgroundColor = "rgba(46, 47, 66, 0.80)";
    });
}



