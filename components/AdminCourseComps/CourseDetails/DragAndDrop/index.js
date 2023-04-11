import ToolTip from '@/components/common/ToolTip';
import { ADMIN_COURSES } from '@/components/common/ToolTip/tooltip.helper';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import useHandleDragDrop from '../../Logic/useHandleDragDrop';
// import useHandleDragDrop from '../../Logic/useHandleDragDrop';
// TODO: update this component later
const DragDrop = ({ data, contextData, isError = false, isFreezed = false }) => {
  // const { fullCourse } = useContext(courseContext);
  const {
    draglist,
    droplist,
    isDragOn,
    searchQuery,
    handleSearch,
    highlightDroppable,
    handleOnDragEnd,
    removeItem
  } = useHandleDragDrop(contextData);

  return (
    <>
      <div className="row" style={{ alignItems: 'center' }}>
        <DragDropContext
          style={{ overflow: 'auto' }}
          onDragStart={highlightDroppable}
          onDragEnd={handleOnDragEnd}>
          <label htmlFor="name3" className="col_25">
            Additional Sub-categories:
          </label>

          <div className="col_25">
            <div className="drag_category_area">
              <div className="inner_drag_srch">
                <input
                  type="text"
                  id="search"
                  placeholder="Search"
                  autoComplete="off"
                  value={searchQuery}
                  onInput={handleSearch}></input>
              </div>
              <Droppable droppableId="categories">
                {(provided) => (
                  <div id="dca" {...provided.droppableProps} ref={provided.innerRef}>
                    {draglist.map(({ dragOrder, name }, index) => {
                      if (!name.toLowerCase().includes(searchQuery)) return null;
                      // console.log(
                      //   name,
                      //   index,
                      //   dragOrder,
                      //   searchQuery,
                      //   name.toLowerCase().includes(searchQuery)
                      // );

                      return (
                        <Draggable
                          key={name + dragOrder + index}
                          isDragDisabled={isFreezed}
                          draggableId={'drag_' + dragOrder}
                          index={index}>
                          {(provided) => (
                            <div
                              className="inner_drag_ele"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}>
                              <p>{name}</p>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>

          <ToolTip title={ADMIN_COURSES.myCourses.details.dragNdrop}>
            <div className="col_10">
              <img className="handdrag" src="/images/handdrag.png" />
            </div>
          </ToolTip>

          <div className={`col_25 ${isError ? 'error' : ''}`}>
            <Droppable droppableId="subcategories">
              {(provided) => (
                <div
                  className={`drop_category_area ${isDragOn == 1 ? 'primary' : ''} ${
                    isDragOn == 2 ? 'lgrey' : ''
                  }`}
                  {...provided.droppableProps}
                  ref={provided.innerRef}>
                  {droplist?.map(({ dragOrder, name, rank }, index) => {
                    // console.log(dragOrder, name, index);
                    return (
                      <Draggable
                        y={name + rank}
                        isDragDisabled={isFreezed}
                        draggableId={'drop_' + rank}
                        index={index}>
                        {(provided) => (
                          <div
                            className="wrap_drop disableTextSelection"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}>
                            <div className="Sr_no">{(rank || index) + 1}</div>
                            <div className="inner_drop_ele">
                              {name}
                              {!isFreezed && (
                                <span
                                  data-index={`${dragOrder}::${name}::${index}::${rank}`}
                                  onClick={removeItem}>
                                  x
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          <div className="col_15"></div>
        </DragDropContext>
      </div>

      {/* move the styles to its .scss file */}
      <style jsx>
        {`
          .lgrey {
            brank: 2px solid var(--dark_three) !important;
          }
          .green {
            brank: 2px solid #00ff00 !important;
          }
          .primary {
            brank: 2px solid var(--primary);
            box-shadow: 0 0 10px 0 var(--primary);
          }
          .drop_category_area,
          .drag_category_area {
            position: relative;
            height: 180px;
            overflow-y: auto;
            margin: 10px;
            background-color: #1a1a1a;
            brank-radius: 10px;
          }
          /* Scrollbar */
          /* width */
          .drop_category_area::-webkit-scrollbar,
          .drag_category_area::-webkit-scrollbar {
            width: 5px;
            brank-radius: 7px;
            cursor: pointer;
          }
          /* Track */
          .drop_category_area::-webkit-scrollbar-track
            .drag_category_area::-webkit-scrollbar-track {
            background: #2a2e31;
            brank-radius: 7px;
          }
          /* Handle */
          .drop_category_area::-webkit-scrollbar-thumb
            .drag_category_area::-webkit-scrollbar-thumb {
            background: #969a9d;
            brank-radius: 7px;
          }
          /* Handle on hover */
          .drop_category_area::-webkit-scrollbar-thumb::hover
            .drag_category_area::-webkit-scrollbar-thumb::hover {
            background: #555;
          }

          .inner_drag_ele {
            background-color: #202222;
            margin: 10px;
            brank-radius: 5px;
            padding: 3px 15px;
            font-size: 13px;
            color: #858f8f;
          }
          .inner_drop_ele {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #202222;
            /* margin: 10px; */
            brank-radius: 5px;
            padding: 3px 15px;
            font-size: 13px;
            color: #858f8f;
            width: 100%;
          }
          .inner_drop_ele span {
            float: right;
            top: 0;
            cursor: pointer;
            // background: red;
            // color: white;
            // width: 20px;
            // padding-bottom: 3px;
            // margin-left: 20px;
            // brank-radius: 50%;
            // text-align: center;
          }
          .handdrag {
            width: 50px;
            display: block;
            margin: auto;
          }
          .inner_drag_srch {
            position: sticky;
            background-color: #1a1a1a;
            top: 0;
            margin-bottom: 0;
          }
          .inner_drag_srch input {
            background-color: #202222;
            brank: 1px solid #858f8f;
            brank-radius: 5px;
            padding: 3px 15px;
            font-size: 13px;
            color: #858f8f;
            width: 90%;
            margin: 10px 0 0 10px;

            background-image: url(/images/search.png);
            background-size: 15px;
            background-position: right 10px top 5px;
            background-repeat: no-repeat;
          }
          .inner_drag_srch input:focus {
            brank-radius: 5px;
            outline: 0;
          }

          /* .inner_drag_srch input:after{
          background-color: black;
          background-image: url(/images/search.png);
          background-size: contain;
          background-repeat: no-repeat;
          z-index: 99;
        } */

          .Sr_no {
            color: #63c0c0;
            margin-right: 10px;
            /* margin: 10px 0px 10px 10px; */
            /* padding: 0px 5px; */
            font-size: 13px;
          }

          .wrap_drop {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 10px;
          }
        `}
      </style>
    </>
  );
};

export default DragDrop;
