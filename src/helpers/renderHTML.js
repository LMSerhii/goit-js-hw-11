import { refs } from '../variables/referenses';
import { activeElement, notActiveElement } from './active';
import { getData } from './getData';
import { validationData, checkTotalEl } from './validators';
import { createMarkup } from './createMarkup';
import { createSlider } from './lightBox';

import { gv } from '../variables/globalVariables';
import { scroll } from './scroll';

const renderHTML = async () => {
  notActiveElement();

  const data = await getData();

  if (!validationData(data.hits)) {
    return;
  }

  refs.gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));

  if (refs.gallery.children.length > gv.per_page) {
    scroll();
  }

  activeElement();
  createSlider();
  checkTotalEl(gv.totalElement, gv.totalHits);
};

export { renderHTML };
