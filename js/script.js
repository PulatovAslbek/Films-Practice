const elMenu = getElem('.film__menu');
const elForm = getElem('#form');
const elSearch = getElem('#search');
const elSelect = getElem('#select', elForm);
const elSelectSort = getElem('#select-sort', elForm);

function renderGenres(filmArr, element){
    let result = [];

    filmArr.forEach(film => {
        film.genres.forEach((genre) =>{
            if(!result.includes(genre)){
               result.push(genre)
            }
        })
    })

    result.forEach((genre) =>{
        let newOption = creatElem('option');
        newOption.textContent = genre;
        newOption.value = genre;
        element.appendChild(newOption)
    })

}
renderGenres(films, elSelect)

function renderFilms(filmArr, element){
    
    element.innerHTML = null;

    filmArr.forEach((film) => {
 
        let newLi = creatElem('li');
        let newTitle = creatElem('h2');
        let newImg = creatElem('img');
        let GenreList = creatElem('ul');
        let elTime = creatElem('time');
    
        film.genres.forEach((genre) => {
              let newGenreli = creatElem('li')
    
              newGenreli.setAttribute('class', 'film__genre')
    
              newGenreli.textContent = genre
    
              GenreList.appendChild(newGenreli)
        })
    
        let date = new Date(film.release_date)
        let data = `${date.getDay()}.${date.getMonth() + 1}.${date.getFullYear()}`
    
        newLi.setAttribute('class', 'film__item')
        newImg.setAttribute('src', film.poster)
        newImg.setAttribute('class', 'film__img')
        newTitle.textContent = film.title
        newTitle.setAttribute('class', 'film__subtitle')
        GenreList.setAttribute('class', 'film__genre--list')
        elTime.setAttribute('datetime', data)
        elTime.setAttribute('class', 'film__time')
        elTime.textContent = data
    
        newLi.appendChild(newImg)
        newLi.appendChild(newTitle)
        newLi.appendChild(GenreList)
        newLi.appendChild(elTime)
    
        element.appendChild(newLi)
    })
}

renderFilms(films, elMenu)

elForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    let searchValue = elSearch.value.trim();
    let selectValue = elSelect.value.trim();
    let selectSort = elSelectSort.value.trim();

    const regex = new RegExp(searchValue, 'gi');
    const serachedFilms = films.filter(film => film.title.match(regex));

    sortedFilms(serachedFilms, selectSort)

    let foundFilms = [];

    if(selectValue === 'All'){
        foundFilms = serachedFilms;
    } else {
        foundFilms = serachedFilms.filter(film => film.genres.includes(selectValue))
    }

    renderFilms(foundFilms, elMenu);
});

function sortedFilms(filmsArr, format) {
    const sortedAlph = filmsArr.sort((a, b) => {
        if (a.title > b.title) {
            return 1;
        } else if (a.title < b.title) {
            return -1;
        } else {
            return 0;
        }
    });

    const sortedYear = filmsArr.sort((a, b) => {
        if (a.release_date > b.release_date) {
            return 1;
        } else if (a.release_date < b.release_date) {
            return -1;
        } else {
            return 0;
        }
    });

    if (format === 'a_z') {
        return sortedAlph;
    } else if (format === 'z_a') {
        return sortedAlph.reverse();
    } else if (format === 'old_new') {
        return sortedYear;
    } else if (format === 'new_old') {
        return sortedYear.reverse();
    }
}

