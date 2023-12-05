import axios from 'axios';
import { common } from './common';

const refs = {
  form: document.querySelector('#search-form'),
};

refs.form.addEventListener('submit', getSearchQuery);

function getSearchQuery(evt) {
  evt.preventDefault();
  const searchQuery = evt.target.elements.searchQuery.value;
}
