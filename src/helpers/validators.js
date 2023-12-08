import { Notify } from 'notiflix';
import { notActiveElement } from './active';

const validationData = arrey => {
  if (!arrey.length) {
    Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return false;
  }

  return true;
};

const checkTotalEl = (first, second) => {
  if (first >= second) {
    Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
    notActiveElement();
  }
};

export { validationData, checkTotalEl };
