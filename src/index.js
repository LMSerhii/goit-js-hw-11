import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { common } from './common';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('#search-form'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  getData(evt);
}

function createMarkup(arrey) {
  if (!arrey.length) {
    Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  const markup = arrey.map(el => {
    return `
    <div class="photo-card">
      <img src="${el.webformatURL}" alt="${el.tags}" loading="lazy" />
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
  });
  return markup;
}

async function getData(event) {
  const inputValue = event.target.elements.searchQuery.value;
  try {
    const data = await fetchImages(inputValue);
    console.log(data.hits);
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

  return response.data;
}
