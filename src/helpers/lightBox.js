import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix';

const createSlider = () => {
  const options = {
    captionsData: 'alt',
    captionPosition: 'bottom',
    overla: true,
    captionDelay: 250,
    enableKeyboard: true,
    docClose: true,
    doubleTapZoom: 2,
    spinner: true,
  };
  let gallery = new SimpleLightbox('.gallery a', options);

  gallery.on('error.simplelightbox', e => {
    Notify.warning('Page not found !!!');
  });

  gallery.refresh();
};

export { createSlider };
