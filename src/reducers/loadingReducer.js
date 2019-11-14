import { IMAGES } from '../constants';

export default (state = false, { type }) => {
  switch (type) {
    case IMAGES.LOAD:
      return true;
    case IMAGES.LOAD_SUCCESS:
      return false;
    case IMAGES.LOAD_FAIL:
      return false;

    default:
      return state;
  }
};
