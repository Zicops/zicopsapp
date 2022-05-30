import { useEffect, useState } from 'react';
import { GET_CATS_N_SUB_CATS } from '../../../API/Queries';
import { getQueryData } from '../../../helper/api.helper';

export default function useHandleDragDrop(courseContextData) {
  const { fullCourse, updateCourseMaster } = courseContextData;
  const { data } = getQueryData(GET_CATS_N_SUB_CATS);

  const [searchQuery, setSearchQuery] = useState('');
  const [draglist, updateDraglist] = useState([]);
  const [droplist, updateDroplist] = useState(fullCourse.sub_categories || []);
  const [isDragOn, setIsDragOn] = useState(0);

  // load and set data
  useEffect(() => {
    let subCategoriesForDraglist = [];
    let subCategoriesForDroplist = [];

    if (data?.allSubCategories) {
      data.allSubCategories.forEach(function (e, i) {
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
      updateDroplist(subCategoriesForDroplist);
    }
  }, []);

  useEffect(() => {
    updateCourseMaster({
      ...fullCourse,
      sub_categories: droplist
    });
  }, [droplist]);

  function handleOnDragEnd(result) {
    setIsDragOn(2);
    // local array of state
    const prevDraglist = [...draglist];
    const prevDroplist = droplist.length ? [...droplist] : [];

    // return if the item is not dropped in the subcat box
    if (result.destination?.droppableId !== 'subcategories') return;
    // return if selected items are 5
    if (prevDroplist.length >= 5) return;

    // rearrange the rank in subcat box
    if (result.source.droppableId === 'subcategories') {
      const [reorderedItem] = prevDroplist.splice(result.source.index, 1);
      prevDroplist.splice(result.destination.index, 0, reorderedItem);
      prevDroplist.map((e, i) => (e.rank = i));

      return updateDroplist(prevDroplist);
    }

    // remove item from drag list and add in drop list
    if (result.destination?.droppableId === 'subcategories') {
      const dragItemIndex = result.source.index;
      const [dragItem] = prevDraglist.splice(dragItemIndex, 1);
      dragItem['rank'] = prevDroplist.length;
      prevDroplist.push(dragItem);

      updateDroplist(prevDroplist);
      updateDraglist(prevDraglist);

      return;
    }
  }

  function removeItem(e) {
    const [rank, name, index] = e.target.getAttribute('data-index').split('::');

    const previousDroplist = [...droplist];
    const previousDraglist = [...draglist];

    previousDroplist.splice(index, 1);
    previousDraglist.push({ rank, name });

    updateDroplist(previousDroplist);
    updateDraglist(previousDraglist);
    if (previousDroplist.length === 0) setIsDragOn(0);
  }

  function handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();

    setSearchQuery(query);
  }

  function highlightDroppable() {
    setIsDragOn(1);
  }

  return {
    draglist,
    droplist,
    isDragOn,
    searchQuery,
    handleSearch,
    highlightDroppable,
    handleOnDragEnd,
    removeItem
  };
}
