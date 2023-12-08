import { refs } from '../variables/referenses';
import { gv } from '../variables/globalVariables';
import { renderHTML } from './renderHTML';

const onFormSubmit = evt => {
  evt.preventDefault();
  refs.gallery.innerHTML = '';
  gv.queryText = evt.target.elements.searchQuery.value;
  gv.pagination = 1;
  renderHTML();
};

const loadMore = () => {
  gv.pagination += 1;
  renderHTML();
};

export { onFormSubmit, loadMore };
