import OnlyScrollbar from 'only-scrollbar';
import { refs } from '../variables/referenses';

const scroll = () => {
  const { height: cardHeight } =
    refs.gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 3.5,
    behavior: 'smooth',
  });
};

export { scroll };
