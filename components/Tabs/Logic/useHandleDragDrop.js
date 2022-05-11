import { useEffect, useState } from 'react';
import { GET_CATS_N_SUB_CATS } from '../../../API/Queries';
import { getQueryData } from '../../../helper/api.helper';

export default function useHandleDragDrop(courseContextData) {
  const { fullCourse, updateCourseMaster } = courseContextData;
  const { data } = getQueryData(GET_CATS_N_SUB_CATS);

  const [draglist, updateDraglist] = useState([]);
  const [filteredDraglist, updateFilteredDraglist] = useState([]);
  const [droplist, updateDropList] = useState(fullCourse.sub_categories || []);
  const [isDragOn, setIsDragOn] = useState(0);

  // load and set data
  useEffect(() => {
    let subCategoriesForDraglist = [];
    let subCategoriesForDroplist = [];

    if (data?.allCategories) {
      data.allCategories.forEach(function (e, i) {
        subCategoriesForDraglist.push({ rank: i.toString(), name: e });
      });

      // remove selected categories
      subCategoriesForDraglist = subCategoriesForDraglist.filter((category) => {
        const index = droplist.findIndex(
          (selectedCategory) => selectedCategory.name === category.name
        );

        return index < 0;
      });

      // remove falsy values
      subCategoriesForDraglist = subCategoriesForDraglist.filter((c) => c.name);
      subCategoriesForDroplist = droplist.filter((c) => c.name);

      updateDraglist(subCategoriesForDraglist);
      updateDropList(subCategoriesForDroplist);
    }
  }, []);

  useEffect(() => {
    updateFilteredDraglist(draglist);
  }, [draglist]);

  useEffect(() => {
    updateCourseMaster({
      ...fullCourse,
      sub_categories: droplist
    });
  }, [droplist]);

  function handleOnDragEnd(result) {
    setIsDragOn(2);
    const previousDraglist = [...draglist];
    const previousDroplist = [...droplist];
    if (result.destination?.droppableId !== 'subcategories') return;

    if (result.source?.droppableId === 'subcategories') {
      const [reorderedItem] = previousDroplist.splice(result.source.index, 1);
      previousDroplist.splice(result.destination.index, 0, reorderedItem);
      previousDroplist.map((e, i) => (e.rank = i));

      return updateDropList(previousDroplist);
    }

    if (previousDroplist.length >= 5) {
      return;
    }

    const [reorderedItem] = previousDraglist.splice(result.source.index, 1);
    reorderedItem['rank'] = previousDroplist.length;
    previousDroplist.push(reorderedItem);
    updateDropList(previousDroplist);
    updateDraglist(previousDraglist);
  }

  function removeItem(e) {
    const [rank, name, index] = e.target.getAttribute('data-index').split(',');

    const previousDroplist = [...droplist];
    const previousDraglist = [...draglist];

    previousDroplist.splice(index, 1);
    previousDraglist.push({ rank, name });

    updateDropList(previousDroplist);
    updateDraglist(previousDraglist);

    if (previousDroplist.length == 0) {
      setIsDragOn(0);
    }
  }

  function handleSearch(e) {
    const searchQuery = e.target.value.toLowerCase().trim();
    const currentDraglist = [...draglist];
    const filteredList = currentDraglist.filter((category) =>
      category.name.toLowerCase().includes(searchQuery)
    );

    updateFilteredDraglist(filteredList);
  }

  function highlightDroppable() {
    setIsDragOn(1);
  }

  return {
    draglist: filteredDraglist,
    droplist,
    isDragOn,
    handleSearch,
    highlightDroppable,
    handleOnDragEnd,
    removeItem
  };
}
