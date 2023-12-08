import { refs } from './variables/referenses';
import { onFormSubmit, loadMore } from './helpers/eventCallbacks';

refs.form.addEventListener('submit', onFormSubmit);
refs.moreBtn.addEventListener('click', loadMore);
