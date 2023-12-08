import { refs } from '../variables/referenses';

const activeElement = () => refs.moreBtn.classList.add('is-active');

const notActiveElement = () => refs.moreBtn.classList.remove('is-active');

export { activeElement, notActiveElement };
