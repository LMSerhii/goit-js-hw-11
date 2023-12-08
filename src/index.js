import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { common } from './common';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  moreBtn: document.querySelector('.load-more'),
};

let pagination = 0;
let queryText = null;
let totalElement = 0;
let totalHits = 0;

refs.form.addEventListener('submit', onFormSubmit);
refs.moreBtn.addEventListener('click', loadMore);

function onFormSubmit(evt) {
  evt.preventDefault();
  refs.gallery.innerHTML = '';
  queryText = evt.target.elements.searchQuery.value;
  pagination = 1;
  renderHTML();
}

function validationData(arrey) {
  if (!arrey.length) {
    Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return false;
  }

  return true;
}

function createMarkup(arrey) {
  if (!validationData(arrey)) {
    return '';
  }

  return arrey
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
    <div class="photo-card">
      <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" width="300" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>${likes}
        </p>
        <p class="info-item">
          <b>Views</b>${views}
        </p>
        <p class="info-item">
          <b>Comments</b>${comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>${downloads}
        </p>
      </div>
    </div>`;
      }
    )
    .join('');
}

function createLightbox() {
  const options = {
    captionsData: 'alt',
    captionPosition: 'bottom',
    overla: true,
    captionDelay: 250,
    enableKeyboard: true,
    docClose: true,
    doubleTapZoom: 2,
    spinner: true,
  };
  let gallery = new SimpleLightbox('.gallery a', options);

  gallery.on('error.simplelightbox', e => {
    Notify.warning('Page not found !!!');
  });

  gallery.refresh();
}

async function renderHTML() {
  refs.moreBtn.classList.remove('is-active');

  const data = await getData();

  if (!validationData(data.hits)) {
    return;
  }

  refs.gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
  refs.moreBtn.classList.add('is-active');
  createLightbox();

  checkTotalEl();
}

function checkTotalEl() {
  if (totalElement >= totalHits) {
    Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
    refs.moreBtn.classList.remove('is-active');
  }
}

async function getData() {
  try {
    const response = await fetchImages();
    totalHits = response.data.totalHits;
    totalElement += 200;
    return response.data;
  } catch (error) {
    Notify.failure(error.message);
  }
}

async function fetchImages() {
  const query = {
    url: common.BASE_URL,
    method: 'GET',
    params: {
      key: common.API_KEY,
      q: queryText,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: pagination,
      per_page: 200,
    },
  };

  return await axios(query);
}

function loadMore() {
  pagination += 1;
  renderHTML();
}
