import axios from 'axios';
import { Notify } from 'notiflix';
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
      per_page: 200,
    },
  };

  return await axios(query);
};

const getData = async () => {
  try {
    const response = await fetchImages();
    console.log(response);
    gv.totalHits = response.data.totalHits;
    gv.totalElement += 200;
    return response.data;
  } catch (error) {
    Notify.failure(error.message);
  }
};

export { getData };
