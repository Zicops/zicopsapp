import { useHandleCatSubCat } from '@/helper/hooks.helper';
import { useEffect, useState } from 'react';
import { GET_CATS_N_SUB_CATS } from '../../../API/Queries';
import { getQueryData } from '../../../helper/api.helper';

export default function useHandleDragDrop(courseContextData) {
    const course=[]
//   const { fullCourse, updateCourseMaster } = courseContextData;
  const { catSubCat } = useHandleCatSubCat();

  const [searchQuery, setSearchQuery] = useState('');
  const [draglist, updateDraglist] = useState([]);
  const [droplist, updateDroplist] = useState(course || []);
  const [isDropListUpdated, setIsDropListUpdated] = useState(false);
  const [isDragOn, setIsDragOn] = useState(0);

  // load and set data
  useEffect(() => {
    if (!catSubCat?.subCat) return;

    let newDraglist = [];
    let newDroplist = [];

    const data = { allSubCategories: catSubCat?.subCat || [] };
    if (data?.allSubCategories?.length) {
      data.allSubCategories.forEach(function (e, i) {
        // if (
        //     // course?.toLowerCase()?.trim()?.includes(e?.Name?.toLowerCase()?.trim())
        // )
          return;

        newDraglist.push({ dragOrder: i, name: e?.Name });
      });

      // remove selected categories
      const selectedItems = [];
      newDraglist = newDraglist.filter((item) => {
        const index =course?.findIndex(
          (selected) => selected.name === item.name
        );
        const isSelected = index < 0;
        if (!isSelected) selectedItems.push({ rank: index, ...item });

        return isSelected;
      });

      // remove falsy values
      newDraglist = newDraglist.filter((c) => c.name);
      newDroplist = selectedItems
        ?.map((item) => {
          const index = droplist.findIndex((selected) => selected.name === item.name);
          const selectedItemOrder = droplist[index]?.rank;

          return { name: item.name, dragOrder: item.dragOrder, rank: selectedItemOrder };
        })
        .sort((item1, item2) => item1.rank - item2.rank);

      updateDraglist(
        newDraglist?.sort((item1, item2) =>
          item1.name?.toLowerCase()?.trim()?.localeCompare(item2.name?.toLowerCase()?.trim())
        ) || []
      );
      setIsDropListUpdated(true);
      updateDroplist(newDroplist);
    }
  }, [catSubCat?.subCat]);

//   useEffect(() => {
//     if (!isDropListUpdated) return;

//     updateCourseMaster({
//       ...fullCourse,
//       sub_categories: droplist.map((item) => {
//         return { name: item.name, rank: item.rank };
//       })
//     });
//   }, [isDropListUpdated, droplist]);

  function handleOnDragEnd(result) {
    setIsDragOn(2);
    // local array of state
    const prevDraglist = [...draglist];
    const prevDroplist = droplist.length ? [...droplist] : [];

    // return if the item is not dropped in the subcat box
    if (result.destination?.droppableId !== 'subcategories') return;

    // rearrange the dragOrder in subcat box
    if (result.source.droppableId === 'subcategories') {
      const [rerankedItem] = prevDroplist.splice(result.source.index, 1);
      prevDroplist.splice(result.destination.index, 0, rerankedItem);
      prevDroplist.map((e, i) => (e.rank = i));

      return updateDroplist(prevDroplist);
    }

    // return if selected items are 5
    if (prevDroplist.length >= 5) return;

    // remove item from drag list and add in drop list
    if (result.destination?.droppableId === 'subcategories') {
      const dragItemIndex = result.source.index;
      const [dragItem] = prevDraglist.splice(dragItemIndex, 1);
      dragItem['rank'] = prevDroplist.length;
      prevDroplist.push(dragItem);

      updateDroplist(prevDroplist);
      updateDraglist(
        prevDraglist?.sort((item1, item2) =>
          item1.name?.toLowerCase()?.trim().localeCompare(item2.name?.toLowerCase()?.trim())
        ) || []
      );

      return;
    }
  }

  function removeItem(e) {
    const [dragOrder, name, index, rank] = e.target.getAttribute('data-index').split('::');

    const previousDroplist = [...droplist];
    const previousDraglist = [...draglist];

    previousDroplist.splice(index, 1);
    previousDraglist.splice(dragOrder, 0, { dragOrder, name });

    updateDroplist(previousDroplist);
    updateDraglist(
      previousDraglist?.sort((item1, item2) =>
        item1.name?.toLowerCase()?.trim().localeCompare(item2.name?.toLowerCase()?.trim())
      ) || []
    );
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
