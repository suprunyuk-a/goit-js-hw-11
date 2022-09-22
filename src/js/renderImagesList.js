import SimpleLightbox from 'simplelightbox';

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

function renderImagesList(search) {
  hitsArray = search.data.hits;

  const markupCard = hitsArray
    .map(
      hit =>
        `
          <a class="photo-link" href="${hit.largeImageURL}">
            <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" width=300 height=200 />
            <div class="photo-card">
              <div class="info">
                <p class="info-item">
                  <b>Likes</b><br>${hit.likes}
                </p>
                <p class="info-item">
                  <b>Views</b><br>${hit.views}
                </p>
                <p class="info-item">
                  <b>Comments</b><br>${hit.comments}
                </p>
                <p class="info-item">
                  <b>Downloads</b><br>${hit.downloads}
                </p>
              </div>
            </div>
          </a>`
    )
    .join('');

  galleryElem.insertAdjacentHTML('beforeend', markupCard);
  galleryLightbox.refresh();
}

const galleryLightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export { renderImagesList };
