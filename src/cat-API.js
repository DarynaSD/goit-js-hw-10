import axios from "axios";


const API_KEY = 'live_vFVxpc1ek4t2JDAHxzPwd9uA9kShH4yrrKwh4TC4eP4gFkTIHtSnVh2Xbzgbuahb';
const BASE_URL = 'https://api.thecatapi.com';

axios.defaults.headers.common["x-api-key"] = API_KEY;


//fetchBreeds(), яка виконує HTTP-запит і повертає проміс із масивом порід - результатом запиту
function fetchBreeds() {
  return fetch(`${BASE_URL}/v1/breeds?&api_key=${API_KEY}`,
    {
      headers: {
      'x-api-key': API_KEY
    }}).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    })
}

//fetchCatByBreed(breedId), яка очікує ідентифікатор породи, робить HTTP-запит і повертає
//проміс із даними про кота - результатом запиту


function fetchCatByBreed(breedId) {

  return fetch(`${BASE_URL}/v1/images/search?&api_key=${API_KEY}&breed_ids=${breedId}`,
  {
      headers: {
      'x-api-key': API_KEY
    }}).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    })
}

export {fetchBreeds, fetchCatByBreed}
