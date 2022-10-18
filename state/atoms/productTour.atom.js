import { atom } from 'recoil';

export const ActiveTourAtom = atom({
  key: 'ActiveTour',
  default: {
    id: null
  }
});

export const ProductTourVisible = atom({
  key: 'VisibleProductTour',
  default: false
});

export const ProductTourIndex = atom({
  key: 'ActiveTourIndex',
  default: null
});
