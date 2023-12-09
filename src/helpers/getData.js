import axios from 'axios';
import { Notify } from 'notiflix';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { common } from '../common';
import { gv } from '../variables/globalVariables';

const fetchImages = async () => {
  const query = {
    url: common.BASE_URL,
    method: 'GET',
    params: {
      key: common.API_KEY,
      q: gv.queryText,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: gv.pagination,
      per_page: gv.per_page,
    },
  };

  return await axios(query);
};

const getData = async () => {
  try {
    Loading.standard();
    const response = await fetchImages();
    Loading.remove();

    const data = response.data;

    if (data === undefined) {
      return;
    }
    gv.totalHits = data.totalHits;
    gv.totalElement += gv.per_page;
    return data;
  } catch (error) {
    Notify.failure(error.message);
  }
};

export { getData };
