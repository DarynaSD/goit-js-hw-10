import { fetchBreeds, fetchCatByBreed } from './cat-API';
import SlimSelect from 'slim-select';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const selectElem = document.querySelector('.breed-select');
const loaderElem = document.querySelector('.loader');
const erroeElem = document.querySelector('.error');
const catInfoFieldElem = document.querySelector('.cat-info');

// new SlimSelect({
//     select: selectElem
// })

//заванажую масив об'єктів з породами при відкритті сторінки
//наповнюю селект назвами порід
fetchBreeds().then(data => {
    console.log(data);

    data.map(breed => {
        selectElem.insertAdjacentHTML('beforeend', `<option value=${breed.id}>${breed.name}</option>`)
        //console.log(breed)
        
    })

    new SlimSelect({
        select: selectElem
    })
    
    loaderElem.classList.add('is-hidden');
    selectElem.classList.remove('is-hidden');

    
})
    .catch(error => {
        loaderElem.classList.add('is-hidden');
        erroeElem.classList.remove('is-hidden')
    });



//пошук інформації про кота, коли користувач обрав породу

let breedId = null;


function handleChangeEvent() {
    loaderElem.classList.toggle('is-hidden');
    erroeElem.classList.add('is-hidden');
    catInfoFieldElem.innerHTML = '';
    catInfoFieldElem.classList.add('is-hidden');
    breedId = selectElem.options[selectElem.selectedIndex].value;
    
    fetchCatByBreed(breedId).then(data => {
    catInfoFieldElem.classList.remove('is-hidden');
    console.log(data);
        
    data.map(cat => {
            const [breed] = cat.breeds;
            console.log(breed);
            catInfoFieldElem.insertAdjacentHTML('beforeend',
            `<img src=${cat.url} width="500px" alt="cat ${breed.name}">
            <div class="card-wrap">
            <h1>${breed.name}</h1>
            <p class="cat-desc">${breed.description}</p>
            <p class="cat-temp"><b>Temperament: </b>${breed.temperament}</p>
            </div>`)
        })
    
    loaderElem.classList.toggle('is-hidden');
        
    })
    .catch(error => {
        loaderElem.classList.add('is-hidden');
        erroeElem.classList.remove('is-hidden')
    })
}


selectElem.addEventListener('change', handleChangeEvent);






