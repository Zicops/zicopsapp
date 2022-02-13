import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import React, { useState } from 'react';

const categories = [
  {
    id: '1',
    name: 'Java',
  },
  {
    id: '2',
    name: 'HTML',
  },
  {
    id: '3',
    name: 'CSS',
  },
  {
    id: '4',
    name: 'React',
  },
  {
    id: '5',
    name: 'Python',
  },
  {
    id: '6',
    name: 'Ruby',
  },
]

const DragDrop = () => {
  const [draglist, updateDraglist] = useState(categories);
  const [droplist, updateDropList] = useState([]);
 

  function handleOnDragEnd(result) {
    document.getElementById('cad').classList.remove("primary")

    if (!result.destination){
      if(droplist.length > 0){
        document.getElementById('cad').classList.add("lgrey")
      }
      return;
    } 
    if (result.destination.droppableId != 'subcategories') {
      if(droplist.length > 0){
        document.getElementById('cad').classList.add("lgrey")
      }
      return;
    }

    if (result.source.droppableId != 'subcategories'){
      const newlist = Array.from(droplist);
      const list = Array.from(draglist);
      const [reorderedItem] = list.splice(result.source.index, 1);
      
      if(newlist.length < 5){
        newlist.push(reorderedItem);
        updateDropList( newlist );
        updateDraglist( list ); 
        document.getElementById('cad').classList.add("lgrey")
      } else {
        document.getElementById('cad').classList.add("lgrey")
        return;
      }
           
    } else {
      const newlist = Array.from(droplist);
      const [reorderedItem] = newlist.splice(result.source.index, 1);
      newlist.splice(result.destination.index, 0, reorderedItem);
      updateDropList(newlist);
      document.getElementById('cad').classList.add("lgrey")
    }
  }

  function remove(e) {
    const [id, name, index] = e.target.getAttribute("data-index").split(',');

    const newlist = Array.from(droplist);
    newlist.splice(index, 1);
    updateDropList( newlist );

    if(newlist.length == 0){
      document.getElementById('cad').classList.remove("lgrey")
      document.getElementById('cad').classList.remove("primary")
    }
    const list = Array.from(draglist);
    list.push({id, name});
    updateDraglist( list );
  }

  function Search() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('search');
    filter = input.value.toUpperCase();
    ul = document.getElementById("dca");
    li = ul.getElementsByClassName('inner_drag_ele');
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("p")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }

  function highlightDroppable(){
    document.getElementById('cad').classList.remove("lgrey")
    document.getElementById('cad').classList.add("primary")
  }
  return (
    <>
      <div className="row" style={{alignItems:'center'}}>
      <DragDropContext onDragStart={highlightDroppable} onDragEnd={handleOnDragEnd}>
        <label htmlFor="name3" className="col_25">Additional Categories / Sub-categories</label>
        <div className="col_25">
            <Droppable droppableId="categories">
              {(provided, snapshot) => (
                <div className="drag_category_area" id="dca" {...provided.droppableProps} ref={provided.innerRef}>
                  <div className="inner_drag_srch">
                    <input type="text" id="search" placeholder='Search' onInput={Search}></input>
                  </div>
                  {draglist.map(({ id, name }, index) => {
                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided, snapshot) => (
                          <div className="inner_drag_ele"
                          ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <p>
                              {name}
                            </p>
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
        <div className="col_10">
          <img className="handdrag" src='/images/handdrag.png' />
        </div>
        <div className="col_25">
            <Droppable droppableId="subcategories">
              {(provided, snapshot) => (
                <div className="drop_category_area" id="cad" {...provided.droppableProps} ref={provided.innerRef}>
                  {droplist.map(({ id, name }, index) => {
                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided) => (
                          <div className="wrap_drop" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <div className="Sr_no">{index + 1}</div>
                            <div className="inner_drop_ele">{name}<span data-index={[id, name, index]} onClick={remove}>x</span></div>
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
        <div className="col_15">
        </div>
        </DragDropContext>
      </div>
      <style jsx>
        {`      
        .lgrey { 
          border: 2px solid var(--dark_three)!important;
        }
        .green { 
          border: 2px solid #00ff00!important;
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
          cursor: pointer;
        }
        .handdrag{
          width: 50px;
          display: block;
          margin: auto;
        }
        .inner_drag_srch{
          margin-bottom: 0;
        }
        .inner_drag_srch input{
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
        .inner_drag_srch input:focus{ 
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
  )
}

export default DragDrop