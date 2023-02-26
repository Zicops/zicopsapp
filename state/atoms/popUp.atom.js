import { useRouter } from 'next/router';
import { atom, atomFamily, selectorFamily } from 'recoil';

// all popUp states
const popUpStates = {
  // exams
  addQuestionBank: false,
  editQuestionBank: false,
  editQuestions: false,
  viewQuestions: false,
  addCustomSection: false,
  addQuestionMetaData: false,

  // course
  addModule: false,
  editModule: false,
  addChapter: false,
  editChapter: false,
  addTopic: false,
  editTopic: false
};

export const PopUpStatesAtomFamily = atomFamily({
  key: 'PopUpStates',
  default: selectorFamily({
    key: 'PopUpStates',
    get:
      (param) =>
      ({ get }) => {
        console.log(param, get);
        return popUpStates?.param || false;
      },
    set: (param) => (s) => {
      console.log(param, s);
    }
  }),
  effects: (param) => [
    // TODO:  udpate url on update
    setInitalStateBasedOnUrl(param)
    // ({ onSet }) => {
    //   const router = useRouter();
    //   onSet((state) => {
    //     let urlState = `${param}=${state}`;
    //     if (!router.asPath.includes('#')) urlState = '#' + urlState;
    //     router.push(urlState, state, { shallow: true });
    //   });
    // }
  ]
});

const setInitalStateBasedOnUrl =
  (param) =>
  ({ setSelf, trigger }) => {
    const router = useRouter();
    const hash = router.asPath.split('#')[1];

    if (process.browser && trigger === 'get') {
      setSelf(splitUrlToGetObjectFromHash(hash)[param] || popUpStates[param] || false);
    }
  };

// #key1=value1&key2=value2 to {key1: value1, key2: value2}
function splitUrlToGetObjectFromHash(hash) {
  const returnObj = {};
  if (!hash) return returnObj;

  hash.split('&').map((h) => {
    const arr = h.split('=');
    returnObj[arr[0]] = arr[1] === 'true';
  });

  return returnObj;
}

export const DeleteConfirmDataAtom = atom({
  key: 'DeleteConfirmData',
  default: getDeleteConfirmDataObj()
});

export function getDeleteConfirmDataObj(data = {}) {
  return {
    showConfirm: data?.showConfirm || false,
    id: data?.id || null,
    variableObj: {},
    mutation: data?.mutation || null,
    confirmMsg: data?.confirmMsg || null,
    onDelete: () => {},
    beforeDelete: () => {},
    resKey: null
  };
}
