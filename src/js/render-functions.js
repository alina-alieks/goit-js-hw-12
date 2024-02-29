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
const loader = document.querySelector(".loader")

//Функція додавання та видалення класу "is-hidden" для видимості завантажувача
const showLoader = () => loader.classList.toggle("is-hidden");


//Функція до слухача події до кнопки - відправка запиту та відповідь
function getImagesFromPixabay(event) {
    event.preventDefault();
    gallery.innerHTML = "";
    const input = event.currentTarget.elements.image.value.trim();
    const inputSearch = input.split(" ").join("+");
    
    if (input) {
        showLoader();
        getImagesService(inputSearch)
            .then(response => {
                if (!response.ok) {
                throw new Error(`Error request ${response.status}`)
                }
                return response.json();
                })
            .then(data => {
                showLoader();
                if (data.hits.length !== 0) {
                    // console.log(data.hits)
                    markup(data);
                    form.reset()
                } else {
                    showErrorMessage()
                    }
            })
            .catch(error => {
                console.log(error);
                showLoader()
                showErrorMessage();
            })
        }
}
form.addEventListener("submit", getImagesFromPixabay)


//Вікористання бібліотеки
const lightbox = new SimpleLightbox('.gallery a', { captionsData: "alt", captionDelay: 250 } );

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
    gallery.innerHTML = galleryHTML;
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

