import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { common } from './common';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  // refs.gallery.innerHTML = `<span class="loader"></span>`;
  renderHTML(evt.target.elements.searchQuery.value);
}

function createMarkup(arrey) {
  if (!arrey.length) {
    Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return '';
  }
  return arrey
    .map(el => {
      return `
    <div class="photo-card">
      <a href="${el.largeImageURL}">
        <img src="${el.webformatURL}" alt="${el.tags}" width="300" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>${el.likes}
        </p>
        <p class="info-item">
          <b>Views</b>${el.views}
        </p>
        <p class="info-item">
          <b>Comments</b>${el.comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>${el.downloads}
        </p>
      </div>
    </div>`;
    })
    .join('');
}

function createLightbox() {
  const options = {
    captionsData: 'alt',
    captionPosition: 'bottom',
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
}

async function renderHTML(value) {
  const data = await getData(value);
  refs.gallery.innerHTML = createMarkup(data.hits);
  createLightbox();
}

async function getData(value) {
  try {
    const response = await fetchImages(value);
    return response.data;
  } catch (error) {
    Notify.failure(error.message);
  }
}

async function fetchImages(searchQuery) {
  const query = {
    url: common.BASE_URL,
    method: 'GET',
    params: {
      key: common.API_KEY,
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  };

  const response = await axios(query);
  return response;
}
