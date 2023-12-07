import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
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
  renderHTML(evt.target.elements.searchQuery.value);
}

function createMarkup(arrey) {
  if (!arrey.length) {
    Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  const markup = arrey
    .map(el => {
      return `
    <div class="photo-card">
      <img src="${el.webformatURL}" alt="${el.tags}" width="300" loading="lazy" />
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
  return markup;
}

async function renderHTML(value) {
  const data = await getData(value);
  const markup = createMarkup(data.hits);
  refs.gallery.innerHTML = markup;
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
