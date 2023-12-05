import axios from 'axios';
import { common } from './common';

// axios.defaults.headers.common['x-api-key'] = common.API_KEY;

const refs = {
  form: document.querySelector('#search-form'),
};

refs.form.addEventListener('submit', getSearchQuery);

async function getSearchQuery(evt) {
  evt.preventDefault();
  const searchQuery = evt.target.elements.searchQuery.value;
  try {
    const images = await fetchImages(searchQuery);
    console.log(images);
  } catch (error) {
    console.log(error.message);
  }
}

async function fetchImages(searchQuery) {
  const searchParams = new URLSearchParams({
    key: common.API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  const url = `${common.BASE_URL}?${searchParams}`;

  const response = await axios.get(url);

  return response.data;
}

// ('https://pixabay.com/api/?key=29647131-eec12f6860dbd83baca31563e&q=yellow+flowers&image_type=photo');
