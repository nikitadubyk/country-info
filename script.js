const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    const searchValue = document.querySelector('input').value,
          start = document.querySelector('.start'),
          card = document.querySelectorAll('.card');
    e.preventDefault();

    if (start) {
        start.remove();
    }

    if (card) {
        card.forEach(card => {
            card.remove();
        });
    }

    getResource(`https://restcountries.eu/rest/v2/name/${searchValue}`)
    .then(res => createCard(res))
    .catch(error => {
        if (!document.querySelector('.mistake')) {
            showError();
        }
    });
});

async function getResource(url) {
    let res = await fetch(url);

    return await res.json();
}

function createCard(res) {
    res.forEach(({name, capital, region, population, area, flag, languages, currencies}) => {
        let card = document.createElement('div');

        card.classList.add('card');
        card.innerHTML = `
        <div class="img">
            <img src="${flag}" alt="flag">
         </div>

        <div class="descr">
            <div class="name">${name}, ${region}</div>
            <div class="capital">${capital}</div>

            <div class="sub-descr">
                <div class="area">Area: ${area} square kilometers</div>
                <div class="people">People: ${population} people</div>
                <div class="lang">Languages: ${languages[0].name}</div>
                <div class="money">Money: ${currencies[0].code}</div>
            </div>
        </div>
        `;

        document.querySelector('main').appendChild(card);
    });
}

function showError() {
    const mistake = document.createElement('div');
    mistake.classList.add('mistake');
    mistake.textContent = 'Oops, an error occured. Try to search again';
    document.body.appendChild(mistake);

    setTimeout(() => {
        mistake.remove();
    }, 3000);
}
