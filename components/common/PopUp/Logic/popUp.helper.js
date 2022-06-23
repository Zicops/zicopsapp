import { atom } from 'recoil';

// recoil state to track if data is present in pop up form
export const IsDataPresentAtom = atom({
  key: 'IsDataPresent',
  default: false
});
