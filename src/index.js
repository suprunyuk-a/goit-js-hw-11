import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/styles.css';
import { fetchImages } from './js/fetchImages';
import { renderImagesList } from './js/renderImagesList';
import { scrollMore } from './js/scrollMore';
import { scrollStart } from './js/scrollStart';

const obj = {
  searchForm: document.querySelector('#search-form'),
  searchInput: document.querySelector('input'),
  galleryElem: document.querySelector('.gallery'),
  sentinelElem: document.querySelector('#sentinel'),
};

const { searchForm, searchInput, galleryElem, sentinelElem } = obj;

let inputValue = '';
let imageSearch = '';
let hitsArray = [];
let page = 0;
let totalHits = 0;

searchInput.addEventListener('input', onInput);

function onInput(event) {
  inputValue = event.currentTarget.value;
  return;
}

searchForm.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();

  imageSearch = inputValue;
  page = 1;
  if (!imageSearch) {
    deletePhotoMarkup();
    return;
  }

  deletePhotoMarkup();

  fetchImages(imageSearch, page)
    .then(search => {
      totalHits = search.data.totalHits;
      if (totalHits > 0) {
        Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
        renderImagesList(search);
        scrollStart();
      }
      hitsArray = search.data.hits;
      if (!hitsArray.length) {
        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
    })
    .catch(error => console.log(error));
}

let photoLinkElem = [];

function deletePhotoMarkup() {
  photoLinkElem = document.querySelectorAll('.photo-link');
  photoLinkElem?.forEach(element => element.remove());
}

const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && imageSearch !== '') {
      page += 1;
      let numberPages = totalHits / 40;

      if (page > Math.ceil(numberPages)) {
        return Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      }

      fetchImages(imageSearch, page)
        .then(search => {
          renderImagesList(search);
          scrollMore();
        })
        .catch(error => console.log(error));
    }
  });
};

const options = {
  rootMargin: '200px',
};
const observer = new IntersectionObserver(onEntry, options);

observer.observe(sentinelElem);
