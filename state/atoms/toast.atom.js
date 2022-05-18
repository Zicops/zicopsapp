import { atom } from 'recoil';

export const ToastMsgAtom = atom({
  key: 'ToastMsg',
  default: [],
  effects: [
    ({ onSet, setSelf }) => {
      onSet((newToastMsgObj, prevToastMsgArr) => {
        if (!newToastMsgObj.type && !newToastMsgObj.message) return;

        const prevArr = prevToastMsgArr.type ? [prevToastMsgArr] : [...prevToastMsgArr];
        const toastMsgArr = [...prevArr, newToastMsgObj];

        console.log(toastMsgArr);
        setSelf(toastMsgArr);
      });
    }
  ]
});
