import { refs } from '../variables/referenses';
import { activeElement, notActiveElement } from './active';
import { getData } from './getData';
import { validationData, checkTotalEl } from './validators';
import { createMarkup } from './createMarkup';
import { createLightbox } from './greateLightbox';
import { gv } from '../variables/globalVariables';

const renderHTML = async () => {
  notActiveElement();

  const data = await getData();

  if (!validationData(data.hits)) {
    return;
  }

  refs.gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));

  activeElement();

  createLightbox();

  checkTotalEl(gv.totalElement, gv.totalHits);
};

export { renderHTML };
