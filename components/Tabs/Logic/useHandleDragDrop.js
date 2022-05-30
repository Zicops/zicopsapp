import { useEffect, useState } from 'react';
import { GET_CATS_N_SUB_CATS } from '../../../API/Queries';
import { getQueryData } from '../../../helper/api.helper';

export default function useHandleDragDrop(courseContextData) {
  const { fullCourse, updateCourseMaster } = courseContextData;
  const { data } = getQueryData(GET_CATS_N_SUB_CATS);

  const [searchQuery, setSearchQuery] = useState('');
  const [draglist, updateDraglist] = useState([]);
  const [filteredDraglist, updateFilteredDraglist] = useState([]);
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
    const prevDraglist = filteredDraglist.length ? [...filteredDraglist] : [...draglist];
    const prevDroplist = droplist.length ? [...droplist] : [];

    if (result.destination?.droppableId !== 'subcategories') return;
    if (prevDroplist.length >= 5) return;

    if (result.destination?.droppableId === 'subcategories') {
      const dragItemIndex = result.source.index;
      const [dragItem] = prevDraglist.splice(dragItemIndex, 1);
      dragItem['rank'] = prevDroplist.length;
      prevDroplist.push(dragItem);

      updateDroplist(prevDroplist);
      !searchQuery ? updateDraglist(prevDraglist) : updateFilteredDraglist(prevDraglist);

      return;
    }
  }

  function removeItem(e) {
    const [rank, name, index] = e.target.getAttribute('data-index').split(',');

    const previousDroplist = [...droplist];
    const previousDraglist = [...draglist];

    previousDroplist.splice(index, 1);
    previousDraglist.push({ rank, name });

    updateDroplist(previousDroplist);
    updateDraglist(previousDraglist);
    setSearchQuery('');
    if (previousDroplist.length == 0) {
      setIsDragOn(0);
    }
  }

  function handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    const currentDraglist = [...draglist].filter(
      (item) => !droplist.find((obj) => obj.name === item.name)
    );;
    const filteredList = currentDraglist.filter((category) =>
      category.name.toLowerCase().includes(query)
    );

    setSearchQuery(query);
    updateFilteredDraglist(filteredList);
  }

  function highlightDroppable() {
    setIsDragOn(1);
  }

  return {
    draglist: filteredDraglist,
    droplist,
    isDragOn,
    searchQuery,
    handleSearch,
    highlightDroppable,
    handleOnDragEnd,
    removeItem
  };
}
