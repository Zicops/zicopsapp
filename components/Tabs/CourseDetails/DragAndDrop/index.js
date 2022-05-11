import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import useHandleDragDrop from '../../Logic/useHandleDragDrop';

const DragDrop = ({ data, contextData }) => {
  const {
    draglist,
    droplist,
    isDragOn,
    handleSearch,
    highlightDroppable,
    handleOnDragEnd,
    removeItem
  } = useHandleDragDrop(contextData);

  return (
    <>
      <div className="row" style={{ alignItems: 'center' }}>
        <DragDropContext onDragStart={highlightDroppable} onDragEnd={handleOnDragEnd}>
          <label htmlFor="name3" className="col_25">
            Additional Categories / Sub-categories
          </label>

          <div className="col_25">
            <div className="drag_category_area">
              <div className="inner_drag_srch">
                <input
                  type="text"
                  id="search"
                  placeholder="Search"
                  autoComplete="off"
                  onInput={handleSearch}></input>
              </div>
              <Droppable droppableId="categories">
                {(provided) => (
                  <div id="dca" {...provided.droppableProps} ref={provided.innerRef}>
                    {draglist.map(({ rank, name }, index) => {
                      return (
                        <Draggable key={name + rank} draggableId={'drag_' + rank} index={index}>
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

          <div className="col_10">
            <img className="handdrag" src="/images/handdrag.png" />
          </div>

          <div className="col_25">
            <Droppable droppableId="subcategories">
              {(provided) => (
                <div
                  className={`drop_category_area ${isDragOn == 1 ? 'primary' : ''} ${
                    isDragOn == 2 ? 'lgrey' : ''
                  }`}
                  {...provided.droppableProps}
                  ref={provided.innerRef}>
                  {droplist.map(({ rank, name }, index) => {
                    return (
                      <Draggable
                        key={name + rank}
                        draggableId={'drop_' + rank.toString()}
                        index={index}>
                        {(provided) => (
                          <div
                            className="wrap_drop disableTextSelection"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}>
                            <div className="Sr_no">{index + 1}</div>
                            <div className="inner_drop_ele">
                              {name}
                              <span data-index={[rank, name, index]} onClick={removeItem}>
                                x
                              </span>
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
            border: 2px solid var(--dark_three) !important;
          }
          .green {
            border: 2px solid #00ff00 !important;
          }
          .primary {
            border: 2px solid var(--primary);
            box-shadow: 0 0 10px 0 var(--primary);
          }
          .drop_category_area,
          .drag_category_area {
            height: 180px;
            overflow-y: auto;
            margin: 10px;
            background-color: #1a1a1a;
            border-radius: 10px;
          }
          /* Scrollbar */
          /* width */
          .drop_category_area::-webkit-scrollbar,
          .drag_category_area::-webkit-scrollbar {
            width: 5px;
            border-radius: 7px;
            cursor: pointer;
          }
          /* Track */
          .drop_category_area::-webkit-scrollbar-track
            .drag_category_area::-webkit-scrollbar-track {
            background: #2a2e31;
            border-radius: 7px;
          }
          /* Handle */
          .drop_category_area::-webkit-scrollbar-thumb
            .drag_category_area::-webkit-scrollbar-thumb {
            background: #969a9d;
            border-radius: 7px;
          }
          /* Handle on hover */
          .drop_category_area::-webkit-scrollbar-thumb::hover
            .drag_category_area::-webkit-scrollbar-thumb::hover {
            background: #555;
          }

          .inner_drag_ele {
            background-color: #202222;
            margin: 10px;
            border-radius: 5px;
            padding: 3px 15px;
            font-size: 13px;
            color: #858f8f;
          }
          .inner_drop_ele {
            background-color: #202222;
            /* margin: 10px; */
            border-radius: 5px;
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
            // border-radius: 50%;
            // text-align: center;
          }
          .handdrag {
            width: 50px;
            display: block;
            margin: auto;
          }
          .inner_drag_srch {
            margin-bottom: 0;
          }
          .inner_drag_srch input {
            background-color: #202222;
            border: 1px solid #858f8f;
            border-radius: 5px;
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
            border-radius: 5px;
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
