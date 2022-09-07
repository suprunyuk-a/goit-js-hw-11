import Notiflix from 'notiflix';

const cityList = document.querySelector('.country-list');
const cityInfo = document.querySelector('.country-info');

function renderCityList(cities) {
  if (Object.keys(cities).length > 10) {
    Notiflix.Notify.warning(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (Object.keys(cities).length > 1) {
    const markup = cities
      .map(city => {
        return `<li>
          <p>  <img src=${city.flags.svg}  alt="flag" width="30" > ${city.name.official}</p>
            </li>`;
      })
      .join('');
    cityInfo.innerHTML = '';
    cityList.innerHTML = markup;
  } else {
    const markup = cities
      .map(city => {
        return `<h1>
          <img src=${city.flags.svg}  alt="flag" width="30" > ${
          city.name.official
        }
            </h1>
            <ul class="country-list">
            <li>
                <p><b>Capital</b>: ${city.capital}</p>
                <p><b>Population</b>: ${city.population}</p>
                <p><b>Languages</b>: ${Object.values(
                  city.languages
                ).toString()}</p>
              </li>
              </ul>`;
      })
      .join('');
    cityList.innerHTML = '';
    cityInfo.innerHTML = markup;
  }
}

export { renderCityList };
