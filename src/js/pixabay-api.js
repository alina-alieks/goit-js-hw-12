import axios from 'axios';


//Формування HTTP запита на сервер для отримання відповіді (проміса)
async function getImagesService(value, page, limit) {
  
  axios.defaults.baseURL = "https://pixabay.com/api";
  const searchParams = new URLSearchParams({
    key: "42527705-4e95d3f46fcc8571248d3eb24",
    q: value,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    page: page,
    per_page: limit,
  })

  const response = await axios.get(`/?${searchParams}`);
  return response
}


//Експорт функцій 
export { getImagesService }