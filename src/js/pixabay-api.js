
const baseUrl = "https://pixabay.com/api/";
const key = "42527705-4e95d3f46fcc8571248d3eb24";

//Формування HTTP запита на сервер для отримання відповіді (проміса)
function getImagesService(value) {
  const url = `${baseUrl}?key=${key}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true`;
  return fetch(url);
}

//Експорт функцій 
export { getImagesService }