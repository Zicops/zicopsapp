import { FloatingNotesAtom } from '@/state/atoms/notes.atom';
import { VideoAtom } from '@/state/atoms/video.atom';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getNoteCardObj, NOTE_CARD_SIZE } from './customVideoPlayer.helper';

export default function useHandleNotes() {
  const [floatingNotes, setFloatingNotes] = useRecoilState(FloatingNotesAtom);
  const videoData = useRecoilValue(VideoAtom);

  const [filteredNotes, setFilteredNotes] = useState([]);
  const [isNotesOpen, setIsNotesOpen] = useState(true);

  useEffect(() => {
    let allNotes = structuredClone(floatingNotes)?.map((note) => {
      note.isOpen = true;
      return note;
    });

    setFloatingNotes(allNotes);
  }, []);
  // useEffect(() => {
  //   setFilteredNotes(
  //     floatingNotes?.filter((notes) => notes?.topic_id === videoData?.topicContent[0]?.topicId)
  //   );
  // }, []);

  function handleNote(e, noteObj) {
    const allNotes = structuredClone([...floatingNotes]);

    const index = allNotes?.findIndex((note) => {
      if (!note?.user_notes_id) return note?.sequence === noteObj?.sequence;
      return note?.user_notes_id === noteObj?.user_notes_id;
    });

    allNotes[index].details = e?.target?.value;
    setFloatingNotes(allNotes);
  }

  function handleDragEnd(e, noteObj) {
    const allNotes = structuredClone([...floatingNotes]);
    const index = allNotes?.findIndex((note) => {
      if (!note?.user_notes_id) return note?.sequence === noteObj?.sequence;
      return note?.user_notes_id === noteObj?.user_notes_id;
    });

    allNotes[index].isFloating = true;
    allNotes[index].x = e.pageX;
    allNotes[index].y = e.pageY - NOTE_CARD_SIZE / 2;

    setFloatingNotes(allNotes);
  }

  function handleClose(noteObj) {
    let allNotes = structuredClone(floatingNotes);
    const index = allNotes?.findIndex((note) => {
      if (!note?.user_notes_id) return note?.sequence === noteObj?.sequence;
      return note?.user_notes_id === noteObj?.user_notes_id;
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
      if (!note?.user_notes_id) return note?.sequence === noteObj?.sequence;
      return note?.user_notes_id === noteObj?.user_notes_id;
    });

    const isPinned = !allNotes?.[index]?.isPinned;
    allNotes[index].isFloating = true;
    allNotes[index].isPinned = isPinned;

    allNotes[index].x = isPinned ? e.screenX - NOTE_CARD_SIZE : null;
    allNotes[index].y = isPinned ? e.screenY - NOTE_CARD_SIZE : null;

    setFloatingNotes(allNotes);
  }

  function addNewNote(topic_id) {
    const allNotes = structuredClone(
      floatingNotes?.filter((notes) => notes?.topic_id === topic_id)
    );
    const lastNote = allNotes?.[allNotes.length - 1];

    allNotes.push({
      ...getNoteCardObj({
        user_notes_id: Math.random(),
        sequence: lastNote?.sequence + 1 || 1,
        topic_id: topic_id
      }),
      isNew: true
    });
    console.log(allNotes);
    setFloatingNotes(allNotes);
  }

  function deleteNote(noteObj) {
    const allNotes = structuredClone(floatingNotes);
    const index = allNotes?.findIndex((note) => note?.user_notes_id === noteObj?.user_notes_id);

    allNotes?.splice(index, 1);
    setFloatingNotes(allNotes);
  }

  function toggleAllNotes() {
    const isOpen = !isNotesOpen;
    let allNotes = structuredClone(floatingNotes)?.map((note) => {
      note.isOpen = isOpen;
      return note;
    });

    setFloatingNotes(allNotes);
    setIsNotesOpen(isOpen);
  }

  return {
    filteredNotes,
    handleNote,
    handleDragEnd,
    handleClose,
    handlePin,
    toggleAllNotes,
    addNewNote,
    deleteNote
  };
}
