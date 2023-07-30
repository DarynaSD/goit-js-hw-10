import { fetchBreeds, fetchCatByBreed } from './cat-API'


const selectElem = document.querySelector('.breed-select');
const loaderElem = document.querySelector('.loader');
const erroeElem = document.querySelector('.error');
const catInfoFieldElem = document.querySelector('.cat-info');

//заванажую масив об'єктів з породами при відкритті сторінки
//наповнюю селект назвами порід
fetchBreeds().then(data => {
    console.log(data);

    data.map(breed => {
        selectElem.insertAdjacentHTML('beforeend', `<option value=${breed.id}>${breed.name}</option>`)
        //console.log(breed)
        
    })

    loaderElem.classList.add('is-hidden');
    selectElem.classList.remove('is-hidden');

    
  })
    .catch(console.warn);



//пошук інформації про кота, коли користувач обрав породу

let breedId = null;

function handleChangeEvent() {
    breedId = selectElem.options[selectElem.selectedIndex].value;
    erroeElem.classList.toggle('is-hidden')

    fetchCatByBreed(breedId).then(data => {
        loaderElem.classList.remove('is-hidden');
        alert("loading")
    catInfoFieldElem.innerHTML = '';
    

        console.log(data);
        data.map(cat => {
            const [breed] = cat.breeds;
            console.log(breed);
            catInfoFieldElem.insertAdjacentHTML('beforeend',
                `<img src=${cat.url} width="500px">
            <h1>${breed.name}</h1>
            <p>${breed.description}</p>
            <p>${breed.temperament}</p>`)
        })
    
        //loaderElem.classList.add('is-hidden');
 
        //catInfoFieldElem.classList.remove('is-hidden');
        
    })
    .catch(console.warn)
}






selectElem.addEventListener('change', handleChangeEvent);






