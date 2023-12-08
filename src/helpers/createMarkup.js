import { validationData } from './validators';

const createMarkup = arrey => {
  if (!validationData(arrey)) {
    return '';
  }

  return arrey
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
      <div class="photo-card">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" width="300" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes</b>${likes}
          </p>
          <p class="info-item">
            <b>Views</b>${views}
          </p>
          <p class="info-item">
            <b>Comments</b>${comments}
          </p>
          <p class="info-item">
            <b>Downloads</b>${downloads}
          </p>
        </div>
      </div>`;
      }
    )
    .join('');
};

export { createMarkup };
