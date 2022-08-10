import { FloatingNotesAtom } from '@/state/atoms/notes.atom';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { getNoteCardObj, NOTE_CARD_SIZE } from './customVideoPlayer.helper';

const dummyNotes = [
  { id: 1, index: 1, note: 'Lorem, dolor si.', isPinned: false, isFloating: false, isOpen: true },
  { id: 2, index: 2, note: 'This is note 2', isPinned: false, isFloating: false, isOpen: true },
  { id: 3, index: 3, note: 'This is note 3', isPinned: false, isFloating: false, isOpen: true },
  { id: 4, index: 4, note: 'This is note 4', isPinned: false, isFloating: false, isOpen: true },
  { id: 5, index: 5, note: 'This is note 5', isPinned: false, isFloating: false, isOpen: true },
  { id: 6, index: 6, note: 'This is note 6', isPinned: false, isFloating: false, isOpen: true },
  { id: 7, index: 7, note: 'This is note 7', isPinned: false, isFloating: false, isOpen: true },
  { id: 8, index: 8, note: 'This is note 8', isPinned: false, isFloating: false, isOpen: true },
  { id: 9, index: 9, note: 'This is note 9', isPinned: false, isFloating: false, isOpen: true },
  { id: 10, index: 10, note: 'This is note 1', isPinned: false, isFloating: false, isOpen: true },
  { id: 11, index: 11, note: 'This is note 1', isPinned: false, isFloating: false, isOpen: true },
  { id: 12, index: 12, note: 'This is note 2', isPinned: false, isFloating: false, isOpen: true },
  { id: 13, index: 13, note: 'This is note 3', isPinned: false, isFloating: false, isOpen: true },
  { id: 14, index: 14, note: 'This is note 4', isPinned: false, isFloating: false, isOpen: true },
  { id: 15, index: 15, note: 'This is note 5', isPinned: false, isFloating: false, isOpen: true },
  { id: 16, index: 16, note: 'This is note 6', isPinned: false, isFloating: false, isOpen: true },
  { id: 17, index: 17, note: 'This is note 7', isPinned: false, isFloating: false, isOpen: true },
  { id: 18, index: 18, note: 'This is note 8', isPinned: false, isFloating: false, isOpen: true },
  { id: 19, index: 19, note: 'This is note 9', isPinned: false, isFloating: false, isOpen: true }
];

export default function useHandleNotes() {
  const [floatingNotes, setFloatingNotes] = useRecoilState(FloatingNotesAtom);

  const [userNotes, setUserNotes] = useState([...dummyNotes]);

  useEffect(() => {
    if (floatingNotes?.length) return;

    // const filterFloatingNotes = [...userNote].filter(
    //   (note) => floatingNotes.findIndex((obj) => obj.id === note.id) < 0
    // );
    // setFloatingNotes(dummyNotes.map((note) => ({ ...note, x: null, y: null })));
    // setUserNote(filterFloatingNotes);
  }, []);

  function handleNote(e, noteObj) {
    const allNotes = structuredClone([...floatingNotes]);

    const index = allNotes?.findIndex((note) => {
      if (!note.id) return note.index === noteObj?.index;
      return note.id === noteObj?.id;
    });

    allNotes[index].note = e.target.value;
    setFloatingNotes(allNotes);
  }

  function handleDragEnd(e, noteObj) {
    const allNotes = structuredClone([...floatingNotes]);
    const index = allNotes?.findIndex((note) => {
      if (!note.id) return note.index === noteObj?.index;
      return note.id === noteObj?.id;
    });

    allNotes[index].isFloating = true;
    allNotes[index].x = e.pageX;
    allNotes[index].y = e.pageY - NOTE_CARD_SIZE / 2;

    setFloatingNotes(allNotes);
  }

  function handleClose(noteObj) {
    let allNotes = structuredClone(floatingNotes);
    const index = allNotes?.findIndex((note) => {
      if (!note.id) return note.index === noteObj?.index;
      return note.id === noteObj?.id;
    });

    allNotes[index].isOpen = false;
    allNotes[index].isPinned = false;
    allNotes[index].isFloating = false;
    allNotes[index].x = null;
    allNotes[index].y = null;

    setFloatingNotes(allNotes);
  }

  function handlePin(e, noteObj) {
    const allNotes = structuredClone([...floatingNotes]);
    const index = allNotes?.findIndex((note) => {
      if (!note.id) return note.index === noteObj?.index;
      return note.id === noteObj?.id;
    });

    const isPinned = !allNotes[index].isPinned;
    allNotes[index].isFloating = true;
    allNotes[index].isPinned = isPinned;

    allNotes[index].x = isPinned ? e.screenX - NOTE_CARD_SIZE : null;
    allNotes[index].y = isPinned ? e.screenY - NOTE_CARD_SIZE : null;

    setFloatingNotes(allNotes);
  }

  function addNewNote() {
    const allNotes = structuredClone(floatingNotes);
    const lastNote = allNotes[allNotes.length - 1];

    allNotes.push(getNoteCardObj({ index: lastNote?.index + 1 || 1 }));
    setFloatingNotes(allNotes);
  }

  function deleteNote(noteObj) {
    const allNotes = structuredClone(floatingNotes);
    const index = allNotes?.findIndex((note) => note?.id === noteObj?.id);

    allNotes?.splice(index, 1);
    setFloatingNotes(allNotes);
  }

  function showAll() {
    let allNotes = structuredClone(floatingNotes).map((note) => {
      note.isOpen = true;
      return note;
    });

    setFloatingNotes(allNotes);
  }

  function hideAll() {
    let allNotes = structuredClone(floatingNotes).map((note) => {
      note.isOpen = false;
      return note;
    });

    setFloatingNotes(allNotes);
  }

  return {
    handleNote,
    handleDragEnd,
    handleClose,
    handlePin,
    showAll,
    hideAll,
    addNewNote,
    deleteNote
  };
}
