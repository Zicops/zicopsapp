import { FloatingNotesAtom } from '@/state/atoms/notes.atom';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { NOTE_CARD_SIZE } from './customVideoPlayer.helper';

const dummyNotes = [
  {
    id: 1,
    index: 1,
    note: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    isPinned: false,
    isOpen: true
  },
  { id: 2, index: 2, note: 'This is note 2', isPinned: false, isOpen: true },
  { id: 3, index: 3, note: 'This is note 3', isPinned: false, isOpen: true },
  { id: 4, index: 4, note: 'This is note 4', isPinned: false, isOpen: true },
  { id: 5, index: 5, note: 'This is note 5', isPinned: false, isOpen: true },
  { id: 6, index: 6, note: 'This is note 6', isPinned: false, isOpen: true },
  { id: 7, index: 7, note: 'This is note 7', isPinned: false, isOpen: true },
  { id: 8, index: 8, note: 'This is note 8', isPinned: false, isOpen: true },
  { id: 9, index: 9, note: 'This is note 9', isPinned: false, isOpen: true },
  { id: 10, index: 10, note: 'This is note 1', isPinned: false, isOpen: true },
  { id: 11, index: 11, note: 'This is note 1', isPinned: false, isOpen: true },
  { id: 12, index: 12, note: 'This is note 2', isPinned: false, isOpen: true },
  { id: 13, index: 13, note: 'This is note 3', isPinned: false, isOpen: true },
  { id: 14, index: 14, note: 'This is note 4', isPinned: false, isOpen: true },
  { id: 15, index: 15, note: 'This is note 5', isPinned: false, isOpen: true },
  { id: 16, index: 16, note: 'This is note 6', isPinned: false, isOpen: true },
  { id: 17, index: 17, note: 'This is note 7', isPinned: false, isOpen: true },
  { id: 18, index: 18, note: 'This is note 8', isPinned: false, isOpen: true },
  { id: 19, index: 19, note: 'This is note 9', isPinned: false, isOpen: true }
];

export default function useHandleNotes() {
  const [floatingNotes, setFloatingNotes] = useRecoilState(FloatingNotesAtom);

  const [userNotes, setUserNotes] = useState([...dummyNotes]);

  useEffect(() => {
    if (!floatingNotes?.length) return;
    const filterFloatingNotes = [...userNotes].filter(
      (note) => floatingNotes.findIndex((obj) => obj.id === note.id) < 0
    );
    setUserNotes(filterFloatingNotes);
  }, []);

  function handleDragEnd(e, noteObj, i) {
    console.log(e);
    const allNotes = structuredClone([...userNotes]).filter((note) => note.id !== noteObj?.id);

    setUserNotes(allNotes);
    setFloatingNotes([...floatingNotes, { ...userNotes[i], x: e.clientX, y: e.clientY }]);
  }

  function handleClose(noteObj, index, isFloating = false) {
    let allNotes = structuredClone(userNotes);
    if (isFloating) {
      const allFloatingNotes = structuredClone(userNotes);
      allFloatingNotes[index].isOpen = false;
      allFloatingNotes[index].isPinned = false;

      allNotes.splice(index, 0, allFloatingNotes[index]);
      allFloatingNotes.splice(index, 1);
      setUserNotes(allNotes);
      return setFloatingNotes(allFloatingNotes);
    }

    allNotes[index].isOpen = false;
    allNotes[index].isPinned = false;

    setUserNotes(allNotes);
  }

  function handlePin(e, noteObj, index, isFloating = false) {
    // let allNotes = structuredClone(userNotes);
    window.e = e;
    console.log(e);
    // allNotes[index].isPinned = !allNotes[index].isPinned;

    const allNotes = structuredClone([...userNotes]).filter((note) => note.id !== noteObj?.id);

    setUserNotes(allNotes);
    setFloatingNotes([
      ...floatingNotes,
      {
        ...userNotes[index],
        x: e.screenX - NOTE_CARD_SIZE,
        y: e.screenY - NOTE_CARD_SIZE,
        isPinned: true
      }
    ]);

    setUserNotes(allNotes);
  }

  function showAll() {
    let allNotes = structuredClone(userNotes).map((note) => {
      note.isOpen = true;
      return note;
    });
    console.log(allNotes, userNotes, floatingNotes);

    setUserNotes(allNotes);
  }

  return { userNotes, handleDragEnd, handleClose, handlePin, showAll };
}
