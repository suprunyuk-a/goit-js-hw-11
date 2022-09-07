import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import { renderCityList } from './js/renderCityList';

const fetchCity = document.querySelector('#search-box');
const cityList = document.querySelector('.country-list');
const cityInfo = document.querySelector('.country-info');
let nameCity = '';

const debouceFunct = debounce(() => {
  (nameCity = handleKeyPress()),
    fetchCountries(nameCity)
      .then(cities => renderCityList(cities))
      .catch(
        error =>
          Notiflix.Notify.failure(' Oops, there is no country with that name'),
        ((cityList.innerHTML = ''), (cityInfo.innerHTML = ''))
      );
}, 300);

fetchCity.addEventListener('input', debouceFunct);

const handleKeyPress = event => {
  return fetchCity.value.trim();
};
