import { IMAGES } from '../constants';

export default (state = 1, { type }) => {
  switch (type) {
    case IMAGES.LOAD_SUCCESS:
      return state + 1;
    default:
      return state;
  }
};
